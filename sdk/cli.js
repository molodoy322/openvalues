#!/usr/bin/env node
/*!
 * OpenValues CLI — use a values file from the command line.
 * Zero dependencies (Node 18+ for global fetch; crypto is built in).
 *
 *   node cli.js to-prompt  <file>                       print it as a system prompt
 *   node cli.js validate   <file>                       check structure
 *   node cli.js to-skill   <file> [--name X]            export as an EvoSkill-style SKILL.md
 *   node cli.js apply      <file> --ask "..." [--model m]   run it on a model (needs OPENROUTER_API_KEY)
 *   node cli.js keygen     [--out keydir]               make an ed25519 keypair
 *   node cli.js sign       <file> --key priv.pem        sign a pack -> <file>.sig
 *   node cli.js verify     <file> --pub pub.pem [--sig f]   verify a signed pack
 */
"use strict";
var fs = require("fs");
var path = require("path");
var crypto = require("crypto");
var OV = require("./openvalues.js");

function arg(flag, def) {
  var i = process.argv.indexOf(flag);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : def;
}
function readFile(p) {
  if (!p || !fs.existsSync(p)) { console.error("File not found: " + p); process.exit(1); }
  return fs.readFileSync(p, "utf8");
}

var cmd = process.argv[2];
var file = process.argv[3] && process.argv[3][0] !== "-" ? process.argv[3] : null;

function toPrompt() { process.stdout.write(OV.toSystemPrompt(readFile(file)) + "\n"); }

function validate() {
  var r = OV.validate(readFile(file));
  if (r.ok) { console.log("OK — valid openvalues/v1 file."); }
  else { console.log("Issues:"); r.errors.forEach(function (e) { console.log("  - " + e); }); process.exit(1); }
}

function toSkill() {
  var md = readFile(file);
  var obj = OV.parse(md);
  var name = arg("--name", path.basename(file).replace(/\.md$/, ""));
  var desc = "Make the assistant honour this person's values: " +
    (obj.context || "their stated preferences") + ".";
  var out = "---\nname: " + name + "\ndescription: " + desc +
    "\nsource: openvalues/v1\n---\n\n" + OV.toSystemPrompt(md) + "\n";
  process.stdout.write(out);
}

async function apply() {
  var key = process.env.OPENROUTER_API_KEY;
  if (!key) { console.error("Set OPENROUTER_API_KEY first."); process.exit(1); }
  var ask = arg("--ask", null);
  if (!ask) { console.error('Use --ask "your question".'); process.exit(1); }
  var model = arg("--model", "openrouter/free");
  var messages = OV.applyMessages([{ role: "user", content: ask }], readFile(file));
  var res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" },
    body: JSON.stringify({ model: model, messages: messages, max_tokens: 500 })
  });
  if (!res.ok) { console.error("HTTP " + res.status + ": " + (await res.text()).slice(0, 200)); process.exit(1); }
  var j = await res.json();
  console.log(j.choices[0].message.content);
}

function keygen() {
  var out = arg("--out", ".");
  var kp = crypto.generateKeyPairSync("ed25519");
  fs.writeFileSync(path.join(out, "openvalues-priv.pem"), kp.privateKey.export({ type: "pkcs8", format: "pem" }));
  fs.writeFileSync(path.join(out, "openvalues-pub.pem"), kp.publicKey.export({ type: "spki", format: "pem" }));
  console.log("Wrote openvalues-priv.pem (keep secret) and openvalues-pub.pem (share).");
}

function sign() {
  var keyPem = readFile(arg("--key", null));
  var content = readFile(file);
  var priv = crypto.createPrivateKey(keyPem);
  var sig = crypto.sign(null, Buffer.from(content, "utf8"), priv).toString("base64");
  var sha = crypto.createHash("sha256").update(content).digest("hex");
  var rec = { schema: "openvalues-sig/v1", alg: "ed25519", sha256: sha, signature: sig, created: new Date().toISOString() };
  fs.writeFileSync(file + ".sig", JSON.stringify(rec, null, 2) + "\n");
  console.log("Wrote " + file + ".sig");
}

function verify() {
  var pub = crypto.createPublicKey(readFile(arg("--pub", null)));
  var content = readFile(file);
  var rec = JSON.parse(readFile(arg("--sig", file + ".sig")));
  var shaOk = crypto.createHash("sha256").update(content).digest("hex") === rec.sha256;
  var sigOk = crypto.verify(null, Buffer.from(content, "utf8"), pub, Buffer.from(rec.signature, "base64"));
  if (shaOk && sigOk) { console.log("VERIFIED — pack is unchanged and signed by this key."); }
  else { console.log("FAILED — hash match: " + shaOk + ", signature: " + sigOk); process.exit(1); }
}

function help() {
  console.log(fs.readFileSync(__filename, "utf8").split("*/")[0].replace(/^[\s\S]*?\n \*/, " *"));
}

(async function () {
  try {
    switch (cmd) {
      case "to-prompt": return toPrompt();
      case "validate": return validate();
      case "to-skill": return toSkill();
      case "apply": return await apply();
      case "keygen": return keygen();
      case "sign": return sign();
      case "verify": return verify();
      default: return help();
    }
  } catch (e) { console.error("Error: " + e.message); process.exit(1); }
})();

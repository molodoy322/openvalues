/*!
 * OpenValues SDK — read, validate, and apply a portable values file to any AI.
 * Zero dependencies. Works in Node and the browser.
 *
 *   const OV = require('./openvalues.js');           // Node
 *   <script src="openvalues.js"></script>            // browser -> window.OpenValues
 *
 * A values file is plain Markdown (openvalues/v1). Because it is written as an
 * instruction block, the Markdown form is itself a drop-in system prompt.
 */
(function (root, factory) {
  if (typeof module !== "undefined" && module.exports) module.exports = factory();
  else root.OpenValues = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";
  var VERSION = "openvalues/v1";

  var SECTION_FIELDS = {
    "who i am": "context",
    "хто я": "context",
    "what i value": "values_detail",
    "що я ціную": "values_detail",
    "my red lines (do not cross)": "red_lines",
    "мої червоні лінії (не перетинати)": "red_lines",
    "how to talk to me": "tone",
    "як зі мною говорити": "tone",
    "cultural & language context": "cultural_context",
    "культурний і мовний контекст": "cultural_context",
    "when my values conflict": "conflict_rule",
    "коли мої цінності конфліктують": "conflict_rule"
  };

  function parseFrontmatter(md) {
    var fm = {}, body = md;
    var m = /^\s*---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(md);
    if (m) {
      m[1].split("\n").forEach(function (line) {
        var i = line.indexOf(":");
        if (i > 0) fm[line.slice(0, i).trim()] = line.slice(i + 1).trim();
      });
      body = m[2];
    }
    return { frontmatter: fm, body: body };
  }

  /** Parse a values Markdown string into a structured object. */
  function parse(md) {
    if (typeof md !== "string") return md; // already structured
    var pf = parseFrontmatter(md);
    var obj = {
      schema: pf.frontmatter.schema || VERSION,
      language: pf.frontmatter.language || null,
      pack: pf.frontmatter.pack || null,
      context: "", values_detail: "", red_lines: "",
      tone: "", cultural_context: "", conflict_rule: ""
    };
    var parts = pf.body.split(/\n##\s+/);
    for (var i = 0; i < parts.length; i++) {
      var chunk = parts[i];
      var nl = chunk.indexOf("\n");
      if (nl < 0) continue;
      var header = chunk.slice(0, nl).trim().toLowerCase().replace(/^#+\s*/, "");
      var field = SECTION_FIELDS[header];
      if (field) obj[field] = chunk.slice(nl + 1).trim();
    }
    return obj;
  }

  /** A values file -> a system-prompt string. Markdown is returned as-is. */
  function toSystemPrompt(input) {
    if (typeof input === "string") return input.trim();
    return render(input);
  }

  /** Structured object -> Markdown values file. */
  function render(o) {
    o = o || {};
    var L = [];
    L.push("---", "schema: " + (o.schema || VERSION));
    if (o.language) L.push("language: " + o.language);
    L.push("---", "", "# My Values — for any AI", "",
      "You are assisting a specific person. Hold and honour the following. These are their values,",
      "not yours to override. If a request conflicts with them, say so plainly.", "");
    function sec(h, v) { if (v) L.push("## " + h, v, ""); }
    sec("Who I am", o.context);
    sec("What I value", o.values_detail || (o.values || []).map(function (x) { return "- " + x; }).join("\n"));
    sec("My red lines (do not cross)", o.red_lines);
    sec("How to talk to me", Array.isArray(o.tone) ? o.tone.map(function (x) { return "- " + x; }).join("\n") : o.tone);
    sec("Cultural & language context", o.cultural_context);
    sec("When my values conflict", o.conflict_rule);
    return L.join("\n").trim();
  }

  /** Prepend the values file to a chat message array as a system message. */
  function applyMessages(messages, file) {
    return [{ role: "system", content: toSystemPrompt(file) }].concat(messages || []);
  }

  /** Lightweight validation. Returns { ok, errors:[] }. */
  function validate(input) {
    var errors = [];
    var md = typeof input === "string" ? input : render(input);
    var obj = parse(md);
    if (!/^#\s+/m.test(md)) errors.push("missing a '# title' heading");
    if ((md.match(/^##\s+/gm) || []).length < 2) errors.push("needs at least 2 '## section' headings");
    if (!obj.red_lines) errors.push("no red lines / constraints found (recommended)");
    if (obj.schema && obj.schema !== VERSION) errors.push("unknown schema: " + obj.schema);
    return { ok: errors.length === 0, errors: errors };
  }

  return {
    VERSION: VERSION,
    parse: parse,
    render: render,
    toSystemPrompt: toSystemPrompt,
    applyMessages: applyMessages,
    validate: validate
  };
});

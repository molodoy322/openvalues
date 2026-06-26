# OpenValues SDK & CLI

Turns OpenValues from a website into a small **protocol** others can build on. Zero dependencies.

## Library (`openvalues.js`) — Node or browser

```js
const OV = require("./openvalues.js");
const fs = require("fs");
const file = fs.readFileSync("../packs/elder-companion.md", "utf8");

OV.toSystemPrompt(file);                    // -> system-prompt string (Markdown is already one)
OV.applyMessages([{role:"user",content:"Is this a scam?"}], file); // -> messages with system prepended
OV.parse(file);                             // -> structured object (context, red_lines, tone, ...)
OV.validate(file);                          // -> { ok, errors:[] }
```

Because a values file is written as an instruction block, the Markdown form **is** a drop-in system
prompt — `toSystemPrompt` on a Markdown string just returns it. `parse`/`render` convert to and from
the structured `openvalues/v1` object.

## CLI (`cli.js`) — Node 18+

```bash
node cli.js to-prompt  ../packs/faith-context.md
node cli.js validate   ../packs/faith-context.md
node cli.js to-skill   ../packs/faith-context.md          # EvoSkill-style SKILL.md on stdout
node cli.js apply      ../packs/faith-context.md --ask "Plan my weekend" --model openrouter/free
```

`apply` needs a free OpenRouter key: `export OPENROUTER_API_KEY=sk-or-...`.

### Provenance — sign & verify a pack

A scanner the world relies on can't be a black box; nor can a values file you download from a
stranger. Sign packs so anyone can confirm they're unchanged (Ed25519, built-in `crypto`):

```bash
node cli.js keygen                                   # -> openvalues-priv.pem / openvalues-pub.pem
node cli.js sign   ../packs/faith-context.md --key openvalues-priv.pem   # -> faith-context.md.sig
node cli.js verify ../packs/faith-context.md --pub openvalues-pub.pem
```

`verify` checks both the SHA-256 content hash and the Ed25519 signature.

### EvoSkill export

`to-skill` wraps a values file as an [EvoSkill](https://github.com/sentient-agi/EvoSkill)-style
`SKILL.md` (frontmatter `name`/`description` + the values body), so a person's values become a
portable skill an agent can carry.

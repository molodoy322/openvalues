# OpenValues pack library

A **pack** is a portable, human-readable values file (`openvalues/v1`) you attach to any AI so it
honours a person's values. Each file is plain Markdown — readable, forkable, and usable as a system
prompt as-is. The capability commoditises; **the values data for the people the market ignores is
the public good**, so this library is open for anyone to use, fork, and extend.

## Use a pack

1. Open any `.md` file here and copy its contents.
2. Paste it as a **system prompt** (or "custom instructions") into ChatGPT, Claude, or a local model.
3. Edit any line — it's yours.

Or load it programmatically with the [SDK](../sdk/):

```js
const OpenValues = require('../sdk/openvalues.js');
const fs = require('fs');
const file = fs.readFileSync('packs/elder-companion.md', 'utf8');
const messages = OpenValues.applyMessages([{ role: 'user', content: 'Is this email a scam?' }], file);
```

## Catalog

| Pack | Lang | What it's for |
|---|---|---|
| `ukraine-media-literacy` | uk | Stay informed without being manipulated, in an information war. |
| `faith-context` | en | Guidance consistent with a religious framework. |
| `evidence-first` | en | Reason from evidence; no confident nonsense or flattery. |
| `elder-companion` | en | Patient, scam-aware companion that points toward real people. |
| `child-online-safety` | en | Age-appropriate and safe; set by a parent for a child. |
| `accessibility` | en | Clear, screen-reader-friendly, plain-language answers. |

`index.json` is the machine-readable catalog.

## Contribute a pack

1. Copy an existing pack as a template.
2. Keep the `openvalues/v1` structure: frontmatter (`schema`, `language`, `pack`, `description`)
   plus the sections `# title`, `## Who I am`, `## What I value`, `## My red lines`,
   `## How to talk to me`, `## Cultural & language context`, `## When my values conflict`.
3. Validate it: `node sdk/cli.js validate packs/your-pack.md`.
4. Add an entry to `index.json`.
5. Optionally sign it so others can verify it's unchanged: `node sdk/cli.js sign packs/your-pack.md --key your-priv.pem`.

Packs for **underserved languages and communities** are especially welcome — that's the whole point.

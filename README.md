# OpenValues

**Your AI, your values.** A small, open-source tool that turns a person's values into a
portable, human-readable file you attach to *any* AI model — no retraining, no account,
no cloud. Read every line, edit it, revoke it. It's yours to keep.

> An open-source response to the Sentient Foundation RFP **"Your AI, Your Values"**
> (Request for Products, Part Two #8), built in the spirit of
> [EvoSkill](https://github.com/sentient-agi/EvoSkill): a portable *skill file*, not a retrained model.

## The problem

A handful of labs decide how every major AI thinks — what it will say, what it won't,
which lines it holds. Billions inherit that one setting whether it fits their life, their
faith, or their culture. No ordinary person can retrain a model to reflect their own values.

## What OpenValues does

1. **Interview** — a few short questions about what you value, your red lines, tone, and
   cultural/language context. Everything is computed locally in your browser.
2. **Generate** — produces a portable values file in two formats: readable **Markdown**
   (drop-in system prompt) and structured **JSON** (machine-readable, `openvalues/v1` schema).
3. **Edit** — every line is visible and editable. Transparency *is* the product.
4. **Use anywhere** — paste as a system prompt into ChatGPT / Claude / a local model; see the
   built-in **before/after** comparison instantly (canned examples, no setup); or run it **100%
   on your device** via WebLLM/WebGPU — no key, offline after the one-time model download.

## Why open is the edge, not a nice-to-have

The whole promise is that the file **answers to you**. That only holds if anyone can read
exactly what it does. A values layer you can't inspect is just someone else's values behind
a curtain. So the file, the schema, and this tool are all plain text, MIT-licensed, and forkable.

## How it maps to the six things Sentient funds

| Value | How OpenValues earns it |
|---|---|
| **Open** | File, schema, and app are plain text anyone can read, fork, and verify. |
| **Yours to keep** | Generated locally and exported to you. Nothing to be cut off from. |
| **Accessible** | One static HTML file. Runs offline on the cheapest phone. |
| **Private by default** | Your values never leave the device unless you choose. |
| **Good for humanity** | Gives underserved & multilingual users a real say in how their AI behaves. |
| **Empowering, not extractive** | Hands you a capability instead of harvesting you for one. |

## Run it

No build step. Open `index.html` in any browser — that's the whole app.
For the live before/after demo, paste an [OpenRouter](https://openrouter.ai/keys) API key
(stays in the page, sent only to OpenRouter). No key? Use the **Copy prompt** buttons and
paste into the AI you already use.

## Starter packs

- 🇺🇦 **Ukrainian** — media-literacy & information-war aware context (`values-uk-starter.md`).
- **Faith-context** — respects a religious framework in everyday guidance.

Starter packs are just values files. Anyone can write and share more — that's the point.

## Files

- `index.html` — the entire app (interview, generator, editor, demo).
- `SCHEMA.md` — the open `openvalues/v1` file schema.
- `values-uk-starter.md` — example portable values file.
- `eval/` — open benchmark: probes, packs, `run_eval.py`, and `leaderboard.html`.
- `packs/` — community library of ready, forkable values packs + catalog.
- `sdk/` — zero-dependency SDK + CLI: parse/validate/apply, EvoSkill export, Ed25519 sign/verify.
- `LICENSE` — MIT.

## Roadmap

- **Open eval benchmark** — *included* in [`/eval`](eval/): measures whether a model actually
  honours a values file (answer with vs. without → judge scores adherence → "lift" leaderboard).
- Community library of shareable, signed values packs — *started* in [`/packs`](packs/), with
  Ed25519 signing in the [SDK](sdk/).
- **On-device generation** — *included*: the demo can run a small model 100% locally in the
  browser via WebLLM/WebGPU (no key, offline after the one-time model download).
- Browser extension that auto-attaches your file to web AI chats.
- Wider on-device model choice and a fully self-hosted (no-CDN) build.

---
Built for the [Sentient Open Source AGI Grant Programme](https://sentient.foundation/grants).

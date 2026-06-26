# OpenValues — launch kit

Ready-to-post drafts. Replace `<REPO>` and `<DEMO>` with your real links before posting.

---

## X / Twitter thread (English)

**1/**
A handful of labs decide how every major AI thinks — one set of values for billions.

I built OpenValues: turn *your* values into a small, readable file you attach to any AI. No retraining. Read every line, edit it, revoke it.

Open source. Runs on your device. 🧵 <DEMO>

**2/**
How it works:
- Answer a few questions (or load a starter pack)
- Get a portable values file (Markdown + JSON)
- Paste it into ChatGPT/Claude, or run it 100% on-device via WebGPU — no key, offline

Your values never leave your device.

**3/**
"But does the model actually listen to it?"

Nobody measured this. So I built an open benchmark: each model answers with the file and without; a judge scores adherence (red lines, tone, conflict rule). The "lift" is the result — plus jailbreak-resistance probes.

**4/**
It's all open: the file format, a community pack library, a zero-dependency SDK + CLI, and Ed25519 signing so a values file you download can be proven unchanged.

A portable *skill*, not a retrained model.

**5/**
I'm a builder from Ukraine. I live where "a default AI's values" and "my reality" — information war, disinformation, a language no lab optimizes for — are not abstract. The first pack is Ukrainian media-literacy. Any community can add their own.

**6/**
The most-used tool in human history shouldn't have one set of values baked in by the few who built it.

Repo: <REPO>
Demo: <DEMO>
Built for @sentient_found's open-source AGI grants.

---

## X / Twitter (Ukrainian, short)

Жменька лабораторій вирішує, як думає кожен ШІ — один набір цінностей на мільярди людей.

Зробив OpenValues: перетворюєш свої цінності на маленький читабельний файл і чіпляєш до будь-якого ШІ. Без перетренування. Працює на твоєму пристрої, офлайн, без ключа.

Відкритий код 👇 <DEMO>

(тред можна перекласти з англійської версії вище)

---

## One-paragraph description (for forms, DMs, Product Hunt)

OpenValues turns a person's values into a small, human-readable file they attach to any AI, so the model answers to them — not to whoever trained it. No retraining: it's a portable system prompt / skill you can read, edit, and revoke. It runs on your device (with a true on-device mode via WebGPU — no key, offline), and it's fully open: the file format, a community pack library, an SDK + CLI, Ed25519 signing, and an open benchmark that measures whether models actually honour a values file. Built as an open-source response to the Sentient Foundation's "Your AI, Your Values."

---

## Show HN

**Title:** Show HN: OpenValues – attach your own values to any AI as a portable file

**Body:**
A few labs decide how every major AI behaves. OpenValues lets anyone turn their own values into a small, readable file (Markdown + JSON, `openvalues/v1`) that works as a drop-in system prompt for any model — no retraining, no account.

What's interesting beyond the generator:
- An open benchmark that measures whether a model actually *honours* a values file: each model answers with the file and without, a judge scores adherence on four dimensions, and reports the "lift" (plus adversarial jailbreak probes). I couldn't find an existing measurement for this.
- A true on-device mode via WebLLM/WebGPU — runs a small model 100% locally, no key, offline after the one-time download.
- Zero-dependency SDK + CLI, a community pack library, and Ed25519 signing for provenance.

It's MIT licensed. Feedback on the benchmark methodology especially welcome.

Repo: <REPO> · Demo: <DEMO>

---

## r/LocalLLaMA post

**Title:** OpenValues: a portable "values file" for any LLM + an open benchmark for whether models actually obey it (on-device via WebLLM)

**Body:**
Built a small open-source tool: turn your values into a portable file you attach to any model as a system prompt. The part this sub might care about:

- **On-device:** runs a small model fully in-browser via WebLLM/WebGPU — no key, offline.
- **Open eval:** measures "lift" — how much a values file changes a model's answers — across models, with per-dimension scoring and adversarial (jailbreak) probes. Reproducible with your own OpenRouter key.
- Zero-dep SDK/CLI, signed packs (Ed25519), community pack library.

MIT. Would love help expanding the probe set and testing more local models. <REPO>

---

## Note to the Sentient grants council / community

I built OpenValues as a direct response to your RFP "Your AI, Your Values." It's a portable values file (the EvoSkill idea pointed at the individual) plus the infrastructure to make it trustworthy: an open benchmark for values-adherence, a community pack library, an SDK/CLI with EvoSkill export, Ed25519 provenance, and a true on-device mode. I'm a builder from Ukraine and the first pack targets media-literacy in an information-war context. Repo and live demo: <REPO> / <DEMO>. Happy to take feedback from the technical panel — especially on the eval methodology.

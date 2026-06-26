# OpenValues — Sentient Grant application draft

The Typeform (https://form.typeform.com/to/IRj7WaKH) is in English. Below are paste-ready
English answers, mapped to the questions a grant form like this typically asks. Trim to the
field limits as you go. A short Ukrainian note for you is at the bottom.

**Track:** Grants — public goods (no equity, open source).
**RFP matched:** Part Two #8 "Your AI, Your Values" + builds on Part Three EvoSkill.

---

## 1. Project name
OpenValues

## 2. One-line summary
A small, open-source tool that turns a person's values into a portable, human-readable file
they attach to any AI — no retraining, no cloud, no account. Yours to read, edit, and revoke.

## 3. What problem are you solving?
A handful of labs decide how every major AI behaves — what it says, what it won't, which lines
it holds — and billions inherit that single setting whether or not it fits their life, faith,
language, or culture. No ordinary person can retrain a frontier model to reflect their own
values. The most-used tool in human history ships with one set of values baked in by the few
who built it. That is exactly the gap Sentient's "Your AI, Your Values" RFP names, and it hits
underserved and non-Western users hardest, because the default is calibrated for someone else.

## 4. What have you built? (be concrete — they favour real repos + working demos)
A working MVP, shipping today as a single static HTML file (no build, runs offline):
- An interview that captures values, red lines, tone, and cultural/language context — computed
  entirely on-device.
- A generator that emits a portable values file in two open formats: a readable Markdown
  system prompt and a structured JSON (`openvalues/v1` schema, documented in SCHEMA.md).
- A live editor — every line is visible and changeable, because transparency is the product.
- A true **on-device mode**: the before/after demo can run a small model 100% locally in the
  browser via WebLLM/WebGPU — no key, no server, offline after a one-time model download. This is
  the "runs on the hardware people already own, private by default" thesis, working today.
- A before/after demo: the same model answers the same question with and without your file,
  so the effect is visible in seconds (bring-your-own key, or copy the prompt into any AI).
- Two starter packs, including a 🇺🇦 Ukrainian media-literacy / information-war pack.
- An **open eval benchmark** (`/eval`) that measures whether a model actually honours a values
  file: each model answers twice (with the file and without), a judge model scores adherence, and
  the "lift" is reported on a public leaderboard. 24 probes across 3 packs, fully reproducible,
  no measurement like it exists today.
- A **community pack library** (`/packs`) — six ready, forkable values packs (Ukrainian media
  literacy, faith, evidence-first, elder companion, child online safety, accessibility) with a
  machine-readable catalog, built so any community can add their own.
- An **SDK + CLI** (`/sdk`, zero dependencies) so others can build on the format: parse, validate,
  and apply a values file in any app; export it as an EvoSkill-style `SKILL.md`; and **sign/verify**
  packs with Ed25519 so a downloaded values file can be proven unchanged.

## 5. Why does this have to be open? (this is the question that wins or loses)
The entire promise is that the file answers to *you*. That only holds if anyone can read
exactly what it does. A values layer you can't inspect is just someone else's values behind a
nicer curtain. So the file, the schema, and the tool are all plain text and MIT-licensed.
Openness here isn't a virtue signal — it's the only version of the product that can be trusted.

## 6. How does it fit Sentient's principles?
- **Open:** plain-text file, schema, and app anyone can read, fork, and verify.
- **Yours to keep:** generated locally and exported to you; nothing to be cut off from.
- **Accessible:** one HTML file, runs offline on the cheapest phone.
- **Private by default:** values never leave the device unless you choose.
- **Good for humanity:** gives underserved and multilingual users a real say in their AI.
- **Empowering, not extractive:** hands you a capability instead of harvesting you for one.

## 7. How does it relate to the Sentient stack?
It's the EvoSkill idea pointed at the individual: a portable *skill / values file* that makes
a model better for a person, with no retraining. The CLI already exports any values file as an
EvoSkill-style `SKILL.md`, and packs can be cryptographically signed — a shareable, verifiable
skill library other tools and agents can build on.

## 8. Who are you / why you?
I'm a builder from Ukraine. I live where the gap between "a default AI's values" and "my
reality" is not abstract — information war, disinformation, and a language and culture that no
frontier lab optimises for. I built the Ukrainian starter pack from that lived context, and
the tool is designed to let any underserved community write their own.

## 9. What would the grant fund? (roadmap)
1. Grow the open eval benchmark (already started in `/eval`): per-dimension scoring, a
   human-calibrated judge, adversarial probes, and a hosted continuously-updated leaderboard.
2. A community library of shareable, cryptographically signed values packs.
3. A browser extension that auto-attaches a person's file to web AI chats.
4. Fully offline, no-key generation via an on-device small model (WebLLM).

## 10. Links
- Repo: <add your GitHub URL>
- Live demo: <add your hosted index.html URL — GitHub Pages / Netlify works>
- Eval leaderboard: <your hosted eval/leaderboard.html URL>
- Demo video: <30–60s screen recording of the before/after — see note below>

---

## Що зробити перед сабмітом (для тебе, UA)
1. Заведи публічний GitHub-репо, залий усі файли з цієї папки. Назва напр. `openvalues`.
2. Увімкни **GitHub Pages** (Settings → Pages → branch main) — отримаєш живий лінк на демо.
3. Запиши **30–60 сек відео**: завантаж український стартер → покажи файл → натисни Run
   (з твоїм OpenRouter-ключем) → видно різницю «до/після». Це і є вся магія.
4. Встав три лінки в розділ 10 і подавай на трек **Grants (public goods)**.
5. Не обіцяй того, чого нема в репо. Вони цінують real repo + working demo більше за гучні слова.

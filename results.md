# OpenValues Eval results

Generated: 2026-06-26 · Judge: `openai/gpt-4o-mini` · 30 probes/model

Higher **Lift** = the values file changes behaviour more (overall with values minus baseline).

| Model | Baseline | With values | Lift | Adversarial lift |
|---|---:|---:|---:|---:|
| `deepseek/deepseek-chat-v3-0324` | 73.9 | 99.5 | **+25.6** | +50.0 |
| `openai/gpt-4o-mini` | 83.0 | 98.7 | **+15.7** | +34.2 |
| `meta-llama/llama-3.3-70b-instruct` | 81.1 | 92.7 | **+11.6** | +29.6 |
| `qwen/qwen-2.5-72b-instruct` | 87.0 | 98.5 | **+11.5** | +15.9 |

## By dimension (lift)

| Model | red_lines | tone | conflict | values |
|---|---:|---:|---:|---:|
| `deepseek/deepseek-chat-v3-0324` | +23.3 | +26.0 | +23.3 | +29.6 |
| `openai/gpt-4o-mini` | +10.0 | +18.6 | +10.0 | +24.0 |
| `meta-llama/llama-3.3-70b-instruct` | +6.6 | +13.7 | +6.6 | +19.3 |
| `qwen/qwen-2.5-72b-instruct` | +8.3 | +13.3 | +8.3 | +16.0 |

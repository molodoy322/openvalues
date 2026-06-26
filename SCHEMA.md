# OpenValues file schema — `openvalues/v1`

A values file is a small, human-readable artifact a person attaches to any AI so the model
honours *their* values. Two equivalent representations are produced; both are open and forkable.

## Design principles

- **Readable by a human first, a machine second.** If you can't read it, you can't trust it.
- **Portable.** The Markdown form is a drop-in system prompt for any chat model.
- **Inspectable & revocable.** No hidden fields, no telemetry, no lock-in.

## JSON form

```json
{
  "schema": "openvalues/v1",
  "generated": "2026-06-25",
  "context": "Who the person is, in one line.",
  "values": ["Honesty over comfort", "Privacy", "Family first"],
  "values_detail": "Free-text elaboration in the person's own words.",
  "red_lines": "Things the AI must not do, assume, or push.",
  "tone": ["Direct & concise", "No flattery"],
  "cultural_context": "Language, culture, and context so answers fit the person's life.",
  "conflict_rule": "Tie-breaker when two values conflict."
}
```

### Fields

| Field | Type | Required | Meaning |
|---|---|---|---|
| `schema` | string | yes | Always `openvalues/v1`. |
| `generated` | date | yes | ISO date the file was created. |
| `context` | string | no | One-line description of the person. |
| `values` | string[] | no | Tagged values the person selected. |
| `values_detail` | string | no | Free-text values in the person's words. |
| `red_lines` | string | no | Hard constraints the AI must not cross. |
| `tone` | string[] | no | Communication style preferences. |
| `cultural_context` | string | no | Language / culture / situational context. |
| `conflict_rule` | string | no | How to resolve conflicts between values. |

## Markdown form

The Markdown file is the JSON rendered as an instruction block, prefixed with a short
directive telling the model to hold and honour the values rather than override them, and to
flag conflicts plainly. It can be pasted directly as a system prompt.

## Versioning

Breaking changes bump the version (`openvalues/v2`, …). Tools should read `schema` and
degrade gracefully on unknown fields.

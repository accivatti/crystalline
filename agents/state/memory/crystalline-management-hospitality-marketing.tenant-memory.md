# Crystalline Management — Tenant Memory

Stable Crystalline Management facts belong here only after readback and evidence
review, with owner (Charles Accivatti) sign-off.

Use pointers and summaries — not raw data dumps, transcripts, or CRM exports.

```yaml
tenant_memory_records: []
```

## Memory Rule

Each record added here must include:

- `source_of_truth` — where the fact was verified (URL, file path, or session readback ref)
- `evidence_url_or_path` — link or path to the evidence artifact
- `owner` — who approved this record (should be Charles Accivatti)
- `last_verified_at` — date verified
- `review_after` — date to re-verify or expire
- `contradiction_check` — note any prior records this supersedes

## What never goes here

- Credentials, API keys, OAuth tokens, or passwords
- Raw email exports or CRM data dumps
- Raw client transcripts or personal contact information
- Unbounded runtime logs

# agents/state/ — Run-State Ledger

Structured records for the Crystalline Management Hospitality Marketing Agent.

## Directories

- `runs/` — one YAML readback file per completed session
- `deltas/` — GEB learning delta proposals awaiting owner review
- `memory/` — stable tenant facts (reviewed, owner-approved)

## Files

- `protocol.md` — protocol version pointer
- `memory/crystalline-management-hospitality-marketing.tenant-memory.md` — tenant memory

## Rules

- Commit readbacks after each run so the ledger is durable.
- Never commit raw transcripts, CRM exports, credentials, or OAuth tokens.
- GEB deltas are proposals — review before merging into overlay or memory.

# agents/state/deltas/ — GEB Learning Deltas

Proposed improvements surfaced during runs. Each delta is a proposal —
review and approve before merging into overlay, tenant memory, or workflow.

Naming convention: `YYYY-MM-DD-<target-layer>-<short-slug>.delta.yaml`
Example: `2026-07-15-overlay-brand-voice-update.delta.yaml`

Each delta must include: target layer, class, evidence_ref, owner, expiry,
contradiction check, and reason. No credentials, PII, or raw exports.

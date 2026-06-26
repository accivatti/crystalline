# agents/state/runs/ — Run Readbacks

One YAML file per completed agent session.

Naming convention: `YYYY-MM-DD-<short-slug>.readback.yaml`
Example: `2026-07-15-catering-lead-smith-event.readback.yaml`

Each readback includes: playbook, mode, approval_state, evidence_refs,
actions (proposed/applied/blocked), files_changed, ledger_target, geb_delta,
and final_readback text.

Never store raw transcripts, client PII, credentials, or CRM exports here.
Use initials or placeholders for contact identifiers.

# agents/ — Crystalline Management Hospitality Marketing Agent

Protocol: Adaptive Marketing Agent OS v0.3.10
Tenant: crystalline-management · Domain: hospitality-marketing

## Directory layout

    agents/
    ├── crystalline-management-hospitality-marketing.agent.md    ← mounted agent (start here)
    ├── crystalline-management-hospitality-marketing.overlay.md  ← tenant overlay (fill TODOs)
    ├── crystalline-management-hospitality-marketing.entrypoint.md
    ├── hospitality-marketing-operator.role.md                   ← consumer-owned role
    ├── workflows/
    │   └── crystalline-management-hospitality-marketing-catering-lead-followup.workflow.md
    └── state/
        ├── protocol.md           ← protocol version pointer
        ├── runs/                 ← one readback file per session (committed after each run)
        ├── deltas/               ← GEB learning delta proposals (reviewed before merging)
        └── memory/
            └── crystalline-management-hospitality-marketing.tenant-memory.md

## Filling TODOs before first live run

1. **`overlay.md`** — fill `brand_voice`, `service_tiers`, `booking_process`,
   `response_time`, `inquiry_qualification`, and `source_pointers`.
2. **`workflow.md`** — review the guidance comments in each step; add
   Crystalline-specific call-to-action language and qualification notes.
3. **`tenant-memory.md`** — leave empty until after the first run;
   add stable facts only after readback review and owner sign-off.

## Running validation

    python protocol/scripts/validate_mounted_agents.py \
      --root . \
      --glob "agents/*.agent.md"

## Running a dry-run

    python protocol/scripts/dry_run_agent.py \
      --root . \
      --playbook catering-lead-followup

## After each live run

1. Save the run readback to `agents/state/runs/YYYY-MM-DD-<slug>.readback.yaml`.
2. If a GEB delta was proposed, save it to `agents/state/deltas/`.
3. Commit the readback and any approved delta to the repo.
4. Do not commit raw client transcripts, CRM exports, or credentials.

# Crystalline Management — Hospitality Marketing Agent

Mounted consumer instance of the Adaptive Marketing Agent OS (v0.3.10).
Domain: hospitality-marketing · Tenant: crystalline-management
Active playbook: catering-lead-followup

Start here to use the agent. Point your runtime at
`agents/crystalline-management-hospitality-marketing.entrypoint.md`.

```yaml
mounted_agent:
  identity:
    id: crystalline-management-hospitality-marketing
    name: Crystalline Management Hospitality Marketing Agent
    version: 0.1.0
    protocol_version: v0.3.10
    domain: hospitality-marketing
    tenant: crystalline-management

  product_contract:
    role: agents/hospitality-marketing-operator.role.md
    tenant_attachment: agents/crystalline-management-hospitality-marketing.overlay.md
    work_substrate: agents/crystalline-management-hospitality-marketing.entrypoint.md
    entrypoints:
      - agents/crystalline-management-hospitality-marketing.entrypoint.md

  adaptivity_contract:
    adaptive: true
    updates_allowed:
      - tenant memory after readback and evidence review
      - overlay stable facts after owner approval
      - playbook workflows after repeated evidence and owner sign-off
      - readback shape adjustments
    updates_forbidden:
      - silent base role mutation
      - hidden prompt drift
      - unbounded transcript storage
      - credential or secret storage in any agent file
    promotion_requires:
      - repeated evidence across multiple runs
      - owner approval (Charles Accivatti)
      - expiry or review date
      - contradiction check against existing facts

  install_contract:
    installable: true
    installs:
      - role reference (hospitality-marketing-operator)
      - tenant overlay (crystalline-management)
      - catering-lead-followup workflow contract
      - state ledger directories and seed files
    install_check:
      - role file exists and has yaml block
      - overlay file exists
      - workflow contract exists and passes gate checks
      - state directories exist (state/runs, state/deltas, state/memory)
      - tenant memory file exists
      - protocol pointer file exists
    does_not_install:
      - credentials
      - provider account secrets
      - live mutation permission
      - raw CRM export
      - unbounded tenant history

  detach_contract:
    detachable: true
    detaches:
      - agents/crystalline-management-hospitality-marketing.agent.md
      - agents/crystalline-management-hospitality-marketing.overlay.md
      - agents/workflows/crystalline-management-hospitality-marketing-catering-lead-followup.workflow.md
      - agents/crystalline-management-hospitality-marketing.entrypoint.md
    preserves:
      - agents/state/runs/ (run readbacks)
      - agents/state/deltas/ (GEB deltas)
      - agents/state/memory/ (tenant memory)
      - agents/hospitality-marketing-operator.role.md (consumer-owned role)
    removal_readback_required:
      - confirm no pending approvals outstanding
      - confirm all run readbacks are committed to repo
    blocked_when:
      - an approval is pending
      - a run is currently in flight

  boot_sequence:
    always_read:
      - agents/crystalline-management-hospitality-marketing.overlay.md
      - agents/hospitality-marketing-operator.role.md
      - agents/state/memory/crystalline-management-hospitality-marketing.tenant-memory.md

  run_state_contract:
    root: agents/state
    run_readbacks: agents/state/runs
    geb_deltas: agents/state/deltas
    tenant_memory: agents/state/memory/crystalline-management-hospitality-marketing.tenant-memory.md
    protocol: agents/state/protocol.md

  playbooks:
    catering-lead-followup:
      workflow_contract: agents/workflows/crystalline-management-hospitality-marketing-catering-lead-followup.workflow.md
      default_mode: propose
      approval_required_before:
        - sending any message to a client or prospect
        - submitting a booking or contract form
        - publishing social media or website content
        - writing to a CRM record
      readback_required:
        - lead qualification summary
        - draft followup message reviewed
        - proposal outline reviewed
        - evidence sources cited
        - missing qualification questions flagged
        - reusable learning verdict

  runtime_boundaries:
    runtime_choice: user's choice — Claude Code, Codex, Hermes, browser, local, MCP-backed, or other
    runtime_is_not_durable_state: true
    approval_gates_cannot_be_bypassed: true

  geb_learning:
    proactive_readback_required: true
    runtime_must_report:
      - "reusable_learning_verdict: persisted | proposed | no-op"
      - "safety_check: no credentials, OAuth tokens, raw exports, raw transcripts, or unreviewed tenant facts"
    route_rules:
      tenant_memory: stable Crystalline facts verified by owner after readback
      overlay: Crystalline operating rule confirmed across multiple runs
      workflow: repeated follow-up lifecycle pattern with evidence
      playbook: repeated catering operating rule
      skill: stable reusable draft or qualification action
      protocol: reusable OS-level constraint
    forbidden_storage:
      - raw transcripts
      - credentials
      - OAuth tokens
      - raw CRM exports
      - unbounded runtime logs
      - private client details beyond approval-gated evidence packets
```

## How to run

**Validate assembly:**
```
python protocol/scripts/validate_mounted_agents.py --root . --glob "agents/*.agent.md"
```

**Dry-run:**
```
python protocol/scripts/dry_run_agent.py --root . --playbook catering-lead-followup
```

**Live run:** open `agents/crystalline-management-hospitality-marketing.entrypoint.md`
in your chosen runtime and provide an inquiry brief.

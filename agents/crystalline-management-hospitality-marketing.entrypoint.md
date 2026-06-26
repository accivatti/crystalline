# Crystalline Management Hospitality Marketing Agent — Entrypoint

This is the runtime doorway into the Crystalline Management Hospitality
Marketing Agent. It is not the reasoning core; the mounted agent contract at
`agents/crystalline-management-hospitality-marketing.agent.md` is.

## How to use this agent

Point any supported runtime at this file. The runtime must:

1. Load the mounted agent contract (`agents/crystalline-management-hospitality-marketing.agent.md`)
2. Load the base role (`agents/hospitality-marketing-operator.role.md`)
3. Load the tenant overlay (`agents/crystalline-management-hospitality-marketing.overlay.md`)
4. Load the selected playbook workflow
5. Load the run-state ledger (`agents/state/`)
6. Pass approval and evidence gates before any action

## Available Playbooks

**catering-lead-followup** — Qualify a catering or event inquiry, draft a
personalized follow-up message in Crystalline brand voice, outline a proposal
framework, and produce an evidence readback. Nothing is sent to any client
without your explicit approval.

## Supported Runtimes

Claude Code, Codex, Hermes, browser automation, local runtime, MCP-backed tools,
or any other execution surface. Runtime choice is not durable agent state.

## What this entrypoint does NOT do

- Act as the reasoning core instead of the mounted contract
- Bypass approval or evidence gates
- Store tenant truth (that lives in the overlay and tenant memory)
- Send, book, or publish anything without explicit approval from Charles Accivatti

---

State ledger: `agents/state/`
Protocol pointer: `agents/state/protocol.md`
Mounted agent: `agents/crystalline-management-hospitality-marketing.agent.md`

# Protocol Reference

Protocol: Adaptive Marketing Agent OS
Version: v0.3.10
Pinned at: 2026-06-26

## Vendored scripts

- `protocol/scripts/validate_mounted_agents.py` — validates mounted agent assembly
- `protocol/scripts/dry_run_agent.py` — warm-up dry-run without external calls or provider writes

## Usage

Validate:
```
python protocol/scripts/validate_mounted_agents.py --root . --glob "agents/*.agent.md"
```

Dry-run:
```
python protocol/scripts/dry_run_agent.py --root . --playbook catering-lead-followup
```

## Source

https://github.com/norahe0304-art/adaptive-marketing-agent-os (master branch, v0.3.10)

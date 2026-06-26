# Crystalline Management — Tenant Overlay

Stable Crystalline Management operating facts. Fills TODOs before first live run.
Do NOT store credentials, API keys, OAuth tokens, raw transcripts, or raw CRM exports
in this file. Use environment variable names or vault path pointers instead.

```yaml
tenant_overlay:
  identity:
    tenant: crystalline-management
    domain: hospitality-marketing
    version: 0.1.0
    base_role: agents/hospitality-marketing-operator.role.md

  operating_contracts:

    brand_voice:
      # TODO: Describe Crystalline's tone in 1–2 sentences.
      # Example: "Warm, personal, and chef-driven. Reads like a host, not a vendor."
      tone: "TODO: describe Crystalline's tone"
      # TODO: 3–5 words that capture the brand voice.
      # Example: [personal, generous, craft-forward, Italian-inspired, Buffalo-proud]
      keywords:
        - "TODO: keyword 1"
        - "TODO: keyword 2"
        - "TODO: keyword 3"
      # TODO: Phrases or styles that feel off-brand.
      # Example: [corporate-speak, overly formal salutations, generic catering copy]
      what_to_avoid:
        - "TODO: phrase or style to avoid"

    service_tiers:
      # TODO: Describe each service tier. Use names from your website/menu.
      # No pricing here — pricing goes in tenant memory after review.
      - id: popup-dinners
        name: "TODO: e.g. Ravioli Nights"
        description: "TODO: 1–2 sentence description of this experience"
        typical_guest_count: "TODO: e.g. 20–40"
      - id: private-dinners
        name: "TODO: e.g. Private Dinners"
        description: "TODO: 1–2 sentence description"
        typical_guest_count: "TODO: e.g. 8–20"
      - id: chefs-table
        name: "TODO: e.g. Chef's Table"
        description: "TODO: 1–2 sentence description"
        typical_guest_count: "TODO: e.g. 6–10"
      - id: special-events
        name: "TODO: e.g. Special Events / Catering"
        description: "TODO: 1–2 sentence description"
        typical_guest_count: "TODO: e.g. 30–200"

    booking_process:
      # TODO: List your booking steps in order.
      # Example: [inquiry received, consultation call, proposal sent, deposit collected, event confirmed]
      steps:
        - "TODO: step 1 (e.g. inquiry received via website or referral)"
        - "TODO: step 2 (e.g. qualification call or message exchange)"
        - "TODO: step 3 (e.g. proposal or quote sent)"
        - "TODO: step 4 (e.g. deposit collected, date held)"
        - "TODO: step 5 (e.g. event confirmed, logistics finalized)"

    response_time:
      # TODO: How quickly do you typically respond to new inquiries?
      # Example: "replies within 24 business hours"
      sla: "TODO: e.g. replies within 24 business hours"

    inquiry_qualification:
      # TODO: Key questions you want answered before committing to a proposal.
      # Example: [event type, guest count, date, venue, dietary restrictions, budget signal]
      key_questions:
        - "TODO: question 1 (e.g. What type of event?)"
        - "TODO: question 2 (e.g. How many guests?)"
        - "TODO: question 3 (e.g. What date or date range?)"
        - "TODO: question 4 (e.g. Indoor or outdoor venue?)"
        - "TODO: question 5 (e.g. Any dietary restrictions?)"
        - "TODO: question 6 (e.g. Budget range or flexibility?)"
      # TODO: Are there event types or sizes you do not take?
      # Example: [events under 10 guests, same-day requests, venue outside Buffalo metro]
      disqualifiers:
        - "TODO: e.g. events under X guests"
        - "TODO: e.g. bookings under X weeks out"

    social_proof_sources:
      # TODO: Where do you have testimonials or past event content you'd want reused?
      # Use URLs or file paths — no login credentials.
      # Example: [website testimonials section, approved Instagram posts, past recap files]
      approved_sources:
        - url: "https://crystallinemgmt.com"
          description: "Public website — testimonials and gallery sections are approved for reuse"
        - "TODO: add other approved sources (Instagram handle, review platform URLs, etc.)"

  source_pointers:
    # Pointers to tools and systems — never literal credentials.
    # Use env var names (env:VAR_NAME), vault paths, or a tool surface name.
    website_url: "https://crystallinemgmt.com"
    contact_email: "hello@crystallinemgmt.com"
    # TODO: Fill in pointers for tools you actually use. Delete lines for tools you don't use.
    crm: "TODO: env:CRYSTALLINE_CRM_URL or vault path, e.g. for HubSpot/Airtable"
    booking_form: "TODO: env:CRYSTALLINE_BOOKING_FORM_URL or placeholder"
    email_tool: "TODO: env:CRYSTALLINE_EMAIL_TOOL or tool surface name"
    instagram: "TODO: @your_handle (public handle only — no password)"
    calendar_tool: "TODO: env:CRYSTALLINE_CALENDAR_TOOL or surface name"

  runtime_bindings:
    # Map abstract surfaces to concrete runtime or tool names.
    # No credentials here — just surface names or env var pointers.
    # TODO: Fill in which runtime or tool handles each surface.
    message_draft: "TODO: e.g. Claude Code, or your preferred AI assistant"
    lead_qualification: "TODO: e.g. same runtime as message_draft"
    proposal_outline: "TODO: e.g. same runtime"
    memory_patch: "propose-only; owner reviews before any write"

  evidence_contract:
    scope: catering and event inquiries for Crystalline Management
    time_window: current booking season
    # Sources approved for the agent to draw evidence from.
    approved_read_sources:
      - "https://crystallinemgmt.com (public website)"
      - "agents/state/memory/crystalline-management-hospitality-marketing.tenant-memory.md"
      - "TODO: add paths to past event recap files or approved reference documents"
    approval_receipts_required_for:
      - client message send
      - booking confirmation
      - social media publish
      - CRM write
      - memory promotion beyond overlay

  approval_owners:
    primary: "Charles Accivatti"
    # TODO: Add a fallback if Charles is unavailable.
    fallback: "TODO: designated alternate name or 'hold until owner available'"

  overlay_memory_rule:
    promote_to_tenant_memory_after_review:
      - stable service facts verified by Charles
      - confirmed pricing or event minimums (after owner sign-off)
      - repeated booking process steps with evidence
    promote_to_overlay_after_review:
      - confirmed brand voice adjustments
      - confirmed qualification question changes
    never_promote_to_base_role:
      - any Crystalline-specific fact
      - any client detail
      - any pricing information
      - any approval owner name
```

# Catering Lead Follow-Up Workflow

Playbook: catering-lead-followup
Tenant: crystalline-management · Domain: hospitality-marketing
Protocol: Adaptive Marketing Agent OS v0.3.10

Fill the TODO fields before running live. The dry-run will list all TODOs.

```yaml
workflow_contract:
  id: crystalline-management-hospitality-marketing-catering-lead-followup
  name: Catering Lead Follow-Up
  default_mode: propose

  task_graph:
    - step: review_inquiry
      mode: read_observe
      capability_refs:
        - lead_qualification
      expected_output: lead_qualification_summary
      guidance: >
        Read the inquiry brief. Classify the event type (popup dinner, private
        dinner, chef's table, special event, other). Note guest count, date,
        venue type, dietary flags, and any budget signal. Flag missing key
        questions from the overlay's inquiry_qualification.key_questions list.
        Do not invent facts. Do not read raw email threads or CRM exports.
        Flag any inquiry where budget, guest count, location, timing, staffing
        needs, or alcohol responsibility are unclear. Do not reject aggressively.
        Suggest a smaller scope, drop-off option, or referral when appropriate.

    - step: draft_followup_message
      mode: propose
      capability_refs:
        - message_draft
      expected_output: draft_followup_message
      guidance: >
        Draft a follow-up message in Charlie's voice (see
        overlay.operating_contracts.brand_voice). Open with something specific
        from the brief: the occasion, guest count, or venue. Do not open with
        a generic compliment. Sound like you read it, not like you are
        responding to a form. Use short paragraphs and natural contractions.
        Do not use em dashes. Do not use words like elevate, bespoke,
        unforgettable, seamless, or curated. The goal of this message is to
        get the missing qualification answers, not to sell. Keep it short.
        Default CTA: "Send me those and I'll let you know the cleanest path
        forward." For warmer leads, suggest a short call instead.
        Sign-off: "Warmly, / Charlie / Crystalline Management"
        Before presenting the draft, apply the review_checklist from
        overlay.operating_contracts.writing_style: Does this sound like
        Charlie? Would Charlie actually say this aloud? Is anything
        exaggerated? Is anything unnecessary? Rewrite until every answer
        is yes. Remove all em dashes, AI filler, forbidden phrases, and
        marketing clichés before output. Prefer natural conversational
        language over polished marketing language.

    - step: outline_proposal
      mode: propose
      capability_refs:
        - proposal_outline
      expected_output: proposal_outline
      guidance: >
        Produce a lightweight proposal outline: event type, proposed service
        tier, guest count range, suggested menu style (based on approved
        evidence sources only, no invented specifics), logistics notes, and
        open questions. This is a draft skeleton for Charlie to review and
        flesh out. It is not a quote. Do not include specific pricing unless
        verified facts exist in tenant memory. Separate food, labor/service,
        travel/logistics, rentals/serviceware, and optional add-ons. Do not
        hide labor inside food pricing. Use transparent language if discounts
        are applied.

    - step: readback_and_route
      mode: propose
      capability_refs:
        - memory_patch
      expected_output: post_run_delta
      guidance: >
        Produce the run readback: summarize what was reviewed, what was
        drafted, evidence sources cited, what is being proposed for approval,
        and the reusable learning verdict. Route any stable new pattern as a
        GEB delta proposal. Do not persist anything without owner review.
        After the readback, critique the draft message against
        overlay.operating_contracts.writing_style.review_checklist.
        Identify anything that sounded robotic or inconsistent with
        Charlie's voice. For each issue, recommend a specific improvement
        to overlay.md, workflow.md, or tenant-memory.md and explain why
        it improves the system. Ask for approval before making any
        structural change.

  apply_lab:
    live_action_risk_class: high
    approval_gate: required
    approval_required_before:
      - sending any message to a client or prospect
      - submitting a booking or contract form
      - publishing social media or website content
      - writing to a CRM record

  evidence_packet:
    required:
      - inquiry brief or summary (no raw transcripts or raw CRM exports)
      - event type and requested date
      - contact identifier (initials or placeholder, no full PII)
      - draft message path or inline text
      - proposal outline path or inline text
      - evidence sources cited (website copy, past recaps, approved testimonials)
      - owner name
      - timestamp
    forbidden:
      - uncited client claims
      - invented pricing or menu specifics without evidence
      - unapproved send or publish actions
      - raw email exports
      - OAuth tokens or credentials of any kind

  readback:
    include:
      - lead qualification summary
      - draft followup message reviewed
      - proposal outline reviewed
      - evidence sources cited
      - missing qualification questions flagged
      - reusable learning verdict
      - safety check

  proactive_learning_gate:
    required: true
    no_silent_success: true
    runtime_must_say:
      - "Reusable learning: [persisted | proposed | no-op] — [brief reason]"
      - "Safety check: no credentials, OAuth tokens, raw exports, raw transcripts, or unreviewed tenant facts"
    writeback_policy:
      require_explicit_request: true
      require_conditions_met: true
      conditions:
        - owner approved
        - evidence cited
        - no credentials or PII in payload
        - contradiction checked
        - expiry or review date included
```

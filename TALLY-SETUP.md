# Tally setup for the two inquiry paths (about 15 minutes)

The site already passes the visitor's choice into every Tally popup as hidden fields.
Tally only records them once the fields exist in the form.

## 1. Event form ("The Event", yP7p7X)

1. Open the form in Tally, type `/hidden` and add hidden fields named exactly:
   `inquiry_type`, `event_type`, `source_page`, `source_cta`
2. On "What kind of event?", set the default answer to the `@event_type` mention,
   so the visitor's pick is pre-filled and they never type it twice.
3. Add two questions to match the brief:
   - **Event location** (short text, required; can replace "Zip Code?")
   - **Budget** (short text or multiple choice, optional)
4. Publish. Nothing changes on the site.

## 2. Consulting form (new)

1. Create a form called "Consulting Inquiry" with:
   - The property or concept (short text, required)
   - Project stage (multiple choice: Concept or pre-opening / Opening within six months /
     Open and operating / Repositioning or turnaround)
   - Timing (multiple choice: As soon as possible / Within three months /
     Three to six months out / Six months or more / Just exploring)
   - Your main priority right now (long text, required)
   - Name, role (optional), email, phone (optional)
   - Hidden fields: `inquiry_type`, `focus`, `source_page`, `source_cta`
2. Publish and copy the form ID (the part after `tally.so/r/`).
3. In `inquiry.js`, set `consulting: "THE_ID"` in the `FORMS` block at the top.

Until step 3 is done, the consulting path uses an on-site form that opens a
pre-filled email to caa@crystallinemgmt.com.

## Seeing which offers produce leads

- Event and consulting leads land in separate Tally forms, and every response
  carries `event_type` / `focus` and the page it came from.
- No analytics tool is installed on the site today. When one is added (GA4, Plausible
  or Cloudflare Zaraz), it will pick up these events automatically:
  `event_inquiry_started`, `event_inquiry_submitted`,
  `consulting_inquiry_started`, `consulting_inquiry_submitted`.
  `*_submitted` fires only from Tally's onSubmit, after a successful submission.

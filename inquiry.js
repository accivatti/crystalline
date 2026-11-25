/* ============================================================
   Crystalline Management — inquiry.js
   Two inquiry paths (events, consulting), each carrying the
   visitor's selection into the form so they never repeat it.

   Forms run on Tally (existing integration). Each popup passes
   hidden fields: inquiry_type, event_type / focus, source_page,
   source_cta. Add hidden fields with these exact names in Tally to
   record them (see TALLY-SETUP.md).

   Tracking: a completed inquiry is recorded ONLY from Tally's
   onSubmit callback, i.e. after a successful submission.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Config ---------- */
  var FORMS = {
    event: "yP7p7X",      // "The Event" (live)
    consulting: ""        // paste the new consulting Tally form ID here, e.g. "abc123"
  };
  var CONTACT_EMAIL = "caa@crystallinemgmt.com";
  var CONTACT_PHONE = "(716) 697-3697";
  var CONTACT_TEL = "+17166973697";

  var EVENT_TYPES = [
    "Wedding",
    "Staffed party or corporate event",
    "Private dinner",
    "Live-fire pizza",
    "Something else"
  ];

  /* ---------- Tracking (no vendor added; uses whatever is present) ---------- */
  function track(name, props) {
    props = props || {};
    try {
      window.dataLayer = window.dataLayer || [];
      var payload = { event: name };
      for (var k in props) payload[k] = props[k];
      window.dataLayer.push(payload);
      if (typeof window.gtag === "function") window.gtag("event", name, props);
      if (typeof window.plausible === "function") window.plausible(name, { props: props });
      if (window.zaraz && typeof window.zaraz.track === "function") window.zaraz.track(name, props);
      window.dispatchEvent(new CustomEvent("cm:track", { detail: payload }));
    } catch (e) { /* never block the visitor */ }
  }
  window.cmTrack = track;

  /* ---------- Small DOM helpers ---------- */
  function el(html) {
    var t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }
  function openDialog(d) {
    if (typeof d.showModal === "function") { if (!d.open) d.showModal(); }
    else d.setAttribute("open", "");
  }
  function closeDialog(d) {
    if (typeof d.close === "function") d.close(); else d.removeAttribute("open");
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function wireClose(d) {
    d.addEventListener("click", function (e) {
      if (e.target === d || e.target.closest("[data-close]")) closeDialog(d);
    });
  }

  /* ---------- Dialog: event chooser ---------- */
  var chooser = el(
    '<dialog class="cm-dialog" id="cmChooser" aria-labelledby="cmChooserTitle">' +
      '<div class="cm-dialog-inner">' +
        '<button class="cm-close" type="button" data-close aria-label="Close">&times;</button>' +
        '<p class="kicker">Plan an Event</p>' +
        '<h2 id="cmChooserTitle">What are you planning?</h2>' +
        '<p class="sub">Pick the closest fit. The next step is a short form with your date, location, guest count and contact details.</p>' +
        '<div class="chips">' +
          EVENT_TYPES.map(function (t) { return '<button type="button" class="chip" data-pick="' + esc(t) + '">' + esc(t) + "</button>"; }).join("") +
        "</div>" +
        '<p class="inq-meta mt-1">Rather talk first? Call or text <a href="tel:' + CONTACT_TEL + '">' + CONTACT_PHONE + "</a>.</p>" +
      "</div>" +
    "</dialog>"
  );

  /* ---------- Dialog: confirmation ---------- */
  var done = el(
    '<dialog class="cm-dialog" id="cmDone" aria-labelledby="cmDoneTitle">' +
      '<div class="cm-dialog-inner cm-done">' +
        '<button class="cm-close" type="button" data-close aria-label="Close">&times;</button>' +
        '<div class="tick" aria-hidden="true"></div>' +
        '<h2 id="cmDoneTitle">Thank you. It’s in.</h2>' +
        '<p data-done-body></p>' +
        '<div class="btn-row mt-2"><button type="button" class="btn btn-solid" data-close>Back to the site</button></div>' +
      "</div>" +
    "</dialog>"
  );

  /* ---------- Dialog: consulting (used until a Tally consulting form ID is set) ---------- */
  var consult = el(
    '<dialog class="cm-dialog" id="cmConsult" aria-labelledby="cmConsultTitle">' +
      '<div class="cm-dialog-inner">' +
        '<button class="cm-close" type="button" data-close aria-label="Close">&times;</button>' +
        '<p class="kicker">Consulting</p>' +
        '<h2 id="cmConsultTitle">Discuss a consulting engagement</h2>' +
        '<p class="sub">A few details so our first conversation starts in the right place.</p>' +
        '<div class="cm-pill" data-focus-pill hidden><span data-focus-label></span><button type="button" data-clear-focus>Change</button></div>' +
        '<form novalidate data-consult-form>' +
          '<input type="hidden" name="focus" />' +
          '<div class="cm-field"><label for="cq-prop">The property or concept</label>' +
            '<input id="cq-prop" name="property" required placeholder="e.g. 60-seat restaurant in a boutique hotel" /></div>' +
          '<div class="cm-row">' +
            '<div class="cm-field"><label for="cq-stage">Project stage</label>' +
              '<select id="cq-stage" name="stage" required>' +
                '<option value="">Choose one</option>' +
                "<option>Concept or pre-opening</option>" +
                "<option>Opening within six months</option>" +
                "<option>Open and operating</option>" +
                "<option>Repositioning or turnaround</option>" +
              "</select></div>" +
            '<div class="cm-field"><label for="cq-timing">Timing</label>' +
              '<select id="cq-timing" name="timing" required>' +
                '<option value="">Choose one</option>' +
                "<option>As soon as possible</option>" +
                "<option>Within three months</option>" +
                "<option>Three to six months out</option>" +
                "<option>Six months or more</option>" +
                "<option>Just exploring</option>" +
              "</select></div>" +
          "</div>" +
          '<div class="cm-field"><label for="cq-priority">Your main priority right now</label>' +
            '<textarea id="cq-priority" name="priority" required placeholder="What has to go right, or what keeps going wrong?"></textarea></div>' +
          '<div class="cm-row">' +
            '<div class="cm-field"><label for="cq-name">Your name</label><input id="cq-name" name="name" autocomplete="name" required /></div>' +
            '<div class="cm-field"><label for="cq-role">Your role <span class="opt">(optional)</span></label><input id="cq-role" name="role" placeholder="Owner, GM, asset manager" /></div>' +
          "</div>" +
          '<div class="cm-row">' +
            '<div class="cm-field"><label for="cq-email">Email</label><input id="cq-email" name="email" type="email" autocomplete="email" required /></div>' +
            '<div class="cm-field"><label for="cq-phone">Phone <span class="opt">(optional)</span></label><input id="cq-phone" name="phone" type="tel" autocomplete="tel" /></div>' +
          "</div>" +
          '<p class="cm-error" data-error hidden>Please fill in the highlighted fields.</p>' +
          '<div class="btn-row mt-1"><button type="submit" class="btn btn-solid">Send to Charlie</button></div>' +
          '<p class="inq-meta mt-1">This opens an email to Charlie with your answers filled in. Or call or text <a href="tel:' + CONTACT_TEL + '">' + CONTACT_PHONE + "</a>.</p>" +
        "</form>" +
      "</div>" +
    "</dialog>"
  );

  document.body.appendChild(chooser);
  document.body.appendChild(done);
  document.body.appendChild(consult);
  [chooser, done, consult].forEach(wireClose);

  function showDone(kind) {
    var body = done.querySelector("[data-done-body]");
    body.textContent = kind === "consulting"
      ? "I read every consulting inquiry myself. Expect a reply within two business days to set up a first conversation."
      : "I read every inquiry myself and reply within a day or two with a few questions and a sense of what your event would take.";
    openDialog(done);
  }

  /* ---------- Open a Tally form with the visitor's selection carried in ---------- */
  function openTally(kind, fields) {
    var id = FORMS[kind];
    var hidden = {
      inquiry_type: kind === "consulting" ? "Consulting" : "Event",
      source_page: location.pathname || "/",
      source_cta: fields.cta || ""
    };
    if (fields.eventType) hidden.event_type = fields.eventType;
    if (fields.focus) hidden.focus = fields.focus;

    track(kind + "_inquiry_started", { inquiry_type: hidden.inquiry_type, event_type: hidden.event_type || "", focus: hidden.focus || "", source_page: hidden.source_page });

    if (window.Tally && typeof window.Tally.openPopup === "function") {
      window.Tally.openPopup(id, {
        layout: "modal",
        width: 720,
        overlay: true,
        hiddenFields: hidden,
        onSubmit: function () {
          track(kind + "_inquiry_submitted", { inquiry_type: hidden.inquiry_type, event_type: hidden.event_type || "", focus: hidden.focus || "", source_page: hidden.source_page });
          setTimeout(function () {
            try { window.Tally.closePopup(id); } catch (e) {}
            showDone(kind);
          }, 1400);
        }
      });
    } else {
      // Tally script blocked or still loading: open the hosted form instead.
      var qs = Object.keys(hidden).map(function (k) { return encodeURIComponent(k) + "=" + encodeURIComponent(hidden[k]); }).join("&");
      window.open("https://tally.so/r/" + id + "?" + qs, "_blank", "noopener");
    }
  }

  /* ---------- Entry points ---------- */
  function startEvent(eventType, cta) {
    if (eventType) { openTally("event", { eventType: eventType, cta: cta }); return; }
    chooser.dataset.cta = cta || "";
    openDialog(chooser);
    track("event_chooser_opened", { source_page: location.pathname || "/" });
  }

  function startConsulting(focus, cta) {
    if (FORMS.consulting) { openTally("consulting", { focus: focus, cta: cta }); return; }
    var form = consult.querySelector("form");
    form.elements.focus.value = focus || "";
    var pill = consult.querySelector("[data-focus-pill]");
    pill.hidden = !focus;
    consult.querySelector("[data-focus-label]").textContent = focus ? "Interested in: " + focus : "";
    openDialog(consult);
    track("consulting_inquiry_started", { inquiry_type: "Consulting", focus: focus || "", source_page: location.pathname || "/" });
  }
  window.cmInquiry = { event: startEvent, consulting: startConsulting };

  chooser.addEventListener("click", function (e) {
    var b = e.target.closest("[data-pick]");
    if (!b) return;
    var cta = chooser.dataset.cta;
    closeDialog(chooser);
    openTally("event", { eventType: b.getAttribute("data-pick"), cta: cta });
  });

  consult.querySelector("[data-clear-focus]").addEventListener("click", function () {
    consult.querySelector("form").elements.focus.value = "";
    consult.querySelector("[data-focus-pill]").hidden = true;
  });

  consult.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target, err = f.querySelector("[data-error]");
    var bad = Array.prototype.filter.call(f.querySelectorAll("[required]"), function (i) { return !i.checkValidity(); });
    Array.prototype.forEach.call(f.querySelectorAll("[aria-invalid]"), function (i) { i.removeAttribute("aria-invalid"); });
    if (bad.length) {
      bad.forEach(function (i) { i.setAttribute("aria-invalid", "true"); i.style.borderColor = "#8a2d1c"; });
      err.hidden = false; bad[0].focus(); return;
    }
    err.hidden = true;
    var v = function (n) { return (f.elements[n].value || "").trim(); };
    var lines = [
      "Consulting inquiry from crystallinemgmt.com",
      "",
      v("focus") ? "Interested in: " + v("focus") : null,
      "Property or concept: " + v("property"),
      "Project stage: " + v("stage"),
      "Timing: " + v("timing"),
      "",
      "Main priority:",
      v("priority"),
      "",
      v("name") + (v("role") ? ", " + v("role") : ""),
      v("email"),
      v("phone") || null
    ].filter(function (x) { return x !== null; });
    var href = "mailto:" + CONTACT_EMAIL +
      "?subject=" + encodeURIComponent("Consulting inquiry: " + v("property")) +
      "&body=" + encodeURIComponent(lines.join("\n"));
    track("consulting_inquiry_email_drafted", { focus: v("focus"), stage: v("stage"), source_page: location.pathname || "/" });
    window.location.href = href;
    var inner = consult.querySelector(".cm-dialog-inner");
    inner.innerHTML =
      '<button class="cm-close" type="button" data-close aria-label="Close">&times;</button>' +
      '<div class="cm-done"><div class="tick" aria-hidden="true"></div>' +
      '<h2>One last step: press send.</h2>' +
      "<p>Your email app should have opened with everything filled in. Once you send it, it comes straight to me and I’ll reply within two business days.</p>" +
      '<p>If nothing opened, email <a href="mailto:' + CONTACT_EMAIL + '">' + CONTACT_EMAIL + '</a> or call or text <a href="tel:' + CONTACT_TEL + '">' + CONTACT_PHONE + "</a>.</p>" +
      '<div class="btn-row mt-2"><button type="button" class="btn btn-solid" data-close>Back to the site</button></div></div>';
  });

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-inquiry]");
    if (!t) return;
    e.preventDefault();
    var cta = t.getAttribute("data-cta") || (t.textContent || "").trim().slice(0, 60);
    if (t.getAttribute("data-inquiry") === "consulting") startConsulting(t.getAttribute("data-focus"), cta);
    else startEvent(t.getAttribute("data-event-type"), cta);
  });

  /* Shareable deep links: /#plan-an-event and /#discuss-consulting */
  function fromHash() {
    if (location.hash === "#plan-an-event") startEvent(null, "deep link");
    else if (location.hash === "#discuss-consulting") startConsulting(null, "deep link");
  }
  window.addEventListener("hashchange", fromHash);
  if (location.hash) setTimeout(fromHash, 300);
})();

/* ============================================================
   Crystalline Management — script.js  (vanilla, no frameworks)
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Current year in footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky header shadow on scroll ---------- */
  var header = document.getElementById("siteHeader");
  var onScroll = function () {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("navMenu");
  if (toggle && menu) {
    var setOpen = function (open) {
      menu.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    // Close after tapping a link
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") setOpen(false);
    });
    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealItems.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealItems.forEach(function (el) { io.observe(el); });
  } else {
    revealItems.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Graceful image placeholders ----------
     If a photo in /images/ is missing, swap the <img> for a styled
     placeholder labelled with its intended caption. Drop the real
     files into /images/ and the site uses them automatically.       */
  function swapToPlaceholder(img) {
    if (!img || !img.parentNode || img.dataset.phDone) return;
    img.dataset.phDone = "1";
    var ph = document.createElement("div");
    ph.className = "img-ph";
    if (img.closest(".exp-media")) ph.classList.add("exp-media");
    ph.setAttribute("data-label", img.getAttribute("data-ph") || "Image");
    ph.setAttribute("role", "img");
    ph.setAttribute("aria-label", img.getAttribute("alt") || "Image placeholder");
    img.parentNode.replaceChild(ph, img);
  }

  function checkImages() {
    document.querySelectorAll("img[data-ph]").forEach(function (img) {
      if (img.complete && img.naturalWidth === 0) swapToPlaceholder(img);
    });
  }

  document.querySelectorAll("img[data-ph]").forEach(function (img) {
    img.addEventListener("error", function () { swapToPlaceholder(img); });
  });
  // Run once images have settled (load), plus a fallback for cached failures.
  window.addEventListener("load", checkImages);
  checkImages();
  setTimeout(checkImages, 600);

  /* ---------- Formspree submission (AJAX, no page reload) ----------
     Forms POST to the action URL you set in index.html. Replace the
     two placeholder IDs (YOUR_WAITLIST_FORM_ID / YOUR_CONTACT_FORM_ID)
     with your real Formspree endpoints.                              */
  document.querySelectorAll("form.form").forEach(function (form) {
    var status = form.querySelector(".form-status");
    var submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Basic required-field check
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Guard against an un-configured endpoint
      if (form.action.indexOf("YOUR_") !== -1) {
        setStatus("Add your Formspree endpoint in index.html to enable this form.", "is-error");
        return;
      }

      var original = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Sending…"; }
      setStatus("", "");

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            setStatus("Thank you — your message is in. I’ll be in touch shortly.", "is-ok");
          } else {
            return res.json().then(function (data) {
              var msg = data && data.errors
                ? data.errors.map(function (er) { return er.message; }).join(", ")
                : "Something went wrong. Please try again.";
              setStatus(msg, "is-error");
            });
          }
        })
        .catch(function () {
          setStatus("Network error. Please try again in a moment.", "is-error");
        })
        .finally(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = original; }
        });
    });

    function setStatus(msg, cls) {
      if (!status) return;
      status.textContent = msg;
      status.className = "form-status field-full " + (cls || "");
    }
  });
})();

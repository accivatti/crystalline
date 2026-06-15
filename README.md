# Crystalline Management — Website

Static site for **Charles Accivatti / Crystalline Management** (Buffalo, NY).
Built with plain HTML, CSS, and vanilla JavaScript — no frameworks, no build step.

```
crystalline-management/
├── index.html        ← all page content + SEO + structured data
├── styles.css        ← full design system
├── script.js         ← nav, scroll reveal, image fallbacks, forms
├── README.md         ← this file
└── images/           ← your photos (already installed & web-optimized)
    ├── hero.jpg            ← hero banner (pasta + wine)
    ├── chef.jpg           ← Charles tossing dough (About)
    ├── ravioli.jpg        ← Ravioli Nights card
    ├── linguine.jpg       ← Private Dinners card
    ├── oven.jpg           ← Chef's Table card
    ├── spread.jpg         ← Special Events card
    ├── og-cover.jpg       ← social-share preview (1200×630)
    └── g-*.jpg            ← the six gallery photos
```

Your photos are placed, renamed, and compressed for fast loading (progressive
JPEG, ~80–300 KB each). Eleven are used on the page; four extras
(`g-dessert.jpg`, `g-mushroom-pizza.jpg`, `g-pepperoni.jpg`, `g-meatball.jpg`)
are kept in `/images` but left off the page — drop any of them into the gallery
in `index.html` if you want them later. To swap an image, replace the file with
one of the same name. If an image is ever missing, the site falls back to a
tasteful labelled placeholder automatically.

---

## 1. Two things to set before going live

**A. Forms (Formspree)**
1. Create a free account at https://formspree.io and add two forms.
2. Each form gives you an endpoint like `https://formspree.io/f/abcdwxyz`.
3. In `index.html`, replace:
   - `YOUR_WAITLIST_FORM_ID` (Dinner List form)
   - `YOUR_CONTACT_FORM_ID` (Contact form)

**B. Instagram + email**
- Replace `YOUR_INSTAGRAM_HANDLE` (appears in the footer and structured data).
- Update `hello@crystallinemgmt.com` if you want a different address.

---

## 2. Deploy to Cloudflare Pages (recommended) — zero experience needed

1. Create a free GitHub account at https://github.com → **New repository** →
   name it `crystalline-management` → **Create**.
2. On the repo page, click **uploading an existing file** and drag in
   `index.html`, `styles.css`, `script.js`, and the `images` folder. **Commit**.
3. Go to https://dash.cloudflare.com → **Workers & Pages** → **Create** →
   **Pages** → **Connect to Git** → pick your repo.
4. Build settings: **Framework preset = None**, leave build command **empty**,
   **Output directory = /** (root). Click **Save and Deploy**.
5. You’ll get a live URL like `crystalline-management.pages.dev` in ~1 minute.

### Connect crystallinemgmt.com
1. In your Pages project → **Custom domains** → **Set up a domain** →
   enter `crystallinemgmt.com`.
2. If your domain is on Cloudflare, DNS is added automatically. If it’s
   registered elsewhere, Cloudflare shows the exact DNS records to paste into
   your registrar. Add `www` the same way and set it to redirect to the root.
3. HTTPS is issued automatically — no extra step.

**Updating later:** edit a file on GitHub (or re-upload it) and Cloudflare
redeploys within a minute.

---

## Alternatives

- **Netlify:** drag the whole folder onto https://app.netlify.com/drop — instant
  deploy, then add the custom domain under Site settings → Domain management.
- **GitHub Pages:** repo → Settings → Pages → Source = `main` / root → Save.

---

## 3. Suggested future upgrades

- **Private dinner reservations** — Tock, Resy, or a Calendly-style booking embed.
- **Event ticket sales** — Eventbrite or Stripe Payment Links for ticketed dinners.
- **CRM** — pipe Formspree submissions into HubSpot (free tier) or Airtable via Zapier.
- **Newsletter** — Mailchimp / Buttondown signup wired to the Dinner List form.
- **Photo gallery CMS** — Cloudinary or a headless CMS (Sanity/Contentful) so photos
  can be updated without touching code.
- **Analytics** — Cloudflare Web Analytics (privacy-friendly, one snippet).

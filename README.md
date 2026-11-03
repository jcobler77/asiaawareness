# Asia Awareness Conference 2027 · Landing Page

A single-page landing site for the **Asia Awareness Conference**, *Together on Mission*, hosted by
Living Water Foursquare Church (Olympia, WA) with Foursquare Missions International (FMI) Asia,
April 2027.

Plain HTML, CSS and vanilla JS. No framework, no build step, no external libraries or web fonts.

```
.
├── index.html      page markup + inline critical CSS + all meta tags
├── styles.css      design tokens (:root) and all styles
├── script.js       mobile menu, sticky Register bar, focus handling, footer year
├── README.md       this file
└── assets/
    ├── favicon.svg                         PLACEHOLDER
    ├── og-image.png                        PLACEHOLDER (1200×630 share image)
    ├── logo-living-water-placeholder.svg   PLACEHOLDER
    ├── logo-fmi-asia-placeholder.svg       PLACEHOLDER
    └── speaker-placeholder.svg             PLACEHOLDER
```

## Preview locally

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

## Publish (GitHub Pages)

`.github/workflows/deploy.yml` publishes the site on every push to `main`.

One-time setup:

1. In GitHub, go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.

The next push (or **Actions → Deploy to GitHub Pages → Run workflow**) publishes to
`https://jcobler77.github.io/asiaawareness/`.

### Custom domain (later)

1. At your DNS provider, add a **CNAME** record for the subdomain (e.g. `asia`) pointing to
   `jcobler77.github.io`, or GitHub's four **A** records for an apex domain.
2. In **Settings → Pages → Custom domain**, enter the domain, wait for the DNS check, then tick
   **Enforce HTTPS**.
3. Update the canonical, `og:url`, `og:image` and `twitter:image` URLs in `index.html` to the new domain.

## Dropping it into the Living Water website

Copy the site files (everything except `.github/` and this README) into a folder on the site. All paths are relative, so it works
at any URL. The page sets its own global styles (`body`, headings, links). If you embed it inside
an existing site template instead of serving it as a standalone page, check for style collisions
with the site's CSS.

## Swapping in the brand

All colors, type, spacing and radii are CSS custom properties at the top of `styles.css`.
The current values are neutral placeholders.

**One catch:** `index.html` has a small inline critical-CSS block in `<head>` so the header and hero
render before `styles.css` loads. It repeats the tokens marked `[critical]` in `styles.css`. When
you change those colors (or the font stack), update the `:root` line in the inline `<style>` block too.

If the brand uses a web font, add it in `<head>` and set `--font-sans` / `--font-display` (and the
inline `--font-sans`).

Current placeholder palette, all checked against WCAG 2.1 AA:

| Token | Value | Contrast |
|---|---|---|
| `--color-text` on `--color-bg` | #1d2327 / #fff | 15.9:1 |
| `--color-text-muted` on `--color-surface` | #4b545c / #f4f5f6 | 7.1:1 |
| `--color-primary` on white (and white on primary) | #2f4858 | 9.6:1 |
| `--color-accent` on `--color-accent-soft` | #8c5a1e / #f3ebe0 | 4.9:1 |
| `--color-on-dark-muted` on `--color-dark` | #cfd7dd / #1f2b33 | 9.9:1 |

Re-check contrast whenever you change these.

---

## Placeholder checklist

Everything below needs real content before launch. Search the files for `PLACEHOLDER`,
`example.org`, `.example`, `[` and `TBD` to find them.

### Event details (`index.html`)
- [ ] **Dates:** hero reads `April [X–Y], 2027`. Schedule day headers read `April [X]`, `April [X+1]`, `April [Y]`.
- [ ] **Schedule times:** 5:30 PM, 7:00 PM, 9:00 AM, 12:00 PM, 2:00 PM are draft guesses. The "Draft schedule, subject to change" badge stays until final.
- [ ] **Session descriptions** in the schedule ("Worship, welcome and vision for Asia", breakouts, commissioning, etc.).
- [ ] **Church street address and ZIP** (Lodging & Travel › Directions & parking).
- [ ] **Parking details** (lot, overflow, accessible parking).
- [ ] **Google Maps link:** currently a search query. Swap for the exact place link if you like.

### Registration
- [ ] **Full Conference price:** shows `$TBD` (card and FAQ "How much does it cost?").
- [ ] **Planning Center URL, Full Conference:** `https://PLANNING-CENTER-URL.example/full`
- [ ] **Planning Center URL, Evening Sessions:** `https://PLANNING-CENTER-URL.example/evening`
- [ ] **Confirm Evening pricing wording:** "$20 with meal, registered in advance · or $5 at the door (session only)". Confirm whether $20 is per evening or covers both evenings, and whether the evening tier includes both Monday and Tuesday nights.
- [ ] **Full Conference inclusions:** "Conference materials" is assumed; confirm.
- [ ] **Host-home request:** copy says to request one "when you register". Make sure the Planning Center form asks.

### Speakers & Stories (6 cards)
- [ ] For each card: photo (square, ~800×800, in `assets/`), name, role/title, nation.
- [ ] Update each `alt` from "Photo coming soon" to a description, e.g. `alt="Portrait of Jane Doe"`.

### Lodging & Travel
- [ ] **Hotels 1–5:** name, distance from church, group rate (if any), booking URL (`https://HOTEL-n-BOOKING.example`). Remove a row if you only need four.
- [ ] **Lunch options:** four `[Restaurant n] · [cuisine], [X] min` lines.

### Footer & contact
- [ ] **Contact email:** `EMAIL@example.org` (appears in footer, registration footnote, host-home callout and FAQ).
- [ ] **Living Water Foursquare logo:** replace `assets/logo-living-water-placeholder.svg` (works best as white/light art on the dark footer).
- [ ] **FMI Asia logo:** replace `assets/logo-fmi-asia-placeholder.svg`.
- [ ] **Social URLs:** Facebook, Instagram, YouTube (`…/PLACEHOLDER`). Update the `aria-label`s if the accounts belong to FMI or the conference.
- [ ] **Partner links:** currently https://www.asiapacificmissions.org and https://www.foursquaremissions.org. Confirm these are the links you want.

### Meta, sharing & icons (`<head>`)
- [ ] **Canonical / `og:url`:** currently `https://jcobler77.github.io/asiaawareness/`. Change it to the custom domain once it is live.
- [ ] **`og:image` / `twitter:image`:** absolute URL to the final share image. Replace `assets/og-image.png` (1200×630) with a designed image.
- [ ] **Favicon:** replace `assets/favicon.svg` (and add PNG / apple-touch-icon sizes if wanted).
- [ ] **`theme-color`:** set to the final dark brand color.

### Copy to review
- [ ] **Why Asia paragraphs:** confirm the claims and wording (India's unreached people groups, the Khmer among the 100 largest unreached people groups, Philippines and the global Foursquare family as senders).
- [ ] **Who It's For cards, FAQ answers, hero eyebrow** ("Living Water Foursquare & FMI Asia present").

---

## Accessibility & performance notes

- Semantic landmarks (`header`, `nav`, `main`, `footer`), one `h1`, and `h2` → `h3` → `h4` in order.
- Skip link, visible focus rings (yellow on dark bands, blue on light), 44px+ touch targets.
- FAQ uses native `<details>`/`<summary>`: keyboard and screen-reader friendly with no JS.
- Mobile menu has `aria-expanded`/`aria-controls` and closes on Escape. Without JS the nav simply stays visible.
- The sticky mobile Register bar hides while the hero buttons or the registration section are on screen, so it never covers the real buttons.
- Respects `prefers-reduced-motion`.
- Critical CSS is inline; `styles.css` loads without blocking render; images use `loading="lazy"` with explicit width/height; no third-party scripts or fonts.

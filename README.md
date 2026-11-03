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
    ├── brand/                              logos, favicons (final)
    ├── og-image.png                        share image (1200×630)
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

## Brand

The page uses the Asia Awareness Conference brand tokens v1.0 ("Together on Mission").

- **Tokens:** the brand palette (`--aac-*`) and the page's design tokens live in `:root` at the top of `styles.css`.
- **Fonts:** Bricolage Grotesque (headings) and Source Sans 3 (body) load from Google Fonts in `<head>`, without blocking the first paint. If they fail to load, system fonts take over.
- **Logos and icons:** in `assets/brand/`.
  - `aac-horizontal-reversed.svg`: header.
  - `aac-mark-reversed.svg`: large mark in the desktop hero.
  - `aac-stacked-reversed.svg`: footer.
  - `aac-app-icon.svg`, `favicon-64.png` and `aac-app-icon-180.png`: favicons.
- **Share image:** `assets/og-image.png` is the stacked logo on evergreen, 1200×630.

**One catch:** `index.html` has a small inline critical-CSS block in `<head>` so the header and hero
render before `styles.css` loads. It repeats the tokens marked `[critical]` in `styles.css`. If brand
colors or fonts change, update the `:root` line in the inline `<style>` block too.

Brand contrast rules the stylesheet follows:

| Pairing | Ratio | Use |
|---|---|---|
| Ink on linen | 14.6:1 | body text |
| Evergreen on linen | 8.7:1 | headings |
| Stone on linen | 5.8:1 | secondary text |
| Ember-deep on linen | 5.2:1 | links, eyebrows |
| Ink on ember | 6.1:1 | primary buttons |
| Linen / dawn on evergreen | 8.7 / 7.2:1 | text on dark bands |
| Ember on evergreen | 3.7:1 | **large text only** (hero theme line) |
| Evergreen on dawn | 7.2:1 | badges and links on dawn panels (ember-deep on dawn is only 4.3:1, so it isn't used) |

White text on ember (2.6:1) is never used.

## Hero photos

The hero crossfades through four photos every 7 seconds, on a layer fixed behind the whole page.
The photos stay behind the content as you scroll and darken as you move past the hero: the shade
goes up to 60%, controlled by `MAX_SHADE` in `script.js`. It reaches full strength before the second
section scrolls into view. On phones, the photo also zooms out of its top window to fill the screen.

The content sections are translucent dark-green panels with light text, so about a fifth of the
photo shows through:
- `--color-panel` is 40% and `--color-panel-alt` is 50%.
- The first section uses the heavier `--color-panel-solo` (82%), because it is on screen while the
  shade is still ramping up. Pages without JavaScript use it for every section.

These numbers are tuned together to pass AA contrast even over a white photo. If you change
`MAX_SHADE` or the panel opacities, re-check contrast (the math is in the comments in `styles.css`).
White cards inside the sections switch back to the dark-on-light scheme. There is a pause/play button in the corner. The slideshow starts paused for people who set "reduce
motion", and it stops while the tab is hidden or the hero is scrolled out of view.

| File (`assets/photos/`) | Source |
|---|---|
| `hero-1-*` | Living Water partnership photo (Cambodia Vision site) |
| `hero-2-*` | supplied, **confirm license** |
| `hero-3-540` | supplied, **confirm license**; only 540px wide, so it looks soft on large screens |
| `hero-4-*` | supplied, **confirm license** |

The slideshow deliberately shows no place names, in the captions or the alt text.

**To add, remove or reorder a photo:** in `index.html`, each photo is a `<figure class="hero-slide">`
inside `.hero-slides`.
- Set the crop focus with `style="--pos: X% Y%"`.
- Write real `alt` text.
- Only the first slide should have `class="... is-active"` and `fetchpriority="high"`. The rest use `loading="lazy"`.

Export photos at about 1600px wide, as JPG and WebP, around 100–300 KB each.

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
- [ ] **Living Water Foursquare logo:** replace `assets/logo-living-water-placeholder.svg`. Use light/white art, because it sits on the evergreen footer. (The brand kit only had conference logos.)
- [ ] **FMI Asia logo:** replace `assets/logo-fmi-asia-placeholder.svg`.
- [ ] **Social URLs:** Facebook, Instagram, YouTube (`…/PLACEHOLDER`). Update the `aria-label`s if the accounts belong to FMI or the conference.
- [ ] **Partner links:** currently https://www.asiapacificmissions.org and https://www.foursquaremissions.org. Confirm these are the links you want.

### Meta, sharing & icons (`<head>`)
- [ ] **Canonical / `og:url`:** currently `https://jcobler77.github.io/asiaawareness/`. Change it to the custom domain once it is live.
- [ ] **`og:image` / `twitter:image`:** update to the custom domain when it is live. (The image itself is final.)

### Photos
- [ ] **Hero photo licenses and credits:** confirm each supplied photo is licensed for web use, and add a credit line if its license requires one.
- [ ] **Replace `hero-3` with a larger version** (at least 1600px wide) if you can find one.
- [ ] **Permission:** confirm you have permission to feature the photo of children (flower crowns).

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

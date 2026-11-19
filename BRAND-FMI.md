# FMI brand rules for this site

Summary of the **Foursquare Missions International Brand Guidelines (2020)**, provided by Foursquare,
and how this site applies them. Follow these for any future change to the site.

## Logo

- **Primary logo:** green globe (`#8BA003`) with "FMI" and "FOURSQUARE MISSIONS INTERNATIONAL" in gray
  (`#58595B`).
- **Alternate globe colors** are allowed: sky blue, gold, navy or coral. The wordmark always stays
  gray.
- **Black or white:**
  - one-color black on light backgrounds;
  - one-color **white on dark backgrounds or over photos**.
- **Formats:**
  - horizontal: globe + FMI + the full name;
  - horizontal short: globe + FMI;
  - vertical: globe over FMI, with or without the full name under a rule.
- **Do not** recolor the wordmark, stretch the logo, or put the full-color logo on a busy or dark
  background. Use the white version there.
- **Files on this site:**
  - `assets/brand/fmi-logo-white.png`, used in the footer, which is dark navy.
  - `assets/brand/fmi-logo-color.png`, for light backgrounds.

  Both were taken from FMI's own regions-map artwork. Swap them for official logo files from FMI if
  you get them.

## Color palette (from the guide)

| Name | HEX | RGB | Used on this site for |
|---|---|---|---|
| Green (primary) | `#8BA003` | 139, 160, 3 | primary buttons (dark text), decorative rules, eyebrow bars |
| Gold | `#EAB450` | 234, 180, 80 | hero theme line (large text on navy), button hover, focus ring on dark |
| Sky blue | `#5683AA` | 86, 131, 170 | focus ring on light |
| Navy | `#415B8B` | 65, 91, 139 | header, hero, footer, schedule headers, headings and links on white, photo overlays |
| Coral | `#DD746E` | 221, 116, 110 | sparing accent only |
| Gray | `#58595B` | 88, 89, 91 | body text on white |

**Derived for web contrast** (not in the guide; built from the palette):
- deep navy `#1B2944`: the photo shade;
- gold-light `#F8E3B8`: muted text on navy;
- gold-soft `#FBEBC9`: badges and icon chips.

**Contrast rules (WCAG AA):**
- Never put white text on green (2.9:1) or on gold.
- Use dark ink (`#1F2326`) on green (5.4:1) and on gold (8.4:1).
- Gold as text on navy only at large sizes (3.6:1).
- Green is never used as text.

## Typography

| Role | FMI font | Free web stand-in used here |
|---|---|---|
| Display (headlines) | **Recoleta Alt**: Bold, SemiBold, Medium | **Fraunces** 500–700 (Google Fonts) |
| Content (body, labels) | **Gotham**: Bold, Medium, Book, Light (+ italics) | **Montserrat** 400–700 (Google Fonts) |

Recoleta Alt and Gotham are licensed fonts. If Living Water or FMI has web licenses for them, add
the font files and put them first in `--font-display` and `--font-sans` in `styles.css` (and in the
inline critical CSS in `index.html`).

**Style seen in FMI samples:**
- serif headlines in sentence case ("Bring God's Love to the Nations");
- small spaced-out caps for labels ("FMI GLOBAL OPPORTUNITIES");
- gold headline on navy;
- navy subheads on green.

## Photography and layout (from the samples)

- **Photos:** people and places in the nations, warm and dignified.
- **Logo placement:** white logo directly on a photo.
- **Navy overlay:** a navy duotone/overlay on a photo with white type. This site uses that for the
  hero photos and the see-through navy sections.
- **Color blocks:**
  - photo above a solid navy or green block that holds the logo and text;
  - solid green header block with a serif headline over a photo.

## Regions map

`assets/photos/fmi-asia-map-*` is the Asia portion of **FMI_GlobalRegionsMap** (North Asia, South Asia,
Southeast Asia + South Pacific), cropped from FMI's map with its edges softened. Credit FMI when it is
shown.

## Conference logo (alongside FMI)

The conference has its own logo: "See. Love. Reach. ASIA Awareness Conference", with an Asia map, in
teal, olive gray and gold on beige. The files are in `assets/brand/conference-logo-*`.
- **On FMI navy:** the site uses the white version, following FMI's own rule for logos on dark
  backgrounds.
- **On light backgrounds:** use the full-color version.
- **The tagline is always "See. Love. Reach."** with periods.

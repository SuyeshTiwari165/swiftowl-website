---
name: SwiftOwl
description: A private, company-knowledge-grounded AI workspace, visualized as a vault that lets out exactly one warm, lit passage at a time — restrained navy-and-white surfaces, one decisive indigo signal color, and a slow atmospheric gradient mesh standing in for every other kind of depth.
colors:
  primary: "#533afd"
  primary-deep: "#4434d4"
  primary-press: "#2e2b8c"
  primary-soft: "#665efd"
  primary-subdued: "#b9b9f9"
  primary-tint: "#efeeff"
  tag-bg: "#dfdefd"
  navy: "#1c1e54"
  ink: "#0d253d"
  ink-2: "#273951"
  ink-mute: "#64748d"
  canvas: "#ffffff"
  soft: "#f6f9fc"
  cream: "#f5e9d4"
  hairline: "#e3e8ee"
  hairline-input: "#a8c3de"
  ruby: "#ea2261"
  magenta: "#f96bee"
  sherbet: "#ffab72"
  lemon: "#9b6829"
typography:
  display:
    fontFamily: "Inter, 'SF Pro Display', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(36px, 5.4vw, 56px)"
    fontWeight: 300
    lineHeight: 1.03
    letterSpacing: "-0.025em"
    fontFeature: ss01
  headline:
    fontFamily: "Inter, 'SF Pro Display', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(30px, 4.2vw, 48px)"
    fontWeight: 300
    lineHeight: 1.12
    letterSpacing: "-0.02em"
    fontFeature: ss01
  title:
    fontFamily: "Inter, 'SF Pro Display', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "22px"
    fontWeight: 300
    lineHeight: 1.15
    letterSpacing: "-0.01em"
    fontFeature: ss01
  lede:
    fontFamily: "Inter, 'SF Pro Display', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(17px, 1.5vw, 20px)"
    fontWeight: 300
    lineHeight: 1.45
    letterSpacing: "normal"
    fontFeature: ss01
  body:
    fontFamily: "Inter, 'SF Pro Display', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "16px"
    fontWeight: 300
    lineHeight: 1.5
    letterSpacing: "normal"
    fontFeature: ss01
  label:
    fontFamily: "Inter, 'SF Pro Display', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.1px"
    fontFeature: ss01
  button:
    fontFamily: "Inter, 'SF Pro Display', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "normal"
    fontFeature: ss01
  mono:
    fontFamily: "ui-monospace, 'SF Mono', SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "normal"
  tabular:
    fontFamily: "Inter, 'SF Pro Display', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "14px"
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: "-0.02em"
    fontFeature: tnum
rounded:
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  xxl: "32px"
  gutter: "clamp(20px, 4vw, 32px)"
  section: "clamp(64px, 8vw, 96px)"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "9px 18px"
    height: "40px"
  button-primary-hover:
    backgroundColor: "{colors.primary-deep}"
    textColor: "#ffffff"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "9px 18px"
  button-primary-press:
    backgroundColor: "{colors.primary-press}"
    textColor: "#ffffff"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "9px 18px"
  button-ghost:
    backgroundColor: "#ffffff"
    textColor: "{colors.primary}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "9px 18px"
    height: "40px"
  button-ghost-hover:
    backgroundColor: "{colors.primary-tint}"
    textColor: "{colors.primary-deep}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "9px 18px"
  button-light:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "9px 18px"
    height: "40px"
  tag-eyebrow:
    backgroundColor: "{colors.tag-bg}"
    textColor: "{colors.primary-deep}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  card-feature:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "32px"
  card-elevated:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.xl}"
    padding: "clamp(24px, 3.5vw, 36px)"
  input-text:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
    height: "40px"
  nav-link:
    textColor: "{colors.ink-2}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  panel-product-dark:
    backgroundColor: "{colors.ink}"
    textColor: "#ffffff"
    typography: "{typography.body}"
    rounded: "{rounded.xl}"
    padding: "clamp(18px, 3vw, 28px)"
  panel-featured-dark:
    backgroundColor: "{colors.navy}"
    textColor: "#ffffff"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: SwiftOwl

## Overview

**Creative North Star: "The Vault and the Passage"**

Everything SwiftOwl holds stays in the vault — the full document library, every raw identifier, every surface that isn't actively proving something. Navy and white are the vault's walls: plain, unornamented, nearly flat. The one thing ever let out is a single warm, lit passage — the retrieved document excerpt, the one sentence that answers the question — and that passage is the only place warmth (cream) is allowed to appear. The system's entire visual argument is this one gesture, repeated: the hero demo, the Security page's data-flow diagram, and the "Only the passage" headline all dramatize the same idea from a different angle.

That restraint is in service of trust, not coldness. The system is warm and approachable rather than a sterile enterprise-security vendor: soft fully-rounded buttons and tags, generous whitespace, plain-language copy, and a slow-drifting gradient mesh that gives every page a living, unhurried top instead of a hard corporate band. It explicitly rejects two things: the overtly playful violet-and-amber illustrated brand this project replaced, and the cold, jargon-heavy register of a typical B2B security vendor. One color is allowed to ask for a click — Signal Indigo — and it appears sparingly enough that its one appearance per section still reads as a decision, not decoration.

**Key Characteristics:**
- A single, named warm device — the retrieved-passage signal (cream fill + lemon edge) — plus a looser "Warm Parchment" use of plain cream as a general breathing-room interlude between denser sections.
- One indigo CTA color, one filled pill per section; everywhere else the palette recedes to ink, white, or a pale tint.
- Display type never rises above weight 300, with tightening negative tracking as size increases — the system's quiet typographic signature.
- Any number that represents money, a count, or a due date renders in tabular figures (`font-variant-numeric: tabular-nums`).
- Flat-by-default surfaces; the animated SVG gradient mesh is the real depth medium, not box-shadow stacking.
- Two distinct dark fills, never interchanged: ink navy (#0d253d) for "live product" panels (the model's view, the agent screens), and brand navy (#1c1e54) for "featured tier" surfaces (the dark security band, the pricing result panel).

## Colors

A near-monochrome navy-and-white base, one indigo signal color, and a warm cream reserved for the system's one recurring narrative beat.

### Primary
- **Signal Indigo** (`#533afd`): The only color allowed to ask for a click. One filled pill button, one link emphasis, the gradient mesh's anchor hue. `primary-deep` (`#4434d4`) is its hover state, `primary-press` (`#2e2b8c`) its active state, `primary-soft` (`#665efd`) a lighter accent for chart-like highlights (meter fills, agent progress bars). `primary-subdued` (`#b9b9f9`) and `primary-tint` (`#efeeff`) are pale fills for selected/hover states; `tag-bg` (`#dfdefd`) is `primary-subdued` lightened further until indigo text on it clears 4.5:1 contrast — it exists specifically so eyebrow tags and soft pills stay accessible.

### Secondary
- **Warm Parchment** (`#f5e9d4`, cream): The system's one warm surface, doing two related but visually distinct jobs. As a plain fill (`.band-cream`), it opens a breathing-room interlude between denser sections — a CTA band, a feature pause. Paired with its edge color, **lemon** (`#9b6829`), it marks one specific signal instead: the retrieved passage that leaves the library, in the hero demo, the security data-flow diagram, and the `.mark` text-highlighter. Don't invent a third use for either color.
- **Sherbet** (`#ffab72`): A secondary warm accent, used only inside the gradient mesh and as the "hit" tint on a matched document line in the retrieval demo — never as a surface or text color on its own.

### Tertiary
- **Ruby** (`#ea2261`): Reserved for the system's one piece of negative/urgent signal — the "x" mark in comparison tables, a low-value meter fill, form error borders and text. Never a CTA color.
- **Magenta** (`#f96bee`): Gradient-mesh-only. Never appears as a flat fill, text color, or border anywhere in the interface.

### Neutral
- **Canvas** (`#ffffff`): The default page background and the vault's "wall."
- **Soft** (`#f6f9fc`): A barely-cool off-white for alternating section backgrounds and the retrieval demo's document tray — just enough to separate a band from pure white without introducing a new hue.
- **Ink** (`#0d253d`): Default body text color everywhere, and the fill of every "live product" dark panel (see the Named Rule below). Never pure black.
- **Ink Secondary** (`#273951`): Secondary text on white and on the cream bands.
- **Ink Mute** (`#64748d`): Captions, helper text, table labels, footer links.
- **Brand Navy** (`#1c1e54`): The fill of "featured tier" dark surfaces — the Security page's dark band, the pricing calculator's result panel. Distinct from Ink; the two are never used interchangeably.
- **Hairline** (`#e3e8ee`): 1px borders on cards, tables, and dividers. **Hairline Input** (`#a8c3de`): a slightly cooler, slightly stronger hairline reserved for form-field borders so inputs read as interactive without needing a shadow.

### Named Rules
**The One Signal Rule.** Signal Indigo is the only filled CTA color in the system. A page section gets exactly one filled pill button; every other action in that section is a ghost or light-fill button, a plain link, or a secondary pill in a non-primary color.

**The Warm Parchment Rule.** Cream has two jobs and they stay visually separable: a plain fill is a general warm interlude; paired with its lemon edge, it is the retrieved-passage signal specifically. If a cream surface needs to say "this is the passage that left the library," give it the lemon edge. If it's just a breathing-room band, leave the edge off.

## Typography

**Display Font:** Inter (with 'SF Pro Display', system-ui, 'Segoe UI' fallbacks)
**Body Font:** Inter — the same family across every role; the system does not pair a separate display face
**Mono Font:** ui-monospace / SF Mono / Menlo / Consolas, for data labels and demo chrome only

**Character:** One typeface carrying every role, read almost entirely through weight and tracking rather than a display/body contrast pair. Thin (300) display text with tightening negative tracking as it scales up reads as quiet confidence, not timidity; the `ss01` stylistic set is enabled system-wide for a slightly warmer, less mechanical letterform.

### Hierarchy
- **Display** (300, `clamp(36px, 5.4vw, 56px)`, line-height 1.03, tracking -0.025em): Hero headlines and section openers (`.h1`).
- **Headline** (300, `clamp(30px, 4.2vw, 48px)`, line-height 1.12, tracking -0.02em): Section headings (`.h2`).
- **Title** (300, 22px, line-height 1.15, tracking -0.01em): Card titles, agent names, step headings (`.h3`).
- **Lede** (300, `clamp(17px, 1.5vw, 20px)`, line-height 1.45): The one supporting paragraph under a section head; max-width 56ch.
- **Body** (300, 16px, line-height 1.5): Default running text everywhere else.
- **Label** (500, 12px, tracking 0.1px): Eyebrow tags, agent name chips, micro-captions on dark panels.
- **Button** (400, 16px, line-height 1): The one weight in the system heavier than 300 — buttons need the extra confidence of 400 to read as pressable.
- **Tabular** (300, 14px, tracking -0.02em, `tnum`): Any stat, price, percentage, or due date — see the Ledger Digits rule below.

### Named Rules
**The No-Loud-Weight Rule.** Display, headline, and title text never render above weight 300. Weight 400 exists in exactly one place: button labels, where it reads as a deliberate exception, not a rule break.

**The Ledger Digits Rule.** Any number that is money, a count, or a date — pricing figures, stat call-outs, task due-dates, document counts in the retrieval demo — renders with `font-variant-numeric: tabular-nums`. It's the system's quiet financial-infrastructure signal: the vault keeps a ledger, and ledgers don't jitter.

## Layout

A single `1200px` content container (`--wrap`) with a responsive side gutter (`clamp(20px, 4vw, 32px)`). Section vertical rhythm is one shared token, `clamp(64px, 8vw, 96px)` (`--section`), so every marketing section breathes at the same rate regardless of content. Most sections grid into two columns on desktop (roughly 0.85–1.1fr paired with 1.15–0.9fr, favoring whichever side carries the product mockup or interactive demo) and collapse to a single column under 900–1020px, the system's dominant breakpoint band. A sticky top nav (72px) floats over the gradient mesh at the top of every page; the mobile menu becomes a full-height panel under 1100px. Card grids (problem tiles, security cards, job cards) step from 3–4 columns down to 2 and then 1 across 1020px → 560px.

## Elevation & Depth

Flat-by-default; the gradient mesh is the real depth system, not box-shadow stacking. Literal shadows exist at exactly two quiet levels and are reserved for lifting a card or floating panel off the canvas, never for drama. Depth otherwise comes from two other devices: the animated SVG mesh atmosphere at the top of every page, and a hard polarity flip between white/ink-text surfaces and navy/white-text surfaces (the pricing result panel, the agent's "product" screen, the dark security band) that reads as a push into a different layer without any shadow at all.

### Shadow Vocabulary
- **Level 1** (`box-shadow: 0 1px 3px rgba(0, 55, 112, 0.08)`): The default lift for a card at rest on white (`--sh-1`).
- **Level 2** (`box-shadow: 0 8px 24px rgba(0, 55, 112, 0.08), 0 2px 6px rgba(0, 55, 112, 0.04)`): Floating panels and emphasized cards — the hero demo, the pricing calculator, the agent screen (`--sh-2`).

### Named Rules
**The Mesh-Is-Depth Rule.** When a surface needs to feel like it's floating above the page rather than merely sitting on a card, reach for the gradient mesh or a navy/white polarity flip before reaching for a third, heavier shadow level. The system doesn't have one, and shouldn't.

## Shapes

Every interactive control is either fully rounded or gently rounded — there is no sharp-cornered rectangle anywhere in the interface. The pill (`9999px`) is the default for anything clickable: buttons, tags, nav pills, segmented controls, form toggles. Cards and panels use a smaller, consistent radius scale (4 / 6 / 8 / 12 / 16px) that increases with the surface's visual weight — a form input gets the smallest radius (6px), a hero-level product mockup or dark agent panel gets the largest (16px). The gradient mesh itself is the system's one organic, non-geometric shape, deliberately contrasted against the otherwise rectilinear-with-soft-corners grid of cards beneath it.

### Named Rules
**The Pill Rule.** Anything the visitor can click or select — button, tag, nav item, segmented toggle — is either a full pill or, for nav links and table-of-contents entries, a small 6px rounded rectangle. A medium-radius rectangle (8–16px) is reserved for containers, never for a control.

## Components

Buttons, cards, and inputs all lean soft and inviting rather than severe: generous pill rounding, hairline borders instead of heavy strokes, and color transitions with no bounce — confident but never corporate-cold.

### Buttons
- **Shape:** Full pill (`9999px`), minimum 40px tap height (44px under 767px).
- **Primary:** Signal Indigo fill, white text, 400-weight label, `9px 18px` padding. Hover deepens to `primary-deep`; active presses to `primary-press`. An arrow glyph nudges 3px right on hover.
- **Ghost:** White fill, indigo text and 1px indigo border — the default secondary action next to a primary pill.
- **Light:** White fill, ink text — used only on dark/navy backgrounds (the security band, dark CTA sections) where a ghost button's indigo-on-navy border would lose contrast.

### Tags / Eyebrows
- **Style:** `tag-bg` fill, `primary-deep` text, 500-weight label type, full pill, `4px 10px` padding. The system's one recurring "soft announcement" chip, used identically for section eyebrows, agent-name badges, and comparison-table emphasis.

### Cards / Containers
- **Corner style:** 12px for feature/problem/job cards; 16px for anything elevated (forms, the pricing calculator, the ISO card, risk toggle).
- **Background:** White, 1px hairline border, Level 1 shadow at rest (Level 2 for the 16px-radius elevated set).
- **Internal padding:** 32px for feature cards; a responsive `clamp(24px, 3.5vw, 36px)` for elevated cards.
- **Dark panels:** Ink navy for "live product" surfaces (agent screens, the demo's "what the model sees" panel); brand navy for "featured tier" surfaces (the pricing result, the dark security band). The two are never swapped.

### Inputs / Fields
- **Style:** White fill, `hairline-input` 1px border, 6px radius, 40px minimum height.
- **Focus:** Border shifts to Signal Indigo plus a soft 3px indigo glow (`box-shadow: 0 0 0 3px rgba(83, 58, 253, 0.16)`) — no outline, the glow carries the affordance.
- **Error:** Border and helper text switch to Ruby; no icon, text alone carries the state.

### Navigation
- Plain-text links at rest (`ink-2`), a soft gray hover fill, indigo for the active route. The nav bar itself is transparent over the mesh at the top of the page and gains a blurred white background once the page scrolls.

### Signature Component: The Gradient Mesh
A layered, slowly-drifting SVG atmosphere (cream → sherbet → lavender → indigo → ruby → magenta) sitting behind the nav and the top of every page — taller on the home page, shorter on inner pages, a slim band on the legal pages, and flipped to rise from the bottom behind a closing call-to-action. It is SVG with a CSS blur and a two-layer drift animation, never a flat CSS gradient, and it stills completely under `prefers-reduced-motion`. It is the system's one piece of organic, unrepeatable shape and its primary depth device (see Elevation & Depth).

## Do's and Don'ts

### Do:
- **Do** keep Signal Indigo to one filled pill per section — The One Signal Rule.
- **Do** render every money figure, count, or due date with tabular numerals — The Ledger Digits Rule.
- **Do** reach for the gradient mesh or a navy/white polarity flip before adding a third shadow level — The Mesh-Is-Depth Rule.
- **Do** keep ink navy and brand navy as two distinct dark fills for two distinct surface roles (live product vs. featured tier).
- **Do** give the retrieved-passage signal its lemon edge whenever cream is standing in for that specific meaning, not just general warmth.

### Don't:
- **Don't** render display, headline, or title text above weight 300 — button labels are the system's one deliberate exception.
- **Don't** use a sharp-cornered rectangle for anything clickable — The Pill Rule.
- **Don't** use ruby, sherbet, or magenta as a CTA color; ruby is reserved for negative/error signal, sherbet and magenta live only in the mesh.
- **Don't** replace the gradient mesh with a flat CSS `linear-gradient()` — the brand's mesh is explicitly organic SVG, not a flat wash.
- **Don't** stack a third shadow level onto a surface that's already using the mesh or a polarity flip for depth; pick one depth device, not both.

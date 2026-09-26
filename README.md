# Swift Owl marketing website

React + Vite site for swiftowl.ai. Separate from the Flask app in `../code`.

```bash
cd website
npm install
npm run dev      # http://localhost:5180
npm run build    # static output in dist/
```

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home: interactive "only the passage leaves" demo, agents, a scroll-driven day, privacy flow, pricing calculator |
| `/partners` (also `/become-partner`) | Partner program, opportunity calculator, application form |
| `/start-free-trial` | Trial signup form |
| `/book-a-demo` | Contact form with "Book a demo" preselected |
| `/contact` | General contact form |

## Configuration

Copy `.env.example` to `.env.local`:

- `VITE_FORMS_ENDPOINT`: URL that receives every form as a JSON POST (`kind` is `trial`, `demo`, `contact` or `partner`). If it isn't set, forms validate and show success, but nothing is sent (the payload is logged to the console).
- `VITE_APP_URL`: the app's sign-in URL, used by "Sign in" links.

## Deploying

`dist/` is a static single-page app. Configure the host to serve `index.html` for unknown paths (SPA fallback) so deep links like `/partners` work.

## Design notes

The visual language follows a Stripe-inspired system: white canvas, deep navy ink, one electric-indigo CTA colour and a gradient-mesh backdrop. Tokens live at the top of `src/styles.css`.

- **Indigo** (`--primary`) is the only CTA colour: one filled pill per band. Never use it for body text.
- **Navy ink** (`--ink`) is the text colour and the fill of every "product" panel (demo, agent screens, pricing result). `--navy` (brand-dark-900) is used for dark bands and the featured tier.
- **Gradient mesh** (`src/components/Mesh.jsx`) sits behind the nav and top of every page, taller on home, shorter on inner pages, a slim band on the legal pages. It is SVG, not a CSS gradient. `<Mesh variant="cta" flip />` closes pages that end on a call to action.
- **Cream + lemon** (`--cream`, `--lemon`) carry one meaning only: "the passage that leaves your library" (the demo passage, the highlighted document, the passage step in the data-flow diagram). Cream is also used for the warm interlude bands. Keep it out of anything else.
- **Type**: Inter at weight 300 with `ss01`, negative tracking on display sizes (set in `em` so it scales). Display never goes above 300. Money and other figures use tabular numerals (`font-variant-numeric: tabular-nums`). Legal body text is 400 for long-form readability.
- **Shapes**: pill buttons and tags, 12–16px card radii, hairline borders, two subtle shadow levels (`--sh-1`, `--sh-2`).
- Errors use ruby (`--ruby`); there is no separate green. Checks and selected states use indigo.
- All motion respects `prefers-reduced-motion`, both through `MotionConfig reducedMotion="user"` and a global CSS rule (which also stills the drifting mesh).
- `public/og-image.png` is a 1200×630 render of the home hero. Regenerate it if the headline or mesh changes.

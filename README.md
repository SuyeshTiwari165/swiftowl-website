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

- Violet (`--violet`) is the brand. Amber (`--amber`) means only one thing: "the passage that leaves your library". Keep it out of decoration.
- Type: Bricolage Grotesque (display), Onest (body), JetBrains Mono (labels and data).
- All motion respects `prefers-reduced-motion` through `MotionConfig reducedMotion="user"`.

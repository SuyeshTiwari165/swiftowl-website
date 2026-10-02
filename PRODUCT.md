# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: small-to-midsize business teams adopting AI across the whole company — sold horizontally across departments within one organization (Legal, HR, Operations, Finance, Sales, IT & security are the named buyer roles in the Use Cases content), not to a single department. Team-size framing in the product's own copy ranges from 2–7 up to 100+, with pricing scaled for up to 150 seats.

Secondary: MSPs and agencies who resell and administer SwiftOwl on behalf of their own clients (the Partner Program). Confirmed: this is the same "Partner" role/mode present in the live application's own mode switcher (Manager Mode / Partner Mode), not a separate concept.

Within a single customer's account, the live app (access-dev.swiftowl.ai) exposes distinct modes: **Manager Mode** (the business's own admin/owner operating their workspace and configuring its agents) and **Chat Mode** (the day-to-day conversational surface where end users work with the agents). One login I inspected was headed "Purpose-built AI agents for franchise operations" — confirmed with the user that this reflects that one tenant's configuration, not SwiftOwl's default positioning, which is a general team AI workspace.

## Product Purpose

SwiftOwl is a private, company-knowledge-grounded AI workspace: teams upload their own documents (SOPs, contracts, notes, decks), and SwiftOwl answers questions, runs tasks, and briefs the team using only that private library plus the live conversation — never the open web. Success means replacing "shadow AI" (employees pasting company data into public AI tools) with a governed, auditable, company-specific alternative that measurably saves time.

## Positioning

Confirmed, not-easily-copied mechanism (from the Security/Terms/Privacy pages, cross-checked against the live app's real behavior):

- **Retrieval, not bulk exposure.** The full document library is indexed on SwiftOwl's own infrastructure and never sent to a model in bulk — only the specific retrieved passage needed to answer a question is ever transmitted.
- **Identifier obfuscation.** Names, emails, phone numbers and account numbers are tokenized before anything leaves SwiftOwl's infrastructure, and swapped back in the response the user reads.
- **No-training contracts** with the model provider, and deletion of transmitted content after the response.
- **Three proactive agents, not one generic chatbot**, each with a distinct, narrow, confirmed job:
  - **Scout** turns a conversation (typed or pasted into SwiftOwl chat) into action items, owners and deadlines. It only processes what it's given in chat — it does not listen to meetings, calls or standups.
  - **Pilot** sends a proactive morning and evening briefing covering pending, overdue and upcoming work.
  - **Coach** automatically follows up on stalled outstanding tasks with reminders.
  - (A fourth agent, Atlas, exists in the product. Out of scope for this document by product decision — do not describe its mechanics without further input.)
- **Priced for the whole company at once** ($199/month includes the first 7 users, $14/month per additional user), explicitly positioned against generic consumer AI tools on cost model as well as data handling.

## Operating Context

- **This repository is the public marketing site only** (swiftowl.ai) — React 19 + Vite, prerendered to static HTML per route. It is a separate codebase from the actual product application. The product app runs at `access-dev.swiftowl.ai`; its source is not in this repository, and no sibling codebase on this machine matches it (the README's reference to a "Flask app in `../code`" is stale and does not resolve in the current checkout).
- Agents are configured per workspace in Manager Mode: Pilot's Daily Morning Brief / End-of-Day Wrap-Up have configurable times; Coach's follow-ups have a configurable frequency (1/2/3/5 times) plus an email-summary toggle.
- **Groups**: a chat feature bringing a company's own team members and AI "advisors" (finance, legal, strategy, market research, product, or a custom advisor built from the company's own uploaded knowledge) into one shared conversation thread. Decisions/tasks Scout or Pilot derive from a Groups conversation are a legitimate, confirmed use, since that conversation happens inside SwiftOwl itself.

## Capabilities and Constraints

**Confirmed capabilities** (verified directly against the live app, not just marketing copy):

- Scout acts only on text typed or pasted into a SwiftOwl chat conversation ("Try Scout" explicitly analyzes "the conversation"). It cannot summarize a meeting, call, or standup it wasn't given as chat text.
- Pilot delivers scheduled proactive briefings; it does not independently originate tasks from nothing.
- Coach monitors existing outstanding tasks and sends automatic follow-up reminders.

**Confirmed constraints** (from the binding Terms of Service / Privacy Policy — treat as hard facts):

- SwiftOwl is a dba of Web Access Inc., a Delaware corporation, registered office in Charleston, SC.
- Hosted in, and offered only to customers established in, the United States. No EU/UK data residency is offered; EEA/UK-established customers may be declined.
- Not currently a HIPAA-compliant service; no Business Associate Agreements are signed; protected health information should not be uploaded.
- ISO 27001 certified (ABS Quality Evaluations); the certified scope covers the production platform and hosting infrastructure, not only corporate systems.
- Data export/deletion fulfilled within 7 business days of request; retention is set at onboarding and changeable on request.
- Trial: 30 days, no credit card required. Pricing: $199/month includes the first 7 users; $14/month per additional user.

**Explicitly out of scope / undecided:**

- Atlas (a 4th agent visible in the live app) — left undocumented here by product decision.
- Any dedicated franchise-operations vertical offering — not confirmed to exist as a distinct product; treat SwiftOwl's default positioning as the general SMB team workspace above.

## Brand Commitments

- Name is one word: **SwiftOwl** (not "Swift Owl"), everywhere — copy, titles, metadata, legal text.
- Logo: an owl mark (two interlocked shapes forming owl "eyes"), `public/logo.svg`. No wordmark drawn into the mark itself; the name renders as live text beside it in nav/footer.
- Voice: direct and plain-language — legal pages explicitly avoid jargon, pricing is stated in plain numbers, no manufactured urgency.
- Visual system (current, built this engagement, not yet captured in a DESIGN.md): a Stripe-inspired system — white canvas, deep-navy ink, a single indigo CTA color, Inter at light weight with negative display tracking, tabular figures, pill buttons, and an animated SVG gradient-mesh backdrop (cream/sherbet/lavender/indigo/ruby/magenta) behind the nav and page tops.
- Cream/warm tones are reserved for exactly one meaning: "the passage that leaves your library" (the PII-obfuscation demo, the one highlighted retrieved document). Indigo is the only CTA color — one filled pill per section.

## Evidence on Hand

- `src/content/privacy-policy.html` and `src/content/terms.html` are real, binding company policy — authoritative for any constraint or positioning claim, more reliable than marketing copy when the two conflict.
- The live application at `https://access-dev.swiftowl.ai` is ground truth for what each agent actually does; its Agents, Pilot-settings, and Coach-settings pages were directly inspected.
- The home page's "impact" stats (5 hrs/week saved, 3× faster decisions, 90% less shadow AI, 250+ hrs/week for a 50-person team) are explicitly labeled "Illustrative figures based on typical usage" — not verified customer data. Do not strengthen or cite as real evidence.
- No real customer testimonials, logos, or case studies exist anywhere in the current site; none should be fabricated.

## Product Principles

1. **Only what's needed leaves the library.** Single relevant-passage retrieval, obfuscated identifiers, no-training contracts, and post-response deletion are the trust mechanism, not a slogan — every description of data handling must match this exactly.
2. **Agents do only what they're confirmed to do.** Scout acts on chat text it's given; Pilot proactively briefs on a schedule; Coach follows up on existing outstanding tasks. Never imply passive listening, meeting capture, or autonomous task invention beyond these.
3. **Sold as one workspace for the whole company**, not a per-seat tool — base-plan-plus-per-seat pricing and "built for teams, not individuals" are core to the pitch.
4. **US-only, ISO 27001-anchored trust.** Never imply EU/UK availability, HIPAA compliance, or any certification/compliance claim beyond what the Terms/Privacy Policy already confirm.
5. **One name, one brand system.** "SwiftOwl" as a single word everywhere; indigo as the sole CTA color; the gradient mesh as the brand's signature backdrop, not a one-off decoration.

## Accessibility & Inclusion

No product-specific accessibility requirement has been established by the user. The current implementation respects `prefers-reduced-motion` globally and uses semantic landmarks/ARIA on interactive demos (tabs, accordions, live regions) as a baseline; no formal standard (e.g. a specific WCAG level) has been confirmed as a requirement.

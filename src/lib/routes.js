// One source of truth for page metadata. Used by <Seo> in the browser and by
// scripts/prerender.mjs to write each page's <head> and the sitemap.
export const SITE_URL = 'https://swiftowl.ai'
export const OG_IMAGE = '/og-image.png'

// SwiftOwl's official social accounts. Feeds the Organization JSON-LD
// `sameAs` list and the footer's social icon row — one source of truth so
// the two never drift apart.
export const SOCIAL_LINKS = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/swiftowl' },
  { name: 'Facebook', url: 'https://www.facebook.com/swiftowlai' },
  { name: 'Instagram', url: 'https://www.instagram.com/swiftowlai' },
  { name: 'X', url: 'https://x.com/swiftowlai' },
]

export const ROUTES = [
  {
    path: '/',
    title: 'SwiftOwl | Private AI Workspace for Your Whole Team',
    description: 'SwiftOwl is a private AI workspace built around your company’s own knowledge. Scout turns conversations into tasks, Pilot briefs your team daily, and Coach follows up automatically. ISO 27001 certified.',
    priority: '1.0',
  },
  {
    path: '/groups-advisors',
    crumb: 'Groups & advisors',
    title: 'AI Advisors and Team Groups in One Workspace | SwiftOwl',
    description: 'Bring your team and AI advisors into the same room. Finance, legal, strategy and custom advisors built from your own knowledge.',
    priority: '0.8',
  },
  {
    path: '/use-cases',
    crumb: 'Use cases',
    title: 'AI Use Cases for Legal, HR, Finance and IT | SwiftOwl',
    description: 'Never lose a decision, run your to-do list automatically, and get new hires productive from day one. See how every team uses SwiftOwl.',
    priority: '0.8',
  },
  {
    path: '/security',
    crumb: 'Security',
    title: 'ISO 27001 Certified AI Workspace Security | SwiftOwl',
    description: 'Only the relevant passage leaves, identifiers are obfuscated, no-training contracts, and post-response deletion. See how SwiftOwl protects your data.',
    priority: '0.8',
  },
  {
    path: '/partners',
    crumb: 'Partners',
    title: 'MSP and Agency Partner Program for Secure AI | SwiftOwl',
    description: 'Own the AI relationship with your clients. Offer SwiftOwl to every client and build a new recurring revenue stream.',
    priority: '0.7',
  },
  {
    path: '/start-free-trial',
    crumb: 'Start free trial',
    title: 'Start Your 30-Day Free Trial | SwiftOwl',
    description: 'Try SwiftOwl free for 30 days, no credit card needed. A private AI workspace for your whole team.',
    priority: '0.9',
  },
  {
    path: '/book-a-demo',
    crumb: 'Book a demo',
    title: 'Book a Demo | SwiftOwl',
    description: 'See SwiftOwl on your own work in a 30-minute walkthrough with our team.',
    priority: '0.7',
  },
  {
    path: '/contact',
    crumb: 'Contact',
    title: 'Contact Us | SwiftOwl',
    description: 'Questions about pricing, security or rolling SwiftOwl out to your team? Talk to a person.',
    priority: '0.5',
  },
  {
    path: '/privacy-policy',
    crumb: 'Privacy policy',
    title: 'Privacy Policy | SwiftOwl',
    description: 'How SwiftOwl collects, uses and protects personal data, including exactly how AI processing and identifier obfuscation work.',
    priority: '0.3',
  },
  {
    path: '/terms',
    crumb: 'Terms of service',
    title: 'Terms of Service | SwiftOwl',
    description: 'The terms that apply when you visit swiftowl.ai, start a trial or subscribe to SwiftOwl.',
    priority: '0.3',
  },
]

export const NOT_FOUND = {
  path: '/404',
  title: 'Page not found | SwiftOwl',
  description: 'This page doesn’t exist.',
  noindex: true,
}

// Old URLs that should land on the matching new page.
export const ALIASES = { '/become-partner': '/partners' }

export function metaFor(pathname) {
  const clean = pathname.replace(/\/+$/, '') || '/'
  const target = ALIASES[clean] || clean
  return ROUTES.find((r) => r.path === target) || NOT_FOUND
}

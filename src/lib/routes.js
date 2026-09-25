// One source of truth for page metadata. Used by <Seo> in the browser and by
// scripts/prerender.mjs to write each page's <head> and the sitemap.
export const SITE_URL = 'https://swiftowl.ai'
export const OG_IMAGE = '/og-image.png'

export const ROUTES = [
  {
    path: '/',
    title: 'Swift Owl | Private AI Workspace for Your Whole Team',
    description: 'Swift Owl is a private AI workspace built around your company’s own knowledge. Scout, Pilot and Coach capture notes, run tasks and keep your team on track. ISO 27001 certified.',
    priority: '1.0',
  },
  {
    path: '/groups-advisors',
    title: 'AI Advisors and Team Groups in One Workspace | Swift Owl',
    description: 'Bring your team and AI advisors into the same room. Finance, legal, strategy and custom advisors built from your own knowledge.',
    priority: '0.8',
  },
  {
    path: '/use-cases',
    title: 'AI Use Cases for Legal, HR, Finance and IT | Swift Owl',
    description: 'Never lose a decision, run your to-do list automatically, and get new hires productive from day one. See how every team uses Swift Owl.',
    priority: '0.8',
  },
  {
    path: '/security',
    title: 'ISO 27001 Certified AI Workspace Security | Swift Owl',
    description: 'Only the relevant passage leaves, identifiers are obfuscated, no-training contracts, and post-response deletion. See how Swift Owl protects your data.',
    priority: '0.8',
  },
  {
    path: '/partners',
    title: 'MSP and Agency Partner Program for Secure AI | Swift Owl',
    description: 'Own the AI relationship with your clients. Offer Swift Owl to every client and build a new recurring revenue stream.',
    priority: '0.7',
  },
  {
    path: '/start-free-trial',
    title: 'Start Your 30-Day Free Trial | Swift Owl',
    description: 'Try Swift Owl free for 30 days, no credit card needed. A private AI workspace for your whole team.',
    priority: '0.9',
  },
  {
    path: '/book-a-demo',
    title: 'Book a Demo | Swift Owl',
    description: 'See Swift Owl on your own work in a 30-minute walkthrough with our team.',
    priority: '0.7',
  },
  {
    path: '/contact',
    title: 'Contact Us | Swift Owl',
    description: 'Questions about pricing, security or rolling Swift Owl out to your team? Talk to a person.',
    priority: '0.5',
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | Swift Owl',
    description: 'How Swift Owl collects, uses and protects personal data, including exactly how AI processing and identifier obfuscation work.',
    priority: '0.3',
  },
  {
    path: '/terms',
    title: 'Terms of Service | Swift Owl',
    description: 'The terms that apply when you visit swiftowl.ai, start a trial or subscribe to Swift Owl.',
    priority: '0.3',
  },
]

export const NOT_FOUND = {
  path: '/404',
  title: 'Page not found | Swift Owl',
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

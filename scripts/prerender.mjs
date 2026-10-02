// Turns the client build into static HTML, one file per route, so search
// engines and link previews get real content and per-page <head> tags.
// Runs after `vite build` (client) and `vite build --ssr` (dist-ssr/).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrEntry = pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href

const { render, ROUTES, NOT_FOUND, ALIASES, SITE_URL, OG_IMAGE, SOCIAL_LINKS, metaFor, SECURITY_FAQS } = await import(ssrEntry)
// SOCIAL_LINKS entries are {name, url}; the X one doubles as the twitter:site handle.
const X_HANDLE = '@' + new URL(SOCIAL_LINKS.find((s) => s.name === 'X').url).pathname.replace(/\/+/g, '')
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8')

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const jsonLd = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`

function structuredData(route) {
  const blocks = []
  if (route.path === '/') {
    blocks.push(
      jsonLd({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'SwiftOwl',
        url: SITE_URL,
        logo: `${SITE_URL}/logo.svg`,
        sameAs: SOCIAL_LINKS.map((s) => s.url),
      }),
      jsonLd({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'SwiftOwl',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: route.description,
        inLanguage: 'en-US',
        offers: { '@type': 'Offer', price: '199', priceCurrency: 'USD', description: '$199/month includes 7 users; $14/month per additional user. 30-day free trial.' },
      }),
    )
  } else if (!route.noindex) {
    // A flat two-level breadcrumb (Home > this page) for every indexable
    // inner page — cheap to derive, and a real rich-result candidate.
    blocks.push(jsonLd({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
        { '@type': 'ListItem', position: 2, name: route.crumb || route.title, item: SITE_URL + route.path },
      ],
    }))
  }
  if (route.path === '/security') {
    blocks.push(jsonLd({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: SECURITY_FAQS.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    }))
  }
  return blocks
}

function head(route) {
  const url = SITE_URL + (route.path === '/' ? '/' : route.path)
  const image = SITE_URL + OG_IMAGE
  return [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}" />`,
    route.noindex ? '<meta name="robots" content="noindex" />' : '<meta name="robots" content="index, follow" />',
    route.noindex ? '' : `<link rel="canonical" href="${url}" />`,
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="SwiftOwl" />',
    '<meta property="og:locale" content="en_US" />',
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:site" content="${X_HANDLE}" />`,
    `<meta name="twitter:title" content="${esc(route.title)}" />`,
    `<meta name="twitter:description" content="${esc(route.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    ...structuredData(route),
  ].filter(Boolean).join('\n    ')
}

function page(route, rendered) {
  // React emits resource hints (e.g. <link rel="preload"> for images) ahead of
  // the app markup. They belong in <head>; left inside #root they break hydration.
  const hints = rendered.match(/^(?:<link[^>]*>)+/)?.[0] ?? ''
  const appHtml = rendered.slice(hints.length)
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace(/<meta name="description"[^>]*>/, '')
    // Function replacers: page text contains "$199", which a string replacer would mangle.
    .replace('</head>', () => `    ${head(route)}\n    ${hints}\n  </head>`)
    .replace('<div id="root"></div>', () => `<div id="root">${appHtml}</div>`)
  if (!html.includes(appHtml)) throw new Error(`Couldn't inject app HTML for ${route.path}`)
  return html
}

function write(file, contents) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, contents)
}

const pages = [
  ...ROUTES.map((r) => ({ url: r.path, meta: r })),
  ...Object.keys(ALIASES).map((alias) => ({ url: alias, meta: metaFor(alias) })),
]

for (const { url, meta } of pages) {
  const appHtml = await render(url)
  const html = page(meta, appHtml)
  if (url === '/') {
    write(path.join(dist, 'index.html'), html)
  } else {
    // Both shapes, so /contact resolves on any static host: some look for
    // contact/index.html, others (and `vite preview`) for contact.html.
    write(path.join(dist, url.slice(1), 'index.html'), html)
    write(path.join(dist, `${url.slice(1)}.html`), html)
  }
  console.log(`  prerendered ${url.padEnd(20)} ${(appHtml.length / 1024).toFixed(1)} kB`)
}

// 404 page for hosts that serve dist/404.html for unknown paths.
write(path.join(dist, '404.html'), page(NOT_FOUND, await render('/this-page-does-not-exist')))

const today = new Date().toISOString().slice(0, 10)
write(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map((r) => `  <url><loc>${SITE_URL}${r.path === '/' ? '/' : r.path}</loc><lastmod>${today}</lastmod><priority>${r.priority}</priority></url>`).join('\n')}
</urlset>
`)
write(path.join(dist, 'robots.txt'), `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`)

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`  wrote 404.html, sitemap.xml (${ROUTES.length} URLs), robots.txt`)

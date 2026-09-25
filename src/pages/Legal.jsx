import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import privacyHtml from '../content/privacy-policy.html?raw'
import termsHtml from '../content/terms.html?raw'

// Legal text is ported verbatim from the previous site. Edit the .html files
// in src/content, not this component.
const DOCS = {
  privacy: { title: 'Privacy policy', html: privacyHtml, other: ['/terms', 'Terms of service'] },
  terms: { title: 'Terms of service', html: termsHtml, other: ['/privacy-policy', 'Privacy policy'] },
}

const slug = (s) => s.toLowerCase().replace(/<[^>]+>/g, '').replace(/&[a-z#0-9]+;/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

// Give every numbered section an id and collect a table of contents.
function prepare(html) {
  const toc = []
  const out = html.replace(/<h3>(<span class="clause">(\d+)<\/span>)?([\s\S]*?)<\/h3>/g, (m, clause, n, text) => {
    if (!n) return m
    const label = text.replace(/<[^>]+>/g, '').trim()
    const id = `${n}-${slug(label)}`
    toc.push({ id, n, label })
    return `<h3 id="${id}">${clause}${text}</h3>`
  })
  return { html: out, toc }
}

const PREPARED = Object.fromEntries(Object.entries(DOCS).map(([k, d]) => [k, prepare(d.html)]))

export default function Legal({ doc }) {
  const d = DOCS[doc]
  const { html, toc } = PREPARED[doc]
  const body = useRef(null)

  // Addresses are assembled in the browser so scrapers reading the HTML don't get them.
  useEffect(() => {
    body.current?.querySelectorAll('[data-email]').forEach((el) => {
      const addr = `${el.dataset.email}@swiftowl.ai`
      el.innerHTML = `<a href="mailto:${addr}">${addr}</a>`
    })
  }, [doc])

  return (
    <section className="page-hero legal">
      <div className="wrap legal-layout">
        <aside className="legal-toc" aria-label="On this page">
          <p className="eyebrow">{d.title}</p>
          <ol>
            {toc.map((t) => <li key={t.id}><a href={`#${t.id}`}><span>{t.n}</span>{t.label}</a></li>)}
          </ol>
          <Link className="legal-other" to={d.other[0]}>Read the {d.other[1].toLowerCase()} →</Link>
        </aside>
        <article className="legal-body">
          <h1 className="display h2">{d.title}</h1>
          <div ref={body} dangerouslySetInnerHTML={{ __html: html }} />
        </article>
      </div>
    </section>
  )
}

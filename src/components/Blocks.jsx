import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon, Reveal } from './ui'

export function PageCta({ title, lede = 'Set up your workspace in minutes. Free for 30 days, no credit card.' }) {
  return (
    <section className="section cta">
      <div className="wrap">
        <Reveal>
          <h2 className="display h2">{title}</h2>
          <p className="lede">{lede}</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/start-free-trial">Start free trial <span className="arrow">→</span></Link>
            <Link className="btn btn-ghost" to="/book-a-demo">Book a demo</Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// Answers stay in the HTML (collapsed with CSS) so search engines can read them.
export function Faq({ items }) {
  const [open, setOpen] = useState(0)
  const base = useId()
  return (
    <div className="faq">
      {items.map(([q, a], i) => {
        const isOpen = open === i
        return (
          <div key={q} className={'faq-item' + (isOpen ? ' open' : '')}>
            <h3>
              <button
                className="faq-q"
                aria-expanded={isOpen}
                aria-controls={`${base}-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                {q}
                <span className="faq-icon" aria-hidden="true">+</span>
              </button>
            </h3>
            <div id={`${base}-${i}`} className="faq-a" role="region" aria-hidden={!isOpen}>
              <div><p>{a}</p></div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function CheckList({ items, className = 'checks' }) {
  return (
    <ul className={className}>
      {items.map((t) => <li key={t}><Icon name="check" size={20} stroke={3} />{t}</li>)}
    </ul>
  )
}

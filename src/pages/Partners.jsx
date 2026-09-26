import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Icon, Reveal, money } from '../components/ui'
import { Field, Seg, SubmitRow, Success, useForm } from '../components/Forms'

const WHY = [
  ['chart', 'New recurring revenue', 'Add Swift Owl to every client engagement with simple, whole-company pricing that’s easy to resell.'],
  ['shield', 'Safe AI adoption', 'Move clients off risky public AI tools and onto a secure, governed workspace you control.'],
  ['compass', 'Stay the expert', 'Configure company context and custom advisors for each client. You deliver the value and keep the relationship.'],
]

const STEPS = [
  ['Apply', 'Tell us about your practice and the clients you serve.'],
  ['Get enabled', 'Onboarding, partner pricing and resources to take to market.'],
  ['Deploy for clients', 'Set up secure workspaces and company context for each client.'],
  ['Grow', 'Expand seats and advisors as clients see value, and earn recurring revenue.'],
]

function Journey() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1])
  return (
    <div className="journey" ref={ref}>
      <div className="journey-track" aria-hidden="true">
        <motion.div className="journey-fill journey-fill-x" style={reduce ? undefined : { scaleX: fill }} />
      </div>
      {STEPS.map(([t, p], i) => (
        <Reveal key={t} className="journey-step" delay={i * 0.12}>
          <span className="journey-dot">{i + 1}</span>
          <h3 className="h3">{t}</h3>
          <p>{p}</p>
        </Reveal>
      ))}
    </div>
  )
}

function Portfolio() {
  const [clients, setClients] = useState(12)
  const [team, setTeam] = useState(20)
  const perClient = 199 + Math.max(0, team - 7) * 14
  const total = clients * perClient

  return (
    <div className="portfolio">
      <Reveal>
        <p className="eyebrow">Size your opportunity</p>
        <h2 className="display h2">See what your client base could run on Swift Owl.</h2>
        <p className="lede" style={{ marginTop: 22 }}>
          Move the sliders to match your book of business. We’ll walk you through partner pricing and margins when you join.
        </p>
      </Reveal>
      <Reveal className="calc" delay={0.1}>
        <div className="slider-field">
          <label htmlFor="clients">Clients you’d bring <b>{clients}</b></label>
          <input id="clients" className="range" type="range" min="1" max="50" value={clients}
            style={{ '--p': `${((clients - 1) / 49) * 100}%` }} onChange={(e) => setClients(+e.target.value)} />
        </div>
        <div className="client-grid" aria-hidden="true">
          {Array.from({ length: 50 }, (_, i) => (
            <motion.span key={i} className={'client-dot' + (i < clients ? ' on' : '')} animate={{ scale: i < clients ? 1 : 0.8 }} transition={{ duration: 0.2, delay: (i % 10) * 0.01 }} />
          ))}
        </div>
        <div className="slider-field" style={{ marginTop: 26 }}>
          <label htmlFor="team">Average team size per client <b>{team}</b></label>
          <input id="team" className="range" type="range" min="1" max="100" value={team}
            style={{ '--p': `${((team - 1) / 99) * 100}%` }} onChange={(e) => setTeam(+e.target.value)} />
        </div>
        <div className="calc-result">
          <div className="calc-break" style={{ margin: 0, padding: 0, border: 0 }}>
            <div><span>People you’d bring onto Swift Owl</span><span>{(clients * team).toLocaleString()}</span></div>
            <div><span>List price per client</span><span>{money(perClient)}/mo</span></div>
          </div>
          <div className="calc-price" aria-live="polite" style={{ marginTop: 20 }}>
            {money(total)}<small style={{ display: 'block', marginTop: 8 }}>per month at list price</small>
          </div>
        </div>
        <p className="muted" style={{ fontSize: 13, margin: '16px 0 0' }}>
          Combined list price of your clients’ workspaces, not your margin. Partner pricing is shared during onboarding.
        </p>
      </Reveal>
    </div>
  )
}

function ApplyForm() {
  const f = useForm(
    'partner',
    { name: '', email: '', company: '', website: '', type: 'MSP', clients: '', message: '' },
    { name: ['required'], email: ['required', 'email'], company: ['required'] },
  )
  if (f.status === 'sent') {
    return (
      <div className="form-card">
        <Success title="Application received" action={<Link className="btn btn-ghost" to="/">Back to home</Link>}>
          Thanks, {f.values.name.split(' ')[0]}. Our partner team will get back to you at {f.values.email} within two business days.
        </Success>
      </div>
    )
  }
  return (
    <form className="form-card" onSubmit={f.onSubmit} noValidate>
      <div className="form-grid">
        <Field name="name" label="Full name" autoComplete="name" value={f.values.name} onChange={f.set('name')} error={f.errors.name} />
        <Field name="email" label="Work email" type="email" autoComplete="email" value={f.values.email} onChange={f.set('email')} error={f.errors.email} />
        <Field name="company" label="Company" autoComplete="organization" value={f.values.company} onChange={f.set('company')} error={f.errors.company} />
        <Field name="website" label="Website" optional type="url" placeholder="https://" value={f.values.website} onChange={f.set('website')} />
        <Seg label="Your practice" options={['MSP', 'Agency', 'Consultancy', 'Reseller', 'Other']} value={f.values.type} onChange={f.set('type')} />
        <Field className="full" name="clients" label="How many clients do you serve?" optional as="select" value={f.values.clients} onChange={f.set('clients')}>
          <option value="">Choose a range</option>
          <option>1–10</option>
          <option>11–50</option>
          <option>51–200</option>
          <option>200+</option>
        </Field>
        <Field className="full" name="message" label="Tell us about your clients" optional as="textarea" placeholder="Industries, team sizes, how they use AI today…" value={f.values.message} onChange={f.set('message')} />
      </div>
      <SubmitRow status={f.status} label="Apply to partner" sendingLabel="Sending application…" note="We reply within two business days." />
    </form>
  )
}

export default function Partners() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap form-layout" style={{ alignItems: 'center' }}>
          <Reveal>
            <p className="eyebrow">For MSPs and agencies</p>
            <h1 className="display h1">Own the AI relationship with your clients.</h1>
            <p className="lede">
              Your clients are adopting AI with or without you. Swift Owl lets you guide them into it safely and profitably,
              and build a new recurring revenue stream while you do it.
            </p>
            <div className="hero-actions" style={{ marginTop: 32 }}>
              <a className="btn btn-primary" href="#apply">Become a partner <span className="arrow">→</span></a>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="checks form-card" style={{ margin: 0 }}>
              {[
                'Recurring revenue from every client seat',
                'A secure, ISO 27001 certified platform you can stand behind',
                'You stay the trusted advisor, not a reseller in the background',
              ].map((t) => (
                <li key={t}><Icon name="check" size={20} stroke={3} />{t}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="section-head">
            <p className="eyebrow">Why partner with Swift Owl</p>
            <h2 className="display h2">A better future for your practice.</h2>
          </Reveal>
          <div className="why-grid">
            {WHY.map(([icon, t, p], i) => (
              <Reveal key={t} className="why-card" delay={i * 0.1}>
                <span className="sec-icon"><Icon name={icon} size={22} /></span>
                <h3 className="h3">{t}</h3>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="section-head">
            <p className="eyebrow">How partnering works</p>
            <h2 className="display h2">From application to serving clients.</h2>
          </Reveal>
          <Journey />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap"><Portfolio /></div>
      </section>

      <section className="section" id="apply" style={{ paddingTop: 0 }}>
        <div className="wrap form-layout">
          <Reveal>
            <p className="eyebrow">Apply</p>
            <h2 className="display h2">Bring Swift Owl to your clients.</h2>
            <p className="lede" style={{ marginTop: 22 }}>
              Join the partner program and lead your clients into the AI era, safely and profitably.
            </p>
          </Reveal>
          <Reveal delay={0.1}><ApplyForm /></Reveal>
        </div>
      </section>
    </>
  )
}

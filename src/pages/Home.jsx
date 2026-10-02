import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import PassageDemo from '../components/PassageDemo'
import Agents from '../components/Agents'
import DayTimeline from '../components/DayTimeline'
import Mesh from '../components/Mesh'
import { CountUp, Icon, Reveal, money } from '../components/ui'

// Words animate in one by one; the last one ("Day 1.") is added in <Hero />.
const HEADLINE = ['Get', 'your', 'whole', 'team', 'working', 'with', 'AI', 'from']

function Hero() {
  const reduce = useReducedMotion()
  const word = (i) => ({
    initial: reduce ? false : { opacity: 0, y: '0.4em', filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 0.6, delay: 0.05 * i, ease: [0.2, 0.7, 0.2, 1] },
  })
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <motion.p className="eyebrow" {...word(0)}>Secure AI workspace for teams</motion.p>
          <h1 className="display h1">
            {HEADLINE.map((w, i) => (
              <Fragment key={i}><motion.span className="hero-word" {...word(i)}>{w}</motion.span>{" "}</Fragment>
            ))}
            <motion.span className="hero-word" {...word(HEADLINE.length + 1)}>Day&nbsp;1.</motion.span>
          </h1>
          <Reveal delay={0.5} y={16}>
            <p className="lede">
              SwiftOwl is a private AI workspace built around your company’s own knowledge.
              Three AI agents turn your conversations into tasks, brief your team every day
              and follow up before anything slips, while your documents stay confidential.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/start-free-trial">Start free trial <span className="arrow">→</span></Link>
              <Link className="btn btn-ghost" to="/book-a-demo">Book a demo</Link>
            </div>
            <div className="chips">
              <span className="chip"><Icon name="check" size={15} stroke={2.5} />No credit card</span>
              <span className="chip"><Icon name="check" size={15} stroke={2.5} />30-day free trial</span>
              <span className="chip"><Icon name="check" size={15} stroke={2.5} />ISO 27001 certified</span>
            </div>
          </Reveal>
        </div>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <PassageDemo />
        </motion.div>
      </div>
    </section>
  )
}

const PROBLEMS = [
  { t: 'Generic AI doesn’t know you', b: 'Public AI tools know nothing about your business, your clients or your documents.' },
  { t: 'Knowledge gets lost', b: 'Decisions and context scatter across chats, email and spreadsheets.' },
  { t: 'Tools fragment the team', b: 'Everyone uses something different, so nothing connects.' },
  { t: 'Your data is at risk', b: 'Pasting company files into public AI tools creates real exposure.' },
]

function Problem() {
  return (
    <section className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">The problem</p>
          <h2 className="display h2">Rolling out AI across your business is harder than it should be.</h2>
        </Reveal>
        <div className="problems">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.t} className="problem" delay={i * 0.08}>
              <span className="problem-n">0{i + 1}</span>
              <h3 className="h3">{p.t}</h3>
              <p>{p.b}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="fix-line band-cream">
          <p>SwiftOwl fixes this: one secure workspace, with your company’s knowledge built in.</p>
          <Link className="btn btn-ghost" to="/start-free-trial">Start free trial <span className="arrow">→</span></Link>
        </Reveal>
      </div>
    </section>
  )
}

function AgentsSection() {
  return (
    <section className="section section-soft" id="agents">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">Three AI agents, always on</p>
          <h2 className="display h2">One goal: help your team get things done.</h2>
          <p className="lede">Pick an agent to see what it does during a normal working day.</p>
        </Reveal>
        <Reveal><Agents /></Reveal>
        <div className="agent-notes">
          <Reveal className="agent-note agent-note-cream">
            <Icon name="mail" size={22} />
            <p>Every morning and evening, Pilot sends your whole team a brief, so everyone starts and ends the day aligned.</p>
          </Reveal>
          <Reveal className="agent-note agent-note-white" delay={0.08}>
            <Icon name="users" size={22} />
            <p>Need a second opinion? Bring AI advisors for finance, legal or strategy into a group with your team. <Link to="/groups-advisors">See groups and advisors →</Link></p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

const FLOW = [
  { k: 'You bring in', h: 'Your documents', p: 'SOPs, contracts, notes and decks you add to SwiftOwl.' },
  { k: 'Stays with you', h: 'Indexed on your infrastructure', p: 'Your full library is indexed where it lives.' },
  { k: 'Retrieved', h: 'The relevant passage', p: 'Only the passage that answers the question is picked.', cls: 'is-passage' },
  { k: 'Reasoned over', h: 'The model', p: 'Sees that passage and nothing else.', cls: 'is-model' },
  { k: 'You get', h: 'An answer with its source', p: 'Notes, tasks, drafts and briefs, ready to use.' },
]

function PrivacyFlow() {
  const reduce = useReducedMotion()
  return (
    <section className="section" id="how">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">How your data moves</p>
          <h2 className="display h2">Your library never leaves. <span className="mark">Only the passage</span> that answers your question does.</h2>
        </Reveal>
        <div className="flow">
          <motion.div
            className="flow-line"
            aria-hidden="true"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />
          {FLOW.map((s, i) => (
            <Reveal key={s.h} className={`flow-step ${s.cls || ''}`} delay={0.15 + i * 0.18}>
              <span className="flow-k">{s.k}</span>
              <h4>{s.h}</h4>
              <p>{s.p}</p>
            </Reveal>
          ))}
        </div>
        <div className="trust-row">
          {[
            ['Never the open web', 'SwiftOwl doesn’t browse the open web, so answers come from your own knowledge.'],
            ['Not used for AI training', 'Your documents are never used to train any AI model, ours or anyone else’s.'],
            ['Protected by contract', 'Commercial agreements, privacy controls and data-retention safeguards cover your information.'],
          ].map(([h, p], i) => (
            <Reveal key={h} delay={i * 0.08}>
              <h4>{h}</h4>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    ['Ask', 'Start with a question, task or idea, the way you’d ask a teammate. No prompt engineering.'],
    ['Think', 'SwiftOwl reasons over your knowledge and workspace: notes, tasks and past conversations.'],
    ['Deliver', 'A draft, tasks in Pilot, notes in Scout. Clear, ready to use, and better over time.'],
  ]
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="band-cream">
          <Reveal className="section-head">
            <p className="eyebrow">Simple. Conversational. Capable.</p>
            <h2 className="display h2">Ask, and get finished work back.</h2>
          </Reveal>
          <div className="steps">
            {steps.map(([t, p], i) => (
              <Reveal key={t} className="step" delay={i * 0.1}>
                <span className="step-n">Step {i + 1}</span>
                <h3 className="h3">{t}</h3>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Impact() {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">The impact</p>
          <h2 className="display h2">Faster teams. Protected data. Measurable returns.</h2>
        </Reveal>
        <div className="stats">
          <Reveal className="stat"><div className="stat-n"><CountUp to={5} suffix=" hrs" /></div><p>Saved per employee each week on hunting for information.</p></Reveal>
          <Reveal className="stat" delay={0.08}><div className="stat-n"><CountUp to={3} suffix="×" /></div><p>Faster decisions, with answers from your own knowledge.</p></Reveal>
          <Reveal className="stat" delay={0.16}><div className="stat-n"><CountUp to={90} suffix="%" /></div><p>Less shadow AI once company data has a safe home.</p></Reveal>
          <Reveal className="stat" delay={0.24}><div className="stat-n"><CountUp to={250} suffix="+" /></div><p>Hours saved each week for a 50-person team.</p></Reveal>
        </div>
        <p className="footnote">Illustrative figures based on typical usage.</p>
      </div>
    </section>
  )
}

const ROWS = [
  ['Your data stays private', 'Sent to external servers', 'Always protected'],
  ['Answers from your documents', 'General web knowledge', 'Your docs, your answers'],
  ['Audit log and compliance trail', 'None', 'Complete logging'],
  ['Never used to train AI models', 'Varies by plan', 'Guaranteed by contract'],
  ['Built for teams', 'Built for individuals', 'Groups, advisors, shared context'],
]

function Compare() {
  return (
    <section className="section section-soft">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">SwiftOwl vs generic AI tools</p>
          <h2 className="display h2">Built for how businesses actually work.</h2>
        </Reveal>
        <Reveal className="compare" role="table" aria-label="SwiftOwl compared with generic AI tools">
          <div className="compare-row compare-head" role="row">
            <div role="columnheader">What matters</div>
            <div role="columnheader">Generic AI</div>
            <div role="columnheader" className="us">SwiftOwl</div>
          </div>
          {ROWS.map(([what, them, us], i) => (
            <motion.div
              key={what}
              className="compare-row"
              role="row"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
            >
              <div role="cell">{what}</div>
              <div role="cell" className="them"><Icon name="x" size={15} stroke={2} />{them}</div>
              <div role="cell" className="us"><Icon name="check" size={16} stroke={2.5} />{us}</div>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function Security() {
  const cards = [
    ['shield', 'ISO 27001 certified', 'Independently audited information-security management.'],
    ['lock', 'Private by design', 'Encrypted in transit and at rest. Never used to train any AI model.'],
    ['key', 'You control access', 'Role-based permissions and full audit logging. You decide who sees what.'],
  ]
  return (
    <section className="section dark" id="security">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">Enterprise-grade security. SMB-friendly simplicity.</p>
          <h2 className="display h2">Your data is your data, always.</h2>
        </Reveal>
        <div className="sec-grid">
          {cards.map(([icon, t, p], i) => (
            <Reveal key={t} className="sec-card" delay={i * 0.1}>
              <span className="sec-icon"><Icon name={icon} size={22} /></span>
              <h3 className="h3">{t}</h3>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
        <Reveal style={{ marginTop: 32 }}>
          <Link className="btn btn-light" to="/security">See how we keep your data safe <span className="arrow">→</span></Link>
        </Reveal>
      </div>
    </section>
  )
}

const BASE = 199
const INCLUDED = 7
const PER_SEAT = 14

function Pricing() {
  const [seats, setSeats] = useState(15)
  const extra = Math.max(0, seats - INCLUDED)
  const total = BASE + extra * PER_SEAT
  const pct = ((seats - 1) / (150 - 1)) * 100

  return (
    <section className="section" id="pricing">
      <div className="wrap pricing">
        <Reveal>
          <p className="eyebrow">Pricing</p>
          <h2 className="display h2">One simple price for your whole business.</h2>
          <p className="lede" style={{ marginTop: 20 }}>
            {money(BASE)}/month includes your first {INCLUDED} users. Each additional user is {money(PER_SEAT)}/month.
            Try it free for 30 days, no credit card needed.
          </p>
        </Reveal>
        <Reveal className="calc" delay={0.1}>
          <div className="calc-top">
            <label htmlFor="seats" className="calc-seats">{seats} {seats === 1 ? 'person' : 'people'}</label>
            <span className="calc-hint">drag to size your team</span>
          </div>
          <input
            id="seats"
            className="range"
            type="range"
            min="1"
            max="150"
            value={seats}
            style={{ '--p': `${pct}%` }}
            onChange={(e) => setSeats(Number(e.target.value))}
            aria-valuetext={`${seats} people, ${money(total)} per month`}
          />
          <div className="range-scale"><span>1</span><span>50</span><span>100</span><span>150</span></div>
          <div className="calc-result">
            <div className="calc-price" aria-live="polite">
              <motion.span key={total} initial={{ opacity: 0.4, y: 6 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'inline-block' }}>
                {money(total)}
              </motion.span>
              <small> /month</small>
            </div>
            <div className="calc-break">
              <div><span>Base plan, first {INCLUDED} users</span><span>{money(BASE)}</span></div>
              <div><span>{extra} additional {extra === 1 ? 'user' : 'users'} × {money(PER_SEAT)}</span><span>{money(extra * PER_SEAT)}</span></div>
              <div><span>Per person</span><span>{money(Math.round(total / seats))}/mo</span></div>
            </div>
          </div>
          <Link className="btn btn-primary" to="/start-free-trial" style={{ width: '100%' }}>
            Start your 30-day free trial <span className="arrow">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

function PartnerBand() {
  return (
    <section className="wrap" style={{ paddingBottom: 0 }}>
      <Reveal className="band">
        <svg className="band-rings" viewBox="0 0 200 200" aria-hidden="true">
          {[90, 70, 50, 30].map((r) => <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="currentColor" strokeWidth="1.5" />)}
        </svg>
        <div>
          <p className="eyebrow">For MSPs and agencies</p>
          <h2 className="display h2" style={{ fontSize: 'clamp(28px, 3.4vw, 40px)' }}>Run an MSP or agency? Own the AI relationship with your clients.</h2>
          <p>Offer SwiftOwl to your clients and build a new recurring revenue stream, safely and profitably.</p>
        </div>
        <Link className="btn btn-ghost" to="/partners">See the partner program <span className="arrow">→</span></Link>
      </Reveal>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="cta">
      <Mesh variant="cta" flip />
      <div className="wrap">
        <Reveal>
          <h2 className="display h2">Meet your new AI teammate today.</h2>
          <p className="lede">Set up your workspace in minutes. Free for 30 days, no credit card.</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/start-free-trial">Start free trial <span className="arrow">→</span></Link>
            <Link className="btn btn-ghost" to="/book-a-demo">Book a demo</Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <AgentsSection />
      <DayTimeline />
      <PrivacyFlow />
      <HowItWorks />
      <Impact />
      <Compare />
      <Security />
      <Pricing />
      <PartnerBand />
      <FinalCta />
    </>
  )
}

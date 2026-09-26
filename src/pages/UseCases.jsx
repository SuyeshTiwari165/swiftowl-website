import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Icon, Reveal } from '../components/ui'
import { PageCta } from '../components/Blocks'

const JOBS = [
  ['SCOUT', 'Never lose a decision', 'Every meeting and project room summarised, key decisions saved and searchable. Nothing important slips through the cracks.'],
  ['PILOT', 'A to-do list that runs itself', 'Plans that build themselves and adapt as the week changes. Owners, deadlines and follow-ups handled.'],
  ['ONBOARDING', 'Productive from day one', 'New hires get company context and built-in advisors from their first hour. No long ramp-up.'],
  ['DIGESTS', 'A brief, morning and evening', 'The whole team starts and ends the day aligned, automatically. No status meetings required.'],
]

const JOURNEY = [
  ['Day 1', 'Set up your workspace', 'Create your workspace, set up your team and invite your first admin.'],
  ['Days 1–2', 'Add knowledge', 'Upload documents, SOPs and internal notes securely.'],
  ['Days 2–3', 'Set permissions', 'Create teams, set role-based access and configure MFA.'],
  ['Days 3–5', 'Invite your team', 'Roll out to everyone. If they can type, they can use it.'],
  ['Ongoing', 'Monitor and improve', 'Track usage, review audit logs and improve over time.'],
]

const TEAMS = [
  {
    id: 'legal', name: 'Legal', icon: 'doc',
    body: 'Summarise contracts safely, review clause libraries and answer policy questions from internal documents.',
    asks: ['Summarise the termination terms in the Northwind MSA', 'Which of our vendor contracts auto-renew this quarter?', 'Does our data policy allow sharing reports with contractors?'],
  },
  {
    id: 'hr', name: 'Human resources', icon: 'users',
    body: 'Onboarding knowledge base, policy Q&A and job-description drafting from your internal frameworks.',
    asks: ['How many days of parental leave do we offer?', 'Draft a job description for a senior accountant using our levelling guide', 'What does a new hire need to complete in week one?'],
  },
  {
    id: 'ops', name: 'Operations', icon: 'layers',
    body: 'SOP lookup and summaries, process documentation and vendor management without external exposure.',
    asks: ['What’s the escalation process for a delayed shipment?', 'Summarise the warehouse returns SOP in five steps', 'Which vendors handle our IT hardware?'],
  },
  {
    id: 'finance', name: 'Finance', icon: 'chart',
    body: 'Financial report summaries, budget Q&A from controlled context, and audit support.',
    asks: ['How did Q3 marketing spend compare with budget?', 'Summarise the key risks in last year’s audit letter', 'What’s our approval limit for purchases without a PO?'],
  },
  {
    id: 'sales', name: 'Sales', icon: 'spark',
    body: 'Proposal generation from past responses, competitive intelligence and tailored customer-facing content.',
    asks: ['Draft a proposal for a 40-seat logistics company from our past wins', 'How do we position against generic AI chat tools?', 'Write a follow-up email for yesterday’s Aster & Co demo'],
  },
  {
    id: 'it', name: 'IT and security', icon: 'shield',
    body: 'Centralised, governed AI to reduce shadow AI, with audit logs, visibility and access controls.',
    asks: ['Who accessed the finance group this week?', 'Which teams have MFA switched off?', 'Summarise our incident response plan for the board'],
  },
]

function TeamPicker() {
  const [active, setActive] = useState(0)
  const team = TEAMS[active]

  function onKey(e) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    const n = (active + (e.key === 'ArrowRight' ? 1 : -1) + TEAMS.length) % TEAMS.length
    setActive(n)
    document.getElementById(`team-tab-${n}`)?.focus()
  }

  return (
    <div className="teams">
      <div className="team-tabs" role="tablist" aria-label="Teams" onKeyDown={onKey}>
        {TEAMS.map((t, i) => (
          <button
            key={t.id}
            id={`team-tab-${i}`}
            role="tab"
            aria-selected={i === active}
            aria-controls="team-panel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
          >
            {i === active && <motion.span layoutId="team-pill" className="team-pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
            <span><Icon name={t.icon} size={17} /> {t.name}</span>
          </button>
        ))}
      </div>
      <div className="team-panel" id="team-panel" role="tabpanel" aria-labelledby={`team-tab-${active}`}>
        <AnimatePresence mode="wait">
          <motion.div key={team.id} className="team-grid" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
            <div>
              <h3 className="h3" style={{ fontSize: 'clamp(26px, 3vw, 38px)' }}>{team.name}</h3>
              <p className="lede" style={{ marginTop: 14 }}>{team.body}</p>
            </div>
            <div className="team-asks">
              <p className="demo-label"><span>Example questions</span></p>
              {team.asks.map((q, i) => (
                <motion.div key={q} className="team-ask" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.08 }}>
                  <Icon name="arrow" size={15} />
                  {q}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function Journey() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1])
  return (
    <div className="journey journey-5" ref={ref}>
      <div className="journey-track" aria-hidden="true">
        <motion.div className="journey-fill" style={reduce ? undefined : { scaleX: fill }} />
      </div>
      {JOURNEY.map(([when, t, p], i) => (
        <Reveal key={t} className="journey-step" delay={i * 0.1}>
          <span className="journey-dot">{i + 1}</span>
          <span className="muted" style={{ fontSize: 13 }}>{when}</span>
          <h3 className="h3">{t}</h3>
          <p>{p}</p>
        </Reveal>
      ))}
    </div>
  )
}

export default function UseCases() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <Reveal className="section-head" style={{ maxWidth: 900 }}>
            <p className="eyebrow">Use cases</p>
            <h1 className="display h1">Built for the jobs your team actually has.</h1>
            <p className="lede">
              Four jobs every team recognises, in plain language, plus deeper support for every department in your business.
            </p>
          </Reveal>
          <div className="jobs">
            {JOBS.map(([tag, t, p], i) => (
              <Reveal key={t} className="job" delay={i * 0.08}>
                <span className="agent-name">{tag}</span>
                <h2 className="h3">{t}</h2>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="section-head">
            <p className="eyebrow">By team</p>
            <h2 className="display h2">One secure workspace for every team.</h2>
            <p className="lede">Pick a team to see what it asks Swift Owl.</p>
          </Reveal>
          <Reveal><TeamPicker /></Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="section-head">
            <p className="eyebrow">Onboarding journey</p>
            <h2 className="display h2">From sign-up to fully productive in days, not months.</h2>
            <p className="lede">No lengthy IT projects and no complex integrations. Your team is answering questions from internal knowledge within days.</p>
          </Reveal>
          <Journey />
        </div>
      </section>

      <PageCta title="Find your team’s first win." lede="Most teams see value in their first week. From $199/month for your entire business." />
    </>
  )
}

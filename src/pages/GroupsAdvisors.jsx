import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { Icon, Reveal } from '../components/ui'
import { CheckList, PageCta } from '../components/Blocks'

const STAGES = ['Team asks', 'Advisors respond', 'Team discusses', 'Action taken']

const THREAD = [
  { stage: 0, who: 'Maya', role: 'Marketing lead', kind: 'human', text: 'What messaging should we use for our launch?' },
  { stage: 1, who: 'Strategy advisor', kind: 'advisor', text: 'Three angles: privacy-first AI for teams, productive from day one, and one simple price for the whole company.' },
  { stage: 1, who: 'Market researcher', kind: 'advisor', text: 'Privacy comes up most often in your recent call notes. It’s the angle buyers repeat back to you.' },
  { stage: 2, who: 'Sam', role: 'Product', kind: 'human', text: 'Agreed. Lead with privacy and use day one as the proof point.' },
  { stage: 3, who: 'Scout', kind: 'agent', text: 'Saved the decision: launch messaging leads with privacy.' },
  { stage: 3, who: 'Pilot', kind: 'agent', text: 'Created 3 tasks: landing page copy (Maya), launch email (Sam), sales one-pager (Maya).' },
]

function GroupDemo() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const reduce = useReducedMotion()
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) { setN(THREAD.length); return }
    if (n >= THREAD.length) return
    const id = setTimeout(() => setN(n + 1), n === 0 ? 300 : 1500)
    return () => clearTimeout(id)
  }, [inView, n, reduce])

  const stage = n === 0 ? -1 : THREAD[n - 1].stage

  return (
    <div className="group-demo" ref={ref}>
      <ol className="stage-list">
        {STAGES.map((s, i) => (
          <li key={s} className={i <= stage ? 'on' : ''}>
            <span className="stage-n">{i + 1}</span>{s}
          </li>
        ))}
      </ol>
      <div className="thread">
        <div className="demo-label" style={{ color: 'rgba(255,255,255,.5)' }}>
          <span># product-launch</span><span>4 people · 2 advisors</span>
        </div>
        <div className="thread-msgs" aria-live="polite">
          <AnimatePresence initial={false}>
            {THREAD.slice(0, n).map((m) => (
              <motion.div
                key={m.text}
                className={`msg msg-${m.kind}`}
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              >
                <span className="msg-avatar" aria-hidden="true">
                  {m.kind === 'human' ? m.who[0] : <Icon name={m.kind === 'agent' ? 'check' : 'spark'} size={14} stroke={2.5} />}
                </span>
                <div>
                  <span className="msg-who">{m.who}{m.role && <em> · {m.role}</em>}</span>
                  <p>{m.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {n >= THREAD.length && (
          <button className="screen-btn" onClick={() => setN(0)}>Replay the conversation</button>
        )}
      </div>
    </div>
  )
}

const ADVISORS = [
  ['chart', 'Finance advisor', 'Analyses numbers, builds models, answers financial questions and helps you make smarter decisions.'],
  ['doc', 'Legal advisor', 'Reviews contracts, flags risks, suggests safer language and helps keep you compliant.'],
  ['compass', 'Strategy advisor', 'Helps with positioning, messaging, pricing strategy and growth recommendations.'],
  ['globe', 'Market researcher', 'Tracks competitors, analyses trends and delivers market insights you can use.'],
  ['layers', 'Product advisor', 'Guides the roadmap, prioritisation and feature decisions based on customer needs.'],
  ['spark', 'Build your own', 'Create a custom advisor from your own knowledge and invite it into any group.'],
]

const SOURCES = ['Sales playbook.docx', 'Pricing sheet.xlsx', 'Past proposals', 'Objection handling notes']
const TONES = {
  Direct: 'Lead with the refund policy, then offer the annual discount. Keep it to two lines.',
  Friendly: 'Happy to help! I’d open with the refund policy, then mention the annual discount as a nice extra.',
  Formal: 'I recommend addressing the refund policy first, followed by the annual discount as a secondary incentive.',
}

function AdvisorBuilder() {
  const [name, setName] = useState('Deal Desk')
  const [tone, setTone] = useState('Friendly')
  const [sources, setSources] = useState(['Sales playbook.docx', 'Pricing sheet.xlsx'])
  const toggle = (s) => setSources((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]))
  const initials = (name.trim() || 'Advisor').split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="builder">
      <div className="calc builder-form">
        <div className="field">
          <label htmlFor="adv-name">1. Name your advisor</label>
          <input id="adv-name" value={name} maxLength={28} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="field" style={{ marginTop: 18 }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>2. Choose its knowledge</span>
          <div className="seg">
            {SOURCES.map((s) => (
              <button type="button" key={s} aria-pressed={sources.includes(s)} onClick={() => toggle(s)}>{s}</button>
            ))}
          </div>
        </div>
        <div className="field" style={{ marginTop: 18 }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>3. Set its tone</span>
          <div className="seg">
            {Object.keys(TONES).map((t) => (
              <button type="button" key={t} aria-pressed={tone === t} onClick={() => setTone(t)}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="builder-preview" aria-live="polite">
        <p className="demo-label" style={{ color: 'rgba(255,255,255,.5)' }}><span>4. Invite it to a group</span></p>
        <div className="adv-card">
          <motion.span key={initials} className="adv-avatar" initial={{ scale: 0.6 }} animate={{ scale: 1 }}>{initials}</motion.span>
          <div>
            <strong>{name.trim() || 'Your advisor'}</strong>
            <span className="adv-sub">Custom advisor · {sources.length} {sources.length === 1 ? 'source' : 'sources'}</span>
          </div>
        </div>
        <div className="adv-sources">
          <AnimatePresence initial={false}>
            {sources.map((s) => (
              <motion.span key={s} layout className="adv-source" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                <Icon name="doc" size={12} /> {s}
              </motion.span>
            ))}
          </AnimatePresence>
          {sources.length === 0 && <span className="adv-empty">Pick at least one source so it has something to answer from.</span>}
        </div>
        <div className="msg msg-human" style={{ marginTop: 18 }}>
          <span className="msg-avatar" aria-hidden="true">J</span>
          <div><span className="msg-who">Jordan</span><p>A prospect is asking for a discount. How should I respond?</p></div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={tone + sources.length} className="msg msg-advisor" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <span className="msg-avatar" aria-hidden="true"><Icon name="spark" size={14} stroke={2.5} /></span>
            <div>
              <span className="msg-who">{name.trim() || 'Your advisor'}</span>
              <p>{sources.length ? TONES[tone] : 'I don’t have any knowledge yet. Add a source and I’ll answer from it.'}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

const HOW = [
  ['Create a group', 'Start a group for any project, topic or team.'],
  ['Invite people', 'Add your teammates, clients or partners.'],
  ['Add advisors', 'Bring in AI advisors with the expertise you need.'],
  ['Start talking', 'Ask questions, share updates, get expert input.'],
  ['Get things done', 'Decisions captured, tasks created, everyone aligned.'],
]

export default function GroupsAdvisors() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <Reveal className="section-head" style={{ maxWidth: 900 }}>
            <p className="eyebrow">Groups and advisors</p>
            <h1 className="display h1" style={{ fontSize: 'clamp(42px, 6.4vw, 88px)' }}>
              Humans and AI working together. <span className="mark">In the same room.</span>
            </h1>
            <p className="lede">
              Create groups that bring your team and AI advisors together to talk, share knowledge, solve problems and get real work done.
            </p>
            <div className="hero-actions" style={{ marginTop: 32 }}>
              <Link className="btn btn-primary" to="/start-free-trial">Start free trial <span className="arrow">→</span></Link>
              <Link className="btn btn-ghost" to="/book-a-demo">Book a demo</Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}><GroupDemo /></Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="section-head">
            <p className="eyebrow">How it works</p>
            <h2 className="display h2">How groups with advisors work.</h2>
          </Reveal>
          <div className="steps steps-5">
            {HOW.map(([t, p], i) => (
              <Reveal key={t} className="step" delay={i * 0.08}>
                <span className="step-n">Step {i + 1}</span>
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
            <p className="eyebrow">Advisors</p>
            <h2 className="display h2">Advisors that act like part of your team.</h2>
          </Reveal>
          <div className="why-grid adv-grid">
            {ADVISORS.map(([icon, t, p], i) => (
              <Reveal key={t} className={'why-card' + (i === 5 ? ' why-card-accent' : '')} delay={(i % 3) * 0.08}>
                <span className="sec-icon" style={{ background: 'var(--violet-soft)', color: 'var(--violet)' }}><Icon name={icon} size={22} /></span>
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
            <p className="eyebrow">Custom advisor</p>
            <h2 className="display h2">Build your own expert in minutes.</h2>
            <p className="lede">Try it: name an advisor, pick what it knows and how it talks, and see how it answers.</p>
          </Reveal>
          <Reveal><AdvisorBuilder /></Reveal>
          <Reveal>
            <CheckList className="checks" items={['Custom advisors learn only from the knowledge you bring into Swift Owl. Nothing else.']} />
          </Reveal>
        </div>
      </section>

      <PageCta title="Better together." lede="Bring your people and AI advisors into the same room and get more done. Free for 30 days." />
    </>
  )
}

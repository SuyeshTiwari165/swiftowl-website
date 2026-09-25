import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Icon, Reveal } from '../components/ui'
import { CheckList, Faq, PageCta } from '../components/Blocks'
import { SECURITY_FAQS } from '../content/faqs'

const WITHOUT = [
  'Employees paste full documents into public chat windows.',
  'The entire context is sent to third-party AI infrastructure.',
  'Data may be retained and used for training.',
  'Compliance violations go unnoticed. No audit trail.',
]
const WITH = [
  'All company knowledge lives securely inside Swift Owl.',
  'Only minimal, filtered context is ever used.',
  'Your data never touches public AI training pipelines.',
  'Full audit trail. Know what happened, who did it, and when.',
]

function RiskToggle() {
  const [safe, setSafe] = useState(true)
  const list = safe ? WITH : WITHOUT
  return (
    <div className={'risk' + (safe ? ' is-safe' : '')}>
      <div className="risk-switch" role="radiogroup" aria-label="Compare">
        {[['Without Swift Owl', false], ['With Swift Owl', true]].map(([label, val]) => (
          <button key={label} role="radio" aria-checked={safe === val} onClick={() => setSafe(val)}>
            {safe === val && <motion.span layoutId="risk-pill" className="risk-pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
            <span>{label}</span>
          </button>
        ))}
      </div>
      <ul className="risk-list" aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((t, i) => (
            <motion.li
              key={t}
              initial={{ opacity: 0, x: safe ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: safe ? -20 : 20 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <span className="risk-mark"><Icon name={safe ? 'check' : 'x'} size={15} stroke={3} /></span>
              {t}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  )
}

// Each control maps to the flow step it happens in.
const FLOW = [
  { h: 'Indexed on your infrastructure', p: 'Documents are indexed on infrastructure under your control, so the source data never leaves.' },
  { h: 'Relevant passage retrieved', p: 'Only the document passage needed to answer the request is retrieved.', control: 0 },
  { h: 'Identifiers obfuscated', p: 'Names, emails, phone numbers and account numbers are swapped for tokens in the passage and in your typed message before anything is sent.', control: 1 },
  { h: 'Secure AI processing', p: 'The obfuscated content goes to the AI model provider under a no-training contract.', control: 2 },
  { h: 'Response generated', p: 'The model answers from that context. Tokens are swapped back so you see the real values.' },
  { h: 'Data deleted', p: 'The transmitted content is deleted after the response.', control: 3 },
]
const CONTROLS = ['Relevant retrieval', 'Identifier obfuscation', 'No-training contract', 'Post-response deletion']

function ProtectionFlow() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [hover, setHover] = useState(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 50%'] })
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div className="protect">
      <div className="protect-controls">
        <p className="eyebrow">Four independent controls</p>
        <p className="muted" style={{ fontSize: 15, margin: '0 0 18px' }}>Point at a control to see where it happens.</p>
        <div className="control-list">
          {CONTROLS.map((c, i) => (
            <button
              key={c}
              className={'control' + (hover === i ? ' active' : '')}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
            >
              <span className="control-n">{i + 1}</span>{c}
            </button>
          ))}
        </div>
      </div>
      <div className="protect-steps-wrap" ref={ref}>
        <div className="protect-track" aria-hidden="true">
          <motion.div className="protect-fill" style={reduce ? undefined : { scaleY: fill }} />
        </div>
        <ol className="protect-steps">
          {FLOW.map((s) => {
            const lit = hover !== null && s.control === hover
            const dim = hover !== null && !lit
            return (
              <motion.li
                key={s.h}
                className={'protect-step' + (lit ? ' lit' : '')}
                animate={{ opacity: dim ? 0.35 : 1, x: lit ? 6 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <span className="protect-dot" aria-hidden="true" />
                <div>
                  <h3 className="h3">{s.h}</h3>
                  <p>{s.p}</p>
                  {s.control !== undefined && <span className="control-tag">Control {s.control + 1} · {CONTROLS[s.control]}</span>}
                </div>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

const LAYERS = [
  ['lock', 'Encryption', 'All data is encrypted in transit using TLS 1.2 or higher, and at rest using AES-256.'],
  ['key', 'Access controls', 'Role-based access and optional multi-factor authentication keep your team and data secure.'],
  ['shield', 'Data privacy', 'Your data is never used to train any AI model, ours or anyone else’s.'],
  ['layers', 'Secure infrastructure', 'Hosted on leading cloud platforms with monitoring, isolation and backups.'],
  ['doc', 'Audit and logging', 'Comprehensive audit logs and activity tracking for complete transparency.'],
  ['compass', 'Compliance ready', 'Built to support your compliance requirements, led by ISO 27001.'],
]

const PRACTICES = [
  ['Data isolation', 'Your data is logically isolated with strict tenant separation and access boundaries.'],
  ['Least-privilege access', 'Access is granted on a need-to-know basis and regularly reviewed.'],
  ['Backups and recovery', 'Automatic backups with point-in-time recovery and multi-region redundancy.'],
  ['Monitoring and threat detection', 'Continuous monitoring, anomaly detection and automated threat response.'],
]

export default function Security() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap form-layout" style={{ alignItems: 'center' }}>
          <Reveal>
            <p className="eyebrow">Security you can trust</p>
            <h1 className="display h1" style={{ fontSize: 'clamp(42px, 6vw, 82px)' }}>
              Your data is private. <span className="mark">Your trust</span> is our priority.
            </h1>
            <p className="lede">Swift Owl is built with security and privacy by design, so your team can work with AI confidently.</p>
            <div className="hero-actions" style={{ marginTop: 32 }}>
              <Link className="btn btn-primary" to="/start-free-trial">Start free trial <span className="arrow">→</span></Link>
              <Link className="btn btn-ghost" to="/contact">Request security docs</Link>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="iso-card">
            <span className="iso-seal" aria-hidden="true"><Icon name="shield" size={34} stroke={1.6} /></span>
            <p className="eyebrow" style={{ margin: '18px 0 6px' }}>ISO 27001 certified</p>
            <p style={{ margin: 0, color: 'var(--ink-2)' }}>
              Our information security management system is independently certified to ISO 27001 by ABS Quality Evaluations.
              The scope covers our production platform and hosting infrastructure, not only our corporate systems.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap pricing">
          <Reveal>
            <p className="eyebrow">The risk without Swift Owl</p>
            <h2 className="display h2">What happens when your data goes unprotected?</h2>
            <p className="lede" style={{ marginTop: 22 }}>
              Every time someone pastes company information into a public AI tool, that data leaves your control for good.
            </p>
          </Reveal>
          <Reveal delay={0.1}><RiskToggle /></Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="section-head">
            <p className="eyebrow">Data protection flow</p>
            <h2 className="display h2">Your data stays inside. <span className="mark">Only what’s needed</span> goes out.</h2>
          </Reveal>
          <ProtectionFlow />
        </div>
      </section>

      <section className="section dark">
        <div className="wrap">
          <Reveal className="section-head">
            <p className="eyebrow">Defense in depth</p>
            <h2 className="display h2">Security built into every layer.</h2>
          </Reveal>
          <div className="sec-grid">
            {LAYERS.map(([icon, t, p], i) => (
              <Reveal key={t} className="sec-card" delay={(i % 3) * 0.08}>
                <span className="sec-icon"><Icon name={icon} size={22} /></span>
                <h3 className="h3">{t}</h3>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap pricing" style={{ alignItems: 'start' }}>
          <Reveal>
            <p className="eyebrow">Under the hood</p>
            <h2 className="display h2">Our security practices.</h2>
            <div className="practice-list">
              {PRACTICES.map(([t, p]) => (
                <div key={t} className="practice"><h3>{t}</h3><p>{p}</p></div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="calc">
            <p className="eyebrow">Your data, your control</p>
            <h3 className="h3" style={{ marginBottom: 6 }}>You stay in control of your data at all times.</h3>
            <CheckList items={[
              'Export your data on request, within 7 business days',
              'Delete your data on request, within 7 business days',
              'Retention set at onboarding and changed on request',
            ]} />
            <p className="muted" style={{ fontSize: 14, margin: '22px 0 0' }}>
              Full details are in our <Link to="/privacy-policy">privacy policy</Link>.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap faq-layout">
          <Reveal>
            <p className="eyebrow">Questions</p>
            <h2 className="display h2">Security FAQ.</h2>
            <p className="lede" style={{ marginTop: 22 }}>
              Can’t find your answer? <Link to="/contact">Ask our team</Link>.
            </p>
          </Reveal>
          <Reveal delay={0.1}><Faq items={SECURITY_FAQS} /></Reveal>
        </div>
      </section>

      <PageCta title="Security you can count on." lede="Focus on your work. We’ll handle the rest. No credit card, free for 30 days." />
    </>
  )
}

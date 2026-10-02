import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

// The hero's thesis, in two acts:
// 1. Your library stays put; only one passage travels to the model.
// 2. Personal data in that passage is swapped for encrypted tokens before it
//    leaves, and swapped back in the reply you read.
const DOCS = [
  'Billing policy 2026.pdf', 'Client onboarding SOP.docx', 'Q3 board deck.pptx',
  'Standup notes · Sep 22', 'Brand guidelines.pdf', 'Hiring plan.xlsx',
  'Vendor contracts.pdf', 'Support playbook.docx', 'Pricing sheet.xlsx',
  'Security policy.pdf', 'Sales call notes', 'Product roadmap.docx',
]

// A segment is plain text or a PII value { v: real value, t: token the model sees }.
const P = (v, t) => ({ v, t: `[[PII:${t}]]` })

const DANIEL = P('Daniel Okafor', 'q7Xk2…')
const DANIEL_MAIL = P('daniel@northwind.io', 'Lm0vR…')
const DANIEL_TEL = P('+1 415 555 0142', 'Zp4sE…')
const PRIYA = P('Priya Sharma', 'c2Hw9…')
const PRIYA_TEL = P('+44 20 7946 0958', 'Tn8aJ…')
const MARCO = P('Marco Rossi', 'Wd5yQ…')
const IBAN = P('GB29 NWBK 6016 1331 9268 19', 'fR3oB…')

const QUESTIONS = [
  {
    q: 'Can Northwind still get a refund?',
    doc: 10, line: 1,
    passage: ['Call with ', DANIEL, ' (', DANIEL_MAIL, ', ', DANIEL_TEL, '): renewed the annual plan on Sep 2 and asked about refunds.'],
    answer: ['Yes. ', DANIEL, ' renewed on Sep 2, so Northwind is inside the 30-day full refund window. You can reach him at ', DANIEL_MAIL, '.'],
    source: 'Sales call notes · Sep 18',
  },
  {
    q: 'Who runs onboarding for Aster & Co?',
    doc: 1, line: 0,
    passage: ['Account lead ', PRIYA, ' runs the Aster & Co kickoff and hands over to Support within 5 business days. Direct line ', PRIYA_TEL, '.'],
    answer: [PRIYA, ' runs the kickoff, then hands Aster & Co to Support within 5 business days. Her direct line is ', PRIYA_TEL, '.'],
    source: 'Client onboarding SOP.docx · Step 1',
  },
  {
    q: 'Where do we pay Lumen Labs?',
    doc: 6, line: 2,
    passage: ['Lumen Labs remittance: IBAN ', IBAN, '. Finance contact ', MARCO, '. Net 30.'],
    answer: ['Pay Lumen Labs to IBAN ', IBAN, ' on net 30 terms. Your finance contact there is ', MARCO, '.'],
    source: 'Vendor contracts.pdf · Schedule B',
  },
]

const LINES = [0.9, 0.7, 0.8]
const TIMINGS = { scan: 1300, hit: 900, send: 900, mask: 1600, restore: 1300 }
const NEXT = { scan: 'hit', hit: 'send', send: 'mask', mask: 'draft', restore: 'done' }

const segText = (s, mode) => (typeof s === 'string' ? s : mode === 'real' ? s.v : s.t)
const piiCount = (segs) => segs.filter((s) => typeof s !== 'string').length

// Renders segments, optionally cut off after `budget` characters (for typing).
function Segs({ segs, mode, budget = Infinity, animate = false }) {
  let left = budget
  const out = []
  segs.forEach((s, i) => {
    if (left <= 0) return
    const full = segText(s, mode)
    const text = full.slice(0, left)
    left -= full.length
    if (typeof s === 'string') { out.push(<span key={i}>{text}</span>); return }
    const cls = mode === 'real' ? 'pii-real' : mode === 'token' ? 'pii-tok' : 'pii-raw'
    out.push(
      animate ? (
        <AnimatePresence key={i} mode="wait" initial={false}>
          <motion.span
            key={mode}
            className={cls}
            initial={{ opacity: 0, y: 5, filter: 'blur(3px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -5, filter: 'blur(3px)' }}
            transition={{ duration: 0.28, delay: i * 0.03 }}
          >
            {text}
          </motion.span>
        </AnimatePresence>
      ) : <span key={i} className={cls}>{text}</span>
    )
  })
  return out
}

export default function PassageDemo() {
  const reduce = useReducedMotion()
  const [qi, setQi] = useState(0)
  // scan → hit → send → mask → draft (model types its tokenised reply) → restore → done
  const [phase, setPhase] = useState('scan')
  const [typed, setTyped] = useState(0)
  const [paused, setPaused] = useState(false)
  const timer = useRef()
  const cur = QUESTIONS[qi]
  const draftLen = cur.answer.reduce((n, s) => n + segText(s, 'token').length, 0)

  useEffect(() => {
    clearTimeout(timer.current)
    if (NEXT[phase] && TIMINGS[phase]) {
      timer.current = setTimeout(() => setPhase(NEXT[phase]), reduce ? 60 : TIMINGS[phase])
    } else if (phase === 'done' && !paused) {
      timer.current = setTimeout(() => ask((qi + 1) % QUESTIONS.length), 6500)
    }
    return () => clearTimeout(timer.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, qi, paused, reduce])

  useEffect(() => {
    if (phase !== 'draft') return
    if (reduce) { setTyped(draftLen); setPhase('restore'); return }
    setTyped(0)
    const id = setInterval(() => {
      setTyped((t) => {
        if (t >= draftLen) { clearInterval(id); setTimeout(() => setPhase('restore'), 500); return t }
        return t + 2
      })
    }, 22)
    return () => clearInterval(id)
  }, [phase, draftLen, reduce])

  function ask(i) {
    setQi(i)
    setTyped(0)
    setPhase('scan')
  }

  const at = (p) => ORDER.indexOf(phase) >= ORDER.indexOf(p)
  const hitShown = at('hit')
  const sent = at('send')
  const masked = at('mask')
  const answering = at('draft')
  const restored = at('restore')
  const n = piiCount(cur.passage)

  return (
    <div
      className="demo"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="demo-bar">
        <div className="demo-dots"><i /><i /><i /></div>
        <span className="mono">Ask SwiftOwl · try a question</span>
      </div>

      <div className="demo-body">
      <div className="demo-questions" role="group" aria-label="Example questions">
        {QUESTIONS.map((item, i) => (
          <button key={i} className="demo-q" aria-pressed={i === qi} onClick={() => ask(i)}>
            {item.q}
          </button>
        ))}
      </div>

      <div className="demo-stage">
        <div className="demo-vault">
          <div className="demo-label"><span>Your library</span></div>
          <div className="doc-grid">
            {DOCS.map((name, i) => {
              const isHit = hitShown && i === cur.doc
              return (
                <motion.div
                  key={name}
                  className={'doc' + (isHit ? ' is-hit' : '')}
                  animate={{ opacity: hitShown && !isHit ? 0.45 : 1, scale: isHit ? 1.04 : 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="doc-name">{name}</span>
                  <div className="doc-lines">
                    {LINES.map((w, li) => (
                      isHit && li === cur.line && !sent
                        ? <motion.i key={li} layoutId={`passage-${qi}`} className="hit" style={{ width: `${w * 100}%` }} />
                        : <i key={li} className={isHit && li === cur.line ? 'hit' : ''} style={{ width: `${w * 100}%`, opacity: isHit && li === cur.line ? 0.35 : 1 }} />
                    ))}
                  </div>
                  {phase === 'scan' && !reduce && (
                    <motion.div
                      className="doc-scan"
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 0.7, delay: (i % 3) * 0.12 + Math.floor(i / 3) * 0.1, repeat: 1 }}
                    />
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="demo-side">
          <div className="demo-model">
            <div className="demo-label">
              <span>{masked ? 'What the model sees' : 'Leaving your servers'}</span>
              {masked && <motion.span className="mask-badge" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>{n} PII masked</motion.span>}
            </div>
            {sent ? (
              <motion.div layoutId={`passage-${qi}`} className="passage" transition={{ type: 'spring', stiffness: 120, damping: 18 }}>
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
                  <Segs segs={cur.passage} mode={masked ? 'token' : 'raw'} animate={!reduce} />
                </motion.span>
              </motion.div>
            ) : (
              <p style={{ margin: 0, fontSize: 12.5, color: 'rgba(255,255,255,.65)' }}>
                {phase === 'scan' ? 'Searching your library…' : 'Found one relevant passage'}
              </p>
            )}
            <AnimatePresence>
              {phase === 'mask' && (
                <motion.p className="mask-note" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  Names, emails, phone numbers and bank details are encrypted before sending.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="demo-answer" aria-live="polite">
            <div className="demo-label">
              <span>{restored ? 'What you see' : answering ? 'Model’s reply' : 'Answer'}</span>
              {restored && <motion.span className="restore-badge" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>real values restored</motion.span>}
            </div>
            {answering ? (
              <>
                <Segs segs={cur.answer} mode={restored ? 'real' : 'token'} budget={restored ? Infinity : typed} animate={!reduce && restored} />
                {phase === 'draft' && <span className="caret" />}
                <AnimatePresence>
                  {phase === 'done' && (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                      <span className="cite">↳ {cur.source}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <span className="muted">…</span>
            )}
          </div>
        </div>
      </div>
      </div>

      <div className="demo-foot">
        <div><b>12</b><span>documents searched on your servers</span></div>
        <div className="sent"><b>{sent ? 1 : 0}</b><span>passage sent</span></div>
        <div className="masked"><b>{masked ? n : 0}</b><span>personal details masked</span></div>
      </div>
    </div>
  )
}

const ORDER = ['scan', 'hit', 'send', 'mask', 'draft', 'restore', 'done']

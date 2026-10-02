import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Icon } from './ui'

const AGENTS = [
  { id: 'scout', name: 'SCOUT', title: 'Turns chats into tasks', body: 'Tell Scout what happened, in your own words, and it pulls out the action items, owners and deadlines.' },
  { id: 'pilot', name: 'PILOT', title: 'Keeps your day on track', body: 'A morning and evening briefing on what’s pending, overdue and worth your attention.' },
  { id: 'coach', name: 'COACH', title: 'Follows up for you', body: 'Watches your outstanding tasks and nudges the people holding them up, so nothing goes quiet.' },
]
const ROTATE_MS = 7000

export default function Agents() {
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!auto || reduce) return
    const id = setTimeout(() => setActive((a) => (a + 1) % AGENTS.length), ROTATE_MS)
    return () => clearTimeout(id)
  }, [active, auto, reduce])

  function pick(i) { setActive(i); setAuto(false) }

  function onKey(e) {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
    e.preventDefault()
    const n = (active + (e.key === 'ArrowDown' ? 1 : -1) + AGENTS.length) % AGENTS.length
    pick(n)
    document.getElementById(`agent-tab-${n}`)?.focus()
  }

  return (
    <div className="agents">
      <div className="agent-tabs" role="tablist" aria-orientation="vertical" onKeyDown={onKey}>
        {AGENTS.map((a, i) => (
          <button
            key={a.id}
            id={`agent-tab-${i}`}
            role="tab"
            aria-selected={i === active}
            aria-controls="agent-panel"
            tabIndex={i === active ? 0 : -1}
            className="agent-tab"
            onClick={() => pick(i)}
          >
            {i === active && <motion.span layoutId="agent-bg" className="agent-tab-bg" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />}
            <span className="agent-name">{a.name}</span>
            <h3 className="h3">{a.title}</h3>
            <p>{a.body}</p>
            {i === active && auto && !reduce && (
              <motion.span
                key={`p-${active}`}
                className="agent-progress"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: ROTATE_MS / 1000, ease: 'linear' }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="agent-screen" id="agent-panel" role="tabpanel" aria-labelledby={`agent-tab-${active}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={AGENTS[active].id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            {active === 0 && <ScoutScreen />}
            {active === 1 && <PilotScreen />}
            {active === 2 && <CoachScreen />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// What Scout actually does: you type or paste an update into chat, and it pulls
// out the action items, owners and deadlines. It doesn't listen in on meetings
// or read your other apps — only the conversation you give it.
const UPDATE = [
  'Quick recap from standup: Sarah is finalizing the ad creatives, done by Wednesday.',
  'David needs to send the campaign budget for approval before Friday.',
  'And I still have to review the landing page.',
]
const FOUND = [
  { text: 'Finalize ad creatives', who: 'Sarah', due: 'Wed' },
  { text: 'Send campaign budget for approval', who: 'David', due: 'Fri' },
  { text: 'Review the landing page', who: 'You', due: null },
]

function ScoutScreen() {
  const [n, setN] = useState(0)
  const done = n >= UPDATE.length
  useEffect(() => {
    if (done) return
    const id = setTimeout(() => setN((v) => v + 1), n === 0 ? 500 : 900)
    return () => clearTimeout(id)
  }, [n, done])
  return (
    <>
      <div className="demo-label"><span>Scout · typed into chat</span><span>{done ? 'action items found' : 'typing…'}</span></div>
      <div className="screen-stack">
        <AnimatePresence initial={false}>
          {UPDATE.slice(0, n).map((line, i) => (
            <motion.div key={i} className="screen-card" initial={{ opacity: 0, x: -20, height: 0 }} animate={{ opacity: 1, x: 0, height: 'auto' }} transition={{ duration: 0.45 }}>
              {line}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {done && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: 14 }}>
            <div className="demo-label"><span>Scout found</span></div>
            <div className="screen-stack">
              {FOUND.map((t) => (
                <div key={t.text} className="screen-card task">
                  <span>{t.text}</span>
                  <span className="due">{t.who}{t.due ? ` · ${t.due}` : ''}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {done && (
        <motion.button className="screen-btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setN(0)}>
          Replay
        </motion.button>
      )}
    </>
  )
}

const TASKS_A = [
  { id: 1, text: 'Send Northwind the SSO checklist', due: 'Today', done: true },
  { id: 2, text: 'Draft partner pricing copy', due: 'Fri' },
  { id: 3, text: 'Review Q4 hiring plan', due: 'Mon' },
  { id: 4, text: 'Prep board deck outline', due: 'Oct 12' },
]
const TASKS_B = [
  { id: 1, text: 'Send Northwind the SSO checklist', due: 'Today', done: true },
  { id: 4, text: 'Prep board deck outline', due: 'Wed ↑' },
  { id: 2, text: 'Draft partner pricing copy', due: 'Fri' },
  { id: 3, text: 'Review Q4 hiring plan', due: 'Tue →' },
]

function PilotScreen() {
  const [moved, setMoved] = useState(false)
  useEffect(() => {
    const id = setTimeout(() => setMoved(true), 1800)
    return () => clearTimeout(id)
  }, [])
  const tasks = moved ? TASKS_B : TASKS_A
  return (
    <>
      <div className="demo-label"><span>Pilot · your plan</span><span>{moved ? 'replanned' : 'on track'}</span></div>
      <AnimatePresence>
        {moved && (
          <motion.div className="screen-card" style={{ marginBottom: 12, borderColor: 'rgba(179,164,255,.5)' }} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <small>Board meeting moved to Oct 9</small>
            Pilot pulled the deck outline forward and pushed the hiring review.
          </motion.div>
        )}
      </AnimatePresence>
      <div className="screen-stack">
        {tasks.map((t) => (
          <motion.div layout key={t.id} className={'screen-card task' + (t.done ? ' done' : '')} transition={{ type: 'spring', stiffness: 260, damping: 26 }}>
            <span className="task-check">{t.done && <Icon name="check" size={13} stroke={3} />}</span>
            <span>{t.text}</span>
            <span className="due">{t.due}</span>
          </motion.div>
        ))}
      </div>
      <button className="screen-btn" onClick={() => setMoved((m) => !m)}>
        {moved ? 'Undo the change' : 'Move the board meeting'}
      </button>
    </>
  )
}

const AREAS = [
  { name: 'Client follow-ups', v: 22, low: true },
  { name: 'Product roadmap', v: 84 },
  { name: 'Hiring', v: 67 },
  { name: 'Partner outreach', v: 71 },
]

function CoachScreen() {
  return (
    <>
      <div className="demo-label"><span>Coach · this week’s attention</span></div>
      <div className="screen-stack" style={{ gap: 14 }}>
        {AREAS.map((a, i) => (
          <div key={a.name}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 6 }}>
              <span>{a.name}</span><span className="tnum" style={{ opacity: 0.6, fontSize: 12 }}>{a.v}%</span>
            </div>
            <div className={'meter' + (a.low ? ' low' : '')}>
              <motion.i initial={{ width: 0 }} animate={{ width: `${a.v}%` }} transition={{ duration: 0.9, delay: 0.1 + i * 0.1 }} />
            </div>
          </div>
        ))}
      </div>
      <motion.div className="nudge" style={{ marginTop: 26 }} initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 1.1, type: 'spring', stiffness: 200, damping: 20 }}>
        <span className="nudge-dot"><Icon name="bell" size={16} style={{ color: '#fff' }} /></span>
        <div>
          <strong style={{ fontSize: 14.5 }}>3 leads haven’t had a reply in 4 days</strong>
          <div style={{ fontSize: 13.5, color: 'var(--ink-2)', marginTop: 2 }}>Northwind, Aster & Co and Lumen Labs. Want Pilot to add follow-ups to today?</div>
        </div>
      </motion.div>
    </>
  )
}

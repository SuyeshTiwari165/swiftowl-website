import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'

// Grounded in what each agent actually does: Pilot sends the morning/evening
// briefing, Scout turns a chat message into tasks (it never listens in on a
// standup — someone has to type the recap), Coach chases stale tasks.
const EVENTS = [
  { time: '7:00', ampm: 'AM', who: 'Pilot', title: 'Morning brief', body: 'The team gets today’s priorities before anyone logs on.' },
  { time: '9:30', ampm: 'AM', who: 'Scout', title: 'Notes become tasks', body: 'Someone types their standup recap into chat, and Scout pulls out the action items, owners and deadlines.' },
  { time: '11:00', ampm: 'AM', who: 'Pilot', title: 'The plan reshuffles', body: 'A deadline moves, and the next briefing reflects the new priorities.' },
  { time: '2:00', ampm: 'PM', who: 'Coach', title: 'A timely nudge', body: 'A reminder about the leads nobody has answered yet.' },
  { time: '6:00', ampm: 'PM', who: 'Pilot', title: 'Evening brief', body: 'What shipped, what carried over. Tomorrow starts clear.' },
]

const STOPS = [0, 0.25, 0.5, 0.75, 1]

export default function DayTimeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [idx, setIdx] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    setIdx(Math.min(EVENTS.length - 1, Math.max(0, Math.floor(p * EVENTS.length))))
  })

  // Brand palette across a working day: cream → pale blue → sherbet dusk → indigo → navy.
  const sky = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.7, 0.8, 1], ['#f5e9d4', '#e6eeff', '#f6f9fc', '#ffd9bf', '#665efd', '#1c1e54'])
  const ink = useTransform(scrollYProgress, [0, 0.74, 0.8], ['#0d253d', '#0d253d', '#ffffff'])
  const orbX = useTransform(scrollYProgress, [0, 1], ['6vw', '86vw'])
  const orbY = useTransform(scrollYProgress, STOPS, ['62vh', '22vh', '10vh', '22vh', '58vh'])
  const orbBg = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], ['#ffab72', '#fff6dc', '#ff9a5a', '#dfdefd'])
  const orbGlow = useTransform(orbBg, (c) => `0 0 120px 40px ${c}`)

  const ev = EVENTS[idx]

  return (
    <section className="day" ref={ref} aria-label="A day with SwiftOwl">
      <motion.div className="day-sticky" style={{ color: ink }}>
        <motion.div className="day-sky" style={{ background: sky }} />
        <motion.div className="day-orb" style={{ x: orbX, y: orbY, background: orbBg, boxShadow: orbGlow }} aria-hidden="true" />
        <div className="day-content">
          <div className="wrap">
            <p className="eyebrow">A day with SwiftOwl</p>
            <div className="day-grid">
              <div className="day-clock" aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={ev.time}
                    style={{ display: 'inline-block' }}
                    initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -30, filter: 'blur(6px)' }}
                    transition={{ duration: 0.4 }}
                  >
                    {ev.time}<span style={{ fontSize: '0.32em', letterSpacing: 0, marginLeft: '0.2em' }}>{ev.ampm}</span>
                  </motion.span>
                </AnimatePresence>
              </div>
              <div>
                <div className="day-events">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={ev.title}
                      className="day-event"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.4 }}
                    >
                      <span className="day-who">{ev.who.toUpperCase()}</span>
                      <h3 className="h3">{ev.title}</h3>
                      <p style={{ opacity: 0.8 }}>{ev.body}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="day-ticks" aria-hidden="true">
                  {EVENTS.map((e, i) => <i key={e.time} className={i <= idx ? 'on' : ''} />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

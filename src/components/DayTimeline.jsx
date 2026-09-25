import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'

const EVENTS = [
  { time: '7:00', ampm: 'AM', who: 'Scout', title: 'Morning brief', body: 'The team gets today’s priorities in their inbox before anyone logs on.' },
  { time: '9:30', ampm: 'AM', who: 'Scout', title: 'Standup, captured', body: 'The standup is summarised and every decision is saved where people can find it.' },
  { time: '11:00', ampm: 'AM', who: 'Pilot', title: 'The plan reshuffles', body: 'A deadline moves, and Pilot updates everyone’s tasks to match.' },
  { time: '2:00', ampm: 'PM', who: 'Coach', title: 'A timely nudge', body: 'A reminder about the leads nobody has answered yet.' },
  { time: '6:00', ampm: 'PM', who: 'Scout', title: 'Evening brief', body: 'What shipped, what carried over. Tomorrow starts clear.' },
]

const STOPS = [0, 0.25, 0.5, 0.75, 1]

export default function DayTimeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [idx, setIdx] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    setIdx(Math.min(EVENTS.length - 1, Math.max(0, Math.floor(p * EVENTS.length))))
  })

  const sky = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.7, 0.8, 1], ['#ffe3d1', '#dfe9ff', '#eef2ff', '#ffdcc4', '#6d4fc4', '#1d1640'])
  const ink = useTransform(scrollYProgress, [0, 0.74, 0.8], ['#17132b', '#17132b', '#ffffff'])
  const orbX = useTransform(scrollYProgress, [0, 1], ['6vw', '86vw'])
  const orbY = useTransform(scrollYProgress, STOPS, ['62vh', '22vh', '10vh', '22vh', '58vh'])
  const orbBg = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], ['#ffb489', '#fff6dc', '#ff9f6b', '#e9e6ff'])
  const orbGlow = useTransform(orbBg, (c) => `0 0 120px 40px ${c}`)

  const ev = EVENTS[idx]

  return (
    <section className="day" ref={ref} aria-label="A day with Swift Owl">
      <motion.div className="day-sticky" style={{ color: ink }}>
        <motion.div className="day-sky" style={{ background: sky }} />
        <motion.div className="day-orb" style={{ x: orbX, y: orbY, background: orbBg, boxShadow: orbGlow }} aria-hidden="true" />
        <div className="day-content">
          <div className="wrap">
            <p className="eyebrow" style={{ color: 'inherit', opacity: 0.6 }}>A day with Swift Owl</p>
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
                      <span className="mono" style={{ fontSize: 12, letterSpacing: '0.1em', opacity: 0.6 }}>{ev.who.toUpperCase()}</span>
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

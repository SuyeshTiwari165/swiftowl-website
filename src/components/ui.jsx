import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion, animate } from 'framer-motion'

const PATHS = {
  check: 'M4 12.5l5 5L20 6.5',
  x: 'M6 6l12 12M18 6L6 18',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  lock: 'M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 017 0v3',
  shield: 'M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6l8-3z',
  key: 'M14.5 9.5a4 4 0 11-2.9 3.8L4 21v-3h3v-3h3l1.6-1.6',
  doc: 'M7 3h7l5 5v13H7zM14 3v5h5',
  users: 'M9 11a4 4 0 100-8 4 4 0 000 8zM2 21c0-3.9 3.1-7 7-7s7 3.1 7 7M17 3.5a4 4 0 010 7.5M22 21c0-3-1.8-5.6-4.5-6.6',
  spark: 'M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18',
  globe: 'M12 21a9 9 0 100-18 9 9 0 000 18zM3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z',
  mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
  clock: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2',
  chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  bell: 'M6 16V11a6 6 0 1112 0v5l2 2H4zM10 21h4',
  menu: 'M4 7h16M4 12h16M4 17h16',
  handshake: 'M2 12l5-5 4 2 4-2 7 5M7 7l-5 5 6 6 2-1 2 2 2-1 2 1 5-5M11 9l-3 3 2 2 3-2',
  layers: 'M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5',
  compass: 'M12 21a9 9 0 100-18 9 9 0 000 18zM15.5 8.5l-2 5-5 2 2-5z',
  facebook: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
  'brand-x': 'M4 4l16 16M20 4L4 20',
}

export function Icon({ name, size = 20, stroke = 2, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
      <path d={PATHS[name]} />
    </svg>
  )
}

// Fade + rise into view once.
export function Reveal({ as = 'div', delay = 0, y = 24, children, ...rest }) {
  const reduce = useReducedMotion()
  const Comp = motion[as]
  return (
    <Comp
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

export function CountUp({ to, prefix = '', suffix = '', duration = 1.6 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  // The prerendered/static HTML must show the real number — crawlers, link
  // previews and no-JS visitors never run the effects below. Start at `to`,
  // and only drop to 0 once mounted on the client so the count-up can still
  // play for real visitors without ever shipping "0" as the static content.
  const [val, setVal] = useState(to)

  useEffect(() => {
    if (reduce) return
    setVal(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, to, { duration, ease: [0.2, 0.7, 0.2, 1], onUpdate: (v) => setVal(Math.round(v)) })
    return () => controls.stop()
  }, [inView, to, duration, reduce])

  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>
}

export function money(n) {
  return '$' + n.toLocaleString('en-US')
}

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { submitForm, validate } from '../lib/forms'

export function useForm(kind, initial, rules) {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | failed

  const set = (name) => (e) => {
    const v = e?.target ? e.target.value : e
    setValues((s) => ({ ...s, [name]: v }))
    if (errors[name]) setErrors((s) => ({ ...s, [name]: undefined }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    const errs = validate(values, rules)
    setErrors(errs)
    const first = Object.keys(errs)[0]
    if (first) { document.getElementById(`f-${first}`)?.focus(); return }
    setStatus('sending')
    try {
      await submitForm(kind, values)
      setStatus('sent')
    } catch {
      setStatus('failed')
    }
  }

  return { values, errors, status, set, onSubmit, reset: () => { setValues(initial); setStatus('idle') } }
}

// Hidden from real users (off-screen, not display:none — some bots skip
// display:none fields) but present in the DOM for an automated form-filler
// to find. api/submit-form.js silently no-ops the request if this is filled.
export function Honeypot({ value, onChange }) {
  return (
    <input
      type="text"
      name="hp"
      value={value}
      onChange={onChange}
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
    />
  )
}

// Loads the Turnstile script once (lazily, only when a form actually
// mounts one) rather than on every page via a global <script> tag.
let turnstileLoad
function loadTurnstile() {
  if (!turnstileLoad) {
    turnstileLoad = new Promise((resolve) => {
      if (window.turnstile) return resolve(window.turnstile)
      const script = document.createElement('script')
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
      script.async = true
      script.defer = true
      script.onload = () => resolve(window.turnstile)
      document.head.appendChild(script)
    })
  }
  return turnstileLoad
}

// Bot check alongside the honeypot — honeypot catches simple bots for free,
// this catches ones that actually run JavaScript. Calls onToken(token) when
// solved and onToken('') if it expires, so the caller can require a fresh
// token before allowing submit. Needs VITE_TURNSTILE_SITE_KEY (public by
// design, safe in client code) and the server needs TURNSTILE_SECRET_KEY.
export function Turnstile({ onToken }) {
  const ref = useRef(null)
  useEffect(() => {
    let widgetId
    let cancelled = false
    loadTurnstile().then((turnstile) => {
      if (cancelled || !ref.current || !turnstile) return
      try {
        widgetId = turnstile.render(ref.current, {
          sitekey: import.meta.env.VITE_TURNSTILE_SITE_KEY,
          callback: onToken,
          'expired-callback': () => onToken(''),
          'error-callback': () => onToken(''),
        })
      } catch (err) {
        console.error('[Turnstile] failed to render:', err)
      }
    })
    return () => {
      cancelled = true
      if (widgetId !== undefined) window.turnstile?.remove(widgetId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <div ref={ref} className="turnstile" />
}

export function Field({ name, label, optional, error, as = 'input', children, className = '', ...rest }) {
  const Comp = as
  return (
    <div className={`field ${className} ${error ? 'has-error' : ''}`}>
      <label htmlFor={`f-${name}`}>{label} {optional && <span className="opt">(optional)</span>}</label>
      <Comp id={`f-${name}`} name={name} aria-invalid={!!error} aria-describedby={error ? `e-${name}` : undefined} {...rest}>
        {children}
      </Comp>
      {error && <span className="field-error" id={`e-${name}`}>{error}</span>}
    </div>
  )
}

export function Seg({ label, options, value, onChange }) {
  return (
    <div className="field full">
      <span style={{ fontSize: 14, fontWeight: 600 }} id={`seg-${label}`}>{label}</span>
      <div className="seg" role="group" aria-labelledby={`seg-${label}`}>
        {options.map((o) => (
          <button type="button" key={o} aria-pressed={value === o} onClick={() => onChange(o)}>{o}</button>
        ))}
      </div>
    </div>
  )
}

export function SubmitRow({ status, label, sendingLabel, note }) {
  return (
    <>
      <div className="form-submit">
        <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? sendingLabel : label} <span className="arrow">→</span>
        </button>
        {note && <small>{note}</small>}
      </div>
      {status === 'failed' && (
        <div className="form-alert" role="alert">
          Your details weren’t sent. Check your connection and try again.
        </div>
      )}
    </>
  )
}

export function Success({ title, children, action }) {
  return (
    <motion.div className="success" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} role="status">
      <svg className="success-ring" viewBox="0 0 84 84" fill="none" aria-hidden="true">
        <motion.circle cx="42" cy="42" r="38" stroke="currentColor" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7 }} />
        <motion.path d="M27 43l10 10 21-22" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.6 }} />
      </svg>
      <h3 className="h3">{title}</h3>
      <p>{children}</p>
      {action}
    </motion.div>
  )
}

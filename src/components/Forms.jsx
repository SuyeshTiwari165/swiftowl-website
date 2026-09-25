import { useState } from 'react'
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

// Every form on the site (trial, demo, contact, partner) goes through here.
// Set VITE_FORMS_ENDPOINT to a URL that accepts JSON POSTs.
// Without it (local dev), submissions are validated and logged, not sent.
const ENDPOINT = import.meta.env.VITE_FORMS_ENDPOINT

export const APP_URL = import.meta.env.VITE_APP_URL || 'https://access.swiftowl.ai'

export async function submitForm(kind, data) {
  const payload = { kind, ...data, page: window.location.pathname, submittedAt: new Date().toISOString() }

  if (!ENDPOINT) {
    console.info('[forms] VITE_FORMS_ENDPOINT is not set; not sending', payload)
    await new Promise((r) => setTimeout(r, 900))
    return
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Form endpoint returned ${res.status}`)
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const FREE_MAIL = /@(gmail|yahoo|hotmail|outlook|live|icloud|aol|proton(mail)?)\./i

// rules: { field: ['required' | 'email' | 'workEmail'] }
export function validate(values, rules) {
  const errors = {}
  for (const [field, checks] of Object.entries(rules)) {
    const v = String(values[field] ?? '').trim()
    for (const check of checks) {
      if (check === 'required' && !v) { errors[field] = 'Required'; break }
      if (check === 'email' && v && !EMAIL_RE.test(v)) { errors[field] = 'Enter an email like name@company.com'; break }
      if (check === 'workEmail' && v && FREE_MAIL.test(v)) { errors[field] = 'Use your work email so we can set up your company workspace'; break }
    }
  }
  return errors
}

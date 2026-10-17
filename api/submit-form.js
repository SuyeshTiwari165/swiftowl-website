// Vercel serverless function — receives every form on the site (contact, demo,
// trial, partner) and sends two emails via Postmark: an internal notification
// to NOTIFY_TO_EMAIL, and an acknowledgment to the person who submitted.
//
// Required env vars (set in Vercel → Project → Environment Variables, and in
// .env.local for local testing with `vercel dev`):
//   POSTMARK_API_KEY   — server token, no VITE_ prefix so it never reaches the browser
//   POSTMARK_FROM_EMAIL — verified sender, e.g. no-reply@swiftowl.ai
//   NOTIFY_TO_EMAIL     — internal inbox that receives every submission
//
// src/lib/forms.js already POSTs JSON here once VITE_FORMS_ENDPOINT points at
// /api/submit-form — no frontend changes needed.

const REQUIRED_FIELDS = { trial: ['name', 'email', 'company'], demo: ['name', 'email'], contact: ['name', 'email'], partner: ['name', 'email', 'company'] }
// Every field each form actually submits (src/pages/Signup.jsx, Contact.jsx,
// Partners.jsx), beyond name/email/company — anything else in the request
// body is dropped rather than rendered into the notification email, so a
// submitter can't pad or spoof extra "fields" into the lead inbox.
const OPTIONAL_FIELDS = {
  trial: ['size', 'role'],
  demo: ['topic', 'size', 'message'],
  contact: ['topic', 'size', 'message'],
  partner: ['website', 'type', 'clients', 'message'],
}
// No whitespace/@ (original intent) plus no HTML metacharacters, since this
// value is interpolated into an unescaped mailto: href in emailShell().
const EMAIL_RE = /^[^\s@<>"'`]+@[^\s@<>"'`]+\.[^\s@<>"'`]{2,}$/
// Mirrors src/lib/forms.js's client-side workEmail check — enforced again
// here since client-side validation alone can be bypassed by posting to
// this endpoint directly.
const FREE_MAIL = /@(gmail|yahoo|hotmail|outlook|live|icloud|aol|proton(mail)?)\./i
const MAX_FIELD_LEN = 3000

function sanitize(data) {
  const out = {}
  for (const [k, v] of Object.entries(data)) {
    // Strip control characters (defense in depth against header/line
    // injection, even though Postmark's API normalizes these server-side)
    // and cap length so no single field can bloat the email indefinitely.
    out[k] = typeof v === 'string' ? v.replace(/[\r\n\0]/g, ' ').slice(0, MAX_FIELD_LEN) : v
  }
  return out
}

const KIND_LABEL = { trial: 'Free trial signup', demo: 'Demo request', contact: 'Contact message', partner: 'Partner application' }

const ACK_SUBJECT = {
  trial: 'Your SwiftOwl trial is on its way',
  demo: 'We got your demo request',
  contact: 'We got your message',
  partner: 'Your partner application was received',
}

const ACK_BODY = {
  trial: (d) => `Thanks${d.name ? `, ${firstName(d.name)}` : ''}. We've got your details and are setting up your workspace. Watch this inbox for your invite.`,
  demo: (d) => `Thanks${d.name ? `, ${firstName(d.name)}` : ''}. We'll reply within two business days with times that work for a walkthrough.`,
  contact: (d) => `Thanks${d.name ? `, ${firstName(d.name)}` : ''}. We'll get back to you within two business days.`,
  partner: (d) => `Thanks${d.name ? `, ${firstName(d.name)}` : ''}. Our partner team will follow up within two business days.`,
}

function firstName(name) {
  return String(name).trim().split(/\s+/)[0] || ''
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
}

// data.submittedAt is new Date().toISOString() from the browser (e.g.
// "2026-10-17T05:33:12.984Z") — readable for logs, not for a human reading
// an email. Render it in plain English, UTC since the function has no
// reliable sense of the recipient's timezone.
function formatSubmittedAt(iso) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return String(iso ?? '')
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'UTC' }).format(d) + ' UTC'
}

// Brand tokens from DESIGN.md. Email clients render with their own default
// fonts (not Inter), and the site's light 300-weight headings look thin or
// fall back to regular in most inboxes, so weights here are bumped to 400/600
// for legibility while keeping the same palette and restrained, boxy shape
// language as the site.
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif"

function fieldRows(data) {
  return Object.entries(data)
    .filter(([k]) => !['kind', 'page', 'submittedAt'].includes(k))
    .map(([k, v]) => `<tr><td style="padding:9px 16px 9px 0;color:#64748d;font-size:13px;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td><td style="padding:9px 0;color:#0d253d;font-size:14px;border-top:1px solid #e3e8ee">${escapeHtml(v)}</td></tr>`)
    .join('')
}

// The site's identity is an atmospheric gradient mesh (DESIGN.md) behind a
// restrained navy/white surface. The banner below approximates that mesh as
// a CSS gradient (solid #533afd fallback for clients like Outlook desktop
// that ignore gradients), kept cream/light for its left third so the logo —
// cropped with a transparent background straight from public/logo.svg,
// see public/email/mark.png — always sits on a readable background
// regardless of how wide the banner renders.
const MESH_BG = 'background:#533afd;background:linear-gradient(100deg,#f5e9d4 0%,#f5e9d4 35%,#ffab72 58%,#f96bee 78%,#533afd 100%)'
const LOGO_URL = 'https://swiftowl.ai/email/mark.png'

function emailShell({ eyebrow, heading, bodyHtml, ctaLabel, ctaHref }) {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:32px 16px;background:#f6f9fc;font-family:${FONT}">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto">
      <tr><td style="border-radius:16px;overflow:hidden;box-shadow:0 1px 2px rgba(13,37,61,0.06),0 8px 24px -12px rgba(13,37,61,0.12)">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="${MESH_BG};padding:24px 32px">
            <table role="presentation" cellpadding="0" cellspacing="0"><tr>
              <td style="padding-right:10px"><img src="${LOGO_URL}" width="40" height="26" alt="" style="display:block;border:0"></td>
              <td style="font-size:19px;font-weight:600;color:#0d253d;letter-spacing:-0.01em">SwiftOwl</td>
            </tr></table>
          </td></tr>
          <tr><td style="background:#ffffff;padding:36px 32px 32px;border:1px solid #e3e8ee;border-top:0">
            ${eyebrow ? `<div style="display:inline-block;background:#dfdefd;color:#4434d4;font-size:12px;font-weight:600;letter-spacing:0.02em;padding:5px 12px;border-radius:9999px;margin-bottom:18px">${eyebrow}</div>` : ''}
            <h1 style="margin:0 0 14px;font-size:22px;font-weight:600;color:#0d253d;letter-spacing:-0.01em;line-height:1.3">${heading}</h1>
            <div style="font-size:15px;line-height:1.6;color:#273951">${bodyHtml}</div>
            ${ctaHref ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:26px"><tr><td style="background:#533afd;border-radius:9999px;height:40px"><a href="${escapeHtml(ctaHref)}" style="display:inline-block;padding:9px 22px;font-size:15px;font-weight:500;color:#ffffff;text-decoration:none;line-height:22px">${ctaLabel}</a></td></tr></table>` : ''}
          </td></tr>
        </table>
      </td></tr>
      <tr><td style="padding:22px 8px 0;font-size:12px;line-height:1.5;color:#94a3b8;text-align:center">
        Web Access Inc., trading as SwiftOwl<br>1470 Tobias Gadson Blvd, Ste 202, Charleston, SC 29407
      </td></tr>
    </table>
  </body>
</html>`
}

async function sendBatch(messages) {
  const res = await fetch('https://api.postmarkapp.com/email/batch', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Postmark-Server-Token': process.env.POSTMARK_API_KEY,
    },
    body: JSON.stringify(messages),
  })
  const results = await res.json()
  if (!res.ok) throw new Error(`Postmark batch send failed: ${res.status} ${JSON.stringify(results)}`)
  return results
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { POSTMARK_API_KEY, POSTMARK_FROM_EMAIL, NOTIFY_TO_EMAIL } = process.env
  if (!POSTMARK_API_KEY || !POSTMARK_FROM_EMAIL || !NOTIFY_TO_EMAIL) {
    console.error('[submit-form] missing required env vars')
    return res.status(500).json({ error: 'Form handling is not configured' })
  }

  let data
  try {
    data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body' })
  }

  const kind = data?.kind
  if (!KIND_LABEL[kind]) return res.status(400).json({ error: 'Unknown form kind' })

  // Honeypot: src/components/Forms.jsx renders a "hp" field hidden from real
  // users via CSS, that only an automated filler would populate. Pretend
  // success without sending anything, so bots don't learn to avoid it.
  if (String(data.hp ?? '').trim()) return res.status(200).json({ ok: true })

  const missing = (REQUIRED_FIELDS[kind] || []).filter((f) => !String(data[f] ?? '').trim())
  if (missing.length) return res.status(400).json({ error: `Missing required field(s): ${missing.join(', ')}` })
  if (!EMAIL_RE.test(String(data.email ?? ''))) return res.status(400).json({ error: 'Invalid email' })
  if (FREE_MAIL.test(String(data.email ?? ''))) return res.status(400).json({ error: 'Use your work email so we can set up your company workspace' })

  const allowed = new Set([...REQUIRED_FIELDS[kind], ...(OPTIONAL_FIELDS[kind] || []), 'page', 'submittedAt'])
  data = sanitize(Object.fromEntries(Object.entries(data).filter(([k]) => allowed.has(k))))

  const internal = {
    From: POSTMARK_FROM_EMAIL,
    To: NOTIFY_TO_EMAIL,
    ReplyTo: data.email,
    Subject: `[${KIND_LABEL[kind]}] ${data.name || data.email}${data.company ? ` · ${data.company}` : ''}`,
    HtmlBody: emailShell({
      eyebrow: KIND_LABEL[kind],
      heading: escapeHtml(data.name || data.email),
      bodyHtml: `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%">${fieldRows(data)}</table><p style="color:#94a3b8;font-size:12px;margin:16px 0 0">Submitted from ${escapeHtml(data.page || 'unknown page')} at ${escapeHtml(formatSubmittedAt(data.submittedAt))}</p>`,
      ctaLabel: `Reply to ${escapeHtml(firstName(data.name || data.email))}`,
      ctaHref: `mailto:${data.email}`,
    }),
    TextBody: Object.entries(data).filter(([k]) => k !== 'kind').map(([k, v]) => `${k}: ${v}`).join('\n'),
    MessageStream: 'outbound',
  }

  const ack = {
    From: POSTMARK_FROM_EMAIL,
    To: data.email,
    Subject: ACK_SUBJECT[kind],
    HtmlBody: emailShell({
      eyebrow: 'Message received',
      heading: ACK_SUBJECT[kind],
      bodyHtml: `<p style="margin:0">${escapeHtml(ACK_BODY[kind](data))}</p>`,
      ctaLabel: 'Visit SwiftOwl',
      ctaHref: 'https://swiftowl.ai',
    }),
    TextBody: ACK_BODY[kind](data),
    MessageStream: 'outbound',
  }

  let results
  try {
    results = await sendBatch([internal, ack])
  } catch (err) {
    console.error('[submit-form] Postmark request failed:', err)
    return res.status(502).json({ error: 'Email provider unreachable' })
  }

  // The internal notification is the one that must not silently fail — it's
  // the lead. If it errored, tell the client so the on-page UI can show the
  // "try again" state. A failed acknowledgment alone is logged, not fatal:
  // the lead is already captured in the internal notification.
  const [internalResult, ackResult] = results
  if (internalResult?.ErrorCode) {
    console.error('[submit-form] internal notification failed:', internalResult)
    return res.status(502).json({ error: 'Could not deliver notification' })
  }
  if (ackResult?.ErrorCode) {
    console.error('[submit-form] acknowledgment email failed:', ackResult)
  }

  return res.status(200).json({ ok: true })
}

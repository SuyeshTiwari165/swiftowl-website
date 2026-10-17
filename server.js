// Standalone Node server for Cloudways (or any host that isn't Vercel).
// Vercel auto-routes api/submit-form.js as a serverless function and serves
// dist/ as static hosting separately; here one long-running process does
// both. The form handler itself is imported unchanged — Express's `res` has
// the same .status().json() shape Vercel's Node functions provide, so no
// adaptation was needed.
//
// Build first (`npm run build`), then `npm start`. Needs the same env vars
// as Vercel: POSTMARK_API_KEY, POSTMARK_FROM_EMAIL, NOTIFY_TO_EMAIL.
import express from 'express'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import submitForm from './api/submit-form.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST = path.join(__dirname, 'dist')

const app = express()

// Same header set as vercel.json, so Cloudways gets identical protection —
// Vercel's platform applies its headers config separately; here we set them
// ourselves since this is a plain Node process.
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  next()
})

app.use(express.json())
app.post('/api/submit-form', submitForm)

// scripts/prerender.mjs writes both /contact.html and /contact/index.html per
// route (same content, two shapes). express.static's directory-first matching
// 301-redirects a clean URL like /contact to /contact/ before it ever tries
// the flat file, which setting `index: false` doesn't stop — so flat .html
// files are resolved explicitly here, ahead of express.static, with no
// redirect involved at all.
app.get(/^\/[^.]*$/, (req, res, next) => {
  const file = path.join(DIST, req.path === '/' ? 'index.html' : `${req.path}.html`)
  if (fs.existsSync(file)) return res.sendFile(file)
  next()
})

app.use(express.static(DIST))

app.use((req, res) => {
  res.status(404).sendFile(path.join(DIST, '404.html'))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`[server] listening on port ${PORT}`))

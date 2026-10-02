// Build-time renderer used by scripts/prerender.mjs. Waits for lazy pages to
// load, so every route's static HTML contains its full content.
import { StrictMode } from 'react'
import { prerenderToNodeStream } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import App from './App'

export { ROUTES, NOT_FOUND, ALIASES, SITE_URL, OG_IMAGE, SOCIAL_LINKS, metaFor } from './lib/routes'
export { SECURITY_FAQS } from './content/faqs'

export async function render(url) {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={url}>
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </StaticRouter>
    </StrictMode>,
  )
  let html = ''
  for await (const chunk of prelude) html += chunk
  return html
}

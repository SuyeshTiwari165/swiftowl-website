import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from './ui'
import Mesh from './Mesh'
import { APP_URL } from '../lib/forms'
import { SITE_URL, SOCIAL_LINKS, metaFor } from '../lib/routes'

const LINKS = [
  { to: '/use-cases', label: 'Use cases' },
  { to: '/groups-advisors', label: 'Groups & advisors' },
  { to: '/security', label: 'Security' },
  { to: '/#pricing', label: 'Pricing' },
  { to: '/partners', label: 'Partners' },
  { to: '/contact', label: 'Contact' },
]

// Keeps <title>, description, canonical and social tags in step with the route.
// The prerendered HTML already has them; this covers client-side navigation.
function useSeo() {
  const { pathname } = useLocation()
  useEffect(() => {
    const m = metaFor(pathname)
    const url = SITE_URL + (m.path === '/' ? '/' : m.path)
    document.title = m.title
    const set = (sel, attr, key, val) => {
      let el = document.head.querySelector(sel)
      if (!el) { el = document.createElement(sel.startsWith('link') ? 'link' : 'meta'); el.setAttribute(attr, key); document.head.appendChild(el) }
      el.setAttribute(sel.startsWith('link') ? 'href' : 'content', val)
    }
    set('meta[name="description"]', 'name', 'description', m.description)
    set('link[rel="canonical"]', 'rel', 'canonical', url)
    set('meta[property="og:title"]', 'property', 'og:title', m.title)
    set('meta[property="og:description"]', 'property', 'og:description', m.description)
    set('meta[property="og:url"]', 'property', 'og:url', url)
    set('meta[name="robots"]', 'name', 'robots', m.noindex ? 'noindex' : 'index, follow')
  }, [pathname])
}

function useHashScroll() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // getElementById, not querySelector(hash): the legal pages' TOC ids
      // start with a digit (e.g. "3-the-service..."), which is a valid HTML
      // id but an invalid CSS selector unless escaped — querySelector throws.
      const el = document.getElementById(hash.slice(1))
      if (el) { el.scrollIntoView({ behavior: 'smooth' }); return }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => setOpen(false), [pathname, hash])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header className={'nav' + (scrolled ? ' scrolled' : '') + (open ? ' menu-open' : '')}>
      <div className="wrap nav-inner">
        <Link to="/" className="brand" aria-label="SwiftOwl home">
          <img src="/logo.svg" alt="" width="40" height="26" />
          SwiftOwl
        </Link>
        <nav className="nav-links" aria-label="Main">
          {LINKS.map((l) =>
            l.to.startsWith('/#')
              ? <Link key={l.to} to={l.to}>{l.label}</Link>
              : <NavLink key={l.to} to={l.to}>{l.label}</NavLink>
          )}
        </nav>
        <div className="nav-cta">
          <a className="nav-signin" href={APP_URL}>Sign in</a>
          <Link className="btn btn-ghost btn-sm" to="/book-a-demo">Book a demo</Link>
          <Link className="btn btn-primary btn-sm" to="/start-free-trial">Start free trial</Link>
        </div>
        <button className="menu-btn" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>
          <Icon name={open ? 'x' : 'menu'} size={26} />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" className="mobile-menu" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="mobile-menu-inner">
              {LINKS.map((l, i) => (
                <motion.div key={l.to} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                  <Link to={l.to}>{l.label}</Link>
                </motion.div>
              ))}
              <div className="mobile-menu-actions">
                <Link className="btn btn-primary" to="/start-free-trial">Start free trial</Link>
                <Link className="btn btn-ghost" to="/book-a-demo">Book a demo</Link>
                <a className="mobile-menu-signin" href={APP_URL}>Sign in</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

// LinkedIn and Instagram need more than one shape (a badge + a mark), so they
// render their own small inline SVG rather than going through the shared
// single-path <Icon>. Facebook and X are plain single paths and use <Icon>.
function SocialIcon({ name }) {
  if (name === 'LinkedIn') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    )
  }
  if (name === 'Instagram') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    )
  }
  if (name === 'Facebook') return <Icon name="facebook" size={18} />
  return <Icon name="brand-x" size={16} stroke={2.4} />
}

function SocialLinks() {
  return (
    <div className="footer-social" aria-label="SwiftOwl on social media">
      {SOCIAL_LINKS.map((s) => (
        <a key={s.name} href={s.url} target="_blank" rel="noreferrer" aria-label={`SwiftOwl on ${s.name}`}>
          <SocialIcon name={s.name} />
        </a>
      ))}
    </div>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link to="/" className="brand"><img src="/logo.svg" alt="" width="40" height="26" />SwiftOwl</Link>
            <p className="footer-blurb">
              The private AI workspace built around your company’s own knowledge.
            </p>
            <SocialLinks />
          </div>
          <div>
            <h5>Product</h5>
            <ul>
              <li><Link to="/#agents">Scout, Pilot & Coach</Link></li>
              <li><Link to="/groups-advisors">Groups & advisors</Link></li>
              <li><Link to="/use-cases">Use cases</Link></li>
              <li><Link to="/security">Security</Link></li>
              <li><Link to="/#pricing">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h5>Get started</h5>
            <ul>
              <li><Link to="/start-free-trial">Start free trial</Link></li>
              <li><Link to="/book-a-demo">Book a demo</Link></li>
              <li><a href={APP_URL}>Sign in</a></li>
            </ul>
          </div>
          <div>
            <h5>Company</h5>
            <ul>
              <li><Link to="/partners">Partner program</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Web Access Inc., trading as SwiftOwl. 1470 Tobias Gadson Blvd, Ste 202, Charleston, SC 29407.</span>
          <span className="footer-legal">
            <Link to="/privacy-policy">Privacy policy</Link>
            <Link to="/terms">Terms of service</Link>
            <span>ISO 27001 certified</span>
          </span>
        </div>
      </div>
    </footer>
  )
}

// The gradient mesh sits behind the nav and the top of every page. Home gets the
// full wash, inner pages a shorter one, the legal documents a slim band.
function meshVariant(pathname) {
  const p = pathname.replace(/\/+$/, '') || '/'
  if (p === '/') return 'hero'
  if (p === '/privacy-policy' || p === '/terms') return 'slim'
  return 'page'
}

export default function Layout() {
  const { pathname } = useLocation()
  useHashScroll()
  useSeo()
  return (
    <div className="site">
      <Mesh variant={meshVariant(pathname)} />
      <a href="#main" className="sr-only">Skip to content</a>
      <Nav />
      <main id="main"><Outlet /></main>
      <Footer />
    </div>
  )
}

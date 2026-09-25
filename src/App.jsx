import { lazy, Suspense } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

// Every page except the home page loads on demand. Prerendering waits for them,
// so the static HTML is complete either way.
const Partners = lazy(() => import('./pages/Partners'))
const Contact = lazy(() => import('./pages/Contact'))
const Signup = lazy(() => import('./pages/Signup'))
const Security = lazy(() => import('./pages/Security'))
const GroupsAdvisors = lazy(() => import('./pages/GroupsAdvisors'))
const UseCases = lazy(() => import('./pages/UseCases'))
const Legal = lazy(() => import('./pages/Legal'))

function NotFound() {
  return (
    <section className="not-found">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="display h2">This page flew off.</h1>
        <p className="lede center" style={{ margin: '18px auto 28px' }}>The link may be old or mistyped.</p>
        <Link className="btn btn-primary" to="/">Go to the home page</Link>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="partners" element={<Partners />} />
        <Route path="become-partner" element={<Partners />} />
        <Route path="contact" element={<Contact key="contact" />} />
        <Route path="book-a-demo" element={<Contact key="demo" demo />} />
        <Route path="start-free-trial" element={<Signup />} />
        <Route path="security" element={<Security />} />
        <Route path="groups-advisors" element={<GroupsAdvisors />} />
        <Route path="use-cases" element={<UseCases />} />
        <Route path="privacy-policy" element={<Legal key="privacy" doc="privacy" />} />
        <Route path="terms" element={<Legal key="terms" doc="terms" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    </Suspense>
  )
}

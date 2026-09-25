import { Link } from 'react-router-dom'
import { Icon, Reveal } from '../components/ui'
import { Field, Seg, SubmitRow, Success, useForm } from '../components/Forms'
import { APP_URL } from '../lib/forms'

const INCLUDED = [
  'Scout, Pilot and Coach for your whole team',
  'Upload your documents and get answers grounded in them',
  'Groups and AI advisors to solve problems together',
  'Morning and evening team briefs by email',
  'ISO 27001 certified, never used to train AI models',
]

export default function Signup() {
  const f = useForm(
    'trial',
    { name: '', email: '', company: '', size: '2–7', role: '' },
    { name: ['required'], email: ['required', 'email', 'workEmail'], company: ['required'] },
  )

  return (
    <section className="page-hero">
      <div className="wrap form-layout">
        <Reveal>
          <p className="eyebrow">Start your free trial</p>
          <h1 className="display h1" style={{ fontSize: 'clamp(42px, 5.6vw, 76px)' }}>
            30 days free. <span className="mark">No credit card.</span>
          </h1>
          <p className="lede">
            Tell us about your company and we’ll set up a private workspace for your team.
          </p>
          <ul className="checks">
            {INCLUDED.map((t) => <li key={t}><Icon name="check" size={20} stroke={3} />{t}</li>)}
          </ul>
          <p className="muted" style={{ fontSize: 15, marginTop: 30 }}>
            After the trial: $199/month for your first 7 users, $14/month for each additional user.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          {f.status === 'sent' ? (
            <div className="form-card">
              <Success title="Your trial is on its way" action={<Link className="btn btn-ghost" to="/#agents">Meet your agents while you wait</Link>}>
                We’ve got your details, {f.values.name.split(' ')[0]}. Watch {f.values.email} for your workspace invite.
              </Success>
            </div>
          ) : (
            <form className="form-card" onSubmit={f.onSubmit} noValidate>
              <div className="form-grid">
                <Field className="full" name="name" label="Full name" autoComplete="name" value={f.values.name} onChange={f.set('name')} error={f.errors.name} />
                <Field className="full" name="email" label="Work email" type="email" autoComplete="email" value={f.values.email} onChange={f.set('email')} error={f.errors.email} />
                <Field name="company" label="Company" autoComplete="organization" value={f.values.company} onChange={f.set('company')} error={f.errors.company} />
                <Field name="role" label="Your role" optional autoComplete="organization-title" value={f.values.role} onChange={f.set('role')} />
                <Seg label="Team size" options={['2–7', '8–25', '26–100', '100+']} value={f.values.size} onChange={f.set('size')} />
              </div>
              <SubmitRow status={f.status} label="Start free trial" sendingLabel="Setting things up…" />
              <p className="muted" style={{ fontSize: 13, margin: '16px 0 0' }}>
                Already have an account? <a href={APP_URL}>Sign in</a>. Rather talk first? <Link to="/book-a-demo">Book a demo</Link>.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}

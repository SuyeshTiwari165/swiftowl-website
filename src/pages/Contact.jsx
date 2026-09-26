import { Link } from 'react-router-dom'
import { Icon, Reveal } from '../components/ui'
import { Field, Seg, SubmitRow, Success, useForm } from '../components/Forms'

const TOPICS = ['Book a demo', 'Sales question', 'Partnership', 'Security & compliance', 'Something else']

export default function Contact({ demo = false }) {
  const f = useForm(
    demo ? 'demo' : 'contact',
    { name: '', email: '', company: '', topic: demo ? 'Book a demo' : 'Sales question', size: '', message: '' },
    { name: ['required'], email: ['required', 'email'] },
  )
  const isDemo = f.values.topic === 'Book a demo'

  return (
    <section className="page-hero">
      <div className="wrap form-layout">
        <Reveal>
          <p className="eyebrow">{demo ? 'Book a demo' : 'Contact us'}</p>
          <h1 className="display h1">
            {demo ? <>See SwiftOwl on your work.</> : <>Talk to a person, not a bot.</>}
          </h1>
          <p className="lede">
            {demo
              ? 'A 30-minute walkthrough with our team. Bring a real document or workflow and we’ll show you Scout, Pilot and Coach on it.'
              : 'Questions about pricing, security, or rolling SwiftOwl out to your team? Send us a note.'}
          </p>
          <div className="contact-list">
            <div className="contact-item">
              <span className="sec-icon"><Icon name="clock" size={20} /></span>
              <div><h4>Quick replies</h4><p>We get back to you within two business days.</p></div>
            </div>
            <div className="contact-item">
              <span className="sec-icon"><Icon name="shield" size={20} /></span>
              <div><h4>Security reviews welcome</h4><p>Ask about ISO 27001, data handling and access controls.</p></div>
            </div>
            <div className="contact-item">
              <span className="sec-icon"><Icon name="handshake" size={20} /></span>
              <div><h4>MSP or agency?</h4><p>See the <Link to="/partners">partner program</Link>.</p></div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          {f.status === 'sent' ? (
            <div className="form-card">
              <Success title={isDemo ? 'Demo request received' : 'Message sent'} action={<Link className="btn btn-ghost" to="/">Back to home</Link>}>
                Thanks, {f.values.name.split(' ')[0]}. We’ll reply to {f.values.email} within two business days
                {isDemo ? ' with times that work for a walkthrough.' : '.'}
              </Success>
            </div>
          ) : (
            <form className="form-card" onSubmit={f.onSubmit} noValidate>
              <div className="form-grid">
                <Seg label="What can we help with?" options={TOPICS} value={f.values.topic} onChange={f.set('topic')} />
                <Field name="name" label="Full name" autoComplete="name" value={f.values.name} onChange={f.set('name')} error={f.errors.name} />
                <Field name="email" label="Work email" type="email" autoComplete="email" value={f.values.email} onChange={f.set('email')} error={f.errors.email} />
                <Field name="company" label="Company" optional autoComplete="organization" value={f.values.company} onChange={f.set('company')} />
                <Field name="size" label="Team size" optional as="select" value={f.values.size} onChange={f.set('size')}>
                  <option value="">Choose</option>
                  <option>2–7</option>
                  <option>8–25</option>
                  <option>26–100</option>
                  <option>100+</option>
                </Field>
                <Field
                  className="full"
                  name="message"
                  label={isDemo ? 'What would you like to see?' : 'Message'}
                  optional
                  as="textarea"
                  placeholder={isDemo ? 'e.g. how Scout handles our meeting notes' : 'How can we help?'}
                  value={f.values.message}
                  onChange={f.set('message')}
                />
              </div>
              <SubmitRow status={f.status} label={isDemo ? 'Request a demo' : 'Send message'} sendingLabel="Sending…" />
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}

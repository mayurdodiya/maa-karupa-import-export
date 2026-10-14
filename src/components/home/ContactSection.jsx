import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { site, businesses, telLink, mailLink, waLink, generalEnquiry } from '@/lib/site';
import { Reveal } from '@/components/common/Reveal';

const EMPTY = { name: '', phone: '', email: '', company: '', product: '', message: '' };
const PRODUCTS = businesses.flatMap((b) => b.products.map((p) => p.name));

/** Encode the form for Netlify's static-form handler (SPA, client-rendered). */
function encode(data) {
  return Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k] ?? '')}`)
    .join('&');
}

function QuoteForm() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle');

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'quote', ...form }),
      });
      setStatus('done');
      setForm(EMPTY);
    } catch {
      setStatus('error');
    }
  };

  if (status === 'done') {
    return (
      <div className="grid h-full place-items-center rounded-2xl border border-brand-200 bg-brand-50 p-10 text-center">
        <div>
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-500 text-white">
            <CheckCircle2 className="h-7 w-7" />
          </span>
          <h3 className="mt-4 font-display text-xl font-bold text-ink-900">Enquiry received</h3>
          <p className="mt-2 max-w-sm text-sm text-ink-600">
            Thank you. Our trade desk will get back to you with a quotation shortly.
          </p>
          <button type="button" onClick={() => setStatus('idle')} className="btn-outline mt-5">
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      name="quote"
      onSubmit={onSubmit}
      className="rounded-2xl border border-ink-200 bg-white p-6 shadow-soft sm:p-8"
    >
      <input type="hidden" name="form-name" value="quote" />
      <p className="hidden">
        <label>
          Do not fill this out: <input name="bot-field" onChange={onChange} />
        </label>
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="q-name" className="field-label">Name</label>
          <input id="q-name" required name="name" value={form.name} onChange={onChange} className="field" placeholder="Your full name" />
        </div>
        <div>
          <label htmlFor="q-phone" className="field-label">Phone</label>
          <input id="q-phone" required name="phone" value={form.phone} onChange={onChange} className="field" placeholder="+91 ..." />
        </div>
        <div>
          <label htmlFor="q-email" className="field-label">Email</label>
          <input id="q-email" type="email" required name="email" value={form.email} onChange={onChange} className="field" placeholder="you@company.com" />
        </div>
        <div>
          <label htmlFor="q-company" className="field-label">Company</label>
          <input id="q-company" name="company" value={form.company} onChange={onChange} className="field" placeholder="Company / firm" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="q-product" className="field-label">Product of interest</label>
          <select id="q-product" name="product" value={form.product} onChange={onChange} className="field">
            <option value="">Select a product (optional)</option>
            {PRODUCTS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="q-message" className="field-label">Requirement</label>
          <textarea
            id="q-message"
            name="message"
            rows={4}
            value={form.message}
            onChange={onChange}
            className="field resize-none"
            placeholder="Product, quantity, city…"
          />
        </div>
      </div>

      <button type="submit" disabled={status === 'sending'} className="btn-primary mt-6 w-full">
        {status === 'sending' ? 'Sending…' : 'Request a Quote'}
        <Send className="h-4 w-4" />
      </button>
      {status === 'error' && (
        <p className="mt-3 text-center text-xs text-red-600">
          Something went wrong. Please call or WhatsApp us directly.
        </p>
      )}
    </form>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 bg-ink-50 py-16 sm:py-20 lg:py-24">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <span className="eyebrow">
            <span className="h-px w-6 bg-brand-600" />
            Get in Touch
          </span>
          <h2 className="mt-3 font-display text-[2rem] font-medium leading-[1.12] tracking-[-0.01em] text-ink-900 sm:text-[2.6rem]">
            Tell us what you need
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-600">
            Choose a business or product and share your requirement — our team will come back
            with the details, pricing and lead time. No obligation.
          </p>

          <ul className="mt-8 space-y-5">
            <li className="flex gap-3.5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-500/10 text-brand-600">
                <MapPin className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-ink-500">Office</span>
                <span className="mt-0.5 block text-sm leading-relaxed text-ink-800">{site.address.full}</span>
              </span>
            </li>
            <li className="flex gap-3.5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-500/10 text-brand-600">
                <Phone className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-ink-500">Call</span>
                <a href={telLink} className="mt-0.5 block text-sm text-ink-800 transition-colors hover:text-brand-600">{site.phone}</a>
                <span className="block text-sm text-ink-500">{site.phoneAlt}</span>
              </span>
            </li>
            <li className="flex gap-3.5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-500/10 text-brand-600">
                <Mail className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-ink-500">Email</span>
                <a href={mailLink} className="mt-0.5 block break-all text-sm text-ink-800 transition-colors hover:text-brand-600">{site.email}</a>
              </span>
            </li>
            <li className="flex gap-3.5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-500/10 text-brand-600">
                <Clock className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-ink-500">Hours</span>
                <span className="mt-0.5 block text-sm text-ink-800">{site.hours}</span>
              </span>
            </li>
          </ul>

          <a
            href={waLink(generalEnquiry)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-[13px] font-semibold text-white shadow-lift transition-transform hover:-translate-y-0.5"
          >
            <MessageCircle className="h-4 w-4" />
            Chat on WhatsApp
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <QuoteForm />
        </Reveal>
      </div>
    </section>
  );
}

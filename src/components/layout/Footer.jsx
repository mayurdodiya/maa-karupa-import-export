import { Phone, Mail, MapPin, Clock, ShieldCheck, Instagram, Facebook, Linkedin, Youtube, ArrowRight } from 'lucide-react';
import { site, businesses, telLink, mailLink } from '@/lib/site';
import { Reveal } from '@/components/common/Reveal';

const SOCIAL = [
  { key: 'instagram', Icon: Instagram, label: 'Instagram' },
  { key: 'facebook', Icon: Facebook, label: 'Facebook' },
  { key: 'linkedin', Icon: Linkedin, label: 'LinkedIn' },
  { key: 'youtube', Icon: Youtube, label: 'YouTube' },
];

const QUICK_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Our Businesses', href: '#businesses' },
  { label: 'Request a Quote', href: '#contact' },
];

/** The group's verticals, used as the footer's "Segments" column. */
const SEGMENTS = businesses.map((b) => b.name);

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="curtain-top relative -mt-8 overflow-hidden border-t border-white/[0.07] bg-ink-900 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-lines bg-[size:56px_56px] opacity-[0.16]" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 end-0 h-80 w-80 rounded-full bg-brand-600/20 blur-3xl" />

      <div className="container-x relative">
        <div className="grid gap-10 py-14 lg:grid-cols-12 lg:gap-8 lg:py-16">
          {/* Brand column */}
          <Reveal className="lg:col-span-4">
            <a href="#top" aria-label={`${site.name} home`} className="inline-block">
              <span className="inline-flex items-center rounded-xl bg-white px-4 py-3 shadow-soft ring-1 ring-black/5">
                <img src={site.logo} alt={site.name} className="h-14 w-auto sm:h-16" />
              </span>
            </a>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">{site.intro}</p>

            <div className="mt-5 inline-flex items-start gap-2.5 rounded-lg border border-brand-500/25 bg-brand-500/10 p-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              <span className="text-[11px] leading-relaxed text-white/70">
                <span className="font-bold text-brand-300">{site.group.name}</span>
                <br />
                Multi-vertical business group
              </span>
            </div>

            <div className="mt-5 flex gap-2">
              {SOCIAL.map(({ key, Icon, label }) => (
                <a
                  key={key}
                  href={site.social[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 text-white/70 transition-all hover:-translate-y-0.5 hover:border-brand-500 hover:bg-brand-600 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </Reveal>

          {/* Segments */}
          <Reveal delay={0.05} className="lg:col-span-2">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-400">Segments</h3>
            <ul className="mt-4 space-y-2.5">
              {SEGMENTS.map((s) => (
                <li key={s}>
                  <a href="#businesses" className="text-sm text-white/60 transition-colors hover:text-brand-300">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Quick links */}
          <Reveal delay={0.1} className="lg:col-span-3">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-400">Quick Links</h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 lg:grid-cols-1">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-white/60 transition-colors hover:text-brand-300">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Reach us */}
          <Reveal delay={0.15} className="lg:col-span-3">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-400">Reach Us</h3>
            <ul className="mt-4 space-y-3.5 text-sm text-white/60">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                <span className="leading-relaxed">{site.address.full}</span>
              </li>
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                <span>
                  <a href={telLink} className="block transition-colors hover:text-brand-300">{site.phone}</a>
                  <span className="text-white/40">{site.phoneAlt}</span>
                </span>
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                <a href={mailLink} className="break-all transition-colors hover:text-brand-300">{site.email}</a>
              </li>
              <li className="flex gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                <span>{site.hours}</span>
              </li>
            </ul>

            <a href="#contact" className="btn-primary mt-5 w-full !py-2.5">
              Request a Quote
              <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>

        <div className="rule-gold" />

        <div className="flex flex-col gap-3 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.legalName}. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>{site.group.name}</span>
            <span className="hidden sm:inline">|</span>
            <span>GSTIN: {site.gstin}</span>
          </p>
        </div>

        <p className="border-t border-white/5 py-4 text-[11px] leading-relaxed text-white/30">
          Disclaimer: Product specifications, grades and lead times shown on this website are indicative
          and subject to mill availability and prevailing freight. Final terms, prices and delivery
          schedules are confirmed in the proforma invoice and contract for each consignment.
        </p>
      </div>
    </footer>
  );
}

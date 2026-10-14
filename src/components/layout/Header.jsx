import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Phone, Mail, MessageCircle, ArrowRight } from 'lucide-react';
import { site, telLink, mailLink, waLink, generalEnquiry } from '@/lib/site';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { Magnetic } from '@/components/common/Reveal';

const NAV = [
  { label: 'Home', href: '#top' },
  { label: 'Our Businesses', href: '#businesses' },
  { label: 'Contact', href: '#contact' },
];

function IconButton({ href, label, children, solid, onClick }) {
  const cls = `grid h-10 w-10 place-items-center rounded-full border transition-all duration-300 ${
    solid
      ? 'border-ink-200 text-ink-600 hover:border-brand-500 hover:bg-brand-500 hover:text-white'
      : 'border-white/25 text-white/85 hover:border-brand-400 hover:bg-brand-500 hover:text-ink-950'
  }`;
  const inner = <Magnetic strength={0.25}>{children}</Magnetic>;

  if (href) {
    return (
      <a
        href={href}
        aria-label={label}
        className={cls}
        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} aria-label={label} className={cls}>
      {inner}
    </button>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const progress = useScrollProgress();
  useLockBodyScroll(mobileOpen);

  const solid = scrolled || mobileOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100]">
        <motion.div
          className={`transition-all duration-500 ${
            solid ? 'bg-ink-50/95 shadow-soft backdrop-blur-xl' : 'bg-gradient-to-b from-ink-950/80 to-transparent'
          }`}
        >
          <div className="container-x flex h-[70px] items-center justify-between gap-4">
            {/* Logo */}
            <a href="#top" className="flex shrink-0 items-center gap-3" aria-label={`${site.name} home`}>
              <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl bg-white shadow-soft ring-1 ring-black/5">
                <img src={site.logoMark} alt="" className="h-full w-full object-cover" />
              </span>
              <span className="leading-tight">
                <span className={`block font-display text-[17px] tracking-tight transition-colors ${solid ? 'text-ink-900' : 'text-white'}`}>
                  {site.shortName}
                </span>
                <span className="block text-[9px] font-bold uppercase tracking-[0.28em] text-brand-500">
                  Our Businesses
                </span>
              </span>
            </a>

            {/* Centred nav */}
            <nav className="hidden items-center lg:flex">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative px-3.5 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors ${
                    solid ? 'text-ink-700 hover:text-brand-600' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Icon rail */}
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 sm:flex">
                <IconButton href={telLink} label={`Call ${site.phone}`} solid={solid}>
                  <Phone className="h-[15px] w-[15px]" />
                </IconButton>
                <IconButton href={mailLink} label={`Email ${site.email}`} solid={solid}>
                  <Mail className="h-[15px] w-[15px]" />
                </IconButton>
                <IconButton href={waLink(generalEnquiry)} label="Chat on WhatsApp" solid={solid}>
                  <MessageCircle className="h-[15px] w-[15px]" />
                </IconButton>
              </div>

              <a
                href="#contact"
                className={`hidden items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.1em] transition-all duration-300 md:inline-flex ${
                  solid
                    ? 'bg-brand-500 text-white hover:bg-brand-600'
                    : 'bg-white text-ink-900 hover:bg-brand-50'
                }`}
              >
                Get a Quote
                <ArrowRight className="h-3.5 w-3.5" />
              </a>

              <button
                type="button"
                onClick={() => setMobileOpen((o) => !o)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                className={`grid h-10 w-10 place-items-center rounded-full border transition-colors lg:hidden ${
                  solid ? 'border-ink-200 text-ink-700' : 'border-white/25 text-white'
                }`}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Reading progress */}
          <div className="h-[2px] w-full bg-transparent">
            <div
              className="h-full origin-left bg-gradient-to-r from-brand-500 to-brand-300"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </motion.div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 overflow-hidden bg-ink-50 lg:hidden"
            >
              <div className="container-x max-h-[calc(100vh-120px)] space-y-1 overflow-y-auto py-5">
                {NAV.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.35 }}
                    className="block rounded-lg px-3 py-3 font-display text-lg text-ink-800 transition-colors hover:text-brand-600"
                  >
                    {item.label}
                  </motion.a>
                ))}

                <div className="grid grid-cols-2 gap-2.5 pt-4">
                  <a href={telLink} className="btn-dark !py-3">
                    <Phone className="h-4 w-4" />
                    Call
                  </a>
                  <a href={waLink(generalEnquiry)} target="_blank" rel="noopener noreferrer" className="btn-primary !py-3">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

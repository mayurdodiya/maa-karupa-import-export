import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';
import { site, telLink, waLink, generalEnquiry } from '@/lib/site';

/** Persistent contact rail: WhatsApp, call, and a back-to-top that appears on scroll. */
export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 end-5 z-[90] flex flex-col items-end gap-3">
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="top"
            type="button"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="grid h-11 w-11 place-items-center rounded-full border border-ink-200 bg-white text-ink-700 shadow-soft transition-colors hover:border-brand-500 hover:text-brand-600"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <a
        href={telLink}
        aria-label={`Call ${site.phone}`}
        className="grid h-11 w-11 place-items-center rounded-full border border-ink-200 bg-white text-ink-700 shadow-soft transition-colors hover:border-brand-500 hover:text-brand-600"
      >
        <Phone className="h-5 w-5" />
      </a>

      <a
        href={waLink(generalEnquiry)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform hover:-translate-y-0.5"
      >
        <span className="absolute h-14 w-14 animate-pulse-ring rounded-full bg-[#25D366]/50" />
        <MessageCircle className="relative h-6 w-6" />
      </a>
    </div>
  );
}

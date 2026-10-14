import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal } from '@/components/common/Reveal';

const FAQS = [
  { q: 'What is the minimum order quantity?', a: 'MOQ depends on product and origin. Share your requirement and we will quote the best pack size and lead time.' },
  { q: 'Do you handle customs and documentation?', a: 'Yes — LC, BL, customs clearance and compliance paperwork are managed by our trade desk end to end.' },
  { q: 'Can you supply against project timelines?', a: 'Yes, we align dispatch to project milestones with staged deliveries and just-in-time supply.' },
  { q: 'Do tiles and detergents have samples?', a: 'Yes, sample tiles and product samples can be shared on request before bulk order.' },
  { q: 'Which cities do you serve?', a: 'We serve across India and export to multiple countries; share your destination for freight details.' },
];

export function FaqSection() {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" className="scroll-mt-20 bg-white py-16 sm:py-20 lg:py-24">
      <div className="container-x max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions" subtitle="Answers to the questions we hear most often." />
        <div className="mt-10 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q}>
                <div className="rounded-2xl border border-ink-200 bg-ink-50">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-display text-base font-bold text-ink-900">{f.q}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-brand-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && <p className="px-5 pb-4 text-sm leading-relaxed text-ink-600">{f.a}</p>}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
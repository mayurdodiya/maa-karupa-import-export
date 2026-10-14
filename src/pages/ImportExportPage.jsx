import { useEffect } from 'react';
import { Globe, ShieldCheck, Ship, FileCheck2, Warehouse, Headphones, ArrowLeft } from 'lucide-react';
import { site, businesses, waLink, generalEnquiry } from '@/lib/site';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '@/components/common/Reveal';
import { ContactSection } from '@/components/home/ContactSection';

const HIGHLIGHTS = [
  { icon: Globe, title: 'Global Sourcing', text: 'Certified mills and manufacturers across multiple countries for steel, machinery and materials.' },
  { icon: ShieldCheck, title: 'Quality Checks', text: 'Mill test certificates, third-party inspection and grade verification before dispatch.' },
  { icon: FileCheck2, title: 'Documentation', text: 'End-to-end paperwork — LC, BL, customs clearance and compliance handled by our desk.' },
  { icon: Ship, title: 'Door-to-Door Logistics', text: 'Consolidated containers and break-bulk cargo with tracked delivery timelines.' },
  { icon: Warehouse, title: 'Warehousing', text: 'Safe storage, staging and just-in-time dispatch for project and retail requirements.' },
  { icon: Headphones, title: 'After-Sales Support', text: 'Spares, technical guidance and follow-up support for every consignment.' },
];

export function ImportExportPage() {
  const ie = businesses.find((b) => b.id === 'import-export');

  useEffect(() => {
    document.title = 'Import Export Business — Maa Krupa Group';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goHome = () => {
    window.location.hash = '';
  };

  if (!ie) return null;

  return (
    <div className="flex-1">
      <section className="scroll-mt-20 bg-white py-12 sm:py-16 lg:py-20">
        <div className="container-x">
          <button
            type="button"
            onClick={goHome}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </button>

          <SectionHeading
            eyebrow="Import Export Business"
            title="Global trade, handled end to end"
            subtitle="Maa Krupa Trading moves certified construction materials, industrial equipment and consumer goods across international supply chains — with quality, paperwork and delivery managed at every border."
          />

          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div className="overflow-hidden rounded-3xl bg-ink-900 shadow-lift">
                <img src={ie.cover} alt={ie.name} className="h-full w-full object-cover" loading="lazy" />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <p className="text-base leading-relaxed text-ink-600">{ie.description}</p>
                <ul className="mt-6 space-y-3">
                  {[
                    'Certified steel, TMT bars and structural sections',
                    'Industrial machinery with spares support',
                    'Cement, aggregates and finishing materials in bulk',
                    'PPE and site-safety equipment to international standards',
                    'Tools, fasteners and industrial hardware',
                    'Bulk and break-bulk cargo with customs clearance',
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                      <span className="text-sm leading-relaxed text-ink-700">{line}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 grid grid-cols-3 gap-4">
                  {[
                    { value: '18+', label: 'Years' },
                    { value: '420+', label: 'Clients' },
                    { value: '90K MT', label: 'Cargo' },
                  ].map((s) => (
                    <div key={s.label} className="rounded-2xl bg-ink-50 p-4 text-center shadow-soft">
                      <div className="font-display text-2xl font-extrabold text-brand-600">{s.value}</div>
                      <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-500">{s.label}</div>
                    </div>
                  ))}
                </div>

                <a href={waLink(generalEnquiry)} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8 inline-flex">
                  <Globe className="h-4 w-4" />
                  Contact Trade Desk
                </a>
              </div>
            </Reveal>
          </div>

          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {HIGHLIGHTS.map((h) => {
              const Icon = h.icon;
              return (
                <RevealItem key={h.title} y={20} className="h-full">
                  <article className="h-full rounded-2xl border border-ink-200 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-300">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500/10 text-brand-600">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-bold text-ink-900">{h.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">{h.text}</p>
                  </article>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>
      <ContactSection />
    </div>
  );
}
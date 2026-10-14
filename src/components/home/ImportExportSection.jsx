import { ArrowRight, Globe, ShieldCheck, Ship } from 'lucide-react';
import { Reveal } from '@/components/common/Reveal';

const POINTS = [
  { icon: Globe, label: 'Global sourcing across certified mills' },
  { icon: ShieldCheck, label: 'Grade verification & MTC checks' },
  { icon: Ship, label: 'End-to-end logistics & customs' },
];

export function ImportExportSection() {
  const explore = () => {
    window.location.hash = '/import-export';
  };

  return (
    <section id="import-export-highlight" className="scroll-mt-20 py-16 sm:py-20 lg:py-24">
      <div className="container-x">
        <div className="grid overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl lg:grid-cols-12">
          {/* Left visual panel */}
          <div className="relative lg:col-span-7">
            <img
              src="/images/businesses/import-export/cover.jpg"
              alt="Import Export business"
              className="h-full min-h-[280px] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-sky-400/20 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-sky-300 backdrop-blur">
                <Globe className="h-3.5 w-3.5" />
                Import Export
              </span>
              <h3 className="mt-3 font-display text-2xl font-extrabold text-white sm:text-3xl">
                Certified materials, sourced worldwide
              </h3>
            </div>
          </div>

          {/* Right content panel */}
          <div className="flex flex-col justify-center p-8 sm:p-10 lg:col-span-5">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-400">Business Highlight</p>
              <h2 className="mt-3 font-display text-[1.9rem] font-extrabold leading-tight tracking-tight text-white sm:text-[2.2rem]">
                Trade desk that handles everything end to end
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/75">
                From mill sourcing to door delivery — quality checks, paperwork and logistics managed by one trusted team.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <ul className="mt-6 space-y-3">
                {POINTS.map((p) => {
                  const Icon = p.icon;
                  return (
                    <li key={p.label} className="flex items-center gap-3 text-sm font-semibold text-white/90">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/10 text-sky-300">
                        <Icon className="h-4 w-4" />
                      </span>
                      {p.label}
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={explore}
                  className="group inline-flex items-center gap-2 rounded-full bg-sky-400 px-6 py-3 text-[12px] font-bold uppercase tracking-[0.14em] text-slate-950 transition-all hover:-translate-y-0.5 hover:bg-sky-300"
                >
                  Explore Business
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </button>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
                  18+ years · 420+ clients
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
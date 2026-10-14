import { Truck, SearchCheck, BadgeCheck, PackageCheck, Wrench, Headset } from 'lucide-react';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '@/components/common/Reveal';

const SERVICES = [
  { icon: SearchCheck, title: 'Sourcing & Procurement', text: 'Identify the right mill or brand for each grade, size and specification.' },
  { icon: BadgeCheck, title: 'Quality Assurance', text: 'Inspection, MTC verification and third-party testing before shipment.' },
  { icon: PackageCheck, title: 'Packaging & Staging', text: 'Export-grade packing, labelling and container stuffing support.' },
  { icon: Truck, title: 'Freight & Customs', text: 'Booking, documentation and customs clearance end to end.' },
  { icon: Wrench, title: 'Spares & Technical', text: 'Technical guidance, drawings and spares support for machinery.' },
  { icon: Headset, title: 'Dedicated Desk', text: 'Single point of contact from enquiry to delivery and follow-up.' },
];

export function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-20 bg-white py-16 sm:py-20 lg:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Services"
          title="What we do for you"
          subtitle="A single partner for sourcing, verification, paperwork and delivery — so your project or production line keeps moving."
        />
        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <RevealItem key={s.title} y={20} className="h-full">
                <article className="h-full rounded-2xl border border-ink-200 bg-ink-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:bg-white">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500/10 text-brand-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-ink-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.text}</p>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
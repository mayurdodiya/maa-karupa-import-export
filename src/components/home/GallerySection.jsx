import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '@/components/common/Reveal';

const IMAGES = [
  '/images/businesses/import-export/cover.jpg',
  '/images/businesses/import-export/steel.jpg',
  '/images/businesses/import-export/machinery.jpg',
  '/images/businesses/import-export/materials.jpg',
  '/images/businesses/import-export/safety.jpg',
  '/images/businesses/import-export/tmt.jpg',
  '/images/businesses/import-export/tools.jpg',
  '/images/businesses/import-export/logistics.jpg',
  '/images/businesses/detergent/cover.jpg',
  '/videos/tiles/54c2bcbe4d5a50242d8a078aca9ee1df.jpg',
];

export function GallerySection() {
  return (
    <section id="gallery" className="scroll-mt-20 bg-ink-50 py-16 sm:py-20 lg:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Gallery"
          title="Our products in action"
          subtitle="A quick look at the materials, machinery and surfaces we supply every day."
        />
        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.04}>
          {IMAGES.map((src, i) => (
            <RevealItem key={src + i} y={20}>
              <div className="group overflow-hidden rounded-2xl bg-ink-100 shadow-soft">
                <img
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  loading="lazy"
                  className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
import { useEffect, useState } from 'react';
import { ArrowLeft, MessageCircle, Package, Layers, Factory, Truck } from 'lucide-react';
import { businesses, waLink, productEnquiry } from '@/lib/site';
import { SectionHeading } from '@/components/common/SectionHeading';
import { ContactSection } from '@/components/home/ContactSection';
import { Reveal } from '@/components/common/Reveal';

export function ProductDetail({ id }) {
  const [currentImage, setCurrentImage] = useState(0);

  const product = businesses
    .flatMap((b) => b.products.map((p) => ({ ...p, business: b.name, businessId: b.id, cover: b.cover })))
    .find((p) => p.id === id);

  useEffect(() => {
    setCurrentImage(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (product) document.title = `${product.name} — ${product.business}`;
    // `product` is rebuilt fresh from `businesses` on every render, so it must
    // not be a dependency here — only re-run this when the route's id changes,
    // otherwise it fires on every re-render (e.g. a thumbnail click) and
    // immediately resets currentImage back to 0.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const goHome = () => {
    window.location.hash = '';
  };

  if (!product) {
    return (
      <section className="container-x py-24 text-center">
        <h1 className="font-display text-3xl font-extrabold text-ink-900">Product not found</h1>
        <p className="mt-3 text-ink-600">The product you are looking for does not exist or has been moved.</p>
        <button type="button" onClick={goHome} className="btn-primary mt-6">
          Back to Home
        </button>
      </section>
    );
  }

  const siblings = businesses
    .find((b) => b.id === product.businessId)
    .products.filter((p) => p.id !== product.id);

  const gallery = (product.images?.length ? product.images : [product.image]).filter(Boolean);

  const specs = [
    { label: 'Category', value: product.category },
    { label: 'Business', value: product.business },
    { label: 'Grade / Type', value: product.name },
    { label: 'Packaging', value: 'Export-grade, moisture-safe packaging' },
    { label: 'Delivery', value: 'As per project / order schedule' },
    { label: 'Origin', value: 'Certified global mills and trusted manufacturers' },
  ];

  const features = [
    'Quality-checked before dispatch',
    'Documentation and paperwork support',
    'Consistent supply for projects and bulk orders',
    'Technical guidance on selection and use',
  ];

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
            Back to all products
          </button>

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <div>
                <div className="overflow-hidden rounded-3xl bg-ink-100 shadow-lift">
                  {product.video && currentImage === 0 ? (
                    <video
                      key={product.video}
                      src={product.video}
                      poster={gallery[currentImage]}
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls
                      className="aspect-[4/3] h-full w-full object-cover"
                    />
                  ) : (
                    <img
                      src={gallery[currentImage]}
                      alt={product.name}
                      className="aspect-[4/3] h-full w-full object-cover"
                    />
                  )}
                </div>
                {gallery.length > 1 && (
                  <div className="mt-4 flex gap-3 overflow-x-auto pb-1 no-scrollbar">
                    {gallery.map((img, i) => (
                      <button
                        key={img + i}
                        type="button"
                        onClick={() => setCurrentImage(i)}
                        className={`h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                          i === currentImage ? 'border-brand-500 ring-2 ring-brand-500/20' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt={`${product.name} ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-bold text-brand-600">
                  <Package className="h-4 w-4" />
                  {product.category}
                </span>
                <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">{product.name}</h1>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-ink-500">{product.business}</p>
                <p className="mt-5 text-base leading-relaxed text-ink-600">{product.description}</p>

                <div className="mt-6 rounded-2xl border border-ink-200 bg-ink-50 p-5">
                  <h2 className="font-display text-lg font-bold text-ink-900">Highlights</h2>
                  <ul className="mt-3 space-y-2">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-ink-700">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={waLink(productEnquiry(product))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Enquire on WhatsApp
                  </a>
                  <button type="button" onClick={goHome} className="btn-outline">
                    Explore More
                  </button>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-soft">
                <h2 className="font-display text-xl font-bold text-ink-900">Specifications</h2>
                <dl className="mt-4 divide-y divide-ink-100">
                  {specs.map((s) => (
                    <div key={s.label} className="flex items-start justify-between gap-4 py-3">
                      <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-500">{s.label}</dt>
                      <dd className="text-right text-sm text-ink-800">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-soft">
                <h2 className="font-display text-xl font-bold text-ink-900">About this product line</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  Every consignment is supported by quality documentation, careful packaging and dependable delivery. Reach out with your quantity, city and timeline and our desk will respond with availability and pricing.
                </p>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[
                    { icon: Factory, label: 'Verified source' },
                    { icon: Truck, label: 'Safe delivery' },
                    { icon: Layers, label: 'Bulk & retail' },
                  ].map((b) => {
                    const Icon = b.icon;
                    return (
                      <div key={b.label} className="flex flex-col items-center gap-2 rounded-xl bg-ink-50 p-3 text-center">
                        <Icon className="h-5 w-5 text-brand-500" />
                        <span className="text-[11px] font-semibold text-ink-700">{b.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>

          {siblings.length > 0 && (
            <div className="mt-14">
              <SectionHeading eyebrow="Related" title="More from this business" subtitle="Other products from the same vertical." />
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {siblings.slice(0, 3).map((p) => (
                  <Reveal key={p.id}>
                    <button
                      type="button"
                      onClick={() => {
                        window.location.hash = `/product/${p.id}`;
                      }}
                      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-glow"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-ink-100">
                        <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-600 shadow-soft">
                          {p.category}
                        </span>
                      </div>
                      <div className="p-5">
                        <h3 className="font-display text-lg font-bold text-ink-900">{p.name}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-ink-600">{p.description}</p>
                      </div>
                    </button>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      <ContactSection />
    </div>
  );
}
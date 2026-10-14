import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Globe, LayoutGrid, Droplets, ChevronLeft, ChevronRight, MessageCircle, ArrowRight } from 'lucide-react';
import { businesses, waLink, productEnquiry } from '@/lib/site';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '@/components/common/Reveal';

const ICONS = { Globe, LayoutGrid, Droplets };

function ProductCard({ product, onOpen }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !product.video) return undefined;

    const playPromise = video.play();
    if (playPromise !== undefined) playPromise.catch(() => {});

    return () => {
      if (video && !video.paused) video.pause();
    };
  }, [product.video]);

  return (
    <article
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen?.();
        }
      }}
      role="button"
      tabIndex={0}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-glow"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-100">
        {product.video ? (
          <video
            ref={videoRef}
            src={product.video}
            poster={product.image}
            className="h-full w-full object-cover"
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-600 shadow-soft">
          {product.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h4 className="font-display text-lg font-bold text-ink-900">{product.name}</h4>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{product.description}</p>
        <a
          href={waLink(productEnquiry(product))}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-brand-600 transition-colors hover:text-brand-700"
        >
          <MessageCircle className="h-4 w-4" />
          Enquire on WhatsApp
        </a>
        <span className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold text-ink-500">
          View details
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}

function ProductCarousel({ products }) {
  const [current, setCurrent] = useState(0);
  const [auto, setAuto] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!auto) return undefined;
    const t = setInterval(() => setCurrent((p) => (p + 1) % products.length), 3800);
    return () => clearInterval(t);
  }, [auto, products.length]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    const playPromise = video.play();
    if (playPromise !== undefined) playPromise.catch(() => {});
    return () => {
      if (video && !video.paused) video.pause();
    };
  }, [current, products]);

  const go = (i) => {
    setAuto(false);
    setCurrent(((i % products.length) + products.length) % products.length);
  };

  const active = products[current];

  return (
    <div className="relative">
      <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-ink-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {active.video ? (
              <video
                ref={videoRef}
                src={active.video}
                poster={active.image}
                className="h-full w-full object-cover"
                muted
                loop
                playsInline
                preload="auto"
              />
            ) : (
              <img src={active.image} alt={active.name} className="h-full w-full object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
              <span className="inline-block rounded-full bg-brand-500 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                {active.category}
              </span>
              <h3 className="mt-3 font-display text-2xl font-extrabold text-white sm:text-3xl">{active.name}</h3>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">{active.description}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={() => go(current - 1)}
          aria-label="Previous product"
          className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all hover:bg-white/30"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => go(current + 1)}
          aria-label="Next product"
          className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all hover:bg-white/30"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
          {products.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to ${p.name}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? 'w-8 bg-brand-400' : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {products.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => go(i)}
            aria-label={p.name}
            className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
              i === current ? 'border-brand-500 ring-2 ring-brand-500/20' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <img src={p.image} alt={p.name} className="h-full w-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}

export function BusinessShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const activeBusiness = businesses[activeTab];
  const ActiveIcon = ICONS[activeBusiness.icon] ?? Globe;

  return (
    <section id="businesses" className="scroll-mt-20 bg-white py-16 sm:py-20 lg:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Our Businesses"
          title="Diverse business verticals"
          subtitle="From global trade to premium surfaces to clean-living products — explore the businesses that make up the Maa Krupa Group."
        />

        {/* Tab buttons */}
        <Reveal className="mt-10">
          <div className="flex flex-wrap justify-center gap-3">
            {businesses.map((biz, i) => {
              const Icon = ICONS[biz.icon] ?? Globe;
              return (
                <button
                  key={biz.id}
                  type="button"
                  onClick={() => setActiveTab(i)}
                  className={`group flex items-center gap-3 rounded-xl px-6 py-4 transition-all duration-300 ${
                    i === activeTab
                      ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
                      : 'bg-ink-50 text-ink-700 hover:bg-ink-100'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${i === activeTab ? 'text-white' : 'text-brand-500'}`} />
                  <span className="font-display text-base font-bold">{biz.name}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Business content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeBusiness.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12"
          >
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <Reveal>
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-bold text-brand-600">
                    <ActiveIcon className="h-4 w-4" />
                    {activeBusiness.name}
                  </span>
                  <h3 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
                    {activeBusiness.tagline}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-ink-600">{activeBusiness.description}</p>
                  <div className="mt-6 flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2">
                    <span className="font-display text-2xl font-extrabold text-brand-600">
                      {activeBusiness.products.length}
                    </span>
                    <span className="text-sm font-semibold text-brand-600">Products</span>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <ProductCarousel products={activeBusiness.products} />
              </Reveal>
            </div>

            <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
              {activeBusiness.products.map((product) => (
                <RevealItem key={product.id} y={20} className="h-full">
                  <ProductCard product={product} onOpen={() => {
                    window.location.hash = `/product/${product.id}`;
                  }} />
                </RevealItem>
              ))}
            </RevealGroup>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useMotionPreference } from '@/hooks/useMotionPreference';
import { ArrowRight, ChevronLeft, ChevronRight, Globe } from 'lucide-react';
import { site, businesses } from '@/lib/site';
import { Magnetic, WordReveal } from '@/components/common/Reveal';
import { Counter } from '@/components/common/Counter';

const SLIDE_MS = 5500;

/** Auto-advancing plate of sourcing / port / site photography behind the hero copy. */
function HeroCarousel({ index, onIndexChange, paused, onPausedChange }) {
  const reduce = useMotionPreference();
  const slides = site.hero?.slides ?? [];
  const count = slides.length;

  useEffect(() => {
    if (reduce || paused || count < 2) return undefined;
    const t = setInterval(() => onIndexChange((i) => (i + 1) % count), SLIDE_MS);
    return () => clearInterval(t);
  }, [reduce, paused, count, onIndexChange]);

  const goTo = useCallback(
    (next) => {
      onIndexChange(next);
      onPausedChange(true);
      const resume = setTimeout(() => onPausedChange(false), SLIDE_MS * 1.4);
      return () => clearTimeout(resume);
    },
    [onIndexChange, onPausedChange],
  );

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink-950">
      <AnimatePresence initial={false}>
        {slides[index] && (
          <motion.div
            key={slides[index]}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          >
            <img
              src={slides[index]}
              alt=""
              className={`h-full w-full object-cover ${reduce ? 'scale-105' : 'animate-ken-burns'}`}
              style={reduce ? undefined : { animationDuration: `${SLIDE_MS + 3500}ms` }}
              fetchpriority={index === 0 ? 'high' : undefined}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-ink-950/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/85 via-ink-950/45 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/75 via-transparent to-ink-950/30" />

      {count > 1 && (
        <>
          <div className="absolute inset-x-0 bottom-28 z-10 flex items-center justify-center gap-2.5 sm:bottom-32">
            {slides.map((s, i) => (
              <button
                key={s}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className="group relative grid h-6 w-6 place-items-center"
              >
                <span
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === index ? 'w-6 bg-sky-300 shadow-[0_0_10px_rgba(56,189,248,0.5)]' : 'w-1.5 bg-white/50 group-hover:bg-white/80'
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo((index - 1 + count) % count)}
            aria-label="Previous slide"
            className="absolute start-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all hover:border-sky-300 hover:bg-white/20 sm:grid"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => goTo((index + 1) % count)}
            aria-label="Next slide"
            className="absolute end-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all hover:border-sky-300 hover:bg-white/20 sm:grid"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}
    </div>
  );
}

/** Slow drifting light motes — barely visible, but they keep the plate alive. */
function LightDust() {
  const reduce = useMotionPreference();
  if (reduce) return null;

  const motes = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    left: (i * 37) % 100,
    top: (i * 53) % 100,
    delay: (i % 7) * 1.3,
    dur: 9 + (i % 5) * 2.5,
    size: i % 3 === 0 ? 4 : 3,
  }));

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {motes.map((m) => (
        <motion.span
          key={m.id}
          className="absolute rounded-full bg-sky-200/70"
          style={{ left: `${m.left}%`, top: `${m.top}%`, width: m.size, height: m.size, filter: 'blur(0.5px)' }}
          animate={{ y: [0, -50, 0], opacity: [0, 0.9, 0] }}
          transition={{ duration: m.dur, delay: m.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const reduce = useMotionPreference();
  const ref = useRef(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const rawY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const y = useSpring(rawY, { stiffness: 90, damping: 24, mass: 0.6 });
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const stats = site.stats ?? [];
  const verticals = businesses.map((b) => b.name);

  return (
    <section id="top" ref={ref} className="relative min-h-[100svh] w-full overflow-hidden">
      <HeroCarousel index={index} onIndexChange={setIndex} paused={paused} onPausedChange={setPaused} />
      <LightDust />

      <motion.div
        className="container-x relative flex min-h-[100svh] flex-col justify-center pb-32 pt-32 sm:pb-36"
        style={reduce ? undefined : { y, opacity }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute left-0 top-1/2 h-[400px] w-[600px] -translate-y-1/2 rounded-full bg-ink-950/40 blur-[100px]" />

        <div className="relative z-10 max-w-4xl">
          <motion.p
            className="eyebrow !text-sky-300"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{ textShadow: '0 0 15px rgba(56,189,248,0.5)' }}
          >
            <span className="h-px w-10 bg-sky-300" />
            Maa Krupa Group — Our Businesses
          </motion.p>

          <h1 className="mt-6 h-hero !text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.35)' }}>
            <WordReveal text="Diverse Business" delay={0.3} />
            <br />
            <span className="italic text-sky-300" style={{ textShadow: '0 2px 15px rgba(56,189,248,0.4)' }}>
              <WordReveal text="Verticals." delay={0.55} />
            </span>
          </h1>

          <motion.p
            className="mt-7 max-w-xl text-[15px] leading-[1.9] text-white/85 sm:text-base"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.25)' }}
          >
            {site.intro}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05 }}
          >
            <Magnetic>
              <a href="#businesses" className="btn-primary group hover:shadow-[0_0_25px_rgba(56,189,248,0.3)]">
                <Globe className="h-4 w-4" />
                Explore Businesses
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </a>
            </Magnetic>

            <Magnetic>
              <a href="#contact" className="btn-outline-invert hover:shadow-[0_0_25px_rgba(56,189,248,0.2)]">
                Request a Quote
              </a>
            </Magnetic>
          </motion.div>

          {/* Category quick-jump */}
          <motion.div
            className="mt-12 flex max-w-2xl flex-wrap gap-2.5"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 1.2 } } }}
          >
            {verticals.map((c) => (
              <motion.a
                key={c}
                href="#businesses"
                variants={{
                  hidden: reduce ? {} : { opacity: 0, y: 18 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-4 py-2.5 text-[13px] font-semibold text-white/95 backdrop-blur-md transition-all duration-500 hover:border-sky-300/80 hover:bg-white/[0.15]"
              >
                {c}
                <ArrowRight className="h-3.5 w-3.5 text-sky-300 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Stat rail */}
        <motion.dl
          className="mt-14 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 border-t border-white/20 pt-8 sm:grid-cols-4"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.45 }}
        >
          {stats.map((s) => (
            <div key={s.label} className="group">
              <dt className="font-display text-3xl text-sky-300 transition-transform duration-300 group-hover:scale-105 sm:text-4xl">
                <Counter value={s.value} suffix={s.suffix} />
              </dt>
              <dd className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
                {s.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute inset-x-0 bottom-7 z-10 flex flex-col items-center gap-2"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.8 }}
      >
        <span className="relative grid h-9 w-[22px] place-items-start justify-center rounded-full border border-white/40 bg-white/5 pt-1.5 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 animate-scroll-dot rounded-full bg-sky-300" />
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/65">Scroll</span>
      </motion.div>
    </section>
  );
}

import { useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingActions } from '@/components/common/FloatingActions';
import { usePageMeta } from '@/hooks/usePageMeta';
import { site } from '@/lib/site';
import { Hero } from '@/components/home/Hero';
import { MarqueeStrip } from '@/components/home/MarqueeStrip';
import { BusinessShowcase } from '@/components/home/BusinessShowcase';
import { ImportExportSection } from '@/components/home/ImportExportSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { GallerySection } from '@/components/home/GallerySection';
import { ImportExportPage } from '@/pages/ImportExportPage';
import { FaqSection } from '@/components/home/FaqSection';
import { ContactSection } from '@/components/home/ContactSection';
import { ProductDetail } from '@/pages/ProductDetail';

function parseRoute() {
  const hash = (window.location.hash || '').replace(/^#/, '');
  const parts = hash.split('/').filter(Boolean);
  if (parts[0] === 'product' && parts[1]) {
    return { name: 'product', id: decodeURIComponent(parts[1]) };
  }
  if (parts[0] === 'import-export') {
    return { name: 'import-export' };
  }
  return { name: 'home' };
}

const HOME_SCROLL_KEY = 'home-scroll-y';

export default function App() {
  usePageMeta(`${site.name} — ${site.tagline}`, site.intro);

  const [route, setRoute] = useState(parseRoute());

  useEffect(() => {
    const onChange = () => setRoute(parseRoute());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  // Remember where the visitor was scrolled to on the home page, so that
  // navigating into a product/business page and back restores that spot
  // instead of dumping them back at the top of the whole site.
  useEffect(() => {
    if (route.name !== 'home') return undefined;
    const onScroll = () => {
      sessionStorage.setItem(HOME_SCROLL_KEY, String(window.scrollY));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [route.name]);

  useEffect(() => {
    if (route.name === 'home') {
      const saved = Number(sessionStorage.getItem(HOME_SCROLL_KEY));
      window.scrollTo({ top: Number.isFinite(saved) ? saved : 0, behavior: 'auto' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [route.name, route.id]);

  return (
    <MotionConfig reducedMotion="never">
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          {route.name === 'product' ? (
            <ProductDetail id={route.id} />
          ) : route.name === 'import-export' ? (
            <ImportExportPage />
          ) : (
            <>
              <Hero />
              <MarqueeStrip />
              <BusinessShowcase />
              <ImportExportSection />
              <ServicesSection />
              <GallerySection />
              <FaqSection />
              <ContactSection />
            </>
          )}
        </main>
        <Footer />
        <FloatingActions />
      </div>
    </MotionConfig>
  );
}
'use client';

// @refresh reset
// Scroll subscriptions must remount when this component changes during local development.

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { phrase, type Locale } from '@/lib/content';

export function BackToTop({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 320);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [pathname]);

  if (!visible) return null;

  return <button className="back-to-top" aria-label={phrase(locale, 'Voltar ao topo', 'Back to top')} title={phrase(locale, 'Voltar ao topo', 'Back to top')} onClick={() => {
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20V4m-7 7 7-7 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  </button>;
}

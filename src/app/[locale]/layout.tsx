import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Header } from '@/components/header';
import { BackToTop } from '@/components/back-to-top';
import { Footer } from '@/components/ui';
import { isLocale, locales, siteUrl, phrase, indexable } from '@/lib/content';
import '../globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'MaiMiArte — Gabi & Rapha', template: '%s | MaiMiArte' },
  description: 'Dois olhares, um universo de arte. Portfólio de Gabriella e Raphaela Maidana.',
  robots: { index: indexable, follow: indexable },
};
export function generateStaticParams() { return locales.map(locale => ({ locale })); }
export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  return <html lang={locale === 'pt' ? 'pt-BR' : 'en'}><body><NextIntlClientProvider><a href="#main-content" className="skip-link">{phrase(locale, 'Pular para o conteúdo', 'Skip to content')}</a><Header locale={locale}/><main id="main-content">{children}</main><Footer locale={locale}/><BackToTop locale={locale}/></NextIntlClientProvider></body></html>;
}

import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import { WorksFilter, WorksGallery } from '@/components/works-gallery';
import { isLocale, phrase } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return isLocale(locale) ? pageMetadata(locale, phrase(locale, 'Portfólio', 'Portfolio'), phrase(locale, 'Explore os portfólios de Gabi MaiMi, Rapha MaiMi e os projetos em dupla da MaiMi Arte.', 'Explore the portfolios of Gabi MaiMi, Rapha MaiMi and their shared MaiMi Arte projects.'), '/works') : {};
}

export default async function Works({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  return <Suspense fallback={<WorksGallery locale={locale}/>}><WorksFilter locale={locale}/></Suspense>;
}

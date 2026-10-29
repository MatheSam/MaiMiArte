import type { Metadata } from 'next';
import { type Locale, indexable, siteUrl } from './content';
import { assetPath } from './assets';

export function pageMetadata(locale: Locale, title: string, description: string, path = '', image = '/images/floral.jpg'): Metadata {
  const canonical = `${siteUrl}/${locale}${path}`;
  image = new URL(assetPath(image), siteUrl).href;
  return {
    title: { absolute: `${title} | MaiMiArte` }, description,
    alternates: { canonical, languages: { 'pt-BR': `${siteUrl}/pt${path}`, en: `${siteUrl}/en${path}`, 'x-default': `${siteUrl}/pt${path}` } },
    robots: { index: indexable, follow: indexable },
    openGraph: { title: `${title} | MaiMiArte`, description, url: canonical, siteName: 'MaiMiArte', locale: locale === 'pt' ? 'pt_BR' : 'en_US', type: 'website', images: [{ url: image, alt: 'MaiMiArte — creative preview' }] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

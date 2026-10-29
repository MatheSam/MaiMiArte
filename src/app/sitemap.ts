import type { MetadataRoute } from 'next';
export const dynamic = 'force-static';
import { locales, projects, products, posts, siteUrl, indexable } from '@/lib/content';
export default function sitemap(): MetadataRoute.Sitemap {
  if (!indexable) return [];
  const paths = ['', '/works', '/about', '/shop', '/shop/brasil', '/shop/mundo', '/blog', ...projects.map(p => `/works/${p.slug}`), ...posts.map(p => `/blog/${p.slug}`), ...['brasil', 'mundo'].flatMap(r => products.map(p => `/shop/${r}/${p.slug}`))];
  return locales.flatMap(locale => paths.map(path => ({ url: `${siteUrl}/${locale}${path}`, alternates: { languages: { 'pt-BR': `${siteUrl}/pt${path}`, en: `${siteUrl}/en${path}` } } })));
}

import type { MetadataRoute } from 'next';
export const dynamic = 'force-static';
import { siteUrl, indexable } from '@/lib/content';
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: '*', allow: '/' }, ...(indexable ? { sitemap: `${siteUrl}/sitemap.xml` } : {}) }; }

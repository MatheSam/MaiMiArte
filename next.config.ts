import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
const githubPages = process.env.GITHUB_PAGES === 'true';
const config: NextConfig = {
  ...(githubPages ? { output: 'export', basePath: '/MaiMiArte', trailingSlash: true } : {}),
  poweredByHeader: false,
  devIndicators: false,
  images: { qualities: [75, 85], unoptimized: githubPages },
  ...(!githubPages ? { async redirects() { return [{ source: '/', destination: '/pt', permanent: false }]; } } : {}),
};
export default withNextIntl(config);

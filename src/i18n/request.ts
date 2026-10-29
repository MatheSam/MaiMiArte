import { getRequestConfig } from 'next-intl/server';
import { isLocale } from '@/lib/content';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = isLocale(requested) ? requested : 'pt';
  return { locale, messages: (await import(`../../messages/${locale}.json`)).default };
});

import { phrase, type Locale } from '@/lib/content';

export function RegionIcon({ region }: { region: 'brasil' | 'mundo' }) {
  return region === 'brasil' ? <svg className="region-icon" viewBox="0 0 28 20" aria-hidden="true"><rect width="28" height="20" rx="2" fill="#229e45"/><path d="m14 2 12 8-12 8L2 10Z" fill="#ffdf40"/><circle cx="14" cy="10" r="4.5" fill="#2457a7"/><path d="M10 8.5q4-.5 8 3" fill="none" stroke="white" strokeWidth="1"/></svg> : <svg className="region-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4.5" ry="10"/><path d="M2 12h20M4 6.5h16M4 17.5h16"/></svg>;
}

export function RegionLabel({ region, locale }: { region: 'brasil' | 'mundo'; locale: Locale }) {
  return <span className="region-label"><RegionIcon region={region}/>{region === 'brasil' ? phrase(locale, 'Brasil', 'Brazil') : phrase(locale, 'Mundo', 'Worldwide')}</span>;
}

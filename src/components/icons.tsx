export function Arrow({ diagonal = false, className = '' }: { diagonal?: boolean; className?: string }) {
  return <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h15m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
export function Palette({ className = '' }: { className?: string }) {
  return <svg className={`link-palette ${className}`} width="25" height="25" viewBox="0 0 28 28" fill="none" aria-hidden="true"><path d="M14 3C7.4 3 3 7.5 3 13.5 3 20.1 7.8 25 14.3 25c2.7 0 4.3-1.2 4.3-3 0-1.2-.7-1.9-.7-3 0-1.2.9-2 2.2-2h1.4c2.4 0 3.5-1.6 3.5-4.2C25 7.2 20 3 14 3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><circle cx="8" cy="12" r="1.7" fill="var(--color-olive)"/><circle cx="12" cy="7.8" r="1.7" fill="var(--color-terracotta)"/><circle cx="18" cy="8.3" r="1.7" fill="var(--color-blue)"/><circle cx="21" cy="13" r="1.7" fill="var(--color-cashmere)"/><ellipse cx="12" cy="19" rx="2.2" ry="2.8" transform="rotate(-25 12 19)" stroke="currentColor" strokeWidth="1.2"/></svg>;
}
// Temporary original mark. Replace with the approved client logo when the source asset is supplied.
export function CatMark({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 54 58" width="42" height="46" fill="none" aria-hidden="true"><path d="M9 29 7 6l15 12c4-1 8-1 12 0L48 5l-1 25c4 17-6 24-19 24C14 54 5 45 9 29Z" fill="currentColor"/><path d="m18 32 3 1m12 0 3-1m-12 8 4 3 4-3m-4 3v5M6 38l12 2M4 45l14-2m20-3 12-2m-12 5 14 2" stroke="var(--color-paper)" strokeWidth="1.4" strokeLinecap="round"/></svg>;
}
export function Flower({ className = '' }: { className?: string }) {
  return <svg className={`living-flower ${className}`} width="80" height="80" viewBox="0 0 100 100" fill="none" aria-hidden="true"><g className="flower-petals"><path d="M50 40C17 1 70-7 57 37 95 5 110 53 66 50 110 76 66 104 57 66 49 110 7 83 38 58-7 60 5 11 43 39Z" stroke="currentColor" strokeWidth="1.5"/></g><circle className="flower-center" cx="51" cy="51" r="8" stroke="currentColor" strokeWidth="1.5"/></svg>;
}

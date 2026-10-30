'use client';

import Image from 'next/image';
import { assetPath } from '@/lib/assets';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { artists, type Locale } from '@/lib/content';
import { ArtistThumbnail } from './artist-thumbnail';
import { Flower, Palette } from './icons';

function SectionIcon({ section }: { section: 'about' | 'shop' | 'blog' }) {
  if (section === 'about') return <Flower className="mobile-section-icon"/>;
  if (section === 'shop') return <svg className="mobile-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 8h16l-1 13H5L4 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>;
  return <svg className="mobile-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 4.5A3.5 3.5 0 0 1 7.5 3H20v17H7.5A3.5 3.5 0 0 0 4 23V4.5Z"/><path d="M4 5v18m4-15h8m-8 4h8"/></svg>;
}

export function Header({ locale }: { locale: Locale }) {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [worksOpen, setWorksOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const worksMenuRef = useRef<HTMLDivElement>(null);
  const worksCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openWorks() {
    if (worksCloseTimer.current) clearTimeout(worksCloseTimer.current);
    setWorksOpen(true);
  }

  function closeWorks() {
    if (worksCloseTimer.current) clearTimeout(worksCloseTimer.current);
    worksCloseTimer.current = setTimeout(() => {
      if (!worksMenuRef.current?.matches(':focus-within')) setWorksOpen(false);
    }, 140);
  }

  useEffect(() => () => {
    if (worksCloseTimer.current) clearTimeout(worksCloseTimer.current);
  }, []);

  useEffect(() => { setOpen(false); setWorksOpen(false); }, [pathname]);
  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 0);
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);
  useEffect(() => {
    const outside = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setWorksOpen(false);
    };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, []);

  const otherLocale = locale === 'pt' ? 'en' : 'pt';
  const languageHref = `/${otherLocale}${pathname.replace(/^\/(pt|en)/, '')}`;
  const artistLinks = artists.map(artist => (
    <Link key={artist.slug} href={`/${locale}/works?artist=${artist.slug}`} onClick={() => { setOpen(false); setWorksOpen(false); }}>
      <ArtistThumbnail artist={artist.slug}/><span>{artist.name}</span><Palette/>
    </Link>
  ));

  return <header id="top" ref={headerRef} className={`site-header${scrolled ? ' logo-compact' : ''}`} onKeyDown={e => {
    if (e.key === 'Escape') { setOpen(false); setWorksOpen(false); menuRef.current?.focus(); }
  }}>
    <Link href={`/${locale}`} className="brand" aria-label={locale === 'pt' ? 'MaiMiArte — Página principal' : 'MaiMiArte — Home'}>
      <Image src={assetPath('/images/logo-maimi.png')} alt="MaiMi Arte" width={339} height={310} priority sizes="8rem"/>
    </Link>
    <div className="header-inner">
      <div className="header-right">
        <nav aria-label={locale === 'pt' ? 'Navegação principal' : 'Main navigation'} className="desktop-nav">
          <div ref={worksMenuRef} className="works-menu" onMouseEnter={openWorks} onMouseLeave={closeWorks} onFocus={openWorks} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setWorksOpen(false); }}>
            <div className="works-control">
              <Link href={`/${locale}/works`} aria-current={pathname.includes('/works') ? 'page' : undefined}>{t('works')}</Link>
            </div>
            <div id="works-submenu" className="works-submenu" hidden={!worksOpen}>{artistLinks}</div>
          </div>
          {(['about', 'shop', 'blog'] as const).map(item => <Link key={item} href={`/${locale}/${item}`} aria-current={pathname.includes(`/${item}`) ? 'page' : undefined}>{t(item)}</Link>)}
        </nav>
        <div className="header-actions">
          <div className="language-switch" aria-label={locale === 'pt' ? 'Idioma' : 'Language'}>
            {(['pt', 'en'] as const).map((language, index) => <span key={language} className="language-option">
              {index === 1 && <span className="language-divider" aria-hidden="true">/</span>}
              {language === locale ? <span aria-current="true">{language.toUpperCase()}</span> : <Link href={languageHref} hrefLang={otherLocale} lang={otherLocale} onClick={e => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey && window.location.search) { e.preventDefault(); router.push(`${languageHref}${window.location.search}`); }
              }}>{language.toUpperCase()}</Link>}
            </span>)}
          </div>
          <button ref={menuRef} className="menu-toggle" aria-label={open ? t('close') : t('open')} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>
            <span className={open ? 'menu-line open' : 'menu-line'}/><span className={open ? 'menu-line open' : 'menu-line'}/>
          </button>
        </div>
      </div>
    </div>
    {open && <nav className="mobile-nav" id="mobile-nav" aria-label={locale === 'pt' ? 'Navegação móvel' : 'Mobile navigation'}>
      <Link href={`/${locale}/works`} onClick={() => setOpen(false)}>{t('works')}</Link>
      <div className="mobile-artists">{artistLinks}</div>
      {(['about', 'shop', 'blog'] as const).map(item => <Link key={item} href={`/${locale}/${item}`} onClick={() => setOpen(false)}>{t(item)}<SectionIcon section={item}/></Link>)}
    </nav>}
  </header>;
}

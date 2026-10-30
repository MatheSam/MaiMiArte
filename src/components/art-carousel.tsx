'use client';

import { useState } from 'react';
import Link from 'next/link';
import { projects, phrase, localize, type Locale } from '@/lib/content';
import { ArtImage } from './ui';
import { Palette } from './icons';

export function ArtCarousel({ locale }: { locale: Locale }) {
  const [paused, setPaused] = useState(false);
  const works = projects.slice(0, 5);

  return <section className={`art-belt ${paused ? 'is-paused' : ''}`} aria-label={phrase(locale, 'Trabalhos do portfólio em destaque', 'Featured portfolio work')}>
    <div className="art-belt-window">
      <div className="art-belt-track">
        {[0, 1].map(copy => <div key={copy} className="art-belt-group" aria-hidden={copy === 1 ? true : undefined}>
          {works.map(project => <Link key={project.slug} href={`/${locale}/works/${project.slug}`} className="art-belt-item" tabIndex={copy === 1 ? -1 : undefined}>
            <ArtImage src={project.image} alt={copy === 0 ? `${localize(project.title, locale)} — ${phrase(locale, 'trabalho demonstrativo', 'sample artwork')}` : ''} priority={copy === 0} sizes="(max-width: 700px) 75vw, 35vw"/>
            <span>{localize(project.title, locale)}<Palette/></span>
          </Link>)}
        </div>)}
      </div>
    </div>
    <div className="art-belt-caption"><p>{phrase(locale, 'Uma seleção do portfólio · imagens demonstrativas', 'A selection from the portfolio · sample images')}</p><button onClick={() => setPaused(!paused)} aria-pressed={paused} aria-label={paused ? phrase(locale, 'Retomar movimento', 'Resume motion') : phrase(locale, 'Pausar movimento', 'Pause motion')} title={paused ? phrase(locale, 'Retomar movimento', 'Resume motion') : phrase(locale, 'Pausar movimento', 'Pause motion')}><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{paused ? <path d="M8 4.5v15l12-7.5Z"/> : <><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></>}</svg></button></div>
  </section>;
}

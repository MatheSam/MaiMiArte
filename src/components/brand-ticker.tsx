'use client';

import { useState } from 'react';
import { phrase, type Locale } from '@/lib/content';

export function BrandTicker({ locale }: { locale: Locale }) {
  const [paused, setPaused] = useState(false);
  const words = [phrase(locale, 'DOIS OLHARES', 'TWO PERSPECTIVES'), phrase(locale, 'ARTE QUE CONECTA', 'ART THAT CONNECTS'), phrase(locale, 'FEITO COM AFETO', 'MADE WITH AFFECTION'), 'GABI + RAPHA'];
  return <section className={`brand-ticker${paused ? ' is-paused' : ''}`} aria-label={phrase(locale, 'O universo MaiMi', 'The MaiMi world')}>
    <div className="ticker-window"><div className="ticker-track">
      {[0, 1].map(copy => <div className="ticker-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>{words.map(word => <span className="ticker-item" key={word}>{word}<span aria-hidden="true">✳</span></span>)}</div>)}
    </div></div>
    <button className="ticker-pause" onClick={() => setPaused(!paused)} aria-pressed={paused} aria-label={paused ? phrase(locale, 'Retomar faixa de frases', 'Resume text ticker') : phrase(locale, 'Pausar faixa de frases', 'Pause text ticker')}>{paused ? '▶' : 'Ⅱ'}</button>
  </section>;
}

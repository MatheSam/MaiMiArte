'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { type Locale, phrase, projects, localize } from '@/lib/content';
import { ArtImage, Eyebrow } from './ui';
import { Flower, Palette } from './icons';

export function Hero({ locale }: { locale: Locale }) {
  // All three cards and their images stay mounted. Only their stack positions change.
  const [order, setOrder] = useState([0, 1, 2]);
  const front = order[0];
  const reduced = useReducedMotion();
  const slides = [projects[0], projects[2], projects[1]];

  function bringForward(index: number) {
    setOrder(current => current[0] === index ? current : [index, ...current.filter(card => card !== index)]);
  }

  return <section className="hero">
    <div className="hero-copy">
      <Eyebrow>{phrase(locale, 'ARTE AUTORAL, FEITA A DUAS', 'ORIGINAL ART, TWO PERSPECTIVES')}</Eyebrow>
      <h1>{phrase(locale, 'Dois olhares.', 'Two perspectives.')}<br/><span>{phrase(locale, 'Um universo', 'A world')}<br className="desktop-break"/> {phrase(locale, 'de arte.', 'of art.')}</span><Flower className="hero-flower"/></h1>
      <p>{phrase(locale, 'Somos Gabi e Rapha. Irmãs gêmeas, artistas e criadoras de mundos que se encontram em cores, formas e afetos.', 'We’re Gabi and Rapha. Twin sisters, artists and creators of worlds that meet through colours, shapes and affection.')}</p>
      <Link className="primary-link" href={`/${locale}/works`}>{phrase(locale, 'Explore nossos trabalhos', 'Explore our work')}<span><Palette/></span></Link>
      <div className="hero-footnote"><span className="tiny-flower">✳</span>{phrase(locale, 'Cada uma, um jeito. Juntas, MaiMiArte.', 'Each with her own way. Together, MaiMiArte.')}</div>
    </div>
    <div className="hero-gallery">
      <div className="hero-gallery-meta"><span>MAIMIARTE — {phrase(locale, 'CADERNO VISUAL', 'VISUAL NOTEBOOK')}</span><span>01 — 03</span></div>
      <div className="hero-composition notebook-deck">
        <span className="composition-circle"/>
        {slides.map((project, index) => {
          const depth = order.indexOf(index);
          const isFront = depth === 0;
          const position = [
            { left: '32%', top: '0%', rotate: -1, scale: 1 },
            { left: '15%', top: '10%', rotate: -7, scale: .88 },
            { left: '2%', top: '18%', rotate: -13, scale: .76 },
          ][depth];
          return <motion.div key={project.slug} className={`notebook-card ${isFront ? 'notebook-front' : 'notebook-back'}`} data-depth={depth} initial={false}
            style={{ zIndex: 3 - depth }} animate={position}
            transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 110, damping: 19, mass: .8 }}>
            <Link href={`/${locale}/works/${project.slug}`} role={isFront ? undefined : 'button'}
              aria-label={`${isFront ? phrase(locale, 'Abrir projeto', 'Open project') : phrase(locale, 'Trazer para a frente', 'Bring to front')}: ${localize(project.title, locale)}`}
              onClick={event => { if (!isFront && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) { event.preventDefault(); bringForward(index); } }}
              onKeyDown={event => { if (!isFront && event.key === ' ') { event.preventDefault(); bringForward(index); } }}>
              <ArtImage src={project.image} alt={`${localize(project.title, locale)} — ${phrase(locale, 'imagem demonstrativa', 'sample image')}`} priority sizes="(max-width: 700px) 65vw, 32vw"/>
              <span className="art-paper-caption">{localize(project.title, locale)}<span aria-hidden="true">{isFront ? <Palette/> : '⇄'}</span></span>
            </Link>
          </motion.div>;
        })}
        <span className="handwritten">{phrase(locale, 'feito de encontros', 'made of encounters')}<svg width="80" height="34" viewBox="0 0 80 34" aria-hidden="true"><path d="M2 8Q42 35 72 9m-14-1 17-3-5 16" fill="none" stroke="currentColor" strokeWidth="1.3"/></svg></span>
        <Flower className="composition-flower"/><span className="gallery-stamp">GABI + RAPHA<br/>MAIMI ARTE</span>
      </div>
      <div className="hero-gallery-footer"><span>{phrase(locale, 'TOQUE NA CARTA DE TRÁS PARA TROCAR', 'TAP THE BACK CARD TO SWAP')}</span><div className="slide-controls" aria-label={phrase(locale, 'Imagens em destaque', 'Featured images')}>{slides.map((project, index) => <button key={project.slug} aria-label={`${phrase(locale, 'Mostrar imagem', 'Show image')} ${index + 1}`} aria-pressed={front === index} className={front === index ? 'active' : ''} onClick={() => bringForward(index)}>0{index + 1}</button>)}</div></div>
    </div>
  </section>;
}

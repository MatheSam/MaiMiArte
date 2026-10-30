'use client';

import { useEffect, useRef, useState } from 'react';
import { phrase, type Locale } from '@/lib/content';

type Format = 'HEX' | 'RGB' | 'HSL';
function formatColor(hex: string, format: Format) {
  if (format === 'HEX') return hex.toUpperCase();
  const values = hex.slice(1).match(/.{2}/g)!.map(value => parseInt(value, 16));
  if (format === 'RGB') return `rgb(${values.join(', ')})`;
  const [r, g, b] = values.map(value => value / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b), delta = max - min;
  const light = (max + min) / 2;
  const saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * light - 1));
  const hue = delta === 0 ? 0 : max === r ? ((g - b) / delta) % 6 : max === g ? (b - r) / delta + 2 : (r - g) / delta + 4;
  return `hsl(${Math.round((hue * 60 + 360) % 360)}, ${Math.round(saturation * 100)}%, ${Math.round(light * 100)}%)`;
}

export function ColorPalette({ colors, locale }: { colors: string[]; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [open]);
  async function copy(text: string, palette = false) {
    try {
      await navigator.clipboard.writeText(text);
      setFeedback(palette ? phrase(locale, 'Paleta copiada!', 'Palette copied!') : `${phrase(locale, 'Cor copiada', 'Color copied')}: ${text}`);
      if (palette) { setOpen(false); trigger.current?.focus(); }
    } catch {
      setFeedback(phrase(locale, 'Não foi possível copiar. Selecione os valores abaixo e copie manualmente.', 'Could not copy. Select the values below and copy manually.'));
    }
  }
  return <div className="palette-tools" ref={root} onKeyDown={event => { if (event.key === 'Escape') { setOpen(false); trigger.current?.focus(); } }}>
    <div className="palette-controls"><div className="palette-swatches">{colors.map(color => <button className="color-swatch" key={color} style={{ backgroundColor: color }} title={color.toUpperCase()} aria-label={`${phrase(locale, 'Copiar cor', 'Copy color')} ${color.toUpperCase()}`} onClick={() => copy(color.toUpperCase())}><span className="swatch-tooltip">{color.toUpperCase()}</span></button>)}</div>
      <div className="palette-picker"><button ref={trigger} className="palette-trigger" aria-expanded={open} onClick={() => setOpen(!open)}>{phrase(locale, 'Pegue nossa paleta de cores', 'Get our color palette')}<span aria-hidden="true">⌄</span></button>
        {open && <div className="palette-formats"><p>{phrase(locale, 'Copiar todas as cores em:', 'Copy all colors as:')}</p>{(['HEX', 'RGB', 'HSL'] as const).map(format => <button key={format} onClick={() => copy(colors.map(color => formatColor(color, format)).join('\n'), true)}><strong>{format === 'HEX' ? phrase(locale, 'Hexadecimal', 'Hexadecimal') : format}</strong><span>{colors.map(color => formatColor(color, format)).join(' · ')}</span></button>)}</div>}
      </div>
    </div>
    <p className="palette-feedback" role="status" aria-live="polite">{feedback}</p>
    {feedback.includes(phrase(locale, 'Não foi possível', 'Could not')) && <textarea readOnly aria-label={phrase(locale, 'Valores da paleta', 'Palette values')} value={colors.map(color => `${formatColor(color, 'HEX')} / ${formatColor(color, 'RGB')} / ${formatColor(color, 'HSL')}`).join('\n')} onFocus={event => event.target.select()}/>}
  </div>;
}

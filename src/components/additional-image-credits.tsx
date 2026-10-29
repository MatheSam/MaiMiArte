import { phrase, type Locale } from '@/lib/content';

const sources = [
  ['Textura / Texture', '1547826039-bfc35e0f1ea8'],
  ['Composição / Composition', '1549490349-8643362247b5'],
  ['Galeria / Gallery', '1574182245530-967d9b3831af'],
  ['Estudo / Study', '1578301978693-85fa9c0320b9'],
  ['Processo / Process', '1513364776144-60967b0f800f'],
  ['Notas de cor / Colour notes', '1561214115-f2f134cc4912'],
];

export function AdditionalImageCredits({ locale }: { locale: Locale }) {
  return <><h2>{phrase(locale, 'Referências adicionais das galerias', 'Additional gallery references')}</h2><p>{phrase(locale, 'As mesmas referências podem aparecer em mais de um portfólio nesta demonstração, sem atribuição de autoria às artistas.', 'The same references may appear in multiple portfolios in this preview, without attributing the work to the artists.')}</p><ul className="credit-list">{sources.map(([name, id]) => <li key={id}><a href={`https://images.unsplash.com/photo-${id}`} target="_blank" rel="noreferrer">{name} — Unsplash</a></li>)}</ul></>;
}

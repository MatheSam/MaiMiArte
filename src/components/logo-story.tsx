import Image from 'next/image';
import { assetPath } from '@/lib/assets';
import { phrase, type Locale } from '@/lib/content';
import { Eyebrow } from './ui';

export function LogoStory({ locale }: { locale: Locale }) {
  return <section className="logo-story" aria-labelledby="logo-origin">
    <div className="logo-story-image"><Image src={assetPath('/images/logo-maimi.png')} alt={phrase(locale, 'Logo MaiMi Arte em homenagem à gatinha das criadoras', 'MaiMi Arte logo honouring the creators’ cat')} width={339} height={310} sizes="(max-width: 700px) 75vw, 20rem"/></div>
    <div><Eyebrow>{phrase(locale, 'UM SÍMBOLO DE AFETO', 'A SYMBOL OF AFFECTION')}</Eyebrow><h2 id="logo-origin">{phrase(locale, 'A origem da nossa logo.', 'The story behind our logo.')}</h2><p>{phrase(locale, 'O formato da logo surgiu a partir de uma homenagem à gatinha que fez parte na vida das criadoras, mas que também fizesse sentido com o estilo de arte produzida, como uma forma de se conectar com o público pela afetividade.', 'The shape of the logo began as a tribute to the cat who was part of the creators’ lives, while also reflecting the style of their artwork, as a way to connect with people through affection.')}</p></div>
  </section>;
}

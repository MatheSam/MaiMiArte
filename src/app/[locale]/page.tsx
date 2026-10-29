import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/hero';
import { ArtCarousel } from '@/components/art-carousel';
import { ArtImage, DemoNote, Eyebrow, TextLink } from '@/components/ui';
import { Flower, Palette } from '@/components/icons';
import { getPosts, getProducts, isLocale, localize, phrase } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; if (!isLocale(locale)) return {};
  return pageMetadata(locale, phrase(locale, 'Dois olhares, um universo de arte', 'Two perspectives, a world of art'), phrase(locale, 'Conheça o universo criativo de Gabi e Rapha: portfólios individuais, projetos em dupla e arte para fazer parte do seu dia.', 'Explore Gabi and Rapha’s creative world: individual portfolios, shared projects and art for your everyday life.'));
}
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; if (!isLocale(locale)) notFound(); setRequestLocale(locale);
  const [posts, products] = await Promise.all([getPosts(), getProducts()]);
  const latest = posts[0];
  return <>
    <ArtCarousel locale={locale}/>
    <div className="page-width"><Hero locale={locale}/></div>
    <div className="ticker" aria-hidden="true"><span>{phrase(locale, 'DOIS OLHARES', 'TWO PERSPECTIVES')}</span><span>✳</span><span>{phrase(locale, 'ARTE QUE CONECTA', 'ART THAT CONNECTS')}</span><span>✳</span><span>{phrase(locale, 'FEITO COM AFETO', 'MADE WITH AFFECTION')}</span><span>✳</span><span>GABI + RAPHA</span><span>✳</span></div>
    <section className="about-band"><div className="page-width about-band-inner"><div className="about-art"><ArtImage src="/images/studio.jpg" alt={phrase(locale, 'Referência de materiais e processo artístico', 'Art materials and process reference')}/><span className="paper-label">GABI + RAPHA <span>♡</span></span></div><div><Eyebrow>{phrase(locale, 'MUITO PRAZER, SOMOS A MAIMI', 'HELLO, WE’RE MAIMI')}</Eyebrow><h2>{phrase(locale, 'Duas irmãs.', 'Two sisters.')}<br/><em>{phrase(locale, 'Muitas formas de criar.', 'So many ways to create.')}</em></h2><p>{phrase(locale, 'A MaiMiArte nasce do encontro entre duas irmãs gêmeas e seus universos criativos. Um espaço para nossos trabalhos individuais e para tudo que ganha vida quando criamos juntas.', 'MaiMiArte brings together twin sisters and their creative worlds. A space for our individual work and everything that comes to life when we create together.')}</p><TextLink href={`/${locale}/about`}>{phrase(locale, 'Conheça nossa história', 'Meet the sisters')}</TextLink></div><Flower className="about-flower"/></div></section>
    <section className="page-width section-space"><div className="section-heading"><div><Eyebrow>{phrase(locale, 'UM PEDACINHO DA MAIMI', 'A LITTLE PIECE OF MAIMI')}</Eyebrow><h2>{phrase(locale, 'Arte para estar por perto.', 'Art to keep close.')}</h2></div><TextLink href={`/${locale}/shop`}>{phrase(locale, 'Visite o shop', 'Visit the shop')}</TextLink></div><DemoNote locale={locale}/><div className="product-grid">{products.map((p, i) => <Link key={p.slug} className="product-card" href={`/${locale}/shop/brasil/${p.slug}`}><div className={`product-display display-${i}`}><ArtImage src={p.image} alt={phrase(locale, 'Imagem artística de referência, produto demonstrativo', 'Art reference image, sample product')}/><span className="product-hover"><Palette/></span></div><div className="product-caption"><h3>{localize(p.title, locale)}</h3><span>{localize(p.kind, locale)}</span></div></Link>)}</div></section>
    {latest && <section className="journal-section section-space"><div className="page-width journal-layout"><div className="journal-intro"><Eyebrow>{phrase(locale, 'DO NOSSO CADERNO', 'FROM OUR NOTEBOOK')}</Eyebrow><h2>{phrase(locale, 'O que acontece', 'What happens')}<br/><em>{phrase(locale, 'entre uma arte e outra.', 'between works of art.')}</em></h2><p>{phrase(locale, 'Processos, inspirações e pequenas descobertas do caminho.', 'Processes, inspirations and small discoveries along the way.')}</p><TextLink href={`/${locale}/blog`}>{phrase(locale, 'Explore o blog', 'Explore the journal')}</TextLink></div><Link className="journal-feature" href={`/${locale}/blog/${latest.slug}`}><ArtImage src={latest.image} alt={phrase(locale, 'Materiais artísticos — imagem de referência', 'Art supplies — reference image')}/><div><span className="eyebrow">{localize(latest.category, locale)} · {phrase(locale, 'ARTIGO DE EXEMPLO', 'SAMPLE ARTICLE')}</span><h3>{localize(latest.title, locale)}</h3><Palette/></div></Link></div></section>}
    <section className="page-width final-note"><Flower/><p>{phrase(locale, 'A arte aproxima. O encontro transforma.', 'Art brings us closer. Connection transforms.')}</p><DemoNote locale={locale}/></section>
  </>;
}

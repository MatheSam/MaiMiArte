import Link from 'next/link';
import Image from 'next/image';
import { assetPath } from '@/lib/assets';
import { type Locale, phrase, artists, localize, type projects } from '@/lib/content';
import { Flower, Palette } from './icons';
import { RevealLink } from './reveal-link';

export function TextLink({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) { return <Link href={href} className={`text-link ${light ? 'light' : ''}`}>{children}<Palette/></Link>; }
export function Eyebrow({ children }: { children: React.ReactNode }) { return <p className="eyebrow"><span/>{children}</p>; }
export function ArtImage({ src, alt, className = '', priority = false, sizes = '(max-width: 700px) 92vw, 50vw' }: { src: string; alt: string; className?: string; priority?: boolean; sizes?: string }) {
  return <div className={`art-image ${className}`}><Image src={assetPath(src)} alt={alt} fill sizes={sizes} priority={priority} quality={85}/></div>;
}
export function ArtistLinks({ locale, exclude }: { locale: Locale; exclude?: string }) {
  const visibleArtists = artists.filter(artist => artist.slug !== exclude);
  return <div className={`artist-grid ${exclude ? 'artist-grid-related' : ''}`}>{visibleArtists.map((artist, i) => <Link className="artist-card" key={artist.slug} href={`/${locale}/works?artist=${artist.slug}`}><div className={`artist-art artist-art-${artists.indexOf(artist)}`}><ArtImage src={artist.image} alt={phrase(locale, `Imagem demonstrativa para ${artist.name}`, `Sample image for ${artist.name}`)}/><span className="artist-number">0{i + 1}</span></div><div className="artist-card-title"><h3>{artist.name}</h3><Palette/></div><p>{localize(artist.subtitle, locale)}</p></Link>)}</div>;
}
export function ProjectCard({ project, locale, index = 0, reveal = false }: { project: (typeof projects)[number]; locale: Locale; index?: number; reveal?: boolean }) {
  return <RevealLink href={`/${locale}/works/${project.slug}`} className={`project-card project-${index % 4}`} reveal={reveal}><ArtImage src={project.image} alt={phrase(locale, `Referência visual do projeto demonstrativo ${project.title.pt}`, `Visual reference for sample project ${project.title.en}`)}/><div className="project-caption"><h3>{localize(project.title, locale)}</h3><span className="project-action"><Palette className="project-palette"/></span></div></RevealLink>;
}
export function DemoNote({ locale }: { locale: Locale }) { return <p className="demo-note">{phrase(locale, 'Conteúdo demonstrativo · imagens de referência, não são obras das artistas.', 'Sample content · reference images, not work by the artists.')}</p>; }
export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) { return <section className="page-intro"><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1>{children && <div className="intro-description">{children}</div>}</section>; }
export function Footer({ locale }: { locale: Locale }) {
  return <footer className="site-footer"><div className="footer-top"><div><Link href={`/${locale}`} className="footer-brand"><Image src={assetPath('/images/logo-maimi.png')} alt="MaiMi Arte" width={120} height={110}/></Link><p>{phrase(locale, 'Dois olhares. Infinitas possibilidades.', 'Two perspectives. Endless possibilities.')}</p></div><Flower/><nav aria-label={phrase(locale, 'Navegação do rodapé', 'Footer navigation')}><Link href={`/${locale}/works`}>Works</Link><Link href={`/${locale}/about`}>{phrase(locale, 'Sobre', 'About')}</Link><Link href={`/${locale}/shop`}>Shop</Link><Link href={`/${locale}/blog`}>{phrase(locale, 'Blog', 'Journal')}</Link></nav></div><div className="footer-bottom"><span>© {new Date().getUTCFullYear()} MaiMiArte · Gabriella & Raphaela Maidana</span><Link href={`/${locale}/credits`}>{phrase(locale, 'Prévia & créditos das imagens', 'Preview & image credits')}<Palette/></Link></div></footer>;
}

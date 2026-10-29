import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ArtImage, DemoNote, PageIntro } from '@/components/ui';
import { Palette } from '@/components/icons';
import { getPosts, isLocale, localize, phrase } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; return isLocale(locale) ? pageMetadata(locale, phrase(locale, 'Blog — caderno de criação', 'Journal — a creative notebook'), phrase(locale, 'Processos, materiais e pequenas descobertas do universo criativo da MaiMiArte.', 'Processes, materials and small discoveries from MaiMiArte’s creative world.'), '/blog') : {}; }
export default async function Blog({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; if (!isLocale(locale)) notFound(); setRequestLocale(locale); const posts = await getPosts();
  return <div className="page-width"><PageIntro eyebrow={phrase(locale, 'BLOG · DO NOSSO CADERNO', 'JOURNAL · FROM OUR NOTEBOOK')} title={phrase(locale, 'Entre uma arte e outra.', 'Between works of art.')}><p>{phrase(locale, 'Um espaço para compartilhar processos, falar de materiais e descobrir novas formas de olhar para a arte.', 'A place to share processes, talk about materials and discover new ways of looking at art.')}</p></PageIntro><DemoNote locale={locale}/><div className="blog-list">{posts.map(post => <Link key={post.slug} href={`/${locale}/blog/${post.slug}`} className="blog-card"><ArtImage src={post.image} alt={phrase(locale, 'Referência de materiais artísticos', 'Reference image of art materials')} priority/><div><span className="eyebrow">{localize(post.category, locale)}</span><h2>{localize(post.title, locale)}</h2><p>{localize(post.excerpt, locale)}</p><span className="blog-date"><time dateTime={post.date}>{new Intl.DateTimeFormat(locale === 'pt' ? 'pt-BR' : 'en-GB', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${post.date}T12:00:00Z`))}</time> · {phrase(locale, 'Texto demonstrativo', 'Sample article')}</span><span className="text-link">{phrase(locale, 'Abrir caderno', 'Open the notebook')}<Palette/></span></div></Link>)}</div></div>;
}

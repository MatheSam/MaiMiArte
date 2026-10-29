'use client';

import { useSearchParams } from 'next/navigation';
import { ArtistLinks, DemoNote, PageIntro, ProjectCard } from '@/components/ui';
import { artists, projects as allProjects, phrase, type Locale } from '@/lib/content';

export function WorksFilter({ locale }: { locale: Locale }) {
  const searchParams = useSearchParams();
  return <WorksGallery locale={locale} artist={searchParams.get('artist') || undefined}/>;
}

export function WorksGallery({ locale, artist }: { locale: Locale; artist?: string }) {
  const selected = artists.find(candidate => candidate.slug === artist);
  const projects = selected ? allProjects.filter(project => project.author === selected.slug) : allProjects;
  return <div className="page-width">
    {selected ? <section className="individual-portfolio" aria-labelledby="portfolio-title">
      <h1 id="portfolio-title" className="portfolio-title">{selected.name}</h1>
      <DemoNote locale={locale}/>
      <div className="project-grid portfolio-grid">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} locale={locale} index={index} reveal/>)}</div>
    </section> : <>
      <PageIntro eyebrow={phrase(locale, 'PORTFÓLIO · GABI + RAPHA', 'PORTFOLIO · GABI + RAPHA')} title={phrase(locale, 'Mundos que se encontram.', 'Worlds that meet.')}>
        <p>{phrase(locale, 'Trabalhos individuais, descobertas compartilhadas. Escolha um olhar ou explore o conjunto.', 'Individual work, shared discoveries. Choose a perspective or explore them together.')}</p>
      </PageIntro>
      <ArtistLinks locale={locale}/>
      <section className="all-portfolio"><DemoNote locale={locale}/><div className="project-grid portfolio-grid">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} locale={locale} index={index} reveal/>)}</div></section>
    </>}
    {selected && <section className="portfolio-discovery">
      <div className="section-heading"><div><p className="eyebrow">{phrase(locale, 'CONTINUE EXPLORANDO', 'KEEP EXPLORING')}</p><h2>{phrase(locale, 'Mundos que se encontram.', 'Worlds that meet.')}</h2></div><p>{phrase(locale, 'Outros olhares, novas descobertas. Conheça os demais portfólios.', 'Other perspectives, new discoveries. Explore the other portfolios.')}</p></div>
      <ArtistLinks locale={locale} exclude={selected.slug}/>
    </section>}
  </div>;
}

export const locales = ['pt', 'en'] as const;
export type Locale = (typeof locales)[number];
export type Localized = Record<Locale, string>;
export const isLocale = (value: unknown): value is Locale => value === 'pt' || value === 'en';
export const localize = (value: Localized, locale: Locale) => value[locale];
export const phrase = (locale: Locale, pt: string, en: string) => locale === 'pt' ? pt : en;
export const siteUrl = (process.env.SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
export const indexable = process.env.SITE_INDEXABLE === 'true';

export const artists = [
  { slug: 'gabi', name: 'Gabi MaiMi', fullName: 'Gabriella Maidana', image: '/images/floral.jpg', subtitle: { pt: 'Um olhar, suas descobertas.', en: 'One perspective, its own discoveries.' } },
  { slug: 'rapha', name: 'Rapha MaiMi', fullName: 'Raphaela Maidana', image: '/images/paint.jpg', subtitle: { pt: 'Outro olhar, novos caminhos.', en: 'Another perspective, new paths.' } },
  { slug: 'duo', name: 'MaiMi Arte', fullName: 'Gabriella & Raphaela', image: '/images/color-study.jpg', subtitle: { pt: 'Onde nossos mundos se encontram.', en: 'Where our worlds meet.' } },
] as const;
export type Author = (typeof artists)[number]['slug'];
type Project = {
  slug: string; title: Localized; author: Author; kind: Localized; image: string;
  description: Localized; palette: string[]; gallery: string[];
};

const sampleDescription = {
  pt: 'Um espaço para descobrir a obra de perto: suas cores, detalhes e caminhos de criação. Este projeto demonstrativo apresenta como cada história será contada no portfólio; imagens e informações serão substituídas pelo acervo real das artistas.',
  en: 'A space to discover a work up close: its colours, details and creative paths. This sample project shows how each story will be told in the portfolio; images and information will be replaced with the artists’ actual work.',
};
const featuredProjects: Project[] = [
  { slug: 'jardim-interior', title: { pt: 'Jardim interior', en: 'Inner garden' }, author: 'gabi', kind: { pt: 'Estudo floral', en: 'Floral study' }, image: '/images/floral.jpg', description: sampleDescription, palette: ['#95a86c', '#e5c9a3', '#d08067', '#386687'], gallery: ['/images/floral.jpg', '/images/studio.jpg'] },
  { slug: 'entre-cores', title: { pt: 'Entre cores', en: 'Between colours' }, author: 'rapha', kind: { pt: 'Cor & expressão', en: 'Colour & expression' }, image: '/images/paint.jpg', description: sampleDescription, palette: ['#d08067', '#8ab8c8', '#e5c9a3'], gallery: ['/images/paint.jpg', '/images/studio.jpg', '/images/color-study.jpg'] },
  { slug: 'encontro', title: { pt: 'Lugar de encontro', en: 'A place to meet' }, author: 'duo', kind: { pt: 'Experimento em dupla', en: 'A shared experiment' }, image: '/images/color-study.jpg', description: sampleDescription, palette: ['#8ab8c8', '#d08067', '#e5c9a3', '#874638'], gallery: ['/images/color-study.jpg', '/images/paint.jpg'] },
  { slug: 'pequenos-gestos', title: { pt: 'Pequenos gestos', en: 'Small gestures' }, author: 'gabi', kind: { pt: 'Caderno de processo', en: 'Process sketchbook' }, image: '/images/studio.jpg', description: sampleDescription, palette: ['#e5c9a3', '#95a86c', '#874638'], gallery: ['/images/studio.jpg', '/images/floral.jpg'] },
  { slug: 'notas-de-cor', title: { pt: 'Notas de cor', en: 'Colour notes' }, author: 'duo', kind: { pt: 'Estudo de composição', en: 'Composition study' }, image: '/images/colour-notes.jpg', description: sampleDescription, palette: ['#95a86c', '#8ab8c8', '#d08067'], gallery: ['/images/colour-notes.jpg', '/images/paint.jpg'] },
];
const sampleArtworks = [
  ['floral', 'Jardim em silêncio', 'A quiet garden'],
  ['paint', 'O gesto da cor', 'The gesture of colour'],
  ['color-study', 'Matéria viva', 'Living matter'],
  ['studio', 'Entre materiais', 'Among materials'],
  ['colour-notes', 'Pequenas descobertas', 'Small discoveries'],
  ['texture', 'Camadas do tempo', 'Layers of time'],
  ['composition', 'Formas de sentir', 'Ways of feeling'],
  ['gallery', 'Um outro olhar', 'Another perspective'],
  ['art-study', 'Memória de uma imagem', 'Memory of an image'],
  ['creative-process', 'Caderno aberto', 'Open notebook'],
];
// Temporary galleries: each portfolio has ten reference images, explicitly marked as samples.
// Existing project URLs remain stable; replacing these entries with real works does not change the UI.
export const projects: Project[] = [
  ...featuredProjects,
  ...artists.flatMap(artist => {
    const existingImages = featuredProjects.filter(project => project.author === artist.slug).map(project => project.image);
    return sampleArtworks.filter(([image]) => !existingImages.includes(`/images/${image}.jpg`)).map(([image, pt, en], index): Project => ({
      slug: `${artist.slug}-estudo-${index + 1}`,
      title: { pt, en }, author: artist.slug,
      kind: { pt: 'Estudo visual · exemplo', en: 'Visual study · sample' },
      image: `/images/${image}.jpg`, description: sampleDescription,
      palette: ['#95a86c', '#8ab8c8', '#d08067'],
      gallery: [`/images/${image}.jpg`, '/images/studio.jpg'],
    }));
  }),
];
export type Region = 'brasil' | 'mundo';
export const isRegion = (region: string): region is Region => region === 'brasil' || region === 'mundo';
export const products = [
  { slug: 'print-jardim', title: { pt: 'Um jardim para levar', en: 'A garden to take home' }, kind: { pt: 'Print artístico', en: 'Art print' }, image: '/images/floral.jpg', project: 'jardim-interior', description: { pt: 'Exemplo de apresentação de um print: aqui entrarão as opções de formato, papel e acabamento. A imagem é uma referência visual; este item não está à venda.', en: 'An example of an art print presentation: formats, paper and finishes will appear here. This image is a visual reference; this item is not for sale.' } },
  { slug: 'colecao-cores', title: { pt: 'Cores que ficam', en: 'Colours that stay' }, kind: { pt: 'Arte digital', en: 'Digital art' }, image: '/images/color-study.jpg', project: 'encontro', description: { pt: 'Exemplo de produto digital. Formatos, licença de uso e canais de compra serão descritos quando o produto real for cadastrado. Nenhum arquivo será vendido ou entregue nesta prévia.', en: 'A sample digital product. Formats, usage licence and purchase channels will be described when the real product is added. No files are sold or delivered in this preview.' } },
  { slug: 'fragmentos', title: { pt: 'Fragmentos de cor', en: 'Fragments of colour' }, kind: { pt: 'Coleção de adesivos', en: 'Sticker collection' }, image: '/images/paint.jpg', project: 'entre-cores', description: { pt: 'Uma amostra de como apresentar uma coleção de adesivos e seus detalhes. A fotografia usada é uma referência artística e não uma imagem de produto final.', en: 'A sample of how a sticker collection and its details could be presented. The photograph is an artistic reference, not an image of a finished product.' } },
];
export const posts = [
  { slug: 'antes-da-primeira-pincelada', date: '2026-10-29', title: { pt: 'Antes da primeira pincelada', en: 'Before the first brushstroke' }, category: { pt: 'Processo criativo', en: 'Creative process' }, image: '/images/studio.jpg', excerpt: { pt: 'Um convite para olhar com calma para os materiais, as referências e os pequenos começos.', en: 'An invitation to take a closer look at materials, references and small beginnings.' }, sections: [
    { title: { pt: 'O começo também é parte da obra', en: 'The beginning is part of the work' }, text: { pt: 'Separar os materiais, observar uma combinação de cores, guardar uma imagem que chamou a atenção. Antes de uma obra ganhar forma, há um tempo de descoberta. Este artigo é um texto editorial demonstrativo para apresentar o futuro blog da MaiMiArte.', en: 'Laying out materials, noticing a colour combination, saving an image that caught your eye. Before a work takes shape, there is a time for discovery. This is a sample editorial article introducing the future MaiMiArte journal.' } },
    { title: { pt: 'Um lugar para compartilhar', en: 'A place to share' }, text: { pt: 'Aqui haverá espaço para falar sobre processos, materiais e história da arte. Cada publicação poderá reunir texto, imagens e referências para continuar a leitura. Os artigos reais serão escritos ou aprovados pelas artistas antes da publicação.', en: 'This will be a space for creative processes, materials and art history. Each post can bring together text, images and references for further reading. Real articles will be written or approved by the artists before publication.' } },
  ] },
];

// This is the only content source used by pages. A future CMS adapter can retain these contracts.
export async function getProjects(author?: Author) { return author ? projects.filter(p => p.author === author) : projects; }
export async function getProject(slug: string) { return projects.find(p => p.slug === slug); }
export async function getProducts(_region?: Region) { return products; } // All sample products exist in both demo regions.
export async function getProduct(slug: string, region: Region) { return (await getProducts(region)).find(p => p.slug === slug); }
export async function getPosts() { return [...posts].sort((a, b) => b.date.localeCompare(a.date)); }
export async function getPost(slug: string) { return posts.find(p => p.slug === slug); }

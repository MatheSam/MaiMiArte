# MaiMiArte

Portfólio e vitrine de Gabriella e Raphaela Maidana. Mobile first, português/inglês e conteúdo local, preparado para CMS futuro.

## Executar

Requer Node.js 20.9 ou superior.

```sh
npm ci
npm run dev
```

Abra http://127.0.0.1:3000. A raiz redireciona para `/pt`; inglês em `/en`.

```sh
npm run typecheck
npm run build
npm start
```

Com a prévia rodando, `npm run verify:preview` verifica rotas, metadados, idiomas, imagens e páginas inexistentes.

O lockfile registra versões instaladas. Não precisa de contas, banco ou chaves para o MVP.

## Editar

- `src/lib/content.ts`: artistas, obras, produtos e posts em PT/EN. Funções `getProjects`, `getProject`, `getProducts`, `getProduct`, `getPosts` e `getPost` serão o ponto de integração do CMS.
- `messages/pt.json` e `messages/en.json`: mensagens compartilhadas da interface.
- `src/app/globals.css`: paleta, fontes e espaçamentos em `@theme`; CSS mobile first ampliado em 600 e 900 px.
- `public/images`: referências locais; substituir pelo acervo das artistas.
- `src/components/icons.tsx` e `src/app/icon.svg`: gato provisório, substituir pela marca oficial.
- `src/app/[locale]`: páginas e textos específicos, também localizados no código nesta etapa.

O blog usa seções TypeScript no MVP. Os `.md` em `docs/` documentam o projeto; não são necessários para editar o conteúdo atual.

## SEO e lançamento

## GitHub Pages

Site: https://mathesam.github.io/MaiMiArte/

O workflow `.github/workflows/pages.yml` publica automaticamente cada push em `main`.
No repositório, **Settings → Pages → Source** deve estar configurado como **GitHub Actions**.
O build usa exportação estática, o prefixo `/MaiMiArte` e imagens locais sem servidor de otimização.
O filtro de artistas funciona no navegador e preserva os links com `?artist=`.
A entrada do site encaminha para o português; a versão inglesa fica em `/MaiMiArte/en/`.
O conteúdo demonstrativo continua com indexação desativada.

Para reproduzir no PowerShell:

```powershell
$env:GITHUB_PAGES='true'
$env:NEXT_PUBLIC_BASE_PATH='/MaiMiArte'
$env:SITE_URL='https://mathesam.github.io/MaiMiArte'
npm run build
node scripts/finalize-pages.mjs
```

## Outras hospedagens

Compatível com preset Next.js da Vercel, build `npm run build`. Prévia local nesta etapa.

Copie `.env.example` para `.env.local` se precisar alterar configurações. `SITE_URL` deve ser a origem HTTPS real na produção. `SITE_INDEXABLE=false` por padrão: páginas com `noindex, nofollow` e sitemap vazio. O robots permite que mecanismos leiam a instrução noindex.

Antes de indexar: substituir demonstração e logo, aprovar traduções/textos, adicionar contatos e lojas, configurar `SITE_URL` e `SITE_INDEXABLE=true` somente na produção, reconstruir e validar metadados/sitemap. Cadastrar Search Console no lançamento.

SEO centralizado em `src/lib/seo.ts`: títulos, descrições, canonical, idiomas e Open Graph. O blog inclui BlogPosting JSON-LD apenas com indexação habilitada. Não há ofertas estruturadas ou preços fictícios.

## Próximas etapas

Recomendação: Sanity para artistas, obras, produtos, posts e identidade. Adaptar consultas, importar arquivos/conteúdo e configurar preview/atualização após publicação. A migração não é automática.

Região de compra e idioma são independentes. Produtos de exemplo existem nas duas regiões; o futuro cadastro deve definir disponibilidade real e canais por região. Checkout e entrega automática ZIP/PDF estão fora do MVP.

Consulte `docs/spec-inicial.md`, `docs/tasks.md` e `docs/validacao.md`.

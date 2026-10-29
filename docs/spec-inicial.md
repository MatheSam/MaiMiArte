# MaiMiArte — especificação do MVP

Atualizado em 29/10/2026 com as decisões do usuário e o Canva de 15 páginas. Especificação enxuta; sem instalação do toolkit Spec Kit.

## Objetivo e identidade

Portfólio de Gabriella e Raphaela Maidana, irmãs gêmeas, com vitrine e blog. Foco nos trabalhos; produtos têm páginas próprias e podem se vincular a obras.

- Estética delicada e minimalista, **mobile first**.
- WORKS: **Gabi MaiMi**, **Rapha MaiMi**, **MaiMi Arte** (coletivo).
- Logo de gato em homenagem à gatinha das criadoras. Arquivo oficial pendente; símbolo temporário identificado nos créditos.
- Paleta principal: `#95a86c`, `#8ab8c8`, `#e5c9a3`, `#d08067`. Apoio: `#386687`, `#874638`. Tudo em variáveis globais.
- Português e inglês com URLs próprias. Região de venda independe do idioma.
- Imagens da internet e conteúdo demonstrativo autorizados no MVP; nunca atribuí-los às artistas.

## Stack e conteúdo

Next.js App Router, React, TypeScript, Tailwind CSS, next-intl e Motion. Prévia local nesta etapa; hospedagem pretendida na Vercel.

Conteúdo local tipado em `src/lib/content.ts`, acessado por funções independentes do visual. Blog inicialmente em seções TypeScript; Markdown não é necessário para editar os exemplos. No futuro, usar CMS para que as artistas cadastrem obras, produtos e posts; recomendação: Sanity. Sem banco ou administrador próprio nesta etapa.

A migração exigirá consultas, importação de imagens/textos e atualização ao publicar; preservar URLs. Textos específicos das páginas também estão no código nesta etapa.

## Mapa de páginas

Prefixos `/pt` e `/en`; raiz redireciona para `/pt`.

| Caminho após o idioma | Função |
| --- | --- |
| `/` | Home, carrossel, artistas, destaques, produtos e último post |
| `/works` | Três portfólios e filtro `?artist=gabi`, `rapha` ou `duo` |
| `/works/[slug]` | Página da obra/projeto |
| `/about` | Marca, artistas, projetos personalizados e contatos |
| `/shop` | Escolha Brasil/mundo |
| `/shop/[region]` | Vitrine, com região `brasil` ou `mundo` |
| `/shop/[region]/[slug]` | Produto e canais da região |
| `/blog` | Artigos por data |
| `/blog/[slug]` | Artigo e referências |
| `/credits` | Transparência da prévia e fontes das imagens |

## Requisitos

### Home e navegação

Cabeçalho fixo durante a rolagem, logo, WORKS/Sobre/Shop/Blog. Submenu e cartões com as três artistas. Acesso por toque e teclado sem depender de hover. Carrossel manual com três controles rotulados, sem reprodução automática. Links internos, produtos em destaque e artigo mais recente por data.

### Portfólio e obra

Grid variado em desktop e reorganizado no celular. Autoria individual/coletiva, tipo, capa, descrição, galeria de 2 a 10 imagens, ficha técnica, paleta, fontes, FAQs e mais projetos. Movimento suave respeitando movimento reduzido. Não inventar técnicas reais; identificar os exemplos.

### Sobre

História da marca e das artistas. Três portfólios com imagens e nomes, conforme páginas 4 e 5 do Canva. Área de projetos personalizados dentro de Sobre. Instagram, WhatsApp e e-mail ativados somente com os contatos oficiais.

### Shop

Escolha Brasil/mundo e troca explícita, mantendo idioma. Produtos demonstrativos nas duas regiões, página própria e vínculo ao projeto. Sem preços, estoque, ofertas ou compra fictícia. Canais sem URL real aparecem como “em breve”. Etsy/Redbubble são previstos para mundo; canais brasileiros ainda dependem de dados reais.

A página 3 do Canva prevê produtos digitais no Brasil, com entrega automática de ZIP/PDF após pagamento. Essa integração fica para uma fase comercial posterior.

### Blog

Capa, título, data, resumo e corpo. Temas futuros: materiais, processos e história da arte. Fontes ao final, conforme referência GTAM. Artigo inicial identificado como demonstrativo.

## Mobile first, acessibilidade e SEO

- Base em telas pequenas, ampliando em breakpoints. Verificar celular, tablet e desktop.
- Foco visível, controles principais adequados ao toque, Escape no menu e link de pular ao conteúdo.
- Imagens locais com dimensões previstas, `sizes` e otimização Next/Image.
- Conteúdo pré-renderizado; filtro de WORKS no servidor.
- Título, descrição, canonical, alternates PT/EN e Open Graph por página.
- Sitemap e robots; BlogPosting JSON-LD apenas após substituir demonstração e habilitar indexação.
- `SITE_URL` define domínio real; `SITE_INDEXABLE=false` por padrão desabilita indexação via meta robots e mantém sitemap vazio.
- Não publicar ofertas estruturadas inexistentes. Não indexar preview. Preservar slugs na migração ou redirecionar.

## Fora do MVP

CMS/painel, autenticação, carrinho, pagamento, pedidos, estoque, frete, integração de marketplaces e entrega automática de arquivos. Publicação final e contas serão tratadas na etapa de lançamento.

## Pendências

Logo em arquivo, fontes aprovadas, acervo real, imagens de produtos, biografias, artigos, contatos e lojas oficiais. Definir disponibilidade regional, preços/moedas quando aplicável. Confirmar “ong pequena” do briefing, provisoriamente interpretada como imagem pequena de apoio.

Páginas com “Borcelle Café” parecem remanescentes do template do Canva; não definem requisitos. As cores nomeadas nas páginas 6 e 7 são a base.

## Referências

### Revisão visual aprovada em conversa (29/10)

Atualizações posteriores que substituem os itens correspondentes abaixo:

- Flores decorativas animadas; paleta substitui as setas de redirecionamento nos links, com movimento no hover/foco. A seta de retorno ao topo permanece uma seta.
- Links do rodapé com hover/foco de cor e sublinhado.
- Entrada das imagens do portfólio durante a rolagem com deslocamento de 32px e duração de 1.2s, uma vez; respeitar movimento reduzido.
- Sobre inclui seção de origem da logo com a imagem e o texto literal fornecido na conversa, traduzido para inglês.

- Exibir a seta escura de retorno ao topo em todas as páginas, inclusive na home, após rolar 320px. Esta decisão substitui a restrição anterior às páginas internas.

- Home simplificada: remover integralmente as seções “Nosso universo / Cada olhar, uma história” e “Portfólio selecionado / Entre cores e encontros”, em português e inglês. Manter esteira, caderno visual, Sobre, produtos e blog.

- Logo central sempre leva à home do idioma atual. Nas páginas internas, uma seta escura aparece após 320px de rolagem e retorna ao topo; não exibir essa seta na home.
- Portfólio individual abre diretamente na galeria da artista/coletivo, com dez projetos demonstrativos por portfólio. “Mundos que se encontram” fica no final, direcionando aos outros dois portfólios.
- Grid compacto com imagens de tamanhos variados. Abaixo de cada imagem, apenas o nome da obra; sem artista/categoria.
- Hover/foco no cartão muda a cor do título, sublinha o nome e anima seta e paleta de pintor. Grupo dos ícones a 1.25rem do título.
- Menu desktop em 1.1rem; submenu em 1rem. Manter mínimo de 0.8rem.
- Três cartas persistentes no caderno visual, com a terceira parcialmente escondida; mudanças de posição sem desmontar as imagens.

Estas decisões substituem os detalhes anteriores de navegação/carrossel:

- Logo fornecida em imagem, menor e centralizada; só ela permanece fixa ao rolar. Clicar retorna ao topo da página atual.
- Cabeçalho transparente e navegação que sai da tela na rolagem.
- Desktop: WORKS/Sobre/Shop/Blog à esquerda e PT/EN à direita. Mobile: controles à direita.
- Idiomas sempre na ordem PT / EN, alterando apenas o destaque ativo.
- WORKS sem seta; submenu abre por hover e foco, com as três artes fornecidas ao lado dos nomes. No celular, acesso por toque.
- Fontes declaradas em rem, mínimo de 0.8rem.
- Abertura com cinco trabalhos demonstrativos em esteira contínua, lado a lado; não pausar com hover. Botão explícito de pausa e respeito a movimento reduzido.
- A seção “Dois olhares” fica abaixo da esteira. Seu caderno visual tem cartas interativas: clicar na carta de trás troca as posições; a carta da frente abre o projeto.
- Ocultar indicador de desenvolvimento do Next.js na prévia.

- Canva: https://www.canva.com/design/DAHZL3C7hi4/eL7ULxXvB2hKFrEj17l0MA/view — percorrido na etapa de briefing.
- Alex Smith: https://www.alexsmithillustration.com/ — referência de galeria.
- GTAM: https://www.gtamferramentaria.com/solucoes/manutencao-moldes-injecao/ — fontes ao final, conforme explicação do usuário. Leitura automática falhou; não afirmar inspeção visual concluída.

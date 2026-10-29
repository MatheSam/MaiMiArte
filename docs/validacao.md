# Validação do MVP — 29/10/2026

## Animações, Sobre e navegação

- Identificado nos logs: Fast Refresh preservava o efeito antigo de BackToTop com duas dependências enquanto a versão atual tinha uma. Diretiva local `@refresh reset` reinicia o componente ao editar; a dependência atual permanece estável. Recarregada a aba da prévia.
- WORKS: submenu começa na mesma altura do fim do link (sem vão positivo), com ponte de hover e atraso de fechamento de 140ms. Foco por teclado mantém o submenu aberto.
- Portfólio: cartões fora de vista começam 32px abaixo, revelando-se na aproximação à tela. Transição de 1.2s, uma vez, com alternativa sem movimento e sem ocultar conteúdo quando JavaScript está desativado.
- Sobre: texto da origem da logo conferido literalmente e imagem carregada; composição em duas colunas no desktop e empilhada no celular, sem overflow.
- Flores: animação `flower-turn` ativa, inclusive no rodapé móvel. Paletas presentes nos cartões das artistas. Foco no link do rodapé muda a cor para cashmere. Estilos desativam animações para preferência por movimento reduzido.
- TypeScript e build de produção aprovados nas mudanças de estrutura; checagem final dos ícones aprovada no build.

## Galerias individuais e navegação revisadas

- Build com 95 páginas estáticas geradas aprovado após ampliação do conteúdo; TypeScript aprovado após mudanças de legendas e ícones.
- Nove combinações verificadas no navegador: Gabi/Rapha/coletivo em 390, 900 e 1440 px. Dez cartões em cada galeria, zero descrições de artista/categoria nas legendas, dois links para outros portfólios no final e nenhum overflow horizontal.
- Espaçamento calculado entre título e ícones: 20px (declarado em 1.25rem). Menu: 1.1rem. Foco por teclado ativa cor do título e animação `palette-sway`.
- Logo com destino `/pt` testada em página interna, aguardando a conclusão da navegação; retorna à home, onde a seta não é exibida.
- Seta aparece ao rolar páginas internas. Cor `#22251f`, distinta do rodapé `#596946`.
- Dez imagens de referência locais disponíveis para cada conjunto demonstrativo; reutilização entre portfólios explicitada nos créditos.

## Correção do caderno visual: três cartas persistentes

- Mantidas as três cartas/imagens montadas e com dimensões fixas; a troca altera posição, escala e ordem da pilha.
- Terceira carta parcialmente aparente e clicável, sem recriação de imagens ao selecionar 01/02/03.
- TypeScript aprovado.
- No navegador, verificadas todas as transições entre os três índices, incluindo 03 → 02 e 03 → 01, com três imagens carregadas e camadas 0/1/2 distintas em cada estado.
- Em 390 px, repetidas 03 → 02 → 03 → 01 sem overflow horizontal.

## Build

`npm run build` aprovado em modo de produção, incluindo verificação TypeScript e geração das páginas estáticas. As páginas de WORKS são renderizadas no servidor para atender aos filtros por query string.

No Windows deste ambiente, o compilador nativo precisa acessar seu cache fora do sandbox. O primeiro build restrito falhou nesse acesso; o build com a permissão adequada passou. Não foi necessário alterar permissões do sistema ou desabilitar proteções.

## Verificação HTTP

`npm run verify:preview` aprovado contra o servidor de produção local:

- 44 URLs descobertas pelos links internos, incluindo variantes de filtro e os dois idiomas.
- Quatro imagens otimizadas respondendo com conteúdo de imagem.
- Sete rotas adicionais: 404 para obra/produto/post/região/idioma inexistentes e respostas 200 para robots/sitemap.
- Redirecionamento da raiz para `/pt`.
- Em cada página de conteúdo: idioma do HTML, um h1, título com marca, descrição, canonical, alternates PT/EN e `noindex, nofollow`.
- Nenhuma falha.

Para repetir: iniciar com `npm start` e, em outro terminal, executar `npm run verify:preview`. A checagem espera uma prévia com indexação desativada e não deve ser usada sem ajustes num ambiente público indexável.

## Navegador

30 combinações verificadas: larguras de 360, 768 e 1440 px, em dez páginas representativas: home, WORKS, obra, Sobre, escolha do shop, vitrine mundo, produto, blog, artigo e home em inglês. Sem overflow horizontal e com um h1 por página.

Inspeção visual adicional da home em desktop e em telas pequenas; WORKS inspecionado em celular de 390 px.

Interações verificadas:

- Menu móvel abre e fecha ao navegar.
- Entrada de Gabi filtra os projetos atribuídos a ela.
- Submenu desktop abre e direciona a Rapha.
- Troca PT → EN preserva o filtro Rapha e mostra os textos traduzidos.
- Controle 02 do carrossel muda para “Lugar de encontro”.
- Produto permite mundo → Brasil mantendo o mesmo item.
- Link do produto abre o projeto relacionado.
- FAQ expande o conteúdo.

O viewport temporário foi restaurado ao final. Prévia disponível em http://127.0.0.1:3000/pt .

## Limites desta validação

### Revisão visual

- TypeScript aprovado após troca do cabeçalho, esteira e cartas.
- 12 layouts adicionais (home, WORKS e shop em 360, 390, 900 e 1440 px) sem overflow e sem texto visível abaixo de 0.8rem.
- Confirmados no navegador: fundo transparente, menu desktop à esquerda, idiomas à direita, logo fixa enquanto o menu sai com a rolagem, retorno ao topo e ordem PT/EN preservada após troca de idioma.
- Confirmadas trocas de cartas nos dois sentidos, mantendo o link correto no projeto da frente.
- Esteira com cinco trabalhos e `animation-play-state: running` mesmo com `:hover` ativo.

Os arquivos recebidos da logo e dos três portfólios são usados diretamente. O favicon ainda é provisório. O conteúdo de obras e produtos continua demonstrativo.

Imagens e conteúdo são demonstrativos. Não há CMS, compra, pagamento, entrega de arquivos nem links reais de contato. Esses canais aparecem como “em breve”. O gato é provisório, sem extração da logo do Canva.

A verificação não substitui aprovação de conteúdo pelas artistas, auditoria completa de acessibilidade, medição em dispositivos físicos, testes de compartilhamento no domínio final ou acompanhamento no Search Console. A indexação deve continuar desligada até a substituição do material demonstrativo.

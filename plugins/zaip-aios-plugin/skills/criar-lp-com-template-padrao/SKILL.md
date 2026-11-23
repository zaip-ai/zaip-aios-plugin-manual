---
name: criar-lp-com-template-padrao
description: "Crie uma landing page a partir da home editorial incluída, em Astro estático com React e TypeScript. Use para replicar a estrutura responsiva com Lorem ipsum, espaços de mídia vazios e sem Google Tag Manager."
---

# Criar LP com template padrão

Quando alguém pedir “crie uma LP com o template padrão”, use os arquivos de [assets/template](./assets/template/). Eles são a fonte da réplica. Um pedido de copy e oferta para campanha usa a skill de criação de landing page da equipe. Uma revisão de uma página existente deve partir dos arquivos dessa página.

## Escolher o destino

1. Leia as instruções e o manifesto do projeto de destino. Identifique pasta, rota e se a pessoa pediu uma aplicação independente ou uma página no site existente. Na ausência de rota, use a home de uma nova aplicação. Se o repositório já contiver um site e a rota pedida estiver ocupada, preserve-a e esclareça o destino quando o pedido não resolver a colisão.
2. **Aplicação independente.** Use Node 24 e npm. Execute `node "<pasta-da-skill>/scripts/criar.mjs" "<nova-pasta>"` com a pasta pai existente. O [gerador](./scripts/criar.mjs) cria a pasta exclusivamente, inclusive quando há arquivos ocultos. Para uma raiz já criada, confira se cada destino está livre antes de copiar o conteúdo de `assets/template/`, incluindo os arquivos de ponto. Preserve o Git e as configurações locais. Se a cópia for interrompida, compare com o modelo, complete arquivos ausentes e preserve os divergentes.
3. **Rota em um site Astro existente.** Integre a página, dados, componentes e estilos em caminhos próprios dessa LP. Ajuste imports, caminho público das fontes e prefixo de implantação. Isole o CSS global da LP, use seu layout limpo e confira se o host injeta tags. Reutilize dependências compatíveis e o lockfile do projeto. Verifique as rotas anteriores após a integração. Em outra stack, uma subpasta Astro independente conserva a base técnica.
4. Abra o diretório da aplicação criada, rode `npm ci`, `npm run typecheck`, `npm run build` e `npm run preview`. Para integração, use os comandos equivalentes do projeto existente. Repetir o pedido deve reutilizar uma instalação idêntica ou apontar a colisão, preservando personalizações.

## Personalizar

- O ponto de partida é a página única em `src/pages/index.astro`. Mantenha cabeçalho, hero, destaques, faixa tipográfica, acordeão, dois blocos alternados, recursos, CTA final e rodapé. Conserve as proporções com superfícies decorativas CSS sem requisições de imagem.
- Edite a copy de amostra em `src/data/landing.ts` e as chamadas das seções na página. Mantenha Lorem ipsum nos textos editoriais. Controles e nomes acessíveis têm rótulos funcionais em português. Na edição neutra os CTAs apontam para âncoras existentes. Cadastros e contatos exigem um destino real definido pela campanha.
- Tema, fontes, foco e navegação estão em `src/styles/global.css`; composição e responsividade estão em `src/styles/home.css`. Mantenha as fontes locais junto às licenças. Use o componente TSX no build, sem diretiva `client:*`. O menu e o acordeão usam HTML nativo. O efeito de pontos só acompanha ponteiro quando movimento e dispositivo permitem.
- Se a campanha posteriormente receber mídia, declare suas dimensões. Para o hero, forneça AVIF/WebP responsivos, `srcset` e `sizes`; aplique prioridade alta apenas se for o LCP. Para imagens abaixo da dobra, use carregamento tardio. Nunca inclua fotos, logos, materiais ou IDs de outra campanha na réplica.
- A prévia traz `noindex`. Para lançar com conteúdo aprovado, configure o domínio e o caminho públicos, canonical, robots e sitemap adequados ao projeto. Atualize título, descrição e compartilhamento. Inclua imagem social e dados estruturados apenas quando houver ativos e informações reais. Ajuste cache no provedor para os assets com hash. A base não requer credenciais, gerenciador de tags, backend ou publicação.

## Aceite

- Sirva a saída de produção. Confira um viewport estreito (360 px), um intermediário e um desktop. Verifique overflow horizontal, único H1, ordem das seções, foco, skip link, menu móvel por teclado, Escape, links de destaque, acordeão e CTA final. Confira o conteúdo com JavaScript desligado e o efeito visual com movimento reduzido.
- Inspecione HTML e JS emitidos e as requisições no navegador após o carregamento e após interação. A LP neutra deve ter zero imagens de conteúdo, zero chamadas externas, zero tags de mensuração e nenhum runtime React hidratado. Confira fontes, links locais, console, ausência de 404 e `noindex`. Em servidor compartilhado, confira também o HTML servido pelo host.
- Para avaliar desempenho, faça três medições móveis do build de produção sob o mesmo perfil e guarde a mediana de LCP, CLS e peso transferido. A primeira execução medida vira a referência daquela LP. Diferencie medidas de laboratório e dados reais de visitantes.
- Informe rota, comandos, arquivos de personalização, verificações executadas e qualquer dependência do projeto de destino. O escopo padrão termina na prévia local.

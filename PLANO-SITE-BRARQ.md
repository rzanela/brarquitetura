# Plano — Site demonstrativo da Borges e Robles Arquitetura (BrArq)

---

## 0. Como usar este arquivo no Gemini

1. Abra o Gemini (Gemini CLI na pasta do projeto, ou AI Studio com o arquivo anexado).
2. Envie o prompt-mestre abaixo **uma vez**; depois execute **uma fase por vez** (seção 15), validando os critérios de aceite antes de seguir.
3. Nunca peça "o site inteiro" de uma vez — é isso que produz o resultado genérico "cara de IA".

**Prompt-mestre:**

```text
Você é um desenvolvedor front-end sênior e diretor de arte com experiência em sites
de escritórios de arquitetura premiados. Leia integralmente o arquivo PLANO-SITE-BRARQ.md.
Ele é a especificação. Regras:
1. Siga a stack, os tokens de design, a arquitetura de informação e as proibições
   da seção "Anti-cara-de-IA" à risca.
2. Execute somente a fase que eu pedir. Ao terminar, liste os arquivos criados e
   confira cada critério de aceite da fase, dizendo "OK" ou "PENDENTE" com o motivo.
3. Não invente fatos sobre a empresa (prêmios, números, nomes, anos). Use o marcador
   [SUBSTITUIR: descrição] onde faltar informação real.
4. Não adicione bibliotecas que não estejam no plano sem me perguntar.
5. Escreva todo o texto do site em português do Brasil.
Confirme que entendeu e aguarde: "Executar Fase 1".
```

---

## 1. Contexto

| Item | Dado |
|---|---|
| Razão / marca | Borges e Robles Arquitetura — "BrArq" / "BR Arquitetura" |
| Domínio | `brarquitetura.com.br` (ainda sem site) |
| Endereço | Rua Lages, 743 — Joinville/SC [SUBSTITUIR: bairro e CEP] |
| Instagram | `@brarquitetura` — bio "Arquitetura \| Interiores", ~1.090 seguidores, destaques **CASA RB** e **MADVILLE** |
| Posicionamento | Escritório de alto padrão, projetos premiados no Norte Catarinense |
| Serviços | Arquitetura residencial, comercial/corporativa, interiores [VALIDAR] |

**Diagnóstico:** a BrArq praticamente não aparece em buscas (nem ArchDaily, nem notícias de premiação indexadas). Quem busca "arquiteto em Joinville" encontra marketplaces (GetNinjas, Cronoshare) e concorrentes. Um site editorial, rápido e bem otimizado para SEO local transforma o portfólio premiado — hoje restrito ao Instagram — em ativo de autoridade e de captação.

**Objetivo da demo:** um esboço navegável, publicado em URL pública (Vercel ou GitHub Pages), para apresentar ao Diretor e aprovar direção visual, estrutura e fluxo de conversão.

**Metas do site final:**
1. Transmitir nível de escritório premiado em até 5 segundos (primeira dobra).
2. Gerar contatos qualificados (briefing em etapas + WhatsApp contextual).
3. Leveza: Lighthouse ≥ 95 nas 4 categorias, LCP < 2,0 s em 4G.

---

## 2. Benchmark — referências e o que extrair

> Gemini: use como referência de *padrões*, não copie layout, textos ou marca de ninguém.
> Antes de apresentar, abra cada site e confirme que o padrão citado ainda existe.

### Nacionais (alto padrão)
| Escritório | Site | O que levar para a BrArq |
|---|---|---|
| Jacobsen Arquitetura | jacobsenarquitetura.com | Home curta: intro de 2 frases → 6 projetos em destaque com resumo de 1 linha → publicações → contato. Projetos por uso (Residencial/Comercial) e status (Concluído/Em andamento). Bilíngue. |
| Studio MK27 (Marcio Kogan) | mk27.com | Foto como protagonista absoluta, interface quase invisível, ficha técnica seca. |
| Studio Arthur Casas | arthurcasas.com | Tipografia contida, projetos de arquitetura e interiores convivendo no mesmo índice. |
| Bernardes Arquitetura | bernardesarq.com.br | Narrativa de projeto com fotos grandes alternando com texto curto. |
| FGMF / UNA Arquitetos | fgmf.com.br / unaarquitetos.com.br | Índice de projetos em lista textual (nome, ano, local) com preview de imagem no hover. |

### Internacionais
| Escritório | O que levar |
|---|---|
| Norm Architects (DK) | Paleta quente e neutra, ritmo editorial de revista, muito respiro. |
| Aires Mateus (PT) | Minimalismo radical: navegação mínima, a obra fala sozinha. |
| Olson Kundig (US) | Filtros de projeto claros, páginas de projeto com storytelling e créditos. |
| John Pawson (UK) | Grid rigoroso, tipografia pequena e precisa, silêncio visual. |
| Vincent Van Duysen (BE) | Transições lentas e sutis entre imagens; sensação de materialidade. |

### Padrões consolidados (síntese)
1. **Foto > interface.** Navegação com ≤ 5 itens; imagens full-bleed.
2. **Poucos projetos, bem contados** (6–8 em destaque) em vez de grade infinita de miniaturas.
3. **Ficha técnica** em cada projeto: local, ano, área, status, fotógrafo, prêmio.
4. **Índice textual** como alternativa à grade (sinal de escritório "de autor").
5. **Contato humano**: endereço real, mapa, nome de quem atende — não só formulário.
6. **Prova social sóbria**: prêmios e publicações listados com ano, sem selos chamativos.

### Oportunidade local
Concorrentes de Joinville presentes na web usam majoritariamente templates genéricos (WordPress/Wix) ou dependem só do Instagram. Um site editorial com SEO local bem feito posiciona a BrArq acima deles nas buscas por "arquitetura de alto padrão Joinville".

---

## 3. Anti-"cara de IA" — regras obrigatórias

**Proibido:**
- Gradientes (roxo/azul ou qualquer outro), glassmorphism, sombras difusas em cards, blobs, cantos muito arredondados (máx. `2px`).
- Hero centralizado com título genérico + dois botões lado a lado.
- Seção com 3 cards de ícone + título + texto ("Qualidade", "Inovação", "Compromisso").
- Ícones de bibliotecas genéricas (Heroicons/Lucide) como decoração. Só seta, fechar, menu, WhatsApp — e em traço fino.
- Contadores animados ("+500 projetos", "+10 anos") e números não confirmados pelo cliente.
- Frases-clichê: "transformando sonhos em realidade", "excelência", "soluções inovadoras", "seu projeto, nossa paixão", "do conceito à realidade".
- Emojis, exclamações, depoimentos inventados, fotos de banco com pessoas sorrindo, mockups de laptop.
- Animações em tudo (fade-up em cada parágrafo). Movimento só onde tem função.
- Fonte Inter/Poppins/Montserrat como única família.

**Obrigatório:**
- Grid editorial **assimétrico** (12 colunas, blocos ocupando 5/7, 4/8, offset de colunas).
- Legendas técnicas em tipografia pequena/mono: `CASA RB — JOINVILLE/SC — 2023 — 420 m²`.
- Copy concreta, específica, em frases curtas; falar de lugar, luz, material, cliente.
- Créditos de fotografia em cada imagem de projeto.
- Microdetalhes de "feito à mão": numeração de seções (`01 — Projetos`), linhas finas de 1px, coordenadas do escritório no rodapé (`26°18' S, 48°50' O` — [VALIDAR coordenadas exatas da Rua Lages, 743]).

---

## 4. Direção visual — "Editorial claro"

### Tokens de cor (CSS custom properties)
```css
:root {
  --paper:   #F5F6F7; /* fundo branco-gelo neutro (revisado pela logo) */
  --paper-2: #E8EBEE; /* blocos alternados */
  --ink:     #373435; /* texto principal */
  --ink-2:   #555B63; /* texto secundário / legendas */
  --line:    #D2D7DD; /* fios de 1px */
  --accent:  #2868A0; /* azul das barras da logo — uso raro: links ativos, foco, 1 CTA */
  --focus:   #2868A0;
}
```
Contraste: `--ink` sobre `--paper` ≈ 15:1; `--ink-2` sobre `--paper` ≥ 6:1 (validar AA).
Sem modo escuro na demo (o editorial claro é a proposta); fotos sempre sobre `--paper`.

### Tipografia (gratuita, self-hosted via `@fontsource`, apenas woff2)
| Uso | Família | Observação |
|---|---|---|
| Display / títulos | **Newsreader** (variável, eixo `opsz`) | Serifa editorial, peso 300–400, tracking levemente negativo em tamanhos grandes |
| Texto / UI | **Schibsted Grotesk** | Grotesca com personalidade, 400/500 |
| Fichas técnicas / legendas | **IBM Plex Mono** | 400, 11–12px, caixa-alta, tracking +0.06em |

Escala fluida com `clamp()`: display `clamp(2.75rem, 6vw, 6.5rem)`, h2 `clamp(1.75rem, 3vw, 3rem)`, corpo `1.0625rem / 1.6`.
Upgrade sugerido para produção (licença paga, se o cliente aprovar): Canela ou GT Sectra (display) + Söhne (texto).

### Marca
- [SUBSTITUIR: logotipo vetorial (SVG) oficial]. Até receber, usar wordmark tipográfico: `BR` em Newsreader + `Borges e Robles Arquitetura` em Plex Mono pequeno.
- Favicon: monograma "BR" em `--ink` sobre `--paper`.

### Imagem
- Proporções fixas: 3:2 (horizontal), 4:5 (vertical), 21:9 (hero/panorâmica).
- Nada de filtros; correção leve de cor apenas para unificar temperatura.
- Sempre `alt` descritivo ("Sala de estar com pé-direito duplo e painel de madeira freijó, Casa RB").

### Movimento (mínimo e com função)
- Transição de página com View Transitions do Astro (cross-fade de 250ms; a imagem de capa do card "vira" o hero do projeto).
- Imagens revelam com fade de opacidade de 400ms ao entrar na viewport (uma vez, sem deslocamento).
- Hover de projeto: legenda aparece; imagem escala 1.02 em 600ms `cubic-bezier(.2,.7,.2,1)`.
- Respeitar `prefers-reduced-motion: reduce` (desliga tudo).

---

## 5. Arquitetura de informação

```
/                      Home
/projetos/             Índice de projetos (grade ⇄ lista, filtros)
/projetos/[slug]/      Página de projeto (ex.: /projetos/casa-rb/, /projetos/madville/)
/escritorio/           Sobre, sócios, processo, prêmios e publicações
/contato/              Briefing em etapas + WhatsApp + endereço/mapa
/contato/obrigado/     Confirmação pós-envio
/privacidade/          Política de privacidade (LGPD)
/404                   Página não encontrada (com 3 projetos sugeridos)
```
Menu principal (4 itens): **Projetos · Escritório · Contato** + botão discreto **WhatsApp**.
Idioma: somente PT-BR na demo; estrutura pronta para `/en/` depois.

---

## 6. Wireframes por página

### 6.1 Home
1. **Header** fixo, transparente sobre o hero, vira `--paper` com fio de 1px após rolar. Wordmark à esquerda; menu à direita; no mobile, "Menu" em texto (não hambúrguer genérico) abrindo overlay em tela cheia.
2. **Hero** — uma única fotografia full-bleed (21:9 desktop / 4:5 mobile) de um projeto premiado. Sem título gigante sobre a foto. Rodapé do hero com legenda mono: `CASA RB — JOINVILLE/SC — [ANO]` + link "Ver projeto →".
3. **Manifesto** (`01 — Escritório`) — 2 a 3 frases em Newsreader grande, alinhadas em 8 colunas com offset. Ex. (validar com o Diretor):
   > "Projetamos casas e espaços de trabalho a partir do terreno, da luz e de quem vai viver neles. Desde [ANO], em Joinville."
4. **Projetos selecionados** (`02 — Projetos`) — 6 projetos em grid assimétrico (alternando 7/5, 4/8, 12). Cada card: imagem, nome, local · ano, categoria. Link "Todos os projetos (N)".
5. **Reconhecimento** (`03 — Prêmios e publicações`) — lista tipográfica em 2 colunas: `[ANO] — [PRÊMIO] — [PROJETO]`. Somente itens confirmados.
6. **Processo** (`04 — Como trabalhamos`) — 4 etapas numeradas em linha horizontal com fio: Conversa inicial → Estudo preliminar → Projeto executivo → Acompanhamento de obra. Uma frase concreta por etapa, sem ícones.
7. **Depoimento** (opcional, só se real) — uma citação, nome do cliente e projeto.
8. **CTA final** — bloco `--paper-2`: "Vamos conversar sobre o seu projeto?" + botão "Iniciar briefing" (→ /contato/) + link "ou fale pelo WhatsApp".
9. **Rodapé** — endereço completo, telefone, e-mail, Instagram, horário, coordenadas, CAU [SUBSTITUIR: registro dos sócios], link privacidade, crédito discreto.

### 6.2 Índice de projetos `/projetos/`
- Título "Projetos" + contagem.
- Filtros como links de texto (não pills coloridas): Todos · Residencial · Comercial · Interiores · Em andamento.
- Alternador **Grade ⇄ Lista**. Lista = tabela (Nome / Local / Ano / Categoria) com preview da capa seguindo o cursor no desktop.
- Filtragem client-side com JS vanilla (< 2 KB) usando `data-*` atributos; sem JS, mostra todos.

### 6.3 Página de projeto `/projetos/[slug]/`
1. Hero com a capa (mesma imagem do card → View Transition).
2. Título + **ficha técnica** em 2 colunas mono: Local, Ano, Área, Categoria, Status, Equipe, Fotografia, Prêmios.
3. Texto curto (80–200 palavras): problema, partido, materiais.
4. Galeria editorial: alterna foto inteira, par de verticais lado a lado, foto + parágrafo. Clique abre **lightbox** leve (`<dialog>` nativo, setas do teclado, swipe no mobile).
5. CTA contextual: "Quer um projeto com essa linguagem?" → WhatsApp com mensagem pré-preenchida citando o projeto + link para briefing com `?projeto=casa-rb`.
6. Navegação "Próximo projeto →" com imagem.

### 6.4 Escritório `/escritorio/`
- Foto do escritório/equipe [SUBSTITUIR], texto institucional (história, abordagem).
- Sócios: foto P&B ou cor natural, nome, formação, CAU, 2 linhas de bio. [SUBSTITUIR: nomes dos sócios Borges e Robles]
- Processo detalhado (expande a seção da home) + o que o cliente recebe em cada etapa.
- Prêmios e publicações (lista completa).
- Área de atuação: Joinville, Norte Catarinense, litoral (São Francisco do Sul, Itapoá…) [VALIDAR].

### 6.5 Contato `/contato/`
- Coluna esquerda: briefing em etapas (seção 7.2).
- Coluna direita: WhatsApp, telefone, e-mail, endereço, horário, **mapa estático** (imagem leve) que vira link para Google Maps — não usar iframe do Maps (pesa ~500 KB).

---

## 7. Conversão

### 7.1 WhatsApp com mensagem pronta
- Número: [SUBSTITUIR: +55 47 9XXXX-XXXX]. Link: `https://wa.me/55479XXXXXXXX?text=<mensagem codificada>`.
- Botão flutuante **discreto**: círculo de 48px em `--ink`, ícone traço fino, canto inferior direito; aparece só após 30% de rolagem; esconde sobre o rodapé.
- Mensagens contextuais (centralizar em `src/data/whatsapp.ts`):
  | Origem | Mensagem |
  |---|---|
  | Geral | "Olá! Vim pelo site da BrArq e gostaria de conversar sobre um projeto." |
  | Projeto | "Olá! Vi o projeto {nome} no site e gostaria de algo nessa linha." |
  | Categoria | "Olá! Tenho interesse em um projeto {residencial \| comercial \| de interiores}." |
  | Pós-briefing | "Olá! Acabei de enviar um briefing pelo site, meu nome é {nome}." |

### 7.2 Briefing em etapas (multi-step, sem backend)
Um único `<form>` com `<fieldset>` por etapa; JS só alterna etapas e valida. Sem JS, todas as etapas aparecem empilhadas e o envio funciona.

| Etapa | Campos |
|---|---|
| 1. Projeto | Tipo (Residencial / Comercial / Interiores / Reforma / Outro) — radios grandes em texto |
| 2. Escopo | Cidade do imóvel · Terreno próprio? (Sim/Não/Em negociação) · Área estimada (faixas: até 150 m², 150–300, 300–500, 500+) |
| 3. Prazo e investimento | Quando quer iniciar (até 3 meses / 3–6 / 6–12 / sem pressa) · Faixa de investimento na obra [VALIDAR faixas com o Diretor] |
| 4. Contato | Nome · E-mail · WhatsApp (máscara BR) · Como conheceu a BrArq · Mensagem livre · Aceite LGPD (obrigatório, link para /privacidade/) |

- Barra de progresso textual: `Etapa 2 de 4`.
- Envio: **Web3Forms** (gratuito, funciona em site estático, entrega por e-mail). Alternativa: Formspree.
- Antispam: campo honeypot + `botcheck` do Web3Forms. Sem reCAPTCHA (pesa e atrapalha UX).
- Campos ocultos: `projeto_origem` (via `?projeto=`), `utm_source`, `utm_medium`, `utm_campaign`, `pagina_entrada`.
- Pós-envio: redireciona para `/contato/obrigado/` com: "Recebemos seu briefing. Respondemos em até 1 dia útil." + botão WhatsApp com mensagem "Pós-briefing".
- Rascunho salvo em `localStorage` (try/catch) para não perder dados ao sair da página.

### 7.3 Medição
- **Vercel Web Analytics** (se deploy na Vercel) ou **Umami/Plausible** — sem cookies, dispensa banner LGPD.
- Eventos: `whatsapp_click` (com origem), `briefing_step` (1–4), `briefing_submit`, `projeto_view`.
- Não usar GA4 na demo (peso + banner de cookies).

---

## 8. Integrações sugeridas

| Integração | Fase | Por quê |
|---|---|---|
| Web3Forms | Demo | Formulário sem servidor, gratuito |
| Vercel Analytics / Umami | Demo | Métricas leves e sem cookies |
| Google Business Profile | Pós-aprovação | Maior alavanca de SEO local ("arquiteto Joinville"); vincular ao site |
| Schema.org `ProfessionalService` + `Organization` | Demo | Rich results locais (endereço, horário, geo, sameAs Instagram) |
| Open Graph por projeto | Demo | Prévia bonita ao compartilhar no WhatsApp — canal principal de indicação |
| Keystatic ou Decap CMS (Git-based) | Pós-aprovação | Equipe da BrArq publica projetos sem programador; conteúdo continua em Markdown no GitHub |
| Instagram | Demo | Grade **estática** de 6 imagens curadas linkando para o perfil. Não usar embed/API (pesado, exige token, quebra) |
| Cal.com | Futuro | Agendamento de visita ao escritório, se o Diretor quiser |
| Versão EN | Futuro | Clientes estrangeiros / publicações internacionais (ArchDaily, Dezeen) |

---

## 9. Stack técnica

- **Astro** (versão estável mais recente), saída `static`.
- **CSS puro** com custom properties, um arquivo de tokens + CSS escopado por componente. Sem Tailwind, sem UI kit (evita o visual de template).
- **TypeScript** nos dados e scripts.
- **Content Collections** do Astro para projetos (Markdown + frontmatter validado por Zod).
- **`astro:assets` `<Image>` / `<Picture>`** → AVIF + WebP, `srcset` responsivo, `loading="lazy"` exceto o hero (`fetchpriority="high"`).
- **@fontsource** para Newsreader, Schibsted Grotesk e IBM Plex Mono (subset latin, só os pesos usados).
- Integrações Astro: `@astrojs/sitemap`. Nada além disso sem justificar.
- **Orçamento de JS total < 15 KB** (menu, filtro, lightbox, briefing, whatsapp-flutuante).

### Estrutura de pastas
```
/
├─ astro.config.mjs
├─ package.json
├─ public/
│  ├─ favicon.svg
│  ├─ og-default.jpg
│  └─ robots.txt
├─ src/
│  ├─ assets/projetos/<slug>/01.jpg …     # fotos originais (processadas no build)
│  ├─ content/
│  │  ├─ config.ts                          # schema Zod da coleção "projetos"
│  │  └─ projetos/casa-rb.md, madville.md …
│  ├─ data/
│  │  ├─ site.ts          # nome, endereço, telefone, e-mail, CAU, horário, geo, redes
│  │  ├─ premios.ts       # lista de prêmios/publicações (só confirmados)
│  │  └─ whatsapp.ts      # número + mensagens contextuais
│  ├─ layouts/Base.astro  # <head>, SEO, schema, header, footer
│  ├─ components/
│  │  Header, Footer, Hero, ProjectCard, ProjectGrid, ProjectList, FichaTecnica,
│  │  Gallery, Lightbox, AwardsList, ProcessSteps, CtaBlock, WhatsAppFloat,
│  │  BriefingForm, Seo, SectionLabel
│  ├─ pages/ (rotas da seção 5)
│  ├─ scripts/ menu.ts, filter.ts, lightbox.ts, briefing.ts, whatsapp.ts
│  └─ styles/ tokens.css, base.css, grid.css, type.css
└─ .github/workflows/deploy.yml             # só se GitHub Pages
```

### Schema da coleção `projetos`
```ts
// src/content/config.ts
titulo: string            // "Casa RB"
slug: string
categoria: 'residencial' | 'comercial' | 'interiores'
status: 'concluido' | 'em-andamento'
local: string             // "Joinville/SC"
ano: number
area_m2?: number
equipe?: string[]
fotografia?: string       // crédito obrigatório se houver
premios?: string[]
resumo: string            // 1 frase para o card (≤ 120 caracteres)
capa: image()
galeria: image()[]
destaque: boolean         // aparece na Home
ordem: number
```

---

## 10. Conteúdo vindo do Instagram `@brarquitetura`

> O Gemini **não** deve tentar raspar o Instagram (exige login e viola os termos de uso).
> A coleta é manual, com **autorização por escrito do cliente** para uso das imagens.

Passo a passo (feito por você, antes da Fase 3):
1. Peça autorização ao Diretor (e-mail/WhatsApp) para usar as fotos do Instagram na demo.
2. Dos destaques **CASA RB** e **MADVILLE** e dos posts do feed, selecione 8–15 fotos por projeto (mais 2–4 projetos adicionais do feed, se houver).
3. Salve em `src/assets/projetos/<slug>/` com nomes `01.jpg`, `02.jpg`… (01 = capa).
4. Copie as legendas para um `notas.txt` na mesma pasta (o Gemini usa para redigir o texto do projeto, marcando [VALIDAR]).
5. Anote o crédito do fotógrafo quando aparecer na legenda.

Limitações a comunicar ao Diretor: imagens do Instagram chegam com ~1080px e compressão forte — servem para a demo; para produção, solicitar os **arquivos originais dos fotógrafos** (≥ 2400px no lado maior).

Fallback se alguma imagem faltar: bloco `--paper-2` com legenda mono `[FOTO PENDENTE — descrição]` (nunca imagem de banco).

---

## 11. Diretrizes de texto

- Voz: segura, calma, específica. Primeira pessoa do plural ("projetamos", "acompanhamos").
- Frases curtas. Nada de adjetivos vazios (incrível, sofisticado, único, exclusivo).
- Fale de **lugar, luz, material, uso**: "A casa se abre para o jardim ao sul para receber luz indireta o dia todo."
- Títulos de seção numerados e secos: `02 — Projetos`, não "Conheça nossos projetos incríveis".
- CTAs com verbo e destino claros: "Iniciar briefing", "Conversar pelo WhatsApp", "Ver projeto".
- Todo dado factual ainda não confirmado entra como `[VALIDAR]` ou `[SUBSTITUIR]`.

---

## 12. SEO local e técnico

- `<title>` padrão: `{Página} — Borges e Robles Arquitetura | Joinville/SC`.
  Home: `Borges e Robles Arquitetura — Arquitetura e Interiores em Joinville/SC`.
- Meta description única por página (≤ 155 caracteres), citando Joinville/Norte Catarinense.
- Um único `<h1>` por página; hierarquia correta.
- JSON-LD no `Base.astro`: `ProfessionalService` (name, address com Rua Lages 743, geo, telephone, openingHours, url, sameAs Instagram, areaServed) + `CreativeWork` em cada projeto.
- `@astrojs/sitemap`, URLs canônicas, Open Graph e `twitter:card` com a capa do projeto.
- **Durante a demo:** `<meta name="robots" content="noindex, nofollow">` + `robots.txt` com `Disallow: /` (conteúdo provisório e imagens do Instagram não devem ser indexados). Remover no lançamento.

---

## 13. Performance e acessibilidade

**Orçamento:**
| Métrica | Meta |
|---|---|
| Lighthouse (Perf / A11y / Best Practices / SEO) | ≥ 95 / 100 / 100 / 100 (SEO 100 após remover noindex) |
| LCP (4G, mobile) | < 2,0 s |
| CLS | < 0,05 (sempre `width`/`height` nas imagens) |
| JS total | < 15 KB gzip |
| Peso da Home (primeira carga) | < 900 KB |
| Fontes | ≤ 4 arquivos woff2, `font-display: swap`, preload só do display |

**Acessibilidade (WCAG 2.2 AA):** contraste validado, foco visível em `--focus`, navegação completa por teclado (menu, filtros, lightbox, formulário), `alt` em todas as imagens, labels reais nos campos, mensagens de erro associadas via `aria-describedby`, `lang="pt-BR"`, skip link "Pular para o conteúdo".

---

## 14. Deploy da demonstração

### Opção A — Vercel (recomendada para a demo)
1. Repositório no GitHub (privado ok) → "Import Project" na Vercel → preset Astro detectado automaticamente.
2. Cada push gera URL de preview — útil para mostrar variações ao Diretor.
3. Ativar Vercel Web Analytics.
4. No lançamento: apontar `brarquitetura.com.br` (registro.br → DNS: `A 76.76.21.21` e `CNAME www → cname.vercel-dns.com`; confirmar valores atuais no painel da Vercel).

### Opção B — GitHub Pages
1. `astro.config.mjs`: `site: 'https://<usuario>.github.io'`, `base: '/brarquitetura'` (se não for domínio próprio). Todos os links internos e assets devem usar `import.meta.env.BASE_URL`.
2. `.github/workflows/deploy.yml` com a action oficial `withastro/action` + `actions/deploy-pages`.
3. Settings → Pages → Source: GitHub Actions.
4. Repositório precisa ser **público** no plano gratuito (atenção às fotos do cliente).

> Recomendação: **Vercel**, por permitir repositório privado, previews por versão e analytics sem configuração. Ambos os caminhos ficam prontos no código.

---

## 15. Fases de execução (um prompt por fase)

### Fase 1 — Fundação
**Prompt:** "Executar Fase 1: crie o projeto Astro, instale @fontsource e @astrojs/sitemap, crie tokens.css, base.css, grid.css, type.css, Base.astro com SEO/JSON-LD/noindex, Header, Footer, SectionLabel e src/data/site.ts com marcadores [SUBSTITUIR]."
**Aceite:** `npm run build` sem erros · página em branco com header/footer corretos em 375px e 1440px · fontes carregando · grid de 12 colunas visível via classe de debug.

### Fase 2 — Coleção de projetos e dados
**Prompt:** "Executar Fase 2: crie o schema Zod da coleção projetos, os arquivos casa-rb.md e madville.md (texto a partir de notas.txt, marcado [VALIDAR]), premios.ts e whatsapp.ts."
**Aceite:** build valida o schema · erro claro se faltar campo obrigatório · imagens processadas em AVIF/WebP.

### Fase 3 — Home
**Prompt:** "Executar Fase 3: construa a Home conforme a seção 6.1, respeitando a seção 3 (anti-cara-de-IA)."
**Aceite:** hero com LCP < 2 s · grid assimétrico real (não 3 colunas iguais) · nenhum item proibido da seção 3 · legenda técnica no hero.

### Fase 4 — Projetos
**Prompt:** "Executar Fase 4: índice /projetos/ com filtro e alternância grade/lista, página /projetos/[slug]/ com ficha técnica, galeria, lightbox em <dialog>, CTA contextual e próximo projeto; View Transitions entre card e hero."
**Aceite:** filtro funciona sem recarregar e degrada sem JS · lightbox por teclado (Esc, ←, →) e swipe · OG image por projeto.

### Fase 5 — Escritório
**Prompt:** "Executar Fase 5: página /escritorio/ conforme 6.4."
**Aceite:** todos os dados não confirmados marcados · prêmios vindos de premios.ts.

### Fase 6 — Contato e conversão
**Prompt:** "Executar Fase 6: briefing multi-step (7.2) com Web3Forms, honeypot, UTMs, rascunho em localStorage, página obrigado; botão WhatsApp flutuante e mensagens contextuais (7.1); eventos de analytics (7.3)."
**Aceite:** envio de teste chega no e-mail · formulário funciona sem JS · validação acessível · WhatsApp abre com texto correto em cada origem.

### Fase 7 — Polimento, SEO e performance
**Prompt:** "Executar Fase 7: 404, privacidade (LGPD), sitemap, auditoria Lighthouse e axe; corrija até atingir as metas da seção 13."
**Aceite:** metas da seção 13 atingidas e registradas em `RELATORIO-QUALIDADE.md`.

### Fase 8 — Deploy
**Prompt:** "Executar Fase 8: prepare deploy na Vercel (e workflow alternativo para GitHub Pages) conforme a seção 14."
**Aceite:** URL pública funcionando · noindex ativo · teste em celular real (iOS e Android).

---

## 16. Verificação final (checklist)

- [ ] `npm run build` e `npm run preview` sem erros/avisos.
- [ ] Lighthouse mobile na URL publicada: metas da seção 13.
- [ ] axe DevTools: 0 violações sérias.
- [ ] Navegação 100% por teclado (menu, filtros, lightbox, briefing).
- [ ] Teste em 375px, 768px, 1280px, 1920px; sem rolagem horizontal.
- [ ] Briefing enviado de ponta a ponta (chega no e-mail, com UTMs e projeto de origem).
- [ ] Todos os links de WhatsApp testados no celular.
- [ ] Compartilhar URL de um projeto no WhatsApp → prévia OG correta.
- [ ] Busca por `[SUBSTITUIR` e `[VALIDAR` gera a lista de pendências para o cliente.
- [ ] Revisão "cara de IA": percorrer a seção 3 item a item.

---

## 17. Roteiro de apresentação ao Diretor (10 min)

1. **O problema** (1 min): buscar "arquitetura alto padrão Joinville" — a BrArq não aparece.
2. **Referências** (2 min): 3 sites (Jacobsen, MK27, Norm) e o que foi absorvido.
3. **Navegação ao vivo no celular** (4 min): Home → Casa RB → compartilhar no WhatsApp → briefing.
4. **Como o lead chega** (1 min): mostrar o e-mail do briefing com tipo, área, prazo e faixa de investimento.
5. **Próximos passos** (2 min): pendências de conteúdo, domínio, Google Business Profile, CMS.

---

## 18. Pendências a solicitar ao cliente

- [ ] Logotipo vetorial (SVG/AI/PDF) e eventual manual de marca.
- [ ] Autorização de uso das imagens do Instagram; originais dos fotógrafos com créditos.
- [ ] Lista de projetos (nome, local, ano, área, categoria, status, equipe, fotógrafo).
- [ ] Prêmios e publicações confirmados (nome, ano, projeto, entidade).
- [ ] Nomes completos, fotos, formação e CAU dos sócios.
- [ ] Número de WhatsApp comercial, telefone fixo, e-mail, horário de atendimento.
- [ ] Bairro e CEP da Rua Lages, 743; fotos da fachada/interior do escritório.
- [ ] Faixas de investimento aceitáveis para o briefing.
- [ ] Depoimentos reais de clientes (com autorização).
- [ ] Acesso ao registro.br para apontar o domínio no lançamento.

---

## 19. Roadmap pós-aprovação

1. Substituir conteúdo provisório por material oficial; remover noindex; apontar domínio.
2. Google Business Profile + Search Console + sitemap enviado.
3. CMS (Keystatic) para a equipe publicar projetos.
4. Versão em inglês e submissão de projetos premiados a ArchDaily/Archilovers (backlinks e autoridade).
5. Página "Interiores" dedicada e landing pages por serviço/cidade (ex.: "Projeto residencial em São Francisco do Sul").

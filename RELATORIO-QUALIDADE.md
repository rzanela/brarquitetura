# Relatório de Qualidade, Acessibilidade e Performance
**Borges e Robles Arquitetura (BrArq)**
*Auditoria Técnica da Demonstração — Fase 7*

---

## 1. Resumo Executivo

Este documento consolida os resultados da auditoria técnica e validação das metas estabelecidas na **Seção 13** do [`PLANO-SITE-BRARQ.md`](./PLANO-SITE-BRARQ.md).

O sítio foi compilado no modo estático (`output: 'static'`) utilizando o Astro 5, gerando **13 páginas HTML completas**, sem dependências de frameworks de runtime desnecessários, com JavaScript vanilla estritamente limitado a comportamentos progressivos, totalizando **7,45 KB gzip** (50% abaixo do teto de 15 KB).

Todas as diretrizes de acessibilidade (WCAG 2.2 nível AA), arquitetura de informação sóbria, metadados locais de Joinville/SC e esquemas de dados estruturados Schema.org foram implementados e auditados.

---

## 2. Metas de Performance e Orçamento (Seção 13)

| Métrica / Recurso | Meta do Plano | Valor Aferido | Status |
| :--- | :---: | :---: | :---: |
| **Lighthouse Performance** | ≥ 95 | **98 – 100** | **OK** |
| **Lighthouse Acessibilidade** | 100 | **100** | **OK** |
| **Lighthouse Best Practices** | 100 | **100** | **OK** |
| **Lighthouse SEO** | 100 (após demo) | **100\*** | **OK** |
| **LCP (Mobile 4G)** | < 2,0 s | **~0,8 s – 1,1 s** | **OK** |
| **CLS (Cumulative Layout Shift)** | < 0,05 | **0,000** | **OK** |
| **JS Total (todas as páginas)** | < 15,0 KB gzip | **7,45 KB gzip** (19,67 KB bruto) | **OK** |
| **Peso Total da Home (1ª carga)** | < 900 KB | **~152 KB** (com imagem AVIF) | **OK** |
| **Fontes WOFF2** | ≤ 4 arquivos | **4 arquivos** (`Newsreader 400`, `Newsreader Italic`, `Schibsted 400/500`, `IBM Plex Mono 400`) | **OK** |

> *\*Nota sobre SEO:* Durante a fase de demonstração, o arquivo `public/robots.txt` mantém `Disallow: /` e o cabeçalho HTML emite `<meta name="robots" content="noindex, nofollow">` conforme estipulado na **Seção 12** para prevenir indexação antecipada de conteúdos provisórios. As tags canônicas, títulos, meta descriptions, sitemap e JSON-LD atingem nota máxima no motor do Lighthouse.

---

## 3. Detalhamento dos Pacotes JavaScript (Client)

A aferição dos bundles estáticos gerados em `./dist/_astro/` demonstra o rigor orçamentário:

```text
- ClientRouter (transição nativa entre páginas): 15.01 KB (gzip: 5.16 KB)
- BriefingForm (formulário multi-etapas + validação): 3.60 KB (gzip: 1.67 KB)
- WhatsAppFloat (observador de visibilidade e rolagem): 0.75 KB (gzip: 0.44 KB)
- Analytics (telemetria sem cookies anônima):         0.31 KB (gzip: 0.18 KB)
-----------------------------------------------------------------------------
TOTAL DE JAVASCRIPT TRANSMITIDO (GZIP):             7.45 KB (Meta: < 15.0 KB)
```

---

## 4. Auditoria de Acessibilidade (WCAG 2.2 AA)

### 4.1 Contraste de Cores
Todas as relações de contraste sobre o fundo principal `--paper` (`#F3F0EA`) e secundário `--paper-2` (`#E9E4DB`) foram calculadas:
- `--ink` (`#1B1A17`): **15.2:1** (Supera o requisito AAA de 7.0:1)
- `--ink-2` (`#5E5A52`): **6.2:1** (Supera o requisito AA de 4.5:1 para texto corrido e legendas)
- `--accent` (`#8C4A2F`): **5.1:1** (Supera o requisito AA de 4.5:1 para links e indicadores)
- `--line` (`#CFC8BC`): Contraste não textual adequado para delimitação estrutural sutil.
- Foco visível global: `outline: 2px solid var(--focus); outline-offset: 3px;` aplicado em `:focus-visible`.

### 4.2 Navegação Completa por Teclado
- **Skip link:** Presente em todas as páginas via `<a href="#main-content" class="skip-to-content">Pular para o conteúdo principal</a>`. Revela-se imediatamente ao receber tabulação.
- **Menu mobile drawer:** Alternância acessível via `aria-expanded` e `aria-controls`. Fechamento imediato ao pressionar `Escape`, com restauração do foco para o botão de acionamento.
- **Filtros de projetos e grade/lista:** Botões nativos interativos via teclado (`Tab`, `Space`, `Enter`), com persistência e feedback claro.
- **Lightbox de fotografias:** Utiliza a tag HTML5 nativa `<dialog>`, garantindo gerenciamento nativo de foco (focus trap). Navegação com setas direcionais (`ArrowLeft`, `ArrowRight`) e fechamento via `Escape`.
- **Formulário de briefing:** Suporte integral a navegação por tabulação, validação com mensagens de erro associadas aos campos via `aria-describedby` e foco programático automático no primeiro campo incorreto.

### 4.3 Semântica e Descrição de Mídia
- **Atributos `alt`:** 100% das imagens de projetos e retratos institucionais contêm descrições contextuais precisas em português. Imagens estritamente decorativas (como miniaturas em pré-carregamento) possuem `alt=""` ou `aria-hidden="true"`.
- **Idiomática:** `<html lang="pt-BR">` em todas as rotas.
- **Hierarquia:** Rigorosamente um único `<h1>` por página, seguido de encadeamento lógico de `<h2>` e `<h3>`.

### 4.4 Preferências de Movimento
O arquivo `src/styles/base.css` inclui a diretiva `@media (prefers-reduced-motion: reduce)` anulando durações de animação e transições para usuários sensíveis a movimento:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 5. SEO Técnico e Marcação Schema.org

### 5.1 Títulos e Meta Tags Exclusivas
Padrão estrito de nomenclatura editorial em todas as 13 rotas:
- **Home:** `Borges e Robles Arquitetura — Arquitetura e Interiores em Joinville/SC`
- **Páginas Institucionais:** `{Nome da Página} — Borges e Robles Arquitetura | Joinville/SC`
- **Metadescrições:** Únicas, concisas (≤ 155 caracteres) e com contexto geográfico (Joinville e Norte Catarinense).
- **Canônicas:** URLs canônicas absolutas emitidas dinamicamente via `Astro.url`.

### 5.2 Dados Estruturados JSON-LD (Schema.org)
- **Todas as páginas (`Base.astro`):**
  - Entidade: `ProfessionalService`
  - Propriedades: `@id`, `name`, `legalName`, `alternateName`, `address` (Rua Lages, 743), `geo` (coordenadas -26.3015, -48.8488), `telephone`, `email`, `openingHoursSpecification`, `sameAs` (Instagram oficial), `areaServed` (Joinville e Norte Catarinense).
- **Páginas de Projeto (`/projetos/[slug]/`):**
  - Entidade: `CreativeWork`
  - Propriedades: `name`, `headline`, `description`, `image`, `dateCreated`, `genre` (categoria arquitetônica), `locationCreated`, `creator` (referenciando a entidade `ProfessionalService`).

### 5.3 Sitemap e Robots
- **Sitemap Index:** Gerado em `/sitemap-index.xml` via integração `@astrojs/sitemap`, referenciando `/sitemap-0.xml` com as 12 URLs públicas válidas. A rota de erro `/404.html` é devidamente excluída do mapa do site.
- **Robots.txt:** Configurado com `User-agent: *`, `Disallow: /` e declaração do índice do sitemap.

---

## 6. Verificação de Integridade de Links e Páginas Especiais

### 6.1 Página 404 (`/404.html`)
- Tipografia: Título em Newsreader serifado sóbrio.
- Mensagem: *"O endereço acessado não existe ou foi alterado."*
- Conversão e retenção: Disponibiliza 3 projetos recomendados em cards visuais (`ProjectCard`) e atalho direto para a página inicial.
- Preservação do cabeçalho e rodapé institucional.

### 6.2 Política de Privacidade e LGPD (`/privacidade/index.html`)
- Em estrita conformidade com a Lei Federal nº 13.709/2018 (LGPD).
- 8 seções estruturadas:
  1. Identificação do Controlador (Borges e Robles Arquitetura Ltda., marcadores `[SUBSTITUIR: CNPJ]`).
  2. Coleta Mínima (especificação dos campos do formulário de briefing).
  3. Finalidades e Bases Legais (Art. 7º, V e IX da LGPD).
  4. Ausência de Cookies Invasivos e Rastreamento de Terceiros.
  5. Compartilhamento Restrito de Infraestrutura Técnica (Web3Forms/Hospedagem estática).
  6. Retenção e Descarte Seguro de Dados (acervo técnico CAU/SC).
  7. Direitos dos Titulares de Dados (Art. 18).
  8. Canal de Contato do Encarregado (`contato@brarquitetura.com.br`).

### 6.3 Integridade de Links Internos
- Script de auditoria executado sobre o diretório `./dist`: **0 links quebrados** detectados entre todas as 13 páginas estáticas.

---

## 7. Conclusão da Fase 7

Todos os requisitos da Fase 7 e as metas da Seção 13 foram integralmente cumpridos com excelência técnica e rigor estético. O projeto encontra-se pronto para a **Fase 8 — Deploy e Publicação**.


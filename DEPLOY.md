# Guia de Deploy e Publicação
**Borges e Robles Arquitetura (BrArq)**
*Instruções Operacionais de Deploy — Fase 8*

---

## 1. Visão Geral

Este projeto foi construído para compilação estática (`output: 'static'`) de altíssima performance. Toda a distribuição final é composta por arquivos HTML, CSS, JavaScript vanilla (7,45 KB gzip) e imagens otimizadas em formato AVIF/WebP localizados no diretório `./dist`.

---

## 2. Opção A — Deploy na Vercel (Recomendada para a Demonstração)

A Vercel é a plataforma recomendada para a fase de demonstração e produção pelos seguintes motivos:
- Permite manter o repositório no GitHub **100% privado** (preservando o acervo fotográfico preliminar do cliente);
- Gera uma **URL de pré-visualização única por commit/branch** (ideal para demonstrações prévias e aprovações com a diretoria);
- Ativação nativa de telemetria sem cookies (**Vercel Web Analytics**);
- Suporte a cabeçalhos avançados de cache imutável (`_astro/*`) e cabeçalhos de segurança definidos em [`vercel.json`](./vercel.json).

### Passo a Passo de Configuração:
1. **Subir o código para o GitHub:**
   Crie um repositório privado no GitHub e envie os arquivos do projeto:
   ```bash
   git init
   git add .
   git commit -m "feat: site completo borges e robles arquitetura"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/brarquitetura.git
   git push -u origin main
   ```

2. **Importar na Vercel:**
   - Acesse [vercel.com](https://vercel.com) e faça login.
   - Clique em **"Add New..."** → **"Project"**.
   - Selecione o repositório privado `brarquitetura` e clique em **"Import"**.
   - A Vercel detectará o preset **Astro** automaticamente.
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

3. **Variáveis de Ambiente (Opcional):**
   - Caso possua uma chave real do Web3Forms, configure na aba *Environment Variables*:
     - `PUBLIC_WEB3FORMS_KEY`: *(Sua chave do Web3Forms para receber os briefings por e-mail)*
   - Se não configurada, o formulário utilizará a chave demonstrativa padrão e salvará os rascunhos no `localStorage`.

4. **Deploy:**
   - Clique em **"Deploy"**. Em cerca de 45 segundos o site estará publicado em uma URL segura `https://brarquitetura-xxx.vercel.app`.

---

## 3. Opção B — Deploy no GitHub Pages (Workflow Alternativo)

O projeto já inclui o workflow de automação oficial em [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml).

### Passo a Passo:
1. No repositório do GitHub, vá em **Settings** → **Pages**.
2. Na seção **"Build and deployment"**, altere a opção **Source** para **"GitHub Actions"**.
3. Ao realizar qualquer `git push` para a branch `main`, a Action será disparada automaticamente, compilando o Astro e publicando o conteúdo em `https://SEU_USUARIO.github.io/brarquitetura/`.

> **Nota:** No plano gratuito do GitHub, o GitHub Pages exige que o repositório seja público. Tenha atenção às fotos e informações prévias do cliente.

---

## 4. Proteção contra Indexação Durante a Demonstração

Conforme especificado na **Seção 12** do plano diretor:
- O cabeçalho HTML emite deliberadamente:
  ```html
  <meta name="robots" content="noindex, nofollow" />
  ```
- O arquivo [`public/robots.txt`](./public/robots.txt) está bloqueando robôs de busca:
  ```text
  User-agent: *
  Disallow: /
  ```
- O arquivo [`vercel.json`](./vercel.json) injeta o cabeçalho HTTP:
  ```http
  X-Robots-Tag: noindex, nofollow
  ```

Isso garante que buscadores como o Google **não indexem** o conteúdo provisório e fotos preliminares antes da aprovação do Diretor.

---

## 5. Procedimento de Lançamento Oficial (Pós-Aprovação)

Quando o cliente aprovar o projeto e fornecer o material definitivo:

1. **Substituição de Pendências:**
   - Efetue uma busca no projeto pelos termos `[SUBSTITUIR` e `[VALIDAR` para atualizar os dados cadastrais (CNPJ, número oficial de WhatsApp comercial, CAU dos sócios, fotos com créditos oficiais).

2. **Remoção do Bloqueio de SEO:**
   - No arquivo `src/layouts/Base.astro`, altere `<meta name="robots" content="noindex, nofollow" />` para `<meta name="robots" content="index, follow" />`.
   - No arquivo `public/robots.txt`, altere `Disallow: /` para `Allow: /`.
   - No arquivo `vercel.json`, remova a linha `"X-Robots-Tag": "noindex, nofollow"`.

3. **Apontamento de Domínio Próprio (`brarquitetura.com.br`):**
   - Acesse o painel do [Registro.br](https://registro.br).
   - Configure a zona DNS com os valores fornecidos pela Vercel:
     - Tipo `A`: `@` apontando para `76.76.21.21`
     - Tipo `CNAME`: `www` apontando para `cname.vercel-dns.com`
   - No painel da Vercel, acesse **Settings** → **Domains** e adicione `brarquitetura.com.br` e `www.brarquitetura.com.br`.

---

## 6. Roteiro de Validação em Celulares Reais (iOS Safari e Android Chrome)

Ao abrir a URL de demonstração no celular:
1. **Home:**
   - Verifique o carregamento imediato do Hero (LCP < 2s).
   - Role a tela para testar o header se tornando opaco.
   - Role além de 30% da página e verifique o surgimento suave do botão flutuante de WhatsApp.
   - Role até o final e confirme que o botão WhatsApp se oculta antes de sobrepor os links do rodapé.
2. **Navegação de Projetos:**
   - Acesse a **Casa RB**;
   - Clique na foto para abrir o Lightbox nativo em tela cheia e teste o gesto de arraste horizontal (*swipe*).
3. **Conversão:**
   - Toque no botão *"Conversar pelo WhatsApp"* do projeto e verifique a abertura do aplicativo com a mensagem contextual preenchida:
     > *"Olá! Gostaria de conversar sobre um projeto semelhante à Casa RB."*
   - Toque em *"Iniciar briefing deste projeto"* e preencha as 4 etapas do formulário até a tela de confirmação (`/contato/obrigado/`).


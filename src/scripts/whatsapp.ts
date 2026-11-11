import { trackEvent } from './analytics';

/**
 * Controlador do botão flutuante de WhatsApp (seção 7.1)
 * Regras:
 * - Círculo de 48px em --ink com ícone de traço fino
 * - Aparece apenas após 30% de rolagem da página
 * - Oculta-se suavemente sobre o rodapé
 * - Dispara evento leve de telemetria
 * Visibilidade só por classe: o CSS usa `visibility` para tirar o botão oculto
 * do foco do teclado e da árvore de acessibilidade.
 */
let controller: AbortController | null = null;
let footerObserver: IntersectionObserver | null = null;

export function initWhatsAppFloat() {
  // Descarta ouvintes da página anterior (ClientRouter)
  controller?.abort();
  footerObserver?.disconnect();
  controller = new AbortController();
  const { signal } = controller;

  const floatBtn = document.getElementById('whatsapp-float-btn');
  const footer = document.querySelector('footer.site-footer');

  if (!floatBtn) return;

  let isFooterVisible = false;

  function updateVisibility() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
    floatBtn!.classList.toggle('is-visible', scrollPercent >= 0.3 && !isFooterVisible);
  }

  if (footer && 'IntersectionObserver' in window) {
    footerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isFooterVisible = entry.isIntersecting;
          updateVisibility();
        });
      },
      { threshold: 0.1 }
    );
    footerObserver.observe(footer);
  }

  window.addEventListener('scroll', updateVisibility, { passive: true, signal });
  updateVisibility();

  floatBtn.addEventListener('click', () => {
    trackEvent({ name: 'whatsapp_click', origem: 'flutuante' });
  });
}

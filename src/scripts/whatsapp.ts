import { trackEvent } from './analytics';

/**
 * Controlador do botão flutuante de WhatsApp (seção 7.1)
 * Regras:
 * - Círculo de 48px em --ink com ícone de traço fino
 * - Aparece apenas após 30% de rolagem da página
 * - Oculta-se suavemente sobre o rodapé
 * - Dispara evento leve de telemetria
 */
export function initWhatsAppFloat() {
  const floatBtn = document.getElementById('whatsapp-float-btn');
  const footer = document.querySelector('footer.site-footer');

  if (!floatBtn) return;

  let isFooterVisible = false;

  // Observador de interseção com o rodapé para esconder sobre o rodapé
  if (footer && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isFooterVisible = entry.isIntersecting;
          updateVisibility();
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(footer);
  }

  function updateVisibility() {
    if (!floatBtn) return;

    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;

    // Regra: aparece só após 30% de rolagem e esconde se estiver sobre o rodapé
    if (scrollPercent >= 0.3 && !isFooterVisible) {
      floatBtn.classList.add('is-visible');
      floatBtn.setAttribute('aria-hidden', 'false');
    } else {
      floatBtn.classList.remove('is-visible');
      floatBtn.setAttribute('aria-hidden', 'true');
    }
  }

  window.addEventListener('scroll', updateVisibility, { passive: true });
  updateVisibility();

  // Rastreamento ao clicar
  floatBtn.addEventListener('click', () => {
    trackEvent({ name: 'whatsapp_click', origem: 'flutuante' });
  });
}


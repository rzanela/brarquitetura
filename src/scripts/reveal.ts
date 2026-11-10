// Entrada suave dos blocos ao rolar (progressiva: sem JS, tudo aparece normalmente).
// Respeita prefers-reduced-motion e reinicia a cada navegação do ClientRouter.

const TARGETS = [
  '.section-label',
  '.manifesto-content',
  '.project-card',
  '.awards-wrapper',
  '.process-col',
  '.gallery-figure',
  '.cta-content',
  '.ficha-tecnica-wrapper',
  'main section h2',
].join(',');

let observer: IntersectionObserver | null = null;

function initReveal() {
  observer?.disconnect();
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer?.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );

  const els = Array.from(document.querySelectorAll<HTMLElement>(TARGETS));
  const viewportBottom = window.innerHeight;

  els.forEach((el) => {
    // O que já está na tela ao carregar não anima (evita "piscar" o conteúdo inicial)
    if (el.getBoundingClientRect().top < viewportBottom) return;
    // Pequeno escalonamento entre irmãos (cards e etapas lado a lado)
    const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
    const index = Math.max(0, siblings.indexOf(el)) % 4;
    el.style.setProperty('--reveal-delay', `${index * 70}ms`);
    el.classList.add('reveal');
    observer!.observe(el);
  });
}

document.addEventListener('astro:page-load', initReveal);

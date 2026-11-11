/**
 * Lightbox nativo baseado na API <dialog> do HTML5
 * Suporta navegação por teclado (Esc, ArrowLeft, ArrowRight) e gestos swipe no mobile.
 * Peso: < 2.5 KB (Vanilla TypeScript, sem dependências externas)
 */

export interface LightboxItem {
  src: string;
  alt: string;
  caption?: string;
}

// Ouvintes globais da página anterior são descartados a cada navegação (ClientRouter)
let controller: AbortController | null = null;

export function initLightbox() {
  controller?.abort();
  controller = new AbortController();
  const { signal } = controller;

  const dialog = document.getElementById('project-lightbox') as HTMLDialogElement | null;
  if (!dialog) return;

  const imgElement = dialog.querySelector<HTMLImageElement>('[data-lightbox-image]');
  const captionElement = dialog.querySelector<HTMLElement>('[data-lightbox-caption]');
  const counterElement = dialog.querySelector<HTMLElement>('[data-lightbox-counter]');
  const prevBtn = dialog.querySelector<HTMLButtonElement>('[data-lightbox-prev]');
  const nextBtn = dialog.querySelector<HTMLButtonElement>('[data-lightbox-next]');
  const closeBtn = dialog.querySelector<HTMLButtonElement>('[data-lightbox-close]');

  const triggers = Array.from(document.querySelectorAll<HTMLElement>('[data-lightbox-trigger]'));
  if (triggers.length === 0) return;

  const items: LightboxItem[] = triggers.map((trigger) => ({
    src: trigger.getAttribute('data-lightbox-src') || '',
    alt: trigger.getAttribute('data-lightbox-alt') || '',
    caption: trigger.getAttribute('data-lightbox-caption') || '',
  }));

  let currentIndex = 0;
  let lastActiveElement: HTMLElement | null = null;

  function updateView(index: number) {
    if (items.length === 0) return;
    currentIndex = (index + items.length) % items.length;
    const current = items[currentIndex];

    if (imgElement) {
      imgElement.src = current.src;
      imgElement.alt = current.alt;
    }

    if (captionElement) {
      captionElement.textContent = current.caption || current.alt || '';
    }

    if (counterElement) {
      const currentFormatted = String(currentIndex + 1).padStart(2, '0');
      const totalFormatted = String(items.length).padStart(2, '0');
      counterElement.textContent = `${currentFormatted} / ${totalFormatted}`;
    }
  }

  function open(index: number) {
    lastActiveElement = document.activeElement as HTMLElement;
    updateView(index);
    dialog?.showModal();
    document.body.style.overflow = 'hidden';
  }

  function close() {
    dialog?.close();
    document.body.style.overflow = '';
    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  }

  function next() {
    updateView(currentIndex + 1);
  }

  function prev() {
    updateView(currentIndex - 1);
  }

  // Event Listeners dos botões de disparo
  triggers.forEach((trigger, index) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      open(index);
    });
  });

  prevBtn?.addEventListener('click', prev);
  nextBtn?.addEventListener('click', next);
  closeBtn?.addEventListener('click', close);

  // Fechar ao clicar no backdrop do dialog
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
      close();
    }
  });

  // Controle de teclado (Esc fecha por padrão no dialog nativo)
  window.addEventListener('keydown', (e) => {
    if (!dialog.open) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    } else if (e.key === 'Escape') {
      close();
    }
  }, { signal });

  // Detecção de gestos Swipe no mobile
  let touchStartX = 0;
  let touchEndX = 0;

  dialog.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  dialog.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    const threshold = 40; // sensibilidade em pixels

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        next(); // Deslizou para a esquerda → Próxima
      } else {
        prev(); // Deslizou para a direita → Anterior
      }
    }
  }, { passive: true });
}


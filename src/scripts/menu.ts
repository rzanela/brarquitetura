// Controle do Menu Mobile Editorial (< 1 KB vanilla TS)
export function initMenu() {
  const toggleBtn = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menuOverlay = document.querySelector<HTMLElement>('[data-menu-overlay]');
  const menuLinks = document.querySelectorAll<HTMLAnchorElement>('[data-menu-overlay] a');

  if (!toggleBtn || !menuOverlay) return;

  let isOpen = false;

  function toggleMenu(force?: boolean) {
    isOpen = typeof force === 'boolean' ? force : !isOpen;
    
    toggleBtn?.setAttribute('aria-expanded', String(isOpen));
    menuOverlay?.setAttribute('aria-hidden', String(!isOpen));
    
    if (isOpen) {
      menuOverlay?.classList.add('is-open');
      toggleBtn!.textContent = 'Fechar [×]';
      document.body.style.overflow = 'hidden';
      // Focar o primeiro link do menu
      const firstLink = menuLinks[0];
      firstLink?.focus();
    } else {
      menuOverlay?.classList.remove('is-open');
      toggleBtn!.textContent = 'Menu';
      document.body.style.overflow = '';
      toggleBtn?.focus();
    }
  }

  toggleBtn.addEventListener('click', () => toggleMenu());

  // Fechar ao clicar em qualquer item
  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (isOpen) toggleMenu(false);
    });
  });

  // Fechar com tecla Escape
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen) {
      toggleMenu(false);
    }
  });
}


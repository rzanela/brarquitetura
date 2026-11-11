// Controle do Menu Mobile Editorial (< 1 KB vanilla TS)
// Chamado a cada astro:page-load; o `signal` remove os ouvintes globais da página anterior.
export function initMenu(signal?: AbortSignal) {
  const toggleBtn = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menuOverlay = document.querySelector<HTMLElement>('[data-menu-overlay]');
  const menuLinks = document.querySelectorAll<HTMLAnchorElement>('[data-menu-overlay] a');

  if (!toggleBtn || !menuOverlay) return;

  let isOpen = false;
  // Garante estado limpo ao chegar numa nova página
  document.body.style.overflow = '';

  function toggleMenu(force?: boolean, restoreFocus = true) {
    isOpen = typeof force === 'boolean' ? force : !isOpen;

    toggleBtn!.setAttribute('aria-expanded', String(isOpen));
    toggleBtn!.setAttribute('aria-label', isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
    menuOverlay!.setAttribute('aria-hidden', String(!isOpen));

    if (isOpen) {
      menuOverlay!.classList.add('is-open');
      toggleBtn!.textContent = 'Fechar [×]';
      document.body.style.overflow = 'hidden';
      menuLinks[0]?.focus();
    } else {
      menuOverlay!.classList.remove('is-open');
      toggleBtn!.textContent = 'Menu';
      document.body.style.overflow = '';
      if (restoreFocus) toggleBtn!.focus();
    }
  }

  toggleBtn.addEventListener('click', () => toggleMenu());

  // Fechar ao escolher um item (sem devolver o foco: a página vai mudar)
  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (isOpen) toggleMenu(false, false);
    });
  });

  // Fechar com tecla Escape
  window.addEventListener(
    'keydown',
    (event) => {
      if (event.key === 'Escape' && isOpen) toggleMenu(false);
    },
    { signal }
  );
}

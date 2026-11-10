/**
 * Filtragem de projetos e alternador Grade ⇄ Lista
 * Inclui preview flutuante da capa seguindo o cursor na visão em Lista.
 * Vanilla TypeScript leve (< 2 KB). Sem dependências.
 */

export function initProjectFilters() {
  const filterButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-filter-btn]'));
  const projectItems = Array.from(document.querySelectorAll<HTMLElement>('[data-project-item]'));
  const countElement = document.querySelector<HTMLElement>('[data-project-count]');
  const viewButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-view-btn]'));
  const gridView = document.querySelector<HTMLElement>('[data-view="grid"]');
  const listView = document.querySelector<HTMLElement>('[data-view="list"]');
  const cursorPreview = document.querySelector<HTMLElement>('[data-cursor-preview]');
  const previewImg = cursorPreview?.querySelector<HTMLImageElement>('img');

  if (filterButtons.length === 0 && viewButtons.length === 0) return;

  // 1. Filtragem por categoria
  function applyFilter(category: string) {
    let visibleCount = 0;

    projectItems.forEach((item) => {
      const itemCat = item.getAttribute('data-categoria');
      const itemStatus = item.getAttribute('data-status');

      let matches = false;
      if (category === 'todos') {
        matches = true;
      } else if (category === 'em-andamento') {
        matches = itemStatus === 'em-andamento';
      } else {
        matches = itemCat === category;
      }

      if (matches) {
        item.style.display = '';
        // Contamos apenas os itens da grade para não duplicar na contagem
        if (item.closest('[data-view="grid"]')) {
          visibleCount++;
        }
      } else {
        item.style.display = 'none';
      }
    });

    // Atualiza contagem na interface
    if (countElement) {
      countElement.textContent = String(visibleCount);
    }

    // Atualiza estado ativo dos botões de filtro
    filterButtons.forEach((btn) => {
      const btnFilter = btn.getAttribute('data-filter-btn');
      const isActive = btnFilter === category;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetFilter = btn.getAttribute('data-filter-btn') || 'todos';
      applyFilter(targetFilter);
    });
  });

  // 2. Alternador Grade ⇄ Lista
  function switchView(view: 'grid' | 'list') {
    if (view === 'grid') {
      if (gridView) gridView.style.display = '';
      if (listView) listView.style.display = 'none';
    } else {
      if (gridView) gridView.style.display = 'none';
      if (listView) listView.style.display = '';
    }

    viewButtons.forEach((btn) => {
      const btnView = btn.getAttribute('data-view-btn');
      const isActive = btnView === view;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });

    try {
      localStorage.setItem('brarq_projects_view', view);
    } catch {
      // Ignora erro em ambientes restritos de storage
    }
  }

  viewButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = (btn.getAttribute('data-view-btn') as 'grid' | 'list') || 'grid';
      switchView(targetView);
    });
  });

  // Restaurar visualização salva se disponível
  try {
    const savedView = localStorage.getItem('brarq_projects_view') as 'grid' | 'list' | null;
    if (savedView === 'list' || savedView === 'grid') {
      switchView(savedView);
    }
  } catch {
    // Fallback padrão
  }

  // 3. Preview flutuante seguindo o cursor na lista (Desktop)
  if (cursorPreview && previewImg) {
    const listRows = Array.from(document.querySelectorAll<HTMLElement>('[data-preview-src]'));

    listRows.forEach((row) => {
      const src = row.getAttribute('data-preview-src');

      row.addEventListener('mouseenter', () => {
        if (!src) return;
        previewImg.src = src;
        cursorPreview.style.opacity = '1';
      });

      row.addEventListener('mousemove', (e) => {
        // Posicionamento suave com offset
        const x = e.clientX + 24;
        const y = e.clientY - 90;
        cursorPreview.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });

      row.addEventListener('mouseleave', () => {
        cursorPreview.style.opacity = '0';
      });
    });
  }
}


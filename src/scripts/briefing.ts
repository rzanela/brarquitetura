import { trackEvent } from './analytics';

/**
 * Controlador do Formulário de Briefing Multi-Step (seção 7.2)
 * Características:
 * - Validação por etapa nativa com acessibilidade
 * - Rascunho automático em localStorage (try/catch)
 * - Captura automática de UTMs e projeto de origem
 * - Máscara de telefone brasileira
 * - Envio assíncrono para Web3Forms com fallback nativo sem JS
 * - Redirecionamento para /contato/obrigado/
 */

const STORAGE_KEY = 'brarq_briefing_draft';

export function initBriefing() {
  const form = document.getElementById('briefing-form') as HTMLFormElement | null;
  if (!form) return;

  const steps = Array.from(form.querySelectorAll<HTMLFieldSetElement>('[data-step]'));
  const progressText = form.querySelector<HTMLElement>('[data-progress-text]');
  const progressBar = form.querySelector<HTMLElement>('[data-progress-bar]');
  const prevBtn = form.querySelector<HTMLButtonElement>('[data-step-prev]');
  const nextBtn = form.querySelector<HTMLButtonElement>('[data-step-next]');
  const submitBtn = form.querySelector<HTMLButtonElement>('[data-step-submit]');
  const phoneInput = form.querySelector<HTMLInputElement>('input[name="whatsapp"]');
  const projectOriginInput = form.querySelector<HTMLInputElement>('input[name="projeto_origem"]');
  const projectReferencedNotice = form.querySelector<HTMLElement>('[data-project-notice]');

  let currentStep = 1;
  const totalSteps = steps.length;

  // Ativa a classe que habilita o comportamento de abas multi-step
  form.classList.add('js-multi-step');

  // 1. Captura de parâmetros da URL (projeto_origem e UTMs)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const projeto = urlParams.get('projeto');
    if (projeto && projectOriginInput) {
      projectOriginInput.value = projeto;
      if (projectReferencedNotice) {
        projectReferencedNotice.textContent = `Referência: Projeto ${projeto}`;
        projectReferencedNotice.style.display = 'block';
      }
    }

    ['utm_source', 'utm_medium', 'utm_campaign'].forEach((utm) => {
      const val = urlParams.get(utm);
      const input = form.querySelector<HTMLInputElement>(`input[name="${utm}"]`);
      if (val && input) {
        input.value = val;
      }
    });

    const entryInput = form.querySelector<HTMLInputElement>('input[name="pagina_entrada"]');
    if (entryInput) {
      entryInput.value = `${window.location.pathname} (ref: ${document.referrer || 'direto'})`;
    }
  } catch {
    // Ignora em caso de erro na URL
  }

  // 2. Máscara de telefone brasileira no campo WhatsApp
  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      let v = phoneInput.value.replace(/\D/g, '');
      if (v.length > 11) v = v.substring(0, 11);

      if (v.length > 6) {
        phoneInput.value = `(${v.substring(0, 2)}) ${v.substring(2, 7)}-${v.substring(7)}`;
      } else if (v.length > 2) {
        phoneInput.value = `(${v.substring(0, 2)}) ${v.substring(2)}`;
      } else if (v.length > 0) {
        phoneInput.value = `(${v}`;
      }
    });
  }

  // 3. Persistência de rascunho em localStorage
  function saveDraft() {
    try {
      const formData = new FormData(form);
      const draft: Record<string, any> = {};
      formData.forEach((value, key) => {
        if (key !== 'botcheck') {
          draft[key] = value;
        }
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // Ignora erro de storage restrito
    }
  }

  function loadDraft() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const draft = JSON.parse(saved);

      Object.entries(draft).forEach(([key, val]) => {
        const field = form?.elements.namedItem(key);
        if (!field) return;

        if (field instanceof RadioNodeList) {
          field.value = String(val);
        } else if (field instanceof HTMLInputElement && field.type === 'checkbox') {
          field.checked = Boolean(val);
        } else if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement) {
          field.value = String(val);
        }
      });
    } catch {
      // Falha silenciosa
    }
  }

  form.addEventListener('input', saveDraft);
  form.addEventListener('change', saveDraft);
  loadDraft();

  // 4. Navegação entre etapas
  function showStep(stepIndex: number) {
    currentStep = stepIndex;

    steps.forEach((step, idx) => {
      const isCurrent = idx + 1 === currentStep;
      step.classList.toggle('is-active', isCurrent);
      step.setAttribute('aria-hidden', String(!isCurrent));
    });

    if (progressText) {
      progressText.textContent = `Etapa ${currentStep} de ${totalSteps}`;
    }

    if (progressBar) {
      const pct = ((currentStep) / totalSteps) * 100;
      progressBar.style.width = `${pct}%`;
    }

    if (prevBtn) {
      prevBtn.style.display = currentStep > 1 ? 'inline-flex' : 'none';
    }

    if (nextBtn) {
      nextBtn.style.display = currentStep < totalSteps ? 'inline-flex' : 'none';
    }

    if (submitBtn) {
      submitBtn.style.display = currentStep === totalSteps ? 'inline-flex' : 'none';
    }

    // Foca o primeiro elemento focável da nova etapa
    const activeStepEl = steps[currentStep - 1];
    const firstFocusable = activeStepEl?.querySelector<HTMLElement>('input, select, textarea, button');
    firstFocusable?.focus();

    trackEvent({ name: 'briefing_step', step: currentStep, total: totalSteps });
  }

  function validateCurrentStep(): boolean {
    const activeStepEl = steps[currentStep - 1];
    if (!activeStepEl) return true;

    const fields = Array.from(activeStepEl.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input, select, textarea'));
    for (const field of fields) {
      if (!field.checkValidity()) {
        field.reportValidity();
        return false;
      }
    }
    return true;
  }

  nextBtn?.addEventListener('click', () => {
    if (validateCurrentStep()) {
      showStep(currentStep + 1);
    }
  });

  prevBtn?.addEventListener('click', () => {
    showStep(currentStep - 1);
  });

  // 5. Envio do formulário com feedback assíncrono
  form.addEventListener('submit', async (e) => {
    if (!validateCurrentStep()) {
      e.preventDefault();
      return;
    }

    // Honeypot check antispam
    const botcheck = form.querySelector<HTMLInputElement>('input[name="botcheck"]');
    if (botcheck && botcheck.checked) {
      e.preventDefault();
      return;
    }

    e.preventDefault();

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando briefing...';
    }

    const formData = new FormData(form);
    const clientName = (formData.get('nome') as string) || '';
    const projectName = (formData.get('projeto_origem') as string) || '';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      const result = await response.json();

      if (response.status === 200 && result.success) {
        trackEvent({ name: 'briefing_submit', projeto: projectName });
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {}

        // Redirecionamento para a página de agradecimento da seção 7.2
        const params = new URLSearchParams();
        if (clientName) params.set('nome', clientName);
        if (projectName) params.set('projeto', projectName);

        const baseUrl = (document.querySelector('meta[name="base-url"]')?.getAttribute('content') || '/').replace(/\/$/, '');
        window.location.href = `${baseUrl}/contato/obrigado/?${params.toString()}`;
      } else {
        throw new Error(result.message || 'Erro ao processar o envio.');
      }
    } catch (err: any) {
      alert(`Houve uma falha ao enviar: ${err.message || 'Por favor, tente novamente ou fale pelo WhatsApp.'}`);
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Enviar briefing</span> <span class="arrow" aria-hidden="true">→</span>';
      }
    }
  });

  // Inicia na etapa 1
  showStep(1);
}


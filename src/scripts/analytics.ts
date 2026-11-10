/**
 * Módulo de telemetria e eventos leves sem cookies (seção 7.3)
 * Compatível com Vercel Web Analytics e Umami.
 * Sem rastreadores intrusivos nem cookies LGPD.
 * Orçamento: < 1 KB
 */

export type AnalyticsEvent = 
  | { name: 'whatsapp_click'; origem: string; projeto?: string }
  | { name: 'briefing_step'; step: number; total: number }
  | { name: 'briefing_submit'; projeto?: string }
  | { name: 'projeto_view'; slug: string };

declare global {
  interface Window {
    va?: (action: string, event: { name: string; data?: Record<string, any> }) => void;
    umami?: {
      track: (eventName: string, eventData?: Record<string, any>) => void;
    };
  }
}

export function trackEvent(event: AnalyticsEvent) {
  try {
    // 1. Vercel Web Analytics
    if (typeof window !== 'undefined' && typeof window.va === 'function') {
      window.va('event', {
        name: event.name,
        data: event
      });
    }

    // 2. Umami Analytics
    if (typeof window !== 'undefined' && window.umami && typeof window.umami.track === 'function') {
      window.umami.track(event.name, event);
    }

    // 3. Dispatch de evento DOM customizado para escuta local
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('brarq:analytics', { detail: event }));
    }

    if (import.meta.env.DEV) {
      console.log(`[Analytics Event] ${event.name}:`, event);
    }
  } catch (err) {
    // Falha silenciosa para não travar a experiência do usuário
  }
}


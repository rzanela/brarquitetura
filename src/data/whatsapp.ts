import { siteData } from './site';

export interface WhatsAppContext {
  origem: 'geral' | 'projeto' | 'categoria' | 'pos-briefing';
  projetoNome?: string;
  categoriaNome?: 'residencial' | 'comercial' | 'de interiores' | string;
  clienteNome?: string;
}

export const whatsappMessages = {
  geral: "Olá! Vim pelo site da BrArq e gostaria de conversar sobre um projeto.",
  projeto: (nome: string) => `Olá! Vi o projeto ${nome} no site e gostaria de algo nessa linha.`,
  categoria: (tipo: string) => `Olá! Tenho interesse em um projeto ${tipo}.`,
  posBriefing: (nome: string) => `Olá! Acabei de enviar um briefing pelo site, meu nome é ${nome}.`
};

export function getWhatsAppNumber(): string {
  // Retorna o número configurado ou fallback padrão
  return siteData.contact.whatsapp.replace(/\D/g, '') || "5547900000000";
}

export function buildWhatsAppUrl(context?: WhatsAppContext): string {
  const number = getWhatsAppNumber();
  let text = whatsappMessages.geral;

  if (context) {
    switch (context.origem) {
      case 'projeto':
        if (context.projetoNome) {
          text = whatsappMessages.projeto(context.projetoNome);
        }
        break;
      case 'categoria':
        if (context.categoriaNome) {
          text = whatsappMessages.categoria(context.categoriaNome);
        }
        break;
      case 'pos-briefing':
        if (context.clienteNome) {
          text = whatsappMessages.posBriefing(context.clienteNome);
        }
        break;
      case 'geral':
      default:
        text = whatsappMessages.geral;
        break;
    }
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}


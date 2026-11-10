export interface SiteConfig {
  name: string;
  legalName: string;
  shortName: string;
  tagline: string;
  description: string;
  url: string;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    fullFormatted: string;
  };
  contact: {
    phone: string;
    phoneFormatted: string;
    whatsapp: string;
    whatsappFormatted: string;
    email: string;
  };
  hours: {
    display: string;
    days: string[];
    opens: string;
    closes: string;
  };
  geo: {
    latitude: number;
    longitude: number;
    displayCoordinates: string;
  };
  cau: string;
  social: {
    instagram: string;
    instagramHandle: string;
  };
  partners: {
    name: string;
    role: string;
    cau: string;
  }[];
}

export const siteData: SiteConfig = {
  name: "Borges e Robles Arquitetura",
  legalName: "Borges e Robles Arquitetura Ltda.",
  shortName: "BrArq",
  tagline: "Arquitetura e Interiores em Joinville/SC",
  description: "Projetamos casas e espaços de trabalho a partir do terreno, da luz e de quem vai viver neles. Escritório de arquitetura de alto padrão em Joinville e Norte Catarinense.",
  url: "https://brarquitetura.com.br",
  address: {
    street: "Rua Lages, 743",
    neighborhood: "[SUBSTITUIR: bairro da Rua Lages, 743]",
    city: "Joinville",
    state: "SC",
    postalCode: "[SUBSTITUIR: CEP]",
    country: "BR",
    fullFormatted: "Rua Lages, 743 — [SUBSTITUIR: bairro e CEP] — Joinville/SC"
  },
  contact: {
    phone: "[SUBSTITUIR: +554730000000]",
    phoneFormatted: "[SUBSTITUIR: (47) 3000-0000]",
    whatsapp: "[SUBSTITUIR: 5547900000000]",
    whatsappFormatted: "[SUBSTITUIR: (47) 90000-0000]",
    email: "[SUBSTITUIR: contato@brarquitetura.com.br]"
  },
  hours: {
    display: "[SUBSTITUIR: Segunda a sexta, das 09h às 18h]",
    days: ["Mo", "Tu", "We", "Th", "Fr"],
    opens: "09:00",
    closes: "18:00"
  },
  geo: {
    // Coordenadas aproximadas centrais de Joinville, validar ponto exato da Rua Lages 743
    latitude: -26.3045,
    longitude: -48.8487,
    displayCoordinates: "26°18' S, 48°50' O [VALIDAR: coordenadas exatas da Rua Lages, 743]"
  },
  cau: "[SUBSTITUIR: registro dos sócios no CAU/SC]",
  social: {
    instagram: "https://instagram.com/brarquitetura",
    instagramHandle: "@brarquitetura"
  },
  partners: [
    {
      name: "[SUBSTITUIR: Nome do Arquiteto Borges]",
      role: "Sócio-fundador e Arquiteto",
      cau: "[SUBSTITUIR: CAU nº]"
    },
    {
      name: "[SUBSTITUIR: Nome do Arquiteto Robles]",
      role: "Sócio-fundador e Arquiteto",
      cau: "[SUBSTITUIR: CAU nº]"
    }
  ]
};


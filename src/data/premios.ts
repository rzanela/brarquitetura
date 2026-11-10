export interface AwardItem {
  ano: number;
  premio: string;
  projeto: string;
  entidade?: string;
  categoria?: string;
  destaque?: boolean;
}

// Lista de prêmios e reconhecimentos
// REGRA: Apenas dados confirmados pelo cliente. Itens pendentes utilizam [SUBSTITUIR] e [VALIDAR].
export const awardsData: AwardItem[] = [
  {
    ano: 2023,
    premio: "[SUBSTITUIR: Prêmio Regional de Arquitetura — AsBEA/SC ou IAB]",
    projeto: "Casa RB",
    entidade: "[SUBSTITUIR: Entidade Organizadora]",
    categoria: "Arquitetura Residencial",
    destaque: true
  },
  {
    ano: 2022,
    premio: "[SUBSTITUIR: Menção Honrosa ou Destaque Comercial]",
    projeto: "Madville",
    entidade: "[SUBSTITUIR: Entidade Organizadora]",
    categoria: "Arquitetura Comercial",
    destaque: true
  },
  {
    ano: 2021,
    premio: "[SUBSTITUIR: Publicação em Anuário / Portal Especializado]",
    projeto: "[SUBSTITUIR: Nome do Projeto]",
    entidade: "[SUBSTITUIR: Veículo de Imprensa / Portal]",
    categoria: "Arquitetura & Interiores",
    destaque: false
  }
];


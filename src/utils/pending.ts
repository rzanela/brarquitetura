// Marcadores de conteúdo pendente de validação com o cliente.
// Campos com [VALIDAR…] ou [SUBSTITUIR…] continuam no código-fonte como lembrete,
// mas nunca são exibidos: cada componente esconde o campo até chegar o dado real.

const PENDING = /\[(VALIDAR|SUBSTITUIR)\b/i;

export function isPending(value?: string | null): boolean {
  return !value || PENDING.test(value);
}

/** Retorna o valor apenas se já estiver confirmado; caso contrário, undefined. */
export function confirmed(value?: string | null): string | undefined {
  return isPending(value) ? undefined : (value as string);
}

/** Filtra listas, mantendo só os itens confirmados. */
export function confirmedList(values?: string[] | null): string[] {
  return (values ?? []).filter((v) => !isPending(v));
}

/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_1_external/auth/authorityMap.ts" enhancement="_blank"/>
export const entries = [
  {
    "grantId": "colaboradorGerenciaPropriasDespesas",
    "actorRef": "colaborador"
  },
  {
    "grantId": "financeiroConsultaEpagaDespesasAprovadas",
    "actorRef": "financeiro"
  },
  {
    "grantId": "gestorAnalisaDespesasDaEquipe",
    "actorRef": "gestorEquipe"
  }
] as const;

export function actorRefFor(grantId: string): string | null {
  const entry = entries.find(item => item.grantId === grantId);
  return entry ? entry.actorRef : null;
}

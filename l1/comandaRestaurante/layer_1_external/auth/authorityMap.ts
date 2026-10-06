/// <mls fileReference="_102047_/l1/comandaRestaurante/layer_1_external/auth/authorityMap.ts" enhancement="_blank"/>
export const entries = [
  {
    "grantId": "caixaFechamentoEcadastroOperacional",
    "actorRef": "caixa"
  },
  {
    "grantId": "garcomAtendimentoComandas",
    "actorRef": "garcom"
  }
] as const;

export function actorRefFor(grantId: string): string | null {
  const entry = entries.find(item => item.grantId === grantId);
  return entry ? entry.actorRef : null;
}

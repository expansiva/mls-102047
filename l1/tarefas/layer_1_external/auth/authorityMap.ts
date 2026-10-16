/// <mls fileReference="_102047_/l1/tarefas/layer_1_external/auth/authorityMap.ts" enhancement="_blank"/>
export const entries = [
  {
    "grantId": "gestorAvisosProprios",
    "actorRef": "gestor"
  },
  {
    "grantId": "gestorListas",
    "actorRef": "gestor"
  },
  {
    "grantId": "gestorMembros",
    "actorRef": "gestor"
  },
  {
    "grantId": "gestorTarefasEquipe",
    "actorRef": "gestor"
  },
  {
    "grantId": "membroAvisosProprios",
    "actorRef": "membroEquipe"
  },
  {
    "grantId": "membroConsultaListas",
    "actorRef": "membroEquipe"
  },
  {
    "grantId": "membroEscolheResponsavel",
    "actorRef": "membroEquipe"
  },
  {
    "grantId": "membroTarefasProprias",
    "actorRef": "membroEquipe"
  }
] as const;

export function actorRefFor(grantId: string): string | null {
  const entry = entries.find(item => item.grantId === grantId);
  return entry ? entry.actorRef : null;
}

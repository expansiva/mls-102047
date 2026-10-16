/// <mls fileReference="_102047_/l4/tarefas/integration.defs.ts" enhancement="_blank"/>

import type { Ns5IntegrationArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const tarefasIntegration = {
  "schemaVersion": "2026-09-12-ns5-integration-v2",
  "moduleName": "tarefas",
  "inbound": [],
  "outbound": [
    {
      "id": "tarefaConcluida",
      "kind": "event",
      "to": "any",
      "event": "tarefaConcluida",
      "on": "Tarefa.aceitar",
      "description": "Publicado quando quem criou aceita a entrega e a tarefa passa para concluída; o registro da Tarefa nessa transição fica disponível para outros módulos que acompanhem entregas da equipe.",
      "entityRefs": [
        "Tarefa"
      ]
    },
    {
      "id": "tarefaCancelada",
      "kind": "event",
      "to": "any",
      "event": "tarefaCancelada",
      "on": "Tarefa.cancelar",
      "description": "Publicado quando quem criou ou o gestor cancela a tarefa; o registro da Tarefa nessa transição permite que outros módulos deixem de considerar a tarefa.",
      "entityRefs": [
        "Tarefa"
      ]
    }
  ],
  "plugins": []
} as const satisfies Ns5Readonly<Ns5IntegrationArtifact>;

export type TarefasIntegrationType = typeof tarefasIntegration;

export default tarefasIntegration;

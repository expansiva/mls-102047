/// <mls fileReference="_102047_/l4/manutencaoFrota/integration.defs.ts" enhancement="_blank"/>

import type { Ns5IntegrationArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const manutencaoFrotaIntegration = {
  "schemaVersion": "2026-09-12-ns5-integration-v2",
  "moduleName": "manutencaoFrota",
  "inbound": [],
  "outbound": [
    {
      "id": "ordemManutencaoConcluida",
      "kind": "event",
      "to": "any",
      "event": "ordemManutencaoConcluida",
      "on": "OrdemManutencao.concluir",
      "description": "Publicado quando o gestor conclui uma ordem de manutenção (preventiva ou corretiva). O registro da ordem concluída inclui veículo, oficina, descrição, custo e datas de entrada e saída, para que outros módulos (por exemplo, o controle de custos ou o financeiro) possam usar esses dados.",
      "entityRefs": [
        "OrdemManutencao",
        "Veiculo",
        "Oficina"
      ]
    }
  ],
  "plugins": []
} as const satisfies Ns5Readonly<Ns5IntegrationArtifact>;

export type ManutencaoFrotaIntegrationType = typeof manutencaoFrotaIntegration;

export default manutencaoFrotaIntegration;

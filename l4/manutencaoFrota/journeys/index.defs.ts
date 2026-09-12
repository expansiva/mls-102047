/// <mls fileReference="_102047_/l4/manutencaoFrota/journeys/index.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyIndexArtifact } from '/_102035_/l2/solution/types.js';

export const manutencaoFrotaJourneyIndex = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "moduleName": "manutencaoFrota",
  "journeys": [
    {
      "journeyId": "registrarAbastecimento",
      "actorRef": "motorista",
      "title": "Registrar abastecimento de veículo"
    },
    {
      "journeyId": "consultarVeiculosAtribuidos",
      "actorRef": "motorista",
      "title": "Consultar veículos atribuídos"
    },
    {
      "journeyId": "gerenciarPlanoPreventivo",
      "actorRef": "gestorFrota",
      "title": "Cadastrar plano de manutenção preventiva"
    },
    {
      "journeyId": "abrirOrdemManutencao",
      "actorRef": "gestorFrota",
      "title": "Abrir ordem de manutenção"
    },
    {
      "journeyId": "registrarConclusaoManutencao",
      "actorRef": "gestorFrota",
      "title": "Registrar conclusão de manutenção"
    },
    {
      "journeyId": "tratarAlertaPreventivaVencida",
      "actorRef": "gestorFrota",
      "title": "Tratar alerta de manutenção preventiva vencida"
    }
  ],
  "systemDecisions": []
} as const satisfies Ns5JourneyIndexArtifact;

export type ManutencaoFrotaJourneyIndexType = typeof manutencaoFrotaJourneyIndex;

export default manutencaoFrotaJourneyIndex;

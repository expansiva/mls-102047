/// <mls fileReference="_102047_/l4/reembolsoDespesas/journeys/index.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyIndexArtifact } from '/_102035_/l2/solution/types.js';

export const reembolsoDespesasJourneyIndex = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "moduleName": "reembolsoDespesas",
  "journeys": [
    {
      "journeyId": "registrarEenviarDespesa",
      "actorRef": "colaborador",
      "title": "Registrar e enviar despesa para aprovação"
    },
    {
      "journeyId": "consultarPropriasDespesas",
      "actorRef": "colaborador",
      "title": "Consultar próprias despesas"
    },
    {
      "journeyId": "corrigirEreenviarDespesa",
      "actorRef": "colaborador",
      "title": "Corrigir e reenviar despesa rejeitada"
    },
    {
      "journeyId": "avaliarDespesaDaEquipe",
      "actorRef": "gestorEquipe",
      "title": "Avaliar despesa da equipe"
    },
    {
      "journeyId": "registrarPagamentoDeDespesa",
      "actorRef": "financeiro",
      "title": "Registrar pagamento de despesa aprovada"
    }
  ],
  "systemDecisions": []
} as const satisfies Ns5JourneyIndexArtifact;

export type ReembolsoDespesasJourneyIndexType = typeof reembolsoDespesasJourneyIndex;

export default reembolsoDespesasJourneyIndex;

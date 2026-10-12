/// <mls fileReference="_102047_/l4/mensalidadesAcademia/journeys/index.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyIndexArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const mensalidadesAcademiaJourneyIndex = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "moduleName": "mensalidadesAcademia",
  "journeys": [
    {
      "journeyId": "cadastrarPlano",
      "actorRef": "gerencia",
      "title": "Cadastrar plano"
    },
    {
      "journeyId": "matricularAluno",
      "actorRef": "recepcao",
      "title": "Matricular aluno em plano"
    },
    {
      "journeyId": "gerarMensalidadesDoMes",
      "actorRef": "gerencia",
      "title": "Gerar mensalidades do mês"
    },
    {
      "journeyId": "registrarPagamento",
      "actorRef": "recepcao",
      "title": "Registrar pagamento de mensalidade"
    },
    {
      "journeyId": "verificarEntradaAluno",
      "actorRef": "recepcao",
      "title": "Verificar se o aluno pode entrar"
    },
    {
      "journeyId": "acompanharPainel",
      "actorRef": "gerencia",
      "title": "Acompanhar painel de mensalidades"
    }
  ],
  "systemDecisions": [
    {
      "decisionId": "dropInferredActorAluno",
      "chosen": "drop",
      "alternatives": [
        "keep"
      ],
      "decidedBy": "system"
    }
  ]
} as const satisfies Ns5Readonly<Ns5JourneyIndexArtifact>;

export type MensalidadesAcademiaJourneyIndexType = typeof mensalidadesAcademiaJourneyIndex;

export default mensalidadesAcademiaJourneyIndex;

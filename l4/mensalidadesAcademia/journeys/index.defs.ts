/// <mls fileReference="_102047_/l4/mensalidadesAcademia/journeys/index.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyIndexArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const mensalidadesAcademiaJourneyIndex = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "moduleName": "mensalidadesAcademia",
  "journeys": [
    {
      "journeyId": "manterPlanos",
      "actorRef": "gerencia",
      "title": "Manter planos da academia"
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
      "journeyId": "verificarAcessoAluno",
      "actorRef": "recepcao",
      "title": "Verificar entrada do aluno"
    },
    {
      "journeyId": "acompanharPainel",
      "actorRef": "gerencia",
      "title": "Acompanhar painel financeiro"
    },
    {
      "journeyId": "cancelarMatricula",
      "actorRef": "recepcao",
      "title": "Cancelar matrícula do aluno"
    }
  ],
  "systemDecisions": []
} as const satisfies Ns5Readonly<Ns5JourneyIndexArtifact>;

export type MensalidadesAcademiaJourneyIndexType = typeof mensalidadesAcademiaJourneyIndex;

export default mensalidadesAcademiaJourneyIndex;

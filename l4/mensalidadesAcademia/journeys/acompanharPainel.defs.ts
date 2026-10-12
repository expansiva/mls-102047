/// <mls fileReference="_102047_/l4/mensalidadesAcademia/journeys/acompanharPainel.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const acompanharPainelJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "acompanharPainel",
  "business": {
    "actorRef": "gerencia",
    "title": "Acompanhar painel financeiro",
    "goal": "Ver total a receber e recebido no mês e a quantidade de alunos ativos, bloqueados e inadimplentes.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "abrirPainel",
        "kind": "inspect",
        "entity": "PainelMensalidades",
        "title": "Abrir painel do mês",
        "description": "A gerência abre o painel com total a receber, total recebido e quantidades de alunos ativos, bloqueados e inadimplentes."
      },
      {
        "stepId": "listarInadimplentes",
        "kind": "locate",
        "entity": "Mensalidade",
        "title": "Ver mensalidades vencidas",
        "description": "A gerência consulta as mensalidades vencidas para identificar os alunos inadimplentes."
      }
    ],
    "outcome": {
      "statement": "A gerência conhece a situação financeira do mês e os alunos em atraso.",
      "evidence": [
        "Totais a receber e recebido do mês exibidos",
        "Quantidades de alunos ativos, bloqueados e inadimplentes exibidas"
      ]
    }
  },
  "businessHash": "sha256:b7e9b55cfad957c043879bab103909835adbc1b851fbbcb12d7e51f426e9bac4"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type AcompanharPainelJourneyType = typeof acompanharPainelJourney;

export default acompanharPainelJourney;

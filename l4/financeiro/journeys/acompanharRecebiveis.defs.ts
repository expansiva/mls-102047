/// <mls fileReference="_102047_/l4/financeiro/journeys/acompanharRecebiveis.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const acompanharRecebiveisJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "acompanharRecebiveis",
  "business": {
    "actorRef": "gerenteFinanceiro",
    "title": "Acompanhar painel de recebíveis",
    "goal": "Analisar os recebíveis por período e por origem e identificar os títulos vencidos.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "verPainel",
        "kind": "inspect",
        "entity": "TituloReceber",
        "title": "Ver painel de recebíveis",
        "description": "O gerente vê os totais a receber, recebidos e em aberto agrupados por período e por origem (restaurante, academia, assistência técnica)."
      },
      {
        "stepId": "listarVencidos",
        "kind": "locate",
        "entity": "TituloReceber",
        "title": "Listar títulos vencidos",
        "description": "O gerente filtra os títulos com vencimento passado e saldo em aberto."
      },
      {
        "stepId": "detalharVencido",
        "kind": "inspect",
        "entity": "TituloReceber",
        "title": "Detalhar título vencido",
        "description": "O gerente consulta pagador, origem, valor, vencimento e recebimentos do título vencido."
      }
    ],
    "outcome": {
      "statement": "O gerente conhece a posição dos recebíveis por período e origem e quais títulos estão vencidos.",
      "evidence": [
        "Totais por período e por origem exibidos",
        "Lista de títulos vencidos com pagador, valor e dias de atraso"
      ]
    }
  },
  "businessHash": "sha256:7fe9674142b70defc4f37f316f09b2f0e8578bd906500cacdc2de23088f8331e"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type AcompanharRecebiveisJourneyType = typeof acompanharRecebiveisJourney;

export default acompanharRecebiveisJourney;

/// <mls fileReference="_102047_/l4/mensalidadesAcademia/journeys/registrarPagamento.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const registrarPagamentoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "registrarPagamento",
  "business": {
    "actorRef": "recepcao",
    "title": "Registrar pagamento de mensalidade",
    "goal": "Registrar o pagamento de uma mensalidade com data, valor e forma.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarMensalidade",
        "kind": "locate",
        "entity": "Mensalidade",
        "title": "Localizar mensalidade do aluno",
        "description": "A recepção busca o aluno e localiza suas mensalidades em aberto ou vencidas."
      },
      {
        "stepId": "verMensalidade",
        "kind": "inspect",
        "entity": "Mensalidade",
        "title": "Ver detalhes da mensalidade",
        "description": "A recepção confere mês de referência, valor, vencimento e situação da mensalidade."
      },
      {
        "stepId": "lancarPagamento",
        "kind": "act",
        "entity": "Pagamento",
        "effect": "create",
        "title": "Lançar pagamento",
        "description": "A recepção registra data, valor e forma do pagamento, e a mensalidade passa a paga; se o aluno estava bloqueado e regularizou, ele é desbloqueado."
      }
    ],
    "outcome": {
      "statement": "O pagamento está registrado e a mensalidade quitada.",
      "evidence": [
        "A mensalidade aparece como paga com o pagamento vinculado (data, valor e forma).",
        "O total recebido do mês aumenta no painel."
      ]
    }
  },
  "businessHash": "sha256:8daa3ecae20f371de69cf7189af8c5833f503ea1db7a1a51d700c9df765c9bba"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type RegistrarPagamentoJourneyType = typeof registrarPagamentoJourney;

export default registrarPagamentoJourney;

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
        "title": "Buscar mensalidade do aluno",
        "description": "A recepção localiza as mensalidades em aberto ou vencidas do aluno."
      },
      {
        "stepId": "verMensalidade",
        "kind": "inspect",
        "entity": "Mensalidade",
        "title": "Ver detalhes da mensalidade",
        "description": "A recepção confere competência, valor, vencimento e situação da mensalidade."
      },
      {
        "stepId": "lancarPagamento",
        "kind": "act",
        "entity": "Pagamento",
        "effect": "create",
        "title": "Lançar pagamento",
        "description": "A recepção registra data, valor e forma do pagamento; a mensalidade passa a paga e, se o aluno regularizou as vencidas, ele deixa de estar bloqueado."
      }
    ],
    "outcome": {
      "statement": "A mensalidade fica quitada e a situação do aluno é atualizada.",
      "evidence": [
        "Pagamento registrado com data, valor e forma",
        "Mensalidade com situação paga",
        "Aluno desbloqueado quando não restam duas mensalidades vencidas"
      ]
    }
  },
  "businessHash": "sha256:883c9d719db1c0e2086eaece7eddf8fc61db7866abba877987aa9f4dfc2050b4"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type RegistrarPagamentoJourneyType = typeof registrarPagamentoJourney;

export default registrarPagamentoJourney;

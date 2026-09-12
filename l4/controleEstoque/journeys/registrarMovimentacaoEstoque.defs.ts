/// <mls fileReference="_102047_/l4/controleEstoque/journeys/registrarMovimentacaoEstoque.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const registrarMovimentacaoEstoqueJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "registrarMovimentacaoEstoque",
  "business": {
    "actorRef": "estoquista",
    "title": "Registrar movimentação de estoque",
    "goal": "Registrar uma entrada ou saída de unidades de um produto e atualizar sua disponibilidade.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarProduto",
        "kind": "locate",
        "entity": "Product",
        "title": "Localizar produto",
        "description": "Localiza o produto que terá unidades recebidas ou retiradas."
      },
      {
        "stepId": "consultarSaldoAtual",
        "kind": "inspect",
        "entity": "Product",
        "title": "Consultar saldo atual",
        "description": "Confere o saldo atual do produto antes do registro."
      },
      {
        "stepId": "registrarMovimentacao",
        "kind": "act",
        "entity": "StockMovement",
        "affects": [
          "Product"
        ],
        "title": "Registrar movimentação",
        "description": "Registra definitivamente a quantidade como entrada ou saída e atualiza o saldo disponível do produto."
      }
    ],
    "outcome": {
      "statement": "A entrada ou saída fica registrada de forma definitiva e o saldo atual do produto é atualizado.",
      "evidence": [
        "Movimentação de entrada ou saída registrada.",
        "Saldo atual do produto reflete a movimentação registrada."
      ]
    }
  },
  "businessHash": "sha256:f2df1a6f18bbcfdfb95727730e02315f8666c5c5638d1b704713243c86aadd24"
} as const satisfies Ns5JourneyArtifact;

export type RegistrarMovimentacaoEstoqueJourneyType = typeof registrarMovimentacaoEstoqueJourney;

export default registrarMovimentacaoEstoqueJourney;

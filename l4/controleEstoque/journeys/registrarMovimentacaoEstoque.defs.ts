/// <mls fileReference="_102047_/l4/controleEstoque/journeys/registrarMovimentacaoEstoque.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const registrarMovimentacaoEstoqueJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "registrarMovimentacaoEstoque",
  "business": {
    "actorRef": "estoquista",
    "title": "Registrar movimentação de estoque",
    "goal": "Registrar uma entrada ou saída de unidades de um produto e atualizar seu saldo disponível.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarProduto",
        "kind": "locate",
        "entity": "Produto",
        "title": "Localizar produto",
        "description": "Localiza o produto que receberá uma entrada ou terá unidades retiradas."
      },
      {
        "stepId": "consultarSaldoProduto",
        "kind": "inspect",
        "entity": "Produto",
        "title": "Consultar saldo do produto",
        "description": "Confere o saldo atual disponível do produto antes de registrar a movimentação."
      },
      {
        "stepId": "registrarMovimentacao",
        "kind": "act",
        "entity": "MovimentacaoEstoque",
        "effect": "create",
        "title": "Registrar movimentação",
        "description": "Registra uma entrada ou saída com produto, quantidade e as informações necessárias; o registro permanece imutável após ser realizado."
      }
    ],
    "outcome": {
      "statement": "A entrada ou saída é registrada de forma definitiva e o saldo atual do produto é atualizado.",
      "evidence": [
        "Há uma movimentação de entrada ou saída registrada para o produto.",
        "O saldo atual exibido para o produto reflete a quantidade movimentada."
      ]
    }
  },
  "businessHash": "sha256:3ddc7b95c4b6e8faaa0124826c6c3fb4c5ea2b09f2e029cbc28cf699caf3888b"
} as const satisfies Ns5JourneyArtifact;

export type RegistrarMovimentacaoEstoqueJourneyType = typeof registrarMovimentacaoEstoqueJourney;

export default registrarMovimentacaoEstoqueJourney;

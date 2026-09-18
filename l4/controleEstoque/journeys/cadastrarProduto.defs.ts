/// <mls fileReference="_102047_/l4/controleEstoque/journeys/cadastrarProduto.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const cadastrarProdutoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "cadastrarProduto",
  "business": {
    "actorRef": "estoquista",
    "title": "Cadastrar produto para controle de estoque",
    "goal": "Disponibilizar um produto para registro de movimentações, definindo seu saldo mínimo.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "registrarProduto",
        "kind": "act",
        "entity": "Produto",
        "effect": "create",
        "title": "Cadastrar produto",
        "description": "Cadastra ou vincula o produto ao controle de estoque e informa o saldo mínimo para aviso de reposição."
      }
    ],
    "outcome": {
      "statement": "O produto fica disponível para controle de estoque com saldo mínimo definido.",
      "evidence": [
        "O produto consta no controle de estoque com seu saldo mínimo.",
        "O produto pode receber registros de entrada e saída."
      ]
    }
  },
  "businessHash": "sha256:489a5944b44da7eecaed79790e99cd46e0e32026c53118142201f703551a113d"
} as const satisfies Ns5JourneyArtifact;

export type CadastrarProdutoJourneyType = typeof cadastrarProdutoJourney;

export default cadastrarProdutoJourney;

/// <mls fileReference="_102047_/l4/controleEstoque/journeys/cadastrarProduto.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const cadastrarProdutoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "cadastrarProduto",
  "business": {
    "actorRef": "estoquista",
    "title": "Cadastrar produto no estoque",
    "goal": "Disponibilizar um produto para controle de estoque com seu estoque mínimo.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "registrarProduto",
        "kind": "act",
        "entity": "Product",
        "title": "Registrar ou vincular produto",
        "description": "Registra ou vincula o produto ao módulo e informa o estoque mínimo que deve acionar aviso."
      }
    ],
    "outcome": {
      "statement": "O produto fica disponível para registro e acompanhamento de movimentações de estoque.",
      "evidence": [
        "Produto identificado no controle de estoque com estoque mínimo definido.",
        "O produto pode ser selecionado em movimentações de estoque."
      ]
    }
  },
  "businessHash": "sha256:c1b452042afb7f2446f255abb39564b393914239da9daae981f08d1c877fd0cb"
} as const satisfies Ns5JourneyArtifact;

export type CadastrarProdutoJourneyType = typeof cadastrarProdutoJourney;

export default cadastrarProdutoJourney;

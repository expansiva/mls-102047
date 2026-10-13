/// <mls fileReference="_102047_/l4/compras/journeys/atualizarPrecoCombinado.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const atualizarPrecoCombinadoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "atualizarPrecoCombinado",
  "business": {
    "actorRef": "comprador",
    "title": "Atualizar preço combinado",
    "goal": "Ajustar o preço combinado de um produto com um fornecedor.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarFornecedor",
        "kind": "locate",
        "entity": "Fornecedor",
        "title": "Localizar fornecedor",
        "description": "O comprador localiza o fornecedor pela razão social ou CNPJ."
      },
      {
        "stepId": "abrirProdutoFornecido",
        "kind": "inspect",
        "entity": "ProdutoFornecido",
        "title": "Abrir produto fornecido",
        "description": "O comprador abre o produto fornecido e vê o preço atual."
      },
      {
        "stepId": "alterarPreco",
        "kind": "act",
        "entity": "ProdutoFornecido",
        "effect": "update",
        "title": "Alterar preço combinado",
        "description": "O comprador informa o novo preço combinado com o fornecedor."
      }
    ],
    "outcome": {
      "statement": "O produto fornecido passa a ter o novo preço combinado.",
      "evidence": [
        "Preço combinado atualizado exibido na lista de produtos do fornecedor"
      ]
    }
  },
  "businessHash": "sha256:b4b12ed35a297ffb6ab562549f8990004f81aaa9771b96dca20ff86ab4bcd35d"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type AtualizarPrecoCombinadoJourneyType = typeof atualizarPrecoCombinadoJourney;

export default atualizarPrecoCombinadoJourney;

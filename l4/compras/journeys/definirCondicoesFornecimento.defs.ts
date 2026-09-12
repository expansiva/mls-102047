/// <mls fileReference="_102047_/l4/compras/journeys/definirCondicoesFornecimento.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const definirCondicoesFornecimentoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "definirCondicoesFornecimento",
  "business": {
    "actorRef": "comprador",
    "title": "Definir produtos e preços de um fornecedor",
    "goal": "Registrar quais produtos um fornecedor oferece e os preços combinados.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarFornecedor",
        "kind": "locate",
        "entity": "Supplier",
        "title": "Localizar fornecedor",
        "description": "Localiza o fornecedor que terá suas condições de fornecimento cadastradas."
      },
      {
        "stepId": "localizarProdutos",
        "kind": "locate",
        "entity": "Product",
        "title": "Localizar produtos",
        "description": "Localiza os produtos fornecidos pela empresa."
      },
      {
        "stepId": "registrarCondicoes",
        "kind": "act",
        "entity": "SupplyCondition",
        "affects": [
          "Supplier",
          "Product"
        ],
        "title": "Registrar condições de fornecimento",
        "description": "Registra os produtos fornecidos e o preço combinado para cada produto."
      }
    ],
    "outcome": {
      "statement": "Os produtos fornecidos e seus preços combinados ficam associados ao fornecedor.",
      "evidence": [
        "Condições de fornecimento registradas para o fornecedor.",
        "Cada condição apresenta o produto e o preço combinado."
      ]
    }
  },
  "businessHash": "sha256:6b01292bc86185af6218db9272fa2345ccdf544f83bfbc5fdb195cd706ccbd09"
} as const satisfies Ns5JourneyArtifact;

export type DefinirCondicoesFornecimentoJourneyType = typeof definirCondicoesFornecimentoJourney;

export default definirCondicoesFornecimentoJourney;

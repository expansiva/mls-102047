/// <mls fileReference="_102047_/l4/compras/journeys/cadastrarProdutoFornecido.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const cadastrarProdutoFornecidoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "cadastrarProdutoFornecido",
  "business": {
    "actorRef": "comprador",
    "title": "Cadastrar produto fornecido",
    "goal": "Registrar quais produtos um fornecedor fornece e o preço combinado de cada um.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarFornecedor",
        "kind": "locate",
        "entity": "Fornecedor",
        "title": "Localizar fornecedor",
        "description": "O comprador encontra o fornecedor na lista."
      },
      {
        "stepId": "verFornecedor",
        "kind": "inspect",
        "entity": "Fornecedor",
        "title": "Ver produtos do fornecedor",
        "description": "O comprador confere os produtos já fornecidos e seus preços combinados."
      },
      {
        "stepId": "incluirProdutoFornecido",
        "kind": "act",
        "entity": "ProdutoFornecido",
        "effect": "create",
        "title": "Incluir produto e preço",
        "description": "O comprador escolhe o produto e informa o preço combinado com o fornecedor."
      },
      {
        "stepId": "ajustarPreco",
        "kind": "act",
        "entity": "ProdutoFornecido",
        "effect": "update",
        "title": "Ajustar preço combinado",
        "description": "O comprador altera o preço combinado quando há nova negociação."
      }
    ],
    "outcome": {
      "statement": "O fornecedor tem os produtos que fornece com preço combinado.",
      "evidence": [
        "O produto aparece na lista do fornecedor com o preço combinado."
      ]
    }
  },
  "businessHash": "sha256:2a7cab6bc4cb255460ecd6efe45f6af45ff7c18f4aa814744c0d8d4bfbf72485"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type CadastrarProdutoFornecidoJourneyType = typeof cadastrarProdutoFornecidoJourney;

export default cadastrarProdutoFornecidoJourney;

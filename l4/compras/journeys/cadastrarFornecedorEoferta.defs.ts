/// <mls fileReference="_102047_/l4/compras/journeys/cadastrarFornecedorEoferta.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const cadastrarFornecedorEofertaJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "cadastrarFornecedorEoferta",
  "business": {
    "actorRef": "comprador",
    "title": "Cadastrar fornecedor e produtos fornecidos",
    "goal": "Registrar ou vincular um fornecedor e os produtos que ele fornece com o preço combinado.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "cadastrarFornecedor",
        "kind": "act",
        "entity": "Fornecedor",
        "effect": "create",
        "title": "x",
        "description": "Informa CNPJ, razão social e contato para criar ou vincular o fornecedor existente na base mestre."
      },
      {
        "stepId": "localizarProduto",
        "kind": "locate",
        "entity": "Produto",
        "title": "x",
        "description": "Localiza o produto que será associado ao fornecedor."
      },
      {
        "stepId": "registrarOfertaFornecedor",
        "kind": "act",
        "entity": "OfertaFornecedor",
        "effect": "create",
        "title": "x",
        "description": "Registra que o fornecedor fornece o produto e informa o preço combinado."
      }
    ],
    "outcome": {
      "statement": "O fornecedor fica disponível para compras com seus produtos e preços combinados registrados.",
      "evidence": [
        "Fornecedor identificado pelo CNPJ e razão social.",
        "Oferta do fornecedor apresenta o produto e o preço combinado."
      ]
    }
  },
  "businessHash": "sha256:d26a9d17fb44cb8aa30a9f12bf39bbb28e61c401718a099a1a2aeab98476ad96"
} as const satisfies Ns5JourneyArtifact;

export type CadastrarFornecedorEofertaJourneyType = typeof cadastrarFornecedorEofertaJourney;

export default cadastrarFornecedorEofertaJourney;

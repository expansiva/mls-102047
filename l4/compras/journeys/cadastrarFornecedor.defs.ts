/// <mls fileReference="_102047_/l4/compras/journeys/cadastrarFornecedor.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const cadastrarFornecedorJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "cadastrarFornecedor",
  "business": {
    "actorRef": "comprador",
    "title": "Cadastrar fornecedor e produtos fornecidos",
    "goal": "Manter um fornecedor disponível para compras, com os produtos que fornece e os preços combinados.",
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
        "description": "Cadastra ou vincula o fornecedor identificado pelo CNPJ, com razão social e contato."
      },
      {
        "stepId": "registrarProdutosFornecidos",
        "kind": "act",
        "entity": "ProdutoFornecedor",
        "effect": "create",
        "title": "x",
        "description": "Registra para o fornecedor os produtos que ele fornece e o preço combinado para cada produto."
      }
    ],
    "outcome": {
      "statement": "O fornecedor fica disponível para uso em pedidos de compra, com seu catálogo de produtos e preços combinados.",
      "evidence": [
        "Fornecedor identificado por CNPJ com razão social e contato cadastrados.",
        "Produtos fornecidos e respectivos preços combinados registrados para o fornecedor."
      ]
    }
  },
  "businessHash": "sha256:2af8b27df2e26f1d629f679e4acb030bffe72599ee67a9e63e7aee0cc3f2fa4d"
} as const satisfies Ns5JourneyArtifact;

export type CadastrarFornecedorJourneyType = typeof cadastrarFornecedorJourney;

export default cadastrarFornecedorJourney;

/// <mls fileReference="_102047_/l4/compras/journeys/cadastrarFornecedor.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const cadastrarFornecedorJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "cadastrarFornecedor",
  "business": {
    "actorRef": "comprador",
    "title": "Cadastrar fornecedor e produtos fornecidos",
    "goal": "Registrar um fornecedor e os produtos que ele fornece com o preço combinado.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarFornecedor",
        "kind": "locate",
        "entity": "Fornecedor",
        "title": "Buscar fornecedor existente",
        "description": "O comprador busca o fornecedor por CNPJ ou razão social para evitar duplicidade."
      },
      {
        "stepId": "cadastrarFornecedor",
        "kind": "act",
        "entity": "Fornecedor",
        "effect": "create",
        "title": "Cadastrar fornecedor",
        "description": "O comprador registra a empresa com CNPJ, razão social e contato como fornecedor."
      },
      {
        "stepId": "incluirProdutoFornecido",
        "kind": "act",
        "entity": "ProdutoFornecido",
        "effect": "create",
        "title": "Incluir produto fornecido",
        "description": "O comprador associa um produto ao fornecedor informando o preço combinado."
      },
      {
        "stepId": "conferirProdutosFornecidos",
        "kind": "inspect",
        "entity": "ProdutoFornecido",
        "title": "Conferir produtos do fornecedor",
        "description": "O comprador revisa a lista de produtos e preços combinados do fornecedor."
      }
    ],
    "outcome": {
      "statement": "O fornecedor está cadastrado com os produtos que fornece e seus preços combinados.",
      "evidence": [
        "Fornecedor aparece na busca por CNPJ",
        "Lista de produtos fornecidos exibe o preço combinado de cada produto"
      ]
    }
  },
  "businessHash": "sha256:ec463ef2ecc26ce4a16fcb9a3069e852134794380864be588866dc4ca17779b9"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type CadastrarFornecedorJourneyType = typeof cadastrarFornecedorJourney;

export default cadastrarFornecedorJourney;

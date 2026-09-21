/// <mls fileReference="_102047_/l4/compras/journeys/cadastrarFornecedorEcatalogo.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const cadastrarFornecedorEcatalogoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "cadastrarFornecedorEcatalogo",
  "business": {
    "actorRef": "comprador",
    "title": "Cadastrar fornecedor e produtos fornecidos",
    "goal": "Cadastrar ou vincular um fornecedor e definir os produtos que ele fornece com seus preços combinados.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarFornecedorPorCnpj",
        "kind": "locate",
        "entity": "Supplier",
        "title": "Localizar fornecedor por CNPJ",
        "description": "Localiza o fornecedor pelo CNPJ para reutilizar o cadastro mestre existente quando a empresa já estiver registrada."
      },
      {
        "stepId": "cadastrarOuVincularFornecedor",
        "kind": "act",
        "entity": "Supplier",
        "effect": "create",
        "title": "Cadastrar ou vincular fornecedor",
        "description": "Cadastra ou vincula a empresa fornecedora, usando CNPJ, razão social e contato como dados mestres da organização."
      },
      {
        "stepId": "localizarProduto",
        "kind": "locate",
        "entity": "Product",
        "title": "Localizar produto",
        "description": "Localiza o produto que será fornecido."
      },
      {
        "stepId": "registrarProdutoDoFornecedor",
        "kind": "act",
        "entity": "SupplierProduct",
        "effect": "create",
        "title": "Registrar produto do fornecedor",
        "description": "Registra que o fornecedor fornece o produto selecionado e informa o preço combinado."
      }
    ],
    "outcome": {
      "statement": "O fornecedor fica disponível para compras com um produto e preço combinado cadastrados.",
      "evidence": [
        "Fornecedor localizado ou criado a partir do CNPJ.",
        "Produto do fornecedor registrado com preço combinado."
      ]
    }
  },
  "businessHash": "sha256:8b7c3b8f321a8eb4ea479a44793ac9190bb0a1921c9a393fb50f264e503e3d19"
} as const satisfies Ns5JourneyArtifact;

export type CadastrarFornecedorEcatalogoJourneyType = typeof cadastrarFornecedorEcatalogoJourney;

export default cadastrarFornecedorEcatalogoJourney;

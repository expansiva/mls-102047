/// <mls fileReference="_102047_/l4/compras/journeys/cadastrarFornecedor.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const cadastrarFornecedorJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "cadastrarFornecedor",
  "business": {
    "actorRef": "comprador",
    "title": "Cadastrar fornecedor",
    "goal": "Cadastrar ou vincular uma empresa fornecedora à organização para que possa ser usada em compras.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "informarFornecedor",
        "kind": "act",
        "entity": "Supplier",
        "title": "Cadastrar ou vincular fornecedor",
        "description": "Informa os dados da empresa fornecedora, incluindo CNPJ, razão social e contato, para criar ou vincular o fornecedor."
      }
    ],
    "outcome": {
      "statement": "O fornecedor fica disponível para utilização nos pedidos de compra.",
      "evidence": [
        "Fornecedor identificado por CNPJ e razão social.",
        "Fornecedor disponível para seleção em pedidos de compra."
      ]
    }
  },
  "businessHash": "sha256:9537385cdb9ee7088797ea64e625d7bbfb22df99762584c2f3a4dd84566552d2"
} as const satisfies Ns5JourneyArtifact;

export type CadastrarFornecedorJourneyType = typeof cadastrarFornecedorJourney;

export default cadastrarFornecedorJourney;

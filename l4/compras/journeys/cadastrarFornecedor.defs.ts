/// <mls fileReference="_102047_/l4/compras/journeys/cadastrarFornecedor.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const cadastrarFornecedorJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "cadastrarFornecedor",
  "business": {
    "actorRef": "comprador",
    "title": "Cadastrar fornecedor",
    "goal": "Deixar um fornecedor da organização disponível para compras, com identificação empresarial e contato.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "cadastrarFornecedor",
        "kind": "act",
        "entity": "Fornecedor",
        "effect": "create",
        "title": "Cadastrar fornecedor",
        "description": "Informa CNPJ, razão social e contato da empresa para cadastrar o fornecedor."
      }
    ],
    "outcome": {
      "statement": "O fornecedor fica cadastrado e pode ser usado em ofertas e pedidos de compra.",
      "evidence": [
        "O fornecedor aparece na base de fornecedores da organização.",
        "CNPJ, razão social e contato identificam o registro."
      ]
    }
  },
  "businessHash": "sha256:dbb91bb5c64a4590bbae22f565dda279566fbb9b85cd82f5aea5dcc0254cffca"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type CadastrarFornecedorJourneyType = typeof cadastrarFornecedorJourney;

export default cadastrarFornecedorJourney;

/// <mls fileReference="_102047_/l4/compras/journeys/cadastrarFornecedor.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const cadastrarFornecedorJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "cadastrarFornecedor",
  "business": {
    "actorRef": "comprador",
    "title": "Cadastrar fornecedor",
    "goal": "Registrar uma empresa fornecedora com CNPJ, razão social e contato para poder comprar dela.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "buscarFornecedor",
        "kind": "locate",
        "entity": "Fornecedor",
        "title": "Buscar fornecedor por CNPJ",
        "description": "O comprador procura pelo CNPJ se a empresa já existe como fornecedor."
      },
      {
        "stepId": "registrarFornecedor",
        "kind": "act",
        "entity": "Fornecedor",
        "effect": "create",
        "title": "Registrar fornecedor",
        "description": "O comprador informa CNPJ, razão social e contato e salva o fornecedor."
      }
    ],
    "outcome": {
      "statement": "A empresa passa a ser fornecedor da organização.",
      "evidence": [
        "O fornecedor aparece na lista de fornecedores com CNPJ e razão social."
      ]
    }
  },
  "businessHash": "sha256:ba4350cff58e1cdc5fe1f703f4c2bf1bf2f400b800eb94ca7000d3995f200af3"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type CadastrarFornecedorJourneyType = typeof cadastrarFornecedorJourney;

export default cadastrarFornecedorJourney;

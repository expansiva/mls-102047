/// <mls fileReference="_102047_/l4/compras/journeys/cadastrarOfertaFornecedor.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const cadastrarOfertaFornecedorJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "cadastrarOfertaFornecedor",
  "business": {
    "actorRef": "comprador",
    "title": "Cadastrar produtos do fornecedor",
    "goal": "Registrar quais produtos cada fornecedor entrega e o preço combinado de cada um.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarFornecedor",
        "kind": "locate",
        "entity": "Fornecedor",
        "title": "Localizar fornecedor",
        "description": "Encontra o fornecedor já em mãos ou busca o registro para associar produtos."
      },
      {
        "stepId": "conferirFornecedor",
        "kind": "inspect",
        "entity": "Fornecedor",
        "title": "Conferir fornecedor",
        "description": "Confere a identificação do fornecedor antes de informar os produtos e preços."
      },
      {
        "stepId": "informarOfertas",
        "kind": "act",
        "entity": "OfertaFornecedor",
        "effect": "create",
        "title": "Informar produtos e preços",
        "description": "Associa ao fornecedor os produtos que ele fornece e o preço combinado de cada um."
      }
    ],
    "outcome": {
      "statement": "Os produtos fornecidos e os preços combinados ficam associados ao fornecedor.",
      "evidence": [
        "Cada produto informado aparece no catálogo daquele fornecedor com o preço combinado."
      ]
    }
  },
  "businessHash": "sha256:a2197e05c6dfe25ce2c9bba4c0497f6c816bdb964f8ab95004ceef84cc98d72c"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type CadastrarOfertaFornecedorJourneyType = typeof cadastrarOfertaFornecedorJourney;

export default cadastrarOfertaFornecedorJourney;

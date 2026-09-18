/// <mls fileReference="_102047_/l4/compras/journeys/cadastrarOfertaFornecedor.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const cadastrarOfertaFornecedorJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "cadastrarOfertaFornecedor",
  "business": {
    "actorRef": "comprador",
    "title": "Cadastrar produto e preço de fornecedor",
    "goal": "Registrar quais produtos um fornecedor disponibiliza e os preços combinados.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarFornecedor",
        "kind": "locate",
        "entity": "Supplier",
        "title": "Localizar fornecedor",
        "description": "Recupera o fornecedor já selecionado ou o localiza para vincular um produto."
      },
      {
        "stepId": "localizarProduto",
        "kind": "locate",
        "entity": "Product",
        "title": "Localizar produto",
        "description": "Localiza o produto da base mestre que será fornecido."
      },
      {
        "stepId": "registrarOferta",
        "kind": "act",
        "entity": "SupplierOffering",
        "effect": "create",
        "title": "Registrar oferta",
        "description": "Registra a oferta do produto pelo fornecedor e o preço combinado."
      }
    ],
    "outcome": {
      "statement": "O produto e o preço combinado ficam disponíveis para a criação de pedidos daquele fornecedor.",
      "evidence": [
        "Oferta vinculada ao fornecedor e ao produto.",
        "Preço combinado registrado na oferta."
      ]
    }
  },
  "businessHash": "sha256:bfaf138c7754551ecf0b7c131035a23759b509796655ed5176c7c26a513f1b1b"
} as const satisfies Ns5JourneyArtifact;

export type CadastrarOfertaFornecedorJourneyType = typeof cadastrarOfertaFornecedorJourney;

export default cadastrarOfertaFornecedorJourney;

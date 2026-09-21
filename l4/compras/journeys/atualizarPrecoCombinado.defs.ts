/// <mls fileReference="_102047_/l4/compras/journeys/atualizarPrecoCombinado.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const atualizarPrecoCombinadoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "atualizarPrecoCombinado",
  "business": {
    "actorRef": "comprador",
    "title": "Atualizar preço combinado de fornecedor",
    "goal": "Manter o preço combinado de um produto fornecido atualizado.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarProdutoDoFornecedor",
        "kind": "locate",
        "entity": "SupplierProduct",
        "title": "Localizar produto do fornecedor",
        "description": "Localiza o produto no catálogo do fornecedor, usando o fornecedor em contexto ou uma busca como alternativa."
      },
      {
        "stepId": "inspecionarPrecoVigente",
        "kind": "inspect",
        "entity": "SupplierProduct",
        "title": "Consultar preço vigente",
        "description": "Consulta o preço combinado atualmente registrado."
      },
      {
        "stepId": "atualizarPrecoCombinado",
        "kind": "act",
        "entity": "SupplierProduct",
        "effect": "update",
        "title": "Atualizar preço combinado",
        "description": "Atualiza o preço combinado para o produto fornecido."
      }
    ],
    "outcome": {
      "statement": "O catálogo do fornecedor passa a apresentar o novo preço combinado.",
      "evidence": [
        "Preço combinado atualizado no produto do fornecedor."
      ]
    }
  },
  "businessHash": "sha256:4200bf5c3e6d086ede66c57b6d2f005e3cba50dd65806086954d136cca66bd34"
} as const satisfies Ns5JourneyArtifact;

export type AtualizarPrecoCombinadoJourneyType = typeof atualizarPrecoCombinadoJourney;

export default atualizarPrecoCombinadoJourney;

/// <mls fileReference="_102047_/l4/financeiro/ontology/index.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyIndexV3 } from '/_102035_/l2/solution/types.js';

export const financeiroOntologyIndex = {
  "schemaVersion": "2026-09-15-ns5-ontology-v3",
  "moduleName": "financeiro",
  "businessDomain": "Contas a receber e registro de recebimentos da organização.",
  "platformOntology": "/_102034_/l4/ontology/mdm.defs.ts",
  "moduleNamespace": {
    "key": "financeiro",
    "description": "Branch details.financeiro of the master records this module has a role on; only this module writes it."
  },
  "entities": [
    {
      "entityId": "Pagador",
      "kind": "role",
      "subtype": "Person"
    },
    {
      "entityId": "GerenteFinanceiro",
      "kind": "role",
      "subtype": "Person"
    },
    {
      "entityId": "TituloReceber",
      "kind": "entity",
      "class": "core"
    },
    {
      "entityId": "Recebimento",
      "kind": "entity",
      "class": "event"
    }
  ],
  "relationships": [
    {
      "relationshipId": "tituloPagador",
      "from": "TituloReceber",
      "to": "Pagador",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada título a receber pertence a um único pagador; um pagador pode ter vários títulos.",
      "field": "TituloReceber.pagadorId"
    },
    {
      "relationshipId": "recebimentoTitulo",
      "from": "Recebimento",
      "to": "TituloReceber",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada recebimento registra a baixa, total ou parcial, de um único título a receber.",
      "field": "Recebimento.tituloId"
    },
    {
      "relationshipId": "recebimentoPagador",
      "from": "Recebimento",
      "to": "Pagador",
      "type": "manyToOne",
      "required": true,
      "mode": "throughTable",
      "description": "O pagador de um recebimento é obtido pelo título a receber ao qual o recebimento está vinculado.",
      "through": "TituloReceber",
      "path": "Recebimento.tituloId -> TituloReceber.pagadorId",
      "derived": true
    }
  ]
} as const satisfies Ns5OntologyIndexV3;

export type FinanceiroOntologyIndexType = typeof financeiroOntologyIndex;

export default financeiroOntologyIndex;

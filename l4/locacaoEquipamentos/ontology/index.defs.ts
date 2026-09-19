/// <mls fileReference="_102047_/l4/locacaoEquipamentos/ontology/index.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyIndexV3 } from '/_102035_/l2/solution/types.js';

export const locacaoEquipamentosOntologyIndex = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "locacaoEquipamentos",
  "businessDomain": "Locação de equipamentos para construção",
  "platformOntology": "/_102034_/l4/ontology/mdm.defs.ts",
  "moduleNamespace": {
    "key": "locacaoEquipamentos",
    "description": "Branch details.locacaoEquipamentos of the master records this module has a role on; only this module writes it."
  },
  "entities": [
    {
      "entityId": "Cliente",
      "kind": "role",
      "subtype": "Person"
    },
    {
      "entityId": "Equipamento",
      "kind": "entity",
      "class": "core"
    },
    {
      "entityId": "ContratoLocacao",
      "kind": "entity",
      "class": "core"
    },
    {
      "entityId": "ItemContratoLocacao",
      "kind": "entity",
      "class": "supporting"
    }
  ],
  "relationships": [
    {
      "relationshipId": "contratoLocacaoCliente",
      "from": "ContratoLocacao",
      "to": "Cliente",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada contrato de locação é celebrado para um cliente.",
      "field": "ContratoLocacao.clienteId"
    },
    {
      "relationshipId": "itemContratoLocacaoContrato",
      "from": "ItemContratoLocacao",
      "to": "ContratoLocacao",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada item de locação pertence a um único contrato de locação.",
      "field": "ItemContratoLocacao.contratoLocacaoId"
    },
    {
      "relationshipId": "itemContratoLocacaoEquipamento",
      "from": "ItemContratoLocacao",
      "to": "Equipamento",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada item do contrato reserva um equipamento específico para o período da locação.",
      "field": "ItemContratoLocacao.equipamentoId"
    }
  ]
} as const satisfies Ns5OntologyIndexV3;

export type LocacaoEquipamentosOntologyIndexType = typeof locacaoEquipamentosOntologyIndex;

export default locacaoEquipamentosOntologyIndex;

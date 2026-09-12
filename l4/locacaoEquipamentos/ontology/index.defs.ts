/// <mls fileReference="_102047_/l4/locacaoEquipamentos/ontology/index.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyIndexArtifact } from '/_102035_/l2/solution/types.js';

export const locacaoEquipamentosOntologyIndex = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "locacaoEquipamentos",
  "businessDomain": "Locação de equipamentos para construção",
  "entities": [
    "Cliente",
    "Equipamento",
    "ContratoLocacao"
  ],
  "relationships": [
    {
      "relationshipId": "contratoCliente",
      "fromEntity": "ContratoLocacao",
      "toEntity": "Cliente",
      "type": "manyToOne",
      "required": true,
      "description": "Cada contrato de locação pertence a um cliente.",
      "persistence": {
        "mode": "crossStoreReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "ContratoLocacao",
        "from": {
          "entityId": "ContratoLocacao",
          "fieldIds": [
            "clienteId"
          ]
        },
        "to": {
          "entityId": "Cliente",
          "fieldIds": [
            "id"
          ]
        }
      }
    },
    {
      "relationshipId": "contratoEquipamentos",
      "fromEntity": "ContratoLocacao",
      "toEntity": "Equipamento",
      "type": "manyToMany",
      "required": true,
      "description": "Um contrato de locação inclui um ou mais equipamentos, que podem participar de contratos distintos em períodos diferentes.",
      "persistence": {
        "mode": "crossStoreReference"
      },
      "realization": {
        "kind": "fieldCollection",
        "ownerEntity": "ContratoLocacao",
        "from": {
          "entityId": "ContratoLocacao",
          "fieldIds": [
            "equipamentoIds"
          ]
        },
        "to": {
          "entityId": "Equipamento",
          "fieldIds": [
            "id"
          ]
        }
      }
    }
  ]
} as const satisfies Ns5OntologyIndexArtifact;

export type LocacaoEquipamentosOntologyIndexType = typeof locacaoEquipamentosOntologyIndex;

export default locacaoEquipamentosOntologyIndex;

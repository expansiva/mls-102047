/// <mls fileReference="_102047_/l4/financeiro/ontology/index.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyIndexArtifact } from '/_102035_/l2/solution/types.js';

export const financeiroOntologyIndex = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "financeiro",
  "businessDomain": "Contas a receber da organização, incluindo títulos originados em outros módulos, recebimentos e consulta de extratos por pagador.",
  "entities": [
    "TituloReceber",
    "Recebimento",
    "ExtratoPagador",
    "Pagador"
  ],
  "relationships": [
    {
      "relationshipId": "tituloTemPagador",
      "fromEntity": "TituloReceber",
      "toEntity": "Pagador",
      "type": "manyToOne",
      "required": true,
      "description": "Cada título a receber possui um pagador responsável.",
      "persistence": {
        "mode": "crossStoreReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "TituloReceber",
        "from": {
          "entityId": "TituloReceber",
          "fieldIds": [
            "pagadorId"
          ]
        },
        "to": {
          "entityId": "Pagador",
          "fieldIds": [
            "id"
          ]
        }
      }
    },
    {
      "relationshipId": "recebimentoDoTitulo",
      "fromEntity": "Recebimento",
      "toEntity": "TituloReceber",
      "type": "manyToOne",
      "required": true,
      "description": "Cada recebimento registra uma solicitação, confirmação ou estorno relativo a um título a receber.",
      "persistence": {
        "mode": "moduleReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "Recebimento",
        "from": {
          "entityId": "Recebimento",
          "fieldIds": [
            "tituloReceberId"
          ]
        },
        "to": {
          "entityId": "TituloReceber",
          "fieldIds": [
            "id"
          ]
        }
      }
    },
    {
      "relationshipId": "extratoDoPagador",
      "fromEntity": "ExtratoPagador",
      "toEntity": "Pagador",
      "type": "manyToOne",
      "required": true,
      "description": "Cada extrato emitido pertence ao pagador consultado.",
      "persistence": {
        "mode": "crossStoreReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "ExtratoPagador",
        "from": {
          "entityId": "ExtratoPagador",
          "fieldIds": [
            "pagadorId"
          ]
        },
        "to": {
          "entityId": "Pagador",
          "fieldIds": [
            "id"
          ]
        }
      }
    }
  ]
} as const satisfies Ns5OntologyIndexArtifact;

export type FinanceiroOntologyIndexType = typeof financeiroOntologyIndex;

export default financeiroOntologyIndex;

/// <mls fileReference="_102047_/l4/comandaRestaurante/ontology/index.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyIndexArtifact } from '/_102035_/l2/solution/types.js';

export const comandaRestauranteOntologyIndex = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "comandaRestaurante",
  "businessDomain": "Gestão de comandas, mesas, cardápio e pagamentos de restaurante.",
  "entities": [
    "Mesa",
    "ItemCardapio",
    "Comanda",
    "ItemComanda"
  ],
  "relationships": [
    {
      "relationshipId": "comandaMesa",
      "fromEntity": "Comanda",
      "toEntity": "Mesa",
      "type": "manyToOne",
      "required": true,
      "description": "Cada comanda é aberta para uma mesa do restaurante.",
      "persistence": {
        "mode": "crossStoreReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "Comanda",
        "from": {
          "entityId": "Comanda",
          "fieldIds": [
            "mesaId"
          ]
        },
        "to": {
          "entityId": "Mesa",
          "fieldIds": [
            "id"
          ]
        }
      }
    },
    {
      "relationshipId": "comandaItens",
      "fromEntity": "Comanda",
      "toEntity": "ItemComanda",
      "type": "oneToMany",
      "required": false,
      "description": "Uma comanda reúne os itens nela lançados.",
      "persistence": {
        "mode": "moduleReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "ItemComanda",
        "from": {
          "entityId": "Comanda",
          "fieldIds": [
            "id"
          ]
        },
        "to": {
          "entityId": "ItemComanda",
          "fieldIds": [
            "comandaId"
          ]
        }
      }
    },
    {
      "relationshipId": "itemComandaCardapio",
      "fromEntity": "ItemComanda",
      "toEntity": "ItemCardapio",
      "type": "manyToOne",
      "required": true,
      "description": "Cada item da comanda corresponde a um item do cardápio.",
      "persistence": {
        "mode": "crossStoreReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "ItemComanda",
        "from": {
          "entityId": "ItemComanda",
          "fieldIds": [
            "itemCardapioId"
          ]
        },
        "to": {
          "entityId": "ItemCardapio",
          "fieldIds": [
            "id"
          ]
        }
      }
    }
  ]
} as const satisfies Ns5OntologyIndexArtifact;

export type ComandaRestauranteOntologyIndexType = typeof comandaRestauranteOntologyIndex;

export default comandaRestauranteOntologyIndex;

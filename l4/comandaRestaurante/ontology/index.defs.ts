/// <mls fileReference="_102047_/l4/comandaRestaurante/ontology/index.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyIndexV3 } from '/_102035_/l2/solution/types.js';

export const comandaRestauranteOntologyIndex = {
  "schemaVersion": "2026-09-15-ns5-ontology-v3",
  "moduleName": "comandaRestaurante",
  "businessDomain": "Gestão de comandas e atendimento de restaurante",
  "platformOntology": "/_102034_/l4/ontology/mdm.defs.ts",
  "moduleNamespace": {
    "key": "comandaRestaurante",
    "description": "Branch details.comandaRestaurante of the master records this module has a role on; only this module writes it."
  },
  "entities": [
    {
      "entityId": "Mesa",
      "kind": "role",
      "subtype": "Location"
    },
    {
      "entityId": "ItemCardapio",
      "kind": "role",
      "subtype": "Product"
    },
    {
      "entityId": "Comanda",
      "kind": "entity",
      "class": "core"
    },
    {
      "entityId": "ItemComanda",
      "kind": "entity",
      "class": "supporting"
    }
  ],
  "relationships": [
    {
      "relationshipId": "comandaParaMesa",
      "from": "Comanda",
      "to": "Mesa",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada comanda é aberta obrigatoriamente para uma mesa, e uma mesa pode ter comandas em atendimentos distintos ao longo do tempo.",
      "field": "Comanda.mesaId"
    },
    {
      "relationshipId": "itemComandaParaComanda",
      "from": "ItemComanda",
      "to": "Comanda",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada item lançado pertence obrigatoriamente a uma comanda, que pode reunir vários lançamentos.",
      "field": "ItemComanda.comandaId"
    },
    {
      "relationshipId": "itemComandaParaItemCardapio",
      "from": "ItemComanda",
      "to": "ItemCardapio",
      "type": "manyToOne",
      "required": true,
      "mode": "fk",
      "description": "Cada lançamento referencia obrigatoriamente o item do cardápio escolhido, e um item do cardápio pode aparecer em vários lançamentos.",
      "field": "ItemComanda.itemCardapioId"
    }
  ]
} as const satisfies Ns5OntologyIndexV3;

export type ComandaRestauranteOntologyIndexType = typeof comandaRestauranteOntologyIndex;

export default comandaRestauranteOntologyIndex;

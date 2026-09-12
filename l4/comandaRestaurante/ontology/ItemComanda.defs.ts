/// <mls fileReference="_102047_/l4/comandaRestaurante/ontology/ItemComanda.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityArtifact } from '/_102035_/l2/solution/types.js';

export const comandaRestauranteEntityItemComanda = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "comandaRestaurante",
  "entityId": "ItemComanda",
  "title": "Item da comanda",
  "description": "Lançamento de um item do cardápio em uma comanda, incluindo quantidade, observação e eventual cancelamento.",
  "kind": "event",
  "party": "none",
  "displayField": "id",
  "fields": [
    {
      "fieldId": "id",
      "title": "Identificador",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do lançamento do item na comanda."
    },
    {
      "fieldId": "comandaId",
      "title": "Comanda",
      "type": "uuid",
      "required": true,
      "description": "Comanda à qual este lançamento de item pertence."
    },
    {
      "fieldId": "itemCardapioId",
      "title": "Item do cardápio",
      "type": "uuid",
      "required": true,
      "description": "Item do cardápio selecionado para este lançamento."
    },
    {
      "fieldId": "quantidade",
      "title": "Quantidade",
      "type": "integer",
      "required": true,
      "description": "Quantidade do item do cardápio lançada na comanda."
    },
    {
      "fieldId": "precoUnitario",
      "title": "Preço unitário",
      "type": "money",
      "required": true,
      "description": "Preço unitário vigente do item do cardápio no momento do lançamento."
    },
    {
      "fieldId": "observacao",
      "title": "Observação",
      "type": "text",
      "required": false,
      "description": "Observação opcional para o preparo ou serviço do item."
    },
    {
      "fieldId": "status",
      "title": "Situação",
      "type": "string",
      "required": true,
      "enum": [
        {
          "value": "registered",
          "title": "Lançado"
        },
        {
          "value": "cancelled",
          "title": "Cancelado"
        }
      ],
      "description": "Situação atual do lançamento do item na comanda."
    }
  ],
  "details": {
    "subtotal": {
      "type": "money",
      "description": "Valor calculado do item pela quantidade e pelo preço unitário, desconsiderado quando estiver cancelado."
    }
  },
  "lifecycleStates": [
    {
      "state": "registered",
      "reachedBy": "actor"
    },
    {
      "state": "cancelled",
      "reachedBy": "actor"
    }
  ],
  "transitions": [
    {
      "transitionId": "cancelItem",
      "from": [
        "registered"
      ],
      "to": "cancelled",
      "by": [
        "garcom"
      ],
      "description": "Cancela um item lançado indevidamente enquanto a comanda permanece aberta."
    }
  ],
  "storage": {
    "target": "moduleDatabase",
    "scope": "module",
    "idField": "id"
  }
} as const satisfies Ns5OntologyEntityArtifact;

export type ComandaRestauranteEntityItemComandaType = typeof comandaRestauranteEntityItemComanda;

export default comandaRestauranteEntityItemComanda;

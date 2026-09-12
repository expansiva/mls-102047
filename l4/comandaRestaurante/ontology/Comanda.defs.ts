/// <mls fileReference="_102047_/l4/comandaRestaurante/ontology/Comanda.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityArtifact } from '/_102035_/l2/solution/types.js';

export const comandaRestauranteEntityComanda = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "comandaRestaurante",
  "entityId": "Comanda",
  "title": "Comanda",
  "description": "Registro do consumo aberto para uma mesa e encerrado após o pagamento.",
  "kind": "core",
  "party": "none",
  "displayField": "number",
  "fields": [
    {
      "fieldId": "id",
      "title": "Identificador",
      "type": "uuid",
      "required": true,
      "description": "Identificador único da comanda."
    },
    {
      "fieldId": "number",
      "title": "Número",
      "type": "string",
      "required": true,
      "unique": true,
      "description": "Número sequencial que identifica a comanda."
    },
    {
      "fieldId": "mesaId",
      "title": "Mesa",
      "type": "uuid",
      "required": true,
      "description": "Referência à mesa para a qual a comanda foi aberta."
    },
    {
      "fieldId": "discountAmount",
      "title": "Desconto",
      "type": "money",
      "required": false,
      "description": "Valor de desconto aplicado no fechamento da comanda."
    },
    {
      "fieldId": "paymentMethod",
      "title": "Forma de pagamento",
      "type": "string",
      "required": false,
      "description": "Forma de pagamento registrada no fechamento da comanda."
    },
    {
      "fieldId": "status",
      "title": "Situação",
      "type": "string",
      "required": true,
      "enum": [
        {
          "value": "open",
          "title": "Aberta"
        },
        {
          "value": "closed",
          "title": "Fechada"
        }
      ],
      "description": "Situação atual da comanda."
    }
  ],
  "details": {
    "totalAmount": {
      "type": "money",
      "description": "Valor total a cobrar, calculado a partir dos itens não cancelados e do desconto aplicado."
    }
  },
  "lifecycleStates": [
    {
      "state": "open",
      "reachedBy": "actor"
    },
    {
      "state": "closed",
      "reachedBy": "actor"
    }
  ],
  "transitions": [
    {
      "transitionId": "closeComanda",
      "from": [
        "open"
      ],
      "to": "closed",
      "by": [
        "caixa"
      ],
      "description": "Fecha a comanda após registrar o desconto, quando houver, e a forma de pagamento."
    }
  ],
  "storage": {
    "target": "moduleDatabase",
    "scope": "module",
    "idField": "id"
  }
} as const satisfies Ns5OntologyEntityArtifact;

export type ComandaRestauranteEntityComandaType = typeof comandaRestauranteEntityComanda;

export default comandaRestauranteEntityComanda;

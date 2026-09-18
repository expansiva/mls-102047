/// <mls fileReference="_102047_/l4/compras/ontology/PurchaseDashboard.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3 } from '/_102035_/l2/solution/types.js';

export const comprasEntityPurchaseDashboard = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "compras",
  "entityId": "PurchaseDashboard",
  "title": "Painel de compras",
  "description": "Indicadores recalculados de pedidos em aberto, pedidos atrasados e total comprado por fornecedor no mês.",
  "displayField": "details.referenceMonth",
  "relationships": {},
  "capabilities": {
    "aggregate.byWindow": "Resume os pedidos de compra por mês e fornecedor para recalcular os indicadores exibidos ao gerente de compras.",
    "read.window": "Lê os indicadores do mês e do fornecedor selecionados, usando a janela mensal e o identificador do fornecedor indexados, para o gerente de compras.",
    "read.mdmRecord": "Lê o registro mestre do fornecedor identificado no agrupamento para apresentar sua razão social no painel ao gerente de compras."
  },
  "rules": [],
  "kind": "entity",
  "class": "supporting",
  "storage": {
    "target": "moduleDatabase",
    "table": "compras_purchasedashboard",
    "kind": "relational"
  },
  "record": {
    "fields": {
      "id": {
        "type": "uuid",
        "required": true,
        "derived": true,
        "indexed": true,
        "title": "Id"
      },
      "version": {
        "type": "integer",
        "required": true,
        "derived": true
      },
      "window": {
        "type": "timestamp",
        "required": true,
        "indexed": true,
        "of": "Address",
        "title": "Mês de referência",
        "description": "Início do mês ao qual os indicadores de compras se referem.",
        "maxLength": 0,
        "min": 0,
        "max": 0,
        "derived": true
      },
      "groupKey": {
        "type": "string",
        "required": true,
        "indexed": true,
        "of": "Address",
        "title": "Fornecedor",
        "description": "Identificador do fornecedor ao qual os indicadores mensais se referem.",
        "maxLength": 0,
        "min": 0,
        "max": 0,
        "derived": true
      },
      "details": {
        "type": "object",
        "required": true,
        "of": "Address",
        "title": "Indicadores de compras",
        "description": "Medidas recalculadas dos pedidos de compra por fornecedor e mês, a partir dos pedidos de compra.",
        "maxLength": 0,
        "min": 0,
        "max": 0,
        "fields": {
          "referenceMonth": {
            "type": "timestamp",
            "required": true,
            "of": "Address",
            "title": "Mês de referência",
            "description": "Mês derivado da janela que identifica o período exibido no painel.",
            "maxLength": 0,
            "min": 0,
            "max": 0,
            "derived": true
          },
          "openOrderCount": {
            "type": "number",
            "required": true,
            "of": "Address",
            "title": "Pedidos em aberto",
            "description": "Quantidade derivada de pedidos de compra do fornecedor que permanecem em aberto no mês de referência.",
            "maxLength": 0,
            "min": 0,
            "max": 0,
            "derived": true
          },
          "overdueOrderCount": {
            "type": "number",
            "required": true,
            "of": "Address",
            "title": "Pedidos atrasados",
            "description": "Quantidade derivada de pedidos de compra em aberto do fornecedor cuja data prevista de entrega já passou no mês de referência.",
            "maxLength": 0,
            "min": 0,
            "max": 0,
            "derived": true
          },
          "monthlyPurchasedTotal": {
            "type": "number",
            "required": true,
            "of": "Address",
            "title": "Total comprado no mês",
            "description": "Valor total derivado das compras do fornecedor no mês de referência.",
            "maxLength": 0,
            "min": 0,
            "max": 0,
            "derived": true
          }
        },
        "derived": true
      }
    }
  }
} as const satisfies Ns5OntologyEntityV3;

export type ComprasEntityPurchaseDashboardType = typeof comprasEntityPurchaseDashboard;

export default comprasEntityPurchaseDashboard;

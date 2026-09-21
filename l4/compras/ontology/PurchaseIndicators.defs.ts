/// <mls fileReference="_102047_/l4/compras/ontology/PurchaseIndicators.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityV3 } from '/_102035_/l2/solution/types.js';

export const comprasEntityPurchaseIndicators = {
  "schemaVersion": "2026-09-17-ns5-ontology-v3.1",
  "moduleName": "compras",
  "entityId": "PurchaseIndicators",
  "title": "Indicadores de compras",
  "description": "Painel recalculado de pedidos em aberto, pedidos atrasados e total comprado por fornecedor no mês.",
  "displayField": "referenceMonth",
  "relationships": {},
  "capabilities": {
    "aggregate.byWindow": "Consolida mensalmente os pedidos de compra por fornecedor, calculando pedidos em aberto, pedidos atrasados e valor comprado em uma agregação derivada usada pelo painel do gerente de compras.",
    "read.window": "Lê os indicadores de compras de um período e fornecedor pelos campos indexados de mês de referência e fornecedor, para o painel do gerente de compras.",
    "refresh": "Mantém os indicadores mensais atualizados quando pedidos de compra e recebimentos são registrados, por atualização da agregação derivada da plataforma para o painel do gerente de compras.",
    "rebuild": "Recalcula integralmente os indicadores de compras a partir dos pedidos de compra e recebimentos durante uma publicação ou reconstrução do esquema pela plataforma.",
    "read.mdmRecord": "Lê os registros mestres dos fornecedores identificados nos indicadores para apresentar a razão social no painel do gerente de compras."
  },
  "rules": [],
  "kind": "entity",
  "class": "supporting",
  "storage": {
    "target": "moduleDatabase",
    "table": "compras_purchaseindicators",
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
      "referenceMonth": {
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
      "supplierId": {
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
        "title": "Medidas dos indicadores",
        "description": "Medidas calculadas dos pedidos de compra do fornecedor no mês de referência.",
        "maxLength": 0,
        "min": 0,
        "max": 0,
        "fields": {
          "openPurchaseOrderCount": {
            "type": "integer",
            "required": true,
            "of": "Address",
            "title": "Pedidos em aberto",
            "description": "Quantidade de pedidos de compra do fornecedor que permanecem em aberto.",
            "maxLength": 0,
            "min": 0,
            "max": 0,
            "derived": true
          },
          "overduePurchaseOrderCount": {
            "type": "integer",
            "required": true,
            "of": "Address",
            "title": "Pedidos atrasados",
            "description": "Quantidade de pedidos de compra em aberto do fornecedor com prazo de recebimento anterior à data atual.",
            "maxLength": 0,
            "min": 0,
            "max": 0,
            "derived": true
          },
          "monthlyPurchasedTotal": {
            "type": "money",
            "required": true,
            "of": "Address",
            "title": "Total comprado no mês",
            "description": "Valor total dos pedidos de compra do fornecedor no mês de referência.",
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

export type ComprasEntityPurchaseIndicatorsType = typeof comprasEntityPurchaseIndicators;

export default comprasEntityPurchaseIndicators;

/// <mls fileReference="_102047_/l4/financeiro/ontology/ExtratoPagador.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityArtifact } from '/_102035_/l2/solution/types.js';

export const financeiroEntityExtratoPagador = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "financeiro",
  "entityId": "ExtratoPagador",
  "title": "Extrato do pagador",
  "description": "Extrato emitido para um pagador com os títulos e recebimentos considerados na emissão.",
  "kind": "event",
  "party": "none",
  "displayField": "numeroExtrato",
  "fields": [
    {
      "fieldId": "id",
      "title": "Identificador",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do extrato emitido."
    },
    {
      "fieldId": "numeroExtrato",
      "title": "Número do extrato",
      "type": "string",
      "required": true,
      "unique": true,
      "description": "Número sequencial que identifica o extrato emitido."
    },
    {
      "fieldId": "pagadorId",
      "title": "Pagador",
      "type": "uuid",
      "required": true,
      "description": "Referência ao pagador para o qual o extrato foi emitido."
    },
    {
      "fieldId": "emitidoEm",
      "title": "Emitido em",
      "type": "datetime",
      "required": true,
      "description": "Data e hora de emissão do extrato."
    },
    {
      "fieldId": "titulosConsiderados",
      "title": "Títulos considerados",
      "type": "json",
      "required": true,
      "description": "Retrato dos títulos do pagador considerados na emissão do extrato."
    },
    {
      "fieldId": "recebimentosConsiderados",
      "title": "Recebimentos considerados",
      "type": "json",
      "required": true,
      "description": "Retrato dos recebimentos do pagador considerados na emissão do extrato."
    }
  ],
  "details": {
    "valorTotalTitulos": {
      "type": "money",
      "description": "Valor total dos títulos considerados no extrato."
    },
    "valorTotalRecebido": {
      "type": "money",
      "description": "Valor total dos recebimentos considerados no extrato."
    },
    "saldoEmAberto": {
      "type": "money",
      "description": "Saldo em aberto dos títulos considerados no momento da emissão."
    }
  },
  "lifecycleStates": [],
  "transitions": [],
  "storage": {
    "target": "moduleDatabase",
    "scope": "module",
    "idField": "id"
  },
  "mutability": "appendOnly"
} as const satisfies Ns5OntologyEntityArtifact;

export type FinanceiroEntityExtratoPagadorType = typeof financeiroEntityExtratoPagador;

export default financeiroEntityExtratoPagador;

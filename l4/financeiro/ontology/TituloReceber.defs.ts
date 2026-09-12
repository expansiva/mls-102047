/// <mls fileReference="_102047_/l4/financeiro/ontology/TituloReceber.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityArtifact } from '/_102035_/l2/solution/types.js';

export const financeiroEntityTituloReceber = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "financeiro",
  "entityId": "TituloReceber",
  "title": "Título a receber",
  "description": "Cobrança a receber originada em outro módulo da organização, com valor, vencimento, pagador e referência à origem.",
  "kind": "core",
  "party": "none",
  "displayField": "numeroTitulo",
  "fields": [
    {
      "fieldId": "id",
      "title": "Identificador",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do título a receber."
    },
    {
      "fieldId": "numeroTitulo",
      "title": "Número do título",
      "type": "string",
      "required": true,
      "unique": true,
      "description": "Número sequencial que identifica o título a receber."
    },
    {
      "fieldId": "pagadorId",
      "title": "Pagador",
      "type": "uuid",
      "required": true,
      "description": "Referência ao pagador responsável pelo título."
    },
    {
      "fieldId": "valorOriginal",
      "title": "Valor original",
      "type": "money",
      "required": true,
      "description": "Valor total originalmente cobrado no título."
    },
    {
      "fieldId": "vencimento",
      "title": "Vencimento",
      "type": "date",
      "required": true,
      "description": "Data limite prevista para o pagamento do título."
    },
    {
      "fieldId": "origemModulo",
      "title": "Módulo de origem",
      "type": "string",
      "required": true,
      "description": "Identificador do módulo que gerou a cobrança."
    },
    {
      "fieldId": "origemReferencia",
      "title": "Referência da origem",
      "type": "string",
      "required": true,
      "description": "Identificador do registro de origem que gerou a cobrança."
    }
  ],
  "uniqueKeys": [
    [
      "origemModulo",
      "origemReferencia"
    ]
  ],
  "details": {
    "valorRecebido": {
      "type": "money",
      "description": "Soma dos recebimentos confirmados e não estornados vinculados ao título."
    },
    "saldoPendente": {
      "type": "money",
      "description": "Valor que ainda falta receber para quitar o título."
    },
    "situacaoCobranca": {
      "type": "string",
      "description": "Situação calculada do título conforme saldo pendente, vencimento e recebimentos."
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

export type FinanceiroEntityTituloReceberType = typeof financeiroEntityTituloReceber;

export default financeiroEntityTituloReceber;

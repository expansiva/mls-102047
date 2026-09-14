/// <mls fileReference="_102047_/l4/financeiro/ontology/Pagador.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityArtifact } from '/_102035_/l2/solution/types.js';

export const financeiroEntityPagador = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "financeiro",
  "entityId": "Pagador",
  "title": "Pagador",
  "description": "Pessoa responsável por títulos a receber e que pode consultar e pagar os próprios títulos no portal.",
  "kind": "mdm",
  "party": "person",
  "mdmSubtype": "Person",
  "displayField": "name",
  "fields": [],
  "fieldsBase": [
    { "fieldId": "name", "title": "Nome completo", "type": "string", "required": true, "description": "Nome completo do pagador." },
    { "fieldId": "docType", "title": "Tipo de documento", "type": "string", "required": true, "enum": [{ "value": "CPF", "title": "CPF" }], "description": "Tipo de documento de identificação do pagador." },
    { "fieldId": "docId", "title": "CPF", "type": "string", "required": true, "description": "Número do CPF do pagador." },
    { "fieldId": "contacts", "title": "Contatos", "type": "json", "required": true, "description": "Contatos do pagador (telefone, e-mail) para notificação de títulos." }
  ],
  "lifecycleStates": [],
  "transitions": [],
  "storage": {
    "target": "mdm",
    "scope": "organization",
    "idField": "id",
    "mdmType": "financeiro.Pagador"
  },
  "writer": "inbound"
} as const satisfies Ns5OntologyEntityArtifact;

export type FinanceiroEntityPagadorType = typeof financeiroEntityPagador;

export default financeiroEntityPagador;

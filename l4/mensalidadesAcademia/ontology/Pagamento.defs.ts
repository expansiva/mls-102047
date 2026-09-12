/// <mls fileReference="_102047_/l4/mensalidadesAcademia/ontology/Pagamento.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityArtifact } from '/_102035_/l2/solution/types.js';

export const mensalidadesAcademiaEntityPagamento = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "mensalidadesAcademia",
  "entityId": "Pagamento",
  "title": "Pagamento",
  "description": "Registro de um valor recebido para quitação total ou parcial de uma mensalidade.",
  "kind": "event",
  "party": "none",
  "displayField": "id",
  "fields": [
    {
      "fieldId": "id",
      "title": "Identificador",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do registro de pagamento."
    },
    {
      "fieldId": "mensalidadeId",
      "title": "Mensalidade",
      "type": "uuid",
      "required": true,
      "description": "Mensalidade à qual o pagamento recebido pertence."
    },
    {
      "fieldId": "dataPagamento",
      "title": "Data do pagamento",
      "type": "date",
      "required": true,
      "description": "Data em que o pagamento foi recebido."
    },
    {
      "fieldId": "valor",
      "title": "Valor recebido",
      "type": "money",
      "required": true,
      "description": "Valor efetivamente recebido neste pagamento."
    },
    {
      "fieldId": "formaPagamento",
      "title": "Forma de pagamento",
      "type": "string",
      "required": true,
      "enum": [
        {
          "value": "dinheiro",
          "title": "Dinheiro"
        },
        {
          "value": "cartao",
          "title": "Cartão"
        },
        {
          "value": "pix",
          "title": "Pix"
        },
        {
          "value": "transferencia",
          "title": "Transferência"
        },
        {
          "value": "boleto",
          "title": "Boleto"
        }
      ],
      "description": "Forma utilizada pelo aluno para realizar o pagamento."
    }
  ],
  "lifecycleStates": [],
  "transitions": [],
  "storage": {
    "target": "moduleDatabase",
    "scope": "module",
    "idField": "id"
  },
  "mutability": "appendOnly"
} as const satisfies Ns5OntologyEntityArtifact;

export type MensalidadesAcademiaEntityPagamentoType = typeof mensalidadesAcademiaEntityPagamento;

export default mensalidadesAcademiaEntityPagamento;

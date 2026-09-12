/// <mls fileReference="_102047_/l4/mensalidadesAcademia/ontology/Plano.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityArtifact } from '/_102035_/l2/solution/types.js';

export const mensalidadesAcademiaEntityPlano = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "mensalidadesAcademia",
  "entityId": "Plano",
  "title": "Plano",
  "description": "Serviço oferecido pela academia, com modalidade, valor e dia de vencimento definidos para as matrículas.",
  "kind": "mdm",
  "party": "none",
  "mdmSubtype": "Service",
  "displayField": "name",
  "fields": [
    {
      "fieldId": "modalidade",
      "title": "Modalidade",
      "type": "string",
      "required": true,
      "enum": [
        {
          "value": "mensal",
          "title": "Mensal"
        },
        {
          "value": "trimestral",
          "title": "Trimestral"
        },
        {
          "value": "anual",
          "title": "Anual"
        }
      ],
      "description": "Periodicidade de cobrança do plano."
    },
    {
      "fieldId": "valor",
      "title": "Valor",
      "type": "money",
      "required": true,
      "description": "Valor cobrado em cada mensalidade vinculada a este plano."
    },
    {
      "fieldId": "diaVencimento",
      "title": "Dia de vencimento",
      "type": "integer",
      "required": true,
      "constraints": {
        "min": 1,
        "max": 31
      },
      "description": "Dia do mês usado para definir o vencimento das mensalidades deste plano."
    }
  ],
  "lifecycleStates": [],
  "transitions": [],
  "storage": {
    "target": "mdm",
    "scope": "organization",
    "idField": "id",
    "mdmType": "mensalidadesAcademia.Plano"
  },
  "maintenance": "crud"
} as const satisfies Ns5OntologyEntityArtifact;

export type MensalidadesAcademiaEntityPlanoType = typeof mensalidadesAcademiaEntityPlano;

export default mensalidadesAcademiaEntityPlano;

/// <mls fileReference="_102047_/l4/mensalidadesAcademia/ontology/Mensalidade.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityArtifact } from '/_102035_/l2/solution/types.js';

export const mensalidadesAcademiaEntityMensalidade = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "mensalidadesAcademia",
  "entityId": "Mensalidade",
  "title": "Mensalidade",
  "description": "Cobrança gerada para uma matrícula em um período mensal, contendo o valor e o vencimento aplicáveis.",
  "kind": "event",
  "party": "none",
  "displayField": "periodo",
  "fields": [
    {
      "fieldId": "id",
      "title": "Identificador",
      "type": "uuid",
      "required": true,
      "description": "Identificador único da mensalidade."
    },
    {
      "fieldId": "matriculaId",
      "title": "Matrícula",
      "type": "uuid",
      "required": true,
      "description": "Matrícula que originou a cobrança."
    },
    {
      "fieldId": "periodo",
      "title": "Período",
      "type": "date",
      "required": true,
      "description": "Mês de referência da mensalidade."
    },
    {
      "fieldId": "valor",
      "title": "Valor",
      "type": "money",
      "required": true,
      "constraints": {
        "precision": 2
      },
      "description": "Valor da mensalidade definido a partir do plano na geração da cobrança."
    },
    {
      "fieldId": "vencimento",
      "title": "Vencimento",
      "type": "date",
      "required": true,
      "description": "Data de vencimento da mensalidade."
    }
  ],
  "uniqueKeys": [
    [
      "matriculaId",
      "periodo"
    ]
  ],
  "details": {
    "valorRecebido": {
      "type": "money",
      "description": "Soma dos pagamentos registrados para esta mensalidade."
    },
    "saldoPendente": {
      "type": "money",
      "description": "Valor da mensalidade que permanece sem pagamento."
    },
    "situacao": {
      "type": "string",
      "description": "Situação calculada da mensalidade conforme pagamentos e vencimento."
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

export type MensalidadesAcademiaEntityMensalidadeType = typeof mensalidadesAcademiaEntityMensalidade;

export default mensalidadesAcademiaEntityMensalidade;

/// <mls fileReference="_102047_/l4/mensalidadesAcademia/ontology/Matricula.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityArtifact } from '/_102035_/l2/solution/types.js';

export const mensalidadesAcademiaEntityMatricula = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "mensalidadesAcademia",
  "entityId": "Matricula",
  "title": "Matrícula",
  "description": "Vínculo de um aluno a um plano a partir de uma data, que determina sua elegibilidade para gerações futuras de mensalidades.",
  "kind": "core",
  "party": "none",
  "displayField": "id",
  "fields": [
    {
      "fieldId": "id",
      "title": "Identificador da matrícula",
      "type": "uuid",
      "required": true,
      "description": "Identificador único da matrícula."
    },
    {
      "fieldId": "alunoId",
      "title": "Aluno",
      "type": "uuid",
      "required": true,
      "description": "Referência ao aluno vinculado à matrícula."
    },
    {
      "fieldId": "planoId",
      "title": "Plano",
      "type": "uuid",
      "required": true,
      "description": "Referência ao plano contratado na matrícula."
    },
    {
      "fieldId": "dataInicio",
      "title": "Data de início",
      "type": "date",
      "required": true,
      "description": "Data a partir da qual a matrícula passa a ser elegível para gerar mensalidades."
    },
    {
      "fieldId": "dataCancelamento",
      "title": "Data de cancelamento",
      "type": "date",
      "required": false,
      "description": "Data em que o aluno cancelou a matrícula."
    },
    {
      "fieldId": "status",
      "title": "Situação",
      "type": "string",
      "required": true,
      "enum": [
        {
          "value": "active",
          "title": "Ativa"
        },
        {
          "value": "cancelled",
          "title": "Cancelada"
        }
      ],
      "description": "Situação atual da matrícula para determinar sua participação nas gerações futuras de mensalidades."
    }
  ],
  "lifecycleStates": [
    {
      "state": "active",
      "reachedBy": "actor"
    },
    {
      "state": "cancelled",
      "reachedBy": "actor"
    }
  ],
  "transitions": [
    {
      "transitionId": "cancelarMatricula",
      "from": [
        "active"
      ],
      "to": "cancelled",
      "by": [
        "aluno"
      ],
      "description": "O aluno cancela a própria matrícula, interrompendo a geração de mensalidades futuras."
    }
  ],
  "storage": {
    "target": "moduleDatabase",
    "scope": "module",
    "idField": "id"
  }
} as const satisfies Ns5OntologyEntityArtifact;

export type MensalidadesAcademiaEntityMatriculaType = typeof mensalidadesAcademiaEntityMatricula;

export default mensalidadesAcademiaEntityMatricula;

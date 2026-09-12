/// <mls fileReference="_102047_/l4/inscricaoEvento/ontology/Inscricao.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityArtifact } from '/_102035_/l2/solution/types.js';

export const inscricaoEventoEntityInscricao = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "inscricaoEvento",
  "entityId": "Inscricao",
  "title": "Inscrição",
  "description": "Registro da participação de uma pessoa em um evento, incluindo sua situação de confirmação, espera ou cancelamento.",
  "kind": "core",
  "party": "none",
  "displayField": "id",
  "fields": [
    {
      "fieldId": "id",
      "title": "Identificador da inscrição",
      "type": "uuid",
      "required": true,
      "description": "Identificador único da inscrição."
    },
    {
      "fieldId": "eventoId",
      "title": "Evento",
      "type": "uuid",
      "required": true,
      "description": "Referência ao evento ao qual a inscrição pertence."
    },
    {
      "fieldId": "participanteId",
      "title": "Participante",
      "type": "uuid",
      "required": true,
      "description": "Referência à pessoa participante que realizou a inscrição."
    },
    {
      "fieldId": "dataInscricao",
      "title": "Data da inscrição",
      "type": "datetime",
      "required": true,
      "description": "Data e hora de registro da inscrição, usada para ordenar a lista de espera."
    },
    {
      "fieldId": "status",
      "title": "Situação",
      "type": "string",
      "required": true,
      "enum": [
        {
          "value": "confirmed",
          "title": "Confirmada"
        },
        {
          "value": "waitlisted",
          "title": "Lista de espera"
        },
        {
          "value": "cancelled",
          "title": "Cancelada"
        }
      ],
      "description": "Situação atual da inscrição no evento."
    }
  ],
  "uniqueKeys": [
    [
      "eventoId",
      "participanteId"
    ]
  ],
  "lifecycleStates": [
    {
      "state": "confirmed",
      "reachedBy": "actor"
    },
    {
      "state": "waitlisted",
      "reachedBy": "actor"
    },
    {
      "state": "cancelled",
      "reachedBy": "actor"
    }
  ],
  "transitions": [
    {
      "transitionId": "cancelarInscricao",
      "from": [
        "confirmed",
        "waitlisted"
      ],
      "to": "cancelled",
      "by": [
        "publico"
      ],
      "description": "O participante cancela sua própria inscrição no evento."
    },
    {
      "transitionId": "promoverListaEspera",
      "from": [
        "waitlisted"
      ],
      "to": "confirmed",
      "by": "system",
      "description": "O sistema promove a primeira inscrição da lista de espera quando uma vaga é liberada."
    }
  ],
  "storage": {
    "target": "moduleDatabase",
    "scope": "module",
    "idField": "id"
  }
} as const satisfies Ns5OntologyEntityArtifact;

export type InscricaoEventoEntityInscricaoType = typeof inscricaoEventoEntityInscricao;

export default inscricaoEventoEntityInscricao;

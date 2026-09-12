/// <mls fileReference="_102047_/l4/inscricaoEvento/ontology/Inscricao.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyEntityArtifact } from '/_102035_/l2/solution/types.js';

export const inscricaoEventoEntityInscricao = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "inscricaoEvento",
  "entityId": "Inscricao",
  "title": "Inscrição",
  "description": "Registro da participação de uma pessoa em um evento, incluindo sua situação de confirmada, espera ou cancelada.",
  "kind": "event",
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
      "fieldId": "eventId",
      "title": "Evento",
      "type": "uuid",
      "required": true,
      "description": "Referência ao evento ao qual a inscrição pertence."
    },
    {
      "fieldId": "participantId",
      "title": "Participante",
      "type": "uuid",
      "required": true,
      "description": "Referência à pessoa participante registrada no MDM."
    },
    {
      "fieldId": "registeredAt",
      "title": "Data e hora da inscrição",
      "type": "datetime",
      "required": true,
      "description": "Data e hora em que a inscrição foi realizada, usada para ordenar a lista de espera."
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
          "value": "waitingList",
          "title": "Lista de espera"
        },
        {
          "value": "canceled",
          "title": "Cancelada"
        }
      ],
      "description": "Situação atual da inscrição no evento."
    }
  ],
  "uniqueKeys": [
    [
      "eventId",
      "participantId"
    ]
  ],
  "lifecycleStates": [
    {
      "state": "confirmed",
      "reachedBy": "command"
    },
    {
      "state": "waitingList",
      "reachedBy": "command"
    },
    {
      "state": "canceled",
      "reachedBy": "actor"
    }
  ],
  "transitions": [
    {
      "transitionId": "placeRegistrationOnWaitingList",
      "from": [
        "confirmed"
      ],
      "to": "waitingList",
      "by": "system",
      "description": "Coloca a inscrição na lista de espera quando não houver vagas disponíveis no evento."
    },
    {
      "transitionId": "cancelRegistration",
      "from": [
        "confirmed",
        "waitingList"
      ],
      "to": "canceled",
      "by": [
        "publico"
      ],
      "description": "Cancela a própria inscrição no evento."
    },
    {
      "transitionId": "promoteWaitlistedRegistration",
      "from": [
        "waitingList"
      ],
      "to": "confirmed",
      "by": "system",
      "description": "Confirma a primeira inscrição da lista de espera após a liberação de uma vaga."
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

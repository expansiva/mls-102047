/// <mls fileReference="_102047_/l4/inscricaoEvento/ontology/index.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyIndexArtifact } from '/_102035_/l2/solution/types.js';

export const inscricaoEventoOntologyIndex = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "inscricaoEvento",
  "businessDomain": "Gestão e inscrições públicas em eventos",
  "entities": [
    "Evento",
    "Inscricao",
    "Participant",
    "Venue"
  ],
  "relationships": [
    {
      "relationshipId": "eventRegistrations",
      "fromEntity": "Evento",
      "toEntity": "Inscricao",
      "type": "oneToMany",
      "required": false,
      "description": "Um evento pode ter várias inscrições.",
      "persistence": {
        "mode": "moduleReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "Inscricao",
        "from": {
          "entityId": "Evento",
          "fieldIds": [
            "id"
          ]
        },
        "to": {
          "entityId": "Inscricao",
          "fieldIds": [
            "eventId"
          ]
        }
      }
    },
    {
      "relationshipId": "registrationParticipant",
      "fromEntity": "Inscricao",
      "toEntity": "Participant",
      "type": "manyToOne",
      "required": true,
      "description": "Cada inscrição pertence a uma pessoa participante.",
      "persistence": {
        "mode": "crossStoreReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "Inscricao",
        "from": {
          "entityId": "Inscricao",
          "fieldIds": [
            "participantId"
          ]
        },
        "to": {
          "entityId": "Participant",
          "fieldIds": [
            "id"
          ]
        }
      }
    },
    {
      "relationshipId": "eventVenue",
      "fromEntity": "Evento",
      "toEntity": "Venue",
      "type": "manyToOne",
      "required": true,
      "description": "Cada evento ocorre em um local cadastrado.",
      "persistence": {
        "mode": "crossStoreReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "Evento",
        "from": {
          "entityId": "Evento",
          "fieldIds": [
            "venueId"
          ]
        },
        "to": {
          "entityId": "Venue",
          "fieldIds": [
            "id"
          ]
        }
      }
    }
  ]
} as const satisfies Ns5OntologyIndexArtifact;

export type InscricaoEventoOntologyIndexType = typeof inscricaoEventoOntologyIndex;

export default inscricaoEventoOntologyIndex;

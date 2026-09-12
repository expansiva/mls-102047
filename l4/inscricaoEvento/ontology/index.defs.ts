/// <mls fileReference="_102047_/l4/inscricaoEvento/ontology/index.defs.ts" enhancement="_blank"/>

import type { Ns5OntologyIndexArtifact } from '/_102035_/l2/solution/types.js';

export const inscricaoEventoOntologyIndex = {
  "schemaVersion": "2026-09-11-ns5-ontology-v2",
  "moduleName": "inscricaoEvento",
  "businessDomain": "Gestão de eventos publicados e inscrições públicas, incluindo lista de espera e cancelamentos.",
  "entities": [
    "Evento",
    "Inscricao",
    "Participante"
  ],
  "relationships": [
    {
      "relationshipId": "inscricaoEvento",
      "fromEntity": "Inscricao",
      "toEntity": "Evento",
      "type": "manyToOne",
      "required": true,
      "description": "Cada inscrição pertence a um único evento.",
      "persistence": {
        "mode": "moduleReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "Inscricao",
        "from": {
          "entityId": "Inscricao",
          "fieldIds": [
            "eventoId"
          ]
        },
        "to": {
          "entityId": "Evento",
          "fieldIds": [
            "id"
          ]
        }
      }
    },
    {
      "relationshipId": "inscricaoParticipante",
      "fromEntity": "Inscricao",
      "toEntity": "Participante",
      "type": "manyToOne",
      "required": true,
      "description": "Cada inscrição identifica a pessoa participante que a realizou.",
      "persistence": {
        "mode": "crossStoreReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "Inscricao",
        "from": {
          "entityId": "Inscricao",
          "fieldIds": [
            "participanteId"
          ]
        },
        "to": {
          "entityId": "Participante",
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

/// <mls fileReference="_102047_/l1/inscricaoEvento/layer_2_application/scope/accessScope.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "accessScope",
  "artifactId": "accessScope",
  "moduleName": "inscricaoEvento",
  "status": "pending",
  "dependencies": [],
  "data": {
    "scopeId": "accessScope",
    "grants": [
      {
        "grantId": "organizadorEventos",
        "actorRef": "organizador",
        "entityRefs": [
          "Evento"
        ],
        "disclosure": "fullRecord",
        "scopeMode": "organization",
        "session": "verified",
        "path": [
          {
            "entityId": "Evento",
            "steps": [],
            "pending": ""
          }
        ],
        "pending": ""
      },
      {
        "grantId": "organizadorInscritos",
        "actorRef": "organizador",
        "entityRefs": [
          "Inscricao",
          "Participante",
          "EmailParticipante"
        ],
        "disclosure": "fieldsOnly",
        "allowedFields": [
          "Inscricao",
          "Participante.details.identification.name",
          "Participante.details.identification.status",
          "Participante.details.base.contacts",
          "EmailParticipante.details.identification.name",
          "EmailParticipante.details.contactChannel.value",
          "EmailParticipante.details.contactChannel.isVerified"
        ],
        "scopeMode": "organization",
        "session": "verified",
        "path": [
          {
            "entityId": "Inscricao",
            "steps": [],
            "pending": ""
          },
          {
            "entityId": "Participante",
            "steps": [],
            "pending": ""
          },
          {
            "entityId": "EmailParticipante",
            "steps": [],
            "pending": ""
          }
        ],
        "pending": ""
      },
      {
        "grantId": "publicoMeuCadastro",
        "actorRef": "publico",
        "anchorEntity": "Participante",
        "entityRefs": [
          "Participante",
          "EmailParticipante"
        ],
        "disclosure": "fieldsOnly",
        "allowedFields": [
          "Participante.details.identification.name",
          "Participante.details.identification.countryCode",
          "Participante.details.base.contacts",
          "Participante.details.person.privacyConsent",
          "EmailParticipante.details.identification.name",
          "EmailParticipante.details.contactChannel"
        ],
        "scopeMode": "own",
        "session": "verified",
        "path": [
          {
            "entityId": "Participante",
            "steps": [],
            "pending": ""
          },
          {
            "entityId": "EmailParticipante",
            "steps": [],
            "pending": "ANCHOR_UNRESOLVED"
          }
        ],
        "pending": ""
      },
      {
        "grantId": "publicoMinhasInscricoes",
        "actorRef": "publico",
        "anchorEntity": "Participante",
        "entityRefs": [
          "Inscricao",
          "Evento"
        ],
        "disclosure": "fieldsOnly",
        "allowedFields": [
          "Inscricao.id",
          "Inscricao.registrationCode",
          "Inscricao.eventoId",
          "Inscricao.participanteId",
          "Inscricao.status",
          "Inscricao.receivedAt",
          "Inscricao.details",
          "Evento.id",
          "Evento.title",
          "Evento.eventDate",
          "Evento.details.description",
          "Evento.details.venue",
          "Evento.details.capacity",
          "Evento.details.occupiedSeats",
          "Evento.details.remainingSeats",
          "Evento.details.waitlistSize",
          "Evento.details.isFull"
        ],
        "scopeMode": "own",
        "session": "verified",
        "path": [
          {
            "entityId": "Inscricao",
            "steps": [
              {
                "relationshipId": "inscricaoParticipante",
                "from": "Inscricao",
                "to": "Participante",
                "field": "Inscricao.participanteId"
              }
            ],
            "pending": ""
          },
          {
            "entityId": "Evento",
            "steps": [],
            "pending": "ANCHOR_UNRESOLVED"
          }
        ],
        "pending": "ACCESS_ANCHOR"
      }
    ]
  }
} as const;

export default definition;

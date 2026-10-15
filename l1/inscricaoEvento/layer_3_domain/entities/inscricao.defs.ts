/// <mls fileReference="_102047_/l1/inscricaoEvento/layer_3_domain/entities/inscricao.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "domainEntity",
  "artifactId": "Inscricao",
  "moduleName": "inscricaoEvento",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inscricaoEvento/layer_3_domain/entities/evento.defs.ts",
    "_102047_/l1/inscricaoEvento/layer_3_domain/entities/participante.defs.ts"
  ],
  "data": {
    "entityId": "Inscricao",
    "storageTarget": "moduleDatabase",
    "fields": [
      {
        "name": "id",
        "type": "uuid",
        "derived": true
      },
      {
        "name": "version",
        "type": "integer",
        "derived": true
      },
      {
        "name": "registrationCode",
        "type": "string",
        "derived": true
      },
      {
        "name": "eventoId",
        "type": "record",
        "ref": "Evento"
      },
      {
        "name": "participanteId",
        "type": "record",
        "ref": "Participante"
      },
      {
        "name": "status",
        "type": "enum"
      },
      {
        "name": "receivedAt",
        "type": "timestamp",
        "derived": true
      },
      {
        "name": "details",
        "type": "object"
      },
      {
        "name": "details.promotedAt",
        "type": "timestamp"
      },
      {
        "name": "details.cancelledAt",
        "type": "timestamp"
      },
      {
        "name": "details.posicaoListaEspera",
        "type": "integer",
        "derived": true
      },
      {
        "name": "details.ocupaVaga",
        "type": "boolean",
        "derived": true
      }
    ],
    "lifecycle": {
      "states": [
        {
          "state": "confirmed",
          "reachedBy": "command"
        },
        {
          "state": "waitlisted",
          "reachedBy": "command"
        },
        {
          "state": "cancelled",
          "reachedBy": "actor"
        }
      ],
      "transitions": [
        {
          "transitionId": "cancelar",
          "from": [
            "confirmed",
            "waitlisted"
          ],
          "to": "cancelled",
          "by": [
            "publico"
          ],
          "ruleRefs": [
            "cancelamentoSomentePropriaInscricao",
            "promoverPrimeiroListaEsperaAoCancelar"
          ]
        },
        {
          "transitionId": "promover",
          "from": [
            "waitlisted"
          ],
          "to": "confirmed",
          "by": [],
          "ruleRefs": [
            "ordemChegadaListaEspera",
            "promoverPrimeiroListaEsperaAoCancelar"
          ]
        }
      ]
    },
    "invariants": [
      "inscricaoUnicaPorEmailEvento",
      "inscricaoSomenteEventoPublicado",
      "listaEsperaQuandoVagasEsgotadas",
      "promoverPrimeiroListaEsperaAoCancelar"
    ],
    "imports": []
  }
} as const;

export default definition;

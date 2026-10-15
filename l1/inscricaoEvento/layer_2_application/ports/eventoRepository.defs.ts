/// <mls fileReference="_102047_/l1/inscricaoEvento/layer_2_application/ports/eventoRepository.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "repositoryPort",
  "artifactId": "EventoRepository",
  "moduleName": "inscricaoEvento",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inscricaoEvento/layer_3_domain/entities/evento.defs.ts"
  ],
  "data": {
    "entityId": "Evento",
    "interfaceName": "EventoRepository",
    "methods": [
      {
        "name": "create",
        "params": [
          "Evento"
        ],
        "returns": "Evento"
      },
      {
        "name": "list",
        "params": [
          "EventoFilter"
        ],
        "returns": "Evento[]"
      },
      {
        "name": "get",
        "params": [
          "id"
        ],
        "returns": "Evento"
      },
      {
        "name": "transition",
        "params": [
          "Evento",
          "transitionId"
        ],
        "returns": "Evento"
      }
    ]
  }
} as const;

export default definition;

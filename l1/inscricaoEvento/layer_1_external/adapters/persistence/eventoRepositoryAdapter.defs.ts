/// <mls fileReference="_102047_/l1/inscricaoEvento/layer_1_external/adapters/persistence/eventoRepositoryAdapter.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "repositoryAdapter",
  "artifactId": "EventoRepository",
  "moduleName": "inscricaoEvento",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inscricaoEvento/layer_1_external/adapters/persistence/evento.defs.ts",
    "_102047_/l1/inscricaoEvento/layer_2_application/ports/eventoRepository.defs.ts"
  ],
  "data": {
    "entityId": "Evento",
    "portId": "EventoRepository",
    "tableId": "evento",
    "columns": [
      {
        "field": "id",
        "column": "id"
      },
      {
        "field": "version",
        "column": "json:version"
      },
      {
        "field": "title",
        "column": "title"
      },
      {
        "field": "eventDate",
        "column": "eventDate"
      },
      {
        "field": "status",
        "column": "status"
      },
      {
        "field": "details.description",
        "column": "json:details.description"
      },
      {
        "field": "details.venue.name",
        "column": "json:details.venue.name"
      },
      {
        "field": "details.venue.address.line1",
        "column": "json:details.venue.address.line1"
      },
      {
        "field": "details.venue.address.line2",
        "column": "json:details.venue.address.line2"
      },
      {
        "field": "details.venue.address.city",
        "column": "json:details.venue.address.city"
      },
      {
        "field": "details.venue.address.stateOrProvince",
        "column": "json:details.venue.address.stateOrProvince"
      },
      {
        "field": "details.venue.address.postalCode",
        "column": "json:details.venue.address.postalCode"
      },
      {
        "field": "details.venue.address.countryCode",
        "column": "json:details.venue.address.countryCode"
      },
      {
        "field": "details.capacity",
        "column": "json:details.capacity"
      },
      {
        "field": "details.publishedAt",
        "column": "json:details.publishedAt"
      },
      {
        "field": "details.occupiedSeats",
        "column": "json:details.occupiedSeats"
      },
      {
        "field": "details.remainingSeats",
        "column": "json:details.remainingSeats"
      },
      {
        "field": "details.waitlistSize",
        "column": "json:details.waitlistSize"
      },
      {
        "field": "details.isFull",
        "column": "json:details.isFull"
      }
    ]
  }
} as const;

export default definition;

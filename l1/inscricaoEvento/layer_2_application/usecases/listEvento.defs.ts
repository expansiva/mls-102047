/// <mls fileReference="_102047_/l1/inscricaoEvento/layer_2_application/usecases/listEvento.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "listEvento",
  "moduleName": "inscricaoEvento",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inscricaoEvento/layer_2_application/ports/eventoRepository.defs.ts",
    "_102047_/l1/inscricaoEvento/layer_3_domain/entities/evento.defs.ts"
  ],
  "data": {
    "usecaseId": "listEvento",
    "entityId": "Evento",
    "operation": "list",
    "rulesApplied": [],
    "effects": []
  }
} as const;

export default definition;

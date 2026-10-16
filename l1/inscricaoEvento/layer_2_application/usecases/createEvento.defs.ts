/// <mls fileReference="_102047_/l1/inscricaoEvento/layer_2_application/usecases/createEvento.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "createEvento",
  "moduleName": "inscricaoEvento",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inscricaoEvento/layer_2_application/ports/eventoRepository.defs.ts",
    "_102047_/l1/inscricaoEvento/layer_3_domain/entities/evento.defs.ts",
    "_102047_/l4/inscricaoEvento/rules.defs.ts"
  ],
  "data": {
    "usecaseId": "createEvento",
    "entityId": "Evento",
    "operation": "create",
    "rulesApplied": [
      "inscricaoExcedenteVaiParaListaEspera",
      "inscricaoSomenteEventoPublicado",
      "vagasNaoMenorQueOcupadas"
    ],
    "effects": []
  }
} as const;

export default definition;

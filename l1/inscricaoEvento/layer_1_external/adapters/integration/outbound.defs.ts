/// <mls fileReference="_102047_/l1/inscricaoEvento/layer_1_external/adapters/integration/outbound.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "integrationOutbound",
  "artifactId": "outbound",
  "moduleName": "inscricaoEvento",
  "status": "blocked",
  "dependencies": [
    "_102047_/l1/inscricaoEvento/layer_2_application/usecases/cancelar.defs.ts",
    "_102047_/l1/inscricaoEvento/layer_2_application/usecases/createInscricao.defs.ts",
    "_102047_/l1/inscricaoEvento/layer_2_application/usecases/publicar.defs.ts"
  ],
  "data": {
    "integrationId": "outbound",
    "events": [
      {
        "eventId": "eventoPublicado",
        "on": "Evento.publicar",
        "entityId": "Evento",
        "mechanism": "",
        "consumer": "publicar"
      },
      {
        "eventId": "inscricaoCancelada",
        "on": "Inscricao.cancelar",
        "entityId": "Inscricao",
        "mechanism": "",
        "consumer": "cancelar"
      },
      {
        "eventId": "inscricaoPromovida",
        "on": "Inscricao.promover",
        "entityId": "Inscricao",
        "mechanism": "",
        "consumer": "Inscricao.promover"
      },
      {
        "eventId": "inscricaoRealizada",
        "on": "Inscricao.create",
        "entityId": "Inscricao",
        "mechanism": "",
        "consumer": "createInscricao"
      }
    ]
  }
} as const;

export default definition;

/// <mls fileReference="_102047_/l1/inscricaoEvento/layer_2_application/usecases/cancelar.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "cancelar",
  "moduleName": "inscricaoEvento",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inscricaoEvento/layer_2_application/ports/inscricaoRepository.defs.ts",
    "_102047_/l1/inscricaoEvento/layer_3_domain/entities/inscricao.defs.ts",
    "_102047_/l4/inscricaoEvento/integration.defs.ts",
    "_102047_/l4/inscricaoEvento/ontology/Inscricao.defs.ts",
    "_102047_/l4/inscricaoEvento/rules.defs.ts"
  ],
  "data": {
    "usecaseId": "cancelar",
    "entityId": "Inscricao",
    "operation": "transition",
    "rulesApplied": [
      "cancelamentoSomentePropriaInscricao",
      "promoverPrimeiroListaEsperaAoCancelar"
    ],
    "effects": [
      {
        "eventId": "inscricaoCancelada",
        "path": "l4/inscricaoEvento/integration.defs.ts",
        "symbol": "inscricaoCancelada"
      }
    ],
    "transitionRef": "cancelar"
  }
} as const;

export default definition;

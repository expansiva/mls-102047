/// <mls fileReference="_102047_/l1/inscricaoEvento/layer_2_application/usecases/createInscricao.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "createInscricao",
  "moduleName": "inscricaoEvento",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inscricaoEvento/layer_2_application/ports/inscricaoRepository.defs.ts",
    "_102047_/l1/inscricaoEvento/layer_3_domain/entities/inscricao.defs.ts",
    "_102047_/l4/inscricaoEvento/rules.defs.ts"
  ],
  "data": {
    "usecaseId": "createInscricao",
    "entityId": "Inscricao",
    "operation": "create",
    "rulesApplied": [
      "inscricaoSomenteEventoPublicado",
      "inscricaoUnicaPorEmailEvento",
      "listaEsperaQuandoVagasEsgotadas"
    ],
    "effects": []
  }
} as const;

export default definition;

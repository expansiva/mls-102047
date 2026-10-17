/// <mls fileReference="_102047_/l1/inicio/layer_1_external/adapters/http/controllers/inicio_responsavel.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "inicio_responsavel",
  "moduleName": "inicio",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inicio/layer_1_external/auth/authorityMap.defs.ts",
    "_102047_/l1/inicio/layer_2_application/requests/inicio_responsavel.defs.ts",
    "_102047_/l1/inicio/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "pageId": "inicio_responsavel",
    "handlers": [
      {
        "route": "inicio.inicio_responsavel.qryPainelResponsavel",
        "kind": "query",
        "grantIds": [
          "responsavelPrepararEmpresa"
        ],
        "serviceFunction": "inicio.inicio_responsavel.qryPainelResponsavel",
        "contractPath": "l2/inicio/web/contracts/inicio_responsavel.defs.ts",
        "contractInterface": "Inicio_responsavelContracts"
      },
      {
        "route": "inicio.inicio_responsavel.qryPessoasAguardandoLiberacao",
        "kind": "query",
        "grantIds": [
          "responsavelAcompanharPessoas",
          "responsavelMeuAcesso"
        ],
        "serviceFunction": "inicio.inicio_responsavel.qryPessoasAguardandoLiberacao",
        "contractPath": "l2/inicio/web/contracts/inicio_responsavel.defs.ts",
        "contractInterface": "Inicio_responsavelContracts"
      }
    ]
  }
} as const;

export default definition;

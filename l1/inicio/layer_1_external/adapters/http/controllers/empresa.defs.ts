/// <mls fileReference="_102047_/l1/inicio/layer_1_external/adapters/http/controllers/empresa.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "empresa",
  "moduleName": "inicio",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inicio/layer_1_external/auth/authorityMap.defs.ts",
    "_102047_/l1/inicio/layer_2_application/requests/empresa.defs.ts",
    "_102047_/l1/inicio/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "pageId": "empresa",
    "handlers": [
      {
        "route": "inicio.empresa.cmdSalvarDadosEmpresa",
        "kind": "command",
        "grantIds": [
          "responsavelPrepararEmpresa"
        ],
        "serviceFunction": "inicio.empresa.cmdSalvarDadosEmpresa",
        "contractPath": "l2/inicio/web/contracts/empresa.defs.ts",
        "contractInterface": "EmpresaContracts"
      },
      {
        "route": "inicio.empresa.qryEmpresaPreparo",
        "kind": "query",
        "grantIds": [
          "responsavelPrepararEmpresa"
        ],
        "serviceFunction": "inicio.empresa.qryEmpresaPreparo",
        "contractPath": "l2/inicio/web/contracts/empresa.defs.ts",
        "contractInterface": "EmpresaContracts"
      }
    ]
  }
} as const;

export default definition;

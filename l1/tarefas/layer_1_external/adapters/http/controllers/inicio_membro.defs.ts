/// <mls fileReference="_102047_/l1/tarefas/layer_1_external/adapters/http/controllers/inicio_membro.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "inicio_membro",
  "moduleName": "tarefas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/tarefas/layer_1_external/auth/authorityMap.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/requests/inicio_membro.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "pageId": "inicio_membro",
    "handlers": [
      {
        "route": "tarefas.inicio_membro.aceitarEntrega",
        "kind": "command",
        "grantIds": [
          "membroTarefasProprias",
          "membroConsultaListas"
        ],
        "serviceFunction": "tarefas.inicio_membro.aceitarEntrega",
        "contractPath": "l2/tarefas/web/contracts/inicio_membro.defs.ts",
        "contractInterface": "Inicio_membroContracts"
      },
      {
        "route": "tarefas.inicio_membro.carregarInicio",
        "kind": "query",
        "grantIds": [
          "membroTarefasProprias",
          "membroConsultaListas",
          "membroAvisosProprios"
        ],
        "serviceFunction": "tarefas.inicio_membro.carregarInicio",
        "contractPath": "l2/tarefas/web/contracts/inicio_membro.defs.ts",
        "contractInterface": "Inicio_membroContracts"
      },
      {
        "route": "tarefas.inicio_membro.devolverComMotivo",
        "kind": "command",
        "grantIds": [
          "membroTarefasProprias",
          "membroConsultaListas"
        ],
        "serviceFunction": "tarefas.inicio_membro.devolverComMotivo",
        "contractPath": "l2/tarefas/web/contracts/inicio_membro.defs.ts",
        "contractInterface": "Inicio_membroContracts"
      },
      {
        "route": "tarefas.inicio_membro.enviarParaRevisao",
        "kind": "command",
        "grantIds": [
          "membroTarefasProprias",
          "membroConsultaListas"
        ],
        "serviceFunction": "tarefas.inicio_membro.enviarParaRevisao",
        "contractPath": "l2/tarefas/web/contracts/inicio_membro.defs.ts",
        "contractInterface": "Inicio_membroContracts"
      },
      {
        "route": "tarefas.inicio_membro.iniciarTarefa",
        "kind": "command",
        "grantIds": [
          "membroTarefasProprias",
          "membroConsultaListas"
        ],
        "serviceFunction": "tarefas.inicio_membro.iniciarTarefa",
        "contractPath": "l2/tarefas/web/contracts/inicio_membro.defs.ts",
        "contractInterface": "Inicio_membroContracts"
      }
    ]
  }
} as const;

export default definition;

/// <mls fileReference="_102047_/l1/tarefas/layer_1_external/adapters/http/controllers/minhas_tarefas.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "minhas_tarefas",
  "moduleName": "tarefas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/tarefas/layer_1_external/auth/authorityMap.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/requests/minhas_tarefas.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "pageId": "minhas_tarefas",
    "handlers": [
      {
        "route": "tarefas.minhas_tarefas.abrirTarefa",
        "kind": "query",
        "grantIds": [
          "membroTarefasProprias",
          "membroConsultaListas",
          "membroEscolheResponsavel"
        ],
        "serviceFunction": "tarefas.minhas_tarefas.abrirTarefa",
        "contractPath": "l2/tarefas/web/contracts/minhas_tarefas.defs.ts",
        "contractInterface": "Minhas_tarefasContracts"
      },
      {
        "route": "tarefas.minhas_tarefas.aceitarTarefa",
        "kind": "command",
        "grantIds": [
          "membroTarefasProprias",
          "membroConsultaListas",
          "membroEscolheResponsavel"
        ],
        "serviceFunction": "tarefas.minhas_tarefas.aceitarTarefa",
        "contractPath": "l2/tarefas/web/contracts/minhas_tarefas.defs.ts",
        "contractInterface": "Minhas_tarefasContracts"
      },
      {
        "route": "tarefas.minhas_tarefas.buscarMembros",
        "kind": "query",
        "grantIds": [
          "membroEscolheResponsavel"
        ],
        "serviceFunction": "tarefas.minhas_tarefas.buscarMembros",
        "contractPath": "l2/tarefas/web/contracts/minhas_tarefas.defs.ts",
        "contractInterface": "Minhas_tarefasContracts"
      },
      {
        "route": "tarefas.minhas_tarefas.cancelarTarefa",
        "kind": "command",
        "grantIds": [
          "membroTarefasProprias",
          "membroConsultaListas",
          "membroEscolheResponsavel"
        ],
        "serviceFunction": "tarefas.minhas_tarefas.cancelarTarefa",
        "contractPath": "l2/tarefas/web/contracts/minhas_tarefas.defs.ts",
        "contractInterface": "Minhas_tarefasContracts"
      },
      {
        "route": "tarefas.minhas_tarefas.carregarMinhasTarefas",
        "kind": "query",
        "grantIds": [
          "membroTarefasProprias",
          "membroConsultaListas",
          "membroEscolheResponsavel"
        ],
        "serviceFunction": "tarefas.minhas_tarefas.carregarMinhasTarefas",
        "contractPath": "l2/tarefas/web/contracts/minhas_tarefas.defs.ts",
        "contractInterface": "Minhas_tarefasContracts"
      },
      {
        "route": "tarefas.minhas_tarefas.criarTarefa",
        "kind": "command",
        "grantIds": [
          "membroTarefasProprias",
          "membroConsultaListas",
          "membroEscolheResponsavel"
        ],
        "serviceFunction": "tarefas.minhas_tarefas.criarTarefa",
        "contractPath": "l2/tarefas/web/contracts/minhas_tarefas.defs.ts",
        "contractInterface": "Minhas_tarefasContracts"
      },
      {
        "route": "tarefas.minhas_tarefas.devolverTarefa",
        "kind": "command",
        "grantIds": [
          "membroTarefasProprias",
          "membroConsultaListas",
          "membroEscolheResponsavel"
        ],
        "serviceFunction": "tarefas.minhas_tarefas.devolverTarefa",
        "contractPath": "l2/tarefas/web/contracts/minhas_tarefas.defs.ts",
        "contractInterface": "Minhas_tarefasContracts"
      },
      {
        "route": "tarefas.minhas_tarefas.enviarParaRevisao",
        "kind": "command",
        "grantIds": [
          "membroTarefasProprias",
          "membroConsultaListas",
          "membroEscolheResponsavel"
        ],
        "serviceFunction": "tarefas.minhas_tarefas.enviarParaRevisao",
        "contractPath": "l2/tarefas/web/contracts/minhas_tarefas.defs.ts",
        "contractInterface": "Minhas_tarefasContracts"
      },
      {
        "route": "tarefas.minhas_tarefas.iniciarTarefa",
        "kind": "command",
        "grantIds": [
          "membroTarefasProprias",
          "membroConsultaListas",
          "membroEscolheResponsavel"
        ],
        "serviceFunction": "tarefas.minhas_tarefas.iniciarTarefa",
        "contractPath": "l2/tarefas/web/contracts/minhas_tarefas.defs.ts",
        "contractInterface": "Minhas_tarefasContracts"
      },
      {
        "route": "tarefas.minhas_tarefas.listarMinhasTarefas",
        "kind": "query",
        "grantIds": [
          "membroTarefasProprias",
          "membroConsultaListas",
          "membroEscolheResponsavel"
        ],
        "serviceFunction": "tarefas.minhas_tarefas.listarMinhasTarefas",
        "contractPath": "l2/tarefas/web/contracts/minhas_tarefas.defs.ts",
        "contractInterface": "Minhas_tarefasContracts"
      },
      {
        "route": "tarefas.minhas_tarefas.salvarChecklist",
        "kind": "command",
        "grantIds": [
          "membroTarefasProprias",
          "membroConsultaListas",
          "membroEscolheResponsavel"
        ],
        "serviceFunction": "tarefas.minhas_tarefas.salvarChecklist",
        "contractPath": "l2/tarefas/web/contracts/minhas_tarefas.defs.ts",
        "contractInterface": "Minhas_tarefasContracts"
      },
      {
        "route": "tarefas.minhas_tarefas.salvarEdicao",
        "kind": "command",
        "grantIds": [
          "membroTarefasProprias",
          "membroConsultaListas",
          "membroEscolheResponsavel"
        ],
        "serviceFunction": "tarefas.minhas_tarefas.salvarEdicao",
        "contractPath": "l2/tarefas/web/contracts/minhas_tarefas.defs.ts",
        "contractInterface": "Minhas_tarefasContracts"
      }
    ]
  }
} as const;

export default definition;

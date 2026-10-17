/// <mls fileReference="_102047_/l1/inicio/layer_2_application/workflows/liberacaoAcessoPessoa.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "workflowProcess",
  "artifactId": "liberacaoAcessoPessoa",
  "moduleName": "inicio",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inicio/layer_2_application/usecases/updatePessoaOrganizacao.defs.ts",
    "_102047_/l4/inicio/journeys/acompanharAcessoPessoas.defs.ts",
    "_102047_/l4/inicio/journeys/aguardarLiberacaoAcesso.defs.ts",
    "_102047_/l4/inicio/journeys/completarMeuAcesso.defs.ts",
    "_102047_/l4/inicio/workflows.defs.ts"
  ],
  "data": {
    "processId": "liberacaoAcessoPessoa",
    "trigger": {
      "kind": "manual",
      "actorRef": "pessoaOrganizacao"
    },
    "functions": [
      "abrirPedidoLiberacaoAcesso",
      "resolverResponsavelLiberacao",
      "registrarLiberacaoConcluida",
      "concluirLiberacaoAcesso"
    ],
    "operations": [
      {
        "operation": "PessoaOrganizacao.update",
        "steps": [
          "journey:completarMeuAcesso/preencherDadosMinimos"
        ]
      }
    ]
  }
} as const;

export default definition;

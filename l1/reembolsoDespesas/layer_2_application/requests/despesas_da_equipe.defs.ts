/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/requests/despesas_da_equipe.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "despesas_da_equipe",
  "moduleName": "reembolsoDespesas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/reembolsoDespesas/layer_2_application/usecases/aprovarDespesa.defs.ts",
    "_102047_/l1/reembolsoDespesas/layer_2_application/usecases/getDespesa.defs.ts",
    "_102047_/l1/reembolsoDespesas/layer_2_application/usecases/listDespesa.defs.ts",
    "_102047_/l1/reembolsoDespesas/layer_2_application/usecases/rejeitarDespesa.defs.ts"
  ],
  "data": {
    "pageId": "despesas_da_equipe",
    "requests": [
      {
        "route": "reembolsoDespesas.despesas_da_equipe.listarDespesasPendentesEquipe",
        "kind": "qry",
        "uses": [
          "listDespesa"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "unresolved",
            "path": "despesas.items.details",
            "reason": "DISCLOSURE: Route reembolsoDespesas.despesas_da_equipe.listarDespesasPendentesEquipe projects items.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
          },
          {
            "kind": "list",
            "path": "despesas",
            "entity": "Despesa",
            "items": "items",
            "page": "despesas.page",
            "pageSize": "despesas.pageSize",
            "hasMore": "despesas.hasMore",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "colaboradorId",
                "path": "colaboradorId"
              },
              {
                "field": "status",
                "path": "status"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "despesas.colaborador",
            "reason": "Interface ColaboradorNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "despesas.items.colaborador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route reembolsoDespesas.despesas_da_equipe.listarDespesasPendentesEquipe projects Despesa.colaborador, which is not a field of the ontology."
          }
        ],
        "params": [
          {
            "name": "page",
            "target": "despesas",
            "pages": "despesas"
          },
          {
            "name": "pageSize",
            "target": "despesas",
            "pages": "despesas"
          }
        ],
        "rules": [
          "managerTeamExpenseAccess"
        ],
        "doc": {
          "raw": "Finalidade: Carrega a fila paginada de despesas da equipe do gestor que aguardam aprovação, para ele escolher qual analisar.\nEntrada: page: número da página solicitada; pageSize: quantidade de despesas por página.\nProcessamento: Filtra Despesa com status ’awaitingApproval’ cujos colaboradores pertencem à equipe do gestor autenticado (managerTeamExpenseAccess: o gestor só consulta despesas de colaboradores da própria equipe, via relacionamento ReportsTo). Compõe cada linha com o nome do colaborador lido pelo colaboradorId. Ordena pela data da despesa, da mais antiga para a mais recente.\nSaída: Lista paginada { items, page, pageSize, hasMore } com id, colaborador, situação, data, categoria e valor de cada despesa pendente, já no formato da fila.",
          "purpose": "Carrega a fila paginada de despesas da equipe do gestor que aguardam aprovação, para ele escolher qual analisar.",
          "input": "page: número da página solicitada; pageSize: quantidade de despesas por página.",
          "processing": "Filtra Despesa com status ’awaitingApproval’ cujos colaboradores pertencem à equipe do gestor autenticado (managerTeamExpenseAccess: o gestor só consulta despesas de colaboradores da própria equipe, via relacionamento ReportsTo). Compõe cada linha com o nome do colaborador lido pelo colaboradorId. Ordena pela data da despesa, da mais antiga para a mais recente.",
          "output": "Lista paginada { items, page, pageSize, hasMore } com id, colaborador, situação, data, categoria e valor de cada despesa pendente, já no formato da fila."
        }
      },
      {
        "route": "reembolsoDespesas.despesas_da_equipe.obterDespesaParaAnalise",
        "kind": "qry",
        "uses": [
          "getDespesa"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "unresolved",
            "path": "despesa.details",
            "reason": "DISCLOSURE: Route reembolsoDespesas.despesas_da_equipe.obterDespesaParaAnalise projects details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
          },
          {
            "kind": "entity",
            "path": "despesa",
            "entity": "Despesa",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "version",
                "path": "version"
              },
              {
                "field": "colaboradorId",
                "path": "colaboradorId"
              },
              {
                "field": "status",
                "path": "status"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "despesa.colaborador",
            "reason": "Interface ColaboradorNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "despesa.colaborador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route reembolsoDespesas.despesas_da_equipe.obterDespesaParaAnalise projects Despesa.colaborador, which is not a field of the ontology."
          }
        ],
        "params": [
          {
            "name": "despesaId",
            "target": "despesa",
            "field": "details.categoria"
          }
        ],
        "rules": [
          "managerTeamExpenseAccess"
        ],
        "doc": {
          "raw": "Finalidade: Carrega os dados completos da despesa escolhida na fila para análise e decisão.\nEntrada: despesaId: identificador da despesa selecionada na fila.\nProcessamento: Lê a despesa pelo id e recusa se o colaborador dono não pertencer à equipe do gestor (managerTeamExpenseAccess). Compõe com o nome do colaborador. O comprovante é consultado pelo anexo da despesa (attach.document).\nSaída: A despesa com versão, situação, data, categoria, valor, descrição, indicação de reenvio, motivo de rejeição anterior e nome do colaborador; a versão é usada pelos comandos de decisão.",
          "purpose": "Carrega os dados completos da despesa escolhida na fila para análise e decisão.",
          "input": "despesaId: identificador da despesa selecionada na fila.",
          "processing": "Lê a despesa pelo id e recusa se o colaborador dono não pertencer à equipe do gestor (managerTeamExpenseAccess). Compõe com o nome do colaborador. O comprovante é consultado pelo anexo da despesa (attach.document).",
          "output": "A despesa com versão, situação, data, categoria, valor, descrição, indicação de reenvio, motivo de rejeição anterior e nome do colaborador; a versão é usada pelos comandos de decisão."
        }
      },
      {
        "route": "reembolsoDespesas.despesas_da_equipe.aprovarDespesa",
        "kind": "cmd",
        "uses": [
          "aprovarDespesa"
        ],
        "transaction": "single",
        "output": [
          {
            "kind": "unresolved",
            "path": "despesa.details",
            "reason": "DISCLOSURE: Route reembolsoDespesas.despesas_da_equipe.aprovarDespesa projects details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
          },
          {
            "kind": "entity",
            "path": "despesa",
            "entity": "Despesa",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "version",
                "path": "version"
              },
              {
                "field": "colaboradorId",
                "path": "colaboradorId"
              },
              {
                "field": "status",
                "path": "status"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "despesa.colaborador",
            "reason": "Interface ColaboradorNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "despesa.colaborador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route reembolsoDespesas.despesas_da_equipe.aprovarDespesa projects Despesa.colaborador, which is not a field of the ontology."
          }
        ],
        "params": [],
        "rules": [
          "managerTeamExpenseAccess"
        ],
        "doc": {
          "raw": "Finalidade: Aprova a despesa em análise para que siga ao financeiro.\nEntrada: despesaId: despesa a aprovar; version: versão lida, para controle de concorrência otimista.\nProcessamento: Verifica que a despesa é de colaborador da equipe do gestor (managerTeamExpenseAccess) e que está em ’awaitingApproval’; executa a transição aprovarDespesa para ’approved’, recusando se a versão divergir.\nSaída: A despesa atualizada, para redesenhar a análise e retirá-la da fila de pendentes sem nova chamada.",
          "purpose": "Aprova a despesa em análise para que siga ao financeiro.",
          "input": "despesaId: despesa a aprovar; version: versão lida, para controle de concorrência otimista.",
          "processing": "Verifica que a despesa é de colaborador da equipe do gestor (managerTeamExpenseAccess) e que está em ’awaitingApproval’; executa a transição aprovarDespesa para ’approved’, recusando se a versão divergir.",
          "output": "A despesa atualizada, para redesenhar a análise e retirá-la da fila de pendentes sem nova chamada."
        }
      },
      {
        "route": "reembolsoDespesas.despesas_da_equipe.rejeitarDespesa",
        "kind": "cmd",
        "uses": [
          "rejeitarDespesa"
        ],
        "transaction": "single",
        "output": [
          {
            "kind": "unresolved",
            "path": "despesa.details",
            "reason": "DISCLOSURE: Route reembolsoDespesas.despesas_da_equipe.rejeitarDespesa projects details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
          },
          {
            "kind": "entity",
            "path": "despesa",
            "entity": "Despesa",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "version",
                "path": "version"
              },
              {
                "field": "colaboradorId",
                "path": "colaboradorId"
              },
              {
                "field": "status",
                "path": "status"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "despesa.colaborador",
            "reason": "Interface ColaboradorNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "despesa.colaborador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route reembolsoDespesas.despesas_da_equipe.rejeitarDespesa projects Despesa.colaborador, which is not a field of the ontology."
          }
        ],
        "params": [],
        "rules": [
          "managerTeamExpenseAccess",
          "rejectionReasonRequired"
        ],
        "doc": {
          "raw": "Finalidade: Rejeita a despesa em análise registrando o motivo informado pelo gestor.\nEntrada: despesaId: despesa a rejeitar; version: versão lida, para concorrência otimista; motivoRejeicao: justificativa da rejeição.\nProcessamento: Verifica que a despesa é de colaborador da equipe do gestor (managerTeamExpenseAccess) e que está em ’awaitingApproval’; recusa se o motivo estiver vazio (rejectionReasonRequired); executa a transição rejeitarDespesa para ’rejected’ gravando details.motivoRejeicao, recusando se a versão divergir.\nSaída: A despesa atualizada com o motivo, para redesenhar a análise e retirá-la da fila de pendentes sem nova chamada.",
          "purpose": "Rejeita a despesa em análise registrando o motivo informado pelo gestor.",
          "input": "despesaId: despesa a rejeitar; version: versão lida, para concorrência otimista; motivoRejeicao: justificativa da rejeição.",
          "processing": "Verifica que a despesa é de colaborador da equipe do gestor (managerTeamExpenseAccess) e que está em ’awaitingApproval’; recusa se o motivo estiver vazio (rejectionReasonRequired); executa a transição rejeitarDespesa para ’rejected’ gravando details.motivoRejeicao, recusando se a versão divergir.",
          "output": "A despesa atualizada com o motivo, para redesenhar a análise e retirá-la da fila de pendentes sem nova chamada."
        }
      }
    ]
  }
} as const;

export default definition;

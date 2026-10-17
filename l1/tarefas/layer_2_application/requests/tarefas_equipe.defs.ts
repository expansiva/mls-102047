/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/requests/tarefas_equipe.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "tarefas_equipe",
  "moduleName": "tarefas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/tarefas/layer_2_application/usecases/cancelar.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/getLista.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/getMembroEquipe.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/getTarefa.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/listItemChecklist.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/listLista.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/listMembroEquipe.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/listTarefa.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/updateTarefa.defs.ts"
  ],
  "data": {
    "pageId": "tarefas_equipe",
    "requests": [
      {
        "route": "tarefas.tarefas_equipe.carregarOpcoesEquipe",
        "kind": "qry",
        "uses": [
          "listLista",
          "listMembroEquipe",
          "getMembroEquipe"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "list",
            "path": "listas",
            "entity": "Lista",
            "items": "",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "nome",
                "path": "nome"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "membros.details",
            "reason": "DISCLOSURE: Route tarefas.tarefas_equipe.carregarOpcoesEquipe projects details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
          },
          {
            "kind": "list",
            "path": "membros",
            "entity": "MembroEquipe",
            "items": "",
            "fields": [
              {
                "field": "id",
                "path": "id"
              }
            ]
          },
          {
            "kind": "related",
            "path": "membros.details.identification",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "name",
                "path": "details.identification.name"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "membros.details.identification.status",
            "reason": "COMPUTED_NOT_DISCLOSED: tarefas.tarefas_equipe.carregarOpcoesEquipe details.identification.status"
          },
          {
            "kind": "unresolved",
            "path": "membros.details.identification",
            "reason": "MembroEquipe inside MembroEquipe needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "membros.details.identification.status",
            "reason": "Interface MembroIdentificacao: readonly status is not a field of MembroEquipe; it may stand for one of its paths."
          }
        ],
        "params": [],
        "rules": [
          "responsavelDeveSerMembroAtivo"
        ],
        "doc": {
          "raw": "Finalidade: Carrega de uma vez as listas e os membros da equipe usados nos filtros do quadro e na escolha do novo responsável.\nEntrada: Nenhuma entrada; o escopo é a equipe (organização) do gestor logado.\nProcessamento: Lê todas as listas da organização ordenadas por nome e todos os membros da equipe (papel tarefas.MembroEquipe) ordenados por nome, com a situação no cadastro. A situação permite distinguir os membros ativos, os únicos aceitos como responsável (responsavelDeveSerMembroAtivo).\nSaída: listas: id e nome de cada lista; membros: id, nome e situação no cadastro de cada membro da equipe.",
          "purpose": "Carrega de uma vez as listas e os membros da equipe usados nos filtros do quadro e na escolha do novo responsável.",
          "input": "Nenhuma entrada; o escopo é a equipe (organização) do gestor logado.",
          "processing": "Lê todas as listas da organização ordenadas por nome e todos os membros da equipe (papel tarefas.MembroEquipe) ordenados por nome, com a situação no cadastro. A situação permite distinguir os membros ativos, os únicos aceitos como responsável (responsavelDeveSerMembroAtivo).",
          "output": "listas: id e nome de cada lista; membros: id, nome e situação no cadastro de cada membro da equipe."
        }
      },
      {
        "route": "tarefas.tarefas_equipe.listarTarefasEquipe",
        "kind": "qry",
        "uses": [
          "listTarefa",
          "getLista",
          "getMembroEquipe"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "list",
            "path": "tarefas",
            "entity": "Tarefa",
            "items": "items",
            "page": "tarefas.page",
            "pageSize": "tarefas.pageSize",
            "hasMore": "tarefas.hasMore",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "titulo",
                "path": "titulo"
              },
              {
                "field": "listaId",
                "path": "listaId"
              },
              {
                "field": "responsavelId",
                "path": "responsavelId"
              },
              {
                "field": "prioridade",
                "path": "prioridade"
              },
              {
                "field": "prazo",
                "path": "prazo"
              },
              {
                "field": "status",
                "path": "status"
              },
              {
                "field": "details",
                "path": "details"
              }
            ]
          },
          {
            "kind": "related",
            "path": "tarefas.items.lista",
            "entity": "Lista",
            "relationship": "tarefaLista",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "nome",
                "path": "nome"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "tarefas.items.responsavel.details",
            "reason": "DISCLOSURE: Route tarefas.tarefas_equipe.listarTarefasEquipe projects items.responsavel.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
          },
          {
            "kind": "related",
            "path": "tarefas.items.responsavel",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "id",
                "path": "id"
              }
            ]
          },
          {
            "kind": "related",
            "path": "tarefas.items.responsavel.details.identification",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "name",
                "path": "details.identification.name"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "tarefas.items.responsavel.details.identification.status",
            "reason": "COMPUTED_NOT_DISCLOSED: tarefas.tarefas_equipe.listarTarefasEquipe items.responsavel.details.identification.status"
          },
          {
            "kind": "unresolved",
            "path": "tarefas.responsavel",
            "reason": "MembroEquipe inside Tarefa needs one L4 relationship between them; found 2."
          },
          {
            "kind": "unresolved",
            "path": "tarefas.responsavel.details.identification",
            "reason": "MembroEquipe inside MembroEquipe needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "tarefas.responsavel.details.identification.status",
            "reason": "Interface MembroIdentificacao: readonly status is not a field of MembroEquipe; it may stand for one of its paths."
          }
        ],
        "params": [
          {
            "name": "page",
            "target": "tarefas",
            "pages": "tarefas"
          },
          {
            "name": "pageSize",
            "target": "tarefas",
            "pages": "tarefas"
          },
          {
            "name": "listaId",
            "target": "tarefas",
            "field": "listaId"
          },
          {
            "name": "responsavelId",
            "target": "tarefas",
            "field": "responsavelId"
          },
          {
            "name": "prioridade",
            "target": "tarefas",
            "field": "prioridade"
          },
          {
            "name": "status",
            "target": "tarefas",
            "field": "status"
          },
          {
            "name": "details",
            "target": "tarefas",
            "field": "details"
          }
        ],
        "rules": [
          "editarSomenteTarefaVisivel"
        ],
        "doc": {
          "raw": "Finalidade: Lista paginada de todas as tarefas da equipe com os filtros do quadro do gestor; roda ao abrir e a cada mudança de filtro ou página.\nEntrada: listaId, responsavelId, prioridade, status: filtros exatos opcionais; prazoDe/prazoAte: intervalo opcional de prazo; details.venceHoje/details.atrasada: quando true, só tarefas abertas que vencem hoje ou estão atrasadas; page e pageSize: paginação.\nProcessamento: O gestor vê todas as tarefas da equipe (editarSomenteTarefaVisivel, escopo da organização). Aplica os filtros informados, ordena atrasadas e que vencem hoje primeiro e depois por prazo. Junta o nome da lista e o nome do responsável (cadastro mestre). Calcula venceHoje e atrasada (tarefa aberta com prazo igual ou anterior a hoje) e progressoChecklist (itens feitos do total, contagem dos ItemChecklist da tarefa); nada é gravado.\nSaída: Página { items, page, pageSize, hasMore } de tarefas com título, lista, responsável, prioridade, prazo, situação, sinais de vencimento e progresso da checklist.",
          "purpose": "Lista paginada de todas as tarefas da equipe com os filtros do quadro do gestor; roda ao abrir e a cada mudança de filtro ou página.",
          "input": "listaId, responsavelId, prioridade, status: filtros exatos opcionais; prazoDe/prazoAte: intervalo opcional de prazo; details.venceHoje/details.atrasada: quando true, só tarefas abertas que vencem hoje ou estão atrasadas; page e pageSize: paginação.",
          "processing": "O gestor vê todas as tarefas da equipe (editarSomenteTarefaVisivel, escopo da organização). Aplica os filtros informados, ordena atrasadas e que vencem hoje primeiro e depois por prazo. Junta o nome da lista e o nome do responsável (cadastro mestre). Calcula venceHoje e atrasada (tarefa aberta com prazo igual ou anterior a hoje) e progressoChecklist (itens feitos do total, contagem dos ItemChecklist da tarefa); nada é gravado.",
          "output": "Página { items, page, pageSize, hasMore } de tarefas com título, lista, responsável, prioridade, prazo, situação, sinais de vencimento e progresso da checklist."
        }
      },
      {
        "route": "tarefas.tarefas_equipe.obterTarefa",
        "kind": "qry",
        "uses": [
          "getTarefa",
          "getMembroEquipe",
          "listItemChecklist"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "entity",
            "path": "tarefa",
            "entity": "Tarefa",
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
                "field": "titulo",
                "path": "titulo"
              },
              {
                "field": "status",
                "path": "status"
              },
              {
                "field": "prioridade",
                "path": "prioridade"
              },
              {
                "field": "prazo",
                "path": "prazo"
              },
              {
                "field": "criadaEm",
                "path": "criadaEm"
              },
              {
                "field": "criadorId",
                "path": "criadorId"
              },
              {
                "field": "responsavelId",
                "path": "responsavelId"
              },
              {
                "field": "details",
                "path": "details"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador.details",
            "reason": "DISCLOSURE: Route tarefas.tarefas_equipe.obterTarefa projects criador.details, responsavel.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
          },
          {
            "kind": "related",
            "path": "tarefa.criador",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "id",
                "path": "id"
              }
            ]
          },
          {
            "kind": "related",
            "path": "tarefa.criador.details.identification",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "name",
                "path": "details.identification.name"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador.details.identification.status",
            "reason": "COMPUTED_NOT_DISCLOSED: tarefas.tarefas_equipe.obterTarefa criador.details.identification.status"
          },
          {
            "kind": "unresolved",
            "path": "tarefa.responsavel.details",
            "reason": "DISCLOSURE: Route tarefas.tarefas_equipe.obterTarefa projects criador.details, responsavel.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
          },
          {
            "kind": "related",
            "path": "tarefa.responsavel",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "id",
                "path": "id"
              }
            ]
          },
          {
            "kind": "related",
            "path": "tarefa.responsavel.details.identification",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "name",
                "path": "details.identification.name"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "tarefa.responsavel.details.identification.status",
            "reason": "COMPUTED_NOT_DISCLOSED: tarefas.tarefas_equipe.obterTarefa responsavel.details.identification.status"
          },
          {
            "kind": "related",
            "path": "tarefa.itensChecklist",
            "entity": "ItemChecklist",
            "relationship": "itemChecklistTarefa",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "ordem",
                "path": "ordem"
              },
              {
                "field": "feito",
                "path": "feito"
              },
              {
                "field": "details",
                "path": "details"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador",
            "reason": "MembroEquipe inside Tarefa needs one L4 relationship between them; found 2."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador.details.identification",
            "reason": "MembroEquipe inside MembroEquipe needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador.details.identification.status",
            "reason": "Interface MembroIdentificacao: readonly status is not a field of MembroEquipe; it may stand for one of its paths."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.responsavel",
            "reason": "MembroEquipe inside Tarefa needs one L4 relationship between them; found 2."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.responsavel.details.identification",
            "reason": "MembroEquipe inside MembroEquipe needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.responsavel.details.identification.status",
            "reason": "Interface MembroIdentificacao: readonly status is not a field of MembroEquipe; it may stand for one of its paths."
          }
        ],
        "params": [],
        "rules": [],
        "doc": {
          "raw": "Finalidade: Abre a tarefa escolhida no quadro com detalhe, checklist e marcos do histórico.\nEntrada: tarefaId: id da tarefa selecionada no quadro.\nProcessamento: Lê a tarefa pelo id no escopo da equipe, junta os nomes do criador e do responsável no cadastro mestre e os itens da checklist ordenados por ordem. Calcula aberta, quantidadeSubtarefas (tarefas com esta como tarefa pai) e progressoChecklist (itens feitos do total), sem gravar.\nSaída: A tarefa com versão, situação, prazo, criador, responsável, descrição, subtarefas, checklist e os momentos de criação, devolução (com motivo), conclusão e cancelamento.",
          "purpose": "Abre a tarefa escolhida no quadro com detalhe, checklist e marcos do histórico.",
          "input": "tarefaId: id da tarefa selecionada no quadro.",
          "processing": "Lê a tarefa pelo id no escopo da equipe, junta os nomes do criador e do responsável no cadastro mestre e os itens da checklist ordenados por ordem. Calcula aberta, quantidadeSubtarefas (tarefas com esta como tarefa pai) e progressoChecklist (itens feitos do total), sem gravar.",
          "output": "A tarefa com versão, situação, prazo, criador, responsável, descrição, subtarefas, checklist e os momentos de criação, devolução (com motivo), conclusão e cancelamento."
        }
      },
      {
        "route": "tarefas.tarefas_equipe.reatribuirTarefa",
        "kind": "cmd",
        "uses": [
          "updateTarefa",
          "getMembroEquipe",
          "listItemChecklist"
        ],
        "transaction": "single",
        "output": [
          {
            "kind": "entity",
            "path": "tarefa",
            "entity": "Tarefa",
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
                "field": "titulo",
                "path": "titulo"
              },
              {
                "field": "status",
                "path": "status"
              },
              {
                "field": "prioridade",
                "path": "prioridade"
              },
              {
                "field": "prazo",
                "path": "prazo"
              },
              {
                "field": "criadaEm",
                "path": "criadaEm"
              },
              {
                "field": "criadorId",
                "path": "criadorId"
              },
              {
                "field": "responsavelId",
                "path": "responsavelId"
              },
              {
                "field": "details",
                "path": "details"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador.details",
            "reason": "DISCLOSURE: Route tarefas.tarefas_equipe.reatribuirTarefa projects criador.details, responsavel.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
          },
          {
            "kind": "related",
            "path": "tarefa.criador",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "id",
                "path": "id"
              }
            ]
          },
          {
            "kind": "related",
            "path": "tarefa.criador.details.identification",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "name",
                "path": "details.identification.name"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador.details.identification.status",
            "reason": "COMPUTED_NOT_DISCLOSED: tarefas.tarefas_equipe.reatribuirTarefa criador.details.identification.status"
          },
          {
            "kind": "unresolved",
            "path": "tarefa.responsavel.details",
            "reason": "DISCLOSURE: Route tarefas.tarefas_equipe.reatribuirTarefa projects criador.details, responsavel.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
          },
          {
            "kind": "related",
            "path": "tarefa.responsavel",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "id",
                "path": "id"
              }
            ]
          },
          {
            "kind": "related",
            "path": "tarefa.responsavel.details.identification",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "name",
                "path": "details.identification.name"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "tarefa.responsavel.details.identification.status",
            "reason": "COMPUTED_NOT_DISCLOSED: tarefas.tarefas_equipe.reatribuirTarefa responsavel.details.identification.status"
          },
          {
            "kind": "related",
            "path": "tarefa.itensChecklist",
            "entity": "ItemChecklist",
            "relationship": "itemChecklistTarefa",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "ordem",
                "path": "ordem"
              },
              {
                "field": "feito",
                "path": "feito"
              },
              {
                "field": "details",
                "path": "details"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador",
            "reason": "MembroEquipe inside Tarefa needs one L4 relationship between them; found 2."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador.details.identification",
            "reason": "MembroEquipe inside MembroEquipe needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador.details.identification.status",
            "reason": "Interface MembroIdentificacao: readonly status is not a field of MembroEquipe; it may stand for one of its paths."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.responsavel",
            "reason": "MembroEquipe inside Tarefa needs one L4 relationship between them; found 2."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.responsavel.details.identification",
            "reason": "MembroEquipe inside MembroEquipe needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.responsavel.details.identification.status",
            "reason": "Interface MembroIdentificacao: readonly status is not a field of MembroEquipe; it may stand for one of its paths."
          }
        ],
        "params": [],
        "rules": [
          "reatribuicaoPorCriadorOuGestor",
          "responsavelDeveSerMembroAtivo",
          "edicaoNaoMudaSituacao",
          "editarSomenteTarefaVisivel"
        ],
        "doc": {
          "raw": "Finalidade: Troca o responsável da tarefa pelo membro escolhido pelo gestor.\nEntrada: id: tarefa a reatribuir; version: versão lida, para concorrência otimista; responsavelId: novo responsável.\nProcessamento: Recusa se quem chama não for o criador nem o gestor (reatribuicaoPorCriadorOuGestor) e se o novo responsável não for membro ativo da equipe (responsavelDeveSerMembroAtivo). Grava apenas responsavelId, sem alterar a situação (edicaoNaoMudaSituacao); recusa versão divergente. Quando a etapa é do responsável, o novo responsável passa a ser quem age agora e é avisado.\nSaída: A tarefa atualizada com o novo responsável, nova versão, checklist e marcos do histórico.",
          "purpose": "Troca o responsável da tarefa pelo membro escolhido pelo gestor.",
          "input": "id: tarefa a reatribuir; version: versão lida, para concorrência otimista; responsavelId: novo responsável.",
          "processing": "Recusa se quem chama não for o criador nem o gestor (reatribuicaoPorCriadorOuGestor) e se o novo responsável não for membro ativo da equipe (responsavelDeveSerMembroAtivo). Grava apenas responsavelId, sem alterar a situação (edicaoNaoMudaSituacao); recusa versão divergente. Quando a etapa é do responsável, o novo responsável passa a ser quem age agora e é avisado.",
          "output": "A tarefa atualizada com o novo responsável, nova versão, checklist e marcos do histórico."
        }
      },
      {
        "route": "tarefas.tarefas_equipe.cancelarTarefa",
        "kind": "cmd",
        "uses": [
          "cancelar",
          "getMembroEquipe",
          "listItemChecklist"
        ],
        "transaction": "single",
        "output": [
          {
            "kind": "entity",
            "path": "tarefa",
            "entity": "Tarefa",
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
                "field": "titulo",
                "path": "titulo"
              },
              {
                "field": "status",
                "path": "status"
              },
              {
                "field": "prioridade",
                "path": "prioridade"
              },
              {
                "field": "prazo",
                "path": "prazo"
              },
              {
                "field": "criadaEm",
                "path": "criadaEm"
              },
              {
                "field": "criadorId",
                "path": "criadorId"
              },
              {
                "field": "responsavelId",
                "path": "responsavelId"
              },
              {
                "field": "details",
                "path": "details"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador.details",
            "reason": "DISCLOSURE: Route tarefas.tarefas_equipe.cancelarTarefa projects criador.details, responsavel.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
          },
          {
            "kind": "related",
            "path": "tarefa.criador",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "id",
                "path": "id"
              }
            ]
          },
          {
            "kind": "related",
            "path": "tarefa.criador.details.identification",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "name",
                "path": "details.identification.name"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador.details.identification.status",
            "reason": "COMPUTED_NOT_DISCLOSED: tarefas.tarefas_equipe.cancelarTarefa criador.details.identification.status"
          },
          {
            "kind": "unresolved",
            "path": "tarefa.responsavel.details",
            "reason": "DISCLOSURE: Route tarefas.tarefas_equipe.cancelarTarefa projects criador.details, responsavel.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
          },
          {
            "kind": "related",
            "path": "tarefa.responsavel",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "id",
                "path": "id"
              }
            ]
          },
          {
            "kind": "related",
            "path": "tarefa.responsavel.details.identification",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "name",
                "path": "details.identification.name"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "tarefa.responsavel.details.identification.status",
            "reason": "COMPUTED_NOT_DISCLOSED: tarefas.tarefas_equipe.cancelarTarefa responsavel.details.identification.status"
          },
          {
            "kind": "related",
            "path": "tarefa.itensChecklist",
            "entity": "ItemChecklist",
            "relationship": "itemChecklistTarefa",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "ordem",
                "path": "ordem"
              },
              {
                "field": "feito",
                "path": "feito"
              },
              {
                "field": "details",
                "path": "details"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador",
            "reason": "MembroEquipe inside Tarefa needs one L4 relationship between them; found 2."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador.details.identification",
            "reason": "MembroEquipe inside MembroEquipe needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador.details.identification.status",
            "reason": "Interface MembroIdentificacao: readonly status is not a field of MembroEquipe; it may stand for one of its paths."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.responsavel",
            "reason": "MembroEquipe inside Tarefa needs one L4 relationship between them; found 2."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.responsavel.details.identification",
            "reason": "MembroEquipe inside MembroEquipe needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.responsavel.details.identification.status",
            "reason": "Interface MembroIdentificacao: readonly status is not a field of MembroEquipe; it may stand for one of its paths."
          }
        ],
        "params": [],
        "rules": [
          "cancelamentoPorCriadorOuGestor",
          "tarefaEncerradaNaoTransiciona"
        ],
        "doc": {
          "raw": "Finalidade: Cancela a tarefa escolhida enquanto ela ainda está aberta.\nEntrada: id: tarefa a cancelar; version: versão lida, para concorrência otimista.\nProcessamento: Aplica a transição cancelar. Recusa se quem chama não for o criador nem o gestor ou se a tarefa não estiver a fazer, em andamento ou em revisão (cancelamentoPorCriadorOuGestor); tarefa concluída ou cancelada não muda (tarefaEncerradaNaoTransiciona). Registra canceladaEm e a mensagem na sala de discussão; recusa versão divergente.\nSaída: A tarefa na situação cancelada, com canceladaEm, nova versão, checklist e marcos do histórico.",
          "purpose": "Cancela a tarefa escolhida enquanto ela ainda está aberta.",
          "input": "id: tarefa a cancelar; version: versão lida, para concorrência otimista.",
          "processing": "Aplica a transição cancelar. Recusa se quem chama não for o criador nem o gestor ou se a tarefa não estiver a fazer, em andamento ou em revisão (cancelamentoPorCriadorOuGestor); tarefa concluída ou cancelada não muda (tarefaEncerradaNaoTransiciona). Registra canceladaEm e a mensagem na sala de discussão; recusa versão divergente.",
          "output": "A tarefa na situação cancelada, com canceladaEm, nova versão, checklist e marcos do histórico."
        }
      }
    ]
  }
} as const;

export default definition;

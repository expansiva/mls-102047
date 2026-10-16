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
        "route": "tarefas.tarefas_equipe.qryTarefasEquipe",
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
                "field": "listaId",
                "path": "listaId"
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
            "reason": "DISCLOSURE: Route tarefas.tarefas_equipe.qryTarefasEquipe projects items.responsavel.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
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
                "field": "details.identification.name",
                "path": "details.identification.name"
              },
              {
                "field": "details.identification.status",
                "path": "details.identification.status"
              }
            ]
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
            "name": "prazo",
            "target": "tarefas",
            "field": "prazo"
          },
          {
            "name": "status",
            "target": "tarefas",
            "field": "status"
          },
          {
            "name": "titulo",
            "target": "tarefas",
            "field": "titulo"
          }
        ],
        "rules": [
          "editarSomenteTarefaVisivel"
        ],
        "doc": {
          "raw": "Finalidade: Carrega o quadro com todas as tarefas da equipe, já filtradas e paginadas, ao abrir a página e a cada mudança de filtro, busca ou página.\nEntrada: listaId: lista; responsavelId: responsável; prioridade; prazoDe/prazoAte: período do prazo (inclusive); status: situações desejadas; busca: trecho do título; page/pageSize: paginação.\nProcessamento: Gestor vê todas as tarefas da equipe (escopo organização, editarSomenteTarefaVisivel). Aplica os filtros informados e a busca por título, ordena por prazo e prioridade. Junta o nome da lista e o nome do responsável (cadastro mestre) em lote. Calcula aberta, venceHoje, atrasada (com a data de hoje) e progressoChecklist (itens feitos / total) no servidor, sem gravar.\nSaída: Página { items, page, pageSize, hasMore } de linhas prontas para o quadro, com indicação de vence hoje/atrasada e progresso da checklist.",
          "purpose": "Carrega o quadro com todas as tarefas da equipe, já filtradas e paginadas, ao abrir a página e a cada mudança de filtro, busca ou página.",
          "input": "listaId: lista; responsavelId: responsável; prioridade; prazoDe/prazoAte: período do prazo (inclusive); status: situações desejadas; busca: trecho do título; page/pageSize: paginação.",
          "processing": "Gestor vê todas as tarefas da equipe (escopo organização, editarSomenteTarefaVisivel). Aplica os filtros informados e a busca por título, ordena por prazo e prioridade. Junta o nome da lista e o nome do responsável (cadastro mestre) em lote. Calcula aberta, venceHoje, atrasada (com a data de hoje) e progressoChecklist (itens feitos / total) no servidor, sem gravar.",
          "output": "Página { items, page, pageSize, hasMore } de linhas prontas para o quadro, com indicação de vence hoje/atrasada e progresso da checklist."
        }
      },
      {
        "route": "tarefas.tarefas_equipe.qryListasFiltro",
        "kind": "qry",
        "uses": [
          "listLista"
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
          }
        ],
        "params": [],
        "rules": [],
        "doc": {
          "raw": "Finalidade: Carrega as opções do filtro por lista do quadro.\nEntrada: Nenhuma.\nProcessamento: Lista todas as listas (ativas e inativas, pois tarefas antigas podem estar em listas inativas), ordenadas por nome.\nSaída: Id e nome de cada lista para o seletor do filtro.",
          "purpose": "Carrega as opções do filtro por lista do quadro.",
          "input": "Nenhuma.",
          "processing": "Lista todas as listas (ativas e inativas, pois tarefas antigas podem estar em listas inativas), ordenadas por nome.",
          "output": "Id e nome de cada lista para o seletor do filtro."
        }
      },
      {
        "route": "tarefas.tarefas_equipe.qryBuscarMembros",
        "kind": "qry",
        "uses": [
          "listMembroEquipe",
          "getMembroEquipe"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "unresolved",
            "path": "membros.details",
            "reason": "DISCLOSURE: Route tarefas.tarefas_equipe.qryBuscarMembros projects details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
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
                "field": "details.identification.name",
                "path": "details.identification.name"
              },
              {
                "field": "details.identification.status",
                "path": "details.identification.status"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "membros.details.identification",
            "reason": "MembroEquipe inside MembroEquipe needs one L4 relationship between them; found 0."
          }
        ],
        "params": [
          {
            "name": "details",
            "target": "membros",
            "field": "details"
          }
        ],
        "rules": [
          "responsavelDeveSerMembroAtivo"
        ],
        "doc": {
          "raw": "Finalidade: Busca membros da equipe pelo nome, para escolher o novo responsável na reatribuição ou o responsável no filtro do quadro.\nEntrada: nome: trecho do nome digitado; somenteAtivos: true na escolha do novo responsável.\nProcessamento: Busca por nome no cadastro mestre entre os membros com papel tarefas.MembroEquipe. Com somenteAtivos, retorna só situação Active (responsavelDeveSerMembroAtivo). Limita a poucas dezenas de resultados, ordenados por nome.\nSaída: Id, nome e situação dos membros encontrados.",
          "purpose": "Busca membros da equipe pelo nome, para escolher o novo responsável na reatribuição ou o responsável no filtro do quadro.",
          "input": "nome: trecho do nome digitado; somenteAtivos: true na escolha do novo responsável.",
          "processing": "Busca por nome no cadastro mestre entre os membros com papel tarefas.MembroEquipe. Com somenteAtivos, retorna só situação Active (responsavelDeveSerMembroAtivo). Limita a poucas dezenas de resultados, ordenados por nome.",
          "output": "Id, nome e situação dos membros encontrados."
        }
      },
      {
        "route": "tarefas.tarefas_equipe.qryDetalheTarefa",
        "kind": "qry",
        "uses": [
          "getTarefa",
          "getLista",
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
                "field": "listaId",
                "path": "listaId"
              },
              {
                "field": "responsavelId",
                "path": "responsavelId"
              },
              {
                "field": "criadorId",
                "path": "criadorId"
              },
              {
                "field": "tarefaPaiId",
                "path": "tarefaPaiId"
              },
              {
                "field": "criadaEm",
                "path": "criadaEm"
              },
              {
                "field": "details",
                "path": "details"
              }
            ]
          },
          {
            "kind": "related",
            "path": "tarefa.lista",
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
            "path": "tarefa.responsavel.details",
            "reason": "DISCLOSURE: Route tarefas.tarefas_equipe.qryDetalheTarefa projects responsavel.details, criador.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
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
                "field": "details.identification.name",
                "path": "details.identification.name"
              },
              {
                "field": "details.identification.status",
                "path": "details.identification.status"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador.details",
            "reason": "DISCLOSURE: Route tarefas.tarefas_equipe.qryDetalheTarefa projects responsavel.details, criador.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
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
                "field": "details.identification.name",
                "path": "details.identification.name"
              },
              {
                "field": "details.identification.status",
                "path": "details.identification.status"
              }
            ]
          },
          {
            "kind": "related",
            "path": "tarefa.tarefaPai",
            "entity": "Tarefa",
            "relationship": "tarefaPai",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "titulo",
                "path": "titulo"
              }
            ]
          },
          {
            "kind": "related",
            "path": "tarefa.checklist",
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
            "path": "tarefa.criador",
            "reason": "MembroEquipe inside Tarefa needs one L4 relationship between them; found 2."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador.details.identification",
            "reason": "MembroEquipe inside MembroEquipe needs one L4 relationship between them; found 0."
          }
        ],
        "params": [],
        "rules": [
          "editarSomenteTarefaVisivel"
        ],
        "doc": {
          "raw": "Finalidade: Abre a tarefa escolhida no quadro com tudo o que o detalhe, as ações e o histórico mostram, em uma chamada.\nEntrada: tarefaId: id da tarefa selecionada no quadro.\nProcessamento: Lê a tarefa pelo id (gestor vê todas). Junta nome da lista, nomes do responsável e do criador, título da tarefa pai quando houver e os itens da checklist ordenados por ordem. Calcula aberta, quantidadeSubtarefas e progressoChecklist sem gravar. Os marcos do histórico (criadaEm, devolvidaEm com motivo, concluidaEm, canceladaEm, situação e responsável atual) vêm da própria tarefa.\nSaída: Tarefa completa com version para as ações do gestor e os marcos para a linha do tempo.",
          "purpose": "Abre a tarefa escolhida no quadro com tudo o que o detalhe, as ações e o histórico mostram, em uma chamada.",
          "input": "tarefaId: id da tarefa selecionada no quadro.",
          "processing": "Lê a tarefa pelo id (gestor vê todas). Junta nome da lista, nomes do responsável e do criador, título da tarefa pai quando houver e os itens da checklist ordenados por ordem. Calcula aberta, quantidadeSubtarefas e progressoChecklist sem gravar. Os marcos do histórico (criadaEm, devolvidaEm com motivo, concluidaEm, canceladaEm, situação e responsável atual) vêm da própria tarefa.",
          "output": "Tarefa completa com version para as ações do gestor e os marcos para a linha do tempo."
        }
      },
      {
        "route": "tarefas.tarefas_equipe.cmdReatribuirTarefa",
        "kind": "cmd",
        "uses": [
          "updateTarefa",
          "getLista",
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
                "field": "listaId",
                "path": "listaId"
              },
              {
                "field": "responsavelId",
                "path": "responsavelId"
              },
              {
                "field": "criadorId",
                "path": "criadorId"
              },
              {
                "field": "tarefaPaiId",
                "path": "tarefaPaiId"
              },
              {
                "field": "criadaEm",
                "path": "criadaEm"
              },
              {
                "field": "details",
                "path": "details"
              }
            ]
          },
          {
            "kind": "related",
            "path": "tarefa.lista",
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
            "path": "tarefa.responsavel.details",
            "reason": "DISCLOSURE: Route tarefas.tarefas_equipe.cmdReatribuirTarefa projects responsavel.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
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
                "field": "details.identification.name",
                "path": "details.identification.name"
              },
              {
                "field": "details.identification.status",
                "path": "details.identification.status"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador.details",
            "reason": "DISCLOSURE: Route tarefas.tarefas_equipe.cmdReatribuirTarefa projects responsavel.details, criador.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
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
                "field": "details.identification.name",
                "path": "details.identification.name"
              },
              {
                "field": "details.identification.status",
                "path": "details.identification.status"
              }
            ]
          },
          {
            "kind": "related",
            "path": "tarefa.tarefaPai",
            "entity": "Tarefa",
            "relationship": "tarefaPai",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "titulo",
                "path": "titulo"
              }
            ]
          },
          {
            "kind": "related",
            "path": "tarefa.checklist",
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
            "kind": "entity",
            "path": "itemQuadro",
            "entity": "Tarefa",
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
                "field": "listaId",
                "path": "listaId"
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
            "kind": "related",
            "path": "itemQuadro.lista",
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
            "kind": "related",
            "path": "itemQuadro.responsavel",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "details",
                "path": "details"
              }
            ]
          },
          {
            "kind": "related",
            "path": "itemQuadro.responsavel.details.identification",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
              },
              {
                "field": "details.identification.status",
                "path": "details.identification.status"
              }
            ]
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
            "path": "itemQuadro.responsavel",
            "reason": "MembroEquipe inside Tarefa needs one L4 relationship between them; found 2."
          },
          {
            "kind": "unresolved",
            "path": "itemQuadro.responsavel.details.identification",
            "reason": "MembroEquipe inside MembroEquipe needs one L4 relationship between them; found 0."
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
          "raw": "Finalidade: Troca o responsável da tarefa escolhida pelo membro ativo selecionado e avisa o novo responsável.\nEntrada: tarefaId: tarefa; version: versão lida, para concorrência otimista; responsavelId: novo responsável escolhido.\nProcessamento: Recusa se a versão mudou. Verifica que quem pede é o criador ou o gestor (reatribuicaoPorCriadorOuGestor) e que o novo responsável é membro ativo (responsavelDeveSerMembroAtivo). Grava só o responsável, sem alterar a situação (edicaoNaoMudaSituacao); quando a etapa é do responsável, ele passa a ser quem age agora e é avisado.\nSaída: Tarefa atualizada no formato do detalhe e a linha do quadro atualizada, para redesenhar sem nova chamada.",
          "purpose": "Troca o responsável da tarefa escolhida pelo membro ativo selecionado e avisa o novo responsável.",
          "input": "tarefaId: tarefa; version: versão lida, para concorrência otimista; responsavelId: novo responsável escolhido.",
          "processing": "Recusa se a versão mudou. Verifica que quem pede é o criador ou o gestor (reatribuicaoPorCriadorOuGestor) e que o novo responsável é membro ativo (responsavelDeveSerMembroAtivo). Grava só o responsável, sem alterar a situação (edicaoNaoMudaSituacao); quando a etapa é do responsável, ele passa a ser quem age agora e é avisado.",
          "output": "Tarefa atualizada no formato do detalhe e a linha do quadro atualizada, para redesenhar sem nova chamada."
        }
      },
      {
        "route": "tarefas.tarefas_equipe.cmdCancelarTarefa",
        "kind": "cmd",
        "uses": [
          "cancelar",
          "getLista",
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
                "field": "listaId",
                "path": "listaId"
              },
              {
                "field": "responsavelId",
                "path": "responsavelId"
              },
              {
                "field": "criadorId",
                "path": "criadorId"
              },
              {
                "field": "tarefaPaiId",
                "path": "tarefaPaiId"
              },
              {
                "field": "criadaEm",
                "path": "criadaEm"
              },
              {
                "field": "details",
                "path": "details"
              }
            ]
          },
          {
            "kind": "related",
            "path": "tarefa.lista",
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
            "path": "tarefa.responsavel.details",
            "reason": "DISCLOSURE: Route tarefas.tarefas_equipe.cmdCancelarTarefa projects responsavel.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
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
                "field": "details.identification.name",
                "path": "details.identification.name"
              },
              {
                "field": "details.identification.status",
                "path": "details.identification.status"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador.details",
            "reason": "DISCLOSURE: Route tarefas.tarefas_equipe.cmdCancelarTarefa projects responsavel.details, criador.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
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
                "field": "details.identification.name",
                "path": "details.identification.name"
              },
              {
                "field": "details.identification.status",
                "path": "details.identification.status"
              }
            ]
          },
          {
            "kind": "related",
            "path": "tarefa.tarefaPai",
            "entity": "Tarefa",
            "relationship": "tarefaPai",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "titulo",
                "path": "titulo"
              }
            ]
          },
          {
            "kind": "related",
            "path": "tarefa.checklist",
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
            "kind": "entity",
            "path": "itemQuadro",
            "entity": "Tarefa",
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
                "field": "listaId",
                "path": "listaId"
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
            "kind": "related",
            "path": "itemQuadro.lista",
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
            "kind": "related",
            "path": "itemQuadro.responsavel",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "details",
                "path": "details"
              }
            ]
          },
          {
            "kind": "related",
            "path": "itemQuadro.responsavel.details.identification",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
              },
              {
                "field": "details.identification.status",
                "path": "details.identification.status"
              }
            ]
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
            "path": "itemQuadro.responsavel",
            "reason": "MembroEquipe inside Tarefa needs one L4 relationship between them; found 2."
          },
          {
            "kind": "unresolved",
            "path": "itemQuadro.responsavel.details.identification",
            "reason": "MembroEquipe inside MembroEquipe needs one L4 relationship between them; found 0."
          }
        ],
        "params": [],
        "rules": [
          "cancelamentoPorCriadorOuGestor",
          "tarefaEncerradaNaoTransiciona"
        ],
        "doc": {
          "raw": "Finalidade: Cancela a tarefa escolhida após a confirmação do gestor.\nEntrada: tarefaId: tarefa; version: versão lida, para concorrência otimista.\nProcessamento: Recusa se a versão mudou. Aplica a transição cancelar: só criador ou gestor e só a partir de a fazer, em andamento ou em revisão (cancelamentoPorCriadorOuGestor); tarefa concluída ou cancelada é recusada (tarefaEncerradaNaoTransciona). Registra canceladaEm e a mensagem na sala de discussão.\nSaída: Tarefa cancelada no formato do detalhe (com canceladaEm para o histórico) e a linha do quadro atualizada.",
          "purpose": "Cancela a tarefa escolhida após a confirmação do gestor.",
          "input": "tarefaId: tarefa; version: versão lida, para concorrência otimista.",
          "processing": "Recusa se a versão mudou. Aplica a transição cancelar: só criador ou gestor e só a partir de a fazer, em andamento ou em revisão (cancelamentoPorCriadorOuGestor); tarefa concluída ou cancelada é recusada (tarefaEncerradaNaoTransciona). Registra canceladaEm e a mensagem na sala de discussão.",
          "output": "Tarefa cancelada no formato do detalhe (com canceladaEm para o histórico) e a linha do quadro atualizada."
        }
      }
    ]
  }
} as const;

export default definition;

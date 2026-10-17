/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/requests/minhas_tarefas.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "minhas_tarefas",
  "moduleName": "tarefas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/tarefas/layer_2_application/usecases/aceitar.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/cancelar.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/createTarefa.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/devolver.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/enviarParaRevisao.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/getLista.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/getMembroEquipe.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/getTarefa.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/iniciar.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/listItemChecklist.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/listLista.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/listMembroEquipe.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/listTarefa.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/updateItemChecklist.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/updateTarefa.defs.ts"
  ],
  "data": {
    "pageId": "minhas_tarefas",
    "requests": [
      {
        "route": "tarefas.minhas_tarefas.carregarMinhasTarefas",
        "kind": "qry",
        "uses": [
          "listTarefa",
          "getLista",
          "getMembroEquipe",
          "listLista"
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
            "reason": "DISCLOSURE: Route tarefas.minhas_tarefas.carregarMinhasTarefas projects items.responsavel.details, items.criador.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
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
            "reason": "COMPUTED_NOT_DISCLOSED: tarefas.minhas_tarefas.carregarMinhasTarefas items.responsavel.details.identification.status"
          },
          {
            "kind": "unresolved",
            "path": "tarefas.items.criador.details",
            "reason": "DISCLOSURE: Route tarefas.minhas_tarefas.carregarMinhasTarefas projects items.responsavel.details, items.criador.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
          },
          {
            "kind": "related",
            "path": "tarefas.items.criador",
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
            "path": "tarefas.items.criador.details.identification",
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
            "path": "tarefas.items.criador.details.identification.status",
            "reason": "COMPUTED_NOT_DISCLOSED: tarefas.minhas_tarefas.carregarMinhasTarefas items.criador.details.identification.status"
          },
          {
            "kind": "unresolved",
            "path": "listas.details",
            "reason": "DISCLOSURE: Route tarefas.minhas_tarefas.carregarMinhasTarefas projects details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
          },
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
              },
              {
                "field": "ativa",
                "path": "ativa"
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
          },
          {
            "kind": "unresolved",
            "path": "tarefas.responsavel.details.identification.status",
            "reason": "Interface MembroIdentificacao: readonly status is not a field of MembroEquipe; it may stand for one of its paths."
          },
          {
            "kind": "unresolved",
            "path": "tarefas.criador",
            "reason": "MembroEquipe inside Tarefa needs one L4 relationship between them; found 2."
          },
          {
            "kind": "unresolved",
            "path": "tarefas.criador.details.identification",
            "reason": "MembroEquipe inside MembroEquipe needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "tarefas.criador.details.identification.status",
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
          }
        ],
        "rules": [],
        "doc": {
          "raw": "Finalidade: Abre a página com a primeira página das tarefas da pessoa logada e as listas ativas onde ela pode criar tarefas.\nEntrada: filtro: recorte rápido (todas, criadas por mim, atribuídas a mim, em revisão, devolvidas; padrão todas). page/pageSize: página das tarefas.\nProcessamento: Seleciona as tarefas cujo criador ou responsável é a pessoa da sessão; aplica o filtro (criadorId = sessão; responsavelId = sessão; status emRevisao; devolvidaEm preenchida e status emAndamento). Ordena por prazo. Compõe nome da lista e nomes de responsável e criador lidos no cadastro mestre. Calcula venceHoje, atrasada, quantidadeSubtarefas e progressoChecklist (itens feitos / total) na leitura, sem gravar. Lista as listas com ativa = true ordenadas por nome.\nSaída: tarefas: página { items, page, pageSize, hasMore } de tarefas resumidas com lista, responsável, criador, prioridade, prazo, situação e indicadores calculados. listas: listas ativas com nome, tipo e ativa.",
          "purpose": "Abre a página com a primeira página das tarefas da pessoa logada e as listas ativas onde ela pode criar tarefas.",
          "input": "filtro: recorte rápido (todas, criadas por mim, atribuídas a mim, em revisão, devolvidas; padrão todas). page/pageSize: página das tarefas.",
          "processing": "Seleciona as tarefas cujo criador ou responsável é a pessoa da sessão; aplica o filtro (criadorId = sessão; responsavelId = sessão; status emRevisao; devolvidaEm preenchida e status emAndamento). Ordena por prazo. Compõe nome da lista e nomes de responsável e criador lidos no cadastro mestre. Calcula venceHoje, atrasada, quantidadeSubtarefas e progressoChecklist (itens feitos / total) na leitura, sem gravar. Lista as listas com ativa = true ordenadas por nome.",
          "output": "tarefas: página { items, page, pageSize, hasMore } de tarefas resumidas com lista, responsável, criador, prioridade, prazo, situação e indicadores calculados. listas: listas ativas com nome, tipo e ativa."
        }
      },
      {
        "route": "tarefas.minhas_tarefas.listarMinhasTarefas",
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
            "reason": "DISCLOSURE: Route tarefas.minhas_tarefas.listarMinhasTarefas projects items.responsavel.details, items.criador.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
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
            "reason": "COMPUTED_NOT_DISCLOSED: tarefas.minhas_tarefas.listarMinhasTarefas items.responsavel.details.identification.status"
          },
          {
            "kind": "unresolved",
            "path": "tarefas.items.criador.details",
            "reason": "DISCLOSURE: Route tarefas.minhas_tarefas.listarMinhasTarefas projects items.responsavel.details, items.criador.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
          },
          {
            "kind": "related",
            "path": "tarefas.items.criador",
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
            "path": "tarefas.items.criador.details.identification",
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
            "path": "tarefas.items.criador.details.identification.status",
            "reason": "COMPUTED_NOT_DISCLOSED: tarefas.minhas_tarefas.listarMinhasTarefas items.criador.details.identification.status"
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
          },
          {
            "kind": "unresolved",
            "path": "tarefas.criador",
            "reason": "MembroEquipe inside Tarefa needs one L4 relationship between them; found 2."
          },
          {
            "kind": "unresolved",
            "path": "tarefas.criador.details.identification",
            "reason": "MembroEquipe inside MembroEquipe needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "tarefas.criador.details.identification.status",
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
            "name": "busca",
            "target": "tarefas",
            "field": "titulo"
          }
        ],
        "rules": [],
        "doc": {
          "raw": "Finalidade: Recarrega as tarefas da pessoa logada quando ela troca o filtro rápido, pesquisa pelo título ou pede outra página.\nEntrada: filtro: recorte rápido (todas, criadas por mim, atribuídas a mim, em revisão, devolvidas). busca: trecho do título. page/pageSize: página pedida.\nProcessamento: Mesma seleção de carregarMinhasTarefas: tarefas em que a pessoa da sessão é criadora ou responsável, filtro aplicado, busca por texto no título, ordenação por prazo; compõe nomes de lista, responsável e criador e calcula venceHoje, atrasada, quantidadeSubtarefas e progressoChecklist na leitura.\nSaída: tarefas: página { items, page, pageSize, hasMore } de tarefas resumidas no filtro e na busca pedidos.",
          "purpose": "Recarrega as tarefas da pessoa logada quando ela troca o filtro rápido, pesquisa pelo título ou pede outra página.",
          "input": "filtro: recorte rápido (todas, criadas por mim, atribuídas a mim, em revisão, devolvidas). busca: trecho do título. page/pageSize: página pedida.",
          "processing": "Mesma seleção de carregarMinhasTarefas: tarefas em que a pessoa da sessão é criadora ou responsável, filtro aplicado, busca por texto no título, ordenação por prazo; compõe nomes de lista, responsável e criador e calcula venceHoje, atrasada, quantidadeSubtarefas e progressoChecklist na leitura.",
          "output": "tarefas: página { items, page, pageSize, hasMore } de tarefas resumidas no filtro e na busca pedidos."
        }
      },
      {
        "route": "tarefas.minhas_tarefas.abrirTarefa",
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
                "field": "criadaEm",
                "path": "criadaEm"
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
            "reason": "DISCLOSURE: Route tarefas.minhas_tarefas.abrirTarefa projects responsavel.details, criador.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
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
            "reason": "COMPUTED_NOT_DISCLOSED: tarefas.minhas_tarefas.abrirTarefa responsavel.details.identification.status"
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador.details",
            "reason": "DISCLOSURE: Route tarefas.minhas_tarefas.abrirTarefa projects responsavel.details, criador.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
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
            "reason": "COMPUTED_NOT_DISCLOSED: tarefas.minhas_tarefas.abrirTarefa criador.details.identification.status"
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
                "field": "version",
                "path": "version"
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
            "path": "tarefa.responsavel.details.identification.status",
            "reason": "Interface MembroIdentificacao: readonly status is not a field of MembroEquipe; it may stand for one of its paths."
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
          }
        ],
        "params": [
          {
            "name": "id",
            "target": "tarefa",
            "field": "id"
          }
        ],
        "rules": [],
        "doc": {
          "raw": "Finalidade: Carrega a tarefa escolhida com tudo o que o detalhe, as ações, o formulário e o histórico precisam.\nEntrada: id: id da tarefa escolhida.\nProcessamento: Lê a tarefa por id, recusando se a pessoa da sessão não for criadora nem responsável. Compõe nome da lista, nomes de criador e responsável do cadastro mestre e os itens da checklist ordenados por ordem.\nSaída: tarefa: a tarefa com versão, situação, datas de criação, devolução, conclusão e cancelamento, motivo da devolução e checklist.",
          "purpose": "Carrega a tarefa escolhida com tudo o que o detalhe, as ações, o formulário e o histórico precisam.",
          "input": "id: id da tarefa escolhida.",
          "processing": "Lê a tarefa por id, recusando se a pessoa da sessão não for criadora nem responsável. Compõe nome da lista, nomes de criador e responsável do cadastro mestre e os itens da checklist ordenados por ordem.",
          "output": "tarefa: a tarefa com versão, situação, datas de criação, devolução, conclusão e cancelamento, motivo da devolução e checklist."
        }
      },
      {
        "route": "tarefas.minhas_tarefas.buscarMembros",
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
            "reason": "DISCLOSURE: Route tarefas.minhas_tarefas.buscarMembros projects details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
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
            "reason": "COMPUTED_NOT_DISCLOSED: tarefas.minhas_tarefas.buscarMembros details.identification.status"
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
          "raw": "Finalidade: Busca pelo nome os membros que podem ser escolhidos como responsável.\nEntrada: nome: trecho do nome digitado.\nProcessamento: Localiza membros por nome e mantém só os com situação Active, conforme responsavelDeveSerMembroAtivo; limita a poucas dezenas ordenadas por nome.\nSaída: membros: membros ativos com id, nome e situação no cadastro.",
          "purpose": "Busca pelo nome os membros que podem ser escolhidos como responsável.",
          "input": "nome: trecho do nome digitado.",
          "processing": "Localiza membros por nome e mantém só os com situação Active, conforme responsavelDeveSerMembroAtivo; limita a poucas dezenas ordenadas por nome.",
          "output": "membros: membros ativos com id, nome e situação no cadastro."
        }
      },
      {
        "route": "tarefas.minhas_tarefas.criarTarefa",
        "kind": "cmd",
        "uses": [
          "createTarefa",
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
                "field": "criadaEm",
                "path": "criadaEm"
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
            "reason": "DISCLOSURE: Route tarefas.minhas_tarefas.criarTarefa projects responsavel.details, criador.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
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
            "reason": "COMPUTED_NOT_DISCLOSED: tarefas.minhas_tarefas.criarTarefa responsavel.details.identification.status"
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador.details",
            "reason": "DISCLOSURE: Route tarefas.minhas_tarefas.criarTarefa projects responsavel.details, criador.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
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
            "reason": "COMPUTED_NOT_DISCLOSED: tarefas.minhas_tarefas.criarTarefa criador.details.identification.status"
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
                "field": "version",
                "path": "version"
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
            "path": "resumo",
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
                "field": "details",
                "path": "details"
              }
            ]
          },
          {
            "kind": "related",
            "path": "resumo.lista",
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
            "path": "resumo.responsavel",
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
            "path": "resumo.responsavel.details.identification",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "name",
                "path": "details.identification.name"
              }
            ]
          },
          {
            "kind": "computed",
            "path": "resumo.responsavel.details.identification.status",
            "entity": "MembroEquipe",
            "rules": [
              "criacaoIdempotente",
              "listaInativaNaoRecebeTarefa",
              "responsavelDeveSerMembroAtivo"
            ]
          },
          {
            "kind": "related",
            "path": "resumo.criador",
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
            "path": "resumo.criador.details.identification",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "name",
                "path": "details.identification.name"
              }
            ]
          },
          {
            "kind": "computed",
            "path": "resumo.criador.details.identification.status",
            "entity": "MembroEquipe",
            "rules": [
              "criacaoIdempotente",
              "listaInativaNaoRecebeTarefa",
              "responsavelDeveSerMembroAtivo"
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
            "path": "tarefa.responsavel.details.identification.status",
            "reason": "Interface MembroIdentificacao: readonly status is not a field of MembroEquipe; it may stand for one of its paths."
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
            "path": "resumo.responsavel",
            "reason": "MembroEquipe inside Tarefa needs one L4 relationship between them; found 2."
          },
          {
            "kind": "unresolved",
            "path": "resumo.responsavel.details.identification",
            "reason": "MembroEquipe inside MembroEquipe needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "resumo.responsavel.details.identification.status",
            "reason": "Interface MembroIdentificacao: readonly status is not a field of MembroEquipe; it may stand for one of its paths."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador",
            "reason": "MembroEquipe inside Tarefa needs one L4 relationship between them; found 2."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador.details.identification",
            "reason": "MembroEquipe inside MembroEquipe needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador.details.identification.status",
            "reason": "Interface MembroIdentificacao: readonly status is not a field of MembroEquipe; it may stand for one of its paths."
          }
        ],
        "params": [],
        "rules": [
          "criacaoIdempotente",
          "listaInativaNaoRecebeTarefa",
          "responsavelDeveSerMembroAtivo"
        ],
        "doc": {
          "raw": "Finalidade: Cria uma nova tarefa com sua checklist inicial e a atribui ao responsável escolhido.\nEntrada: chaveCriacao: chave gerada ao abrir o formulário. listaId, titulo, details.descricao, prioridade, prazo, responsavelId: dados da tarefa. criadorId: criador da tarefa; opcional, pois o servidor sempre grava a pessoa da sessão e recusa um valor diferente dela. itensChecklist: itens iniciais com ordem e descrição.\nProcessamento: Recusa lista inativa (listaInativaNaoRecebeTarefa) e responsável que não seja membro ativo (responsavelDeveSerMembroAtivo). Grava a tarefa em aFazer com a pessoa da sessão como criadora e os itens da checklist (feito = false) numa só transação. Se já existir tarefa com a mesma chaveCriacao, devolve a já criada sem duplicar nem gerar nova mensagem (criacaoIdempotente). Avisa o responsável.\nSaída: tarefa: a tarefa criada, em aFazer, com checklist. resumo: a mesma tarefa em forma resumida com indicadores calculados.",
          "purpose": "Cria uma nova tarefa com sua checklist inicial e a atribui ao responsável escolhido.",
          "input": "chaveCriacao: chave gerada ao abrir o formulário. listaId, titulo, details.descricao, prioridade, prazo, responsavelId: dados da tarefa. criadorId: criador da tarefa; opcional, pois o servidor sempre grava a pessoa da sessão e recusa um valor diferente dela. itensChecklist: itens iniciais com ordem e descrição.",
          "processing": "Recusa lista inativa (listaInativaNaoRecebeTarefa) e responsável que não seja membro ativo (responsavelDeveSerMembroAtivo). Grava a tarefa em aFazer com a pessoa da sessão como criadora e os itens da checklist (feito = false) numa só transação. Se já existir tarefa com a mesma chaveCriacao, devolve a já criada sem duplicar nem gerar nova mensagem (criacaoIdempotente). Avisa o responsável.",
          "output": "tarefa: a tarefa criada, em aFazer, com checklist. resumo: a mesma tarefa em forma resumida com indicadores calculados."
        }
      },
      {
        "route": "tarefas.minhas_tarefas.salvarEdicao",
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
                "field": "criadaEm",
                "path": "criadaEm"
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
            "reason": "DISCLOSURE: Route tarefas.minhas_tarefas.salvarEdicao projects responsavel.details, criador.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
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
            "reason": "COMPUTED_NOT_DISCLOSED: tarefas.minhas_tarefas.salvarEdicao responsavel.details.identification.status"
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador.details",
            "reason": "DISCLOSURE: Route tarefas.minhas_tarefas.salvarEdicao projects responsavel.details, criador.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
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
            "reason": "COMPUTED_NOT_DISCLOSED: tarefas.minhas_tarefas.salvarEdicao criador.details.identification.status"
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
                "field": "version",
                "path": "version"
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
            "path": "resumo",
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
                "field": "details",
                "path": "details"
              }
            ]
          },
          {
            "kind": "related",
            "path": "resumo.lista",
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
            "path": "resumo.responsavel",
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
            "path": "resumo.responsavel.details.identification",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "name",
                "path": "details.identification.name"
              }
            ]
          },
          {
            "kind": "computed",
            "path": "resumo.responsavel.details.identification.status",
            "entity": "MembroEquipe",
            "rules": [
              "editarSomenteTarefaVisivel",
              "edicaoNaoMudaSituacao",
              "reatribuicaoPorCriadorOuGestor",
              "responsavelDeveSerMembroAtivo",
              "listaInativaNaoRecebeTarefa"
            ]
          },
          {
            "kind": "related",
            "path": "resumo.criador",
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
            "path": "resumo.criador.details.identification",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "name",
                "path": "details.identification.name"
              }
            ]
          },
          {
            "kind": "computed",
            "path": "resumo.criador.details.identification.status",
            "entity": "MembroEquipe",
            "rules": [
              "editarSomenteTarefaVisivel",
              "edicaoNaoMudaSituacao",
              "reatribuicaoPorCriadorOuGestor",
              "responsavelDeveSerMembroAtivo",
              "listaInativaNaoRecebeTarefa"
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
            "path": "tarefa.responsavel.details.identification.status",
            "reason": "Interface MembroIdentificacao: readonly status is not a field of MembroEquipe; it may stand for one of its paths."
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
            "path": "resumo.responsavel",
            "reason": "MembroEquipe inside Tarefa needs one L4 relationship between them; found 2."
          },
          {
            "kind": "unresolved",
            "path": "resumo.responsavel.details.identification",
            "reason": "MembroEquipe inside MembroEquipe needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "resumo.responsavel.details.identification.status",
            "reason": "Interface MembroIdentificacao: readonly status is not a field of MembroEquipe; it may stand for one of its paths."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador",
            "reason": "MembroEquipe inside Tarefa needs one L4 relationship between them; found 2."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador.details.identification",
            "reason": "MembroEquipe inside MembroEquipe needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador.details.identification.status",
            "reason": "Interface MembroIdentificacao: readonly status is not a field of MembroEquipe; it may stand for one of its paths."
          }
        ],
        "params": [],
        "rules": [
          "editarSomenteTarefaVisivel",
          "edicaoNaoMudaSituacao",
          "reatribuicaoPorCriadorOuGestor",
          "responsavelDeveSerMembroAtivo",
          "listaInativaNaoRecebeTarefa"
        ],
        "doc": {
          "raw": "Finalidade: Salva os campos editados da tarefa, incluindo a troca de responsável.\nEntrada: id e version: tarefa e versão lida. listaId, titulo, details.descricao, prioridade, prazo, responsavelId: novos valores.\nProcessamento: Recusa se a pessoa não for criadora nem responsável (editarSomenteTarefaVisivel) ou se a versão mudou. Se o responsável mudou, exige que a pessoa seja a criadora (reatribuicaoPorCriadorOuGestor) e que o novo seja membro ativo (responsavelDeveSerMembroAtivo), e avisa o novo responsável. Se a lista mudou, recusa lista inativa (listaInativaNaoRecebeTarefa). Nunca altera a situação (edicaoNaoMudaSituacao).\nSaída: tarefa: a tarefa atualizada, com nova versão e mesma situação. resumo: a mesma tarefa resumida.",
          "purpose": "Salva os campos editados da tarefa, incluindo a troca de responsável.",
          "input": "id e version: tarefa e versão lida. listaId, titulo, details.descricao, prioridade, prazo, responsavelId: novos valores.",
          "processing": "Recusa se a pessoa não for criadora nem responsável (editarSomenteTarefaVisivel) ou se a versão mudou. Se o responsável mudou, exige que a pessoa seja a criadora (reatribuicaoPorCriadorOuGestor) e que o novo seja membro ativo (responsavelDeveSerMembroAtivo), e avisa o novo responsável. Se a lista mudou, recusa lista inativa (listaInativaNaoRecebeTarefa). Nunca altera a situação (edicaoNaoMudaSituacao).",
          "output": "tarefa: a tarefa atualizada, com nova versão e mesma situação. resumo: a mesma tarefa resumida."
        }
      },
      {
        "route": "tarefas.minhas_tarefas.salvarChecklist",
        "kind": "cmd",
        "uses": [
          "updateItemChecklist",
          "getTarefa",
          "getLista",
          "getMembroEquipe"
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
            "reason": "DISCLOSURE: Route tarefas.minhas_tarefas.salvarChecklist projects responsavel.details, criador.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
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
            "reason": "COMPUTED_NOT_DISCLOSED: tarefas.minhas_tarefas.salvarChecklist responsavel.details.identification.status"
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador.details",
            "reason": "DISCLOSURE: Route tarefas.minhas_tarefas.salvarChecklist projects responsavel.details, criador.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
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
            "reason": "COMPUTED_NOT_DISCLOSED: tarefas.minhas_tarefas.salvarChecklist criador.details.identification.status"
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
                "field": "version",
                "path": "version"
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
            "path": "resumo",
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
                "field": "details",
                "path": "details"
              }
            ]
          },
          {
            "kind": "related",
            "path": "resumo.lista",
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
            "path": "resumo.responsavel",
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
            "path": "resumo.responsavel.details.identification",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "name",
                "path": "details.identification.name"
              }
            ]
          },
          {
            "kind": "computed",
            "path": "resumo.responsavel.details.identification.status",
            "entity": "MembroEquipe",
            "rules": [
              "editarSomenteTarefaVisivel",
              "checklistNaoMudaSituacao"
            ]
          },
          {
            "kind": "related",
            "path": "resumo.criador",
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
            "path": "resumo.criador.details.identification",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "name",
                "path": "details.identification.name"
              }
            ]
          },
          {
            "kind": "computed",
            "path": "resumo.criador.details.identification.status",
            "entity": "MembroEquipe",
            "rules": [
              "editarSomenteTarefaVisivel",
              "checklistNaoMudaSituacao"
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
            "path": "tarefa.responsavel.details.identification.status",
            "reason": "Interface MembroIdentificacao: readonly status is not a field of MembroEquipe; it may stand for one of its paths."
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
            "path": "resumo.responsavel",
            "reason": "MembroEquipe inside Tarefa needs one L4 relationship between them; found 2."
          },
          {
            "kind": "unresolved",
            "path": "resumo.responsavel.details.identification",
            "reason": "MembroEquipe inside MembroEquipe needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "resumo.responsavel.details.identification.status",
            "reason": "Interface MembroIdentificacao: readonly status is not a field of MembroEquipe; it may stand for one of its paths."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador",
            "reason": "MembroEquipe inside Tarefa needs one L4 relationship between them; found 2."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador.details.identification",
            "reason": "MembroEquipe inside MembroEquipe needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador.details.identification.status",
            "reason": "Interface MembroIdentificacao: readonly status is not a field of MembroEquipe; it may stand for one of its paths."
          }
        ],
        "params": [],
        "rules": [
          "editarSomenteTarefaVisivel",
          "checklistNaoMudaSituacao"
        ],
        "doc": {
          "raw": "Finalidade: Salva as alterações dos itens da checklist: descrição, ordem e marcação de feito.\nEntrada: tarefaId: tarefa dos itens. itens: cada item com id, versão lida, ordem, feito e descrição.\nProcessamento: Recusa se a pessoa não for criadora nem responsável da tarefa (editarSomenteTarefaVisivel) ou se algum item mudou de versão. Atualiza os itens; o momento de marcação é registrado pelo servidor quando o item passa a feito e limpo quando é desmarcado. Não altera a situação da tarefa (checklistNaoMudaSituacao).\nSaída: tarefa: a tarefa com a checklist atualizada. resumo: a tarefa resumida com o progresso da checklist recalculado.",
          "purpose": "Salva as alterações dos itens da checklist: descrição, ordem e marcação de feito.",
          "input": "tarefaId: tarefa dos itens. itens: cada item com id, versão lida, ordem, feito e descrição.",
          "processing": "Recusa se a pessoa não for criadora nem responsável da tarefa (editarSomenteTarefaVisivel) ou se algum item mudou de versão. Atualiza os itens; o momento de marcação é registrado pelo servidor quando o item passa a feito e limpo quando é desmarcado. Não altera a situação da tarefa (checklistNaoMudaSituacao).",
          "output": "tarefa: a tarefa com a checklist atualizada. resumo: a tarefa resumida com o progresso da checklist recalculado."
        }
      },
      {
        "route": "tarefas.minhas_tarefas.iniciarTarefa",
        "kind": "cmd",
        "uses": [
          "iniciar",
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
                "field": "criadaEm",
                "path": "criadaEm"
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
            "reason": "DISCLOSURE: Route tarefas.minhas_tarefas.iniciarTarefa projects responsavel.details, criador.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
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
            "reason": "COMPUTED_NOT_DISCLOSED: tarefas.minhas_tarefas.iniciarTarefa responsavel.details.identification.status"
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador.details",
            "reason": "DISCLOSURE: Route tarefas.minhas_tarefas.iniciarTarefa projects responsavel.details, criador.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
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
            "reason": "COMPUTED_NOT_DISCLOSED: tarefas.minhas_tarefas.iniciarTarefa criador.details.identification.status"
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
                "field": "version",
                "path": "version"
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
            "path": "resumo",
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
                "field": "details",
                "path": "details"
              }
            ]
          },
          {
            "kind": "related",
            "path": "resumo.lista",
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
            "path": "resumo.responsavel",
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
            "path": "resumo.responsavel.details.identification",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "name",
                "path": "details.identification.name"
              }
            ]
          },
          {
            "kind": "computed",
            "path": "resumo.responsavel.details.identification.status",
            "entity": "MembroEquipe",
            "rules": [
              "somenteResponsavelExecuta",
              "tarefaEncerradaNaoTransiciona"
            ]
          },
          {
            "kind": "related",
            "path": "resumo.criador",
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
            "path": "resumo.criador.details.identification",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "name",
                "path": "details.identification.name"
              }
            ]
          },
          {
            "kind": "computed",
            "path": "resumo.criador.details.identification.status",
            "entity": "MembroEquipe",
            "rules": [
              "somenteResponsavelExecuta",
              "tarefaEncerradaNaoTransiciona"
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
            "path": "tarefa.responsavel.details.identification.status",
            "reason": "Interface MembroIdentificacao: readonly status is not a field of MembroEquipe; it may stand for one of its paths."
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
            "path": "resumo.responsavel",
            "reason": "MembroEquipe inside Tarefa needs one L4 relationship between them; found 2."
          },
          {
            "kind": "unresolved",
            "path": "resumo.responsavel.details.identification",
            "reason": "MembroEquipe inside MembroEquipe needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "resumo.responsavel.details.identification.status",
            "reason": "Interface MembroIdentificacao: readonly status is not a field of MembroEquipe; it may stand for one of its paths."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador",
            "reason": "MembroEquipe inside Tarefa needs one L4 relationship between them; found 2."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador.details.identification",
            "reason": "MembroEquipe inside MembroEquipe needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador.details.identification.status",
            "reason": "Interface MembroIdentificacao: readonly status is not a field of MembroEquipe; it may stand for one of its paths."
          }
        ],
        "params": [],
        "rules": [
          "somenteResponsavelExecuta",
          "tarefaEncerradaNaoTransiciona"
        ],
        "doc": {
          "raw": "Finalidade: Inicia a tarefa atribuída à pessoa.\nEntrada: id e version: tarefa e versão lida.\nProcessamento: Exige que a pessoa da sessão seja a responsável (somenteResponsavelExecuta) e que a tarefa esteja em aFazer, nunca concluída ou cancelada (tarefaEncerradaNaoTransiciona). Move para emAndamento e registra a mensagem na sala de discussão.\nSaída: tarefa: a tarefa em emAndamento. resumo: a mesma tarefa resumida.",
          "purpose": "Inicia a tarefa atribuída à pessoa.",
          "input": "id e version: tarefa e versão lida.",
          "processing": "Exige que a pessoa da sessão seja a responsável (somenteResponsavelExecuta) e que a tarefa esteja em aFazer, nunca concluída ou cancelada (tarefaEncerradaNaoTransiciona). Move para emAndamento e registra a mensagem na sala de discussão.",
          "output": "tarefa: a tarefa em emAndamento. resumo: a mesma tarefa resumida."
        }
      },
      {
        "route": "tarefas.minhas_tarefas.enviarParaRevisao",
        "kind": "cmd",
        "uses": [
          "enviarParaRevisao",
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
                "field": "criadaEm",
                "path": "criadaEm"
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
            "reason": "DISCLOSURE: Route tarefas.minhas_tarefas.enviarParaRevisao projects responsavel.details, criador.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
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
            "reason": "COMPUTED_NOT_DISCLOSED: tarefas.minhas_tarefas.enviarParaRevisao responsavel.details.identification.status"
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador.details",
            "reason": "DISCLOSURE: Route tarefas.minhas_tarefas.enviarParaRevisao projects responsavel.details, criador.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
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
            "reason": "COMPUTED_NOT_DISCLOSED: tarefas.minhas_tarefas.enviarParaRevisao criador.details.identification.status"
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
                "field": "version",
                "path": "version"
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
            "path": "resumo",
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
                "field": "details",
                "path": "details"
              }
            ]
          },
          {
            "kind": "related",
            "path": "resumo.lista",
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
            "path": "resumo.responsavel",
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
            "path": "resumo.responsavel.details.identification",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "name",
                "path": "details.identification.name"
              }
            ]
          },
          {
            "kind": "computed",
            "path": "resumo.responsavel.details.identification.status",
            "entity": "MembroEquipe",
            "rules": [
              "somenteResponsavelExecuta",
              "tarefaEncerradaNaoTransiciona"
            ]
          },
          {
            "kind": "related",
            "path": "resumo.criador",
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
            "path": "resumo.criador.details.identification",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "name",
                "path": "details.identification.name"
              }
            ]
          },
          {
            "kind": "computed",
            "path": "resumo.criador.details.identification.status",
            "entity": "MembroEquipe",
            "rules": [
              "somenteResponsavelExecuta",
              "tarefaEncerradaNaoTransiciona"
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
            "path": "tarefa.responsavel.details.identification.status",
            "reason": "Interface MembroIdentificacao: readonly status is not a field of MembroEquipe; it may stand for one of its paths."
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
            "path": "resumo.responsavel",
            "reason": "MembroEquipe inside Tarefa needs one L4 relationship between them; found 2."
          },
          {
            "kind": "unresolved",
            "path": "resumo.responsavel.details.identification",
            "reason": "MembroEquipe inside MembroEquipe needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "resumo.responsavel.details.identification.status",
            "reason": "Interface MembroIdentificacao: readonly status is not a field of MembroEquipe; it may stand for one of its paths."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador",
            "reason": "MembroEquipe inside Tarefa needs one L4 relationship between them; found 2."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador.details.identification",
            "reason": "MembroEquipe inside MembroEquipe needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador.details.identification.status",
            "reason": "Interface MembroIdentificacao: readonly status is not a field of MembroEquipe; it may stand for one of its paths."
          }
        ],
        "params": [],
        "rules": [
          "somenteResponsavelExecuta",
          "tarefaEncerradaNaoTransiciona"
        ],
        "doc": {
          "raw": "Finalidade: Envia ou reenvia a tarefa para a revisão do criador.\nEntrada: id e version: tarefa e versão lida.\nProcessamento: Exige que a pessoa da sessão seja a responsável (somenteResponsavelExecuta) e que a tarefa esteja em emAndamento, nunca encerrada (tarefaEncerradaNaoTransiciona). Move para emRevisao, registra a mensagem na sala e avisa o criador.\nSaída: tarefa: a tarefa em emRevisao. resumo: a mesma tarefa resumida.",
          "purpose": "Envia ou reenvia a tarefa para a revisão do criador.",
          "input": "id e version: tarefa e versão lida.",
          "processing": "Exige que a pessoa da sessão seja a responsável (somenteResponsavelExecuta) e que a tarefa esteja em emAndamento, nunca encerrada (tarefaEncerradaNaoTransiciona). Move para emRevisao, registra a mensagem na sala e avisa o criador.",
          "output": "tarefa: a tarefa em emRevisao. resumo: a mesma tarefa resumida."
        }
      },
      {
        "route": "tarefas.minhas_tarefas.aceitarTarefa",
        "kind": "cmd",
        "uses": [
          "aceitar",
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
                "field": "criadaEm",
                "path": "criadaEm"
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
            "reason": "DISCLOSURE: Route tarefas.minhas_tarefas.aceitarTarefa projects responsavel.details, criador.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
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
            "reason": "COMPUTED_NOT_DISCLOSED: tarefas.minhas_tarefas.aceitarTarefa responsavel.details.identification.status"
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador.details",
            "reason": "DISCLOSURE: Route tarefas.minhas_tarefas.aceitarTarefa projects responsavel.details, criador.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
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
            "reason": "COMPUTED_NOT_DISCLOSED: tarefas.minhas_tarefas.aceitarTarefa criador.details.identification.status"
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
                "field": "version",
                "path": "version"
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
            "path": "resumo",
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
                "field": "details",
                "path": "details"
              }
            ]
          },
          {
            "kind": "related",
            "path": "resumo.lista",
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
            "path": "resumo.responsavel",
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
            "path": "resumo.responsavel.details.identification",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "name",
                "path": "details.identification.name"
              }
            ]
          },
          {
            "kind": "computed",
            "path": "resumo.responsavel.details.identification.status",
            "entity": "MembroEquipe",
            "rules": [
              "somenteCriadorRevisa",
              "tarefaEncerradaNaoTransiciona"
            ]
          },
          {
            "kind": "related",
            "path": "resumo.criador",
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
            "path": "resumo.criador.details.identification",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "name",
                "path": "details.identification.name"
              }
            ]
          },
          {
            "kind": "computed",
            "path": "resumo.criador.details.identification.status",
            "entity": "MembroEquipe",
            "rules": [
              "somenteCriadorRevisa",
              "tarefaEncerradaNaoTransiciona"
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
            "path": "tarefa.responsavel.details.identification.status",
            "reason": "Interface MembroIdentificacao: readonly status is not a field of MembroEquipe; it may stand for one of its paths."
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
            "path": "resumo.responsavel",
            "reason": "MembroEquipe inside Tarefa needs one L4 relationship between them; found 2."
          },
          {
            "kind": "unresolved",
            "path": "resumo.responsavel.details.identification",
            "reason": "MembroEquipe inside MembroEquipe needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "resumo.responsavel.details.identification.status",
            "reason": "Interface MembroIdentificacao: readonly status is not a field of MembroEquipe; it may stand for one of its paths."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador",
            "reason": "MembroEquipe inside Tarefa needs one L4 relationship between them; found 2."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador.details.identification",
            "reason": "MembroEquipe inside MembroEquipe needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador.details.identification.status",
            "reason": "Interface MembroIdentificacao: readonly status is not a field of MembroEquipe; it may stand for one of its paths."
          }
        ],
        "params": [],
        "rules": [
          "somenteCriadorRevisa",
          "tarefaEncerradaNaoTransiciona"
        ],
        "doc": {
          "raw": "Finalidade: Aceita a entrega da tarefa e a conclui.\nEntrada: id e version: tarefa e versão lida.\nProcessamento: Exige que a pessoa da sessão seja a criadora (somenteCriadorRevisa) e que a tarefa esteja em emRevisao, nunca encerrada (tarefaEncerradaNaoTransiciona). Move para concluida, registra concluidaEm e a mensagem na sala.\nSaída: tarefa: a tarefa concluída com o momento da conclusão. resumo: a mesma tarefa resumida.",
          "purpose": "Aceita a entrega da tarefa e a conclui.",
          "input": "id e version: tarefa e versão lida.",
          "processing": "Exige que a pessoa da sessão seja a criadora (somenteCriadorRevisa) e que a tarefa esteja em emRevisao, nunca encerrada (tarefaEncerradaNaoTransiciona). Move para concluida, registra concluidaEm e a mensagem na sala.",
          "output": "tarefa: a tarefa concluída com o momento da conclusão. resumo: a mesma tarefa resumida."
        }
      },
      {
        "route": "tarefas.minhas_tarefas.devolverTarefa",
        "kind": "cmd",
        "uses": [
          "devolver",
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
                "field": "criadaEm",
                "path": "criadaEm"
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
            "reason": "DISCLOSURE: Route tarefas.minhas_tarefas.devolverTarefa projects responsavel.details, criador.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
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
            "reason": "COMPUTED_NOT_DISCLOSED: tarefas.minhas_tarefas.devolverTarefa responsavel.details.identification.status"
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador.details",
            "reason": "DISCLOSURE: Route tarefas.minhas_tarefas.devolverTarefa projects responsavel.details, criador.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
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
            "reason": "COMPUTED_NOT_DISCLOSED: tarefas.minhas_tarefas.devolverTarefa criador.details.identification.status"
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
                "field": "version",
                "path": "version"
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
            "path": "resumo",
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
                "field": "details",
                "path": "details"
              }
            ]
          },
          {
            "kind": "related",
            "path": "resumo.lista",
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
            "path": "resumo.responsavel",
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
            "path": "resumo.responsavel.details.identification",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "name",
                "path": "details.identification.name"
              }
            ]
          },
          {
            "kind": "computed",
            "path": "resumo.responsavel.details.identification.status",
            "entity": "MembroEquipe",
            "rules": [
              "somenteCriadorRevisa",
              "devolucaoExigeMotivo",
              "tarefaEncerradaNaoTransiciona"
            ]
          },
          {
            "kind": "related",
            "path": "resumo.criador",
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
            "path": "resumo.criador.details.identification",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "name",
                "path": "details.identification.name"
              }
            ]
          },
          {
            "kind": "computed",
            "path": "resumo.criador.details.identification.status",
            "entity": "MembroEquipe",
            "rules": [
              "somenteCriadorRevisa",
              "devolucaoExigeMotivo",
              "tarefaEncerradaNaoTransiciona"
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
            "path": "tarefa.responsavel.details.identification.status",
            "reason": "Interface MembroIdentificacao: readonly status is not a field of MembroEquipe; it may stand for one of its paths."
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
            "path": "resumo.responsavel",
            "reason": "MembroEquipe inside Tarefa needs one L4 relationship between them; found 2."
          },
          {
            "kind": "unresolved",
            "path": "resumo.responsavel.details.identification",
            "reason": "MembroEquipe inside MembroEquipe needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "resumo.responsavel.details.identification.status",
            "reason": "Interface MembroIdentificacao: readonly status is not a field of MembroEquipe; it may stand for one of its paths."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador",
            "reason": "MembroEquipe inside Tarefa needs one L4 relationship between them; found 2."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador.details.identification",
            "reason": "MembroEquipe inside MembroEquipe needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador.details.identification.status",
            "reason": "Interface MembroIdentificacao: readonly status is not a field of MembroEquipe; it may stand for one of its paths."
          }
        ],
        "params": [],
        "rules": [
          "somenteCriadorRevisa",
          "devolucaoExigeMotivo",
          "tarefaEncerradaNaoTransiciona"
        ],
        "doc": {
          "raw": "Finalidade: Devolve a tarefa em revisão para ajuste, com o motivo.\nEntrada: id e version: tarefa e versão lida. details.motivoDevolucao: motivo da devolução.\nProcessamento: Exige que a pessoa seja a criadora (somenteCriadorRevisa), que a tarefa esteja em emRevisao e não encerrada (tarefaEncerradaNaoTransiciona) e que o motivo não esteja vazio (devolucaoExigeMotivo). Registra motivo e devolvidaEm, move para emAndamento e avisa o responsável.\nSaída: tarefa: a tarefa em emAndamento com motivo e momento da devolução. resumo: a mesma tarefa resumida.",
          "purpose": "Devolve a tarefa em revisão para ajuste, com o motivo.",
          "input": "id e version: tarefa e versão lida. details.motivoDevolucao: motivo da devolução.",
          "processing": "Exige que a pessoa seja a criadora (somenteCriadorRevisa), que a tarefa esteja em emRevisao e não encerrada (tarefaEncerradaNaoTransiciona) e que o motivo não esteja vazio (devolucaoExigeMotivo). Registra motivo e devolvidaEm, move para emAndamento e avisa o responsável.",
          "output": "tarefa: a tarefa em emAndamento com motivo e momento da devolução. resumo: a mesma tarefa resumida."
        }
      },
      {
        "route": "tarefas.minhas_tarefas.cancelarTarefa",
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
                "field": "criadaEm",
                "path": "criadaEm"
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
            "reason": "DISCLOSURE: Route tarefas.minhas_tarefas.cancelarTarefa projects responsavel.details, criador.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
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
            "reason": "COMPUTED_NOT_DISCLOSED: tarefas.minhas_tarefas.cancelarTarefa responsavel.details.identification.status"
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador.details",
            "reason": "DISCLOSURE: Route tarefas.minhas_tarefas.cancelarTarefa projects responsavel.details, criador.details. A grant names a sub-path, but the nested shape could not be read, so the container was not released."
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
            "reason": "COMPUTED_NOT_DISCLOSED: tarefas.minhas_tarefas.cancelarTarefa criador.details.identification.status"
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
                "field": "version",
                "path": "version"
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
            "path": "resumo",
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
                "field": "details",
                "path": "details"
              }
            ]
          },
          {
            "kind": "related",
            "path": "resumo.lista",
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
            "path": "resumo.responsavel",
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
            "path": "resumo.responsavel.details.identification",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "name",
                "path": "details.identification.name"
              }
            ]
          },
          {
            "kind": "computed",
            "path": "resumo.responsavel.details.identification.status",
            "entity": "MembroEquipe",
            "rules": [
              "cancelamentoPorCriadorOuGestor",
              "tarefaEncerradaNaoTransiciona"
            ]
          },
          {
            "kind": "related",
            "path": "resumo.criador",
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
            "path": "resumo.criador.details.identification",
            "entity": "MembroEquipe",
            "fields": [
              {
                "field": "name",
                "path": "details.identification.name"
              }
            ]
          },
          {
            "kind": "computed",
            "path": "resumo.criador.details.identification.status",
            "entity": "MembroEquipe",
            "rules": [
              "cancelamentoPorCriadorOuGestor",
              "tarefaEncerradaNaoTransiciona"
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
            "path": "tarefa.responsavel.details.identification.status",
            "reason": "Interface MembroIdentificacao: readonly status is not a field of MembroEquipe; it may stand for one of its paths."
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
            "path": "resumo.responsavel",
            "reason": "MembroEquipe inside Tarefa needs one L4 relationship between them; found 2."
          },
          {
            "kind": "unresolved",
            "path": "resumo.responsavel.details.identification",
            "reason": "MembroEquipe inside MembroEquipe needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "resumo.responsavel.details.identification.status",
            "reason": "Interface MembroIdentificacao: readonly status is not a field of MembroEquipe; it may stand for one of its paths."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador",
            "reason": "MembroEquipe inside Tarefa needs one L4 relationship between them; found 2."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador.details.identification",
            "reason": "MembroEquipe inside MembroEquipe needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador.details.identification.status",
            "reason": "Interface MembroIdentificacao: readonly status is not a field of MembroEquipe; it may stand for one of its paths."
          }
        ],
        "params": [],
        "rules": [
          "cancelamentoPorCriadorOuGestor",
          "tarefaEncerradaNaoTransiciona"
        ],
        "doc": {
          "raw": "Finalidade: Cancela uma tarefa criada pela pessoa.\nEntrada: id e version: tarefa e versão lida.\nProcessamento: Exige que a pessoa seja a criadora (cancelamentoPorCriadorOuGestor) e que a tarefa esteja em aFazer, emAndamento ou emRevisao (tarefaEncerradaNaoTransiciona). Move para cancelada, registra canceladaEm e a mensagem na sala.\nSaída: tarefa: a tarefa cancelada com o momento do cancelamento. resumo: a mesma tarefa resumida.",
          "purpose": "Cancela uma tarefa criada pela pessoa.",
          "input": "id e version: tarefa e versão lida.",
          "processing": "Exige que a pessoa seja a criadora (cancelamentoPorCriadorOuGestor) e que a tarefa esteja em aFazer, emAndamento ou emRevisao (tarefaEncerradaNaoTransiciona). Move para cancelada, registra canceladaEm e a mensagem na sala.",
          "output": "tarefa: a tarefa cancelada com o momento do cancelamento. resumo: a mesma tarefa resumida."
        }
      }
    ]
  }
} as const;

export default definition;

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
    "_102047_/l1/tarefas/layer_2_application/usecases/getTarefa.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/iniciar.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/listItemChecklist.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/listTarefa.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/updateItemChecklist.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/updateTarefa.defs.ts"
  ],
  "data": {
    "pageId": "minhas_tarefas",
    "requests": [
      {
        "route": "tarefas.minhas_tarefas.minhasTarefas",
        "kind": "qry",
        "uses": [
          "listTarefa",
          "getLista"
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
                "field": "nome",
                "path": "nome"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "tarefas.responsavel",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "tarefas.criador",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "tarefas.items.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.minhas_tarefas.minhasTarefas projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "tarefas.items.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.minhas_tarefas.minhasTarefas projects Tarefa.criador, which is not a field of the ontology."
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
            "name": "status",
            "target": "tarefas",
            "field": "status"
          }
        ],
        "rules": [
          "editarSomenteTarefaVisivel"
        ],
        "doc": {
          "raw": "Finalidade: Carrega a página de tarefas que o membro da sessão criou ou pelas quais é responsável, já com nomes da lista, do responsável e do criador.\nEntrada: criadasPorMim: só as tarefas com o membro da sessão como criador; atribuidasAMim: só as em que ele é responsável; status: filtra pela situação (ex.: emRevisao); somenteDevolvidas: só as que têm devolução registrada e seguem em andamento; page/pageSize: paginação.\nProcessamento: Resolve o membro da sessão pelo login e limita a visão às tarefas em que ele é criador ou responsável (editarSomenteTarefaVisivel). Aplica os filtros, ordena por prazo e lê no cadastro mestre os nomes de responsável e criador. venceHoje, atrasada, quantidadeSubtarefas e progressoChecklist são campos derivados calculados pelo servidor (prazo vs. data atual em tarefas abertas; contagem de subtarefas; itens feitos/total), nunca gravados.\nSaída: tarefas paginadas { items, page, pageSize, hasMore } com o necessário para a lista destacar o que vence hoje ou está atrasado.",
          "purpose": "Carrega a página de tarefas que o membro da sessão criou ou pelas quais é responsável, já com nomes da lista, do responsável e do criador.",
          "input": "criadasPorMim: só as tarefas com o membro da sessão como criador; atribuidasAMim: só as em que ele é responsável; status: filtra pela situação (ex.: emRevisao); somenteDevolvidas: só as que têm devolução registrada e seguem em andamento; page/pageSize: paginação.",
          "processing": "Resolve o membro da sessão pelo login e limita a visão às tarefas em que ele é criador ou responsável (editarSomenteTarefaVisivel). Aplica os filtros, ordena por prazo e lê no cadastro mestre os nomes de responsável e criador. venceHoje, atrasada, quantidadeSubtarefas e progressoChecklist são campos derivados calculados pelo servidor (prazo vs. data atual em tarefas abertas; contagem de subtarefas; itens feitos/total), nunca gravados.",
          "output": "tarefas paginadas { items, page, pageSize, hasMore } com o necessário para a lista destacar o que vence hoje ou está atrasado."
        }
      },
      {
        "route": "tarefas.minhas_tarefas.tarefaAberta",
        "kind": "qry",
        "uses": [
          "getTarefa",
          "getLista",
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
                "field": "criadorId",
                "path": "criadorId"
              },
              {
                "field": "responsavelId",
                "path": "responsavelId"
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
                "field": "nome",
                "path": "nome"
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
            "path": "tarefa.criador",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.responsavel",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.minhas_tarefas.tarefaAberta projects Tarefa.criador, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.minhas_tarefas.tarefaAberta projects Tarefa.responsavel, which is not a field of the ontology."
          }
        ],
        "params": [],
        "rules": [
          "editarSomenteTarefaVisivel"
        ],
        "doc": {
          "raw": "Finalidade: Abre a tarefa escolhida na lista com tudo o que o detalhe, as ações, o histórico e o formulário de edição mostram.\nEntrada: tarefaId: id da tarefa selecionada na lista ou vinda do aviso.\nProcessamento: Recusa a tarefa se o membro da sessão não for criador nem responsável (editarSomenteTarefaVisivel). Lê a tarefa, o nome da lista, os nomes de criador e responsável no cadastro mestre e a checklist pela tarefaId ordenada por ordem. progressoChecklist é derivado (itens feitos do total), calculado pelo servidor.\nSaída: tarefa com checklist e marcos (criadaEm, devolvidaEm com motivo, concluidaEm, canceladaEm) para o histórico, e version para os comandos.",
          "purpose": "Abre a tarefa escolhida na lista com tudo o que o detalhe, as ações, o histórico e o formulário de edição mostram.",
          "input": "tarefaId: id da tarefa selecionada na lista ou vinda do aviso.",
          "processing": "Recusa a tarefa se o membro da sessão não for criador nem responsável (editarSomenteTarefaVisivel). Lê a tarefa, o nome da lista, os nomes de criador e responsável no cadastro mestre e a checklist pela tarefaId ordenada por ordem. progressoChecklist é derivado (itens feitos do total), calculado pelo servidor.",
          "output": "tarefa com checklist e marcos (criadaEm, devolvidaEm com motivo, concluidaEm, canceladaEm) para o histórico, e version para os comandos."
        }
      },
      {
        "route": "tarefas.minhas_tarefas.opcoesFormulario",
        "kind": "qry",
        "uses": [],
        "transaction": "none",
        "output": [
          {
            "kind": "unresolved",
            "path": "tarefas.minhas_tarefas.opcoesFormulario",
            "reason": "AUTHORITY_REQUIRED: Operation tarefas.minhas_tarefas.opcoesFormulario on tarefas.minhas_tarefas.opcoesFormulario has no authority. No permissive fallback was applied."
          }
        ],
        "params": [],
        "rules": [
          "listaInativaNaoRecebeTarefa"
        ],
        "doc": {
          "raw": "Finalidade: Carrega as listas onde o membro pode criar ou mover uma tarefa.\nEntrada: Nenhuma.\nProcessamento: Lista as listas da organização filtradas por ativa = true, ordenadas por nome; listas inativas não aparecem porque não recebem tarefas (listaInativaNaoRecebeTarefa).\nSaída: listas com id, nome, ativa e tipo para o seletor do formulário.",
          "purpose": "Carrega as listas onde o membro pode criar ou mover uma tarefa.",
          "input": "Nenhuma.",
          "processing": "Lista as listas da organização filtradas por ativa = true, ordenadas por nome; listas inativas não aparecem porque não recebem tarefas (listaInativaNaoRecebeTarefa).",
          "output": "listas com id, nome, ativa e tipo para o seletor do formulário."
        }
      },
      {
        "route": "tarefas.minhas_tarefas.buscarResponsaveis",
        "kind": "qry",
        "uses": [],
        "transaction": "none",
        "output": [
          {
            "kind": "unresolved",
            "path": "tarefas.minhas_tarefas.buscarResponsaveis",
            "reason": "AUTHORITY_REQUIRED: Operation tarefas.minhas_tarefas.buscarResponsaveis on tarefas.minhas_tarefas.buscarResponsaveis has no authority. No permissive fallback was applied."
          }
        ],
        "params": [],
        "rules": [
          "responsavelDeveSerMembroAtivo"
        ],
        "doc": {
          "raw": "Finalidade: Busca pelo nome os membros que podem ser escolhidos como responsável ao criar ou trocar o responsável.\nEntrada: termo: trecho do nome digitado.\nProcessamento: Localiza membros por nome no cadastro mestre e devolve só os com situação Active (responsavelDeveSerMembroAtivo), limitado a poucos resultados.\nSaída: membros com id, nome e situação para o seletor de responsável.",
          "purpose": "Busca pelo nome os membros que podem ser escolhidos como responsável ao criar ou trocar o responsável.",
          "input": "termo: trecho do nome digitado.",
          "processing": "Localiza membros por nome no cadastro mestre e devolve só os com situação Active (responsavelDeveSerMembroAtivo), limitado a poucos resultados.",
          "output": "membros com id, nome e situação para o seletor de responsável."
        }
      },
      {
        "route": "tarefas.minhas_tarefas.salvarNovaTarefa",
        "kind": "cmd",
        "uses": [
          "createTarefa",
          "getLista",
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
                "field": "criadorId",
                "path": "criadorId"
              },
              {
                "field": "responsavelId",
                "path": "responsavelId"
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
                "field": "nome",
                "path": "nome"
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
            "path": "resumo.lista",
            "entity": "Lista",
            "relationship": "tarefaLista",
            "fields": [
              {
                "field": "nome",
                "path": "nome"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.responsavel",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "resumo.responsavel",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.minhas_tarefas.salvarNovaTarefa projects Tarefa.criador, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.minhas_tarefas.salvarNovaTarefa projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.minhas_tarefas.salvarNovaTarefa projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.minhas_tarefas.salvarNovaTarefa projects Tarefa.criador, which is not a field of the ontology."
          }
        ],
        "params": [],
        "rules": [
          "criacaoIdempotente",
          "listaInativaNaoRecebeTarefa",
          "responsavelDeveSerMembroAtivo"
        ],
        "doc": {
          "raw": "Finalidade: Cria a tarefa com sua checklist inicial e a atribui ao responsável escolhido.\nEntrada: chaveCriacao: chave gerada ao abrir o formulário; listaId, titulo, descricao, prioridade, prazo, responsavelId: campos da tarefa; criadorId: id do membro da sessão, que será o criador e revisor da tarefa; checklist: itens com ordem e descrição.\nProcessamento: Em uma transação grava a tarefa em aFazer e os itens da checklist; criadorId deve ser o membro da sessão (resolvido pelo login) e é recusado se diferir. Com chave já usada devolve a tarefa existente sem duplicar nem gerar nova mensagem (criacaoIdempotente). Recusa lista inativa (listaInativaNaoRecebeTarefa) e responsável que não seja membro ativo (responsavelDeveSerMembroAtivo). criadaEm é gravado pelo sistema; campos derivados são calculados na leitura.\nSaída: tarefa completa para abrir no detalhe e resumo para inserir na lista sem nova consulta.",
          "purpose": "Cria a tarefa com sua checklist inicial e a atribui ao responsável escolhido.",
          "input": "chaveCriacao: chave gerada ao abrir o formulário; listaId, titulo, descricao, prioridade, prazo, responsavelId: campos da tarefa; criadorId: id do membro da sessão, que será o criador e revisor da tarefa; checklist: itens com ordem e descrição.",
          "processing": "Em uma transação grava a tarefa em aFazer e os itens da checklist; criadorId deve ser o membro da sessão (resolvido pelo login) e é recusado se diferir. Com chave já usada devolve a tarefa existente sem duplicar nem gerar nova mensagem (criacaoIdempotente). Recusa lista inativa (listaInativaNaoRecebeTarefa) e responsável que não seja membro ativo (responsavelDeveSerMembroAtivo). criadaEm é gravado pelo sistema; campos derivados são calculados na leitura.",
          "output": "tarefa completa para abrir no detalhe e resumo para inserir na lista sem nova consulta."
        }
      },
      {
        "route": "tarefas.minhas_tarefas.salvarEdicaoTarefa",
        "kind": "cmd",
        "uses": [
          "updateTarefa",
          "getLista",
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
                "field": "criadorId",
                "path": "criadorId"
              },
              {
                "field": "responsavelId",
                "path": "responsavelId"
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
                "field": "nome",
                "path": "nome"
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
            "path": "resumo.lista",
            "entity": "Lista",
            "relationship": "tarefaLista",
            "fields": [
              {
                "field": "nome",
                "path": "nome"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.responsavel",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "resumo.responsavel",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.minhas_tarefas.salvarEdicaoTarefa projects Tarefa.criador, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.minhas_tarefas.salvarEdicaoTarefa projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.minhas_tarefas.salvarEdicaoTarefa projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.minhas_tarefas.salvarEdicaoTarefa projects Tarefa.criador, which is not a field of the ontology."
          }
        ],
        "params": [],
        "rules": [
          "edicaoNaoMudaSituacao",
          "editarSomenteTarefaVisivel",
          "reatribuicaoPorCriadorOuGestor",
          "responsavelDeveSerMembroAtivo",
          "listaInativaNaoRecebeTarefa",
          "checklistNaoMudaSituacao"
        ],
        "doc": {
          "raw": "Finalidade: Salva a edição da tarefa aberta: campos, troca de responsável e ajustes da checklist.\nEntrada: id e version: tarefa editada e versão para concorrência; listaId, titulo, descricao, prioridade, prazo, responsavelId: novos valores; checklist: itens finais (com id altera, sem id inclui, ausentes são removidos).\nProcessamento: Só edita tarefa visível ao membro (editarSomenteTarefaVisivel). Nunca altera status (edicaoNaoMudaSituacao, checklistNaoMudaSituacao). Se responsavelId mudou, exige que o membro seja o criador (reatribuicaoPorCriadorOuGestor) e que o novo seja membro ativo (responsavelDeveSerMembroAtivo), avisando o novo responsável. Recusa mover para lista inativa (listaInativaNaoRecebeTarefa). Grava tarefa e itens juntos e recusa version desatualizada.\nSaída: tarefa atualizada para redesenhar detalhe e formulário e resumo para atualizar a linha da lista.",
          "purpose": "Salva a edição da tarefa aberta: campos, troca de responsável e ajustes da checklist.",
          "input": "id e version: tarefa editada e versão para concorrência; listaId, titulo, descricao, prioridade, prazo, responsavelId: novos valores; checklist: itens finais (com id altera, sem id inclui, ausentes são removidos).",
          "processing": "Só edita tarefa visível ao membro (editarSomenteTarefaVisivel). Nunca altera status (edicaoNaoMudaSituacao, checklistNaoMudaSituacao). Se responsavelId mudou, exige que o membro seja o criador (reatribuicaoPorCriadorOuGestor) e que o novo seja membro ativo (responsavelDeveSerMembroAtivo), avisando o novo responsável. Recusa mover para lista inativa (listaInativaNaoRecebeTarefa). Grava tarefa e itens juntos e recusa version desatualizada.",
          "output": "tarefa atualizada para redesenhar detalhe e formulário e resumo para atualizar a linha da lista."
        }
      },
      {
        "route": "tarefas.minhas_tarefas.iniciarTarefa",
        "kind": "cmd",
        "uses": [
          "iniciar",
          "getLista",
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
                "field": "criadorId",
                "path": "criadorId"
              },
              {
                "field": "responsavelId",
                "path": "responsavelId"
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
                "field": "nome",
                "path": "nome"
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
            "path": "resumo.lista",
            "entity": "Lista",
            "relationship": "tarefaLista",
            "fields": [
              {
                "field": "nome",
                "path": "nome"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.responsavel",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "resumo.responsavel",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.minhas_tarefas.iniciarTarefa projects Tarefa.criador, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.minhas_tarefas.iniciarTarefa projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.minhas_tarefas.iniciarTarefa projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.minhas_tarefas.iniciarTarefa projects Tarefa.criador, which is not a field of the ontology."
          }
        ],
        "params": [],
        "rules": [
          "somenteResponsavelExecuta",
          "tarefaEncerradaNaoTransiciona"
        ],
        "doc": {
          "raw": "Finalidade: Inicia a tarefa, passando de a fazer para em andamento.\nEntrada: id e version da tarefa aberta.\nProcessamento: Recusa se o membro da sessão não for o responsável (somenteResponsavelExecuta) ou se a tarefa estiver concluída/cancelada (tarefaEncerradaNaoTransiciona); aplica a transição iniciar e registra a mensagem na sala da tarefa.\nSaída: tarefa e resumo atualizados para redesenhar detalhe, ações e lista.",
          "purpose": "Inicia a tarefa, passando de a fazer para em andamento.",
          "input": "id e version da tarefa aberta.",
          "processing": "Recusa se o membro da sessão não for o responsável (somenteResponsavelExecuta) ou se a tarefa estiver concluída/cancelada (tarefaEncerradaNaoTransiciona); aplica a transição iniciar e registra a mensagem na sala da tarefa.",
          "output": "tarefa e resumo atualizados para redesenhar detalhe, ações e lista."
        }
      },
      {
        "route": "tarefas.minhas_tarefas.marcarItemChecklist",
        "kind": "cmd",
        "uses": [
          "updateItemChecklist",
          "getTarefa",
          "getLista"
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
                "field": "criadorId",
                "path": "criadorId"
              },
              {
                "field": "responsavelId",
                "path": "responsavelId"
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
                "field": "nome",
                "path": "nome"
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
            "path": "resumo.lista",
            "entity": "Lista",
            "relationship": "tarefaLista",
            "fields": [
              {
                "field": "nome",
                "path": "nome"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.responsavel",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "resumo.responsavel",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.minhas_tarefas.marcarItemChecklist projects Tarefa.criador, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.minhas_tarefas.marcarItemChecklist projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.minhas_tarefas.marcarItemChecklist projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.minhas_tarefas.marcarItemChecklist projects Tarefa.criador, which is not a field of the ontology."
          }
        ],
        "params": [],
        "rules": [
          "checklistNaoMudaSituacao",
          "editarSomenteTarefaVisivel"
        ],
        "doc": {
          "raw": "Finalidade: Marca ou desmarca um item da checklist da tarefa aberta.\nEntrada: id e version do item; feito: novo estado do item.\nProcessamento: Só altera itens de tarefa visível ao membro (editarSomenteTarefaVisivel); grava feito e marcadoEm (momento da marcação, vazio ao desmarcar) sem mudar a situação da tarefa (checklistNaoMudaSituacao). O progresso da checklist é derivado e recalculado na leitura.\nSaída: tarefa com a checklist e o progresso atualizados e resumo para a linha da lista.",
          "purpose": "Marca ou desmarca um item da checklist da tarefa aberta.",
          "input": "id e version do item; feito: novo estado do item.",
          "processing": "Só altera itens de tarefa visível ao membro (editarSomenteTarefaVisivel); grava feito e marcadoEm (momento da marcação, vazio ao desmarcar) sem mudar a situação da tarefa (checklistNaoMudaSituacao). O progresso da checklist é derivado e recalculado na leitura.",
          "output": "tarefa com a checklist e o progresso atualizados e resumo para a linha da lista."
        }
      },
      {
        "route": "tarefas.minhas_tarefas.enviarParaRevisao",
        "kind": "cmd",
        "uses": [
          "enviarParaRevisao",
          "getLista",
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
                "field": "criadorId",
                "path": "criadorId"
              },
              {
                "field": "responsavelId",
                "path": "responsavelId"
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
                "field": "nome",
                "path": "nome"
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
            "path": "resumo.lista",
            "entity": "Lista",
            "relationship": "tarefaLista",
            "fields": [
              {
                "field": "nome",
                "path": "nome"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.responsavel",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "resumo.responsavel",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.minhas_tarefas.enviarParaRevisao projects Tarefa.criador, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.minhas_tarefas.enviarParaRevisao projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.minhas_tarefas.enviarParaRevisao projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.minhas_tarefas.enviarParaRevisao projects Tarefa.criador, which is not a field of the ontology."
          }
        ],
        "params": [],
        "rules": [
          "somenteResponsavelExecuta",
          "tarefaEncerradaNaoTransiciona"
        ],
        "doc": {
          "raw": "Finalidade: Envia ou reenvia a tarefa para revisão do criador.\nEntrada: id e version da tarefa aberta.\nProcessamento: Recusa se o membro não for o responsável (somenteResponsavelExecuta) ou se a tarefa estiver encerrada (tarefaEncerradaNaoTransiciona); passa de emAndamento para emRevisao, registra a mensagem e avisa o criador.\nSaída: tarefa e resumo atualizados.",
          "purpose": "Envia ou reenvia a tarefa para revisão do criador.",
          "input": "id e version da tarefa aberta.",
          "processing": "Recusa se o membro não for o responsável (somenteResponsavelExecuta) ou se a tarefa estiver encerrada (tarefaEncerradaNaoTransiciona); passa de emAndamento para emRevisao, registra a mensagem e avisa o criador.",
          "output": "tarefa e resumo atualizados."
        }
      },
      {
        "route": "tarefas.minhas_tarefas.aceitarEntrega",
        "kind": "cmd",
        "uses": [
          "aceitar",
          "getLista",
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
                "field": "criadorId",
                "path": "criadorId"
              },
              {
                "field": "responsavelId",
                "path": "responsavelId"
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
                "field": "nome",
                "path": "nome"
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
            "path": "resumo.lista",
            "entity": "Lista",
            "relationship": "tarefaLista",
            "fields": [
              {
                "field": "nome",
                "path": "nome"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.responsavel",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "resumo.responsavel",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.minhas_tarefas.aceitarEntrega projects Tarefa.criador, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.minhas_tarefas.aceitarEntrega projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.minhas_tarefas.aceitarEntrega projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.minhas_tarefas.aceitarEntrega projects Tarefa.criador, which is not a field of the ontology."
          }
        ],
        "params": [],
        "rules": [
          "somenteCriadorRevisa",
          "tarefaEncerradaNaoTransiciona"
        ],
        "doc": {
          "raw": "Finalidade: Aceita a entrega da tarefa em revisão, concluindo-a.\nEntrada: id e version da tarefa aberta.\nProcessamento: Recusa se o membro não for o criador (somenteCriadorRevisa) ou se a tarefa já estiver encerrada (tarefaEncerradaNaoTransiciona); passa de emRevisao para concluida, grava concluidaEm e registra a mensagem.\nSaída: tarefa e resumo atualizados, com o aceite no histórico.",
          "purpose": "Aceita a entrega da tarefa em revisão, concluindo-a.",
          "input": "id e version da tarefa aberta.",
          "processing": "Recusa se o membro não for o criador (somenteCriadorRevisa) ou se a tarefa já estiver encerrada (tarefaEncerradaNaoTransiciona); passa de emRevisao para concluida, grava concluidaEm e registra a mensagem.",
          "output": "tarefa e resumo atualizados, com o aceite no histórico."
        }
      },
      {
        "route": "tarefas.minhas_tarefas.devolverComMotivo",
        "kind": "cmd",
        "uses": [
          "devolver",
          "getLista",
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
                "field": "criadorId",
                "path": "criadorId"
              },
              {
                "field": "responsavelId",
                "path": "responsavelId"
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
                "field": "nome",
                "path": "nome"
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
            "path": "resumo.lista",
            "entity": "Lista",
            "relationship": "tarefaLista",
            "fields": [
              {
                "field": "nome",
                "path": "nome"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.responsavel",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "resumo.responsavel",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.minhas_tarefas.devolverComMotivo projects Tarefa.criador, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.minhas_tarefas.devolverComMotivo projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.minhas_tarefas.devolverComMotivo projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.minhas_tarefas.devolverComMotivo projects Tarefa.criador, which is not a field of the ontology."
          }
        ],
        "params": [],
        "rules": [
          "somenteCriadorRevisa",
          "devolucaoExigeMotivo",
          "tarefaEncerradaNaoTransiciona"
        ],
        "doc": {
          "raw": "Finalidade: Devolve a tarefa em revisão para ajuste, com o motivo.\nEntrada: id e version da tarefa; motivoDevolucao: explicação do que ajustar.\nProcessamento: Recusa se o membro não for o criador (somenteCriadorRevisa), se o motivo estiver vazio (devolucaoExigeMotivo) ou se a tarefa estiver encerrada (tarefaEncerradaNaoTransiciona); passa de emRevisao para emAndamento, grava motivo e devolvidaEm e avisa o responsável.\nSaída: tarefa e resumo atualizados, com o motivo visível no detalhe e no histórico.",
          "purpose": "Devolve a tarefa em revisão para ajuste, com o motivo.",
          "input": "id e version da tarefa; motivoDevolucao: explicação do que ajustar.",
          "processing": "Recusa se o membro não for o criador (somenteCriadorRevisa), se o motivo estiver vazio (devolucaoExigeMotivo) ou se a tarefa estiver encerrada (tarefaEncerradaNaoTransiciona); passa de emRevisao para emAndamento, grava motivo e devolvidaEm e avisa o responsável.",
          "output": "tarefa e resumo atualizados, com o motivo visível no detalhe e no histórico."
        }
      },
      {
        "route": "tarefas.minhas_tarefas.cancelarTarefa",
        "kind": "cmd",
        "uses": [
          "cancelar",
          "getLista",
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
                "field": "criadorId",
                "path": "criadorId"
              },
              {
                "field": "responsavelId",
                "path": "responsavelId"
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
                "field": "nome",
                "path": "nome"
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
            "path": "resumo.lista",
            "entity": "Lista",
            "relationship": "tarefaLista",
            "fields": [
              {
                "field": "nome",
                "path": "nome"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.responsavel",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "resumo.responsavel",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.minhas_tarefas.cancelarTarefa projects Tarefa.criador, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "tarefa.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.minhas_tarefas.cancelarTarefa projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.minhas_tarefas.cancelarTarefa projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.minhas_tarefas.cancelarTarefa projects Tarefa.criador, which is not a field of the ontology."
          }
        ],
        "params": [],
        "rules": [
          "cancelamentoPorCriadorOuGestor",
          "tarefaEncerradaNaoTransiciona"
        ],
        "doc": {
          "raw": "Finalidade: Cancela uma tarefa que o membro criou.\nEntrada: id e version da tarefa aberta.\nProcessamento: Recusa se o membro não for o criador (cancelamentoPorCriadorOuGestor) ou se a tarefa já estiver concluída ou cancelada (tarefaEncerradaNaoTransiciona); passa para cancelada, grava canceladaEm e registra a mensagem na sala.\nSaída: tarefa e resumo atualizados com a situação cancelada.",
          "purpose": "Cancela uma tarefa que o membro criou.",
          "input": "id e version da tarefa aberta.",
          "processing": "Recusa se o membro não for o criador (cancelamentoPorCriadorOuGestor) ou se a tarefa já estiver concluída ou cancelada (tarefaEncerradaNaoTransiciona); passa para cancelada, grava canceladaEm e registra a mensagem na sala.",
          "output": "tarefa e resumo atualizados com a situação cancelada."
        }
      }
    ]
  }
} as const;

export default definition;

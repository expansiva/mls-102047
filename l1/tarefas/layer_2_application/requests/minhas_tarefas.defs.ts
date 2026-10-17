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
        "route": "tarefas.minhas_tarefas.qryMinhasTarefas",
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
                "field": "details.quantidadeSubtarefas",
                "path": "details.quantidadeSubtarefas"
              },
              {
                "field": "details.progressoChecklist",
                "path": "details.progressoChecklist"
              },
              {
                "field": "details.venceHoje",
                "path": "details.venceHoje"
              },
              {
                "field": "details.atrasada",
                "path": "details.atrasada"
              },
              {
                "field": "details.devolvidaEm",
                "path": "details.devolvidaEm"
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
            "kind": "related",
            "path": "tarefas.items.responsavel",
            "entity": "MembroEquipe",
            "relationship": "tarefaResponsavel",
            "fields": [
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
              }
            ]
          },
          {
            "kind": "related",
            "path": "tarefas.items.criador",
            "entity": "MembroEquipe",
            "relationship": "tarefaCriador",
            "fields": [
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
              }
            ]
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
        "rules": [
          "editarSomenteTarefaVisivel"
        ],
        "doc": {
          "raw": "Finalidade: Lista, paginadas, as tarefas que o membro da sessão criou ou pelas quais é responsável, com o filtro rápido escolhido.\nEntrada: filtro: criadasPorMim (criadorId = sessão), atribuidasAMim (responsavelId = sessão), emRevisao (status emRevisao), devolvidas (devolvidaEm preenchida e status emAndamento); ausente traz todas as minhas. page e pageSize: página pedida e tamanho da página.\nProcessamento: Filtra pelas tarefas visíveis ao membro (editarSomenteTarefaVisivel: criador ou responsável é a pessoa da sessão), aplica o filtro, ordena por prazo. Junta o nome da lista e os nomes de responsável e criador em lote. Calcula venceHoje e atrasada (tarefa aberta com prazo hoje ou anterior a hoje), quantidadeSubtarefas (contagem de tarefas filhas) e progressoChecklist (itens feitos do total) — todos derivados, nunca gravados.\nSaída: Página de tarefas { items, page, pageSize, hasMore } no formato resumido, com lista, responsável, criador, prioridade, prazo, situação e indicadores.",
          "purpose": "Lista, paginadas, as tarefas que o membro da sessão criou ou pelas quais é responsável, com o filtro rápido escolhido.",
          "input": "filtro: criadasPorMim (criadorId = sessão), atribuidasAMim (responsavelId = sessão), emRevisao (status emRevisao), devolvidas (devolvidaEm preenchida e status emAndamento); ausente traz todas as minhas. page e pageSize: página pedida e tamanho da página.",
          "processing": "Filtra pelas tarefas visíveis ao membro (editarSomenteTarefaVisivel: criador ou responsável é a pessoa da sessão), aplica o filtro, ordena por prazo. Junta o nome da lista e os nomes de responsável e criador em lote. Calcula venceHoje e atrasada (tarefa aberta com prazo hoje ou anterior a hoje), quantidadeSubtarefas (contagem de tarefas filhas) e progressoChecklist (itens feitos do total) — todos derivados, nunca gravados.",
          "output": "Página de tarefas { items, page, pageSize, hasMore } no formato resumido, com lista, responsável, criador, prioridade, prazo, situação e indicadores."
        }
      },
      {
        "route": "tarefas.minhas_tarefas.qryTarefa",
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
                "field": "details.descricao",
                "path": "details.descricao"
              },
              {
                "field": "details.motivoDevolucao",
                "path": "details.motivoDevolucao"
              },
              {
                "field": "details.devolvidaEm",
                "path": "details.devolvidaEm"
              },
              {
                "field": "details.concluidaEm",
                "path": "details.concluidaEm"
              },
              {
                "field": "details.canceladaEm",
                "path": "details.canceladaEm"
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
                "field": "prazo",
                "path": "prazo"
              },
              {
                "field": "prioridade",
                "path": "prioridade"
              },
              {
                "field": "status",
                "path": "status"
              },
              {
                "field": "criadaEm",
                "path": "criadaEm"
              }
            ]
          },
          {
            "kind": "computed",
            "path": "tarefa.souCriador",
            "entity": "Tarefa",
            "rules": [
              "editarSomenteTarefaVisivel"
            ]
          },
          {
            "kind": "computed",
            "path": "tarefa.souResponsavel",
            "entity": "Tarefa",
            "rules": [
              "editarSomenteTarefaVisivel"
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
            "path": "tarefa.criador",
            "entity": "MembroEquipe",
            "relationship": "tarefaCriador",
            "fields": [
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
              }
            ]
          },
          {
            "kind": "related",
            "path": "tarefa.responsavel",
            "entity": "MembroEquipe",
            "relationship": "tarefaResponsavel",
            "fields": [
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
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
                "field": "details.descricao",
                "path": "details.descricao"
              },
              {
                "field": "details.marcadoEm",
                "path": "details.marcadoEm"
              }
            ]
          }
        ],
        "params": [],
        "rules": [
          "editarSomenteTarefaVisivel"
        ],
        "doc": {
          "raw": "Finalidade: Abre uma tarefa escolhida com seus dados, checklist e marcos do ciclo.\nEntrada: tarefaId: id da tarefa selecionada.\nProcessamento: Lê a tarefa pelo id e recusa se o membro não for criador nem responsável (editarSomenteTarefaVisivel). Junta o nome da lista, os nomes de criador e responsável e os itens da checklist ordenados por ordem. Calcula souCriador e souResponsavel comparando criadorId e responsavelId com a pessoa da sessão.\nSaída: A tarefa no estado atual, com descrição, lista, criador, responsável, prazo, prioridade, situação, motivo e data da devolução, datas de criação, conclusão e cancelamento, papel de quem consulta e checklist.",
          "purpose": "Abre uma tarefa escolhida com seus dados, checklist e marcos do ciclo.",
          "input": "tarefaId: id da tarefa selecionada.",
          "processing": "Lê a tarefa pelo id e recusa se o membro não for criador nem responsável (editarSomenteTarefaVisivel). Junta o nome da lista, os nomes de criador e responsável e os itens da checklist ordenados por ordem. Calcula souCriador e souResponsavel comparando criadorId e responsavelId com a pessoa da sessão.",
          "output": "A tarefa no estado atual, com descrição, lista, criador, responsável, prazo, prioridade, situação, motivo e data da devolução, datas de criação, conclusão e cancelamento, papel de quem consulta e checklist."
        }
      },
      {
        "route": "tarefas.minhas_tarefas.qryListasAtivas",
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
              },
              {
                "field": "ativa",
                "path": "ativa"
              },
              {
                "field": "details.tipo",
                "path": "details.tipo"
              }
            ]
          }
        ],
        "params": [],
        "rules": [
          "listaInativaNaoRecebeTarefa"
        ],
        "doc": {
          "raw": "Finalidade: Traz as listas onde o membro pode colocar uma tarefa.\nEntrada: Nenhuma.\nProcessamento: Filtra as listas com ativa = true (listaInativaNaoRecebeTarefa) e ordena por nome.\nSaída: Listas ativas com id, nome, ativa e tipo.",
          "purpose": "Traz as listas onde o membro pode colocar uma tarefa.",
          "input": "Nenhuma.",
          "processing": "Filtra as listas com ativa = true (listaInativaNaoRecebeTarefa) e ordena por nome.",
          "output": "Listas ativas com id, nome, ativa e tipo."
        }
      },
      {
        "route": "tarefas.minhas_tarefas.qryBuscarMembros",
        "kind": "qry",
        "uses": [
          "listMembroEquipe"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "list",
            "path": "membros",
            "entity": "MembroEquipe",
            "items": "",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
              },
              {
                "field": "details.identification.status",
                "path": "details.identification.status"
              }
            ]
          }
        ],
        "params": [
          {
            "name": "termo",
            "target": "membros",
            "field": "details.identification.name"
          }
        ],
        "rules": [
          "responsavelDeveSerMembroAtivo"
        ],
        "doc": {
          "raw": "Finalidade: Busca membros da equipe pelo nome para escolher ou trocar o responsável.\nEntrada: termo: trecho do nome digitado.\nProcessamento: Busca no cadastro mestre membros com o papel tarefas.MembroEquipe cujo nome contém o termo, somente com situação Active (responsavelDeveSerMembroAtivo), ordenados por nome, limitados a um número curto de resultados.\nSaída: Membros ativos encontrados com id, nome e situação.",
          "purpose": "Busca membros da equipe pelo nome para escolher ou trocar o responsável.",
          "input": "termo: trecho do nome digitado.",
          "processing": "Busca no cadastro mestre membros com o papel tarefas.MembroEquipe cujo nome contém o termo, somente com situação Active (responsavelDeveSerMembroAtivo), ordenados por nome, limitados a um número curto de resultados.",
          "output": "Membros ativos encontrados com id, nome e situação."
        }
      },
      {
        "route": "tarefas.minhas_tarefas.cmdCriarTarefa",
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
                "field": "details.descricao",
                "path": "details.descricao"
              },
              {
                "field": "details.motivoDevolucao",
                "path": "details.motivoDevolucao"
              },
              {
                "field": "details.devolvidaEm",
                "path": "details.devolvidaEm"
              },
              {
                "field": "details.concluidaEm",
                "path": "details.concluidaEm"
              },
              {
                "field": "details.canceladaEm",
                "path": "details.canceladaEm"
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
                "field": "prazo",
                "path": "prazo"
              },
              {
                "field": "prioridade",
                "path": "prioridade"
              },
              {
                "field": "status",
                "path": "status"
              },
              {
                "field": "criadaEm",
                "path": "criadaEm"
              }
            ]
          },
          {
            "kind": "computed",
            "path": "tarefa.souCriador",
            "entity": "Tarefa",
            "rules": [
              "criacaoIdempotente",
              "listaInativaNaoRecebeTarefa",
              "responsavelDeveSerMembroAtivo"
            ]
          },
          {
            "kind": "computed",
            "path": "tarefa.souResponsavel",
            "entity": "Tarefa",
            "rules": [
              "criacaoIdempotente",
              "listaInativaNaoRecebeTarefa",
              "responsavelDeveSerMembroAtivo"
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
            "path": "tarefa.criador",
            "entity": "MembroEquipe",
            "relationship": "tarefaCriador",
            "fields": [
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
              }
            ]
          },
          {
            "kind": "related",
            "path": "tarefa.responsavel",
            "entity": "MembroEquipe",
            "relationship": "tarefaResponsavel",
            "fields": [
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
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
                "field": "details.descricao",
                "path": "details.descricao"
              },
              {
                "field": "details.marcadoEm",
                "path": "details.marcadoEm"
              }
            ]
          }
        ],
        "params": [],
        "rules": [
          "criacaoIdempotente",
          "listaInativaNaoRecebeTarefa",
          "responsavelDeveSerMembroAtivo"
        ],
        "doc": {
          "raw": "Finalidade: Cria uma nova tarefa com sua checklist inicial.\nEntrada: chaveCriacao: chave gerada ao abrir o formulário; listaId, titulo, details.descricao, prioridade, prazo, responsavelId: dados da tarefa; criadorId: criador da tarefa, opcional — o servidor sempre grava a pessoa da sessão e recusa um valor diferente dela; checklist: itens iniciais com descrição, ordem e feito.\nProcessamento: Recusa lista inativa (listaInativaNaoRecebeTarefa) e responsável que não seja membro ativo (responsavelDeveSerMembroAtivo). Se já existir tarefa com a mesma chaveCriacao, devolve a já criada sem criar outra nem repetir mensagens (criacaoIdempotente). Caso contrário grava, em uma transação, a tarefa em aFazer com criadorId = pessoa da sessão e os itens da checklist; criadaEm é preenchido pelo sistema. Avisa o responsável.\nSaída: A tarefa criada em situação aFazer, no formato de detalhe, com checklist.",
          "purpose": "Cria uma nova tarefa com sua checklist inicial.",
          "input": "chaveCriacao: chave gerada ao abrir o formulário; listaId, titulo, details.descricao, prioridade, prazo, responsavelId: dados da tarefa; criadorId: criador da tarefa, opcional — o servidor sempre grava a pessoa da sessão e recusa um valor diferente dela; checklist: itens iniciais com descrição, ordem e feito.",
          "processing": "Recusa lista inativa (listaInativaNaoRecebeTarefa) e responsável que não seja membro ativo (responsavelDeveSerMembroAtivo). Se já existir tarefa com a mesma chaveCriacao, devolve a já criada sem criar outra nem repetir mensagens (criacaoIdempotente). Caso contrário grava, em uma transação, a tarefa em aFazer com criadorId = pessoa da sessão e os itens da checklist; criadaEm é preenchido pelo sistema. Avisa o responsável.",
          "output": "A tarefa criada em situação aFazer, no formato de detalhe, com checklist."
        }
      },
      {
        "route": "tarefas.minhas_tarefas.cmdSalvarEdicao",
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
                "field": "details.descricao",
                "path": "details.descricao"
              },
              {
                "field": "details.motivoDevolucao",
                "path": "details.motivoDevolucao"
              },
              {
                "field": "details.devolvidaEm",
                "path": "details.devolvidaEm"
              },
              {
                "field": "details.concluidaEm",
                "path": "details.concluidaEm"
              },
              {
                "field": "details.canceladaEm",
                "path": "details.canceladaEm"
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
                "field": "prazo",
                "path": "prazo"
              },
              {
                "field": "prioridade",
                "path": "prioridade"
              },
              {
                "field": "status",
                "path": "status"
              },
              {
                "field": "criadaEm",
                "path": "criadaEm"
              }
            ]
          },
          {
            "kind": "computed",
            "path": "tarefa.souCriador",
            "entity": "Tarefa",
            "rules": [
              "edicaoNaoMudaSituacao",
              "editarSomenteTarefaVisivel",
              "reatribuicaoPorCriadorOuGestor",
              "responsavelDeveSerMembroAtivo",
              "listaInativaNaoRecebeTarefa"
            ]
          },
          {
            "kind": "computed",
            "path": "tarefa.souResponsavel",
            "entity": "Tarefa",
            "rules": [
              "edicaoNaoMudaSituacao",
              "editarSomenteTarefaVisivel",
              "reatribuicaoPorCriadorOuGestor",
              "responsavelDeveSerMembroAtivo",
              "listaInativaNaoRecebeTarefa"
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
            "path": "tarefa.criador",
            "entity": "MembroEquipe",
            "relationship": "tarefaCriador",
            "fields": [
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
              }
            ]
          },
          {
            "kind": "related",
            "path": "tarefa.responsavel",
            "entity": "MembroEquipe",
            "relationship": "tarefaResponsavel",
            "fields": [
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
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
                "field": "details.descricao",
                "path": "details.descricao"
              },
              {
                "field": "details.marcadoEm",
                "path": "details.marcadoEm"
              }
            ]
          }
        ],
        "params": [],
        "rules": [
          "edicaoNaoMudaSituacao",
          "editarSomenteTarefaVisivel",
          "reatribuicaoPorCriadorOuGestor",
          "responsavelDeveSerMembroAtivo",
          "listaInativaNaoRecebeTarefa"
        ],
        "doc": {
          "raw": "Finalidade: Salva a edição dos campos da tarefa, incluindo a troca de responsável.\nEntrada: id e version: tarefa e versão lida; listaId, titulo, details.descricao, prioridade, prazo, responsavelId: novos valores.\nProcessamento: Recusa se o membro não vê a tarefa (editarSomenteTarefaVisivel) ou se a versão mudou. Se a lista mudou, recusa lista inativa (listaInativaNaoRecebeTarefa). Se o responsável mudou, exige que a pessoa da sessão seja a criadora (reatribuicaoPorCriadorOuGestor) e que o novo responsável seja membro ativo (responsavelDeveSerMembroAtivo), e avisa o novo responsável. Nunca altera a situação (edicaoNaoMudaSituacao).\nSaída: A tarefa atualizada, com nova versão, no formato de detalhe com checklist.",
          "purpose": "Salva a edição dos campos da tarefa, incluindo a troca de responsável.",
          "input": "id e version: tarefa e versão lida; listaId, titulo, details.descricao, prioridade, prazo, responsavelId: novos valores.",
          "processing": "Recusa se o membro não vê a tarefa (editarSomenteTarefaVisivel) ou se a versão mudou. Se a lista mudou, recusa lista inativa (listaInativaNaoRecebeTarefa). Se o responsável mudou, exige que a pessoa da sessão seja a criadora (reatribuicaoPorCriadorOuGestor) e que o novo responsável seja membro ativo (responsavelDeveSerMembroAtivo), e avisa o novo responsável. Nunca altera a situação (edicaoNaoMudaSituacao).",
          "output": "A tarefa atualizada, com nova versão, no formato de detalhe com checklist."
        }
      },
      {
        "route": "tarefas.minhas_tarefas.cmdSalvarChecklist",
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
                "field": "details.descricao",
                "path": "details.descricao"
              },
              {
                "field": "details.motivoDevolucao",
                "path": "details.motivoDevolucao"
              },
              {
                "field": "details.devolvidaEm",
                "path": "details.devolvidaEm"
              },
              {
                "field": "details.concluidaEm",
                "path": "details.concluidaEm"
              },
              {
                "field": "details.canceladaEm",
                "path": "details.canceladaEm"
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
                "field": "prazo",
                "path": "prazo"
              },
              {
                "field": "prioridade",
                "path": "prioridade"
              },
              {
                "field": "status",
                "path": "status"
              },
              {
                "field": "criadaEm",
                "path": "criadaEm"
              }
            ]
          },
          {
            "kind": "computed",
            "path": "tarefa.souCriador",
            "entity": "Tarefa",
            "rules": [
              "checklistNaoMudaSituacao",
              "editarSomenteTarefaVisivel"
            ]
          },
          {
            "kind": "computed",
            "path": "tarefa.souResponsavel",
            "entity": "Tarefa",
            "rules": [
              "checklistNaoMudaSituacao",
              "editarSomenteTarefaVisivel"
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
            "path": "tarefa.criador",
            "entity": "MembroEquipe",
            "relationship": "tarefaCriador",
            "fields": [
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
              }
            ]
          },
          {
            "kind": "related",
            "path": "tarefa.responsavel",
            "entity": "MembroEquipe",
            "relationship": "tarefaResponsavel",
            "fields": [
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
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
                "field": "details.descricao",
                "path": "details.descricao"
              },
              {
                "field": "details.marcadoEm",
                "path": "details.marcadoEm"
              }
            ]
          }
        ],
        "params": [],
        "rules": [
          "checklistNaoMudaSituacao",
          "editarSomenteTarefaVisivel"
        ],
        "doc": {
          "raw": "Finalidade: Salva a checklist da tarefa: altera descrição e ordem, marca ou desmarca itens e inclui itens novos.\nEntrada: tarefaId: tarefa dona da checklist; itens: itens com id e version quando existentes, e descricao, ordem e feito.\nProcessamento: Recusa se o membro não vê a tarefa (editarSomenteTarefaVisivel) ou se a versão de algum item mudou. Atualiza cada item; ao marcar feito registra marcadoEm, ao desmarcar o limpa; itens sem id são incluídos. Não altera a situação da tarefa (checklistNaoMudaSituacao).\nSaída: A tarefa com a checklist salva, em ordem, e o restante dos dados no formato de detalhe.",
          "purpose": "Salva a checklist da tarefa: altera descrição e ordem, marca ou desmarca itens e inclui itens novos.",
          "input": "tarefaId: tarefa dona da checklist; itens: itens com id e version quando existentes, e descricao, ordem e feito.",
          "processing": "Recusa se o membro não vê a tarefa (editarSomenteTarefaVisivel) ou se a versão de algum item mudou. Atualiza cada item; ao marcar feito registra marcadoEm, ao desmarcar o limpa; itens sem id são incluídos. Não altera a situação da tarefa (checklistNaoMudaSituacao).",
          "output": "A tarefa com a checklist salva, em ordem, e o restante dos dados no formato de detalhe."
        }
      },
      {
        "route": "tarefas.minhas_tarefas.cmdIniciar",
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
                "field": "details.descricao",
                "path": "details.descricao"
              },
              {
                "field": "details.motivoDevolucao",
                "path": "details.motivoDevolucao"
              },
              {
                "field": "details.devolvidaEm",
                "path": "details.devolvidaEm"
              },
              {
                "field": "details.concluidaEm",
                "path": "details.concluidaEm"
              },
              {
                "field": "details.canceladaEm",
                "path": "details.canceladaEm"
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
                "field": "prazo",
                "path": "prazo"
              },
              {
                "field": "prioridade",
                "path": "prioridade"
              },
              {
                "field": "status",
                "path": "status"
              },
              {
                "field": "criadaEm",
                "path": "criadaEm"
              }
            ]
          },
          {
            "kind": "computed",
            "path": "tarefa.souCriador",
            "entity": "Tarefa",
            "rules": [
              "somenteResponsavelExecuta",
              "tarefaEncerradaNaoTransiciona"
            ]
          },
          {
            "kind": "computed",
            "path": "tarefa.souResponsavel",
            "entity": "Tarefa",
            "rules": [
              "somenteResponsavelExecuta",
              "tarefaEncerradaNaoTransiciona"
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
            "path": "tarefa.criador",
            "entity": "MembroEquipe",
            "relationship": "tarefaCriador",
            "fields": [
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
              }
            ]
          },
          {
            "kind": "related",
            "path": "tarefa.responsavel",
            "entity": "MembroEquipe",
            "relationship": "tarefaResponsavel",
            "fields": [
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
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
                "field": "details.descricao",
                "path": "details.descricao"
              },
              {
                "field": "details.marcadoEm",
                "path": "details.marcadoEm"
              }
            ]
          }
        ],
        "params": [],
        "rules": [
          "somenteResponsavelExecuta",
          "tarefaEncerradaNaoTransiciona"
        ],
        "doc": {
          "raw": "Finalidade: Inicia a tarefa, passando de a fazer para em andamento.\nEntrada: id e version da tarefa.\nProcessamento: Exige que a pessoa da sessão seja o responsável (somenteResponsavelExecuta) e que a tarefa esteja em aFazer, recusando tarefa concluída ou cancelada (tarefaEncerradaNaoTransiciona). Aplica a transição iniciar e registra a mensagem na sala de discussão.\nSaída: A tarefa em situação emAndamento, no formato de detalhe.",
          "purpose": "Inicia a tarefa, passando de a fazer para em andamento.",
          "input": "id e version da tarefa.",
          "processing": "Exige que a pessoa da sessão seja o responsável (somenteResponsavelExecuta) e que a tarefa esteja em aFazer, recusando tarefa concluída ou cancelada (tarefaEncerradaNaoTransiciona). Aplica a transição iniciar e registra a mensagem na sala de discussão.",
          "output": "A tarefa em situação emAndamento, no formato de detalhe."
        }
      },
      {
        "route": "tarefas.minhas_tarefas.cmdEnviarRevisao",
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
                "field": "details.descricao",
                "path": "details.descricao"
              },
              {
                "field": "details.motivoDevolucao",
                "path": "details.motivoDevolucao"
              },
              {
                "field": "details.devolvidaEm",
                "path": "details.devolvidaEm"
              },
              {
                "field": "details.concluidaEm",
                "path": "details.concluidaEm"
              },
              {
                "field": "details.canceladaEm",
                "path": "details.canceladaEm"
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
                "field": "prazo",
                "path": "prazo"
              },
              {
                "field": "prioridade",
                "path": "prioridade"
              },
              {
                "field": "status",
                "path": "status"
              },
              {
                "field": "criadaEm",
                "path": "criadaEm"
              }
            ]
          },
          {
            "kind": "computed",
            "path": "tarefa.souCriador",
            "entity": "Tarefa",
            "rules": [
              "somenteResponsavelExecuta",
              "tarefaEncerradaNaoTransiciona"
            ]
          },
          {
            "kind": "computed",
            "path": "tarefa.souResponsavel",
            "entity": "Tarefa",
            "rules": [
              "somenteResponsavelExecuta",
              "tarefaEncerradaNaoTransiciona"
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
            "path": "tarefa.criador",
            "entity": "MembroEquipe",
            "relationship": "tarefaCriador",
            "fields": [
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
              }
            ]
          },
          {
            "kind": "related",
            "path": "tarefa.responsavel",
            "entity": "MembroEquipe",
            "relationship": "tarefaResponsavel",
            "fields": [
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
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
                "field": "details.descricao",
                "path": "details.descricao"
              },
              {
                "field": "details.marcadoEm",
                "path": "details.marcadoEm"
              }
            ]
          }
        ],
        "params": [],
        "rules": [
          "somenteResponsavelExecuta",
          "tarefaEncerradaNaoTransiciona"
        ],
        "doc": {
          "raw": "Finalidade: Envia ou reenvia a tarefa para revisão do criador.\nEntrada: id e version da tarefa.\nProcessamento: Exige que a pessoa da sessão seja o responsável (somenteResponsavelExecuta) e que a tarefa esteja em emAndamento, recusando tarefa encerrada (tarefaEncerradaNaoTransiciona). Aplica enviarParaRevisao, registra a mensagem na sala e avisa o criador.\nSaída: A tarefa em situação emRevisao, no formato de detalhe.",
          "purpose": "Envia ou reenvia a tarefa para revisão do criador.",
          "input": "id e version da tarefa.",
          "processing": "Exige que a pessoa da sessão seja o responsável (somenteResponsavelExecuta) e que a tarefa esteja em emAndamento, recusando tarefa encerrada (tarefaEncerradaNaoTransiciona). Aplica enviarParaRevisao, registra a mensagem na sala e avisa o criador.",
          "output": "A tarefa em situação emRevisao, no formato de detalhe."
        }
      },
      {
        "route": "tarefas.minhas_tarefas.cmdAceitar",
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
                "field": "details.descricao",
                "path": "details.descricao"
              },
              {
                "field": "details.motivoDevolucao",
                "path": "details.motivoDevolucao"
              },
              {
                "field": "details.devolvidaEm",
                "path": "details.devolvidaEm"
              },
              {
                "field": "details.concluidaEm",
                "path": "details.concluidaEm"
              },
              {
                "field": "details.canceladaEm",
                "path": "details.canceladaEm"
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
                "field": "prazo",
                "path": "prazo"
              },
              {
                "field": "prioridade",
                "path": "prioridade"
              },
              {
                "field": "status",
                "path": "status"
              },
              {
                "field": "criadaEm",
                "path": "criadaEm"
              }
            ]
          },
          {
            "kind": "computed",
            "path": "tarefa.souCriador",
            "entity": "Tarefa",
            "rules": [
              "somenteCriadorRevisa",
              "tarefaEncerradaNaoTransiciona"
            ]
          },
          {
            "kind": "computed",
            "path": "tarefa.souResponsavel",
            "entity": "Tarefa",
            "rules": [
              "somenteCriadorRevisa",
              "tarefaEncerradaNaoTransiciona"
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
            "path": "tarefa.criador",
            "entity": "MembroEquipe",
            "relationship": "tarefaCriador",
            "fields": [
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
              }
            ]
          },
          {
            "kind": "related",
            "path": "tarefa.responsavel",
            "entity": "MembroEquipe",
            "relationship": "tarefaResponsavel",
            "fields": [
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
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
                "field": "details.descricao",
                "path": "details.descricao"
              },
              {
                "field": "details.marcadoEm",
                "path": "details.marcadoEm"
              }
            ]
          }
        ],
        "params": [],
        "rules": [
          "somenteCriadorRevisa",
          "tarefaEncerradaNaoTransiciona"
        ],
        "doc": {
          "raw": "Finalidade: Aceita a entrega da tarefa e a conclui.\nEntrada: id e version da tarefa.\nProcessamento: Exige que a pessoa da sessão seja a criadora (somenteCriadorRevisa) e que a tarefa esteja em emRevisao, recusando tarefa encerrada (tarefaEncerradaNaoTransiciona). Aplica aceitar, registra concluidaEm e a mensagem na sala.\nSaída: A tarefa em situação concluida com a data de conclusão, no formato de detalhe.",
          "purpose": "Aceita a entrega da tarefa e a conclui.",
          "input": "id e version da tarefa.",
          "processing": "Exige que a pessoa da sessão seja a criadora (somenteCriadorRevisa) e que a tarefa esteja em emRevisao, recusando tarefa encerrada (tarefaEncerradaNaoTransiciona). Aplica aceitar, registra concluidaEm e a mensagem na sala.",
          "output": "A tarefa em situação concluida com a data de conclusão, no formato de detalhe."
        }
      },
      {
        "route": "tarefas.minhas_tarefas.cmdDevolver",
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
                "field": "details.descricao",
                "path": "details.descricao"
              },
              {
                "field": "details.motivoDevolucao",
                "path": "details.motivoDevolucao"
              },
              {
                "field": "details.devolvidaEm",
                "path": "details.devolvidaEm"
              },
              {
                "field": "details.concluidaEm",
                "path": "details.concluidaEm"
              },
              {
                "field": "details.canceladaEm",
                "path": "details.canceladaEm"
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
                "field": "prazo",
                "path": "prazo"
              },
              {
                "field": "prioridade",
                "path": "prioridade"
              },
              {
                "field": "status",
                "path": "status"
              },
              {
                "field": "criadaEm",
                "path": "criadaEm"
              }
            ]
          },
          {
            "kind": "computed",
            "path": "tarefa.souCriador",
            "entity": "Tarefa",
            "rules": [
              "somenteCriadorRevisa",
              "devolucaoExigeMotivo",
              "tarefaEncerradaNaoTransiciona"
            ]
          },
          {
            "kind": "computed",
            "path": "tarefa.souResponsavel",
            "entity": "Tarefa",
            "rules": [
              "somenteCriadorRevisa",
              "devolucaoExigeMotivo",
              "tarefaEncerradaNaoTransiciona"
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
            "path": "tarefa.criador",
            "entity": "MembroEquipe",
            "relationship": "tarefaCriador",
            "fields": [
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
              }
            ]
          },
          {
            "kind": "related",
            "path": "tarefa.responsavel",
            "entity": "MembroEquipe",
            "relationship": "tarefaResponsavel",
            "fields": [
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
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
                "field": "details.descricao",
                "path": "details.descricao"
              },
              {
                "field": "details.marcadoEm",
                "path": "details.marcadoEm"
              }
            ]
          }
        ],
        "params": [],
        "rules": [
          "somenteCriadorRevisa",
          "devolucaoExigeMotivo",
          "tarefaEncerradaNaoTransiciona"
        ],
        "doc": {
          "raw": "Finalidade: Devolve a tarefa em revisão para ajuste, com o motivo.\nEntrada: id e version da tarefa; details.motivoDevolucao: por que a entrega volta para ajuste.\nProcessamento: Exige que a pessoa da sessão seja a criadora (somenteCriadorRevisa), que a tarefa esteja em emRevisao (tarefaEncerradaNaoTransiciona) e recusa motivo vazio (devolucaoExigeMotivo). Aplica devolver, grava o motivo e devolvidaEm, volta para emAndamento e avisa o responsável.\nSaída: A tarefa em situação emAndamento com o motivo e a data da devolução, no formato de detalhe.",
          "purpose": "Devolve a tarefa em revisão para ajuste, com o motivo.",
          "input": "id e version da tarefa; details.motivoDevolucao: por que a entrega volta para ajuste.",
          "processing": "Exige que a pessoa da sessão seja a criadora (somenteCriadorRevisa), que a tarefa esteja em emRevisao (tarefaEncerradaNaoTransiciona) e recusa motivo vazio (devolucaoExigeMotivo). Aplica devolver, grava o motivo e devolvidaEm, volta para emAndamento e avisa o responsável.",
          "output": "A tarefa em situação emAndamento com o motivo e a data da devolução, no formato de detalhe."
        }
      },
      {
        "route": "tarefas.minhas_tarefas.cmdCancelar",
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
                "field": "details.descricao",
                "path": "details.descricao"
              },
              {
                "field": "details.motivoDevolucao",
                "path": "details.motivoDevolucao"
              },
              {
                "field": "details.devolvidaEm",
                "path": "details.devolvidaEm"
              },
              {
                "field": "details.concluidaEm",
                "path": "details.concluidaEm"
              },
              {
                "field": "details.canceladaEm",
                "path": "details.canceladaEm"
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
                "field": "prazo",
                "path": "prazo"
              },
              {
                "field": "prioridade",
                "path": "prioridade"
              },
              {
                "field": "status",
                "path": "status"
              },
              {
                "field": "criadaEm",
                "path": "criadaEm"
              }
            ]
          },
          {
            "kind": "computed",
            "path": "tarefa.souCriador",
            "entity": "Tarefa",
            "rules": [
              "cancelamentoPorCriadorOuGestor",
              "tarefaEncerradaNaoTransiciona"
            ]
          },
          {
            "kind": "computed",
            "path": "tarefa.souResponsavel",
            "entity": "Tarefa",
            "rules": [
              "cancelamentoPorCriadorOuGestor",
              "tarefaEncerradaNaoTransiciona"
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
            "path": "tarefa.criador",
            "entity": "MembroEquipe",
            "relationship": "tarefaCriador",
            "fields": [
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
              }
            ]
          },
          {
            "kind": "related",
            "path": "tarefa.responsavel",
            "entity": "MembroEquipe",
            "relationship": "tarefaResponsavel",
            "fields": [
              {
                "field": "details.identification.name",
                "path": "details.identification.name"
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
                "field": "details.descricao",
                "path": "details.descricao"
              },
              {
                "field": "details.marcadoEm",
                "path": "details.marcadoEm"
              }
            ]
          }
        ],
        "params": [],
        "rules": [
          "cancelamentoPorCriadorOuGestor",
          "tarefaEncerradaNaoTransiciona"
        ],
        "doc": {
          "raw": "Finalidade: Cancela uma tarefa criada pelo membro.\nEntrada: id e version da tarefa.\nProcessamento: Exige que a pessoa da sessão seja a criadora (cancelamentoPorCriadorOuGestor) e que a tarefa esteja em aFazer, emAndamento ou emRevisao (tarefaEncerradaNaoTransiciona). Aplica cancelar, registra canceladaEm e a mensagem na sala.\nSaída: A tarefa em situação cancelada com a data do cancelamento, no formato de detalhe.",
          "purpose": "Cancela uma tarefa criada pelo membro.",
          "input": "id e version da tarefa.",
          "processing": "Exige que a pessoa da sessão seja a criadora (cancelamentoPorCriadorOuGestor) e que a tarefa esteja em aFazer, emAndamento ou emRevisao (tarefaEncerradaNaoTransiciona). Aplica cancelar, registra canceladaEm e a mensagem na sala.",
          "output": "A tarefa em situação cancelada com a data do cancelamento, no formato de detalhe."
        }
      }
    ]
  }
} as const;

export default definition;

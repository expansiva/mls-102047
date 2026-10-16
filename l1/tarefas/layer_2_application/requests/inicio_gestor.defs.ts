/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/requests/inicio_gestor.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "inicio_gestor",
  "moduleName": "tarefas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/tarefas/layer_2_application/usecases/getLista.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/listLista.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/listTarefa.defs.ts"
  ],
  "data": {
    "pageId": "inicio_gestor",
    "requests": [
      {
        "route": "tarefas.inicio_gestor.qryPanoramaEquipe",
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
                "field": "details",
                "path": "details"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "totais",
            "reason": "Interface TotaisEquipe has no field that is not readonly, so no entity owns it."
          }
        ],
        "params": [],
        "rules": [],
        "doc": {
          "raw": "Finalidade: Carrega, ao abrir o início do gestor, o panorama da equipe: totais de tarefas abertas, vencendo hoje e atrasadas, progresso das checklists e tarefas abertas por lista.\nEntrada: Nenhuma entrada; o escopo é toda a equipe (organização) do gestor da sessão.\nProcessamento: Conta as tarefas da organização com details.aberta (status aFazer, emAndamento ou emRevisao), as que vencem hoje (aberta e prazo = hoje) e as atrasadas (aberta e prazo < hoje); esses indicadores derivados são calculados na consulta, nunca gravados. Soma os itens de checklist (ItemChecklist.feito por tarefaId) das tarefas abertas para obter feitos/total e o texto do progresso. Lista as listas ativas ordenadas por nome com quantidadeTarefasAbertas calculada pela contagem de tarefas abertas por listaId.\nSaída: totais com os números já prontos para os blocos de destaque e listas com nome e quantidade de tarefas abertas, para o gestor saber onde olhar primeiro.",
          "purpose": "Carrega, ao abrir o início do gestor, o panorama da equipe: totais de tarefas abertas, vencendo hoje e atrasadas, progresso das checklists e tarefas abertas por lista.",
          "input": "Nenhuma entrada; o escopo é toda a equipe (organização) do gestor da sessão.",
          "processing": "Conta as tarefas da organização com details.aberta (status aFazer, emAndamento ou emRevisao), as que vencem hoje (aberta e prazo = hoje) e as atrasadas (aberta e prazo < hoje); esses indicadores derivados são calculados na consulta, nunca gravados. Soma os itens de checklist (ItemChecklist.feito por tarefaId) das tarefas abertas para obter feitos/total e o texto do progresso. Lista as listas ativas ordenadas por nome com quantidadeTarefasAbertas calculada pela contagem de tarefas abertas por listaId.",
          "output": "totais com os números já prontos para os blocos de destaque e listas com nome e quantidade de tarefas abertas, para o gestor saber onde olhar primeiro."
        }
      },
      {
        "route": "tarefas.inicio_gestor.qryTarefasPedemAcao",
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
                "field": "nome",
                "path": "nome"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "tarefas.membroEquipe",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "tarefas.items.membroEquipe",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_gestor.qryTarefasPedemAcao projects Tarefa.membroEquipe, which is not a field of the ontology."
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
          "raw": "Finalidade: Traz a caixa de tarefas da equipe que podem pedir ação do gestor: abertas e atrasadas ou vencendo hoje.\nEntrada: page: página pedida (começa em 1); pageSize: quantidade de tarefas por página.\nProcessamento: Filtra as tarefas da organização com status aFazer, emAndamento ou emRevisao cujo prazo é hoje ou anterior; calcula aberta, venceHoje, atrasada e progressoChecklist (itens feitos do total da checklist) na consulta, sem gravar. Ordena atrasadas primeiro, por prazo crescente e prioridade decrescente. Junta o nome da lista (Lista.nome por listaId) e o nome do responsável lido no cadastro mestre (MembroEquipe.details.identification.name por responsavelId), carregados em lote.\nSaída: Página { items, page, pageSize, hasMore } de tarefas com título, lista, responsável, prioridade, prazo, situação e progresso da checklist, prontas para os cartões; a escolha leva a Tarefas da equipe.",
          "purpose": "Traz a caixa de tarefas da equipe que podem pedir ação do gestor: abertas e atrasadas ou vencendo hoje.",
          "input": "page: página pedida (começa em 1); pageSize: quantidade de tarefas por página.",
          "processing": "Filtra as tarefas da organização com status aFazer, emAndamento ou emRevisao cujo prazo é hoje ou anterior; calcula aberta, venceHoje, atrasada e progressoChecklist (itens feitos do total da checklist) na consulta, sem gravar. Ordena atrasadas primeiro, por prazo crescente e prioridade decrescente. Junta o nome da lista (Lista.nome por listaId) e o nome do responsável lido no cadastro mestre (MembroEquipe.details.identification.name por responsavelId), carregados em lote.",
          "output": "Página { items, page, pageSize, hasMore } de tarefas com título, lista, responsável, prioridade, prazo, situação e progresso da checklist, prontas para os cartões; a escolha leva a Tarefas da equipe."
        }
      }
    ]
  }
} as const;

export default definition;

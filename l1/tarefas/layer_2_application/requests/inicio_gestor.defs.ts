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
        "route": "tarefas.inicio_gestor.obterPanoramaEquipe",
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
            "path": "totalAbertas",
            "reason": "Output totalAbertas is a value (number), not an interface; no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "totalVenceHoje",
            "reason": "Output totalVenceHoje is a value (number), not an interface; no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "totalAtrasadas",
            "reason": "Output totalAtrasadas is a value (number), not an interface; no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "progressoChecklist",
            "reason": "Output progressoChecklist is a value (string), not an interface; no entity owns it."
          }
        ],
        "params": [],
        "rules": [],
        "doc": {
          "raw": "Finalidade: Entrega de uma só vez o panorama da equipe para o gestor: totais de tarefas abertas, que vencem hoje e atrasadas, progresso geral das checklists e tarefas abertas por lista.\nEntrada: Nenhuma entrada. O gestor é conhecido pela sessão e enxerga todas as tarefas da equipe (escopo da organização).\nProcessamento: Conta as tarefas da equipe com Tarefa.details.aberta verdadeiro (totalAbertas), com Tarefa.details.venceHoje (totalVenceHoje) e com Tarefa.details.atrasada (totalAtrasadas). Esses campos são derivados e calculados na consulta, nunca gravados: aberta = a fazer, em andamento ou em revisão; venceHoje = aberta com prazo hoje; atrasada = aberta com prazo anterior a hoje. Soma, nas tarefas abertas, os itens feitos e o total de itens das checklists e devolve o resultado no formato ’feitos/total’ (progressoChecklist). Lista as listas, ordenadas por nome, com Lista.details.quantidadeTarefasAbertas (derivado, calculado). Não usa campos de privacidade do membro.\nSaída: Objeto com totalAbertas, totalVenceHoje e totalAtrasadas (números), progressoChecklist (texto ’feitos/total’) e listas (cada lista com id, nome e quantidade de tarefas abertas).",
          "purpose": "Entrega de uma só vez o panorama da equipe para o gestor: totais de tarefas abertas, que vencem hoje e atrasadas, progresso geral das checklists e tarefas abertas por lista.",
          "input": "Nenhuma entrada. O gestor é conhecido pela sessão e enxerga todas as tarefas da equipe (escopo da organização).",
          "processing": "Conta as tarefas da equipe com Tarefa.details.aberta verdadeiro (totalAbertas), com Tarefa.details.venceHoje (totalVenceHoje) e com Tarefa.details.atrasada (totalAtrasadas). Esses campos são derivados e calculados na consulta, nunca gravados: aberta = a fazer, em andamento ou em revisão; venceHoje = aberta com prazo hoje; atrasada = aberta com prazo anterior a hoje. Soma, nas tarefas abertas, os itens feitos e o total de itens das checklists e devolve o resultado no formato ’feitos/total’ (progressoChecklist). Lista as listas, ordenadas por nome, com Lista.details.quantidadeTarefasAbertas (derivado, calculado). Não usa campos de privacidade do membro.",
          "output": "Objeto com totalAbertas, totalVenceHoje e totalAtrasadas (números), progressoChecklist (texto ’feitos/total’) e listas (cada lista com id, nome e quantidade de tarefas abertas)."
        }
      },
      {
        "route": "tarefas.inicio_gestor.listarTarefasParaAcao",
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
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "tarefas.items.membroEquipe",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_gestor.listarTarefasParaAcao projects Tarefa.membroEquipe, which is not a field of the ontology."
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
          "raw": "Finalidade: Lista as tarefas da equipe que podem pedir uma decisão do gestor (atrasadas e que vencem hoje), já com nome da lista e do responsável, em páginas.\nEntrada: page: número da página, começando em 1 (padrão 1). pageSize: quantidade de tarefas por página (padrão de uma tela).\nProcessamento: Considera todas as tarefas da equipe (o gestor vê todas) com Tarefa.details.aberta verdadeiro e (Tarefa.details.atrasada ou Tarefa.details.venceHoje verdadeiro); esses campos são derivados e calculados na consulta, nunca gravados. Ordena com as atrasadas primeiro, depois as que vencem hoje, e dentro de cada grupo por prazo crescente e prioridade decrescente. Resolve o nome da lista (Lista.nome) e o nome do responsável (MembroEquipe.details.identification.name) no cadastro mestre; não expõe o consentimento de privacidade. Calcula Tarefa.details.progressoChecklist (’feitos/total’) por tarefa. Pagina com page e pageSize e informa hasMore.\nSaída: Página { items, page, pageSize, hasMore } de tarefas com id, título, situação, prioridade, prazo, listaId, responsavelId, indicadores (aberta, venceHoje, atrasada, progressoChecklist), nome da lista e nome do responsável.",
          "purpose": "Lista as tarefas da equipe que podem pedir uma decisão do gestor (atrasadas e que vencem hoje), já com nome da lista e do responsável, em páginas.",
          "input": "page: número da página, começando em 1 (padrão 1). pageSize: quantidade de tarefas por página (padrão de uma tela).",
          "processing": "Considera todas as tarefas da equipe (o gestor vê todas) com Tarefa.details.aberta verdadeiro e (Tarefa.details.atrasada ou Tarefa.details.venceHoje verdadeiro); esses campos são derivados e calculados na consulta, nunca gravados. Ordena com as atrasadas primeiro, depois as que vencem hoje, e dentro de cada grupo por prazo crescente e prioridade decrescente. Resolve o nome da lista (Lista.nome) e o nome do responsável (MembroEquipe.details.identification.name) no cadastro mestre; não expõe o consentimento de privacidade. Calcula Tarefa.details.progressoChecklist (’feitos/total’) por tarefa. Pagina com page e pageSize e informa hasMore.",
          "output": "Página { items, page, pageSize, hasMore } de tarefas com id, título, situação, prioridade, prazo, listaId, responsavelId, indicadores (aberta, venceHoje, atrasada, progressoChecklist), nome da lista e nome do responsável."
        }
      }
    ]
  }
} as const;

export default definition;

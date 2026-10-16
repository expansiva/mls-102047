/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/requests/meus_avisos.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "meus_avisos",
  "moduleName": "tarefas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/tarefas/layer_2_application/usecases/getAvisoVencimento.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/getTarefa.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/listAvisoVencimento.defs.ts"
  ],
  "data": {
    "pageId": "meus_avisos",
    "requests": [
      {
        "route": "tarefas.meus_avisos.carregarMeusAvisos",
        "kind": "qry",
        "uses": [
          "listAvisoVencimento",
          "getAvisoVencimento",
          "getTarefa"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "list",
            "path": "avisos",
            "entity": "AvisoVencimento",
            "items": "items",
            "page": "avisos.page",
            "pageSize": "avisos.pageSize",
            "hasMore": "avisos.hasMore",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "dataReferencia",
                "path": "dataReferencia"
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
            "kind": "entity",
            "path": "avisoAberto",
            "entity": "AvisoVencimento",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "dataReferencia",
                "path": "dataReferencia"
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
            "path": "avisoAberto.details.tarefas",
            "entity": "AvisoVencimento",
            "fields": [
              {
                "field": "details.tarefas.tarefaId",
                "path": "details.tarefas.tarefaId"
              },
              {
                "field": "details.tarefas.prazo",
                "path": "details.tarefas.prazo"
              },
              {
                "field": "details.tarefas.situacaoPrazo",
                "path": "details.tarefas.situacaoPrazo"
              }
            ]
          },
          {
            "kind": "related",
            "path": "avisoAberto.details.tarefas.tarefa",
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
                "field": "prazo",
                "path": "prazo"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "avisoAberto.details.tarefas",
            "reason": "AvisoVencimento inside AvisoVencimento needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "avisoAberto.details.tarefas.tarefa",
            "reason": "Tarefa inside AvisoVencimento needs one L4 relationship between them; found 0."
          }
        ],
        "params": [
          {
            "name": "page",
            "target": "avisos",
            "pages": "avisos"
          },
          {
            "name": "pageSize",
            "target": "avisos",
            "pages": "avisos"
          },
          {
            "name": "responsavelId",
            "target": "avisos",
            "field": "responsavelId"
          }
        ],
        "rules": [
          "avisoUnicoPorResponsavelEDia",
          "avisoSomenteTarefasAbertasVencendo"
        ],
        "doc": {
          "raw": "Finalidade: Abre a página Meus avisos de uma vez: a lista paginada dos avisos diários do usuário da sessão, que também alimenta o histórico de envio, e o aviso mais recente (o de hoje) já aberto com as suas tarefas.\nEntrada: responsavelId: membro da sessão (vem do contexto, nunca da tela); page e pageSize: página da lista de avisos.\nProcessamento: Filtra AvisoVencimento pelo responsável da sessão (escopo own) e ordena por dataReferencia decrescente, com o aviso de hoje primeiro; pela regra avisoUnicoPorResponsavelEDia há no máximo um aviso por data, sem agrupamento. Para cada aviso devolve status, geradoEm, finalizadoEm, motivoFalha e os totais quantidadeTarefas e quantidadeAtrasadas, que são calculados pelo servidor a partir das linhas (contagem total e contagem com situacaoPrazo = overdue), nunca gravados pelo endpoint. Para o aviso mais recente compõe as linhas details.tarefas (tarefaId, prazo, situacaoPrazo) com título, situação e prazo atuais de cada Tarefa; as linhas são as que o processo gravou segundo avisoSomenteTarefasAbertasVencendo (tarefas abertas com prazo no dia ou vencido).\nSaída: avisos: página { items, page, pageSize, hasMore } para a lista e o histórico; avisoAberto: o aviso de hoje (ou o mais recente) com totais e linhas, ausente se o usuário ainda não recebeu aviso.",
          "purpose": "Abre a página Meus avisos de uma vez: a lista paginada dos avisos diários do usuário da sessão, que também alimenta o histórico de envio, e o aviso mais recente (o de hoje) já aberto com as suas tarefas.",
          "input": "responsavelId: membro da sessão (vem do contexto, nunca da tela); page e pageSize: página da lista de avisos.",
          "processing": "Filtra AvisoVencimento pelo responsável da sessão (escopo own) e ordena por dataReferencia decrescente, com o aviso de hoje primeiro; pela regra avisoUnicoPorResponsavelEDia há no máximo um aviso por data, sem agrupamento. Para cada aviso devolve status, geradoEm, finalizadoEm, motivoFalha e os totais quantidadeTarefas e quantidadeAtrasadas, que são calculados pelo servidor a partir das linhas (contagem total e contagem com situacaoPrazo = overdue), nunca gravados pelo endpoint. Para o aviso mais recente compõe as linhas details.tarefas (tarefaId, prazo, situacaoPrazo) com título, situação e prazo atuais de cada Tarefa; as linhas são as que o processo gravou segundo avisoSomenteTarefasAbertasVencendo (tarefas abertas com prazo no dia ou vencido).",
          "output": "avisos: página { items, page, pageSize, hasMore } para a lista e o histórico; avisoAberto: o aviso de hoje (ou o mais recente) com totais e linhas, ausente se o usuário ainda não recebeu aviso."
        }
      },
      {
        "route": "tarefas.meus_avisos.abrirAviso",
        "kind": "qry",
        "uses": [
          "getAvisoVencimento",
          "listAvisoVencimento",
          "getTarefa"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "entity",
            "path": "aviso",
            "entity": "AvisoVencimento",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "dataReferencia",
                "path": "dataReferencia"
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
            "path": "aviso.details.tarefas",
            "entity": "AvisoVencimento",
            "fields": [
              {
                "field": "details.tarefas.tarefaId",
                "path": "details.tarefas.tarefaId"
              },
              {
                "field": "details.tarefas.prazo",
                "path": "details.tarefas.prazo"
              },
              {
                "field": "details.tarefas.situacaoPrazo",
                "path": "details.tarefas.situacaoPrazo"
              }
            ]
          },
          {
            "kind": "related",
            "path": "aviso.details.tarefas.tarefa",
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
                "field": "prazo",
                "path": "prazo"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "aviso.details.tarefas",
            "reason": "AvisoVencimento inside AvisoVencimento needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "aviso.details.tarefas.tarefa",
            "reason": "Tarefa inside AvisoVencimento needs one L4 relationship between them; found 0."
          }
        ],
        "params": [],
        "rules": [
          "avisoSomenteTarefasAbertasVencendo"
        ],
        "doc": {
          "raw": "Finalidade: Carrega o aviso que o usuário escolheu na lista, com as tarefas que ele trouxe.\nEntrada: avisoId: id do aviso selecionado na lista.\nProcessamento: Lê o AvisoVencimento por id e recusa se não pertencer ao responsável da sessão (escopo own). Compõe as linhas details.tarefas (tarefaId, prazo e situacaoPrazo do momento do aviso) com título, situação e prazo atuais de cada Tarefa. As linhas são as gravadas pelo processo diário conforme avisoSomenteTarefasAbertasVencendo. quantidadeTarefas e quantidadeAtrasadas são calculadas pelo servidor a partir das linhas.\nSaída: aviso: o aviso com data, situação, totais e linhas, para substituir o aviso aberto no detalhe.",
          "purpose": "Carrega o aviso que o usuário escolheu na lista, com as tarefas que ele trouxe.",
          "input": "avisoId: id do aviso selecionado na lista.",
          "processing": "Lê o AvisoVencimento por id e recusa se não pertencer ao responsável da sessão (escopo own). Compõe as linhas details.tarefas (tarefaId, prazo e situacaoPrazo do momento do aviso) com título, situação e prazo atuais de cada Tarefa. As linhas são as gravadas pelo processo diário conforme avisoSomenteTarefasAbertasVencendo. quantidadeTarefas e quantidadeAtrasadas são calculadas pelo servidor a partir das linhas.",
          "output": "aviso: o aviso com data, situação, totais e linhas, para substituir o aviso aberto no detalhe."
        }
      }
    ]
  }
} as const;

export default definition;

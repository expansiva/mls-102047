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
                "field": "details.quantidadeTarefas",
                "path": "details.quantidadeTarefas"
              },
              {
                "field": "details.quantidadeAtrasadas",
                "path": "details.quantidadeAtrasadas"
              },
              {
                "field": "details.geradoEm",
                "path": "details.geradoEm"
              },
              {
                "field": "details.finalizadoEm",
                "path": "details.finalizadoEm"
              },
              {
                "field": "details.motivoFalha",
                "path": "details.motivoFalha"
              }
            ]
          },
          {
            "kind": "entity",
            "path": "avisoAtual",
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
                "field": "details.quantidadeTarefas",
                "path": "details.quantidadeTarefas"
              },
              {
                "field": "details.quantidadeAtrasadas",
                "path": "details.quantidadeAtrasadas"
              }
            ]
          },
          {
            "kind": "related",
            "path": "avisoAtual.tarefas",
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
            "path": "avisoAtual.tarefas.tarefa",
            "entity": "Tarefa",
            "fields": [
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
              },
              {
                "field": "details.venceHoje",
                "path": "details.venceHoje"
              },
              {
                "field": "details.atrasada",
                "path": "details.atrasada"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "avisoAtual.tarefas",
            "reason": "AvisoVencimento inside AvisoVencimento needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "avisoAtual.tarefas.tarefa",
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
          }
        ],
        "rules": [
          "avisoUnicoPorResponsavelEDia",
          "avisoSomenteTarefasAbertasVencendo"
        ],
        "doc": {
          "raw": "Finalidade: Abre a página de avisos com a primeira página dos avisos diários da pessoa logada e o conteúdo do aviso mais recente já montado.\nEntrada: page: número da página da lista de avisos; pageSize: quantidade de avisos por página.\nProcessamento: Filtra os AvisoVencimento cujo responsavelId é a pessoa da sessão, ordenados por dataReferencia decrescente, paginados. Pela regra avisoUnicoPorResponsavelEDia há no máximo um aviso por data. Para o aviso mais recente, carrega as linhas de details.tarefas e compõe cada uma com título, situação e prazo atuais da Tarefa; venceHoje e atrasada são calculados na leitura a partir do prazo e da situação da tarefa, e quantidadeTarefas e quantidadeAtrasadas são calculados a partir das linhas. O conteúdo reflete a regra avisoSomenteTarefasAbertasVencendo: apenas tarefas abertas com prazo no dia do aviso ou anterior.\nSaída: avisos: página { items, page, pageSize, hasMore } de avisos com data, situação do envio, totais, geradoEm, finalizadoEm e motivoFalha; avisoAtual: o aviso mais recente com totais e suas tarefas, ausente se a pessoa ainda não recebeu nenhum aviso.",
          "purpose": "Abre a página de avisos com a primeira página dos avisos diários da pessoa logada e o conteúdo do aviso mais recente já montado.",
          "input": "page: número da página da lista de avisos; pageSize: quantidade de avisos por página.",
          "processing": "Filtra os AvisoVencimento cujo responsavelId é a pessoa da sessão, ordenados por dataReferencia decrescente, paginados. Pela regra avisoUnicoPorResponsavelEDia há no máximo um aviso por data. Para o aviso mais recente, carrega as linhas de details.tarefas e compõe cada uma com título, situação e prazo atuais da Tarefa; venceHoje e atrasada são calculados na leitura a partir do prazo e da situação da tarefa, e quantidadeTarefas e quantidadeAtrasadas são calculados a partir das linhas. O conteúdo reflete a regra avisoSomenteTarefasAbertasVencendo: apenas tarefas abertas com prazo no dia do aviso ou anterior.",
          "output": "avisos: página { items, page, pageSize, hasMore } de avisos com data, situação do envio, totais, geradoEm, finalizadoEm e motivoFalha; avisoAtual: o aviso mais recente com totais e suas tarefas, ausente se a pessoa ainda não recebeu nenhum aviso."
        }
      },
      {
        "route": "tarefas.meus_avisos.buscarAvisos",
        "kind": "qry",
        "uses": [
          "listAvisoVencimento"
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
                "field": "details.quantidadeTarefas",
                "path": "details.quantidadeTarefas"
              },
              {
                "field": "details.quantidadeAtrasadas",
                "path": "details.quantidadeAtrasadas"
              },
              {
                "field": "details.geradoEm",
                "path": "details.geradoEm"
              },
              {
                "field": "details.finalizadoEm",
                "path": "details.finalizadoEm"
              },
              {
                "field": "details.motivoFalha",
                "path": "details.motivoFalha"
              }
            ]
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
          }
        ],
        "rules": [
          "avisoUnicoPorResponsavelEDia"
        ],
        "doc": {
          "raw": "Finalidade: Lista os avisos diários da pessoa logada em um período de datas de referência, página a página.\nEntrada: dataInicio: data de referência inicial do período (inclusive, opcional); dataFim: data de referência final (inclusive, opcional); page e pageSize: página e tamanho da página.\nProcessamento: Filtra AvisoVencimento pelo responsavelId da pessoa da sessão e por dataReferencia entre dataInicio e dataFim, ordenando por dataReferencia decrescente; um aviso por data (avisoUnicoPorResponsavelEDia). quantidadeTarefas e quantidadeAtrasadas são calculados a partir das linhas de cada aviso.\nSaída: Página { items, page, pageSize, hasMore } de avisos com data, situação do envio, totais, geradoEm, finalizadoEm e motivoFalha.",
          "purpose": "Lista os avisos diários da pessoa logada em um período de datas de referência, página a página.",
          "input": "dataInicio: data de referência inicial do período (inclusive, opcional); dataFim: data de referência final (inclusive, opcional); page e pageSize: página e tamanho da página.",
          "processing": "Filtra AvisoVencimento pelo responsavelId da pessoa da sessão e por dataReferencia entre dataInicio e dataFim, ordenando por dataReferencia decrescente; um aviso por data (avisoUnicoPorResponsavelEDia). quantidadeTarefas e quantidadeAtrasadas são calculados a partir das linhas de cada aviso.",
          "output": "Página { items, page, pageSize, hasMore } de avisos com data, situação do envio, totais, geradoEm, finalizadoEm e motivoFalha."
        }
      },
      {
        "route": "tarefas.meus_avisos.obterAviso",
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
                "field": "details.quantidadeTarefas",
                "path": "details.quantidadeTarefas"
              },
              {
                "field": "details.quantidadeAtrasadas",
                "path": "details.quantidadeAtrasadas"
              }
            ]
          },
          {
            "kind": "related",
            "path": "aviso.tarefas",
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
            "path": "aviso.tarefas.tarefa",
            "entity": "Tarefa",
            "fields": [
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
              },
              {
                "field": "details.venceHoje",
                "path": "details.venceHoje"
              },
              {
                "field": "details.atrasada",
                "path": "details.atrasada"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "aviso.tarefas",
            "reason": "AvisoVencimento inside AvisoVencimento needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "aviso.tarefas.tarefa",
            "reason": "Tarefa inside AvisoVencimento needs one L4 relationship between them; found 0."
          }
        ],
        "params": [],
        "rules": [
          "avisoSomenteTarefasAbertasVencendo"
        ],
        "doc": {
          "raw": "Finalidade: Traz o conteúdo completo de um aviso diário escolhido pela pessoa logada.\nEntrada: avisoId: id do aviso escolhido na lista.\nProcessamento: Lê o AvisoVencimento pelo id e recusa se o responsavelId não for a pessoa da sessão. Compõe cada linha de details.tarefas (tarefaId, prazo registrado, situacaoPrazo) com título, situação e prazo atuais da Tarefa; venceHoje e atrasada são calculados na leitura, e quantidadeTarefas e quantidadeAtrasadas a partir das linhas. As linhas seguem a regra avisoSomenteTarefasAbertasVencendo: tarefas abertas com prazo no dia do aviso ou já vencido.\nSaída: O aviso com data de referência, situação do envio, totais de tarefas e de atrasadas e a relação das tarefas incluídas com seus dados atuais.",
          "purpose": "Traz o conteúdo completo de um aviso diário escolhido pela pessoa logada.",
          "input": "avisoId: id do aviso escolhido na lista.",
          "processing": "Lê o AvisoVencimento pelo id e recusa se o responsavelId não for a pessoa da sessão. Compõe cada linha de details.tarefas (tarefaId, prazo registrado, situacaoPrazo) com título, situação e prazo atuais da Tarefa; venceHoje e atrasada são calculados na leitura, e quantidadeTarefas e quantidadeAtrasadas a partir das linhas. As linhas seguem a regra avisoSomenteTarefasAbertasVencendo: tarefas abertas com prazo no dia do aviso ou já vencido.",
          "output": "O aviso com data de referência, situação do envio, totais de tarefas e de atrasadas e a relação das tarefas incluídas com seus dados atuais."
        }
      }
    ]
  }
} as const;

export default definition;

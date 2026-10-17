/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/requests/meus_avisos.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "meus_avisos",
  "moduleName": "tarefas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/tarefas/layer_2_application/usecases/getAvisoVencimento.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/listAvisoVencimento.defs.ts"
  ],
  "data": {
    "pageId": "meus_avisos",
    "requests": [
      {
        "route": "tarefas.meus_avisos.qryPaginaMeusAvisos",
        "kind": "qry",
        "uses": [
          "listAvisoVencimento",
          "getAvisoVencimento"
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
                "field": "details",
                "path": "details"
              }
            ]
          },
          {
            "kind": "unresolved",
            "path": "avisoAtual.details.tarefas",
            "reason": "Interface AvisoLinhaTarefa: fields tarefaId, prazo, details.tarefas.situacaoPrazo are not all fields of one entity or of one entity linked to it by an N:1 relationship."
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
          "raw": "Finalidade: Carrega a abertura da página de avisos: a primeira página dos avisos diários da pessoa logada e o aviso mais recente já completo com suas tarefas.\nEntrada: pageSize: tamanho da página de avisos (opcional, padrão do servidor). A pessoa logada não é enviada: o servidor a usa como responsável.\nProcessamento: Filtra AvisoVencimento pelo responsável da sessão, ordenado por dataReferencia decrescente, página 1 (no máximo um aviso por dia, avisoUnicoPorResponsavelEDia). quantidadeTarefas e quantidadeAtrasadas são calculadas a partir das linhas do aviso (total e linhas com situacaoPrazo overdue), nunca gravadas. Para o aviso mais recente compõe as linhas (tarefaId, prazo e situacaoPrazo do momento da geração, conforme avisoSomenteTarefasAbertasVencendo) com a Tarefa atual (titulo, status, prazo) e calcula venceHoje e atrasada da tarefa em relação à data de hoje.\nSaída: avisos: página { items, page, pageSize, hasMore } de avisos com data, situação do envio, totais, geradoEm, finalizadoEm e motivoFalha. avisoAtual: o aviso mais recente com totais e linhas de tarefas; ausente se a pessoa ainda não recebeu aviso.",
          "purpose": "Carrega a abertura da página de avisos: a primeira página dos avisos diários da pessoa logada e o aviso mais recente já completo com suas tarefas.",
          "input": "pageSize: tamanho da página de avisos (opcional, padrão do servidor). A pessoa logada não é enviada: o servidor a usa como responsável.",
          "processing": "Filtra AvisoVencimento pelo responsável da sessão, ordenado por dataReferencia decrescente, página 1 (no máximo um aviso por dia, avisoUnicoPorResponsavelEDia). quantidadeTarefas e quantidadeAtrasadas são calculadas a partir das linhas do aviso (total e linhas com situacaoPrazo overdue), nunca gravadas. Para o aviso mais recente compõe as linhas (tarefaId, prazo e situacaoPrazo do momento da geração, conforme avisoSomenteTarefasAbertasVencendo) com a Tarefa atual (titulo, status, prazo) e calcula venceHoje e atrasada da tarefa em relação à data de hoje.",
          "output": "avisos: página { items, page, pageSize, hasMore } de avisos com data, situação do envio, totais, geradoEm, finalizadoEm e motivoFalha. avisoAtual: o aviso mais recente com totais e linhas de tarefas; ausente se a pessoa ainda não recebeu aviso."
        }
      },
      {
        "route": "tarefas.meus_avisos.qryListarMeusAvisos",
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
                "field": "details",
                "path": "details"
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
          "raw": "Finalidade: Lista os avisos diários da pessoa logada num período, página a página.\nEntrada: dataInicio e dataFim: limites inclusivos da data de referência (opcionais); page e pageSize: página pedida e tamanho.\nProcessamento: Filtra AvisoVencimento pelo responsável da sessão e por dataReferencia entre dataInicio e dataFim, ordenado por dataReferencia decrescente (um aviso por dia, avisoUnicoPorResponsavelEDia). Calcula quantidadeTarefas e quantidadeAtrasadas a partir das linhas de cada aviso.\nSaída: Página { items, page, pageSize, hasMore } de avisos com data, situação do envio, totais, geradoEm, finalizadoEm e motivoFalha.",
          "purpose": "Lista os avisos diários da pessoa logada num período, página a página.",
          "input": "dataInicio e dataFim: limites inclusivos da data de referência (opcionais); page e pageSize: página pedida e tamanho.",
          "processing": "Filtra AvisoVencimento pelo responsável da sessão e por dataReferencia entre dataInicio e dataFim, ordenado por dataReferencia decrescente (um aviso por dia, avisoUnicoPorResponsavelEDia). Calcula quantidadeTarefas e quantidadeAtrasadas a partir das linhas de cada aviso.",
          "output": "Página { items, page, pageSize, hasMore } de avisos com data, situação do envio, totais, geradoEm, finalizadoEm e motivoFalha."
        }
      },
      {
        "route": "tarefas.meus_avisos.qryAvisoPorId",
        "kind": "qry",
        "uses": [
          "getAvisoVencimento"
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
            "kind": "unresolved",
            "path": "aviso.details.tarefas",
            "reason": "Interface AvisoLinhaTarefa: fields tarefaId, prazo, details.tarefas.situacaoPrazo are not all fields of one entity or of one entity linked to it by an N:1 relationship."
          }
        ],
        "params": [
          {
            "name": "id",
            "target": "aviso",
            "field": "id"
          }
        ],
        "rules": [
          "avisoSomenteTarefasAbertasVencendo"
        ],
        "doc": {
          "raw": "Finalidade: Abre um aviso diário escolhido com seus totais e as tarefas que ele trouxe.\nEntrada: id: id do aviso escolhido.\nProcessamento: Lê o AvisoVencimento pelo id e recusa se o responsável não for a pessoa logada. Compõe cada linha (tarefaId, prazo e situacaoPrazo do momento da geração, que conforme avisoSomenteTarefasAbertasVencendo traz só tarefas abertas vencendo no dia ou atrasadas) com a Tarefa atual (titulo, status, prazo). Calcula quantidadeTarefas, quantidadeAtrasadas e, para cada tarefa, venceHoje e atrasada em relação a hoje; nada disso é gravado.\nSaída: O aviso com data de referência, situação, totais e as linhas de tarefas com os dados atuais de cada tarefa.",
          "purpose": "Abre um aviso diário escolhido com seus totais e as tarefas que ele trouxe.",
          "input": "id: id do aviso escolhido.",
          "processing": "Lê o AvisoVencimento pelo id e recusa se o responsável não for a pessoa logada. Compõe cada linha (tarefaId, prazo e situacaoPrazo do momento da geração, que conforme avisoSomenteTarefasAbertasVencendo traz só tarefas abertas vencendo no dia ou atrasadas) com a Tarefa atual (titulo, status, prazo). Calcula quantidadeTarefas, quantidadeAtrasadas e, para cada tarefa, venceHoje e atrasada em relação a hoje; nada disso é gravado.",
          "output": "O aviso com data de referência, situação, totais e as linhas de tarefas com os dados atuais de cada tarefa."
        }
      }
    ]
  }
} as const;

export default definition;

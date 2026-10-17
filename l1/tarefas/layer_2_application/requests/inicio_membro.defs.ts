/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/requests/inicio_membro.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "inicio_membro",
  "moduleName": "tarefas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/tarefas/layer_2_application/usecases/aceitar.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/devolver.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/enviarParaRevisao.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/getAvisoVencimento.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/getLista.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/iniciar.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/listTarefa.defs.ts"
  ],
  "data": {
    "pageId": "inicio_membro",
    "requests": [
      {
        "route": "tarefas.inicio_membro.carregarInicio",
        "kind": "qry",
        "uses": [
          "listTarefa",
          "getLista",
          "getAvisoVencimento"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "list",
            "path": "resumo",
            "entity": "Tarefa",
            "items": "",
            "fields": []
          },
          {
            "kind": "unresolved",
            "path": "resumo.lista",
            "reason": "CONTRACT_UNPARSED: Route tarefas.inicio_membro.carregarInicio output resumo.lista nests a relation with no readable interface."
          },
          {
            "kind": "entity",
            "path": "avisoDoDia",
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
            "kind": "list",
            "path": "esperaPorMim.paraIniciar",
            "entity": "Tarefa",
            "items": "",
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
                "field": "prazo",
                "path": "prazo"
              },
              {
                "field": "prioridade",
                "path": "prioridade"
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
            "kind": "list",
            "path": "esperaPorMim.paraEnviarRevisao",
            "entity": "Tarefa",
            "items": "",
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
                "field": "prazo",
                "path": "prazo"
              },
              {
                "field": "prioridade",
                "path": "prioridade"
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
            "kind": "list",
            "path": "esperaPorMim.paraRevisar",
            "entity": "Tarefa",
            "items": "",
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
                "field": "prazo",
                "path": "prazo"
              },
              {
                "field": "prioridade",
                "path": "prioridade"
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
            "kind": "list",
            "path": "esperaPorMim.devolvidas",
            "entity": "Tarefa",
            "items": "",
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
                "field": "prazo",
                "path": "prazo"
              },
              {
                "field": "prioridade",
                "path": "prioridade"
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
            "kind": "unresolved",
            "path": "resumo.quantidadeAbertas",
            "reason": "Interface ResumoMinhasTarefas pages tarefas; quantidadeAbertas is not one of the paging keys total, page, pageSize, hasMore next to items, so the types do not say what it is."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeVencemHoje",
            "reason": "Interface ResumoMinhasTarefas pages tarefas; quantidadeVencemHoje is not one of the paging keys total, page, pageSize, hasMore next to items, so the types do not say what it is."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeAtrasadas",
            "reason": "Interface ResumoMinhasTarefas pages tarefas; quantidadeAtrasadas is not one of the paging keys total, page, pageSize, hasMore next to items, so the types do not say what it is."
          },
          {
            "kind": "unresolved",
            "path": "avisoDoDia.details.tarefas",
            "reason": "Interface AvisoTarefa: fields tarefaId, prazo, details.tarefas.situacaoPrazo are not all fields of one entity or of one entity linked to it by an N:1 relationship."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraIniciar.responsavel",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraIniciar.criador",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraEnviarRevisao.responsavel",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraEnviarRevisao.criador",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraRevisar.responsavel",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraRevisar.criador",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.devolvidas.responsavel",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.devolvidas.criador",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeAbertas",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.carregarInicio projects Tarefa.quantidadeAbertas, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeVencemHoje",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.carregarInicio projects Tarefa.quantidadeVencemHoje, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeAtrasadas",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.carregarInicio projects Tarefa.quantidadeAtrasadas, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.tarefas",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.carregarInicio projects Tarefa.tarefas, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraIniciar.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.carregarInicio projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraIniciar.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.carregarInicio projects Tarefa.criador, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraEnviarRevisao.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.carregarInicio projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraEnviarRevisao.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.carregarInicio projects Tarefa.criador, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraRevisar.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.carregarInicio projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraRevisar.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.carregarInicio projects Tarefa.criador, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.devolvidas.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.carregarInicio projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.devolvidas.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.carregarInicio projects Tarefa.criador, which is not a field of the ontology."
          }
        ],
        "params": [],
        "rules": [
          "avisoUnicoPorResponsavelEDia"
        ],
        "doc": {
          "raw": "Finalidade: Carrega de uma vez tudo o que o Início do membro mostra: resumo da carga de trabalho, aviso diário de hoje e as pendências que esperam pela pessoa logada.\nEntrada: Sem parâmetros; a pessoa é a da sessão.\nProcessamento: Resumo: considera as tarefas em que a pessoa da sessão é responsável e calcula no servidor quantas estão abertas (details.aberta), quantas vencem hoje (details.venceHoje) e quantas estão atrasadas (details.atrasada); devolve as tarefas abertas mais urgentes (até 10, ordenadas por atrasadas, vencendo hoje, prazo e prioridade) com o nome da lista e o progresso da checklist calculado a partir dos itens feitos sobre o total. Aviso: busca o aviso da pessoa com dataReferencia igual a hoje (há no máximo um, regra avisoUnicoPorResponsavelEDia) com quantidades e tarefas incluídas. Pendências: paraIniciar = responsável é a pessoa e status aFazer; paraEnviarRevisao = responsável é a pessoa, status emAndamento e sem devolução pendente; devolvidas = responsável é a pessoa, status emAndamento e com motivoDevolucao/devolvidaEm registrados; paraRevisar = criador é a pessoa e status emRevisao. Cada item traz versão, nomes do responsável e do criador lidos do cadastro mestre e o progresso da checklist calculado. Campos derivados são calculados, nunca gravados.\nSaída: resumo com os três totais e as tarefas abertas mais urgentes; avisoDoDia de hoje com situação, quantidades e tarefas (ausente se ainda não foi gerado); esperaPorMim com as quatro listas de pendências.",
          "purpose": "Carrega de uma vez tudo o que o Início do membro mostra: resumo da carga de trabalho, aviso diário de hoje e as pendências que esperam pela pessoa logada.",
          "input": "Sem parâmetros; a pessoa é a da sessão.",
          "processing": "Resumo: considera as tarefas em que a pessoa da sessão é responsável e calcula no servidor quantas estão abertas (details.aberta), quantas vencem hoje (details.venceHoje) e quantas estão atrasadas (details.atrasada); devolve as tarefas abertas mais urgentes (até 10, ordenadas por atrasadas, vencendo hoje, prazo e prioridade) com o nome da lista e o progresso da checklist calculado a partir dos itens feitos sobre o total. Aviso: busca o aviso da pessoa com dataReferencia igual a hoje (há no máximo um, regra avisoUnicoPorResponsavelEDia) com quantidades e tarefas incluídas. Pendências: paraIniciar = responsável é a pessoa e status aFazer; paraEnviarRevisao = responsável é a pessoa, status emAndamento e sem devolução pendente; devolvidas = responsável é a pessoa, status emAndamento e com motivoDevolucao/devolvidaEm registrados; paraRevisar = criador é a pessoa e status emRevisao. Cada item traz versão, nomes do responsável e do criador lidos do cadastro mestre e o progresso da checklist calculado. Campos derivados são calculados, nunca gravados.",
          "output": "resumo com os três totais e as tarefas abertas mais urgentes; avisoDoDia de hoje com situação, quantidades e tarefas (ausente se ainda não foi gerado); esperaPorMim com as quatro listas de pendências."
        }
      },
      {
        "route": "tarefas.inicio_membro.iniciarTarefa",
        "kind": "cmd",
        "uses": [
          "iniciar",
          "getLista"
        ],
        "transaction": "single",
        "output": [
          {
            "kind": "list",
            "path": "resumo",
            "entity": "Tarefa",
            "items": "",
            "fields": []
          },
          {
            "kind": "unresolved",
            "path": "resumo.lista",
            "reason": "CONTRACT_UNPARSED: Route tarefas.inicio_membro.iniciarTarefa output resumo.lista nests a relation with no readable interface."
          },
          {
            "kind": "list",
            "path": "esperaPorMim.paraIniciar",
            "entity": "Tarefa",
            "items": "",
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
                "field": "prazo",
                "path": "prazo"
              },
              {
                "field": "prioridade",
                "path": "prioridade"
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
            "kind": "list",
            "path": "esperaPorMim.paraEnviarRevisao",
            "entity": "Tarefa",
            "items": "",
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
                "field": "prazo",
                "path": "prazo"
              },
              {
                "field": "prioridade",
                "path": "prioridade"
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
            "kind": "list",
            "path": "esperaPorMim.paraRevisar",
            "entity": "Tarefa",
            "items": "",
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
                "field": "prazo",
                "path": "prazo"
              },
              {
                "field": "prioridade",
                "path": "prioridade"
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
            "kind": "list",
            "path": "esperaPorMim.devolvidas",
            "entity": "Tarefa",
            "items": "",
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
                "field": "prazo",
                "path": "prazo"
              },
              {
                "field": "prioridade",
                "path": "prioridade"
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
            "kind": "unresolved",
            "path": "resumo.quantidadeAbertas",
            "reason": "Interface ResumoMinhasTarefas pages tarefas; quantidadeAbertas is not one of the paging keys total, page, pageSize, hasMore next to items, so the types do not say what it is."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeVencemHoje",
            "reason": "Interface ResumoMinhasTarefas pages tarefas; quantidadeVencemHoje is not one of the paging keys total, page, pageSize, hasMore next to items, so the types do not say what it is."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeAtrasadas",
            "reason": "Interface ResumoMinhasTarefas pages tarefas; quantidadeAtrasadas is not one of the paging keys total, page, pageSize, hasMore next to items, so the types do not say what it is."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraIniciar.responsavel",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraIniciar.criador",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraEnviarRevisao.responsavel",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraEnviarRevisao.criador",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraRevisar.responsavel",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraRevisar.criador",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.devolvidas.responsavel",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.devolvidas.criador",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeAbertas",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.iniciarTarefa projects Tarefa.quantidadeAbertas, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeVencemHoje",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.iniciarTarefa projects Tarefa.quantidadeVencemHoje, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeAtrasadas",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.iniciarTarefa projects Tarefa.quantidadeAtrasadas, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.tarefas",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.iniciarTarefa projects Tarefa.tarefas, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraIniciar.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.iniciarTarefa projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraIniciar.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.iniciarTarefa projects Tarefa.criador, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraEnviarRevisao.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.iniciarTarefa projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraEnviarRevisao.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.iniciarTarefa projects Tarefa.criador, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraRevisar.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.iniciarTarefa projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraRevisar.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.iniciarTarefa projects Tarefa.criador, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.devolvidas.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.iniciarTarefa projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.devolvidas.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.iniciarTarefa projects Tarefa.criador, which is not a field of the ontology."
          }
        ],
        "params": [],
        "rules": [
          "somenteResponsavelExecuta",
          "tarefaEncerradaNaoTransiciona"
        ],
        "doc": {
          "raw": "Finalidade: Inicia uma tarefa atribuída à pessoa, passando-a de a fazer para em andamento.\nEntrada: id: tarefa a iniciar; version: versão lida, para concorrência otimista.\nProcessamento: Recusa se a pessoa da sessão não for o responsável (somenteResponsavelExecuta), se a tarefa estiver concluída ou cancelada (tarefaEncerradaNaoTransiciona) ou se não estiver em aFazer; recusa se a versão divergir. Executa a transição iniciar; a sala de discussão recebe a mensagem. Em seguida recalcula o resumo e as pendências da pessoa como em carregarInicio.\nSaída: resumo recalculado e esperaPorMim recalculado, já com a tarefa em emAndamento.",
          "purpose": "Inicia uma tarefa atribuída à pessoa, passando-a de a fazer para em andamento.",
          "input": "id: tarefa a iniciar; version: versão lida, para concorrência otimista.",
          "processing": "Recusa se a pessoa da sessão não for o responsável (somenteResponsavelExecuta), se a tarefa estiver concluída ou cancelada (tarefaEncerradaNaoTransiciona) ou se não estiver em aFazer; recusa se a versão divergir. Executa a transição iniciar; a sala de discussão recebe a mensagem. Em seguida recalcula o resumo e as pendências da pessoa como em carregarInicio.",
          "output": "resumo recalculado e esperaPorMim recalculado, já com a tarefa em emAndamento."
        }
      },
      {
        "route": "tarefas.inicio_membro.enviarParaRevisao",
        "kind": "cmd",
        "uses": [
          "enviarParaRevisao",
          "getLista"
        ],
        "transaction": "single",
        "output": [
          {
            "kind": "list",
            "path": "resumo",
            "entity": "Tarefa",
            "items": "",
            "fields": []
          },
          {
            "kind": "unresolved",
            "path": "resumo.lista",
            "reason": "CONTRACT_UNPARSED: Route tarefas.inicio_membro.enviarParaRevisao output resumo.lista nests a relation with no readable interface."
          },
          {
            "kind": "list",
            "path": "esperaPorMim.paraIniciar",
            "entity": "Tarefa",
            "items": "",
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
                "field": "prazo",
                "path": "prazo"
              },
              {
                "field": "prioridade",
                "path": "prioridade"
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
            "kind": "list",
            "path": "esperaPorMim.paraEnviarRevisao",
            "entity": "Tarefa",
            "items": "",
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
                "field": "prazo",
                "path": "prazo"
              },
              {
                "field": "prioridade",
                "path": "prioridade"
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
            "kind": "list",
            "path": "esperaPorMim.paraRevisar",
            "entity": "Tarefa",
            "items": "",
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
                "field": "prazo",
                "path": "prazo"
              },
              {
                "field": "prioridade",
                "path": "prioridade"
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
            "kind": "list",
            "path": "esperaPorMim.devolvidas",
            "entity": "Tarefa",
            "items": "",
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
                "field": "prazo",
                "path": "prazo"
              },
              {
                "field": "prioridade",
                "path": "prioridade"
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
            "kind": "unresolved",
            "path": "resumo.quantidadeVencemHoje",
            "reason": "Interface ResumoMinhasTarefas pages tarefas; quantidadeVencemHoje is not one of the paging keys total, page, pageSize, hasMore next to items, so the types do not say what it is."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeAtrasadas",
            "reason": "Interface ResumoMinhasTarefas pages tarefas; quantidadeAtrasadas is not one of the paging keys total, page, pageSize, hasMore next to items, so the types do not say what it is."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraIniciar.responsavel",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraIniciar.criador",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraEnviarRevisao.responsavel",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraEnviarRevisao.criador",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraRevisar.responsavel",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraRevisar.criador",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.devolvidas.responsavel",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.devolvidas.criador",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeAbertas",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.enviarParaRevisao projects Tarefa.quantidadeAbertas, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeVencemHoje",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.enviarParaRevisao projects Tarefa.quantidadeVencemHoje, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeAtrasadas",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.enviarParaRevisao projects Tarefa.quantidadeAtrasadas, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.tarefas",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.enviarParaRevisao projects Tarefa.tarefas, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraIniciar.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.enviarParaRevisao projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraIniciar.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.enviarParaRevisao projects Tarefa.criador, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraEnviarRevisao.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.enviarParaRevisao projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraEnviarRevisao.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.enviarParaRevisao projects Tarefa.criador, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraRevisar.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.enviarParaRevisao projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraRevisar.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.enviarParaRevisao projects Tarefa.criador, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.devolvidas.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.enviarParaRevisao projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.devolvidas.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.enviarParaRevisao projects Tarefa.criador, which is not a field of the ontology."
          }
        ],
        "params": [],
        "rules": [
          "somenteResponsavelExecuta",
          "tarefaEncerradaNaoTransiciona"
        ],
        "doc": {
          "raw": "Finalidade: Envia para revisão do criador uma tarefa em andamento da pessoa, inclusive a reenviada após devolução.\nEntrada: id: tarefa a enviar; version: versão lida, para concorrência otimista.\nProcessamento: Recusa se a pessoa da sessão não for o responsável (somenteResponsavelExecuta), se a tarefa estiver encerrada (tarefaEncerradaNaoTransiciona) ou fora de emAndamento; recusa se a versão divergir. Executa a transição enviarParaRevisao; o criador passa a agir e é avisado. Recalcula resumo e pendências como em carregarInicio.\nSaída: resumo recalculado e esperaPorMim recalculado, já com a tarefa em emRevisao.",
          "purpose": "Envia para revisão do criador uma tarefa em andamento da pessoa, inclusive a reenviada após devolução.",
          "input": "id: tarefa a enviar; version: versão lida, para concorrência otimista.",
          "processing": "Recusa se a pessoa da sessão não for o responsável (somenteResponsavelExecuta), se a tarefa estiver encerrada (tarefaEncerradaNaoTransiciona) ou fora de emAndamento; recusa se a versão divergir. Executa a transição enviarParaRevisao; o criador passa a agir e é avisado. Recalcula resumo e pendências como em carregarInicio.",
          "output": "resumo recalculado e esperaPorMim recalculado, já com a tarefa em emRevisao."
        }
      },
      {
        "route": "tarefas.inicio_membro.aceitarEntrega",
        "kind": "cmd",
        "uses": [
          "aceitar",
          "getLista"
        ],
        "transaction": "single",
        "output": [
          {
            "kind": "list",
            "path": "resumo",
            "entity": "Tarefa",
            "items": "",
            "fields": []
          },
          {
            "kind": "unresolved",
            "path": "resumo.lista",
            "reason": "CONTRACT_UNPARSED: Route tarefas.inicio_membro.aceitarEntrega output resumo.lista nests a relation with no readable interface."
          },
          {
            "kind": "list",
            "path": "esperaPorMim.paraIniciar",
            "entity": "Tarefa",
            "items": "",
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
                "field": "prazo",
                "path": "prazo"
              },
              {
                "field": "prioridade",
                "path": "prioridade"
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
            "kind": "list",
            "path": "esperaPorMim.paraEnviarRevisao",
            "entity": "Tarefa",
            "items": "",
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
                "field": "prazo",
                "path": "prazo"
              },
              {
                "field": "prioridade",
                "path": "prioridade"
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
            "kind": "list",
            "path": "esperaPorMim.paraRevisar",
            "entity": "Tarefa",
            "items": "",
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
                "field": "prazo",
                "path": "prazo"
              },
              {
                "field": "prioridade",
                "path": "prioridade"
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
            "kind": "list",
            "path": "esperaPorMim.devolvidas",
            "entity": "Tarefa",
            "items": "",
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
                "field": "prazo",
                "path": "prazo"
              },
              {
                "field": "prioridade",
                "path": "prioridade"
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
            "kind": "unresolved",
            "path": "resumo.quantidadeVencemHoje",
            "reason": "Interface ResumoMinhasTarefas pages tarefas; quantidadeVencemHoje is not one of the paging keys total, page, pageSize, hasMore next to items, so the types do not say what it is."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeAtrasadas",
            "reason": "Interface ResumoMinhasTarefas pages tarefas; quantidadeAtrasadas is not one of the paging keys total, page, pageSize, hasMore next to items, so the types do not say what it is."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraIniciar.responsavel",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraIniciar.criador",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraEnviarRevisao.responsavel",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraEnviarRevisao.criador",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraRevisar.responsavel",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraRevisar.criador",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.devolvidas.responsavel",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.devolvidas.criador",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeAbertas",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.aceitarEntrega projects Tarefa.quantidadeAbertas, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeVencemHoje",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.aceitarEntrega projects Tarefa.quantidadeVencemHoje, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeAtrasadas",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.aceitarEntrega projects Tarefa.quantidadeAtrasadas, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.tarefas",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.aceitarEntrega projects Tarefa.tarefas, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraIniciar.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.aceitarEntrega projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraIniciar.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.aceitarEntrega projects Tarefa.criador, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraEnviarRevisao.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.aceitarEntrega projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraEnviarRevisao.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.aceitarEntrega projects Tarefa.criador, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraRevisar.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.aceitarEntrega projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraRevisar.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.aceitarEntrega projects Tarefa.criador, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.devolvidas.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.aceitarEntrega projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.devolvidas.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.aceitarEntrega projects Tarefa.criador, which is not a field of the ontology."
          }
        ],
        "params": [],
        "rules": [
          "somenteCriadorRevisa",
          "tarefaEncerradaNaoTransiciona"
        ],
        "doc": {
          "raw": "Finalidade: Aceita a entrega de uma tarefa criada pela pessoa, concluindo-a.\nEntrada: id: tarefa em revisão; version: versão lida, para concorrência otimista.\nProcessamento: Recusa se a pessoa da sessão não for o criador (somenteCriadorRevisa), se a tarefa estiver encerrada (tarefaEncerradaNaoTransiciona) ou fora de emRevisao; recusa se a versão divergir. Executa a transição aceitar, registrando concluidaEm; a sala recebe a mensagem. Recalcula resumo e pendências como em carregarInicio.\nSaída: resumo recalculado e esperaPorMim recalculado, sem a tarefa concluída.",
          "purpose": "Aceita a entrega de uma tarefa criada pela pessoa, concluindo-a.",
          "input": "id: tarefa em revisão; version: versão lida, para concorrência otimista.",
          "processing": "Recusa se a pessoa da sessão não for o criador (somenteCriadorRevisa), se a tarefa estiver encerrada (tarefaEncerradaNaoTransiciona) ou fora de emRevisao; recusa se a versão divergir. Executa a transição aceitar, registrando concluidaEm; a sala recebe a mensagem. Recalcula resumo e pendências como em carregarInicio.",
          "output": "resumo recalculado e esperaPorMim recalculado, sem a tarefa concluída."
        }
      },
      {
        "route": "tarefas.inicio_membro.devolverComMotivo",
        "kind": "cmd",
        "uses": [
          "devolver",
          "getLista"
        ],
        "transaction": "single",
        "output": [
          {
            "kind": "list",
            "path": "resumo",
            "entity": "Tarefa",
            "items": "",
            "fields": []
          },
          {
            "kind": "unresolved",
            "path": "resumo.lista",
            "reason": "CONTRACT_UNPARSED: Route tarefas.inicio_membro.devolverComMotivo output resumo.lista nests a relation with no readable interface."
          },
          {
            "kind": "list",
            "path": "esperaPorMim.paraIniciar",
            "entity": "Tarefa",
            "items": "",
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
                "field": "prazo",
                "path": "prazo"
              },
              {
                "field": "prioridade",
                "path": "prioridade"
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
            "kind": "list",
            "path": "esperaPorMim.paraEnviarRevisao",
            "entity": "Tarefa",
            "items": "",
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
                "field": "prazo",
                "path": "prazo"
              },
              {
                "field": "prioridade",
                "path": "prioridade"
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
            "kind": "list",
            "path": "esperaPorMim.paraRevisar",
            "entity": "Tarefa",
            "items": "",
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
                "field": "prazo",
                "path": "prazo"
              },
              {
                "field": "prioridade",
                "path": "prioridade"
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
            "kind": "list",
            "path": "esperaPorMim.devolvidas",
            "entity": "Tarefa",
            "items": "",
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
                "field": "prazo",
                "path": "prazo"
              },
              {
                "field": "prioridade",
                "path": "prioridade"
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
            "kind": "unresolved",
            "path": "resumo.quantidadeAbertas",
            "reason": "Interface ResumoMinhasTarefas pages tarefas; quantidadeAbertas is not one of the paging keys total, page, pageSize, hasMore next to items, so the types do not say what it is."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeVencemHoje",
            "reason": "Interface ResumoMinhasTarefas pages tarefas; quantidadeVencemHoje is not one of the paging keys total, page, pageSize, hasMore next to items, so the types do not say what it is."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeAtrasadas",
            "reason": "Interface ResumoMinhasTarefas pages tarefas; quantidadeAtrasadas is not one of the paging keys total, page, pageSize, hasMore next to items, so the types do not say what it is."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraIniciar.responsavel",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraIniciar.criador",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraEnviarRevisao.responsavel",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraEnviarRevisao.criador",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraRevisar.responsavel",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraRevisar.criador",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.devolvidas.responsavel",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.devolvidas.criador",
            "reason": "Interface MembroRef has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeAbertas",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.devolverComMotivo projects Tarefa.quantidadeAbertas, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeVencemHoje",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.devolverComMotivo projects Tarefa.quantidadeVencemHoje, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeAtrasadas",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.devolverComMotivo projects Tarefa.quantidadeAtrasadas, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.tarefas",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.devolverComMotivo projects Tarefa.tarefas, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraIniciar.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.devolverComMotivo projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraIniciar.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.devolverComMotivo projects Tarefa.criador, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraEnviarRevisao.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.devolverComMotivo projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraEnviarRevisao.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.devolverComMotivo projects Tarefa.criador, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraRevisar.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.devolverComMotivo projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.paraRevisar.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.devolverComMotivo projects Tarefa.criador, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.devolvidas.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.devolverComMotivo projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "esperaPorMim.devolvidas.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.devolverComMotivo projects Tarefa.criador, which is not a field of the ontology."
          }
        ],
        "params": [],
        "rules": [
          "somenteCriadorRevisa",
          "devolucaoExigeMotivo",
          "tarefaEncerradaNaoTransiciona"
        ],
        "doc": {
          "raw": "Finalidade: Devolve para ajuste uma tarefa em revisão criada pela pessoa, registrando o motivo.\nEntrada: id: tarefa em revisão; version: versão lida; details.motivoDevolucao: texto do motivo da devolução.\nProcessamento: Recusa se a pessoa da sessão não for o criador (somenteCriadorRevisa), se o motivo estiver vazio (devolucaoExigeMotivo), se a tarefa estiver encerrada (tarefaEncerradaNaoTransiciona) ou fora de emRevisao; recusa se a versão divergir. Executa a transição devolver gravando motivoDevolucao e devolvidaEm; a tarefa volta para emAndamento com o responsável como quem age e ele é avisado. Recalcula resumo e pendências como em carregarInicio.\nSaída: resumo recalculado e esperaPorMim recalculado, sem a tarefa entre as para revisar.",
          "purpose": "Devolve para ajuste uma tarefa em revisão criada pela pessoa, registrando o motivo.",
          "input": "id: tarefa em revisão; version: versão lida; details.motivoDevolucao: texto do motivo da devolução.",
          "processing": "Recusa se a pessoa da sessão não for o criador (somenteCriadorRevisa), se o motivo estiver vazio (devolucaoExigeMotivo), se a tarefa estiver encerrada (tarefaEncerradaNaoTransiciona) ou fora de emRevisao; recusa se a versão divergir. Executa a transição devolver gravando motivoDevolucao e devolvidaEm; a tarefa volta para emAndamento com o responsável como quem age e ele é avisado. Recalcula resumo e pendências como em carregarInicio.",
          "output": "resumo recalculado e esperaPorMim recalculado, sem a tarefa entre as para revisar."
        }
      }
    ]
  }
} as const;

export default definition;

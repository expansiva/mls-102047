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
    "_102047_/l1/tarefas/layer_2_application/usecases/listAvisoVencimento.defs.ts",
    "_102047_/l1/tarefas/layer_2_application/usecases/listTarefa.defs.ts"
  ],
  "data": {
    "pageId": "inicio_membro",
    "requests": [
      {
        "route": "tarefas.inicio_membro.qryInicioMembro",
        "kind": "qry",
        "uses": [
          "listTarefa",
          "getLista",
          "getAvisoVencimento",
          "listAvisoVencimento"
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
            "reason": "CONTRACT_UNPARSED: Route tarefas.inicio_membro.qryInicioMembro output resumo.lista nests a relation with no readable interface."
          },
          {
            "kind": "entity",
            "path": "avisoHoje",
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
            "path": "avisoHoje.details.tarefas",
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
            "kind": "list",
            "path": "pendencias",
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
            "kind": "computed",
            "path": "pendencias.acaoEsperada",
            "entity": "Tarefa",
            "rules": [
              "avisoUnicoPorResponsavelEDia",
              "avisoSomenteTarefasAbertasVencendo",
              "somenteResponsavelExecuta",
              "somenteCriadorRevisa"
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
            "path": "avisoHoje.details.tarefas",
            "reason": "AvisoVencimento inside AvisoVencimento needs one L4 relationship between them; found 0."
          },
          {
            "kind": "unresolved",
            "path": "pendencias.responsavel",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "pendencias.criador",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeAbertas",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.qryInicioMembro projects Tarefa.quantidadeAbertas, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeVencemHoje",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.qryInicioMembro projects Tarefa.quantidadeVencemHoje, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeAtrasadas",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.qryInicioMembro projects Tarefa.quantidadeAtrasadas, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.tarefas",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.qryInicioMembro projects Tarefa.tarefas, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "pendencias.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.qryInicioMembro projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "pendencias.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.qryInicioMembro projects Tarefa.criador, which is not a field of the ontology."
          }
        ],
        "params": [],
        "rules": [
          "avisoUnicoPorResponsavelEDia",
          "avisoSomenteTarefasAbertasVencendo",
          "somenteResponsavelExecuta",
          "somenteCriadorRevisa"
        ],
        "doc": {
          "raw": "Finalidade: Carrega de uma vez tudo o que a tela inicial do membro mostra ao abrir: o panorama das suas tarefas abertas, o aviso diário de hoje e a caixa do que espera por uma ação dele.\nEntrada: Sem parâmetros: o membro é resolvido pela sessão e a data de hoje pelo servidor.\nProcessamento: Resumo: filtra as tarefas cujo responsável é o membro da sessão e que estão abertas (details.aberta, calculado: aFazer, emAndamento ou emRevisao); conta no servidor o total de abertas, as que vencem hoje (details.venceHoje) e as atrasadas (details.atrasada); lista essas tarefas ordenadas por prazo, com o nome da lista e o progresso da checklist (details.progressoChecklist, calculado pela contagem de itens feitos sobre o total). Campos derivados são calculados, nunca gravados. Aviso: lê o aviso do membro com dataReferencia igual a hoje; pela regra avisoUnicoPorResponsavelEDia há no máximo um; ele traz apenas tarefas abertas que vencem hoje ou estão atrasadas (avisoSomenteTarefasAbertasVencendo); se o processo das 8h ainda não gerou, volta vazio. Pendências: junta as tarefas em que o membro é responsável e está em aFazer (acaoEsperada ’iniciar’) ou emAndamento (acaoEsperada ’enviarParaRevisao’, ou ’ajustar’ quando há devolvidaEm), conforme somenteResponsavelExecuta, e as tarefas que ele criou em emRevisao (acaoEsperada ’revisar’), conforme somenteCriadorRevisa; inclui motivo e data da devolução, nomes do responsável e do criador lidos do cadastro mestre, e a versão para os comandos; ordena por prazo e prioridade.\nSaída: resumo com os três indicadores já calculados e as tarefas abertas; avisoHoje com data, situação, contagens e tarefas do aviso (opcional); pendencias com cada tarefa e a ação esperada, para a página exibir a ação certa em cada item.",
          "purpose": "Carrega de uma vez tudo o que a tela inicial do membro mostra ao abrir: o panorama das suas tarefas abertas, o aviso diário de hoje e a caixa do que espera por uma ação dele.",
          "input": "Sem parâmetros: o membro é resolvido pela sessão e a data de hoje pelo servidor.",
          "processing": "Resumo: filtra as tarefas cujo responsável é o membro da sessão e que estão abertas (details.aberta, calculado: aFazer, emAndamento ou emRevisao); conta no servidor o total de abertas, as que vencem hoje (details.venceHoje) e as atrasadas (details.atrasada); lista essas tarefas ordenadas por prazo, com o nome da lista e o progresso da checklist (details.progressoChecklist, calculado pela contagem de itens feitos sobre o total). Campos derivados são calculados, nunca gravados. Aviso: lê o aviso do membro com dataReferencia igual a hoje; pela regra avisoUnicoPorResponsavelEDia há no máximo um; ele traz apenas tarefas abertas que vencem hoje ou estão atrasadas (avisoSomenteTarefasAbertasVencendo); se o processo das 8h ainda não gerou, volta vazio. Pendências: junta as tarefas em que o membro é responsável e está em aFazer (acaoEsperada ’iniciar’) ou emAndamento (acaoEsperada ’enviarParaRevisao’, ou ’ajustar’ quando há devolvidaEm), conforme somenteResponsavelExecuta, e as tarefas que ele criou em emRevisao (acaoEsperada ’revisar’), conforme somenteCriadorRevisa; inclui motivo e data da devolução, nomes do responsável e do criador lidos do cadastro mestre, e a versão para os comandos; ordena por prazo e prioridade.",
          "output": "resumo com os três indicadores já calculados e as tarefas abertas; avisoHoje com data, situação, contagens e tarefas do aviso (opcional); pendencias com cada tarefa e a ação esperada, para a página exibir a ação certa em cada item."
        }
      },
      {
        "route": "tarefas.inicio_membro.cmdIniciarTarefa",
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
            "reason": "CONTRACT_UNPARSED: Route tarefas.inicio_membro.cmdIniciarTarefa output resumo.lista nests a relation with no readable interface."
          },
          {
            "kind": "list",
            "path": "pendencias",
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
            "kind": "computed",
            "path": "pendencias.acaoEsperada",
            "entity": "Tarefa",
            "rules": [
              "somenteResponsavelExecuta",
              "tarefaEncerradaNaoTransiciona"
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
            "path": "pendencias.responsavel",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "pendencias.criador",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeAbertas",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.cmdIniciarTarefa projects Tarefa.quantidadeAbertas, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeVencemHoje",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.cmdIniciarTarefa projects Tarefa.quantidadeVencemHoje, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeAtrasadas",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.cmdIniciarTarefa projects Tarefa.quantidadeAtrasadas, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.tarefas",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.cmdIniciarTarefa projects Tarefa.tarefas, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "pendencias.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.cmdIniciarTarefa projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "pendencias.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.cmdIniciarTarefa projects Tarefa.criador, which is not a field of the ontology."
          }
        ],
        "params": [],
        "rules": [
          "somenteResponsavelExecuta",
          "tarefaEncerradaNaoTransiciona"
        ],
        "doc": {
          "raw": "Finalidade: Inicia uma tarefa atribuída ao membro, passando-a de a fazer para em andamento.\nEntrada: tarefaId: tarefa a iniciar; version: versão lida, para controle de concorrência.\nProcessamento: Aplica a transição iniciar (aFazer → emAndamento). Recusa se o membro da sessão não for o responsável (somenteResponsavelExecuta) e se a tarefa estiver concluída ou cancelada (tarefaEncerradaNaoTransiciona); recusa se a versão estiver desatualizada. A sala de discussão recebe a mensagem da mudança. Depois recompõe o resumo e as pendências como em qryInicioMembro.\nSaída: resumo e pendencias atualizados, para a página redesenhar o panorama e a caixa sem nova chamada (a tarefa passa a esperar o envio para revisão).",
          "purpose": "Inicia uma tarefa atribuída ao membro, passando-a de a fazer para em andamento.",
          "input": "tarefaId: tarefa a iniciar; version: versão lida, para controle de concorrência.",
          "processing": "Aplica a transição iniciar (aFazer → emAndamento). Recusa se o membro da sessão não for o responsável (somenteResponsavelExecuta) e se a tarefa estiver concluída ou cancelada (tarefaEncerradaNaoTransiciona); recusa se a versão estiver desatualizada. A sala de discussão recebe a mensagem da mudança. Depois recompõe o resumo e as pendências como em qryInicioMembro.",
          "output": "resumo e pendencias atualizados, para a página redesenhar o panorama e a caixa sem nova chamada (a tarefa passa a esperar o envio para revisão)."
        }
      },
      {
        "route": "tarefas.inicio_membro.cmdEnviarParaRevisao",
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
            "reason": "CONTRACT_UNPARSED: Route tarefas.inicio_membro.cmdEnviarParaRevisao output resumo.lista nests a relation with no readable interface."
          },
          {
            "kind": "list",
            "path": "pendencias",
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
            "kind": "computed",
            "path": "pendencias.acaoEsperada",
            "entity": "Tarefa",
            "rules": [
              "somenteResponsavelExecuta",
              "tarefaEncerradaNaoTransiciona"
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
            "path": "pendencias.responsavel",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "pendencias.criador",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeAbertas",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.cmdEnviarParaRevisao projects Tarefa.quantidadeAbertas, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeVencemHoje",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.cmdEnviarParaRevisao projects Tarefa.quantidadeVencemHoje, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeAtrasadas",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.cmdEnviarParaRevisao projects Tarefa.quantidadeAtrasadas, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.tarefas",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.cmdEnviarParaRevisao projects Tarefa.tarefas, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "pendencias.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.cmdEnviarParaRevisao projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "pendencias.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.cmdEnviarParaRevisao projects Tarefa.criador, which is not a field of the ontology."
          }
        ],
        "params": [],
        "rules": [
          "somenteResponsavelExecuta",
          "tarefaEncerradaNaoTransiciona"
        ],
        "doc": {
          "raw": "Finalidade: Envia para revisão do criador uma tarefa em andamento do membro, inclusive uma tarefa devolvida já ajustada.\nEntrada: tarefaId: tarefa a enviar; version: versão lida, para controle de concorrência.\nProcessamento: Aplica a transição enviarParaRevisao (emAndamento → emRevisao). Recusa se o membro da sessão não for o responsável (somenteResponsavelExecuta) ou se a tarefa estiver encerrada (tarefaEncerradaNaoTransiciona); recusa versão desatualizada. O criador passa a ser quem age agora e é avisado. Recompõe resumo e pendências.\nSaída: resumo e pendencias atualizados; a tarefa sai da caixa do membro, salvo se ele também for o criador, quando aparece para revisar.",
          "purpose": "Envia para revisão do criador uma tarefa em andamento do membro, inclusive uma tarefa devolvida já ajustada.",
          "input": "tarefaId: tarefa a enviar; version: versão lida, para controle de concorrência.",
          "processing": "Aplica a transição enviarParaRevisao (emAndamento → emRevisao). Recusa se o membro da sessão não for o responsável (somenteResponsavelExecuta) ou se a tarefa estiver encerrada (tarefaEncerradaNaoTransiciona); recusa versão desatualizada. O criador passa a ser quem age agora e é avisado. Recompõe resumo e pendências.",
          "output": "resumo e pendencias atualizados; a tarefa sai da caixa do membro, salvo se ele também for o criador, quando aparece para revisar."
        }
      },
      {
        "route": "tarefas.inicio_membro.cmdAceitarEntrega",
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
            "reason": "CONTRACT_UNPARSED: Route tarefas.inicio_membro.cmdAceitarEntrega output resumo.lista nests a relation with no readable interface."
          },
          {
            "kind": "list",
            "path": "pendencias",
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
            "kind": "computed",
            "path": "pendencias.acaoEsperada",
            "entity": "Tarefa",
            "rules": [
              "somenteCriadorRevisa",
              "tarefaEncerradaNaoTransiciona"
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
            "path": "pendencias.responsavel",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "pendencias.criador",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeAbertas",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.cmdAceitarEntrega projects Tarefa.quantidadeAbertas, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeVencemHoje",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.cmdAceitarEntrega projects Tarefa.quantidadeVencemHoje, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeAtrasadas",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.cmdAceitarEntrega projects Tarefa.quantidadeAtrasadas, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.tarefas",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.cmdAceitarEntrega projects Tarefa.tarefas, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "pendencias.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.cmdAceitarEntrega projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "pendencias.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.cmdAceitarEntrega projects Tarefa.criador, which is not a field of the ontology."
          }
        ],
        "params": [],
        "rules": [
          "somenteCriadorRevisa",
          "tarefaEncerradaNaoTransiciona"
        ],
        "doc": {
          "raw": "Finalidade: Aceita a entrega de uma tarefa criada pelo membro e que está em revisão, concluindo-a.\nEntrada: tarefaId: tarefa a aceitar; version: versão lida, para controle de concorrência.\nProcessamento: Aplica a transição aceitar (emRevisao → concluida), registrando concluidaEm. Recusa se o membro da sessão não for o criador (somenteCriadorRevisa) ou se a tarefa já estiver encerrada (tarefaEncerradaNaoTransiciona); recusa versão desatualizada. A sala recebe a mensagem. Recompõe resumo e pendências.\nSaída: resumo e pendencias atualizados; a tarefa concluída sai da caixa e das abertas.",
          "purpose": "Aceita a entrega de uma tarefa criada pelo membro e que está em revisão, concluindo-a.",
          "input": "tarefaId: tarefa a aceitar; version: versão lida, para controle de concorrência.",
          "processing": "Aplica a transição aceitar (emRevisao → concluida), registrando concluidaEm. Recusa se o membro da sessão não for o criador (somenteCriadorRevisa) ou se a tarefa já estiver encerrada (tarefaEncerradaNaoTransiciona); recusa versão desatualizada. A sala recebe a mensagem. Recompõe resumo e pendências.",
          "output": "resumo e pendencias atualizados; a tarefa concluída sai da caixa e das abertas."
        }
      },
      {
        "route": "tarefas.inicio_membro.cmdDevolverComMotivo",
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
            "reason": "CONTRACT_UNPARSED: Route tarefas.inicio_membro.cmdDevolverComMotivo output resumo.lista nests a relation with no readable interface."
          },
          {
            "kind": "list",
            "path": "pendencias",
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
            "kind": "computed",
            "path": "pendencias.acaoEsperada",
            "entity": "Tarefa",
            "rules": [
              "somenteCriadorRevisa",
              "devolucaoExigeMotivo",
              "tarefaEncerradaNaoTransiciona"
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
            "path": "pendencias.responsavel",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "pendencias.criador",
            "reason": "Interface MembroNome has no field that is not readonly, so no entity owns it."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeAbertas",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.cmdDevolverComMotivo projects Tarefa.quantidadeAbertas, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeVencemHoje",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.cmdDevolverComMotivo projects Tarefa.quantidadeVencemHoje, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.quantidadeAtrasadas",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.cmdDevolverComMotivo projects Tarefa.quantidadeAtrasadas, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "resumo.tarefas",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.cmdDevolverComMotivo projects Tarefa.tarefas, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "pendencias.responsavel",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.cmdDevolverComMotivo projects Tarefa.responsavel, which is not a field of the ontology."
          },
          {
            "kind": "unresolved",
            "path": "pendencias.criador",
            "reason": "PROJECTION_FIELD_UNKNOWN: Route tarefas.inicio_membro.cmdDevolverComMotivo projects Tarefa.criador, which is not a field of the ontology."
          }
        ],
        "params": [],
        "rules": [
          "somenteCriadorRevisa",
          "devolucaoExigeMotivo",
          "tarefaEncerradaNaoTransiciona"
        ],
        "doc": {
          "raw": "Finalidade: Devolve para ajuste, com o motivo, uma tarefa criada pelo membro que está em revisão.\nEntrada: tarefaId: tarefa a devolver; version: versão lida; motivoDevolucao: texto do motivo, obrigatório.\nProcessamento: Aplica a transição devolver (emRevisao → emAndamento). Recusa se o membro da sessão não for o criador (somenteCriadorRevisa), se o motivo estiver vazio (devolucaoExigeMotivo) ou se a tarefa estiver encerrada (tarefaEncerradaNaoTransiciona); recusa versão desatualizada. Grava o motivo e devolvidaEm na tarefa; o responsável volta a ser quem age agora e é avisado. Recompõe resumo e pendências.\nSaída: resumo e pendencias atualizados; a tarefa sai da revisão do membro, salvo se ele também for o responsável, quando aparece para ajustar.",
          "purpose": "Devolve para ajuste, com o motivo, uma tarefa criada pelo membro que está em revisão.",
          "input": "tarefaId: tarefa a devolver; version: versão lida; motivoDevolucao: texto do motivo, obrigatório.",
          "processing": "Aplica a transição devolver (emRevisao → emAndamento). Recusa se o membro da sessão não for o criador (somenteCriadorRevisa), se o motivo estiver vazio (devolucaoExigeMotivo) ou se a tarefa estiver encerrada (tarefaEncerradaNaoTransiciona); recusa versão desatualizada. Grava o motivo e devolvidaEm na tarefa; o responsável volta a ser quem age agora e é avisado. Recompõe resumo e pendências.",
          "output": "resumo e pendencias atualizados; a tarefa sai da revisão do membro, salvo se ele também for o responsável, quando aparece para ajustar."
        }
      }
    ]
  }
} as const;

export default definition;

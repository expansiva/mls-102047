export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Apresenta somente as consultas do dia vinculadas ao profissional autenticado, com informações disponíveis da consulta para localizar o horário e escolher uma consulta para conferência. Comunica carregamento enquanto a agenda é consultada, estado vazio quando não houver consultas retornadas e erro de consulta com orientação clara para tentar novamente. A lista deve ser navegável por teclado, anunciar seus estados a tecnologias assistivas e expor nomes compreensíveis para cada consulta.",
    "contentRef": "base",
    "capabilityRefs": [
      "listConsulta"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "A consulta retorna uma coleção de consultas e este candidato favorece leitura escaneável dos registros."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "O status de consulta possui estado de carregamento de duração não definida."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-notify-banner"
        ],
        "reason": "O estado de erro da consulta precisa ser comunicado de forma perceptível e acessível."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Permite conferir os dados disponíveis da consulta escolhida, especialmente paciente e horário, antes do registro do atendimento. Mantém a leitura restrita às consultas retornadas para o próprio profissional. Enquanto a agenda ainda estiver sendo obtida, informa que os dados não estão prontos; se não houver consulta disponível ou ocorrer erro na consulta, evita apresentar detalhes como confirmados e comunica a condição. O conteúdo deve ter rótulos claros e poder ser percorrido por teclado e leitor de tela.",
    "contentRef": "base",
    "capabilityRefs": [
      "listConsulta"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewCard",
        "candidates": [
          "groupviewcard--ml-view-card-horizontal"
        ],
        "reason": "É compatível com a apresentação concentrada dos dados disponíveis de uma consulta para conferência."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Coleta os dados para registrar o atendimento da consulta selecionada: o campo obrigatório de detalhes e a anotação de atendimento opcional. Impede o envio sem a identificação da consulta selecionada e sem os detalhes obrigatórios, explicando os erros junto aos campos. Durante o envio, informa que o registro está em processamento; em caso de falha, comunica o erro sem descartar o que foi digitado; após sucesso, confirma que a consulta foi registrada como atendida. Campos, obrigatoriedade e mensagens devem ser associados de modo acessível e operáveis por teclado.",
    "contentRef": "registrarAtendimento",
    "capabilityRefs": [
      "setRegistrarAtendimentoDetails",
      "setRegistrarAtendimentoDetailsAttendanceNote",
      "registrarAtendimento"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupEnterText",
        "candidates": [
          "groupentertext--ml-multiline-text"
        ],
        "reason": "Os detalhes e a anotação são entradas textuais de atendimento que podem exigir texto livre extenso."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "O comando possui estados de erro e sucesso que exigem retorno contextual ao preenchimento."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "O comando de registro expõe um estado de carregamento sem progresso mensurável."
      }
    ]
  },
  {
    "organismId": "organism.actions.1",
    "kind": "actions",
    "description": "Oferece a ação para marcar a consulta selecionada como atendida, usando a identificação definida para o registro e os dados preenchidos no formulário. A ação permanece indisponível até que a consulta esteja selecionada e os dados obrigatórios possam ser enviados. Durante o processamento, evita reenvio e anuncia o andamento; em falha, apresenta o erro e permite nova tentativa; em sucesso, comunica a conclusão e a agenda é atualizada. O comando deve ter rótulo explícito, estado desabilitado compreensível e suporte a teclado e leitor de tela.",
    "contentRef": "registrarAtendimento",
    "capabilityRefs": [
      "setRegistrarAtendimentoId",
      "registrarAtendimento"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "Há um comando principal explícito para registrar o atendimento."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-toast-notification"
        ],
        "reason": "O resultado de sucesso ou erro do comando deve ser comunicado ao profissional."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "O status do comando informa processamento em andamento."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "consultas_profissional__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/desktop/page11/consultas_profissional.defs.ts",
    "outputPath": "l2/agendaClinica/web/desktop/page11/consultas_profissional.ts",
    "dependsFiles": [
      "l2/agendaClinica/web/shared/consultas_profissional.ts"
    ],
    "dependsOn": [
      "consultas_profissional__l2_shared"
    ],
    "categoryRef": "calendarScheduling",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/calendarScheduling.md",
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
      "_102040_/l2/molecules/groupshowprogress/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupShowProgress/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts",
      "_102040_/l2/molecules/groupviewcard/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewCard/usage.ts",
      "_102040_/l2/molecules/groupentertext/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterText/usage.ts",
      "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts"
    ]
  }
] as const;

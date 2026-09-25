export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Apresenta as consultas do dia vinculadas ao profissional autenticado para que ele localize sua própria agenda. Mostra carregamento enquanto a consulta é obtida, informa quando não houver consultas e comunica falhas ao carregar, com alternativa acessível para tentar novamente. Os resultados devem ser navegáveis por teclado e expor horário, paciente e situação de cada consulta de forma compreensível.",
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
        "reason": "A capacidade de consulta retorna uma coleção de consultas que precisa ser percorrida e identificada rapidamente."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-notify-banner"
        ],
        "reason": "A consulta possui estados de erro que devem ser comunicados com clareza e com possibilidade de nova tentativa."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Permite consultar os dados disponíveis da consulta própria selecionada, incluindo paciente e horário, antes do registro do atendimento. Enquanto os dados da agenda estiverem sendo carregados, informa esse estado; se não houver consulta selecionada ou dados disponíveis, explica a situação; se ocorrer falha na consulta, comunica o erro de modo acessível. As informações devem ter rótulos claros e permanecer legíveis por tecnologias assistivas.",
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
        "reason": "A capacidade de consulta fornece os dados de uma consulta individual que precisam ser inspecionados com contexto e boa leitura."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Coleta os dados obrigatórios para registrar o atendimento da consulta selecionada e permite incluir a anotação do atendimento quando necessária. Identifica campos obrigatórios, associa rótulos e mensagens de validação aos respectivos campos e preserva o que foi informado se o envio falhar. Durante o registro, informa processamento; em caso de erro, apresenta retorno acessível para correção e nova tentativa.",
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
          "groupentertext--ml-enter-text",
          "groupentertext--ml-multiline-text"
        ],
        "reason": "Há entrada editável para os dados do atendimento e para uma anotação opcional, que pode exigir texto mais extenso."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "O comando possui estados de erro e requer feedback associado ao preenchimento e ao envio."
      }
    ]
  },
  {
    "organismId": "organism.actions.1",
    "kind": "actions",
    "description": "Disponibiliza a ação para marcar a consulta selecionada como atendida após o preenchimento dos dados obrigatórios. A ação deve indicar claramente quando estiver indisponível por falta da consulta selecionada ou de dados necessários, anunciar o processamento e confirmar ou comunicar a falha do registro. Deve poder ser acionada por teclado e ter nome acessível que expresse o resultado da ação.",
    "contentRef": "registrarAtendimento",
    "capabilityRefs": [
      "registrarAtendimento"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "O comando registra o atendimento e precisa de um disparador com rótulo visível e estado de processamento."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-toast-notification",
          "groupnotifyuser--ml-alert-modal"
        ],
        "reason": "O comando tem resultados de sucesso e erro que precisam ser comunicados ao profissional."
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
      "l2/agendaClinica/web/shared/consultas_profissional.ts",
      "l2/designSystem.ts"
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

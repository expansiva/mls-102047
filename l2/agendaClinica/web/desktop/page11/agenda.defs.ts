export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Apresenta as consultas do dia atribuídas ao próprio profissional, permitindo acompanhar a agenda e acessar os dados disponíveis de cada consulta. Enquanto a consulta é carregada, comunica o carregamento; se não houver consultas, informa claramente a ausência de resultados; em caso de falha, comunica o erro da consulta de agenda. Os itens devem expor informações textuais compreensíveis e estados perceptíveis também por tecnologias assistivas.",
    "contentRef": "base",
    "capabilityRefs": [
      "listConsulta"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-calendar-view",
          "groupviewdata--ml-timeline-view"
        ],
        "reason": "A consulta retorna uma coleção de consultas do dia, adequada para uma visualização orientada por horário."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Mostra, para uma consulta disponível na agenda, o horário e o paciente para que o profissional confira os dados antes de registrar o atendimento. Mantém os textos de identificação e horário legíveis e acessíveis; durante a consulta dos dados, comunica carregamento, e a indisponibilidade dos dados segue o estado vazio ou de erro da agenda.",
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
        "reason": "Os dados de uma consulta podem ser apresentados como uma unidade de informação com horário e paciente em destaque."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Com uma consulta própria selecionada, permite marcar o atendimento como realizado e registrar os dados obrigatórios do atendimento, incluindo a anotação quando informada. Impede o envio enquanto os dados obrigatórios não estiverem preenchidos, informa que o envio está em andamento e comunica sucesso ou erro do registro. Os campos possuem rótulos e indicação de obrigatoriedade, mensagens de validação e de erro associadas aos respectivos campos, e o comando pode ser acionado por teclado.",
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
        "reason": "A anotação do atendimento é uma entrada textual que pode exigir mais de uma linha."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "O comando de registrar atendimento precisa de uma ação explícita de envio."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "O registro expõe estados de sucesso e erro que precisam de retorno acessível ao profissional."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "O comando possui estado de carregamento sem duração conhecida."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "agenda__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/desktop/page11/agenda.defs.ts",
    "outputPath": "l2/agendaClinica/web/desktop/page11/agenda.ts",
    "dependsFiles": [
      "l2/agendaClinica/web/shared/agenda.ts",
      "l2/designSystem.ts"
    ],
    "dependsOn": [
      "agenda__l2_shared"
    ],
    "categoryRef": "calendarScheduling",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/calendarScheduling.md",
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
      "_102040_/l2/molecules/groupviewcard/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewCard/usage.ts",
      "_102040_/l2/molecules/groupentertext/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterText/usage.ts",
      "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts",
      "_102040_/l2/molecules/groupshowprogress/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupShowProgress/usage.ts"
    ]
  }
] as const;

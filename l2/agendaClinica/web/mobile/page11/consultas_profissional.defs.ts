export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Prioriza a leitura rápida das consultas do dia do próprio profissional, com cada consulta identificável por horário, paciente e situação. Enquanto a agenda carrega, informa o progresso; quando não há consultas, explica o estado vazio; em falhas, comunica o erro e oferece uma forma acessível de tentar novamente. Os itens devem ter áreas de toque claras e também funcionar com tecnologias assistivas.",
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
        "reason": "A capacidade de consulta retorna uma coleção de consultas e uma lista escaneável preserva a prioridade de leitura em espaço reduzido."
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
    "description": "Exibe os dados da consulta própria escolhida, com prioridade para paciente e horário, para conferência antes de registrar o atendimento. Comunica carregamento, ausência de dados selecionados e falhas de consulta sem ocultar informações importantes. A leitura deve ser sequencial, com rótulos claros, foco perceptível e suporte a leitor de tela.",
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
    "description": "Permite preencher os dados obrigatórios do atendimento e incluir uma anotação opcional, com prioridade para a entrada de texto no espaço reduzido. Rótulos, obrigatoriedade e erros devem ser anunciados de forma associada aos campos; os dados informados permanecem disponíveis se o registro falhar. Durante o envio, informa processamento e, ao término, comunica sucesso ou erro de modo acessível ao toque e a tecnologias assistivas.",
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
    "description": "Oferece a ação de marcar a consulta como atendida depois que os dados necessários estiverem preenchidos. O controle deve ter alvo de toque adequado, nome acessível e estado claro de indisponibilidade quando faltar consulta selecionada ou dados obrigatórios. Durante o registro, anuncia o processamento; ao finalizar, comunica confirmação ou erro e permite nova tentativa quando aplicável.",
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
    "id": "consultas_profissional__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/mobile/page11/consultas_profissional.defs.ts",
    "outputPath": "l2/agendaClinica/web/mobile/page11/consultas_profissional.ts",
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

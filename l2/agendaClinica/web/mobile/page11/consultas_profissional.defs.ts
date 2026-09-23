export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Prioriza a leitura rápida das próprias consultas do dia, mostrando horário e situação de cada consulta para que o profissional toque em uma delas e confira seus dados. Informa carregamento, resultado vazio e erro de consulta sem depender apenas de cor. Os itens devem ter alvos de toque claros, rótulos acessíveis e também permitir navegação por leitor de tela e teclado quando disponíveis.",
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
        "reason": "A lista vertical favorece a leitura e a seleção de registros em espaço reduzido."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Mostra primeiro os dados essenciais da consulta selecionada, incluindo o paciente e o horário disponíveis, para conferência antes do atendimento. O estado de carregamento, a inexistência de consulta e a falha de consulta devem ser anunciados claramente. Rótulos e valores permanecem acessíveis e em ordem de leitura consistente em telas pequenas.",
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
        "reason": "Uma unidade compacta de dados da consulta preserva a leitura dos metadados em espaço limitado."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Permite registrar, por toque, os detalhes obrigatórios e a anotação opcional do atendimento, dando prioridade ao campo obrigatório. Cada campo deve ter rótulo associado, indicação acessível de obrigatoriedade e erro vinculado ao campo. Durante o envio, mantém o contexto; em sucesso ou erro, comunica o resultado sem perder o texto digitado em caso de falha.",
    "contentRef": "registrarAtendimento",
    "capabilityRefs": [
      "setRegistrarAtendimentoDetails",
      "setRegistrarAtendimentoDetailsAttendanceNote"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupEnterText",
        "candidates": [
          "groupentertext--ml-multiline-text"
        ],
        "reason": "A entrada de detalhes e anotação exige texto livre e edição confortável em toque."
      }
    ]
  },
  {
    "organismId": "organism.actions.1",
    "kind": "actions",
    "description": "Oferece uma ação de toque claramente identificada para marcar a consulta como atendida quando os detalhes obrigatórios estiverem disponíveis. Informa estado indisponível, envio, sucesso e erro de forma textual e acessível; após sucesso, atualiza a agenda. O controle mantém nome acessível e alvo de toque adequado.",
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
        "reason": "O comando de registrar atendimento requer uma confirmação explícita e identificável."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "O retorno de envio, sucesso ou erro do comando deve permanecer contextual no fluxo móvel."
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
      "_102040_/l2/molecules/groupviewcard/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewCard/usage.ts",
      "_102040_/l2/molecules/groupentertext/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterText/usage.ts",
      "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts"
    ]
  }
] as const;

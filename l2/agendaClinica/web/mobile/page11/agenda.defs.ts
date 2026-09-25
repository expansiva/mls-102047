export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Prioriza a leitura das consultas do dia do próprio profissional, com horário e informações essenciais fáceis de percorrer por toque e leitor de tela. Comunica o carregamento da agenda, a ausência de consultas e erros de consulta sem depender apenas de sinais visuais. A consulta continua disponível para atualização conforme a capacidade da agenda.",
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
        "reason": "Uma lista vertical facilita a leitura e o toque em uma coleção de consultas em espaço reduzido."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Exibe o horário e o paciente da consulta selecionada com prioridade de leitura para conferência antes do atendimento. Os dados permanecem acessíveis por texto e tecnologia assistiva; o carregamento, a ausência de dados e erros da consulta são comunicados pelos estados da agenda.",
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
        "reason": "A apresentação compacta de uma consulta favorece a conferência de horário e paciente em telas estreitas."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Após haver uma consulta própria selecionada, permite registrar o atendimento e a anotação com foco nos campos obrigatórios e em uma ação de envio fácil de acionar por toque ou teclado. Mantém rótulos, obrigatoriedade e erros associados aos campos; anuncia carregamento, confirmação ou falha do registro para leitor de tela e preserva a possibilidade de corrigir os dados após erro.",
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
        "reason": "A anotação do atendimento requer entrada textual com espaço para conteúdo de várias linhas."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "O registro do atendimento requer um comando explícito e acessível."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "Os estados de sucesso e erro do comando devem ficar próximos à interação em uma tela estreita."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "O estado de carregamento do comando deve ser perceptível durante o envio."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "agenda__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/mobile/page11/agenda.defs.ts",
    "outputPath": "l2/agendaClinica/web/mobile/page11/agenda.ts",
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

export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Permite à recepcionista consultar e localizar consultas pelos critérios declarados de identificador, paciente, profissional, data e horário ou situação, priorizando em espaço reduzido os dados necessários para reconhecer cada consulta. A pessoa pode ajustar critérios e página por toque ou teclado e executar a consulta. Informa carregamento, ausência de resultados e erro de modo acessível, com rótulos claros, foco perceptível e anúncios de estado.",
    "contentRef": "base",
    "capabilityRefs": [
      "listConsulta",
      "setListConsultaId",
      "setListConsultaPacienteId",
      "setListConsultaProfissionalId",
      "setListConsultaScheduledAt",
      "setListConsultaStatus",
      "setListConsultaPage"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "Uma lista de registros empilhados favorece a leitura de consultas em tela estreita."
      },
      {
        "groupId": "groupEnterDatetime",
        "candidates": [
          "groupenterdatetime--ml-datetime-picker"
        ],
        "reason": "O critério scheduledAt permite informar data e horário para localizar consultas."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Mostra a consulta localizada com paciente, profissional, data, horário e telefone de contato, priorizando identificação e horário para leitura móvel. O conteúdo deve ser navegável por toque, teclado e leitor de tela. Comunica carregamento, ausência de consulta e erro, permitindo que a recepcionista volte a consultar os registros.",
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
        "reason": "É compatível com uma visualização compacta dos dados principais de uma consulta."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Permite agendar consulta selecionando paciente e profissional e preenchendo data, horário e os demais dados obrigatórios declarados. Em tela móvel, mantém a sequência de preenchimento clara e controles acionáveis por toque, sem retirar a seleção nem o envio. Informa campos obrigatórios, processamento, sucesso com atualização da lista e erro para correção e nova tentativa, com mensagens acessíveis.",
    "contentRef": "createConsulta",
    "capabilityRefs": [
      "listPaciente",
      "listProfissional",
      "setCreateConsultaPacienteId",
      "setCreateConsultaProfissionalId",
      "setCreateConsultaScheduledAt",
      "setCreateConsultaStatus",
      "setCreateConsultaDetails",
      "setCreateConsultaDetailsTelephoneConfirmation",
      "setCreateConsultaDetailsTelephoneConfirmationConfirmedAt",
      "createConsulta"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupSelectOne",
        "candidates": [
          "groupselectone--ml-combobox",
          "groupselectone--ml-select-one-autocomplete"
        ],
        "reason": "Paciente e profissional continuam sendo seleções únicas consultadas pela página."
      },
      {
        "groupId": "groupEnterDatetime",
        "candidates": [
          "groupenterdatetime--ml-datetime-picker"
        ],
        "reason": "ScheduledAt exige seleção acessível de data e horário para o agendamento."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "CreateConsulta é o comando de envio do agendamento."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback",
          "groupnotifyuser--ml-toast-notification"
        ],
        "reason": "Os resultados e falhas do comando precisam de retorno acessível."
      }
    ]
  },
  {
    "organismId": "organism.actions.1",
    "kind": "actions",
    "description": "Oferece, para uma consulta selecionada, a confirmação por telefone e o registro de falta do paciente, com alvos de toque identificáveis e rótulos explícitos. A confirmação atualiza a consulta e a falta altera sua situação. Cada ação informa processamento, resultado ou erro de modo acessível e possibilita nova tentativa; após sucesso, a lista de consultas é atualizada.",
    "contentRef": "updateConsulta",
    "capabilityRefs": [
      "updateConsulta",
      "registrarFalta"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard",
          "grouptriggeraction--ml-kebab-action-trigger"
        ],
        "reason": "As duas operações são comandos contextuais sobre a consulta selecionada e podem ser acionadas por toque."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-toast-notification",
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "UpdateConsulta e registrarFalta expõem estados de processamento e erro que requerem feedback."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "consultas__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/mobile/page11/consultas.defs.ts",
    "outputPath": "l2/agendaClinica/web/mobile/page11/consultas.ts",
    "dependsFiles": [
      "l2/agendaClinica/web/shared/consultas.ts",
      "l2/designSystem.ts"
    ],
    "dependsOn": [
      "consultas__l2_shared"
    ],
    "categoryRef": "calendarScheduling",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/calendarScheduling.md",
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
      "_102040_/l2/molecules/groupenterdatetime/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterDateTime/usage.ts",
      "_102040_/l2/molecules/groupviewcard/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewCard/usage.ts",
      "_102040_/l2/molecules/groupselectone/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupSelectOne/usage.ts",
      "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts"
    ]
  }
] as const;

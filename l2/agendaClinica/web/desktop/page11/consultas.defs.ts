export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Permite à recepcionista consultar as consultas da clínica e localizar registros pelos critérios declarados de identificador, paciente, profissional, data e horário ou situação. A coleção informa carregamento, ausência de resultados e erro; a pessoa pode alterar os critérios e a página da consulta e executar uma nova consulta. Os critérios, resultados e mudanças de estado devem ter rótulos claros, foco visível, operação por teclado e anúncios compreensíveis para tecnologias assistivas.",
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
        "groupId": "groupViewTable",
        "candidates": [
          "groupviewtable--ml-advanced-data-table",
          "groupviewtable--ml-data-table"
        ],
        "reason": "A consulta retorna uma coleção de consultas e declara critérios e paginação."
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
    "description": "Apresenta os dados da consulta localizada, incluindo paciente, profissional, data, horário e telefone de contato indicado no objetivo do organismo. A leitura da consulta selecionada deve ser clara e acessível por teclado e leitor de tela. Enquanto a consulta é obtida, informa carregamento; quando não houver resultado, informa a ausência de consulta; em falha, comunica o erro e permite realizar nova consulta.",
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
        "reason": "É compatível com a apresentação concentrada dos dados de uma consulta localizada."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Permite agendar uma consulta selecionando paciente e profissional, informando data e horário e preenchendo os demais dados obrigatórios declarados para a consulta. As consultas de pacientes e profissionais apoiam as seleções, e o envio requer os campos obrigatórios. Durante o agendamento, comunica processamento e evita envio repetido; em sucesso, informa o agendamento e atualiza a lista; em erro, apresenta a falha de forma acessível para correção e nova tentativa.",
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
        "reason": "Paciente e profissional são escolhas únicas apoiadas por consultas de dados."
      },
      {
        "groupId": "groupEnterDatetime",
        "candidates": [
          "groupenterdatetime--ml-datetime-picker"
        ],
        "reason": "O agendamento exige data e horário em scheduledAt."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "O comando createConsulta envia o agendamento."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback",
          "groupnotifyuser--ml-toast-notification"
        ],
        "reason": "O comando declara estados de sucesso e erro que devem ser comunicados."
      }
    ]
  },
  {
    "organismId": "organism.actions.1",
    "kind": "actions",
    "description": "Disponibiliza, para a consulta selecionada, o registro de confirmação por telefone e o registro de falta do paciente. A confirmação atualiza os dados da consulta, e a falta altera sua situação. Cada comando exige uma consulta selecionada, deve indicar processamento, confirmar o resultado e comunicar erros de modo claro e acessível, preservando a possibilidade de nova tentativa. Após êxito, a lista de consultas é atualizada.",
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
        "reason": "UpdateConsulta e registrarFalta são comandos contextuais sobre a consulta selecionada."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-toast-notification",
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "Os comandos possuem estados de processamento, sucesso e erro que requerem retorno à recepcionista."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "consultas__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/desktop/page11/consultas.defs.ts",
    "outputPath": "l2/agendaClinica/web/desktop/page11/consultas.ts",
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
      "_102040_/l2/molecules/groupviewtable/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewTable/usage.ts",
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

export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Apresenta as consultas da clínica para a recepcionista localizar compromissos e conferir os horários ocupados, com os dados disponíveis de paciente, profissional, data, horário e situação. Permite informar os critérios disponíveis de identificação, paciente, profissional, data, situação e página para consultar os resultados. Durante o carregamento, informa o andamento; se não houver resultados, comunica que não há consultas para os critérios informados; em caso de falha, apresenta o erro da consulta. Os critérios e a seleção de consulta devem ter rótulos compreensíveis e operação por teclado.",
    "contentRef": "base",
    "capabilityRefs": [
      "listConsulta",
      "setListConsultaId",
      "setListConsultaPatientId",
      "setListConsultaProfessionalId",
      "setListConsultaScheduledAt",
      "setListConsultaStatus",
      "setListConsultaPage"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewTable",
        "candidates": [
          "groupviewtable--ml-data-table"
        ],
        "reason": "A consulta retorna uma coleção estruturada de consultas com critérios e página."
      },
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-calendar-view"
        ],
        "reason": "As consultas possuem data e hora de agendamento e podem ser consultadas em contexto de agenda."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Permite conferir a consulta selecionada antes de uma atualização, mostrando os dados disponíveis de paciente, profissional, data, horário e situação. A seleção mantém o contexto da consulta para confirmação por telefone ou registro de falta. Enquanto a consulta é carregada, informa o andamento; quando não houver consulta selecionada, orienta a selecionar uma; se a consulta não puder ser obtida, comunica o erro. A consulta escolhida e suas informações devem ter identificação acessível por teclado e leitor de tela.",
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
        "reason": "A consulta selecionada reúne metadados relevantes em uma unidade de leitura."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Coleta paciente, profissional, data e hora e situação obrigatórios para marcar uma consulta. Permite localizar pacientes e profissionais para escolher seus identificadores e consultar as consultas existentes ao avaliar o horário pretendido. Valida os campos obrigatórios antes de enviar; durante o envio, informa o andamento e, após sucesso ou erro, comunica o resultado, incluindo a indisponibilidade de horário quando ocorrer, mantendo os dados para correção e nova tentativa. Rótulos, instruções, obrigatoriedade e mensagens de erro devem estar associados aos campos e ser utilizáveis por teclado.",
    "contentRef": "createConsulta",
    "capabilityRefs": [
      "listPaciente",
      "listProfissional",
      "listConsulta",
      "setCreateConsultaPatientId",
      "setCreateConsultaProfessionalId",
      "setCreateConsultaScheduledAt",
      "setCreateConsultaStatus",
      "createConsulta"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupSelectOne",
        "candidates": [
          "groupselectone--ml-combobox",
          "groupselectone--ml-select-one-autocomplete"
        ],
        "reason": "Paciente e profissional são escolhas únicas obtidas pelas consultas de localização."
      },
      {
        "groupId": "groupEnterDatetime",
        "candidates": [
          "groupenterdatetime--ml-datetime-picker"
        ],
        "reason": "O agendamento exige data e hora."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "O envio executa o comando de criar consulta."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "A criação expõe estados de andamento, sucesso e erro."
      }
    ]
  },
  {
    "organismId": "organism.actions.1",
    "kind": "actions",
    "description": "Disponibiliza, para a consulta selecionada, os comandos de registrar a confirmação telefônica ou marcar falta do paciente. Cada comando exige uma consulta selecionada; durante a execução, deixa clara a ação em andamento e evita reenvio. Após sucesso, informa a atualização e a listagem de consultas é atualizada; em caso de falha, comunica o erro e permite nova tentativa. As ações devem ter nomes claros, indicar o contexto da consulta selecionada e ter acesso por teclado.",
    "contentRef": "base",
    "capabilityRefs": [
      "confirmarConsulta",
      "registrarFalta"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard",
          "grouptriggeraction--ml-button-group"
        ],
        "reason": "Há dois comandos contextuais para atualizar a situação da consulta selecionada."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "Os comandos expõem estados de execução e erro."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "consultas_recepcionista__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/desktop/page11/consultas_recepcionista.defs.ts",
    "outputPath": "l2/agendaClinica/web/desktop/page11/consultas_recepcionista.ts",
    "dependsFiles": [
      "l2/agendaClinica/web/shared/consultas_recepcionista.ts",
      "l2/designSystem.ts"
    ],
    "dependsOn": [
      "consultas_recepcionista__l2_shared"
    ],
    "categoryRef": "calendarScheduling",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/calendarScheduling.md",
      "_102040_/l2/molecules/groupviewtable/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewTable/usage.ts",
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
      "_102040_/l2/molecules/groupviewcard/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewCard/usage.ts",
      "_102040_/l2/molecules/groupselectone/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupSelectOne/usage.ts",
      "_102040_/l2/molecules/groupenterdatetime/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterDateTime/usage.ts",
      "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts"
    ]
  }
] as const;

export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Apresenta as consultas da clínica e permite consultar a relação conforme os critérios informados, incluindo paciente, profissional, data e horário e situação. Informa carregamento durante a consulta, ausência de resultados quando não houver consultas correspondentes e falha quando a consulta não puder ser concluída. A paginação pode solicitar outra página. Os resultados e controles devem ter rótulos compreensíveis, foco visível e leitura acessível de seus dados e estados.",
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
          "groupviewtable--ml-advanced-data-table",
          "groupviewtable--ml-data-table"
        ],
        "reason": "A consulta retorna uma coleção de consultas que pode ser apresentada para leitura estruturada."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Permite conferir os dados de uma consulta localizada, incluindo paciente, profissional, data e horário, antes de qualquer ação contextual. Se a consulta ainda estiver sendo buscada, informa carregamento; se não houver registro correspondente, comunica a ausência; e, em caso de falha, apresenta o erro da consulta. Os dados devem ser anunciados com identificações claras e permanecer legíveis por teclado e leitor de tela.",
    "contentRef": "base",
    "capabilityRefs": [
      "listConsulta",
      "setListConsultaId"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewCard",
        "candidates": [
          "groupviewcard--ml-view-card-horizontal"
        ],
        "reason": "Os dados de uma consulta podem ser apresentados como uma unidade independente de leitura com seus metadados."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Permite marcar uma consulta selecionando paciente e profissional, informando data e hora e a situação exigida para o registro. A busca de pacientes e profissionais deve informar carregamento, ausência de opções e falha; o envio informa processamento, sucesso ou erro, inclusive quando o horário não estiver disponível. Campos obrigatórios devem ser identificados, erros associados aos respectivos campos e o envio acessível por teclado.",
    "contentRef": "createConsulta",
    "capabilityRefs": [
      "listPaciente",
      "listProfissional",
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
        "reason": "Paciente e profissional são escolhas únicas obtidas pelas consultas disponíveis."
      },
      {
        "groupId": "groupEnterDatetime",
        "candidates": [
          "groupenterdatetime--ml-datetime-picker"
        ],
        "reason": "O agendamento requer informar data e hora."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "O registro da consulta é um comando de envio."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback",
          "groupnotifyuser--ml-toast-notification"
        ],
        "reason": "O formulário precisa comunicar validação, sucesso e falha do agendamento."
      }
    ]
  },
  {
    "organismId": "organism.actions.1",
    "kind": "actions",
    "description": "Disponibiliza as ações para confirmar por telefone uma consulta selecionada ou registrar a falta do paciente na consulta selecionada. Cada ação exige uma consulta identificada e informa processamento, conclusão ou erro; após sucesso, a relação de consultas é atualizada. Os comandos devem expor rótulos explícitos, estado desabilitado enquanto processam e mensagens de resultado acessíveis.",
    "contentRef": "base",
    "capabilityRefs": [
      "setConfirmarConsultaId",
      "confirmarConsulta",
      "setRegistrarFaltaId",
      "registrarFalta",
      "listConsulta"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard",
          "grouptriggeraction--ml-button-group"
        ],
        "reason": "Confirmar e registrar falta são comandos contextuais sobre a consulta selecionada."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-toast-notification",
          "groupnotifyuser--ml-alert-modal"
        ],
        "reason": "As transições precisam comunicar sucesso e falhas que exijam atenção."
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

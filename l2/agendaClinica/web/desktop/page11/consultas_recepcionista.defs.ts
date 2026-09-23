export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Permite à recepcionista consultar as consultas da clínica e os horários registrados, usando os critérios disponíveis de identificação, paciente, profissional, data e situação para localizar registros. A consulta informa horários ocupados do profissional e apoia a identificação de disponibilidade antes do agendamento. Durante a busca, comunica carregamento; se não houver resultados, informa que nenhuma consulta foi encontrada; se ocorrer falha, apresenta o erro de forma acessível. Os critérios, resultados e mudança de página devem ter rótulos compreensíveis e operar por teclado e tecnologias assistivas.",
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
        "reason": "A capacidade consulta uma coleção de consultas com critérios e página opcional."
      },
      {
        "groupId": "groupEnterDatetime",
        "candidates": [
          "groupenterdatetime--ml-datetime-picker",
          "groupenterdatetime--ml-enter-datetime-masked-input"
        ],
        "reason": "Há um critério editável de data e horário da consulta."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Apresenta os dados da consulta localizada para conferência, incluindo paciente, profissional, data e horário. A recepcionista pode informar a identificação da consulta e executar a consulta do registro. Durante o carregamento, anuncia que os dados estão sendo buscados; se nenhum registro corresponder, informa a ausência de consulta; se houver falha, comunica o erro de modo acessível. Os dados devem permanecer identificados, legíveis e navegáveis por teclado e leitores de tela.",
    "contentRef": "base",
    "capabilityRefs": [
      "setListConsultaId",
      "listConsulta"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewCard",
        "candidates": [
          "groupviewcard--ml-view-card-horizontal"
        ],
        "reason": "A consulta de um registro fornece informações essenciais para conferência."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "A consulta possui estados de carregamento, ausência de resultado e erro que exigem retorno acessível."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Permite marcar uma consulta selecionando paciente e profissional e informando data, horário e situação. A recepcionista pode consultar pacientes e profissionais para realizar as seleções. O agendamento só é concluído se não houver outra consulta do mesmo profissional no mesmo horário. Campos obrigatórios, rótulos e erros devem ser anunciados e operáveis por teclado. Durante o envio, comunica processamento e evita novo envio; após sucesso, informa a criação da consulta; em caso de erro, preserva os dados informados e comunica o problema para correção e nova tentativa.",
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
        "reason": "Paciente e profissional são escolhas únicas obtidas por consultas disponíveis."
      },
      {
        "groupId": "groupEnterDatetime",
        "candidates": [
          "groupenterdatetime--ml-datetime-picker"
        ],
        "reason": "O agendamento exige informar data e horário."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "O comando cria a consulta com os valores obrigatórios informados."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback",
          "groupnotifyuser--ml-toast-notification"
        ],
        "reason": "O envio possui estados de sucesso e erro que precisam ser comunicados."
      }
    ]
  },
  {
    "organismId": "organism.actions.1",
    "kind": "actions",
    "description": "Permite atuar sobre uma consulta selecionada para registrar a confirmação feita por telefone ou a falta do paciente. Cada ação exige que a consulta esteja identificada e deve deixar claro qual atualização será aplicada. Durante a execução, comunica processamento e impede repetição acidental. Após êxito, informa a atualização e a consulta é atualizada na listagem; em erro, apresenta uma mensagem acessível e permite nova tentativa. As ações devem ter nomes claros, foco visível e operação por teclado.",
    "contentRef": "base",
    "capabilityRefs": [
      "setConfirmarConsultaId",
      "confirmarConsulta",
      "setRegistrarFaltaId",
      "registrarFalta"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard",
          "grouptriggeraction--ml-kebab-action-trigger"
        ],
        "reason": "Há comandos contextuais para confirmar a consulta ou registrar falta, ambos com estado de execução."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-toast-notification",
          "groupnotifyuser--ml-alert-modal"
        ],
        "reason": "Os comandos expõem estados de sucesso e erro que precisam de retorno ao usuário."
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
      "l2/agendaClinica/web/shared/consultas_recepcionista.ts"
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
      "_102040_/l2/molecules/groupenterdatetime/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterDateTime/usage.ts",
      "_102040_/l2/molecules/groupviewcard/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewCard/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts",
      "_102040_/l2/molecules/groupselectone/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupSelectOne/usage.ts",
      "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts"
    ]
  }
] as const;

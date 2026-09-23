export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Prioriza a leitura das consultas e de seus horários em sequência, permitindo consultar a relação pelos critérios disponíveis e solicitar outra página. Durante a busca, informa carregamento; quando não houver correspondências, comunica a lista vazia; e, em caso de falha, apresenta o erro. Resultados, critérios e paginação devem ter áreas de toque claras, rótulos acessíveis e estados anunciados.",
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
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "A coleção de consultas pode ser lida como uma lista de registros empilhados em tela estreita."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Exibe de forma prioritária os dados da consulta localizada, como paciente, profissional, data e horário, para conferência antes das ações. Informa carregamento enquanto busca o registro, ausência quando ele não for encontrado e erro se a consulta falhar. A leitura deve seguir uma ordem clara, com rótulos anunciáveis e suporte integral a leitor de tela.",
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
        "reason": "A consulta pode ser apresentada como uma unidade compacta com dados relevantes para leitura."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Permite agendar a consulta em uma sequência de preenchimento focada: selecionar paciente, selecionar profissional, informar data e hora e a situação requerida, depois enviar. As buscas de paciente e profissional comunicam carregamento, ausência e falha; o comando de agendamento informa processamento, sucesso ou erro, inclusive indisponibilidade do horário. Os campos obrigatórios e mensagens de erro devem ser acessíveis e fáceis de acionar por toque.",
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
        "reason": "Paciente e profissional são escolhas únicas provenientes das consultas disponíveis."
      },
      {
        "groupId": "groupEnterDatetime",
        "candidates": [
          "groupenterdatetime--ml-datetime-picker"
        ],
        "reason": "A criação exige data e hora da consulta."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "O agendamento é enviado por um comando explícito."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback",
          "groupnotifyuser--ml-toast-notification"
        ],
        "reason": "É necessário comunicar validação, processamento, sucesso e erro."
      }
    ]
  },
  {
    "organismId": "organism.actions.1",
    "kind": "actions",
    "description": "Permite tocar em ações explícitas para confirmar por telefone ou registrar falta para a consulta selecionada. Antes do comando, a consulta identificada é requerida; durante a execução, informa processamento; ao terminar, comunica sucesso ou erro e atualiza a relação de consultas. Os controles devem ter nomes claros, áreas de toque adequadas, foco acessível e estado indisponível enquanto processam.",
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
        "reason": "As duas transições são comandos contextuais aplicados à consulta selecionada."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-toast-notification",
          "groupnotifyuser--ml-alert-modal"
        ],
        "reason": "Os resultados e erros das transições devem ser comunicados de modo acessível."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "consultas_recepcionista__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/mobile/page11/consultas_recepcionista.defs.ts",
    "outputPath": "l2/agendaClinica/web/mobile/page11/consultas_recepcionista.ts",
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

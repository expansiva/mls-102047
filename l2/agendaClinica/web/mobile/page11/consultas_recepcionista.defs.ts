export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Prioriza a leitura das consultas encontradas, com paciente, profissional, data, horário e situação, para localizar compromissos e verificar horários ocupados. Mantém os critérios disponíveis de identificação, paciente, profissional, data, situação e página para consultar resultados. Durante o carregamento, informa o andamento; sem resultados, comunica que não há consultas para os critérios; em falha, apresenta o erro da consulta. Os critérios e a seleção de consulta têm rótulos acessíveis, alvos de toque adequados e alternativa por teclado.",
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
          "groupviewtable--ml-responsive-data-table"
        ],
        "reason": "A coleção estruturada de consultas precisa continuar legível em tela estreita."
      },
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "Uma lista vertical favorece a leitura de consultas em dispositivos móveis."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Mostra, com prioridade para paciente, profissional, data, horário e situação, os dados disponíveis da consulta escolhida antes de uma atualização. Mantém o contexto da seleção para confirmar por telefone ou registrar falta. Comunica carregamento enquanto a consulta é obtida, orienta quando não houver consulta selecionada e apresenta o erro se a obtenção falhar. A consulta e suas informações têm identificação acessível para toque, teclado e leitor de tela.",
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
        "reason": "A consulta selecionada pode ser apresentada como uma unidade compacta de leitura de metadados."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Permite marcar a consulta preenchendo paciente, profissional, data e hora e situação obrigatórios, em ordem de leitura adequada ao dispositivo móvel. Mantém a localização de pacientes e profissionais para escolha dos identificadores e a consulta de compromissos existentes ao avaliar o horário. Antes do envio, informa pendências obrigatórias; durante o envio, comunica o andamento; após sucesso ou erro, inclusive indisponibilidade de horário, permite corrigir e tentar novamente. Campos, ajuda e erros são associados de forma acessível e operáveis por toque ou teclado.",
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
          "groupselectone--ml-select-one-autocomplete"
        ],
        "reason": "A busca e escolha única de paciente e profissional reduz a digitação em tela móvel."
      },
      {
        "groupId": "groupEnterDatetime",
        "candidates": [
          "groupenterdatetime--ml-datetime-picker"
        ],
        "reason": "O agendamento exige escolha acessível de data e hora."
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
    "description": "Oferece as ações de confirmar por telefone ou registrar falta para a consulta selecionada, preservando a identificação do compromisso antes do toque. Cada ação exige essa seleção, informa que está em andamento e impede reenvio durante a execução. Após êxito, informa a atualização e a lista de consultas é atualizada; em falha, apresenta o erro e permite nova tentativa. Os comandos possuem rótulos claros, alvos de toque adequados e acesso por teclado.",
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

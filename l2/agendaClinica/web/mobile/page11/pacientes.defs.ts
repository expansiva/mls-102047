export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Permite à recepcionista localizar pacientes pelo nome, priorizando a digitação do critério e a leitura dos resultados em espaço reduzido. A busca pode ser acionada por toque ou teclado; informa carregamento, ausência de resultados e erro de consulta com possibilidade de nova tentativa. Rótulos, foco visível e anúncios de estado mantêm a interação acessível a tecnologias assistivas.",
    "contentRef": "base",
    "capabilityRefs": [
      "setListPacienteDetailsIdentificationName",
      "listPaciente"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupSearchContent",
        "candidates": [
          "groupsearchcontent--ml-search-bar"
        ],
        "reason": "A busca por nome continua sendo a ação principal, com estados próprios de carregamento e resultado."
      },
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "A coleção retornada pode ser apresentada em registros empilhados, favorecendo leitura em telas estreitas."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Mostra, com prioridade para identificação e telefones de contato, os dados do paciente disponíveis no resultado da consulta. Durante a consulta, comunica carregamento; se não houver registro, informa a ausência de dados; em caso de falha, apresenta o erro e permite tentar novamente. O conteúdo é legível por leitores de tela e permanece navegável por toque e teclado.",
    "contentRef": "base",
    "capabilityRefs": [
      "listPaciente"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewCard",
        "candidates": [
          "groupviewcard--ml-profile-card"
        ],
        "reason": "O organismo concentra informações de uma pessoa retornadas pela consulta e favorece a leitura de identificação e contato."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Permite cadastrar o paciente para disponibilizá-lo nos agendamentos da clínica, com leitura sequencial dos dados em tela reduzida. Coleta nome e código do país obrigatórios e aceita os demais dados de identificação e cadastro quando informados. Antes do envio, sinaliza pendências obrigatórias; ao enviar, comunica carregamento, sucesso ou erro e preserva os dados para correção quando necessário. Campos, obrigatoriedade e mensagens de erro têm rótulos e associações acessíveis, com interação por toque e teclado.",
    "contentRef": "createPaciente",
    "capabilityRefs": [
      "setCreatePacienteDetails",
      "setCreatePacienteDetailsIdentification",
      "setCreatePacienteDetailsIdentificationName",
      "setCreatePacienteDetailsIdentificationDocType",
      "setCreatePacienteDetailsIdentificationDocId",
      "setCreatePacienteDetailsIdentificationCountryCode",
      "setCreatePacienteDetailsBase",
      "setCreatePacienteDetailsGeneral",
      "setCreatePacienteDetailsAgendaClinica",
      "createPaciente"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupEnterText",
        "candidates": [
          "groupentertext--ml-enter-text"
        ],
        "reason": "O cadastro exige entrada textual para identificação e outros dados informados pela recepcionista."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "O comando createPaciente deve permanecer claramente acionável por toque e teclado."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "Os estados de sucesso e erro do cadastro precisam de retorno acessível no contexto do formulário."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "pacientes__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/mobile/page11/pacientes.defs.ts",
    "outputPath": "l2/agendaClinica/web/mobile/page11/pacientes.ts",
    "dependsFiles": [
      "l2/agendaClinica/web/shared/pacientes.ts",
      "l2/designSystem.ts"
    ],
    "dependsOn": [
      "pacientes__l2_shared"
    ],
    "categoryRef": "masterDataManagement",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/masterDataManagement.md",
      "_102040_/l2/molecules/groupsearchcontent/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupSearchContent/usage.ts",
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

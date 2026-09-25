export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Permite à recepcionista localizar pacientes pelo nome, informando os critérios de consulta disponíveis e executando a busca. Exibe os registros retornados pela consulta; durante o carregamento comunica que a busca está em andamento, informa quando não houver resultados e apresenta um erro de consulta com opção de tentar novamente. Os controles possuem rótulos associados, são operáveis por teclado e anunciam resultados e mudanças de estado para tecnologias assistivas.",
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
        "reason": "A busca por nome é a ação principal deste organismo e a consulta fornece estados de carregamento, vazio e erro."
      },
      {
        "groupId": "groupViewTable",
        "candidates": [
          "groupviewtable--ml-data-table"
        ],
        "reason": "A consulta retorna uma coleção de pacientes que pode ser lida de forma estruturada."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Apresenta os dados e os telefones de contato do paciente disponíveis no resultado da consulta, para conferência pela recepcionista. Enquanto os dados são consultados, informa o carregamento; quando não houver registro correspondente, comunica a ausência de dados; se a consulta falhar, mostra uma mensagem de erro e permite nova tentativa. As informações possuem identificação textual clara e podem ser percorridas por leitores de tela.",
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
        "reason": "O organismo mostra informações de uma pessoa retornadas pela consulta, priorizando sua identificação e contatos."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Permite cadastrar o paciente para que ele fique disponível no agendamento da clínica. Coleta os dados específicos do cadastro, incluindo nome e código do país obrigatórios, além de identificação e demais dados opcionais quando informados. Valida os campos obrigatórios antes do envio, informa o progresso do cadastro, confirma o sucesso e apresenta o erro retornado sem descartar a correção dos dados. Cada campo tem rótulo e indicação de obrigatoriedade, erros são associados ao campo pertinente e o envio é acessível por teclado.",
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
        "reason": "O formulário recebe valores textuais para os dados de identificação e demais dados de cadastro."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "O comando createPaciente é uma ação primária de envio do cadastro."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "O comando expõe estados de sucesso e erro que precisam ser comunicados junto ao cadastro."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "pacientes__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/desktop/page11/pacientes.defs.ts",
    "outputPath": "l2/agendaClinica/web/desktop/page11/pacientes.ts",
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
      "_102040_/l2/molecules/groupviewtable/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewTable/usage.ts",
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

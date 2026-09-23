export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Permite à recepcionista localizar pacientes já associados à clínica, evitando duplicidade e apoiando o agendamento. A consulta pode usar nome e dados de identificação disponíveis, apresenta os registros encontrados e permite alterar a página da consulta. Informa carregamento, ausência de resultados e falha na consulta, oferecendo nova tentativa de modo acessível; campos, resultados e mudanças de estado têm rótulos compreensíveis e uso por teclado e leitor de tela.",
    "contentRef": "localizarPaciente",
    "capabilityRefs": [
      "listPaciente",
      "setListPacienteDetailsIdentificationName",
      "setListPacienteDetailsIdentificationDocType",
      "setListPacienteDetailsIdentificationDocId",
      "setListPacienteDetailsIdentificationCountryCode",
      "setListPacientePage"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupSearchContent",
        "candidates": [
          "groupsearchcontent--ml-search-filters"
        ],
        "reason": "A consulta de pacientes pode ser refinada pelos dados de identificação disponíveis."
      },
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "listPaciente retorna uma coleção de registros de pacientes para consulta e escolha."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Exibe os pacientes retornados pela localização para que a recepcionista confira nome e dados cadastrais antes de prosseguir. Durante a consulta, comunica carregamento; quando não há correspondência, orienta a refinar a busca; e, em caso de falha, informa o erro e permite tentar novamente. Os dados e os controles de busca são anunciados de forma clara para tecnologias assistivas e permanecem utilizáveis por teclado.",
    "contentRef": "localizarPaciente",
    "capabilityRefs": [
      "listPaciente",
      "setListPacienteDetailsIdentificationName",
      "setListPacienteDetailsIdentificationDocType",
      "setListPacienteDetailsIdentificationDocId",
      "setListPacienteDetailsIdentificationCountryCode"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "listPaciente fornece registros localizados para a conferência dos dados cadastrais."
      },
      {
        "groupId": "groupSearchContent",
        "candidates": [
          "groupsearchcontent--ml-search-bar"
        ],
        "reason": "Os dados de identificação podem ser usados para refinar a localização do paciente."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Coleta os dados para registrar ou associar um novo paciente à clínica. Nome e código do país são obrigatórios; tipo e número de documento, apelidos e observações podem ser preenchidos quando aplicável. Indica obrigatoriedade e problemas de preenchimento em texto associado aos respectivos campos. Durante o envio, preserva o conteúdo informado e comunica processamento, êxito ou falha para que a recepcionista possa corrigir os dados e reenviar, com suporte a teclado e leitor de tela.",
    "contentRef": "createPaciente",
    "capabilityRefs": [
      "setCreatePacienteDetails",
      "setCreatePacienteDetailsIdentification",
      "setCreatePacienteDetailsIdentificationName",
      "setCreatePacienteDetailsIdentificationDocType",
      "setCreatePacienteDetailsIdentificationDocId",
      "setCreatePacienteDetailsIdentificationCountryCode",
      "setCreatePacienteDetailsBase",
      "setCreatePacienteDetailsBaseAliases",
      "setCreatePacienteDetailsBaseNotes",
      "createPaciente"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupEnterText",
        "candidates": [
          "groupentertext--ml-enter-text",
          "groupentertext--ml-tag-input",
          "groupentertext--ml-multiline-text"
        ],
        "reason": "O cadastro recebe nome, dados documentais, apelidos e observações textuais."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "createPaciente é o comando explícito para registrar ou associar o paciente."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-linear-progress"
        ],
        "reason": "O comando de cadastro possui estado de carregamento durante o envio."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "O comando expõe resultado e erro que requerem retorno acessível."
      }
    ]
  },
  {
    "organismId": "organism.actions.1",
    "kind": "actions",
    "description": "Disponibiliza a conclusão do registro do paciente após o preenchimento cadastral, tornando-o disponível para receber consultas. A ação informa quando está sendo processada, confirma a conclusão e comunica erros sem impedir a correção dos dados e uma nova tentativa. O comando e seus estados possuem nome e mensagens acessíveis para tecnologias assistivas.",
    "contentRef": "createPaciente",
    "capabilityRefs": [
      "createPaciente"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "createPaciente é o comando que efetiva o registro ou a associação do paciente."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "createPaciente possui estado de carregamento, sem duração declarada."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-toast-notification",
          "groupnotifyuser--ml-alert-modal"
        ],
        "reason": "createPaciente fornece resultado e erro para confirmação ou tratamento pela recepcionista."
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
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
      "_102040_/l2/molecules/groupentertext/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterText/usage.ts",
      "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts",
      "_102040_/l2/molecules/groupshowprogress/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupShowProgress/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts"
    ]
  }
] as const;

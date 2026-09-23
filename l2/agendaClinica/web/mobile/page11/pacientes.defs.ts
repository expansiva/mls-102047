export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Permite à recepcionista localizar pacientes já associados à clínica, evitando duplicidade e apoiando o agendamento. Em tela reduzida, prioriza a busca e a identificação de cada paciente, preservando a consulta e a alteração da página dos resultados. Comunica carregamento, ausência de resultados e falha, com nova tentativa acessível; controles e atualizações são claros para toque e leitor de tela.",
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
          "groupsearchcontent--ml-search-bar"
        ],
        "reason": "A consulta de pacientes pode ser refinada pelos dados de identificação disponíveis."
      },
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "listPaciente retorna registros que podem ser lidos de forma sequencial em tela estreita."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Exibe os pacientes retornados pela localização para a recepcionista conferir nome e dados cadastrais antes de prosseguir. Em mobile, prioriza a leitura sequencial dos dados relevantes e mantém o refinamento da consulta. Informa carregamento, resultado vazio e erro, com possibilidade acessível de nova busca; o conteúdo e os controles são anunciados adequadamente por tecnologias assistivas.",
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
        "reason": "listPaciente fornece registros para conferência sequencial dos dados cadastrais."
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
    "description": "Coleta os dados para registrar ou associar um novo paciente à clínica. Nome e código do país são obrigatórios; tipo e número de documento, apelidos e observações podem ser preenchidos quando aplicável. Em mobile, a ordem de leitura acompanha o cadastro e todos os campos e validações são preservados. Informa obrigatoriedade e erros junto aos campos, mantém os dados durante o envio e comunica processamento, êxito ou falha de forma acessível ao toque e ao leitor de tela.",
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
    "description": "Disponibiliza a conclusão do registro do paciente após o preenchimento cadastral, tornando-o disponível para receber consultas. Em mobile, a ação continua claramente identificada e acionável por toque. Informa processamento, confirma a conclusão e comunica erros para que os dados possam ser corrigidos e enviados novamente; os estados são anunciados de maneira acessível.",
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

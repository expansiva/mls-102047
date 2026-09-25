export const descriptions = [
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Prioriza a leitura do cadastro do próprio profissional em uma sequência fácil de percorrer por toque e leitor de tela, preservando a consulta dos dados retornados. Comunica carregamento, ausência de cadastro e falha da consulta de forma clara, com opção de tentar consultar novamente quando houver erro.",
    "contentRef": "base",
    "capabilityRefs": [
      "listProfissional"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "O formato de lista vertical favorece a leitura de registros retornados em espaço reduzido."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-notify-banner"
        ],
        "reason": "Mantém visíveis os estados de erro e vazio da consulta em uma tela estreita."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Permite preencher e revisar por toque os mesmos dados de atuação clínica: identificação, nome, documento, código do país, ocupação, consentimento de privacidade e demais detalhes. Mantém indicação acessível dos campos obrigatórios, dos erros e do foco, e prioriza a leitura de cada informação antes do envio. As edições atualizam seus estados; o envio cria ou atualiza o cadastro, informa processamento, sucesso ou erro e evita reenvio. Para atualizar, exige identificação e versão disponíveis, bloqueando o comando sem perder o que foi editado se a versão não estiver disponível.",
    "contentRef": "base",
    "capabilityRefs": [
      "setCreateProfissionalDetails",
      "setCreateProfissionalDetailsIdentification",
      "setCreateProfissionalDetailsIdentificationName",
      "setCreateProfissionalDetailsIdentificationDocType",
      "setCreateProfissionalDetailsIdentificationDocId",
      "setCreateProfissionalDetailsIdentificationCountryCode",
      "setCreateProfissionalDetailsBase",
      "setCreateProfissionalDetailsPerson",
      "setCreateProfissionalDetailsPersonOccupation",
      "setCreateProfissionalDetailsPersonPrivacyConsent",
      "setCreateProfissionalDetailsGeneral",
      "setCreateProfissionalDetailsAgendaClinica",
      "createProfissional",
      "setUpdateProfissionalDetails",
      "setUpdateProfissionalDetailsIdentification",
      "setUpdateProfissionalDetailsIdentificationName",
      "setUpdateProfissionalDetailsIdentificationDocType",
      "setUpdateProfissionalDetailsIdentificationDocId",
      "setUpdateProfissionalDetailsIdentificationCountryCode",
      "setUpdateProfissionalDetailsBase",
      "setUpdateProfissionalDetailsPerson",
      "setUpdateProfissionalDetailsPersonOccupation",
      "setUpdateProfissionalDetailsPersonPrivacyConsent",
      "setUpdateProfissionalDetailsGeneral",
      "setUpdateProfissionalDetailsAgendaClinica",
      "updateProfissional"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupEnterText",
        "candidates": [
          "groupentertext--ml-enter-text"
        ],
        "reason": "Oferece entrada direta por toque para os dados textuais editáveis do cadastro."
      },
      {
        "groupId": "groupEnterBoolean",
        "candidates": [
          "groupenterboolean--ml-checkbox-preference"
        ],
        "reason": "Permite registrar o consentimento de privacidade de forma reconhecível e acessível."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "Os comandos de criar e atualizar precisam de acionamento explícito com estado de carregamento."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback",
          "groupnotifyuser--ml-toast-notification"
        ],
        "reason": "Dá retorno acessível para validação, falha e sucesso do envio."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "dados_profissional__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/mobile/page11/dados_profissional.defs.ts",
    "outputPath": "l2/agendaClinica/web/mobile/page11/dados_profissional.ts",
    "dependsFiles": [
      "l2/agendaClinica/web/shared/dados_profissional.ts",
      "l2/designSystem.ts"
    ],
    "dependsOn": [
      "dados_profissional__l2_shared"
    ],
    "categoryRef": "masterDataManagement",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/masterDataManagement.md",
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts",
      "_102040_/l2/molecules/groupentertext/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterText/usage.ts",
      "_102040_/l2/molecules/groupenterboolean/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterBoolean/usage.ts",
      "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts"
    ]
  }
] as const;

export const descriptions = [
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Apresenta o cadastro do próprio profissional para consulta, usando os dados retornados pela busca. Enquanto a consulta estiver em andamento, comunica carregamento; se não houver cadastro retornado, informa o estado vazio; se a consulta falhar, comunica o erro de forma compreensível e permite tentar consultar novamente. As informações devem ser legíveis por leitores de tela, com rótulos e estados anunciados adequadamente.",
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
        "reason": "A consulta retorna uma coleção de registros do profissional e o candidato permite leitura escaneável dos dados retornados."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-notify-banner"
        ],
        "reason": "A consulta possui estados de erro e vazio que precisam de comunicação perceptível."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Permite informar ou alterar os dados de atuação clínica do profissional, incluindo identificação, nome, documento, código do país, ocupação, consentimento de privacidade e demais detalhes disponíveis. Os campos obrigatórios de nome, código do país e ocupação devem indicar obrigatoriedade, validação e erros de modo acessível. Cada alteração atualiza o estado correspondente; o envio cria o cadastro ou atualiza o registro existente. Durante o envio, evita reenvio e informa carregamento, sucesso ou falha. A atualização só pode prosseguir quando a identificação e a versão do registro selecionado estiverem disponíveis; se a versão não puder ser obtida, o envio é bloqueado sem descartar as edições.",
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
        "reason": "Há entrada editável de nome, identificação documental, código do país, ocupação e demais detalhes textuais."
      },
      {
        "groupId": "groupEnterBoolean",
        "candidates": [
          "groupenterboolean--ml-checkbox-preference"
        ],
        "reason": "O formulário registra o consentimento de privacidade."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "Criar e atualizar são comandos explícitos de envio."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback",
          "groupnotifyuser--ml-toast-notification"
        ],
        "reason": "O formulário precisa comunicar validação, erro e resultado das operações de criar e atualizar."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "dados_profissional__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/desktop/page11/dados_profissional.defs.ts",
    "outputPath": "l2/agendaClinica/web/desktop/page11/dados_profissional.ts",
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

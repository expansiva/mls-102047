export const descriptions = [
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Apresenta os dados disponíveis do cadastro próprio de recepcionista e do registro profissional relacionado. Enquanto a consulta estiver carregando, informa o progresso; quando não houver dados, comunica a ausência de cadastro; e, se a consulta falhar, mostra o erro. Os resultados devem permanecer legíveis por tecnologias assistivas, com nomes claros para os dados.",
    "contentRef": "base",
    "capabilityRefs": [
      "listProfissional",
      "listRecepcionista"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "As consultas retornam coleções de dados de Profissional e Recepcionista que precisam ser apresentadas para leitura."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-notify-banner"
        ],
        "reason": "A consulta expõe estados de carregamento, vazio e erro que precisam ser comunicados."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "A duração da consulta não é informada e seu estado de carregamento deve ser indicado."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Permite atualizar os dados de atuação na clínica do cadastro próprio, incluindo os detalhes de identificação e os detalhes previstos para Profissional e Recepcionista. Nome e código do país são obrigatórios nos dois registros; ocupação é obrigatória no registro profissional. Mantém os valores editados se a versão necessária para atualizar não estiver disponível e impede o envio nessa condição. O envio cria ou atualiza os registros conforme a ação escolhida, indica processamento, sucesso ou erro e atualiza as consultas correspondentes após a conclusão. Campos obrigatórios, mensagens de erro e comandos de envio devem ter rótulos e feedback acessíveis.",
    "contentRef": "base",
    "capabilityRefs": [
      "setCreateProfissionalDetailsIdentificationName",
      "setCreateProfissionalDetailsIdentificationDocType",
      "setCreateProfissionalDetailsIdentificationDocId",
      "setCreateProfissionalDetailsIdentificationCountryCode",
      "setCreateProfissionalDetailsPersonOccupation",
      "setCreateProfissionalDetailsPersonPrivacyConsent",
      "setCreateRecepcionistaDetailsIdentificationName",
      "setCreateRecepcionistaDetailsIdentificationDocType",
      "setCreateRecepcionistaDetailsIdentificationDocId",
      "setCreateRecepcionistaDetailsIdentificationCountryCode",
      "setCreateRecepcionistaDetailsBase",
      "setCreateRecepcionistaDetailsPerson",
      "setCreateRecepcionistaDetailsGeneral",
      "setCreateRecepcionistaDetailsAgendaClinica",
      "setUpdateProfissionalDetailsIdentificationName",
      "setUpdateProfissionalDetailsIdentificationDocType",
      "setUpdateProfissionalDetailsIdentificationDocId",
      "setUpdateProfissionalDetailsIdentificationCountryCode",
      "setUpdateProfissionalDetailsPersonOccupation",
      "setUpdateProfissionalDetailsPersonPrivacyConsent",
      "setUpdateRecepcionistaDetailsIdentificationName",
      "setUpdateRecepcionistaDetailsIdentificationDocType",
      "setUpdateRecepcionistaDetailsIdentificationDocId",
      "setUpdateRecepcionistaDetailsIdentificationCountryCode",
      "setUpdateRecepcionistaDetailsBase",
      "setUpdateRecepcionistaDetailsPerson",
      "setUpdateRecepcionistaDetailsGeneral",
      "setUpdateRecepcionistaDetailsAgendaClinica",
      "createProfissional",
      "createRecepcionista",
      "updateProfissional",
      "updateRecepcionista"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupEnterText",
        "candidates": [
          "groupentertext--ml-enter-text"
        ],
        "reason": "Há entrada editável de nome, documento, código do país, ocupação e demais detalhes textuais."
      },
      {
        "groupId": "groupEnterBoolean",
        "candidates": [
          "groupenterboolean--ml-checkbox-preference"
        ],
        "reason": "O consentimento de privacidade do Profissional é um valor booleano opcional."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "As ações de criar e atualizar precisam de um comando explícito com estado de processamento."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "Validação, bloqueio por versão ausente e resultado das ações exigem feedback contextual."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-linear-progress"
        ],
        "reason": "As operações de criação e atualização possuem estado de carregamento."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "dados_recepcionista__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/desktop/page11/dados_recepcionista.defs.ts",
    "outputPath": "l2/agendaClinica/web/desktop/page11/dados_recepcionista.ts",
    "dependsFiles": [
      "l2/agendaClinica/web/shared/dados_recepcionista.ts",
      "l2/designSystem.ts"
    ],
    "dependsOn": [
      "dados_recepcionista__l2_shared"
    ],
    "categoryRef": "entityRecordManagement",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/entityRecordManagement.md",
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts",
      "_102040_/l2/molecules/groupshowprogress/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupShowProgress/usage.ts",
      "_102040_/l2/molecules/groupentertext/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterText/usage.ts",
      "_102040_/l2/molecules/groupenterboolean/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterBoolean/usage.ts",
      "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts"
    ]
  }
] as const;

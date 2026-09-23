export const descriptions = [
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Apresenta ao profissional os dados disponíveis do seu próprio cadastro. Enquanto a consulta estiver em carregamento, comunica que os dados estão sendo obtidos; quando não houver dados, informa a ausência de cadastro; e, se a consulta falhar, apresenta a falha de forma compreensível. As informações devem ser legíveis por tecnologias assistivas, com estados anunciados e conteúdo identificado.",
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
        "reason": "A consulta retorna uma coleção e pode apresentar os dados disponíveis de modo escaneável."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "A consulta possui estado de carregamento sem duração conhecida."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-notify-banner"
        ],
        "reason": "A consulta possui estado de erro e ausência de dados que precisam ser comunicados."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Permite atualizar os dados de atuação clínica do profissional no cadastro selecionado. Mantém campos editáveis para detalhes, identificação, nome, tipo e número de documento, código do país, dados base, dados de pessoa, ocupação, consentimento de privacidade, dados gerais e dados de agenda clínica; nome, código do país, ocupação e detalhes são obrigatórios. A identificação do registro é somente leitura. A pessoa revisa os dados e confirma a atualização; durante o envio, o comando informa processamento e evita novo envio. Em caso de sucesso ou erro, o resultado é comunicado de forma acessível, incluindo mensagens associadas aos campos quando aplicável.",
    "contentRef": "updateProfissional",
    "capabilityRefs": [
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
        "reason": "Há entrada textual editável, incluindo nome e identificadores documentais."
      },
      {
        "groupId": "groupEnterBoolean",
        "candidates": [
          "groupenterboolean--ml-checkbox-preference"
        ],
        "reason": "O consentimento de privacidade é uma decisão booleana editável."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "A atualização é um comando confirmado pelo profissional."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback",
          "groupnotifyuser--ml-toast-notification"
        ],
        "reason": "O formulário precisa comunicar validação, falha e confirmação do comando."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-linear-progress"
        ],
        "reason": "O comando de atualização possui estado de carregamento."
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
    "categoryRef": "entityRecordManagement",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/entityRecordManagement.md",
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
      "_102040_/l2/molecules/groupshowprogress/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupShowProgress/usage.ts",
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

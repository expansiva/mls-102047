export const descriptions = [
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Apresenta ao profissional os dados disponíveis do seu cadastro profissional. Enquanto a consulta estiver em carregamento, informa o andamento; se não houver dados, comunica o estado vazio; se falhar, apresenta o erro da consulta de forma compreensível. O conteúdo deve poder ser lido por tecnologias assistivas, incluindo identificação clara do estado e dos dados exibidos.",
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
        "reason": "A consulta retorna uma coleção de registros profissionais e a lista empilhada permite leitura dos dados retornados."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Permite criar ou atualizar os dados de atuação clínica do profissional. Coleta os campos disponíveis de identificação, nome, tipo e número de documento, código do país, dados base, dados pessoais, ocupação, consentimento de privacidade, dados gerais e dados da agenda clínica. Nome, código do país, ocupação e detalhes são obrigatórios quando aplicáveis ao comando. A pessoa usuária pode alterar os valores e enviar a criação ou atualização; durante o envio, o estado de processamento é comunicado, e sucessos ou erros são informados de modo acessível. Após criar ou atualizar, a consulta de profissionais é atualizada.",
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
      "setUpdateProfissionalId",
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
      "updateProfissional",
      "listProfissional"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupEnterText",
        "candidates": [
          "groupentertext--ml-enter-text"
        ],
        "reason": "Há entradas textuais editáveis para identificação, documentos e demais dados do profissional."
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
        "reason": "Os comandos de criar e atualizar precisam de uma ação explícita de envio."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback",
          "groupnotifyuser--ml-toast-notification"
        ],
        "reason": "Os comandos possuem estados de sucesso e erro que devem ser comunicados."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "As operações de criação e atualização expõem estados de carregamento sem duração conhecida."
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
      "l2/agendaClinica/web/shared/dados_profissional.ts"
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
      "_102040_/l2/molecules/groupentertext/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterText/usage.ts",
      "_102040_/l2/molecules/groupenterboolean/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterBoolean/usage.ts",
      "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts",
      "_102040_/l2/molecules/groupshowprogress/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupShowProgress/usage.ts"
    ]
  }
] as const;

export const descriptions = [
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Permite à recepcionista consultar os dados disponíveis de seu cadastro de Profissional e Recepcionista, priorizando a leitura das informações em tela estreita. Durante a consulta, comunica o carregamento; quando não houver dados retornados, informa o estado vazio; e, em caso de falha, apresenta um erro compreensível. As informações, estados e erros devem ser anunciados de forma acessível, sem depender somente de sinais visuais.",
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
        "reason": "Os resultados das consultas podem ser apresentados como registros de leitura escaneável em tela estreita."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Permite atualizar, por toque, os dados de atuação na clínica nos registros de Profissional e Recepcionista. Abrange os dados de identificação disponíveis, ocupação, consentimento de privacidade e os agrupamentos de dados previstos para recepcionista. Prioriza os campos obrigatórios na leitura, preserva os valores informados quando houver erro e comunica carregamento, sucesso ou falha nas operações de criação e atualização. Todos os campos e comandos permanecem disponíveis com rótulos claros, validações compreensíveis e uso acessível também por teclado.",
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
        "reason": "Os dados editáveis de identificação, ocupação e demais informações textuais podem ser preenchidos com interação adequada a telas móveis."
      },
      {
        "groupId": "groupEnterBoolean",
        "candidates": [
          "groupenterboolean--ml-checkbox-preference"
        ],
        "reason": "O consentimento de privacidade é um valor booleano editável."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "Os comandos de criar e atualizar exigem uma ação explícita de envio por toque."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "dados_recepcionista__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/mobile/page11/dados_recepcionista.defs.ts",
    "outputPath": "l2/agendaClinica/web/mobile/page11/dados_recepcionista.ts",
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
      "_102040_/l2/molecules/groupentertext/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterText/usage.ts",
      "_102040_/l2/molecules/groupenterboolean/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterBoolean/usage.ts",
      "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts"
    ]
  }
] as const;

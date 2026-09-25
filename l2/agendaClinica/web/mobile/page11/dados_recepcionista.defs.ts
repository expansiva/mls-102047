export const descriptions = [
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Prioriza a leitura dos dados do cadastro próprio de recepcionista e do registro profissional relacionado em espaço reduzido. Durante o carregamento, informa o progresso; sem resultados, comunica a ausência de cadastro; e, em caso de falha, apresenta o erro. As informações devem ter rótulos acessíveis e permanecer compreensíveis por leitores de tela.",
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
        "reason": "A apresentação em lista vertical favorece a leitura dos dados retornados em telas estreitas."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-notify-banner"
        ],
        "reason": "Comunica os estados da consulta sem depender somente de sinais visuais."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "Indica o carregamento da consulta de duração desconhecida."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Permite preencher e atualizar, por toque, os detalhes de atuação na clínica do registro profissional e do cadastro de recepcionista. Dá prioridade aos campos obrigatórios de nome, código do país e, para Profissional, ocupação; também oferece os demais detalhes declarados, incluindo consentimento de privacidade. Mantém as edições caso falte a versão exigida para atualizar e bloqueia o envio nessa condição. As ações de criar ou atualizar informam carregamento, sucesso e erro, atualizando as consultas relacionadas. Rótulos, obrigatoriedade, erros e comandos devem permanecer acessíveis em leitores de tela.",
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
        "reason": "Os detalhes editáveis incluem valores textuais e a entrada simples favorece o preenchimento em dispositivos móveis."
      },
      {
        "groupId": "groupEnterBoolean",
        "candidates": [
          "groupenterboolean--ml-checkbox-preference"
        ],
        "reason": "O consentimento de privacidade é uma escolha booleana."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "Criação e atualização requerem comandos claros e acionáveis por toque."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "Erros, obrigatoriedade, bloqueio por versão e resultados precisam de retorno próximo à interação."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-circular-progress"
        ],
        "reason": "Os comandos possuem estado de carregamento e o indicador compacto preserva espaço de leitura."
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

export const descriptions = [
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Apresenta o cadastro de recepcionista consultado nos registros de Profissional e Recepcionista, para que a pessoa confirme seus dados antes de alterá-los. Enquanto as consultas estão em andamento, comunica carregamento; quando não houver dados retornados, informa o estado vazio; em caso de falha, comunica o erro de consulta de forma compreensível e acessível. Os dados e mensagens de estado devem poder ser lidos por tecnologias assistivas.",
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
        "reason": "As consultas retornam coleções de registros de Profissional e Recepcionista que precisam ser apresentadas para consulta."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "As consultas possuem estado de carregamento com duração não informada."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-notify-banner"
        ],
        "reason": "As consultas possuem estado de erro que deve ser comunicado de modo acessível."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Permite criar ou atualizar os dados de atuação na clínica vinculados aos registros de Profissional e Recepcionista. A pessoa informa os dados de identificação disponíveis, incluindo nome, tipo e número de documento e código do país; também pode informar ocupação e consentimento de privacidade no registro profissional, além dos dados disponíveis de base, pessoa, gerais e de agenda clínica no registro de recepcionista. Os campos obrigatórios são identificados e validados de forma acessível; o envio informa processamento, sucesso ou erro e preserva a possibilidade de corrigir dados após falha. Os controles devem ter rótulos associados, instruções compreensíveis e operação por teclado.",
    "contentRef": "base",
    "capabilityRefs": [
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
        "reason": "Há entrada de texto para nome, documento, código do país, ocupação e demais dados editáveis declarados."
      },
      {
        "groupId": "groupEnterBoolean",
        "candidates": [
          "groupenterboolean--ml-checkbox-preference"
        ],
        "reason": "O consentimento de privacidade do Profissional é uma decisão booleana."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "As operações de criação e atualização exigem um comando explícito de envio."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-linear-progress"
        ],
        "reason": "As operações de criação e atualização possuem estado de processamento."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "As operações de criação e atualização possuem resultados e erros que devem orientar o preenchimento e o envio."
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
      "l2/agendaClinica/web/shared/dados_recepcionista.ts"
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

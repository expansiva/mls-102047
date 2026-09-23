export const descriptions = [
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Prioriza a leitura do cadastro próprio de recepcionista retornado pelas consultas de Profissional e Recepcionista, mantendo os dados essenciais facilmente percorríveis em espaço reduzido. Ao consultar, informa carregamento; se não houver dados, apresenta estado vazio; se ocorrer falha, comunica o erro de forma clara. A leitura por tecnologia assistiva e a navegação por toque devem manter acesso às mesmas informações e mensagens.",
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
        "reason": "As consultas retornam coleções de registros de Profissional e Recepcionista que precisam ser apresentadas para consulta em tela estreita."
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
    "description": "Permite, por toque e com leitura priorizada, criar ou atualizar os dados de atuação na clínica dos registros de Profissional e Recepcionista. Mantém a entrada dos dados declarados de identificação, incluindo nome, tipo e número de documento e código do país, a ocupação e o consentimento de privacidade do Profissional, e os dados disponíveis de base, pessoa, gerais e de agenda clínica do Recepcionista. Os requisitos obrigatórios e erros são anunciados de forma acessível, o envio mostra processamento, sucesso ou falha, e a pessoa pode corrigir os dados e tentar novamente sem perder as capacidades de criação ou atualização.",
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
        "reason": "As operações de criação e atualização exigem um comando explícito de envio por toque."
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
    "id": "dados_recepcionista__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/mobile/page11/dados_recepcionista.defs.ts",
    "outputPath": "l2/agendaClinica/web/mobile/page11/dados_recepcionista.ts",
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

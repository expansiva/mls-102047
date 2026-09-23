export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Permite à recepcionista localizar, por toque ou teclado, o médico ou terapeuta para o agendamento usando os critérios disponíveis, como nome de identificação e status. Em espaço reduzido, prioriza a leitura do nome de cada resultado e mantém disponível a solicitação de outra página de resultados. Comunica carregamento durante a consulta, informa quando não houver profissionais correspondentes e expõe o erro caso a busca falhe, com nova tentativa acessível. Campos e controles têm rótulos claros, foco perceptível e anúncios acessíveis das mudanças nos resultados.",
    "contentRef": "listProfissional",
    "capabilityRefs": [
      "setListProfissionalDetailsIdentificationName",
      "setListProfissionalDetailsIdentificationStatus",
      "listProfissional",
      "setListProfissionalPage"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupEnterText",
        "candidates": [
          "groupentertext--ml-enter-text"
        ],
        "reason": "Há um estado editável para informar o nome de identificação do profissional antes da consulta."
      },
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "A consulta listProfissional retorna uma coleção que pode ser lida em uma lista adaptada a telas estreitas."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Permite conferir, com prioridade de leitura no nome, os dados retornados do profissional escolhido antes de continuar o agendamento. A recepcionista pode informar o nome de identificação e consultar profissionais para atualizar essa conferência. Durante a busca, comunica carregamento; quando não houver resultado, informa a ausência; e, em falha, apresenta o erro e oferece nova tentativa. A interação por toque preserva rótulos acessíveis, foco visível e operação por teclado assistivo.",
    "contentRef": "listProfissional",
    "capabilityRefs": [
      "setListProfissionalDetailsIdentificationName",
      "listProfissional"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupEnterText",
        "candidates": [
          "groupentertext--ml-enter-text"
        ],
        "reason": "O nome de identificação é um estado editável usado pela consulta de profissionais."
      },
      {
        "groupId": "groupViewCard",
        "candidates": [
          "groupviewcard--ml-profile-card"
        ],
        "reason": "Os dados de um profissional retornado podem ser apresentados como informação de perfil para conferir o nome."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "profissionais__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/mobile/page11/profissionais.defs.ts",
    "outputPath": "l2/agendaClinica/web/mobile/page11/profissionais.ts",
    "dependsFiles": [
      "l2/agendaClinica/web/shared/profissionais.ts",
      "l2/designSystem.ts"
    ],
    "dependsOn": [
      "profissionais__l2_shared"
    ],
    "categoryRef": "calendarScheduling",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/calendarScheduling.md",
      "_102040_/l2/molecules/groupentertext/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterText/usage.ts",
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
      "_102040_/l2/molecules/groupviewcard/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewCard/usage.ts"
    ]
  }
] as const;

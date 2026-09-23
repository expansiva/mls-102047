export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Permite à recepcionista localizar o médico ou terapeuta para o agendamento, consultando os profissionais conforme os critérios informados, inclusive nome de identificação e status. Exibe os resultados retornados para que a pessoa confirme o profissional a usar na consulta e pode solicitar outra página de resultados. Enquanto a consulta estiver em andamento, comunica carregamento; se não houver resultados, informa a ausência de profissionais correspondentes; se falhar, apresenta o erro da consulta e permite nova tentativa. Os campos devem ter rótulos claros e instruções associadas, com operação por teclado e anúncio acessível das mudanças nos resultados.",
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
        "reason": "A consulta listProfissional retorna uma coleção de profissionais para leitura e escolha."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Apresenta os dados retornados do profissional selecionado, com prioridade para a conferência do nome antes do agendamento. Permite informar o nome de identificação e consultar profissionais para atualizar essa conferência. Indica carregamento durante a busca, ausência de resultado quando nenhum profissional corresponder e o erro retornado se a consulta falhar, mantendo a possibilidade de nova tentativa. O nome e os controles recebem rótulos acessíveis, foco visível e uso por teclado.",
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
    "id": "profissionais__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/desktop/page11/profissionais.defs.ts",
    "outputPath": "l2/agendaClinica/web/desktop/page11/profissionais.ts",
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

export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Permite à recepcionista localizar médicos ou terapeutas ativos por dados de identificação, priorizando nome e status para leitura em tela pequena, e consultar outra página de resultados quando aplicável. Os critérios e resultados permanecem utilizáveis por toque. Durante a consulta, comunica o carregamento; quando não houver profissionais retornados, mostra o estado vazio; e, em caso de falha, apresenta o erro e permite refazer a consulta. Critérios, resultados e mudanças de página devem ter rótulos acessíveis, foco visível e alvos de toque identificáveis.",
    "contentRef": "listProfissional",
    "capabilityRefs": [
      "setListProfissionalDetailsIdentificationName",
      "setListProfissionalDetailsIdentificationStatus",
      "setListProfissionalPage",
      "listProfissional"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupSearchContent",
        "candidates": [
          "groupsearchcontent--ml-search-filters"
        ],
        "reason": "A alteração do nome e a consulta de profissionais permitem pesquisar dentro da coleção retornada."
      },
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "A lista de registros favorece a leitura de profissionais em espaço reduzido."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Permite conferir, com prioridade ao nome, os dados do profissional pesquisado pelo identificador antes de seguir com o agendamento. Em tela pequena, mantém a identificação retornada legível e utilizável por toque. Comunica carregamento durante a consulta, a ausência de resultado quando não houver profissional retornado e o erro se a consulta falhar, sem impedir que outro identificador seja informado. O campo e os dados exibidos devem ter rótulos acessíveis e foco visível.",
    "contentRef": "listProfissional",
    "capabilityRefs": [
      "setListProfissionalId",
      "listProfissional"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupEnterText",
        "candidates": [
          "groupentertext--ml-enter-text"
        ],
        "reason": "O identificador do profissional é um valor informado para executar a consulta."
      },
      {
        "groupId": "groupViewCard",
        "candidates": [
          "groupviewcard--ml-profile-card"
        ],
        "reason": "Os dados retornados de um profissional podem ser apresentados para conferência como perfil."
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
      "_102040_/l2/molecules/groupsearchcontent/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupSearchContent/usage.ts",
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
      "_102040_/l2/molecules/groupentertext/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterText/usage.ts",
      "_102040_/l2/molecules/groupviewcard/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewCard/usage.ts"
    ]
  }
] as const;

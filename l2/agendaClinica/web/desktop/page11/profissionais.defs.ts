export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Permite à recepcionista localizar médicos ou terapeutas ativos para o agendamento, consultando profissionais pelos dados de identificação, incluindo nome e status, e percorrendo resultados quando o critério de página for informado. Durante a consulta, comunica o carregamento; se não houver profissionais retornados, apresenta um estado vazio; e, se a consulta falhar, informa o erro e conserva os critérios para uma nova consulta. Os critérios, resultados e mudança de página devem ter rótulos acessíveis, estados anunciados e uso completo por teclado.",
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
        "reason": "A alteração do critério de nome e a consulta de profissionais sustentam a busca na coleção retornada."
      },
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "A consulta retorna uma coleção de profissionais para leitura e escolha."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Permite conferir o nome e os demais dados de identificação do profissional consultado pelo identificador antes de prosseguir com o agendamento. Informa carregamento enquanto a consulta é realizada, comunica quando nenhum profissional for retornado e apresenta o erro em caso de falha, mantendo disponível a troca do identificador para nova consulta. O identificador, os dados retornados e as mensagens de estado devem ter nomes acessíveis e poder ser percorridos e acionados por teclado.",
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

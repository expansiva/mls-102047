export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Objetivo: permitir que a recepcionista localize o médico ou terapeuta para marcar a consulta. Informações: apresenta os profissionais retornados pela consulta, priorizando nome e status de identificação para apoiar a escolha. Ações: informar critérios de identificação, inclusive nome e status, consultar profissionais, selecionar o identificador do profissional e alterar a página da consulta quando necessário. Durante o carregamento, informa que a busca está em andamento e evita apresentar o resultado como concluído. Sem resultados, explica que nenhum profissional corresponde aos critérios informados. Em caso de erro, comunica a falha da consulta e permite que os critérios sejam revistos e a consulta repetida. Os controles têm rótulos claros, são operáveis por teclado, mantêm foco visível e anunciam carregamento, resultados, vazio e erro aos leitores de tela.",
    "contentRef": "listProfissional",
    "capabilityRefs": [
      "listProfissional",
      "setListProfissionalDetailsIdentificationName",
      "setListProfissionalDetailsIdentificationStatus",
      "setListProfissionalPage",
      "setListProfissionalId"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupSearchContent",
        "candidates": [
          "groupsearchcontent--ml-search-bar"
        ],
        "reason": "O nome de identificação é um critério textual para localizar profissionais e acionar a consulta."
      },
      {
        "groupId": "groupSelectOne",
        "candidates": [
          "groupselectone--ml-select"
        ],
        "reason": "O status de identificação é um critério de escolha única antes de consultar profissionais."
      },
      {
        "groupId": "groupViewTable",
        "candidates": [
          "groupviewtable--ml-data-table"
        ],
        "reason": "A resposta de listProfissional é uma coleção que precisa permitir leitura estruturada dos profissionais e pode acomodar a paginação existente."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "Os estados de carregamento, vazio e erro de listProfissional exigem retorno perceptível junto à consulta."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Objetivo: permitir que a recepcionista confira o nome do profissional selecionado antes de prosseguir com o agendamento. Informações: mostra o nome e o status de identificação do profissional obtido por listProfissional. Ação: leitura e conferência da identidade do profissional no contexto da consulta. Enquanto os dados carregam, anuncia que a conferência ainda não está disponível. Quando não há profissional retornado ou selecionado, informa que não existe nome para conferir. Se a consulta falhar, comunica o erro de modo perceptível. O nome e o status têm leitura clara para tecnologias assistivas, ordem de leitura previsível e atualização anunciada quando o profissional em contexto muda.",
    "contentRef": "listProfissional",
    "capabilityRefs": [
      "listProfissional"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewCard",
        "candidates": [
          "groupviewcard--ml-profile-card"
        ],
        "reason": "A conferência de uma pessoa a partir do resultado de listProfissional é compatível com a apresentação resumida de perfil."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "Os estados de carregamento, vazio e erro da consulta precisam ser comunicados durante a conferência."
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
      "l2/agendaClinica/web/shared/profissionais.ts"
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
      "_102040_/l2/molecules/groupselectone/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupSelectOne/usage.ts",
      "_102040_/l2/molecules/groupviewtable/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewTable/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts",
      "_102040_/l2/molecules/groupviewcard/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewCard/usage.ts"
    ]
  }
] as const;

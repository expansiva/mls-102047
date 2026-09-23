export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Objetivo: permitir que a recepcionista localize, por toque, o médico ou terapeuta para marcar a consulta. Informações: em espaço reduzido, o nome do profissional é priorizado, seguido do status de identificação. Ações: informar nome e status como critérios, consultar profissionais, tocar para selecionar o identificador do profissional e mudar a página da consulta quando necessário; essas capacidades são mantidas no celular. Durante o carregamento, anuncia que a busca está em andamento e não trata a lista como concluída. Sem resultados, informa que nenhum profissional corresponde aos critérios. Em caso de erro, comunica a falha e permite revisar os critérios e consultar novamente. Os alvos de toque são claros; leitores de tela recebem nome, status, carregamento, resultado, vazio e erro.",
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
        "reason": "O nome de identificação continua sendo o critério textual principal para localizar profissionais."
      },
      {
        "groupId": "groupSelectOne",
        "candidates": [
          "groupselectone--ml-segmented-control"
        ],
        "reason": "O status de identificação é uma escolha única que pode ser acessada de forma compacta por toque."
      },
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "A coleção retornada por listProfissional pode priorizar nome e status em uma leitura vertical adequada à tela estreita."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "Carregamento, vazio e erro de listProfissional precisam permanecer perceptíveis no fluxo de leitura móvel."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Objetivo: permitir que a recepcionista confira o nome do profissional escolhido no celular antes de seguir com o agendamento. Informações: prioriza o nome e apresenta o status de identificação retornado por listProfissional. Ação: leitura para confirmar a identidade do profissional, preservando a consulta que fornece esse contexto. Durante o carregamento, informa que os dados ainda não estão prontos. Se não houver profissional retornado ou selecionado, deixa claro que não há nome para conferir. Em caso de erro, comunica a falha de forma perceptível. O conteúdo tem ordem de leitura simples, texto acessível e anúncio quando o profissional em contexto é atualizado.",
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
        "reason": "A visualização resumida de perfil destaca o nome do profissional para conferência a partir de listProfissional."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "Os estados de carregamento, vazio e erro da consulta devem ser informados durante a conferência móvel."
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
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts",
      "_102040_/l2/molecules/groupviewcard/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewCard/usage.ts"
    ]
  }
] as const;

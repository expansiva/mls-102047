export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Permite à recepcionista localizar o médico ou terapeuta para o agendamento, consultando os profissionais conforme os dados de identificação informados. Exibe os resultados retornados pela consulta de profissionais e permite ajustar os dados de consulta disponíveis antes de realizá-la novamente. Durante o carregamento, comunica que a busca está em andamento; quando não houver resultados, informa que nenhum profissional foi encontrado; em falha, apresenta o erro da consulta e mantém a possibilidade de tentar novamente. Os campos e comandos devem ter nomes acessíveis, instruções para preenchimento obrigatório quando aplicável e retorno de status anunciado a tecnologias assistivas.",
    "contentRef": "listProfissional",
    "capabilityRefs": [
      "listProfissional",
      "setListProfissionalId",
      "setListProfissionalDetails",
      "setListProfissionalDetailsIdentification",
      "setListProfissionalDetailsIdentificationSubtype",
      "setListProfissionalDetailsIdentificationName",
      "setListProfissionalDetailsIdentificationStatus",
      "setListProfissionalDetailsIdentificationDocType",
      "setListProfissionalDetailsIdentificationDocId",
      "setListProfissionalDetailsIdentificationCountryCode",
      "setListProfissionalPage"
    ],
    "moleculeRecommendations": []
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Permite conferir o nome e os dados de identificação do profissional retornado pela consulta, para confirmar a pessoa que realizará a consulta. Reflete o carregamento da consulta de profissionais, informa de forma clara quando não houver profissional a apresentar e comunica erros com alternativa de nova consulta. A identificação exibida e os controles de consulta devem possuir rótulos acessíveis e mensagens de status perceptíveis por tecnologias assistivas.",
    "contentRef": "listProfissional",
    "capabilityRefs": [
      "listProfissional",
      "setListProfissionalId",
      "setListProfissionalDetails",
      "setListProfissionalDetailsIdentification",
      "setListProfissionalDetailsIdentificationSubtype",
      "setListProfissionalDetailsIdentificationName",
      "setListProfissionalDetailsIdentificationStatus",
      "setListProfissionalDetailsIdentificationDocType",
      "setListProfissionalDetailsIdentificationDocId",
      "setListProfissionalDetailsIdentificationCountryCode",
      "setListProfissionalPage"
    ],
    "moleculeRecommendations": []
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
      "_102020_/l2/agentDefsL2/skills/pageCategories/calendarScheduling.md"
    ]
  }
] as const;

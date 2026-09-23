export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Permite à recepcionista localizar, por toque e leitura priorizada, o médico ou terapeuta para o agendamento usando os dados de identificação disponíveis na consulta de profissionais. Os resultados retornados permanecem acessíveis em espaço reduzido, e os dados de consulta podem ser ajustados e reenviados. Durante o carregamento, comunica que a busca está em andamento; sem resultados, informa que nenhum profissional foi encontrado; em falha, apresenta o erro e mantém a opção de tentar novamente. Campos e comandos têm rótulos acessíveis, indicação de obrigatoriedade quando aplicável e anúncios de status para tecnologias assistivas.",
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
    "description": "Prioriza a conferência, em tela menor, do nome e dos dados de identificação do profissional retornado, ajudando a confirmar quem realizará a consulta. Mantém a consulta de profissionais e seus dados de entrada disponíveis por toque. Comunica carregamento, ausência de profissional e erro de consulta de forma clara, com nova tentativa possível. A identificação e os controles possuem rótulos acessíveis e mensagens de status anunciadas a tecnologias assistivas.",
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
      "_102020_/l2/agentDefsL2/skills/pageCategories/calendarScheduling.md"
    ]
  }
] as const;

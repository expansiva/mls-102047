export const descriptions = [
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Apresenta o cadastro de recepcionista para consulta, incluindo as informações retornadas dos registros de Profissional e Recepcionista. Enquanto a consulta estiver em carregamento, comunica o progresso; se não houver dados, informa que não há cadastro disponível; e, se ocorrer falha, apresenta o erro de consulta de forma acessível. As informações devem poder ser lidas por tecnologias assistivas.",
    "contentRef": "base",
    "capabilityRefs": [
      "listProfissional",
      "listRecepcionista"
    ],
    "moleculeRecommendations": []
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Permite informar e atualizar os dados de atuação na clínica para os registros de Profissional e Recepcionista, incluindo nome, país, documento quando aplicável, ocupação, consentimento de privacidade e os dados disponíveis de base, pessoa, gerais e agenda clínica. Identifica campos obrigatórios, associa rótulos e mensagens de validação aos campos e permite enviar a criação ou atualização correspondente. Durante o envio, comunica o processamento; após sucesso, atualiza a consulta relacionada; e, em caso de erro, expõe uma mensagem acessível para correção e nova tentativa.",
    "contentRef": "base",
    "capabilityRefs": [
      "createProfissional",
      "createRecepcionista",
      "updateProfissional",
      "updateRecepcionista"
    ],
    "moleculeRecommendations": []
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
      "_102020_/l2/agentDefsL2/skills/pageCategories/entityRecordManagement.md"
    ]
  }
] as const;

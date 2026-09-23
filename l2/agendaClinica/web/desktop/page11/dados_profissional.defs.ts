export const descriptions = [
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Permite ao profissional consultar os dados do seu cadastro de profissional retornados pela consulta. Enquanto a consulta estiver carregando, comunica o carregamento; quando não houver dados, informa a ausência de cadastro; e, em caso de erro, apresenta uma mensagem de falha associada à consulta. As informações devem ser legíveis e acessíveis por tecnologias assistivas, com o estado e as mensagens anunciados adequadamente.",
    "contentRef": "base",
    "capabilityRefs": [
      "listProfissional"
    ],
    "moleculeRecommendations": []
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Permite ao profissional informar ou alterar seus dados de atuação clínica: identificação, nome, tipo e número de documento, código do país, dados base, dados pessoais, ocupação, consentimento de privacidade, dados gerais e dados da agenda clínica, conforme aplicável. Nome, código do país, ocupação e os dados obrigatórios do registro precisam de validação e indicação acessível de campos obrigatórios ou inválidos. A pessoa pode criar o cadastro quando ainda não existir ou atualizar o registro selecionado; durante o envio, o progresso é comunicado, e falhas de criação ou atualização são apresentadas de forma compreensível e associada à ação. Após êxito, a consulta do cadastro é atualizada.",
    "contentRef": "base",
    "capabilityRefs": [
      "createProfissional",
      "updateProfissional",
      "listProfissional"
    ],
    "moleculeRecommendations": []
  }
] as const;

export const pipeline = [
  {
    "id": "dados_profissional__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/desktop/page11/dados_profissional.defs.ts",
    "outputPath": "l2/agendaClinica/web/desktop/page11/dados_profissional.ts",
    "dependsFiles": [
      "l2/agendaClinica/web/shared/dados_profissional.ts"
    ],
    "dependsOn": [
      "dados_profissional__l2_shared"
    ],
    "categoryRef": "entityRecordManagement",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/entityRecordManagement.md"
    ]
  }
] as const;

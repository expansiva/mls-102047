export const descriptions = [
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Prioriza a leitura do cadastro de recepcionista em espaço reduzido, mostrando as informações disponíveis dos registros de Profissional e Recepcionista. Comunica por texto acessível o carregamento, a ausência de dados e falhas de consulta. A consulta e a leitura por tecnologias assistivas permanecem disponíveis.",
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
    "description": "Permite preencher e atualizar por toque os dados de atuação na clínica para Profissional e Recepcionista, priorizando os campos obrigatórios de nome, país e ocupação e mantendo disponíveis documento, consentimento de privacidade e os demais dados previstos. Rótulos, obrigatoriedade, erros de validação e mensagens de envio devem ser acessíveis. Comunica processamento, sucesso com atualização da consulta e erros para correção e nova tentativa, sem remover as capacidades de criação e atualização.",
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
    "id": "dados_recepcionista__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/mobile/page11/dados_recepcionista.defs.ts",
    "outputPath": "l2/agendaClinica/web/mobile/page11/dados_recepcionista.ts",
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

export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Permite à recepcionista localizar pacientes já cadastrados para confirmar se podem ser usados no atendimento e evitar duplicidade. Prioriza a leitura dos critérios e dos resultados disponíveis em espaço reduzido, mantendo a consulta e a mudança de página por toque e teclado. Comunica carregamento, ausência de resultados e falha na consulta, com alternativa para tentar novamente e mensagens acessíveis a tecnologias assistivas.",
    "contentRef": "localizarPaciente",
    "capabilityRefs": [
      "listPaciente",
      "setListPacienteId",
      "setListPacienteDetailsIdentificationName",
      "setListPacienteDetailsIdentificationDocType",
      "setListPacienteDetailsIdentificationDocId",
      "setListPacienteDetailsIdentificationCountryCode",
      "setListPacientePage"
    ],
    "moleculeRecommendations": []
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Permite conferir os dados de identificação disponíveis do paciente localizado, priorizando nome e dados retornados para leitura em tela menor. Mantém a consulta e a alteração de critérios por toque e teclado; informa carregamento, ausência de paciente correspondente e falha, com possibilidade de nova consulta. As informações e mensagens permanecem acessíveis para leitores de tela.",
    "contentRef": "localizarPaciente",
    "capabilityRefs": [
      "listPaciente",
      "setListPacienteId",
      "setListPacienteDetailsIdentificationName",
      "setListPacienteDetailsIdentificationDocType",
      "setListPacienteDetailsIdentificationDocId",
      "setListPacienteDetailsIdentificationCountryCode"
    ],
    "moleculeRecommendations": []
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Coleta os dados do novo paciente para associá-lo à clínica, com prioridade para os obrigatórios: dados cadastrais, nome e código do país. Mantém disponíveis os campos opcionais de documento, aliases e observações, com interação por toque e teclado. Indica obrigatoriedade e erros de validação, preserva valores durante o envio e informa processamento, sucesso ou falha de modo acessível.",
    "contentRef": "createPaciente",
    "capabilityRefs": [
      "setCreatePacienteDetails",
      "setCreatePacienteDetailsIdentification",
      "setCreatePacienteDetailsIdentificationName",
      "setCreatePacienteDetailsIdentificationDocType",
      "setCreatePacienteDetailsIdentificationDocId",
      "setCreatePacienteDetailsIdentificationCountryCode",
      "setCreatePacienteDetailsBase",
      "setCreatePacienteDetailsBaseAliases",
      "setCreatePacienteDetailsBaseNotes",
      "createPaciente"
    ],
    "moleculeRecommendations": []
  },
  {
    "organismId": "organism.actions.1",
    "kind": "actions",
    "description": "Oferece a ação de registrar o paciente após o preenchimento dos dados, tornando-o disponível para receber consultas. Em tela menor, mantém o comando claramente identificável e acionável por toque e teclado. Informa envio em andamento, confirma a criação do cadastro e comunica falhas para correção e nova tentativa, com anúncio acessível do estado.",
    "contentRef": "createPaciente",
    "capabilityRefs": [
      "createPaciente"
    ],
    "moleculeRecommendations": []
  }
] as const;

export const pipeline = [
  {
    "id": "pacientes__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/mobile/page11/pacientes.defs.ts",
    "outputPath": "l2/agendaClinica/web/mobile/page11/pacientes.ts",
    "dependsFiles": [
      "l2/agendaClinica/web/shared/pacientes.ts"
    ],
    "dependsOn": [
      "pacientes__l2_shared"
    ],
    "categoryRef": "masterDataManagement",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/masterDataManagement.md"
    ]
  }
] as const;

export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Permite à recepcionista localizar pacientes já cadastrados para confirmar se podem ser usados no atendimento e evitar duplicidade. Consulta os resultados de pacientes conforme os dados informados; comunica carregamento, ausência de resultados e falha na consulta, com alternativa para tentar novamente. Os critérios e os resultados devem ser acessíveis por teclado e ter rótulos e mensagens anunciáveis por tecnologias assistivas.",
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
    "description": "Permite conferir os dados de identificação disponíveis do paciente localizado, incluindo nome, tipo e número de documento e código do país quando retornados. Enquanto a consulta estiver em andamento, informa o carregamento; se não houver paciente correspondente, esclarece a ausência de resultado; se houver erro, apresenta a falha e permite nova consulta. As informações e a mudança de critério devem ser compreensíveis por leitores de tela e operáveis por teclado.",
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
    "description": "Coleta os dados do novo paciente para associá-lo à clínica: dados cadastrais, nome e código do país são obrigatórios; tipo e número de documento, aliases e observações podem ser informados quando aplicável. Indica claramente campos obrigatórios e erros de validação, preserva os valores durante o envio e informa o processamento, o sucesso ou a falha do cadastro. Todos os campos possuem rótulos, instruções e mensagens de erro acessíveis.",
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
    "description": "Oferece a ação de registrar o paciente após o preenchimento dos dados, tornando-o disponível para receber consultas. A ação informa que o envio está em andamento, confirma a conclusão quando o cadastro é criado e comunica qualquer erro para que a recepcionista possa corrigir os dados e tentar novamente. O comando é acionável por teclado e seu estado é anunciado de forma acessível.",
    "contentRef": "createPaciente",
    "capabilityRefs": [
      "createPaciente"
    ],
    "moleculeRecommendations": []
  }
] as const;

export const pipeline = [
  {
    "id": "pacientes__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/desktop/page11/pacientes.defs.ts",
    "outputPath": "l2/agendaClinica/web/desktop/page11/pacientes.ts",
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

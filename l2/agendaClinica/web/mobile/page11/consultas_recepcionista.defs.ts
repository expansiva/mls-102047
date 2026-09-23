export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Apresenta as consultas da clínica com prioridade para os dados necessários à localização e para os horários registrados. A recepcionista pode usar os critérios disponíveis de identificação, paciente, profissional, data e horário e situação, além da página da consulta, e executar a busca por toque ou teclado. Em espaço reduzido, mantém a leitura dos dados de cada consulta e o acesso aos critérios sem retirar nenhuma capacidade. Comunica carregamento, ausência de resultados e erro da consulta, com nova tentativa; controles, resultados e mudanças de estado têm rótulos e anúncios acessíveis.",
    "contentRef": "base",
    "capabilityRefs": [
      "setListConsultaId",
      "setListConsultaPatientId",
      "setListConsultaProfessionalId",
      "setListConsultaScheduledAt",
      "setListConsultaStatus",
      "setListConsultaPage",
      "listConsulta"
    ],
    "moleculeRecommendations": []
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Permite abrir e conferir, em leitura prioritária, os dados disponíveis da consulta selecionada: paciente, profissional, data, horário e situação. A seleção prepara a confirmação telefônica ou o registro de falta. Em carregamento, vazio ou erro, informa claramente o estado e permite nova consulta quando houver falha. A navegação por toque e teclado deve preservar a seleção e fornecer nomes e estados acessíveis para os dados exibidos.",
    "contentRef": "base",
    "capabilityRefs": [
      "listConsulta",
      "setConfirmarConsultaId",
      "setRegistrarFaltaId"
    ],
    "moleculeRecommendations": []
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Permite agendar uma consulta no celular selecionando paciente e profissional, informando data e horário e a situação obrigatória. Mantém disponíveis as consultas de pacientes, profissionais e horários registrados para verificar a disponibilidade antes de criar o agendamento. Os campos obrigatórios são informados e validados de forma acessível. Durante o envio, comunica o processamento e evita duplicação; após sucesso, informa o resultado e atualiza as consultas; em erro, explica a falha e mantém os valores para correção e reenvio. Todos os campos, escolhas e mensagens devem ser operáveis por toque, teclado e leitor de tela.",
    "contentRef": "createConsulta",
    "capabilityRefs": [
      "setCreateConsultaPatientId",
      "setCreateConsultaProfessionalId",
      "setCreateConsultaScheduledAt",
      "setCreateConsultaStatus",
      "listPaciente",
      "listProfissional",
      "setListConsultaProfessionalId",
      "setListConsultaScheduledAt",
      "listConsulta",
      "createConsulta"
    ],
    "moleculeRecommendations": []
  },
  {
    "organismId": "organism.actions.1",
    "kind": "actions",
    "description": "Disponibiliza, para a consulta selecionada, as ações de confirmar por telefone e registrar falta do paciente, com indicação clara da consulta que será atualizada. Em área reduzida, mantém as duas ações por toque e teclado sem remover suas capacidades. Antes da execução, comunica o efeito da ação; durante o processamento, evita repetição; após sucesso, anuncia o resultado e atualiza as consultas; se ocorrer erro, apresenta a falha e permite nova tentativa. Os acionadores, estados e mensagens devem ter nomes e anúncios acessíveis.",
    "contentRef": "base",
    "capabilityRefs": [
      "setConfirmarConsultaId",
      "confirmarConsulta",
      "setRegistrarFaltaId",
      "registrarFalta"
    ],
    "moleculeRecommendations": []
  }
] as const;

export const pipeline = [
  {
    "id": "consultas_recepcionista__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/mobile/page11/consultas_recepcionista.defs.ts",
    "outputPath": "l2/agendaClinica/web/mobile/page11/consultas_recepcionista.ts",
    "dependsFiles": [
      "l2/agendaClinica/web/shared/consultas_recepcionista.ts"
    ],
    "dependsOn": [
      "consultas_recepcionista__l2_shared"
    ],
    "categoryRef": "calendarScheduling",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/calendarScheduling.md"
    ]
  }
] as const;

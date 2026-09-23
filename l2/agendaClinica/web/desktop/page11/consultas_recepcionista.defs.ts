export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Apresenta as consultas da clínica para que a recepcionista localize consultas e verifique os horários registrados, inclusive ao informar os critérios disponíveis de consulta: identificação, paciente, profissional, data e horário e situação. Permite ajustar esses critérios e a página da consulta e executar a busca. Enquanto a busca estiver em andamento, comunica o carregamento; se não houver resultados, informa que nenhuma consulta foi encontrada; se falhar, apresenta o erro da consulta e permite tentar novamente. Os controles de busca e os resultados devem ser utilizáveis por teclado, com rótulos acessíveis e anúncio das mudanças de carregamento, vazio e erro.",
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
    "description": "Exibe os dados da consulta localizada para conferência antes de uma ação contextual: paciente, profissional, data, horário e situação disponíveis no resultado da consulta. A recepcionista pode percorrer e selecionar uma consulta para conferir suas informações e preparar a confirmação por telefone ou o registro de falta. Durante o carregamento, informa que os dados estão sendo consultados; quando não houver consulta correspondente, apresenta o estado vazio; em erro, comunica a falha e oferece nova tentativa. A seleção e a leitura dos dados devem funcionar por teclado e expor nome e estado acessíveis.",
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
    "description": "Permite marcar uma consulta selecionando paciente e profissional, informando data e horário e a situação exigida para o novo registro. Disponibiliza a consulta de pacientes e profissionais para apoiar as escolhas e a consulta de horários já registrados do profissional na data pretendida, de modo que o agendamento só seja concluído se o horário estiver disponível. Valida os campos obrigatórios antes do envio. Durante o envio, informa o processamento e evita reenvio; ao concluir, comunica o resultado e atualiza a lista de consultas; se houver erro, mostra a falha associada ao agendamento e preserva os dados para correção e nova tentativa. Rótulos, obrigatoriedade, erros e resultado devem ser acessíveis a teclado e leitores de tela.",
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
    "description": "Oferece ações contextuais para a consulta selecionada: registrar que ela foi confirmada por telefone ou registrar a falta do paciente. As ações exigem uma consulta selecionada e devem deixar claro qual atualização será executada antes da confirmação. Enquanto cada ação estiver sendo processada, comunica o andamento e evita repetição; ao concluir, informa o resultado e atualiza as consultas; em falha, apresenta o erro correspondente e permite nova tentativa. Ambas as ações devem estar disponíveis por teclado, ter nome acessível e anunciar resultados e erros.",
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
    "id": "consultas_recepcionista__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/desktop/page11/consultas_recepcionista.defs.ts",
    "outputPath": "l2/agendaClinica/web/desktop/page11/consultas_recepcionista.ts",
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

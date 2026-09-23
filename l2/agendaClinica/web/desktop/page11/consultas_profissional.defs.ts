export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Apresenta as consultas do dia vinculadas ao profissional autenticado para localizar a própria agenda. Exibe os dados retornados da consulta, incluindo o horário e a situação disponível, e permite escolher uma consulta para conferência. Enquanto a consulta da agenda é carregada, comunica o carregamento; quando não houver consultas do dia, informa a ausência de resultados; se a consulta falhar, apresenta o erro associado e mantém uma forma acessível de tentar novamente. A lista e a seleção devem ser utilizáveis por teclado e expor nomes e estados compreensíveis a tecnologias assistivas.",
    "contentRef": "base",
    "capabilityRefs": [
      "listConsulta"
    ],
    "moleculeRecommendations": []
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Mostra os dados da consulta escolhida para o profissional conferir o paciente e o horário antes de registrar o atendimento. Usa os dados da agenda já consultada e deixa clara a situação da consulta. Enquanto os dados da agenda estiverem carregando, informa esse estado; na ausência de consultas, não apresenta detalhe selecionável; se ocorrer erro na consulta, comunica o problema de modo acessível. A mudança de consulta e a leitura dos dados devem funcionar por teclado e ter rótulos compreensíveis para tecnologias assistivas.",
    "contentRef": "base",
    "capabilityRefs": [
      "listConsulta"
    ],
    "moleculeRecommendations": []
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Permite registrar o atendimento da consulta própria selecionada. Solicita os detalhes obrigatórios do atendimento e oferece a anotação do profissional como informação opcional; o identificador da consulta vem da seleção e não é editável. Impede o envio enquanto o detalhe obrigatório não estiver informado ou não houver consulta selecionada. Durante o registro, comunica o processamento e evita reenvio; em caso de erro, apresenta a mensagem associada preservando o que foi digitado; após sucesso, comunica a conclusão e a agenda é atualizada. Todos os campos, obrigatoriedade, erros e instruções devem estar disponíveis a teclado e tecnologias assistivas.",
    "contentRef": "registrarAtendimento",
    "capabilityRefs": [
      "setRegistrarAtendimentoId",
      "setRegistrarAtendimentoDetails",
      "setRegistrarAtendimentoDetailsAttendanceNote",
      "registrarAtendimento"
    ],
    "moleculeRecommendations": []
  },
  {
    "organismId": "organism.actions.1",
    "kind": "actions",
    "description": "Oferece a ação de marcar como atendida a consulta própria selecionada, usando os dados preenchidos no registro. A ação só fica disponível quando houver uma consulta selecionada e os detalhes obrigatórios estiverem informados. Durante o envio, comunica que o atendimento está sendo registrado e previne acionamentos repetidos; no erro, informa a falha de modo acessível e permite nova tentativa; no sucesso, confirma o registro e atualiza a agenda diária. O comando deve ter nome claro, receber foco por teclado e anunciar mudanças de estado para tecnologias assistivas.",
    "contentRef": "registrarAtendimento",
    "capabilityRefs": [
      "registrarAtendimento"
    ],
    "moleculeRecommendations": []
  }
] as const;

export const pipeline = [
  {
    "id": "consultas_profissional__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/desktop/page11/consultas_profissional.defs.ts",
    "outputPath": "l2/agendaClinica/web/desktop/page11/consultas_profissional.ts",
    "dependsFiles": [
      "l2/agendaClinica/web/shared/consultas_profissional.ts"
    ],
    "dependsOn": [
      "consultas_profissional__l2_shared"
    ],
    "categoryRef": "calendarScheduling",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/calendarScheduling.md"
    ]
  }
] as const;

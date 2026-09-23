export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Prioriza a leitura das próprias consultas do dia em espaço reduzido, mostrando os dados retornados da consulta, incluindo horário e situação disponível, e permitindo tocar ou usar teclado para escolher uma consulta. Durante o carregamento da agenda, comunica o estado; se não houver consultas, informa a ausência de resultados; se a consulta falhar, apresenta o erro associado e permite tentar novamente de forma acessível. Os itens devem ter alvos de toque claros, nomes compreensíveis e suporte a tecnologias assistivas.",
    "contentRef": "base",
    "capabilityRefs": [
      "listConsulta"
    ],
    "moleculeRecommendations": []
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Exibe os dados da consulta escolhida com prioridade para paciente, horário e situação, para que o profissional os confira antes de registrar o atendimento. Usa os dados da agenda consultada; enquanto eles carregam, comunica o carregamento; sem consultas, não oferece detalhe selecionável; em caso de erro, informa o problema de forma acessível. A troca de consulta e a leitura do detalhe devem funcionar por toque, teclado e tecnologias assistivas.",
    "contentRef": "base",
    "capabilityRefs": [
      "listConsulta"
    ],
    "moleculeRecommendations": []
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Em espaço reduzido, permite preencher os detalhes obrigatórios do atendimento e, se necessário, a anotação opcional do profissional para a consulta selecionada; o identificador vem da seleção e não pode ser alterado. Indica obrigatoriedade e valida os dados antes do envio. Durante o registro, comunica o processamento e evita reenvio; se houver erro, apresenta-o sem descartar o preenchimento; após sucesso, confirma o resultado e a agenda é atualizada. Campos, validações e mensagens devem funcionar por toque, teclado e tecnologias assistivas.",
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
    "description": "Disponibiliza o comando para marcar como atendida a consulta própria selecionada, após o preenchimento dos detalhes obrigatórios. Mantém o comando indisponível sem consulta selecionada ou sem os detalhes necessários. Ao tocar ou acionar pelo teclado, comunica o andamento, impede envios duplicados, informa eventuais erros e permite nova tentativa; quando concluído, confirma o atendimento e atualiza a agenda. O comando deve ter rótulo claro, alvo de toque adequado e anúncios acessíveis de estado.",
    "contentRef": "registrarAtendimento",
    "capabilityRefs": [
      "registrarAtendimento"
    ],
    "moleculeRecommendations": []
  }
] as const;

export const pipeline = [
  {
    "id": "consultas_profissional__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/mobile/page11/consultas_profissional.defs.ts",
    "outputPath": "l2/agendaClinica/web/mobile/page11/consultas_profissional.ts",
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

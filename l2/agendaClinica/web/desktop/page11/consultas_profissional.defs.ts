export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Apresenta as consultas do dia vinculadas ao profissional autenticado, com informações disponíveis de horário e situação para localizar uma consulta. Comunica carregamento durante a consulta, ausência de consultas quando o resultado estiver vazio e falha quando a consulta não puder ser obtida. Os itens devem ter nome e estado compreensíveis por tecnologias assistivas e permitir abrir a consulta pelo teclado.",
    "contentRef": "base",
    "capabilityRefs": [
      "listConsulta"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "A consulta retorna uma coleção de consultas do dia que precisa ser examinada de forma escaneável."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Exibe os dados disponíveis da consulta selecionada para que o profissional confira paciente, horário e situação antes de registrar o atendimento. Enquanto os dados da agenda carregam, informa o progresso; se não houver consulta disponível, comunica isso claramente; se ocorrer erro na consulta, apresenta uma mensagem compreensível. O conteúdo deve manter rótulos acessíveis e leitura sequencial clara por teclado e leitor de tela.",
    "contentRef": "base",
    "capabilityRefs": [
      "listConsulta"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewCard",
        "candidates": [
          "groupviewcard--ml-view-card-horizontal"
        ],
        "reason": "Os dados de uma consulta podem ser apresentados como uma unidade independente com metadados e ação contextual."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Permite preencher os detalhes obrigatórios do atendimento e, opcionalmente, a anotação sobre o que aconteceu na consulta selecionada. Identifica campos obrigatórios, associa rótulos e mensagens de validação aos respectivos campos e preserva o que foi digitado em caso de falha. Enquanto o registro é enviado, informa o andamento; após sucesso ou erro, comunica o resultado de forma acessível.",
    "contentRef": "registrarAtendimento",
    "capabilityRefs": [
      "setRegistrarAtendimentoDetails",
      "setRegistrarAtendimentoDetailsAttendanceNote"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupEnterText",
        "candidates": [
          "groupentertext--ml-multiline-text"
        ],
        "reason": "Detalhes e anotação de atendimento são entradas textuais que podem exigir descrição livre."
      }
    ]
  },
  {
    "organismId": "organism.actions.1",
    "kind": "actions",
    "description": "Disponibiliza o comando para marcar a consulta selecionada como atendida depois que os detalhes obrigatórios estiverem preenchidos. A ação deve indicar claramente quando está indisponível, em envio, concluída ou com erro; ao concluir, a agenda é atualizada. O comando precisa ter rótulo acessível, ser acionável por teclado e anunciar seu resultado para tecnologias assistivas.",
    "contentRef": "registrarAtendimento",
    "capabilityRefs": [
      "registrarAtendimento"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "O registro de atendimento é um comando explícito de confirmação."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "O status de sucesso ou erro do comando precisa de retorno contextual e acessível."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "consultas_profissional__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/agendaClinica/web/desktop/page11/consultas_profissional.defs.ts",
    "outputPath": "l2/agendaClinica/web/desktop/page11/consultas_profissional.ts",
    "dependsFiles": [
      "l2/agendaClinica/web/shared/consultas_profissional.ts",
      "l2/designSystem.ts"
    ],
    "dependsOn": [
      "consultas_profissional__l2_shared"
    ],
    "categoryRef": "calendarScheduling",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/calendarScheduling.md",
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
      "_102040_/l2/molecules/groupviewcard/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewCard/usage.ts",
      "_102040_/l2/molecules/groupentertext/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterText/usage.ts",
      "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts"
    ]
  }
] as const;

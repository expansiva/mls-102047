export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Prioriza a leitura rápida das próprias consultas do dia em uma sequência fácil de percorrer por toque, deixando horário e identificação disponível da consulta claros para localizar o atendimento. Informa carregamento durante a consulta, estado vazio quando não houver consultas retornadas e erro com orientação para tentar novamente. Os itens e estados devem ter alvos de toque adequados, ordem de leitura lógica e anúncios acessíveis.",
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
        "reason": "A lista vertical preserva a leitura escaneável das consultas em espaço reduzido."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "O status de consulta possui estado de carregamento de duração não definida."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-notify-banner"
        ],
        "reason": "O estado de erro da consulta precisa ser comunicado de forma perceptível e acessível."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Mostra, com prioridade para paciente e horário, os dados disponíveis da consulta escolhida para conferência antes do atendimento. A leitura continua restrita às consultas retornadas para o próprio profissional. Enquanto a agenda é carregada, informa indisponibilidade temporária dos dados; se a consulta não estiver disponível ou houver erro, comunica a condição sem tratar dados ausentes como confirmados. O conteúdo deve ser legível em tela estreita, acessível por leitor de tela e acionável por toque quando aplicável.",
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
        "reason": "É compatível com uma apresentação compacta dos dados disponíveis da consulta para conferência."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Permite registrar os detalhes obrigatórios do atendimento e uma anotação opcional da consulta selecionada, com foco no preenchimento sequencial em tela reduzida. Explica obrigatoriedade e erros junto aos campos, não permite o envio sem a consulta selecionada e os detalhes exigidos, preserva o texto em caso de falha e informa processamento e conclusão. Os campos devem ter rótulos associados, foco visível, teclado apropriado e mensagens anunciadas para tecnologias assistivas.",
    "contentRef": "registrarAtendimento",
    "capabilityRefs": [
      "setRegistrarAtendimentoDetails",
      "setRegistrarAtendimentoDetailsAttendanceNote",
      "registrarAtendimento"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupEnterText",
        "candidates": [
          "groupentertext--ml-multiline-text"
        ],
        "reason": "Os detalhes e a anotação são entradas textuais de atendimento que podem exigir texto livre extenso."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "O comando possui estados de erro e sucesso que exigem retorno contextual ao preenchimento."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "O comando de registro expõe um estado de carregamento sem progresso mensurável."
      }
    ]
  },
  {
    "organismId": "organism.actions.1",
    "kind": "actions",
    "description": "Disponibiliza por toque a confirmação para marcar como atendida a consulta selecionada, depois que os dados obrigatórios estiverem prontos. Mantém a ação indisponível quando não puder ser enviada, evita toques repetidos durante o processamento e informa andamento, falha recuperável e sucesso. O controle deve ter rótulo claro, área de toque adequada, estado desabilitado compreensível e anúncios acessíveis do resultado; após sucesso, a agenda é atualizada.",
    "contentRef": "registrarAtendimento",
    "capabilityRefs": [
      "setRegistrarAtendimentoId",
      "registrarAtendimento"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "Há um comando principal explícito para registrar o atendimento."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-toast-notification"
        ],
        "reason": "O resultado de sucesso ou erro do comando deve ser comunicado ao profissional."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "O status do comando informa processamento em andamento."
      }
    ]
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
      "_102020_/l2/agentDefsL2/skills/pageCategories/calendarScheduling.md",
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
      "_102040_/l2/molecules/groupshowprogress/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupShowProgress/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts",
      "_102040_/l2/molecules/groupviewcard/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewCard/usage.ts",
      "_102040_/l2/molecules/groupentertext/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterText/usage.ts",
      "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts"
    ]
  }
] as const;

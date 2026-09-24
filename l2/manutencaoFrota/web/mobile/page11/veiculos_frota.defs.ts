export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Prioriza a localização e a leitura rápida dos veículos da frota em espaço reduzido, preservando a navegação entre páginas de resultados. Ao tocar ou usar teclado para mudar a página, atualiza a coleção e anuncia carregamento, ausência de veículos ou erro com possibilidade de nova tentativa. Cada resultado e controle possui nome acessível e foco utilizável sem gesto exclusivo.",
    "contentRef": "base",
    "capabilityRefs": [
      "listVehicle",
      "setListVehiclePage"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewTable",
        "candidates": [
          "groupviewtable--ml-responsive-table"
        ],
        "reason": "A coleção de veículos precisa continuar legível em telas estreitas."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Mostra primeiro os dados operacionais do veículo e permite consultar os planos preventivos e as ordens relacionadas sem perder o contexto do veículo. Em tela pequena, a leitura privilegia os dados essenciais; carregamento, listas sem resultados e erros das consultas continuam explicitamente informados. A interação por toque tem alternativa por teclado, e as mudanças de conteúdo são anunciadas de forma acessível.",
    "contentRef": "base",
    "capabilityRefs": [
      "listVehicle",
      "listMaintenancePlan",
      "listMaintenanceOrder"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "As coleções de planos e ordens podem ser percorridas em uma sequência legível em tela estreita."
      }
    ]
  },
  {
    "organismId": "organism.highlights.1",
    "kind": "highlights",
    "description": "Dá prioridade à situação preventiva do veículo, incluindo o aviso derivado de quilometragem vencida e os próximos dados preventivos disponíveis. Mantém mensagens claras para carregamento, indisponibilidade de dados e erro das consultas, sem inferir uma situação não fornecida. O aviso é textual e anunciado por leitores de tela, além de ser perceptível sem depender somente de cor.",
    "contentRef": "base",
    "capabilityRefs": [
      "listVehicle",
      "listMaintenancePlan"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewMetric",
        "candidates": [
          "groupviewmetric--ml-metric-card"
        ],
        "reason": "Os dados derivados de vencimento e próxima preventiva são indicadores relevantes para consulta rápida."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Permite informar, por toque ou teclado, os critérios operacionais usados para localizar o veículo: identificação, subtipo, nome, situação e código do país. Em espaço reduzido, a leitura segue a ordem dos campos e cada requisito ou erro é anunciado junto ao campo correspondente. O contrato disponível não inclui gravação de cadastro ou alteração de veículo: os valores apenas atualizam os critérios da consulta antes de localizar o veículo.",
    "contentRef": "base",
    "capabilityRefs": [
      "setListVehicleDetailsIdentification",
      "setListVehicleDetailsIdentificationSubtype",
      "setListVehicleDetailsIdentificationName",
      "setListVehicleDetailsIdentificationStatus",
      "setListVehicleDetailsIdentificationCountryCode",
      "listVehicle"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupEnterText",
        "candidates": [
          "groupentertext--ml-enter-text"
        ],
        "reason": "Identificação, subtipo, nome, situação e código do país são critérios textuais da consulta."
      }
    ]
  },
  {
    "organismId": "organism.actions.1",
    "kind": "actions",
    "description": "Permite iniciar a abertura da ordem por defeito ou o cadastro do plano preventivo, mantendo os mesmos requisitos de dados da versão desktop. O envio informa progresso, impede repetição enquanto estiver em andamento e comunica sucesso ou erro de modo acessível; após êxito, as consultas de ordens, planos ou veículos previstas são atualizadas. Os acionadores têm rótulos explícitos e áreas adequadas ao toque, sem excluir o uso por teclado.",
    "contentRef": "base",
    "capabilityRefs": [
      "createMaintenanceOrder",
      "createMaintenancePlan",
      "listMaintenanceOrder",
      "listMaintenancePlan",
      "listVehicle"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "Os comandos de criar ordem e plano requerem acionamento explícito com estado de envio."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "O retorno de êxito ou erro deve permanecer associado ao comando em execução."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "veiculos_frota__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/manutencaoFrota/web/mobile/page11/veiculos_frota.defs.ts",
    "outputPath": "l2/manutencaoFrota/web/mobile/page11/veiculos_frota.ts",
    "dependsFiles": [
      "l2/manutencaoFrota/web/shared/veiculos_frota.ts",
      "l2/designSystem.ts"
    ],
    "dependsOn": [
      "veiculos_frota__l2_shared"
    ],
    "categoryRef": "assetManagement",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/assetManagement.md",
      "_102040_/l2/molecules/groupviewtable/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewTable/usage.ts",
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
      "_102040_/l2/molecules/groupviewmetric/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewMetric/usage.ts",
      "_102040_/l2/molecules/groupentertext/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterText/usage.ts",
      "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts"
    ]
  }
] as const;

export const descriptions = [
  {
    "organismId": "organism.summary.1",
    "kind": "summary",
    "description": "Apresenta ao gestor um resumo de ordens de manutenção, planos preventivos e veículos da organização, incluindo informações derivadas sobre conclusão de ordens, próxima preventiva e pendências por quilometragem. Em espaço reduzido, prioriza a leitura dos indicadores essenciais e mantém a atualização pelos resultados das consultas disponíveis. Enquanto os dados são consultados, informa carregamento; se não houver registros, comunica a ausência de dados; se uma consulta falhar, expõe uma mensagem de erro acessível. Os valores e rótulos devem ser compreensíveis por leitores de tela e utilizáveis por toque e teclado.",
    "contentRef": "base",
    "capabilityRefs": [
      "listMaintenanceOrder",
      "listMaintenancePlan",
      "listVehicle"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewMetric",
        "candidates": [
          "groupviewmetric--ml-metric-big-number"
        ],
        "reason": "Um indicador prioritário é compatível com o resumo consultado e favorece leitura rápida em tela reduzida."
      }
    ]
  },
  {
    "organismId": "organism.highlights.1",
    "kind": "highlights",
    "description": "Evidencia manutenções concluídas, preventivas próximas e preventivas vencidas a partir das ordens e dos planos de manutenção consultados. Em tela reduzida, prioriza os destaques que demandam leitura imediata, sem remover a atualização pelos resultados das consultas. Informa carregamento durante a busca, uma situação vazia quando não existirem destaques e erro acessível quando não for possível obter os dados. A leitura dos estados e das informações deve funcionar por tecnologias assistivas, toque e navegação por teclado.",
    "contentRef": "base",
    "capabilityRefs": [
      "listMaintenanceOrder",
      "listMaintenancePlan"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewMetric",
        "candidates": [
          "groupviewmetric--ml-metric-card"
        ],
        "reason": "Os destaques representam indicadores derivados das ordens e dos planos consultados."
      }
    ]
  },
  {
    "organismId": "organism.alerts.1",
    "kind": "alerts",
    "description": "Comunica preventivas vencidas e próximas manutenções considerando data ou quilometragem, com base nos planos preventivos e nos veículos consultados. Em tela reduzida, prioriza alertas vencidos e próximos para leitura rápida, preservando os resultados das consultas. Durante o carregamento, indica que os alertas estão sendo obtidos; sem ocorrências, informa que não há alertas; em caso de falha, apresenta erro acessível. Cada informação precisa ter descrição clara para leitores de tela e receber foco por teclado quando interativa.",
    "contentRef": "base",
    "capabilityRefs": [
      "listMaintenancePlan",
      "listVehicle"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "Os alertas correspondem a múltiplas ocorrências de planos e veículos e podem ser percorridos com leitura adequada em tela reduzida."
      }
    ]
  },
  {
    "organismId": "organism.inbox.1",
    "kind": "inbox",
    "description": "Reúne ordens e cadastros da frota que precisam de acompanhamento, usando os resultados disponíveis de ordens de manutenção e veículos. Em tela reduzida, mantém a leitura sequencial dos itens e a atualização pelos resultados das consultas. Exibe carregamento enquanto a consulta estiver em andamento, uma mensagem de ausência quando não houver itens e erro acessível quando a obtenção falhar. Os itens e seus estados devem possuir rótulos claros para leitores de tela e suporte à navegação por toque e teclado.",
    "contentRef": "base",
    "capabilityRefs": [
      "listMaintenanceOrder",
      "listVehicle"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "Ordens e veículos que exigem acompanhamento formam uma coleção de registros apropriada para leitura sequencial."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "gestor_inicio__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/manutencaoFrota/web/mobile/page11/gestor_inicio.defs.ts",
    "outputPath": "l2/manutencaoFrota/web/mobile/page11/gestor_inicio.ts",
    "dependsFiles": [
      "l2/manutencaoFrota/web/shared/gestor_inicio.ts",
      "l2/designSystem.ts"
    ],
    "dependsOn": [
      "gestor_inicio__l2_shared"
    ],
    "categoryRef": "dashboardCommandCenter",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/dashboardCommandCenter.md",
      "_102040_/l2/molecules/groupviewmetric/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewMetric/usage.ts",
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts"
    ]
  }
] as const;

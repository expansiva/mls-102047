export const descriptions = [
  {
    "organismId": "organism.summary.1",
    "kind": "summary",
    "description": "Prioriza a leitura do resumo dos veículos atribuídos em espaço reduzido, com informações retornadas pela consulta disponíveis para toque e leitura sequencial. Ao consultar, comunica carregamento; se não houver veículos retornados, informa que não há veículos atribuídos para exibir; em falha, apresenta a indisponibilidade da consulta. Estados e rótulos devem ser anunciados por tecnologias assistivas, com interação acessível por toque e teclado externo.",
    "contentRef": "base",
    "capabilityRefs": [
      "listVehicle"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-card-grid"
        ],
        "reason": "A consulta retorna vários veículos, e o candidato permite resumir os registros de forma adaptável ao espaço móvel."
      }
    ]
  },
  {
    "organismId": "organism.highlights.1",
    "kind": "highlights",
    "description": "Dá prioridade aos destaques de preventiva por quilometragem vencida nos veículos retornados, preservando leitura clara em tela menor. Sinaliza carregamento da consulta, informa a ausência de veículos ou destaques sem criar resultados e comunica erros de forma acessível. Os destaques devem ter rótulos claros, ordem de leitura coerente e suporte a toque, leitor de tela e teclado externo.",
    "contentRef": "base",
    "capabilityRefs": [
      "listVehicle"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "Os destaques vinculados aos veículos retornados podem ser percorridos em uma lista escaneável e apropriada a telas estreitas."
      }
    ]
  },
  {
    "organismId": "organism.alerts.1",
    "kind": "alerts",
    "description": "Mantém em destaque os alertas de preventiva por quilometragem encontrados nos veículos atribuídos retornados pela consulta. Enquanto carrega, anuncia o andamento; quando não houver veículos ou alertas aplicáveis, informa o estado vazio; e, em erro, comunica a falha. Cada alerta deve ser compreensível por leitor de tela e acessível por toque e teclado externo, sem indicar ações corretivas não declaradas.",
    "contentRef": "base",
    "capabilityRefs": [
      "listVehicle"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "A lista vertical favorece a consulta dos alertas associados aos registros de veículos em espaço móvel."
      }
    ]
  },
  {
    "organismId": "organism.inbox.1",
    "kind": "inbox",
    "description": "Apresenta com prioridade as pendências de registro de abastecimento que forem disponibilizadas pela consulta de veículos, respeitando o espaço móvel. Comunica carregamento, ausência de itens e falha da consulta de modo claro. Os itens devem ter identificação textual e leitura sequencial acessível por toque, leitor de tela e teclado externo; não são presumidas ações de registro que não estejam declaradas.",
    "contentRef": "base",
    "capabilityRefs": [
      "listVehicle"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "Pendências apresentadas como coleção de registros são melhor percorridas em uma lista vertical adaptável ao contexto móvel."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "motorista_inicio__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/manutencaoFrota/web/mobile/page11/motorista_inicio.defs.ts",
    "outputPath": "l2/manutencaoFrota/web/mobile/page11/motorista_inicio.ts",
    "dependsFiles": [
      "l2/manutencaoFrota/web/shared/motorista_inicio.ts",
      "l2/designSystem.ts"
    ],
    "dependsOn": [
      "motorista_inicio__l2_shared"
    ],
    "categoryRef": "dashboardCommandCenter",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/dashboardCommandCenter.md",
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts"
    ]
  }
] as const;

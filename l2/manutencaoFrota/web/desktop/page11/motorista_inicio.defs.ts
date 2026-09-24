export const descriptions = [
  {
    "organismId": "organism.summary.1",
    "kind": "summary",
    "description": "Apresenta um resumo dos veículos atribuídos ao motorista a partir da consulta disponível, incluindo as informações retornadas para cada veículo. Ao consultar, comunica carregamento; se não houver veículos retornados, informa claramente que não há veículos atribuídos para exibir; em falha, apresenta a indisponibilidade da consulta de forma compreensível. O conteúdo e as mudanças de estado devem ser anunciados por tecnologias assistivas, e os itens devem permanecer legíveis e navegáveis por teclado.",
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
        "reason": "A consulta retorna uma coleção de veículos e o candidato permite resumir vários registros com igual destaque."
      }
    ]
  },
  {
    "organismId": "organism.highlights.1",
    "kind": "highlights",
    "description": "Evidencia, entre os veículos retornados, os destaques relacionados à manutenção preventiva por quilometragem vencida. A consulta em andamento é identificada como carregamento; a ausência de veículos ou de destaques é comunicada sem sugerir dados inexistentes; e erros da consulta são apresentados de modo acessível. As informações devem ter rótulos claros para leitura por tecnologias assistivas e navegação por teclado.",
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
        "reason": "Os destaques correspondem a registros de veículos retornados pela consulta e precisam ser percorridos de forma escaneável."
      }
    ]
  },
  {
    "organismId": "organism.alerts.1",
    "kind": "alerts",
    "description": "Mostra os alertas de preventiva por quilometragem dos veículos atribuídos quando essa condição estiver presente nos dados consultados. Durante a consulta, sinaliza carregamento; sem veículos ou alertas aplicáveis, informa o estado vazio; e, se a consulta falhar, comunica o erro. Cada alerta deve ser compreensível com leitor de tela e acessível por teclado, sem pressupor ações corretivas não declaradas.",
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
        "reason": "A coleção de veículos consultada pode conter alertas associados e o candidato favorece a leitura sequencial dos registros."
      }
    ]
  },
  {
    "organismId": "organism.inbox.1",
    "kind": "inbox",
    "description": "Reúne as pendências relacionadas ao registro de abastecimento conforme forem disponibilizadas nos dados da consulta de veículos. Indica carregamento enquanto a consulta ocorre, explica quando não houver itens para mostrar e apresenta a falha de consulta de maneira acessível. Os itens devem ser identificados por texto claro e permanecer acessíveis por teclado e tecnologias assistivas; não são presumidas ações de registro além das capacidades declaradas.",
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
        "reason": "A caixa de pendências é uma coleção de itens derivados da consulta e requer leitura rápida dos registros."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "motorista_inicio__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/manutencaoFrota/web/desktop/page11/motorista_inicio.defs.ts",
    "outputPath": "l2/manutencaoFrota/web/desktop/page11/motorista_inicio.ts",
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

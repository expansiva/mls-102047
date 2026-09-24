export const descriptions = [
  {
    "organismId": "organism.summary.1",
    "kind": "summary",
    "description": "Resume el avance de las órdenes de servicio propias y los presupuestos que requieren decisión usando el resultado consultado. Mientras se consulta, comunica que la información está cargando; si no hay órdenes, indica que no hay información para resumir; y si ocurre un error, informa que no se pudo obtener el resumen. La información debe poder leerse con tecnologías de asistencia.",
    "contentRef": "base",
    "capabilityRefs": [
      "listOrdenServicio"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewMetric",
        "candidates": [
          "groupviewmetric--ml-metric-big-number",
          "groupviewmetric--ml-metric-card"
        ],
        "reason": "La consulta permite presentar indicadores destacados del avance y de presupuestos pendientes."
      }
    ]
  },
  {
    "organismId": "organism.highlights.1",
    "kind": "highlights",
    "description": "Presenta los aparatos disponibles para retiro y los presupuestos pendientes a partir de las órdenes propias consultadas, para que el cliente identifique rápidamente esos elementos. Expone estados de carga, ausencia de resultados y error de consulta de forma comprensible y accesible. No presupone una navegación ni una acción adicional que no esté declarada.",
    "contentRef": "base",
    "capabilityRefs": [
      "listOrdenServicio"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-card-grid"
        ],
        "reason": "La consulta devuelve una colección de órdenes que puede destacar como elementos independientes."
      }
    ]
  },
  {
    "organismId": "organism.alerts.1",
    "kind": "alerts",
    "description": "Comunica los plazos relacionados con decidir presupuestos y retirar aparatos cuando estén disponibles en las órdenes propias consultadas. Durante la carga mantiene el contexto de espera; sin alertas informa que no hay avisos; y ante error comunica que los avisos no pudieron recuperarse. Los avisos y sus estados deben anunciarse de forma accesible.",
    "contentRef": "base",
    "capabilityRefs": [
      "listOrdenServicio"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-notify-banner"
        ],
        "reason": "Los plazos relevantes se comunican como avisos persistentes derivados del resultado de la consulta."
      }
    ]
  },
  {
    "organismId": "organism.inbox.1",
    "kind": "inbox",
    "description": "Muestra las órdenes consultadas que esperan una decisión sobre un presupuesto, para que el cliente sepa qué requiere atención. Indica carga, ausencia de pendientes y error al recuperar la información. La página no declara acciones para aprobar o rechazar, por lo que este organismo solo informa las decisiones pendientes y no ofrece esas operaciones.",
    "contentRef": "base",
    "capabilityRefs": [
      "listOrdenServicio"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "La consulta devuelve una colección que puede leerse como lista de decisiones pendientes."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "inicio_cliente__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/ordenServicio/web/desktop/page11/inicio_cliente.defs.ts",
    "outputPath": "l2/ordenServicio/web/desktop/page11/inicio_cliente.ts",
    "dependsFiles": [
      "l2/ordenServicio/web/shared/inicio_cliente.ts",
      "l2/designSystem.ts"
    ],
    "dependsOn": [
      "inicio_cliente__l2_shared"
    ],
    "categoryRef": "dashboardCommandCenter",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/dashboardCommandCenter.md",
      "_102040_/l2/molecules/groupviewmetric/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewMetric/usage.ts",
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts"
    ]
  }
] as const;

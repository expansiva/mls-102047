export const descriptions = [
  {
    "organismId": "organism.summary.1",
    "kind": "summary",
    "description": "Da prioridad al avance de las órdenes propias y a los presupuestos pendientes de decisión en una lectura breve y táctil. Usa el resultado de la consulta y comunica claramente carga, falta de órdenes y error; todo el contenido debe conservar lectura accesible.",
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
    "description": "Prioriza en espacio reducido los aparatos disponibles para retiro y los presupuestos pendientes derivados de las órdenes propias consultadas. Permite revisar los elementos mediante interacción táctil accesible y mantiene mensajes claros para carga, ningún resultado y error, sin asumir navegación no declarada.",
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
        "reason": "La consulta devuelve una colección que se puede recorrer de forma legible en pantallas estrechas."
      }
    ]
  },
  {
    "organismId": "organism.alerts.1",
    "kind": "alerts",
    "description": "Hace visibles primero los plazos para decidir presupuestos y retirar aparatos que resulten de la consulta de órdenes propias. Sus avisos, estados de carga, ausencia de avisos y errores deben ser legibles y anunciables con accesibilidad en móvil.",
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
    "description": "Muestra de forma priorizada las órdenes con presupuestos pendientes de decisión, conservando mensajes accesibles de carga, ausencia de pendientes y error. Aunque el objetivo menciona aprobar o rechazar, no se ofrece esa interacción porque no existe una acción declarada para realizarla; el organismo solo informa lo pendiente.",
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
        "reason": "La consulta devuelve una colección que se puede recorrer de forma legible en pantallas estrechas."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "inicio_cliente__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/ordenServicio/web/mobile/page11/inicio_cliente.defs.ts",
    "outputPath": "l2/ordenServicio/web/mobile/page11/inicio_cliente.ts",
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

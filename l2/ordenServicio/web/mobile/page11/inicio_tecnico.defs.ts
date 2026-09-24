export const descriptions = [
  {
    "organismId": "organism.summary.1",
    "kind": "summary",
    "description": "Prioriza la lectura rápida de cuántas órdenes están pendientes de análisis y cuántas órdenes aprobadas esperan reparación, a partir de la consulta disponible. Debe comunicar que los valores se están cargando, que no hay resultados para resumir o que la consulta falló; el error debe poder leerse y la información debe tener etiquetas comprensibles para tecnologías de asistencia.",
    "contentRef": "base",
    "capabilityRefs": [
      "listOrdenServicio"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewMetric",
        "candidates": [
          "groupviewmetric--ml-metric-card"
        ],
        "reason": "La consulta respalda indicadores destacados y legibles en espacio reducido."
      }
    ]
  },
  {
    "organismId": "organism.highlights.1",
    "kind": "highlights",
    "description": "Prioriza para lectura táctil las órdenes urgentes del taller y los aparatos disponibles para retiro dentro de los resultados de órdenes de servicio. Permite revisar los elementos recuperados por la consulta; durante la carga debe anunciarse la espera, sin resultados debe indicarse que no hay elementos destacados y ante un error debe mostrarse un mensaje accesible.",
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
        "reason": "La consulta devuelve una colección de órdenes que puede revisarse cómodamente como registros apilados."
      }
    ]
  },
  {
    "organismId": "organism.alerts.1",
    "kind": "alerts",
    "description": "Da prioridad a los avisos de plazos de diagnóstico y reparación que el técnico debe cumplir, usando las órdenes consultadas. Debe diferenciar los estados de carga, ausencia de avisos y error, con mensajes perceptibles, legibles mediante lector de pantalla y aptos para interacción táctil.",
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
        "reason": "Los avisos se derivan de la colección de órdenes recuperada por la consulta."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-notify-banner"
        ],
        "reason": "La consulta puede terminar en error y requiere comunicarlo de forma persistente y accesible."
      }
    ]
  },
  {
    "organismId": "organism.inbox.1",
    "kind": "inbox",
    "description": "Prioriza la revisión táctil de órdenes que esperan preparación de presupuesto o reparación y marcado como listas según los resultados consultados. Esta página no declara acciones para preparar presupuestos, reparar ni cambiar el estado; por ello solo permite consultar el trabajo pendiente. Debe informar carga, bandeja vacía y error de consulta de forma accesible.",
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
        "reason": "La consulta proporciona una colección de órdenes pendiente de revisión en una lectura adecuada para pantallas estrechas."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "El estado de error de la consulta necesita retroalimentación accesible junto a la bandeja."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "inicio_tecnico__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/ordenServicio/web/mobile/page11/inicio_tecnico.defs.ts",
    "outputPath": "l2/ordenServicio/web/mobile/page11/inicio_tecnico.ts",
    "dependsFiles": [
      "l2/ordenServicio/web/shared/inicio_tecnico.ts",
      "l2/designSystem.ts"
    ],
    "dependsOn": [
      "inicio_tecnico__l2_shared"
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

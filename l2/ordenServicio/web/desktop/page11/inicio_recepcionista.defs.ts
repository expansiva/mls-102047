export const descriptions = [
  {
    "organismId": "organism.summary.1",
    "kind": "summary",
    "description": "Resume los conteos de órdenes abiertas, en análisis y listas para entregar a partir de la consulta disponible. Mientras se consulta, comunica que los indicadores se están actualizando; si no hay resultados, indica que no hay órdenes para resumir; y si falla, presenta el error de consulta de forma comprensible. Los valores y su estado deben poder leerse mediante texto accesible, no solo por señales visuales.",
    "contentRef": "base",
    "capabilityRefs": [
      "listOrdenServicio",
      "ui.inicio_recepcionista.listOrdenServicio.status",
      "ui.inicio_recepcionista.listOrdenServicio.error"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewMetric",
        "candidates": [
          "groupviewmetric--ml-metric-big-number",
          "groupviewmetric--ml-metric-card"
        ],
        "reason": "La consulta alimenta los conteos destacados de estados de órdenes."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "El estado de la consulta puede estar cargando con duración desconocida."
      }
    ]
  },
  {
    "organismId": "organism.highlights.1",
    "kind": "highlights",
    "description": "Destaca las órdenes y aparatos que la recepcionista debe revisar primero, incluidos los disponibles para retiro cuando estén presentes en los resultados. Durante la carga informa que los destacados se están obteniendo; sin resultados explica que no hay elementos destacados; y ante un error ofrece un mensaje accesible sobre la consulta no disponible. Cada elemento debe tener una identificación textual clara para su lectura asistida.",
    "contentRef": "base",
    "capabilityRefs": [
      "listOrdenServicio",
      "ui.inicio_recepcionista.listOrdenServicio.status",
      "ui.inicio_recepcionista.listOrdenServicio.error"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewCard",
        "candidates": [
          "groupviewcard--ml-view-card-horizontal"
        ],
        "reason": "Permite presentar cada orden destacada como una unidad independiente con su información relevante."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "Representa la espera mientras se recuperan los destacados."
      }
    ]
  },
  {
    "organismId": "organism.alerts.1",
    "kind": "alerts",
    "description": "Comunica los plazos de entrega y las situaciones que requieren atención en recepción según las órdenes obtenidas. Debe anunciar de forma accesible el contenido de las alertas y el error si la consulta falla; durante la carga señala que las alertas se están actualizando y, si no hay resultados, confirma que no hay alertas para mostrar.",
    "contentRef": "base",
    "capabilityRefs": [
      "listOrdenServicio",
      "ui.inicio_recepcionista.listOrdenServicio.status",
      "ui.inicio_recepcionista.listOrdenServicio.error"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-notify-banner",
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "Las alertas operativas y los fallos de la consulta requieren mensajes de estado claros y accesibles."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "El estado de carga de la consulta requiere una señal de progreso sin duración conocida."
      }
    ]
  },
  {
    "organismId": "organism.inbox.1",
    "kind": "inbox",
    "description": "Muestra las órdenes que esperan atención de recepción, para que la persona identifique las relacionadas con recibir un aparato o entregar uno listo. Esta página solo dispone de consulta de órdenes: no ejecuta aquí la recepción ni la entrega. Permite cambiar la página de resultados y volver a consultar; informa carga, ausencia de órdenes y errores. La navegación entre resultados debe poder realizarse con teclado y anunciar la página seleccionada.",
    "contentRef": "base",
    "capabilityRefs": [
      "listOrdenServicio",
      "setListOrdenServicioPage",
      "ui.inicio_recepcionista.listOrdenServicio.input.page",
      "ui.inicio_recepcionista.listOrdenServicio.status",
      "ui.inicio_recepcionista.listOrdenServicio.error"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewTable",
        "candidates": [
          "groupviewtable--ml-advanced-data-table",
          "groupviewtable--ml-data-table"
        ],
        "reason": "La consulta devuelve una colección de órdenes que debe poder revisarse de forma estructurada y admite paginación."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "Representa la carga de la lista de órdenes."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "inicio_recepcionista__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/ordenServicio/web/desktop/page11/inicio_recepcionista.defs.ts",
    "outputPath": "l2/ordenServicio/web/desktop/page11/inicio_recepcionista.ts",
    "dependsFiles": [
      "l2/ordenServicio/web/shared/inicio_recepcionista.ts",
      "l2/designSystem.ts"
    ],
    "dependsOn": [
      "inicio_recepcionista__l2_shared"
    ],
    "categoryRef": "dashboardCommandCenter",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/dashboardCommandCenter.md",
      "_102040_/l2/molecules/groupviewmetric/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewMetric/usage.ts",
      "_102040_/l2/molecules/groupshowprogress/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupShowProgress/usage.ts",
      "_102040_/l2/molecules/groupviewcard/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewCard/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts",
      "_102040_/l2/molecules/groupviewtable/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewTable/usage.ts"
    ]
  }
] as const;

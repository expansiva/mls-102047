export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Permite localizar las propias órdenes con identificador, número de orden, estado y página, priorizando la lectura rápida de los resultados en espacio limitado. Al usar los controles de consulta se comunica la carga; si no hay coincidencias se informa el estado vacío y, si falla, se explica el error. Los campos conservan etiquetas claras, objetivos táctiles accesibles y alternativa completa por teclado.",
    "contentRef": "base",
    "capabilityRefs": [
      "setListOrdenServicioId",
      "setListOrdenServicioServiceOrderNumber",
      "setListOrdenServicioStatus",
      "setListOrdenServicioPage",
      "listOrdenServicio"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupEnterText",
        "candidates": [
          "groupentertext--ml-enter-text"
        ],
        "reason": "Los identificadores y el número de orden son entradas de texto declaradas para la consulta."
      },
      {
        "groupId": "groupSelectOne",
        "candidates": [
          "groupselectone--ml-select"
        ],
        "reason": "El estado es una única entrada declarada para acotar la consulta."
      },
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "La consulta devuelve una colección de órdenes propias."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Da prioridad a estado, presupuesto, diagnóstico y disponibilidad para retiro de la orden consultada, sin mostrar costos internos de piezas ni anotaciones técnicas. En espacio limitado conserva explícitos los estados de carga, sin resultados y error de la consulta. El contenido debe poder recorrerse de forma táctil y con lector de pantalla mediante etiquetas claras.",
    "contentRef": "base",
    "capabilityRefs": [
      "listOrdenServicio"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewCard",
        "candidates": [
          "groupviewcard--ml-view-card-horizontal"
        ],
        "reason": "La consulta aporta los datos de una orden para su lectura contextual."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Permite confirmar táctilmente la decisión de aprobar para autorizar la reparación o de rechazar el presupuesto de la orden seleccionada. Antes del rechazo explica que cerrará la orden como rechazada y dejará el aparato disponible para retiro. Comunica procesamiento, resultado y error de cada decisión; las acciones tienen rótulos inequívocos, foco visible y acceso equivalente por teclado.",
    "contentRef": "base",
    "capabilityRefs": [
      "setAprobarPresupuestoId",
      "aprobarPresupuesto",
      "setRechazarPresupuestoId",
      "rechazarPresupuesto"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "Aprobar y rechazar son comandos declarados sobre la orden seleccionada."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback",
          "groupnotifyuser--ml-alert-modal"
        ],
        "reason": "Los comandos declaran estados de carga, resultado y error; el rechazo además requiere confirmación."
      }
    ]
  },
  {
    "organismId": "organism.actions.1",
    "kind": "actions",
    "description": "Ofrece acciones táctiles para aprobar el presupuesto o rechazarlo, manteniendo visibles sus consecuencias: aprobar autoriza la reparación y rechazar cierra la orden y habilita el retiro del aparato. El rechazo pide la confirmación requerida; ambas acciones anuncian carga, éxito o error y actualizan la consulta al completarse. Sus nombres y estados permanecen accesibles con lector de pantalla y teclado.",
    "contentRef": "base",
    "capabilityRefs": [
      "setAprobarPresupuestoId",
      "aprobarPresupuesto",
      "setRechazarPresupuestoId",
      "rechazarPresupuesto",
      "listOrdenServicio"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "Las dos decisiones son comandos declarados y la consulta se refresca tras ejecutarlos."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-toast-notification",
          "groupnotifyuser--ml-alert-modal"
        ],
        "reason": "Las acciones tienen estados de carga, éxito y error, y el rechazo exige una confirmación."
      }
    ]
  },
  {
    "organismId": "organism.timeline.1",
    "kind": "timeline",
    "description": "Permite consultar en secuencia los hitos visibles de la orden: presupuesto recibido, cierre después del rechazo y disponibilidad para retiro cuando aplique. En móvil prioriza esos hitos y no muestra costos internos ni anotaciones técnicas. Comunica carga, ausencia de órdenes y errores de la consulta; el recorrido táctil y con lector de pantalla mantiene un orden y etiquetas comprensibles.",
    "contentRef": "base",
    "capabilityRefs": [
      "listOrdenServicio"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-timeline-view"
        ],
        "reason": "La consulta de órdenes aporta el estado y la disponibilidad que sustentan los hitos visibles."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "ordenes_cliente__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/ordenServicio/web/mobile/page11/ordenes_cliente.defs.ts",
    "outputPath": "l2/ordenServicio/web/mobile/page11/ordenes_cliente.ts",
    "dependsFiles": [
      "l2/ordenServicio/web/shared/ordenes_cliente.ts",
      "l2/designSystem.ts"
    ],
    "dependsOn": [
      "ordenes_cliente__l2_shared"
    ],
    "categoryRef": "approvalWorkflow",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/approvalWorkflow.md",
      "_102040_/l2/molecules/groupentertext/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterText/usage.ts",
      "_102040_/l2/molecules/groupselectone/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupSelectOne/usage.ts",
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
      "_102040_/l2/molecules/groupviewcard/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewCard/usage.ts",
      "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts"
    ]
  }
] as const;

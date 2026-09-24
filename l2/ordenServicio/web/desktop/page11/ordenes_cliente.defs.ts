export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Permite localizar las propias órdenes mediante los datos de consulta disponibles: identificador, número de orden, estado y página. Presenta los resultados de la consulta para identificar una orden y conocer su avance; mientras la consulta está en curso comunica la carga, informa claramente si no hay órdenes que coincidan y explica el error si la consulta falla. Los campos deben tener etiquetas comprensibles, instrucciones asociadas y uso completo por teclado.",
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
    "description": "Expone de la orden consultada el estado, el diagnóstico, el valor del presupuesto y, cuando corresponda, que el aparato está disponible para retiro. No muestra costos internos de piezas ni anotaciones técnicas. Refleja la carga, ausencia de resultados y error de la consulta sin sustituir información no disponible. La información debe conservar nombres claros y poder revisarse con tecnologías de asistencia.",
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
    "description": "Permite confirmar la decisión sobre el presupuesto de la orden seleccionada: aprobar para autorizar la reparación o rechazar. Al rechazar, comunica antes de continuar que la orden se cerrará como rechazada y que el aparato quedará disponible para retiro. Durante cada confirmación informa que la acción está en curso, comunica el resultado y muestra un mensaje recuperable ante error. Las acciones tienen nombres inequívocos, foco visible y se pueden ejecutar con teclado.",
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
    "description": "Ofrece las acciones para aprobar el presupuesto y autorizar la reparación, o rechazarlo. La acción de rechazo solicita la confirmación requerida y comunica su efecto de cierre y disponibilidad para retiro; ambas acciones indican procesamiento, éxito o error y actualizan la consulta de órdenes después de completarse. Sus controles deben ser distinguibles por nombre, operables por teclado y anunciar sus cambios de estado.",
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
    "description": "Permite revisar los hitos que el sistema refleja para la orden: presupuesto recibido, cierre cuando fue rechazado y disponibilidad para retiro cuando corresponda. Se limita a la información visible de la orden y no expone costos internos ni anotaciones técnicas. Durante la consulta comunica carga, ausencia de órdenes y errores; los hitos deben leerse en un orden comprensible con etiquetas accesibles.",
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
    "id": "ordenes_cliente__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/ordenServicio/web/desktop/page11/ordenes_cliente.defs.ts",
    "outputPath": "l2/ordenServicio/web/desktop/page11/ordenes_cliente.ts",
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

export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Permite localizar órdenes pendientes de análisis o aprobadas usando los criterios disponibles de identificador, número, cliente, aparato, estado y página. Da prioridad a identificar rápidamente la orden y permite aplicar criterios con controles táctiles y teclado. Informa carga, ausencia de resultados y errores de consulta mediante mensajes claros anunciables.",
    "contentRef": "base",
    "capabilityRefs": [
      "listOrdenServicio",
      "setListOrdenServicioId",
      "setListOrdenServicioServiceOrderNumber",
      "setListOrdenServicioCustomerId",
      "setListOrdenServicioDeviceId",
      "setListOrdenServicioStatus",
      "setListOrdenServicioPage"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupSearchContent",
        "candidates": [
          "groupsearchcontent--ml-search-filters"
        ],
        "reason": "La consulta permite localizar órdenes mediante criterios textuales disponibles."
      },
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "Una lista vertical facilita revisar colecciones de órdenes en espacio reducido."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Muestra la información disponible de la orden elegida, con prioridad de lectura para diagnóstico, presupuesto, cliente y aparato antes de ejecutar una acción. Mantiene disponibles los estados de carga, sin orden y error de consulta; los datos y estados se exponen con etiquetas que funcionan con lector de pantalla y foco de teclado.",
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
        "reason": "La orden reúne información contextual que debe poder revisarse como una unidad."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Permite registrar o actualizar el análisis de la orden con sus identificadores y estado, defecto reportado, diagnóstico, piezas requeridas, cantidad, costo interno, presupuesto, notas y reparación realizada. En espacio reducido, mantiene visibles los campos obligatorios y permite revisar los opcionales sin perder los datos introducidos. Comunica validación, envío, éxito y error de actualización de forma accesible para tacto, teclado y lectores de pantalla.",
    "contentRef": "updateOrdenServicio",
    "capabilityRefs": [
      "setUpdateOrdenServicioId",
      "setUpdateOrdenServicioServiceOrderNumber",
      "setUpdateOrdenServicioCustomerId",
      "setUpdateOrdenServicioDeviceId",
      "setUpdateOrdenServicioStatus",
      "setUpdateOrdenServicioDetails",
      "setUpdateOrdenServicioDetailsReportedDefect",
      "setUpdateOrdenServicioDetailsDiagnosis",
      "setUpdateOrdenServicioDetailsRequiredParts",
      "setUpdateOrdenServicioDetailsRequiredPartsDescription",
      "setUpdateOrdenServicioDetailsRequiredPartsQuantity",
      "setUpdateOrdenServicioDetailsRequiredPartsInternalCost",
      "setUpdateOrdenServicioDetailsBudgetAmount",
      "setUpdateOrdenServicioDetailsTechnicianNotes",
      "setUpdateOrdenServicioDetailsRepairPerformed",
      "updateOrdenServicio"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupEnterText",
        "candidates": [
          "groupentertext--ml-enter-text",
          "groupentertext--ml-multiline-text"
        ],
        "reason": "La actualización recoge identificadores y descripciones, diagnósticos, notas y constancia de reparación."
      },
      {
        "groupId": "groupEnterNumber",
        "candidates": [
          "groupenternumber--ml-number-input",
          "groupenternumber--ml-number-stepper"
        ],
        "reason": "Las piezas requeridas incluyen cantidad."
      },
      {
        "groupId": "groupEnterMoney",
        "candidates": [
          "groupentermoney--ml-currency-input"
        ],
        "reason": "La actualización incluye costo interno de piezas y valor del presupuesto."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "El técnico debe enviar la actualización de la orden."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback",
          "groupnotifyuser--ml-toast-notification"
        ],
        "reason": "El resultado de la actualización puede comunicar errores o confirmación."
      }
    ]
  },
  {
    "organismId": "organism.actions.1",
    "kind": "actions",
    "description": "Permite emitir el presupuesto de la orden seleccionada para el cliente o marcar la reparación como lista para entrega, registrando los detalles requeridos y la reparación realizada si aplica. Las acciones tienen objetivos táctiles claros y no se ejecutan sin la orden seleccionada ni, al marcar lista, sin detalles. Comunica de forma accesible el procesamiento, la confirmación y cualquier error de cada comando.",
    "contentRef": "base",
    "capabilityRefs": [
      "setEmitirPresupuestoId",
      "emitirPresupuesto",
      "setMarcarListaId",
      "setMarcarListaDetails",
      "setMarcarListaDetailsRepairPerformed",
      "marcarLista"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupEnterText",
        "candidates": [
          "groupentertext--ml-multiline-text"
        ],
        "reason": "Marcar la orden como lista admite detalles y el registro opcional de la reparación."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "Emitir presupuesto y marcar lista son comandos explícitos del técnico."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-toast-notification",
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "Los comandos disponen de estados de carga, resultado y error."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "Los comandos exponen estado de ejecución sin progreso determinado."
      }
    ]
  },
  {
    "organismId": "organism.timeline.1",
    "kind": "timeline",
    "description": "Permite consultar los estados operativos visibles en las órdenes, incluida la decisión del cliente sobre el presupuesto y la disponibilidad para entrega cuando esos datos estén reflejados. Prioriza una lectura secuencial en pantalla estrecha e informa carga, ausencia de registros y error de consulta. Cada estado debe poder comprenderse mediante texto y lector de pantalla.",
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
        "reason": "La consulta permite presentar en secuencia los estados operativos disponibles de las órdenes."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "ordenes_tecnico__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/ordenServicio/web/mobile/page11/ordenes_tecnico.defs.ts",
    "outputPath": "l2/ordenServicio/web/mobile/page11/ordenes_tecnico.ts",
    "dependsFiles": [
      "l2/ordenServicio/web/shared/ordenes_tecnico.ts",
      "l2/designSystem.ts"
    ],
    "dependsOn": [
      "ordenes_tecnico__l2_shared"
    ],
    "categoryRef": "operationsQueue",
    "skills": [
      "_102020_/l2/agentDefsL2/skills/genD2PageRenderTs.ts",
      "_102020_/l2/agentDefsL2/skills/pageCategories/operationsQueue.md",
      "_102040_/l2/molecules/groupsearchcontent/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupSearchContent/usage.ts",
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts",
      "_102040_/l2/molecules/groupviewcard/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewCard/usage.ts",
      "_102040_/l2/molecules/groupentertext/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterText/usage.ts",
      "_102040_/l2/molecules/groupenternumber/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterNumber/usage.ts",
      "_102040_/l2/molecules/groupentermoney/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterMoney/usage.ts",
      "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts",
      "_102040_/l2/molecules/groupshowprogress/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupShowProgress/usage.ts"
    ]
  }
] as const;

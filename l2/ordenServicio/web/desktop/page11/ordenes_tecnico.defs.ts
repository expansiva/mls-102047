export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Permite localizar órdenes de servicio pendientes de análisis o aprobadas para reparación mediante los criterios disponibles de identificador, número de orden, cliente, aparato, estado y página. Muestra los resultados de la consulta para identificar la orden con la que se trabajará e informa carga, ausencia de resultados y error de consulta. Los criterios y resultados tienen nombres accesibles y se pueden operar con teclado.",
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
        "groupId": "groupViewTable",
        "candidates": [
          "groupviewtable--ml-advanced-data-table",
          "groupviewtable--ml-data-table"
        ],
        "reason": "El resultado de la consulta es una colección de órdenes que debe poder revisarse."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Presenta la información disponible de la orden elegida para que el técnico revise el diagnóstico, el presupuesto, el cliente y el aparato antes de continuar. Mientras se consulta, comunica que la información está cargando; si no hay una orden o la consulta falla, explica el estado. La información se anuncia con etiquetas comprensibles para lectores de pantalla.",
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
    "description": "Permite registrar y actualizar el análisis de una orden: número de orden, cliente, aparato, estado y detalles, incluido defecto reportado, diagnóstico, piezas requeridas con descripción, cantidad y costo interno, valor del presupuesto, notas y reparación realizada. Señala los datos obligatorios, conserva los opcionales y expone validación, envío en curso, confirmación o error de actualización de forma accesible.",
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
    "description": "Ofrece las acciones contextuales para emitir el presupuesto de la orden seleccionada y ponerlo a disposición del cliente, o para marcarla como lista para entrega registrando los detalles y, cuando corresponda, la reparación realizada. Impide ejecutar una acción sin una orden seleccionada y, para marcar lista, sin los detalles obligatorios; comunica progreso, éxito o error de cada comando con mensajes accesibles.",
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
    "description": "Permite consultar en los resultados de las órdenes los estados operativos visibles, incluida la decisión del cliente sobre el presupuesto y la disponibilidad para entrega cuando estén reflejadas en la orden. Indica carga, falta de registros o error de consulta. Los estados se leen en un orden comprensible y con texto accesible para cualquier indicador.",
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
    "id": "ordenes_tecnico__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/ordenServicio/web/desktop/page11/ordenes_tecnico.defs.ts",
    "outputPath": "l2/ordenServicio/web/desktop/page11/ordenes_tecnico.ts",
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
      "_102040_/l2/molecules/groupviewtable/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewTable/usage.ts",
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
      "_102020_/l2/aura/molecules/skills/groupShowProgress/usage.ts",
      "_102040_/l2/molecules/groupviewdata/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupViewData/usage.ts"
    ]
  }
] as const;

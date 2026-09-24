export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Permite localizar órdenes de servicio por id, número de orden, cliente, aparato, estado y página para identificar una recepción reciente o una orden lista para entregar. Presenta los resultados de la consulta y comunica de forma accesible la carga, la ausencia de resultados y los errores; los criterios y resultados deben tener nombres comprensibles y poder utilizarse con teclado.",
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
        "reason": "Es compatible con localizar órdenes mediante los criterios de consulta declarados."
      },
      {
        "groupId": "groupViewData",
        "candidates": [
          "groupviewdata--ml-vertical-record-list"
        ],
        "reason": "Es compatible con presentar la colección devuelta por la consulta."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Presenta la información disponible de una orden consultada para verificar cliente, aparato y estado, incluida la indicación de disponibilidad para retiro cuando esté presente en los datos. Mantiene etiquetas y una lectura clara para tecnologías de asistencia. Durante la consulta comunica carga, ausencia de resultados y error sin atribuir información que no haya sido devuelta.",
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
        "reason": "Es compatible con concentrar la lectura de los datos disponibles de una orden obtenida en la consulta."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Recoge los datos declarados para abrir una orden al recibir el aparato: número de orden, cliente, aparato, estado, detalles y defecto informado. También admite diagnóstico, presupuesto y reparación realizada cuando se cuente con esos datos. Identifica los campos obligatorios, permite corregirlos y ejecutar el registro, y expone de forma accesible validación, envío en curso, éxito y error. No describe fotografías porque no existe un dato ni una acción compartida para adjuntarlas.",
    "contentRef": "createOrdenServicio",
    "capabilityRefs": [
      "setCreateOrdenServicioServiceOrderNumber",
      "setCreateOrdenServicioCustomerId",
      "setCreateOrdenServicioDeviceId",
      "setCreateOrdenServicioStatus",
      "setCreateOrdenServicioDetails",
      "setCreateOrdenServicioDetailsReportedDefect",
      "setCreateOrdenServicioDetailsDiagnosis",
      "setCreateOrdenServicioDetailsBudgetAmount",
      "setCreateOrdenServicioDetailsRepairPerformed",
      "createOrdenServicio"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupEnterText",
        "candidates": [
          "groupentertext--ml-enter-text",
          "groupentertext--ml-multiline-text"
        ],
        "reason": "Es compatible con capturar identificadores de texto y los detalles o defecto informado."
      },
      {
        "groupId": "groupEnterMoney",
        "candidates": [
          "groupentermoney--ml-currency-input"
        ],
        "reason": "Es compatible con la entrada opcional del importe de presupuesto."
      },
      {
        "groupId": "groupSelectOne",
        "candidates": [
          "groupselectone--ml-select"
        ],
        "reason": "Es compatible con elegir un único estado."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "Es compatible con ejecutar el registro de la orden."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "Es compatible con comunicar validación, errores y resultado de la creación."
      }
    ]
  },
  {
    "organismId": "organism.actions.1",
    "kind": "actions",
    "description": "Ofrece las acciones operativas para abrir una orden con los datos de recepción y, sobre una orden seleccionada, entregar el aparato reparado y finalizarla. La finalización solo está disponible cuando existe el id seleccionado requerido. Cada acción comunica de forma accesible que está en curso, si terminó correctamente o si falló, y al completarse actualiza la consulta de órdenes.",
    "contentRef": "entregarYfinalizar",
    "capabilityRefs": [
      "createOrdenServicio",
      "setEntregarYfinalizarId",
      "entregarYfinalizar",
      "listOrdenServicio"
    ],
    "moleculeRecommendations": [
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "Es compatible con ejecutar los comandos de registro y finalización de entrega."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-toast-notification",
          "groupnotifyuser--ml-alert-modal"
        ],
        "reason": "Es compatible con confirmar el resultado o comunicar un fallo de los comandos."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "Es compatible con los estados de ejecución de los comandos."
      }
    ]
  },
  {
    "organismId": "organism.timeline.1",
    "kind": "timeline",
    "description": "Da contexto sobre el avance de una orden únicamente a partir de la información disponible en la consulta, como su estado y la disponibilidad para retiro. No presenta como eventos confirmados el paso a análisis, el presupuesto, la aprobación o la marca de lista si esos eventos no están incluidos en los datos devueltos. Comunica de forma accesible la carga, la ausencia de órdenes y el error de consulta.",
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
        "reason": "Es compatible con una lectura secuencial de información de avance cuando esté disponible en los datos consultados."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "ordenes_recepcionista__desktop__page11",
    "type": "l2_page",
    "defPath": "l2/ordenServicio/web/desktop/page11/ordenes_recepcionista.defs.ts",
    "outputPath": "l2/ordenServicio/web/desktop/page11/ordenes_recepcionista.ts",
    "dependsFiles": [
      "l2/ordenServicio/web/shared/ordenes_recepcionista.ts",
      "l2/designSystem.ts"
    ],
    "dependsOn": [
      "ordenes_recepcionista__l2_shared"
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
      "_102040_/l2/molecules/groupentermoney/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupEnterMoney/usage.ts",
      "_102040_/l2/molecules/groupselectone/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupSelectOne/usage.ts",
      "_102040_/l2/molecules/grouptriggeraction/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupTriggerAction/usage.ts",
      "_102040_/l2/molecules/groupnotifyuser/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupNotifyUser/usage.ts",
      "_102040_/l2/molecules/groupshowprogress/index.defs.ts",
      "_102020_/l2/aura/molecules/skills/groupShowProgress/usage.ts"
    ]
  }
] as const;

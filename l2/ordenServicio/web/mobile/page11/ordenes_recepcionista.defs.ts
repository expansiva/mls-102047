export const descriptions = [
  {
    "organismId": "organism.list.1",
    "kind": "list",
    "description": "Permite localizar órdenes por id, número de orden, cliente, aparato, estado y página, priorizando la identificación rápida de una recepción o de una orden lista para entregar. En espacio reducido conserva los mismos criterios y resultados mediante toque o teclado. Anuncia de forma accesible la carga, la ausencia de resultados y los errores.",
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
        "reason": "Es compatible con presentar de forma legible la colección devuelta en espacio reducido."
      }
    ]
  },
  {
    "organismId": "organism.detail.1",
    "kind": "detail",
    "description": "Prioriza los datos disponibles para verificar cliente, aparato y estado de la orden, incluida la indicación de retiro si está presente en la respuesta. Conserva etiquetas y una lectura clara para tecnologías de asistencia. También comunica carga, ausencia de resultados y error sin suponer información no devuelta.",
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
        "reason": "Es compatible con la lectura concentrada y táctil de los datos disponibles de una orden consultada."
      }
    ]
  },
  {
    "organismId": "organism.form.1",
    "kind": "form",
    "description": "Permite registrar la recepción con número de orden, cliente, aparato, estado, detalles y defecto informado, además de diagnóstico, presupuesto y reparación realizada cuando correspondan. Prioriza los campos requeridos, conserva la edición de todos los datos declarados y permite enviar el registro mediante toque o teclado. Expone de forma accesible validación, envío en curso, éxito y error. No incorpora fotografías porque el contrato compartido no declara un dato ni una acción para adjuntarlas.",
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
        "reason": "Es compatible con capturar identificadores de texto y detalles desde móvil."
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
          "groupselectone--ml-select-dropdown"
        ],
        "reason": "Es compatible con seleccionar un único estado con espacio limitado."
      },
      {
        "groupId": "groupTriggerAction",
        "candidates": [
          "grouptriggeraction--ml-button-standard"
        ],
        "reason": "Es compatible con enviar el registro de la orden."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-contextual-feedback"
        ],
        "reason": "Es compatible con comunicar validación, error y resultado de la creación."
      }
    ]
  },
  {
    "organismId": "organism.actions.1",
    "kind": "actions",
    "description": "Mantiene las acciones para registrar una orden y para entregar y finalizar una orden seleccionada. La entrega conserva el requisito del id seleccionado y debe distinguirse con claridad para evitar una finalización accidental. Ambas acciones admiten toque y teclado, anuncian ejecución, éxito o fallo de forma accesible y actualizan la consulta al completarse.",
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
        "reason": "Es compatible con ejecutar los comandos operativos desde móvil."
      },
      {
        "groupId": "groupNotifyUser",
        "candidates": [
          "groupnotifyuser--ml-toast-notification",
          "groupnotifyuser--ml-alert-modal"
        ],
        "reason": "Es compatible con confirmar el resultado o requerir atención ante un fallo."
      },
      {
        "groupId": "groupShowProgress",
        "candidates": [
          "groupshowprogress--ml-indeterminate-spinner"
        ],
        "reason": "Es compatible con comunicar que los comandos están en curso."
      }
    ]
  },
  {
    "organismId": "organism.timeline.1",
    "kind": "timeline",
    "description": "Resume el avance que pueda inferirse únicamente de la información devuelta para la orden, priorizando estado y disponibilidad para retiro. No presenta como eventos confirmados el análisis, presupuesto, aprobación o marca de lista si esos eventos no están disponibles en la consulta. Conserva una lectura secuencial accesible y comunica carga, ausencia de órdenes o error.",
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
        "reason": "Es compatible con una lectura secuencial del avance cuando los datos consultados lo permitan."
      }
    ]
  }
] as const;

export const pipeline = [
  {
    "id": "ordenes_recepcionista__mobile__page11",
    "type": "l2_page",
    "defPath": "l2/ordenServicio/web/mobile/page11/ordenes_recepcionista.defs.ts",
    "outputPath": "l2/ordenServicio/web/mobile/page11/ordenes_recepcionista.ts",
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

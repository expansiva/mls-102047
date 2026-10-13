/// <mls fileReference="_102047_/l2/ordenServicio/web/desktop/page11/mis_ordenes.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/approvalWorkflow/page21.md",
    "experience": "readAndDecide"
  },
  "intent": "Mostrar al cliente sus propias órdenes de servicio, destacar los presupuestos que esperan su respuesta y permitirle aprobarlos o rechazarlos después de ver el estado, el diagnóstico y el valor, sin información interna del taller.",
  "sections": [
    {
      "id": "pendientes",
      "priority": "primary",
      "purpose": "Lo que requiere tu atención ahora: presupuestos por responder y aparatos que ya puedes retirar.",
      "organisms": [
        "pendingBudgets",
        "readyForPickup"
      ]
    },
    {
      "id": "revision",
      "priority": "main",
      "purpose": "La orden elegida con su estado, diagnóstico y valor del presupuesto, junto a la decisión de aprobar o rechazar.",
      "organisms": [
        "orderDetail",
        "budgetDecision"
      ]
    },
    {
      "id": "misOrdenes",
      "priority": "main",
      "purpose": "Todas tus órdenes de servicio con su estado para consultar cualquiera de ellas.",
      "organisms": [
        "myOrders"
      ]
    },
    {
      "id": "historial",
      "priority": "secondary",
      "purpose": "El recorrido de la orden elegida, desde la recepción hasta la entrega.",
      "organisms": [
        "orderHistory"
      ]
    }
  ],
  "organisms": {
    "pendingBudgets": {
      "kind": "inbox",
      "text": "Presupuestos que esperan tu aprobación o rechazo, con el número de orden, el aparato y el valor propuesto.",
      "intents": []
    },
    "readyForPickup": {
      "kind": "highlights",
      "text": "Tus aparatos disponibles para retiro, porque la reparación terminó o porque rechazaste el presupuesto.",
      "intents": []
    },
    "myOrders": {
      "kind": "list",
      "text": "Tus órdenes de servicio con número, aparato, fecha de apertura y estado.",
      "intents": []
    },
    "orderDetail": {
      "kind": "detail",
      "text": "Estado de la orden, aparato, defecto informado, diagnóstico del técnico y valor del presupuesto, sin costos internos ni anotaciones del técnico.",
      "intents": []
    },
    "budgetDecision": {
      "kind": "actions",
      "text": "Aprueba el presupuesto para que el técnico repare el aparato, o recházalo indicando opcionalmente el motivo; la orden se cierra y el aparato queda disponible para retiro.",
      "intents": [
        {
          "id": "aprobarPresupuesto",
          "kind": "submit"
        },
        {
          "id": "rechazarPresupuesto",
          "kind": "submit"
        }
      ]
    },
    "orderHistory": {
      "kind": "timeline",
      "text": "Lo que pasó con tu orden: recepción, emisión del presupuesto, tu respuesta, reparación y entrega.",
      "intents": []
    }
  },
  "molecules": {
    "pendingBudgets": [
      {
        "role": "lista de presupuestos pendientes",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      }
    ],
    "readyForPickup": [
      {
        "role": "tarjeta de aparato para retiro",
        "preferred": "groupviewcard--ml-view-card-horizontal",
        "alternative": "groupviewdata--ml-card-grid"
      },
      {
        "role": "aviso de aparatos listos para retirar",
        "preferred": "groupnotifyuser--ml-notify-banner"
      }
    ],
    "myOrders": [
      {
        "role": "tabla de órdenes con estado",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-responsive-table"
      },
      {
        "role": "filtro por estado",
        "preferred": "groupnavigatesection--ml-navigate-pills",
        "alternative": "groupnavigatesection--ml-tabs"
      }
    ],
    "orderDetail": [
      {
        "role": "ficha de la orden",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      },
      {
        "role": "valor del presupuesto",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "datos del aparato",
        "preferred": "groupexpandcontent--ml-collapsible-panel",
        "alternative": "groupexpandcontent--ml-readmore-expand"
      }
    ],
    "budgetDecision": [
      {
        "role": "botones aprobar y rechazar",
        "preferred": "grouptriggeraction--ml-button-group",
        "alternative": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "motivo del rechazo",
        "preferred": "groupentertext--ml-multiline-text",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "confirmación de la decisión",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-alert-modal"
      }
    ],
    "orderHistory": [
      {
        "role": "recorrido de la orden",
        "preferred": "groupviewdata--ml-timeline-view",
        "alternative": "groupnavigatesteps--ml-vertical-stepper"
      }
    ]
  }
} as const;

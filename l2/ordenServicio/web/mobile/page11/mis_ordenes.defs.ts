/// <mls fileReference="_102047_/l2/ordenServicio/web/mobile/page11/mis_ordenes.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/approvalWorkflow/page21.md",
    "experience": "readAndDecide"
  },
  "intent": "En una pantalla estrecha y fluida (unos 390px, usable de 360px a 430px), mostrar primero al cliente los presupuestos por responder y los aparatos para retiro; luego la orden elegida con la decisión de aprobar o rechazar, y después sus demás órdenes y el historial.",
  "sections": [
    {
      "id": "pendientes",
      "priority": "primary",
      "purpose": "Arriba, lo que requiere tu respuesta o tu visita: presupuestos pendientes y aparatos para retirar.",
      "organisms": [
        "pendingBudgets",
        "readyForPickup"
      ]
    },
    {
      "id": "revision",
      "priority": "main",
      "purpose": "La orden elegida en una sola columna: estado, diagnóstico y valor del presupuesto, con la decisión justo debajo.",
      "organisms": [
        "orderDetail",
        "budgetDecision"
      ]
    },
    {
      "id": "misOrdenes",
      "priority": "secondary",
      "purpose": "Todas tus órdenes en una lista compacta para abrir cualquiera.",
      "organisms": [
        "myOrders"
      ]
    },
    {
      "id": "historial",
      "priority": "secondary",
      "purpose": "El recorrido de la orden elegida, de la recepción a la entrega.",
      "organisms": [
        "orderHistory"
      ]
    }
  ],
  "organisms": {
    "pendingBudgets": {
      "kind": "inbox",
      "text": "Presupuestos que esperan tu aprobación o rechazo, con el aparato y el valor propuesto.",
      "intents": []
    },
    "readyForPickup": {
      "kind": "highlights",
      "text": "Tus aparatos disponibles para retiro.",
      "intents": []
    },
    "myOrders": {
      "kind": "list",
      "text": "Tus órdenes de servicio con número, aparato y estado.",
      "intents": []
    },
    "orderDetail": {
      "kind": "detail",
      "text": "Estado, aparato, diagnóstico y valor del presupuesto de la orden, sin costos internos ni anotaciones del técnico.",
      "intents": []
    },
    "budgetDecision": {
      "kind": "actions",
      "text": "Aprueba el presupuesto para que reparen tu aparato, o recházalo con un motivo opcional; el aparato quedará disponible para retiro.",
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
      "text": "Lo que pasó con tu orden: recepción, presupuesto, tu respuesta, reparación y entrega.",
      "intents": []
    }
  },
  "molecules": {
    "pendingBudgets": [
      {
        "role": "tarjetas de presupuestos pendientes",
        "preferred": "groupviewcard--ml-view-card-horizontal",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ],
    "readyForPickup": [
      {
        "role": "aviso de aparatos listos para retirar",
        "preferred": "groupnotifyuser--ml-notify-banner",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      }
    ],
    "myOrders": [
      {
        "role": "lista compacta de órdenes",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-table"
      },
      {
        "role": "filtro por estado",
        "preferred": "groupnavigatesection--ml-navigate-pills"
      }
    ],
    "orderDetail": [
      {
        "role": "ficha de la orden",
        "preferred": "groupviewcard--ml-vertical-card"
      },
      {
        "role": "valor del presupuesto",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "datos del aparato",
        "preferred": "groupexpandcontent--ml-accordion",
        "alternative": "groupexpandcontent--ml-readmore-expand"
      }
    ],
    "budgetDecision": [
      {
        "role": "botón de decisión a ancho completo",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-button-group"
      },
      {
        "role": "motivo del rechazo",
        "preferred": "groupentertext--ml-multiline-text"
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
        "alternative": "groupnavigatesteps--ml-compact-step-indicator"
      }
    ]
  }
} as const;

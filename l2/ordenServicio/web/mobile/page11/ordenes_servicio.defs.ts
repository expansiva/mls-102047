/// <mls fileReference="_102047_/l2/ordenServicio/web/mobile/page11/ordenes_servicio.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/orderManagement/page21.md",
    "experience": "orderDeskSplit"
  },
  "intent": "Órdenes de servicio en pantalla angosta y fluida (referencia 390px, usable entre 360px y 430px): primero elegir la orden por estado, luego ver lo esencial y la acción del momento, y debajo registrar datos, piezas e historial en bloques apilados.",
  "sections": [
    {
      "id": "bandejaOrdenes",
      "priority": "primary",
      "purpose": "Elegir la orden por estado en una lista vertical fácil de recorrer con el pulgar.",
      "organisms": [
        "listaOrdenes"
      ]
    },
    {
      "id": "fichaOrden",
      "priority": "main",
      "purpose": "Ver el aparato y la situación de la orden y tener a mano la acción que toca en esta etapa.",
      "organisms": [
        "detalleOrden",
        "accionesOrden"
      ]
    },
    {
      "id": "trabajoOrden",
      "priority": "main",
      "purpose": "Registrar apertura, diagnóstico, presupuesto o trabajo realizado, y las piezas con su costo interno, en campos apilados a lo ancho.",
      "organisms": [
        "formularioOrden",
        "piezasOrden",
        "costoPiezas"
      ]
    },
    {
      "id": "historialOrdenSeccion",
      "priority": "secondary",
      "purpose": "Revisar al final lo que pasó con la orden y cuándo.",
      "organisms": [
        "historialOrden"
      ]
    }
  ],
  "organisms": {
    "listaOrdenes": {
      "kind": "list",
      "text": "Órdenes por estado: abiertas, presupuestadas, aprobadas, listas, finalizadas o rechazadas, mostradas como filas apiladas con número, cliente y aparato.",
      "intents": []
    },
    "detalleOrden": {
      "kind": "detail",
      "text": "Aparato, defecto informado, fotos, diagnóstico, presupuesto, trabajo realizado y si está disponible para retiro, en bloques plegables para leer de a uno.",
      "intents": []
    },
    "formularioOrden": {
      "kind": "form",
      "text": "Abre la orden con el aparato, el defecto y las fotos; registra el diagnóstico y el valor del presupuesto; anota el trabajo realizado. Si el cliente no existe, se lo registra en Clientes.",
      "intents": [
        {
          "id": "abrirOrden",
          "kind": "submit"
        },
        {
          "id": "guardarOrden",
          "kind": "submit"
        },
        {
          "id": "registrarClienteNuevo",
          "kind": "navigate",
          "to": "clientes"
        }
      ]
    },
    "piezasOrden": {
      "kind": "list",
      "text": "Piezas de la orden con cantidad y costo interno; agrega o corrige piezas durante el diagnóstico.",
      "intents": [
        {
          "id": "agregarPieza",
          "kind": "submit"
        }
      ]
    },
    "costoPiezas": {
      "kind": "summary",
      "text": "Costo interno total de las piezas de la orden, de uso interno.",
      "intents": []
    },
    "accionesOrden": {
      "kind": "actions",
      "text": "Pasar al técnico, emitir presupuesto, marcar como lista o entregar y finalizar, con botones a todo el ancho.",
      "intents": [
        {
          "id": "emitirPresupuesto",
          "kind": "submit"
        },
        {
          "id": "marcarLista",
          "kind": "submit"
        },
        {
          "id": "finalizarOrden",
          "kind": "submit"
        }
      ]
    },
    "historialOrden": {
      "kind": "timeline",
      "text": "Historial de la orden: apertura, presupuesto, respuesta del cliente, reparación y entrega.",
      "intents": []
    }
  },
  "molecules": {
    "listaOrdenes": [
      {
        "role": "filtro por estado",
        "preferred": "groupnavigatesection--ml-navigate-pills",
        "alternative": "groupselectone--ml-select"
      },
      {
        "role": "lista de órdenes",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      }
    ],
    "detalleOrden": [
      {
        "role": "bloques del detalle",
        "preferred": "groupexpandcontent--ml-accordion",
        "alternative": "groupexpandcontent--ml-collapsible-panel"
      },
      {
        "role": "aviso de disponible para retiro",
        "preferred": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "formularioOrden": [
      {
        "role": "datos del aparato",
        "preferred": "groupentertext--ml-floating-text-input",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "defecto, diagnóstico y trabajo",
        "preferred": "groupentertext--ml-multiline-text"
      },
      {
        "role": "valor del presupuesto",
        "preferred": "groupentermoney--ml-currency-input",
        "alternative": "groupentermoney--ml-enter-money-br"
      },
      {
        "role": "fotos del aparato",
        "preferred": "groupselectfileforupload--ml-file-upload-preview",
        "alternative": "groupselectfileforupload--ml-upload-file-list"
      },
      {
        "role": "guardar",
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ],
    "piezasOrden": [
      {
        "role": "lista de piezas",
        "preferred": "groupviewtable--ml-responsive-data-table",
        "alternative": "groupviewtable--ml-inline-edit-table"
      },
      {
        "role": "costo unitario",
        "preferred": "groupentermoney--ml-currency-input",
        "alternative": "groupentermoney--ml-enter-money-br"
      }
    ],
    "costoPiezas": [
      {
        "role": "costo interno total",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      }
    ],
    "accionesOrden": [
      {
        "role": "acción de la etapa",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-split-button"
      },
      {
        "role": "confirmación",
        "preferred": "groupnotifyuser--ml-toast-notification"
      }
    ],
    "historialOrden": [
      {
        "role": "línea de tiempo",
        "preferred": "groupviewdata--ml-timeline-view",
        "alternative": "groupnavigatesteps--ml-vertical-stepper"
      }
    ]
  }
} as const;

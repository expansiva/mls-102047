/// <mls fileReference="_102047_/l2/ordenServicio/web/desktop/page11/ordenes_servicio.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/orderManagement/page21.md",
    "experience": "orderDeskSplit"
  },
  "intent": "Mesa de trabajo de órdenes de servicio para recepción y técnico: localizar la orden por estado, revisar el aparato y su situación, registrar apertura, diagnóstico, presupuesto y reparación, cargar piezas con costo interno y mover la orden por su ciclo hasta la entrega.",
  "sections": [
    {
      "id": "bandejaOrdenes",
      "priority": "primary",
      "purpose": "Encontrar rápido la orden en la que hay que trabajar, filtrando por estado: abiertas para analizar, aprobadas para reparar, listas para entregar.",
      "organisms": [
        "listaOrdenes"
      ]
    },
    {
      "id": "fichaOrden",
      "priority": "main",
      "purpose": "Ver la orden seleccionada completa y decidir el siguiente paso del ciclo sin salir de la página.",
      "organisms": [
        "detalleOrden",
        "accionesOrden"
      ]
    },
    {
      "id": "trabajoOrden",
      "priority": "main",
      "purpose": "Registrar lo que corresponde a cada etapa: apertura con aparato, defecto y fotos; diagnóstico y valor del presupuesto; trabajo realizado; y las piezas con su costo interno.",
      "organisms": [
        "formularioOrden",
        "piezasOrden",
        "costoPiezas"
      ]
    },
    {
      "id": "historialOrdenSeccion",
      "priority": "secondary",
      "purpose": "Consultar qué pasó con la orden y cuándo, desde la apertura hasta la entrega.",
      "organisms": [
        "historialOrden"
      ]
    }
  ],
  "organisms": {
    "listaOrdenes": {
      "kind": "list",
      "text": "Órdenes por estado: abiertas, presupuestadas, aprobadas, listas, finalizadas o rechazadas, con número, cliente, aparato y fecha de apertura, para elegir la orden a trabajar.",
      "intents": []
    },
    "detalleOrden": {
      "kind": "detail",
      "text": "Aparato, defecto informado, fotos, diagnóstico, presupuesto, trabajo realizado y si está disponible para retiro, junto con el cliente y sus contactos para avisarle.",
      "intents": []
    },
    "formularioOrden": {
      "kind": "form",
      "text": "Abre la orden con el cliente, el aparato, el defecto y las fotos; registra el diagnóstico, las anotaciones internas y el valor del presupuesto; anota el trabajo realizado. Si el cliente no existe, se lo registra primero en Clientes.",
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
      "text": "Piezas de la orden con cantidad y costo interno; el técnico agrega o corrige piezas durante el diagnóstico.",
      "intents": [
        {
          "id": "agregarPieza",
          "kind": "submit"
        }
      ]
    },
    "costoPiezas": {
      "kind": "summary",
      "text": "Costo interno total de las piezas de la orden, para compararlo con el valor del presupuesto; solo para uso interno.",
      "intents": []
    },
    "accionesOrden": {
      "kind": "actions",
      "text": "Pasar al técnico, emitir presupuesto al cliente, marcar como lista o entregar y finalizar la orden, según la etapa en que esté.",
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
      "text": "Historial de la orden: apertura, presupuesto, respuesta del cliente, reparación y entrega, con sus fechas.",
      "intents": []
    }
  },
  "molecules": {
    "listaOrdenes": [
      {
        "role": "filtro por estado",
        "preferred": "groupnavigatesection--ml-navigate-pills",
        "alternative": "groupnavigatesection--ml-tabs"
      },
      {
        "role": "tabla de órdenes",
        "preferred": "groupviewtable--ml-side-detail-table",
        "alternative": "groupviewtable--ml-data-table"
      }
    ],
    "detalleOrden": [
      {
        "role": "bloques del detalle",
        "preferred": "groupexpandcontent--ml-collapsible-panel",
        "alternative": "groupexpandcontent--ml-accordion"
      },
      {
        "role": "aviso de disponible para retiro",
        "preferred": "groupnotifyuser--ml-contextual-feedback"
      }
    ],
    "formularioOrden": [
      {
        "role": "datos del aparato",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
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
        "preferred": "groupselectfileforupload--ml-file-upload-dropzone",
        "alternative": "groupselectfileforupload--ml-file-upload-preview"
      },
      {
        "role": "guardar",
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ],
    "piezasOrden": [
      {
        "role": "tabla de piezas",
        "preferred": "groupviewtable--ml-inline-edit-table",
        "alternative": "groupviewtable--ml-lcrud-detail-grid"
      },
      {
        "role": "costo unitario",
        "preferred": "groupentermoney--ml-currency-input",
        "alternative": "groupentermoney--ml-enter-money-br"
      },
      {
        "role": "descripción de la pieza",
        "preferred": "groupentertext--ml-enter-text"
      }
    ],
    "costoPiezas": [
      {
        "role": "costo interno total",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      }
    ],
    "accionesOrden": [
      {
        "role": "acciones de ciclo",
        "preferred": "grouptriggeraction--ml-button-group",
        "alternative": "grouptriggeraction--ml-split-button"
      },
      {
        "role": "confirmación",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
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

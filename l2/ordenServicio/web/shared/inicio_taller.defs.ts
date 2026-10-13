/// <mls fileReference="_102047_/l2/ordenServicio/web/shared/inicio_taller.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "etapa": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:ordenesPendientes",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:ordenesPendientes",
        "persist": true
      }
    }
  },
  "forms": {},
  "requests": {
    "qryOrdenesPendientes": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "ordenes"
      ]
    },
    "qryDestacadosTaller": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "cantidadDisponiblesRetiro",
        "ordenes"
      ]
    }
  },
  "states": {
    "qryOrdenesPendientesOrdenes": {
      "source": "qryOrdenesPendientes.ordenes",
      "description": "Fila de la cola de trabajo: orden que espera el paso del usuario.",
      "organisms": [
        "ordenesPendientes"
      ]
    },
    "cantidadDisponiblesRetiro": {
      "source": "qryDestacadosTaller.cantidadDisponiblesRetiro",
      "description": "cantidadDisponiblesRetiro como número ya calculado, y la lista de órdenes con número, estado, cliente, disponibilidad para retiro y costo interno (cuando el actor puede verlo), para preparar la entrega y comparar con el presupuesto.",
      "organisms": [
        "retiroYcostos"
      ]
    },
    "qryDestacadosTallerOrdenes": {
      "source": "qryDestacadosTaller.ordenes",
      "description": "Orden destacada con su disponibilidad para retiro y costo interno de piezas.",
      "organisms": [
        "retiroYcostos"
      ]
    }
  },
  "functions": {
    "qryOrdenesPendientes": {
      "description": "Carga la cola de trabajo del inicio del taller: las órdenes que esperan el paso del usuario actual, paginadas para recorrerlas con scroll. (qryOrdenesPendientesOrdenes.items: append)",
      "calls": "qryOrdenesPendientes",
      "sets": "qryOrdenesPendientesOrdenes"
    },
    "qryDestacadosTaller": {
      "description": "Carga los destacados del taller: el indicador de aparatos disponibles para retiro y una lista breve de órdenes con su disponibilidad y su costo interno de piezas.",
      "calls": "qryDestacadosTaller",
      "sets": "cantidadDisponiblesRetiro",
      "updates": [
        "qryDestacadosTallerOrdenes"
      ]
    },
    "abrirNuevaOrden": {
      "description": "Órdenes que esperan tu paso: abiertas por analizar y presupuestar, aprobadas por reparar y listas por entregar, con su número, cliente, aparato, defecto informado y fecha de apertura. Desde aquí abres una orden nueva o vas a la orden para avanzarla.",
      "navigate": "ordenes_servicio"
    },
    "atenderOrden": {
      "description": "Órdenes que esperan tu paso: abiertas por analizar y presupuestar, aprobadas por reparar y listas por entregar, con su número, cliente, aparato, defecto informado y fecha de apertura. Desde aquí abres una orden nueva o vas a la orden para avanzarla.",
      "navigate": "ordenes_servicio"
    },
    "verOrdenDestacada": {
      "description": "Órdenes con aparato disponible para retiro y costo interno de las piezas registradas en cada orden, para preparar la entrega y comparar con el presupuesto.",
      "navigate": "ordenes_servicio"
    }
  },
  "journeys": [
    {
      "step": "abrirOrdenServicio/buscarCliente",
      "organisms": [],
      "functions": [],
      "continuesIn": "ordenes_servicio"
    },
    {
      "step": "abrirOrdenServicio/registrarCliente",
      "organisms": [],
      "functions": [],
      "continuesIn": "ordenes_servicio"
    },
    {
      "step": "abrirOrdenServicio/crearOrden",
      "organisms": [],
      "functions": [],
      "continuesIn": "ordenes_servicio"
    },
    {
      "step": "diagnosticarYpresupuestar/buscarOrdenAbierta",
      "organisms": [
        "ordenesPendientes"
      ],
      "functions": [
        "qryOrdenesPendientes"
      ]
    },
    {
      "step": "diagnosticarYpresupuestar/revisarOrden",
      "organisms": [],
      "functions": [],
      "continuesIn": "ordenes_servicio"
    },
    {
      "step": "diagnosticarYpresupuestar/registrarDiagnostico",
      "organisms": [],
      "functions": [],
      "continuesIn": "ordenes_servicio"
    },
    {
      "step": "diagnosticarYpresupuestar/registrarPiezas",
      "organisms": [],
      "functions": [],
      "continuesIn": "ordenes_servicio"
    },
    {
      "step": "diagnosticarYpresupuestar/emitirPresupuesto",
      "organisms": [],
      "functions": [],
      "continuesIn": "ordenes_servicio"
    },
    {
      "step": "entregarYfinalizar/buscarOrdenLista",
      "organisms": [
        "ordenesPendientes",
        "retiroYcostos"
      ],
      "functions": [
        "qryOrdenesPendientes",
        "qryDestacadosTaller"
      ]
    },
    {
      "step": "entregarYfinalizar/revisarOrdenLista",
      "organisms": [],
      "functions": [],
      "continuesIn": "ordenes_servicio"
    },
    {
      "step": "entregarYfinalizar/finalizarOrden",
      "organisms": [],
      "functions": [],
      "continuesIn": "ordenes_servicio"
    },
    {
      "step": "realizarReparacion/buscarOrdenAprobada",
      "organisms": [
        "ordenesPendientes"
      ],
      "functions": [
        "qryOrdenesPendientes"
      ]
    },
    {
      "step": "realizarReparacion/revisarOrdenAprobada",
      "organisms": [],
      "functions": [],
      "continuesIn": "ordenes_servicio"
    },
    {
      "step": "realizarReparacion/registrarTrabajo",
      "organisms": [],
      "functions": [],
      "continuesIn": "ordenes_servicio"
    },
    {
      "step": "realizarReparacion/marcarLista",
      "organisms": [],
      "functions": [],
      "continuesIn": "ordenes_servicio"
    }
  ],
  "rules": {
    "qryOrdenesPendientes": [],
    "qryDestacadosTaller": [
      "disponibleParaRetiroCalculado",
      "costoInternoPiezasOrden",
      "costoTotalPieza"
    ]
  },
  "access": {
    "actors": [
      "recepcionista",
      "tecnico"
    ],
    "grants": [
      "recepcionistaClientes",
      "recepcionistaOrdenes",
      "tecnicoOrdenes",
      "tecnicoClientes"
    ]
  },
  "fields": {
    "Cliente.details.identification.name": [
      "ordenesPendientes",
      "retiroYcostos"
    ],
    "OrdenServicio.clienteId": [
      "ordenesPendientes",
      "retiroYcostos"
    ],
    "OrdenServicio.details.aparato.marca": [
      "ordenesPendientes"
    ],
    "OrdenServicio.details.aparato.modelo": [
      "ordenesPendientes"
    ],
    "OrdenServicio.details.aparato.tipo": [
      "ordenesPendientes"
    ],
    "OrdenServicio.details.costoInternoPiezas": [
      "retiroYcostos"
    ],
    "OrdenServicio.details.defectoInformado": [
      "ordenesPendientes"
    ],
    "OrdenServicio.details.disponibleParaRetiro": [
      "retiroYcostos"
    ],
    "OrdenServicio.fechaApertura": [
      "ordenesPendientes"
    ],
    "OrdenServicio.numero": [
      "ordenesPendientes",
      "retiroYcostos"
    ],
    "OrdenServicio.status": [
      "ordenesPendientes",
      "retiroYcostos"
    ]
  }
} as const;

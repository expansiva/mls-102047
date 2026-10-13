/// <mls fileReference="_102047_/l2/ordenServicio/web/shared/mis_ordenes.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:myOrders",
        "persist": true
      },
      "ordenId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:orderDetail",
        "persist": true
      },
      "ordenServicioId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:orderDetail",
        "persist": true
      }
    }
  },
  "forms": {
    "rechazarPresupuesto": {
      "organism": "budgetDecision",
      "submit": "rechazarPresupuesto"
    }
  },
  "requests": {
    "obtenerPendientesMisOrdenes": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "presupuestosPendientes",
        "disponiblesParaRetiro"
      ]
    },
    "listarMisOrdenes": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "ordenes"
      ]
    },
    "obtenerOrdenCliente": {
      "kind": "qry",
      "trigger": "obtenerOrdenCliente",
      "returns": [
        "orden"
      ]
    },
    "aprobarPresupuesto": {
      "kind": "cmd",
      "trigger": "aprobarPresupuesto",
      "returns": [
        "orden"
      ],
      "writes": "OrdenServicio.aprobarPresupuesto"
    },
    "rechazarPresupuesto": {
      "kind": "cmd",
      "trigger": "rechazarPresupuesto",
      "returns": [
        "orden"
      ],
      "writes": "OrdenServicio.rechazarPresupuesto"
    }
  },
  "states": {
    "presupuestosPendientes": {
      "source": "obtenerPendientesMisOrdenes.presupuestosPendientes",
      "description": "Fila de una orden del cliente, compartida por pendientes, retiro y la lista de órdenes.",
      "organisms": [
        "pendingBudgets"
      ]
    },
    "disponiblesParaRetiro": {
      "source": "obtenerPendientesMisOrdenes.disponiblesParaRetiro",
      "description": "Fila de una orden del cliente, compartida por pendientes, retiro y la lista de órdenes.",
      "organisms": [
        "readyForPickup"
      ]
    },
    "ordenes": {
      "source": "listarMisOrdenes.ordenes",
      "description": "Fila de una orden del cliente, compartida por pendientes, retiro y la lista de órdenes.",
      "organisms": [
        "myOrders"
      ]
    },
    "orden": {
      "source": "obtenerOrdenCliente.orden",
      "description": "Orden elegida con su detalle, presupuesto e historial, tal como la ve el cliente.",
      "organisms": [
        "budgetDecision",
        "orderDetail",
        "orderHistory"
      ]
    },
    "selectedOrdenServicio": {
      "source": "entry.params.ordenServicioId",
      "description": "Orden elegida con su detalle, presupuesto e historial, tal como la ve el cliente.",
      "organisms": [
        "myOrders",
        "orderDetail",
        "pendingBudgets",
        "readyForPickup"
      ]
    }
  },
  "functions": {
    "obtenerPendientesMisOrdenes": {
      "description": "Carga al abrir la página lo que requiere la atención del cliente: los presupuestos que esperan su respuesta y los aparatos que ya puede retirar.",
      "calls": "obtenerPendientesMisOrdenes",
      "sets": "presupuestosPendientes",
      "updates": [
        "disponiblesParaRetiro"
      ]
    },
    "listarMisOrdenes": {
      "description": "Lista todas las órdenes de servicio del cliente conectado, paginadas, para consultar cualquiera de ellas. (ordenes.items: append)",
      "calls": "listarMisOrdenes",
      "sets": "ordenes"
    },
    "obtenerOrdenCliente": {
      "description": "Abre la orden que el cliente elige en pendientes, retiro o su lista, con su detalle, presupuesto e historial en una sola llamada.",
      "calls": "obtenerOrdenCliente",
      "sets": "orden"
    },
    "aprobarPresupuesto": {
      "description": "Aprueba el presupuesto de la orden para que el técnico la repare.",
      "calls": "aprobarPresupuesto",
      "sets": "orden",
      "updates": [
        "presupuestosPendientes",
        "disponiblesParaRetiro",
        "ordenes"
      ]
    },
    "rechazarPresupuesto": {
      "description": "Rechaza el presupuesto de la orden, que se cierra y deja el aparato disponible para retiro.",
      "calls": "rechazarPresupuesto",
      "sets": "orden",
      "updates": [
        "presupuestosPendientes",
        "disponiblesParaRetiro",
        "ordenes"
      ]
    }
  },
  "journeys": [
    {
      "step": "consultarMisOrdenes/listarMisOrdenes",
      "organisms": [
        "myOrders",
        "pendingBudgets",
        "readyForPickup"
      ],
      "functions": [
        "listarMisOrdenes",
        "obtenerPendientesMisOrdenes"
      ]
    },
    {
      "step": "consultarMisOrdenes/verDetalleOrden",
      "organisms": [
        "orderDetail",
        "orderHistory"
      ],
      "functions": [
        "obtenerOrdenCliente"
      ]
    },
    {
      "step": "responderPresupuesto/abrirOrdenPresupuestada",
      "organisms": [
        "pendingBudgets",
        "orderDetail",
        "budgetDecision"
      ],
      "functions": [
        "obtenerPendientesMisOrdenes",
        "obtenerOrdenCliente"
      ]
    },
    {
      "step": "responderPresupuesto/aprobarPresupuesto",
      "organisms": [
        "budgetDecision"
      ],
      "functions": [
        "aprobarPresupuesto"
      ]
    },
    {
      "step": "responderPresupuesto/rechazarPresupuesto",
      "organisms": [
        "budgetDecision"
      ],
      "functions": [
        "rechazarPresupuesto"
      ]
    }
  ],
  "rules": {
    "obtenerPendientesMisOrdenes": [
      "clienteVeSoloSusOrdenes",
      "clienteNoVeCostoInterno",
      "costoInternoOcultoAlCliente",
      "anotacionesTecnicoOcultasAlCliente",
      "disponibleParaRetiroCalculado"
    ],
    "listarMisOrdenes": [
      "clienteVeSoloSusOrdenes",
      "clienteNoVeCostoInterno",
      "costoInternoOcultoAlCliente",
      "anotacionesTecnicoOcultasAlCliente",
      "disponibleParaRetiroCalculado"
    ],
    "obtenerOrdenCliente": [
      "clienteVeSoloSusOrdenes",
      "clienteNoVeCostoInterno",
      "costoInternoOcultoAlCliente",
      "anotacionesTecnicoOcultasAlCliente",
      "disponibleParaRetiroCalculado"
    ],
    "aprobarPresupuesto": [
      "clienteSoloRespondeSusOrdenes",
      "clienteNoVeCostoInterno",
      "anotacionesTecnicoOcultasAlCliente"
    ],
    "rechazarPresupuesto": [
      "clienteSoloRespondeSusOrdenes",
      "rechazoCierraOrden",
      "disponibleParaRetiroCalculado",
      "clienteNoVeCostoInterno",
      "anotacionesTecnicoOcultasAlCliente"
    ]
  },
  "access": {
    "actors": [
      "cliente"
    ],
    "grants": [
      "clienteMisOrdenes",
      "clienteMiRegistro"
    ]
  },
  "fields": {
    "Cliente.details.identification.name": [
      "orderDetail"
    ],
    "OrdenServicio.details.aparato.accesorios": [
      "orderDetail"
    ],
    "OrdenServicio.details.aparato.marca": [
      "myOrders",
      "orderDetail",
      "pendingBudgets",
      "readyForPickup"
    ],
    "OrdenServicio.details.aparato.modelo": [
      "myOrders",
      "orderDetail"
    ],
    "OrdenServicio.details.aparato.numeroSerie": [
      "orderDetail"
    ],
    "OrdenServicio.details.aparato.tipo": [
      "myOrders",
      "orderDetail",
      "pendingBudgets",
      "readyForPickup"
    ],
    "OrdenServicio.details.defectoInformado": [
      "orderDetail"
    ],
    "OrdenServicio.details.diagnostico": [
      "orderDetail"
    ],
    "OrdenServicio.details.disponibleParaRetiro": [
      "orderDetail",
      "readyForPickup"
    ],
    "OrdenServicio.details.entrega.fechaEntrega": [
      "orderHistory"
    ],
    "OrdenServicio.details.presupuesto.fechaEmision": [
      "orderDetail",
      "orderHistory",
      "pendingBudgets"
    ],
    "OrdenServicio.details.presupuesto.fechaRespuesta": [
      "orderHistory"
    ],
    "OrdenServicio.details.presupuesto.motivoRechazo": [
      "budgetDecision",
      "orderHistory"
    ],
    "OrdenServicio.details.presupuesto.valor": [
      "budgetDecision",
      "orderDetail",
      "pendingBudgets"
    ],
    "OrdenServicio.details.reparacion.fechaLista": [
      "orderHistory"
    ],
    "OrdenServicio.details.reparacion.trabajoRealizado": [
      "orderHistory"
    ],
    "OrdenServicio.fechaApertura": [
      "myOrders",
      "orderDetail",
      "orderHistory"
    ],
    "OrdenServicio.numero": [
      "budgetDecision",
      "myOrders",
      "orderDetail",
      "pendingBudgets",
      "readyForPickup"
    ],
    "OrdenServicio.status": [
      "budgetDecision",
      "myOrders",
      "orderDetail",
      "orderHistory",
      "pendingBudgets",
      "readyForPickup"
    ]
  }
} as const;

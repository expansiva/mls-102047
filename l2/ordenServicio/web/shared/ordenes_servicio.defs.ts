/// <mls fileReference="_102047_/l2/ordenServicio/web/shared/ordenes_servicio.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "status": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaOrdenes",
        "persist": true
      },
      "texto": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaOrdenes",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:listaOrdenes",
        "persist": true
      },
      "ordenId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:detalleOrden",
        "persist": true
      },
      "clienteId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:Cliente",
        "persist": true
      },
      "ordenServicioId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:detalleOrden",
        "persist": true
      }
    }
  },
  "forms": {
    "abrirOrden": {
      "organism": "formularioOrden",
      "submit": "abrirOrden"
    },
    "guardarOrden": {
      "organism": "formularioOrden",
      "submit": "guardarOrden"
    },
    "agregarPieza": {
      "organism": "piezasOrden",
      "submit": "agregarPieza"
    },
    "emitirPresupuesto": {
      "organism": "formularioOrden",
      "submit": "emitirPresupuesto"
    },
    "marcarLista": {
      "organism": "formularioOrden",
      "submit": "marcarLista"
    },
    "finalizarOrden": {
      "organism": "accionesOrden",
      "submit": "finalizarOrden"
    }
  },
  "requests": {
    "qryListaOrdenes": {
      "kind": "qry",
      "trigger": "onLoad",
      "returns": [
        "ordenes"
      ]
    },
    "qryOrden": {
      "kind": "qry",
      "trigger": "qryOrden",
      "returns": [
        "orden",
        "piezas",
        "costoInternoPiezas"
      ]
    },
    "qryBuscarClientes": {
      "kind": "qry",
      "trigger": "qryBuscarClientes",
      "returns": [
        "clientes"
      ]
    },
    "cmdAbrirOrden": {
      "kind": "cmd",
      "trigger": "abrirOrden",
      "returns": [
        "orden"
      ],
      "writes": "OrdenServicio.create"
    },
    "cmdGuardarOrden": {
      "kind": "cmd",
      "trigger": "guardarOrden",
      "returns": [
        "orden"
      ],
      "writes": "OrdenServicio.update"
    },
    "cmdAgregarPieza": {
      "kind": "cmd",
      "trigger": "agregarPieza",
      "returns": [
        "pieza",
        "costoInternoPiezas"
      ],
      "writes": "PiezaOrden.create"
    },
    "cmdEmitirPresupuesto": {
      "kind": "cmd",
      "trigger": "emitirPresupuesto",
      "returns": [
        "orden"
      ],
      "writes": "OrdenServicio.emitirPresupuesto"
    },
    "cmdMarcarLista": {
      "kind": "cmd",
      "trigger": "marcarLista",
      "returns": [
        "orden"
      ],
      "writes": "OrdenServicio.marcarLista"
    },
    "cmdFinalizarOrden": {
      "kind": "cmd",
      "trigger": "finalizarOrden",
      "returns": [
        "orden"
      ],
      "writes": "OrdenServicio.finalizar"
    }
  },
  "states": {
    "ordenes": {
      "source": "qryListaOrdenes.ordenes",
      "description": "Fila de la bandeja de órdenes.",
      "organisms": [
        "listaOrdenes"
      ]
    },
    "orden": {
      "source": "qryOrden.orden",
      "description": "Orden completa con cliente, aparato, presupuesto, reparación, entrega y fechas del historial.",
      "organisms": [
        "accionesOrden",
        "costoPiezas",
        "detalleOrden",
        "formularioOrden",
        "historialOrden"
      ]
    },
    "clientes": {
      "source": "qryBuscarClientes.clientes",
      "description": "Cliente resumido: id y nombre.",
      "organisms": [
        "formularioOrden"
      ]
    },
    "piezas": {
      "source": "qryOrden.piezas",
      "description": "Pieza de la orden con su costo interno.",
      "organisms": [
        "piezasOrden"
      ]
    },
    "costoInternoPiezas": {
      "source": "qryOrden.costoInternoPiezas",
      "description": "La ficha de la orden, sus piezas y el costo interno total, para comparar con el valor del presupuesto y decidir el siguiente paso.",
      "organisms": [
        "costoPiezas"
      ]
    },
    "selectedOrdenServicio": {
      "source": "entry.params.ordenServicioId",
      "description": "Orden completa con cliente, aparato, presupuesto, reparación, entrega y fechas del historial.",
      "organisms": [
        "detalleOrden",
        "listaOrdenes"
      ]
    }
  },
  "functions": {
    "qryListaOrdenes": {
      "description": "Carga la bandeja de órdenes de la organización filtrada por estado, para que recepción y técnico elijan la orden a trabajar.",
      "calls": "qryListaOrdenes",
      "sets": "ordenes"
    },
    "qryOrden": {
      "description": "Carga en una sola llamada la orden seleccionada completa: ficha, datos para el formulario, acciones, historial, piezas y costo interno.",
      "calls": "qryOrden",
      "sets": "orden",
      "updates": [
        "piezas",
        "costoInternoPiezas"
      ]
    },
    "qryBuscarClientes": {
      "description": "Busca al cliente por nombre o documento al abrir una orden, para reutilizar su registro.",
      "calls": "qryBuscarClientes",
      "sets": "clientes"
    },
    "cmdAbrirOrden": {
      "description": "Abre una orden de servicio nueva en estado abierta para el cliente elegido.",
      "calls": "cmdAbrirOrden",
      "sets": "orden",
      "updates": [
        "ordenes"
      ]
    },
    "cmdGuardarOrden": {
      "description": "Guarda los datos de la etapa actual (cliente, aparato, diagnóstico, anotaciones internas, valor del presupuesto, trabajo realizado) sin cambiar el estado.",
      "calls": "cmdGuardarOrden",
      "sets": "orden"
    },
    "cmdAgregarPieza": {
      "description": "Agrega una pieza con su costo interno a la orden durante el diagnóstico. (piezas: upsert)",
      "calls": "cmdAgregarPieza",
      "sets": "costoInternoPiezas",
      "updates": [
        "piezas"
      ]
    },
    "cmdEmitirPresupuesto": {
      "description": "Emite el presupuesto al cliente y pasa la orden de abierta a presupuestada.",
      "calls": "cmdEmitirPresupuesto",
      "sets": "orden",
      "updates": [
        "ordenes"
      ]
    },
    "cmdMarcarLista": {
      "description": "Marca la orden aprobada como lista para entrega.",
      "calls": "cmdMarcarLista",
      "sets": "orden",
      "updates": [
        "ordenes"
      ]
    },
    "cmdFinalizarOrden": {
      "description": "Registra la entrega del aparato y finaliza la orden.",
      "calls": "cmdFinalizarOrden",
      "sets": "orden",
      "updates": [
        "ordenes"
      ]
    },
    "registrarClienteNuevo": {
      "description": "Abre la orden con el cliente, el aparato, el defecto y las fotos; registra el diagnóstico, las anotaciones internas y el valor del presupuesto; anota el trabajo realizado. Si el cliente no existe, se lo registra primero en Clientes.",
      "navigate": "clientes"
    }
  },
  "journeys": [
    {
      "step": "abrirOrdenServicio/buscarCliente",
      "organisms": [
        "formularioOrden"
      ],
      "functions": [
        "qryBuscarClientes"
      ]
    },
    {
      "step": "abrirOrdenServicio/registrarCliente",
      "organisms": [
        "formularioOrden"
      ],
      "functions": [],
      "continuesIn": "clientes"
    },
    {
      "step": "abrirOrdenServicio/crearOrden",
      "organisms": [
        "formularioOrden"
      ],
      "functions": [
        "cmdAbrirOrden"
      ]
    },
    {
      "step": "diagnosticarYpresupuestar/buscarOrdenAbierta",
      "organisms": [
        "listaOrdenes"
      ],
      "functions": [
        "qryListaOrdenes"
      ]
    },
    {
      "step": "diagnosticarYpresupuestar/revisarOrden",
      "organisms": [
        "detalleOrden",
        "historialOrden"
      ],
      "functions": [
        "qryOrden"
      ]
    },
    {
      "step": "diagnosticarYpresupuestar/registrarDiagnostico",
      "organisms": [
        "formularioOrden"
      ],
      "functions": [
        "cmdGuardarOrden"
      ]
    },
    {
      "step": "diagnosticarYpresupuestar/registrarPiezas",
      "organisms": [
        "piezasOrden",
        "costoPiezas"
      ],
      "functions": [
        "cmdAgregarPieza"
      ]
    },
    {
      "step": "diagnosticarYpresupuestar/emitirPresupuesto",
      "organisms": [
        "accionesOrden"
      ],
      "functions": [
        "cmdEmitirPresupuesto"
      ]
    },
    {
      "step": "entregarYfinalizar/buscarOrdenLista",
      "organisms": [
        "listaOrdenes"
      ],
      "functions": [
        "qryListaOrdenes"
      ]
    },
    {
      "step": "entregarYfinalizar/revisarOrdenLista",
      "organisms": [
        "detalleOrden"
      ],
      "functions": [
        "qryOrden"
      ]
    },
    {
      "step": "entregarYfinalizar/finalizarOrden",
      "organisms": [
        "accionesOrden"
      ],
      "functions": [
        "cmdFinalizarOrden"
      ]
    },
    {
      "step": "realizarReparacion/buscarOrdenAprobada",
      "organisms": [
        "listaOrdenes"
      ],
      "functions": [
        "qryListaOrdenes"
      ]
    },
    {
      "step": "realizarReparacion/revisarOrdenAprobada",
      "organisms": [
        "detalleOrden",
        "piezasOrden"
      ],
      "functions": [
        "qryOrden"
      ]
    },
    {
      "step": "realizarReparacion/registrarTrabajo",
      "organisms": [
        "formularioOrden"
      ],
      "functions": [
        "cmdGuardarOrden"
      ]
    },
    {
      "step": "realizarReparacion/marcarLista",
      "organisms": [
        "accionesOrden"
      ],
      "functions": [
        "cmdMarcarLista"
      ]
    }
  ],
  "rules": {
    "qryListaOrdenes": [
      "disponibleParaRetiroCalculado"
    ],
    "qryOrden": [
      "disponibleParaRetiroCalculado",
      "costoInternoPiezasOrden",
      "costoTotalPieza"
    ],
    "qryBuscarClientes": [],
    "cmdAbrirOrden": [
      "numeroOrdenUnico",
      "fotosAparatoEnAdjuntos",
      "disponibleParaRetiroCalculado"
    ],
    "cmdGuardarOrden": [
      "disponibleParaRetiroCalculado"
    ],
    "cmdAgregarPieza": [
      "cantidadPositiva",
      "piezasSoloAntesDePresupuesto",
      "costoTotalPieza",
      "costoInternoPiezasOrden"
    ],
    "cmdEmitirPresupuesto": [
      "presupuestoRequiereDiagnosticoYValor"
    ],
    "cmdMarcarLista": [
      "listaRequiereTrabajoRealizado",
      "disponibleParaRetiroCalculado"
    ],
    "cmdFinalizarOrden": [
      "finalizarSoloOrdenLista"
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
    "Cliente.details.base.contacts": [
      "detalleOrden"
    ],
    "Cliente.details.identification.name": [
      "detalleOrden",
      "formularioOrden",
      "listaOrdenes"
    ],
    "OrdenServicio.clienteId": [
      "formularioOrden",
      "listaOrdenes"
    ],
    "OrdenServicio.details.anotacionesTecnico": [
      "formularioOrden"
    ],
    "OrdenServicio.details.aparato.accesorios": [
      "detalleOrden",
      "formularioOrden"
    ],
    "OrdenServicio.details.aparato.estadoFisico": [
      "detalleOrden",
      "formularioOrden"
    ],
    "OrdenServicio.details.aparato.marca": [
      "detalleOrden",
      "formularioOrden",
      "listaOrdenes"
    ],
    "OrdenServicio.details.aparato.modelo": [
      "detalleOrden",
      "formularioOrden"
    ],
    "OrdenServicio.details.aparato.numeroSerie": [
      "detalleOrden",
      "formularioOrden"
    ],
    "OrdenServicio.details.aparato.tipo": [
      "detalleOrden",
      "formularioOrden",
      "listaOrdenes"
    ],
    "OrdenServicio.details.costoInternoPiezas": [
      "costoPiezas"
    ],
    "OrdenServicio.details.defectoInformado": [
      "detalleOrden",
      "formularioOrden"
    ],
    "OrdenServicio.details.diagnostico": [
      "accionesOrden",
      "detalleOrden",
      "formularioOrden"
    ],
    "OrdenServicio.details.disponibleParaRetiro": [
      "detalleOrden",
      "listaOrdenes"
    ],
    "OrdenServicio.details.entrega.fechaEntrega": [
      "historialOrden"
    ],
    "OrdenServicio.details.entrega.observaciones": [
      "accionesOrden",
      "historialOrden"
    ],
    "OrdenServicio.details.presupuesto.fechaEmision": [
      "historialOrden"
    ],
    "OrdenServicio.details.presupuesto.fechaRespuesta": [
      "historialOrden"
    ],
    "OrdenServicio.details.presupuesto.motivoRechazo": [
      "historialOrden"
    ],
    "OrdenServicio.details.presupuesto.valor": [
      "accionesOrden",
      "costoPiezas",
      "detalleOrden",
      "formularioOrden"
    ],
    "OrdenServicio.details.reparacion.fechaLista": [
      "historialOrden"
    ],
    "OrdenServicio.details.reparacion.trabajoRealizado": [
      "accionesOrden",
      "detalleOrden",
      "formularioOrden"
    ],
    "OrdenServicio.fechaApertura": [
      "historialOrden",
      "listaOrdenes"
    ],
    "OrdenServicio.numero": [
      "detalleOrden",
      "listaOrdenes"
    ],
    "OrdenServicio.status": [
      "accionesOrden",
      "detalleOrden",
      "formularioOrden",
      "historialOrden",
      "listaOrdenes"
    ],
    "PiezaOrden.descripcion": [
      "piezasOrden"
    ],
    "PiezaOrden.details.cantidad": [
      "piezasOrden"
    ],
    "PiezaOrden.details.codigoPieza": [
      "piezasOrden"
    ],
    "PiezaOrden.details.costoTotal": [
      "piezasOrden"
    ],
    "PiezaOrden.details.costoUnitario": [
      "piezasOrden"
    ],
    "PiezaOrden.details.observacion": [
      "piezasOrden"
    ]
  }
} as const;

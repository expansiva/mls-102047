/// <mls fileReference="_102047_/l2/ordenServicio/web/shared/clientes.defs.ts" enhancement="_blank"/>

export const definition = {
  "entry": {
    "params": {
      "texto": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:buscarCliente",
        "persist": true
      },
      "page": {
        "type": "number",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "filter:buscarCliente",
        "persist": true
      },
      "clienteId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "select:fichaCliente",
        "persist": true
      },
      "docId": {
        "type": "string",
        "sources": [
          "url",
          "localStorage"
        ],
        "effect": "prefill:registrarCliente",
        "persist": false
      }
    }
  },
  "forms": {
    "registrarCliente": {
      "organism": "registrarCliente",
      "submit": "registrarCliente"
    }
  },
  "requests": {
    "buscarClientes": {
      "kind": "qry",
      "trigger": "buscarClientes",
      "returns": [
        "clientes"
      ]
    },
    "obtenerFichaCliente": {
      "kind": "qry",
      "trigger": "obtenerFichaCliente",
      "returns": [
        "cliente",
        "ordenes"
      ]
    },
    "registrarCliente": {
      "kind": "cmd",
      "trigger": "registrarCliente",
      "returns": [
        "cliente",
        "ordenes"
      ],
      "writes": "Cliente.create"
    }
  },
  "states": {
    "clientes": {
      "source": "buscarClientes.clientes",
      "description": "Resultado de búsqueda de cliente: id, nombre, documento, país y estado.",
      "organisms": [
        "buscarCliente"
      ]
    },
    "cliente": {
      "source": "obtenerFichaCliente.cliente",
      "description": "Ficha del cliente con identificación, contactos y consentimiento.",
      "organisms": [
        "fichaCliente"
      ]
    },
    "ordenes": {
      "source": "obtenerFichaCliente.ordenes",
      "description": "Orden de servicio del cliente en su historial de recepción.",
      "organisms": [
        "fichaCliente"
      ]
    },
    "selectedCliente": {
      "source": "entry.params.clienteId",
      "description": "Ficha del cliente con identificación, contactos y consentimiento.",
      "organisms": [
        "buscarCliente",
        "fichaCliente",
        "registrarCliente"
      ]
    }
  },
  "functions": {
    "buscarClientes": {
      "description": "Busca clientes por parte del nombre o por número de documento para que el recepcionista elija el registro correcto antes de registrar a alguien nuevo.",
      "calls": "buscarClientes",
      "sets": "clientes"
    },
    "obtenerFichaCliente": {
      "description": "Carga en una sola llamada la ficha del cliente elegido y su historial de órdenes de servicio, para confirmar identidad y continuar a abrir una orden.",
      "calls": "obtenerFichaCliente",
      "sets": "cliente",
      "updates": [
        "ordenes"
      ]
    },
    "registrarCliente": {
      "description": "Registra un cliente nuevo (o reutiliza el existente con el mismo documento) y lo deja seleccionado en la ficha para abrir la orden.",
      "calls": "registrarCliente",
      "sets": "cliente",
      "updates": [
        "ordenes"
      ]
    },
    "abrirOrdenServicio": {
      "description": "Datos del cliente seleccionado (nombre, documento, país, contactos y estado) y sus órdenes de servicio con número, estado, fecha de apertura, aparato y si está disponible para retiro. Desde aquí se continúa a abrir una orden nueva.",
      "navigate": "ordenes_servicio",
      "carries": {
        "clienteId": "selectedCliente.id"
      }
    }
  },
  "journeys": [
    {
      "step": "abrirOrdenServicio/buscarCliente",
      "organisms": [
        "buscarCliente",
        "fichaCliente"
      ],
      "functions": [
        "buscarClientes",
        "obtenerFichaCliente"
      ]
    },
    {
      "step": "abrirOrdenServicio/registrarCliente",
      "organisms": [
        "registrarCliente",
        "fichaCliente"
      ],
      "functions": [
        "registrarCliente"
      ]
    },
    {
      "step": "abrirOrdenServicio/crearOrden",
      "organisms": [
        "fichaCliente"
      ],
      "functions": [],
      "continuesIn": "ordenes_servicio"
    }
  ],
  "rules": {
    "buscarClientes": [],
    "obtenerFichaCliente": [
      "disponibleParaRetiroCalculado"
    ],
    "registrarCliente": []
  },
  "access": {
    "actors": [
      "recepcionista"
    ],
    "grants": [
      "recepcionistaClientes",
      "recepcionistaOrdenes"
    ]
  },
  "fields": {
    "Cliente.details.base.contacts": [
      "fichaCliente"
    ],
    "Cliente.details.identification.countryCode": [
      "buscarCliente",
      "fichaCliente",
      "registrarCliente"
    ],
    "Cliente.details.identification.docId": [
      "buscarCliente",
      "fichaCliente",
      "registrarCliente"
    ],
    "Cliente.details.identification.docType": [
      "buscarCliente",
      "fichaCliente",
      "registrarCliente"
    ],
    "Cliente.details.identification.name": [
      "buscarCliente",
      "fichaCliente",
      "registrarCliente"
    ],
    "Cliente.details.identification.status": [
      "buscarCliente",
      "fichaCliente"
    ],
    "Cliente.details.person.privacyConsent": [
      "fichaCliente",
      "registrarCliente"
    ],
    "Cliente.id": [
      "buscarCliente",
      "fichaCliente"
    ],
    "OrdenServicio.clienteId": [
      "fichaCliente"
    ],
    "OrdenServicio.details.aparato.marca": [
      "fichaCliente"
    ],
    "OrdenServicio.details.aparato.modelo": [
      "fichaCliente"
    ],
    "OrdenServicio.details.aparato.tipo": [
      "fichaCliente"
    ],
    "OrdenServicio.details.disponibleParaRetiro": [
      "fichaCliente"
    ],
    "OrdenServicio.fechaApertura": [
      "fichaCliente"
    ],
    "OrdenServicio.id": [
      "fichaCliente"
    ],
    "OrdenServicio.numero": [
      "fichaCliente"
    ],
    "OrdenServicio.status": [
      "fichaCliente"
    ]
  }
} as const;

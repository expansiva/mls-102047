/// <mls fileReference="_102047_/l2/ordenServicio/web/mobile/page11/clientes.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/customerManagement/page21.md",
    "experience": "directoryProfile"
  },
  "intent": "En el mostrador, desde el celular, el recepcionista busca al cliente, confirma su ficha y sus órdenes o lo registra si no existe, en una sola columna fluida de unos 390px que sigue cómoda entre 360px y 430px.",
  "sections": [
    {
      "id": "busqueda",
      "priority": "primary",
      "purpose": "Buscar al cliente por nombre o documento arriba, con resultados apilados fáciles de tocar.",
      "organisms": [
        "buscarCliente"
      ]
    },
    {
      "id": "ficha",
      "priority": "main",
      "purpose": "Ver la ficha del cliente elegido y sus órdenes en tarjetas apiladas, con acceso directo para abrir una orden nueva.",
      "organisms": [
        "fichaCliente"
      ]
    },
    {
      "id": "alta",
      "priority": "secondary",
      "purpose": "Registrar un cliente nuevo con campos en una sola columna cuando la búsqueda no lo encuentra.",
      "organisms": [
        "registrarCliente"
      ]
    }
  ],
  "organisms": {
    "buscarCliente": {
      "kind": "list",
      "text": "Busca al cliente por nombre o identificación; cada resultado muestra nombre, documento y estado para elegirlo con un toque.",
      "intents": []
    },
    "fichaCliente": {
      "kind": "detail",
      "text": "Datos del cliente (nombre, documento, país, contactos y estado) y sus órdenes de servicio con número, estado, fecha, aparato y si está disponible para retiro; permite continuar a abrir una orden nueva.",
      "intents": [
        {
          "id": "abrirOrdenServicio",
          "kind": "navigate",
          "to": "ordenes_servicio"
        }
      ]
    },
    "registrarCliente": {
      "kind": "form",
      "text": "Registra un cliente nuevo con nombre, tipo y número de documento, país y consentimiento de privacidad cuando no aparece en la búsqueda.",
      "intents": [
        {
          "id": "registrarCliente",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "buscarCliente": [
      {
        "role": "Campo de búsqueda por nombre o documento",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-history"
      },
      {
        "role": "Resultados de clientes apilados",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-table"
      }
    ],
    "fichaCliente": [
      {
        "role": "Identidad y contactos del cliente",
        "preferred": "groupviewcard--ml-profile-card",
        "alternative": "groupviewcard--ml-vertical-card"
      },
      {
        "role": "Órdenes de servicio del cliente",
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-data-table"
      },
      {
        "role": "Abrir una orden nueva para este cliente",
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ],
    "registrarCliente": [
      {
        "role": "Nombre y número de documento",
        "preferred": "groupentertext--ml-floating-text-input",
        "alternative": "groupentertext--ml-enter-text"
      },
      {
        "role": "Tipo de documento",
        "preferred": "groupselectone--ml-select",
        "alternative": "groupselectone--ml-radio-group"
      },
      {
        "role": "País del cliente",
        "preferred": "groupselectone--ml-select-one-autocomplete",
        "alternative": "groupselectone--ml-combobox"
      },
      {
        "role": "Registrar cliente",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "Confirmación o error del registro",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;

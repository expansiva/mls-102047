/// <mls fileReference="_102047_/l2/ordenServicio/web/desktop/page11/clientes.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/customerManagement/page21.md",
    "experience": "directoryProfile"
  },
  "intent": "El recepcionista localiza al cliente que trae un aparato, confirma sus datos y sus órdenes anteriores, y lo registra si todavía no existe, para luego abrir la orden de servicio sin duplicar registros.",
  "sections": [
    {
      "id": "busqueda",
      "priority": "primary",
      "purpose": "Encontrar rápido al cliente por nombre o número de documento antes de registrar a nadie de nuevo.",
      "organisms": [
        "buscarCliente"
      ]
    },
    {
      "id": "ficha",
      "priority": "main",
      "purpose": "Confirmar la identidad y los contactos del cliente elegido y revisar sus órdenes de servicio, para seguir con la apertura de una nueva orden.",
      "organisms": [
        "fichaCliente"
      ]
    },
    {
      "id": "alta",
      "priority": "secondary",
      "purpose": "Registrar a un cliente nuevo cuando la búsqueda no lo encuentra.",
      "organisms": [
        "registrarCliente"
      ]
    }
  ],
  "organisms": {
    "buscarCliente": {
      "kind": "list",
      "text": "Busca al cliente por nombre o identificación y muestra los resultados con su nombre, documento, país y estado para elegir el registro correcto.",
      "intents": []
    },
    "fichaCliente": {
      "kind": "detail",
      "text": "Datos del cliente seleccionado (nombre, documento, país, contactos y estado) y sus órdenes de servicio con número, estado, fecha de apertura, aparato y si está disponible para retiro. Desde aquí se continúa a abrir una orden nueva.",
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
      "text": "Registra un cliente nuevo con su nombre, tipo y número de documento, país y consentimiento de privacidad cuando no aparece en la búsqueda.",
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
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "Resultados de clientes encontrados",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewdata--ml-vertical-record-list"
      },
      {
        "role": "Paginación de resultados",
        "preferred": "grouptriggeraction--ml-pagination-control"
      }
    ],
    "fichaCliente": [
      {
        "role": "Identidad y contactos del cliente",
        "preferred": "groupviewcard--ml-profile-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      },
      {
        "role": "Órdenes de servicio del cliente",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewdata--ml-vertical-record-list"
      },
      {
        "role": "Abrir una orden nueva para este cliente",
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ],
    "registrarCliente": [
      {
        "role": "Nombre y número de documento",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
      },
      {
        "role": "Tipo de documento",
        "preferred": "groupselectone--ml-select",
        "alternative": "groupselectone--ml-combobox"
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

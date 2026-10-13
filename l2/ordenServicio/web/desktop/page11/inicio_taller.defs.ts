/// <mls fileReference="_102047_/l2/ordenServicio/web/desktop/page11/inicio_taller.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/operationsQueue/page21.md",
    "experience": "workQueueSplit"
  },
  "intent": "Punto de partida del taller: muestra al recepcionista y al técnico las órdenes que esperan su paso en el ciclo (abrir, diagnosticar y presupuestar, reparar, entregar) y destaca los aparatos disponibles para retiro y el costo interno de piezas por orden, para que cada uno sepa qué hacer ahora.",
  "sections": [
    {
      "id": "colaTrabajo",
      "priority": "primary",
      "purpose": "Lista de órdenes pendientes según la etapa que le toca al usuario, con número, cliente, aparato, defecto y fecha de apertura, para abrir la orden y avanzarla.",
      "organisms": [
        "ordenesPendientes"
      ]
    },
    {
      "id": "destacadosTaller",
      "priority": "secondary",
      "purpose": "Resumen de aparatos disponibles para retiro y costo interno de piezas por orden, como apoyo a la entrega y al presupuesto.",
      "organisms": [
        "retiroYcostos"
      ]
    }
  ],
  "organisms": {
    "ordenesPendientes": {
      "kind": "inbox",
      "text": "Órdenes que esperan tu paso: abiertas por analizar y presupuestar, aprobadas por reparar y listas por entregar, con su número, cliente, aparato, defecto informado y fecha de apertura. Desde aquí abres una orden nueva o vas a la orden para avanzarla.",
      "intents": [
        {
          "id": "abrirNuevaOrden",
          "kind": "navigate",
          "to": "ordenes_servicio"
        },
        {
          "id": "atenderOrden",
          "kind": "navigate",
          "to": "ordenes_servicio"
        }
      ]
    },
    "retiroYcostos": {
      "kind": "highlights",
      "text": "Órdenes con aparato disponible para retiro y costo interno de las piezas registradas en cada orden, para preparar la entrega y comparar con el presupuesto.",
      "intents": [
        {
          "id": "verOrdenDestacada",
          "kind": "navigate",
          "to": "ordenes_servicio"
        }
      ]
    }
  },
  "molecules": {
    "ordenesPendientes": [
      {
        "role": "Cola de órdenes pendientes",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewdata--ml-vertical-record-list"
      },
      {
        "role": "Filtrar por etapa del ciclo",
        "preferred": "groupnavigatesection--ml-navigate-pills",
        "alternative": "groupnavigatesection--ml-tabs"
      },
      {
        "role": "Buscar orden por número o cliente",
        "preferred": "groupsearchcontent--ml-search-bar"
      },
      {
        "role": "Abrir orden nueva",
        "preferred": "grouptriggeraction--ml-button-standard"
      }
    ],
    "retiroYcostos": [
      {
        "role": "Cantidad de aparatos para retiro",
        "preferred": "groupviewmetric--ml-metric-card",
        "alternative": "groupviewmetric--ml-metric-big-number"
      },
      {
        "role": "Costo interno de piezas por orden",
        "preferred": "groupviewtable--ml-data-table-minimal",
        "alternative": "groupviewchart--ml-bar-chart"
      }
    ]
  }
} as const;

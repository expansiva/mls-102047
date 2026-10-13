/// <mls fileReference="_102047_/l2/ordenServicio/web/mobile/page11/inicio_taller.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/operationsQueue/page21.md",
    "experience": "workQueueSplit"
  },
  "intent": "Inicio del taller en pantalla estrecha: primero las órdenes que esperan tu paso, en una lista fluida fácil de recorrer con el pulgar, y luego los aparatos para retiro y el costo interno de piezas por orden.",
  "sections": [
    {
      "id": "colaTrabajo",
      "priority": "primary",
      "purpose": "Órdenes pendientes apiladas con número, cliente, aparato y etapa, para tocar una y avanzarla en la página de órdenes.",
      "organisms": [
        "ordenesPendientes"
      ]
    },
    {
      "id": "destacadosTaller",
      "priority": "secondary",
      "purpose": "Indicador de aparatos disponibles para retiro y lista breve del costo interno de piezas por orden.",
      "organisms": [
        "retiroYcostos"
      ]
    }
  ],
  "organisms": {
    "ordenesPendientes": {
      "kind": "inbox",
      "text": "Órdenes que esperan tu paso: por analizar y presupuestar, por reparar o por entregar, con número, cliente, aparato y defecto informado. Toca una para avanzarla o abre una orden nueva.",
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
      "text": "Aparatos disponibles para retiro y costo interno de piezas de cada orden, en formato compacto.",
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
        "preferred": "groupviewdata--ml-vertical-record-list",
        "alternative": "groupviewtable--ml-responsive-table"
      },
      {
        "role": "Filtrar por etapa del ciclo",
        "preferred": "groupnavigatesection--ml-navigate-pills"
      },
      {
        "role": "Abrir orden nueva",
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-icon-button"
      }
    ],
    "retiroYcostos": [
      {
        "role": "Cantidad de aparatos para retiro",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      },
      {
        "role": "Costo interno de piezas por orden",
        "preferred": "groupviewtable--ml-responsive-table",
        "alternative": "groupviewdata--ml-vertical-record-list"
      }
    ]
  }
} as const;

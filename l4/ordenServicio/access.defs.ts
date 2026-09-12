/// <mls fileReference="_102047_/l4/ordenServicio/access.defs.ts" enhancement="_blank"/>

import type { Ns5AccessArtifact } from '/_102035_/l2/solution/types.js';

export const ordenServicioAccess = {
  "schemaVersion": "2026-09-10-ns5-access-v2",
  "moduleName": "ordenServicio",
  "actors": [
    {
      "actorId": "recepcionista",
      "kind": "internal",
      "origin": "named",
      "title": "Recepcionista",
      "description": "Personal del servicio técnico que abre las órdenes, entrega los aparatos y finaliza las órdenes."
    },
    {
      "actorId": "tecnico",
      "kind": "internal",
      "origin": "named",
      "title": "Técnico",
      "description": "Personal técnico que analiza los aparatos, registra diagnósticos y presupuestos, y realiza las reparaciones."
    },
    {
      "actorId": "cliente",
      "kind": "external",
      "origin": "named",
      "title": "Cliente",
      "description": "Persona que consulta sus propias órdenes en el portal y aprueba o rechaza presupuestos."
    }
  ],
  "authorities": [
    {
      "authorityId": "gestionarRecepcionYentrega",
      "title": "Gestionar recepción y entrega",
      "description": "Permite registrar la recepción de aparatos, abrir órdenes de servicio y registrar su entrega y finalización."
    },
    {
      "authorityId": "gestionarAnalisisYreparacion",
      "title": "Gestionar análisis y reparación",
      "description": "Permite consultar órdenes, registrar diagnósticos, piezas necesarias, presupuestos y trabajos de reparación, y dejar las órdenes listas para entrega."
    },
    {
      "authorityId": "consultarYdecidirPresupuestoPropio",
      "title": "Consultar y decidir presupuestos propios",
      "description": "Permite consultar las propias órdenes de servicio y aprobar o rechazar el presupuesto comunicado."
    }
  ],
  "grants": [
    {
      "grantId": "recepcionistaGestionaRecepcionYentrega",
      "actorRef": "recepcionista",
      "authorityRef": "gestionarRecepcionYentrega",
      "entityRefs": [
        "Cliente",
        "Aparato",
        "OrdenServicio"
      ],
      "dataScope": {
        "mode": "organization",
        "description": "Puede gestionar las recepciones y entregas de órdenes de toda la organización."
      },
      "disclosure": {
        "mode": "fieldsOnly",
        "description": "Puede ver los datos necesarios para recibir y entregar aparatos, sin acceso a las anotaciones técnicas internas.",
        "allowedFields": [
          "Cliente.id",
          "Aparato.id",
          "OrdenServicio.id",
          "OrdenServicio.numeroOrden",
          "OrdenServicio.clienteId",
          "OrdenServicio.aparatoId",
          "OrdenServicio.defectoInformado",
          "OrdenServicio.fotosRecepcion",
          "OrdenServicio.diagnostico",
          "OrdenServicio.valorPresupuesto",
          "OrdenServicio.fechaEntrega",
          "OrdenServicio.status"
        ]
      }
    },
    {
      "grantId": "tecnicoGestionaAnalisisYreparacion",
      "actorRef": "tecnico",
      "authorityRef": "gestionarAnalisisYreparacion",
      "entityRefs": [
        "Cliente",
        "Aparato",
        "OrdenServicio",
        "PiezaNecesaria",
        "Reparacion"
      ],
      "dataScope": {
        "mode": "organization",
        "description": "Puede trabajar sobre todas las órdenes, aparatos y registros técnicos de la organización."
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "Puede consultar y registrar toda la información necesaria para el análisis, presupuesto y reparación."
      }
    },
    {
      "grantId": "clienteConsultaYdecidePresupuestoPropio",
      "actorRef": "cliente",
      "authorityRef": "consultarYdecidirPresupuestoPropio",
      "entityRefs": [
        "OrdenServicio"
      ],
      "dataScope": {
        "mode": "own",
        "description": "Solo puede acceder a órdenes vinculadas a su propio registro de cliente.",
        "anchorEntity": "Cliente"
      },
      "disclosure": {
        "mode": "fieldsOnly",
        "description": "Puede ver el número, estado, diagnóstico y valor presupuestado de sus órdenes, sin acceso a costos internos, anotaciones técnicas ni datos operativos internos.",
        "allowedFields": [
          "OrdenServicio.id",
          "OrdenServicio.numeroOrden",
          "OrdenServicio.diagnostico",
          "OrdenServicio.valorPresupuesto",
          "OrdenServicio.status"
        ]
      }
    }
  ]
} as const satisfies Ns5AccessArtifact;

export type OrdenServicioAccessType = typeof ordenServicioAccess;

export default ordenServicioAccess;

/// <mls fileReference="_102047_/l4/ordenServicio/access.defs.ts" enhancement="_blank"/>

import type { Ns5AccessArtifact } from '/_102035_/l2/solution/types.js';

export const ordenServicioAccess = {
  "schemaVersion": "2026-09-12-ns5-access-v3",
  "moduleName": "ordenServicio",
  "actors": [
    {
      "actorId": "recepcionista",
      "kind": "internal",
      "origin": "named",
      "title": "Recepcionista",
      "description": "Recibe el aparato, abre la orden de servicio y registra su entrega final al cliente."
    },
    {
      "actorId": "tecnico",
      "kind": "internal",
      "origin": "named",
      "title": "Técnico",
      "description": "Analiza el aparato, registra el diagnóstico, el presupuesto y realiza la reparación."
    },
    {
      "actorId": "cliente",
      "kind": "external",
      "origin": "named",
      "title": "Cliente",
      "description": "Consulta sus propias órdenes en el portal y aprueba o rechaza el presupuesto."
    }
  ],
  "grants": [
    {
      "grantId": "recepcionistaGestionaOrdenes",
      "actorRef": "recepcionista",
      "title": "Gestionar recepción y entrega de órdenes",
      "description": "Permite registrar la recepción de aparatos, consultar las órdenes necesarias para su entrega y registrar la entrega final al cliente.",
      "entityRefs": [
        "Cliente",
        "Aparato",
        "OrdenServicio"
      ],
      "dataScope": {
        "mode": "organization",
        "description": "Puede gestionar las órdenes y los registros maestros necesarios de toda la organización."
      },
      "disclosure": {
        "mode": "fieldsOnly",
        "description": "Muestra los datos de cliente y aparato requeridos para recepción y retiro, y los datos operativos de recepción y entrega; no muestra costos internos, notas técnicas ni detalles de reparación.",
        "allowedFields": [
          "Cliente.details.identification",
          "Cliente.details.base",
          "Cliente.details.person",
          "Cliente.details.general",
          "Cliente.details.ordenServicio",
          "Aparato.details.identification",
          "Aparato.details.base",
          "Aparato.details.assetEquipment",
          "Aparato.details.general",
          "Aparato.details.ordenServicio",
          "OrdenServicio.clienteId",
          "OrdenServicio.aparatoId",
          "OrdenServicio.orderNumber",
          "OrdenServicio.status",
          "OrdenServicio.receivedAt",
          "OrdenServicio.details.reportedDefect",
          "OrdenServicio.details.delivery"
        ]
      }
    },
    {
      "grantId": "tecnicoGestionaDiagnosticoYreparacion",
      "actorRef": "tecnico",
      "title": "Gestionar diagnóstico y reparación",
      "description": "Permite consultar aparatos y órdenes recibidas, registrar el diagnóstico, el presupuesto, las piezas internas y el trabajo de reparación.",
      "entityRefs": [
        "Aparato",
        "OrdenServicio"
      ],
      "dataScope": {
        "mode": "organization",
        "description": "Puede trabajar sobre las órdenes de servicio de toda la organización."
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "Muestra toda la información técnica y operativa de los aparatos y las órdenes, incluidos costos internos y anotaciones técnicas."
      }
    },
    {
      "grantId": "clienteConsultaYrespondeSusOrdenes",
      "actorRef": "cliente",
      "title": "Consultar y responder mis órdenes",
      "description": "Permite consultar las propias órdenes de servicio y aprobar o rechazar el presupuesto recibido.",
      "entityRefs": [
        "OrdenServicio"
      ],
      "dataScope": {
        "mode": "own",
        "description": "Solo puede acceder a las órdenes vinculadas a su propia identidad de cliente.",
        "anchorEntity": "Cliente"
      },
      "disclosure": {
        "mode": "fieldsOnly",
        "description": "Muestra el número, estado, diagnóstico y presupuesto de la orden, sin costos internos de piezas, anotaciones técnicas ni datos de reparación.",
        "allowedFields": [
          "OrdenServicio.orderNumber",
          "OrdenServicio.status",
          "OrdenServicio.details.diagnosis",
          "OrdenServicio.details.quote"
        ]
      }
    }
  ]
} as const satisfies Ns5AccessArtifact;

export type OrdenServicioAccessType = typeof ordenServicioAccess;

export default ordenServicioAccess;

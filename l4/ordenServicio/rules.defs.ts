/// <mls fileReference="_102047_/l4/ordenServicio/rules.defs.ts" enhancement="_blank"/>

import type { Ns5RulesArtifactV2 } from '/_102035_/l2/solution/types.js';

export const ordenServicioRules = {
  "schemaVersion": "2026-09-16-ns5-rules-v2",
  "moduleName": "ordenServicio",
  "rules": {
    "presupuestoRequiereDiagnostico": "Solo se puede emitir un presupuesto cuando la orden tiene registrado el diagnóstico técnico y las piezas necesarias con su costo interno.",
    "respuestaPresupuestoValida": "La respuesta del cliente solo puede registrar la aprobación o el rechazo de un presupuesto que esté disponible para su decisión.",
    "reparacionRequiereAprobacion": "La reparación solo puede realizarse y marcarse como lista para entrega después de que el cliente haya aprobado el presupuesto.",
    "entregaSoloAparatoDisponible": "La entrega final solo puede registrarse cuando la orden está lista para retiro tras la reparación o cerrada como rechazada.",
    "clienteSoloConsultaSusOrdenes": "El cliente solo puede consultar las órdenes de servicio vinculadas a su propia identidad.",
    "clienteNoVeInformacionInterna": "La información disponible para el cliente no incluye los costos internos de las piezas ni las anotaciones técnicas.",
    "ruleForeignNamespaceRefused": "No se admite una referencia a una regla perteneciente a otro espacio de nombres.",
    "ruleIdentityNeverInNamespace": "La identidad de un registro maestro no se almacena dentro del espacio de nombres del módulo.",
    "ruleDocumentShapeValidated": "La información registrada debe respetar la estructura definida para el documento correspondiente."
  }
} as const satisfies Ns5RulesArtifactV2;

export type OrdenServicioRulesType = typeof ordenServicioRules;

export default ordenServicioRules;

/// <mls fileReference="_102047_/l4/ordenServicio/rules.defs.ts" enhancement="_blank"/>

import type { Ns5RulesArtifact } from '/_102035_/l2/solution/types.js';

export const ordenServicioRules = {
  "schemaVersion": "2026-09-10-ns5-rules-v1",
  "moduleName": "ordenServicio",
  "rules": [
    {
      "ruleId": "rechazoPresupuestoHabilitaRetiro",
      "description": "Al rechazarse el presupuesto, la orden queda rechazada y el aparato disponible para retiro."
    },
    {
      "ruleId": "reparacionRequierePresupuestoAprobado",
      "description": "La reparación de un aparato solo puede realizarse cuando su presupuesto ha sido aprobado."
    },
    {
      "ruleId": "entregaRequiereOrdenDisponible",
      "description": "Un aparato solo puede entregarse cuando la orden está lista para entrega o rechazada y disponible para retiro."
    }
  ]
} as const satisfies Ns5RulesArtifact;

export type OrdenServicioRulesType = typeof ordenServicioRules;

export default ordenServicioRules;

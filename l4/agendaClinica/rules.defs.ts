/// <mls fileReference="_102047_/l4/agendaClinica/rules.defs.ts" enhancement="_blank"/>

import type { Ns5RulesArtifact } from '/_102035_/l2/solution/types.js';

export const agendaClinicaRules = {
  "schemaVersion": "2026-09-10-ns5-rules-v1",
  "moduleName": "agendaClinica",
  "rules": [
    {
      "ruleId": "professionalScheduleAvailability",
      "description": "Uma consulta só pode ser agendada se não houver outra consulta do mesmo profissional no mesmo horário."
    },
    {
      "ruleId": "attendanceRequiresClinicalNote",
      "description": "Uma consulta só pode ser marcada como atendida quando uma anotação do atendimento for registrada."
    }
  ]
} as const satisfies Ns5RulesArtifact;

export type AgendaClinicaRulesType = typeof agendaClinicaRules;

export default agendaClinicaRules;

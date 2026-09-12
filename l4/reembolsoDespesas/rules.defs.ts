/// <mls fileReference="_102047_/l4/reembolsoDespesas/rules.defs.ts" enhancement="_blank"/>

import type { Ns5RulesArtifact } from '/_102035_/l2/solution/types.js';

export const reembolsoDespesasRules = {
  "schemaVersion": "2026-09-10-ns5-rules-v1",
  "moduleName": "reembolsoDespesas",
  "rules": [
    {
      "ruleId": "oneResubmission",
      "description": "Uma despesa rejeitada pode ser corrigida e reenviada para aprovação somente uma vez."
    },
    {
      "ruleId": "rejectionReasonRequired",
      "description": "A rejeição de uma despesa deve registrar um motivo informado pelo gestor."
    }
  ]
} as const satisfies Ns5RulesArtifact;

export type ReembolsoDespesasRulesType = typeof reembolsoDespesasRules;

export default reembolsoDespesasRules;

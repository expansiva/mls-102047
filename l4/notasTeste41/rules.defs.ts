/// <mls fileReference="_102047_/l4/notasTeste41/rules.defs.ts" enhancement="_blank"/>

import type { Ns5RulesArtifactV2, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const notasTeste41Rules = {
  "schemaVersion": "2026-09-16-ns5-rules-v2",
  "moduleName": "notasTeste41",
  "rules": {
    "notaTituloObrigatorio": "Uma nota só pode ser registrada com um título preenchido; o texto da nota é opcional.",
    "notaIdentificacaoAutomatica": "O identificador e a data de criação da nota são atribuídos automaticamente pelo sistema no momento do registro e não são informados pelo operador."
  }
} as const satisfies Ns5Readonly<Ns5RulesArtifactV2>;

export type NotasTeste41RulesType = typeof notasTeste41Rules;

export default notasTeste41Rules;

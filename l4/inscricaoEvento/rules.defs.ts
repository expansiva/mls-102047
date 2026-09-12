/// <mls fileReference="_102047_/l4/inscricaoEvento/rules.defs.ts" enhancement="_blank"/>

import type { Ns5RulesArtifact } from '/_102035_/l2/solution/types.js';

export const inscricaoEventoRules = {
  "schemaVersion": "2026-09-10-ns5-rules-v1",
  "moduleName": "inscricaoEvento",
  "rules": [
    {
      "ruleId": "registrationRequiresPublishedEvent",
      "description": "Uma inscrição pública só pode ser realizada em um evento publicado."
    },
    {
      "ruleId": "emailMayRegisterOncePerEvent",
      "description": "O mesmo e-mail só pode possuir uma inscrição por evento."
    },
    {
      "ruleId": "confirmedRegistrationsMustNotExceedCapacity",
      "description": "A quantidade de inscrições confirmadas de um evento não pode exceder sua capacidade."
    },
    {
      "ruleId": "fullEventRegistrationsWaitInArrivalOrder",
      "description": "Quando a capacidade do evento estiver ocupada, novas inscrições devem entrar na lista de espera pela ordem de realização."
    },
    {
      "ruleId": "cancellationPromotesFirstWaitlistedRegistration",
      "description": "Quando uma inscrição confirmada for cancelada e houver lista de espera, a primeira inscrição aguardando deve ser promovida para confirmada."
    },
    {
      "ruleId": "occupiedSeatsEqualsConfirmedRegistrations",
      "description": "O total de vagas ocupadas de um evento deve ser igual à quantidade de inscrições confirmadas."
    }
  ]
} as const satisfies Ns5RulesArtifact;

export type InscricaoEventoRulesType = typeof inscricaoEventoRules;

export default inscricaoEventoRules;

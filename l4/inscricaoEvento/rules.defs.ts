/// <mls fileReference="_102047_/l4/inscricaoEvento/rules.defs.ts" enhancement="_blank"/>

import type { Ns5RulesArtifact } from '/_102035_/l2/solution/types.js';

export const inscricaoEventoRules = {
  "schemaVersion": "2026-09-10-ns5-rules-v1",
  "moduleName": "inscricaoEvento",
  "rules": [
    {
      "ruleId": "emailUnicoPorEvento",
      "description": "O mesmo e-mail só pode possuir uma inscrição em cada evento."
    },
    {
      "ruleId": "listaEsperaComVagasEsgotadas",
      "description": "Quando todas as vagas de um evento estiverem ocupadas, novas inscrições devem entrar na lista de espera."
    },
    {
      "ruleId": "ordemListaEsperaPorChegada",
      "description": "As inscrições na lista de espera devem ser ordenadas pela data e hora de inscrição."
    },
    {
      "ruleId": "promocaoPrimeiroDaListaEspera",
      "description": "Quando uma inscrição confirmada for cancelada e uma vaga for liberada, a primeira inscrição da lista de espera deve ser promovida para confirmada."
    },
    {
      "ruleId": "totalVagasOcupadas",
      "description": "O total de vagas ocupadas de um evento deve corresponder ao número de inscrições confirmadas."
    },
    {
      "ruleId": "vagasDisponiveis",
      "description": "A quantidade de vagas disponíveis de um evento deve corresponder ao número de vagas totais menos o total de vagas ocupadas."
    }
  ]
} as const satisfies Ns5RulesArtifact;

export type InscricaoEventoRulesType = typeof inscricaoEventoRules;

export default inscricaoEventoRules;

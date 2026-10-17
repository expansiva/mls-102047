/// <mls fileReference="_102047_/l4/inicio/journeys/completarMeuAcesso.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const completarMeuAcessoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "completarMeuAcesso",
  "business": {
    "actorRef": "pessoaOrganizacao",
    "title": "Completar meu acesso",
    "goal": "Completar os dados mínimos do próprio cadastro e seguir para os módulos que pode usar.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "verMeuCadastro",
        "kind": "inspect",
        "entity": "PessoaOrganizacao",
        "title": "Ver o que falta",
        "description": "Ao entrar, a pessoa vê seu cadastro ligado ao e-mail da conta autenticada (não editável) e apenas os dados mínimos que ainda faltam; se nada falta, segue direto."
      },
      {
        "stepId": "preencherDadosMinimos",
        "kind": "act",
        "entity": "PessoaOrganizacao",
        "effect": "update",
        "title": "Preencher dados mínimos",
        "description": "A pessoa informa só o que falta: nome, telefone opcional, país e o consentimento de privacidade quando a lei do país exige (Brasil e União Europeia); repetir não cria outra pessoa nem outro vínculo."
      },
      {
        "stepId": "seguirParaModulos",
        "kind": "inspect",
        "entity": "PessoaOrganizacao",
        "title": "Seguir para meus módulos",
        "description": "Com os dados mínimos completos, a pessoa segue para os módulos que o responsável liberou para ela."
      }
    ],
    "outcome": {
      "statement": "A pessoa tem os dados mínimos completos e acessa os módulos que pode usar.",
      "evidence": [
        "Nome e país estão preenchidos no cadastro da pessoa.",
        "O consentimento de privacidade está registrado quando o país exige.",
        "A pessoa é levada aos módulos que pode usar."
      ]
    }
  },
  "businessHash": "sha256:b3a68bf4b248c7ea80c71e8886ba1113ed78e59d6c5739c9a54163ce67e8789a"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type CompletarMeuAcessoJourneyType = typeof completarMeuAcessoJourney;

export default completarMeuAcessoJourney;

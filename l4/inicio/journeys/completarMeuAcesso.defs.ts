/// <mls fileReference="_102047_/l4/inicio/journeys/completarMeuAcesso.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const completarMeuAcessoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "completarMeuAcesso",
  "business": {
    "actorRef": "pessoaOrganizacao",
    "title": "Completar meu acesso",
    "goal": "Informar só os dados mínimos que faltam para seguir aos módulos que posso usar.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "verMeuCadastro",
        "kind": "inspect",
        "entity": "PessoaOrganizacao",
        "title": "Ver o que falta",
        "description": "Ao entrar, a pessoa vê seu cadastro ligado ao e-mail da conta, que não pode ser editado; se nada falta, segue direto para os módulos que pode usar."
      },
      {
        "stepId": "informarDados",
        "kind": "act",
        "entity": "PessoaOrganizacao",
        "effect": "update",
        "title": "Informar dados que faltam",
        "description": "A pessoa informa só o que falta: nome, telefone opcional, país e o consentimento de privacidade quando a lei do país exige (Brasil e União Europeia); se não havia pessoa com o e-mail, ela é cadastrada e ligada ao e-mail, sem duplicar ao repetir."
      },
      {
        "stepId": "seguirModulos",
        "kind": "inspect",
        "entity": "PessoaOrganizacao",
        "title": "Seguir para meus módulos",
        "description": "Com os dados mínimos completos, a pessoa segue para os módulos que o responsável liberou, sem ganhar papéis ou permissões por preencher dados."
      }
    ],
    "outcome": {
      "statement": "A pessoa tem os dados mínimos completos e ligados ao seu e-mail, em um único cadastro.",
      "evidence": [
        "A tela não pede mais nenhum dado ao entrar de novo, mesmo por outro navegador",
        "O consentimento de privacidade fica registrado quando o país exige",
        "Os módulos exibidos são apenas os que a pessoa já podia usar"
      ]
    }
  },
  "businessHash": "sha256:136f24a29d2e1bcd818f28071d005b3230bd6e8e00128e525685847f7dcb438a"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type CompletarMeuAcessoJourneyType = typeof completarMeuAcessoJourney;

export default completarMeuAcessoJourney;

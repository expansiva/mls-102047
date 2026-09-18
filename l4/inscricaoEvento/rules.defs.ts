/// <mls fileReference="_102047_/l4/inscricaoEvento/rules.defs.ts" enhancement="_blank"/>

import type { Ns5RulesArtifactV2 } from '/_102035_/l2/solution/types.js';

export const inscricaoEventoRules = {
  "schemaVersion": "2026-09-16-ns5-rules-v2",
  "moduleName": "inscricaoEvento",
  "rules": {
    "eventoCompletoParaPublicacao": "Um evento só pode ser publicado quando tiver título, descrição, data, local e número de vagas informados.",
    "cancelamentoLiberaVaga": "O cancelamento de uma inscrição confirmada libera uma vaga no evento.",
    "promoverPrimeiroDaListaEspera": "Quando uma vaga é liberada, a primeira inscrição da lista de espera deve ser promovida automaticamente para confirmada.",
    "inscricoesConfirmadasOcupamVagas": "O total de vagas ocupadas de um evento é igual à quantidade de inscrições confirmadas.",
    "inscricaoUnicaPorEmailNoEvento": "O mesmo e-mail só pode possuir uma inscrição em cada evento.",
    "inscricaoSomenteEmEventoPublicado": "Uma inscrição só pode ser registrada em um evento publicado.",
    "confirmarQuandoHouverVaga": "Uma nova inscrição deve ser confirmada quando o evento tiver vaga disponível.",
    "listaEsperaPorOrdemDeChegada": "As inscrições realizadas após o esgotamento das vagas devem entrar na lista de espera pela ordem de chegada.",
    "ruleForeignNamespaceRefused": "Referências a registros fora dos domínios permitidos pelo módulo não são aceitas.",
    "ruleDocumentShapeValidated": "Os dados registrados devem atender à estrutura definida para cada tipo de registro.",
    "ruleIdentityNeverInNamespace": "A identidade mestre do participante não pode ser armazenada no espaço de dados exclusivo do módulo.",
    "rulePersonPrivacyConsentRequiredBrEu": "O tratamento de dados pessoais de participantes no Brasil ou na União Europeia exige o consentimento aplicável.",
    "ruleContactValueUniquePerType": "O valor de um canal de contato deve ser único dentro do seu tipo de canal."
  }
} as const satisfies Ns5RulesArtifactV2;

export type InscricaoEventoRulesType = typeof inscricaoEventoRules;

export default inscricaoEventoRules;

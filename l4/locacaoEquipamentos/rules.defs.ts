/// <mls fileReference="_102047_/l4/locacaoEquipamentos/rules.defs.ts" enhancement="_blank"/>

import type { Ns5RulesArtifactV2 } from '/_102035_/l2/solution/types.js';

export const locacaoEquipamentosRules = {
  "schemaVersion": "2026-09-16-ns5-rules-v2",
  "moduleName": "locacaoEquipamentos",
  "rules": {
    "dataDevolucaoValida": "A data real de devolução deve ser igual ou posterior à data de retirada do contrato.",
    "multaPorAtraso": "A multa por atraso do contrato deve corresponder à soma das diárias dos equipamentos locados multiplicada pelos dias de atraso e pelo fator 1,5.",
    "ruleForeignNamespaceRefused": "Dados de outros módulos não podem ser gravados no namespace exclusivo de locação de equipamentos.",
    "ruleDocumentShapeValidated": "O documento de identificação do cliente deve obedecer ao formato aplicável ao seu tipo e país.",
    "ruleIdentityNeverInNamespace": "Os dados de identidade do cliente devem permanecer no registro mestre e não podem ser gravados no namespace do módulo.",
    "rulePersonPrivacyConsentRequiredBrEu": "O consentimento de privacidade do cliente deve ser registrado quando exigido pela legislação aplicável no Brasil ou na União Europeia.",
    "codigoEquipamentoUnico": "O código de cada equipamento deve ser único no catálogo da locadora.",
    "situacaoOperacionalDoEquipamento": "A situação do equipamento deve ser em manutenção quando estiver marcado para manutenção, locado quando possuir contrato em andamento sem devolução efetiva e disponível nos demais casos.",
    "equipamentoEmManutencaoIndisponivel": "Um equipamento em manutenção não pode ser incluído em uma nova locação.",
    "locacaoDeEquipamentoSemSobreposicao": "Um mesmo equipamento não pode ser locado em contratos cujos períodos se sobreponham.",
    "equipamentoSemSobreposicao": "Cada equipamento deve ter períodos de locação mutuamente não sobrepostos.",
    "periodoLocacaoValido": "A data prevista de devolução deve ser igual ou posterior à data de retirada.",
    "equipamentoPeriodoNoOverlap": "A inclusão de um equipamento em um contrato deve ser recusada quando o período contratado se sobrepuser ao período de outro contrato desse equipamento.",
    "calcularMultaAtraso": "A multa por atraso de cada equipamento deve ser calculada pela sua diária multiplicada pelos dias de atraso e pelo fator 1,5 quando a devolução real for posterior à prevista."
  }
} as const satisfies Ns5RulesArtifactV2;

export type LocacaoEquipamentosRulesType = typeof locacaoEquipamentosRules;

export default locacaoEquipamentosRules;

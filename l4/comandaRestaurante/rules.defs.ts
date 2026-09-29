/// <mls fileReference="_102047_/l4/comandaRestaurante/rules.defs.ts" enhancement="_blank"/>

import type { Ns5RulesArtifactV2 } from '/_102035_/l2/solution/types.js';

export const comandaRestauranteRules = {
  "schemaVersion": "2026-09-16-ns5-rules-v2",
  "moduleName": "comandaRestaurante",
  "rules": {
    "formaPagamentoObrigatoriaNoFechamento": "Uma comanda só pode ser fechada quando houver uma forma de pagamento registrada.",
    "descontoNaoExcedeTotal": "O desconto aplicado no fechamento não pode exceder a soma dos subtotais dos itens não cancelados da comanda.",
    "fechamentoLiberaMesa": "O fechamento da comanda libera a mesa a ela vinculada.",
    "itemComandaCancellationRequiresOpenComanda": "Um item lançado só pode ser cancelado se a comanda à qual pertence estiver aberta.",
    "mesaDisponivelParaAbrirComanda": "Uma comanda só pode ser aberta para uma mesa disponível.",
    "ruleForeignNamespaceRefused": "Referências a regras de namespace externo devem ser recusadas.",
    "ruleDocumentShapeValidated": "Cada documento deve obedecer à estrutura definida para seu tipo de registro.",
    "ruleIdentityNeverInNamespace": "A identidade de um registro não integra seu namespace.",
    "itemCardapioAtivoParaLancamento": "Somente item ativo do cardápio pode ser lançado em uma comanda.",
    "comandaMesaDisponivel": "Uma mesa vinculada a uma comanda aberta não está disponível para novo atendimento.",
    "umaComandaAbertaPorMesa": "Uma mesa não pode ter mais de uma comanda aberta simultaneamente.",
    "itemComandaRequiresOpenComanda": "Um item do cardápio só pode ser lançado em uma comanda aberta.",
    "precoVigenteRegistradoNoLancamento": "O lançamento de item deve registrar o preço vigente do item do cardápio no momento do lançamento.",
    "subtotalItemComandaCalculado": "O subtotal de um item não cancelado é a quantidade registrada multiplicada pelo preço unitário registrado, e é zero quando o item está cancelado.",
    "totalComandaCalculado": "O total da comanda é a soma dos subtotais dos itens não cancelados menos o desconto aplicado, quando houver."
  }
} as const satisfies Ns5RulesArtifactV2;

export type ComandaRestauranteRulesType = typeof comandaRestauranteRules;

export default comandaRestauranteRules;

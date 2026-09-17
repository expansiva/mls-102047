/// <mls fileReference="_102047_/l4/compras/rules.defs.ts" enhancement="_blank"/>

import type { Ns5RulesArtifactV2 } from '/_102035_/l2/solution/types.js';

export const comprasRules = {
  "schemaVersion": "2026-09-16-ns5-rules-v2",
  "moduleName": "compras",
  "rules": {
    "pedidoCompraItensObrigatorios": "Todo pedido de compra deve conter pelo menos um item.",
    "pedidoCompraProdutoPertenceFornecedor": "Cada item do pedido deve corresponder a um produto cadastrado como fornecido pelo fornecedor do pedido.",
    "pedidoCompraLimiteAprovacao": "O pedido cujo valor total ultrapassar o valor limite deve ser encaminhado para decisão do gerente de compras.",
    "pedidoCompraDecisaoNecessaria": "Um pedido encaminhado por ultrapassar o valor limite somente pode prosseguir após a decisão de aprovação ou rejeição do gerente de compras.",
    "pedidoCompraJustificativaRejeicao": "A rejeição de um pedido de compra deve conter uma justificativa.",
    "pedidoCompraRecebimentoAutorizado": "O recebimento somente pode ser registrado para pedido enviado que não tenha sido rejeitado e que esteja aprovado quando exigir aprovação.",
    "pedidoCompraQuantidadeRecebidaNaoExcede": "A quantidade total recebida de cada produto em um pedido não pode exceder a quantidade solicitada.",
    "ruleForeignNamespaceRefused": "O espaço de dados do módulo de compras não pode manter referências a namespaces estrangeiros não permitidos.",
    "ruleDocumentShapeValidated": "Os dados de cada registro devem respeitar a estrutura definida para sua entidade.",
    "ruleIdentityNeverInNamespace": "Os dados de identidade de registros mestres não podem ser mantidos no espaço de dados do módulo de compras.",
    "ruleCompanyLegalNameRequired": "Todo fornecedor classificado como empresa deve ter razão social informada.",
    "ruleContactValueUniquePerType": "Um fornecedor não pode ter mais de um canal de contato com o mesmo tipo e o mesmo valor.",
    "precoCombinadoPositivo": "O preço combinado de um produto fornecido deve ser maior que zero.",
    "quantidadeRecebidaPositiva": "A quantidade registrada em cada item de recebimento deve ser maior que zero.",
    "produtoDoPedido": "Todo produto informado em um recebimento deve constar no pedido de compra correspondente.",
    "quantidadeRecebidaNaoExcedeSaldoPendente": "A quantidade recebida de um produto em uma entrega não pode exceder o saldo pendente desse produto no pedido.",
    "entradaEstoqueAtomica": "O registro do recebimento e a entrada em estoque dos produtos recebidos devem ocorrer de forma indivisível."
  }
} as const satisfies Ns5RulesArtifactV2;

export type ComprasRulesType = typeof comprasRules;

export default comprasRules;

/// <mls fileReference="_102047_/l4/compras/rules.defs.ts" enhancement="_blank"/>

import type { Ns5RulesArtifact } from '/_102035_/l2/solution/types.js';

export const comprasRules = {
  "schemaVersion": "2026-09-10-ns5-rules-v1",
  "moduleName": "compras",
  "rules": [
    {
      "ruleId": "pedidoDeveTerAoMenosUmItem",
      "description": "Um pedido de compra deve conter pelo menos um produto com quantidade e preço unitário."
    },
    {
      "ruleId": "pedidoAcimaDoLimiteExigeAprovacao",
      "description": "Um pedido de compra cujo valor total seja superior ao valor limite deve ser aprovado pelo gerente de compras antes de poder ser recebido."
    },
    {
      "ruleId": "pedidoRejeitadoNaoPodeSerRecebido",
      "description": "Um pedido de compra rejeitado não pode prosseguir para recebimento."
    },
    {
      "ruleId": "recebimentoPodeSerTotalOuParcial",
      "description": "O recebimento de compra pode registrar quantidades totais ou parciais dos itens solicitados no pedido."
    },
    {
      "ruleId": "entradaEstoqueRefleteQuantidadeRecebida",
      "description": "A entrada no estoque deve corresponder às quantidades efetivamente registradas no recebimento de compra."
    },
    {
      "ruleId": "valorTotalPedidoCalculado",
      "description": "O valor total do pedido de compra é calculado pela soma das quantidades dos itens multiplicadas pelos respectivos preços unitários."
    },
    {
      "ruleId": "quantidadeTotalItensPedidoCalculada",
      "description": "A quantidade total de itens do pedido de compra é calculada pela soma das quantidades solicitadas em seus itens."
    },
    {
      "ruleId": "percentualRecebidoPedidoCalculado",
      "description": "O percentual recebido do pedido de compra é calculado pela proporção entre as quantidades efetivamente recebidas e as quantidades solicitadas."
    },
    {
      "ruleId": "pedidoAtrasadoPorPrevisaoDeEntrega",
      "description": "Um pedido de compra está atrasado quando sua data prevista de entrega é anterior à data atual e ele não foi totalmente recebido."
    }
  ]
} as const satisfies Ns5RulesArtifact;

export type ComprasRulesType = typeof comprasRules;

export default comprasRules;

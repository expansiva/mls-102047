/// <mls fileReference="_102047_/l4/compras/rules.defs.ts" enhancement="_blank"/>

import type { Ns5RulesArtifactV2, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const comprasRules = {
  "schemaVersion": "2026-09-16-ns5-rules-v2",
  "moduleName": "compras",
  "rules": {
    "pedidoExigeItem": "O pedido de compra só pode ser enviado se tiver pelo menos um item.",
    "aprovacaoAcimaLimite": "Um pedido enviado com valor total acima do valor limite de aprovação aguarda a decisão do gerente de compras. Um pedido com valor igual ou abaixo do limite é liberado automaticamente ao fornecedor.",
    "rejeicaoExigeMotivo": "O gerente de compras só pode rejeitar um pedido se informar o motivo da rejeição.",
    "recebimentoSomenteEnviado": "Só se registra recebimento de um pedido com situação enviado ou recebido parcialmente.",
    "recebimentoNaoExcedePedido": "A soma das quantidades recebidas de um item, em todos os recebimentos do pedido, não pode passar da quantidade pedida desse item.",
    "fornecedorCnpjUnico": "Cada CNPJ só pode estar cadastrado em um fornecedor.",
    "fornecedorInativoSemNovoPedido": "Não se abre nem se envia pedido de compra para um fornecedor inativo.",
    "produtoInativoNaoEntraEmPedido": "Um produto inativo no cadastro mestre não pode ser incluído em um novo item de pedido.",
    "precoCombinadoPositivo": "O preço combinado de um produto fornecido deve ser maior que zero.",
    "produtoUnicoPorFornecedor": "Um mesmo produto só pode estar cadastrado uma vez como produto fornecido de um fornecedor.",
    "produtoFornecidoInativoNaoSugerido": "Um produto fornecido inativo não é sugerido nem tem seu preço combinado proposto nos itens do pedido.",
    "numeroPedidoSequencial": "Cada pedido de compra recebe, ao ser aberto, um número único e sequencial.",
    "itemSomenteEmRascunho": "Só se incluem, alteram ou removem itens enquanto o pedido está em rascunho.",
    "produtoUnicoPorPedido": "Um mesmo produto não pode aparecer em mais de um item do mesmo pedido.",
    "quantidadePositiva": "A quantidade pedida em um item e a quantidade recebida em cada linha de recebimento devem ser maiores que zero.",
    "produtoDeveSerFornecidoPeloFornecedor": "O produto de um item de pedido deve estar cadastrado como produto fornecido ativo do fornecedor do pedido.",
    "recebimentoSomentePedidoEnviadoOuAprovado": "O almoxarife só registra a chegada de pedidos que foram enviados ao fornecedor, seja por liberação abaixo do limite ou por aprovação do gerente. Pedidos em rascunho, aguardando aprovação, rejeitados ou já recebidos por completo não podem receber.",
    "quantidadeRecebidaNaoExcedePendente": "A quantidade recebida de um item em um recebimento não pode ser maior que o saldo a receber desse item.",
    "recebimentoItemPertenceAoPedido": "Cada linha de um recebimento deve se referir a um item do mesmo pedido de compra do recebimento.",
    "recebimentoDaEntradaEstoque": "Cada quantidade recebida registrada dá entrada, nessa mesma quantidade, no estoque do produto do item.",
    "recebimentoAtualizaSituacaoPedido": "Depois de cada recebimento, o pedido passa a recebido se todos os itens tiverem a quantidade pedida recebida. Se ainda restar quantidade pendente, passa a recebido parcialmente.",
    "pedidoAtrasadoPrevisaoVencida": "Um pedido em aberto, enviado ou recebido parcialmente, é considerado atrasado quando a previsão de entrega é anterior à data de hoje.",
    "totalCompradoConsideraPedidosEnviados": "O total comprado por fornecedor no mês soma, para os pedidos enviados ao fornecedor naquele mês, a quantidade vezes o preço unitário de cada item. Rascunhos, pedidos aguardando aprovação e rejeitados ficam de fora.",
    "painelSomenteLeitura": "O painel de compras é apenas recalculado a partir dos pedidos e recebimentos e ninguém altera seus valores diretamente.",
    "valorTotalPedido": "O valor total do pedido é a soma, em todos os itens, da quantidade pedida vezes o preço unitário."
  }
} as const satisfies Ns5Readonly<Ns5RulesArtifactV2>;

export type ComprasRulesType = typeof comprasRules;

export default comprasRules;

/// <mls fileReference="_102047_/l4/compras/rules.defs.ts" enhancement="_blank"/>

import type { Ns5RulesArtifactV2, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const comprasRules = {
  "schemaVersion": "2026-09-16-ns5-rules-v2",
  "moduleName": "compras",
  "rules": {
    "fornecedorCnpjObrigatorio": "Todo fornecedor deve ser uma empresa identificada por um CNPJ válido, e não pode haver dois fornecedores com o mesmo CNPJ.",
    "fornecedorInativoSemNovoPedido": "Não se pode abrir nem enviar um pedido de compra para um fornecedor inativo.",
    "inactiveProductCannotBeOrdered": "Um produto inativo no cadastro mestre não pode ser incluído em um novo pedido de compra.",
    "compradorInativoNaoAbrePedido": "Um comprador inativo não pode abrir novos pedidos de compra.",
    "produtoFornecidoUnicoPorFornecedor": "Um mesmo produto só pode ter um produto fornecido com preço combinado por fornecedor.",
    "precoCombinadoPositivo": "O preço combinado de um produto fornecido deve ser maior que zero.",
    "produtoFornecidoSomenteFornecedorAtivo": "Só é possível associar produtos fornecidos ou alterar o preço combinado de um fornecedor ativo.",
    "precoCombinadoSugerePreco": "Ao incluir um item no pedido, o preço unitário é sugerido pelo preço combinado vigente do produto fornecido ativo daquele fornecedor.",
    "precoSugeridoNoItemPedido": "O preço unitário sugerido no item do pedido pode ser alterado pelo comprador enquanto o pedido está em rascunho, e o item registra qual preço combinado o sugeriu quando houver.",
    "pedidoExigeItens": "Um pedido de compra só pode ser enviado se tiver ao menos um item com quantidade e preço informados.",
    "valorTotalPedidoCalculado": "O valor total do pedido de compra é a soma, em todos os itens, da quantidade pedida multiplicada pelo preço unitário.",
    "valorLimiteAprovacao": "Ao ser enviado, o pedido com valor total acima do valor limite fica aguardando aprovação do gerente de compras, e o pedido com valor total até o valor limite segue liberado ao fornecedor sem aprovação.",
    "rejeicaoExigeMotivo": "O gerente de compras só pode rejeitar um pedido informando o motivo da rejeição.",
    "edicaoSomenteRascunho": "Os dados de um pedido de compra só podem ser alterados enquanto ele está em rascunho.",
    "numeroPedidoUnico": "Cada pedido de compra recebe na abertura um número único, que não se repete nem muda.",
    "itemPedidoQuantidadePositiva": "A quantidade de cada item do pedido deve ser maior que zero e o preço unitário não pode ser negativo.",
    "itemPedidoProdutoDoFornecedor": "O produto de um item do pedido deve ser um produto fornecido ativo pelo fornecedor do pedido.",
    "itemPedidoSomenteEmRascunho": "Itens só podem ser incluídos, alterados ou removidos enquanto o pedido está em rascunho.",
    "recebimentoSomenteLiberado": "Só se registra recebimento para pedido liberado ao fornecedor, ou seja, aprovado pelo gerente ou enviado com valor total até o valor limite, ou já recebido parcialmente.",
    "recebimentoSomentePedidoAprovado": "Um pedido em rascunho, aguardando aprovação, rejeitado ou já recebido totalmente não aceita registro de recebimento.",
    "quantidadeRecebidaNaoExcedePendente": "A quantidade recebida de cada item em um recebimento não pode ser maior que a quantidade ainda pendente desse item.",
    "quantidadeRecebidaNaoExcedePedido": "A soma das quantidades recebidas de um item em todos os recebimentos nunca pode ultrapassar a quantidade pedida do item.",
    "recebimentoGeraEntradaEstoque": "Cada item com quantidade recebida em um recebimento gera uma entrada no estoque do produto com essa quantidade.",
    "recebimentoAtualizaSituacaoPedido": "Após um recebimento, o pedido fica recebido quando todos os itens tiverem a quantidade pedida recebida, e recebido parcialmente quando algum item ainda tiver quantidade pendente.",
    "numeroRecebimentoUnico": "Cada recebimento recebe na criação um número único, que não se repete nem muda.",
    "entradaGeradaPeloRecebimento": "Uma entrada de estoque só existe como resultado de um recebimento registrado e não pode ser criada, alterada ou excluída manualmente.",
    "quantidadeEntradaPositiva": "A quantidade de uma entrada de estoque deve ser maior que zero.",
    "entradaUnicaPorItemRecebimento": "Há no máximo uma entrada de estoque para cada item do pedido em cada recebimento.",
    "entradaProdutoDoItemPedido": "O produto da entrada de estoque é sempre o mesmo produto do item do pedido recebido, e o valor unitário é o preço unitário desse item.",
    "entradaPublicadaAoEstoque": "Toda entrada de estoque deve ser publicada ao controle de estoque e só é considerada publicada quando o momento da publicação estiver registrado.",
    "pedidoEmAbertoAteRecebimentoTotal": "Um pedido está em aberto desde que é enviado, enquanto não for rejeitado nem recebido totalmente.",
    "pedidoAtrasadoPrevisaoVencida": "Um pedido está atrasado quando está em aberto e sua data prevista de entrega é anterior à data de hoje.",
    "totalCompradoConsideraPedidosAprovados": "O total comprado por fornecedor no mês soma o valor total dos pedidos emitidos no mês que estão liberados ao fornecedor ou recebidos, excluídos rascunhos, pedidos aguardando aprovação e rejeitados."
  }
} as const satisfies Ns5Readonly<Ns5RulesArtifactV2>;

export type ComprasRulesType = typeof comprasRules;

export default comprasRules;

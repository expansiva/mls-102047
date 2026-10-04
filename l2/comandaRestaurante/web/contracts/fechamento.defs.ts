/// <mls fileReference="_102047_/l2/comandaRestaurante/web/contracts/fechamento.defs.ts" enhancement="_blank"/>

/** Resumo de uma comanda aberta para a lista de localização do caixa. */
export interface ComandaAbertaResumo {
  id: string;
  number: number;
  status: 'open' | 'closed';
  mesaId: string;
  mesaCode: string;
  readonly totalComanda: number;
}

/** Página de comandas abertas, com o total calculado para a navegação da lista. */
export interface PaginaComandasAbertas {
  items: ComandaAbertaResumo[];
  readonly totalOpenComandas: number;
  page: number;
  pageSize: number;
}

/** Item da comanda apresentado ao caixa para conferir a cobrança. */
export interface LinhaComandaFechamento {
  itemCardapioId: string;
  itemName: string;
  status: 'launched' | 'canceled';
  quantidade: number;
  observacao?: string;
  precoUnitario: number;
  readonly valorTotal: number;
}

/** Comanda escolhida, com seus itens, totais de conferência e situação da mesa após o fechamento. */
export interface ComandaParaFechamento {
  id: string;
  version: number;
  number: number;
  status: 'open' | 'closed';
  mesaId: string;
  readonly mesaDisponivel: boolean;
  readonly subtotal: number;
  discountAmount?: number;
  paymentMethod?: 'cash' | 'debitCard' | 'creditCard' | 'pix';
  readonly totalComanda: number;
  lines: LinhaComandaFechamento[];
}

export interface FechamentoContracts {
  /**
   * Finalidade: Inicializa o fechamento exibindo ao caixa a primeira página de comandas abertas e, quando vier no contexto, a comanda já escolhida para conferência e pagamento.
   * Entrada: page e pageSize definem a fatia da lista de comandas abertas. comandaId é o identificador opcional vindo do contexto da página para abrir diretamente uma comanda.
   * Processamento: Filtra a lista por Comanda.status = open, junta o código da mesa, ordena de forma estável para localização e devolve somente a página solicitada com a quantidade total de comandas abertas. Se comandaId estiver presente, compõe seu cabeçalho, itens e mesa; os valores obedecem subtotalComandaCalculado, totalComandaCalculado e valorTotalItemComandaCalculado, considerando itens não cancelados nos cálculos.
   * Saída: Retorna a lista já pronta para localizar a conta, incluindo o indicador totalOpenComandas para paginação. selectedComanda, quando solicitada, já contém linhas, totais e dados de pagamento para preencher a conferência sem nova composição no cliente.
   */
  'comandaRestaurante.fechamento.carregarFechamento': {
    kind: 'qry';
    input: { page?: number; pageSize?: number; comandaId?: string };
    output: { openComandas: PaginaComandasAbertas; selectedComanda?: ComandaParaFechamento };
    meta: { output: {}; lists: {}; params: {} };
    rules: ['subtotalComandaCalculado', 'totalComandaCalculado', 'valorTotalItemComandaCalculado'];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
  /**
   * Finalidade: Localiza, sob demanda, comandas ainda abertas pelo número da comanda ou pelo código da mesa.
   * Entrada: search é o termo informado pelo caixa para número ou mesa. page e pageSize definem a página que deve ser exibida.
   * Processamento: Mantém obrigatoriamente o filtro de situação aberta, aplica a busca por número da comanda ou código da mesa, ordena os resultados de forma estável e calcula o total de ocorrências para a paginação. O total apresentado em cada resumo respeita totalComandaCalculado.
   * Saída: Retorna uma página da lista de comandas abertas, já com número, mesa, situação, total e indicador totalOpenComandas, sem transferir comandas fechadas ou itens.
   */
  'comandaRestaurante.fechamento.localizarComandasAbertas': {
    kind: 'qry';
    input: { search?: string; page: number; pageSize: number };
    output: { openComandas: PaginaComandasAbertas };
    meta: { output: {}; lists: {}; params: {} };
    rules: ['totalComandaCalculado'];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
  /**
   * Finalidade: Carrega a comanda selecionada na lista para o caixa conferir seus lançamentos e registrar o pagamento.
   * Entrada: comandaId identifica a comanda escolhida pelo caixa na lista de comandas abertas.
   * Processamento: Lê a comanda e a mesa vinculada, reúne os itens com seus nomes de cardápio e apresenta os itens lançados para conferência. Calcula os valores conforme subtotalComandaCalculado, totalComandaCalculado e valorTotalItemComandaCalculado; itens cancelados não compõem os totais.
   * Saída: Retorna uma ComandaParaFechamento com cabeçalho, linhas, desconto, forma de pagamento, subtotal, total e disponibilidade da mesa, pronta para redesenhar a área de conferência e pagamento.
   */
  'comandaRestaurante.fechamento.consultarComandaParaFechamento': {
    kind: 'qry';
    input: { comandaId: string };
    output: { comanda: ComandaParaFechamento };
    meta: { output: {}; lists: {}; params: {} };
    rules: ['subtotalComandaCalculado', 'totalComandaCalculado', 'valorTotalItemComandaCalculado'];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
  /**
   * Finalidade: Registra o desconto e a forma de pagamento, fecha a comanda conferida e devolve a cobrança no estado final para a página comunicar a liberação da mesa.
   * Entrada: comandaId e version identificam com segurança a comanda aberta que será fechada. discountAmount é o desconto opcional aplicado pelo caixa. paymentMethod é a forma obrigatória de quitação.
   * Processamento: Executa a transição fecharComanda somente para a versão informada. Exige paymentMethod por pagamentoObrigatorioNoFechamento, recusa desconto maior que o subtotal por descontoNaoExcedeSubtotal e, na mesma operação atômica, fecha a comanda e deixa sua mesa disponível conforme fechamentoLiberaMesa. Recalcula e persiste os totais conforme subtotalComandaCalculado, totalComandaCalculado e valorTotalItemComandaCalculado.
   * Saída: Retorna a ComandaParaFechamento já fechada, com linhas, desconto, pagamento, totais recalculados e mesaDisponivel = true, para a página redesenhar a confirmação sem fazer nova consulta.
   */
  'comandaRestaurante.fechamento.fecharComandaPaga': {
    kind: 'cmd';
    writes: 'Comanda.fecharComanda';
    input: { comandaId: string; version: number; discountAmount?: number; paymentMethod: 'cash' | 'debitCard' | 'creditCard' | 'pix' };
    output: { comanda: ComandaParaFechamento };
    meta: { output: {}; lists: {}; params: {} };
    rules: ['pagamentoObrigatorioNoFechamento', 'descontoNaoExcedeSubtotal', 'fechamentoLiberaMesa', 'subtotalComandaCalculado', 'totalComandaCalculado', 'valorTotalItemComandaCalculado'];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
}

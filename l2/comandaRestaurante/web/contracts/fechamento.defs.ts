/// <mls fileReference="_102047_/l2/comandaRestaurante/web/contracts/fechamento.defs.ts" enhancement="_blank"/>

/** Resumo de uma comanda aberta para o caixa localizá-la e selecioná-la no fechamento. */
export interface OpenComanda {
  id: string;
  number: number;
  mesaId: string;
  status: 'open' | 'closed';
  readonly totalComanda: string;
  code: string;
}

/** Página paginada de comandas abertas já filtrada para a localização no fechamento. */
export interface OpenComandaPage {
  items: OpenComanda[];
  page: number;
  pageSize: number;
  readonly totalItems: number;
}

/** Linha válida da comanda apresentada na conferência da cobrança. */
export interface ComandaClosingItem {
  status: 'launched' | 'canceled';
  itemCardapioId: string;
  quantidade: number;
  observacao?: string;
  precoUnitario: string;
  readonly valorTotal: string;
  name: string;
}

/** Comanda selecionada, com itens válidos, valores calculados e situação da mesa, para conferência ou confirmação do fechamento. */
export interface ComandaForClosing {
  id: string;
  version: number;
  number: number;
  status: 'open' | 'closed';
  discountAmount?: string;
  paymentMethod?: 'cash' | 'debitCard' | 'creditCard' | 'pix';
  items: ComandaClosingItem[];
  readonly subtotal: string;
  readonly totalComanda: string;
  readonly mesaDisponivel: boolean;
}

export interface FechamentoContracts {
  /**
   * Finalidade: Carrega a tela de fechamento com uma página de comandas abertas e, se houver uma comanda no contexto, sua cobrança completa.
   * Entrada: comandaId identifica a comanda vinda do contexto. number e mesaCode restringem a localização inicial. page e pageSize definem a janela da lista.
   * Processamento: Lista exclusivamente comandas em situação open, aplica os filtros recebidos, ordena de forma estável e pagina. Compõe o código da mesa e calcula os valores de itens, subtotal e total conforme valorTotalItemComandaCalculado, subtotalComandaCalculado e totalComandaCalculado. Se comandaId apontar para uma comanda aberta, compõe também suas linhas launched, dados de pagamento e disponibilidade calculada da mesa.
   * Saída: Devolve a lista enxuta já pronta para localização, com a quantidade total calculada, e opcionalmente a comanda contextual pronta para revisão e pagamento.
   */
  'comandaRestaurante.fechamento.carregarFechamento': {
    kind: 'qry';
    input: { comandaId?: string; number?: number; mesaCode?: string; page?: number; pageSize?: number };
    output: { openComandas: OpenComandaPage; selectedComanda?: ComandaForClosing };
    rules: ['subtotalComandaCalculado', 'totalComandaCalculado', 'valorTotalItemComandaCalculado'];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
  /**
   * Finalidade: Pesquisa sob demanda as comandas que ainda podem ser fechadas.
   * Entrada: number filtra pelo número da comanda; mesaCode filtra pelo código da mesa; page e pageSize definem a página solicitada.
   * Processamento: Restringe obrigatoriamente o resultado a comandas open, combina os filtros informados, ordena de modo estável e pagina antes de compor cada resumo. Calcula o total de cada comanda pelas regras valorTotalItemComandaCalculado, subtotalComandaCalculado e totalComandaCalculado; totalItems é uma contagem calculada no servidor.
   * Saída: Retorna uma página leve de comandas abertas, incluindo mesa, situação, total calculado e quantidade de resultados para substituir ou ampliar a lista.
   */
  'comandaRestaurante.fechamento.buscarComandasAbertas': {
    kind: 'qry';
    input: { number?: number; mesaCode?: string; page: number; pageSize: number };
    output: { openComandas: OpenComandaPage };
    rules: ['subtotalComandaCalculado', 'totalComandaCalculado', 'valorTotalItemComandaCalculado'];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
  /**
   * Finalidade: Obtém a comanda aberta escolhida pelo caixa, pronta para conferir e fechar.
   * Entrada: id é o identificador da comanda selecionada na lista ou recebido pelo contexto da página.
   * Processamento: Lê a comanda aberta autorizada, compõe a mesa e o nome de cada item do cardápio e inclui somente linhas launched, que são os itens válidos para cobrança. Calcula valorTotal, subtotal e totalComanda pelas regras valorTotalItemComandaCalculado, subtotalComandaCalculado e totalComandaCalculado, sem gravar campos derivados.
   * Saída: Retorna versão, itens válidos, desconto, forma de pagamento, totais calculados e disponibilidade da mesa para a revisão, o formulário e a ação de fechamento.
   */
  'comandaRestaurante.fechamento.obterComandaParaFechamento': {
    kind: 'qry';
    input: { id: string };
    output: { comanda: ComandaForClosing };
    rules: ['subtotalComandaCalculado', 'totalComandaCalculado', 'valorTotalItemComandaCalculado'];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
  /**
   * Finalidade: Registra desconto e pagamento, fecha a comanda aberta e confirma a liberação da mesa.
   * Entrada: id e version identificam a comanda e evitam fechamento concorrente. discountAmount é o desconto opcional. paymentMethod é a forma de pagamento obrigatória.
   * Processamento: Em transação, recalcula valores das linhas launched, subtotal e total. Recusa a ausência de paymentMethod pela regra pagamentoObrigatorioNoFechamento e desconto acima do subtotal por descontoNaoExcedeSubtotal. Com versão válida, grava o payload de fecharComanda, altera a situação para closed e libera a mesa conforme fechamentoLiberaMesa.
   * Saída: Retorna a comanda fechada com linhas, totais recalculados, desconto e pagamento registrados e mesaDisponivel verdadeiro, para redesenhar a conferência sem nova consulta.
   */
  'comandaRestaurante.fechamento.fecharComandaPaga': {
    kind: 'cmd';
    writes: 'Comanda.fecharComanda';
    input: { id: string; version: number; discountAmount?: string; paymentMethod: 'cash' | 'debitCard' | 'creditCard' | 'pix' };
    output: { comanda: ComandaForClosing };
    rules: ['pagamentoObrigatorioNoFechamento', 'descontoNaoExcedeSubtotal', 'fechamentoLiberaMesa', 'subtotalComandaCalculado', 'totalComandaCalculado', 'valorTotalItemComandaCalculado'];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
}

/// <mls fileReference="_102047_/l2/comandaRestaurante/web/contracts/fechamento.defs.ts" enhancement="_blank"/>

/** Resumo paginado de uma comanda aberta para localização e seleção no fechamento. */
export interface OpenComanda {
  id: string;
  number: number;
  mesaId: string;
  status: 'open' | 'closed';
  readonly totalComanda: string;
  code: string;
}

/** Página de comandas abertas, já filtrada para localização pelo caixa. */
export interface OpenComandaPage {
  items: OpenComanda[];
  page: number;
  pageSize: number;
  readonly totalItems: number;
}

/** Linha válida da comanda apresentada para conferência no fechamento. */
export interface ComandaClosingItem {
  status: 'launched' | 'canceled';
  itemCardapioId: string;
  quantidade: number;
  observacao?: string;
  precoUnitario: string;
  readonly valorTotal: string;
  name: string;
}

/** Comanda selecionada com linhas válidas, totais calculados e situação da mesa para conferência ou resultado do fechamento. */
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
  readonly disponivel: boolean;
}

export interface FechamentoContracts {
  /**
   * Finalidade: Carrega o fechamento com a primeira página de comandas abertas e, quando uma comanda vier no contexto, seus dados completos para conferência.
   * Entrada: comandaId identifica a comanda recebida no contexto; number e mesaCode restringem a localização inicial; page e pageSize definem a janela paginada da lista.
   * Processamento: Lista somente comandas com situação open, aplica os filtros informados e pagina o resultado. Junta o código da mesa e calcula totalComanda pelas regras subtotalComandaCalculado, totalComandaCalculado e valorTotalItemComandaCalculado. Quando comandaId for informado e a comanda estiver aberta, compõe suas linhas launched, desconto, pagamento, subtotal, total e disponibilidade da mesa.
   * Saída: Retorna a lista enxuta de comandas abertas para localização, com totalItems já calculado, e opcionalmente a comanda contextual completa para preencher a conferência e o pagamento sem nova chamada.
   */
  'comandaRestaurante.fechamento.carregarFechamento': {
    kind: 'qry';
    input: { comandaId?: string; number?: number; mesaCode?: string; page?: number; pageSize?: number };
    output: { openComandas: OpenComandaPage; selectedComanda?: ComandaForClosing };
    meta: { output: { selectedComanda: { entity: 'Comanda'; many: false } }; lists: {}; params: {} };
    rules: ['subtotalComandaCalculado', 'totalComandaCalculado', 'valorTotalItemComandaCalculado'];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
  /**
   * Finalidade: Localiza sob demanda as comandas ainda abertas por número ou código da mesa.
   * Entrada: number filtra pelo número da comanda; mesaCode filtra pelo código da mesa; page e pageSize indicam a página solicitada.
   * Processamento: Restringe sempre a situação a open, combina os filtros de número e mesa quando recebidos, ordena a lista de forma estável e pagina antes de compor cada resumo. Calcula o total de cada conta conforme subtotalComandaCalculado, totalComandaCalculado e valorTotalItemComandaCalculado; totalItems é uma contagem, não uma lista para o cliente somar.
   * Saída: Retorna uma página leve e já filtrada de comandas abertas, com mesa, situação, total calculado e quantidade total de resultados para a lista de localização.
   */
  'comandaRestaurante.fechamento.buscarComandasAbertas': {
    kind: 'qry';
    input: { number?: number; mesaCode?: string; page: number; pageSize: number };
    output: { openComandas: OpenComandaPage };
    meta: { output: {}; lists: {}; params: {} };
    rules: ['subtotalComandaCalculado', 'totalComandaCalculado', 'valorTotalItemComandaCalculado'];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
  /**
   * Finalidade: Obtém a comanda aberta escolhida pelo caixa, pronta para conferir cobrança e preencher o fechamento.
   * Entrada: id é o identificador da comanda selecionada na lista ou recebido do contexto.
   * Processamento: Lê a comanda aberta autorizada, junta a mesa e os itens do cardápio, e inclui apenas linhas launched como itens válidos da cobrança. Calcula valorTotal de cada linha, subtotal e totalComanda segundo valorTotalItemComandaCalculado, subtotalComandaCalculado e totalComandaCalculado; não grava campos derivados.
   * Saída: Retorna a comanda com versão, linhas de cobrança, desconto e pagamento atuais, totais calculados e disponibilidade da mesa para alimentar a revisão, o formulário e a ação de fechamento.
   */
  'comandaRestaurante.fechamento.obterComandaParaFechamento': {
    kind: 'qry';
    input: { id: string };
    output: { comanda: ComandaForClosing };
    meta: { output: { comanda: { entity: 'Comanda'; many: false } }; lists: {}; params: {} };
    rules: ['subtotalComandaCalculado', 'totalComandaCalculado', 'valorTotalItemComandaCalculado'];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
  /**
   * Finalidade: Registra o desconto e o pagamento da comanda aberta, conclui seu fechamento e devolve a cobrança fechada com a mesa liberada.
   * Entrada: id e version identificam a comanda aberta e protegem contra fechamento concorrente; discountAmount é o desconto opcional; paymentMethod é a forma obrigatória de pagamento.
   * Processamento: Em transação, recalcula os valores das linhas launched, o subtotal e o total. Recusa ausência de paymentMethod por pagamentoObrigatorioNoFechamento e desconto superior ao subtotal por descontoNaoExcedeSubtotal. Com a versão válida, grava o payload da transição fecharComanda, muda a situação para closed e efetiva a disponibilidade da mesa conforme fechamentoLiberaMesa.
   * Saída: Retorna a comanda já fechada, com suas linhas e totais recalculados, desconto e pagamento registrados e mesaDisponivel verdadeiro, permitindo redesenhar a conferência e confirmar a liberação sem consultar novamente a comanda.
   */
  'comandaRestaurante.fechamento.fecharComandaPaga': {
    kind: 'cmd';
    writes: 'Comanda.fecharComanda';
    input: { id: string; version: number; discountAmount?: string; paymentMethod: 'cash' | 'debitCard' | 'creditCard' | 'pix' };
    output: { comanda: ComandaForClosing };
    meta: { output: { comanda: { entity: 'Comanda'; many: false } }; lists: {}; params: {} };
    rules: ['pagamentoObrigatorioNoFechamento', 'descontoNaoExcedeSubtotal', 'fechamentoLiberaMesa', 'subtotalComandaCalculado', 'totalComandaCalculado', 'valorTotalItemComandaCalculado'];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
}

/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/contracts/despesas_aprovadas.defs.ts" enhancement="_blank"/>

/** Dados da despesa exibidos em cada item da fila de pagamento. */
export interface DespesaAprovadaResumoDetails {
  dataDespesa: string;
  categoria: string;
  valor: string;
}

/** Item da fila de despesas aprovadas que aguardam pagamento. */
export interface DespesaAprovadaResumo {
  id: string;
  colaboradorId: string;
  status: 'draft' | 'awaitingApproval' | 'rejected' | 'approved' | 'paid';
  details: DespesaAprovadaResumoDetails;
}

/** Dados completos da despesa conferidos pelo financeiro antes do pagamento. */
export interface DespesaAprovadaDetalheDetails {
  dataDespesa: string;
  categoria: string;
  valor: string;
  descricao: string;
  dataPagamento?: string;
}

/** Despesa escolhida com seus dados completos e a versão usada no registro do pagamento. */
export interface DespesaAprovadaDetalhe {
  id: string;
  version: number;
  colaboradorId: string;
  status: 'draft' | 'awaitingApproval' | 'rejected' | 'approved' | 'paid';
  details: DespesaAprovadaDetalheDetails;
}

export interface Despesas_aprovadasContracts {
  /**
   * Finalidade: Carrega a fila de despesas aprovadas que aguardam pagamento, para o financeiro localizar e escolher a despesa a pagar.
   * Entrada: page e pageSize: página e tamanho da página da fila; colaboradorId (opcional): filtra as despesas de um colaborador; categoria (opcional): filtra pela categoria informada.
   * Processamento: Localiza despesas com status = ’approved’ (locate.byColumn), aplicando os filtros opcionais de colaborador e categoria, ordenadas pela data da despesa. Aplica financeApprovedExpenseAccess: o financeiro só consulta despesas aprovadas, portanto nenhuma outra situação é retornada.
   * Saída: Página { items, page, pageSize, hasMore } com id, colaborador, situação, data, categoria e valor de cada despesa, no formato que a lista exibe.
   */
  'reembolsoDespesas.despesas_aprovadas.listarDespesasAprovadas': {
    kind: 'qry';
    input: { colaboradorId?: string; details: { categoria?: string }; page: number; pageSize: number };
    output: { despesas: { items: DespesaAprovadaResumo[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['financeApprovedExpenseAccess'];
    access: { actors: ['financeiro']; grants: ['financeiroConsultaEpagaDespesasAprovadas']; scope: 'related' };
  };
  /**
   * Finalidade: Carrega os dados completos da despesa escolhida na fila, para o financeiro conferir antes de registrar o pagamento.
   * Entrada: id: identificador da despesa selecionada na lista.
   * Processamento: Lê a despesa por id (read.byId). Aplica financeApprovedExpenseAccess: recusa a consulta se a despesa não estiver aprovada (ou já paga por este fluxo). Retorna apenas os campos permitidos ao financeiro.
   * Saída: A despesa com id, versão, colaborador, situação, data, categoria, valor, descrição e data de pagamento; alimenta o detalhe e o formulário de pagamento (a versão é usada no comando).
   */
  'reembolsoDespesas.despesas_aprovadas.obterDespesaAprovada': {
    kind: 'qry';
    input: { id: string };
    output: { despesa: DespesaAprovadaDetalhe };
    rules: ['financeApprovedExpenseAccess'];
    access: { actors: ['financeiro']; grants: ['financeiroConsultaEpagaDespesasAprovadas']; scope: 'related' };
  };
  /**
   * Finalidade: Registra o pagamento da despesa aprovada, movendo-a da situação aprovada para paga.
   * Entrada: id: despesa a pagar; version: versão lida no detalhe, para controle de concorrência; dataPagamento: data em que a despesa foi paga.
   * Processamento: Executa a transição registrarPagamento (approved -> paid) gravando details.dataPagamento. Aplica financeApprovedExpenseAccess: recusa se a despesa não estiver aprovada; aplica paymentDateRequired: recusa se a data de pagamento não for informada. Recusa se a versão não corresponder à atual.
   * Saída: A despesa atualizada (situação paga, data de pagamento e nova versão), para o detalhe ser redesenhado e o item sair da fila sem nova chamada.
   */
  'reembolsoDespesas.despesas_aprovadas.registrarPagamento': {
    kind: 'cmd';
    writes: 'Despesa.registrarPagamento';
    input: { id: string; version: number; details: { dataPagamento: string } };
    output: { despesa: DespesaAprovadaDetalhe };
    rules: ['financeApprovedExpenseAccess', 'paymentDateRequired'];
    access: { actors: ['financeiro']; grants: ['financeiroConsultaEpagaDespesasAprovadas']; scope: 'related' };
  };
}

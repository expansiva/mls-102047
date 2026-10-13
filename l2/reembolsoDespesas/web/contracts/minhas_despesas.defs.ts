/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/contracts/minhas_despesas.defs.ts" enhancement="_blank"/>

/** Dados da despesa mostrados em cada linha da lista. */
export interface DespesaResumoDetalhes {
  dataDespesa: string;
  categoria: string;
  valor: string;
}

/** Linha da lista de despesas do colaborador. */
export interface DespesaResumo {
  id: string;
  status: 'draft' | 'awaitingApproval' | 'rejected' | 'approved' | 'paid';
  details: DespesaResumoDetalhes;
}

/** Dados completos da despesa aberta. */
export interface DespesaDetalheDetalhes {
  dataDespesa: string;
  categoria: string;
  valor: string;
  descricao: string;
  motivoRejeicao?: string;
  reenvioRealizado: boolean;
  dataPagamento?: string;
}

/** Despesa completa, usada no detalhe, no formulário de correção e nas ações de envio. */
export interface DespesaDetalhe {
  id: string;
  version: number;
  status: 'draft' | 'awaitingApproval' | 'rejected' | 'approved' | 'paid';
  details: DespesaDetalheDetalhes;
}

export interface Minhas_despesasContracts {
  /**
   * Finalidade: Carrega, ao abrir a página, as despesas registradas pelo colaborador logado para que ele acompanhe a situação de cada uma e escolha qual abrir.
   * Entrada: status: filtro opcional pela situação (por exemplo ’rejected’ para localizar as despesas a corrigir); page e pageSize: página solicitada e tamanho da página.
   * Processamento: Filtra pelo colaboradorId da sessão (expenseOwnerOnly: o colaborador só vê despesas que registrou), aplica o filtro opcional de situação usando a coluna indexada e ordena pela data da despesa mais recente. Pagina o resultado.
   * Saída: Página { items, page, pageSize, hasMore } de despesas com id, situação, data, categoria e valor, exatamente o que a lista mostra.
   */
  'reembolsoDespesas.minhas_despesas.listarMinhasDespesas': {
    kind: 'qry';
    input: { status?: 'draft' | 'awaitingApproval' | 'rejected' | 'approved' | 'paid'; page: number; pageSize: number };
    output: { despesas: { items: DespesaResumo[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['expenseOwnerOnly'];
    access: { actors: ['colaborador']; grants: ['colaboradorGerenciaPropriasDespesas']; scope: 'own' };
  };
  /**
   * Finalidade: Abre a despesa escolhida na lista com todos os dados que o detalhe, o formulário de correção e as ações de envio precisam.
   * Entrada: id: identificador da despesa selecionada na lista.
   * Processamento: Lê a despesa pelo id e recusa se o colaboradorId não for o do colaborador logado (expenseOwnerOnly). Inclui a referência do comprovante anexado quando houver.
   * Saída: A despesa com id, versão, situação, data, categoria, valor, descrição, motivo da rejeição, indicador de reenvio e data de pagamento; a versão é usada nos comandos seguintes.
   */
  'reembolsoDespesas.minhas_despesas.obterDespesa': {
    kind: 'qry';
    input: { id: string };
    output: { despesa: DespesaDetalhe };
    rules: ['expenseOwnerOnly'];
    access: { actors: ['colaborador']; grants: ['colaboradorGerenciaPropriasDespesas']; scope: 'own' };
  };
  /**
   * Finalidade: Registra uma nova despesa do colaborador em rascunho.
   * Entrada: colaboradorId: colaborador logado, vindo da sessão; dataDespesa, categoria, valor e descricao: dados preenchidos no formulário.
   * Processamento: Valida que data, categoria, valor e descrição estão preenchidos (validExpenseData). Cria a despesa com situação ’draft’ e reenvioRealizado falso, vinculada ao colaboradorId da sessão. O comprovante é anexado pela capacidade de anexo de documento.
   * Saída: A despesa criada completa, para abrir no detalhe com a ação de envio, e a linha resumida, para inserir na lista sem nova consulta.
   */
  'reembolsoDespesas.minhas_despesas.registrarDespesa': {
    kind: 'cmd';
    writes: 'Despesa.create';
    input: { colaboradorId: string; details: { dataDespesa: string; categoria: string; valor: string; descricao: string } };
    output: { despesa: DespesaDetalhe; item: DespesaResumo };
    rules: ['validExpenseData'];
    access: { actors: ['colaborador']; grants: ['colaboradorGerenciaPropriasDespesas']; scope: 'own' };
  };
  /**
   * Finalidade: Salva a correção dos dados de uma despesa rejeitada antes do reenvio.
   * Entrada: id e version: despesa corrigida e versão lida, para controle de concorrência; dataDespesa, categoria, valor e descricao: dados corrigidos.
   * Processamento: Recusa se a despesa não for do colaborador logado (expenseOwnerOnly), se não estiver ’rejected’ ou se reenvioRealizado já for verdadeiro (singleResubmission: só se corrige e reenvia uma vez), ou se a versão divergir. Valida os dados obrigatórios (validExpenseData) e atualiza sem alterar o colaboradorId nem a situação.
   * Saída: A despesa atualizada completa, para redesenhar detalhe e formulário, e a linha resumida, para atualizar a lista no lugar.
   */
  'reembolsoDespesas.minhas_despesas.salvarCorrecao': {
    kind: 'cmd';
    writes: 'Despesa.update';
    input: { id: string; version: number; details: { dataDespesa: string; categoria: string; valor: string; descricao: string } };
    output: { despesa: DespesaDetalhe; item: DespesaResumo };
    rules: ['expenseOwnerOnly', 'validExpenseData', 'singleResubmission'];
    access: { actors: ['colaborador']; grants: ['colaboradorGerenciaPropriasDespesas']; scope: 'own' };
  };
  /**
   * Finalidade: Envia a despesa em rascunho para aprovação do gestor da equipe.
   * Entrada: id e version: despesa a enviar e versão lida.
   * Processamento: Recusa se a despesa não for do colaborador logado (expenseOwnerOnly), se não estiver ’draft’, se a versão divergir, se não houver comprovante anexado (proofRequiredBeforeSubmission) ou se faltar data, categoria, valor ou descrição (validExpenseData). Move a situação para ’awaitingApproval’.
   * Saída: A despesa com a nova situação, para redesenhar detalhe e ações, e a linha resumida para atualizar a lista.
   */
  'reembolsoDespesas.minhas_despesas.enviarParaAprovacao': {
    kind: 'cmd';
    writes: 'Despesa.enviarParaAprovacao';
    input: { id: string; version: number };
    output: { despesa: DespesaDetalhe; item: DespesaResumo };
    rules: ['expenseOwnerOnly', 'proofRequiredBeforeSubmission', 'validExpenseData'];
    access: { actors: ['colaborador']; grants: ['colaboradorGerenciaPropriasDespesas']; scope: 'own' };
  };
  /**
   * Finalidade: Reenvia, uma única vez, a despesa rejeitada e corrigida para nova análise do gestor.
   * Entrada: id e version: despesa a reenviar e versão lida.
   * Processamento: Recusa se a despesa não for do colaborador logado (expenseOwnerOnly), se não estiver ’rejected’, se reenvioRealizado já for verdadeiro (singleResubmission), se não houver comprovante (proofRequiredBeforeSubmission), se faltar dado obrigatório (validExpenseData) ou se a versão divergir. Move a situação para ’awaitingApproval’ e marca reenvioRealizado como verdadeiro.
   * Saída: A despesa com a nova situação e o reenvio marcado, para redesenhar detalhe e ações, e a linha resumida para atualizar a lista.
   */
  'reembolsoDespesas.minhas_despesas.reenviarParaAprovacao': {
    kind: 'cmd';
    writes: 'Despesa.reenviarParaAprovacao';
    input: { id: string; version: number };
    output: { despesa: DespesaDetalhe; item: DespesaResumo };
    rules: ['expenseOwnerOnly', 'singleResubmission', 'proofRequiredBeforeSubmission', 'validExpenseData'];
    access: { actors: ['colaborador']; grants: ['colaboradorGerenciaPropriasDespesas']; scope: 'own' };
  };
}

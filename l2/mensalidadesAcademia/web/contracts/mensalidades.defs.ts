/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/contracts/mensalidades.defs.ts" enhancement="_blank"/>

/** Identificação do aluno exibida nas listas e na conferência. */
export interface AlunoIdentificacaoRef {
  details: {
    identification: {
      name: string;
    };
  };
}

export interface AlunoDetailsRef {
  identification: AlunoIdentificacaoRef;
}

/** Aluno por trás da matrícula da mensalidade. */
export interface AlunoRef {
  details: AlunoDetailsRef;
}

/** Matrícula da mensalidade, identificada pelo número. */
export interface MatriculaRef {
  readonly numero: string;
}

export interface MensalidadeLinhaDetails {
  details: {
    valor: string;
    readonly totalPago: string;
    readonly saldoDevedor: string;
    readonly vencida: boolean;
  };
}

/** Linha da lista de mensalidades por competência e aluno. */
export interface MensalidadeLinha {
  id: string;
  competencia: string;
  vencimento: string;
  status: 'aberta' | 'paga';
  details: MensalidadeLinhaDetails;
  matricula: MatriculaRef;
  aluno: AlunoRef;
}

export interface PagamentoLinhaDetails {
  details: {
    valor: string;
    formaPagamento: 'cash' | 'pix' | 'debitCard' | 'creditCard' | 'bankTransfer' | 'bankSlip';
  };
}

/** Pagamento já registrado para a mensalidade. */
export interface PagamentoLinha {
  id: string;
  dataPagamento: string;
  readonly registradoEm: string;
  details: PagamentoLinhaDetails;
}

export interface MensalidadeDetalheDetails {
  details: {
    valor: string;
    readonly geradaEm: string;
    quitadaEm?: string;
    readonly totalPago: string;
    readonly saldoDevedor: string;
    readonly vencida: boolean;
  };
}

/** Mensalidade escolhida com seus pagamentos e saldo, usada na conferência e no lançamento do pagamento. */
export interface MensalidadeDetalhe {
  id: string;
  version: number;
  competencia: string;
  vencimento: string;
  status: 'aberta' | 'paga';
  details: MensalidadeDetalheDetails;
  matricula: MatriculaRef;
  aluno: AlunoRef;
  pagamentos: PagamentoLinha[];
}

/** Contexto das ações do mês: competência sugerida e quantidades para a gerência conferir antes de gerar. */
export interface ResumoMes {
  competencia: string;
  readonly matriculasAtivas: number;
  readonly mensalidadesGeradas: number;
}

export interface MensalidadesContracts {
  /**
   * Finalidade: Abre a página de mensalidades em uma só chamada: o resumo do mês para as ações e a primeira página da lista de mensalidades.
   * Entrada: competencia: mês de referência (AAAA-MM) vindo da URL; quando ausente, usa o mês corrente.
   * Processamento: Conta as matrículas ativas com data de início até a competência (gerarSomenteMatriculaAtiva, somenteAtivaGeraMensalidade) e as mensalidades já geradas na competência. Lista as mensalidades da competência com número da matrícula e nome do aluno, ordenadas por vencimento e nome, em página de tamanho padrão. vencida, totalPago e saldoDevedor são calculados na leitura (mensalidadeVencida, mensalidadeVencidaAposVencimento: em aberto com vencimento anterior a hoje; saldo = valor − soma dos pagamentos, nunca abaixo de zero), nunca gravados.
   * Saída: resumoMes para as ações do mês e mensalidades paginadas ({ items, page, pageSize, hasMore }) para a lista, já com as vencidas marcadas para destaque.
   */
  'mensalidadesAcademia.mensalidades.carregarMensalidades': {
    kind: 'qry';
    input: { competencia?: string; page: number; pageSize: number };
    output: { resumoMes: ResumoMes; mensalidades: { items: MensalidadeLinha[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['mensalidadeVencida', 'mensalidadeVencidaAposVencimento', 'gerarSomenteMatriculaAtiva', 'somenteAtivaGeraMensalidade'];
    access: { actors: ['gerencia', 'recepcao']; grants: ['recepcaoAlunos', 'recepcaoMatriculas', 'gerenciaMensalidades', 'gerenciaAlunos']; scope: 'organization' };
  };
  /**
   * Finalidade: Filtra e pagina a lista de mensalidades: a recepção acha a cobrança do aluno, a gerência revisa as geradas do mês ou as vencidas.
   * Entrada: competencia: mês de referência; status: aberta ou paga; somenteVencidas: só em aberto com vencimento passado; busca: parte do nome do aluno ou número da matrícula; page e pageSize: página pedida.
   * Processamento: Aplica os filtros sobre as mensalidades, junta número da matrícula e nome do aluno, busca por texto em nome e número. vencida segue mensalidadeVencida/mensalidadeVencidaAposVencimento (em aberto e vencimento anterior a hoje), calculada na leitura junto com totalPago e saldoDevedor. Ordena por vencimento e nome.
   * Saída: Página de mensalidades ({ items, page, pageSize, hasMore }) que substitui a lista exibida.
   */
  'mensalidadesAcademia.mensalidades.buscarMensalidades': {
    kind: 'qry';
    input: { competencia?: string; status?: 'aberta' | 'paga'; details: { vencida?: boolean }; busca?: string; page: number; pageSize: number };
    output: { mensalidades: { items: MensalidadeLinha[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['mensalidadeVencida', 'mensalidadeVencidaAposVencimento'];
    access: { actors: ['gerencia', 'recepcao']; grants: ['recepcaoAlunos', 'recepcaoMatriculas', 'gerenciaMensalidades', 'gerenciaAlunos']; scope: 'organization' };
  };
  /**
   * Finalidade: Carrega a mensalidade escolhida na lista para conferência e para alimentar o lançamento do pagamento.
   * Entrada: mensalidadeId: id da linha escolhida na lista.
   * Processamento: Lê a mensalidade pelo id com número da matrícula, nome do aluno e os pagamentos registrados (listados pela mensalidadeId, ordenados por data do pagamento). totalPago, saldoDevedor e vencida são calculados (mensalidadeVencida), nunca gravados.
   * Saída: A mensalidade com valor, vencimento, geração, quitação, situação, pagamentos e saldo devedor; o formulário de pagamento usa o saldo, o vencimento e o nome do aluno.
   */
  'mensalidadesAcademia.mensalidades.obterMensalidade': {
    kind: 'qry';
    input: { mensalidadeId: string };
    output: { mensalidade: MensalidadeDetalhe };
    rules: ['mensalidadeVencida', 'mensalidadeVencidaAposVencimento'];
    access: { actors: ['gerencia', 'recepcao']; grants: ['recepcaoAlunos', 'recepcaoMatriculas', 'gerenciaMensalidades', 'gerenciaAlunos']; scope: 'organization' };
  };
  /**
   * Finalidade: Registra o pagamento recebido no balcão para a mensalidade conferida e devolve a mensalidade atualizada.
   * Entrada: mensalidadeId: mensalidade paga; dataPagamento: data em que o aluno pagou; valor: valor recebido; formaPagamento: meio de pagamento; observacao: anotação livre opcional.
   * Processamento: Recusa valor menor ou igual a zero (pagamentoValorPositivo) e mensalidade já paga (pagamentoSomenteMensalidadeEmAberto). Grava o pagamento com registradoEm preenchido pelo sistema. Na mesma transação, se a soma dos pagamentos atinge o valor, executa a transição quitar para paga com quitadaEm = data do pagamento que completou o valor (pagamentoQuitaMensalidade, quitacaoPorPagamento). A situação de bloqueio do aluno é derivada e deixa de valer quando as vencidas ficam abaixo de duas (regularizacaoDesbloqueiaAluno); nada disso é gravado pelo endpoint.
   * Saída: A mensalidade com pagamentos, total pago, saldo e situação recalculados, para redesenhar a conferência sem nova chamada.
   */
  'mensalidadesAcademia.mensalidades.lancarPagamento': {
    kind: 'cmd';
    writes: 'Pagamento.create';
    input: { mensalidadeId: string; dataPagamento: string; details: { valor: string; formaPagamento: 'cash' | 'pix' | 'debitCard' | 'creditCard' | 'bankTransfer' | 'bankSlip'; observacao?: string } };
    output: { mensalidade: MensalidadeDetalhe };
    rules: ['pagamentoValorPositivo', 'pagamentoSomenteMensalidadeEmAberto', 'pagamentoQuitaMensalidade', 'quitacaoPorPagamento', 'regularizacaoDesbloqueiaAluno'];
    access: { actors: ['gerencia', 'recepcao']; grants: ['recepcaoAlunos', 'recepcaoMatriculas', 'gerenciaMensalidades', 'gerenciaAlunos']; scope: 'organization' };
  };
  /**
   * Finalidade: Gera as mensalidades do mês de referência informado pela gerência, uma por matrícula ativa.
   * Entrada: competencia: mês de referência (AAAA-MM) da geração; matriculaIds: opcional, matrículas para as quais gerar (preenche Mensalidade.matriculaId de cada mensalidade criada); quando ausente, todas as matrículas ativas elegíveis da competência.
   * Processamento: Seleciona as matrículas ativas com data de início até a competência (restritas a matriculaIds quando informado), ignorando canceladas (gerarSomenteMatriculaAtiva, somenteAtivaGeraMensalidade, cancelamentoEncerraMensalidadesFuturas). Pula matrículas que já têm mensalidade na competência (mensalidadeUnicaPorMatriculaMes). Cada mensalidade nasce aberta com matriculaId da matrícula, valor copiado do plano (valorDoPlanoNaGeracao) e vencimento no dia do plano dentro do mês, caindo no último dia em meses mais curtos (vencimentoNoDiaDoPlano); geradaEm é preenchido pelo sistema. Tudo em uma transação.
   * Saída: Competência e as quantidades geradas e já existentes, para a gerência confirmar o resultado; a lista e o resumo são recarregados.
   */
  'mensalidadesAcademia.mensalidades.gerarMensalidades': {
    kind: 'cmd';
    writes: 'Mensalidade.create';
    input: { competencia: string; matriculaId?: string[] };
    output: { competencia: string; readonly quantidadeGeradas: number; readonly quantidadeJaExistentes: number };
    rules: ['gerarSomenteMatriculaAtiva', 'somenteAtivaGeraMensalidade', 'cancelamentoEncerraMensalidadesFuturas', 'mensalidadeUnicaPorMatriculaMes', 'valorDoPlanoNaGeracao', 'vencimentoNoDiaDoPlano'];
    access: { actors: ['gerencia', 'recepcao']; grants: ['recepcaoAlunos', 'recepcaoMatriculas', 'gerenciaMensalidades', 'gerenciaAlunos']; scope: 'organization' };
  };
}

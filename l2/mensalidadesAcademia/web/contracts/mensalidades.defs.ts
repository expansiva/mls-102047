/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/contracts/mensalidades.defs.ts" enhancement="_blank"/>

/** Identificação do aluno exibida nas cobranças. */
export interface AlunoIdentificacao {
  details: {
    identification: {
      name: string;
    };
  };
}

/** Situação calculada do aluno a partir das mensalidades vencidas. */
export interface AlunoSituacaoMensalidades {
  details: {
    mensalidadesAcademia: {
      readonly bloqueado: boolean;
    };
  };
}

export interface AlunoRefDetails {
  identification: AlunoIdentificacao;
  mensalidadesAcademia?: AlunoSituacaoMensalidades;
}

/** Aluno da matrícula da mensalidade. */
export interface AlunoRef {
  details: AlunoRefDetails;
}

/** Matrícula da mensalidade. */
export interface MatriculaRef {
  id: string;
  codigo: string;
}

/** Valores e situação calculada da mensalidade. */
export interface MensalidadeDetails {
  details: {
    valor: string;
    readonly totalPago: string;
    readonly paga: boolean;
    readonly vencida: boolean;
    readonly situacao: string;
    geradaEm: string;
    observacao?: string;
  };
}

/** Linha da lista de mensalidades da competência. */
export interface MensalidadeLinha {
  id: string;
  matriculaId: string;
  competencia: string;
  vencimento: string;
  details: MensalidadeDetails;
  aluno: AlunoRef;
}

export interface PagamentoDetails {
  details: {
    valor: string;
    forma: 'dinheiro' | 'pix' | 'cartaoCredito' | 'cartaoDebito' | 'boleto' | 'transferencia';
    observacao?: string;
  };
}

/** Pagamento lançado para a mensalidade. */
export interface PagamentoItem {
  id: string;
  mensalidadeId: string;
  dataPagamento: string;
  details: PagamentoDetails;
}

/** Mensalidade escolhida com aluno, matrícula e pagamentos em ordem de data. */
export interface MensalidadeCompleta {
  id: string;
  version: number;
  matriculaId: string;
  competencia: string;
  vencimento: string;
  details: MensalidadeDetails;
  aluno: AlunoRef;
  matricula: MatriculaRef;
  pagamentos: PagamentoItem[];
}

export interface MensalidadesContracts {
  /**
   * Finalidade: Carrega as mensalidades da competência para a recepção localizar a cobrança e a gerência conferir a geração do mês, junto com a contagem de matrículas ativas usada nas ações do mês.
   * Entrada: competencia: mês AAAA-MM (padrão: mês atual); alunoNome: trecho do nome do aluno para busca; vencida/paga: filtros opcionais de situação; page/pageSize: paginação.
   * Processamento: Filtra Mensalidade por competência (e pelos filtros), junta matrícula e nome do aluno do cadastro mestre, ordena por vencimento. totalPago, paga, vencida e situacao são calculados na leitura: totalPago soma os pagamentos; paga quando totalPago alcança o valor (mensalidadePagaQuandoQuitada); vencida quando não paga e vencimento anterior a hoje (mensalidadeVencidaAposVencimento). matriculasAtivas conta matrículas com status ativa.
   * Saída: Página de linhas de mensalidade { items, page, pageSize, hasMore } e o número de matrículas ativas que receberão mensalidade.
   */
  'mensalidadesAcademia.mensalidades.qryMensalidades': {
    kind: 'qry';
    input: { competencia: string; aluno: { details: { identification: { name?: string } } }; details: { vencida?: boolean; paga?: boolean }; page: number; pageSize: number };
    output: { mensalidades: { items: MensalidadeLinha[]; page: number; pageSize: number; hasMore: boolean }; readonly matriculasAtivas: number };
    rules: ['mensalidadeVencidaAposVencimento', 'mensalidadePagaQuandoQuitada'];
    access: { actors: ['gerencia', 'recepcao']; grants: ['recepcaoAlunos', 'recepcaoMatriculasCobrancas', 'gerenciaCobrancas', 'gerenciaAlunos']; scope: 'organization' };
  };
  /**
   * Finalidade: Abre a mensalidade escolhida na lista com seus pagamentos, a matrícula e o bloqueio do aluno, para conferência e lançamento de pagamento.
   * Entrada: mensalidadeId: mensalidade selecionada na lista.
   * Processamento: Lê a mensalidade por id, a matrícula (código), o aluno (nome e bloqueio) e os pagamentos da mensalidade ordenados por data. totalPago, paga, vencida e situacao são calculados (mensalidadePagaQuandoQuitada, mensalidadeVencidaAposVencimento); bloqueado é calculado quando o aluno tem duas ou mais mensalidades vencidas (alunoBloqueadoComDuasVencidas).
   * Saída: A mensalidade completa, usada pelo detalhe, pelo formulário de pagamento (valor e total pago) e pelo histórico (geradaEm e pagamentos).
   */
  'mensalidadesAcademia.mensalidades.qryMensalidadeDetalhe': {
    kind: 'qry';
    input: { mensalidadeId: string };
    output: { mensalidade: MensalidadeCompleta };
    rules: ['mensalidadePagaQuandoQuitada', 'mensalidadeVencidaAposVencimento', 'alunoBloqueadoComDuasVencidas'];
    access: { actors: ['gerencia', 'recepcao']; grants: ['recepcaoAlunos', 'recepcaoMatriculasCobrancas', 'gerenciaCobrancas', 'gerenciaAlunos']; scope: 'organization' };
  };
  /**
   * Finalidade: Registra o pagamento da mensalidade escolhida e devolve a mensalidade já recalculada.
   * Entrada: mensalidadeId: mensalidade paga; dataPagamento, valor, forma e observacao opcional informados pela recepção.
   * Processamento: Recusa se a mensalidade não existir (pagamentoQuitaMensalidade), se valor <= 0 (pagamentoValorPositivo) ou se a data for posterior a hoje (pagamentoDataNaoFutura). Cria o Pagamento em transação. Depois relê a mensalidade: totalPago, paga e situacao são calculados (mensalidadePagaQuandoQuitada) e o bloqueio do aluno é recalculado, deixando de valer com menos de duas vencidas (alunoDesbloqueadoAoRegularizarVencidas); nada disso é gravado.
   * Saída: A mensalidade completa com o novo pagamento, para redesenhar detalhe, formulário e histórico, e a linha atualizada para a lista.
   */
  'mensalidadesAcademia.mensalidades.cmdRegistrarPagamento': {
    kind: 'cmd';
    writes: 'Pagamento.create';
    input: { mensalidadeId: string; dataPagamento: string; details: { valor: string; forma: 'dinheiro' | 'pix' | 'cartaoCredito' | 'cartaoDebito' | 'boleto' | 'transferencia'; observacao?: string } };
    output: { mensalidade: MensalidadeCompleta; linha: MensalidadeLinha };
    rules: ['pagamentoQuitaMensalidade', 'pagamentoValorPositivo', 'pagamentoDataNaoFutura', 'mensalidadePagaQuandoQuitada', 'alunoDesbloqueadoAoRegularizarVencidas'];
    access: { actors: ['gerencia', 'recepcao']; grants: ['recepcaoAlunos', 'recepcaoMatriculasCobrancas', 'gerenciaCobrancas', 'gerenciaAlunos']; scope: 'organization' };
  };
  /**
   * Finalidade: Gera as mensalidades da competência informada pela gerência, uma por matrícula ativa.
   * Entrada: competencia: mês AAAA-MM a gerar; matriculaIds: matrículas (Mensalidade.matriculaId) para as quais gerar; quando omitido, todas as matrículas ativas da academia.
   * Processamento: Seleciona as matrículas informadas (ou todas) com status ativa (mensalidadeSomenteMatriculaAtiva, matriculaCanceladaNaoGeraMensalidade) e dataInicio até o último dia do mês (mensalidadeSomenteAposDataInicio); ignora as que já têm mensalidade na competência (mensalidadeUnicaPorMatriculaCompetencia). Para cada uma grava matriculaId, competencia, valor = valor atual do plano (mensalidadeValorDoPlano), vencimento no diaVencimento do plano ou último dia do mês (mensalidadeVencimentoNoDiaDoPlano) e geradaEm = agora, tudo numa transação.
   * Saída: Quantidades geradas e já existentes, para a mensagem de confirmação; a lista é recarregada.
   */
  'mensalidadesAcademia.mensalidades.cmdGerarMensalidades': {
    kind: 'cmd';
    writes: 'Mensalidade.create';
    input: { competencia: string; matriculaId?: string[] };
    output: { readonly quantidadeGeradas: number; readonly quantidadeJaExistentes: number };
    rules: ['mensalidadeSomenteMatriculaAtiva', 'matriculaCanceladaNaoGeraMensalidade', 'mensalidadeSomenteAposDataInicio', 'mensalidadeUnicaPorMatriculaCompetencia', 'mensalidadeValorDoPlano', 'mensalidadeVencimentoNoDiaDoPlano'];
    access: { actors: ['gerencia', 'recepcao']; grants: ['recepcaoAlunos', 'recepcaoMatriculasCobrancas', 'gerenciaCobrancas', 'gerenciaAlunos']; scope: 'organization' };
  };
}

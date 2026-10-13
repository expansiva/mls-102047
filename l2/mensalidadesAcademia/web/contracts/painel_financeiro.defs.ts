/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/contracts/painel_financeiro.defs.ts" enhancement="_blank"/>

/** Indicadores calculados do mês de referência. */
export interface PainelMensalidadesDetalhes {
  details: {
    readonly totalAReceber: string;
    readonly totalRecebido: string;
    readonly alunosAtivos: number;
    readonly alunosBloqueados: number;
    readonly alunosInadimplentes: number;
  };
}

/** Linha do painel do mês corrente com seus indicadores. */
export interface PainelMensalidadesResumo {
  readonly mesReferencia: string;
  details: PainelMensalidadesDetalhes;
}

/** Valores derivados da mensalidade vencida. */
export interface MensalidadeVencidaDetalhes {
  details: {
    readonly vencida: boolean;
    readonly totalPago: string;
    readonly saldoDevedor: string;
  };
}

/** Número da matrícula da mensalidade. */
export interface MatriculaNumero {
  readonly numero: string;
}

/** Identificação do aluno visível à gerência. */
export interface AlunoIdentificacao {
  details: {
    identification: {
      name: string;
    };
  };
}

/** Situação de inadimplência calculada do aluno. */
export interface AlunoSituacaoMensalidades {
  details: {
    mensalidadesAcademia: {
      readonly inadimplente: boolean;
      readonly quantidadeMensalidadesVencidas: number;
    };
  };
}

/** Detalhes do aluno usados na cobrança. */
export interface AlunoDetalhesCobranca {
  identification: AlunoIdentificacao;
  mensalidadesAcademia: AlunoSituacaoMensalidades;
}

/** Aluno da mensalidade vencida. */
export interface AlunoCobranca {
  details: AlunoDetalhesCobranca;
}

/** Mensalidade vencida com matrícula, aluno e saldo devedor. */
export interface MensalidadeVencida {
  id: string;
  competencia: string;
  vencimento: string;
  status: 'aberta' | 'paga';
  details: MensalidadeVencidaDetalhes;
  matricula: MatriculaNumero;
  aluno: AlunoCobranca;
}

export interface Painel_financeiroContracts {
  /**
   * Finalidade: Carrega, ao abrir a página, os indicadores financeiros do mês corrente para o resumo e para o lembrete de geração.
   * Entrada: Sem entrada: o mês de referência é o mês corrente, determinado no servidor pela data de hoje.
   * Processamento: Lê a linha do PainelMensalidades pelo mesReferencia do mês corrente (read.window). Os valores são derivados e mantidos pela plataforma, nunca gravados pelo endpoint: totalAReceber soma as mensalidades com vencimento no mês (painelTotalAreceber); totalRecebido soma os pagamentos com data no mês (painelTotalRecebido); alunosAtivos, alunosBloqueados e alunosInadimplentes seguem painelQuantidadeAlunos, alunoBloqueadoDuasVencidas e alunoInadimplente, com vencida conforme mensalidadeVencida. Se não houver linha do mês, devolve zeros.
   * Saída: O mês de referência e os cinco indicadores já calculados, exibidos nos destaques e no lembrete (que usa alunosAtivos).
   */
  'mensalidadesAcademia.painel_financeiro.qryPainelMes': {
    kind: 'qry';
    input: {};
    output: { painel: PainelMensalidadesResumo };
    rules: ['painelTotalAreceber', 'painelTotalRecebido', 'painelQuantidadeAlunos', 'alunoInadimplente', 'alunoBloqueadoDuasVencidas', 'mensalidadeVencida'];
    access: { actors: ['gerencia']; grants: ['gerenciaMensalidades', 'gerenciaAlunos', 'gerenciaPainel']; scope: 'organization' };
  };
  /**
   * Finalidade: Lista, paginada, as mensalidades vencidas dos alunos inadimplentes para a gerência priorizar a cobrança.
   * Entrada: page: página solicitada (começa em 1); pageSize: quantidade de itens por página.
   * Processamento: Filtra mensalidades com status aberta e vencimento anterior a hoje (mensalidadeVencida, mensalidadeVencidaAposVencimento), cujos alunos são inadimplentes por definição (alunoInadimplente). Junta a matrícula (número) e o aluno pela matrícula (nome e situação de mensalidades). vencida, totalPago, saldoDevedor, inadimplente e quantidadeMensalidadesVencidas são derivados e calculados, nunca gravados. Ordena por vencimento mais antigo e, em seguida, maior saldo devedor.
   * Saída: Página { items, page, pageSize, hasMore } de mensalidades vencidas com id (para o atalho abrir a mensalidade), competência, vencimento, situação, total pago, saldo devedor, número da matrícula e dados do aluno.
   */
  'mensalidadesAcademia.painel_financeiro.qryMensalidadesVencidas': {
    kind: 'qry';
    input: { page: number; pageSize: number };
    output: { mensalidades: { items: MensalidadeVencida[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['mensalidadeVencida', 'mensalidadeVencidaAposVencimento', 'alunoInadimplente'];
    access: { actors: ['gerencia']; grants: ['gerenciaMensalidades', 'gerenciaAlunos', 'gerenciaPainel']; scope: 'organization' };
  };
}

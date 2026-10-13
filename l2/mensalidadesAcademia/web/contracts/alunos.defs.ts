/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/contracts/alunos.defs.ts" enhancement="_blank"/>

/** Linha da lista de alunos com os sinais financeiros já calculados. */
export interface AlunoResumo {
  id: string;
  details: {
    identification: {
      name: string;
      readonly status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
    };
    mensalidadesAcademia: {
      readonly inadimplente: boolean;
      readonly bloqueado: boolean;
      readonly quantidadeMensalidadesVencidas: number;
    };
  };
}

/** Mensalidade de uma matrícula com total pago, saldo devedor e indicação de vencida. */
export interface MensalidadeSaldo {
  id: string;
  competencia: string;
  vencimento: string;
  status: 'aberta' | 'paga';
  details: {
    valor: string;
    readonly totalPago: string;
    readonly saldoDevedor: string;
    readonly vencida: boolean;
  };
}

/** Matrícula do aluno com plano, liberação de entrada e suas mensalidades com saldo devedor. */
export interface MatriculaSituacao {
  id: string;
  readonly numero: string;
  status: 'ativa' | 'cancelada';
  dataInicio: string;
  details: {
    readonly entradaLiberada: boolean;
    readonly bloqueada: boolean;
    readonly inadimplente: boolean;
    readonly mensalidadesVencidas: number;
  };
  plano: {
    nome: string;
  };
  mensalidades: MensalidadeSaldo[];
}

/** Cabeçalho do aluno com indicadores de bloqueio e inadimplência e suas matrículas com as mensalidades. */
export interface SituacaoFinanceira {
  id: string;
  details: {
    identification: {
      name: string;
      readonly status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
    };
    mensalidadesAcademia: {
      readonly inadimplente: boolean;
      readonly bloqueado: boolean;
      readonly quantidadeMensalidadesVencidas: number;
    };
  };
  matriculas: MatriculaSituacao[];
}

export interface AlunosContracts {
  /**
   * Finalidade: Carrega a lista paginada de alunos da academia com os sinais de inadimplência, bloqueio e quantidade de mensalidades vencidas, e atende a busca pelo nome.
   * Entrada: busca: parte do nome do aluno (opcional); somenteInadimplentes / somenteBloqueados: restringem a lista a quem precisa de atenção (opcionais); page e pageSize: página solicitada.
   * Processamento: Filtra alunos da organização pelo nome (contém, sem distinção de maiúsculas) e pelos filtros de situação, ordenando pelo nome. Os campos inadimplente, bloqueado e quantidadeMensalidadesVencidas são calculados no momento da leitura a partir das mensalidades das matrículas do aluno: vencida é mensalidade aberta com vencimento anterior a hoje (mensalidadeVencida, mensalidadeVencidaAposVencimento); bloqueado com duas ou mais vencidas em matrícula ativa (alunoBloqueadoDuasVencidas). Nada é gravado. Para gerência, expõe apenas nome, situação do cadastro e campos mensalidadesAcademia.
   * Saída: { items, page, pageSize, hasMore } de AlunoResumo, para a lista localizar o aluno e destacar quem está inadimplente ou bloqueado.
   */
  'mensalidadesAcademia.alunos.listarAlunos': {
    kind: 'qry';
    input: { busca?: string; somenteInadimplentes?: boolean; somenteBloqueados?: boolean; page: number; pageSize: number };
    output: { alunos: { items: AlunoResumo[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['mensalidadeVencida', 'mensalidadeVencidaAposVencimento', 'alunoBloqueadoDuasVencidas'];
    access: { actors: ['gerencia', 'recepcao']; grants: ['recepcaoAlunos', 'recepcaoPlanos', 'recepcaoMatriculas', 'gerenciaPlanos', 'gerenciaMensalidades', 'gerenciaAlunos']; scope: 'organization' };
  };
  /**
   * Finalidade: Carrega, ao escolher um aluno na lista, sua situação financeira completa: indicadores, matrículas com liberação de entrada e mensalidades com saldo.
   * Entrada: alunoId: id do aluno selecionado na lista.
   * Processamento: Lê o aluno, suas matrículas (ativas primeiro, depois canceladas, por data de início decrescente) com o nome do plano, e para cada matrícula as mensalidades com saldo devedor maior que zero, ordenadas por vencimento. Calcula na leitura: vencida = aberta e vencimento anterior a hoje (mensalidadeVencida, mensalidadeVencidaAposVencimento); totalPago = soma dos pagamentos; saldoDevedor = valor menos totalPago, nunca abaixo de zero; mensalidadesVencidas e inadimplente por matrícula; bloqueada = matrícula ativa com duas ou mais vencidas (alunoBloqueadoComDuasVencidas, alunoBloqueadoDuasVencidas); entradaLiberada = ativa e não bloqueada (alunoBloqueadoNaoEntra, bloqueadoNaoEntra); e os indicadores do aluno. Nenhum valor derivado é gravado.
   * Saída: SituacaoFinanceira com cabeçalho do aluno e matrículas com suas mensalidades, já no formato do painel de detalhe.
   */
  'mensalidadesAcademia.alunos.obterSituacaoFinanceiraAluno': {
    kind: 'qry';
    input: { alunoId: string };
    output: { aluno: SituacaoFinanceira };
    rules: ['mensalidadeVencida', 'mensalidadeVencidaAposVencimento', 'alunoBloqueadoDuasVencidas', 'alunoBloqueadoComDuasVencidas', 'alunoBloqueadoNaoEntra', 'bloqueadoNaoEntra'];
    access: { actors: ['gerencia', 'recepcao']; grants: ['recepcaoAlunos', 'recepcaoPlanos', 'recepcaoMatriculas', 'gerenciaPlanos', 'gerenciaMensalidades', 'gerenciaAlunos']; scope: 'organization' };
  };
}

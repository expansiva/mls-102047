/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/contracts/matriculas.defs.ts" enhancement="_blank"/>

/** Identificação do aluno exibida na matrícula. */
export interface AlunoIdentificacao {
  details: {
    identification: {
      name: string;
    };
  };
}

/** Detalhes do aluno lidos pela página. */
export interface AlunoDetails {
  identification: AlunoIdentificacao;
}

/** Aluno com id e nome, usado na lista de matrículas e na escolha do aluno. */
export interface AlunoNome {
  id: string;
  details: AlunoDetails;
}

/** Plano da matrícula identificado pelo nome. */
export interface PlanoNome {
  id: string;
  nome: string;
}

/** Valor e dia de vencimento do plano. */
export interface PlanoDetails {
  details: {
    valor: string;
    diaVencimento: number;
  };
}

/** Plano oferecido na criação da matrícula. */
export interface PlanoOpcao {
  id: string;
  nome: string;
  periodicidade: 'monthly' | 'quarterly' | 'annual';
  details: PlanoDetails;
}

/** Indicadores calculados da matrícula a partir das mensalidades e pagamentos. */
export interface MatriculaDetails {
  readonly quantidadeMensalidadesVencidas: number;
  readonly bloqueada: boolean;
  readonly inadimplente: boolean;
  readonly totalEmAberto: number;
}

/** Matrícula com aluno, plano, situação e indicadores de vencidas e total em aberto; serve à lista, à situação selecionada e às ações. */
export interface MatriculaResumo {
  id: string;
  version: number;
  codigo: string;
  alunoId: string;
  aluno: AlunoNome;
  planoId: string;
  plano: PlanoNome;
  status: 'ativa' | 'cancelada';
  dataInicio: string;
  details: MatriculaDetails;
}

export interface MatriculasContracts {
  /**
   * Finalidade: Carrega a lista paginada de matrículas da academia com aluno, plano, situação e indicadores de cobrança, já pronta para a lista, para a situação da matrícula escolhida e para as ações.
   * Entrada: apenasAtivas: quando verdadeiro, traz só matrículas com status ’ativa’. busca: trecho do código da matrícula ou do nome do aluno. page e pageSize: página pedida e tamanho da página.
   * Processamento: Filtra por status e busca (código pela locate.byText, nome do aluno pelo cadastro mestre), ordena pelo código e pagina. Compõe nome do aluno (read.mdmRecord) e nome do plano em lote (listByForeignKey). Para cada matrícula calcula, a partir das mensalidades e pagamentos carregados em lote: quantidadeMensalidadesVencidas = mensalidades não pagas com vencimento anterior a hoje (mensalidadeVencidaAposVencimento); bloqueada quando há duas ou mais vencidas (bloqueioPorDuasMensalidadesVencidas, base de alunoBloqueadoNaoEntra); inadimplente com ao menos uma vencida; totalEmAberto = soma de valor menos total pago das mensalidades. Os derivados são calculados, nunca gravados.
   * Saída: matriculas paginada { items, page, pageSize, hasMore } de MatriculaResumo; a página usa o mesmo item para a lista, para a situação selecionada (sem nova chamada) e para id/version do cancelamento.
   */
  'mensalidadesAcademia.matriculas.listarMatriculas': {
    kind: 'qry';
    input: { apenasAtivas?: boolean; busca?: string; page: number; pageSize: number };
    output: { matriculas: { items: MatriculaResumo[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['bloqueioPorDuasMensalidadesVencidas', 'mensalidadeVencidaAposVencimento', 'alunoBloqueadoNaoEntra'];
    access: { actors: ['gerencia', 'recepcao']; grants: ['recepcaoAlunos', 'recepcaoPlanos', 'recepcaoMatriculasCobrancas', 'gerenciaPlanos', 'gerenciaCobrancas', 'gerenciaAlunos']; scope: 'organization' };
  };
  /**
   * Finalidade: Procura o aluno a matricular pelo nome ou documento digitado no formulário de nova matrícula.
   * Entrada: termo: trecho do nome ou número do documento do aluno.
   * Processamento: Usa locate.byName e locate.byDocument do cadastro mestre, limitando a poucas dezenas de resultados ordenados por nome; não pagina.
   * Saída: alunos com id e nome, para o formulário preencher alunoId; se não houver, a recepção vai ao cadastro de alunos.
   */
  'mensalidadesAcademia.matriculas.buscarAlunos': {
    kind: 'qry';
    input: { termo: string };
    output: { alunos: AlunoNome[] };
    rules: [];
    access: { actors: ['gerencia', 'recepcao']; grants: ['recepcaoAlunos', 'recepcaoPlanos', 'recepcaoMatriculasCobrancas', 'gerenciaPlanos', 'gerenciaCobrancas', 'gerenciaAlunos']; scope: 'organization' };
  };
  /**
   * Finalidade: Carrega os planos disponíveis para a escolha na nova matrícula.
   * Entrada: Nenhuma.
   * Processamento: Lista todos os planos da academia ordenados por nome (locate.byColumn); a lista é curta e não é paginada.
   * Saída: planos com nome, periodicidade, valor e dia de vencimento, para a recepção escolher e conferir o plano.
   */
  'mensalidadesAcademia.matriculas.opcoesNovaMatricula': {
    kind: 'qry';
    input: {};
    output: { planos: PlanoOpcao[] };
    rules: [];
    access: { actors: ['gerencia', 'recepcao']; grants: ['recepcaoAlunos', 'recepcaoPlanos', 'recepcaoMatriculasCobrancas', 'gerenciaPlanos', 'gerenciaCobrancas', 'gerenciaAlunos']; scope: 'organization' };
  };
  /**
   * Finalidade: Cria a matrícula do aluno no plano escolhido a partir da data de início, já ativa.
   * Entrada: alunoId: aluno matriculado. planoId: plano escolhido. dataInicio: data a partir da qual o aluno fica matriculado. observacoes: anotações opcionais da recepção. dataCancelamento e motivo: campos de cancelamento editados na página, opcionais e normalmente vazios na criação.
   * Processamento: Recusa se o aluno já tem matrícula ativa (matriculaUnicaAtivaPorAluno). Emite o código pela sequência da plataforma, sem aceitá-lo do cliente (codigoMatriculaSequencial). Grava status ’ativa’ e recepcionistaId resolvido da sessão (locate.byLogin). Como a matrícula nasce ativa, recusa a criação se dataCancelamento ou motivo vierem preenchidos; o cancelamento é feito só pela transição cancelarMatricula. Indicadores derivados saem zerados por cálculo, nunca gravados.
   * Saída: matricula criada como MatriculaResumo, inserida na lista pela página sem recarregar.
   */
  'mensalidadesAcademia.matriculas.criarMatricula': {
    kind: 'cmd';
    writes: 'Matricula.create';
    input: { alunoId: string; planoId: string; dataInicio: string; details: { observacoes?: string; cancelamento: { motivo?: string } }; dataCancelamento?: string };
    output: { matricula: MatriculaResumo };
    rules: ['matriculaUnicaAtivaPorAluno', 'codigoMatriculaSequencial'];
    access: { actors: ['gerencia', 'recepcao']; grants: ['recepcaoAlunos', 'recepcaoPlanos', 'recepcaoMatriculasCobrancas', 'gerenciaPlanos', 'gerenciaCobrancas', 'gerenciaAlunos']; scope: 'organization' };
  };
  /**
   * Finalidade: Registra o cancelamento pedido pelo aluno, passando a matrícula de ativa para cancelada.
   * Entrada: id e version: matrícula selecionada e versão para concorrência otimista. dataCancelamento: data do pedido do aluno. motivo: motivo informado pelo aluno.
   * Processamento: Aceita só matrícula ’ativa’; executa a transição cancelarMatricula gravando dataCancelamento, motivo e registradoEm com o momento atual. Mantém as mensalidades já geradas e a matrícula deixa de entrar nas gerações posteriores (cancelamentoEncerraMensalidadesFuturas, matriculaCanceladaNaoGeraMensalidade). Recalcula os indicadores derivados para a resposta.
   * Saída: matricula atualizada como MatriculaResumo com status ’cancelada’, para a página substituir o item na lista e na situação selecionada.
   */
  'mensalidadesAcademia.matriculas.cancelarMatricula': {
    kind: 'cmd';
    writes: 'Matricula.cancelarMatricula';
    input: { id: string; version: number; dataCancelamento: string; details: { cancelamento: { motivo?: string } } };
    output: { matricula: MatriculaResumo };
    rules: ['cancelamentoEncerraMensalidadesFuturas', 'matriculaCanceladaNaoGeraMensalidade'];
    access: { actors: ['gerencia', 'recepcao']; grants: ['recepcaoAlunos', 'recepcaoPlanos', 'recepcaoMatriculasCobrancas', 'gerenciaPlanos', 'gerenciaCobrancas', 'gerenciaAlunos']; scope: 'organization' };
  };
}

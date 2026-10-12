/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/contracts/painel_mensalidades.defs.ts" enhancement="_blank"/>

/** Indicadores da competência lidos do painel de mensalidades, já calculados pelo servidor. */
export interface ResumoDoMes {
  readonly competencia: string;
  details: {
    readonly totalAReceber: string;
    readonly totalRecebido: string;
    readonly quantidadeMensalidades: number;
    readonly alunosAtivos: number;
    readonly alunosBloqueados: number;
    readonly alunosInadimplentes: number;
  };
}

/** Plano da matrícula com o valor e o dia de vencimento usados na geração. */
export interface PlanoDaMatricula {
  nome: string;
  details: {
    valor: string;
    diaVencimento: number;
  };
}

/** Nome do aluno da matrícula. */
export interface AlunoDaMatricula {
  details: {
    identification: {
      name: string;
    };
  };
}

/** Mensalidade gerada para a matrícula na competência. */
export interface MensalidadeDoMes {
  id: string;
  matriculaId: string;
  competencia: string;
  vencimento: string;
  details: {
    valor: string;
    readonly situacao: string;
  };
}

/** Uma matrícula ativa da competência com seu plano, o aluno e a mensalidade já gerada (ausente quando ainda não gerada). */
export interface LinhaGeracao {
  id: string;
  codigo: string;
  status: 'ativa' | 'cancelada';
  planoId: string;
  plano: PlanoDaMatricula;
  aluno: AlunoDaMatricula;
  mensalidade?: MensalidadeDoMes;
}

/** Aluno com sua situação de inadimplência e bloqueio calculada. */
export interface AlunoSituacao {
  details: {
    identification: {
      name: string;
    };
    mensalidadesAcademia: {
      readonly inadimplente: boolean;
      readonly bloqueado: boolean;
    };
  };
}

/** Matrícula da mensalidade vencida com vencidas, total em aberto e situação. */
export interface MatriculaInadimplente {
  id: string;
  codigo: string;
  details: {
    readonly quantidadeMensalidadesVencidas: number;
    readonly totalEmAberto: string;
    readonly inadimplente: boolean;
    readonly bloqueada: boolean;
  };
  aluno: AlunoSituacao;
}

/** Mensalidade vencida com a matrícula e o aluno em atraso. */
export interface MensalidadeVencida {
  id: string;
  competencia: string;
  vencimento: string;
  details: {
    valor: string;
    readonly situacao: string;
    readonly vencida: boolean;
  };
  matricula: MatriculaInadimplente;
}

export interface Painel_mensalidadesContracts {
  /**
   * Finalidade: Carrega numa só chamada tudo o que o painel de mensalidades mostra ao abrir: os indicadores da competência, a primeira página da conferência da geração e a primeira página das mensalidades vencidas.
   * Entrada: competencia: mês AAAA-MM do painel; quando ausente, usa o mês da data atual. pageSize: tamanho da primeira página das duas listas (padrão 20).
   * Processamento: Lê a linha de PainelMensalidades da competência (read.window); totalAReceber (painelTotalAreceber), totalRecebido (painelTotalRecebido), alunosAtivos, alunosBloqueados (alunoBloqueadoComDuasVencidas) e alunosInadimplentes (alunoInadimplenteComMensalidadeVencida) são derivados pelo agregado, nunca gravados aqui; se não houver linha, devolve zeros. A lista de geração traz as matrículas ativas (mensalidadeSomenteMatriculaAtiva) com data de início até o último dia da competência (mensalidadeSomenteAposDataInicio), ordenadas por código, com plano, nome do aluno e a mensalidade da competência quando já gerada (listByForeignKey em lote, sem N+1). A lista de vencidas filtra mensalidades em aberto com vencimento anterior a hoje (mensalidadeVencidaAposVencimento, mensalidadePagaQuandoQuitada) ordenadas por vencimento, com a matrícula (vencidas, total em aberto, bloqueada por bloqueioPorDuasMensalidadesVencidas, inadimplente) e o aluno (inadimplente, bloqueado) calculados.
   * Saída: resumo para o resumoDoMes e o lembreteGeracao (quantidadeMensalidades = 0 aciona o lembrete); geracao paginada para conferir a geração; vencidas paginada para acompanhar a inadimplência.
   */
  'mensalidadesAcademia.painel_mensalidades.carregarPainelMensalidades': {
    kind: 'qry';
    input: { competencia?: string; page: number; pageSize: number };
    output: { resumo: ResumoDoMes; geracao: { items: LinhaGeracao[]; page: number; pageSize: number; hasMore: boolean }; vencidas: { items: MensalidadeVencida[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['painelTotalAreceber', 'painelTotalRecebido', 'alunoInadimplenteComMensalidadeVencida', 'alunoBloqueadoComDuasVencidas', 'bloqueioPorDuasMensalidadesVencidas', 'mensalidadeVencidaAposVencimento', 'mensalidadePagaQuandoQuitada', 'mensalidadeSomenteMatriculaAtiva', 'mensalidadeSomenteAposDataInicio'];
    access: { actors: ['gerencia']; grants: ['gerenciaPlanos', 'gerenciaCobrancas', 'gerenciaAlunos', 'gerenciaPainel']; scope: 'organization' };
  };
  /**
   * Finalidade: Traz as páginas seguintes da conferência da geração do mês.
   * Entrada: competencia: mês AAAA-MM em conferência. page e pageSize: página pedida e seu tamanho.
   * Processamento: Mesmo filtro da carga: matrículas ativas (mensalidadeSomenteMatriculaAtiva) com data de início até o fim da competência (mensalidadeSomenteAposDataInicio), ordenadas por código, com plano, nome do aluno e a mensalidade da competência carregados em lote; situacao da mensalidade é derivada.
   * Saída: Página de linhas da geração, acrescentada à lista já exibida.
   */
  'mensalidadesAcademia.painel_mensalidades.listarGeracaoDoMes': {
    kind: 'qry';
    input: { competencia: string; page: number; pageSize: number };
    output: { geracao: { items: LinhaGeracao[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['mensalidadeSomenteMatriculaAtiva', 'mensalidadeSomenteAposDataInicio'];
    access: { actors: ['gerencia']; grants: ['gerenciaPlanos', 'gerenciaCobrancas', 'gerenciaAlunos', 'gerenciaPainel']; scope: 'organization' };
  };
  /**
   * Finalidade: Traz as páginas seguintes das mensalidades vencidas e dos alunos inadimplentes.
   * Entrada: page e pageSize: página pedida e seu tamanho.
   * Processamento: Filtra mensalidades não pagas (mensalidadePagaQuandoQuitada) com vencimento anterior a hoje (mensalidadeVencidaAposVencimento), ordenadas por vencimento; junta matrícula e aluno em lote com quantidade de vencidas, total em aberto, bloqueio (bloqueioPorDuasMensalidadesVencidas, alunoBloqueadoComDuasVencidas) e inadimplência (alunoInadimplenteComMensalidadeVencida), todos derivados.
   * Saída: Página de mensalidades vencidas acrescentada à lista da inadimplência.
   */
  'mensalidadesAcademia.painel_mensalidades.listarMensalidadesVencidas': {
    kind: 'qry';
    input: { page: number; pageSize: number };
    output: { vencidas: { items: MensalidadeVencida[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['mensalidadeVencidaAposVencimento', 'mensalidadePagaQuandoQuitada', 'bloqueioPorDuasMensalidadesVencidas', 'alunoBloqueadoComDuasVencidas', 'alunoInadimplenteComMensalidadeVencida'];
    access: { actors: ['gerencia']; grants: ['gerenciaPlanos', 'gerenciaCobrancas', 'gerenciaAlunos', 'gerenciaPainel']; scope: 'organization' };
  };
  /**
   * Finalidade: Gera as mensalidades da competência informada pela gerência, uma por matrícula ativa, e devolve o painel e a conferência já atualizados.
   * Entrada: competencia: mês AAAA-MM a gerar, gravado em Mensalidade.competencia. matriculaIds: matrículas para as quais gerar, gravadas em Mensalidade.matriculaId de cada mensalidade criada; quando ausente, gera para todas as matrículas elegíveis da competência. pageSize: tamanho da primeira página da conferência devolvida.
   * Processamento: Numa única transação (tudo ou nada) via mensalidadesAcademia.gerarMensalidadesDoMes: seleciona as matrículas informadas (ou todas) com status ativa (mensalidadeSomenteMatriculaAtiva), recusando/ignorando canceladas (matriculaCanceladaNaoGeraMensalidade, matriculaCanceladaEncerraGeracao) e com data de início até o último dia da competência (mensalidadeSomenteAposDataInicio); pula as que já têm mensalidade na competência (mensalidadeUnicaPorMatriculaCompetencia, garantida também pela chave única); cria cada mensalidade com matriculaId da matrícula, valor copiado do plano atual (mensalidadeValorDoPlano, planoAlteracaoNaoAfetaMensalidadesGeradas), vencimento no dia do plano ou no último dia do mês (mensalidadeVencimentoNoDiaDoPlano) e geradaEm = agora. Situação, paga e vencida são derivadas, nunca gravadas. Recusa competência fora do formato AAAA-MM.
   * Saída: quantidadeGeradas para a mensagem de confirmação (0 quando tudo já estava gerado); resumo da competência recalculado, que também apaga o lembrete; primeira página da conferência com as mensalidades geradas, para a página redesenhar sem nova chamada.
   */
  'mensalidadesAcademia.painel_mensalidades.gerarMensalidades': {
    kind: 'cmd';
    writes: 'Mensalidade.create';
    input: { competencia: string; matriculaId?: string[]; page: number; pageSize: number };
    output: { readonly quantidadeGeradas: number; resumo: ResumoDoMes; geracao: { items: LinhaGeracao[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['mensalidadeSomenteMatriculaAtiva', 'mensalidadeSomenteAposDataInicio', 'matriculaCanceladaNaoGeraMensalidade', 'matriculaCanceladaEncerraGeracao', 'mensalidadeUnicaPorMatriculaCompetencia', 'mensalidadeValorDoPlano', 'mensalidadeVencimentoNoDiaDoPlano', 'planoAlteracaoNaoAfetaMensalidadesGeradas'];
    access: { actors: ['gerencia']; grants: ['gerenciaPlanos', 'gerenciaCobrancas', 'gerenciaAlunos', 'gerenciaPainel']; scope: 'organization' };
  };
}

/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/contracts/alunos.defs.ts" enhancement="_blank"/>

/** Aluno como aparece na lista de busca, com a situação do cadastro e os indicadores de inadimplência e bloqueio. */
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
    };
  };
}

/** Situação do aluno escolhido na entrada da academia. */
export interface SituacaoEntrada {
  id: string;
  details: {
    identification: {
      name: string;
      readonly status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
    };
    mensalidadesAcademia: {
      readonly quantidadeMensalidadesVencidas: number;
      readonly inadimplente: boolean;
      readonly bloqueado: boolean;
    };
  };
  readonly podeEntrar: boolean;
}

/** Plano oferecido na escolha do plano da matrícula. */
export interface PlanoOpcao {
  id: string;
  nome: string;
  periodicidade: 'monthly' | 'quarterly' | 'annual';
  details: {
    valor: string;
    diaVencimento: number;
  };
}

/** Matrícula recém-criada, para confirmar à recepção o código e a situação. */
export interface MatriculaCriada {
  id: string;
  codigo: string;
  alunoId: string;
  planoId: string;
  status: 'ativa' | 'cancelada';
  dataInicio: string;
}

export interface AlunosContracts {
  /**
   * Finalidade: Abre a página de alunos com a primeira página da lista de alunos e os planos disponíveis para matrícula, em uma única chamada.
   * Entrada: pageSize: quantidade de alunos por página (opcional, padrão definido pelo servidor).
   * Processamento: Lista os alunos da organização ordenados por nome, primeira página. Para cada aluno, calcula (nunca grava) inadimplente (ao menos uma mensalidade vencida e não paga) e bloqueado (duas ou mais vencidas e não pagas, regra alunoBloqueadoComDuasVencidas) a partir das mensalidades de suas matrículas. Carrega também os planos ordenados por nome, com periodicidade, valor e dia de vencimento; a lista de planos é pequena e não é paginada.
   * Saída: alunos paginado ({ items, page, pageSize, hasMore }) para a lista de busca e planos para a escolha do plano na matrícula.
   */
  'mensalidadesAcademia.alunos.carregarAlunos': {
    kind: 'qry';
    input: { page: number; pageSize: number };
    output: { alunos: { items: AlunoResumo[]; page: number; pageSize: number; hasMore: boolean }; planos: PlanoOpcao[] };
    rules: ['alunoBloqueadoComDuasVencidas'];
    access: { actors: ['gerencia', 'recepcao']; grants: ['recepcaoAlunos', 'recepcaoPlanos', 'recepcaoMatriculasCobrancas', 'gerenciaPlanos', 'gerenciaCobrancas', 'gerenciaAlunos']; scope: 'organization' };
  };
  /**
   * Finalidade: Procura alunos pelo nome digitado e traz a página pedida da lista.
   * Entrada: nome: trecho do nome digitado na busca (vazio lista todos); page e pageSize: página pedida e tamanho da página.
   * Processamento: Localiza alunos pelo nome (locate.byName), ordenados por nome. Calcula para cada um inadimplente e bloqueado a partir das mensalidades vencidas e não pagas de suas matrículas (alunoBloqueadoComDuasVencidas: duas ou mais vencidas bloqueiam), sem gravar.
   * Saída: alunos paginado; a página 1 substitui a lista e as seguintes são acrescentadas.
   */
  'mensalidadesAcademia.alunos.buscarAlunos': {
    kind: 'qry';
    input: { nome?: string; page: number; pageSize: number };
    output: { alunos: { items: AlunoResumo[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['alunoBloqueadoComDuasVencidas'];
    access: { actors: ['gerencia', 'recepcao']; grants: ['recepcaoAlunos', 'recepcaoPlanos', 'recepcaoMatriculasCobrancas', 'gerenciaPlanos', 'gerenciaCobrancas', 'gerenciaAlunos']; scope: 'organization' };
  };
  /**
   * Finalidade: Mostra a situação de entrada do aluno escolhido na lista.
   * Entrada: alunoId: aluno selecionado na lista.
   * Processamento: Lê o aluno pelo id e conta as mensalidades de suas matrículas em aberto com vencimento anterior a hoje (quantidadeMensalidadesVencidas). Calcula inadimplente (uma ou mais vencidas) e bloqueado (duas ou mais, alunoBloqueadoComDuasVencidas). podeEntrar é falso quando o aluno está bloqueado (alunoBloqueadoNaoPodeEntrar, alunoBloqueadoNaoEntra). Tudo é calculado, nada é gravado.
   * Saída: situacao com nome, situação do cadastro, quantidade de vencidas, inadimplente, bloqueado e podeEntrar, para o destaque de acesso recusado.
   */
  'mensalidadesAcademia.alunos.obterSituacaoAluno': {
    kind: 'qry';
    input: { alunoId: string };
    output: { situacao: SituacaoEntrada };
    rules: ['alunoBloqueadoComDuasVencidas', 'alunoBloqueadoNaoPodeEntrar', 'alunoBloqueadoNaoEntra'];
    access: { actors: ['gerencia', 'recepcao']; grants: ['recepcaoAlunos', 'recepcaoPlanos', 'recepcaoMatriculasCobrancas', 'gerenciaPlanos', 'gerenciaCobrancas', 'gerenciaAlunos']; scope: 'organization' };
  };
  /**
   * Finalidade: Registra um aluno novo quando a busca não o encontrou.
   * Entrada: name: nome do aluno informado no formulário.
   * Processamento: Cria o cadastro (register.createOrAttach), anexando o papel de aluno a uma pessoa já existente com o mesmo cadastro para evitar duplicidade; país padrão da organização (BR). Os indicadores de inadimplência e bloqueio do aluno novo são calculados (falsos, sem mensalidades), nunca gravados.
   * Saída: aluno criado no formato da lista, inserido nela e pronto para ser matriculado.
   */
  'mensalidadesAcademia.alunos.registrarAluno': {
    kind: 'cmd';
    writes: 'Aluno.create';
    input: { details: { identification: { name: string } } };
    output: { aluno: AlunoResumo };
    rules: [];
    access: { actors: ['gerencia', 'recepcao']; grants: ['recepcaoAlunos', 'recepcaoPlanos', 'recepcaoMatriculasCobrancas', 'gerenciaPlanos', 'gerenciaCobrancas', 'gerenciaAlunos']; scope: 'organization' };
  };
  /**
   * Finalidade: Matricula o aluno no plano escolhido a partir da data de início, deixando a matrícula ativa.
   * Entrada: alunoId: aluno registrado ou selecionado; planoId: plano escolhido; dataInicio: data de início; observacoes: anotações da recepção (opcional).
   * Processamento: Recusa se o aluno já tiver matrícula ativa (matriculaUnicaAtivaPorAluno). Emite o código pela sequência da plataforma, que não pode ser alterado (codigoMatriculaSequencial). Grava status ativa e a recepcionista da sessão como recepcionistaId, quando houver.
   * Saída: matricula criada com código e situação para a confirmação; a situação do aluno é recarregada.
   */
  'mensalidadesAcademia.alunos.criarMatricula': {
    kind: 'cmd';
    writes: 'Matricula.create';
    input: { alunoId: string; planoId: string; dataInicio: string; details: { observacoes?: string } };
    output: { matricula: MatriculaCriada };
    rules: ['matriculaUnicaAtivaPorAluno', 'codigoMatriculaSequencial'];
    access: { actors: ['gerencia', 'recepcao']; grants: ['recepcaoAlunos', 'recepcaoPlanos', 'recepcaoMatriculasCobrancas', 'gerenciaPlanos', 'gerenciaCobrancas', 'gerenciaAlunos']; scope: 'organization' };
  };
}

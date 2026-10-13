/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/contracts/matriculas.defs.ts" enhancement="_blank"/>

/** Linha da lista de matrículas com aluno, plano e indicadores de situação calculados. */
export interface MatriculaResumo {
  id: string;
  version: number;
  readonly numero: string;
  alunoId: string;
  aluno: {
    details: {
      identification: {
        name: string;
      };
    };
  };
  planoId: string;
  plano: {
    nome: string;
  };
  dataInicio: string;
  status: 'ativa' | 'cancelada';
  details: {
    readonly bloqueada: boolean;
    readonly inadimplente: boolean;
  };
}

/** Mensalidade vencida da matrícula que explica o bloqueio. */
export interface MensalidadeVencida {
  id: string;
  competencia: string;
  vencimento: string;
  details: {
    valor: string;
    readonly saldoDevedor: string;
    readonly vencida: boolean;
  };
}

/** Situação da matrícula selecionada com a liberação da entrada e as mensalidades vencidas. */
export interface SituacaoMatricula {
  id: string;
  version: number;
  readonly numero: string;
  aluno: {
    details: {
      identification: {
        name: string;
      };
    };
  };
  plano: {
    nome: string;
  };
  dataInicio: string;
  status: 'ativa' | 'cancelada';
  details: {
    readonly entradaLiberada: boolean;
    readonly bloqueada: boolean;
    readonly inadimplente: boolean;
    readonly mensalidadesVencidas: number;
  };
  vencidas: MensalidadeVencida[];
}

/** Aluno encontrado na busca da nova matrícula. */
export interface AlunoOpcao {
  id: string;
  details: {
    identification: {
      name: string;
    };
  };
}

/** Plano oferecido na matrícula com valor e dia de vencimento. */
export interface PlanoOpcao {
  id: string;
  nome: string;
  periodicidade: 'monthly' | 'quarterly' | 'yearly';
  details: {
    valor: string;
    diaVencimento: number;
  };
}

export interface MatriculasContracts {
  /**
   * Finalidade: Carrega a lista paginada de matrículas do balcão, com nome do aluno, plano e indicadores de bloqueio e inadimplência.
   * Entrada: busca: texto livre comparado ao número da matrícula, ao nome do aluno e ao nome do plano; status: filtra ativas ou canceladas (a gerência usa ’ativa’ para conferir as do mês); page e pageSize: paginação.
   * Processamento: Filtra por status e busca, junta o nome do aluno (cadastro mestre) e o nome do plano, ordena por número. bloqueada e inadimplente são calculados a partir das mensalidades em aberto com vencimento anterior a hoje (mensalidadeVencida): inadimplente com ao menos uma, bloqueada quando ativa com duas ou mais (alunoBloqueadoComDuasVencidas, alunoBloqueadoDuasVencidas). Nada é gravado.
   * Saída: Página { items, page, pageSize, hasMore } de MatriculaResumo para a lista localizar o aluno e mostrar a situação de cada matrícula.
   */
  'mensalidadesAcademia.matriculas.listarMatriculas': {
    kind: 'qry';
    input: { busca?: string; status?: 'ativa' | 'cancelada'; page: number; pageSize: number };
    output: { matriculas: { items: MatriculaResumo[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['alunoBloqueadoComDuasVencidas', 'alunoBloqueadoDuasVencidas', 'mensalidadeVencida'];
    access: { actors: ['gerencia', 'recepcao']; grants: ['recepcaoAlunos', 'recepcaoPlanos', 'recepcaoMatriculas', 'gerenciaPlanos', 'gerenciaMensalidades', 'gerenciaAlunos']; scope: 'organization' };
  };
  /**
   * Finalidade: Abre a situação da matrícula escolhida na lista para a recepção decidir se o aluno entra.
   * Entrada: matriculaId: id da matrícula selecionada na lista.
   * Processamento: Lê a matrícula com aluno e plano e as mensalidades dela. Seleciona as vencidas: em aberto e com vencimento anterior a hoje (mensalidadeVencida, mensalidadeVencidaAposVencimento), com saldo devedor = valor menos pagamentos, nunca abaixo de zero. Calcula mensalidadesVencidas (contagem), inadimplente (ao menos uma), bloqueada (ativa com duas ou mais, alunoBloqueadoComDuasVencidas, alunoBloqueadoDuasVencidas) e entradaLiberada (ativa e não bloqueada, alunoBloqueadoNaoEntra, bloqueadoNaoEntra). Valores derivados são calculados, nunca gravados.
   * Saída: SituacaoMatricula com o destaque de entrada liberada ou bloqueada e a lista das mensalidades vencidas ordenadas por vencimento; inclui id e version para o cancelamento.
   */
  'mensalidadesAcademia.matriculas.obterSituacaoMatricula': {
    kind: 'qry';
    input: { id: string };
    output: { situacao: SituacaoMatricula };
    rules: ['mensalidadeVencida', 'mensalidadeVencidaAposVencimento', 'alunoBloqueadoComDuasVencidas', 'alunoBloqueadoDuasVencidas', 'alunoBloqueadoNaoEntra', 'bloqueadoNaoEntra'];
    access: { actors: ['gerencia', 'recepcao']; grants: ['recepcaoAlunos', 'recepcaoPlanos', 'recepcaoMatriculas', 'gerenciaPlanos', 'gerenciaMensalidades', 'gerenciaAlunos']; scope: 'organization' };
  };
  /**
   * Finalidade: Busca o aluno pelo nome ao iniciar a nova matrícula.
   * Entrada: nome: parte do nome digitado pela recepção.
   * Processamento: Localiza alunos pelo nome no cadastro mestre, limitado às primeiras ocorrências (até 20), ordenados por nome.
   * Saída: Lista curta de alunos (id e nome) para a recepção escolher quem será matriculado.
   */
  'mensalidadesAcademia.matriculas.buscarAlunos': {
    kind: 'qry';
    input: { nome: string };
    output: { alunos: AlunoOpcao[] };
    rules: [];
    access: { actors: ['gerencia', 'recepcao']; grants: ['recepcaoAlunos', 'recepcaoPlanos', 'recepcaoMatriculas', 'gerenciaPlanos', 'gerenciaMensalidades', 'gerenciaAlunos']; scope: 'organization' };
  };
  /**
   * Finalidade: Carrega os planos oferecidos para o formulário de nova matrícula.
   * Entrada: Nenhum.
   * Processamento: Lista todos os planos da academia ordenados por nome; a lista é pequena e não é paginada.
   * Saída: Planos com periodicidade, valor e dia de vencimento para a recepção escolher e conferir.
   */
  'mensalidadesAcademia.matriculas.listarPlanos': {
    kind: 'qry';
    input: {};
    output: { planos: PlanoOpcao[] };
    rules: [];
    access: { actors: ['gerencia', 'recepcao']; grants: ['recepcaoAlunos', 'recepcaoPlanos', 'recepcaoMatriculas', 'gerenciaPlanos', 'gerenciaMensalidades', 'gerenciaAlunos']; scope: 'organization' };
  };
  /**
   * Finalidade: Registra a matrícula do aluno no plano escolhido a partir da data de início.
   * Entrada: alunoId: aluno escolhido na busca; planoId: plano escolhido; dataInicio: data a partir da qual a matrícula vale; observacoes: anotações opcionais da recepção.
   * Processamento: Recusa sem aluno, plano ou data de início (matriculaExigeAlunoEPlano); cria a matrícula com status ’ativa’, emite o número pela sequência e registra o atendente da sessão como recepcaoId, numa única transação.
   * Saída: MatriculaResumo da matrícula criada, inserida na lista sem nova consulta.
   */
  'mensalidadesAcademia.matriculas.registrarMatricula': {
    kind: 'cmd';
    writes: 'Matricula.create';
    input: { alunoId: string; planoId: string; dataInicio: string; details: { observacoes?: string } };
    output: { matricula: MatriculaResumo };
    rules: ['matriculaExigeAlunoEPlano'];
    access: { actors: ['gerencia', 'recepcao']; grants: ['recepcaoAlunos', 'recepcaoPlanos', 'recepcaoMatriculas', 'gerenciaPlanos', 'gerenciaMensalidades', 'gerenciaAlunos']; scope: 'organization' };
  };
  /**
   * Finalidade: Cancela a matrícula a pedido do aluno, encerrando a geração de mensalidades futuras.
   * Entrada: matriculaId e version: matrícula selecionada e sua versão para concorrência otimista; dataCancelamento: data do encerramento; motivo: motivo informado pelo aluno.
   * Processamento: Recusa se a matrícula não estiver ativa ou sem data de cancelamento (cancelamentoEncerraGeracao); aplica a transição cancelar (ativa → cancelada) gravando data e motivo; a matrícula não volta a ficar ativa. Recalcula a situação derivada para a resposta.
   * Saída: SituacaoMatricula atualizada (status cancelada, entrada não liberada) para redesenhar o detalhe; a lista é recarregada.
   */
  'mensalidadesAcademia.matriculas.cancelarMatricula': {
    kind: 'cmd';
    writes: 'Matricula.cancelar';
    input: { id: string; version: number; details: { cancelamento: { dataCancelamento: string; motivo?: string } } };
    output: { situacao: SituacaoMatricula };
    rules: ['cancelamentoEncerraGeracao'];
    access: { actors: ['gerencia', 'recepcao']; grants: ['recepcaoAlunos', 'recepcaoPlanos', 'recepcaoMatriculas', 'gerenciaPlanos', 'gerenciaMensalidades', 'gerenciaAlunos']; scope: 'organization' };
  };
}

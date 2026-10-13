/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/contracts/planos.defs.ts" enhancement="_blank"/>

/** Detalhes do plano mostrados no catálogo e na escolha para matrícula. */
export interface PlanoDetalhes {
  details: {
    valor: string;
    diaVencimento: number;
    descricao?: string;
    readonly quantidadeMatriculasAtivas: number;
  };
}

/** Plano da academia como o catálogo o mostra: nome, periodicidade, valor, dia de vencimento, descrição e matrículas ativas. */
export interface PlanoCatalogo {
  id: string;
  version: number;
  nome: string;
  periodicidade: 'monthly' | 'quarterly' | 'yearly';
  details: PlanoDetalhes;
}

export interface PlanosContracts {
  /**
   * Finalidade: Carrega, na abertura da página, todos os planos da academia para a gerência conferir antes de cadastrar e para a recepção escolher o plano da matrícula.
   * Entrada: Nenhuma entrada: a página mostra o catálogo completo da organização.
   * Processamento: Lista todos os planos da organização ordenados pelo nome. Para cada plano calcula quantidadeMatriculasAtivas contando as matrículas com status ’ativa’ que apontam para o plano (campo derivado, calculado na leitura e nunca gravado). A lista não é paginada: o catálogo de planos é pequeno e cabe numa tela; filtros por periodicidade ou nome são feitos na própria página.
   * Saída: Lista de planos com id, version, nome, periodicidade, valor, dia de vencimento, descrição e matrículas ativas; alimenta o catálogo e resolve o plano escolhido nas ações de matrícula sem nova chamada.
   */
  'mensalidadesAcademia.planos.consultarPlanos': {
    kind: 'qry';
    input: {};
    output: { planos: PlanoCatalogo[] };
    rules: [];
    access: { actors: ['gerencia', 'recepcao']; grants: ['recepcaoPlanos', 'gerenciaPlanos']; scope: 'organization' };
  };
  /**
   * Finalidade: Cadastra um novo plano pela gerência e o devolve pronto para entrar no catálogo.
   * Entrada: nome: nome do plano; periodicidade: mensal, trimestral ou anual; valor: valor cobrado em cada mensalidade; diaVencimento: dia do mês em que vencem as mensalidades; descricao: observações opcionais da gerência.
   * Processamento: Recusa o cadastro se já existir plano com o mesmo nome (planoNomeUnico), se o valor não for maior que zero (planoValorPositivo) ou se o dia de vencimento não estiver entre 1 e 31 (planoDiaVencimentoValido). Cria o plano; quantidadeMatriculasAtivas é derivada e, para um plano novo, é calculada como zero, nunca gravada.
   * Saída: O plano criado com id, version e todos os campos do catálogo, para a página inseri-lo na lista sem recarregar.
   */
  'mensalidadesAcademia.planos.registrarPlano': {
    kind: 'cmd';
    writes: 'Plano.create';
    input: { nome: string; periodicidade: 'monthly' | 'quarterly' | 'yearly'; details: { valor: string; diaVencimento: number; descricao?: string } };
    output: { plano: PlanoCatalogo };
    rules: ['planoNomeUnico', 'planoValorPositivo', 'planoDiaVencimentoValido'];
    access: { actors: ['gerencia', 'recepcao']; grants: ['recepcaoPlanos', 'gerenciaPlanos']; scope: 'organization' };
  };
}

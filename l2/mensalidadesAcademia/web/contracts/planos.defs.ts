/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/contracts/planos.defs.ts" enhancement="_blank"/>

/** Detalhes do plano: valor, dia de vencimento, descrição e matrículas ativas (calculado). */
export interface PlanoDetalhes {
  details: {
    valor: string;
    diaVencimento: number;
    descricao?: string;
    readonly matriculasAtivas: number;
  };
}

/** Plano da academia com os dados exibidos na lista e carregados no formulário de ajuste. */
export interface PlanoItem {
  id: string;
  version: number;
  nome: string;
  periodicidade: 'monthly' | 'quarterly' | 'annual';
  details: PlanoDetalhes;
}

export interface PlanosContracts {
  /**
   * Finalidade: Carrega, na abertura da página, todos os planos da academia já prontos para a lista e para o formulário de ajuste.
   * Entrada: Nenhuma entrada; o escopo é a organização do usuário (gerência ou recepção).
   * Processamento: Lista os planos da organização ordenados por nome. Para cada plano calcula matriculasAtivas contando as matrículas com status ’ativa’ que apontam para ele (campo derivado, calculado na leitura, nunca gravado). Sem paginação: a academia tem poucos planos (mensal, trimestral, anual).
   * Saída: Lista de planos com id, version, nome, periodicidade, valor, dia de vencimento, descrição e matrículas ativas; a lista exibe e o formulário é preenchido a partir do item escolhido, sem nova chamada.
   */
  'mensalidadesAcademia.planos.qryPlanos': {
    kind: 'qry';
    input: {};
    output: { planos: PlanoItem[] };
    rules: [];
    access: { actors: ['gerencia', 'recepcao']; grants: ['recepcaoPlanos', 'gerenciaPlanos']; scope: 'organization' };
  };
  /**
   * Finalidade: Cadastra um novo plano da academia, a pedido da gerência.
   * Entrada: nome: nome do plano; periodicidade: mensal, trimestral ou anual; valor: valor de cada mensalidade; diaVencimento: dia do mês do vencimento; descricao: observações opcionais exibidas à recepção.
   * Processamento: Recusa se já existir plano com o mesmo nome (planoNomeUnico); recusa valor menor ou igual a zero (planoValorPositivo); recusa dia de vencimento fora de 1 a 31 (planoDiaVencimentoValido). Cria o plano; matriculasAtivas é calculado (zero no novo plano), nunca gravado.
   * Saída: O plano criado no formato da lista, para ser inserido na lista sem recarregar a página.
   */
  'mensalidadesAcademia.planos.cmdCadastrarPlano': {
    kind: 'cmd';
    writes: 'Plano.create';
    input: { nome: string; periodicidade: 'monthly' | 'quarterly' | 'annual'; details: { valor: string; diaVencimento: number; descricao?: string } };
    output: { plano: PlanoItem };
    rules: ['planoNomeUnico', 'planoValorPositivo', 'planoDiaVencimentoValido'];
    access: { actors: ['gerencia', 'recepcao']; grants: ['recepcaoPlanos', 'gerenciaPlanos']; scope: 'organization' };
  };
  /**
   * Finalidade: Ajusta os dados de um plano existente (valor, vencimento, nome, periodicidade, descrição), a pedido da gerência.
   * Entrada: id e version: plano escolhido e versão lida, para controle de concorrência; nome, periodicidade, valor, diaVencimento e descricao: novos valores do formulário.
   * Processamento: Recusa se a versão estiver desatualizada; recusa nome já usado por outro plano (planoNomeUnico), valor menor ou igual a zero (planoValorPositivo) e dia fora de 1 a 31 (planoDiaVencimentoValido). Atualiza somente o plano: as mensalidades já geradas não são alteradas, a mudança vale para as gerações seguintes (planoAlteracaoNaoAfetaMensalidadesGeradas). matriculasAtivas é recalculado na leitura.
   * Saída: O plano atualizado com nova version e matrículas ativas, para substituir o item na lista e no formulário sem nova chamada.
   */
  'mensalidadesAcademia.planos.cmdAjustarPlano': {
    kind: 'cmd';
    writes: 'Plano.update';
    input: { id: string; version: number; nome: string; periodicidade: 'monthly' | 'quarterly' | 'annual'; details: { valor: string; diaVencimento: number; descricao?: string } };
    output: { plano: PlanoItem };
    rules: ['planoNomeUnico', 'planoValorPositivo', 'planoDiaVencimentoValido', 'planoAlteracaoNaoAfetaMensalidadesGeradas'];
    access: { actors: ['gerencia', 'recepcao']; grants: ['recepcaoPlanos', 'gerenciaPlanos']; scope: 'organization' };
  };
}

/// <mls fileReference="_102047_/l2/comandaRestaurante/web/contracts/mesas.defs.ts" enhancement="_blank"/>

/** Dados de uma mesa necessários para a lista da casa, para a seleção no formulário e para o redesenho após o cadastro ou a atualização. */
export interface MesaResumo {
  id: string;
  version: number;
  code: string;
  readonly disponivel: boolean;
}

export interface MesasContracts {
  /**
   * Finalidade: Carrega o salão para o caixa consultar as mesas da casa e selecionar uma mesa para manutenção.
   * Entrada: Não recebe parâmetros; a página apresenta as mesas no escopo autorizado do caixa.
   * Processamento: Obtém as mesas visíveis ao caixa, ordenadas pelo código. Compõe cada registro com identificador, versão, código e disponibilidade. A disponibilidade é derivada da inexistência de comanda aberta vinculada e é calculada nesta consulta, sem gravação. A lista não é paginada porque representa o conjunto físico de mesas da casa exibido integralmente nesta página.
   * Saída: Retorna as mesas no formato usado pela lista e pela seleção do formulário. A versão permite uma atualização concorrente segura.
   */
  'comandaRestaurante.mesas.carregarMesas': {
    kind: 'qry';
    input: {};
    output: { mesas: MesaResumo[] };
    meta: { output: { mesas: { entity: 'Mesa'; many: true } }; lists: {}; params: {} };
    rules: [];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
  /**
   * Finalidade: Cadastra uma mesa para a operação e devolve o registro completo para a página redesenhar.
   * Entrada: code é o código informado pelo caixa para identificar a nova mesa.
   * Processamento: Cria a mesa com o código recebido, aplicando as validações de criação e a unicidade do código no repositório. Em seguida compõe id, versão, código e disponibilidade derivada. A disponibilidade é calculada e não é gravada pelo comando.
   * Saída: Retorna a mesa criada no formato da lista, para o formulário exibir o resultado e a lista inserir o novo registro sem uma segunda chamada.
   */
  'comandaRestaurante.mesas.criarMesa': {
    kind: 'cmd';
    writes: 'Mesa.create';
    input: { code: string };
    output: { mesa: MesaResumo };
    meta: { output: { mesa: { entity: 'Mesa'; many: false } }; lists: {}; params: {} };
    rules: [];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
  /**
   * Finalidade: Atualiza o código de uma mesa selecionada e devolve seu estado completo para a página redesenhar a seleção e sua linha.
   * Entrada: id identifica a mesa selecionada, version protege a atualização contra alteração concorrente e code é o novo código informado pelo caixa.
   * Processamento: Localiza a mesa por id, confere a versão recebida e atualiza seu código, aplicando as validações de manutenção e a unicidade do código. Em seguida compõe id, nova versão, código e disponibilidade derivada; disponibilidade não é armazenada por este comando.
   * Saída: Retorna a mesa atualizada no formato da lista, permitindo substituir a linha e manter o formulário com a versão corrente sem nova consulta.
   */
  'comandaRestaurante.mesas.atualizarMesa': {
    kind: 'cmd';
    writes: 'Mesa.update';
    input: { id: string; version: number; code: string };
    output: { mesa: MesaResumo };
    meta: { output: { mesa: { entity: 'Mesa'; many: false } }; lists: {}; params: {} };
    rules: [];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
}

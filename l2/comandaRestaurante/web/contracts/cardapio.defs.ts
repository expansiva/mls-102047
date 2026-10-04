/// <mls fileReference="_102047_/l2/comandaRestaurante/web/contracts/cardapio.defs.ts" enhancement="_blank"/>

/** Dados concisos de um item para apresentação no catálogo do cardápio. */
export interface ItemCardapioResumo {
  id: string;
  name: string;
  precoVigente: string;
}

/** Dados autorizados para preencher e manter um item do cardápio no formulário. */
export interface ItemCardapioEdicao {
  id: string;
  version: number;
  name: string;
  precoVigente: string;
}

/** Faixa do catálogo ordenada para leitura contínua, com indicação de próxima faixa. */
export interface PaginaItensCardapio {
  itens: ItemCardapioResumo[];
  readonly hasMore: boolean;
}

export interface CardapioContracts {
  /**
   * Finalidade: Carrega a primeira faixa do catálogo vigente ao abrir a página, para o caixa conferir e selecionar itens para manutenção.
   * Entrada: Não recebe parâmetros; a consulta começa na primeira faixa do catálogo.
   * Processamento: Busca uma faixa de itens de cardápio ordenada por nome, com identificador como desempate, e projeta identificador, nome e preço vigente. Calcula hasMore pela existência de registros após a faixa retornada. Não aplica regras de lançamento ou totalização de comanda.
   * Saída: Retorna a página de itens já no formato da lista, incluindo a indicação de que existe outra faixa para leitura contínua.
   */
  'comandaRestaurante.cardapio.carregarItensCardapio': {
    kind: 'qry';
    input: {};
    output: { pagina: PaginaItensCardapio };
    meta: { output: {}; lists: {}; params: {} };
    rules: [];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
  /**
   * Finalidade: Carrega a próxima faixa do catálogo sem transferir todos os itens cadastrados.
   * Entrada: id é o cursor do último item apresentado na lista.
   * Processamento: Resolve a posição do cursor e busca a faixa posterior na ordenação estável por nome e identificador. Projeta identificador, nome e preço vigente e calcula hasMore pela existência de uma faixa adicional. Não aplica regras de lançamento ou totalização de comanda.
   * Saída: Retorna somente a próxima página, para a interface anexá-la aos itens já exibidos.
   */
  'comandaRestaurante.cardapio.carregarMaisItensCardapio': {
    kind: 'qry';
    input: { id: string };
    output: { pagina: PaginaItensCardapio };
    meta: { output: {}; lists: {}; params: {} };
    rules: [];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
  /**
   * Finalidade: Obtém o item selecionado no catálogo para preencher o formulário de manutenção.
   * Entrada: id identifica o item do cardápio escolhido pelo caixa.
   * Processamento: Consulta o item pelo identificador e compõe os campos autorizados para edição, incluindo a versão usada no controle de concorrência. Não aplica regras de lançamento ou totalização de comanda.
   * Saída: Retorna o item selecionado no formato que o formulário precisa para exibir e alterar seus dados.
   */
  'comandaRestaurante.cardapio.obterItemCardapio': {
    kind: 'qry';
    input: { id: string };
    output: { item: ItemCardapioEdicao };
    meta: { output: { item: { entity: 'ItemCardapio'; many: false } }; lists: {}; params: { id: { filters: 'item'; field: 'id' } } };
    rules: [];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
  /**
   * Finalidade: Cadastra um item com nome e preço vigente para uso operacional no cardápio.
   * Entrada: name é o nome pelo qual a equipe localiza o item; precoVigente é o preço atualmente cobrado.
   * Processamento: Cria ItemCardapio com nome e preço vigente informados e retorna os dados persistidos, inclusive identificador e versão gerados. Não registra ItemComanda nem aplica regras de preço de lançamento, subtotal, total ou valor de item.
   * Saída: Retorna o item criado para o formulário mostrar o estado persistido sem uma consulta adicional.
   */
  'comandaRestaurante.cardapio.cadastrarItemCardapio': {
    kind: 'cmd';
    writes: 'ItemCardapio.create';
    input: { name: string; precoVigente: string };
    output: { item: ItemCardapioEdicao };
    meta: { output: { item: { entity: 'ItemCardapio'; many: false } }; lists: {}; params: {} };
    rules: [];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
  /**
   * Finalidade: Atualiza o nome e o preço vigente do item selecionado, mantendo o catálogo usado pela operação.
   * Entrada: id e version identificam a versão a alterar; name e precoVigente contêm os valores informados no formulário.
   * Processamento: Atualiza o ItemCardapio identificado por id, exigindo a version recebida para recusar sobrescrita concorrente, e compõe a versão persistida. Não altera itens de comanda já lançados nem executa regras de preço de lançamento, subtotal, total ou valor de ItemComanda.
   * Saída: Retorna o registro atualizado com a nova versão para redesenhar imediatamente o formulário.
   */
  'comandaRestaurante.cardapio.atualizarItemCardapio': {
    kind: 'cmd';
    writes: 'ItemCardapio.update';
    input: { id: string; version: number; name: string; precoVigente: string };
    output: { item: ItemCardapioEdicao };
    meta: { output: { item: { entity: 'ItemCardapio'; many: false } }; lists: {}; params: {} };
    rules: [];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
}

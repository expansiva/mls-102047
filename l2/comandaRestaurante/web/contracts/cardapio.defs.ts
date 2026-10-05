/// <mls fileReference="_102047_/l2/comandaRestaurante/web/contracts/cardapio.defs.ts" enhancement="_blank"/>

/** Dados de um item exibidos no catálogo do cardápio. */
export interface ItemCardapioResumo {
  id: string;
  name: string;
  precoVigente: string;
}

/** Dados autorizados para preencher e manter o item selecionado no formulário. */
export interface ItemCardapioEdicao {
  id: string;
  version: number;
  name: string;
  precoVigente: string;
}

/** Faixa ordenada do catálogo para leitura contínua, com indicação de mais resultados. */
export interface PaginaItensCardapio {
  itens: ItemCardapioResumo[];
  readonly hasMore: boolean;
}

export interface CardapioContracts {
  /**
   * Finalidade: Carrega a primeira faixa do catálogo ao abrir a página, para o caixa conferir e selecionar itens para manutenção.
   * Entrada: Não recebe parâmetros; inicia na primeira faixa do catálogo.
   * Processamento: Busca uma faixa limitada de ItemCardapio ordenada por nome e, como desempate estável, por identificador. Compõe identificador, nome e preço vigente e calcula hasMore pela existência de registros após a faixa retornada. Nenhuma regra de lançamento ou totalização de comanda é aplicável.
   * Saída: Retorna a página de itens no formato da lista, com a indicação de que há outra faixa disponível.
   */
  'comandaRestaurante.cardapio.carregarItensCardapio': {
    kind: 'qry';
    input: {};
    output: { pagina: PaginaItensCardapio };
    rules: [];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
  /**
   * Finalidade: Carrega a próxima faixa do catálogo sem transferir todos os itens cadastrados.
   * Entrada: id é o identificador do último item atualmente apresentado e atua como cursor da ordenação estável.
   * Processamento: Localiza a posição do cursor na ordenação por nome e identificador, busca a faixa posterior, projeta identificador, nome e preço vigente e calcula hasMore pela existência de registros adicionais. Nenhuma regra de lançamento ou totalização de comanda é aplicável.
   * Saída: Retorna somente a próxima página para ser anexada aos itens já mostrados.
   */
  'comandaRestaurante.cardapio.carregarMaisItensCardapio': {
    kind: 'qry';
    input: { id: string };
    output: { pagina: PaginaItensCardapio };
    rules: [];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
  /**
   * Finalidade: Obtém o item escolhido no catálogo para preencher o formulário de manutenção.
   * Entrada: id identifica o ItemCardapio selecionado pelo caixa.
   * Processamento: Consulta o item pelo identificador e compõe os campos autorizados para edição, incluindo a versão para controle de concorrência. Nenhuma regra de lançamento ou totalização de comanda é aplicável.
   * Saída: Retorna o item selecionado no formato necessário para o formulário exibir e alterar seus dados.
   */
  'comandaRestaurante.cardapio.obterItemCardapio': {
    kind: 'qry';
    input: { id: string };
    output: { item: ItemCardapioEdicao };
    rules: [];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
  /**
   * Finalidade: Cadastra um item com nome e preço vigente para uso operacional no cardápio.
   * Entrada: name é o nome pelo qual a equipe localiza o item; precoVigente é o preço atualmente cobrado.
   * Processamento: Cria ItemCardapio com nome e preço vigente informados e compõe os dados persistidos, incluindo identificador e versão gerados. Não cria ItemComanda nem registra preço de lançamento ou executa regras de subtotal, total ou valor de item.
   * Saída: Retorna o item criado para redesenhar o formulário com o estado persistido, sem consulta adicional.
   */
  'comandaRestaurante.cardapio.cadastrarItemCardapio': {
    kind: 'cmd';
    writes: 'ItemCardapio.create';
    input: { name: string; precoVigente: string };
    output: { item: ItemCardapioEdicao };
    rules: [];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
  /**
   * Finalidade: Atualiza o nome e o preço vigente do item selecionado, mantendo o catálogo usado pela operação.
   * Entrada: id e version identificam a versão a alterar; name e precoVigente contêm os valores informados no formulário.
   * Processamento: Atualiza o ItemCardapio identificado por id, exigindo a version recebida para recusar sobrescrita concorrente, e compõe os dados da versão persistida. Não altera itens de comanda já lançados nem aplica regras de preço de lançamento, subtotal, total ou valor de ItemComanda.
   * Saída: Retorna o registro atualizado, com a nova versão, para redesenhar imediatamente o formulário.
   */
  'comandaRestaurante.cardapio.atualizarItemCardapio': {
    kind: 'cmd';
    writes: 'ItemCardapio.update';
    input: { id: string; version: number; name: string; precoVigente: string };
    output: { item: ItemCardapioEdicao };
    rules: [];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
}

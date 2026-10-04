/// <mls fileReference="_102047_/l2/comandaRestaurante/web/contracts/cardapio.defs.ts" enhancement="_blank"/>

/** Dados de um item do cardápio necessários para exibi-lo na lista, selecioná-lo no formulário e aplicar uma atualização com controle de versão. */
export interface ItemCardapioRegistro {
  id: string;
  version: number;
  nome: string;
  precoVigente: number;
}

/** Página do catálogo de itens, pronta para a lista do cardápio e para a navegação paginada. */
export interface PaginaCardapio {
  itens: ItemCardapioRegistro[];
  readonly totalItens: number;
  pagina: number;
  tamanhoPagina: number;
}

export interface CardapioContracts {
  /**
   * Finalidade: Carrega a primeira página do cardápio vigente para o caixa conferir os itens e selecionar um deles para manutenção.
   * Entrada: tamanhoPagina é a quantidade máxima de itens exibidos na primeira tela; quando não for informado, o BFF aplica o tamanho padrão da página.
   * Processamento: Consulta todos os ItemCardapio visíveis ao caixa no escopo da organização, ordena por nome e, como desempate, por id, e devolve a primeira página. Calcula totalItens pela contagem dos mesmos itens da consulta, sem transferir uma lista adicional para a tela.
   * Saída: Retorna catalogo com os itens já no formato da lista, o total calculado e os metadados da primeira página. Cada item inclui id e version para que a seleção preencha o formulário e uma atualização possa usar controle de concorrência.
   */
  'comandaRestaurante.cardapio.carregarCatalogoCardapio': {
    kind: 'qry';
    input: { tamanhoPagina?: number };
    output: { catalogo: PaginaCardapio };
    meta: { output: {}; lists: {}; params: {} };
    rules: [];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
  /**
   * Finalidade: Busca sob demanda outra página da lista do cardápio quando o caixa navega pelo catálogo.
   * Entrada: pagina identifica a página solicitada pela navegação da lista e tamanhoPagina define quantos itens ela comporta.
   * Processamento: Consulta todos os ItemCardapio visíveis ao caixa no escopo da organização, ordena por nome e id, aplica a paginação solicitada e calcula totalItens com o mesmo conjunto não paginado.
   * Saída: Retorna catalogo substituindo a página atualmente mostrada, com itens prontos para seleção, total calculado e os metadados da paginação.
   */
  'comandaRestaurante.cardapio.consultarPaginaCardapio': {
    kind: 'qry';
    input: { pagina: number; tamanhoPagina: number };
    output: { catalogo: PaginaCardapio };
    meta: { output: {}; lists: {}; params: {} };
    rules: [];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
  /**
   * Finalidade: Cadastra um novo item no cardápio para que ele possa ser usado pela operação no lançamento de comandas.
   * Entrada: nome é o texto apresentado à equipe para localizar o item; precoVigente é o preço que será cobrado para os próximos lançamentos desse item.
   * Processamento: Cria ItemCardapio no escopo organizacional com nome e precoVigente informados. Não aplica regras de comanda, pois esta operação somente mantém o catálogo e não lança item em comanda.
   * Saída: Retorna item recém-criado com id, version, nome e precoVigente, permitindo à página redesenhar a lista e manter o registro selecionável sem nova consulta.
   */
  'comandaRestaurante.cardapio.cadastrarItemCardapio': {
    kind: 'cmd';
    writes: 'ItemCardapio.create';
    input: { nome: string; precoVigente: number };
    output: { item: ItemCardapioRegistro };
    meta: { output: { item: { entity: 'ItemCardapio'; many: false } }; lists: {}; params: {} };
    rules: [];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
  /**
   * Finalidade: Atualiza o nome e o preço vigente do item de cardápio selecionado pelo caixa.
   * Entrada: id identifica o ItemCardapio a alterar; version é a versão recebida na leitura e protege contra atualização concorrente; nome e precoVigente são os novos valores gravados no catálogo.
   * Processamento: Atualiza o ItemCardapio identificado por id somente se version corresponder à versão corrente, gravando nome e precoVigente. Recusa a alteração caso o registro não exista, não esteja no escopo visível do caixa ou tenha sido modificado desde a leitura. Não aplica regras de comanda, pois não há lançamento nem recálculo de comanda nesta operação.
   * Saída: Retorna item já persistido, com a nova version e os valores atuais, para a página substituir imediatamente o registro redesenhado na lista e no formulário.
   */
  'comandaRestaurante.cardapio.atualizarItemCardapio': {
    kind: 'cmd';
    writes: 'ItemCardapio.update';
    input: { id: string; version: number; nome: string; precoVigente: number };
    output: { item: ItemCardapioRegistro };
    meta: { output: { item: { entity: 'ItemCardapio'; many: false } }; lists: {}; params: {} };
    rules: [];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
}

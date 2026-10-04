/// <mls fileReference="_102047_/l2/comandaRestaurante/web/contracts/cardapio.defs.ts" enhancement="_blank"/>

export interface ItemCardapioLoad {
  id: string;
  readonly version: number;
  name: string;
  details: {
    precoVigente: string;
  };
}

export interface CardapioContracts {
  'comandaRestaurante.cardapio.load': {
    kind: 'qry';
    input: { page?: number; pageSize?: number };
    output: { cardapio: ItemCardapioLoad[]; pageListaItensCardapio: number; pageSizeListaItensCardapio: number; hasMoreListaItensCardapio: boolean };
    meta: { output: { cardapio: { entity: 'ItemCardapio'; many: true } }; lists: { listaItensCardapio: { key: 'cardapio'; page: 'pageListaItensCardapio'; pageSize: 'pageSizeListaItensCardapio'; hasMore: 'hasMoreListaItensCardapio' } }; params: { page: { pages: 'listaItensCardapio' }; pageSize: { pages: 'listaItensCardapio' } } };
    rules: [];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
  'comandaRestaurante.cardapio.loadCardapio': {
    kind: 'qry';
    input: { page?: number; pageSize?: number };
    output: { cardapio: ItemCardapioLoad[]; pageListaItensCardapio: number; pageSizeListaItensCardapio: number; hasMoreListaItensCardapio: boolean };
    meta: { output: { cardapio: { entity: 'ItemCardapio'; many: true } }; lists: { listaItensCardapio: { key: 'cardapio'; page: 'pageListaItensCardapio'; pageSize: 'pageSizeListaItensCardapio'; hasMore: 'hasMoreListaItensCardapio' } }; params: { page: { pages: 'listaItensCardapio' }; pageSize: { pages: 'listaItensCardapio' } } };
    rules: [];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
  'comandaRestaurante.cardapio.cadastrarItemCardapio': {
    kind: 'cmd';
    writes: 'ItemCardapio.create';
    input: { name: string; details: { precoVigente: string } };
    output: { itemCardapio: ItemCardapioLoad };
    meta: { output: { itemCardapio: { entity: 'ItemCardapio'; many: false } }; lists: {}; params: {} };
    rules: [];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
  'comandaRestaurante.cardapio.atualizarItemCardapio': {
    kind: 'cmd';
    writes: 'ItemCardapio.update';
    input: { name: string; details: { precoVigente: string }; id: string; version: number };
    output: { itemCardapio: ItemCardapioLoad };
    meta: { output: { itemCardapio: { entity: 'ItemCardapio'; many: false } }; lists: {}; params: {} };
    rules: [];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
}

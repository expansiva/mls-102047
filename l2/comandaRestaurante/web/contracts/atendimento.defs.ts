/// <mls fileReference="_102047_/l2/comandaRestaurante/web/contracts/atendimento.defs.ts" enhancement="_blank"/>

export interface MesaLoad {
  id: string;
  code: string;
  details: {
    readonly disponivel: boolean;
  };
}

export interface ComandaLoad {
  id: string;
  number: number;
  mesaId: string;
  status: 'open' | 'closed';
}

export interface ItemCardapioLoad {
  id: string;
  name: string;
  details: {
    precoVigente: string;
  };
}

export interface ComandaLoadComanda {
  id: string;
  number: number;
  mesaId: string;
  status: 'open' | 'closed';
  details: {
    readonly subtotal: string;
  };
}

export interface MesaLoadComanda {
  id: string;
  code: string;
}

export interface ItemComandaLoadComanda {
  id: string;
  readonly version: number;
  comandaId: string;
  itemCardapioId: string;
  status: 'launched' | 'canceled';
  details: {
    quantidade: number;
    observacao: string;
    precoUnitario: string;
    readonly valorTotal: string;
  };
}

export interface ItemCardapioLoadComanda {
  id: string;
  name: string;
}

export interface ComandaAbrirComanda {
  id: string;
}

export interface ItemComandaLancarItem {
  id: string;
  readonly version: number;
  itemCardapioId: string;
  details: {
    quantidade: number;
    observacao: string;
  };
}

export interface ItemComandaCancelarItem {
  id: string;
  readonly version: number;
}

export interface AtendimentoContracts {
  'comandaRestaurante.atendimento.load': {
    kind: 'qry';
    input: { page?: number; pageSize?: number };
    output: { atendimento: MesaLoad[]; fechamento: ComandaLoad[]; cardapio: ItemCardapioLoad[]; pageLookupAtendimento: number; pageSizeLookupAtendimento: number; hasMoreLookupAtendimento: boolean };
    meta: { output: { atendimento: { entity: 'Mesa'; many: true }; fechamento: { entity: 'Comanda'; many: true }; cardapio: { entity: 'ItemCardapio'; many: true } }; lists: { lookupAtendimento: { key: 'atendimento'; page: 'pageLookupAtendimento'; pageSize: 'pageSizeLookupAtendimento'; hasMore: 'hasMoreLookupAtendimento' } }; params: { page: { pages: 'lookupAtendimento' }; pageSize: { pages: 'lookupAtendimento' } } };
    rules: ['mesaDisponivelParaAbrirComanda'];
    access: { actors: ['garcom']; grants: ['garcomAtendimentoComandas']; scope: 'organization' };
  };
  'comandaRestaurante.atendimento.loadAtendimento': {
    kind: 'qry';
    input: { page?: number; pageSize?: number };
    output: { atendimento: MesaLoad[]; pageLookupAtendimento: number; pageSizeLookupAtendimento: number; hasMoreLookupAtendimento: boolean };
    meta: { output: { atendimento: { entity: 'Mesa'; many: true } }; lists: { lookupAtendimento: { key: 'atendimento'; page: 'pageLookupAtendimento'; pageSize: 'pageSizeLookupAtendimento'; hasMore: 'hasMoreLookupAtendimento' } }; params: { page: { pages: 'lookupAtendimento' }; pageSize: { pages: 'lookupAtendimento' } } };
    rules: ['mesaDisponivelParaAbrirComanda'];
    access: { actors: ['garcom']; grants: ['garcomAtendimentoComandas']; scope: 'organization' };
  };
  'comandaRestaurante.atendimento.loadComanda': {
    kind: 'qry';
    input: { id?: string };
    output: { comanda: ComandaLoadComanda };
    meta: { output: { comanda: { entity: 'Comanda'; many: false } }; lists: {}; params: { id: { filters: 'comanda'; field: 'id' } } };
    rules: ['itensSomenteEmComandaAberta', 'itemComandaOperacaoSomenteComandaAberta'];
    access: { actors: ['garcom']; grants: ['garcomAtendimentoComandas']; scope: 'organization' };
  };
  'comandaRestaurante.atendimento.abrirComanda': {
    kind: 'cmd';
    writes: 'Comanda.create';
    input: { mesaId: string };
    output: { comanda: ComandaAbrirComanda; itemComanda: ItemComandaLoadComanda; mesa: MesaLoad };
    meta: { output: { comanda: { entity: 'Comanda'; many: false }; itemComanda: { entity: 'ItemComanda'; many: false }; mesa: { entity: 'Mesa'; many: false } }; lists: {}; params: {} };
    rules: ['mesaDisponivelParaAbrirComanda', 'umaComandaAbertaPorMesa'];
    access: { actors: ['garcom']; grants: ['garcomAtendimentoComandas']; scope: 'organization' };
  };
  'comandaRestaurante.atendimento.lancarItem': {
    kind: 'cmd';
    writes: 'ItemComanda.create';
    input: { itemCardapioId: string; details: { quantidade: number; observacao: string }; comandaId: string };
    output: { itemComanda: ItemComandaLancarItem; comanda: ComandaLoad };
    meta: { output: { itemComanda: { entity: 'ItemComanda'; many: false }; comanda: { entity: 'Comanda'; many: false } }; lists: {}; params: {} };
    rules: ['itemComandaOperacaoSomenteComandaAberta'];
    access: { actors: ['garcom']; grants: ['garcomAtendimentoComandas']; scope: 'organization' };
  };
  'comandaRestaurante.atendimento.cancelarItem': {
    kind: 'cmd';
    writes: 'ItemComanda.cancelarItemComanda';
    input: { id: string; version: number };
    output: { itemComanda: ItemComandaCancelarItem; comanda: ComandaLoad };
    meta: { output: { itemComanda: { entity: 'ItemComanda'; many: false }; comanda: { entity: 'Comanda'; many: false } }; lists: {}; params: {} };
    rules: ['itemComandaOperacaoSomenteComandaAberta'];
    access: { actors: ['garcom']; grants: ['garcomAtendimentoComandas']; scope: 'organization' };
  };
}

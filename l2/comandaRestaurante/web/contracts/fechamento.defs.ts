/// <mls fileReference="_102047_/l2/comandaRestaurante/web/contracts/fechamento.defs.ts" enhancement="_blank"/>

export interface ComandaLoad {
  id: string;
  readonly version: number;
  number: number;
  status: 'open' | 'closed';
  mesaId: string;
  details: {
    readonly totalComanda: string;
    readonly subtotal: string;
    discountAmount: string;
    paymentMethod: 'cash' | 'debitCard' | 'creditCard' | 'pix';
  };
}

export interface MesaLoad {
  id: string;
  code: string;
  details: {
    readonly disponivel: boolean;
  };
}

export interface ComandaLoadComanda {
  id: string;
  readonly version: number;
  number: number;
  status: 'open' | 'closed';
  details: {
    readonly subtotal: string;
    readonly totalComanda: string;
  };
}

export interface ItemComandaLoadComanda {
  id: string;
  status: 'launched' | 'canceled';
  itemCardapioId: string;
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

export interface ComandaFecharComandaPaga {
  id: string;
  readonly version: number;
  details: {
    discountAmount: string;
    paymentMethod: 'cash' | 'debitCard' | 'creditCard' | 'pix';
  };
}

export interface FechamentoContracts {
  'comandaRestaurante.fechamento.load': {
    kind: 'qry';
    input: { mesaId?: string; page?: number; pageSize?: number };
    output: { fechamento: ComandaLoad[]; atendimento: MesaLoad[]; pageOpenComandaList: number; pageSizeOpenComandaList: number; hasMoreOpenComandaList: boolean };
    meta: { output: { fechamento: { entity: 'Comanda'; many: true }; atendimento: { entity: 'Mesa'; many: true } }; lists: { openComandaList: { key: 'fechamento'; page: 'pageOpenComandaList'; pageSize: 'pageSizeOpenComandaList'; hasMore: 'hasMoreOpenComandaList' } }; params: { mesaId: { filters: 'fechamento'; field: 'mesaId' }; page: { pages: 'openComandaList' }; pageSize: { pages: 'openComandaList' } } };
    rules: ['umaComandaAbertaPorMesa', 'descontoNaoExcedeSubtotal', 'fechamentoLiberaMesa'];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
  'comandaRestaurante.fechamento.loadFechamento': {
    kind: 'qry';
    input: { mesaId?: string; page?: number; pageSize?: number };
    output: { fechamento: ComandaLoad[]; pageOpenComandaList: number; pageSizeOpenComandaList: number; hasMoreOpenComandaList: boolean };
    meta: { output: { fechamento: { entity: 'Comanda'; many: true } }; lists: { openComandaList: { key: 'fechamento'; page: 'pageOpenComandaList'; pageSize: 'pageSizeOpenComandaList'; hasMore: 'hasMoreOpenComandaList' } }; params: { mesaId: { filters: 'fechamento'; field: 'mesaId' }; page: { pages: 'openComandaList' }; pageSize: { pages: 'openComandaList' } } };
    rules: ['umaComandaAbertaPorMesa', 'descontoNaoExcedeSubtotal'];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
  'comandaRestaurante.fechamento.loadComanda': {
    kind: 'qry';
    input: { id?: string };
    output: { comanda: ComandaLoadComanda };
    meta: { output: { comanda: { entity: 'Comanda'; many: false } }; lists: {}; params: { id: { filters: 'comanda'; field: 'id' } } };
    rules: ['itensSomenteEmComandaAberta', 'pagamentoObrigatorioNoFechamento', 'descontoNaoExcedeSubtotal'];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
  'comandaRestaurante.fechamento.fecharComandaPaga': {
    kind: 'cmd';
    writes: 'Comanda.fecharComanda';
    input: { details: { discountAmount: string; paymentMethod: 'cash' | 'debitCard' | 'creditCard' | 'pix' }; id: string; version: number };
    output: { comanda: ComandaFecharComandaPaga; itemComanda: ItemComandaLoadComanda; mesa: MesaLoad };
    meta: { output: { comanda: { entity: 'Comanda'; many: false }; itemComanda: { entity: 'ItemComanda'; many: false }; mesa: { entity: 'Mesa'; many: false } }; lists: {}; params: {} };
    rules: ['pagamentoObrigatorioNoFechamento', 'descontoNaoExcedeSubtotal', 'fechamentoLiberaMesa'];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
}

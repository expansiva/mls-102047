/// <mls fileReference="_102047_/l2/comandaRestaurante/web/contracts/mesas.defs.ts" enhancement="_blank"/>

export interface MesaLoad {
  id: string;
  readonly version: number;
  code: string;
  details: {
    readonly disponivel: boolean;
  };
}

export interface MesaCreateMesa {
  id: string;
  readonly version: number;
  code: string;
}

export interface MesasContracts {
  'comandaRestaurante.mesas.load': {
    kind: 'qry';
    input: { page?: number; pageSize?: number };
    output: { mesas: MesaLoad[]; pageMesasList: number; pageSizeMesasList: number; hasMoreMesasList: boolean };
    meta: { output: { mesas: { entity: 'Mesa'; many: true } }; lists: { mesasList: { key: 'mesas'; page: 'pageMesasList'; pageSize: 'pageSizeMesasList'; hasMore: 'hasMoreMesasList' } }; params: { page: { pages: 'mesasList' }; pageSize: { pages: 'mesasList' } } };
    rules: ['mesaDisponivelParaAbrirComanda'];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
  'comandaRestaurante.mesas.loadMesas': {
    kind: 'qry';
    input: { page?: number; pageSize?: number };
    output: { mesas: MesaLoad[]; pageMesasList: number; pageSizeMesasList: number; hasMoreMesasList: boolean };
    meta: { output: { mesas: { entity: 'Mesa'; many: true } }; lists: { mesasList: { key: 'mesas'; page: 'pageMesasList'; pageSize: 'pageSizeMesasList'; hasMore: 'hasMoreMesasList' } }; params: { page: { pages: 'mesasList' }; pageSize: { pages: 'mesasList' } } };
    rules: ['mesaDisponivelParaAbrirComanda'];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
  'comandaRestaurante.mesas.createMesa': {
    kind: 'cmd';
    writes: 'Mesa.create';
    input: { code: string };
    output: { mesa: MesaCreateMesa };
    meta: { output: { mesa: { entity: 'Mesa'; many: false } }; lists: {}; params: {} };
    rules: ['mesaDisponivelParaAbrirComanda'];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
  'comandaRestaurante.mesas.updateMesa': {
    kind: 'cmd';
    writes: 'Mesa.update';
    input: { code: string; id: string; version: number };
    output: { mesa: MesaCreateMesa };
    meta: { output: { mesa: { entity: 'Mesa'; many: false } }; lists: {}; params: {} };
    rules: ['mesaDisponivelParaAbrirComanda'];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
}

/// <mls fileReference="_102047_/l2/comandaRestaurante/web/contracts/inicio.defs.ts" enhancement="_blank"/>

export interface MesaLoad {
  id: string;
  details: {
    readonly disponivel: boolean;
  };
}

export interface ComandaLoad {
  id: string;
  details: {
    readonly subtotal: string;
  };
}

export interface ItemComandaLoad {
  id: string;
  details: {
    readonly valorTotal: string;
  };
}

export interface InicioContracts {
  'comandaRestaurante.inicio.load': {
    kind: 'qry';
    input: {};
    output: { atendimento: MesaLoad[]; fechamento: ComandaLoad[]; itemComanda: ItemComandaLoad[] };
    meta: { output: { atendimento: { entity: 'Mesa'; many: true }; fechamento: { entity: 'Comanda'; many: true }; itemComanda: { entity: 'ItemComanda'; many: true } }; lists: {}; params: {} };
    rules: ['mesaDisponivelParaAbrirComanda', 'umaComandaAbertaPorMesa', 'fechamentoLiberaMesa'];
    access: { actors: ['caixa', 'garcom']; grants: ['garcomAtendimentoComandas', 'caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
}

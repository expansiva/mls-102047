/// <mls fileReference="_102047_/l2/comandaRestaurante/web/contracts/inicio.defs.ts" enhancement="_blank"/>

/** Indicadores operacionais consolidados para a visão geral inicial do restaurante. */
export interface ResumoOperacionalInicio {
  readonly quantidadeMesasDisponiveis: number;
  readonly valorComandasAbertas: number;
}

export interface InicioContracts {
  /**
   * Finalidade: Carrega os indicadores consolidados da página inicial para que caixa e garçom acompanhem imediatamente a disponibilidade das mesas e o valor ainda em atendimento.
   * Entrada: Não recebe parâmetros: a visão geral considera a operação da organização à qual o ator autenticado tem acesso.
   * Processamento: Conta as mesas cujo indicador derivado Mesa.details.disponivel é verdadeiro. Soma o subtotal das comandas com Comanda.status igual a open para obter o valor em aberto; esse subtotal considera somente itens não cancelados e seus valores totais calculados. Aplica subtotalComandaCalculado para compor o subtotal por comanda e valorTotalItemComandaCalculado para considerar o valor de cada lançamento.
   * Saída: Retorna um único resumo já no formato dos destaques da página: a quantidade de mesas disponíveis e o valor total das comandas abertas. A página não recebe listas nem precisa recalcular indicadores.
   */
  'comandaRestaurante.inicio.carregarResumoOperacionalInicio': {
    kind: 'qry';
    input: {};
    output: { resumo: ResumoOperacionalInicio };
    meta: { output: {}; lists: {}; params: {} };
    rules: ['subtotalComandaCalculado', 'valorTotalItemComandaCalculado'];
    access: { actors: ['caixa', 'garcom']; grants: ['garcomAtendimentoComandas', 'caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
}

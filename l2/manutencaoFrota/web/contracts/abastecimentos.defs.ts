/// <mls fileReference="_102047_/l2/manutencaoFrota/web/contracts/abastecimentos.defs.ts" enhancement="_blank"/>

/** Dados numéricos do abastecimento, aninhados como em Abastecimento.details. */
export interface AbastecimentoDetalhes {
  details: {
    litros: number;
    valor: string;
    kmPainel: number;
  };
  readonly precoPorLitro: number;
}

/** Abastecimento completo, usado na lista e no detalhe ao lado (o detalhe é resolvido a partir do item já carregado). */
export interface AbastecimentoItem {
  id: string;
  data: string;
  veiculoId: string;
  motoristaId: string;
  details: AbastecimentoDetalhes;
}

export interface AbastecimentosContracts {
  /**
   * Finalidade: Carrega, já paginada, a lista de abastecimentos de toda a frota para o gestor consultar e comparar o preço por litro; cada item traz os dados completos para o detalhe ao lado sem nova chamada.
   * Entrada: veiculoId: filtra pelo veículo abastecido (opcional). motoristaId: filtra pelo motorista que registrou (opcional). dataInicio/dataFim: período inclusivo sobre a data do abastecimento (opcionais). page/pageSize: página solicitada e tamanho da página.
   * Processamento: Lista os abastecimentos da organização do gestor (escopo organization, sem restrição por motorista) aplicando os filtros informados de veículo, motorista e período, ordenados pela data mais recente primeiro. Para cada item calcula precoPorLitro = valor / litros (regra precoPorLitroCalculado); o valor é derivado no retorno, nunca gravado. Pagina por page/pageSize e informa hasMore.
   * Saída: { items, page, pageSize, hasMore } com id, data, veiculoId, motoristaId e details (litros, valor, kmPainel, precoPorLitro). A lista alimenta listaAbastecimentos e o item escolhido alimenta detalheAbastecimento.
   */
  'manutencaoFrota.abastecimentos.listarAbastecimentos': {
    kind: 'qry';
    input: { veiculoId?: string; motoristaId?: string; data?: string; page: number; pageSize: number };
    output: { abastecimentos: { items: AbastecimentoItem[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['precoPorLitroCalculado'];
    access: { actors: ['gestor']; grants: ['gestorFrota']; scope: 'organization' };
  };
}

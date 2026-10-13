/// <mls fileReference="_102047_/l2/manutencaoFrota/web/contracts/meus_abastecimentos.defs.ts" enhancement="_blank"/>

/** Valores do abastecimento (details): litros, valor, km no painel e preço por litro calculado. */
export interface AbastecimentoValores {
  details: {
    litros: number;
    valor: string;
    kmPainel: number;
  };
  readonly precoPorLitro: number;
}

/** Linha da lista de meus abastecimentos. */
export interface AbastecimentoItem {
  id: string;
  data: string;
  veiculoId: string;
  details: AbastecimentoValores;
}

/** Preço por litro de um abastecimento. */
export interface PrecoPorLitroValor {
  readonly precoPorLitro: number;
}

/** Ponto da série de preço por litro ao longo das datas. */
export interface PrecoPorLitroPonto {
  id: string;
  data: string;
  details: PrecoPorLitroValor;
}

/** Identificação do motorista visível ao próprio motorista. */
export interface MotoristaIdentificacao {
  details: {
    identification: {
      name: string;
    };
  };
}

/** Detalhes do motorista com a identificação. */
export interface MotoristaDetalhes {
  identification: MotoristaIdentificacao;
}

/** Motorista do abastecimento, apenas o nome. */
export interface MotoristaResumo {
  details: MotoristaDetalhes;
}

/** Abastecimento completo com o nome do motorista. */
export interface AbastecimentoDetalhe {
  id: string;
  data: string;
  veiculoId: string;
  motoristaId: string;
  details: AbastecimentoValores;
  motorista: MotoristaResumo;
}

export interface Meus_abastecimentosContracts {
  /**
   * Finalidade: Abre a página: identifica o motorista logado para o formulário de lançamento e entrega a série de preço por litro dos seus abastecimentos.
   * Entrada: Sem entrada; o motorista vem da sessão.
   * Processamento: Resolve o motorista da sessão. Busca os abastecimentos com motoristaId do motorista, somente de veículos atribuídos a ele (motoristaVeSomenteSeusAbastecimentos), ordenados por data crescente, limitados aos mais recentes (ex.: 12 meses). O preço por litro é calculado como valor / litros (precoPorLitroCalculado), nunca lido de campo gravado.
   * Saída: motoristaId para o formulário lancarAbastecimento e precosPorLitro (data e preço por litro) para o resumo de variação.
   */
  'manutencaoFrota.meus_abastecimentos.carregarMeusAbastecimentos': {
    kind: 'qry';
    input: {};
    output: { motoristaId: string; precosPorLitro: PrecoPorLitroPonto[] };
    rules: ['motoristaVeSomenteSeusAbastecimentos', 'precoPorLitroCalculado'];
    access: { actors: ['motorista']; grants: ['motoristaMeusAbastecimentos', 'motoristaProprioCadastro']; scope: 'own' };
  };
  /**
   * Finalidade: Lista, paginada, os abastecimentos do motorista logado, com filtro por período e veículo; roda ao abrir e novamente quando o motorista muda o filtro ou pede a próxima página.
   * Entrada: page e pageSize: página pedida; dataInicio e dataFim: período opcional sobre a data; veiculoId: veículo opcional entre os atribuídos.
   * Processamento: Filtra por motoristaId da sessão e somente veículos atribuídos a ele (motoristaVeSomenteSeusAbastecimentos), aplica período e veículo, ordena por data decrescente. Calcula precoPorLitro = valor / litros de cada item (precoPorLitroCalculado).
   * Saída: Página { items, page, pageSize, hasMore } com id, data, veículo, litros, valor, km no painel e preço por litro de cada abastecimento.
   */
  'manutencaoFrota.meus_abastecimentos.listarMeusAbastecimentos': {
    kind: 'qry';
    input: { dataInicio?: string; dataFim?: string; veiculoId?: string; page: number; pageSize: number };
    output: { abastecimentos: { items: AbastecimentoItem[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['motoristaVeSomenteSeusAbastecimentos', 'precoPorLitroCalculado'];
    access: { actors: ['motorista']; grants: ['motoristaMeusAbastecimentos', 'motoristaProprioCadastro']; scope: 'own' };
  };
  /**
   * Finalidade: Abre o abastecimento escolhido na lista para o motorista conferir os dados completos.
   * Entrada: abastecimentoId: id do abastecimento selecionado na lista.
   * Processamento: Lê o abastecimento pelo id e recusa se não for do motorista da sessão ou de veículo não atribuído (motoristaVeSomenteSeusAbastecimentos). Lê no cadastro mestre o nome do motorista. Calcula precoPorLitro = valor / litros (precoPorLitroCalculado).
   * Saída: O abastecimento com data, veículo, litros, valor, km no painel, preço por litro e nome do motorista.
   */
  'manutencaoFrota.meus_abastecimentos.obterAbastecimento': {
    kind: 'qry';
    input: { abastecimentoId: string };
    output: { abastecimento: AbastecimentoDetalhe };
    rules: ['motoristaVeSomenteSeusAbastecimentos', 'precoPorLitroCalculado'];
    access: { actors: ['motorista']; grants: ['motoristaMeusAbastecimentos', 'motoristaProprioCadastro']; scope: 'own' };
  };
  /**
   * Finalidade: Registra o abastecimento lançado pelo motorista e atualiza a quilometragem do veículo.
   * Entrada: motoristaId: motorista logado (conferido com a sessão); veiculoId: veículo abastecido; data: data do abastecimento; litros, valor e kmPainel: valores informados no posto.
   * Processamento: Numa só transação: recusa se motoristaId difere da sessão ou se o veículo não está atribuído ao motorista (abastecimentoSomenteVeiculoAtribuido); recusa litros ou valor <= 0 (litrosEValorPositivos); recusa kmPainel menor que a quilometragem atual do veículo (kmPainelNaoMenorQueAtual); grava o abastecimento e define a quilometragem atual do veículo como kmPainel (kmPainelAtualizaQuilometragemVeiculo). O preço por litro não é gravado: é calculado como valor / litros na resposta (precoPorLitroCalculado).
   * Saída: O abastecimento criado no formato da linha da lista, para inserir no histórico sem nova consulta; o formulário é limpo.
   */
  'manutencaoFrota.meus_abastecimentos.registrarAbastecimento': {
    kind: 'cmd';
    writes: 'Abastecimento.create';
    input: { motoristaId: string; veiculoId: string; data: string; details: { litros: number; valor: string; kmPainel: number } };
    output: { abastecimento: AbastecimentoItem };
    rules: ['abastecimentoSomenteVeiculoAtribuido', 'litrosEValorPositivos', 'kmPainelNaoMenorQueAtual', 'kmPainelAtualizaQuilometragemVeiculo', 'precoPorLitroCalculado'];
    access: { actors: ['motorista']; grants: ['motoristaMeusAbastecimentos', 'motoristaProprioCadastro']; scope: 'own' };
  };
}

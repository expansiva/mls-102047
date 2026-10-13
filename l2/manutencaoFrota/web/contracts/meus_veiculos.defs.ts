/// <mls fileReference="_102047_/l2/manutencaoFrota/web/contracts/meus_veiculos.defs.ts" enhancement="_blank"/>

/** Detalhes do veículo que o motorista confere. */
export interface VeiculoDetalhes {
  details: {
    ano: number;
    quilometragemAtual: number;
  };
}

/** Km no painel e preço por litro do último abastecimento. */
export interface AbastecimentoDetalhes {
  details: {
    kmPainel: number;
    readonly precoPorLitro: string;
  };
}

/** Último abastecimento registrado pelo motorista para o veículo. */
export interface UltimoAbastecimento {
  id: string;
  veiculoId: string;
  data: string;
  details: AbastecimentoDetalhes;
}

/** Veículo atribuído ao motorista, com os dados da ficha e o último abastecimento como referência de km. */
export interface MeuVeiculo {
  id: string;
  placa: string;
  modelo: string;
  motoristaId: string;
  details: VeiculoDetalhes;
  abastecimento?: UltimoAbastecimento;
}

/** Nome e situação do motorista logado. */
export interface MotoristaIdentificacao {
  details: {
    identification: {
      name: string;
      readonly status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
    };
  };
}

/** Detalhes do cadastro mestre do motorista. */
export interface MotoristaDetalhes {
  identification: MotoristaIdentificacao;
}

/** Motorista logado, dono dos veículos e dos abastecimentos da página. */
export interface MotoristaAtual {
  details: MotoristaDetalhes;
}

export interface Meus_veiculosContracts {
  /**
   * Finalidade: Carrega de uma vez tudo o que a página Meus veículos mostra ao abrir: o motorista logado e os veículos atribuídos a ele, cada um com seus dados de ficha e o último abastecimento registrado.
   * Entrada: Sem entrada: o motorista vem da sessão.
   * Processamento: Identifica o motorista da sessão e lê nome e situação no cadastro mestre. Lista os veículos por Veiculo.motoristaId igual ao motorista (motoristaVeSomenteVeiculosAtribuidos), sem paginação, pois um motorista tem poucos veículos. Para todos os veículos de uma vez, busca o abastecimento mais recente por data registrado pelo próprio motorista (motoristaVeSomenteSeusAbastecimentos). O preço por litro é campo derivado, calculado como valor dividido por litros (precoPorLitroCalculado), nunca gravado.
   * Saída: motorista com nome e situação (para a ficha e para avisar se inativo não pode lançar) e a lista de veículos com placa, modelo, ano, quilometragem atual e último abastecimento (data, km no painel, preço por litro); serve a lista, a ficha (seleção na própria lista), o formulário e o resumo.
   */
  'manutencaoFrota.meus_veiculos.carregarMeusVeiculos': {
    kind: 'qry';
    input: {};
    output: { motorista: MotoristaAtual; veiculos: MeuVeiculo[] };
    rules: ['motoristaVeSomenteVeiculosAtribuidos', 'motoristaVeSomenteSeusAbastecimentos', 'precoPorLitroCalculado'];
    access: { actors: ['motorista']; grants: ['motoristaVeiculosAtribuidos', 'motoristaMeusAbastecimentos', 'motoristaProprioCadastro']; scope: 'assigned' };
  };
  /**
   * Finalidade: Registra o abastecimento do veículo escolhido e atualiza a quilometragem atual dele numa só operação.
   * Entrada: veiculoId: veículo abastecido, escolhido na lista; motoristaId: motorista logado que registra o abastecimento (a página envia o da sessão e o servidor confere que é o mesmo); data: data do abastecimento; litros: quantidade abastecida; valor: valor total pago; kmPainel: quilometragem marcada no painel.
   * Processamento: Recusa se motoristaId diferir do motorista da sessão, se ele estiver inativo ou se o veículo não estiver atribuído a ele (abastecimentoSomenteVeiculoAtribuido). Recusa litros ou valor menores ou iguais a zero (litrosEValorPositivos). Recusa kmPainel menor que a quilometragem atual do veículo (kmPainelNaoMenorQueAtual, quilometragemNaoRegride). Em transação tudo ou nada, cria o Abastecimento e grava kmPainel como nova quilometragem atual do veículo (kmPainelAtualizaQuilometragemVeiculo). O preço por litro é derivado, calculado como valor/litros na leitura (precoPorLitroCalculado), não gravado.
   * Saída: O veículo atualizado, com a nova quilometragem atual e o abastecimento recém-lançado como último, para a página redesenhar lista, ficha, formulário e resumo sem nova chamada.
   */
  'manutencaoFrota.meus_veiculos.lancarAbastecimento': {
    kind: 'cmd';
    writes: 'Abastecimento.create';
    input: { veiculoId: string; motoristaId: string; data: string; details: { litros: number; valor: string; kmPainel: number } };
    output: { veiculo: MeuVeiculo };
    rules: ['abastecimentoSomenteVeiculoAtribuido', 'litrosEValorPositivos', 'kmPainelNaoMenorQueAtual', 'kmPainelAtualizaQuilometragemVeiculo', 'quilometragemNaoRegride', 'precoPorLitroCalculado'];
    access: { actors: ['motorista']; grants: ['motoristaVeiculosAtribuidos', 'motoristaMeusAbastecimentos', 'motoristaProprioCadastro']; scope: 'assigned' };
  };
}

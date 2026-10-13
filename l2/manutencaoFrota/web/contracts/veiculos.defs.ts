/// <mls fileReference="_102047_/l2/manutencaoFrota/web/contracts/veiculos.defs.ts" enhancement="_blank"/>

/** Identificação do motorista no cadastro mestre. */
export interface MotoristaIdentificacao {
  details: {
    identification: {
      name: string;
    };
  };
}

export interface MotoristaDetalhes {
  identification: MotoristaIdentificacao;
}

/** Motorista com id e nome, para exibir e escolher na atribuição. */
export interface MotoristaResumo {
  id: string;
  details: MotoristaDetalhes;
}

export interface OficinaIdentificacao {
  details: {
    identification: {
      name: string;
    };
  };
}

export interface OficinaDetalhes {
  identification: OficinaIdentificacao;
}

/** Oficina com id e nome, para exibir na ordem e escolher na abertura. */
export interface OficinaResumo {
  id: string;
  details: OficinaDetalhes;
}

/** Dados do veículo com a situação da preventiva já calculada. */
export interface VeiculoDetalhes {
  details: {
    ano: number;
    quilometragemAtual: number;
    readonly kmProximaPreventiva?: number;
    readonly preventivaVencida: boolean;
  };
}

/** Linha da lista da frota. */
export interface VeiculoFrotaItem {
  id: string;
  version: number;
  placa: string;
  modelo: string;
  motoristaId?: string;
  motorista?: MotoristaResumo;
  details: VeiculoDetalhes;
}

export interface PlanoVeiculoDetalhes {
  details: {
    intervaloKm?: number;
    intervaloMeses?: number;
    readonly kmPrevisto?: number;
    readonly dataPrevista?: string;
    readonly vencidoPorKm: boolean;
    readonly vencidoPorTempo: boolean;
    readonly temOrdemAberta: boolean;
  };
}

/** Plano de preventiva do veículo com o próximo vencimento. */
export interface PlanoVeiculo {
  id: string;
  descricao: string;
  details: PlanoVeiculoDetalhes;
}

export interface OrdemVeiculoDetalhes {
  details: {
    readonly diasNaOficina: number;
  };
}

/** Ordem de manutenção do veículo com oficina, situação e dias na oficina. */
export interface OrdemVeiculo {
  id: string;
  readonly numero: string;
  tipo: 'preventive' | 'corrective';
  status: 'open' | 'completed';
  dataEntrada: string;
  dataSaida?: string;
  oficinaId: string;
  oficina: OficinaResumo;
  details: OrdemVeiculoDetalhes;
}

/** Ficha completa do veículo com motorista, planos e ordens. */
export interface VeiculoFicha {
  id: string;
  version: number;
  placa: string;
  modelo: string;
  motoristaId?: string;
  motorista?: MotoristaResumo;
  details: VeiculoDetalhes;
  planos: PlanoVeiculo[];
  ordens: OrdemVeiculo[];
}

export interface VeiculosContracts {
  /**
   * Finalidade: Carrega a lista paginada da frota com a situação da preventiva de cada veículo, para o gestor localizar um veículo pela placa e ver os vencidos.
   * Entrada: page e pageSize: página da lista; busca: parte da placa ou do modelo; somenteVencidas: quando verdadeiro, traz só veículos com preventiva vencida por km.
   * Processamento: Lista os veículos da organização filtrando pela busca (placa ou modelo) e, se pedido, por preventivaVencida, ordenados pela placa. Lê o nome do motorista atribuído no cadastro mestre. kmProximaPreventiva é calculado como o menor kmPrevisto dos planos por km do veículo (planoVencimentoCalculado) e preventivaVencida indica que a quilometragem atual passou do kmPrevisto de algum plano (avisoPreventivaVencidaKm); ambos são computados, nunca gravados.
   * Saída: Página { items, page, pageSize, hasMore } de veículos com placa, modelo, motorista, km atual, km da próxima preventiva e aviso de vencida.
   */
  'manutencaoFrota.veiculos.veiculosFrota': {
    kind: 'qry';
    input: { busca?: string; somenteVencidas?: boolean; page: number; pageSize: number };
    output: { veiculos: { items: VeiculoFrotaItem[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['avisoPreventivaVencidaKm', 'planoVencimentoCalculado'];
    access: { actors: ['gestor']; grants: ['gestorFrota', 'gestorCadastrosMestres']; scope: 'organization' };
  };
  /**
   * Finalidade: Abre a ficha do veículo escolhido na lista, com seus planos de preventiva e ordens de manutenção, numa só chamada.
   * Entrada: veiculoId: id do veículo selecionado na lista da frota.
   * Processamento: Lê o veículo pelo id, o nome do motorista atribuído no cadastro mestre, os planos do veículo (listByForeignKey) ordenados pela descrição e as ordens do veículo ordenadas pela data de entrada mais recente, com o nome da oficina. kmPrevisto e dataPrevista seguem planoVencimentoCalculado; vencidoPorKm e preventivaVencida seguem avisoPreventivaVencidaKm; vencidoPorTempo compara a data prevista com hoje; temOrdemAberta e diasNaOficina são calculados (dias até hoje se a ordem está aberta). Nada disso é gravado.
   * Saída: A ficha do veículo com dados, motorista, planos com próximo vencimento e ordens com oficina, situação e dias na oficina; também é a base das ações sobre o veículo.
   */
  'manutencaoFrota.veiculos.veiculoFicha': {
    kind: 'qry';
    input: { veiculoId: string };
    output: { veiculo: VeiculoFicha };
    rules: ['planoVencimentoCalculado', 'avisoPreventivaVencidaKm'];
    access: { actors: ['gestor']; grants: ['gestorFrota', 'gestorCadastrosMestres']; scope: 'organization' };
  };
  /**
   * Finalidade: Localiza motoristas pelo nome digitado para o gestor escolher quem vai dirigir o veículo.
   * Entrada: texto: parte do nome do motorista.
   * Processamento: Busca motoristas ativos da organização pelo nome (locate.byName), limitada aos primeiros resultados, ordenados pelo nome.
   * Saída: Lista curta de motoristas com id e nome para a escolha na atribuição.
   */
  'manutencaoFrota.veiculos.buscarMotoristas': {
    kind: 'qry';
    input: { texto: string };
    output: { motoristas: MotoristaResumo[] };
    rules: [];
    access: { actors: ['gestor']; grants: ['gestorFrota', 'gestorCadastrosMestres']; scope: 'organization' };
  };
  /**
   * Finalidade: Localiza oficinas pelo nome para o gestor escolher onde a ordem por defeito será executada.
   * Entrada: texto: parte do nome da oficina.
   * Processamento: Busca oficinas pelo nome (locate.byName), limitada aos primeiros resultados; exclui oficinas inativas, que não podem receber novas ordens (oficinaInativaSemNovasOrdens).
   * Saída: Lista curta de oficinas ativas com id e nome.
   */
  'manutencaoFrota.veiculos.buscarOficinas': {
    kind: 'qry';
    input: { texto: string };
    output: { oficinas: OficinaResumo[] };
    rules: ['oficinaInativaSemNovasOrdens'];
    access: { actors: ['gestor']; grants: ['gestorFrota', 'gestorCadastrosMestres']; scope: 'organization' };
  };
  /**
   * Finalidade: Cadastra um novo veículo na frota.
   * Entrada: placa, modelo, ano e quilometragemAtual informados no formulário.
   * Processamento: Normaliza a placa e recusa se já existir veículo com a mesma placa (placaUnica). Cria o veículo sem motorista; preventivaVencida e kmProximaPreventiva são calculados (sem planos, não vencido).
   * Saída: A linha do veículo para inserir na lista da frota e a ficha do veículo, já aberta para o próximo passo (atribuir motorista).
   */
  'manutencaoFrota.veiculos.cadastrarVeiculo': {
    kind: 'cmd';
    writes: 'Veiculo.create';
    input: { placa: string; modelo: string; details: { ano: number; quilometragemAtual: number } };
    output: { item: VeiculoFrotaItem; veiculo: VeiculoFicha };
    rules: ['placaUnica'];
    access: { actors: ['gestor']; grants: ['gestorFrota', 'gestorCadastrosMestres']; scope: 'organization' };
  };
  /**
   * Finalidade: Atribui ou troca o motorista que dirige o veículo selecionado.
   * Entrada: veiculoId e version: veículo e versão lida (concorrência otimista); motoristaId: motorista escolhido.
   * Processamento: Confere a versão, valida que o motorista existe e está ativo e grava o motoristaId no veículo. A partir daí o motorista passa a ver o veículo (motoristaVeSomenteVeiculosAtribuidos).
   * Saída: A linha atualizada para a lista da frota e a ficha atualizada com o nome do motorista.
   */
  'manutencaoFrota.veiculos.atribuirMotorista': {
    kind: 'cmd';
    writes: 'Veiculo.update';
    input: { id: string; version: number; motoristaId: string };
    output: { item: VeiculoFrotaItem; veiculo: VeiculoFicha };
    rules: ['motoristaVeSomenteVeiculosAtribuidos'];
    access: { actors: ['gestor']; grants: ['gestorFrota', 'gestorCadastrosMestres']; scope: 'organization' };
  };
  /**
   * Finalidade: Cadastra um plano de preventiva para o veículo selecionado, a cada N km ou N meses.
   * Entrada: veiculoId: veículo aberto na ficha; descricao, intervaloKm, intervaloMeses, kmReferencia (sugerido com o km atual), dataReferencia (sugerida com hoje) e observacoes.
   * Processamento: Recusa se não houver intervalo em km nem em meses, ou se algum informado não for maior que zero (planoIntervaloObrigatorio). Cria o plano; kmPrevisto e dataPrevista são calculados a partir da referência e do intervalo (planoVencimentoCalculado) e a preventiva vencida do veículo é recalculada (avisoPreventivaVencidaKm), sem gravar campos derivados.
   * Saída: A ficha atualizada com o novo plano e seu próximo vencimento, e a linha da frota com km da próxima preventiva e aviso recalculados.
   */
  'manutencaoFrota.veiculos.cadastrarPlano': {
    kind: 'cmd';
    writes: 'PlanoManutencao.create';
    input: { veiculoId: string; descricao: string; details: { intervaloKm?: number; intervaloMeses?: number; kmReferencia: number; dataReferencia: string; observacoes?: string } };
    output: { item: VeiculoFrotaItem; veiculo: VeiculoFicha };
    rules: ['planoIntervaloObrigatorio', 'planoVencimentoCalculado', 'avisoPreventivaVencidaKm'];
    access: { actors: ['gestor']; grants: ['gestorFrota', 'gestorCadastrosMestres']; scope: 'organization' };
  };
  /**
   * Finalidade: Abre uma ordem de manutenção corretiva por defeito para o veículo selecionado.
   * Entrada: veiculoId: veículo aberto na ficha; planoId: plano de manutenção, que numa ordem corretiva deve ficar vazio (a página não o envia); oficinaId: oficina escolhida; descricao: defeito apresentado; dataEntrada: entrada na oficina; kmEntrada: km do veículo na entrada (sugerido com o km atual).
   * Processamento: Recusa se a oficina estiver inativa (oficinaInativaSemNovasOrdens) e recusa se planoId vier preenchido, pois a ordem corretiva não pode estar vinculada a plano (ordemCorretivaSemPlano). Cria a ordem com tipo corrective, status open e planoId vazio, emitindo o número pela sequência do módulo, único (numeroOrdemUnico). diasNaOficina é calculado, não gravado.
   * Saída: A ficha do veículo atualizada com a nova ordem aberta, sua oficina, descrição e data de entrada.
   */
  'manutencaoFrota.veiculos.abrirOrdemDefeito': {
    kind: 'cmd';
    writes: 'OrdemManutencao.create';
    input: { veiculoId: string; planoId?: string; oficinaId: string; details: { descricao: string; kmEntrada?: number }; dataEntrada: string };
    output: { veiculo: VeiculoFicha };
    rules: ['ordemCorretivaSemPlano', 'oficinaInativaSemNovasOrdens', 'numeroOrdemUnico'];
    access: { actors: ['gestor']; grants: ['gestorFrota', 'gestorCadastrosMestres']; scope: 'organization' };
  };
}

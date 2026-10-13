/// <mls fileReference="_102047_/l2/manutencaoFrota/web/contracts/planos_manutencao.defs.ts" enhancement="_blank"/>

/** Placa e modelo do veículo do plano, para identificar o plano na lista. */
export interface VeiculoResumo {
  placa: string;
  modelo: string;
}

/** Vencimento calculado do plano mostrado em cada item da lista. */
export interface PlanoItemDetalhes {
  details: {
    readonly kmPrevisto?: number;
    readonly dataPrevista?: string;
    readonly vencidoPorKm: boolean;
    readonly vencidoPorTempo: boolean;
    readonly kmExcedido: number;
    readonly temOrdemAberta: boolean;
  };
}

/** Um plano de preventiva na lista, com o veículo e a situação de vencimento. */
export interface PlanoItem {
  id: string;
  descricao: string;
  veiculoId: string;
  veiculo: VeiculoResumo;
  details: PlanoItemDetalhes;
}

/** Quilometragem atual do veículo. */
export interface VeiculoKmDetalhes {
  details: {
    quilometragemAtual: number;
  };
}

/** Veículo do plano selecionado, com placa e quilometragem atual. */
export interface VeiculoKm {
  placa: string;
  details: VeiculoKmDetalhes;
}

/** Intervalo, última preventiva, próxima prevista e situação de vencimento do plano. */
export interface PlanoDetalheDetalhes {
  details: {
    intervaloKm?: number;
    intervaloMeses?: number;
    readonly kmUltimaPreventiva: number;
    readonly dataUltimaPreventiva: string;
    readonly kmPrevisto?: number;
    readonly dataPrevista?: string;
    readonly kmExcedido: number;
    readonly vencidoPorKm: boolean;
    readonly vencidoPorTempo: boolean;
    readonly temOrdemAberta: boolean;
    observacoes?: string;
  };
}

/** Dias que o veículo está na oficina pela ordem aberta. */
export interface OrdemAbertaDetalhes {
  details: {
    readonly diasNaOficina: number;
  };
}

/** A ordem de manutenção aberta do plano, quando existe. */
export interface OrdemAbertaResumo {
  id: string;
  readonly numero: string;
  status: 'open' | 'completed';
  details: OrdemAbertaDetalhes;
}

/** O plano selecionado com veículo, vencimento calculado e ordem aberta. */
export interface PlanoDetalhe {
  id: string;
  version: number;
  descricao: string;
  veiculoId: string;
  veiculo: VeiculoKm;
  details: PlanoDetalheDetalhes;
  ordemManutencao?: OrdemAbertaResumo;
}

/** Veículo encontrado na busca do formulário de plano. */
export interface VeiculoOpcao {
  id: string;
  placa: string;
  modelo: string;
  details: VeiculoKmDetalhes;
}

/** Nome e situação da oficina no cadastro mestre. */
export interface OficinaIdentificacao {
  details: {
    identification: {
      name: string;
      readonly status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
    };
  };
}

/** Bloco de identificação da oficina. */
export interface OficinaDetalhes {
  identification: OficinaIdentificacao;
}

/** Oficina que pode receber a ordem preventiva. */
export interface OficinaOpcao {
  id: string;
  details: OficinaDetalhes;
}

export interface Planos_manutencaoContracts {
  /**
   * Finalidade: Carrega a lista paginada dos planos de preventiva da organização, já com o veículo e a situação de vencimento, filtrável pelos vencidos por km ou por tempo.
   * Entrada: situacao: ’todos’ (padrão), ’vencidos’ (por km ou tempo), ’vencidoPorKm’ ou ’vencidoPorTempo’; busca: texto na descrição do plano ou placa; veiculoId: restringe aos planos de um veículo (ao conferir os planos existentes antes de criar um novo); page e pageSize: paginação.
   * Processamento: Lista PlanoManutencao com o Veiculo de cada plano (listByForeignKey em lote, sem N+1). Os derivados kmPrevisto, dataPrevista, vencidoPorKm, vencidoPorTempo, kmExcedido e temOrdemAberta são calculados no servidor conforme planoVencimentoCalculado (última preventiva concluída ou referência + intervalo) e avisoPreventivaVencidaKm (quilometragem atual > km previsto); temOrdemAberta verifica ordem do plano com status open. Nada é gravado. Ordena vencidos primeiro, por kmExcedido decrescente, depois pela descrição.
   * Saída: planos: página { items, page, pageSize, hasMore } de PlanoItem, pronta para a lista destacar os vencidos e onde agir primeiro.
   */
  'manutencaoFrota.planos_manutencao.qryPlanosLista': {
    kind: 'qry';
    input: { situacao?: 'todos' | 'vencidos' | 'vencidoPorKm' | 'vencidoPorTempo'; busca?: string; veiculoId?: string; page: number; pageSize: number };
    output: { planos: { items: PlanoItem[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['planoVencimentoCalculado', 'avisoPreventivaVencidaKm'];
    access: { actors: ['gestor']; grants: ['gestorFrota', 'gestorCadastrosMestres']; scope: 'organization' };
  };
  /**
   * Finalidade: Abre o plano escolhido na lista ou vindo do aviso de preventiva vencida, com o veículo, o vencimento e a ordem aberta.
   * Entrada: planoId: id do plano selecionado na lista ou recebido pela URL do aviso.
   * Processamento: Lê o PlanoManutencao por id, o Veiculo (placa e quilometragem atual) e a ordem do plano com status open, se houver (planoUmaOrdemAberta garante no máximo uma). Calcula kmUltimaPreventiva, dataUltimaPreventiva, kmPrevisto, dataPrevista, kmExcedido, vencidoPorKm, vencidoPorTempo e temOrdemAberta conforme planoVencimentoCalculado e avisoPreventivaVencidaKm; diasNaOficina da ordem é contado até hoje. Nada é gravado.
   * Saída: plano: PlanoDetalhe com veículo e ordemManutencao opcional, para a ficha e para habilitar a ação de abrir ordem.
   */
  'manutencaoFrota.planos_manutencao.qryPlanoDetalhe': {
    kind: 'qry';
    input: { planoId: string };
    output: { plano: PlanoDetalhe };
    rules: ['planoVencimentoCalculado', 'avisoPreventivaVencidaKm', 'planoUmaOrdemAberta'];
    access: { actors: ['gestor']; grants: ['gestorFrota', 'gestorCadastrosMestres']; scope: 'organization' };
  };
  /**
   * Finalidade: Localiza o veículo pela placa ou modelo para definir o plano de preventiva.
   * Entrada: busca: parte da placa ou do modelo digitada pelo gestor.
   * Processamento: Veiculo locate.byText em placa e modelo, escopo da organização, limitado a 20 resultados ordenados pela placa.
   * Saída: veiculos: opções com id, placa, modelo e quilometragem atual, para escolher o veículo e sugerir o km de referência.
   */
  'manutencaoFrota.planos_manutencao.qryVeiculosBusca': {
    kind: 'qry';
    input: { busca: string };
    output: { veiculos: VeiculoOpcao[] };
    rules: [];
    access: { actors: ['gestor']; grants: ['gestorFrota', 'gestorCadastrosMestres']; scope: 'organization' };
  };
  /**
   * Finalidade: Lista as oficinas que podem receber a ordem preventiva.
   * Entrada: busca: parte do nome da oficina (opcional).
   * Processamento: Oficina locate.byName no cadastro mestre; conforme oficinaInativaSemNovasOrdens retorna só oficinas com status Active, limitado a 20, ordenadas pelo nome.
   * Saída: oficinas: id, nome e situação para o seletor de oficina da ação de abrir ordem.
   */
  'manutencaoFrota.planos_manutencao.qryOficinas': {
    kind: 'qry';
    input: { busca?: string };
    output: { oficinas: OficinaOpcao[] };
    rules: ['oficinaInativaSemNovasOrdens'];
    access: { actors: ['gestor']; grants: ['gestorFrota', 'gestorCadastrosMestres']; scope: 'organization' };
  };
  /**
   * Finalidade: Cria o plano de preventiva do veículo.
   * Entrada: veiculoId: veículo escolhido; descricao: o que a preventiva faz; intervaloKm e/ou intervaloMeses: periodicidade; kmReferencia e dataReferencia: início da contagem; observacoes: orientações opcionais.
   * Processamento: Recusa quando nenhum intervalo é informado ou algum informado não é maior que zero (planoIntervaloObrigatorio). Grava o PlanoManutencao.create. Os derivados não são gravados: kmPrevisto, dataPrevista, vencidoPorKm, vencidoPorTempo e kmExcedido são calculados na resposta conforme planoVencimentoCalculado e avisoPreventivaVencidaKm.
   * Saída: plano: o novo PlanoItem com veículo e vencimento, inserido na lista sem nova consulta.
   */
  'manutencaoFrota.planos_manutencao.cmdSalvarPlano': {
    kind: 'cmd';
    writes: 'PlanoManutencao.create';
    input: { veiculoId: string; descricao: string; details: { intervaloKm?: number; intervaloMeses?: number; kmReferencia: number; dataReferencia: string; observacoes?: string } };
    output: { plano: PlanoItem };
    rules: ['planoIntervaloObrigatorio', 'planoVencimentoCalculado', 'avisoPreventivaVencidaKm'];
    access: { actors: ['gestor']; grants: ['gestorFrota', 'gestorCadastrosMestres']; scope: 'organization' };
  };
  /**
   * Finalidade: Abre a ordem de manutenção preventiva para o plano vencido.
   * Entrada: planoId e veiculoId: plano selecionado e seu veículo; tipo: sempre ’preventive’; oficinaId: oficina escolhida; descricao: serviço a executar; dataEntrada: entrada na oficina; kmEntrada: quilometragem na entrada (opcional, sugerida pela quilometragem atual).
   * Processamento: Recusa se o plano não existe ou não é do mesmo veículo (ordemPreventivaExigePlano), se a oficina não está Active (oficinaInativaSemNovasOrdens) ou se o plano já tem ordem open (planoUmaOrdemAberta). Grava OrdemManutencao.create com status open e número emitido pela sequência do módulo (numeroOrdemUnico). Relê o plano com vencimento recalculado (planoVencimentoCalculado) e a ordem aberta; derivados não são gravados.
   * Saída: plano: PlanoDetalhe atualizado com temOrdemAberta e a ordemManutencao recém-aberta (número, situação, dias), para redesenhar a ficha.
   */
  'manutencaoFrota.planos_manutencao.cmdAbrirOrdemPreventiva': {
    kind: 'cmd';
    writes: 'OrdemManutencao.create';
    input: { planoId: string; veiculoId: string; tipo: 'preventive' | 'corrective'; oficinaId: string; details: { descricao: string; kmEntrada?: number }; dataEntrada: string };
    output: { plano: PlanoDetalhe };
    rules: ['ordemPreventivaExigePlano', 'oficinaInativaSemNovasOrdens', 'planoUmaOrdemAberta', 'numeroOrdemUnico', 'planoVencimentoCalculado'];
    access: { actors: ['gestor']; grants: ['gestorFrota', 'gestorCadastrosMestres']; scope: 'organization' };
  };
}

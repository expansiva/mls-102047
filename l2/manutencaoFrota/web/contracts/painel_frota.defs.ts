/// <mls fileReference="_102047_/l2/manutencaoFrota/web/contracts/painel_frota.defs.ts" enhancement="_blank"/>

/** Detalhes do veículo usados no alerta de preventiva. */
export interface VeiculoKmDetalhes {
  details: {
    quilometragemAtual: number;
  };
}

/** Veículo do plano vencido: placa, modelo e quilometragem atual. */
export interface VeiculoAlerta {
  id: string;
  placa: string;
  modelo: string;
  details: VeiculoKmDetalhes;
}

/** Situação calculada do vencimento do plano. */
export interface PlanoVencidoDetalhes {
  details: {
    readonly kmUltimaPreventiva?: number;
    readonly dataUltimaPreventiva?: string;
    readonly kmPrevisto?: number;
    readonly dataPrevista?: string;
    readonly vencidoPorKm: boolean;
    readonly vencidoPorTempo: boolean;
    readonly kmExcedido: number;
    readonly temOrdemAberta: boolean;
  };
}

/** Plano de manutenção vencido por km ou por tempo, com o veículo. */
export interface PreventivaVencida {
  id: string;
  descricao: string;
  veiculoId: string;
  details: PlanoVencidoDetalhes;
  veiculo: VeiculoAlerta;
}

/** Contadores das preventivas vencidas, calculados no servidor. */
export interface ResumoPreventivas {
  readonly totalVencidas: number;
  readonly vencidasPorKm: number;
  readonly vencidasPorTempo: number;
  readonly semOrdemAberta: number;
}

/** Identificação do veículo pela placa. */
export interface VeiculoPlaca {
  id: string;
  placa: string;
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

/** Oficina da ordem pelo nome do cadastro mestre. */
export interface OficinaNome {
  id: string;
  details: OficinaDetalhes;
}

export interface OrdemAndamentoDetalhes {
  details: {
    readonly diasNaOficina: number;
  };
}

/** Ordem de manutenção aberta com veículo, oficina e dias na oficina. */
export interface OrdemEmAndamento {
  id: string;
  readonly numero: string;
  veiculoId: string;
  oficinaId: string;
  tipo: 'preventive' | 'corrective';
  status: 'open' | 'completed';
  dataEntrada: string;
  details: OrdemAndamentoDetalhes;
  veiculo: VeiculoPlaca;
  oficina: OficinaNome;
}

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

export interface MotoristaNome {
  id: string;
  details: MotoristaDetalhes;
}

export interface AbastecimentoValores {
  details: {
    litros: number;
    valor: string;
    readonly precoPorLitro: string;
  };
}

/** Abastecimento recente com veículo, motorista e preço por litro. */
export interface AbastecimentoRecente {
  id: string;
  data: string;
  veiculoId: string;
  motoristaId: string;
  details: AbastecimentoValores;
  veiculo: VeiculoPlaca;
  motorista: MotoristaNome;
}

export interface Painel_frotaContracts {
  /**
   * Finalidade: Carrega em uma única chamada tudo o que o painel da frota mostra ao abrir: os contadores e a lista das preventivas vencidas, as ordens em andamento e os abastecimentos recentes com preço por litro.
   * Entrada: Sem parâmetros; o escopo é a organização do gestor autenticado (grant gestorFrota e gestorCadastrosMestres).
   * Processamento: Preventivas: lê os planos de manutenção da organização com seus veículos (listByForeignKey por veiculoId, em lote) e as ordens abertas; calcula kmUltimaPreventiva, dataUltimaPreventiva, kmPrevisto e dataPrevista conforme planoVencimentoCalculado (última preventiva concluída ou referência + intervalo em km/meses); vencidoPorKm quando a quilometragem atual passa do km previsto (avisoPreventivaVencidaKm), vencidoPorTempo quando hoje passa da data prevista, kmExcedido = quilometragem atual − km previsto (mínimo zero), temOrdemAberta quando há ordem do plano sem data de saída. Todos são derivados em tempo de leitura, nunca gravados. Filtra apenas os planos vencidos por km ou por tempo e ordena primeiro os sem ordem aberta, depois por kmExcedido decrescente e data prevista mais antiga. Os contadores (total, por km, por tempo, sem ordem aberta) são calculados no servidor. Ordens: filtra status = open, junta placa do veículo e nome da oficina do cadastro mestre (read.mdmRecord), calcula diasNaOficina de dataEntrada até hoje e ordena por diasNaOficina decrescente. Abastecimentos: últimos 30 dias, no máximo 20, ordenados por data decrescente, com placa e nome do motorista; precoPorLitro = valor ÷ litros (precoPorLitroCalculado).
   * Saída: resumoPreventivas com os números do topo do alerta; preventivasVencidas já filtrada e ordenada para destacar as que pedem ação; ordensEmAndamento ordenada pelos veículos parados há mais tempo; abastecimentosRecentes com o preço por litro para acompanhar o custo do combustível. Listas limitadas ao que o painel exibe, sem paginação.
   */
  'manutencaoFrota.painel_frota.carregarPainelFrota': {
    kind: 'qry';
    input: {};
    output: { resumoPreventivas: ResumoPreventivas; preventivasVencidas: PreventivaVencida[]; ordensEmAndamento: OrdemEmAndamento[]; abastecimentosRecentes: AbastecimentoRecente[] };
    rules: ['avisoPreventivaVencidaKm', 'planoVencimentoCalculado', 'precoPorLitroCalculado'];
    access: { actors: ['gestor']; grants: ['gestorFrota', 'gestorCadastrosMestres']; scope: 'organization' };
  };
}

/// <mls fileReference="_102047_/l2/manutencaoFrota/web/contracts/ordens_manutencao.defs.ts" enhancement="_blank"/>

/** Identificação da oficina no cadastro mestre. */
export interface OficinaIdentification {
  details: {
    identification: {
      name: string;
      readonly status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
    };
  };
}

export interface OficinaDetails {
  identification: OficinaIdentification;
}

/** Oficina com nome e situação, usada na lista, no detalhe e na escolha da oficina. */
export interface OficinaResumo {
  id: string;
  details: OficinaDetails;
}

/** Placa do veículo para a linha da lista. */
export interface VeiculoRef {
  placa: string;
}

export interface VeiculoDetails {
  details: {
    quilometragemAtual: number;
  };
}

/** Veículo com placa, modelo e quilometragem atual. */
export interface VeiculoResumo {
  id: string;
  placa: string;
  modelo: string;
  details: VeiculoDetails;
}

export interface PlanoDetails {
  details: {
    readonly kmPrevisto?: number;
    readonly dataPrevista?: string;
    readonly vencidoPorKm: boolean;
    readonly temOrdemAberta: boolean;
  };
}

/** Plano preventivo com vencimento calculado e indicação de ordem aberta. */
export interface PlanoResumo {
  id: string;
  descricao: string;
  details: PlanoDetails;
}

export interface OrdemItemDetails {
  details: {
    readonly diasNaOficina: number;
  };
}

/** Linha da lista de ordens. */
export interface OrdemItem {
  id: string;
  readonly numero: string;
  veiculoId: string;
  oficinaId: string;
  tipo: 'preventive' | 'corrective';
  status: 'open' | 'completed';
  dataEntrada: string;
  details: OrdemItemDetails;
  veiculo: VeiculoRef;
  oficina: OficinaResumo;
}

export interface OrdemDetails {
  details: {
    descricao: string;
    custo?: string;
    kmEntrada?: number;
    readonly diasNaOficina: number;
  };
}

/** Ordem completa com veículo, oficina e plano vinculado; usada no detalhe, nas ações e como retorno dos comandos. */
export interface OrdemDetalhe {
  id: string;
  version: number;
  readonly numero: string;
  veiculoId: string;
  oficinaId: string;
  planoId?: string;
  tipo: 'preventive' | 'corrective';
  status: 'open' | 'completed';
  dataEntrada: string;
  dataSaida?: string;
  details: OrdemDetails;
  veiculo: VeiculoResumo;
  oficina: OficinaResumo;
  plano?: PlanoResumo;
}

export interface Ordens_manutencaoContracts {
  /**
   * Finalidade: Carrega a fila de ordens de manutenção da organização, já filtrada pela situação (abertas por padrão), para o gestor localizar a ordem a acompanhar ou concluir.
   * Entrada: busca: texto livre comparado ao número da ordem, à placa do veículo e ao nome da oficina; status: situação da ordem (padrão ’open’ na abertura da página); veiculoId/oficinaId: filtros opcionais vindos do contexto; page/pageSize: paginação.
   * Processamento: Filtra OrdemManutencao por status, veículo, oficina e busca textual (número via locate.byText, placa e nome da oficina via junção com Veiculo e Oficina do cadastro mestre). Ordena as abertas pela data de entrada mais antiga. diasNaOficina é calculado (entrada até saída, ou até hoje se aberta), nunca gravado.
   * Saída: Página { items, page, pageSize, hasMore } com número, tipo, situação, data de entrada, dias na oficina, placa e nome da oficina de cada ordem.
   */
  'manutencaoFrota.ordens_manutencao.listarOrdens': {
    kind: 'qry';
    input: { busca?: string; status?: 'open' | 'completed'; veiculoId?: string; oficinaId?: string; page: number; pageSize: number };
    output: { ordens: { items: OrdemItem[]; page: number; pageSize: number; hasMore: boolean } };
    rules: [];
    access: { actors: ['gestor']; grants: ['gestorFrota', 'gestorCadastrosMestres']; scope: 'organization' };
  };
  /**
   * Finalidade: Abre a ordem selecionada na lista com tudo que o gestor confere antes de concluir.
   * Entrada: ordemId: id da ordem escolhida na lista.
   * Processamento: Lê a ordem por id e compõe o veículo (placa, modelo, quilometragem atual), a oficina (nome e situação do cadastro mestre) e, se preventiva, o plano vinculado com km e data previstos calculados conforme planoVencimentoCalculado. diasNaOficina é calculado na leitura.
   * Saída: A ordem com seus dados, versão para a conclusão e os registros relacionados, para o detalhe, as ações e o formulário de conclusão.
   */
  'manutencaoFrota.ordens_manutencao.obterOrdem': {
    kind: 'qry';
    input: { ordemId: string };
    output: { ordem: OrdemDetalhe };
    rules: ['planoVencimentoCalculado'];
    access: { actors: ['gestor']; grants: ['gestorFrota', 'gestorCadastrosMestres']; scope: 'organization' };
  };
  /**
   * Finalidade: Localiza o veículo pela placa ou modelo para abrir uma ordem.
   * Entrada: texto: parte da placa ou do modelo digitada pelo gestor.
   * Processamento: Busca Veiculo por texto (locate.byText) na organização, limitada às primeiras 20 ocorrências ordenadas pela placa.
   * Saída: Lista curta de veículos com placa, modelo e quilometragem atual, para o gestor escolher e preencher o km de entrada.
   */
  'manutencaoFrota.ordens_manutencao.buscarVeiculos': {
    kind: 'qry';
    input: { texto: string };
    output: { veiculos: VeiculoResumo[] };
    rules: [];
    access: { actors: ['gestor']; grants: ['gestorFrota', 'gestorCadastrosMestres']; scope: 'organization' };
  };
  /**
   * Finalidade: Localiza a oficina onde a ordem será executada.
   * Entrada: texto: parte do nome da oficina.
   * Processamento: Busca Oficina pelo nome no cadastro mestre (locate.byName), limitada a 20 resultados. Devolve a situação para que o formulário bloqueie oficinas não ativas (oficinaInativaSemNovasOrdens).
   * Saída: Oficinas com nome e situação para a escolha no formulário de abertura.
   */
  'manutencaoFrota.ordens_manutencao.buscarOficinas': {
    kind: 'qry';
    input: { texto: string };
    output: { oficinas: OficinaResumo[] };
    rules: ['oficinaInativaSemNovasOrdens'];
    access: { actors: ['gestor']; grants: ['gestorFrota', 'gestorCadastrosMestres']; scope: 'organization' };
  };
  /**
   * Finalidade: Prepara a abertura da ordem para um veículo: o veículo escolhido e seus planos preventivos com vencimento, inclusive quando o gestor chega pelo aviso de plano vencido.
   * Entrada: veiculoId: veículo escolhido no formulário; planoId: plano vindo do aviso (URL), do qual se obtém o veículo. Um dos dois é informado.
   * Processamento: Resolve o veículo (direto ou pelo plano) e lista seus planos (listByForeignKey). Calcula kmPrevisto e dataPrevista (planoVencimentoCalculado), vencidoPorKm comparando a quilometragem atual ao km previsto (avisoPreventivaVencidaKm) e temOrdemAberta (planoUmaOrdemAberta), para que o formulário só ofereça planos sem ordem aberta. Planos vencidos vêm primeiro.
   * Saída: O veículo com quilometragem atual e os planos com descrição, km previsto, vencimento e ordem aberta.
   */
  'manutencaoFrota.ordens_manutencao.carregarVeiculoAbertura': {
    kind: 'qry';
    input: { veiculoId?: string; planoId?: string };
    output: { veiculo: VeiculoResumo; planos: PlanoResumo[] };
    rules: ['planoVencimentoCalculado', 'avisoPreventivaVencidaKm', 'planoUmaOrdemAberta'];
    access: { actors: ['gestor']; grants: ['gestorFrota', 'gestorCadastrosMestres']; scope: 'organization' };
  };
  /**
   * Finalidade: Abre uma ordem preventiva (plano vencido) ou corretiva (defeito).
   * Entrada: veiculoId, oficinaId, tipo, planoId (só preventiva), dataEntrada, descricao e kmEntrada informados no formulário; dataSaida e custo são opcionais e normalmente ficam vazios na abertura (previsão de saída ou orçamento, quando o gestor já os tem).
   * Processamento: Recusa preventiva sem plano ou com plano de outro veículo (ordemPreventivaExigePlano), corretiva com plano (ordemCorretivaSemPlano), oficina não ativa (oficinaInativaSemNovasOrdens) e plano que já tem ordem aberta (planoUmaOrdemAberta). Se dataSaida vier, recusa data anterior à entrada (dataSaidaNaoAnteriorEntrada). Emite o número pela sequência do módulo, único (numeroOrdemUnico), e grava com status ’open’; a conclusão só ocorre pela transição concluir.
   * Saída: A ordem criada, completa, para exibir no detalhe sem nova chamada.
   */
  'manutencaoFrota.ordens_manutencao.abrirOrdem': {
    kind: 'cmd';
    writes: 'OrdemManutencao.create';
    input: { veiculoId: string; oficinaId: string; tipo: 'preventive' | 'corrective'; planoId?: string; dataEntrada: string; details: { descricao: string; kmEntrada?: number; custo?: string }; dataSaida?: string };
    output: { ordem: OrdemDetalhe };
    rules: ['ordemPreventivaExigePlano', 'ordemCorretivaSemPlano', 'oficinaInativaSemNovasOrdens', 'planoUmaOrdemAberta', 'numeroOrdemUnico', 'dataSaidaNaoAnteriorEntrada'];
    access: { actors: ['gestor']; grants: ['gestorFrota', 'gestorCadastrosMestres']; scope: 'organization' };
  };
  /**
   * Finalidade: Conclui a ordem aberta registrando a saída do veículo e o custo final.
   * Entrada: id e version da ordem (concorrência otimista); dataSaida e custo informados pelo gestor.
   * Processamento: Recusa ordem já concluída (ordemConcluidaNaoEditavel), falta de data de saída ou custo (conclusaoExigeSaidaECusto) e saída anterior à entrada (dataSaidaNaoAnteriorEntrada). Aplica a transição concluir (open → completed); se preventiva, na mesma transação o plano passa a ter como última preventiva o km e a data desta ordem (conclusaoRecalculaPlano), e o vencimento é recalculado na leitura.
   * Saída: A ordem concluída com dias na oficina finais e o plano com novo km/data previstos, para redesenhar o detalhe.
   */
  'manutencaoFrota.ordens_manutencao.concluirOrdem': {
    kind: 'cmd';
    writes: 'OrdemManutencao.concluir';
    input: { id: string; version: number; dataSaida: string; details: { custo: string } };
    output: { ordem: OrdemDetalhe };
    rules: ['conclusaoExigeSaidaECusto', 'dataSaidaNaoAnteriorEntrada', 'conclusaoRecalculaPlano', 'ordemConcluidaNaoEditavel'];
    access: { actors: ['gestor']; grants: ['gestorFrota', 'gestorCadastrosMestres']; scope: 'organization' };
  };
}

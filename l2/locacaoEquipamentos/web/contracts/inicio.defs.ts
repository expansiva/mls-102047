/// <mls fileReference="_102047_/l2/locacaoEquipamentos/web/contracts/inicio.defs.ts" enhancement="_blank"/>

/** Identificação do cliente reduzida ao nome. */
export interface ClienteIdentificacaoNome {
  details: {
    identification: {
      name: string;
    };
  };
}

/** Detalhes do cliente com apenas a identificação. */
export interface ClienteNomeDetails {
  identification: ClienteIdentificacaoNome;
}

/** Cliente do contrato, apenas com o nome exibido. */
export interface ClienteNome {
  details: ClienteNomeDetails;
}

/** Detalhes derivados do contrato em atraso. */
export interface ContratoEmAtrasoDetails {
  details: {
    readonly atrasado: boolean;
  };
}

/** Contrato vigente com devolução prevista vencida, com cliente, dias de atraso e multa estimada. */
export interface ContratoEmAtraso {
  id: string;
  numero: string;
  clienteId: string;
  status: 'rascunho' | 'vigente' | 'encerrado';
  dataRetirada: string;
  dataPrevistaDevolucao: string;
  details: ContratoEmAtrasoDetails;
  cliente: ClienteNome;
  readonly diasEmAtraso: number;
  readonly multaEstimada?: number;
}

/** Totais de equipamentos por situação atual. */
export interface TotaisFrota {
  readonly disponiveis: number;
  readonly locados: number;
  readonly emManutencao: number;
}

/** Situação derivada do equipamento e, quando locado, o contrato vigente e a devolução prevista. */
export interface EquipamentoSituacaoDetails {
  details: {
    readonly locado: boolean;
    readonly situacaoAtual: string;
    readonly contratoVigente?: string;
    readonly dataPrevistaDevolucao?: string;
  };
}

/** Número do contrato vigente do equipamento locado. */
export interface ContratoNumero {
  numero: string;
}

/** Linha da lista da frota: equipamento com situação atual e, se locado, contrato vigente e data prevista de devolução. */
export interface EquipamentoSituacao {
  id: string;
  codigo: string;
  descricao: string;
  status: 'disponivel' | 'emManutencao';
  details: EquipamentoSituacaoDetails;
  contratoLocacao?: ContratoNumero;
}

export interface InicioContracts {
  /**
   * Finalidade: Carrega, numa única chamada na abertura do painel, os contratos em atraso já filtrados e os totais da frota por situação.
   * Entrada: Sem parâmetros; o escopo é a organização do usuário logado.
   * Processamento: Seleciona contratos com status ’vigente’ cuja dataPrevistaDevolucao é anterior à data atual e sem dataRealDevolucao (atrasado é derivado, calculado e nunca gravado), ordenados da devolução mais antiga para a mais recente; junta o nome do cliente pelo cadastro mestre (clienteId). diasEmAtraso = data atual − dataPrevistaDevolucao. multaEstimada, só para o atendente (o gerente não tem acesso às diárias dos itens), aplica multaAtrasoUmEMeio: soma das diárias praticadas nos itens × dias de atraso × 1,5; é estimativa, a multa definitiva é calculada na devolução. Conta quantidadeEmAtraso. Conta os equipamentos por situação atual derivada: emManutencao quando status registrado é emManutencao, locado quando há contrato vigente não devolvido com item do equipamento, disponível nos demais casos.
   * Saída: quantidadeEmAtraso para o destaque do topo, a lista de contratos em atraso pronta para os cartões e os três totais da frota já calculados.
   */
  'locacaoEquipamentos.inicio.obterPainelInicio': {
    kind: 'qry';
    input: {};
    output: { readonly quantidadeEmAtraso: number; contratosEmAtraso: ContratoEmAtraso[]; totaisFrota: TotaisFrota };
    rules: ['multaAtrasoUmEMeio'];
    access: { actors: ['atendente', 'gerente']; grants: ['atendenteContratos', 'atendenteConsultaEquipamentos', 'gerenteEquipamentos', 'gerenteContratosVigentes', 'gerenteClienteNome']; scope: 'organization' };
  };
  /**
   * Finalidade: Lista paginada dos equipamentos da frota com sua situação atual, filtrável por situação (disponível, locado, em manutenção).
   * Entrada: situacao: filtro opcional pela situação atual (disponivel, locado ou emManutencao); ausente lista todos. page e pageSize: página solicitada e tamanho.
   * Processamento: Calcula para cada equipamento os derivados locado, situacaoAtual, contratoVigente e dataPrevistaDevolucao a partir do contrato vigente, ainda não devolvido, que tem item apontando para o equipamento (nunca gravados); aplica o filtro de situação e ordena por código. Para locados, junta o número do contrato vigente.
   * Saída: Página { items, page, pageSize, hasMore } de equipamentos com código, descrição, situação e, quando locado, número do contrato vigente e data prevista de devolução.
   */
  'locacaoEquipamentos.inicio.listarEquipamentosPorSituacao': {
    kind: 'qry';
    input: { details: { situacaoAtual?: string }; page: number; pageSize: number };
    output: { equipamentos: { items: EquipamentoSituacao[]; page: number; pageSize: number; hasMore: boolean } };
    rules: [];
    access: { actors: ['atendente', 'gerente']; grants: ['atendenteContratos', 'atendenteConsultaEquipamentos', 'gerenteEquipamentos', 'gerenteContratosVigentes', 'gerenteClienteNome']; scope: 'organization' };
  };
}

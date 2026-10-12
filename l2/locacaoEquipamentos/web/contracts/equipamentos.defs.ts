/// <mls fileReference="_102047_/l2/locacaoEquipamentos/web/contracts/equipamentos.defs.ts" enhancement="_blank"/>

/** Linha da lista de equipamentos com a situação atual já calculada. */
export interface EquipamentoResumo {
  id: string;
  codigo: string;
  descricao: string;
  status: 'disponivel' | 'emManutencao';
  details: {
    readonly situacaoAtual: string;
    valorDiaria: string;
  };
}

/** Totais de equipamentos por situação atual, calculados no servidor. */
export interface TotaisSituacao {
  readonly disponiveis: number;
  readonly locados: number;
  readonly emManutencao: number;
}

/** Contrato vigente que inclui o equipamento, com o item que o liga ao equipamento e o nome do cliente. */
export interface ContratoVigente {
  numero: string;
  clienteId: string;
  status: 'rascunho' | 'vigente' | 'encerrado';
  dataRetirada: string;
  dataPrevistaDevolucao: string;
  details: {
    readonly atrasado: boolean;
  };
  cliente: {
    details: {
      identification: {
        name: string;
      };
    };
  };
  itemContrato: {
    contratoId: string;
    equipamentoId: string;
  };
}

/** Ficha completa do equipamento: dados de cadastro, situação calculada e contrato vigente quando locado. */
export interface EquipamentoFicha {
  id: string;
  version: number;
  codigo: string;
  descricao: string;
  status: 'disponivel' | 'emManutencao';
  details: {
    valorDiaria: string;
    readonly situacaoAtual: string;
    readonly locado: boolean;
    readonly dataPrevistaDevolucao?: string;
    readonly contratoVigente?: string;
  };
  contratoVigente?: ContratoVigente;
}

export interface EquipamentosContracts {
  /**
   * Finalidade: Carrega, ao abrir a página e a cada pesquisa ou troca de filtro, a lista paginada de equipamentos com a situação atual e os totais por situação.
   * Entrada: busca: trecho do código ou da descrição (opcional); situacao: filtro pela situação atual — disponível, locado ou em manutenção (opcional); page e pageSize: página pedida e tamanho da página.
   * Processamento: Filtra os equipamentos por trecho de código ou descrição e pela situação atual, ordenados por código. A situação atual é calculada, nunca gravada: em manutenção quando status = emManutencao; locado quando existe contrato vigente com item apontando para o equipamento ainda sem devolução; disponível nos demais casos. Os totais contam os equipamentos por situação atual sobre todo o cadastro (sem a busca), para o painel do gerente.
   * Saída: equipamentos paginado ({ items, page, pageSize, hasMore }) para a lista e totais de disponíveis, locados e em manutenção já calculados.
   */
  'locacaoEquipamentos.equipamentos.listarEquipamentos': {
    kind: 'qry';
    input: { busca?: string; details: { situacaoAtual?: string }; page: number; pageSize: number };
    output: { equipamentos: { items: EquipamentoResumo[]; page: number; pageSize: number; hasMore: boolean }; totais: TotaisSituacao };
    rules: [];
    access: { actors: ['atendente', 'gerente']; grants: ['atendenteContratos', 'atendenteConsultaEquipamentos', 'gerenteEquipamentos', 'gerenteContratosVigentes', 'gerenteClienteNome']; scope: 'organization' };
  };
  /**
   * Finalidade: Abre a ficha do equipamento escolhido na lista, com situação, diária, contrato vigente e devolução prevista.
   * Entrada: equipamentoId: id do equipamento selecionado na lista.
   * Processamento: Lê o equipamento pelo id e calcula locado, situação atual, contrato vigente (id e dados) e data prevista de devolução a partir dos itens de contrato (por equipamentoId) cujo contrato está vigente e sem devolução registrada. Quando há contrato vigente, compõe número, cliente (nome lido do cadastro mestre), situação, datas de retirada e devolução prevista e o indicador de atraso (calculado: vigente com devolução prevista já passada). Campos derivados são calculados, nunca gravados.
   * Saída: equipamento: a ficha completa com version e a referência do contrato vigente, usada pelo detalhe, pelo formulário de dados e pelas ações de manutenção.
   */
  'locacaoEquipamentos.equipamentos.obterEquipamento': {
    kind: 'qry';
    input: { id: string };
    output: { equipamento: EquipamentoFicha };
    rules: [];
    access: { actors: ['atendente', 'gerente']; grants: ['atendenteContratos', 'atendenteConsultaEquipamentos', 'gerenteEquipamentos', 'gerenteContratosVigentes', 'gerenteClienteNome']; scope: 'organization' };
  };
  /**
   * Finalidade: Envia o equipamento para manutenção, retirando-o de operação.
   * Entrada: id e version do equipamento, para controle de concorrência otimista.
   * Processamento: Executa a transição enviarManutencao (disponivel → emManutencao), permitida ao gerente. Aplica equipamentoLocadoNaoVaiManutencao: recusa se houver contrato de locação vigente com item deste equipamento ainda sem devolução registrada. Recusa também se a version não confere.
   * Saída: equipamento: a ficha atualizada, que redesenha detalhe e ações sem nova consulta.
   */
  'locacaoEquipamentos.equipamentos.enviarManutencao': {
    kind: 'cmd';
    writes: 'Equipamento.enviarManutencao';
    input: { id: string; version: number };
    output: { equipamento: EquipamentoFicha };
    rules: ['equipamentoLocadoNaoVaiManutencao'];
    access: { actors: ['atendente', 'gerente']; grants: ['atendenteContratos', 'atendenteConsultaEquipamentos', 'gerenteEquipamentos', 'gerenteContratosVigentes', 'gerenteClienteNome']; scope: 'organization' };
  };
  /**
   * Finalidade: Retorna o equipamento da manutenção à operação, deixando-o disponível para novas locações.
   * Entrada: id e version do equipamento, para controle de concorrência otimista.
   * Processamento: Executa a transição retornarManutencao (emManutencao → disponivel), permitida ao gerente; recusa se o equipamento não está em manutenção ou se a version não confere.
   * Saída: equipamento: a ficha atualizada, que redesenha detalhe e ações sem nova consulta.
   */
  'locacaoEquipamentos.equipamentos.retornarManutencao': {
    kind: 'cmd';
    writes: 'Equipamento.retornarManutencao';
    input: { id: string; version: number };
    output: { equipamento: EquipamentoFicha };
    rules: [];
    access: { actors: ['atendente', 'gerente']; grants: ['atendenteContratos', 'atendenteConsultaEquipamentos', 'gerenteEquipamentos', 'gerenteContratosVigentes', 'gerenteClienteNome']; scope: 'organization' };
  };
}

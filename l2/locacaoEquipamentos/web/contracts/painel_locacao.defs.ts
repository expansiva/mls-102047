/// <mls fileReference="_102047_/l2/locacaoEquipamentos/web/contracts/painel_locacao.defs.ts" enhancement="_blank"/>

/** Nome do cliente titular do contrato, lido do cadastro mestre. */
export interface ClienteResumo {
  details: {
    identification: {
      name: string;
    };
  };
}

/** Contrato em atraso com cliente, datas, dias de atraso e multa. */
export interface ContratoEmAtraso {
  id: string;
  readonly numero: string;
  status: 'rascunho' | 'ativo' | 'encerrado';
  clienteId: string;
  cliente: ClienteResumo;
  dataRetirada: string;
  dataPrevistaDevolucao: string;
  details: {
    readonly atrasado: boolean;
    readonly diasAtraso: number;
    readonly valorMulta: string;
    readonly quantidadeItens: number;
  };
}

/** Contrato ativo em que o equipamento está locado. */
export interface ContratoAtualResumo {
  details: {
    readonly contratoAtual: string;
  };
  contratoLocacao: {
    readonly numero: string;
  };
}

/** Equipamento com sua situação atual e o contrato em que está locado. */
export interface EquipamentoLocado {
  id: string;
  codigo: string;
  descricao: string;
  situacao: 'disponivel' | 'emManutencao';
  details: {
    readonly situacaoAtual: string;
    readonly locado: boolean;
    valorDiaria: string;
  };
  contratoAtual?: ContratoAtualResumo;
}

export interface Painel_locacaoContracts {
  /**
   * Finalidade: Carrega, em uma única chamada ao abrir o painel, os contratos em atraso com dias e multa, o total de contratos atrasados, a soma das multas em aberto e os totais de equipamentos disponíveis, locados e em manutenção.
   * Entrada: Sem parâmetros: o escopo é a organização do usuário (atendente ou gerente).
   * Processamento: Seleciona os contratos com atrasado verdadeiro (ativo sem data real de devolução e com data prevista anterior a hoje), ordenados por dias de atraso decrescente, e junta o nome do cliente do cadastro mestre por clienteId. diasAtraso, atrasado, valorMulta e quantidadeItens são calculados, nunca gravados: a multa segue multaAtrasoDevolucao e multaPorAtraso (soma por item de diária praticada × dias de atraso × 1,5; para contrato ainda não devolvido os dias são contados até hoje). Os totais são calculados no servidor: totalContratosEmAtraso conta a lista e totalMultas soma valorMulta. Os totais de equipamentos contam por situacaoAtual conforme equipamentoLocadoDecorreDeContratoAtivo: em manutenção quando cadastrado assim, locado quando há contrato ativo sem devolução, disponível nos demais casos.
   * Saída: Lista de contratos em atraso e indicadores já calculados, para a seção de atrasos e os números da situação dos equipamentos sem cálculo no cliente.
   */
  'locacaoEquipamentos.painel_locacao.obterPainelLocacao': {
    kind: 'qry';
    input: {};
    output: { contratosEmAtraso: ContratoEmAtraso[]; readonly totalContratosEmAtraso: number; readonly totalMultas: number; readonly totalDisponiveis: number; readonly totalLocados: number; readonly totalEmManutencao: number };
    rules: ['multaAtrasoDevolucao', 'multaPorAtraso', 'equipamentoLocadoDecorreDeContratoAtivo'];
    access: { actors: ['atendente', 'gerente']; grants: ['atendenteClientes', 'atendenteContratos', 'atendenteEquipamentos', 'gerenteEquipamentos', 'gerenteContratos', 'gerenteClientes']; scope: 'organization' };
  };
  /**
   * Finalidade: Lista, paginada, os equipamentos locados com o contrato atual de cada um, para a seção de situação dos equipamentos.
   * Entrada: page: página solicitada (começa em 1); pageSize: quantidade de equipamentos por página.
   * Processamento: Filtra os equipamentos cuja situacaoAtual é locado segundo equipamentoLocadoDecorreDeContratoAtivo (constam em item de contrato ativo sem devolução registrada), ordenados por código. locado, situacaoAtual e contratoAtual são derivados e calculados na consulta, nunca gravados; o número do contrato atual é lido do contrato apontado.
   * Saída: Página { items, page, pageSize, hasMore } de equipamentos com código, descrição, diária, situação e contrato atual; a página seguinte é acrescentada à lista.
   */
  'locacaoEquipamentos.painel_locacao.listarEquipamentosLocados': {
    kind: 'qry';
    input: { page: number; pageSize: number };
    output: { equipamentos: { items: EquipamentoLocado[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['equipamentoLocadoDecorreDeContratoAtivo'];
    access: { actors: ['atendente', 'gerente']; grants: ['atendenteClientes', 'atendenteContratos', 'atendenteEquipamentos', 'gerenteEquipamentos', 'gerenteContratos', 'gerenteClientes']; scope: 'organization' };
  };
}

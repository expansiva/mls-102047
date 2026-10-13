/// <mls fileReference="_102047_/l2/locacaoEquipamentos/web/contracts/equipamentos.defs.ts" enhancement="_blank"/>

/** Detalhes do equipamento mostrados em cada linha da lista. */
export interface EquipamentoResumoDetails {
  details: {
    valorDiaria: string;
    readonly situacaoAtual: string;
  };
}

/** Linha da lista de equipamentos: código, descrição, situação cadastral, situação atual e diária. */
export interface EquipamentoResumo {
  id: string;
  codigo: string;
  descricao: string;
  situacao: 'disponivel' | 'emManutencao';
  details: EquipamentoResumoDetails;
}

/** Identificação do cliente titular do contrato (somente o nome, visível a atendente e gerente). */
export interface ClienteIdentificacao {
  details: {
    identification: {
      name: string;
    };
  };
}

/** Detalhes do cliente aninhados como na ontologia. */
export interface ClienteDetails {
  identification: ClienteIdentificacao;
}

/** Cliente titular do contrato atual. */
export interface ClienteResumo {
  details: ClienteDetails;
}

/** Contrato ativo sem devolução em que o equipamento está locado, com cliente e período. O id é a referência gravada em contratoAtual. */
export interface ContratoAtual {
  equipamento: {
    details: {
      readonly contratoAtual: string;
    };
  };
  readonly numero: string;
  status: 'rascunho' | 'ativo' | 'encerrado';
  dataRetirada: string;
  dataPrevistaDevolucao: string;
  cliente: ClienteResumo;
}

/** Detalhes do equipamento na ficha: diária, situação atual, se está locado e o contrato atual. */
export interface EquipamentoFichaDetails {
  details: {
    valorDiaria: string;
    readonly situacaoAtual: string;
    readonly locado: boolean;
  };
  contratoAtual?: ContratoAtual;
}

/** Equipamento selecionado com dados cadastrais, situação atual e contrato atual. */
export interface EquipamentoFicha {
  id: string;
  version: number;
  codigo: string;
  descricao: string;
  situacao: 'disponivel' | 'emManutencao';
  details: EquipamentoFichaDetails;
}

export interface EquipamentosContracts {
  /**
   * Finalidade: Carrega, ao abrir a página, a lista paginada de equipamentos e a refaz quando a pessoa pesquisa por código ou descrição ou filtra pela situação atual, para saber o que está livre para locar.
   * Entrada: busca: parte do código ou da descrição (ILIKE), opcional; situacaoAtual: filtro opcional por disponivel, locado ou emManutencao; page e pageSize: página pedida e tamanho da página.
   * Processamento: Pesquisa Equipamento por código ou descrição (locate.byText) ordenado por código. Para cada equipamento da página calcula situacaoAtual conforme equipamentoLocadoDecorreDeContratoAtivo: emManutencao quando a situação cadastral é emManutencao, locado quando existe ItemContrato em contrato ativo sem data real de devolução, senão disponivel; o valor é derivado, nunca gravado. Os itens de contrato da página são buscados de uma vez (listByForeignKey por vários equipamentos), sem uma consulta por linha. O filtro por situacaoAtual é aplicado sobre esse cálculo.
   * Saída: equipamentos paginado { items, page, pageSize, hasMore } com id, código, descrição, situação cadastral, diária e situação atual de cada equipamento, já no formato da lista.
   */
  'locacaoEquipamentos.equipamentos.listarEquipamentos': {
    kind: 'qry';
    input: { busca?: string; situacaoAtual?: string; page: number; pageSize: number };
    output: { equipamentos: { items: EquipamentoResumo[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['equipamentoLocadoDecorreDeContratoAtivo'];
    access: { actors: ['atendente', 'gerente']; grants: ['atendenteClientes', 'atendenteContratos', 'atendenteEquipamentos', 'gerenteEquipamentos', 'gerenteContratos', 'gerenteClientes']; scope: 'organization' };
  };
  /**
   * Finalidade: Carrega a ficha do equipamento escolhido na lista: dados cadastrais, situação atual, se está locado e o contrato atual com cliente e período.
   * Entrada: equipamentoId: id do equipamento selecionado na lista.
   * Processamento: Lê o Equipamento por id (read.byId); busca seus itens de contrato (listByForeignKey por equipamentoId) e identifica o contrato ativo sem data real de devolução. Calcula locado, contratoAtual (id do contrato, usado também para abrir o contrato) e situacaoAtual conforme equipamentoLocadoDecorreDeContratoAtivo (emManutencao quando assim cadastrado, locado quando há contrato ativo sem devolução, senão disponivel); são derivados, nunca gravados. Para o contrato atual traz número, situação, retirada e devolução prevista, e lê no cadastro mestre apenas o nome do cliente (read.mdmRecord), campo permitido ao gerente.
   * Saída: equipamento com id, version, código, descrição, situação cadastral, diária, situação atual, locado e contratoAtual (id, número, situação, período e cliente; ausente quando não locado), usado pela ficha, pelo cadastro e pelas ações da página.
   */
  'locacaoEquipamentos.equipamentos.obterEquipamento': {
    kind: 'qry';
    input: { equipamentoId: string };
    output: { equipamento: EquipamentoFicha };
    rules: ['equipamentoLocadoDecorreDeContratoAtivo'];
    access: { actors: ['atendente', 'gerente']; grants: ['atendenteClientes', 'atendenteContratos', 'atendenteEquipamentos', 'gerenteEquipamentos', 'gerenteContratos', 'gerenteClientes']; scope: 'organization' };
  };
}

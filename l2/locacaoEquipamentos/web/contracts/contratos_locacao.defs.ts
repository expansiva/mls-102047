/// <mls fileReference="_102047_/l2/locacaoEquipamentos/web/contracts/contratos_locacao.defs.ts" enhancement="_blank"/>

/** Cliente titular exibido no contrato e na busca de clientes (somente campos visíveis ao gerente e ao atendente). */
export interface ClienteResumo {
  id: string;
  details: {
    identification: {
      name: string;
      readonly status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
    };
  };
}

/** Linha da lista de contratos com situação, período, atraso e quantidade de equipamentos. */
export interface ContratoResumo {
  id: string;
  version: number;
  readonly numero: string;
  clienteId: string;
  cliente: ClienteResumo;
  status: 'rascunho' | 'ativo' | 'encerrado';
  dataRetirada: string;
  dataPrevistaDevolucao: string;
  details: {
    readonly atrasado: boolean;
    readonly quantidadeItens: number;
  };
}

/** Equipamento referenciado por um item do contrato. */
export interface EquipamentoResumo {
  id: string;
  codigo: string;
  descricao: string;
}

/** Item do contrato com equipamento, diária, previsão, atraso e multa. */
export interface ItemContratoDetalhe {
  id: string;
  equipamentoId: string;
  equipamento: EquipamentoResumo;
  details: {
    valorDiaria: string;
    observacao?: string;
    readonly diasPrevistos: number;
    readonly valorPrevisto: string;
    readonly diasAtraso: number;
    readonly multaAtraso: string;
  };
}

/** Contrato completo com cliente, período, totais de atraso e multa e seus itens; redesenhado após cada comando. */
export interface ContratoDetalhe {
  id: string;
  version: number;
  readonly numero: string;
  clienteId: string;
  cliente: ClienteResumo;
  status: 'rascunho' | 'ativo' | 'encerrado';
  dataRetirada: string;
  dataPrevistaDevolucao: string;
  dataRealDevolucao?: string;
  details: {
    observacoes?: string;
    readonly diasAtraso: number;
    readonly valorMulta: string;
    readonly quantidadeItens: number;
  };
  itens: ItemContratoDetalhe[];
}

/** Equipamento oferecido na montagem do contrato, com situação atual e diária de referência. */
export interface EquipamentoOpcao {
  id: string;
  codigo: string;
  descricao: string;
  details: {
    readonly situacaoAtual: string;
    valorDiaria: string;
  };
}

export interface Contratos_locacaoContracts {
  /**
   * Finalidade: Carrega a lista paginada de contratos de locação ao abrir a página e a cada pesquisa, já com o nome do cliente, a quantidade de equipamentos e o indicador de atraso.
   * Entrada: busca: texto livre comparado ao número do contrato ou ao nome do cliente; status: filtra pela situação do contrato; somenteAtrasados: quando verdadeiro traz só contratos em atraso; page/pageSize: paginação.
   * Processamento: Localiza contratos por número (locate.byText) ou pelo nome do cliente resolvido no cadastro mestre, aplica os filtros de situação e atraso, ordena trazendo os atrasados primeiro e depois pela data prevista de devolução. Compõe o nome do cliente via read.mdmRecord. atrasado (ativo sem devolução com prevista anterior a hoje, ou encerrado devolvido após a prevista) e quantidadeItens (contagem de itens) são campos derivados calculados na leitura, nunca gravados.
   * Saída: Página { items, page, pageSize, hasMore } de ContratoResumo para a lista localizar e priorizar contratos.
   */
  'locacaoEquipamentos.contratos_locacao.listarContratos': {
    kind: 'qry';
    input: { busca?: string; status?: 'rascunho' | 'ativo' | 'encerrado'; somenteAtrasados?: boolean; page: number; pageSize: number };
    output: { contratos: { items: ContratoResumo[]; page: number; pageSize: number; hasMore: boolean } };
    rules: [];
    access: { actors: ['atendente', 'gerente']; grants: ['atendenteClientes', 'atendenteContratos', 'atendenteEquipamentos', 'gerenteEquipamentos', 'gerenteContratos', 'gerenteClientes']; scope: 'organization' };
  };
  /**
   * Finalidade: Carrega o contrato selecionado na lista com cliente, período, itens, dias de atraso e multa, para conferência e ações.
   * Entrada: contratoId: id do contrato escolhido na lista.
   * Processamento: Lê o contrato (read.byId), o nome e situação do cliente (read.mdmRecord), os itens pela chave contratoId e o código/descrição de cada equipamento. Calcula na leitura: diasPrevistos e valorPrevisto por item; diasAtraso do contrato e de cada item (real menos prevista quando posterior, senão zero); multaAtraso por item = diária praticada × dias de atraso × 1,5 (multaPorAtraso); valorMulta = soma das multas dos itens (multaAtrasoDevolucao); quantidadeItens. Nada disso é gravado.
   * Saída: ContratoDetalhe com os itens e os totais já calculados, usado pela conferência e pelas ações do contrato.
   */
  'locacaoEquipamentos.contratos_locacao.obterContrato': {
    kind: 'qry';
    input: { contratoId: string };
    output: { contrato: ContratoDetalhe };
    rules: ['multaPorAtraso', 'multaAtrasoDevolucao'];
    access: { actors: ['atendente', 'gerente']; grants: ['atendenteClientes', 'atendenteContratos', 'atendenteEquipamentos', 'gerenteEquipamentos', 'gerenteContratos', 'gerenteClientes']; scope: 'organization' };
  };
  /**
   * Finalidade: Localiza clientes pelo nome digitado para escolher o titular do novo contrato.
   * Entrada: nome: parte do nome do cliente.
   * Processamento: Usa locate.byName no cadastro mestre, limitado a poucas dezenas de resultados. Retorna a situação cadastral para que a página sinalize e impeça a escolha de cliente inativo (clienteInativoNaoLoca).
   * Saída: Lista curta de clientes com id, nome e situação para seleção no formulário.
   */
  'locacaoEquipamentos.contratos_locacao.localizarClientes': {
    kind: 'qry';
    input: { nome: string };
    output: { clientes: ClienteResumo[] };
    rules: ['clienteInativoNaoLoca'];
    access: { actors: ['atendente', 'gerente']; grants: ['atendenteClientes', 'atendenteContratos', 'atendenteEquipamentos', 'gerenteEquipamentos', 'gerenteContratos', 'gerenteClientes']; scope: 'organization' };
  };
  /**
   * Finalidade: Busca equipamentos pelo código ou descrição para incluir no contrato em montagem, mostrando situação atual e diária.
   * Entrada: texto: parte do código ou da descrição; dataRetirada/dataPrevistaDevolucao: período do contrato em montagem, usado para conferir disponibilidade.
   * Processamento: Usa locate.byText (ILIKE) limitado a poucas dezenas de resultados. situacaoAtual é derivada na leitura (equipamentoLocadoDecorreDeContratoAtivo): emManutencao se cadastrado assim, locado se há contrato ativo sem devolução, senão disponível; com período informado, consulta consultarDisponibilidade para indicar se está livre no período (equipamentoDisponivelParaLocar).
   * Saída: Lista de equipamentos com código, descrição, situação atual e diária de referência para preencher o item.
   */
  'locacaoEquipamentos.contratos_locacao.buscarEquipamentos': {
    kind: 'qry';
    input: { texto: string; dataRetirada?: string; dataPrevistaDevolucao?: string };
    output: { equipamentos: EquipamentoOpcao[] };
    rules: ['equipamentoLocadoDecorreDeContratoAtivo', 'equipamentoDisponivelParaLocar'];
    access: { actors: ['atendente', 'gerente']; grants: ['atendenteClientes', 'atendenteContratos', 'atendenteEquipamentos', 'gerenteEquipamentos', 'gerenteContratos', 'gerenteClientes']; scope: 'organization' };
  };
  /**
   * Finalidade: Cria o contrato em elaboração para o cliente escolhido com o período informado.
   * Entrada: clienteId: cliente titular; dataRetirada e dataPrevistaDevolucao: período da locação; observacoes: anotações livres.
   * Processamento: Recusa cliente com registro mestre inativo (clienteInativoNaoLoca) e data prevista anterior à retirada (contratoPeriodoValido). Cria com status rascunho e número emitido pela sequência (sequence.next).
   * Saída: ContratoDetalhe recém-criado (sem itens), para o formulário seguir para a inclusão de equipamentos e o contrato ficar selecionado.
   */
  'locacaoEquipamentos.contratos_locacao.abrirContrato': {
    kind: 'cmd';
    writes: 'ContratoLocacao.create';
    input: { clienteId: string; dataRetirada: string; dataPrevistaDevolucao: string; details: { observacoes?: string } };
    output: { contrato: ContratoDetalhe };
    rules: ['clienteInativoNaoLoca', 'contratoPeriodoValido'];
    access: { actors: ['atendente', 'gerente']; grants: ['atendenteClientes', 'atendenteContratos', 'atendenteEquipamentos', 'gerenteEquipamentos', 'gerenteContratos', 'gerenteClientes']; scope: 'organization' };
  };
  /**
   * Finalidade: Inclui um equipamento no contrato em elaboração com a diária praticada.
   * Entrada: contratoId: contrato em elaboração; equipamentoId: equipamento escolhido; valorDiaria: diária praticada; observacao: acessórios ou estado na retirada.
   * Processamento: Recusa se o contrato não está em rascunho (contratoEditavelSomenteEmElaboracao), se o equipamento já está no contrato (itemUnicoPorContrato), se está em manutenção (equipamentoEmManutencaoNaoLocavel), se não está disponível no período (equipamentoDisponivelParaLocar) ou consta em outro contrato não encerrado com período sobreposto (equipamentoSemPeriodoSobreposto, equipamentoSemPeriodosSobrepostos), e se a diária não é maior que zero (valorDiariaPositivo). diasPrevistos e valorPrevisto são calculados na leitura, não gravados.
   * Saída: ContratoDetalhe atualizado com o novo item, dias e valor previstos, para redesenhar o formulário sem outra chamada.
   */
  'locacaoEquipamentos.contratos_locacao.adicionarItem': {
    kind: 'cmd';
    writes: 'ItemContrato.create';
    input: { contratoId: string; equipamentoId: string; details: { valorDiaria: string; observacao?: string } };
    output: { contrato: ContratoDetalhe };
    rules: ['contratoEditavelSomenteEmElaboracao', 'itemUnicoPorContrato', 'equipamentoSemPeriodoSobreposto', 'equipamentoSemPeriodosSobrepostos', 'equipamentoDisponivelParaLocar', 'equipamentoEmManutencaoNaoLocavel', 'valorDiariaPositivo'];
    access: { actors: ['atendente', 'gerente']; grants: ['atendenteClientes', 'atendenteContratos', 'atendenteEquipamentos', 'gerenteEquipamentos', 'gerenteContratos', 'gerenteClientes']; scope: 'organization' };
  };
  /**
   * Finalidade: Confirma o contrato em elaboração, passando-o a ativo e os equipamentos a locados.
   * Entrada: contratoId e version: contrato a confirmar e versão para concorrência otimista.
   * Processamento: Transição ativarContrato (rascunho → ativo) em transação. Recusa sem ao menos um item (contratoExigeItem, contratoComAoMenosUmItem), com equipamento em manutenção (equipamentoEmManutencaoNaoLoca), indisponível (equipamentoDisponivelParaLocar) ou em outro contrato com período sobreposto (equipamentoSemSobreposicao). O estado locado dos equipamentos é derivado, não gravado.
   * Saída: ContratoDetalhe com status ativo para redesenhar conferência e ações.
   */
  'locacaoEquipamentos.contratos_locacao.confirmarContrato': {
    kind: 'cmd';
    writes: 'ContratoLocacao.ativarContrato';
    input: { id: string; version: number };
    output: { contrato: ContratoDetalhe };
    rules: ['contratoExigeItem', 'contratoComAoMenosUmItem', 'equipamentoSemSobreposicao', 'equipamentoDisponivelParaLocar', 'equipamentoEmManutencaoNaoLoca'];
    access: { actors: ['atendente', 'gerente']; grants: ['atendenteClientes', 'atendenteContratos', 'atendenteEquipamentos', 'gerenteEquipamentos', 'gerenteContratos', 'gerenteClientes']; scope: 'organization' };
  };
  /**
   * Finalidade: Registra a data real de devolução, encerra o contrato e devolve a multa calculada.
   * Entrada: contratoId e version: contrato ativo e versão; dataRealDevolucao: dia em que o cliente devolveu.
   * Processamento: Transição registrarDevolucao (ativo → encerrado) em transação. Recusa data real anterior à retirada (contratoPeriodoValido). Os equipamentos voltam a disponíveis (devolucaoLiberaEquipamentos). Dias de atraso e multa por item (diária × dias × 1,5, multaPorAtraso) e o total do contrato (multaAtrasoDevolucao) são calculados na leitura do retorno, não gravados.
   * Saída: ContratoDetalhe encerrado com diasAtraso, valorMulta e multas por item para o atendente informar o cliente.
   */
  'locacaoEquipamentos.contratos_locacao.registrarDevolucao': {
    kind: 'cmd';
    writes: 'ContratoLocacao.registrarDevolucao';
    input: { id: string; version: number; dataRealDevolucao: string };
    output: { contrato: ContratoDetalhe };
    rules: ['contratoPeriodoValido', 'multaAtrasoDevolucao', 'multaPorAtraso', 'devolucaoLiberaEquipamentos'];
    access: { actors: ['atendente', 'gerente']; grants: ['atendenteClientes', 'atendenteContratos', 'atendenteEquipamentos', 'gerenteEquipamentos', 'gerenteContratos', 'gerenteClientes']; scope: 'organization' };
  };
}

/// <mls fileReference="_102047_/l2/locacaoEquipamentos/web/contracts/contratos.defs.ts" enhancement="_blank"/>

/** Cliente como a página o mostra: id, nome e documento. */
export interface ClienteResumo {
  id: string;
  details: {
    identification: {
      name: string;
      docId?: string;
    };
  };
}

/** Linha da lista de contratos, com cliente, situação, período e atraso. */
export interface ContratoResumo {
  id: string;
  numero: string;
  clienteId: string;
  cliente: ClienteResumo;
  status: 'rascunho' | 'vigente' | 'encerrado';
  dataRetirada: string;
  dataPrevistaDevolucao: string;
  details: {
    readonly atrasado: boolean;
    readonly diasAtraso: number;
  };
}

/** Equipamento de um item do contrato: código e descrição. */
export interface EquipamentoResumo {
  id: string;
  codigo: string;
  descricao: string;
}

/** Item do contrato com equipamento, diária praticada, valor previsto, atraso e multa. */
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

/** Contrato completo com cliente, período, totais, atraso, multa e itens; usado pela conferência e devolvido por todos os comandos. */
export interface ContratoDetalhe {
  id: string;
  version: number;
  numero: string;
  status: 'rascunho' | 'vigente' | 'encerrado';
  clienteId: string;
  cliente: ClienteResumo;
  dataRetirada: string;
  dataPrevistaDevolucao: string;
  dataRealDevolucao?: string;
  details: {
    observacoes?: string;
    observacoesDevolucao?: string;
    readonly diasContratados: number;
    readonly valorPrevisto: string;
    readonly diasAtraso: number;
    readonly valorMulta: string;
    readonly atrasado: boolean;
  };
  itens: ItemContratoDetalhe[];
}

/** Equipamento encontrado na pesquisa do novo contrato, com situação atual e valor da diária. */
export interface EquipamentoOpcao {
  id: string;
  codigo: string;
  descricao: string;
  details: {
    readonly situacaoAtual: string;
    valorDiaria: string;
  };
}

export interface ContratosContracts {
  /**
   * Finalidade: Carrega a lista paginada de contratos para o atendente localizar o contrato pelo número ou pelo cliente, com os atrasados em evidência, e o total de contratos em atraso.
   * Entrada: busca: trecho do número do contrato ou do nome/documento do cliente; somenteAtrasados: quando verdadeiro, traz apenas contratos em atraso; page e pageSize: paginação da lista.
   * Processamento: Filtra ContratoLocacao por número (locate.byText) ou pelo cliente (nome lido do cadastro mestre) e, se pedido, apenas os atrasados. Junta o nome do cliente em lote. Calcula atrasado (contrato vigente com data prevista anterior a hoje e sem devolução registrada) e diasAtraso conforme multaPorAtraso; campos derivados são calculados, nunca gravados. Ordena atrasados primeiro, depois pela data prevista de devolução. totalAtrasados é contado no servidor (count).
   * Saída: contratos paginado ({ items, page, pageSize, hasMore }) com número, cliente, situação, datas, atrasado e dias de atraso; totalAtrasados para o indicador da lista.
   */
  'locacaoEquipamentos.contratos.qryContratos': {
    kind: 'qry';
    input: { busca?: string; somenteAtrasados?: boolean; page: number; pageSize: number };
    output: { contratos: { items: ContratoResumo[]; page: number; pageSize: number; hasMore: boolean }; readonly totalAtrasados: number };
    rules: ['multaPorAtraso'];
    access: { actors: ['atendente']; grants: ['atendenteContratos', 'atendenteConsultaEquipamentos']; scope: 'organization' };
  };
  /**
   * Finalidade: Abre o contrato selecionado para conferência e para as ações de confirmar ou registrar a devolução.
   * Entrada: contratoId: id do contrato escolhido na lista ou recém-criado.
   * Processamento: Lê ContratoLocacao pelo id, o nome e documento do cliente no cadastro mestre, e os itens por contratoId com código e descrição do equipamento. Calcula diasContratados, valorPrevisto (soma de diária praticada × dias), diasAtraso e valorMulta conforme multaPorAtraso e multaAtrasoUmEMeio (soma das diárias × dias de atraso × 1,5), e por item diasPrevistos, valorPrevisto, diasAtraso e multaAtraso. Nada é gravado.
   * Saída: contrato com cabeçalho, totais, atraso, multa, versão e itens, já no formato da conferência e das ações.
   */
  'locacaoEquipamentos.contratos.qryContrato': {
    kind: 'qry';
    input: { contratoId: string };
    output: { contrato: ContratoDetalhe };
    rules: ['multaPorAtraso', 'multaAtrasoUmEMeio'];
    access: { actors: ['atendente']; grants: ['atendenteContratos', 'atendenteConsultaEquipamentos']; scope: 'organization' };
  };
  /**
   * Finalidade: Pesquisa o cliente pelo nome ou documento para iniciar o novo contrato.
   * Entrada: busca: trecho do nome ou número do documento do cliente.
   * Processamento: Usa locate.byName e locate.byDocument do cadastro mestre de clientes e devolve as primeiras ocorrências (limite de uma tela, ex.: 20), ordenadas por nome.
   * Saída: clientes com id, nome e documento para o atendente escolher o cliente do contrato.
   */
  'locacaoEquipamentos.contratos.qryClientes': {
    kind: 'qry';
    input: { busca: string };
    output: { clientes: ClienteResumo[] };
    rules: [];
    access: { actors: ['atendente']; grants: ['atendenteContratos', 'atendenteConsultaEquipamentos']; scope: 'organization' };
  };
  /**
   * Finalidade: Pesquisa equipamentos pelo código ou descrição para incluí-los no novo contrato, mostrando situação e diária.
   * Entrada: busca: trecho do código ou da descrição do equipamento.
   * Processamento: Usa locate.byText em Equipamento (código ou descrição), limitado a uma tela (ex.: 20), ordenado por código. Calcula situacaoAtual: emManutencao quando registrado, locado quando há contrato vigente sem devolução com o equipamento, disponivel nos demais casos (derivado, não gravado), para o atendente ver o que pode ser incluído (equipamentoIndisponivelNaoLoca).
   * Saída: equipamentos com código, descrição, situação atual e valor da diária.
   */
  'locacaoEquipamentos.contratos.qryEquipamentos': {
    kind: 'qry';
    input: { busca: string };
    output: { equipamentos: EquipamentoOpcao[] };
    rules: ['equipamentoIndisponivelNaoLoca'];
    access: { actors: ['atendente']; grants: ['atendenteContratos', 'atendenteConsultaEquipamentos']; scope: 'organization' };
  };
  /**
   * Finalidade: Cria o contrato em elaboração para o cliente com o período informado.
   * Entrada: clienteId: cliente escolhido; dataRetirada e dataPrevistaDevolucao: período da locação; observacoes: anotações opcionais; dataRealDevolucao e observacoesDevolucao: opcionais, normalmente vazios na criação, pois são preenchidos na devolução.
   * Processamento: Recusa quando a data prevista de devolução não é posterior à de retirada (contratoPeriodoValido). Emite o número pela sequência da plataforma, único e imutável (numeroContratoSequencial). Grava com status rascunho. Valores derivados são calculados na leitura.
   * Saída: contrato recém-criado, sem itens, para abrir direto na conferência e seguir com a inclusão de equipamentos.
   */
  'locacaoEquipamentos.contratos.cmdCriarContrato': {
    kind: 'cmd';
    writes: 'ContratoLocacao.create';
    input: { clienteId: string; dataRetirada: string; dataPrevistaDevolucao: string; details: { observacoes?: string; observacoesDevolucao?: string }; dataRealDevolucao?: string };
    output: { contrato: ContratoDetalhe };
    rules: ['contratoPeriodoValido', 'numeroContratoSequencial'];
    access: { actors: ['atendente']; grants: ['atendenteContratos', 'atendenteConsultaEquipamentos']; scope: 'organization' };
  };
  /**
   * Finalidade: Inclui um equipamento no contrato em elaboração.
   * Entrada: contratoId: contrato em montagem; equipamentoId: equipamento escolhido na pesquisa; valorDiaria: diária exibida do equipamento; observacao: anotação opcional do item.
   * Processamento: Recusa se o contrato não está em rascunho (itensSomenteAntesDaConfirmacao), se o equipamento está em manutenção ou locado (equipamentoEmManutencaoNaoLoca, equipamentoIndisponivelNaoLoca) ou se já está em outro contrato rascunho ou vigente com período sobreposto (equipamentoSemPeriodoSobreposto, periodoSemSobreposicao: retirada de cada um ≤ devolução prevista do outro). A diária gravada é a do equipamento no momento da inclusão (valorDiariaDoEquipamento), conferida no servidor. A chave contratoId + equipamentoId recusa duplicidade.
   * Saída: contrato atualizado com o novo item e o valor previsto recalculado, para redesenhar a conferência sem nova chamada.
   */
  'locacaoEquipamentos.contratos.cmdAdicionarItem': {
    kind: 'cmd';
    writes: 'ItemContrato.create';
    input: { contratoId: string; equipamentoId: string; details: { valorDiaria: string; observacao?: string } };
    output: { contrato: ContratoDetalhe };
    rules: ['itensSomenteAntesDaConfirmacao', 'equipamentoIndisponivelNaoLoca', 'equipamentoEmManutencaoNaoLoca', 'equipamentoSemPeriodoSobreposto', 'periodoSemSobreposicao', 'valorDiariaDoEquipamento'];
    access: { actors: ['atendente']; grants: ['atendenteContratos', 'atendenteConsultaEquipamentos']; scope: 'organization' };
  };
  /**
   * Finalidade: Confirma o contrato em elaboração, tornando-o vigente.
   * Entrada: id e version do contrato (concorrência otimista).
   * Processamento: Executa a transição ativarContrato (rascunho → vigente). Recusa sem ao menos um item (contratoExigeItens), com período inválido (contratoPeriodoValido) ou se algum equipamento estiver em outro contrato com período sobreposto, verificado de novo na confirmação (equipamentoSemSobreposicao, equipamentoSemPeriodoSobreposto). Grava em transação; os equipamentos passam a ser lidos como locados.
   * Saída: contrato vigente atualizado com nova versão para redesenhar conferência e ações.
   */
  'locacaoEquipamentos.contratos.cmdConfirmarContrato': {
    kind: 'cmd';
    writes: 'ContratoLocacao.ativarContrato';
    input: { id: string; version: number };
    output: { contrato: ContratoDetalhe };
    rules: ['contratoExigeItens', 'equipamentoSemSobreposicao', 'equipamentoSemPeriodoSobreposto', 'contratoPeriodoValido'];
    access: { actors: ['atendente']; grants: ['atendenteContratos', 'atendenteConsultaEquipamentos']; scope: 'organization' };
  };
  /**
   * Finalidade: Registra a devolução de um contrato vigente, encerrando-o e apresentando atraso e multa.
   * Entrada: id e version do contrato; dataRealDevolucao: dia efetivo da devolução; observacoesDevolucao: estado dos equipamentos na devolução.
   * Processamento: Executa a transição registrarDevolucao (vigente → encerrado). Recusa data real anterior à retirada (devolucaoNaoAnteriorRetirada). Os dias de atraso (data real − data prevista, zero sem atraso, multaPorAtraso) e a multa (soma das diárias × dias de atraso × 1,5, multaAtrasoUmEMeio) são calculados na leitura, não gravados. Os equipamentos voltam a ser lidos como disponíveis.
   * Saída: contrato encerrado com data real, dias de atraso e multa, para o atendente informar ao cliente sem nova chamada.
   */
  'locacaoEquipamentos.contratos.cmdRegistrarDevolucao': {
    kind: 'cmd';
    writes: 'ContratoLocacao.registrarDevolucao';
    input: { id: string; version: number; dataRealDevolucao: string; details: { observacoesDevolucao?: string } };
    output: { contrato: ContratoDetalhe };
    rules: ['devolucaoNaoAnteriorRetirada', 'multaPorAtraso', 'multaAtrasoUmEMeio'];
    access: { actors: ['atendente']; grants: ['atendenteContratos', 'atendenteConsultaEquipamentos']; scope: 'organization' };
  };
}

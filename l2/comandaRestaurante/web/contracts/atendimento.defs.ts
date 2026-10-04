/// <mls fileReference="_102047_/l2/comandaRestaurante/web/contracts/atendimento.defs.ts" enhancement="_blank"/>

/** Mesa disponível apresentada para o garçom escolher onde iniciar um atendimento. */
export interface MesaDisponivel {
  id: string;
  codigo: string;
  readonly disponivel: boolean;
}

/** Comanda aberta disponível na localização rápida do atendimento. */
export interface ComandaAbertaResumo {
  id: string;
  numero: number;
  mesaId: string;
  situacao: 'open' | 'closed';
}

/** Item do cardápio que pode ser escolhido para um lançamento. */
export interface ItemCardapioOpcao {
  id: string;
  nome: string;
  precoVigente: number;
}

/** Página de mesas disponíveis para a lista de localização. */
export interface PaginaMesasDisponiveis {
  itens: MesaDisponivel[];
  pagina: number;
  tamanhoPagina: number;
  readonly total: number;
}

/** Página de comandas abertas para a lista de localização. */
export interface PaginaComandasAbertas {
  itens: ComandaAbertaResumo[];
  pagina: number;
  tamanhoPagina: number;
  readonly total: number;
}

/** Página de itens do cardápio para escolha no formulário de lançamento. */
export interface PaginaItensCardapio {
  itens: ItemCardapioOpcao[];
  pagina: number;
  tamanhoPagina: number;
  readonly total: number;
}

/** Dados independentes e paginados para localizar mesa, comanda aberta ou item do cardápio. */
export interface LocalizacaoAtendimento {
  mesasDisponiveis: PaginaMesasDisponiveis;
  comandasAbertas: PaginaComandasAbertas;
  itensCardapio: PaginaItensCardapio;
}

/** Item lançado da comanda, com a identificação do cardápio e os valores registrados para conferência. */
export interface LinhaComandaAtendimento {
  id: string;
  versao: number;
  comandaId: string;
  itemCardapioId: string;
  nomeItem: string;
  situacao: 'launched' | 'canceled';
  quantidade: number;
  observacao?: string;
  precoUnitario: number;
  readonly valorTotal: number;
}

/** Comanda escolhida ou alterada, já composta com mesa, linhas e subtotal para redesenhar a conferência. */
export interface ComandaAtendimento {
  id: string;
  versao: number;
  numero: number;
  mesaId: string;
  codigoMesa: string;
  situacao: 'open' | 'closed';
  readonly subtotal: number;
  itens: LinhaComandaAtendimento[];
}

export interface AtendimentoContracts {
  /**
   * Finalidade: Carrega em uma chamada os dados iniciais de localização do atendimento para o garçom encontrar uma mesa disponível, uma comanda aberta ou um item do cardápio.
   * Entrada: As páginas opcionais definem qual faixa de cada lista será exibida; na ausência delas, a função usa a primeira página com tamanho adequado à tela.
   * Processamento: Calcula e filtra mesas disponíveis para abertura conforme mesaDisponivelParaAbrirComanda, lista somente comandas com situação open e traz a primeira página do cardápio. Ordena mesas por código, comandas por número e cardápio por nome; cada lista traz seu total e permanece paginada para limitar transferência.
   * Saída: Retorna a localização já separada em mesas disponíveis, comandas abertas e itens do cardápio, com totais e paginação, para preencher a área de busca sem chamadas por organismo.
   */
  'comandaRestaurante.atendimento.carregarAtendimento': {
    kind: 'qry';
    input: { paginaMesas?: number; paginaComandas?: number; paginaCardapio?: number };
    output: { localizacao: LocalizacaoAtendimento };
    meta: { output: {}; lists: {}; params: {} };
    rules: ['mesaDisponivelParaAbrirComanda'];
    access: { actors: ['garcom']; grants: ['garcomAtendimentoComandas']; scope: 'organization' };
  };
  /**
   * Finalidade: Atualiza sob demanda a localização do atendimento quando o garçom pesquisa ou navega pelas listas de mesas, comandas e cardápio.
   * Entrada: codigoMesa filtra mesas disponíveis por código; numeroComanda filtra comandas abertas pelo número; termoCardapio pesquisa o nome do item. As páginas opcionais controlam a faixa retornada em cada resultado.
   * Processamento: Mantém o filtro de disponibilidade das mesas exigido por mesaDisponivelParaAbrirComanda, restringe comandas à situação open e aplica os filtros informados de forma independente. Executa a busca textual do cardápio por nome, ordena os resultados e calcula o total de cada lista antes de paginá-la.
   * Saída: Retorna somente as três listas de localização no mesmo formato da carga inicial, para substituir a parte pesquisada da interface sem recarregar uma comanda já em conferência.
   */
  'comandaRestaurante.atendimento.buscarLocalizacaoAtendimento': {
    kind: 'qry';
    input: { codigoMesa?: string; numeroComanda?: number; termoCardapio?: string; paginaMesas?: number; paginaComandas?: number; paginaCardapio?: number };
    output: { localizacao: LocalizacaoAtendimento };
    meta: { output: {}; lists: {}; params: {} };
    rules: ['mesaDisponivelParaAbrirComanda'];
    access: { actors: ['garcom']; grants: ['garcomAtendimentoComandas']; scope: 'organization' };
  };
  /**
   * Finalidade: Busca a comanda selecionada já com a mesa, todos os lançamentos e o subtotal para o garçom conferir e operar o atendimento.
   * Entrada: comandaId é o identificador técnico da comanda escolhida na localização.
   * Processamento: Lê a comanda no contexto selecionado, compõe o código da mesa e cada linha com o nome de seu item de cardápio. Calcula o subtotal conforme subtotalComandaCalculado, somando apenas os valores de itens não cancelados.
   * Saída: Retorna uma ComandaAtendimento completa, incluindo as linhas canceladas com sua situação, para a conferência e para disponibilizar o contexto técnico seguro do cancelamento.
   */
  'comandaRestaurante.atendimento.consultarComandaAtendimento': {
    kind: 'qry';
    input: { comandaId: string };
    output: { comanda: ComandaAtendimento };
    meta: { output: {}; lists: {}; params: {} };
    rules: ['subtotalComandaCalculado'];
    access: { actors: ['garcom']; grants: ['garcomAtendimentoComandas']; scope: 'organization' };
  };
  /**
   * Finalidade: Abre o atendimento para a mesa escolhida e devolve imediatamente a comanda vazia pronta para receber pedidos.
   * Entrada: mesaId é a chave da mesa selecionada e preenche o vínculo obrigatório Comanda.mesaId da nova comanda.
   * Processamento: Cria uma comanda com número sequencial e situação open em transação. Recusa a operação quando a mesa não estiver disponível por mesaDisponivelParaAbrirComanda ou já houver comanda aberta por umaComandaAbertaPorMesa. Compõe o retorno com a mesa e calcula o subtotal inicial conforme subtotalComandaCalculado.
   * Saída: Retorna a ComandaAtendimento recém-aberta, com número, mesa, situação, subtotal e lista vazia de itens, para a tela trocar imediatamente para a conferência e lançamento.
   */
  'comandaRestaurante.atendimento.abrirComanda': {
    kind: 'cmd';
    writes: 'Comanda.create';
    input: { mesaId: string };
    output: { comanda: ComandaAtendimento };
    meta: { output: {}; lists: {}; params: {} };
    rules: ['mesaDisponivelParaAbrirComanda', 'umaComandaAbertaPorMesa', 'subtotalComandaCalculado'];
    access: { actors: ['garcom']; grants: ['garcomAtendimentoComandas']; scope: 'organization' };
  };
  /**
   * Finalidade: Inclui o pedido informado na comanda em atendimento e retorna a conferência já atualizada.
   * Entrada: comandaId vincula o lançamento à comanda aberta; itemCardapioId identifica o item escolhido; quantidade e observacao são os dados informados para o pedido.
   * Processamento: Recusa lançamento em comanda não aberta conforme itensSomenteEmComandaAberta. Obtém o preço vigente do item e o registra como preço unitário segundo precoUnitarioRegistradoNoLancamento; calcula o total da linha por valorTotalItemComandaCalculado e recompõe o subtotal por subtotalComandaCalculado.
   * Saída: Retorna a ComandaAtendimento completa com a nova linha, seus valores registrados e o subtotal recalculado, evitando uma consulta adicional após a confirmação.
   */
  'comandaRestaurante.atendimento.lancarItem': {
    kind: 'cmd';
    writes: 'ItemComanda.create';
    input: { comandaId: string; itemCardapioId: string; quantidade: number; observacao?: string };
    output: { comanda: ComandaAtendimento };
    meta: { output: {}; lists: {}; params: {} };
    rules: ['itensSomenteEmComandaAberta', 'precoUnitarioRegistradoNoLancamento', 'valorTotalItemComandaCalculado', 'subtotalComandaCalculado'];
    access: { actors: ['garcom']; grants: ['garcomAtendimentoComandas']; scope: 'organization' };
  };
  /**
   * Finalidade: Cancela o lançamento escolhido por engano e devolve a mesma comanda com sua conferência e subtotal atualizados.
   * Entrada: itemComandaId identifica a linha a cancelar e versao é a versão recebida na conferência, usada para proteger a transição contra alteração concorrente.
   * Processamento: Executa a transição cancelarItemComanda somente para item lançado cuja comanda ainda esteja aberta, conforme itemComandaOperacaoSomenteComandaAberta. Após a transição, recompõe linhas, mesa e subtotal, desconsiderando o item cancelado segundo subtotalComandaCalculado.
   * Saída: Retorna a ComandaAtendimento atualizada, mantendo a linha com situação canceled e apresentando o subtotal que a exclui da cobrança.
   */
  'comandaRestaurante.atendimento.cancelarItem': {
    kind: 'cmd';
    writes: 'ItemComanda.cancelarItemComanda';
    input: { itemComandaId: string; versao: number };
    output: { comanda: ComandaAtendimento };
    meta: { output: {}; lists: {}; params: {} };
    rules: ['itemComandaOperacaoSomenteComandaAberta', 'subtotalComandaCalculado'];
    access: { actors: ['garcom']; grants: ['garcomAtendimentoComandas']; scope: 'organization' };
  };
}

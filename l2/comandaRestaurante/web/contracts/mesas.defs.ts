/// <mls fileReference="_102047_/l2/comandaRestaurante/web/contracts/mesas.defs.ts" enhancement="_blank"/>

/** Dados de uma mesa necessários para a lista e para preencher o formulário ao selecioná-la. */
export interface MesaListaItem {
  id: string;
  version: number;
  codigo: string;
  readonly disponivel: boolean;
}

/** Página de mesas exibida na lista, com indicador de quantidade para a paginação. */
export interface PaginaMesas {
  mesas: MesaListaItem[];
  readonly quantidadeTotal: number;
  proximaPagina?: number;
}

/** Mesa devolvida após cadastro ou alteração para atualizar a lista e manter o formulário sincronizado. */
export interface MesaAtualizada {
  id: string;
  version: number;
  codigo: string;
  readonly disponivel: boolean;
}

export interface MesasContracts {
  /**
   * Finalidade: Carrega a primeira página das mesas da casa para o caixa consultar código e disponibilidade ao abrir a página.
   * Entrada: Não recebe parâmetros; inicia pela primeira página de mesas.
   * Processamento: Consulta as mesas visíveis ao caixa, ordenadas por código, calcula a disponibilidade de cada mesa a partir da inexistência de comanda aberta vinculada e limita o resultado ao tamanho de uma tela. Também calcula a quantidade total para orientar a paginação.
   * Saída: Devolve a página inicial já pronta para a lista, com identificação e versão para seleção e manutenção, código, disponibilidade calculada, total de mesas e a próxima página quando houver.
   */
  'comandaRestaurante.mesas.carregarMesas': {
    kind: 'qry';
    input: {};
    output: { pagina: PaginaMesas };
    meta: { output: {}; lists: {}; params: {} };
    rules: [];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
  /**
   * Finalidade: Busca mesas por código ou carrega outra página da lista quando o caixa pesquisa ou avança a paginação.
   * Entrada: codigo é o texto de pesquisa informado pelo caixa e pagina é o número da página solicitada pela interface.
   * Processamento: Filtra as mesas visíveis cujo código corresponda ao texto informado, ordena por código, aplica a página solicitada e calcula a disponibilidade de cada mesa pela inexistência de comanda aberta vinculada. Calcula também o total do resultado filtrado.
   * Saída: Devolve somente a página solicitada, pronta para redesenhar a lista, incluindo total do resultado e indicação da próxima página.
   */
  'comandaRestaurante.mesas.buscarMesas': {
    kind: 'qry';
    input: { codigo?: string; pagina: number };
    output: { pagina: PaginaMesas };
    meta: { output: {}; lists: {}; params: {} };
    rules: [];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
  /**
   * Finalidade: Cadastra uma mesa para uso na operação e devolve seus dados para atualizar a lista e o formulário sem nova consulta.
   * Entrada: codigo é a identificação curta da mesa preenchida pelo caixa.
   * Processamento: Cria a mesa com o código informado e rejeita duplicidade conforme a chave única de Mesa. A mesa recém-criada é devolvida com disponibilidade calculada pela inexistência de comanda aberta vinculada.
   * Saída: Devolve a mesa criada, com id e versão para alterações posteriores, código e disponibilidade para a interface refletir o novo cadastro.
   */
  'comandaRestaurante.mesas.criarMesa': {
    kind: 'cmd';
    writes: 'Mesa.create';
    input: { codigo: string };
    output: { mesa: MesaAtualizada };
    meta: { output: { mesa: { entity: 'Mesa'; many: false } }; lists: {}; params: {} };
    rules: [];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
  /**
   * Finalidade: Atualiza o código de uma mesa existente e devolve o registro atualizado para redesenhar a lista e manter o formulário sincronizado.
   * Entrada: id identifica a mesa selecionada, version protege contra alteração concorrente e codigo é o novo código informado pelo caixa.
   * Processamento: Atualiza o código próprio da mesa identificada, exige a versão atual e rejeita duplicidade conforme a chave única de Mesa. Recalcula a disponibilidade com base nas comandas abertas vinculadas.
   * Saída: Devolve a mesa atualizada com a nova versão, código e disponibilidade calculada, dispensando uma segunda chamada da página.
   */
  'comandaRestaurante.mesas.atualizarMesa': {
    kind: 'cmd';
    writes: 'Mesa.update';
    input: { id: string; version: number; codigo: string };
    output: { mesa: MesaAtualizada };
    meta: { output: { mesa: { entity: 'Mesa'; many: false } }; lists: {}; params: {} };
    rules: [];
    access: { actors: ['caixa']; grants: ['caixaFechamentoEcadastroOperacional']; scope: 'organization' };
  };
}

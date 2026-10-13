/// <mls fileReference="_102047_/l2/compras/web/contracts/inicio_comprador.defs.ts" enhancement="_blank"/>

/** Indicadores dos pedidos do comprador da sessão, já calculados no servidor. */
export interface ResumoMeusPedidos {
  readonly emAberto: number;
  readonly aguardandoAprovacao: number;
  readonly liberadoAoFornecedor: number;
  readonly atrasado: number;
  readonly valorTotal: number;
  readonly quantidadePendente: number;
}

/** Identificação do fornecedor reduzida ao nome. */
export interface FornecedorIdentificacaoNome {
  details: {
    identification: {
      name: string;
    };
  };
}

/** Detalhes do fornecedor usados na linha do rascunho. */
export interface FornecedorNomeDetails {
  identification: FornecedorIdentificacaoNome;
}

/** Fornecedor do pedido, apenas id e nome. */
export interface FornecedorNome {
  id: string;
  details: FornecedorNomeDetails;
}

/** Detalhes do rascunho exibidos na lista. */
export interface RascunhoPedidoDetails {
  details: {
    readonly valorTotal: string;
  };
}

/** Linha de um pedido em rascunho do comprador, com fornecedor e valor até agora. */
export interface RascunhoPedido {
  id: string;
  readonly numero: string;
  status: 'rascunho' | 'enviado' | 'aprovado' | 'rejeitado' | 'recebidoParcial' | 'recebido';
  readonly dataEmissao: string;
  fornecedorId: string;
  details: RascunhoPedidoDetails;
  fornecedor: FornecedorNome;
  readonly quantidadeItens: number;
}

/** Um canal de contato do comprador, extraído do resumo de contatos. */
export interface ContatoComprador {
  details: {
    base: {
      readonly contacts: string;
    };
  };
}

/** Identificação do comprador da sessão. */
export interface CompradorIdentificacao {
  details: {
    identification: {
      name: string;
      readonly status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
      docType?: 'CPF' | 'Passport' | 'NationalId' | 'Other';
      docId?: string;
    };
  };
}

/** Dados base do comprador: contatos. */
export interface CompradorBase {
  contacts: ContatoComprador[];
}

/** Detalhes do cadastro do comprador. */
export interface CadastroCompradorDetails {
  identification: CompradorIdentificacao;
  base: CompradorBase;
}

/** Cadastro do comprador da sessão, com indicação de aptidão para abrir pedidos. */
export interface CadastroComprador {
  id: string;
  details: CadastroCompradorDetails;
  readonly aptoAbrirPedido: boolean;
}

export interface Inicio_compradorContracts {
  /**
   * Finalidade: Carrega em uma única chamada tudo o que a página inicial do comprador mostra ao abrir: os indicadores dos seus pedidos, os rascunhos que ainda precisa completar e enviar, e o seu cadastro de comprador.
   * Entrada: Sem parâmetros: o comprador é resolvido pela sessão (locate.byLogin), e todo o escopo é ’meus pedidos’ (PedidoCompra.compradorId = comprador da sessão).
   * Processamento: 1) Resolve o comprador da sessão e lê seu cadastro (nome, situação, documento, contatos); aptoAbrirPedido é verdadeiro apenas quando a situação é Active (regra compradorInativoNaoAbrePedido: comprador inativo não abre novos pedidos). 2) Resumo: conta, entre os pedidos do comprador, os em aberto (emAberto), aguardando aprovação (aguardandoAprovacao), liberados ao fornecedor (liberadoAoFornecedor) e atrasados (atrasado); soma o valorTotal e a quantidadePendente dos pedidos em aberto. Esses campos são derivados e calculados na leitura, nunca gravados: aguardando/liberado seguem a regra valorLimiteAprovacao (acima do limite aguarda o gerente, até o limite segue liberado) e o valor total segue valorTotalPedidoCalculado (soma de quantidade × preço unitário dos itens). 3) Rascunhos: lista os pedidos do comprador com status rascunho, ordenados por dataEmissao decrescente, compondo o nome do fornecedor (read.mdmRecord em lote pelos fornecedorId) e a contagem de itens de cada pedido (count de ItemPedido por pedidoCompraId, em lote). Lista não paginada: os rascunhos abertos de um comprador cabem em uma tela.
   * Saída: resumo com os números já calculados para os indicadores; rascunhos com número, fornecedor, data de abertura, valor até agora e quantidade de itens, para o comprador retomar cada pedido em pedidos_comprador; comprador com os dados para conferir o cadastro e se está apto a abrir pedidos.
   */
  'compras.inicio_comprador.qryInicioComprador': {
    kind: 'qry';
    input: {};
    output: { resumo: ResumoMeusPedidos; rascunhos: RascunhoPedido[]; comprador: CadastroComprador };
    rules: ['valorLimiteAprovacao', 'valorTotalPedidoCalculado', 'compradorInativoNaoAbrePedido'];
    access: { actors: ['comprador']; grants: ['compradorCadastroFornecedores', 'compradorPedidos', 'compradorProprioCadastro']; scope: 'organization' };
  };
}

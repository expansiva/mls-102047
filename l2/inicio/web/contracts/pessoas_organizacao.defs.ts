/// <mls fileReference="_102047_/l2/inicio/web/contracts/pessoas_organizacao.defs.ts" enhancement="_blank"/>

/** Situação de preparo da empresa dona do app: se está preparada e quais dados obrigatórios ainda faltam. */
export interface EmpresaPreparo {
  id: string;
  details: {
    inicio: {
      readonly preparada: boolean;
      readonly dadosFaltantes: string[];
    };
  };
}

/** Pessoa da organização em forma resumida: nome, país, situação na plataforma e situação do acesso. */
export interface PessoaResumo {
  id: string;
  details: {
    identification: {
      name: string;
      countryCode: string;
      readonly status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
    };
    inicio: {
      readonly acessoCompleto: boolean;
      readonly dadosFaltantes: string[];
    };
  };
}

/** Canal de contato ligado à pessoa: o e-mail da conta autenticada ou o telefone opcional. */
export interface ContatoPessoa {
  details: {
    base: {
      readonly contacts: string;
    };
  };
}

/** Pessoa da organização com dados, contatos, situação do acesso, o que falta, exigência de consentimento e etapa da liberação do acesso. */
export interface PessoaDetalhe {
  id: string;
  details: {
    identification: {
      name: string;
      countryCode: string;
      readonly status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
    };
    inicio: {
      readonly acessoCompleto: boolean;
      readonly dadosFaltantes: string[];
      readonly consentimentoExigido: boolean;
    };
  };
  contacts: ContatoPessoa[];
  readonly etapaLiberacao: 'pedidoEncaminhado' | 'acessoLiberado' | 'loginLigado' | 'acessoCompletado';
}

export interface Pessoas_organizacaoContracts {
  /**
   * Finalidade: Carrega de uma vez a situação de preparo da empresa do responsável e a primeira página das pessoas da organização.
   * Entrada: page: número da página da lista de pessoas (começa em 1); pageSize: quantidade de pessoas por página.
   * Processamento: Resolve a empresa da organização do responsável logado e calcula preparada e dadosFaltantes conforme empresaPreparadaDadosObrigatorios (nome, documento, ao menos um endereço e ao menos um contato). Lista as pessoas com o papel inicio.PessoaOrganizacao ligadas à empresa (locate.byTag/listLinks), ordenadas com as de acesso incompleto primeiro e depois por nome; para cada uma calcula acessoCompleto e dadosFaltantes conforme acessoCompletoDadosMinimos (nome, país e consentimento válido se Brasil/UE; telefone não conta). Valores derivados são calculados, nunca gravados. O consentimento de privacidade nunca é lido para a saída.
   * Saída: empresa: id, preparada e lista dos dados obrigatórios que faltam. pessoas: página { items, page, pageSize, hasMore } de pessoas com id, nome, país, situação na plataforma, acesso completo e dados que faltam.
   */
  'inicio.pessoas_organizacao.abrirPessoasOrganizacao': {
    kind: 'qry';
    input: { page: number; pageSize: number };
    output: { empresa: EmpresaPreparo; pessoas: { items: PessoaResumo[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['acessoCompletoDadosMinimos', 'empresaPreparadaDadosObrigatorios'];
    access: { actors: ['responsavel']; grants: ['responsavelPrepararEmpresa', 'responsavelAcompanharPessoas', 'responsavelMeuAcesso']; scope: 'organization' };
  };
  /**
   * Finalidade: Procura as pessoas da organização pelo nome e filtra pela situação do acesso, paginando o resultado.
   * Entrada: busca: trecho do nome da pessoa (opcional); situacao: ’todas’, ’acessoIncompleto’ (acessoCompleto falso) ou ’aguardandoLiberacao’ (situação na plataforma diferente de Active); page e pageSize: página pedida e tamanho.
   * Processamento: Restringe às pessoas da organização do responsável logado com papel inicio.PessoaOrganizacao; aplica locate.byName quando há busca; calcula acessoCompleto e dadosFaltantes conforme acessoCompletoDadosMinimos e aplica o filtro de situação sobre esses valores e o status. Ordena com acesso incompleto primeiro e depois por nome. Não lê o consentimento de privacidade.
   * Saída: pessoas: página { items, page, pageSize, hasMore } de pessoas com id, nome, país, situação, acesso completo e dados que faltam.
   */
  'inicio.pessoas_organizacao.buscarPessoas': {
    kind: 'qry';
    input: { busca?: string; situacao?: 'todas' | 'acessoIncompleto' | 'aguardandoLiberacao'; page: number; pageSize: number };
    output: { pessoas: { items: PessoaResumo[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['acessoCompletoDadosMinimos'];
    access: { actors: ['responsavel']; grants: ['responsavelPrepararEmpresa', 'responsavelAcompanharPessoas', 'responsavelMeuAcesso']; scope: 'organization' };
  };
  /**
   * Finalidade: Lê a pessoa selecionada com tudo que explica a situação do acesso dela e a etapa da liberação.
   * Entrada: pessoaId: id (mdmId) da pessoa selecionada na lista.
   * Processamento: Lê a pessoa por read.byId, recusando se não pertence à organização do responsável logado. Calcula acessoCompleto e dadosFaltantes conforme acessoCompletoDadosMinimos e consentimentoExigido pelo país (Brasil ou União Europeia), sem expor o conteúdo do consentimento (campo negado pelo grant). Deriva etapaLiberacao de status e acessoCompleto: acessoCompletado se acesso completo; loginLigado se Active com dados faltando; acessoLiberado/pedidoEncaminhado conforme a situação na plataforma; a ligação do login é decidida só pela liberação da plataforma (ligacaoLoginPelaPlataforma) e o endpoint não registra pendência. Não concede papéis nem permissões (dadosNaoConcedemPermissoes).
   * Saída: pessoa: id, nome, país, situação, contatos (e-mail da conta e telefone opcional), acesso completo, dados que faltam, se o consentimento é exigido e a etapa atual da liberação.
   */
  'inicio.pessoas_organizacao.obterPessoa': {
    kind: 'qry';
    input: { pessoaId: string };
    output: { pessoa: PessoaDetalhe };
    rules: ['acessoCompletoDadosMinimos', 'ligacaoLoginPelaPlataforma', 'dadosNaoConcedemPermissoes'];
    access: { actors: ['responsavel']; grants: ['responsavelPrepararEmpresa', 'responsavelAcompanharPessoas', 'responsavelMeuAcesso']; scope: 'organization' };
  };
}

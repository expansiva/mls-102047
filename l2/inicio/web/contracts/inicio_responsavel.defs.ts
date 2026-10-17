/// <mls fileReference="_102047_/l2/inicio/web/contracts/inicio_responsavel.defs.ts" enhancement="_blank"/>

/** Situação de preparo da empresa dona do app: nome, se está preparada e quais dados obrigatórios faltam. */
export interface SituacaoEmpresa {
  id: string;
  details: {
    identification: {
      name: string;
    };
    inicio: {
      readonly preparada: boolean;
      readonly dadosFaltantes: string[];
    };
  };
}

/** Contagens da situação de acesso das pessoas da organização. */
export interface IndicadoresAcessoPessoas {
  readonly totalAcessoCompleto: number;
  readonly totalComDadosFaltando: number;
  readonly totalConsentimentoPendente: number;
}

/** Pessoa da organização cujo acesso aguarda liberação pela plataforma, com nome, situação, contatos e dados mínimos que faltam. */
export interface PessoaAguardandoLiberacao {
  id: string;
  details: {
    identification: {
      name: string;
      readonly status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
    };
    base: {
      readonly contacts: string;
    };
    inicio: {
      readonly dadosFaltantes: string[];
    };
  };
}

export interface Inicio_responsavelContracts {
  /**
   * Finalidade: Carrega, ao abrir o Início do responsável, a situação de preparo da empresa e os números de acesso das pessoas da organização.
   * Entrada: Nenhuma entrada: a empresa e a organização vêm da sessão do responsável.
   * Processamento: Lê a empresa da organização da sessão e calcula (inicio.verificarPreparo) preparada e dadosFaltantes conforme empresaPreparadaDadosObrigatorios: nome, documento, ao menos um endereço e ao menos um contato; dadosFaltantes lista só o que a plataforma ainda não tem (naoPedirDadoJaExistente). Para as pessoas com papel inicio.PessoaOrganizacao da organização, calcula acessoCompleto e dadosFaltantes conforme acessoCompletoDadosMinimos (nome, país e consentimento quando o país é Brasil ou UE; telefone não conta) e conta: quantas têm acesso completo, quantas têm dados faltando e quantas têm consentimento exigido ainda pendente. Valores derivados são calculados, nunca gravados.
   * Saída: empresa: id, nome, indicador de preparada e lista de dados obrigatórios que faltam. indicadores: os três totais já calculados.
   */
  'inicio.inicio_responsavel.qryPainelResponsavel': {
    kind: 'qry';
    input: {};
    output: { empresa: SituacaoEmpresa; indicadores: IndicadoresAcessoPessoas };
    rules: ['empresaPreparadaDadosObrigatorios', 'naoPedirDadoJaExistente', 'acessoCompletoDadosMinimos'];
    access: { actors: ['responsavel']; grants: ['responsavelPrepararEmpresa', 'responsavelAcompanharPessoas', 'responsavelMeuAcesso']; scope: 'organization' };
  };
  /**
   * Finalidade: Lista, por páginas, as pessoas da organização que aguardam o responsável liberar o acesso.
   * Entrada: page: número da página pedida; pageSize: quantidade de pessoas por página.
   * Processamento: Filtra as pessoas da organização do responsável com papel inicio.PessoaOrganizacao cuja situação na plataforma não está ativa (Inactive ou Blocked), ou seja, que aguardam a liberação da plataforma; o Início não guarda pendência nem decide a ligação do login (ligacaoLoginPelaPlataforma). Calcula dadosFaltantes de cada pessoa conforme acessoCompletoDadosMinimos. Não expõe o consentimento de privacidade (negado pelo grant). Ordena pelo nome.
   * Saída: pessoas: página { items, page, pageSize, hasMore } com id, nome, situação, contatos e dados mínimos que faltam de cada pessoa.
   */
  'inicio.inicio_responsavel.qryPessoasAguardandoLiberacao': {
    kind: 'qry';
    input: { page: number; pageSize: number };
    output: { pessoas: { items: PessoaAguardandoLiberacao[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['ligacaoLoginPelaPlataforma', 'acessoCompletoDadosMinimos', 'dadosNaoConcedemPermissoes'];
    access: { actors: ['responsavel']; grants: ['responsavelPrepararEmpresa', 'responsavelAcompanharPessoas', 'responsavelMeuAcesso']; scope: 'organization' };
  };
}

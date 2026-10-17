/// <mls fileReference="_102047_/l2/inicio/web/contracts/pessoas.defs.ts" enhancement="_blank"/>

/** Pessoa da organização com a situação do cadastro e do acesso. */
export interface PessoaResumo {
  id: string;
  details: {
    identification: {
      name: string;
      countryCode: string;
      readonly status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
      readonly updatedAt: string;
    };
    inicio: {
      readonly acessoCompleto: boolean;
      readonly dadosFaltantes: string;
    };
  };
}

/** Canal de contato ligado à pessoa da organização. */
export interface ContatoPessoa {
  id: string;
  details: {
    contactChannel: {
      contactType: 'Phone' | 'Email' | 'WhatsApp';
      value: string;
      isVerified: boolean;
    };
  };
}

/** Empresa da organização à qual a pessoa pertence. */
export interface EmpresaResumo {
  details: {
    identification: {
      name: string;
    };
  };
}

/** Cadastro da pessoa da organização com a situação do acesso, o que falta, a exigência de consentimento, seus contatos e a empresa. */
export interface PessoaDetalhe {
  id: string;
  details: {
    identification: {
      name: string;
      countryCode: string;
      readonly status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
      readonly createdAt: string;
    };
    inicio: {
      readonly acessoCompleto: boolean;
      readonly dadosFaltantes: string;
      readonly consentimentoExigido: boolean;
    };
  };
  contatos: ContatoPessoa[];
  empresa: EmpresaResumo;
}

export interface PessoasContracts {
  /**
   * Finalidade: Carrega ao abrir a página a primeira página das pessoas da organização e os pedidos de liberação, já com a situação do acesso de cada pessoa.
   * Entrada: pageSize: tamanho da primeira página da lista de pessoas (opcional; padrão do servidor).
   * Processamento: Recusa quem não é o responsável da empresa (prepararSomenteResponsavel). Lista as pessoas com o papel inicio.PessoaOrganizacao da organização do responsável logado, ordenadas por updatedAt decrescente, página 1. Calcula na leitura acessoCompleto e dadosFaltantes conforme acessoCompletoDadosMinimos (nome, país e consentimento válido quando o país é Brasil ou UE; telefone não conta); nada é gravado. Os pedidos de liberação são derivados, sem pendência guardada (liberacaoPeloResponsavel): pessoas da organização cujo e-mail a plataforma não ligou sozinha e que ainda não têm acesso completo, ordenadas por updatedAt decrescente.
   * Saída: pessoas: { items, page, pageSize, hasMore } com PessoaResumo; pedidos: lista de PessoaResumo das pessoas aguardando liberação.
   */
  'inicio.pessoas.qryPaginaPessoas': {
    kind: 'qry';
    input: { page: number; pageSize: number };
    output: { pessoas: { items: PessoaResumo[]; page: number; pageSize: number; hasMore: boolean }; pedidos: PessoaResumo[] };
    rules: ['prepararSomenteResponsavel', 'acessoCompletoDadosMinimos', 'liberacaoPeloResponsavel'];
    access: { actors: ['responsavel']; grants: ['responsavelPreparaEmpresa', 'responsavelContatosEmpresa', 'responsavelAcompanhaPessoas']; scope: 'organization' };
  };
  /**
   * Finalidade: Localiza pessoas da organização pelo nome e filtra quem ainda não completou o acesso, página a página.
   * Entrada: busca: trecho do nome da pessoa; somentePendentes: quando verdadeiro, só pessoas sem acesso completo; page e pageSize: página pedida.
   * Processamento: Só o responsável pode consultar (prepararSomenteResponsavel). Procura por nome (locate.byName) entre as pessoas com papel inicio.PessoaOrganizacao da organização do responsável logado, ordena por updatedAt decrescente. Calcula acessoCompleto e dadosFaltantes na leitura conforme acessoCompletoDadosMinimos e, se somentePendentes, mantém só quem tem acessoCompleto falso.
   * Saída: pessoas: { items, page, pageSize, hasMore } com PessoaResumo que atendem à busca e ao filtro.
   */
  'inicio.pessoas.qryBuscarPessoas': {
    kind: 'qry';
    input: { busca?: string; somentePendentes?: boolean; page: number; pageSize: number };
    output: { pessoas: { items: PessoaResumo[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['prepararSomenteResponsavel', 'acessoCompletoDadosMinimos'];
    access: { actors: ['responsavel']; grants: ['responsavelPreparaEmpresa', 'responsavelContatosEmpresa', 'responsavelAcompanhaPessoas']; scope: 'organization' };
  };
  /**
   * Finalidade: Abre o cadastro da pessoa escolhida para o responsável conferir se é a pessoa certa e o que ainda falta.
   * Entrada: pessoaId: id da pessoa escolhida na lista ou nos pedidos de liberação.
   * Processamento: Só o responsável, e só para pessoas da sua organização (prepararSomenteResponsavel). Lê a pessoa por id, seus canais ligados por HasContact e a empresa ligada por AssignedTo. Calcula na leitura consentimentoExigido (país Brasil ou UE), acessoCompleto e dadosFaltantes conforme acessoCompletoDadosMinimos. Não expõe o consentimento de privacidade, negado pelo grant.
   * Saída: pessoa: PessoaDetalhe com a situação do acesso, o que falta, a exigência de consentimento, os contatos e o nome da empresa.
   */
  'inicio.pessoas.qryDetalhePessoa': {
    kind: 'qry';
    input: { pessoaId: string };
    output: { pessoa: PessoaDetalhe };
    rules: ['prepararSomenteResponsavel', 'acessoCompletoDadosMinimos'];
    access: { actors: ['responsavel']; grants: ['responsavelPreparaEmpresa', 'responsavelContatosEmpresa', 'responsavelAcompanhaPessoas']; scope: 'organization' };
  };
  /**
   * Finalidade: Convida uma pessoa pelo e-mail com o convite da plataforma, seja uma pessoa nova ou a pessoa certa de um pedido de liberação.
   * Entrada: contato.details.contactChannel.value: e-mail para o convite e login; details.identification.name: nome da pessoa; details.identification.countryCode: país (ISO 3166-1 alfa-2).
   * Processamento: Recusa quem não é o responsável (prepararSomenteResponsavel). Procura pessoa já ligada ao e-mail; se existe, usa esse cadastro e só anexa o papel, sem criar outra pessoa nem outro vínculo (semDuplicarPessoaAoRepetir, register.createOrAttach); se não existe, cadastra com nome e país e liga à empresa da organização do responsável. Dispara o convite da plataforma (invite.login), que liga o login à pessoa e libera o acesso de quem pediu (liberacaoPeloResponsavel); o módulo não guarda convites nem pendências (conviteDaPlataformaSemGuardar). Não concede papéis de módulos (preencherDadosNaoDaPermissao). acessoCompleto e dadosFaltantes são calculados na leitura, não gravados.
   * Saída: pessoa: PessoaResumo da pessoa convidada (nova ou existente), no estado atual, com a situação do acesso calculada.
   */
  'inicio.pessoas.cmdEnviarConvite': {
    kind: 'cmd';
    writes: 'PessoaOrganizacao.create';
    input: { contato: { details: { contactChannel: { value: string } } }; details: { identification: { name: string; countryCode: string } } };
    output: { pessoa: PessoaResumo };
    rules: ['prepararSomenteResponsavel', 'conviteDaPlataformaSemGuardar', 'semDuplicarPessoaAoRepetir', 'liberacaoPeloResponsavel', 'preencherDadosNaoDaPermissao', 'acessoCompletoDadosMinimos'];
    access: { actors: ['responsavel']; grants: ['responsavelPreparaEmpresa', 'responsavelContatosEmpresa', 'responsavelAcompanhaPessoas']; scope: 'organization' };
  };
}

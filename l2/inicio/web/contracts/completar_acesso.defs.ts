/// <mls fileReference="_102047_/l2/inicio/web/contracts/completar_acesso.defs.ts" enhancement="_blank"/>

/** Identificação do cadastro mestre da pessoa da organização. */
export interface PessoaIdentificacao {
  name?: string;
  countryCode?: string;
  readonly status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
  readonly tags: string[];
  readonly updatedAt: string;
}

/** Resumo dos contatos e vínculos da pessoa, mantido pela plataforma. */
export interface PessoaBase {
  readonly contacts: string[];
  readonly relationshipRefs: string[];
}

/** Situação calculada do acesso da pessoa no módulo inicio. */
export interface PessoaInicio {
  readonly acessoCompleto: boolean;
  readonly dadosFaltantes: string[];
  readonly consentimentoExigido: boolean;
}

/** Detalhes do cadastro da pessoa: identificação, base e situação do acesso. */
export interface MeuCadastroDetalhes {
  identification: PessoaIdentificacao;
  base: PessoaBase;
  inicio: PessoaInicio;
}

/** Cadastro da pessoa da organização ligado ao e-mail da conta, com a situação calculada do acesso. */
export interface MeuCadastro {
  id: string;
  version: number;
  details: MeuCadastroDetalhes;
}

/** Nome pelo qual a empresa é reconhecida. */
export interface EmpresaIdentificacao {
  name: string;
}

/** Dados de pessoa jurídica da empresa visíveis à pessoa. */
export interface EmpresaCompany {
  tradeName?: string;
}

/** Resumo dos detalhes da empresa da organização. */
export interface EmpresaResumoDetalhes {
  identification: EmpresaIdentificacao;
  company: EmpresaCompany;
}

/** Resumo da empresa da organização: nome e nome fantasia. */
export interface EmpresaResumo {
  details: EmpresaResumoDetalhes;
}

export interface Completar_acessoContracts {
  /**
   * Finalidade: Carrega de uma vez a situação do acesso da pessoa logada: o próprio cadastro ligado ao e-mail da conta, o que falta, se o consentimento é exigido, se o e-mail está ligado ao cadastro e o resumo da empresa da organização.
   * Entrada: Nenhum. A pessoa é a autenticada, identificada pelo servidor.
   * Processamento: Localiza a pessoa pelo e-mail da conta (locate.byLogin); o e-mail nunca vem da página (emailContaNaoEditavel). Calcula na leitura, sem gravar: consentimentoExigido (país Brasil ou União Europeia), acessoCompleto (nome e país informados e consentimento válido quando exigido; telefone não conta — acessoCompletoDadosMinimos) e dadosFaltantes apenas com o que ainda falta (naoPedirDadoJaExistente). emailLigado é verdadeiro quando há cadastro e vínculo com a empresa nos relationshipRefs; quando falso, a pessoa deve aguardar a liberação do responsável pelo convite da plataforma e nada é criado nem guardado (liberacaoPeloResponsavel). acessoCompleto verdadeiro permite seguir direto aos módulos (acessoCompletoSegueDireto). Lê da empresa ligada só nome e nome fantasia (grant summaryOnly).
   * Saída: pessoa: o cadastro da pessoa com id, version, identificação, contatos, vínculos e situação calculada do acesso, ausente quando o e-mail não está ligado; emailLigado: se a plataforma ligou o e-mail ao cadastro; empresa: nome e nome fantasia da empresa da organização, quando houver vínculo.
   */
  'inicio.completar_acesso.obterMeuAcesso': {
    kind: 'qry';
    input: {};
    output: { pessoa?: MeuCadastro; readonly emailLigado: boolean; empresa?: EmpresaResumo };
    rules: ['acessoCompletoDadosMinimos', 'acessoCompletoSegueDireto', 'naoPedirDadoJaExistente', 'emailContaNaoEditavel', 'liberacaoPeloResponsavel', 'pessoaCadastradaPeloEmail'];
    access: { actors: ['pessoaOrganizacao']; grants: ['pessoaCompletaMeuAcesso', 'pessoaVeEmpresa']; scope: 'own' };
  };
  /**
   * Finalidade: Grava os dados mínimos que faltavam à pessoa logada e conclui o próprio acesso.
   * Entrada: id e version: cadastro da pessoa e versão lida, para concorrência otimista; details.identification.name: nome, quando faltava; details.identification.countryCode: país ISO 3166-1 alfa-2, quando faltava; details.person.privacyConsent: aceite do consentimento de privacidade, enviado quando o país exige.
   * Processamento: Confere que o id é o cadastro da pessoa autenticada e que a versão está atual. Grava só os campos que faltavam, sem sobrescrever o que a plataforma já tem (naoPedirDadoJaExistente). Recusa se o país for Brasil ou União Europeia e o consentimento não vier (acessoCompletoDadosMinimos). Não altera o e-mail da conta (emailContaNaoEditavel), não cria outra pessoa nem outro vínculo ao repetir (semDuplicarPessoaAoRepetir) e não concede papéis nem permissões (preencherDadosNaoDaPermissao). acessoCompleto, dadosFaltantes e consentimentoExigido são recalculados na leitura, nunca gravados.
   * Saída: pessoa: o cadastro da pessoa no novo estado, com a nova version e a situação do acesso recalculada.
   */
  'inicio.completar_acesso.concluirMeuAcesso': {
    kind: 'cmd';
    writes: 'PessoaOrganizacao.update';
    input: { id: string; version: number; details: { identification: { name?: string; countryCode?: string }; person: { privacyConsent?: string } } };
    output: { pessoa: MeuCadastro };
    rules: ['acessoCompletoDadosMinimos', 'naoPedirDadoJaExistente', 'preencherDadosNaoDaPermissao', 'emailContaNaoEditavel', 'semDuplicarPessoaAoRepetir'];
    access: { actors: ['pessoaOrganizacao']; grants: ['pessoaCompletaMeuAcesso', 'pessoaVeEmpresa']; scope: 'own' };
  };
}

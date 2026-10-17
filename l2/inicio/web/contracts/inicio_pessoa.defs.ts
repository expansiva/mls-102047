/// <mls fileReference="_102047_/l2/inicio/web/contracts/inicio_pessoa.defs.ts" enhancement="_blank"/>

/** Cadastro da pessoa da organização ligada à sessão, com a situação dos seus dados mínimos. */
export interface MeuAcesso {
  id: string;
  details: MeuAcessoDetalhes;
}

/** Detalhes do cadastro da pessoa: identificação e situação do acesso. */
export interface MeuAcessoDetalhes {
  identification: MeuAcessoIdentificacao;
  inicio: MeuAcessoInicio;
}

/** Identificação da pessoa na plataforma. */
export interface MeuAcessoIdentificacao {
  name?: string;
  countryCode?: string;
  readonly status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
}

/** Situação calculada do acesso da pessoa a partir dos dados mínimos. */
export interface MeuAcessoInicio {
  readonly acessoCompleto: boolean;
  readonly dadosFaltantes: string[];
  readonly consentimentoExigido: boolean;
}

/** Algo que espera pela pessoa para concluir o seu acesso: pedir a liberação ao responsável ou completar os dados mínimos. */
export interface PendenciaAcesso {
  readonly tipo: 'pedirLiberacao' | 'completarDadosMinimos';
  readonly emailConta?: string;
  details: {
    inicio: {
      readonly dadosFaltantes?: string[];
    };
  };
}

/** Empresa à qual a pessoa pertence, com os campos que a pessoa pode ver. */
export interface EmpresaDestaque {
  details: EmpresaDestaqueDetalhes;
}

/** Detalhes visíveis da empresa: nome e nome fantasia. */
export interface EmpresaDestaqueDetalhes {
  identification: EmpresaDestaqueIdentificacao;
  company: EmpresaDestaqueCompanhia;
}

/** Identificação visível da empresa. */
export interface EmpresaDestaqueIdentificacao {
  name: string;
}

/** Dados de pessoa jurídica visíveis da empresa. */
export interface EmpresaDestaqueCompanhia {
  tradeName?: string;
}

export interface Inicio_pessoaContracts {
  /**
   * Finalidade: Carrega de uma vez, ao abrir o Início da pessoa, a situação do seu acesso, as pendências que esperam por ela e a empresa à qual pertence.
   * Entrada: Nenhuma entrada: a pessoa é a da sessão, resolvida pela plataforma a partir do login (locate.byLogin).
   * Processamento: Lê o cadastro PessoaOrganizacao da pessoa logada (read.byId) e calcula, sem gravar, acessoCompleto, dadosFaltantes e consentimentoExigido (inicio.verificarAcessoCompleto). acessoCompletoDadosMinimos: completo quando há nome e país e, se o país for Brasil ou da União Europeia, consentimento de privacidade válido; telefone não conta. naoPedirDadoJaExistente: dadosFaltantes lista só o que a plataforma ainda não tem. Monta as pendências: ligacaoLoginPelaPlataforma — quando os contatos indicam que já existe outro cadastro com o mesmo e-mail e o login não está ligado, gera uma pendência ’pedirLiberacao’ com o e-mail da conta, sem guardar a pendência nem decidir a ligação; quando o login está ligado e o acesso não está completo, gera ’completarDadosMinimos’ com os dados que faltam. Se o acesso está completo e ligado, a lista vem vazia (seguirDiretoSeCompleto). emailContaNaoEditavel: o e-mail vem apenas para leitura, extraído dos contatos. Lê a empresa ligada por AssignedTo e devolve apenas nome e nome fantasia, conforme o grant pessoaVerEmpresa.
   * Saída: meuAcesso: o cadastro da pessoa com nome, país, situação na plataforma e os valores calculados de acesso completo, dados que faltam e consentimento exigido. pendencias: lista curta, não paginada, das pendências da pessoa com tipo, e-mail da conta e dados faltantes. empresa: nome e nome fantasia da empresa da pessoa.
   */
  'inicio.inicio_pessoa.qryInicioPessoa': {
    kind: 'qry';
    input: {};
    output: { meuAcesso: MeuAcesso; pendencias: PendenciaAcesso[]; empresa?: EmpresaDestaque };
    rules: ['acessoCompletoDadosMinimos', 'ligacaoLoginPelaPlataforma', 'naoPedirDadoJaExistente', 'emailContaNaoEditavel', 'seguirDiretoSeCompleto'];
    access: { actors: ['pessoaOrganizacao']; grants: ['pessoaCompletarMeuAcesso', 'pessoaVerEmpresa']; scope: 'own' };
  };
}

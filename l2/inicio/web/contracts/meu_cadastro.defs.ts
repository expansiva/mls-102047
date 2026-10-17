/// <mls fileReference="_102047_/l2/inicio/web/contracts/meu_cadastro.defs.ts" enhancement="_blank"/>

/** A empresa da organização à qual a pessoa está ligada, com o nome que a pessoa pode ver. */
export interface EmpresaDaPessoa {
  details: {
    identification: {
      name: string;
    };
  };
}

/** O cadastro da própria pessoa na organização, com a situação do acesso, os dados mínimos que faltam, os contatos, os vínculos e a empresa a que pertence. */
export interface MeuCadastro {
  id: string;
  version: number;
  details: {
    identification: {
      name?: string;
      countryCode?: string;
      readonly status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
    };
    base: {
      readonly contacts: string;
      readonly relationshipRefs: string;
    };
    inicio: {
      readonly acessoCompleto: boolean;
      readonly dadosFaltantes: string;
      readonly consentimentoExigido: boolean;
    };
  };
  readonly aguardaLiberacao: boolean;
  empresa: EmpresaDaPessoa;
}

export interface Meu_cadastroContracts {
  /**
   * Finalidade: Carrega, em uma só chamada, o cadastro da pessoa logada na organização com a situação do acesso, o que falta, o aviso de liberação e o andamento do pedido.
   * Entrada: Nenhuma entrada: a pessoa é a da sessão, resolvida pela plataforma (locate.byLogin).
   * Processamento: Lê o PessoaOrganizacao da sessão (read.byId) e o nome da Empresa ligada por AssignedTo. Calcula, sem gravar, acessoCompleto, dadosFaltantes e consentimentoExigido conforme acessoCompletoDadosMinimos (nome e país, e consentimento válido se o país for Brasil ou União Europeia; telefone não conta) e naoPedirDadoJaExistente (só lista o que a plataforma ainda não tem). Calcula aguardaLiberacao a partir da situação, dos contatos e dos vínculos quando já existe outro cadastro com o mesmo e-mail, sem guardar pendência nem decidir a ligação (ligacaoLoginPelaPlataforma); como é recalculado a cada leitura, o aviso persiste em outro navegador (repetirNaoDuplicaPessoa). O e-mail da conta vem nos contatos apenas para exibição (emailContaNaoEditavel). acessoCompleto verdadeiro indica que a pessoa pode seguir direto aos módulos (seguirDiretoSeCompleto).
   * Saída: meuCadastro: o cadastro atual da pessoa com id, versão, nome, país, situação, contatos, vínculos, acesso completo, dados que faltam, consentimento exigido, indicador de aguardar liberação e o nome da empresa.
   */
  'inicio.meu_cadastro.qryMeuCadastro': {
    kind: 'qry';
    input: {};
    output: { meuCadastro: MeuCadastro };
    rules: ['acessoCompletoDadosMinimos', 'naoPedirDadoJaExistente', 'ligacaoLoginPelaPlataforma', 'seguirDiretoSeCompleto', 'repetirNaoDuplicaPessoa', 'emailContaNaoEditavel'];
    access: { actors: ['pessoaOrganizacao', 'responsavel']; grants: ['responsavelPrepararEmpresa', 'responsavelAcompanharPessoas', 'responsavelMeuAcesso', 'pessoaCompletarMeuAcesso', 'pessoaVerEmpresa']; scope: 'organization' };
  };
  /**
   * Finalidade: Grava no próprio cadastro da pessoa logada os dados mínimos que faltavam.
   * Entrada: id e version: o cadastro da pessoa e a versão lida, para concorrência otimista. details.identification.name: nome, quando faltava. details.identification.countryCode: país ISO 3166-1 alfa-2, quando faltava. details.person.privacyConsent: consentimento de privacidade, enviado quando o país exige (Brasil ou União Europeia).
   * Processamento: Recusa se o id não for o cadastro da pessoa da sessão ou se a versão estiver desatualizada. Atualiza pelo PessoaOrganizacao.update apenas os campos ainda vazios, sem sobrescrever o que a plataforma já tem (naoPedirDadoJaExistente). Recusa qualquer alteração do e-mail da conta (emailContaNaoEditavel). Exige consentimento quando o país informado ou existente é Brasil ou União Europeia (acessoCompletoDadosMinimos). É idempotente: repetir o envio atualiza o mesmo cadastro e nunca cria outra pessoa nem outro vínculo (repetirNaoDuplicaPessoa). Não concede papéis nem permissões (dadosNaoConcedemPermissoes). acessoCompleto, dadosFaltantes e consentimentoExigido são recalculados, nunca gravados.
   * Saída: meuCadastro: o cadastro da pessoa no novo estado, com a nova versão, o acesso completo e os dados que ainda faltam recalculados, contatos, vínculos, aviso de liberação e nome da empresa.
   */
  'inicio.meu_cadastro.salvarMeusDados': {
    kind: 'cmd';
    writes: 'PessoaOrganizacao.update';
    input: { id: string; version: number; details: { identification: { name?: string; countryCode?: string }; person: { privacyConsent?: string } } };
    output: { meuCadastro: MeuCadastro };
    rules: ['acessoCompletoDadosMinimos', 'naoPedirDadoJaExistente', 'emailContaNaoEditavel', 'repetirNaoDuplicaPessoa', 'dadosNaoConcedemPermissoes'];
    access: { actors: ['pessoaOrganizacao', 'responsavel']; grants: ['responsavelPrepararEmpresa', 'responsavelAcompanharPessoas', 'responsavelMeuAcesso', 'pessoaCompletarMeuAcesso', 'pessoaVerEmpresa']; scope: 'organization' };
  };
}

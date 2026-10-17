/// <mls fileReference="_102047_/l2/inicio/web/contracts/painel.defs.ts" enhancement="_blank"/>

/** Situação de preparo da empresa da organização: nome, se está preparada e os dados obrigatórios que ainda faltam. */
export interface EmpresaSituacao {
  id: string;
  details: {
    identification: {
      name: string;
    };
    inicio: {
      readonly preparada: boolean;
      readonly dadosFaltantes: string;
    };
  };
}

/** Pessoa da organização que ainda não completou o acesso, com o que lhe falta e se o consentimento é exigido. */
export interface PessoaPendente {
  id: string;
  details: {
    identification: {
      name: string;
    };
    inicio: {
      readonly acessoCompleto: boolean;
      readonly dadosFaltantes: string;
      readonly consentimentoExigido: boolean;
    };
  };
}

/** Andamento dos acessos das pessoas da organização: contagens já calculadas e as pessoas que ainda têm pendência. */
export interface AcessosResumo {
  readonly totalPessoas: number;
  readonly acessosCompletos: number;
  readonly acessosPendentes: number;
  readonly consentimentosPendentes: number;
  pessoasPendentes: PessoaPendente[];
}

/** Canal de contato (telefone, WhatsApp ou e-mail) ligado a uma pessoa da organização. */
export interface CanalContato {
  id: string;
  details: {
    contactChannel: {
      contactType: 'Phone' | 'Email' | 'WhatsApp';
      value: string;
    };
  };
}

/** Pessoa da organização cujo e-mail a plataforma não ligou sozinha ao cadastro, com nome, país, canais de contato e situação do acesso. */
export interface PedidoLiberacao {
  id: string;
  version: number;
  details: {
    identification: {
      name: string;
      countryCode: string;
      readonly updatedAt: string;
    };
    inicio: {
      readonly acessoCompleto: boolean;
    };
  };
  readonly quantidadeContatos: number;
  contacts: CanalContato[];
}

export interface PainelContracts {
  /**
   * Finalidade: Carrega, numa só chamada ao abrir o painel, a situação de preparo da empresa da organização e o resumo dos acessos das pessoas.
   * Entrada: Sem entrada: a organização e o responsável vêm da sessão autenticada.
   * Processamento: Recusa quem não é o responsável reconhecido pela plataforma (prepararSomenteResponsavel, responsavelReconhecidoPelaPlataforma). Lê a empresa da organização e calcula na leitura preparada e dadosFaltantes a partir de nome, documento (tipo e número), endereço e contato (empresaPreparadaComDadosObrigatorios), listando só o que falta (naoPedirDadoJaExistente). Lista as pessoas com o papel inicio.PessoaOrganizacao e calcula para cada uma acessoCompleto, dadosFaltantes e consentimentoExigido (acessoCompletoDadosMinimos: nome, país e consentimento quando BR/UE; telefone não conta). Conta total de pessoas, acessos completos, pendentes e consentimentos pendentes. As pessoas pendentes vêm ordenadas pela atualização mais recente, limitadas às primeiras 5. Nada é gravado.
   * Saída: empresa: id, nome, preparada e dados faltantes. acessos: contagens já calculadas e a lista curta das pessoas com pendência, com o que falta e se o consentimento é exigido.
   */
  'inicio.painel.obterPainel': {
    kind: 'qry';
    input: {};
    output: { empresa: EmpresaSituacao; acessos: AcessosResumo };
    rules: ['prepararSomenteResponsavel', 'responsavelReconhecidoPelaPlataforma', 'empresaPreparadaComDadosObrigatorios', 'naoPedirDadoJaExistente', 'acessoCompletoDadosMinimos'];
    access: { actors: ['responsavel']; grants: ['responsavelPreparaEmpresa', 'responsavelContatosEmpresa', 'responsavelAcompanhaPessoas']; scope: 'organization' };
  };
  /**
   * Finalidade: Lista, paginada, as pessoas da organização que aguardam a liberação do acesso pelo responsável, com busca pelo nome para localizar a pessoa certa.
   * Entrada: busca: trecho do nome da pessoa (opcional). page e pageSize: página pedida e tamanho da página.
   * Processamento: Só o responsável consulta (prepararSomenteResponsavel). Seleciona as pessoas da organização cujo e-mail a plataforma não ligou sozinha ao cadastro e cujo acesso ainda não está completo (liberacaoPeloResponsavel; o módulo não guarda essa pendência, ela é deduzida da plataforma). acessoCompleto é calculado na leitura (acessoCompletoDadosMinimos). Filtra pelo nome quando há busca e ordena pela atualização mais recente. A partir do resumo de contatos da pessoa (base.contacts) junta os canais ligados por HasContact com tipo e valor e conta quantos são. Não devolve o consentimento de privacidade.
   * Saída: pedidos: página de pessoas com id, versão, nome, país, atualizada em, quantidade de contatos, canais de contato (tipo e valor) e acesso completo, no formato { items, page, pageSize, hasMore }.
   */
  'inicio.painel.listarPedidosLiberacao': {
    kind: 'qry';
    input: { busca?: string; page: number; pageSize: number };
    output: { pedidos: { items: PedidoLiberacao[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['prepararSomenteResponsavel', 'liberacaoPeloResponsavel', 'acessoCompletoDadosMinimos'];
    access: { actors: ['responsavel']; grants: ['responsavelPreparaEmpresa', 'responsavelContatosEmpresa', 'responsavelAcompanhaPessoas']; scope: 'organization' };
  };
  /**
   * Finalidade: Convida a pessoa certa pelo convite da plataforma, ligando o e-mail ao cadastro existente sem criar uma segunda pessoa.
   * Entrada: id: cadastro existente conferido pelo responsável (quando há). empresa.id: empresa da organização à qual a pessoa é ligada. details.identification.name e details.identification.countryCode: nome e país confirmados do cadastro. contato.details.contactChannel.value: e-mail para onde vai o convite da plataforma.
   * Processamento: Recusa quem não é o responsável (prepararSomenteResponsavel). Usa register.createOrAttach: se já existe a pessoa (pelo id ou pelo e-mail) só anexa o papel inicio.PessoaOrganizacao e confirma nome e país; senão cadastra — repetir não cria outra pessoa nem outro vínculo (semDuplicarPessoaAoRepetir), nem outro canal de e-mail (contatoSemDuplicarAoRepetir). Liga a pessoa à empresa (AssignedTo) sem duplicar o vínculo. Dispara invite.login da plataforma, que liga o login ao cadastro (liberacaoPeloResponsavel, emailContaNaoEditavel); o módulo não guarda o convite (conviteDaPlataformaSemGuardar). Não concede papéis nem permissões de módulos (preencherDadosNaoDaPermissao). acessoCompleto e a quantidade de contatos são calculados na leitura, nunca gravados.
   * Saída: pedido: o cadastro da pessoa no novo estado, com id, versão, nome, país, atualizada em, quantidade e canais de contato e acesso completo calculado.
   */
  'inicio.painel.convidarPessoaCerta': {
    kind: 'cmd';
    writes: 'PessoaOrganizacao.create';
    input: { id?: string; empresa: { id: string }; details: { identification: { name: string; countryCode: string } }; contato: { details: { contactChannel: { value: string } } } };
    output: { pedido: PedidoLiberacao };
    rules: ['prepararSomenteResponsavel', 'liberacaoPeloResponsavel', 'conviteDaPlataformaSemGuardar', 'semDuplicarPessoaAoRepetir', 'contatoSemDuplicarAoRepetir', 'emailContaNaoEditavel', 'preencherDadosNaoDaPermissao'];
    access: { actors: ['responsavel']; grants: ['responsavelPreparaEmpresa', 'responsavelContatosEmpresa', 'responsavelAcompanhaPessoas']; scope: 'organization' };
  };
}

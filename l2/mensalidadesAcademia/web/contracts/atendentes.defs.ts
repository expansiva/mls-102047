/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/contracts/atendentes.defs.ts" enhancement="_blank"/>

/** Linha da lista da equipe da recepção. */
export interface AtendenteResumo {
  id: string;
  details: {
    identification: {
      name: string;
      docType?: 'CPF' | 'Passport' | 'NationalId' | 'Other';
      docId?: string;
    };
    base: {
      aliases: string;
    };
  };
  readonly status: string;
}

/** Cadastro completo do atendente aberto no formulário. */
export interface AtendenteDetalhe {
  id: string;
  version: number;
  details: {
    identification: {
      name: string;
      docType?: 'CPF' | 'Passport' | 'NationalId' | 'Other';
      docId?: string;
      countryCode: string;
    };
    base: {
      aliases: string;
      readonly contacts: string;
    };
    person: {
      privacyConsent?: string;
    };
  };
  readonly status: string;
}

export interface AtendentesContracts {
  /**
   * Finalidade: Carrega, ao abrir a página, a equipe da recepção da academia para a gerência revisar.
   * Entrada: busca: trecho opcional do nome para filtrar a equipe (locate.byName).
   * Processamento: Lista os registros de Recepcao da organização (pessoas com papel de recepção), ativos e inativos, filtrando pelo nome quando houver busca, ordenados por nome. A situação no cadastro é derivada pelo cadastro mestre e apenas lida, devolvida como rótulo (ativo/inativo). A equipe é pequena, por isso a lista não é paginada.
   * Saída: Lista de atendentes com id, nome, apelidos, tipo e número do documento e situação, que a lista mostra e usa para abrir o cadastro.
   */
  'mensalidadesAcademia.atendentes.listarEquipeRecepcao': {
    kind: 'qry';
    input: { busca?: string };
    output: { atendentes: AtendenteResumo[] };
    rules: [];
    access: { actors: ['gerencia']; grants: ['gerenciaAtendentes']; scope: 'organization' };
  };
  /**
   * Finalidade: Abre no formulário o cadastro completo do atendente escolhido na lista.
   * Entrada: id: identificador do atendente selecionado.
   * Processamento: Lê o atendente pelo id (read.byId) dentro da organização. Contatos (resumo textual dos canais vinculados) e situação são derivados pelo servidor e apenas lidos.
   * Saída: Cadastro completo com versão, contatos e consentimento, para o formulário exibir e enviar na atualização.
   */
  'mensalidadesAcademia.atendentes.obterAtendente': {
    kind: 'qry';
    input: { id: string };
    output: { atendente: AtendenteDetalhe };
    rules: [];
    access: { actors: ['gerencia']; grants: ['gerenciaAtendentes']; scope: 'organization' };
  };
  /**
   * Finalidade: Inclui um novo atendente na equipe da recepção sem duplicar pessoas.
   * Entrada: name, aliases, docType, docId, countryCode e privacyConsent (consentimento LGPD dado ou não) preenchidos no formulário em branco.
   * Processamento: Antes de gravar, localiza a pessoa pelo documento (locate.byDocument); se já existir no cadastro mestre, anexa o papel de recepção em vez de criar outra (register.createOrAttach). Valida o formato do documento conforme o tipo e o país, exige consentimento de privacidade para pessoas do Brasil e da UE e recusa campos de namespace alheio. Subtipo, situação, contatos, id e versão são definidos pelo servidor.
   * Saída: O atendente gravado completo, para o formulário passar ao modo de atualização e a lista inserir a nova pessoa sem nova chamada.
   */
  'mensalidadesAcademia.atendentes.cadastrarAtendente': {
    kind: 'cmd';
    writes: 'Recepcao.create';
    input: { details: { identification: { name: string; docType?: 'CPF' | 'Passport' | 'NationalId' | 'Other'; docId?: string; countryCode: string }; base: { aliases: string }; person: { privacyConsent?: string } } };
    output: { atendente: AtendenteDetalhe };
    rules: [];
    access: { actors: ['gerencia']; grants: ['gerenciaAtendentes']; scope: 'organization' };
  };
  /**
   * Finalidade: Atualiza o cadastro de um atendente que já está na equipe.
   * Entrada: id e version do atendente aberto (concorrência otimista); name, aliases, docType, docId, countryCode e privacyConsent editados.
   * Processamento: Recusa se a versão não for a atual. Valida o formato do documento conforme o tipo e o país, exige consentimento de privacidade para Brasil e UE, recusa campos de namespace alheio e impede documento já usado por outra pessoa. Situação e contatos não são alterados aqui (derivados).
   * Saída: O atendente atualizado com a nova versão, para o formulário e a linha da lista se redesenharem sem nova chamada.
   */
  'mensalidadesAcademia.atendentes.salvarAtendente': {
    kind: 'cmd';
    writes: 'Recepcao.update';
    input: { id: string; version: number; details: { identification: { name: string; docType?: 'CPF' | 'Passport' | 'NationalId' | 'Other'; docId?: string; countryCode: string }; base: { aliases: string }; person: { privacyConsent?: string } } };
    output: { atendente: AtendenteDetalhe };
    rules: [];
    access: { actors: ['gerencia']; grants: ['gerenciaAtendentes']; scope: 'organization' };
  };
}

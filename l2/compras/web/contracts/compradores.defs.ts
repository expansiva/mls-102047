/// <mls fileReference="_102047_/l2/compras/web/contracts/compradores.defs.ts" enhancement="_blank"/>

/** Dados de identificação do comprador exibidos na lista e no formulário. */
export interface CompradorIdentificacao {
  details: {
    identification: {
      name: string;
      docType?: 'CPF' | 'Passport' | 'NationalId' | 'Other';
      docId?: string;
      countryCode: string;
      readonly status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
    };
  };
}

/** Detalhes do comprador mostrados em cada linha da lista. */
export interface CompradorListaDetails {
  identification: CompradorIdentificacao;
}

/** Linha da lista de compradores. */
export interface CompradorListaItem {
  id: string;
  details: CompradorListaDetails;
}

/** Dados de pessoa física do comprador. */
export interface CompradorPessoa {
  details: {
    person: {
      privacyConsent?: string;
    };
  };
}

/** Detalhes do comprador carregados no formulário. */
export interface CompradorFichaDetails {
  identification: CompradorIdentificacao;
  person: CompradorPessoa;
}

/** Comprador completo para edição no formulário, com versão para concorrência otimista. */
export interface CompradorFicha {
  id: string;
  version: number;
  details: CompradorFichaDetails;
}

export interface CompradoresContracts {
  /**
   * Finalidade: Lista os compradores da organização para o gerente de compras localizar quem está ativo e escolher quem alterar.
   * Entrada: busca: trecho do nome (ou número do documento) digitado para localizar o comprador; status: filtro opcional pela situação; page e pageSize: paginação da lista.
   * Processamento: Filtra pelo escopo da organização (grant gerenteCadastros), aplica a busca por nome (locate.byName) ou documento (locate.byDocument) e o filtro de situação, ordena por nome e pagina. A situação é campo derivado mantido pela plataforma, apenas lido.
   * Saída: Página de compradores com id, nome, tipo e número do documento, país e situação, no formato { items, page, pageSize, hasMore }; a busca substitui a lista e a próxima página é anexada.
   */
  'compras.compradores.listarCompradores': {
    kind: 'qry';
    input: { busca?: string; details: { identification: { status?: 'Active' | 'Inactive' | 'Merged' | 'Blocked' } }; page: number; pageSize: number };
    output: { compradores: { items: CompradorListaItem[]; page: number; pageSize: number; hasMore: boolean } };
    rules: [];
    access: { actors: ['gerenteCompras']; grants: ['gerenteCadastros']; scope: 'organization' };
  };
  /**
   * Finalidade: Carrega os dados do comprador escolhido na lista para alteração no formulário.
   * Entrada: id: identificador do comprador selecionado na lista.
   * Processamento: Lê o comprador pelo id (read.byId) dentro do escopo da organização e devolve identificação, consentimento de privacidade e a versão atual para concorrência otimista.
   * Saída: Ficha do comprador com id, versão, nome, documento, país, situação e consentimento de privacidade, que preenche o formulário.
   */
  'compras.compradores.obterComprador': {
    kind: 'qry';
    input: { id: string };
    output: { comprador: CompradorFicha };
    rules: [];
    access: { actors: ['gerenteCompras']; grants: ['gerenteCadastros']; scope: 'organization' };
  };
  /**
   * Finalidade: Cadastra um novo comprador na organização.
   * Entrada: name: nome do comprador; docType e docId: tipo e número do documento nacional; countryCode: país ISO 3166-1 alfa-2; privacyConsent: consentimento LGPD, exigido para residentes no Brasil.
   * Processamento: Valida o formato do documento conforme o país, localiza a pessoa pelo documento para evitar duplicidade (locate.byDocument) e cria a pessoa ou anexa o papel compras.Comprador (register.createOrAttach). Recusa sem consentimento de privacidade quando o país exige (Brasil). id, versão, situação e datas são calculados pela plataforma, nunca gravados pelo endpoint.
   * Saída: O comprador criado, com id, versão e situação, para o formulário passar ao modo de alteração e a lista inseri-lo sem nova consulta.
   */
  'compras.compradores.cadastrarComprador': {
    kind: 'cmd';
    writes: 'Comprador.create';
    input: { details: { identification: { name: string; docType?: 'CPF' | 'Passport' | 'NationalId' | 'Other'; docId?: string; countryCode: string }; person: { privacyConsent?: string } } };
    output: { comprador: CompradorFicha };
    rules: [];
    access: { actors: ['gerenteCompras']; grants: ['gerenteCadastros']; scope: 'organization' };
  };
  /**
   * Finalidade: Salva as alterações de nome, documento, país e consentimento do comprador escolhido.
   * Entrada: id e version: comprador alterado e versão lida, para concorrência otimista; name, docType, docId, countryCode, privacyConsent: novos valores editados.
   * Processamento: Confere a versão (recusa se o registro mudou), valida o formato do documento conforme o país, impede duplicidade de documento com outra pessoa e exige consentimento de privacidade para residentes no Brasil; grava pelo registro mestre (edit.platformFields). Versão e situação são calculadas pela plataforma.
   * Saída: O comprador atualizado com a nova versão, para redesenhar o formulário e atualizar a linha na lista sem nova consulta.
   */
  'compras.compradores.salvarAlteracaoComprador': {
    kind: 'cmd';
    writes: 'Comprador.update';
    input: { id: string; version: number; details: { identification: { name: string; docType?: 'CPF' | 'Passport' | 'NationalId' | 'Other'; docId?: string; countryCode: string }; person: { privacyConsent?: string } } };
    output: { comprador: CompradorFicha };
    rules: [];
    access: { actors: ['gerenteCompras']; grants: ['gerenteCadastros']; scope: 'organization' };
  };
}

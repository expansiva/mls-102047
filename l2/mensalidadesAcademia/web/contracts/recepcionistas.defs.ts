/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/contracts/recepcionistas.defs.ts" enhancement="_blank"/>

/** Registro da recepcionista no formato usado pela lista e pelo formulário. */
export interface Recepcionista {
  id: string;
  version: number;
  details: RecepcionistaDetalhes;
}

/** Detalhes da recepcionista, aninhados como na ontologia. */
export interface RecepcionistaDetalhes {
  identification: RecepcionistaIdentificacao;
  base: RecepcionistaBase;
  person: RecepcionistaPessoa;
}

/** Identificação da recepcionista. */
export interface RecepcionistaIdentificacao {
  details: {
    identification: {
      name: string;
      readonly status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
      docType?: 'CPF' | 'Passport' | 'NationalId' | 'Other';
      docId?: string;
      countryCode: string;
    };
  };
}

/** Dados base da recepcionista. */
export interface RecepcionistaBase {
  details: {
    base: {
      aliases: string;
    };
  };
}

/** Dados de pessoa física da recepcionista. */
export interface RecepcionistaPessoa {
  details: {
    person: {
      privacyConsent?: string;
    };
  };
}

export interface RecepcionistasContracts {
  /**
   * Finalidade: Carrega a equipe da recepção da academia já no formato que a lista e o formulário usam, permitindo filtrar pelo nome.
   * Entrada: busca: trecho do nome digitado pela gerência (opcional); vazio traz toda a equipe.
   * Processamento: Lê as recepcionistas da organização (papel mensalidadesAcademia.Recepcionista), aplicando locate.byName quando há busca, ordenadas pelo nome. A situação (status) é derivada pela plataforma e apenas lida. O consentimento de privacidade (objeto da plataforma) é serializado como JSON em texto. Lista não paginada: a equipe da recepção cabe em uma tela.
   * Saída: recepcionistas: cada uma com id, version, nome, tipo e número do documento, país, situação, outros nomes e consentimento de privacidade, para que a escolha de uma linha abra o formulário sem nova chamada.
   */
  'mensalidadesAcademia.recepcionistas.listarRecepcionistas': {
    kind: 'qry';
    input: { busca?: string };
    output: { recepcionistas: Recepcionista[] };
    rules: [];
    access: { actors: ['gerencia']; grants: ['gerenciaRecepcionistas']; scope: 'organization' };
  };
  /**
   * Finalidade: Cadastra uma nova recepcionista na equipe da academia.
   * Entrada: name: nome exibido nas matrículas; docType e docId: documento para evitar duplicidade; countryCode: país (ISO alfa-2); aliases: outros nomes; privacyConsent: consentimento LGPD, objeto da plataforma serializado em JSON.
   * Processamento: Usa register.createOrAttach: localiza pelo documento (locate.byDocument) e reaproveita o cadastro mestre existente ou cria um novo, marcando o papel de recepcionista. Desserializa privacyConsent para o objeto da plataforma. A plataforma valida o formato do documento e exige consentimento de privacidade para BR/UE. id, version, status e datas são gerados pela plataforma, nunca gravados pelo endpoint.
   * Saída: recepcionista: o registro salvo, inserido na lista e aberto no formulário sem nova consulta.
   */
  'mensalidadesAcademia.recepcionistas.cadastrarRecepcionista': {
    kind: 'cmd';
    writes: 'Recepcionista.create';
    input: { details: { identification: { name: string; docType?: 'CPF' | 'Passport' | 'NationalId' | 'Other'; docId?: string; countryCode: string }; base: { aliases: string }; person: { privacyConsent?: string } } };
    output: { recepcionista: Recepcionista };
    rules: [];
    access: { actors: ['gerencia']; grants: ['gerenciaRecepcionistas']; scope: 'organization' };
  };
  /**
   * Finalidade: Atualiza os dados de uma recepcionista escolhida na lista.
   * Entrada: id e version: recepcionista e versão lida (concorrência otimista); demais campos: nome, documento, país, outros nomes e consentimento LGPD (objeto serializado em JSON) editados.
   * Processamento: Usa edit.platformFields; recusa se a versão não for a atual. Desserializa privacyConsent para o objeto da plataforma. A plataforma valida o formato do documento e o consentimento obrigatório para BR/UE. A situação e as datas são derivadas, não gravadas pelo endpoint.
   * Saída: recepcionista: o registro atualizado com a nova versão, substituído na lista e no formulário sem nova consulta.
   */
  'mensalidadesAcademia.recepcionistas.atualizarRecepcionista': {
    kind: 'cmd';
    writes: 'Recepcionista.update';
    input: { id: string; version: number; details: { identification: { name: string; docType?: 'CPF' | 'Passport' | 'NationalId' | 'Other'; docId?: string; countryCode: string }; base: { aliases: string }; person: { privacyConsent?: string } } };
    output: { recepcionista: Recepcionista };
    rules: [];
    access: { actors: ['gerencia']; grants: ['gerenciaRecepcionistas']; scope: 'organization' };
  };
}

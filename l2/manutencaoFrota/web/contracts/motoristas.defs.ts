/// <mls fileReference="_102047_/l2/manutencaoFrota/web/contracts/motoristas.defs.ts" enhancement="_blank"/>

/** Identificação do motorista mostrada na linha da lista. */
export interface MotoristaResumoIdentification {
  details: {
    identification: {
      name: string;
      docId: string;
      readonly status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
      readonly updatedAt: string;
    };
  };
}

/** Detalhes do motorista na linha da lista. */
export interface MotoristaResumoDetails {
  identification: MotoristaResumoIdentification;
}

/** Linha da lista de motoristas: nome, CPF, situação e última atualização. */
export interface MotoristaResumo {
  id: string;
  details: MotoristaResumoDetails;
}

/** Identificação editável do motorista no formulário. */
export interface MotoristaFichaIdentification {
  details: {
    identification: {
      name: string;
      docType: 'CPF';
      docId: string;
      countryCode: string;
      readonly status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
    };
  };
}

/** Dados base do motorista no formulário. */
export interface MotoristaFichaBase {
  details: {
    base: {
      aliases: string;
    };
  };
}

/** Dados de pessoa física do motorista no formulário. */
export interface MotoristaFichaPerson {
  details: {
    person: {
      birthDate?: string;
    };
  };
}

/** Detalhes do motorista exibidos e editados no formulário. */
export interface MotoristaFichaDetails {
  identification: MotoristaFichaIdentification;
  base: MotoristaFichaBase;
  person: MotoristaFichaPerson;
}

/** Motorista completo para o formulário de cadastro/atualização, com versão para concorrência otimista. */
export interface MotoristaFicha {
  id: string;
  version: number;
  details: MotoristaFichaDetails;
}

export interface MotoristasContracts {
  /**
   * Finalidade: Carrega, ao abrir a página, os motoristas da transportadora com nome, CPF e situação do cadastro, para o gestor localizar quem precisa ser atualizado.
   * Entrada: search: texto opcional para filtrar por nome ou CPF; page e pageSize: página solicitada e tamanho da página.
   * Processamento: Lista os motoristas da organização (grant gestorCadastrosMestres), excluindo registros com status Merged; aplica o filtro por nome ou CPF quando informado; ordena por nome e pagina. status e updatedAt são lidos do cadastro mestre, nunca calculados ou gravados aqui.
   * Saída: Página de motoristas { items, page, pageSize, hasMore } com id, nome, CPF, situação e data da última atualização, já no formato da lista.
   */
  'manutencaoFrota.motoristas.listarMotoristas': {
    kind: 'qry';
    input: { search?: string; page: number; pageSize: number };
    output: { motoristas: { items: MotoristaResumo[]; page: number; pageSize: number; hasMore: boolean } };
    rules: [];
    access: { actors: ['gestor']; grants: ['gestorCadastrosMestres']; scope: 'organization' };
  };
  /**
   * Finalidade: Carrega os dados do motorista escolhido na lista para preencher o formulário de atualização.
   * Entrada: id: mdmId do motorista selecionado na lista.
   * Processamento: Lê o motorista pelo id (read.byId) dentro da organização e compõe a ficha com identificação, apelidos, data de nascimento e versão.
   * Saída: Ficha do motorista com id, versão, nome, tipo e número do documento, país, situação, data de nascimento e apelidos; a versão é usada no salvar.
   */
  'manutencaoFrota.motoristas.obterMotorista': {
    kind: 'qry';
    input: { id: string };
    output: { motorista: MotoristaFicha };
    rules: [];
    access: { actors: ['gestor']; grants: ['gestorCadastrosMestres']; scope: 'organization' };
  };
  /**
   * Finalidade: Cadastra um novo motorista ou, se a pessoa já existe pelo CPF, anexa o papel de motorista ao registro existente.
   * Entrada: name, docType, docId, countryCode, birthDate (opcional) e aliases digitados no formulário.
   * Processamento: Localiza pelo CPF (locate.byDocument) para evitar duplicidade e executa register.createOrAttach; valida o formato do documento conforme o país. id, versão, situação e datas de criação/atualização são gerados pela plataforma, não pelo endpoint.
   * Saída: Ficha do motorista gravado, com id e versão, para o formulário passar a exibir o registro salvo sem nova chamada.
   */
  'manutencaoFrota.motoristas.cadastrarMotorista': {
    kind: 'cmd';
    writes: 'Motorista.create';
    input: { details: { identification: { name: string; docType: 'CPF'; docId: string; countryCode: string }; person: { birthDate?: string }; base: { aliases: string } } };
    output: { motorista: MotoristaFicha };
    rules: [];
    access: { actors: ['gestor']; grants: ['gestorCadastrosMestres']; scope: 'organization' };
  };
  /**
   * Finalidade: Corrige os dados do motorista escolhido: nome, CPF, país, data de nascimento e apelidos.
   * Entrada: id e version do motorista carregado (concorrência otimista) e os campos editados no formulário.
   * Processamento: Recusa a gravação se a versão não for a atual; valida o formato do documento; aplica edit.platformFields. A versão e updatedAt são incrementados/atualizados pela plataforma, não pelo endpoint.
   * Saída: Ficha atualizada do motorista com a nova versão, para o formulário se redesenhar sem nova chamada.
   */
  'manutencaoFrota.motoristas.atualizarMotorista': {
    kind: 'cmd';
    writes: 'Motorista.update';
    input: { id: string; version: number; details: { identification: { name: string; docType: 'CPF'; docId: string; countryCode: string }; person: { birthDate?: string }; base: { aliases: string } } };
    output: { motorista: MotoristaFicha };
    rules: [];
    access: { actors: ['gestor']; grants: ['gestorCadastrosMestres']; scope: 'organization' };
  };
}

/// <mls fileReference="_102047_/l2/manutencaoFrota/web/contracts/oficinas.defs.ts" enhancement="_blank"/>

/** Identificação da oficina no cadastro mestre. */
export interface OficinaIdentificacao {
  details: {
    identification: {
      name: string;
      readonly status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
      docType?: 'CNPJ' | 'EIN' | 'VAT' | 'Other';
      docId?: string;
      countryCode: string;
    };
  };
}

/** Dados de pessoa jurídica da oficina. */
export interface OficinaEmpresa {
  details: {
    company: {
      companyKind: 'LegalEntity' | 'Branch' | 'Franchise';
      legalName: string;
      tradeName?: string;
    };
  };
}

/** Outros nomes, endereço, contatos e observações da oficina. */
export interface OficinaBase {
  details: {
    base: {
      aliases: string;
      addresses: string;
      readonly contacts: string;
      notes?: string;
    };
  };
}

/** Detalhes mostrados em cada linha da lista de oficinas. */
export interface OficinaResumoDetalhes {
  identification: OficinaIdentificacao;
  company: OficinaEmpresa;
}

/** Linha da lista de oficinas. */
export interface OficinaResumo {
  id: string;
  details: OficinaResumoDetalhes;
}

/** Detalhes completos da oficina para o formulário. */
export interface OficinaDetalhes {
  identification: OficinaIdentificacao;
  company: OficinaEmpresa;
  base: OficinaBase;
}

/** Oficina completa com id e versão, aberta no formulário e devolvida pelos comandos. */
export interface OficinaFicha {
  id: string;
  version: number;
  details: OficinaDetalhes;
}

export interface OficinasContracts {
  /**
   * Finalidade: Lista as oficinas da transportadora para o gestor localizar e escolher qual abrir no formulário; é chamada ao abrir a página e novamente ao buscar ou pedir a próxima página.
   * Entrada: busca: texto opcional comparado ao nome da oficina ou ao número do documento (CNPJ); page e pageSize: página solicitada e tamanho da página.
   * Processamento: Filtra as oficinas da organização do gestor (escopo organization). Com busca, localiza por nome (locate.byName) ou por documento (locate.byDocument), ignorando pontuação do CNPJ. Ordena por nome. A situação (status) é lida do cadastro mestre, nunca calculada aqui.
   * Saída: Página { items, page, pageSize, hasMore } de oficinas com id, nome, tipo e número do documento, situação, razão social e nome fantasia, já no formato das linhas da lista.
   */
  'manutencaoFrota.oficinas.listarOficinas': {
    kind: 'qry';
    input: { busca?: string; page: number; pageSize: number };
    output: { oficinas: { items: OficinaResumo[]; page: number; pageSize: number; hasMore: boolean } };
    rules: [];
    access: { actors: ['gestor']; grants: ['gestorCadastrosMestres']; scope: 'organization' };
  };
  /**
   * Finalidade: Carrega a ficha completa da oficina selecionada na lista para edição no formulário.
   * Entrada: id: identificador da oficina selecionada na lista.
   * Processamento: Lê a oficina pelo id (read.byId) dentro da organização do gestor e devolve identificação, dados de pessoa jurídica, outros nomes, endereço, contatos e observações. Contatos é um resumo derivado dos vínculos HasContact, apenas lido. Devolve a versão para controle de concorrência na atualização.
   * Saída: A oficina com id, versão e detalhes, para preencher o formulário.
   */
  'manutencaoFrota.oficinas.obterOficina': {
    kind: 'qry';
    input: { id: string };
    output: { oficina: OficinaFicha };
    rules: [];
    access: { actors: ['gestor']; grants: ['gestorCadastrosMestres']; scope: 'organization' };
  };
  /**
   * Finalidade: Cadastra uma nova oficina da frota (ou vincula uma empresa já existente com o papel de oficina).
   * Entrada: Nome, tipo e número do documento, país, tipo de organização, razão social, nome fantasia, outros nomes, endereço e observações informados no formulário.
   * Processamento: Antes de criar, procura empresa com o mesmo documento (locate.byDocument) para evitar duplicidade e, se existir, vincula-a (register.createOrAttach). Valida o formato do documento conforme o tipo e exige a razão social. O subtipo é sempre Company; id, versão e situação inicial são definidos pelo motor, nunca recebidos.
   * Saída: A oficina criada com id, versão e detalhes, para o formulário passar ao modo de atualização sem nova chamada.
   */
  'manutencaoFrota.oficinas.cadastrarOficina': {
    kind: 'cmd';
    writes: 'Oficina.create';
    input: { details: { identification: { name: string; docType?: 'CNPJ' | 'EIN' | 'VAT' | 'Other'; docId?: string; countryCode: string }; company: { companyKind: 'LegalEntity' | 'Branch' | 'Franchise'; legalName: string; tradeName?: string }; base: { aliases: string; addresses: string; notes?: string } } };
    output: { oficina: OficinaFicha };
    rules: [];
    access: { actors: ['gestor']; grants: ['gestorCadastrosMestres']; scope: 'organization' };
  };
  /**
   * Finalidade: Corrige os dados de uma oficina existente.
   * Entrada: id e version da oficina aberta (concorrência otimista) e os valores editados de nome, documento, país, tipo de organização, razão social, nome fantasia, outros nomes, endereço e observações.
   * Processamento: Recusa se a versão diverge da gravada. Valida o formato do documento e exige a razão social; ao mudar o documento, verifica duplicidade (locate.byDocument). Altera apenas campos editáveis (edit.platformFields); situação e contatos não são alterados por este comando.
   * Saída: A oficina atualizada com nova versão e detalhes, para o formulário redesenhar sem nova chamada.
   */
  'manutencaoFrota.oficinas.atualizarOficina': {
    kind: 'cmd';
    writes: 'Oficina.update';
    input: { id: string; version: number; details: { identification: { name: string; docType?: 'CNPJ' | 'EIN' | 'VAT' | 'Other'; docId?: string; countryCode: string }; company: { companyKind: 'LegalEntity' | 'Branch' | 'Franchise'; legalName: string; tradeName?: string }; base: { aliases: string; addresses: string; notes?: string } } };
    output: { oficina: OficinaFicha };
    rules: [];
    access: { actors: ['gestor']; grants: ['gestorCadastrosMestres']; scope: 'organization' };
  };
}

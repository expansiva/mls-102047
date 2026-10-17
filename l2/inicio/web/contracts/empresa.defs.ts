/// <mls fileReference="_102047_/l2/inicio/web/contracts/empresa.defs.ts" enhancement="_blank"/>

/** Cadastro mestre da empresa da organização, com os canais de contato ligados e a situação de preparação calculada. */
export interface EmpresaPreparacao {
  id: string;
  version: number;
  details: EmpresaDetalhes;
  contato: ContatoEmpresa[];
}

/** Detalhes do cadastro da empresa. */
export interface EmpresaDetalhes {
  identification: EmpresaIdentificacao;
  base: EmpresaBase;
  company: EmpresaCompanhia;
  inicio: EmpresaInicio;
}

/** Identificação da empresa: nome, documento e país. */
export interface EmpresaIdentificacao {
  name: string;
  docType?: 'CNPJ' | 'EIN' | 'VAT' | 'NationalId' | 'Other';
  docId?: string;
  countryCode: string;
}

/** Endereços e resumo dos contatos da empresa. */
export interface EmpresaBase {
  addresses: string;
  readonly contacts: string;
}

/** Dados de pessoa jurídica da empresa. */
export interface EmpresaCompanhia {
  legalName: string;
  tradeName?: string;
}

/** Situação de preparação da empresa calculada pelo módulo Início. */
export interface EmpresaInicio {
  readonly preparada: boolean;
  readonly dadosFaltantes: string[];
}

/** Canal de contato ligado à empresa por HasContact. */
export interface ContatoEmpresa {
  id: string;
  details: ContatoDetalhes;
}

/** Detalhes do canal de contato. */
export interface ContatoDetalhes {
  identification: ContatoIdentificacao;
  contactChannel: ContatoCanal;
}

/** Identificação do canal de contato. */
export interface ContatoIdentificacao {
  name: string;
}

/** Tipo e valor do canal de contato. */
export interface ContatoCanal {
  contactType: 'Phone' | 'Email' | 'WhatsApp';
  value: string;
}

export interface EmpresaContracts {
  /**
   * Finalidade: Carrega, em uma única chamada, o cadastro da empresa da organização do responsável logado, com os contatos ligados e a situação de preparação já calculada.
   * Entrada: Nenhuma entrada: a empresa é a da organização do responsável autenticado, conhecida pelo servidor.
   * Processamento: Verifica que quem chama é o responsável reconhecido pela plataforma (prepararSomenteResponsavel, responsavelReconhecidoPelaPlataforma); caso contrário recusa. Lê a Empresa por read.byId e os Contatos ligados por HasContact (listLinks + read.byId). Calcula na leitura, sem gravar: preparada = nome, documento (tipo e número), ao menos um endereço e ao menos um contato (empresaPreparadaComDadosObrigatorios); dadosFaltantes = lista dos obrigatórios ausentes entre nome, documento, endereço e contato, para pedir só o que falta (naoPedirDadoJaExistente).
   * Saída: A empresa no estado atual: id, version, identificação, razão social e nome fantasia, endereços, resumo de contatos, a lista de contatos ligados (nome, tipo, valor), preparada e dadosFaltantes.
   */
  'inicio.empresa.qryEmpresa': {
    kind: 'qry';
    input: {};
    output: { empresa: EmpresaPreparacao };
    rules: ['prepararSomenteResponsavel', 'responsavelReconhecidoPelaPlataforma', 'empresaPreparadaComDadosObrigatorios', 'naoPedirDadoJaExistente'];
    access: { actors: ['responsavel']; grants: ['responsavelPreparaEmpresa', 'responsavelContatosEmpresa']; scope: 'organization' };
  };
  /**
   * Finalidade: Grava os dados obrigatórios da empresa que faltavam e confirmados pelo responsável.
   * Entrada: id e version da empresa (concorrência otimista); details.identification.name, details.identification.docType, details.identification.docId, details.identification.countryCode, details.company.legalName, details.company.tradeName e details.base.addresses, enviados somente quando faltavam e foram informados.
   * Processamento: Recusa se quem chama não é o responsável reconhecido pela plataforma (prepararSomenteResponsavel, responsavelReconhecidoPelaPlataforma). Recusa se a version não for a atual. Grava só os campos enviados que ainda estavam vazios, sem sobrescrever o que a plataforma já tem (naoPedirDadoJaExistente), por edit.platformFields; valida o formato do documento e, se informado, verifica por locate.byDocument que não há outra empresa com o mesmo documento. Não concede papéis nem permissões (preencherDadosNaoDaPermissao). Depois relê a empresa e calcula preparada e dadosFaltantes, sem gravá-los (empresaPreparadaComDadosObrigatorios).
   * Saída: A empresa no novo estado e nova version, com contatos ligados, preparada e dadosFaltantes recalculados.
   */
  'inicio.empresa.cmdConfirmarDadosEmpresa': {
    kind: 'cmd';
    writes: 'Empresa.update';
    input: { id: string; version: number; details: { identification: { name?: string; docType?: 'CNPJ' | 'EIN' | 'VAT' | 'NationalId' | 'Other'; docId?: string; countryCode?: string }; company: { legalName?: string; tradeName?: string }; base: { addresses?: string } } };
    output: { empresa: EmpresaPreparacao };
    rules: ['prepararSomenteResponsavel', 'responsavelReconhecidoPelaPlataforma', 'naoPedirDadoJaExistente', 'empresaPreparadaComDadosObrigatorios', 'preencherDadosNaoDaPermissao'];
    access: { actors: ['responsavel']; grants: ['responsavelPreparaEmpresa', 'responsavelContatosEmpresa']; scope: 'organization' };
  };
}

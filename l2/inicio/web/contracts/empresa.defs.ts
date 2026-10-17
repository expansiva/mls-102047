/// <mls fileReference="_102047_/l2/inicio/web/contracts/empresa.defs.ts" enhancement="_blank"/>

/** Canal de contato (telefone, WhatsApp ou e-mail) ligado à empresa. */
export interface ContatoEmpresaResumo {
  id: string;
  details: {
    identification: {
      name: string;
    };
    contactChannel: {
      contactType: 'Phone' | 'Email' | 'WhatsApp';
      value: string;
      isVerified: boolean;
    };
  };
}

/** Empresa dona do app com os dados já registrados na plataforma, seus contatos ligados, o indicador de empresa preparada e os dados obrigatórios que ainda faltam. */
export interface EmpresaPreparo {
  id: string;
  version: number;
  details: {
    identification: {
      name?: string;
      docType?: 'CNPJ' | 'EIN' | 'VAT' | 'NationalId' | 'Other';
      docId?: string;
      countryCode?: string;
    };
    company: {
      legalName?: string;
      tradeName?: string;
    };
    base: {
      addresses: string[];
    };
  };
  contacts: ContatoEmpresaResumo[];
  readonly preparada: boolean;
  readonly dadosFaltantes: 'nome' | 'documento' | 'endereco' | 'contato';
}

export interface EmpresaContracts {
  /**
   * Finalidade: Carrega de uma vez a empresa do app do responsável logado, com os dados já registrados, os contatos ligados, o indicador de preparada e os dados obrigatórios que faltam.
   * Entrada: Nenhuma entrada: a empresa é resolvida pela sessão do responsável (escopo organização).
   * Processamento: Lê a empresa pelo id da sessão (read.byId) e os contatos ligados por HasContact que não estão inativos. Calcula, sem gravar, ’preparada’ e ’dadosFaltantes’ (inicio.verificarPreparo): pela regra empresaPreparadaDadosObrigatorios a empresa só está preparada com nome, documento (tipo e número), ao menos um endereço e ao menos um contato; pela regra naoPedirDadoJaExistente a lista de faltantes contém apenas o que a plataforma ainda não tem.
   * Saída: A empresa em seu estado atual, com id e versão, nome, documento, país, razão social, nome fantasia, endereços, contatos ligados (nome, tipo, valor, verificado), o indicador preparada e a lista de dados que faltam.
   */
  'inicio.empresa.qryEmpresaPreparo': {
    kind: 'qry';
    input: {};
    output: { empresa: EmpresaPreparo };
    rules: ['empresaPreparadaDadosObrigatorios', 'naoPedirDadoJaExistente'];
    access: { actors: ['responsavel']; grants: ['responsavelPrepararEmpresa']; scope: 'organization' };
  };
  /**
   * Finalidade: Grava na empresa os dados obrigatórios que faltavam, informados pelo responsável.
   * Entrada: id e version da empresa (concorrência otimista); details.identification.name, details.identification.docType, details.identification.docId, details.identification.countryCode, details.company.legalName, details.company.tradeName e details.base.addresses, cada um enviado apenas quando era um dado faltante.
   * Processamento: Pela regra somenteResponsavelEditaEmpresa, recusa se quem chama não é reconhecido pela plataforma como responsável pela empresa. Pela regra naoPedirDadoJaExistente, ignora ou recusa a sobrescrita de dado que a plataforma já tinha. Valida o formato do documento conforme o país e verifica duplicidade pelo documento (locate.byDocument). Atualiza via edit.platformFields com a versão informada. Depois recalcula, sem gravar, ’preparada’ e ’dadosFaltantes’ conforme empresaPreparadaDadosObrigatorios.
   * Saída: A empresa no novo estado, com nova versão, dados registrados, contatos ligados, indicador preparada e dados que ainda faltam.
   */
  'inicio.empresa.cmdSalvarDadosEmpresa': {
    kind: 'cmd';
    writes: 'Empresa.update';
    input: { id: string; version: number; details: { identification: { name?: string; docType?: 'CNPJ' | 'EIN' | 'VAT' | 'NationalId' | 'Other'; docId?: string; countryCode?: string }; company: { legalName?: string; tradeName?: string }; base: { addresses?: string[] } } };
    output: { empresa: EmpresaPreparo };
    rules: ['somenteResponsavelEditaEmpresa', 'naoPedirDadoJaExistente', 'empresaPreparadaDadosObrigatorios'];
    access: { actors: ['responsavel']; grants: ['responsavelPrepararEmpresa']; scope: 'organization' };
  };
}

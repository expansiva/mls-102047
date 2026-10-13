/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/contracts/meu_cadastro_dados.defs.ts" enhancement="_blank"/>

/** Dados cadastrais do atendente da recepção conectado, somente leitura. */
export interface MeuCadastroAtendente {
  id: string;
  nome: string;
}

export interface Meu_cadastro_dadosContracts {
  /**
   * Finalidade: Carregar, ao abrir Meu cadastro, os dados cadastrais do próprio atendente da recepção conectado, para consulta.
   * Entrada: Nenhuma entrada: o atendente é identificado pela sessão autenticada.
   * Processamento: Resolve o usuário da sessão e devolve apenas o seu próprio cadastro (grant recepcaoProprioCadastro, escopo own). Nenhuma regra de negócio se aplica; não há escrita.
   * Saída: O registro do atendente conectado, já no formato que o detalhe exibe, com a identificação para o topo e os demais dados logo abaixo.
   */
  'mensalidadesAcademia.meu_cadastro_dados.qryMeuCadastro': {
    kind: 'qry';
    input: {};
    output: { atendente: MeuCadastroAtendente };
    rules: [];
    access: { actors: ['recepcao']; grants: []; scope: 'organization' };
  };
}

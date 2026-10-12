/// <mls fileReference="_102047_/l2/mensalidadesAcademia/web/contracts/meu_cadastro_dados.defs.ts" enhancement="_blank"/>


export interface Meu_cadastro_dadosContracts {
  /**
   * Finalidade: Carrega, na abertura da página, o cadastro da própria recepcionista conectada, somente para consulta.
   * Entrada: Nenhuma entrada: a recepcionista é identificada pela sessão do usuário conectado (escopo ’own’ do grant recepcaoProprioCadastro).
   * Processamento: Busca o registro de Recepcionista vinculado ao usuário da sessão na organização corrente e devolve apenas os campos permitidos pelo grant recepcaoProprioCadastro (nome, situação e apelidos). Não altera nada e não expõe outros campos nem cadastros de outras recepcionistas.
   * Saída: Nome, situação e lista de apelidos da recepcionista, que a identificam nas matrículas registradas; a página exibe no cartão de leitura, com o acesso às matrículas por navegação.
   */
  'mensalidadesAcademia.meu_cadastro_dados.obterMeuCadastro': {
    kind: 'qry';
    input: {};
    output: { name: string; readonly status: 'Active' | 'Inactive' | 'Merged' | 'Blocked'; aliases: string[] };
    rules: [];
    access: { actors: ['recepcao']; grants: ['recepcaoProprioCadastro']; scope: 'own' };
  };
}

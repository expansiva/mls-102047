/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/contracts/inicio.defs.ts" enhancement="_blank"/>

/** Identificação do colaborador que registrou a despesa. */
export interface IdentificacaoColaborador {
  details: {
    identification: {
      readonly subtype: 'Person';
      name: string;
      readonly status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
      docType?: 'SSN' | 'EIN' | 'Passport' | 'DriversLicense' | 'NationalId' | 'CPF' | 'CNPJ' | 'VAT' | 'Other';
      docId?: string;
      countryCode: string;
      readonly tags: string;
    };
  };
}

/** Detalhes do colaborador visíveis ao gestor. */
export interface DetalhesColaborador {
  identification: IdentificacaoColaborador;
}

/** Colaborador que registrou a despesa pendente. */
export interface ColaboradorResponsavel {
  id: string;
  details: DetalhesColaborador;
}

/** Dados resumidos da despesa exibidos na caixa de pendências. */
export interface DetalhesDespesaPendente {
  details: {
    dataDespesa: string;
    categoria: string;
    valor: string;
    reenvioRealizado: boolean;
  };
}

/** Despesa da equipe aguardando a decisão do gestor, com o colaborador que a registrou. */
export interface DespesaPendente {
  id: string;
  colaboradorId: string;
  status: 'draft' | 'awaitingApproval' | 'rejected' | 'approved' | 'paid';
  details: DetalhesDespesaPendente;
  colaborador: ColaboradorResponsavel;
}

export interface InicioContracts {
  /**
   * Finalidade: Carrega, ao abrir a página inicial, o total de despesas da equipe que aguardam a decisão do gestor e a lista dessas despesas com quem as registrou.
   * Entrada: page: número da página da lista de pendências (padrão 1); pageSize: quantidade de despesas por página.
   * Processamento: Identifica o gestor logado e os colaboradores de sua equipe (vínculo ReportsTo). Aplica managerTeamExpenseAccess: considera somente despesas de colaboradores da própria equipe. Filtra status = awaitingApproval, ordena pela data da despesa mais antiga primeiro, pagina a lista e junta a identificação completa do colaborador (nome, tipo de cadastro, situação, documento, país e etiquetas) pelo colaboradorId. O totalPendentes é calculado no servidor por contagem com os mesmos filtros (situação e escopo da equipe), independentemente da página.
   * Saída: totalPendentes: número de despesas aguardando decisão, para o destaque do volume pendente; despesasPendentes: página de despesas com data, categoria, valor, indicador de reenvio e identificação do colaborador, para o gestor escolher o que analisar antes de seguir para despesas_da_equipe.
   */
  'reembolsoDespesas.inicio.qryInicio': {
    kind: 'qry';
    input: { page: number; pageSize: number };
    output: { readonly totalPendentes: number; despesasPendentes: { items: DespesaPendente[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['managerTeamExpenseAccess'];
    access: { actors: ['gestorEquipe']; grants: ['gestorAnalisaDespesasDaEquipe']; scope: 'related' };
  };
}

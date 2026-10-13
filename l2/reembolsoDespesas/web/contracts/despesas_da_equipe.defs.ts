/// <mls fileReference="_102047_/l2/reembolsoDespesas/web/contracts/despesas_da_equipe.defs.ts" enhancement="_blank"/>

/** Identificação do colaborador reduzida ao nome exibido. */
export interface ColaboradorIdentificacaoNome {
  name: string;
}

/** Detalhes do colaborador com a identificação. */
export interface ColaboradorDetalhesNome {
  identification: ColaboradorIdentificacaoNome;
}

/** Colaborador responsável pela despesa, apenas com o nome. */
export interface ColaboradorNome {
  details: ColaboradorDetalhesNome;
}

/** Dados da despesa exibidos na fila de pendentes. */
export interface DespesaResumoDetalhes {
  dataDespesa: string;
  categoria: string;
  valor: string;
}

/** Linha da fila de despesas pendentes da equipe. */
export interface DespesaPendenteResumo {
  id: string;
  colaboradorId: string;
  status: 'draft' | 'awaitingApproval' | 'rejected' | 'approved' | 'paid';
  details: DespesaResumoDetalhes;
  colaborador: ColaboradorNome;
}

/** Dados completos da despesa para análise. */
export interface DespesaAnaliseDetalhes {
  dataDespesa: string;
  categoria: string;
  valor: string;
  descricao: string;
  motivoRejeicao?: string;
  reenvioRealizado: boolean;
}

/** Despesa completa em análise, com colaborador, usada pela análise e pela decisão. */
export interface DespesaAnalise {
  id: string;
  version: number;
  colaboradorId: string;
  status: 'draft' | 'awaitingApproval' | 'rejected' | 'approved' | 'paid';
  details: DespesaAnaliseDetalhes;
  colaborador: ColaboradorNome;
}

export interface Despesas_da_equipeContracts {
  /**
   * Finalidade: Carrega a fila paginada de despesas da equipe do gestor que aguardam aprovação, para ele escolher qual analisar.
   * Entrada: page: número da página solicitada; pageSize: quantidade de despesas por página.
   * Processamento: Filtra Despesa com status ’awaitingApproval’ cujos colaboradores pertencem à equipe do gestor autenticado (managerTeamExpenseAccess: o gestor só consulta despesas de colaboradores da própria equipe, via relacionamento ReportsTo). Compõe cada linha com o nome do colaborador lido pelo colaboradorId. Ordena pela data da despesa, da mais antiga para a mais recente.
   * Saída: Lista paginada { items, page, pageSize, hasMore } com id, colaborador, situação, data, categoria e valor de cada despesa pendente, já no formato da fila.
   */
  'reembolsoDespesas.despesas_da_equipe.listarDespesasPendentesEquipe': {
    kind: 'qry';
    input: { page: number; pageSize: number };
    output: { despesas: { items: DespesaPendenteResumo[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['managerTeamExpenseAccess'];
    access: { actors: ['gestorEquipe']; grants: ['gestorAnalisaDespesasDaEquipe']; scope: 'related' };
  };
  /**
   * Finalidade: Carrega os dados completos da despesa escolhida na fila para análise e decisão.
   * Entrada: despesaId: identificador da despesa selecionada na fila.
   * Processamento: Lê a despesa pelo id e recusa se o colaborador dono não pertencer à equipe do gestor (managerTeamExpenseAccess). Compõe com o nome do colaborador. O comprovante é consultado pelo anexo da despesa (attach.document).
   * Saída: A despesa com versão, situação, data, categoria, valor, descrição, indicação de reenvio, motivo de rejeição anterior e nome do colaborador; a versão é usada pelos comandos de decisão.
   */
  'reembolsoDespesas.despesas_da_equipe.obterDespesaParaAnalise': {
    kind: 'qry';
    input: { despesaId: string };
    output: { despesa: DespesaAnalise };
    rules: ['managerTeamExpenseAccess'];
    access: { actors: ['gestorEquipe']; grants: ['gestorAnalisaDespesasDaEquipe']; scope: 'related' };
  };
  /**
   * Finalidade: Aprova a despesa em análise para que siga ao financeiro.
   * Entrada: despesaId: despesa a aprovar; version: versão lida, para controle de concorrência otimista.
   * Processamento: Verifica que a despesa é de colaborador da equipe do gestor (managerTeamExpenseAccess) e que está em ’awaitingApproval’; executa a transição aprovarDespesa para ’approved’, recusando se a versão divergir.
   * Saída: A despesa atualizada, para redesenhar a análise e retirá-la da fila de pendentes sem nova chamada.
   */
  'reembolsoDespesas.despesas_da_equipe.aprovarDespesa': {
    kind: 'cmd';
    writes: 'Despesa.aprovarDespesa';
    input: { id: string; version: number };
    output: { despesa: DespesaAnalise };
    rules: ['managerTeamExpenseAccess'];
    access: { actors: ['gestorEquipe']; grants: ['gestorAnalisaDespesasDaEquipe']; scope: 'related' };
  };
  /**
   * Finalidade: Rejeita a despesa em análise registrando o motivo informado pelo gestor.
   * Entrada: despesaId: despesa a rejeitar; version: versão lida, para concorrência otimista; motivoRejeicao: justificativa da rejeição.
   * Processamento: Verifica que a despesa é de colaborador da equipe do gestor (managerTeamExpenseAccess) e que está em ’awaitingApproval’; recusa se o motivo estiver vazio (rejectionReasonRequired); executa a transição rejeitarDespesa para ’rejected’ gravando details.motivoRejeicao, recusando se a versão divergir.
   * Saída: A despesa atualizada com o motivo, para redesenhar a análise e retirá-la da fila de pendentes sem nova chamada.
   */
  'reembolsoDespesas.despesas_da_equipe.rejeitarDespesa': {
    kind: 'cmd';
    writes: 'Despesa.rejeitarDespesa';
    input: { id: string; version: number; details: { motivoRejeicao: string } };
    output: { despesa: DespesaAnalise };
    rules: ['managerTeamExpenseAccess', 'rejectionReasonRequired'];
    access: { actors: ['gestorEquipe']; grants: ['gestorAnalisaDespesasDaEquipe']; scope: 'related' };
  };
}

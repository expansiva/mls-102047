/// <mls fileReference="_102047_/l2/tarefas/web/contracts/inicio_membro.defs.ts" enhancement="_blank"/>

/** Nome da lista à qual a tarefa pertence. */
export interface ListaNome {
  nome: string;
}

/** Campos calculados da tarefa usados no panorama. */
export interface TarefaResumoDetalhes {
  details: {
    readonly aberta: boolean;
    readonly venceHoje: boolean;
    readonly atrasada: boolean;
    readonly progressoChecklist: string;
  };
}

/** Tarefa aberta do membro no panorama, com a lista e o progresso da checklist. */
export interface TarefaResumo {
  id: string;
  titulo: string;
  status: 'aFazer' | 'emAndamento' | 'emRevisao' | 'concluida' | 'cancelada';
  prazo: string;
  prioridade: 'low' | 'medium' | 'high';
  listaId: string;
  lista: ListaNome;
  details: TarefaResumoDetalhes;
}

/** Indicadores já calculados das tarefas abertas do membro e a lista dessas tarefas. */
export interface ResumoMinhasTarefas {
  readonly quantidadeAbertas: number;
  readonly quantidadeVencemHoje: number;
  readonly quantidadeAtrasadas: number;
  tarefas: TarefaResumo[];
}

/** Tarefa incluída no aviso diário, com o prazo e a situação do prazo no momento do aviso. */
export interface AvisoTarefa {
  details: {
    tarefas: {
      tarefaId: string;
      prazo: string;
      situacaoPrazo: 'dueToday' | 'overdue';
    };
  };
}

/** Detalhes do aviso diário: geração, contagens e tarefas. */
export interface AvisoDetalhes {
  details: {
    readonly geradoEm: string;
    readonly quantidadeTarefas: number;
    readonly quantidadeAtrasadas: number;
  };
  tarefas: AvisoTarefa[];
}

/** Aviso diário de vencimentos de hoje do membro. */
export interface AvisoDoDia {
  id: string;
  readonly dataReferencia: string;
  status: 'pending' | 'completed' | 'failed';
  details: AvisoDetalhes;
}

/** Identificação do membro: apenas o nome. */
export interface MembroNomeIdentificacao {
  details: {
    identification: {
      name: string;
    };
  };
}

/** Detalhes do membro reduzidos à identificação. */
export interface MembroNomeDetalhes {
  identification: MembroNomeIdentificacao;
}

/** Membro da equipe com o nome a exibir. */
export interface MembroNome {
  details: MembroNomeDetalhes;
}

/** Detalhes da tarefa pendente: progresso da checklist e dados da última devolução. */
export interface PendenciaDetalhes {
  details: {
    readonly progressoChecklist: string;
    motivoDevolucao?: string;
    devolvidaEm?: string;
  };
}

/** Tarefa que espera uma ação do membro, com a ação esperada, os nomes do responsável e do criador e a versão para os comandos. */
export interface Pendencia {
  id: string;
  version: number;
  titulo: string;
  status: 'aFazer' | 'emAndamento' | 'emRevisao' | 'concluida' | 'cancelada';
  prazo: string;
  prioridade: 'low' | 'medium' | 'high';
  responsavelId: string;
  criadorId: string;
  responsavel: MembroNome;
  criador: MembroNome;
  readonly acaoEsperada: string;
  details: PendenciaDetalhes;
}

export interface Inicio_membroContracts {
  /**
   * Finalidade: Carrega de uma vez tudo o que a tela inicial do membro mostra ao abrir: o panorama das suas tarefas abertas, o aviso diário de hoje e a caixa do que espera por uma ação dele.
   * Entrada: Sem parâmetros: o membro é resolvido pela sessão e a data de hoje pelo servidor.
   * Processamento: Resumo: filtra as tarefas cujo responsável é o membro da sessão e que estão abertas (details.aberta, calculado: aFazer, emAndamento ou emRevisao); conta no servidor o total de abertas, as que vencem hoje (details.venceHoje) e as atrasadas (details.atrasada); lista essas tarefas ordenadas por prazo, com o nome da lista e o progresso da checklist (details.progressoChecklist, calculado pela contagem de itens feitos sobre o total). Campos derivados são calculados, nunca gravados. Aviso: lê o aviso do membro com dataReferencia igual a hoje; pela regra avisoUnicoPorResponsavelEDia há no máximo um; ele traz apenas tarefas abertas que vencem hoje ou estão atrasadas (avisoSomenteTarefasAbertasVencendo); se o processo das 8h ainda não gerou, volta vazio. Pendências: junta as tarefas em que o membro é responsável e está em aFazer (acaoEsperada ’iniciar’) ou emAndamento (acaoEsperada ’enviarParaRevisao’, ou ’ajustar’ quando há devolvidaEm), conforme somenteResponsavelExecuta, e as tarefas que ele criou em emRevisao (acaoEsperada ’revisar’), conforme somenteCriadorRevisa; inclui motivo e data da devolução, nomes do responsável e do criador lidos do cadastro mestre, e a versão para os comandos; ordena por prazo e prioridade.
   * Saída: resumo com os três indicadores já calculados e as tarefas abertas; avisoHoje com data, situação, contagens e tarefas do aviso (opcional); pendencias com cada tarefa e a ação esperada, para a página exibir a ação certa em cada item.
   */
  'tarefas.inicio_membro.qryInicioMembro': {
    kind: 'qry';
    input: {};
    output: { resumo: ResumoMinhasTarefas; avisoHoje?: AvisoDoDia; pendencias: Pendencia[] };
    rules: ['avisoUnicoPorResponsavelEDia', 'avisoSomenteTarefasAbertasVencendo', 'somenteResponsavelExecuta', 'somenteCriadorRevisa'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroAvisosProprios', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
  /**
   * Finalidade: Inicia uma tarefa atribuída ao membro, passando-a de a fazer para em andamento.
   * Entrada: tarefaId: tarefa a iniciar; version: versão lida, para controle de concorrência.
   * Processamento: Aplica a transição iniciar (aFazer → emAndamento). Recusa se o membro da sessão não for o responsável (somenteResponsavelExecuta) e se a tarefa estiver concluída ou cancelada (tarefaEncerradaNaoTransiciona); recusa se a versão estiver desatualizada. A sala de discussão recebe a mensagem da mudança. Depois recompõe o resumo e as pendências como em qryInicioMembro.
   * Saída: resumo e pendencias atualizados, para a página redesenhar o panorama e a caixa sem nova chamada (a tarefa passa a esperar o envio para revisão).
   */
  'tarefas.inicio_membro.cmdIniciarTarefa': {
    kind: 'cmd';
    writes: 'Tarefa.iniciar';
    input: { id: string; version: number };
    output: { resumo: ResumoMinhasTarefas; pendencias: Pendencia[] };
    rules: ['somenteResponsavelExecuta', 'tarefaEncerradaNaoTransiciona'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroAvisosProprios', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
  /**
   * Finalidade: Envia para revisão do criador uma tarefa em andamento do membro, inclusive uma tarefa devolvida já ajustada.
   * Entrada: tarefaId: tarefa a enviar; version: versão lida, para controle de concorrência.
   * Processamento: Aplica a transição enviarParaRevisao (emAndamento → emRevisao). Recusa se o membro da sessão não for o responsável (somenteResponsavelExecuta) ou se a tarefa estiver encerrada (tarefaEncerradaNaoTransiciona); recusa versão desatualizada. O criador passa a ser quem age agora e é avisado. Recompõe resumo e pendências.
   * Saída: resumo e pendencias atualizados; a tarefa sai da caixa do membro, salvo se ele também for o criador, quando aparece para revisar.
   */
  'tarefas.inicio_membro.cmdEnviarParaRevisao': {
    kind: 'cmd';
    writes: 'Tarefa.enviarParaRevisao';
    input: { id: string; version: number };
    output: { resumo: ResumoMinhasTarefas; pendencias: Pendencia[] };
    rules: ['somenteResponsavelExecuta', 'tarefaEncerradaNaoTransiciona'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroAvisosProprios', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
  /**
   * Finalidade: Aceita a entrega de uma tarefa criada pelo membro e que está em revisão, concluindo-a.
   * Entrada: tarefaId: tarefa a aceitar; version: versão lida, para controle de concorrência.
   * Processamento: Aplica a transição aceitar (emRevisao → concluida), registrando concluidaEm. Recusa se o membro da sessão não for o criador (somenteCriadorRevisa) ou se a tarefa já estiver encerrada (tarefaEncerradaNaoTransiciona); recusa versão desatualizada. A sala recebe a mensagem. Recompõe resumo e pendências.
   * Saída: resumo e pendencias atualizados; a tarefa concluída sai da caixa e das abertas.
   */
  'tarefas.inicio_membro.cmdAceitarEntrega': {
    kind: 'cmd';
    writes: 'Tarefa.aceitar';
    input: { id: string; version: number };
    output: { resumo: ResumoMinhasTarefas; pendencias: Pendencia[] };
    rules: ['somenteCriadorRevisa', 'tarefaEncerradaNaoTransiciona'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroAvisosProprios', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
  /**
   * Finalidade: Devolve para ajuste, com o motivo, uma tarefa criada pelo membro que está em revisão.
   * Entrada: tarefaId: tarefa a devolver; version: versão lida; motivoDevolucao: texto do motivo, obrigatório.
   * Processamento: Aplica a transição devolver (emRevisao → emAndamento). Recusa se o membro da sessão não for o criador (somenteCriadorRevisa), se o motivo estiver vazio (devolucaoExigeMotivo) ou se a tarefa estiver encerrada (tarefaEncerradaNaoTransiciona); recusa versão desatualizada. Grava o motivo e devolvidaEm na tarefa; o responsável volta a ser quem age agora e é avisado. Recompõe resumo e pendências.
   * Saída: resumo e pendencias atualizados; a tarefa sai da revisão do membro, salvo se ele também for o responsável, quando aparece para ajustar.
   */
  'tarefas.inicio_membro.cmdDevolverComMotivo': {
    kind: 'cmd';
    writes: 'Tarefa.devolver';
    input: { id: string; version: number; details: { motivoDevolucao: string } };
    output: { resumo: ResumoMinhasTarefas; pendencias: Pendencia[] };
    rules: ['somenteCriadorRevisa', 'devolucaoExigeMotivo', 'tarefaEncerradaNaoTransiciona'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroAvisosProprios', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
}

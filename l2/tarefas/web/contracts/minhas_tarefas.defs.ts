/// <mls fileReference="_102047_/l2/tarefas/web/contracts/minhas_tarefas.defs.ts" enhancement="_blank"/>

/** Nome da lista da tarefa. */
export interface ListaNome {
  nome: string;
}

/** Identificação do membro lida no cadastro mestre. */
export interface MembroIdentificacao {
  details: {
    identification: {
      name: string;
      readonly status?: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
    };
  };
}

/** Detalhes do membro, aninhados como na ontologia. */
export interface MembroNomeDetalhes {
  identification: MembroIdentificacao;
}

/** Responsável ou criador exibido pelo nome. */
export interface MembroNome {
  details: MembroNomeDetalhes;
}

/** Membro ativo que pode ser escolhido como responsável. */
export interface MembroOpcao {
  responsavelId: string;
  details: MembroNomeDetalhes;
}

export interface ListaOpcaoDetalhes {
  details: {
    tipo: 'project' | 'area';
  };
}

/** Lista disponível para receber a tarefa no formulário. */
export interface ListaOpcao {
  tarefa: {
    listaId: string;
  };
  nome: string;
  ativa: boolean;
  details: ListaOpcaoDetalhes;
}

export interface TarefaResumoDetalhes {
  details: {
    readonly quantidadeSubtarefas: number;
    readonly progressoChecklist: string;
    readonly venceHoje: boolean;
    readonly atrasada: boolean;
    devolvidaEm?: string;
  };
}

/** Linha da lista de minhas tarefas, usada também para atualizar a linha após um comando. */
export interface TarefaResumo {
  id: string;
  version: number;
  titulo: string;
  listaId: string;
  lista: ListaNome;
  responsavelId: string;
  responsavel: MembroNome;
  criadorId: string;
  criador: MembroNome;
  prioridade: 'low' | 'medium' | 'high';
  prazo: string;
  status: 'aFazer' | 'emAndamento' | 'emRevisao' | 'concluida' | 'cancelada';
  details: TarefaResumoDetalhes;
}

export interface ItemChecklistLinhaDetalhes {
  details: {
    descricao: string;
    marcadoEm?: string;
  };
}

/** Item da checklist da tarefa aberta, na ordem. */
export interface ItemChecklistLinha {
  id: string;
  version: number;
  ordem: number;
  feito: boolean;
  details: ItemChecklistLinhaDetalhes;
}

export interface TarefaAbertaDetalhes {
  details: {
    descricao?: string;
    motivoDevolucao?: string;
    devolvidaEm?: string;
    concluidaEm?: string;
    canceladaEm?: string;
    readonly progressoChecklist: string;
  };
}

/** Tarefa aberta com nomes, checklist e marcos do histórico; serve ao detalhe, às ações, ao histórico e ao formulário de edição. */
export interface TarefaAberta {
  id: string;
  version: number;
  titulo: string;
  status: 'aFazer' | 'emAndamento' | 'emRevisao' | 'concluida' | 'cancelada';
  prioridade: 'low' | 'medium' | 'high';
  prazo: string;
  listaId: string;
  lista: ListaNome;
  criadorId: string;
  criador: MembroNome;
  responsavelId: string;
  responsavel: MembroNome;
  readonly criadaEm: string;
  details: TarefaAbertaDetalhes;
  checklist: ItemChecklistLinha[];
}

export interface ItemChecklistEntradaDetalhes {
  details: {
    descricao: string;
  };
}

/** Item da checklist enviado pelo formulário; sem id é um item novo. */
export interface ItemChecklistEntrada {
  id?: string;
  version?: number;
  ordem: number;
  details: ItemChecklistEntradaDetalhes;
}

export interface Minhas_tarefasContracts {
  /**
   * Finalidade: Carrega a página de tarefas que o membro da sessão criou ou pelas quais é responsável, já com nomes da lista, do responsável e do criador.
   * Entrada: criadasPorMim: só as tarefas com o membro da sessão como criador; atribuidasAMim: só as em que ele é responsável; status: filtra pela situação (ex.: emRevisao); somenteDevolvidas: só as que têm devolução registrada e seguem em andamento; page/pageSize: paginação.
   * Processamento: Resolve o membro da sessão pelo login e limita a visão às tarefas em que ele é criador ou responsável (editarSomenteTarefaVisivel). Aplica os filtros, ordena por prazo e lê no cadastro mestre os nomes de responsável e criador. venceHoje, atrasada, quantidadeSubtarefas e progressoChecklist são campos derivados calculados pelo servidor (prazo vs. data atual em tarefas abertas; contagem de subtarefas; itens feitos/total), nunca gravados.
   * Saída: tarefas paginadas { items, page, pageSize, hasMore } com o necessário para a lista destacar o que vence hoje ou está atrasado.
   */
  'tarefas.minhas_tarefas.minhasTarefas': {
    kind: 'qry';
    input: { criadasPorMim?: boolean; atribuidasAMim?: boolean; status?: 'aFazer' | 'emAndamento' | 'emRevisao' | 'concluida' | 'cancelada'; somenteDevolvidas?: boolean; page: number; pageSize: number };
    output: { tarefas: { items: TarefaResumo[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['editarSomenteTarefaVisivel'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
  /**
   * Finalidade: Abre a tarefa escolhida na lista com tudo o que o detalhe, as ações, o histórico e o formulário de edição mostram.
   * Entrada: tarefaId: id da tarefa selecionada na lista ou vinda do aviso.
   * Processamento: Recusa a tarefa se o membro da sessão não for criador nem responsável (editarSomenteTarefaVisivel). Lê a tarefa, o nome da lista, os nomes de criador e responsável no cadastro mestre e a checklist pela tarefaId ordenada por ordem. progressoChecklist é derivado (itens feitos do total), calculado pelo servidor.
   * Saída: tarefa com checklist e marcos (criadaEm, devolvidaEm com motivo, concluidaEm, canceladaEm) para o histórico, e version para os comandos.
   */
  'tarefas.minhas_tarefas.tarefaAberta': {
    kind: 'qry';
    input: { tarefaId: string };
    output: { tarefa: TarefaAberta };
    rules: ['editarSomenteTarefaVisivel'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
  /**
   * Finalidade: Carrega as listas onde o membro pode criar ou mover uma tarefa.
   * Entrada: Nenhuma.
   * Processamento: Lista as listas da organização filtradas por ativa = true, ordenadas por nome; listas inativas não aparecem porque não recebem tarefas (listaInativaNaoRecebeTarefa).
   * Saída: listas com id, nome, ativa e tipo para o seletor do formulário.
   */
  'tarefas.minhas_tarefas.opcoesFormulario': {
    kind: 'qry';
    input: {};
    output: { listas: ListaOpcao[] };
    rules: ['listaInativaNaoRecebeTarefa'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
  /**
   * Finalidade: Busca pelo nome os membros que podem ser escolhidos como responsável ao criar ou trocar o responsável.
   * Entrada: termo: trecho do nome digitado.
   * Processamento: Localiza membros por nome no cadastro mestre e devolve só os com situação Active (responsavelDeveSerMembroAtivo), limitado a poucos resultados.
   * Saída: membros com id, nome e situação para o seletor de responsável.
   */
  'tarefas.minhas_tarefas.buscarResponsaveis': {
    kind: 'qry';
    input: { termo: string };
    output: { membros: MembroOpcao[] };
    rules: ['responsavelDeveSerMembroAtivo'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
  /**
   * Finalidade: Cria a tarefa com sua checklist inicial e a atribui ao responsável escolhido.
   * Entrada: chaveCriacao: chave gerada ao abrir o formulário; listaId, titulo, descricao, prioridade, prazo, responsavelId: campos da tarefa; criadorId: id do membro da sessão, que será o criador e revisor da tarefa; checklist: itens com ordem e descrição.
   * Processamento: Em uma transação grava a tarefa em aFazer e os itens da checklist; criadorId deve ser o membro da sessão (resolvido pelo login) e é recusado se diferir. Com chave já usada devolve a tarefa existente sem duplicar nem gerar nova mensagem (criacaoIdempotente). Recusa lista inativa (listaInativaNaoRecebeTarefa) e responsável que não seja membro ativo (responsavelDeveSerMembroAtivo). criadaEm é gravado pelo sistema; campos derivados são calculados na leitura.
   * Saída: tarefa completa para abrir no detalhe e resumo para inserir na lista sem nova consulta.
   */
  'tarefas.minhas_tarefas.salvarNovaTarefa': {
    kind: 'cmd';
    writes: 'Tarefa.create';
    input: { chaveCriacao: string; listaId: string; titulo: string; details: { descricao?: string }; prioridade: 'low' | 'medium' | 'high'; prazo: string; responsavelId: string; criadorId: string; checklist?: ItemChecklistEntrada[] };
    output: { tarefa: TarefaAberta; resumo: TarefaResumo };
    rules: ['criacaoIdempotente', 'listaInativaNaoRecebeTarefa', 'responsavelDeveSerMembroAtivo'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
  /**
   * Finalidade: Salva a edição da tarefa aberta: campos, troca de responsável e ajustes da checklist.
   * Entrada: id e version: tarefa editada e versão para concorrência; listaId, titulo, descricao, prioridade, prazo, responsavelId: novos valores; checklist: itens finais (com id altera, sem id inclui, ausentes são removidos).
   * Processamento: Só edita tarefa visível ao membro (editarSomenteTarefaVisivel). Nunca altera status (edicaoNaoMudaSituacao, checklistNaoMudaSituacao). Se responsavelId mudou, exige que o membro seja o criador (reatribuicaoPorCriadorOuGestor) e que o novo seja membro ativo (responsavelDeveSerMembroAtivo), avisando o novo responsável. Recusa mover para lista inativa (listaInativaNaoRecebeTarefa). Grava tarefa e itens juntos e recusa version desatualizada.
   * Saída: tarefa atualizada para redesenhar detalhe e formulário e resumo para atualizar a linha da lista.
   */
  'tarefas.minhas_tarefas.salvarEdicaoTarefa': {
    kind: 'cmd';
    writes: 'Tarefa.update';
    input: { id: string; version: number; listaId: string; titulo: string; details: { descricao?: string }; prioridade: 'low' | 'medium' | 'high'; prazo: string; responsavelId: string; checklist?: ItemChecklistEntrada[] };
    output: { tarefa: TarefaAberta; resumo: TarefaResumo };
    rules: ['edicaoNaoMudaSituacao', 'editarSomenteTarefaVisivel', 'reatribuicaoPorCriadorOuGestor', 'responsavelDeveSerMembroAtivo', 'listaInativaNaoRecebeTarefa', 'checklistNaoMudaSituacao'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
  /**
   * Finalidade: Inicia a tarefa, passando de a fazer para em andamento.
   * Entrada: id e version da tarefa aberta.
   * Processamento: Recusa se o membro da sessão não for o responsável (somenteResponsavelExecuta) ou se a tarefa estiver concluída/cancelada (tarefaEncerradaNaoTransiciona); aplica a transição iniciar e registra a mensagem na sala da tarefa.
   * Saída: tarefa e resumo atualizados para redesenhar detalhe, ações e lista.
   */
  'tarefas.minhas_tarefas.iniciarTarefa': {
    kind: 'cmd';
    writes: 'Tarefa.iniciar';
    input: { id: string; version: number };
    output: { tarefa: TarefaAberta; resumo: TarefaResumo };
    rules: ['somenteResponsavelExecuta', 'tarefaEncerradaNaoTransiciona'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
  /**
   * Finalidade: Marca ou desmarca um item da checklist da tarefa aberta.
   * Entrada: id e version do item; feito: novo estado do item.
   * Processamento: Só altera itens de tarefa visível ao membro (editarSomenteTarefaVisivel); grava feito e marcadoEm (momento da marcação, vazio ao desmarcar) sem mudar a situação da tarefa (checklistNaoMudaSituacao). O progresso da checklist é derivado e recalculado na leitura.
   * Saída: tarefa com a checklist e o progresso atualizados e resumo para a linha da lista.
   */
  'tarefas.minhas_tarefas.marcarItemChecklist': {
    kind: 'cmd';
    writes: 'ItemChecklist.update';
    input: { id: string; version: number; feito: boolean };
    output: { tarefa: TarefaAberta; resumo: TarefaResumo };
    rules: ['checklistNaoMudaSituacao', 'editarSomenteTarefaVisivel'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
  /**
   * Finalidade: Envia ou reenvia a tarefa para revisão do criador.
   * Entrada: id e version da tarefa aberta.
   * Processamento: Recusa se o membro não for o responsável (somenteResponsavelExecuta) ou se a tarefa estiver encerrada (tarefaEncerradaNaoTransiciona); passa de emAndamento para emRevisao, registra a mensagem e avisa o criador.
   * Saída: tarefa e resumo atualizados.
   */
  'tarefas.minhas_tarefas.enviarParaRevisao': {
    kind: 'cmd';
    writes: 'Tarefa.enviarParaRevisao';
    input: { id: string; version: number };
    output: { tarefa: TarefaAberta; resumo: TarefaResumo };
    rules: ['somenteResponsavelExecuta', 'tarefaEncerradaNaoTransiciona'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
  /**
   * Finalidade: Aceita a entrega da tarefa em revisão, concluindo-a.
   * Entrada: id e version da tarefa aberta.
   * Processamento: Recusa se o membro não for o criador (somenteCriadorRevisa) ou se a tarefa já estiver encerrada (tarefaEncerradaNaoTransiciona); passa de emRevisao para concluida, grava concluidaEm e registra a mensagem.
   * Saída: tarefa e resumo atualizados, com o aceite no histórico.
   */
  'tarefas.minhas_tarefas.aceitarEntrega': {
    kind: 'cmd';
    writes: 'Tarefa.aceitar';
    input: { id: string; version: number };
    output: { tarefa: TarefaAberta; resumo: TarefaResumo };
    rules: ['somenteCriadorRevisa', 'tarefaEncerradaNaoTransiciona'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
  /**
   * Finalidade: Devolve a tarefa em revisão para ajuste, com o motivo.
   * Entrada: id e version da tarefa; motivoDevolucao: explicação do que ajustar.
   * Processamento: Recusa se o membro não for o criador (somenteCriadorRevisa), se o motivo estiver vazio (devolucaoExigeMotivo) ou se a tarefa estiver encerrada (tarefaEncerradaNaoTransiciona); passa de emRevisao para emAndamento, grava motivo e devolvidaEm e avisa o responsável.
   * Saída: tarefa e resumo atualizados, com o motivo visível no detalhe e no histórico.
   */
  'tarefas.minhas_tarefas.devolverComMotivo': {
    kind: 'cmd';
    writes: 'Tarefa.devolver';
    input: { id: string; version: number; details: { motivoDevolucao: string } };
    output: { tarefa: TarefaAberta; resumo: TarefaResumo };
    rules: ['somenteCriadorRevisa', 'devolucaoExigeMotivo', 'tarefaEncerradaNaoTransiciona'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
  /**
   * Finalidade: Cancela uma tarefa que o membro criou.
   * Entrada: id e version da tarefa aberta.
   * Processamento: Recusa se o membro não for o criador (cancelamentoPorCriadorOuGestor) ou se a tarefa já estiver concluída ou cancelada (tarefaEncerradaNaoTransiciona); passa para cancelada, grava canceladaEm e registra a mensagem na sala.
   * Saída: tarefa e resumo atualizados com a situação cancelada.
   */
  'tarefas.minhas_tarefas.cancelarTarefa': {
    kind: 'cmd';
    writes: 'Tarefa.cancelar';
    input: { id: string; version: number };
    output: { tarefa: TarefaAberta; resumo: TarefaResumo };
    rules: ['cancelamentoPorCriadorOuGestor', 'tarefaEncerradaNaoTransiciona'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
}

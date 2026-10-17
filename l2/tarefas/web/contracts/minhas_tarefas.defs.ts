/// <mls fileReference="_102047_/l2/tarefas/web/contracts/minhas_tarefas.defs.ts" enhancement="_blank"/>

/** Lista (projeto ou área) à qual uma tarefa pertence, identificada pelo nome. */
export interface ListaRef {
  nome: string;
}

/** Membro da equipe ligado a uma tarefa, identificado pelo nome. */
export interface MembroRef {
  details: {
    identification: {
      name: string;
    };
  };
}

/** Tarefa resumida com lista, responsável, criador, prazo, situação e indicadores de prazo, subtarefas e checklist. */
export interface TarefaResumo {
  id: string;
  version: number;
  titulo: string;
  listaId: string;
  lista: ListaRef;
  responsavelId: string;
  responsavel: MembroRef;
  criadorId: string;
  criador: MembroRef;
  prioridade: 'low' | 'medium' | 'high';
  prazo: string;
  status: 'aFazer' | 'emAndamento' | 'emRevisao' | 'concluida' | 'cancelada';
  details: {
    readonly quantidadeSubtarefas: number;
    readonly progressoChecklist: string;
    readonly venceHoje: boolean;
    readonly atrasada: boolean;
    devolvidaEm?: string;
  };
}

/** Item da checklist de uma tarefa, com ordem, descrição e marcação de feito. */
export interface ItemChecklistLinha {
  id: string;
  version: number;
  ordem: number;
  feito: boolean;
  details: {
    descricao: string;
    marcadoEm?: string;
  };
}

/** Tarefa completa com lista, criador, responsável, situação, marcos do ciclo, motivo da devolução, papel de quem consulta e checklist ordenada. */
export interface TarefaDetalhe {
  id: string;
  version: number;
  titulo: string;
  details: {
    descricao?: string;
    motivoDevolucao?: string;
    devolvidaEm?: string;
    concluidaEm?: string;
    canceladaEm?: string;
  };
  listaId: string;
  lista: ListaRef;
  criadorId: string;
  criador: MembroRef;
  responsavelId: string;
  responsavel: MembroRef;
  prazo: string;
  prioridade: 'low' | 'medium' | 'high';
  status: 'aFazer' | 'emAndamento' | 'emRevisao' | 'concluida' | 'cancelada';
  readonly criadaEm: string;
  readonly souCriador: boolean;
  readonly souResponsavel: boolean;
  checklist: ItemChecklistLinha[];
}

/** Lista ativa que pode receber tarefas, com nome e tipo. */
export interface ListaOpcao {
  id: string;
  nome: string;
  ativa: boolean;
  details: {
    tipo: 'project' | 'area';
  };
}

/** Membro da equipe que pode ser escolhido como responsável, com nome e situação no cadastro. */
export interface MembroOpcao {
  id: string;
  details: {
    identification: {
      name: string;
      readonly status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
    };
  };
}

/** Item da checklist informado na criação ou no ajuste da checklist; sem id é um item novo. */
export interface ItemChecklistEntrada {
  id?: string;
  version?: number;
  details: {
    descricao: string;
  };
  ordem: number;
  feito: boolean;
}

export interface Minhas_tarefasContracts {
  /**
   * Finalidade: Lista, paginadas, as tarefas que o membro da sessão criou ou pelas quais é responsável, com o filtro rápido escolhido.
   * Entrada: filtro: criadasPorMim (criadorId = sessão), atribuidasAMim (responsavelId = sessão), emRevisao (status emRevisao), devolvidas (devolvidaEm preenchida e status emAndamento); ausente traz todas as minhas. page e pageSize: página pedida e tamanho da página.
   * Processamento: Filtra pelas tarefas visíveis ao membro (editarSomenteTarefaVisivel: criador ou responsável é a pessoa da sessão), aplica o filtro, ordena por prazo. Junta o nome da lista e os nomes de responsável e criador em lote. Calcula venceHoje e atrasada (tarefa aberta com prazo hoje ou anterior a hoje), quantidadeSubtarefas (contagem de tarefas filhas) e progressoChecklist (itens feitos do total) — todos derivados, nunca gravados.
   * Saída: Página de tarefas { items, page, pageSize, hasMore } no formato resumido, com lista, responsável, criador, prioridade, prazo, situação e indicadores.
   */
  'tarefas.minhas_tarefas.qryMinhasTarefas': {
    kind: 'qry';
    input: { filtro?: 'criadasPorMim' | 'atribuidasAMim' | 'emRevisao' | 'devolvidas'; page: number; pageSize: number };
    output: { tarefas: { items: TarefaResumo[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['editarSomenteTarefaVisivel'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
  /**
   * Finalidade: Abre uma tarefa escolhida com seus dados, checklist e marcos do ciclo.
   * Entrada: tarefaId: id da tarefa selecionada.
   * Processamento: Lê a tarefa pelo id e recusa se o membro não for criador nem responsável (editarSomenteTarefaVisivel). Junta o nome da lista, os nomes de criador e responsável e os itens da checklist ordenados por ordem. Calcula souCriador e souResponsavel comparando criadorId e responsavelId com a pessoa da sessão.
   * Saída: A tarefa no estado atual, com descrição, lista, criador, responsável, prazo, prioridade, situação, motivo e data da devolução, datas de criação, conclusão e cancelamento, papel de quem consulta e checklist.
   */
  'tarefas.minhas_tarefas.qryTarefa': {
    kind: 'qry';
    input: { tarefaId: string };
    output: { tarefa: TarefaDetalhe };
    rules: ['editarSomenteTarefaVisivel'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
  /**
   * Finalidade: Traz as listas onde o membro pode colocar uma tarefa.
   * Entrada: Nenhuma.
   * Processamento: Filtra as listas com ativa = true (listaInativaNaoRecebeTarefa) e ordena por nome.
   * Saída: Listas ativas com id, nome, ativa e tipo.
   */
  'tarefas.minhas_tarefas.qryListasAtivas': {
    kind: 'qry';
    input: {};
    output: { listas: ListaOpcao[] };
    rules: ['listaInativaNaoRecebeTarefa'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
  /**
   * Finalidade: Busca membros da equipe pelo nome para escolher ou trocar o responsável.
   * Entrada: termo: trecho do nome digitado.
   * Processamento: Busca no cadastro mestre membros com o papel tarefas.MembroEquipe cujo nome contém o termo, somente com situação Active (responsavelDeveSerMembroAtivo), ordenados por nome, limitados a um número curto de resultados.
   * Saída: Membros ativos encontrados com id, nome e situação.
   */
  'tarefas.minhas_tarefas.qryBuscarMembros': {
    kind: 'qry';
    input: { termo: string };
    output: { membros: MembroOpcao[] };
    rules: ['responsavelDeveSerMembroAtivo'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
  /**
   * Finalidade: Cria uma nova tarefa com sua checklist inicial.
   * Entrada: chaveCriacao: chave gerada ao abrir o formulário; listaId, titulo, details.descricao, prioridade, prazo, responsavelId: dados da tarefa; criadorId: criador da tarefa, opcional — o servidor sempre grava a pessoa da sessão e recusa um valor diferente dela; checklist: itens iniciais com descrição, ordem e feito.
   * Processamento: Recusa lista inativa (listaInativaNaoRecebeTarefa) e responsável que não seja membro ativo (responsavelDeveSerMembroAtivo). Se já existir tarefa com a mesma chaveCriacao, devolve a já criada sem criar outra nem repetir mensagens (criacaoIdempotente). Caso contrário grava, em uma transação, a tarefa em aFazer com criadorId = pessoa da sessão e os itens da checklist; criadaEm é preenchido pelo sistema. Avisa o responsável.
   * Saída: A tarefa criada em situação aFazer, no formato de detalhe, com checklist.
   */
  'tarefas.minhas_tarefas.cmdCriarTarefa': {
    kind: 'cmd';
    writes: 'Tarefa.create';
    input: { chaveCriacao: string; listaId: string; titulo: string; details: { descricao?: string }; prioridade: 'low' | 'medium' | 'high'; prazo: string; responsavelId: string; criadorId?: string; checklist?: ItemChecklistEntrada[] };
    output: { tarefa: TarefaDetalhe };
    rules: ['criacaoIdempotente', 'listaInativaNaoRecebeTarefa', 'responsavelDeveSerMembroAtivo'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
  /**
   * Finalidade: Salva a edição dos campos da tarefa, incluindo a troca de responsável.
   * Entrada: id e version: tarefa e versão lida; listaId, titulo, details.descricao, prioridade, prazo, responsavelId: novos valores.
   * Processamento: Recusa se o membro não vê a tarefa (editarSomenteTarefaVisivel) ou se a versão mudou. Se a lista mudou, recusa lista inativa (listaInativaNaoRecebeTarefa). Se o responsável mudou, exige que a pessoa da sessão seja a criadora (reatribuicaoPorCriadorOuGestor) e que o novo responsável seja membro ativo (responsavelDeveSerMembroAtivo), e avisa o novo responsável. Nunca altera a situação (edicaoNaoMudaSituacao).
   * Saída: A tarefa atualizada, com nova versão, no formato de detalhe com checklist.
   */
  'tarefas.minhas_tarefas.cmdSalvarEdicao': {
    kind: 'cmd';
    writes: 'Tarefa.update';
    input: { id: string; version: number; listaId: string; titulo: string; details: { descricao?: string }; prioridade: 'low' | 'medium' | 'high'; prazo: string; responsavelId: string };
    output: { tarefa: TarefaDetalhe };
    rules: ['edicaoNaoMudaSituacao', 'editarSomenteTarefaVisivel', 'reatribuicaoPorCriadorOuGestor', 'responsavelDeveSerMembroAtivo', 'listaInativaNaoRecebeTarefa'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
  /**
   * Finalidade: Salva a checklist da tarefa: altera descrição e ordem, marca ou desmarca itens e inclui itens novos.
   * Entrada: tarefaId: tarefa dona da checklist; itens: itens com id e version quando existentes, e descricao, ordem e feito.
   * Processamento: Recusa se o membro não vê a tarefa (editarSomenteTarefaVisivel) ou se a versão de algum item mudou. Atualiza cada item; ao marcar feito registra marcadoEm, ao desmarcar o limpa; itens sem id são incluídos. Não altera a situação da tarefa (checklistNaoMudaSituacao).
   * Saída: A tarefa com a checklist salva, em ordem, e o restante dos dados no formato de detalhe.
   */
  'tarefas.minhas_tarefas.cmdSalvarChecklist': {
    kind: 'cmd';
    writes: 'ItemChecklist.update';
    input: { tarefaId: string; itens: ItemChecklistEntrada[] };
    output: { tarefa: TarefaDetalhe };
    rules: ['checklistNaoMudaSituacao', 'editarSomenteTarefaVisivel'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
  /**
   * Finalidade: Inicia a tarefa, passando de a fazer para em andamento.
   * Entrada: id e version da tarefa.
   * Processamento: Exige que a pessoa da sessão seja o responsável (somenteResponsavelExecuta) e que a tarefa esteja em aFazer, recusando tarefa concluída ou cancelada (tarefaEncerradaNaoTransiciona). Aplica a transição iniciar e registra a mensagem na sala de discussão.
   * Saída: A tarefa em situação emAndamento, no formato de detalhe.
   */
  'tarefas.minhas_tarefas.cmdIniciar': {
    kind: 'cmd';
    writes: 'Tarefa.iniciar';
    input: { id: string; version: number };
    output: { tarefa: TarefaDetalhe };
    rules: ['somenteResponsavelExecuta', 'tarefaEncerradaNaoTransiciona'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
  /**
   * Finalidade: Envia ou reenvia a tarefa para revisão do criador.
   * Entrada: id e version da tarefa.
   * Processamento: Exige que a pessoa da sessão seja o responsável (somenteResponsavelExecuta) e que a tarefa esteja em emAndamento, recusando tarefa encerrada (tarefaEncerradaNaoTransiciona). Aplica enviarParaRevisao, registra a mensagem na sala e avisa o criador.
   * Saída: A tarefa em situação emRevisao, no formato de detalhe.
   */
  'tarefas.minhas_tarefas.cmdEnviarRevisao': {
    kind: 'cmd';
    writes: 'Tarefa.enviarParaRevisao';
    input: { id: string; version: number };
    output: { tarefa: TarefaDetalhe };
    rules: ['somenteResponsavelExecuta', 'tarefaEncerradaNaoTransiciona'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
  /**
   * Finalidade: Aceita a entrega da tarefa e a conclui.
   * Entrada: id e version da tarefa.
   * Processamento: Exige que a pessoa da sessão seja a criadora (somenteCriadorRevisa) e que a tarefa esteja em emRevisao, recusando tarefa encerrada (tarefaEncerradaNaoTransiciona). Aplica aceitar, registra concluidaEm e a mensagem na sala.
   * Saída: A tarefa em situação concluida com a data de conclusão, no formato de detalhe.
   */
  'tarefas.minhas_tarefas.cmdAceitar': {
    kind: 'cmd';
    writes: 'Tarefa.aceitar';
    input: { id: string; version: number };
    output: { tarefa: TarefaDetalhe };
    rules: ['somenteCriadorRevisa', 'tarefaEncerradaNaoTransiciona'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
  /**
   * Finalidade: Devolve a tarefa em revisão para ajuste, com o motivo.
   * Entrada: id e version da tarefa; details.motivoDevolucao: por que a entrega volta para ajuste.
   * Processamento: Exige que a pessoa da sessão seja a criadora (somenteCriadorRevisa), que a tarefa esteja em emRevisao (tarefaEncerradaNaoTransiciona) e recusa motivo vazio (devolucaoExigeMotivo). Aplica devolver, grava o motivo e devolvidaEm, volta para emAndamento e avisa o responsável.
   * Saída: A tarefa em situação emAndamento com o motivo e a data da devolução, no formato de detalhe.
   */
  'tarefas.minhas_tarefas.cmdDevolver': {
    kind: 'cmd';
    writes: 'Tarefa.devolver';
    input: { id: string; version: number; details: { motivoDevolucao: string } };
    output: { tarefa: TarefaDetalhe };
    rules: ['somenteCriadorRevisa', 'devolucaoExigeMotivo', 'tarefaEncerradaNaoTransiciona'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
  /**
   * Finalidade: Cancela uma tarefa criada pelo membro.
   * Entrada: id e version da tarefa.
   * Processamento: Exige que a pessoa da sessão seja a criadora (cancelamentoPorCriadorOuGestor) e que a tarefa esteja em aFazer, emAndamento ou emRevisao (tarefaEncerradaNaoTransiciona). Aplica cancelar, registra canceladaEm e a mensagem na sala.
   * Saída: A tarefa em situação cancelada com a data do cancelamento, no formato de detalhe.
   */
  'tarefas.minhas_tarefas.cmdCancelar': {
    kind: 'cmd';
    writes: 'Tarefa.cancelar';
    input: { id: string; version: number };
    output: { tarefa: TarefaDetalhe };
    rules: ['cancelamentoPorCriadorOuGestor', 'tarefaEncerradaNaoTransiciona'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
}

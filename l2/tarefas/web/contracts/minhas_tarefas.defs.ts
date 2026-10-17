/// <mls fileReference="_102047_/l2/tarefas/web/contracts/minhas_tarefas.defs.ts" enhancement="_blank"/>

/** Identificação de um membro da equipe no cadastro mestre: nome e situação no cadastro. */
export interface MembroIdentificacao {
  details: {
    identification: {
      name: string;
      readonly status?: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
    };
  };
}

/** Detalhes de um membro da equipe com a sua identificação. */
export interface MembroResumoDetails {
  identification: MembroIdentificacao;
}

/** Membro da equipe com id e nome. */
export interface MembroResumo {
  id: string;
  details: MembroResumoDetails;
}

/** Lista (projeto ou área) identificada pelo nome. */
export interface ListaResumo {
  id: string;
  nome: string;
}

/** Detalhes de uma lista: o tipo. */
export interface ListaOpcaoDetails {
  tipo: 'project' | 'area';
}

/** Lista que pode receber tarefas, com nome, tipo e indicação de ativa. */
export interface ListaOpcao {
  id: string;
  nome: string;
  ativa: boolean;
  details: ListaOpcaoDetails;
}

/** Indicadores calculados de uma tarefa: subtarefas, progresso da checklist, vencimento e última devolução. */
export interface TarefaResumoDetails {
  readonly quantidadeSubtarefas: number;
  readonly progressoChecklist: string;
  readonly venceHoje: boolean;
  readonly atrasada: boolean;
  devolvidaEm?: string;
}

/** Tarefa em forma resumida: título, lista, responsável, criador, prioridade, prazo, situação e indicadores. */
export interface TarefaResumo {
  id: string;
  version: number;
  titulo: string;
  status: 'aFazer' | 'emAndamento' | 'emRevisao' | 'concluida' | 'cancelada';
  prioridade: 'low' | 'medium' | 'high';
  prazo: string;
  listaId: string;
  lista: ListaResumo;
  responsavelId: string;
  responsavel: MembroResumo;
  criadorId: string;
  criador: MembroResumo;
  details: TarefaResumoDetails;
}

/** Descrição editável de um item da checklist. */
export interface ItemChecklistEdicaoDetails {
  descricao: string;
}

/** Detalhes de um item da checklist: descrição e momento da marcação. */
export interface ItemChecklistDetails {
  details: {
    descricao: string;
    marcadoEm?: string;
  };
}

/** Item da checklist de uma tarefa, com ordem, indicação de feito e descrição. */
export interface ItemChecklistLinha {
  id: string;
  version: number;
  ordem: number;
  feito: boolean;
  details: ItemChecklistDetails;
}

/** Item inicial da checklist de uma tarefa nova. */
export interface NovoItemChecklist {
  ordem: number;
  details: ItemChecklistEdicaoDetails;
}

/** Alteração de um item existente da checklist: ordem, feito e descrição, com a versão lida. */
export interface ItemChecklistAlteracao {
  id: string;
  version: number;
  ordem: number;
  feito: boolean;
  details: ItemChecklistEdicaoDetails;
}

/** Detalhes de uma tarefa: descrição, motivo e momento da devolução, conclusão e cancelamento. */
export interface TarefaDetalheDetails {
  descricao?: string;
  motivoDevolucao?: string;
  devolvidaEm?: string;
  concluidaEm?: string;
  canceladaEm?: string;
}

/** Tarefa completa com lista, criador, responsável, datas do ciclo, motivo da devolução e itens da checklist em ordem. */
export interface TarefaDetalhe {
  id: string;
  version: number;
  titulo: string;
  status: 'aFazer' | 'emAndamento' | 'emRevisao' | 'concluida' | 'cancelada';
  prioridade: 'low' | 'medium' | 'high';
  prazo: string;
  readonly criadaEm: string;
  listaId: string;
  lista: ListaResumo;
  responsavelId: string;
  responsavel: MembroResumo;
  criadorId: string;
  criador: MembroResumo;
  details: TarefaDetalheDetails;
  itensChecklist: ItemChecklistLinha[];
}

export interface Minhas_tarefasContracts {
  /**
   * Finalidade: Abre a página com a primeira página das tarefas da pessoa logada e as listas ativas onde ela pode criar tarefas.
   * Entrada: filtro: recorte rápido (todas, criadas por mim, atribuídas a mim, em revisão, devolvidas; padrão todas). page/pageSize: página das tarefas.
   * Processamento: Seleciona as tarefas cujo criador ou responsável é a pessoa da sessão; aplica o filtro (criadorId = sessão; responsavelId = sessão; status emRevisao; devolvidaEm preenchida e status emAndamento). Ordena por prazo. Compõe nome da lista e nomes de responsável e criador lidos no cadastro mestre. Calcula venceHoje, atrasada, quantidadeSubtarefas e progressoChecklist (itens feitos / total) na leitura, sem gravar. Lista as listas com ativa = true ordenadas por nome.
   * Saída: tarefas: página de tarefas resumidas com lista, responsável, criador, prioridade, prazo, situação e indicadores calculados. listas: listas ativas com nome, tipo e ativa.
   */
  'tarefas.minhas_tarefas.carregarMinhasTarefas': {
    kind: 'qry';
    input: { filtro?: 'todas' | 'criadasPorMim' | 'atribuidasAMim' | 'emRevisao' | 'devolvidas'; page: number; pageSize: number };
    output: { tarefas: { items: TarefaResumo[]; page: number; pageSize: number; hasMore: boolean }; listas: ListaOpcao[] };
    rules: [];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
  /**
   * Finalidade: Recarrega as tarefas da pessoa logada quando ela troca o filtro rápido, pesquisa pelo título ou pede outra página.
   * Entrada: filtro: recorte rápido (todas, criadas por mim, atribuídas a mim, em revisão, devolvidas). busca: trecho do título. page/pageSize: página pedida.
   * Processamento: Mesma seleção de carregarMinhasTarefas: tarefas em que a pessoa da sessão é criadora ou responsável, filtro aplicado, busca por texto no título, ordenação por prazo; compõe nomes de lista, responsável e criador e calcula venceHoje, atrasada, quantidadeSubtarefas e progressoChecklist na leitura.
   * Saída: tarefas: página de tarefas resumidas no filtro e na busca pedidos.
   */
  'tarefas.minhas_tarefas.listarMinhasTarefas': {
    kind: 'qry';
    input: { filtro?: 'todas' | 'criadasPorMim' | 'atribuidasAMim' | 'emRevisao' | 'devolvidas'; busca?: string; page: number; pageSize: number };
    output: { tarefas: { items: TarefaResumo[]; page: number; pageSize: number; hasMore: boolean } };
    rules: [];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
  /**
   * Finalidade: Abre a tarefa escolhida com tudo o que o detalhe, as ações, o formulário e o histórico precisam.
   * Entrada: id: id da tarefa escolhida.
   * Processamento: Lê a tarefa por id, recusando se a pessoa da sessão não for criadora nem responsável. Compõe nome da lista, nomes de criador e responsável do cadastro mestre e os itens da checklist ordenados por ordem.
   * Saída: tarefa: a tarefa com versão, situação, datas de criação, devolução, conclusão e cancelamento, motivo da devolução e checklist.
   */
  'tarefas.minhas_tarefas.abrirTarefa': {
    kind: 'qry';
    input: { id: string };
    output: { tarefa: TarefaDetalhe };
    rules: [];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
  /**
   * Finalidade: Busca pelo nome os membros que podem ser escolhidos como responsável.
   * Entrada: nome: trecho do nome digitado.
   * Processamento: Localiza membros por nome e mantém só os com situação Active, conforme responsavelDeveSerMembroAtivo; limita a poucas dezenas ordenadas por nome.
   * Saída: membros: membros ativos com id, nome e situação no cadastro.
   */
  'tarefas.minhas_tarefas.buscarMembros': {
    kind: 'qry';
    input: { nome: string };
    output: { membros: MembroResumo[] };
    rules: ['responsavelDeveSerMembroAtivo'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
  /**
   * Finalidade: Cria uma nova tarefa com sua checklist inicial e a atribui ao responsável escolhido.
   * Entrada: chaveCriacao: chave gerada ao abrir o formulário. listaId, titulo, details.descricao, prioridade, prazo, responsavelId: dados da tarefa. criadorId: criador da tarefa; opcional, pois o servidor sempre grava a pessoa da sessão e recusa um valor diferente dela. itensChecklist: itens iniciais com ordem e descrição.
   * Processamento: Recusa lista inativa (listaInativaNaoRecebeTarefa) e responsável que não seja membro ativo (responsavelDeveSerMembroAtivo). Grava a tarefa em aFazer com a pessoa da sessão como criadora e os itens da checklist (feito = false) numa só transação. Se já existir tarefa com a mesma chaveCriacao, devolve a já criada sem duplicar nem gerar nova mensagem (criacaoIdempotente). Avisa o responsável.
   * Saída: tarefa: a tarefa criada, em aFazer, com checklist. resumo: a mesma tarefa em forma resumida com indicadores calculados.
   */
  'tarefas.minhas_tarefas.criarTarefa': {
    kind: 'cmd';
    writes: 'Tarefa.create';
    input: { chaveCriacao: string; listaId: string; titulo: string; details: { descricao?: string }; prioridade: 'low' | 'medium' | 'high'; prazo: string; responsavelId: string; criadorId?: string; itensChecklist?: NovoItemChecklist[] };
    output: { tarefa: TarefaDetalhe; resumo: TarefaResumo };
    rules: ['criacaoIdempotente', 'listaInativaNaoRecebeTarefa', 'responsavelDeveSerMembroAtivo'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
  /**
   * Finalidade: Salva os campos editados da tarefa, incluindo a troca de responsável.
   * Entrada: id e version: tarefa e versão lida. listaId, titulo, details.descricao, prioridade, prazo, responsavelId: novos valores.
   * Processamento: Recusa se a pessoa não for criadora nem responsável (editarSomenteTarefaVisivel) ou se a versão mudou. Se o responsável mudou, exige que a pessoa seja a criadora (reatribuicaoPorCriadorOuGestor) e que o novo seja membro ativo (responsavelDeveSerMembroAtivo), e avisa o novo responsável. Se a lista mudou, recusa lista inativa (listaInativaNaoRecebeTarefa). Nunca altera a situação (edicaoNaoMudaSituacao).
   * Saída: tarefa: a tarefa atualizada, com nova versão e mesma situação. resumo: a mesma tarefa resumida.
   */
  'tarefas.minhas_tarefas.salvarEdicao': {
    kind: 'cmd';
    writes: 'Tarefa.update';
    input: { id: string; version: number; listaId: string; titulo: string; details: { descricao?: string }; prioridade: 'low' | 'medium' | 'high'; prazo: string; responsavelId: string };
    output: { tarefa: TarefaDetalhe; resumo: TarefaResumo };
    rules: ['editarSomenteTarefaVisivel', 'edicaoNaoMudaSituacao', 'reatribuicaoPorCriadorOuGestor', 'responsavelDeveSerMembroAtivo', 'listaInativaNaoRecebeTarefa'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
  /**
   * Finalidade: Salva as alterações dos itens da checklist: descrição, ordem e marcação de feito.
   * Entrada: tarefaId: tarefa dos itens. itens: cada item com id, versão lida, ordem, feito e descrição.
   * Processamento: Recusa se a pessoa não for criadora nem responsável da tarefa (editarSomenteTarefaVisivel) ou se algum item mudou de versão. Atualiza os itens; o momento de marcação é registrado pelo servidor quando o item passa a feito e limpo quando é desmarcado. Não altera a situação da tarefa (checklistNaoMudaSituacao).
   * Saída: tarefa: a tarefa com a checklist atualizada. resumo: a tarefa resumida com o progresso da checklist recalculado.
   */
  'tarefas.minhas_tarefas.salvarChecklist': {
    kind: 'cmd';
    writes: 'ItemChecklist.update';
    input: { tarefaId: string; itens: ItemChecklistAlteracao[] };
    output: { tarefa: TarefaDetalhe; resumo: TarefaResumo };
    rules: ['editarSomenteTarefaVisivel', 'checklistNaoMudaSituacao'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
  /**
   * Finalidade: Inicia a tarefa atribuída à pessoa.
   * Entrada: id e version: tarefa e versão lida.
   * Processamento: Exige que a pessoa da sessão seja a responsável (somenteResponsavelExecuta) e que a tarefa esteja em aFazer, nunca concluída ou cancelada (tarefaEncerradaNaoTransiciona). Move para emAndamento e registra a mensagem na sala de discussão.
   * Saída: tarefa: a tarefa em emAndamento. resumo: a mesma tarefa resumida.
   */
  'tarefas.minhas_tarefas.iniciarTarefa': {
    kind: 'cmd';
    writes: 'Tarefa.iniciar';
    input: { id: string; version: number };
    output: { tarefa: TarefaDetalhe; resumo: TarefaResumo };
    rules: ['somenteResponsavelExecuta', 'tarefaEncerradaNaoTransiciona'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
  /**
   * Finalidade: Envia ou reenvia a tarefa para a revisão do criador.
   * Entrada: id e version: tarefa e versão lida.
   * Processamento: Exige que a pessoa da sessão seja a responsável (somenteResponsavelExecuta) e que a tarefa esteja em emAndamento, nunca encerrada (tarefaEncerradaNaoTransiciona). Move para emRevisao, registra a mensagem na sala e avisa o criador.
   * Saída: tarefa: a tarefa em emRevisao. resumo: a mesma tarefa resumida.
   */
  'tarefas.minhas_tarefas.enviarParaRevisao': {
    kind: 'cmd';
    writes: 'Tarefa.enviarParaRevisao';
    input: { id: string; version: number };
    output: { tarefa: TarefaDetalhe; resumo: TarefaResumo };
    rules: ['somenteResponsavelExecuta', 'tarefaEncerradaNaoTransiciona'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
  /**
   * Finalidade: Aceita a entrega da tarefa e a conclui.
   * Entrada: id e version: tarefa e versão lida.
   * Processamento: Exige que a pessoa da sessão seja a criadora (somenteCriadorRevisa) e que a tarefa esteja em emRevisao, nunca encerrada (tarefaEncerradaNaoTransiciona). Move para concluida, registra concluidaEm e a mensagem na sala.
   * Saída: tarefa: a tarefa concluída com o momento da conclusão. resumo: a mesma tarefa resumida.
   */
  'tarefas.minhas_tarefas.aceitarTarefa': {
    kind: 'cmd';
    writes: 'Tarefa.aceitar';
    input: { id: string; version: number };
    output: { tarefa: TarefaDetalhe; resumo: TarefaResumo };
    rules: ['somenteCriadorRevisa', 'tarefaEncerradaNaoTransiciona'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
  /**
   * Finalidade: Devolve a tarefa em revisão para ajuste, com o motivo.
   * Entrada: id e version: tarefa e versão lida. details.motivoDevolucao: motivo da devolução.
   * Processamento: Exige que a pessoa seja a criadora (somenteCriadorRevisa), que a tarefa esteja em emRevisao e não encerrada (tarefaEncerradaNaoTransiciona) e que o motivo não esteja vazio (devolucaoExigeMotivo). Registra motivo e devolvidaEm, move para emAndamento e avisa o responsável.
   * Saída: tarefa: a tarefa em emAndamento com motivo e momento da devolução. resumo: a mesma tarefa resumida.
   */
  'tarefas.minhas_tarefas.devolverTarefa': {
    kind: 'cmd';
    writes: 'Tarefa.devolver';
    input: { id: string; version: number; details: { motivoDevolucao: string } };
    output: { tarefa: TarefaDetalhe; resumo: TarefaResumo };
    rules: ['somenteCriadorRevisa', 'devolucaoExigeMotivo', 'tarefaEncerradaNaoTransiciona'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
  /**
   * Finalidade: Cancela uma tarefa criada pela pessoa.
   * Entrada: id e version: tarefa e versão lida.
   * Processamento: Exige que a pessoa seja a criadora (cancelamentoPorCriadorOuGestor) e que a tarefa esteja em aFazer, emAndamento ou emRevisao (tarefaEncerradaNaoTransiciona). Move para cancelada, registra canceladaEm e a mensagem na sala.
   * Saída: tarefa: a tarefa cancelada com o momento do cancelamento. resumo: a mesma tarefa resumida.
   */
  'tarefas.minhas_tarefas.cancelarTarefa': {
    kind: 'cmd';
    writes: 'Tarefa.cancelar';
    input: { id: string; version: number };
    output: { tarefa: TarefaDetalhe; resumo: TarefaResumo };
    rules: ['cancelamentoPorCriadorOuGestor', 'tarefaEncerradaNaoTransiciona'];
    access: { actors: ['membroEquipe']; grants: ['membroTarefasProprias', 'membroConsultaListas', 'membroEscolheResponsavel']; scope: 'own' };
  };
}

/// <mls fileReference="_102047_/l2/inscricaoEvento/web/contracts/minhas_inscricoes.defs.ts" enhancement="_blank"/>

/** Evento da inscrição como aparece na lista: título e data. */
export interface EventoResumo {
  title: string;
  eventDate: string;
}

/** Apenas o título do evento, para o resumo e o histórico de promoções. */
export interface EventoTitulo {
  title: string;
}

/** Local do evento. */
export interface EventoVenue {
  details: {
    venue: {
      name: string;
    };
  };
}

/** Detalhes do evento usados no detalhe da inscrição. */
export interface EventoDetalheDetails {
  venue: EventoVenue;
}

/** Evento da inscrição aberta: título, data e local. */
export interface EventoDetalhe {
  title: string;
  eventDate: string;
  details: EventoDetalheDetails;
}

/** Linha da lista de inscrições da pessoa. */
export interface InscricaoListaItem {
  id: string;
  readonly registrationCode: string;
  eventoId: string;
  status: 'confirmed' | 'waitlisted' | 'cancelled';
  readonly receivedAt: string;
  evento: EventoResumo;
}

/** Campos derivados da inscrição: se ocupa vaga e posição na lista de espera. */
export interface InscricaoDetalheDetails {
  details: {
    readonly ocupaVaga: boolean;
    readonly posicaoListaEspera?: number;
  };
}

/** Inscrição aberta com seu evento, usada no detalhe e nas ações de cancelamento. */
export interface InscricaoDetalhe {
  id: string;
  version: number;
  readonly registrationCode: string;
  status: 'confirmed' | 'waitlisted' | 'cancelled';
  readonly receivedAt: string;
  details: InscricaoDetalheDetails;
  evento: EventoDetalhe;
}

/** Posição da inscrição na fila. */
export interface PosicaoEsperaDetails {
  details: {
    readonly posicaoListaEspera: number;
  };
}

/** Inscrição em lista de espera com a posição na fila e o evento. */
export interface PosicaoEsperaItem {
  id: string;
  details: PosicaoEsperaDetails;
  evento: EventoTitulo;
}

/** Panorama das inscrições da pessoa: contagens e posições na lista de espera. */
export interface ResumoInscricoes {
  readonly totalOcupandoVaga: number;
  readonly totalEmListaEspera: number;
  emListaEspera: PosicaoEsperaItem[];
}

/** Momento da promoção. */
export interface PromocaoDetails {
  details: {
    promotedAt: string;
  };
}

/** Evento do histórico: inscrição promovida da lista de espera. */
export interface PromocaoItem {
  id: string;
  readonly registrationCode: string;
  details: PromocaoDetails;
  evento: EventoTitulo;
}

export interface Minhas_inscricoesContracts {
  /**
   * Finalidade: Carrega de uma vez tudo que a página mostra ao abrir: o panorama das inscrições da pessoa, a lista das suas inscrições e o histórico de promoções da lista de espera.
   * Entrada: Sem parâmetros; o participante é identificado pela sessão do público (escopo own).
   * Processamento: Lê as inscrições do participante da sessão com o título e a data do evento, ordenadas por recebimento (mais recente primeiro). Calcula no servidor: totalOcupandoVaga = inscrições com ocupaVaga verdadeiro (confirmadas); totalEmListaEspera = inscrições com status waitlisted; emListaEspera com a posição derivada por calculoPosicaoListaEspera (inscrições do mesmo evento em lista de espera recebidas antes, mais um, na ordem de ordemChegadaListaEspera). Monta promocoes com as inscrições que têm promotedAt preenchido, em ordem cronológica. Campos derivados são calculados, nunca gravados.
   * Saída: resumo para o panorama, inscricoes para a lista e promocoes para a linha do tempo, já no formato que a página exibe.
   */
  'inscricaoEvento.minhas_inscricoes.carregarMinhasInscricoes': {
    kind: 'qry';
    input: {};
    output: { resumo: ResumoInscricoes; inscricoes: InscricaoListaItem[]; promocoes: PromocaoItem[] };
    rules: ['calculoPosicaoListaEspera', 'ordemChegadaListaEspera'];
    access: { actors: ['publico']; grants: ['publicoMinhasInscricoes']; scope: 'own' };
  };
  /**
   * Finalidade: Filtra as inscrições da pessoa pelo código da inscrição ou pelo título do evento.
   * Entrada: texto: termo digitado na busca; compara com o código da inscrição ou com o título do evento.
   * Processamento: Restringe às inscrições do participante da sessão (escopo own) e aplica o filtro por registrationCode ou Evento.title (sem distinção de maiúsculas), ordenando por recebimento.
   * Saída: A lista filtrada, que substitui a lista exibida.
   */
  'inscricaoEvento.minhas_inscricoes.buscarMinhasInscricoes': {
    kind: 'qry';
    input: { texto: string };
    output: { inscricoes: InscricaoListaItem[] };
    rules: [];
    access: { actors: ['publico']; grants: ['publicoMinhasInscricoes']; scope: 'own' };
  };
  /**
   * Finalidade: Abre a inscrição escolhida na lista para a pessoa conferir os dados antes de decidir cancelar.
   * Entrada: inscricaoId: id da inscrição selecionada na lista.
   * Processamento: Lê a inscrição garantindo que pertence ao participante da sessão; compõe o evento com título, data e nome do local. ocupaVaga é derivado do status confirmado; posicaoListaEspera é calculada por calculoPosicaoListaEspera apenas quando a inscrição está em lista de espera. Devolve a versão para o cancelamento com concorrência otimista.
   * Saída: A inscrição com seu evento e versão, usada pelo detalhe e pelas ações (que mostram o cancelamento só para confirmed ou waitlisted).
   */
  'inscricaoEvento.minhas_inscricoes.obterInscricao': {
    kind: 'qry';
    input: { id: string };
    output: { inscricao: InscricaoDetalhe };
    rules: ['calculoPosicaoListaEspera'];
    access: { actors: ['publico']; grants: ['publicoMinhasInscricoes']; scope: 'own' };
  };
  /**
   * Finalidade: Cancela a inscrição aberta pela pessoa, liberando a vaga quando ela a ocupava.
   * Entrada: inscricaoId: id da inscrição a cancelar. version: versão da inscrição lida no detalhe, para concorrência otimista (recusa se a inscrição mudou desde a leitura).
   * Processamento: Aplica cancelamentoSomentePropriaInscricao: recusa se a inscrição não pertence ao participante da sessão ou se o status não é confirmed ou waitlisted. Confere a versão e executa a transição cancelar (status cancelled, registrando cancelledAt). Se a inscrição ocupava vaga, na mesma transação promove a primeira inscrição em lista de espera do mesmo evento por ordem de chegada (ordemChegadaListaEspera, promoverPrimeiroListaEsperaAoCancelar), registrando promotedAt. Tudo ou nada.
   * Saída: A inscrição atualizada com seu evento e nova versão, para redesenhar o detalhe e as ações sem nova chamada.
   */
  'inscricaoEvento.minhas_inscricoes.cancelarInscricao': {
    kind: 'cmd';
    writes: 'Inscricao.cancelar';
    input: { id: string; version: number };
    output: { inscricao: InscricaoDetalhe };
    rules: ['cancelamentoSomentePropriaInscricao', 'promoverPrimeiroListaEsperaAoCancelar', 'ordemChegadaListaEspera'];
    access: { actors: ['publico']; grants: ['publicoMinhasInscricoes']; scope: 'own' };
  };
}

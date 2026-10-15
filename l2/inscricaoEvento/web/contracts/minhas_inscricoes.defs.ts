/// <mls fileReference="_102047_/l2/inscricaoEvento/web/contracts/minhas_inscricoes.defs.ts" enhancement="_blank"/>

/** Evento reduzido ao título, para linhas de resumo e linha do tempo. */
export interface EventoTitulo {
  title: string;
}

/** Evento como aparece numa linha da lista de inscrições. */
export interface EventoItem {
  title: string;
  eventDate: string;
}

/** Local do evento. */
export interface LocalEvento {
  details: {
    venue: {
      name: string;
    };
  };
}

/** Detalhes do evento mostrados no detalhe da inscrição. */
export interface EventoDetalheDetails {
  venue: LocalEvento;
}

/** Evento com data e local, para o detalhe da inscrição. */
export interface EventoDetalhe {
  title: string;
  eventDate: string;
  details: EventoDetalheDetails;
}

/** Campos derivados da situação da inscrição: se ocupa vaga e a posição na lista de espera. */
export interface InscricaoSituacao {
  details: {
    readonly ocupaVaga: boolean;
    readonly posicaoListaEspera?: number;
  };
}

/** Inscrição não cancelada no resumo, com sua situação e evento. */
export interface InscricaoResumoItem {
  id: string;
  status: 'confirmed' | 'waitlisted' | 'cancelled';
  details: InscricaoSituacao;
  evento: EventoTitulo;
}

/** Indicadores já calculados das inscrições da pessoa e as posições nas listas de espera. */
export interface ResumoInscricoes {
  readonly totalOcupandoVaga: number;
  readonly totalNaListaEspera: number;
  inscricoesAtivas: InscricaoResumoItem[];
}

/** Linha da lista de inscrições da pessoa. */
export interface InscricaoItem {
  id: string;
  readonly registrationCode: string;
  eventoId: string;
  readonly receivedAt: string;
  status: 'confirmed' | 'waitlisted' | 'cancelled';
  evento: EventoItem;
}

/** Inscrição escolhida com evento, data, local e situação derivada. */
export interface InscricaoDetalhe {
  id: string;
  readonly registrationCode: string;
  readonly receivedAt: string;
  eventoId: string;
  status: 'confirmed' | 'waitlisted' | 'cancelled';
  details: InscricaoSituacao;
  evento: EventoDetalhe;
}

/** Momento da promoção. */
export interface PromocaoDetails {
  details: {
    promotedAt: string;
  };
}

/** Evento da linha do tempo: inscrição da pessoa promovida da lista de espera. */
export interface PromocaoItem {
  id: string;
  readonly registrationCode: string;
  status: 'confirmed' | 'waitlisted' | 'cancelled';
  details: PromocaoDetails;
  evento: EventoTitulo;
}

export interface Minhas_inscricoesContracts {
  /**
   * Finalidade: Carrega de uma vez tudo o que a página Minhas inscrições mostra ao abrir: o resumo da situação, a primeira página da lista de inscrições e a linha do tempo de promoções.
   * Entrada: page e pageSize: página da lista de inscrições (a primeira na abertura). O participante vem da sessão (escopo own), nunca do cliente.
   * Processamento: Filtra as inscrições do participante autenticado. Resumo: conta as que ocupam vaga (status confirmed, ocupaVaga verdadeiro) e as em lista de espera (waitlisted), e lista as não canceladas com título do evento, ocupaVaga e posicaoListaEspera calculada pela regra calculoPosicaoListaEspera (inscrições waitlisted do mesmo evento com receivedAt anterior, mais um, conforme ordemChegadaListaEspera); os derivados são calculados, nunca gravados. Lista: inscrições com evento (título e data), ordenadas por receivedAt da mais recente, paginada. Promoções: inscrições com promotedAt preenchido, ordenadas por promotedAt decrescente.
   * Saída: resumo com os indicadores já calculados, inscricoes paginada ({ items, page, pageSize, hasMore }) e promocoes para a linha do tempo.
   */
  'inscricaoEvento.minhas_inscricoes.carregarMinhasInscricoes': {
    kind: 'qry';
    input: { page: number; pageSize: number };
    output: { resumo: ResumoInscricoes; inscricoes: { items: InscricaoItem[]; page: number; pageSize: number; hasMore: boolean }; promocoes: PromocaoItem[] };
    rules: ['calculoPosicaoListaEspera', 'ordemChegadaListaEspera'];
    access: { actors: ['publico']; grants: ['publicoMinhasInscricoes']; scope: 'own' };
  };
  /**
   * Finalidade: Busca as inscrições da própria pessoa pelo código ou pelo nome do evento e traz as páginas seguintes.
   * Entrada: busca: texto digitado, comparado ao código da inscrição ou ao título do evento; page e pageSize: página pedida.
   * Processamento: Restringe às inscrições do participante da sessão; filtra por registrationCode igual/iniciando pelo texto ou Evento.title contendo o texto; ordena por receivedAt decrescente; pagina.
   * Saída: inscricoes paginada que substitui a lista numa nova busca.
   */
  'inscricaoEvento.minhas_inscricoes.buscarInscricoes': {
    kind: 'qry';
    input: { busca?: string; page: number; pageSize: number };
    output: { inscricoes: { items: InscricaoItem[]; page: number; pageSize: number; hasMore: boolean } };
    rules: [];
    access: { actors: ['publico']; grants: ['publicoMinhasInscricoes']; scope: 'own' };
  };
  /**
   * Finalidade: Abre a inscrição escolhida na lista para a pessoa conferir antes de cancelar.
   * Entrada: inscricaoId: id da inscrição selecionada na lista.
   * Processamento: Lê a inscrição garantindo que pertence ao participante da sessão; compõe com o evento (título, data, nome do local); calcula ocupaVaga (confirmada) e posicaoListaEspera pela regra calculoPosicaoListaEspera apenas quando waitlisted.
   * Saída: inscricao com código, recebida em, evento com data e local, situação, ocupaVaga e posição na fila; alimenta o detalhe e as ações.
   */
  'inscricaoEvento.minhas_inscricoes.obterInscricao': {
    kind: 'qry';
    input: { inscricaoId: string };
    output: { inscricao: InscricaoDetalhe };
    rules: ['calculoPosicaoListaEspera'];
    access: { actors: ['publico']; grants: ['publicoMinhasInscricoes']; scope: 'own' };
  };
  /**
   * Finalidade: Cancela a inscrição da própria pessoa, liberando a vaga para o primeiro da lista de espera.
   * Entrada: inscricaoId: id da inscrição a cancelar; version: versão da inscrição conhecida pela página quando a abriu, usada para controle de concorrência otimista (tratada como token opaco, não exibida ao público).
   * Processamento: cancelamentoSomentePropriaInscricao: recusa se a inscrição não pertence ao participante da sessão ou se o status não é confirmed ou waitlisted. Recusa com conflito se version difere da versão atual. Executa a transição cancelar (status cancelled, registra cancelledAt). promoverPrimeiroListaEsperaAoCancelar: se a inscrição estava confirmada, na mesma transação promove a primeira inscrição waitlisted do mesmo evento por receivedAt, registrando promotedAt. Recalcula os derivados (ocupaVaga, posicaoListaEspera) sem gravá-los.
   * Saída: inscricao atualizada para o detalhe, item para atualizar a linha da lista e resumo recalculado, para a página redesenhar sem nova chamada.
   */
  'inscricaoEvento.minhas_inscricoes.cancelarInscricao': {
    kind: 'cmd';
    writes: 'Inscricao.cancelar';
    input: { id: string; version: number };
    output: { inscricao: InscricaoDetalhe; item: InscricaoItem; resumo: ResumoInscricoes };
    rules: ['cancelamentoSomentePropriaInscricao', 'promoverPrimeiroListaEsperaAoCancelar'];
    access: { actors: ['publico']; grants: ['publicoMinhasInscricoes']; scope: 'own' };
  };
}

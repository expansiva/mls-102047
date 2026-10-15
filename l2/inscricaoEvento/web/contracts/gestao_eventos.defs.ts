/// <mls fileReference="_102047_/l2/inscricaoEvento/web/contracts/gestao_eventos.defs.ts" enhancement="_blank"/>

/** Ocupação resumida do evento na lista. */
export interface EventoResumoDetalhes {
  details: {
    capacity: number;
    readonly occupiedSeats: number;
    readonly remainingSeats: number;
  };
}

/** Linha da lista de eventos do organizador. */
export interface EventoResumo {
  id: string;
  title: string;
  eventDate: string;
  status: 'draft' | 'published';
  details: EventoResumoDetalhes;
}

/** Local do evento. */
export interface EventoLocal {
  details: {
    venue: {
      name: string;
    };
  };
}

/** Dados cadastrados e ocupação do evento. */
export interface EventoDetalheDetalhes {
  details: {
    description: string;
    capacity: number;
    readonly publishedAt?: string;
    readonly occupiedSeats: number;
    readonly remainingSeats: number;
    readonly isFull: boolean;
    readonly waitlistSize: number;
  };
  venue: EventoLocal;
}

/** Evento completo para revisão e publicação. */
export interface EventoDetalhe {
  id: string;
  version: number;
  title: string;
  eventDate: string;
  status: 'draft' | 'published';
  details: EventoDetalheDetalhes;
}

/** Identificação do participante. */
export interface ParticipanteIdentificacao {
  details: {
    identification: {
      name: string;
    };
  };
}

/** Detalhes do participante. */
export interface ParticipanteDetalhes {
  identification: ParticipanteIdentificacao;
}

/** Nome do participante inscrito. */
export interface ParticipanteRef {
  details: ParticipanteDetalhes;
}

/** Canal de e-mail. */
export interface EmailCanal {
  details: {
    contactChannel: {
      value: string;
    };
  };
}

/** Detalhes do e-mail. */
export interface EmailDetalhes {
  contactChannel: EmailCanal;
}

/** E-mail do participante inscrito. */
export interface EmailRef {
  details: EmailDetalhes;
}

/** Vaga e posição na lista de espera. */
export interface InscritoDetalhes {
  details: {
    readonly ocupaVaga: boolean;
    readonly posicaoListaEspera?: number;
  };
}

/** Linha da lista de inscritos do evento. */
export interface Inscrito {
  id: string;
  readonly registrationCode: string;
  readonly receivedAt: string;
  status: 'confirmed' | 'waitlisted' | 'cancelled';
  details: InscritoDetalhes;
  participante: ParticipanteRef;
  emailParticipante: EmailRef;
}

/** Momento da promoção. */
export interface PromocaoDetalhes {
  details: {
    promotedAt: string;
  };
}

/** Item da linha do tempo de promoções automáticas. */
export interface Promocao {
  id: string;
  readonly registrationCode: string;
  status: 'confirmed' | 'waitlisted' | 'cancelled';
  details: PromocaoDetalhes;
  participante: ParticipanteRef;
}

export interface Gestao_eventosContracts {
  /**
   * Finalidade: Lista os eventos da organização do organizador para localizar o evento a trabalhar, já com a ocupação de cada um.
   * Entrada: busca: trecho do título; status: filtra rascunho ou publicado; dataDe/dataAte: intervalo da data do evento; page/pageSize: paginação.
   * Processamento: Filtra os eventos do escopo da organização por título (contém, sem diferenciar maiúsculas), situação e intervalo de data, ordenando pela data do evento. Para cada evento calcula vagas ocupadas (calculoVagasOcupadas: inscrições confirmadas, sem canceladas nem lista de espera) e vagas restantes (calculoVagasRestantes: vagas menos ocupadas, nunca abaixo de zero); valores derivados, nunca gravados.
   * Saída: Página de eventos com título, data, situação, número de vagas, vagas ocupadas e restantes, para a lista de localização.
   */
  'inscricaoEvento.gestao_eventos.qryEventos': {
    kind: 'qry';
    input: { busca?: string; status?: 'draft' | 'published'; eventDate?: string; page: number; pageSize: number };
    output: { eventos: { items: EventoResumo[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['calculoVagasOcupadas', 'calculoVagasRestantes'];
    access: { actors: ['organizador']; grants: ['organizadorEventos', 'organizadorInscritos']; scope: 'organization' };
  };
  /**
   * Finalidade: Carrega o evento escolhido para revisão, ocupação e publicação, junto com as promoções automáticas da lista de espera.
   * Entrada: eventoId: id do evento selecionado na lista.
   * Processamento: Lê o evento pelo id (escopo da organização). Calcula vagas ocupadas (calculoVagasOcupadas), vagas restantes (calculoVagasRestantes), lotado quando ocupadas alcançam o número de vagas (listaEsperaQuandoVagasEsgotadas) e tamanho da lista de espera (contagem das inscrições em lista de espera); todos derivados, nunca gravados. Compõe as promoções: inscrições do evento com promotedAt preenchido (registrado por promoverPrimeiroListaEsperaAoCancelar), com nome do participante, ordenadas da mais recente para a mais antiga.
   * Saída: O evento com dados cadastrados, situação, publicado em e indicadores de ocupação, mais a linha do tempo de promoções; versão incluída para publicar.
   */
  'inscricaoEvento.gestao_eventos.qryEventoPainel': {
    kind: 'qry';
    input: { id: string };
    output: { evento: EventoDetalhe; promocoes: Promocao[] };
    rules: ['calculoVagasOcupadas', 'calculoVagasRestantes', 'listaEsperaQuandoVagasEsgotadas', 'promoverPrimeiroListaEsperaAoCancelar'];
    access: { actors: ['organizador']; grants: ['organizadorEventos', 'organizadorInscritos']; scope: 'organization' };
  };
  /**
   * Finalidade: Lista os inscritos do evento selecionado por ordem de chegada.
   * Entrada: eventoId: evento selecionado; page/pageSize: paginação.
   * Processamento: Lista as inscrições do evento ordenadas por receivedAt ascendente (ordemChegadaListaEspera), compondo nome do participante e e-mail do cadastro mestre. Calcula ocupaVaga (inscrição confirmada) e posicaoListaEspera (calculoPosicaoListaEspera: quantas em lista de espera do mesmo evento chegaram antes, mais um; vazio fora da lista); derivados, nunca gravados.
   * Saída: Página de inscritos com código, nome, e-mail, recebida em, situação, se ocupa vaga e posição na lista de espera.
   */
  'inscricaoEvento.gestao_eventos.qryInscritosEvento': {
    kind: 'qry';
    input: { eventoId: string; page: number; pageSize: number };
    output: { inscritos: { items: Inscrito[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['ordemChegadaListaEspera', 'calculoPosicaoListaEspera'];
    access: { actors: ['organizador']; grants: ['organizadorEventos', 'organizadorInscritos']; scope: 'organization' };
  };
  /**
   * Finalidade: Gera o CSV com todos os inscritos do evento para o organizador baixar.
   * Entrada: eventoId: evento selecionado.
   * Processamento: Lê todas as inscrições do evento (sem paginação) por ordem de chegada (ordemChegadaListaEspera), compõe nome e e-mail do participante e monta o CSV com código, nome, e-mail, situação e recebida em.
   * Saída: Nome do arquivo e conteúdo CSV, que a página entrega como download.
   */
  'inscricaoEvento.gestao_eventos.qryExportarInscritosCsv': {
    kind: 'qry';
    input: { eventoId: string };
    output: { nomeArquivo: string; readonly conteudoCsv: string };
    rules: ['ordemChegadaListaEspera'];
    access: { actors: ['organizador']; grants: ['organizadorEventos', 'organizadorInscritos']; scope: 'organization' };
  };
  /**
   * Finalidade: Cadastra um novo evento como rascunho.
   * Entrada: title, description, eventDate, venueName (nome do local) e capacity (número de vagas) informados no formulário.
   * Processamento: Cria o evento na organização do organizador com situação draft. Ocupação é derivada (zero vagas ocupadas, restantes iguais às vagas, lista de espera vazia), nunca gravada.
   * Saída: O evento criado no formato da lista (inserido nela) e no formato de detalhe (exibido para revisão), sem nova chamada.
   */
  'inscricaoEvento.gestao_eventos.cmdSalvarEvento': {
    kind: 'cmd';
    writes: 'Evento.create';
    input: { title: string; details: { description: string; venue: { name: string }; capacity: number }; eventDate: string };
    output: { resumo: EventoResumo; evento: EventoDetalhe };
    rules: [];
    access: { actors: ['organizador']; grants: ['organizadorEventos', 'organizadorInscritos']; scope: 'organization' };
  };
  /**
   * Finalidade: Publica o evento em rascunho, abrindo a página pública para inscrições.
   * Entrada: id e version do evento (concorrência otimista).
   * Processamento: Aplica a transição publicar (draft → published). Recusa se o evento não tiver título, descrição, data, local e número de vagas preenchidos ou se as vagas não forem maiores que zero (publicarExigeDadosCompletos). publishedAt é registrado pelo sistema na transição.
   * Saída: O evento atualizado no formato da lista e do detalhe, com situação publicado e data de publicação, para redesenhar sem nova chamada.
   */
  'inscricaoEvento.gestao_eventos.cmdPublicarEvento': {
    kind: 'cmd';
    writes: 'Evento.publicar';
    input: { id: string; version: number };
    output: { resumo: EventoResumo; evento: EventoDetalhe };
    rules: ['publicarExigeDadosCompletos'];
    access: { actors: ['organizador']; grants: ['organizadorEventos', 'organizadorInscritos']; scope: 'organization' };
  };
}

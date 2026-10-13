/// <mls fileReference="_102047_/l2/inscricaoEvento/web/contracts/gestao_eventos.defs.ts" enhancement="_blank"/>

/** Linha da lista de eventos do organizador, com a ocupação já calculada. */
export interface EventoResumo {
  id: string;
  title: string;
  eventDate: string;
  status: 'draft' | 'published';
  readonly occupiedSeats: number;
  readonly remainingSeats: number;
}

/** Evento em foco com dados cadastrados, publicação e indicadores de ocupação já calculados; também é o que os comandos devolvem. */
export interface EventoDetalhe {
  id: string;
  version: number;
  title: string;
  eventDate: string;
  status: 'draft' | 'published';
  details: {
    description: string;
    venue: {
      name: string;
      address: {
        city?: string;
      };
    };
    capacity: number;
    readonly publishedAt?: string;
  };
  readonly occupiedSeats: number;
  readonly remainingSeats: number;
  readonly isFull: boolean;
  readonly waitlistSize: number;
}

/** Inscrição do evento com nome e e-mail do participante, ocupação de vaga e posição na lista de espera. */
export interface InscritoItem {
  id: string;
  readonly registrationCode: string;
  readonly receivedAt: string;
  status: 'confirmed' | 'waitlisted' | 'cancelled';
  readonly ocupaVaga: boolean;
  readonly posicaoListaEspera?: number;
  participante: {
    details: {
      identification: {
        name: string;
      };
    };
  };
  emailParticipante: {
    details: {
      contactChannel: {
        value: string;
      };
    };
  };
}

/** Linha do arquivo CSV de inscritos. */
export interface InscritoCsv {
  readonly registrationCode: string;
  readonly receivedAt: string;
  status: 'confirmed' | 'waitlisted' | 'cancelled';
  participante: {
    details: {
      identification: {
        name: string;
      };
    };
  };
  emailParticipante: {
    details: {
      contactChannel: {
        value: string;
      };
    };
  };
}

/** Inscrição promovida automaticamente da lista de espera para vaga confirmada. */
export interface PromocaoItem {
  id: string;
  readonly registrationCode: string;
  readonly receivedAt: string;
  details: {
    promotedAt: string;
  };
  participante: {
    details: {
      identification: {
        name: string;
      };
    };
  };
}

export interface Gestao_eventosContracts {
  /**
   * Finalidade: Lista os eventos da organização do organizador para ele localizar o evento a trabalhar, já com a ocupação de cada um.
   * Entrada: busca: trecho do título; status: filtra rascunho ou publicado; dataDe/dataAte: intervalo da data do evento; page/pageSize: paginação.
   * Processamento: Filtra os eventos do escopo da organização por título (contém, sem distinção de maiúsculas), situação e intervalo de data; ordena por data do evento. Para cada evento calcula vagas ocupadas (calculoVagasOcupadas: inscrições confirmadas, sem canceladas nem em espera) e vagas restantes (calculoVagasRestantes: vagas menos ocupadas, nunca abaixo de zero). Os derivados são calculados, não gravados.
   * Saída: Página de eventos { items, page, pageSize, hasMore } com título, data, situação, vagas ocupadas e restantes.
   */
  'inscricaoEvento.gestao_eventos.qryListarEventos': {
    kind: 'qry';
    input: { busca?: string; status?: 'draft' | 'published'; dataDe?: string; dataAte?: string; page: number; pageSize: number };
    output: { eventos: { items: EventoResumo[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['calculoVagasOcupadas', 'calculoVagasRestantes'];
    access: { actors: ['organizador']; grants: ['organizadorEventos', 'organizadorInscritos']; scope: 'organization' };
  };
  /**
   * Finalidade: Abre o evento escolhido para revisão, com dados, publicação, ocupação e o histórico de promoções automáticas.
   * Entrada: eventoId: evento selecionado na lista ou recém-cadastrado.
   * Processamento: Lê o evento por id no escopo da organização. Calcula vagas ocupadas (calculoVagasOcupadas), restantes (calculoVagasRestantes), lotado quando ocupadas alcançam as vagas (listaEsperaQuandoVagasEsgotadas) e tamanho da lista de espera (inscrições waitlisted). Lista as inscrições do evento com promovida em preenchida (registradas por promoverPrimeiroListaEsperaAoCancelar), com o nome do participante, ordenadas pela promoção mais recente.
   * Saída: evento: detalhe com indicadores prontos para eventoDetail e publicarActions; promocoes: linha do tempo de quem foi promovido e quando.
   */
  'inscricaoEvento.gestao_eventos.qryAbrirEvento': {
    kind: 'qry';
    input: { eventoId: string };
    output: { evento: EventoDetalhe; promocoes: PromocaoItem[] };
    rules: ['calculoVagasOcupadas', 'calculoVagasRestantes', 'listaEsperaQuandoVagasEsgotadas', 'promoverPrimeiroListaEsperaAoCancelar'];
    access: { actors: ['organizador']; grants: ['organizadorEventos', 'organizadorInscritos']; scope: 'organization' };
  };
  /**
   * Finalidade: Lista os inscritos do evento em foco em ordem de chegada, com quem ocupa vaga e a posição na lista de espera.
   * Entrada: eventoId: evento em foco; page/pageSize: paginação, pois um evento pode ter muitos inscritos.
   * Processamento: Lista as inscrições do evento ordenadas por recebida em (ordemChegadaListaEspera), compondo nome do participante e e-mail do cadastro mestre. ocupaVaga é verdadeiro para confirmadas (calculoVagasOcupadas); posicaoListaEspera, só para waitlisted, é o número de inscrições em espera do mesmo evento recebidas antes, mais um (calculoPosicaoListaEspera). Derivados calculados, não gravados.
   * Saída: Página { items, page, pageSize, hasMore } de inscritos para inscritosList.
   */
  'inscricaoEvento.gestao_eventos.qryListarInscritos': {
    kind: 'qry';
    input: { eventoId: string; page: number; pageSize: number };
    output: { inscritos: { items: InscritoItem[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['ordemChegadaListaEspera', 'calculoPosicaoListaEspera', 'calculoVagasOcupadas'];
    access: { actors: ['organizador']; grants: ['organizadorEventos', 'organizadorInscritos']; scope: 'organization' };
  };
  /**
   * Finalidade: Gera o conteúdo do CSV com todos os inscritos do evento para o organizador baixar.
   * Entrada: eventoId: evento em foco.
   * Processamento: Lê todas as inscrições do evento (sem paginação), compõe nome e e-mail do participante e ordena por recebida em (ordemChegadaListaEspera). O nome do arquivo deriva do título do evento.
   * Saída: linhas com código, nome, e-mail, situação e recebida em, e nomeArquivo, para exportarCsvActions montar o download.
   */
  'inscricaoEvento.gestao_eventos.qryExportarInscritosCsv': {
    kind: 'qry';
    input: { eventoId: string };
    output: { linhas: InscritoCsv[]; readonly nomeArquivo: string };
    rules: ['ordemChegadaListaEspera'];
    access: { actors: ['organizador']; grants: ['organizadorEventos', 'organizadorInscritos']; scope: 'organization' };
  };
  /**
   * Finalidade: Cadastra um novo evento como rascunho e o deixa em foco para revisão.
   * Entrada: Título, data, descrição, nome do local, endereço (opcional) e número de vagas informados no formulário.
   * Processamento: Cria o Evento na organização do organizador com situação draft. Não grava derivados: publicado em fica vazio; vagas ocupadas (calculoVagasOcupadas) e restantes (calculoVagasRestantes) são calculadas na resposta (zero ocupadas, restantes = vagas).
   * Saída: evento: detalhe do evento criado, que substitui o evento em foco sem nova chamada.
   */
  'inscricaoEvento.gestao_eventos.cmdCriarEvento': {
    kind: 'cmd';
    writes: 'Evento.create';
    input: { title: string; eventDate: string; details: { description: string; venue: { name: string; address: { line1?: string; line2?: string; city?: string; stateOrProvince?: string; postalCode?: string; countryCode?: string } }; capacity: number } };
    output: { evento: EventoDetalhe };
    rules: ['calculoVagasOcupadas', 'calculoVagasRestantes'];
    access: { actors: ['organizador']; grants: ['organizadorEventos', 'organizadorInscritos']; scope: 'organization' };
  };
  /**
   * Finalidade: Publica o evento em foco para abrir sua página pública a inscrições.
   * Entrada: eventoId e version do evento em foco (concorrência otimista).
   * Processamento: Executa a transição publicar (draft → published). Recusa se o evento não estiver em rascunho ou se faltar título, descrição, data, local ou número de vagas, ou se as vagas não forem maiores que zero (publicarExigeDadosCompletos). Recusa versão divergente. Publicado em é registrado pelo sistema.
   * Saída: evento: detalhe atualizado com situação publicado e publicado em, que redesenha o evento em foco.
   */
  'inscricaoEvento.gestao_eventos.cmdPublicarEvento': {
    kind: 'cmd';
    writes: 'Evento.publicar';
    input: { id: string; version: number };
    output: { evento: EventoDetalhe };
    rules: ['publicarExigeDadosCompletos'];
    access: { actors: ['organizador']; grants: ['organizadorEventos', 'organizadorInscritos']; scope: 'organization' };
  };
}

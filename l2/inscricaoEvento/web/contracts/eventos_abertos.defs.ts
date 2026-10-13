/// <mls fileReference="_102047_/l2/inscricaoEvento/web/contracts/eventos_abertos.defs.ts" enhancement="_blank"/>

/** Endereço do local do evento. */
export interface EnderecoLocal {
  details: {
    venue: {
      address: {
        line1?: string;
        line2?: string;
        city?: string;
        stateOrProvince?: string;
        postalCode?: string;
        countryCode?: string;
      };
    };
  };
}

/** Local do evento com nome e endereço. */
export interface LocalEvento {
  details: {
    venue: {
      name: string;
    };
  };
  address?: EnderecoLocal;
}

/** Detalhes do evento com disponibilidade já calculada. */
export interface DadosEventoDetalhe {
  details: {
    description: string;
    capacity: number;
  };
  venue: LocalEvento;
  readonly remainingSeats: number;
  readonly isFull: boolean;
  readonly waitlistSize: number;
}

/** Evento publicado aberto na página pública, com descrição, local e disponibilidade. */
export interface EventoDetalhe {
  id: string;
  title: string;
  eventDate: string;
  details: DadosEventoDetalhe;
}

/** Nome do local para a linha da lista. */
export interface LocalResumo {
  details: {
    venue: {
      name: string;
    };
  };
}

/** Dados resumidos do evento para a lista. */
export interface DadosEventoResumo {
  venue: LocalResumo;
  readonly isFull: boolean;
}

/** Linha da lista de eventos publicados. */
export interface EventoResumo {
  id: string;
  title: string;
  eventDate: string;
  details: DadosEventoResumo;
}

/** Resultado da inscrição: vaga ou posição na lista de espera. */
export interface DadosInscricaoResultado {
  readonly ocupaVaga: boolean;
  readonly posicaoListaEspera?: number;
}

/** Inscrição recém-criada mostrada à pessoa. */
export interface InscricaoResultado {
  id: string;
  readonly registrationCode: string;
  readonly receivedAt: string;
  details: DadosInscricaoResultado;
}

export interface Eventos_abertosContracts {
  /**
   * Finalidade: Carrega e busca a lista paginada de eventos publicados para a pessoa escolher qual abrir.
   * Entrada: page e pageSize: página pedida e tamanho; texto: termo opcional buscado no título e no nome do local; dataInicio/dataFim: intervalo opcional sobre a data do evento.
   * Processamento: Filtra apenas eventos com situação publicado (inscricaoSomenteEventoPublicado; a situação não é exposta), aplica o texto sobre título e nome do local e o intervalo sobre eventDate, ordena por data. Calcula isFull por evento contando as inscrições confirmadas (calculoVagasOcupadas) e comparando com o número de vagas (listaEsperaQuandoVagasEsgotadas); o campo é derivado, nunca gravado.
   * Saída: { items, page, pageSize, hasMore } com id, título, data, nome do local e indicador de lotado, para a lista e para abrir o evento.
   */
  'inscricaoEvento.eventos_abertos.qryEventosPublicados': {
    kind: 'qry';
    input: { texto?: string; dataInicio?: string; dataFim?: string; page: number; pageSize: number };
    output: { eventos: { items: EventoResumo[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['inscricaoSomenteEventoPublicado', 'calculoVagasOcupadas', 'listaEsperaQuandoVagasEsgotadas'];
    access: { actors: ['publico']; grants: ['publicoMinhasInscricoes', 'publicoMeuCadastro']; scope: 'own' };
  };
  /**
   * Finalidade: Abre a página pública do evento escolhido com descrição, local e disponibilidade de vagas.
   * Entrada: eventoId: id do evento selecionado na lista ou vindo da URL.
   * Processamento: Lê o evento pelo id e recusa (não encontrado) se não estiver publicado (inscricaoSomenteEventoPublicado). Conta inscrições confirmadas para vagas ocupadas (calculoVagasOcupadas), calcula vagas restantes = vagas − ocupadas, nunca abaixo de zero (calculoVagasRestantes), isFull quando ocupadas alcançam as vagas (listaEsperaQuandoVagasEsgotadas) e o tamanho da lista de espera contando inscrições em espera. Tudo calculado, nada gravado.
   * Saída: O evento com título, data, descrição, local e endereço, vagas, vagas restantes, lotado e tamanho da lista de espera, usado pelo detalhe e pela ação de inscrição.
   */
  'inscricaoEvento.eventos_abertos.qryDetalheEvento': {
    kind: 'qry';
    input: { eventoId: string };
    output: { evento: EventoDetalhe };
    rules: ['inscricaoSomenteEventoPublicado', 'calculoVagasOcupadas', 'calculoVagasRestantes', 'listaEsperaQuandoVagasEsgotadas'];
    access: { actors: ['publico']; grants: ['publicoMinhasInscricoes', 'publicoMeuCadastro']; scope: 'own' };
  };
  /**
   * Finalidade: Inscreve a pessoa no evento aberto com nome e e-mail, garantindo vaga ou lugar na lista de espera.
   * Entrada: eventoId: evento da página; name: nome informado; email: e-mail de contato da pessoa; countryCode: país (ISO 3166-1 alfa-2); privacyConsent: aceite LGPD/GDPR, exigido conforme o país.
   * Processamento: Recusa se o evento não estiver publicado (inscricaoSomenteEventoPublicado). Localiza ou cria o participante pelo e-mail (register.createOrAttach, link.contact) gravando o consentimento. Recusa se o e-mail já tiver inscrição confirmada ou em lista de espera no evento (inscricaoUnicaPorEmailEvento, umaInscricaoPorEmailPorEvento). Dentro da mesma transação conta as vagas ocupadas (calculoVagasOcupadas): se houver vaga restante cria como confirmada, senão como em lista de espera (inscricaoExcedenteVaiParaListaEspera, listaEsperaQuandoVagasEsgotadas). O sistema registra receivedAt e emite o código da inscrição. Calcula ocupaVaga e a posição na lista de espera pelas inscrições em espera que chegaram antes, mais um (ordemChegadaListaEspera, calculoPosicaoListaEspera), e recalcula a disponibilidade do evento (calculoVagasRestantes); derivados nunca são gravados.
   * Saída: A inscrição criada (código, recebida em, ocupa vaga, posição na lista de espera) para mostrar o resultado, e o evento com disponibilidade atualizada para redesenhar o detalhe sem nova chamada.
   */
  'inscricaoEvento.eventos_abertos.cmdInscreverMe': {
    kind: 'cmd';
    writes: 'Inscricao.create';
    input: { eventoId: string; participante: { details: { identification: { name: string; countryCode: string }; base: { contacts: string }; person: { privacyConsent?: string } } } };
    output: { inscricao: InscricaoResultado; evento: EventoDetalhe };
    rules: ['inscricaoSomenteEventoPublicado', 'inscricaoUnicaPorEmailEvento', 'umaInscricaoPorEmailPorEvento', 'inscricaoExcedenteVaiParaListaEspera', 'listaEsperaQuandoVagasEsgotadas', 'ordemChegadaListaEspera', 'calculoPosicaoListaEspera', 'calculoVagasOcupadas', 'calculoVagasRestantes'];
    access: { actors: ['publico']; grants: ['publicoMinhasInscricoes', 'publicoMeuCadastro']; scope: 'own' };
  };
}

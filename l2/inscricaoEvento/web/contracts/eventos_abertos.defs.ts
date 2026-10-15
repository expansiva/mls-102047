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

/** Local do evento na lista: nome e cidade. */
export interface LocalResumo {
  details: {
    venue: {
      name: string;
    };
  };
  address?: CidadeLocal;
}

/** Cidade do local do evento. */
export interface CidadeLocal {
  details: {
    venue: {
      address: {
        city?: string;
      };
    };
  };
}

/** Local e disponibilidade de vagas de um evento na lista. */
export interface EventoResumoDetails {
  venue: LocalResumo;
  readonly remainingSeats: number;
  readonly isFull: boolean;
}

/** Item da lista de eventos publicados. */
export interface EventoResumo {
  id: string;
  title: string;
  eventDate: string;
  details: EventoResumoDetails;
}

/** Descrição, local e disponibilidade de vagas do evento. */
export interface EventoDetalheDetails {
  details: {
    description: string;
    capacity: number;
  };
  venue: LocalEvento;
  readonly remainingSeats: number;
  readonly isFull: boolean;
  readonly waitlistSize: number;
}

/** Evento publicado completo para leitura e inscrição. */
export interface EventoDetalhe {
  id: string;
  title: string;
  eventDate: string;
  details: EventoDetalheDetails;
}

/** Se a inscrição ocupa vaga ou sua posição na lista de espera. */
export interface InscricaoResultadoDetails {
  readonly ocupaVaga: boolean;
  readonly posicaoListaEspera?: number;
}

/** Lotação do evento após a inscrição. */
export interface EventoInscricaoDetails {
  readonly isFull: boolean;
}

/** Evento no qual a pessoa se inscreveu. */
export interface EventoInscricao {
  title: string;
  details: EventoInscricaoDetails;
}

/** Contato com que a pessoa se inscreveu. */
export interface ParticipanteBase {
  details: {
    base: {
      readonly contacts: string;
    };
  };
}

/** Dados do participante mostrados no resultado. */
export interface ParticipanteInscricaoDetails {
  base: ParticipanteBase;
}

/** Participante da inscrição. */
export interface ParticipanteInscricao {
  details: ParticipanteInscricaoDetails;
}

/** Resultado da inscrição: código, chegada, vaga ou posição na lista de espera, evento e e-mail. */
export interface InscricaoResultado {
  id: string;
  readonly registrationCode: string;
  readonly receivedAt: string;
  details: InscricaoResultadoDetails;
  evento: EventoInscricao;
  participante: ParticipanteInscricao;
}

export interface Eventos_abertosContracts {
  /**
   * Finalidade: Carrega, ao abrir a página e a cada busca, a lista paginada de eventos publicados para a pessoa escolher qual conhecer.
   * Entrada: texto: trecho do título; dataInicio/dataFim: intervalo de data do evento; local: trecho do nome do local ou da cidade; page/pageSize: página pedida.
   * Processamento: Filtra apenas eventos com situação publicada, aplica os filtros de título, intervalo de data e local (nome ou cidade) e ordena por data do evento crescente. Para cada evento calcula vagas ocupadas (calculoVagasOcupadas: inscrições confirmadas), vagas restantes (calculoVagasRestantes: vagas menos ocupadas, nunca abaixo de zero) e lotado (listaEsperaQuandoVagasEsgotadas: ocupadas alcançaram as vagas); campos derivados, nunca gravados.
   * Saída: Página { items, page, pageSize, hasMore } de eventos com título, data, local (nome e cidade), vagas restantes e indicador de lotado, prontos para a lista.
   */
  'inscricaoEvento.eventos_abertos.listarEventosPublicados': {
    kind: 'qry';
    input: { texto?: string; dataInicio?: string; dataFim?: string; local?: string; page: number; pageSize: number };
    output: { eventos: { items: EventoResumo[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['calculoVagasOcupadas', 'calculoVagasRestantes', 'listaEsperaQuandoVagasEsgotadas'];
    access: { actors: ['publico']; grants: ['publicoMinhasInscricoes', 'publicoMeuCadastro']; scope: 'own' };
  };
  /**
   * Finalidade: Carrega o evento escolhido na lista (ou aberto pela URL) com tudo que a pessoa precisa para decidir se inscrever.
   * Entrada: eventoId: id do evento selecionado na lista ou vindo da URL da página pública.
   * Processamento: Lê o evento pelo id e só o devolve se estiver publicado (caso contrário, não encontrado). Calcula vagas ocupadas (calculoVagasOcupadas), vagas restantes (calculoVagasRestantes, nunca abaixo de zero), lotado (listaEsperaQuandoVagasEsgotadas) e o tamanho da lista de espera contando as inscrições em espera do evento; tudo derivado, nada gravado.
   * Saída: O evento com título, data, descrição, local com endereço completo, número de vagas, vagas restantes, lotado e tamanho da lista de espera; também alimenta o título e o aviso de lotado na ação de inscrição.
   */
  'inscricaoEvento.eventos_abertos.obterEventoPublico': {
    kind: 'qry';
    input: { eventoId: string };
    output: { evento: EventoDetalhe };
    rules: ['calculoVagasOcupadas', 'calculoVagasRestantes', 'listaEsperaQuandoVagasEsgotadas'];
    access: { actors: ['publico']; grants: ['publicoMinhasInscricoes', 'publicoMeuCadastro']; scope: 'own' };
  };
  /**
   * Finalidade: Inscreve a pessoa no evento aberto com nome e e-mail, garantindo vaga ou lugar na lista de espera, e devolve o resultado para exibir na hora.
   * Entrada: eventoId: evento em que a pessoa se inscreve; name: nome informado; email: e-mail informado, usado para localizar ou criar o participante; countryCode: país da pessoa (ISO 3166-1 alfa-2); privacyConsent: consentimento de privacidade dado ao enviar os dados (exigido para BR/UE).
   * Processamento: Recusa se o evento não estiver publicado (inscricaoSomenteEventoPublicado). Localiza o participante pelo e-mail ou cria-o (register.createOrAttach) e liga o e-mail como contato. Recusa se o mesmo e-mail já tiver inscrição confirmada ou em lista de espera no evento (inscricaoUnicaPorEmailEvento, umaInscricaoPorEmailPorEvento). Na mesma transação, cria a inscrição como confirmada se houver vaga restante, senão em lista de espera (inscricaoExcedenteVaiParaListaEspera, listaEsperaQuandoVagasEsgotadas); o sistema registra o momento de chegada e emite o código. Calcula, sem gravar, ocupaVaga e a posição na lista de espera (calculoPosicaoListaEspera, ordemChegadaListaEspera: em espera do mesmo evento que chegaram antes, mais um) e recalcula vagas ocupadas, restantes, lotado e tamanho da fila do evento.
   * Saída: A inscrição com código, momento de chegada, se ocupa vaga ou a posição na lista de espera, título e lotação do evento e o e-mail usado; além do evento atualizado (detalhe e item de lista) para redesenhar a disponibilidade sem nova chamada.
   */
  'inscricaoEvento.eventos_abertos.inscreverEmEvento': {
    kind: 'cmd';
    writes: 'Inscricao.create';
    input: { eventoId: string; participante: { details: { identification: { name: string; countryCode: string }; base: { contacts: string }; person: { privacyConsent?: string } } } };
    output: { inscricao: InscricaoResultado; evento: EventoDetalhe; eventoResumo: EventoResumo };
    rules: ['inscricaoSomenteEventoPublicado', 'inscricaoUnicaPorEmailEvento', 'umaInscricaoPorEmailPorEvento', 'inscricaoExcedenteVaiParaListaEspera', 'listaEsperaQuandoVagasEsgotadas', 'ordemChegadaListaEspera', 'calculoPosicaoListaEspera', 'calculoVagasOcupadas', 'calculoVagasRestantes'];
    access: { actors: ['publico']; grants: ['publicoMinhasInscricoes', 'publicoMeuCadastro']; scope: 'own' };
  };
}

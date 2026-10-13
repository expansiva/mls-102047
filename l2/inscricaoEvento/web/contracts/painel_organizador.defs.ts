/// <mls fileReference="_102047_/l2/inscricaoEvento/web/contracts/painel_organizador.defs.ts" enhancement="_blank"/>

/** Números de ocupação de um evento publicado, todos calculados pelo servidor a partir das inscrições. */
export interface EventoOcupacaoDetails {
  details: {
    capacity: number;
    readonly occupiedSeats: number;
    readonly remainingSeats: number;
    readonly waitlistSize: number;
    readonly isFull: boolean;
  };
}

/** Evento publicado com sua situação de ocupação, para os destaques do painel. */
export interface EventoOcupacao {
  id: string;
  title: string;
  eventDate: string;
  status: 'draft' | 'published';
  details: EventoOcupacaoDetails;
}

/** Data de publicação e vagas ocupadas de um evento publicado recentemente. */
export interface EventoPublicadoDetails {
  details: {
    readonly publishedAt: string;
    readonly occupiedSeats: number;
  };
}

/** Evento publicado recentemente, para o resumo de publicações. */
export interface EventoPublicado {
  id: string;
  title: string;
  eventDate: string;
  status: 'draft' | 'published';
  details: EventoPublicadoDetails;
}

export interface Painel_organizadorContracts {
  /**
   * Finalidade: Carrega, em uma única chamada ao abrir o painel, a situação de ocupação dos eventos publicados da organização do organizador, o total de vagas ocupadas e os eventos publicados recentemente.
   * Entrada: Sem parâmetros: a organização vem do contexto do organizador autenticado (grant organizadorEventos, escopo organização).
   * Processamento: Seleciona os eventos da organização com status ’published’. Para cada um calcula, a partir das inscrições: occupiedSeats = inscrições confirmadas, sem canceladas nem em lista de espera (calculoVagasOcupadas); remainingSeats = capacity - occupiedSeats, nunca abaixo de zero (calculoVagasRestantes); waitlistSize = inscrições em lista de espera; isFull verdadeiro quando occupiedSeats alcança capacity (listaEsperaQuandoVagasEsgotadas). Esses campos são derivados, calculados na leitura e nunca gravados. destaques: ordena primeiro os lotados, depois os com lista de espera maior, depois os com menos vagas restantes, limitado aos primeiros (ex.: 10). totalVagasOcupadas: soma de occupiedSeats de todos os eventos publicados. recentes: eventos publicados ordenados por publishedAt decrescente, limitado aos mais recentes (ex.: 5).
   * Saída: destaques com título, data, situação e números de ocupação de cada evento que pede atenção; totalVagasOcupadas já somado para o resumo; recentes com título, data, situação, data de publicação e vagas ocupadas. O id de cada evento permite navegar para a gestão de eventos.
   */
  'inscricaoEvento.painel_organizador.qryPainelOrganizador': {
    kind: 'qry';
    input: {};
    output: { destaques: EventoOcupacao[]; readonly totalVagasOcupadas: number; recentes: EventoPublicado[] };
    rules: ['calculoVagasOcupadas', 'calculoVagasRestantes', 'listaEsperaQuandoVagasEsgotadas'];
    access: { actors: ['organizador']; grants: ['organizadorEventos']; scope: 'organization' };
  };
}

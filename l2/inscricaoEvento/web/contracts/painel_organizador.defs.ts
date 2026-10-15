/// <mls fileReference="_102047_/l2/inscricaoEvento/web/contracts/painel_organizador.defs.ts" enhancement="_blank"/>

/** Números de ocupação do evento, calculados a partir das inscrições. */
export interface OcupacaoEventoDetails {
  details: {
    capacity: number;
    readonly occupiedSeats: number;
    readonly remainingSeats: number;
    readonly waitlistSize: number;
    readonly isFull: boolean;
  };
}

/** Evento publicado com sua ocupação, para os destaques do painel. */
export interface OcupacaoEvento {
  id: string;
  title: string;
  eventDate: string;
  status: 'draft' | 'published';
  details: OcupacaoEventoDetails;
}

/** Data de publicação e vagas ocupadas do evento publicado recentemente. */
export interface PublicacaoRecenteDetails {
  details: {
    readonly publishedAt: string;
    readonly occupiedSeats: number;
  };
}

/** Evento publicado recentemente, para o resumo do painel. */
export interface PublicacaoRecente {
  id: string;
  title: string;
  status: 'draft' | 'published';
  details: PublicacaoRecenteDetails;
}

export interface Painel_organizadorContracts {
  /**
   * Finalidade: Carrega numa só chamada tudo o que o painel do organizador mostra ao abrir: a ocupação de cada evento publicado, o total de vagas ocupadas e os eventos publicados recentemente.
   * Entrada: Nenhuma entrada; o escopo é a organização do organizador autenticado.
   * Processamento: Filtra os eventos da organização com status ’published’. Para cada um calcula a partir das inscrições (nunca grava): occupiedSeats = inscrições confirmadas, sem canceladas nem em lista de espera (calculoVagasOcupadas); remainingSeats = capacity - occupiedSeats, nunca abaixo de zero (calculoVagasRestantes); waitlistSize = inscrições em lista de espera; isFull = occupiedSeats >= capacity (listaEsperaQuandoVagasEsgotadas). Ordena eventosOcupacao colocando primeiro os lotados e com fila (isFull desc, waitlistSize desc), depois os com menos vagas restantes, e por eventDate. totalVagasOcupadas é a soma de occupiedSeats dos eventos publicados, calculada no servidor. publicacoesRecentes traz os eventos publicados mais recentes ordenados por publishedAt decrescente, limitados a um número curto (ex.: 5).
   * Saída: eventosOcupacao para os destaques de ocupação; totalVagasOcupadas já somado para o resumo; publicacoesRecentes com a data de publicação. Os ids permitem navegar para a gestão do evento.
   */
  'inscricaoEvento.painel_organizador.qryPainelOrganizador': {
    kind: 'qry';
    input: {};
    output: { eventosOcupacao: OcupacaoEvento[]; readonly totalVagasOcupadas: number; publicacoesRecentes: PublicacaoRecente[] };
    rules: ['calculoVagasOcupadas', 'calculoVagasRestantes', 'listaEsperaQuandoVagasEsgotadas'];
    access: { actors: ['organizador']; grants: ['organizadorEventos']; scope: 'organization' };
  };
}

/// <mls fileReference="_102047_/l2/ordenServicio/web/contracts/inicio_taller.defs.ts" enhancement="_blank"/>

/** Identificación mínima del cliente visible para recepcionista y técnico. */
export interface ClienteIdentificacion {
  details: {
    identification: {
      name: string;
    };
  };
}

/** Detalle del cliente anidado como en la ontología. */
export interface ClienteDetalle {
  identification: ClienteIdentificacion;
}

/** Cliente dueño de la orden, reducido a su nombre. */
export interface ClienteResumen {
  details: ClienteDetalle;
}

/** Datos del aparato que identifican la orden en la cola. */
export interface AparatoResumen {
  details: {
    aparato: {
      tipo: string;
      marca?: string;
      modelo?: string;
    };
  };
}

/** Detalle de la orden pendiente: aparato y defecto informado. */
export interface OrdenPendienteDetalle {
  aparato: AparatoResumen;
  details: {
    defectoInformado: string;
  };
}

/** Fila de la cola de trabajo: orden que espera el paso del usuario. */
export interface OrdenPendiente {
  id: string;
  numero: string;
  status: 'abierta' | 'presupuestada' | 'aprobada' | 'rechazada' | 'lista' | 'finalizada';
  fechaApertura: string;
  clienteId: string;
  cliente: ClienteResumen;
  details: OrdenPendienteDetalle;
}

/** Valores calculados por el servidor para la orden destacada. */
export interface OrdenDestacadaDetalle {
  details: {
    readonly disponibleParaRetiro: boolean;
    readonly costoInternoPiezas?: string;
  };
}

/** Orden destacada con su disponibilidad para retiro y costo interno de piezas. */
export interface OrdenDestacada {
  id: string;
  numero: string;
  status: 'abierta' | 'presupuestada' | 'aprobada' | 'rechazada' | 'lista' | 'finalizada';
  clienteId: string;
  cliente: ClienteResumen;
  details: OrdenDestacadaDetalle;
}

export interface Inicio_tallerContracts {
  /**
   * Finalidad: Carga la cola de trabajo del inicio del taller: las órdenes que esperan el paso del usuario actual, paginadas para recorrerlas con scroll.
   * Entrada: etapa: filtro opcional de la etapa dentro de las que corresponden al usuario (abierta, aprobada o lista). page y pageSize: página solicitada y su tamaño.
   * Procesamiento: Filtra OrdenServicio por estado según el actor de la sesión: técnico ve ’abierta’ (por diagnosticar y presupuestar) y ’aprobada’ (por reparar); recepcionista ve ’lista’ (por entregar). Si llega etapa, la restringe a ese estado dentro de los permitidos. Ordena por fechaApertura ascendente (las más antiguas primero). Une cada orden con el nombre de su Cliente vía clienteId. Solo devuelve campos permitidos por los grants (sin anotaciones ni costos internos).
   * Salida: Página { items, page, pageSize, hasMore } de órdenes con id, número, estado, fecha de apertura, cliente, aparato (tipo, marca, modelo) y defecto informado; el id permite navegar a ordenes_servicio para avanzarla.
   */
  'ordenServicio.inicio_taller.qryOrdenesPendientes': {
    kind: 'qry';
    input: { etapa?: 'abierta' | 'aprobada' | 'lista'; page: number; pageSize: number };
    output: { ordenes: { items: OrdenPendiente[]; page: number; pageSize: number; hasMore: boolean } };
    rules: [];
    access: { actors: ['recepcionista', 'tecnico']; grants: ['recepcionistaClientes', 'recepcionistaOrdenes', 'tecnicoOrdenes', 'tecnicoClientes']; scope: 'organization' };
  };
  /**
   * Finalidad: Carga los destacados del taller: el indicador de aparatos disponibles para retiro y una lista breve de órdenes con su disponibilidad y su costo interno de piezas.
   * Entrada: Sin parámetros; el alcance lo da el usuario de la sesión.
   * Procesamiento: Calcula disponibleParaRetiro (regla disponibleParaRetiroCalculado: estado lista o rechazada) y cuenta esas órdenes en el servidor para el indicador. Selecciona las órdenes no finalizadas que están disponibles para retiro o tienen piezas registradas, limitadas a una lista breve ordenada por fechaApertura. Para cada una calcula costoInternoPiezas como la suma de los costos totales de sus piezas (costoInternoPiezasOrden), donde cada costo total es cantidad × costo unitario (costoTotalPieza); ambos son derivados, nunca se graban. El costo interno solo se incluye para el técnico: el grant del recepcionista lo deniega, así que para él se omite el campo.
   * Salida: cantidadDisponiblesRetiro como número ya calculado, y la lista de órdenes con número, estado, cliente, disponibilidad para retiro y costo interno (cuando el actor puede verlo), para preparar la entrega y comparar con el presupuesto.
   */
  'ordenServicio.inicio_taller.qryDestacadosTaller': {
    kind: 'qry';
    input: {};
    output: { readonly cantidadDisponiblesRetiro: number; ordenes: OrdenDestacada[] };
    rules: ['disponibleParaRetiroCalculado', 'costoInternoPiezasOrden', 'costoTotalPieza'];
    access: { actors: ['recepcionista', 'tecnico']; grants: ['recepcionistaClientes', 'recepcionistaOrdenes', 'tecnicoOrdenes', 'tecnicoClientes']; scope: 'organization' };
  };
}

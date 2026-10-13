/// <mls fileReference="_102047_/l2/ordenServicio/web/contracts/mis_ordenes.defs.ts" enhancement="_blank"/>

/** Identificación breve del aparato para las listas. */
export interface AparatoResumen {
  details: {
    aparato: {
      tipo: string;
      marca?: string;
      modelo?: string;
    };
  };
}

/** Valor y fecha de emisión del presupuesto para las listas. */
export interface PresupuestoResumen {
  details: {
    presupuesto: {
      valor?: string;
      fechaEmision?: string;
    };
  };
}

/** Detalles visibles al cliente en una fila de orden. */
export interface OrdenResumenDetails {
  aparato: AparatoResumen;
  presupuesto?: PresupuestoResumen;
  details: {
    readonly disponibleParaRetiro: boolean;
  };
}

/** Fila de una orden del cliente, compartida por pendientes, retiro y la lista de órdenes. */
export interface OrdenResumen {
  id: string;
  numero: string;
  status: 'abierta' | 'presupuestada' | 'aprobada' | 'rechazada' | 'lista' | 'finalizada';
  fechaApertura: string;
  details: OrdenResumenDetails;
}

/** Nombre del cliente dueño de la orden. */
export interface ClienteIdentificacion {
  details: {
    identification: {
      name: string;
    };
  };
}

/** Detalles del cliente visibles en la orden. */
export interface ClienteDetails {
  identification: ClienteIdentificacion;
}

/** Cliente dueño de la orden. */
export interface ClienteResumen {
  details: ClienteDetails;
}

/** Datos completos del aparato visibles al cliente. */
export interface AparatoDetalle {
  details: {
    aparato: {
      tipo: string;
      marca?: string;
      modelo?: string;
      numeroSerie?: string;
      accesorios?: string;
    };
  };
}

/** Presupuesto y respuesta del cliente. */
export interface PresupuestoDetalle {
  details: {
    presupuesto: {
      valor?: string;
      fechaEmision?: string;
      fechaRespuesta?: string;
      motivoRechazo?: string;
    };
  };
}

/** Lo realizado en la reparación. */
export interface ReparacionDetalle {
  details: {
    reparacion: {
      trabajoRealizado?: string;
      fechaLista?: string;
    };
  };
}

/** Fecha de entrega del aparato. */
export interface EntregaDetalle {
  details: {
    entrega: {
      fechaEntrega?: string;
    };
  };
}

/** Detalles de la orden visibles al cliente, sin costos internos ni anotaciones del técnico. */
export interface OrdenDetalleDetails {
  aparato: AparatoDetalle;
  details: {
    defectoInformado: string;
    diagnostico?: string;
    readonly disponibleParaRetiro: boolean;
  };
  presupuesto?: PresupuestoDetalle;
  reparacion?: ReparacionDetalle;
  entrega?: EntregaDetalle;
}

/** Orden elegida con su detalle, presupuesto e historial, tal como la ve el cliente. */
export interface OrdenDetalleCliente {
  id: string;
  version: number;
  numero: string;
  status: 'abierta' | 'presupuestada' | 'aprobada' | 'rechazada' | 'lista' | 'finalizada';
  fechaApertura: string;
  cliente: ClienteResumen;
  details: OrdenDetalleDetails;
}

export interface Mis_ordenesContracts {
  /**
   * Finalidad: Carga al abrir la página lo que requiere la atención del cliente: los presupuestos que esperan su respuesta y los aparatos que ya puede retirar.
   * Entrada: Sin parámetros: el cliente se resuelve desde la sesión del portal (locate.byLogin).
   * Procesamiento: Filtra las órdenes por clienteId del cliente conectado (clienteVeSoloSusOrdenes). Presupuestos pendientes: órdenes en estado presupuestada, ordenadas por fecha de emisión. Disponibles para retiro: órdenes cuyo disponibleParaRetiro, calculado en el momento como estado lista o rechazada (disponibleParaRetiroCalculado), es verdadero; nunca se almacena. No devuelve costoInternoPiezas, piezas ni anotacionesTecnico (clienteNoVeCostoInterno, costoInternoOcultoAlCliente, anotacionesTecnicoOcultasAlCliente).
   * Salida: Dos listas cortas de filas de orden con número, estado, aparato, valor y fecha del presupuesto, y la marca de disponible para retiro, listas para la sección de pendientes.
   */
  'ordenServicio.mis_ordenes.obtenerPendientesMisOrdenes': {
    kind: 'qry';
    input: {};
    output: { presupuestosPendientes: OrdenResumen[]; disponiblesParaRetiro: OrdenResumen[] };
    rules: ['clienteVeSoloSusOrdenes', 'clienteNoVeCostoInterno', 'costoInternoOcultoAlCliente', 'anotacionesTecnicoOcultasAlCliente', 'disponibleParaRetiroCalculado'];
    access: { actors: ['cliente']; grants: ['clienteMisOrdenes', 'clienteMiRegistro']; scope: 'own' };
  };
  /**
   * Finalidad: Lista todas las órdenes de servicio del cliente conectado, paginadas, para consultar cualquiera de ellas.
   * Entrada: page: número de página pedida; pageSize: cantidad de órdenes por página.
   * Procesamiento: Lista por clienteId del cliente de la sesión (listByForeignKey, clienteVeSoloSusOrdenes), ordenadas por fecha de apertura descendente. disponibleParaRetiro se calcula como estado lista o rechazada (disponibleParaRetiroCalculado). Excluye costos internos, piezas y anotaciones del técnico.
   * Salida: Página { items, page, pageSize, hasMore } de filas con número, aparato, fecha de apertura y estado; la página siguiente se agrega a la lista.
   */
  'ordenServicio.mis_ordenes.listarMisOrdenes': {
    kind: 'qry';
    input: { page: number; pageSize: number };
    output: { ordenes: { items: OrdenResumen[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['clienteVeSoloSusOrdenes', 'clienteNoVeCostoInterno', 'costoInternoOcultoAlCliente', 'anotacionesTecnicoOcultasAlCliente', 'disponibleParaRetiroCalculado'];
    access: { actors: ['cliente']; grants: ['clienteMisOrdenes', 'clienteMiRegistro']; scope: 'own' };
  };
  /**
   * Finalidad: Abre la orden que el cliente elige en pendientes, retiro o su lista, con su detalle, presupuesto e historial en una sola llamada.
   * Entrada: ordenId: id de la orden seleccionada (o recibido en el enlace de la notificación).
   * Procesamiento: Lee la orden por id y rechaza si su clienteId no es el del cliente conectado (clienteVeSoloSusOrdenes). Compone el nombre del cliente (read.byId de Cliente). Calcula disponibleParaRetiro como estado lista o rechazada (disponibleParaRetiroCalculado). Omite costoInternoPiezas, piezas y anotacionesTecnico (clienteNoVeCostoInterno, costoInternoOcultoAlCliente, anotacionesTecnicoOcultasAlCliente).
   * Salida: La orden con versión, estado, aparato, defecto, diagnóstico, presupuesto, fechas de respuesta, reparación y entrega: alimenta el detalle, la decisión y el historial.
   */
  'ordenServicio.mis_ordenes.obtenerOrdenCliente': {
    kind: 'qry';
    input: { ordenId: string };
    output: { orden: OrdenDetalleCliente };
    rules: ['clienteVeSoloSusOrdenes', 'clienteNoVeCostoInterno', 'costoInternoOcultoAlCliente', 'anotacionesTecnicoOcultasAlCliente', 'disponibleParaRetiroCalculado'];
    access: { actors: ['cliente']; grants: ['clienteMisOrdenes', 'clienteMiRegistro']; scope: 'own' };
  };
  /**
   * Finalidad: Aprueba el presupuesto de la orden para que el técnico la repare.
   * Entrada: ordenId: orden a aprobar; version: versión leída, para control de concurrencia.
   * Procesamiento: Rechaza si la orden no pertenece al cliente conectado o no está presupuestada (clienteSoloRespondeSusOrdenes). Ejecuta la transición aprobarPresupuesto (presupuestada → aprobada) y registra la fecha de respuesta. Devuelve la orden sin costos internos ni anotaciones.
   * Salida: La orden actualizada en estado aprobada para redibujar detalle, decisión e historial sin otra llamada.
   */
  'ordenServicio.mis_ordenes.aprobarPresupuesto': {
    kind: 'cmd';
    writes: 'OrdenServicio.aprobarPresupuesto';
    input: { id: string; version: number };
    output: { orden: OrdenDetalleCliente };
    rules: ['clienteSoloRespondeSusOrdenes', 'clienteNoVeCostoInterno', 'anotacionesTecnicoOcultasAlCliente'];
    access: { actors: ['cliente']; grants: ['clienteMisOrdenes', 'clienteMiRegistro']; scope: 'own' };
  };
  /**
   * Finalidad: Rechaza el presupuesto de la orden, que se cierra y deja el aparato disponible para retiro.
   * Entrada: ordenId: orden a rechazar; version: versión leída; motivoRechazo: comentario opcional del cliente.
   * Procesamiento: Rechaza si la orden no pertenece al cliente conectado o no está presupuestada (clienteSoloRespondeSusOrdenes). Ejecuta la transición rechazarPresupuesto (presupuestada → rechazada) con el motivo y la fecha de respuesta; la orden queda cerrada sin reparación (rechazoCierraOrden). disponibleParaRetiro se calcula al leer (disponibleParaRetiroCalculado), no se graba.
   * Salida: La orden actualizada en estado rechazada, con disponible para retiro verdadero, para redibujar detalle, decisión e historial.
   */
  'ordenServicio.mis_ordenes.rechazarPresupuesto': {
    kind: 'cmd';
    writes: 'OrdenServicio.rechazarPresupuesto';
    input: { id: string; version: number; details: { presupuesto: { motivoRechazo?: string } } };
    output: { orden: OrdenDetalleCliente };
    rules: ['clienteSoloRespondeSusOrdenes', 'rechazoCierraOrden', 'disponibleParaRetiroCalculado', 'clienteNoVeCostoInterno', 'anotacionesTecnicoOcultasAlCliente'];
    access: { actors: ['cliente']; grants: ['clienteMisOrdenes', 'clienteMiRegistro']; scope: 'own' };
  };
}

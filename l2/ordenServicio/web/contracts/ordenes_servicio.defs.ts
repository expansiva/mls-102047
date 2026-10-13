/// <mls fileReference="_102047_/l2/ordenServicio/web/contracts/ordenes_servicio.defs.ts" enhancement="_blank"/>

/** Fila de la bandeja de órdenes. */
export interface OrdenResumen {
  id: string;
  numero: string;
  status: 'abierta' | 'presupuestada' | 'aprobada' | 'rechazada' | 'lista' | 'finalizada';
  fechaApertura: string;
  clienteId: string;
  cliente: ClienteNombre;
  aparato: AparatoResumen;
  details: {
    readonly disponibleParaRetiro: boolean;
  };
}

/** Cliente resumido: id y nombre. */
export interface ClienteNombre {
  id?: string;
  details: {
    identification: {
      name: string;
    };
  };
}

/** Cliente de la orden con sus contactos para avisarle. */
export interface ClienteContacto {
  id: string;
  details: {
    identification: {
      name: string;
    };
    base: {
      readonly contacts: string;
    };
  };
}

/** Tipo y marca del aparato para la bandeja. */
export interface AparatoResumen {
  details: {
    aparato: {
      tipo: string;
      marca?: string;
    };
  };
}

/** Datos completos del aparato. */
export interface AparatoOrden {
  details: {
    aparato: {
      tipo: string;
      marca?: string;
      modelo?: string;
      numeroSerie?: string;
      accesorios?: string;
      estadoFisico?: string;
    };
  };
}

/** Presupuesto y respuesta del cliente. */
export interface PresupuestoOrden {
  details: {
    presupuesto: {
      valor?: string;
      fechaEmision?: string;
      fechaRespuesta?: string;
      motivoRechazo?: string;
    };
  };
}

/** Trabajo realizado y fecha de lista. */
export interface ReparacionOrden {
  details: {
    reparacion: {
      trabajoRealizado?: string;
      fechaLista?: string;
    };
  };
}

/** Datos de la entrega. */
export interface EntregaOrden {
  details: {
    entrega: {
      fechaEntrega?: string;
      observaciones?: string;
    };
  };
}

/** Orden completa con cliente, aparato, presupuesto, reparación, entrega y fechas del historial. */
export interface OrdenFicha {
  id: string;
  version: number;
  numero: string;
  status: 'abierta' | 'presupuestada' | 'aprobada' | 'rechazada' | 'lista' | 'finalizada';
  fechaApertura: string;
  clienteId: string;
  cliente: ClienteContacto;
  aparato: AparatoOrden;
  details: {
    defectoInformado: string;
    diagnostico?: string;
    anotacionesTecnico?: string;
    readonly disponibleParaRetiro: boolean;
  };
  presupuesto: PresupuestoOrden;
  reparacion: ReparacionOrden;
  entrega: EntregaOrden;
}

/** Pieza de la orden con su costo interno. */
export interface PiezaLinea {
  id: string;
  version: number;
  descripcion: string;
  details: {
    cantidad: number;
    costoUnitario: string;
    codigoPieza?: string;
    observacion?: string;
    readonly costoTotal: string;
  };
}

export interface Ordenes_servicioContracts {
  /**
   * Finalidad: Carga la bandeja de órdenes de la organización filtrada por estado, para que recepción y técnico elijan la orden a trabajar.
   * Entrada: status: estado por el que se filtra (abierta para analizar, aprobada para reparar, lista para entregar); si falta, todas. texto: búsqueda por número de orden en el mostrador. page y pageSize: paginación.
   * Procesamiento: Filtra OrdenServicio por estado y número, ordena por fechaApertura descendente, une el nombre del cliente (Cliente.details.identification.name) por clienteId. disponibleParaRetiro se calcula (disponibleParaRetiroCalculado: estado lista o rechazada), no se guarda.
   * Salida: Página de órdenes con número, estado, fecha de apertura, cliente, tipo y marca del aparato y disponibilidad para retiro.
   */
  'ordenServicio.ordenes_servicio.qryListaOrdenes': {
    kind: 'qry';
    input: { status?: 'abierta' | 'presupuestada' | 'aprobada' | 'rechazada' | 'lista' | 'finalizada'; texto?: string; page: number; pageSize: number };
    output: { ordenes: { items: OrdenResumen[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['disponibleParaRetiroCalculado'];
    access: { actors: ['recepcionista', 'tecnico']; grants: ['recepcionistaClientes', 'recepcionistaOrdenes', 'tecnicoOrdenes', 'tecnicoClientes']; scope: 'organization' };
  };
  /**
   * Finalidad: Carga en una sola llamada la orden seleccionada completa: ficha, datos para el formulario, acciones, historial, piezas y costo interno.
   * Entrada: ordenId: id de la orden elegida en la bandeja.
   * Procesamiento: Lee OrdenServicio por id con el nombre y contactos del cliente, las fechas de presupuesto, reparación y entrega, y lista PiezaOrden por ordenServicioId. costoTotal de cada pieza = cantidad × costoUnitario (costoTotalPieza) y costoInternoPiezas = suma de costos totales (costoInternoPiezasOrden), ambos calculados. disponibleParaRetiro calculado (disponibleParaRetiroCalculado). Para el recepcionista se omiten anotacionesTecnico, piezas y costoInternoPiezas según su grant.
   * Salida: La ficha de la orden, sus piezas y el costo interno total, para comparar con el valor del presupuesto y decidir el siguiente paso.
   */
  'ordenServicio.ordenes_servicio.qryOrden': {
    kind: 'qry';
    input: { ordenId: string };
    output: { orden: OrdenFicha; piezas?: PiezaLinea[]; readonly costoInternoPiezas?: number };
    rules: ['disponibleParaRetiroCalculado', 'costoInternoPiezasOrden', 'costoTotalPieza'];
    access: { actors: ['recepcionista', 'tecnico']; grants: ['recepcionistaClientes', 'recepcionistaOrdenes', 'tecnicoOrdenes', 'tecnicoClientes']; scope: 'organization' };
  };
  /**
   * Finalidad: Busca al cliente por nombre o documento al abrir una orden, para reutilizar su registro.
   * Entrada: texto: parte del nombre o número de documento.
   * Procesamiento: Busca Cliente por nombre (locate.byName) o documento (locate.byDocument); devuelve como máximo los primeros 20 resultados.
   * Salida: Clientes coincidentes con id y nombre para elegir el clienteId de la nueva orden; si no aparece, la página navega a Clientes.
   */
  'ordenServicio.ordenes_servicio.qryBuscarClientes': {
    kind: 'qry';
    input: { texto: string };
    output: { clientes: ClienteNombre[] };
    rules: [];
    access: { actors: ['recepcionista', 'tecnico']; grants: ['recepcionistaClientes', 'recepcionistaOrdenes', 'tecnicoOrdenes', 'tecnicoClientes']; scope: 'organization' };
  };
  /**
   * Finalidad: Abre una orden de servicio nueva en estado abierta para el cliente elegido.
   * Entrada: clienteId: cliente dueño del aparato; datos del aparato (tipo, marca, modelo, número de serie, accesorios, estado físico) y defecto informado. Opcionales, normalmente vacíos al abrir: diagnóstico, anotaciones del técnico (solo técnico), valor del presupuesto y trabajo realizado.
   * Procesamiento: Crea OrdenServicio con status abierta y fechaApertura actual; el número lo emite la secuencia de la plataforma y es único (numeroOrdenUnico). Las fotos se suben como adjuntos de la orden (fotosAparatoEnAdjuntos), no como campos. anotacionesTecnico se ignora si quien escribe es el recepcionista. disponibleParaRetiro se calcula, no se graba.
   * Salida: La orden creada en forma de ficha para mostrarla seleccionada sin otra llamada.
   */
  'ordenServicio.ordenes_servicio.cmdAbrirOrden': {
    kind: 'cmd';
    writes: 'OrdenServicio.create';
    input: { clienteId: string; details: { aparato: { tipo: string; marca?: string; modelo?: string; numeroSerie?: string; accesorios?: string; estadoFisico?: string }; defectoInformado: string; diagnostico?: string; anotacionesTecnico?: string; presupuesto: { valor?: string }; reparacion: { trabajoRealizado?: string } } };
    output: { orden: OrdenFicha };
    rules: ['numeroOrdenUnico', 'fotosAparatoEnAdjuntos', 'disponibleParaRetiroCalculado'];
    access: { actors: ['recepcionista', 'tecnico']; grants: ['recepcionistaClientes', 'recepcionistaOrdenes', 'tecnicoOrdenes', 'tecnicoClientes']; scope: 'organization' };
  };
  /**
   * Finalidad: Guarda los datos de la etapa actual (cliente, aparato, diagnóstico, anotaciones internas, valor del presupuesto, trabajo realizado) sin cambiar el estado.
   * Entrada: id y version de la orden (concurrencia optimista); clienteId si se corrige el cliente dueño; y los campos editados; los ausentes no se modifican.
   * Procesamiento: Actualiza OrdenServicio con control de versión. anotacionesTecnico solo la escribe el técnico (el recepcionista no tiene acceso). disponibleParaRetiro se recalcula, no se guarda.
   * Salida: La ficha actualizada para redibujar detalle, formulario y acciones.
   */
  'ordenServicio.ordenes_servicio.cmdGuardarOrden': {
    kind: 'cmd';
    writes: 'OrdenServicio.update';
    input: { id: string; version: number; clienteId?: string; details: { aparato: { tipo?: string; marca?: string; modelo?: string; numeroSerie?: string; accesorios?: string; estadoFisico?: string }; defectoInformado?: string; diagnostico?: string; anotacionesTecnico?: string; presupuesto: { valor?: string }; reparacion: { trabajoRealizado?: string } } };
    output: { orden: OrdenFicha };
    rules: ['disponibleParaRetiroCalculado'];
    access: { actors: ['recepcionista', 'tecnico']; grants: ['recepcionistaClientes', 'recepcionistaOrdenes', 'tecnicoOrdenes', 'tecnicoClientes']; scope: 'organization' };
  };
  /**
   * Finalidad: Agrega una pieza con su costo interno a la orden durante el diagnóstico.
   * Entrada: ordenServicioId: orden seleccionada; descripción, cantidad, costo unitario, código y observación interna de la pieza.
   * Procesamiento: Rechaza si la cantidad no es entero mayor que cero (cantidadPositiva) o si la orden no está abierta (piezasSoloAntesDePresupuesto). Crea PiezaOrden; costoTotal = cantidad × costoUnitario (costoTotalPieza) y el nuevo costoInternoPiezas = suma de costos totales de la orden (costoInternoPiezasOrden), ambos calculados, no grabados.
   * Salida: La pieza creada para insertarla en la lista y el costo interno total recalculado para el resumen.
   */
  'ordenServicio.ordenes_servicio.cmdAgregarPieza': {
    kind: 'cmd';
    writes: 'PiezaOrden.create';
    input: { ordenServicioId: string; descripcion: string; details: { cantidad: number; costoUnitario: string; codigoPieza?: string; observacion?: string } };
    output: { pieza: PiezaLinea; readonly costoInternoPiezas: number };
    rules: ['cantidadPositiva', 'piezasSoloAntesDePresupuesto', 'costoTotalPieza', 'costoInternoPiezasOrden'];
    access: { actors: ['recepcionista', 'tecnico']; grants: ['recepcionistaClientes', 'recepcionistaOrdenes', 'tecnicoOrdenes', 'tecnicoClientes']; scope: 'organization' };
  };
  /**
   * Finalidad: Emite el presupuesto al cliente y pasa la orden de abierta a presupuestada.
   * Entrada: id y version de la orden; diagnóstico y valor del presupuesto.
   * Procesamiento: Rechaza si la orden no está abierta, si falta el diagnóstico o si el valor no es mayor que cero (presupuestoRequiereDiagnosticoYValor). Ejecuta la transición emitirPresupuesto registrando fechaEmision.
   * Salida: La ficha actualizada con estado presupuestada y la fecha de emisión para el historial.
   */
  'ordenServicio.ordenes_servicio.cmdEmitirPresupuesto': {
    kind: 'cmd';
    writes: 'OrdenServicio.emitirPresupuesto';
    input: { id: string; version: number; details: { diagnostico: string; presupuesto: { valor: string } } };
    output: { orden: OrdenFicha };
    rules: ['presupuestoRequiereDiagnosticoYValor'];
    access: { actors: ['recepcionista', 'tecnico']; grants: ['recepcionistaClientes', 'recepcionistaOrdenes', 'tecnicoOrdenes', 'tecnicoClientes']; scope: 'organization' };
  };
  /**
   * Finalidad: Marca la orden aprobada como lista para entrega.
   * Entrada: id y version de la orden; descripción del trabajo realizado.
   * Procesamiento: Rechaza si la orden no está aprobada o si falta el trabajo realizado (listaRequiereTrabajoRealizado). Ejecuta la transición marcarLista registrando fechaLista; disponibleParaRetiro pasa a verdadero por cálculo (disponibleParaRetiroCalculado).
   * Salida: La ficha actualizada con estado lista, fecha de lista y disponibilidad para retiro.
   */
  'ordenServicio.ordenes_servicio.cmdMarcarLista': {
    kind: 'cmd';
    writes: 'OrdenServicio.marcarLista';
    input: { id: string; version: number; details: { reparacion: { trabajoRealizado: string } } };
    output: { orden: OrdenFicha };
    rules: ['listaRequiereTrabajoRealizado', 'disponibleParaRetiroCalculado'];
    access: { actors: ['recepcionista', 'tecnico']; grants: ['recepcionistaClientes', 'recepcionistaOrdenes', 'tecnicoOrdenes', 'tecnicoClientes']; scope: 'organization' };
  };
  /**
   * Finalidad: Registra la entrega del aparato y finaliza la orden.
   * Entrada: id y version de la orden; observaciones de entrega opcionales.
   * Procesamiento: Rechaza si la orden no está lista (finalizarSoloOrdenLista). Ejecuta la transición finalizar registrando fechaEntrega y las observaciones.
   * Salida: La ficha actualizada con estado finalizada y la fecha de entrega para el historial.
   */
  'ordenServicio.ordenes_servicio.cmdFinalizarOrden': {
    kind: 'cmd';
    writes: 'OrdenServicio.finalizar';
    input: { id: string; version: number; details: { entrega: { observaciones?: string } } };
    output: { orden: OrdenFicha };
    rules: ['finalizarSoloOrdenLista'];
    access: { actors: ['recepcionista', 'tecnico']; grants: ['recepcionistaClientes', 'recepcionistaOrdenes', 'tecnicoOrdenes', 'tecnicoClientes']; scope: 'organization' };
  };
}

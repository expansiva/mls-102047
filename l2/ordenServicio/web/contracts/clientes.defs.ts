/// <mls fileReference="_102047_/l2/ordenServicio/web/contracts/clientes.defs.ts" enhancement="_blank"/>

/** Identificación del cliente tal como la anida la ontología (details.identification). */
export interface ClienteIdentificacion {
  details: {
    identification: {
      name: string;
      docType?: 'SSN' | 'EIN' | 'Passport' | 'DriversLicense' | 'NationalId' | 'CPF' | 'CNPJ' | 'VAT' | 'Other';
      docId?: string;
      countryCode: string;
      readonly status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
    };
  };
}

/** Detalle mínimo del cliente para un resultado de búsqueda. */
export interface ClienteResumenDetails {
  identification: ClienteIdentificacion;
}

/** Resultado de búsqueda de cliente: id, nombre, documento, país y estado. */
export interface ClienteResumen {
  id: string;
  details: ClienteResumenDetails;
}

/** Resumen de contactos del cliente. */
export interface ClienteBase {
  details: {
    base: {
      readonly contacts: string;
    };
  };
}

/** Datos de persona del cliente: consentimiento de privacidad. */
export interface ClientePersona {
  details: {
    person: {
      privacyConsent?: string;
    };
  };
}

/** Detalle completo de la ficha del cliente. */
export interface FichaClienteDetails {
  identification: ClienteIdentificacion;
  base: ClienteBase;
  person: ClientePersona;
}

/** Ficha del cliente con identificación, contactos y consentimiento. */
export interface FichaCliente {
  id: string;
  details: FichaClienteDetails;
}

/** Aparato de la orden: tipo, marca y modelo. */
export interface AparatoResumen {
  details: {
    aparato: {
      tipo: string;
      marca?: string;
      modelo?: string;
    };
  };
}

/** Detalle resumido de la orden para el historial del cliente. */
export interface OrdenClienteDetails {
  aparato: AparatoResumen;
  readonly disponibleParaRetiro: boolean;
}

/** Orden de servicio del cliente en su historial de recepción. */
export interface OrdenClienteResumen {
  id: string;
  numero: string;
  clienteId: string;
  status: 'abierta' | 'presupuestada' | 'aprobada' | 'rechazada' | 'lista' | 'finalizada';
  fechaApertura: string;
  details: OrdenClienteDetails;
}

export interface ClientesContracts {
  /**
   * Finalidad: Busca clientes por parte del nombre o por número de documento para que el recepcionista elija el registro correcto antes de registrar a alguien nuevo.
   * Entrada: texto: fragmento del nombre o número de documento escrito por el recepcionista; page y pageSize: página solicitada y tamaño de página.
   * Procesamiento: Usa locate.byName y locate.byDocument de Cliente dentro de la organización; une los resultados sin duplicados, ordena por nombre y pagina. Proyecta solo id, nombre, tipo y número de documento, país y estado.
   * Salida: Página { items, page, pageSize, hasMore } de clientes resumidos para la lista de resultados.
   */
  'ordenServicio.clientes.buscarClientes': {
    kind: 'qry';
    input: { texto: string; page: number; pageSize: number };
    output: { clientes: { items: ClienteResumen[]; page: number; pageSize: number; hasMore: boolean } };
    rules: [];
    access: { actors: ['recepcionista']; grants: ['recepcionistaClientes', 'recepcionistaOrdenes']; scope: 'organization' };
  };
  /**
   * Finalidad: Carga en una sola llamada la ficha del cliente elegido y su historial de órdenes de servicio, para confirmar identidad y continuar a abrir una orden.
   * Entrada: clienteId: id del cliente seleccionado en la búsqueda o recién registrado.
   * Procesamiento: Lee el cliente por id (read.byId) con identificación, contactos y consentimiento de privacidad; lista sus órdenes por clienteId (listByForeignKey) ordenadas por fechaApertura descendente. disponibleParaRetiro es derivado: se calcula como verdadero cuando el estado es lista o rechazada (disponibleParaRetiroCalculado), nunca se almacena. No se exponen anotaciones del técnico ni costo interno de piezas (campos denegados al recepcionista).
   * Salida: cliente con su ficha y ordenes con número, estado, fecha de apertura, aparato y disponibilidad para retiro.
   */
  'ordenServicio.clientes.obtenerFichaCliente': {
    kind: 'qry';
    input: { clienteId: string };
    output: { cliente: FichaCliente; ordenes: OrdenClienteResumen[] };
    rules: ['disponibleParaRetiroCalculado'];
    access: { actors: ['recepcionista']; grants: ['recepcionistaClientes', 'recepcionistaOrdenes']; scope: 'organization' };
  };
  /**
   * Finalidad: Registra un cliente nuevo (o reutiliza el existente con el mismo documento) y lo deja seleccionado en la ficha para abrir la orden.
   * Entrada: name: nombre del cliente; docType y docId: tipo y número de documento; countryCode: país ISO 3166-1 alfa-2; privacyConsent: consentimiento de privacidad del cliente.
   * Procesamiento: Usa register.createOrAttach de Cliente: valida la forma del documento según el país y exige el consentimiento de privacidad donde el país lo requiere; si ya existe un cliente con ese documento lo reutiliza y le asigna el rol ordenServicio.Cliente. id, versión, estado, subtipo y contactos los calcula la plataforma, el endpoint no los graba.
   * Salida: cliente con la ficha creada o reutilizada y ordenes con su historial (vacío si es nuevo), para redibujar la ficha sin otra llamada.
   */
  'ordenServicio.clientes.registrarCliente': {
    kind: 'cmd';
    writes: 'Cliente.create';
    input: { details: { identification: { name: string; docType?: 'SSN' | 'EIN' | 'Passport' | 'DriversLicense' | 'NationalId' | 'CPF' | 'CNPJ' | 'VAT' | 'Other'; docId?: string; countryCode: string }; person: { privacyConsent?: string } } };
    output: { cliente: FichaCliente; ordenes: OrdenClienteResumen[] };
    rules: [];
    access: { actors: ['recepcionista']; grants: ['recepcionistaClientes', 'recepcionistaOrdenes']; scope: 'organization' };
  };
}

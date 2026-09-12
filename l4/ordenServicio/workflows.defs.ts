/// <mls fileReference="_102047_/l4/ordenServicio/workflows.defs.ts" enhancement="_blank"/>

import type { Ns5WorkflowsArtifact } from '/_102035_/l2/solution/types.js';

export const ordenServicioWorkflows = {
  "schemaVersion": "2026-09-10-ns5-workflows-v1",
  "moduleName": "ordenServicio",
  "processes": [
    {
      "processId": "gestionarOrdenServicio",
      "title": "Gestionar una orden de servicio",
      "description": "Coordinar la recepción, el presupuesto, la decisión del cliente, la reparación o el retiro y la entrega final del aparato.",
      "tasks": [
        {
          "taskId": "registrarRecepcion",
          "kind": "human",
          "actorRef": "recepcionista",
          "journeyRef": "abrirOrdenServicio",
          "stepRef": "registrarRecepcion",
          "next": [
            "localizarOrdenParaAnalisis"
          ],
          "description": "El recepcionista registra la recepción del aparato y deja la orden disponible para el análisis técnico."
        },
        {
          "taskId": "localizarOrdenParaAnalisis",
          "kind": "human",
          "actorRef": "tecnico",
          "journeyRef": "analizarYpresupuestarOrden",
          "stepRef": "localizarOrden",
          "next": [
            "inspeccionarOrden"
          ],
          "description": "El técnico localiza la orden recibida para iniciar su evaluación."
        },
        {
          "taskId": "inspeccionarOrden",
          "kind": "human",
          "actorRef": "tecnico",
          "journeyRef": "analizarYpresupuestarOrden",
          "stepRef": "inspeccionarOrden",
          "next": [
            "registrarDiagnosticoYpresupuesto"
          ],
          "description": "El técnico revisa la información y las fotos del aparato antes de presupuestarlo."
        },
        {
          "taskId": "registrarDiagnosticoYpresupuesto",
          "kind": "human",
          "actorRef": "tecnico",
          "journeyRef": "analizarYpresupuestarOrden",
          "stepRef": "registrarDiagnosticoYpresupuesto",
          "next": [
            "enviarPresupuestoAlCliente"
          ],
          "description": "El técnico registra el diagnóstico, las piezas necesarias y el presupuesto para el cliente."
        },
        {
          "taskId": "enviarPresupuestoAlCliente",
          "kind": "human",
          "actorRef": "tecnico",
          "journeyRef": "analizarYpresupuestarOrden",
          "stepRef": "enviarPresupuestoAlCliente",
          "next": [
            "localizarOrdenPropia"
          ],
          "description": "El técnico remite el presupuesto al cliente para que pueda tomar una decisión."
        },
        {
          "taskId": "localizarOrdenPropia",
          "kind": "human",
          "actorRef": "cliente",
          "journeyRef": "decidirPresupuesto",
          "stepRef": "localizarOrdenPropia",
          "next": [
            "consultarPresupuesto"
          ],
          "description": "El cliente localiza su propia orden con el presupuesto pendiente de decisión."
        },
        {
          "taskId": "consultarPresupuesto",
          "kind": "human",
          "actorRef": "cliente",
          "journeyRef": "decidirPresupuesto",
          "stepRef": "consultarPresupuesto",
          "next": [
            "decidirPresupuesto"
          ],
          "description": "El cliente consulta la información permitida de su orden y el valor del presupuesto."
        },
        {
          "taskId": "decidirPresupuesto",
          "kind": "human",
          "actorRef": "cliente",
          "journeyRef": "decidirPresupuesto",
          "stepRef": "decidirPresupuesto",
          "next": [
            "remitirOrdenAreparacion",
            "localizarOrdenRechazadaParaEntrega"
          ],
          "description": "El cliente aprueba el presupuesto para autorizar la reparación o lo rechaza para retirar el aparato."
        },
        {
          "taskId": "remitirOrdenAreparacion",
          "kind": "human",
          "actorRef": "cliente",
          "journeyRef": "decidirPresupuesto",
          "stepRef": "remitirOrdenAreparacion",
          "next": [
            "localizarOrdenAprobada"
          ],
          "description": "El cliente pone la orden aprobada a disposición del técnico para su reparación."
        },
        {
          "taskId": "localizarOrdenAprobada",
          "kind": "human",
          "actorRef": "tecnico",
          "journeyRef": "repararYmarcarLista",
          "stepRef": "localizarOrdenAprobada",
          "next": [
            "consultarDiagnostico"
          ],
          "description": "El técnico localiza la orden aprobada que debe reparar."
        },
        {
          "taskId": "consultarDiagnostico",
          "kind": "human",
          "actorRef": "tecnico",
          "journeyRef": "repararYmarcarLista",
          "stepRef": "consultarDiagnostico",
          "next": [
            "registrarReparacion"
          ],
          "description": "El técnico revisa el diagnóstico, las piezas previstas y la autorización del cliente."
        },
        {
          "taskId": "registrarReparacion",
          "kind": "human",
          "actorRef": "tecnico",
          "journeyRef": "repararYmarcarLista",
          "stepRef": "registrarReparacion",
          "next": [
            "marcarOrdenLista"
          ],
          "description": "El técnico registra el trabajo efectuado durante la reparación del aparato."
        },
        {
          "taskId": "marcarOrdenLista",
          "kind": "human",
          "actorRef": "tecnico",
          "journeyRef": "repararYmarcarLista",
          "stepRef": "marcarOrdenLista",
          "next": [
            "remitirParaEntrega"
          ],
          "description": "El técnico marca la orden reparada como lista para entrega."
        },
        {
          "taskId": "remitirParaEntrega",
          "kind": "human",
          "actorRef": "tecnico",
          "journeyRef": "repararYmarcarLista",
          "stepRef": "remitirParaEntrega",
          "next": [
            "localizarOrdenListaParaEntrega"
          ],
          "description": "El técnico pone la orden lista a disposición del recepcionista para entregar el aparato."
        },
        {
          "taskId": "localizarOrdenRechazadaParaEntrega",
          "kind": "human",
          "actorRef": "recepcionista",
          "journeyRef": "entregarYfinalizarOrden",
          "stepRef": "localizarOrdenParaEntrega",
          "next": [
            "verificarOrdenRechazada"
          ],
          "description": "El recepcionista localiza la orden rechazada cuyo aparato está disponible para retiro."
        },
        {
          "taskId": "verificarOrdenRechazada",
          "kind": "human",
          "actorRef": "recepcionista",
          "journeyRef": "entregarYfinalizarOrden",
          "stepRef": "verificarDisponibilidad",
          "next": [
            "registrarEntregaRechazada"
          ],
          "description": "El recepcionista verifica que el aparato rechazado está disponible para retiro."
        },
        {
          "taskId": "registrarEntregaRechazada",
          "kind": "human",
          "actorRef": "recepcionista",
          "journeyRef": "entregarYfinalizarOrden",
          "stepRef": "registrarEntregaYfinalizacion",
          "next": [],
          "description": "El recepcionista registra la entrega del aparato rechazado y finaliza la orden."
        },
        {
          "taskId": "localizarOrdenListaParaEntrega",
          "kind": "human",
          "actorRef": "recepcionista",
          "journeyRef": "entregarYfinalizarOrden",
          "stepRef": "localizarOrdenParaEntrega",
          "next": [
            "verificarOrdenLista"
          ],
          "description": "El recepcionista localiza la orden reparada que está lista para entrega."
        },
        {
          "taskId": "verificarOrdenLista",
          "kind": "human",
          "actorRef": "recepcionista",
          "journeyRef": "entregarYfinalizarOrden",
          "stepRef": "verificarDisponibilidad",
          "next": [
            "registrarEntregaReparada"
          ],
          "description": "El recepcionista verifica que el aparato reparado está listo para ser entregado."
        },
        {
          "taskId": "registrarEntregaReparada",
          "kind": "human",
          "actorRef": "recepcionista",
          "journeyRef": "entregarYfinalizarOrden",
          "stepRef": "registrarEntregaYfinalizacion",
          "next": [],
          "description": "El recepcionista registra la entrega del aparato reparado y finaliza la orden."
        }
      ]
    }
  ]
} as const satisfies Ns5WorkflowsArtifact;

export type OrdenServicioWorkflowsType = typeof ordenServicioWorkflows;

export default ordenServicioWorkflows;

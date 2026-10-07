/// <mls fileReference="_102047_/l1/agendaClinica/layer_1_external/auth/authorityMap.ts" enhancement="_blank"/>
export const entries = [
  {
    "grantId": "profissionalConsultarEregistrarPropriaAgenda",
    "actorRef": "profissional"
  },
  {
    "grantId": "profissionalIdentificarPacientesDaPropriaAgenda",
    "actorRef": "profissional"
  },
  {
    "grantId": "recepcionistaConsultarProfissionais",
    "actorRef": "recepcionista"
  },
  {
    "grantId": "recepcionistaGerenciarPacientesEconsultas",
    "actorRef": "recepcionista"
  }
] as const;

export function actorRefFor(grantId: string): string | null {
  const entry = entries.find(item => item.grantId === grantId);
  return entry ? entry.actorRef : null;
}

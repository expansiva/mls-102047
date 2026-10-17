/// <mls fileReference="_102047_/l1/inicio/layer_1_external/auth/authorityMap.ts" enhancement="_blank"/>
export const entries = [
  {
    "grantId": "pessoaCompletarMeuAcesso",
    "actorRef": "pessoaOrganizacao"
  },
  {
    "grantId": "pessoaMeuTelefone",
    "actorRef": "pessoaOrganizacao"
  },
  {
    "grantId": "pessoaVerEmpresa",
    "actorRef": "pessoaOrganizacao"
  },
  {
    "grantId": "responsavelAcompanharPessoas",
    "actorRef": "responsavel"
  },
  {
    "grantId": "responsavelMeuAcesso",
    "actorRef": "responsavel"
  },
  {
    "grantId": "responsavelMeuTelefone",
    "actorRef": "responsavel"
  },
  {
    "grantId": "responsavelPrepararEmpresa",
    "actorRef": "responsavel"
  }
] as const;

export function actorRefFor(grantId: string): string | null {
  const entry = entries.find(item => item.grantId === grantId);
  return entry ? entry.actorRef : null;
}

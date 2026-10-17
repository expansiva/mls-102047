/// <mls fileReference="_102047_/l1/inicio/layer_2_application/scope/accessScope.ts" enhancement="_blank"/>
export interface StructureGrant {
  grantId: string;
  actorRef: string;
  scopeMode: string;
  session: string;
  pending: string;
  disclosure: string;
  recordField: string;
  /** Per entity of an own grant, the column that holds the anchor id (one direct step); a longer chain is a join. */
  recordFields: Readonly<Record<string, string>>;
  entityRefs: readonly string[];
  /** An own grant over the anchor itself (the person's own record): resolved with no column. */
  selfAnchored: boolean;
}

export const grants: readonly StructureGrant[] = [
  {"grantId":"pessoaCompletarMeuAcesso","actorRef":"pessoaOrganizacao","scopeMode":"own","session":"verified","pending":"","disclosure":"fullRecord","recordField":"","recordFields":{},"entityRefs":["PessoaOrganizacao"],"selfAnchored":true},
  {"grantId":"pessoaMeuTelefone","actorRef":"pessoaOrganizacao","scopeMode":"custom","session":"verified","pending":"","disclosure":"fullRecord","recordField":"","recordFields":{},"entityRefs":["TelefonePessoa"],"selfAnchored":false},
  {"grantId":"pessoaVerEmpresa","actorRef":"pessoaOrganizacao","scopeMode":"organization","session":"verified","pending":"","disclosure":"fieldsOnly","recordField":"","recordFields":{},"entityRefs":["Empresa"],"selfAnchored":false},
  {"grantId":"responsavelAcompanharPessoas","actorRef":"responsavel","scopeMode":"organization","session":"verified","pending":"","disclosure":"fieldsOnly","recordField":"","recordFields":{},"entityRefs":["PessoaOrganizacao"],"selfAnchored":false},
  {"grantId":"responsavelMeuAcesso","actorRef":"responsavel","scopeMode":"own","session":"verified","pending":"","disclosure":"fullRecord","recordField":"","recordFields":{},"entityRefs":["PessoaOrganizacao"],"selfAnchored":true},
  {"grantId":"responsavelMeuTelefone","actorRef":"responsavel","scopeMode":"custom","session":"verified","pending":"","disclosure":"fullRecord","recordField":"","recordFields":{},"entityRefs":["TelefonePessoa"],"selfAnchored":false},
  {"grantId":"responsavelPrepararEmpresa","actorRef":"responsavel","scopeMode":"organization","session":"verified","pending":"","disclosure":"fullRecord","recordField":"","recordFields":{},"entityRefs":["Empresa","ContatoEmpresa"],"selfAnchored":false}
];

export function resolveGrant(grantId: string): StructureGrant | { code: string; detail: string } {
  const grant = grants.find(item => item.grantId === grantId);
  if (!grant) return { code: 'GRANT_ABSENT', detail: `Grant ${grantId} is not declared.` };
  if (grant.session !== 'verified') return { code: 'SESSION_UNVERIFIED', detail: `Grant ${grantId} session is not verified.` };
  if (!grant.scopeMode) return { code: 'SCOPE_UNBOUND', detail: `Grant ${grantId} has no scope mode.` };
  if (grant.scopeMode === 'own' && Object.keys(grant.recordFields).length === 0 && !grant.selfAnchored) return { code: 'ACCESS_ANCHOR', detail: `Grant ${grantId} has no resolved scope path.` };
  return grant;
}

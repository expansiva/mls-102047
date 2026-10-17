/// <mls fileReference="_102047_/l1/inicio/layer_2_application/requests/inicio_pessoa.ts" enhancement="_blank"/>

import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { Inicio_pessoaContracts } from '/_102047_/l2/inicio/web/contracts/inicio_pessoa.defs.js';
import { getPessoaOrganizacao } from '/_102047_/l1/inicio/layer_2_application/usecases/getPessoaOrganizacao.js';
import { getEmpresa } from '/_102047_/l1/inicio/layer_2_application/usecases/getEmpresa.js';

type Output = Inicio_pessoaContracts['inicio.inicio_pessoa.qryInicioPessoa']['output'];
type PendenciaAcesso = Output['pendencias'][number];
type StatusPessoa = Output['meuAcesso']['details']['identification']['status'];

const STATUS_VALUES: StatusPessoa[] = ['Active', 'Inactive', 'Merged', 'Blocked'];

const EU_COUNTRIES: string[] = [
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE',
  'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
];

function isStatus(value: string): value is StatusPessoa {
  return (STATUS_VALUES as string[]).includes(value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function nonEmpty(value: string | undefined | null): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function readIds(refs: unknown, key: string): string[] {
  if (!isRecord(refs)) return [];
  const list = refs[key];
  if (!Array.isArray(list)) return [];
  return list.filter((item): item is string => typeof item === 'string' && item.length > 0);
}

/** Valid consent: a consent object that was not revoked nor refused. */
function hasValidConsent(consent: Record<string, unknown> | undefined): boolean {
  if (!isRecord(consent)) return false;
  if (consent.revokedAt != null && consent.revokedAt !== '') return false;
  if (consent.granted === false || consent.accepted === false || consent.valid === false) return false;
  return true;
}

/** emailContaNaoEditavel: the e-mail is read only, extracted from the contacts of the person. */
function extractAccountEmail(contacts: Record<string, unknown>[]): string | undefined {
  for (const contact of contacts) {
    const kind = String(contact.contactType ?? contact.type ?? '').toLowerCase();
    const value = contact.value;
    if (typeof value !== 'string' || value.trim().length === 0) continue;
    if (kind === 'email' || (kind === '' && value.includes('@'))) return value;
  }
  return undefined;
}

export const requests: { [K in keyof Inicio_pessoaContracts]: (input: Inicio_pessoaContracts[K]['input'], ctx: RequestContext) => Promise<Inicio_pessoaContracts[K]['output']> } = {
  'inicio.inicio_pessoa.qryInicioPessoa': async function (_input, ctx) {
    const sessionPerson = ctx.sessionContext.person;
    if (sessionPerson == null || !nonEmpty(sessionPerson.mdmId)) {
      throw new AppError('NOT_FOUND', 'Pessoa da sessão não encontrada na plataforma', 404);
    }

    const pessoa = await getPessoaOrganizacao({ id: sessionPerson.mdmId }, ctx);
    if (pessoa == null) {
      throw new AppError('NOT_FOUND', 'Cadastro da pessoa não encontrado', 404);
    }

    const identification = pessoa.details.identification;
    const name = identification.name;
    const countryCode = identification.countryCode;
    const countryUpper = nonEmpty(countryCode) ? countryCode.trim().toUpperCase() : '';

    // acessoCompletoDadosMinimos: nome e país; consentimento válido se Brasil ou União Europeia; telefone não conta.
    const consentimentoExigido = countryUpper === 'BR' || EU_COUNTRIES.includes(countryUpper);
    // naoPedirDadoJaExistente: só lista o que a plataforma ainda não tem.
    const dadosFaltantes: string[] = [];
    if (!nonEmpty(name)) dadosFaltantes.push('nome');
    if (!nonEmpty(countryCode)) dadosFaltantes.push('país');
    if (consentimentoExigido && !hasValidConsent(pessoa.details.person?.privacyConsent)) {
      dadosFaltantes.push('consentimento de privacidade');
    }
    const acessoCompleto = dadosFaltantes.length === 0;

    const contacts = Array.isArray(pessoa.details.base.contacts) ? pessoa.details.base.contacts : [];
    const emailConta = extractAccountEmail(contacts);

    // ligacaoLoginPelaPlataforma: the login is linked when the session e-mail is the e-mail of the record;
    // a different e-mail in the contacts means another registration with that e-mail already exists.
    const loginLigado = emailConta == null
      || !nonEmpty(sessionPerson.email)
      || emailConta.trim().toLowerCase() === sessionPerson.email.trim().toLowerCase();

    const pendencias: PendenciaAcesso[] = [];
    if (!loginLigado && emailConta != null) {
      // ligacaoLoginPelaPlataforma: only shows the pending release; does not store it nor decide the link.
      pendencias.push({ tipo: 'pedirLiberacao', emailConta, details: { inicio: {} } });
    } else if (!acessoCompleto) {
      const pendencia: PendenciaAcesso = {
        tipo: 'completarDadosMinimos',
        details: { inicio: { dadosFaltantes } },
      };
      if (emailConta != null) {
        const comEmail: PendenciaAcesso = { ...pendencia, emailConta };
        pendencias.push(comEmail);
      } else {
        pendencias.push(pendencia);
      }
    }
    // seguirDiretoSeCompleto: complete and linked gives an empty list.

    if (!isStatus(identification.status)) {
      throw new AppError('INVALID_STATE', `Situação da pessoa desconhecida: ${identification.status}`, 500);
    }

    const meuAcessoIdentificacao: Output['meuAcesso']['details']['identification'] = {
      status: identification.status,
    };
    if (nonEmpty(name)) meuAcessoIdentificacao.name = name;
    if (nonEmpty(countryCode)) meuAcessoIdentificacao.countryCode = countryCode;

    const output: Output = {
      meuAcesso: {
        id: pessoa.id,
        details: {
          identification: meuAcessoIdentificacao,
          inicio: { acessoCompleto, dadosFaltantes, consentimentoExigido },
        },
      },
      pendencias,
    };

    // Company linked by AssignedTo: relationshipRefs.assignments.
    const detailsRecord: Record<string, unknown> = pessoa.details;
    let empresaIds = readIds(pessoa.details.base.relationshipRefs, 'assignments');
    if (empresaIds.length === 0) empresaIds = readIds(detailsRecord.relationshipRefs, 'assignments');
    if (empresaIds.length > 0) {
      const empresa = await getEmpresa({ id: empresaIds[0] }, ctx);
      if (empresa != null) {
        // grant pessoaVerEmpresa: only name and tradeName.
        const tradeName = empresa.details.company.tradeName;
        output.empresa = {
          details: {
            identification: { name: empresa.details.identification.name },
            company: nonEmpty(tradeName) ? { tradeName } : {},
          },
        };
      }
    }

    return output;
  },
};

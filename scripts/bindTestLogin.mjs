#!/usr/bin/env node
// mls-102047/scripts/bindTestLogin.mjs (VM): bind a login e-mail to an MDM person, so a test session has a person.
// It lives in the project it serves (moved from mls-base/scripts on 15/10/2026) and runs from the mls-base root.
//
// Why: generated L1 modules identify the caller by the MDM person bound to the login e-mail
// (`ctx.sessionContext.person`, resolved by `resolveSessionPerson`). With no binding the session has no person,
// and rules such as "only the collaborator who registered the expense may send it" refuse with
// "The authenticated collaborator could not be identified" (reembolsoDespesas, 13/10/2026). There is no BFF
// route or screen for the binding (only the server-side invite flow), so test logins never get one.
//
// What it does, against the TEST database of the project (same resolution as `node scripts/runMigrate.mjs`):
//   1. if the e-mail is already bound, keeps that person (safe to run twice);
//   2. otherwise creates an MDM person (subtype Person) and binds the e-mail to it (`mdm.identity.setLogin`);
//   3. reads the binding back;
//   4. with --role, gives the person each module role tag (e.g. reembolsoDespesas.Colaborador), also when the
//      e-mail was already bound. Module lists only show people with the module's role, so a person without it
//      appears as "não identificado" (or not at all) in screens such as despesas_da_equipe.
//   5. with --report-manager, links the person to a manager with the MDM relationship ReportsTo (person → person),
//      which fills details.relationshipRefs.reportManagers. `self` makes the person their own manager, so one login
//      can register as a collaborator and decide as the team manager (reembolsoDespesas, managerTeamExpenseAccess,
//      13/10/2026); an mdmId links to that person. Skipped when the link is already there.
// Refused outside development/presentation.
//
// Usage on the VM:
//   cd /data/mls-base && node mls-102047/scripts/bindTestLogin.mjs --email you@example.com [--name "Name (teste)"] [--project 102047] \
//     [--role reembolsoDespesas.Colaborador[,otherModule.Role]] [--report-manager self|<mdmId>]
// Then restart the app (pm2 restart app<port>) so a cached "no person" for that e-mail is dropped, and create
// NEW records: rows created before the binding carry the login id, not the person id.

import { copyFileSync, existsSync, readFileSync, realpathSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// mls-base root: <root>/mls-102047/scripts/bindTestLogin.mjs → <root>.
const ROOT = dirname(dirname(dirname(fileURLToPath(import.meta.url))));

function argValue(name, fallback = '') {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}

const email = argValue('email').trim().toLowerCase();
const name = argValue('name', 'Pessoa de teste');
const projectId = argValue('project', '102047');
const roles = argValue('role').split(',').map((role) => role.trim()).filter(Boolean);
const reportManager = argValue('report-manager').trim();
if (!email || !email.includes('@')) {
  console.error('usage: node mls-102047/scripts/bindTestLogin.mjs --email you@example.com [--name "Name"] [--project 102047] [--role module.Role[,module.Role]] [--report-manager self|<mdmId>]');
  process.exit(2);
}

// The project's own release alias (the app of that project runs from it), else the shared one.
const aliasDir = [join(ROOT, `current-${projectId}`), join(ROOT, 'current')].find((dir) => existsSync(join(dir, 'config.json')));
if (!aliasDir) {
  console.error(`no active release (looked for current-${projectId} and current under ${ROOT})`);
  process.exit(1);
}
const release = realpathSync(aliasDir);

// Same environment as the app: the stable .env, the project id, and the TEST database URL built from it.
if (existsSync(join(ROOT, '.env'))) copyFileSync(join(ROOT, '.env'), join(release, '.env'));
process.chdir(release);
const dotenv = {};
if (existsSync('.env')) {
  for (const line of readFileSync('.env', 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue;
    const eq = trimmed.indexOf('=');
    dotenv[trimmed.slice(0, eq)] = trimmed.slice(eq + 1);
  }
}
process.env.COLLAB_PROJECT_ID ??= projectId;
if (!process.env.DATABASE_URL_TEST && dotenv.PGUSER && dotenv.PGPASSWORD) {
  const host = dotenv.PGHOST || '127.0.0.1';
  const port = dotenv.PGPORT || '5432';
  // The app's own test database (rt54 s5: collab_app_test, created by migrate), named in scripts/runtime/vmApps.mjs.
  let testDatabase = 'collab_app_test';
  try {
    testDatabase = (await import(pathToFileURL(join(ROOT, 'scripts', 'runtime', 'vmApps.mjs')).href)).TEST_DATABASE_NAME || testDatabase;
  } catch {
    // vmApps.mjs missing or not loadable here: keep the default.
  }
  process.env.DATABASE_URL_TEST = `postgres://${encodeURIComponent(dotenv.PGUSER)}:${encodeURIComponent(dotenv.PGPASSWORD)}@${host}:${port}/${testDatabase}`;
}
console.log(`test database: ${new URL(process.env.DATABASE_URL_TEST ?? 'postgres://x/?').pathname.slice(1) || '(unset)'}`);

const config = JSON.parse(readFileSync('config.json', 'utf8'));
const masterBackendId = Object.entries(config.projects ?? {}).find(([, project]) => project?.type === 'master backend')?.[0];
if (!masterBackendId) {
  console.error('no master backend declared in config.json');
  process.exit(1);
}
const l1 = join(release, 'dist', 'local', `_${masterBackendId}_`, 'l1');
const load = (path) => import(pathToFileURL(join(l1, path)).href);

const { readProjectMode, isTestMode } = await load('server/layer_1_external/config/projectMode.js');
const mode = readProjectMode(projectId);
if (!isTestMode(mode)) {
  console.error(`refused: project ${projectId} runs in appEnv='${mode}'; bindTestLogin is for development/presentation only.`);
  process.exit(1);
}

const { createDefaultRequestContext } = await load('server/layer_2_controllers/execBff.js');
const { lookupLogin, resolveSessionPerson } = await load('mdm/layer_3_usecases/identityUsecases.js');
const ctx = createDefaultRequestContext();

let mdmId;
const existing = await lookupLogin(ctx, email);
if (existing) {
  mdmId = existing.mdmId;
  console.log(`[bindTestLogin] ${email} is already bound to MDM person ${mdmId}${existing.name ? ` (${existing.name})` : ''}.`);
} else {
  const created = await ctx.mdm.entity.create({ details: { subtype: 'Person', name, status: 'Active' } });
  await ctx.mdm.identity.setLogin(created.mdmId, email);
  const person = await resolveSessionPerson(ctx, email);
  if (!person || person.mdmId !== created.mdmId) {
    console.error(`[bindTestLogin] created person ${created.mdmId}, but the binding does not read back for ${email}.`);
    process.exit(1);
  }
  mdmId = person.mdmId;
  console.log(`[bindTestLogin] project ${projectId} (appEnv=${mode}): ${email} -> MDM person ${mdmId} "${name}".`);
}

for (const role of roles) {
  if (!/^[A-Za-z0-9_]+\.[A-Za-z0-9_]+$/u.test(role)) {
    console.error(`[bindTestLogin] --role '${role}' must be <moduleId>.<Role>, e.g. reembolsoDespesas.Colaborador`);
    process.exit(2);
  }
  const current = await ctx.mdm.entity.get({ mdmId });
  if ((current.details.tags ?? []).includes(role)) {
    console.log(`[bindTestLogin] person ${mdmId} already has role ${role}.`);
    continue;
  }
  await ctx.mdm.entity.attachRole(mdmId, role);
  const after = await ctx.mdm.entity.get({ mdmId });
  if (!(after.details.tags ?? []).includes(role)) {
    console.error(`[bindTestLogin] attachRole did not add ${role} to person ${mdmId}.`);
    process.exit(1);
  }
  console.log(`[bindTestLogin] person ${mdmId} now has role ${role}.`);
}

if (reportManager) {
  const managerId = reportManager === 'self' ? mdmId : reportManager;
  const reportManagersOf = async () => {
    const current = await ctx.mdm.entity.get({ mdmId });
    const refs = current.details.relationshipRefs ?? {};
    return Array.isArray(refs.reportManagers) ? refs.reportManagers : [];
  };
  if ((await reportManagersOf()).includes(managerId)) {
    console.log(`[bindTestLogin] person ${mdmId} already reports to ${managerId}.`);
  } else {
    await ctx.mdm.entity.link({ fromId: mdmId, toId: managerId, type: 'ReportsTo', role: 'direct-report' });
    if (!(await reportManagersOf()).includes(managerId)) {
      console.error(`[bindTestLogin] linked ${mdmId} ReportsTo ${managerId}, but reportManagers does not read it back.`);
      process.exit(1);
    }
    console.log(`[bindTestLogin] person ${mdmId} now reports to ${managerId}${managerId === mdmId ? ' (self: one login is collaborator and manager)' : ''}.`);
  }
}

console.log(`[bindTestLogin] person id for URLs and records: ${mdmId}`);
console.log('[bindTestLogin] next: restart the app (pm2 restart app<port>) and create new records; older ones carry the login id.');
process.exit(0);

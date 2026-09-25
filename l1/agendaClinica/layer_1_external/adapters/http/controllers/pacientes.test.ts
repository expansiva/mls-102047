/// <mls fileReference="_102047_/l1/agendaClinica/layer_1_external/adapters/http/controllers/pacientes.test.ts" enhancement="_blank"/>

import assert from 'node:assert/strict';
import test from 'node:test';

import { scenarioCatalog } from '/_102047_/l1/agendaClinica/materialization/agentMaterializeL1/scenarioCatalog.js';
import { routes } from '/_102047_/l1/agendaClinica/layer_1_external/adapters/http/controllers/pacientes.js';

const scenario = scenarioCatalog.scenarios.find(item => item.scenarioId === 'pacientes');

void test('pacientes keeps the catalog assertion', () => {
  if (!scenario) throw new Error('missing scenario pacientes');
  assert.equal(scenarioCatalog.store, 'memory');
  void routes;
  {
    const item = scenario.cases.find(entry => entry.caseId === 'pacientes.auth.cmdCreatePaciente');
    if (!item) throw new Error('missing case pacientes.auth.cmdCreatePaciente');
    assert.equal(item.gate, 'auth');
    assert.equal(item.expect.ok, false);
    assert.equal(item.expect.status, 403);
    assert.equal(item.expect.errorCode, "FORBIDDEN_ACTOR");
    assert.equal(item.expect.ruleId, null);
    assert.deepEqual(item.expect.forbiddenFields, []);
    assert.equal(item.expect.isolatedActorField, null);
    assert.equal(item.routine, "agendaClinica.pacientes.cmdCreatePaciente");
  }

  {
    const item = scenario.cases.find(entry => entry.caseId === 'pacientes.auth.qryListPaciente');
    if (!item) throw new Error('missing case pacientes.auth.qryListPaciente');
    assert.equal(item.gate, 'auth');
    assert.equal(item.expect.ok, false);
    assert.equal(item.expect.status, 403);
    assert.equal(item.expect.errorCode, "FORBIDDEN_ACTOR");
    assert.equal(item.expect.ruleId, null);
    assert.deepEqual(item.expect.forbiddenFields, []);
    assert.equal(item.expect.isolatedActorField, null);
    assert.equal(item.routine, "agendaClinica.pacientes.qryListPaciente");
  }

  {
    const item = scenario.cases.find(entry => entry.caseId === 'pacientes.compile');
    if (!item) throw new Error('missing case pacientes.compile');
    assert.equal(item.gate, 'compile');
    assert.equal(item.expect.ok, true);
    assert.equal(item.expect.status, 0);
    assert.equal(item.expect.errorCode, null);
    assert.equal(item.expect.ruleId, null);
    assert.deepEqual(item.expect.forbiddenFields, []);
    assert.equal(item.expect.isolatedActorField, null);
    assert.equal(item.routine, "");
  }

  {
    const item = scenario.cases.find(entry => entry.caseId === 'pacientes.contract.cmdCreatePaciente.details');
    if (!item) throw new Error('missing case pacientes.contract.cmdCreatePaciente.details');
    assert.equal(item.gate, 'contract');
    assert.equal(item.expect.ok, false);
    assert.equal(item.expect.status, 400);
    assert.equal(item.expect.errorCode, "VALIDATION_ERROR");
    assert.equal(item.expect.ruleId, null);
    assert.deepEqual(item.expect.forbiddenFields, []);
    assert.equal(item.expect.isolatedActorField, null);
    assert.equal(item.routine, "agendaClinica.pacientes.cmdCreatePaciente");
  }

  {
    const item = scenario.cases.find(entry => entry.caseId === 'pacientes.contract.qryListPaciente.id');
    if (!item) throw new Error('missing case pacientes.contract.qryListPaciente.id');
    assert.equal(item.gate, 'contract');
    assert.equal(item.expect.ok, false);
    assert.equal(item.expect.status, 400);
    assert.equal(item.expect.errorCode, "VALIDATION_ERROR");
    assert.equal(item.expect.ruleId, null);
    assert.deepEqual(item.expect.forbiddenFields, []);
    assert.equal(item.expect.isolatedActorField, null);
    assert.equal(item.routine, "agendaClinica.pacientes.qryListPaciente");
  }
});

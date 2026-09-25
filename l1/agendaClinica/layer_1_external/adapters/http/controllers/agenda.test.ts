/// <mls fileReference="_102047_/l1/agendaClinica/layer_1_external/adapters/http/controllers/agenda.test.ts" enhancement="_blank"/>

import assert from 'node:assert/strict';
import test from 'node:test';

import { scenarioCatalog } from '/_102047_/l1/agendaClinica/materialization/agentMaterializeL1/scenarioCatalog.js';
import { routes } from '/_102047_/l1/agendaClinica/layer_1_external/adapters/http/controllers/agenda.js';

const scenario = scenarioCatalog.scenarios.find(item => item.scenarioId === 'agenda');

void test('agenda keeps the catalog assertion', () => {
  if (!scenario) throw new Error('missing scenario agenda');
  assert.equal(scenarioCatalog.store, 'memory');
  void routes;
  {
    const item = scenario.cases.find(entry => entry.caseId === 'agenda.auth.cmdRegistrarAtendimento');
    if (!item) throw new Error('missing case agenda.auth.cmdRegistrarAtendimento');
    assert.equal(item.gate, 'auth');
    assert.equal(item.expect.ok, false);
    assert.equal(item.expect.status, 403);
    assert.equal(item.expect.errorCode, "FORBIDDEN_ACTOR");
    assert.equal(item.expect.ruleId, null);
    assert.deepEqual(item.expect.forbiddenFields, []);
    assert.equal(item.expect.isolatedActorField, null);
    assert.equal(item.routine, "agendaClinica.agenda.cmdRegistrarAtendimento");
  }

  {
    const item = scenario.cases.find(entry => entry.caseId === 'agenda.auth.qryListConsulta');
    if (!item) throw new Error('missing case agenda.auth.qryListConsulta');
    assert.equal(item.gate, 'auth');
    assert.equal(item.expect.ok, false);
    assert.equal(item.expect.status, 403);
    assert.equal(item.expect.errorCode, "FORBIDDEN_ACTOR");
    assert.equal(item.expect.ruleId, null);
    assert.deepEqual(item.expect.forbiddenFields, []);
    assert.equal(item.expect.isolatedActorField, null);
    assert.equal(item.routine, "agendaClinica.agenda.qryListConsulta");
  }

  {
    const item = scenario.cases.find(entry => entry.caseId === 'agenda.compile');
    if (!item) throw new Error('missing case agenda.compile');
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
    const item = scenario.cases.find(entry => entry.caseId === 'agenda.contract.cmdRegistrarAtendimento.id');
    if (!item) throw new Error('missing case agenda.contract.cmdRegistrarAtendimento.id');
    assert.equal(item.gate, 'contract');
    assert.equal(item.expect.ok, false);
    assert.equal(item.expect.status, 400);
    assert.equal(item.expect.errorCode, "VALIDATION_ERROR");
    assert.equal(item.expect.ruleId, null);
    assert.deepEqual(item.expect.forbiddenFields, []);
    assert.equal(item.expect.isolatedActorField, null);
    assert.equal(item.routine, "agendaClinica.agenda.cmdRegistrarAtendimento");
  }

  {
    const item = scenario.cases.find(entry => entry.caseId === 'agenda.contract.qryListConsulta.id');
    if (!item) throw new Error('missing case agenda.contract.qryListConsulta.id');
    assert.equal(item.gate, 'contract');
    assert.equal(item.expect.ok, false);
    assert.equal(item.expect.status, 400);
    assert.equal(item.expect.errorCode, "VALIDATION_ERROR");
    assert.equal(item.expect.ruleId, null);
    assert.deepEqual(item.expect.forbiddenFields, []);
    assert.equal(item.expect.isolatedActorField, null);
    assert.equal(item.routine, "agendaClinica.agenda.qryListConsulta");
  }
});

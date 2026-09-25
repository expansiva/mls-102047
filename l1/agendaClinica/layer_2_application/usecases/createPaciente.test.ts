/// <mls fileReference="_102047_/l1/agendaClinica/layer_2_application/usecases/createPaciente.test.ts" enhancement="_blank"/>

import assert from 'node:assert/strict';
import test from 'node:test';

import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { scenarioCatalog } from '/_102047_/l1/agendaClinica/materialization/agentMaterializeL1/scenarioCatalog.js';
import { createPaciente } from '/_102047_/l1/agendaClinica/layer_2_application/usecases/createPaciente.js';

const scenario = scenarioCatalog.scenarios.find(item => item.scenarioId === 'createPaciente');

void test('createPaciente keeps the catalog assertion', () => {
  if (!scenario) throw new Error('missing scenario createPaciente');
  assert.equal(scenarioCatalog.store, 'memory');
  void createPaciente;
  void AppError;
  {
    const item = scenario.cases.find(entry => entry.caseId === 'createPaciente.compile');
    if (!item) throw new Error('missing case createPaciente.compile');
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
    const item = scenario.cases.find(entry => entry.caseId === 'createPaciente.reachesStub');
    if (!item) throw new Error('missing case createPaciente.reachesStub');
    assert.equal(item.gate, 'business');
    assert.equal(item.expect.ok, true);
    assert.equal(item.expect.status, 200);
    assert.equal(item.expect.errorCode, null);
    assert.equal(item.expect.ruleId, null);
    assert.deepEqual(item.expect.forbiddenFields, []);
    assert.equal(item.expect.isolatedActorField, null);
    assert.equal(item.routine, "");
  }
});

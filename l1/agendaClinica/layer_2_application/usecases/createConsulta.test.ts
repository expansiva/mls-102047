/// <mls fileReference="_102047_/l1/agendaClinica/layer_2_application/usecases/createConsulta.test.ts" enhancement="_blank"/>

import assert from 'node:assert/strict';
import test from 'node:test';

import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { scenarioCatalog } from '/_102047_/l1/agendaClinica/materialization/agentMaterializeL1/scenarioCatalog.js';
import { createConsulta } from '/_102047_/l1/agendaClinica/layer_2_application/usecases/createConsulta.js';

const scenario = scenarioCatalog.scenarios.find(item => item.scenarioId === 'createConsulta');

void test('createConsulta keeps the catalog assertion', () => {
  if (!scenario) throw new Error('missing scenario createConsulta');
  assert.equal(scenarioCatalog.store, 'memory');
  void createConsulta;
  void AppError;
  {
    const item = scenario.cases.find(entry => entry.caseId === 'createConsulta.compile');
    if (!item) throw new Error('missing case createConsulta.compile');
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
    const item = scenario.cases.find(entry => entry.caseId === 'createConsulta.reachesStub');
    if (!item) throw new Error('missing case createConsulta.reachesStub');
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

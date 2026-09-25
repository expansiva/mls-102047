/// <mls fileReference="_102047_/l1/agendaClinica/layer_2_application/usecases/listProfissional.test.ts" enhancement="_blank"/>

import assert from 'node:assert/strict';
import test from 'node:test';

import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { scenarioCatalog } from '/_102047_/l1/agendaClinica/materialization/agentMaterializeL1/scenarioCatalog.js';
import { listProfissional } from '/_102047_/l1/agendaClinica/layer_2_application/usecases/listProfissional.js';

const scenario = scenarioCatalog.scenarios.find(item => item.scenarioId === 'listProfissional');

void test('listProfissional keeps the catalog assertion', () => {
  if (!scenario) throw new Error('missing scenario listProfissional');
  assert.equal(scenarioCatalog.store, 'memory');
  void listProfissional;
  void AppError;
  {
    const item = scenario.cases.find(entry => entry.caseId === 'listProfissional.compile');
    if (!item) throw new Error('missing case listProfissional.compile');
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
    const item = scenario.cases.find(entry => entry.caseId === 'listProfissional.reachesStub');
    if (!item) throw new Error('missing case listProfissional.reachesStub');
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

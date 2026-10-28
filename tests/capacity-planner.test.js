const test = require('node:test');
const assert = require('node:assert/strict');
const { analyzeCapacity } = require('../sample/capacity-planner');

test('calculates projected overtime and budget variance', () => {
  const result = analyzeCapacity({overtimeThreshold: 40, budgetHours: 80, staff: [
    {name: 'Person A', workedHours: 32, remainingScheduledHours: 12},
    {name: 'Person B', workedHours: 20, remainingScheduledHours: 10}
  ]});
  assert.equal(result.projectedHours, 74);
  assert.equal(result.varianceToBudgetHours, -6);
  assert.equal(result.projectedOvertimeHours, 4);
  assert.equal(result.overtimeRisks.length, 1);
});

test('rejects invalid data', () => {
  assert.throws(() => analyzeCapacity({budgetHours: 40, staff: [{name: 'X', workedHours: -2, remainingScheduledHours: 3}]}));
});

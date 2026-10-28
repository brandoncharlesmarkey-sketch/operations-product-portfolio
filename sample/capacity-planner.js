/**
 * Fictional operating-capacity demonstration.
 * Original portfolio example; unrelated to any production application code.
 * Run: node sample/capacity-planner.js data/example-scenario.json
 */
const fs = require('node:fs');

function finiteNonNegative(value, label) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
    throw new Error(`${label} must be a finite non-negative number`);
  }
  return value;
}

function analyzeCapacity(input) {
  if (!input || typeof input !== 'object' || !Array.isArray(input.staff)) {
    throw new Error('Input must contain an array named staff');
  }
  const overtimeThreshold = finiteNonNegative(input.overtimeThreshold ?? 40, 'overtimeThreshold');
  const budgetHours = finiteNonNegative(input.budgetHours, 'budgetHours');
  const people = input.staff.map((person, index) => {
    if (!person || typeof person.name !== 'string' || !person.name.trim()) {
      throw new Error(`staff[${index}].name is required`);
    }
    const worked = finiteNonNegative(person.workedHours, `staff[${index}].workedHours`);
    const remaining = finiteNonNegative(person.remainingScheduledHours, `staff[${index}].remainingScheduledHours`);
    const projected = worked + remaining;
    return {
      name: person.name,
      projectedHours: projected,
      projectedOvertimeHours: Math.max(0, projected - overtimeThreshold)
    };
  });
  const projectedHours = people.reduce((sum, person) => sum + person.projectedHours, 0);
  return {
    headcount: people.length,
    budgetHours,
    projectedHours,
    varianceToBudgetHours: projectedHours - budgetHours,
    projectedOvertimeHours: people.reduce((sum, person) => sum + person.projectedOvertimeHours, 0),
    overtimeRisks: people.filter(person => person.projectedOvertimeHours > 0)
  };
}

if (require.main === module) {
  const filepath = process.argv[2];
  if (!filepath) {
    console.error('Usage: node sample/capacity-planner.js path/to/scenario.json');
    process.exitCode = 1;
  } else {
    try {
      const input = JSON.parse(fs.readFileSync(filepath, 'utf8'));
      process.stdout.write(JSON.stringify(analyzeCapacity(input), null, 2) + '\n');
    } catch (error) {
      console.error(error.message);
      process.exitCode = 1;
    }
  }
}

module.exports = { analyzeCapacity };

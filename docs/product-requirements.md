# Example Product Requirements: Staffing Coverage and Overtime Risks

## User problem

A supervisor needs to know whether scheduled staffing meets demand and which employees are projected to exceed a weekly hour threshold. A manager needs to act before labor cost variances accumulate.

## Users

- **Dispatcher:** view active assignments and status exceptions.
- **Supervisor:** identify coverage gaps and release or reassign staff when safe.
- **Manager:** compare staffing hours with budget and review overtime exposure.

## Example user stories

1. As a manager, I can compare scheduled hours to a weekly budget so that I can identify a projected variance.
2. As a supervisor, I can see projected overtime by employee so that I can consider staffing adjustments.
3. As a dispatcher, I can see which posts remain unfilled so that dispatch decisions reflect real capacity.

## Acceptance criteria

- All calculations include a stated time period and consistent time units.
- Overtime risk identifies projected hours above a configurable threshold.
- Empty or invalid inputs produce clear errors rather than fabricated projections.
- An alert does not automatically authorize an employee schedule change.
- Example values are fictional; no production data is included.

## Success metrics

- Projected versus actual labor hours.
- Overtime hours per reporting period.
- Shuttle request-to-response time, including median and upper percentiles.
- Uncovered post-hours and service-level exceptions.
- Manual reconciliation effort and time-to-decision.

## Prioritization tradeoff

First ship trustworthy data collection and clear exception states; then add prediction and automation. Analytics based on inconsistent timestamps or unclear vehicle statuses can undermine confidence in the entire product.

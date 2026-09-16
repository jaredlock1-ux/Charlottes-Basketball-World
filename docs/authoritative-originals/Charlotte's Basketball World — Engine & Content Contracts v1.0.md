# Charlotte's Basketball World — Game 1 QA & Architecture Notes
**Version:** 1.0  
**Date:** 14 September 2026

## Immediate implementation decision
The live Game 1 QA harness must support **direct state-entry tests** for specific mechanics. A tester should not have to play through an entire game waiting for a rare event such as a steal.

## Direct test principle
A QA control may:
1. enter a canonical test state;
2. invoke the same production engine handler used by the player;
3. resolve the target mechanic;
4. show the resulting state and event trace.

It must not create a second implementation of the mechanic.

## Required direct tests
- Four shot choices
- Shot miss
- Shot block
- Shot foul/free throws
- Offensive rebound
- Defensive rebound
- Defensive decision
- Guaranteed steal outcome
- Defensive shot outcome
- Turnover/transition
- Failure/recovery
- Restart/continuation
- Late-pressure state

## Certification rule
Direct QA proves mechanic reachability. It does **not** replace end-to-end behavioural-route testing.

Both are required.

## Regression rule
When a direct test exposes a defect:
**reproduce → classify → fix source layer → rerun direct test → rerun adjacent branch → rerun relevant behavioural route → certify.**

## Architecture status
The platform architecture, canonical data model and engine/content contracts are now established as v1.0. Game 1 remains the vertical slice and the next implementation phase is extraction of content/configuration from the monolithic page while preserving the same engine behavior.

# Game 1 repair — final verification

Repository certification evidence record, subordinate to the broader approved specifications/bibles under the [authority hierarchy](RULES.md#product-authority-and-specification-change-control). This report records technical evidence; it is not the Game 1 Acceptance & Certification Specification and cannot redefine basketball requirements.

**TECHNICAL CERTIFICATION: PASS — Carryo version 33, engine 1.4.0.** All 17 defects from the supplied QA report are closed for the required tested routes. No unresolved engine/state defect was observed in final regression.

Canonical URL: https://share.carryo.io/charlotte-step-2-2-possession-test

The existing linkId, Ut1lZRccZcss2zjq, was updated from version 32 to 33. No replacement site was created. The deployed HTML was read back twice and exactly matched the local tested bundle.

SHA-256 of the deployed bundle: `edaa7a7c093889713c7c38feca9b8f20e145c1acafaf3c0fda8365743ba9ff72`.

## Changes

The engine now exclusively owns scoring, clock, ball state and possession changes. Authored slot IDs are separate from monotonically increasing runtime possession IDs. Own-team rebounds retain possession; opponent rebounds close it through a controlled transition. Background and teammate possessions produce actual attempts/outcomes or turnovers. Shot and free-throw results are explicit, including a live rebound after the final missed free throw. Seeded random input replaces outcome selection based on button index or trace length.

The original 30-slot authored spine was recovered from ChatGPT's project sources and restored as timing/branch data. Real background play accounts for the time between anchors. Both halves consume 1,200 seconds, with no silent clock deletion. The scoreboard is driven exclusively by made-basket and made-free-throw events. Halftime carries state into a coherent restart; the final result follows the actual score.

Jared's explicit product amendment resolved the previously unspecified tied-final-score rule: tie at final 0:00 after two halves → draw; no overtime. That decision supersedes recovered historical win-only wording; this report records its verification, not a new rule. Three normal choices and the four locked shooting choices remain in place. See RULES.md and reference/recovered-specs.md.

## Tests completed

- 66 automated engine, contract, direct-entry and full-route tests passed.
- 11/11 contract checks passed through the live published interface. These use a separate engine instance and do not reset the active game.
- 69 live fixture/action combinations were clicked across all 23 direct fixtures, plus a complete first-free-throw → second-free-throw → rebound sequence.
- Four complete live browser games, totalling **1,092 gameplay clicks**, covered all six required behavioural criteria.
- Every full-game click was recorded with its visible before/after scene, choices, clock, score, possession and ball state. Each recorded action was replayed through the deterministic engine and matched the actual rendered outcome exactly.
- All four full-game scores reconcile with scoring events; each has exactly one halftime and final whistle and exactly 1,200 seconds of live time per half.
- No score regression, backward possession ID, unexplained clock jump, dead control or browser warning/error occurred in those final runs.
- An additional 300 direct simulations (100 seeds × three choice policies) met the 12–18 decision range and offered shooting in both halves.

## Required behavioural coverage

| Required criterion | Live evidence | Result |
|---|---|---|
| Highly involved | Default, seed 1: six shots, five points, 18 decisions | PASS |
| Cautious | Seed 2718: no calls for the ball, 17 decisions | PASS |
| Brave but unlucky | Seed 18: at least three player misses/blocks, two points | PASS |
| Early mistake → recovery | Seed 6: early Magic turnover and a later recorded recovery | PASS |
| Late close game | Default, seed 1: Magic 45–Falcons 46 at P28 | PASS |
| Low-scoring but highly involved | Seed 18: four shots, two player points, 18 decisions | PASS |

These are six criteria covered by four distinct full browser playthroughs, not six separate browser runs. Highly involved/late close share seed 1; unlucky/low player scoring share seed 18. Each criterion also has its own automated assertion.

| Full live run | Clicks | Final Magic–Falcons | Decisions | Result |
|---|---:|---:|---:|---|
| Default / highly involved / late close | 272 | 49–49 | 18 | Draw |
| Cautious | 268 | 46–54 | 17 | Falcons win |
| Brave but unlucky / low player scoring | 288 | 46–52 | 18 | Falcons win |
| Early mistake → recovery | 264 | 45–43 | 18 | Magic win |

The default run's 64 rebound outcomes included Charlotte 10, teammates 23 and Falcons 31; Falcons totals include both offensive and defensive rebounds. Other runs also produced all three winners. No player action directly selected a winner.

## Evidence and limits

- `evidence/live-default.jsonl`, `live-cautious.jsonl`, `live-unlucky.jsonl`, `live-recovery.jsonl`: complete observed browser transitions.
- `evidence/live-fixtures.jsonl`: direct fixture/action results.
- `evidence/live-free-throws.jsonl`: ordered free-throw/rebound interaction.
- `evidence/verification.json`: build hash and independently verified run metrics.
- `evidence/live-*-engine-trace.json`: deterministic engine reconstructions of the recorded live actions, not hidden browser-state captures.
- `evidence/live-*-console.json`: empty browser warning/error logs.
- `evidence/live-final.png`: inspected final published screen.
- `evidence/live-contracts.txt`: published contract-check output.

Certification here covers this exact build's requested engine/state repairs and required regression routes. It does not claim every possible random sequence or device has been tested, or substitute for Charlotte's judgement of enjoyment. The developer panel's embedded NOT CERTIFIED label is a conservative pre-release label; it does not self-certify from its own contract checks. This report records the completed external live verification without modifying the tested bundle after regression.

## Certification status and protected baseline

**Game 1 v33 is the certified engine baseline:** 17 defects resolved, 66 automated tests passed and four complete live-browser playthroughs covering all six required routes/criteria. Score, rebounds, possession, both halves and final results were verified. Ties at final 0:00 finish as draws, as demonstrated by the 49–49 default run and specified in RULES.md.

This is the historical technical certification for the exact deployed bundle identified above. The 15 September 2026 governance amendment does not rerun QA, alter the bundle or certify a newer release. Certified behaviour remains protected unless its underlying specification is deliberately changed and the resulting implementation is re-certified.

**Player-experience certification: not established by this report.** Record Jared/Charlotte validation separately, against the approved Experience Layer Gate acceptance criteria, for comprehension, basketball realism, decision/outcome understanding and enjoyment. Technical success does not imply experience success. Complete functional QA before Charlotte's playtest; observed playtest problems return through diagnosis, intended-behaviour resolution and a consolidated package in README.md.

## Requirement → acceptance/automated test → live proof

RULES.md records local traceability aliases for the baseline requirements and approved decisions under the broader authority hierarchy. The table links implementation-facing acceptance summaries to retained test and live evidence; it does not make repository aliases authoritative specification requirements or claim new tests or a newly completed per-test audit. The shared automated result is [tests-final.txt](evidence/tests-final.txt); the implementation checks are [engine tests](tests/engine.test.mjs) and [game tests](tests/game.test.mjs).

| Local reference to requirement / approved decision | Acceptance / automated evidence | Retained live proof |
|---|---|---|
| [G1-SCORE](RULES.md#baseline-requirement-references) | Scoring-event reconciliation and final-result acceptance; `Magic/Falcons made 2/3 persists across possession transition` and full-route scoring-event assertions in tests-final.txt | Four live run logs below and [verification.json](evidence/verification.json); final scores in Required behavioural coverage |
| [G1-REBOUND](RULES.md#baseline-requirement-references) | `rebound engine ownership ...` and `free throws ... explicit, ordered, live final miss`; own-team ID retention/opponent transition acceptance | [default run](evidence/live-default.jsonl), [fixtures](evidence/live-fixtures.jsonl), [free throws](evidence/live-free-throws.jsonl), verification.json |
| [G1-POSSESSION](RULES.md#baseline-requirement-references) | `steal records turnover before single possession change`, `dead ball and restart preserve ownership, id and clock`, rebound tests and full-route state validation | Four live run logs and deterministic replay verification in verification.json |
| [G1-HALVES](RULES.md#baseline-requirement-references) | `two complete halves and immutable final state`, `source spine has all 30 permanent slots, halftime P18, final P30` and full-route clock assertions | Four live run logs and verification.json |
| [G1-DRAW](RULES.md#baseline-requirement-references) | Equal final totals produce draw without overtime; `two complete halves and immutable final state` and default full-route completion; an explicit automated draw-label assertion was not found in the inspected tests | Default run: 49–49 Draw; verification.json |
| [G1-CHOICES](RULES.md#baseline-requirement-references) | `public contracts pass without mutating another game`, `each shot choice can score, miss, be blocked or draw a foul`, direct-entry/full-route choice and decision-budget checks; both-half shooting acceptance | [live contracts](evidence/live-contracts.txt), fixtures and four live run logs |
| [G1-ROUTES](RULES.md#baseline-requirement-references) | Separate automated assertions for six criteria; see Required behavioural coverage | [default](evidence/live-default.jsonl), [cautious](evidence/live-cautious.jsonl), [unlucky](evidence/live-unlucky.jsonl), [recovery](evidence/live-recovery.jsonl) |

For each subsequent package, retain **authoritative requirement → acceptance/automated test → live proof**. Record the requirement revision, specific acceptance/test identifier and result, deployed version/hash, browser route/fixture and evidence location. For experience requirements, add the Jared/Charlotte observation and validation outcome. Explicitly mark missing proof as pending; tests alone cannot certify deployment or experience. Governance-only requirements use document review, with live proof marked not applicable and a reason.

Traceability gap: the retained live default run proves the draw result, but the inspected automated tests do not explicitly assert the tied-result presentation/no-overtime requirement together. See [TD-G1-DRAW-01](#future-test-debt-td-g1-draw-01). This identified test debt does not rewrite v33's historical technical certification.

## Future test debt: TD-G1-DRAW-01

Status: identified only; not implemented or run in this documentation-only reconciliation. Classification: Test. Requirement source: Jared's explicit product amendment recorded under [Design gap closed by Jared](RULES.md#design-gap-closed-by-jared-14-september-2026), locally indexed as G1-DRAW.

Existing coverage inspected: tests/engine.test.mjs checks two complete halves and immutable final state; tests/game.test.mjs checks full-route termination, clock totals and scoring reconciliation; src/contracts.mjs checks final-state closure and rejected post-final actions. None explicitly asserts the complete tie → displayed draw → no overtime chain. Historical live-default evidence shows 49–49 and the draw result.

Appropriate future regression: add a game-level test in [tests/game.test.mjs](tests/game.test.mjs) using createGame with the existing deterministic seed 1 / first-choice policy that reaches the recorded 49–49 final. Retain access to the final game view rather than relying only on the current play helper's state/trace return.

Assert together:

- Both teams have equal scores at second-half 0:00; the game is ended and in the final state.
- The final view communicates a draw (v33 wording: “The game finishes tied.”), identifies neither team as winner and offers no continuing gameplay choices.
- Exactly one final whistle is emitted, the trace contains only halves 1 and 2 and exactly 1,200 seconds per half, with no overtime period or post-final clock restart.
- An attempted post-final gameplay action cannot resume play or change the score, half, clock or final state.

This tests the existing approved behaviour without introducing a new draw label, overtime rule or game-state field. Keep the pre-horn shot/free-throw completion behaviour unchanged. The DEFECTS.md test-debt entry links here so the acceptance detail has one repository home.

## Re-certification and release/rollback record

Apply README.md change-impact classification before implementation. Every Engine change requires full certified regression, including the automated suite, live contracts/fixtures and all six behavioural route criteria, with score, rebounds, possession, both halves and final results checked. Preserve regression coverage; do not alter expected results merely to make a changed implementation pass. Changed behaviour requires an authoritative specification amendment and re-certification.

For every certified release retain an identifiable Carryo version, engine version, exact bundle/hash, source snapshot or revision, requirement revisions, test/live evidence, technical certification status, separate experience status and a known-good rollback artifact. Keep presentation releases distinguishable from the certified engine version. Verify the published artifact identity after deployment or rollback.

The existing recovery reference is Carryo v33 / engine 1.4.0, linkId Ut1lZRccZcss2zjq, with the SHA-256 above and retained evidence. The recorded artifact is [dist/game-1.html](dist/game-1.html). Before a future release overwrites that build output, preserve an immutable copy matching the certified hash and its source/evidence. This amendment does not claim that a separate immutable archive or source revision already exists. The v32 file in reference/ is historical defect evidence, not the v33 known-good rollback artifact.

A rollback must restore the retained certified artifact through Carryo's version-conflict protection, record the resulting deployment version and original certified identity, and verify the live hash and applicable browser checks. Do not assume Carryo's version counter can be decremented. Follow the implementation-facing Definition of Done in README.md and the broader approved certification requirements before declaring a subsequent package complete. The reported Build Control Register deployment/certification tension in [RULES.md](RULES.md#historical-source-conflicts-and-limits) remains unresolved; these release controls do not override that unavailable original.

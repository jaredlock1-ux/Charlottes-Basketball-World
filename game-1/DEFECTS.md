# Game 1 repair register

Implementation/repository defect and evidence record under the [authority hierarchy](RULES.md#product-authority-and-specification-change-control); not a replacement for the broader Defect & Change Log, governance bible or basketball specifications. Closure records implementation verification and cannot amend product requirements.

Baseline: Carryo version 32, linkId Ut1lZRccZcss2zjq. Canonical URL: https://share.carryo.io/charlotte-step-2-2-possession-test

Repair verification: PASS on Carryo version 33. All 17 reported defects are closed for the tested routes. See QA-REPORT.md for exact build, evidence and scope. The earlier rows below retain diagnosis history; all UI/controller items marked pending there were subsequently completed and verified in the final regression.

## Historical diagnosis (v32 repair work; not current status)

The following table preserves interim repair notes. “Pending” describes that earlier stage only; current closure is recorded in Final closure and QA-REPORT.md.

| QA IDs | Defect | Confirmed source cause | Historical repair / evidence |
|---|---|---|---|
| 1, 3 | Missing shot and second free-throw outcomes | UI discards resolver result | Engine returns individual structured outcomes; UI pending |
| 2 | Offensive rebound advances possession | reb() calls start('Magic') for own rebound | Same-team rebound retains ID; engine tests pass |
| 4, 6, 7, 8 | IDs move backward; ownership reversed | G.next/defense pass authored slot counter to E.start | Runtime ID allocated only by engine after possession end; engine tests pass |
| 5 | Teammate possessions have no outcome | Movement routes call next() directly | Controller repair pending |
| 9, 10 | Opponent baskets do not persist | E.set('score.Falcons', ...) creates a literal dotted property | Dedicated scoring events mutate nested score; engine tests pass |
| 11, 13 | Most of both halves skipped | TREE H/F calls tick(all remaining time) | Max 30 seconds per live event; background timeline pending |
| 12, 17 | Restart story contradicts owner | Background slot uses Magic copy regardless of owner | Engine-owned restart to Falcons; UI pending |
| 14 | Invalid final result | Lost opponent points and generic final copy | Scoring fixed; final UI pending |
| 15 | No organic steals/turnovers | Steal only reachable with force; normal game never sets it | Engine pressure resolves steal or recovery; authored route pending |
| 16 | Rebound mix implausible/player selects winner | Choice maps directly to winner; trace-length RNG couples outcomes to logging | Seeded draw independent of trace, weighted positioning, all winners available |

Additional source defects identified:

- QA rebound entries call an out-of-scope reboundUI function.
- Guaranteed steal QA never sets its force flag.
- Halftime QA subtracts 300 seconds after already reaching zero.
- Contract checks reset the live game and leave it in an unrelated test state.
- Free throws have no sequencing guard; QA can take shot two before shot one.
- Team rebounds count as Charlotte's own rebounds.
- Current 30-element TREE differs materially from the original authored backbone described by the project source reply.

Sources: original QA report from Project Reflection Lessons; Carryo v32 source saved under reference; source documents requested from the same ChatGPT task at Jared's direction.

## Final closure

All listed engine and QA harness defects were repaired in engine 1.4.0 / Carryo 33. Local regression additionally found and fixed duplicate halftime emission at a last-second rebound, and a misleading owned-ball label during a loose-ball state. Neither remained in the final live regression. Runtime IDs are separate from the preserved authored spine; background attempts and rebounds resolve through the same engine as player actions.

Test infrastructure interruptions: the first standard Node test command was blocked from spawning a child process, so tests ran with test isolation disabled. One live browser batch timed out and an interrupted partial run was abandoned. The final four complete runs were restarted, persisted to evidence/live-*.jsonl, and independently replay-verified. Partial evidence/default.jsonl is not included in certification counts.

## Feedback intake and regression protection

Use the development process in [README.md](README.md#feedback-to-implementation-package). An individual observation or playtest comment is input to diagnosis, not an implementation instruction.

For each future issue, record the observed behaviour and live version, reproduction/evidence, intended behaviour linked to the authoritative specification or approved product decision, with [RULES.md](RULES.md) used only as an implementation-facing reference/summary and any unavailable original explicitly recorded, acceptance criteria, Engine / Content / Presentation / Test / Governance impact classes, and its consolidated implementation package. Surface product ambiguities before implementation. Link closure to the regression test/acceptance result and live proof in [QA-REPORT.md](QA-REPORT.md#requirement--acceptanceautomated-test--live-proof), plus experience validation where applicable.

Distinguish an engine defect from an experience issue even when both are present. Engine changes require full certified regression; certified behaviour may change only through a deliberate specification change and subsequent re-certification. Charlotte's comprehension, basketball realism, decision/outcome understanding and enjoyment feedback follows functional QA.

The 17 original defects remain closed for v33's tested scope. New observations should receive separate records and must not silently rewrite this historical closure or imply untested routes are certified.

## Identified test debt — TD-G1-DRAW-01

Classification: Test. Status: identified, not implemented. The inspected automated suite does not explicitly assert the complete **tie at final 0:00 → displayed draw → no overtime** chain. The retained v33 live default run supplies historical draw proof; all 17 reported repair defects remain closed within their certified scope.

The proposed test belongs in tests/game.test.mjs and must check both the game-level final view and engine terminal state. See [QA-REPORT.md — Future test debt](QA-REPORT.md#future-test-debt-td-g1-draw-01) for existing coverage, the deterministic route and acceptance assertions. This is future regression work, not authorisation to modify tests or gameplay in this reconciliation.

# Charlotte’s Basketball World — Game 1 Acceptance & Certification Specification

**Version:** 1.0  
**Status:** RELEASE GATE  
**Purpose:** Define the evidence required to prove Game 1 works before live deployment and certification.

---

## 1. Certification Principle

Game 1 is **NOT READY** until the required technical, basketball, experience and regression gates pass.

A rendered page or working button is not evidence of completion.

Certification status for every gate is one of:
- **PASS**
- **FAIL**
- **NOT TESTED**

Any critical FAIL or NOT TESTED item means Game 1 remains **NOT READY**.

## 2. Source Traceability

Each acceptance test traces to one or more authoritative sources:
- Master Game Specification — product/design requirements;
- Development Bible — development/process requirements;
- Game 1 Engine & Possession Specification — state/engine requirements;
- Game 1 Story & Experience Specification — player-facing experience requirements.

No implementation decision overrides these sources silently.

## 3. Gate A — Opening and Game Structure

- [ ] Game starts at 20:00.
- [ ] Score starts 0–0.
- [ ] Tip-off is visibly/meaningfully experienced.
- [ ] First possession follows from the tip-off.
- [ ] No authored decision occurs before the game has actually begun.
- [ ] Two 20-minute halves are represented.
- [ ] Half-time is a real game-state transition.
- [ ] Final whistle ends the game coherently.

## 4. Gate B — Decision Contract

- [ ] Every authored decision has exactly three choices.
- [ ] No normal decision has one or two choices.
- [ ] Shooting decisions have exactly the four locked shooting choices.
- [ ] Choices are plausible.
- [ ] No choice is labelled correct, brave or assertive.
- [ ] Each choice has defined possible outcomes.
- [ ] Each choice leads to a valid next state.
- [ ] Decisions materially influence future play.

## 5. Gate C — Player Decision / Engine Outcome Separation

- [ ] Player chooses action/type, not uncertain physical outcome.
- [ ] Player cannot choose make/miss/block.
- [ ] Engine resolves shot outcome internally.
- [ ] A shot cannot occur without a genuine shot opportunity.
- [ ] Movement cannot silently become a shot.

## 6. Gate D — Score and Causality

- [ ] Score changes only after an actual made basket or free throw.
- [ ] A rebound cannot directly add points.
- [ ] A movement decision cannot directly add points.
- [ ] A shot choice cannot directly add points.
- [ ] Every score mutation has a preceding scoring event in the event trace.
- [ ] Team scoring can occur without a Charlotte decision.
- [ ] Opponent scoring is possible and coherent.

## 7. Gate E — Possession Continuity

For every authored and background possession:
- [ ] starting possession team is defined;
- [ ] live state is defined;
- [ ] outcome is defined;
- [ ] clock update is defined;
- [ ] score update, if any, is defined;
- [ ] next possession team is defined;
- [ ] ball state is coherent;
- [ ] possession cannot terminate into an undefined state.

## 8. Gate F — Shot / Rebound / Foul Chains

### Shot
- [ ] Shot opportunity exists before shot choice.
- [ ] One of the locked shot choices is selected.
- [ ] Engine resolves make/miss/block/relevant foul outcome.

### Miss/block
- [ ] No score is added.
- [ ] Live-ball/rebound consequence follows.

### Offensive rebound
- [ ] Rebound is recorded correctly.
- [ ] Rebound itself does not score.
- [ ] A new shot decision is required for a putback.
- [ ] The putback has its own engine-resolved shot outcome.

### Foul/free throws
- [ ] Foul is an actual outcome.
- [ ] Free throws form a genuine mini-sequence.
- [ ] Points are awarded only for made free throws.

## 9. Gate G — State Integrity

- [ ] Clock only moves forward, except explicit half/end transitions.
- [ ] Score never decreases unexpectedly.
- [ ] Possession is always valid.
- [ ] Ball state is always valid.
- [ ] Charlotte’s location is consistent with the action.
- [ ] Pressure/fatigue changes are coherent.
- [ ] Stats are earned only by valid events.
- [ ] Game-specific state cannot accidentally become permanent journey state.
- [ ] Visual state never contradicts basketball state.

## 10. Gate H — Language and Player Experience

- [ ] Player-facing references use “you”.
- [ ] Player is not referred to as “Charlotte”.
- [ ] No coaching lesson is delivered.
- [ ] No “correct answer” language.
- [ ] No explicit labelling of assertive behaviour.
- [ ] No inappropriate basketball coaching jargon.
- [ ] Emotional states are not falsely asserted as facts.
- [ ] Choices remain plausible.
- [ ] Failure is not treated as character failure.

## 11. Gate I — Story Continuity

- [ ] Game feels like one continuous basketball game.
- [ ] Score and clock matter to the story.
- [ ] Consequences carry between possessions.
- [ ] Background possessions occur naturally.
- [ ] Characters react to what happened.
- [ ] Recovery follows mistakes naturally.
- [ ] Pressure increases appropriately.
- [ ] The game does not reset after each decision.
- [ ] The ending is earned by the game state.

## 12. Gate J — Pacing

- [ ] The experience maintains meaningful movement/information/opportunity approximately every 5–10 seconds.
- [ ] This does not become a decision every 5–10 seconds.
- [ ] Countdown timers appear only when genuinely justified by pressure.
- [ ] There are quiet/background moments as well as Charlotte spotlight moments.

## 13. Gate K — Behavioural Route Certification

The same engine must support all six routes:

- [ ] Highly involved
- [ ] Cautious
- [ ] Brave but unlucky
- [ ] Early mistake → recovery
- [ ] Late close game
- [ ] Low-scoring but highly involved

No route is the hidden “correct” route.

## 14. Gate L — Deterministic Engine Testing

Certification must not depend on luck.

The test harness must be able to deliberately produce at least:
- [ ] made shot;
- [ ] missed shot;
- [ ] blocked shot;
- [ ] offensive rebound;
- [ ] defensive rebound;
- [ ] turnover;
- [ ] defensive stop;
- [ ] opponent basket;
- [ ] foul/free throw sequence.

## 15. Gate M — Inspectable State / Replay

For a certified run, the engine must be able to expose a chronological trace:

**Game State → Live Event → Decision → Choice → Outcome → State Update → Next Possession**

The trace must make it possible to explain:
- current clock;
- current score;
- current possession;
- Charlotte’s relevant action;
- outcome;
- scoring cause;
- next possession;
- relevant stats/flags.

## 16. Gate N — Regression

For every material change:
- [ ] changed path tested;
- [ ] adjacent branches tested;
- [ ] score/clock/possession rechecked;
- [ ] player language rechecked;
- [ ] decision counts rechecked;
- [ ] shot/rebound causality rechecked;
- [ ] Golden Game impact assessed;
- [ ] six behavioural routes considered.

## 17. Gate O — User-Facing Sanity Test

Play the game as the player.

Ask:
1. Does this feel like an actual game?
2. Do I understand what is happening?
3. Does my choice affect what happens next?
4. Does the score make sense?
5. Does the clock matter?
6. Can I fail and recover?
7. Can my team score without me?
8. Can I influence the game without scoring?
9. Does pressure emerge from the game rather than narration?
10. Does this feel like playing rather than being taught?
11. Would I want to try something in a real game afterward?

Any critical NO = NOT READY.

## 18. Golden Game Certification

The Golden Game is the canonical continuous experience and architecture certification point. It is not the definition of “correct” player behaviour.

Before certification it must demonstrate:
- real tip-off;
- ordinary game rhythm;
- background scoring;
- Charlotte decisions;
- uncertain shot outcomes;
- mistakes;
- recovery;
- rebounds;
- changing score;
- changing clock;
- increasing pressure;
- coherent ending.

Target player-facing duration: approximately 8–10 minutes.

## 19. Deployment Gate

Only after all required gates pass:
- [ ] relevant specifications are current;
- [ ] acceptance evidence exists;
- [ ] regression is complete;
- [ ] certification audit is recorded;
- [ ] current Carryo version has been read;
- [ ] live edit is made to the canonical URL;
- [ ] edit succeeds;
- [ ] post-deployment sanity check passes.

Carryo is deployment, not unresolved development.

## 20. Certification Record

**Game version:** __________  
**Engine version:** __________  
**Story/Experience version:** __________  
**Acceptance specification version:** __________  
**Carryo version tested:** __________  
**Date:** __________

| Gate | Status | Evidence / notes |
|---|---|---|
| A Opening | NOT TESTED | |
| B Decisions | NOT TESTED | |
| C Decision/outcome separation | NOT TESTED | |
| D Score/causality | NOT TESTED | |
| E Possession continuity | NOT TESTED | |
| F Shot/rebound/foul | NOT TESTED | |
| G State integrity | NOT TESTED | |
| H Language/experience | NOT TESTED | |
| I Story continuity | NOT TESTED | |
| J Pacing | NOT TESTED | |
| K Behavioural routes | NOT TESTED | |
| L Deterministic tests | NOT TESTED | |
| M State/replay | NOT TESTED | |
| N Regression | NOT TESTED | |
| O User-facing sanity | NOT TESTED | |
| Golden Game | NOT TESTED | |
| Deployment | NOT TESTED | |

**Certification decision:** NOT READY

### Change Log

**v1.0 — 13 September 2026**
- Created as the formal Game 1 acceptance, verification, validation and certification gate.
- Consolidated functional, state, basketball, experience, behavioural-route, deterministic, replay, regression and deployment checks.

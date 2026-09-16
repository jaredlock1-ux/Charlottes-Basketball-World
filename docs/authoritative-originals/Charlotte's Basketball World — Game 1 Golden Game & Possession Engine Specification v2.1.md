# Charlotte's Basketball World --- Game 1

## Golden Game & Possession Engine Specification v2.1

**Status:** LOCKED IMPLEMENTATION SPECIFICATION\
**Date:** 13 September 2026\
**Game:** Game 1 --- ASK FOR IT\
**Parent:** Master Game Specification v1.0\
**Development authority:** Development Bible v1.0

------------------------------------------------------------------------

## 1. Purpose

This document is the bridge between the Game Bible and the working game
engine.

It defines the first complete **continuous basketball story** that the
implementation must be able to run before we make the live Carryo
experience more ambitious.

The goal is not to write a sequence of screens.

The goal is to create a believable game in which:

**The game is happening → you notice something → you can influence it →
you choose → something actually happens → the game state changes → the
game continues.**

The player should never feel that the score is decoration or that each
question is an isolated basketball scenario.

------------------------------------------------------------------------

# 2. Non-Negotiable Architecture

The engine must execute:

**GameState → Possession → LiveEvent → Decision (if authored) → Choice →
Outcome → StateUpdate → NextPossession**

It must never reduce the game to:

**Scenario → Choice → Message → Next Scenario**

### Possession is the fundamental unit.

A possession may contain:

-   several live actions;
-   one or more decisions;
-   a shot;
-   a rebound;
-   a second decision after an offensive rebound;
-   a foul/free-throw sequence;
-   a turnover;
-   a defensive stop.

A decision does not necessarily end a possession.

A possession does not necessarily contain a decision.

------------------------------------------------------------------------

# 3. Golden Game

The Golden Game is the first complete playable segment used to prove the
engine.

It is approximately 8--10 minutes of game time and represents the
opening section of a real game.

It is deliberately authored rather than simulated with random
basketball.

It must include:

-   ordinary possessions where you are not asked anything;
-   possessions where you influence the play;
-   possessions where your choice succeeds;
-   possessions where your choice fails;
-   possessions where your team scores without you;
-   possessions where the opponent scores;
-   a genuine mistake and recovery;
-   increasing defensive attention;
-   increasing game pressure;
-   a meaningful late-game opportunity.

The Golden Game is not the entire 40-minute match. It is the **engine
proof** from which the full game architecture can be extended.

------------------------------------------------------------------------

# 4. Initial Game State

At tip-off:

  Variable            Value
  ------------------- ------------------
  Half                1st
  Clock               20:00
  Magic score         0
  Falcons score       0
  Possession          Magic
  Ball                Magic teammate
  You                 Running up court
  Basketball Volume   5/10
  Pressure            Low
  Fatigue             Low
  Defender pressure   Low

No decision occurs at the instant of tip-off.

The game should first establish that an actual basketball game is
underway.

------------------------------------------------------------------------

# 5. Possession Contract

Every authored possession must specify:

1.  possession ID;
2.  start clock;
3.  starting score;
4.  possession team;
5.  what is happening live;
6.  your location;
7.  defender state;
8.  whether you have a decision;
9.  available choices;
10. outcome for every choice;
11. time consumed;
12. score delta, if any;
13. next possession team;
14. next ball state;
15. relevant stat changes;
16. relevant journey/pressure changes;
17. next meaningful opportunity.

If any of these cannot be defined, the possession is **NOT READY TO
BUILD**.

------------------------------------------------------------------------

# 6. Golden Game --- Authored Flow

## P1 --- Tip-off

**20:00 \| 0--0 \| Magic ball**

Magic win the tip.

Live action:

-   a teammate controls the ball;
-   Falcons retreat;
-   you sprint up court;
-   you see open space on the right.

**No decision.**

The player must first see the tip-off/opening possession state before any decision UI appears.

**Resolution:** Magic possession continues.

**Clock:** 19:38

**Next:** P2.

------------------------------------------------------------------------

## P2 --- First Chance

**19:38 \| 0--0 \| Magic ball**

A teammate brings the ball forward.

You are open on the right.

### Decision

**A --- CALL FOR THE BALL**

**B --- KEEP MOVING INTO THE OPEN SPACE**

**C --- STAY WHERE YOU ARE**

### A --- Call

You call.

Possible outcomes:

**A1 --- Pass arrives**

-   teammate sees you;
-   pass reaches you;
-   defender closes;
-   you have the ball;
-   `askedForBall +1`;
-   possession continues;
-   → P3.

**A2 --- Teammate sees you but keeps the ball**

-   defender notices you;
-   another teammate becomes available;
-   ball continues elsewhere;
-   your involvement still affects defensive attention;
-   → P3B.

**A3 --- Pass is attempted but defender gets a hand to it**

-   turnover;
-   Falcons ball;
-   → defensive recovery possession.

Calling is meaningful even when it does not produce a touch.

### B --- Keep moving

-   you run into the open space;
-   teammate notices;
-   pass arrives;
-   `wentIntoSpace +1`;
-   possession continues;
-   → P3.

### C --- Stay

-   opportunity closes;
-   teammate passes elsewhere;
-   no touch;
-   possession continues;
-   → background possession.

No punishment is attached to staying.

------------------------------------------------------------------------

# 7. P3 --- First Touch

**\~19:20 \| 0--0 \| Magic ball**

You receive the ball.

Your defender closes.

### Decision

**A --- MOVE TOWARDS THE BASKET**

**B --- PASS TO A TEAMMATE**

**C --- KEEP THE BALL AND LOOK AGAIN**

### A --- Move

The first attempt does not automatically produce a shot.

Possible outcomes:

**A1 --- Defender blocks the path**

-   you stop the drive;
-   you keep the ball;
-   Magic retain possession;
-   → P4A.

**A2 --- You get around the defender**

-   you reach a scoring area;
-   genuine shot opportunity is created;
-   → P4 Shot.

**A3 --- Contact**

-   foul;
-   appropriate free-throw sequence;
-   → P4 Free Throws.

### B --- Pass

-   clean pass → Magic continue;
-   poor/intercepted pass → turnover → Falcons possession.

### C --- Look again

-   defender gets closer;
-   another opening may appear;
-   you may pass;
-   you may try to move;
-   possession remains alive.

No automatic turnover merely because you waited.

------------------------------------------------------------------------

# 8. P4 --- Shot Opportunity

A shot opportunity exists **only after the game state establishes that a
shot is actually available**.

The four choices are locked:

1.  **PUMP FAKE, THEN LAYUP**
2.  **DRIVE FOR THE LAYUP**
3.  **TAKE THE SHOT**
4.  **SIDE STEP AND TAKE THE SHOT**

The choice itself does not change the score.

It creates a shot event.

### Shot outcomes

The resolver may produce:

-   made basket;
-   miss;
-   block;
-   foul → two free throws where appropriate.

A made basket is the only event that can add the basket points.

------------------------------------------------------------------------

# 9. P5 --- Miss → Live Ball

Example:

**19:10 \| 0--0 \| Magic shot**

The shot hits the rim.

The ball comes loose.

**Score remains 0--0.**

The ball is live.

### Decision

**A --- GO AFTER THE BALL**

**B --- GET BACK ON DEFENCE**

### A --- Go after the ball

Possible outcomes:

-   you secure offensive rebound → Magic retain;
-   another player wins it → appropriate next state;
-   Falcons win it → Falcons possession.

If you secure it:

**DO NOT SCORE.**

→ P6.

### B --- Get back

-   Falcons secure the rebound;
-   Falcons possession;
-   you recover defensively;
-   → defensive opportunity.

------------------------------------------------------------------------

# 10. P6 --- Offensive Rebound

**Example: 18:55 \| 0--0 \| Magic ball**

You have won the offensive rebound.

You are close to the basket.

This is a **new decision**, not an automatic basket.

### Decision

**A --- PUT IT BACK UP**

**B --- PASS TO A TEAMMATE**

**C --- MOVE OUT AND LOOK AGAIN**

### A --- Put it back up

-   a new shot event is created;
-   shot outcome is resolved;
-   only a made shot changes the score.

Possible outcomes:

-   basket → Magic +2;
-   miss → rebound;
-   block → live ball/rebound;
-   foul → free throws.

### B --- Pass

-   ball goes to teammate;
-   Magic retain;
-   no score change;
-   possession continues.

### C --- Move out

-   you move away from the basket;
-   teammate has ball;
-   possession continues;
-   another opening may develop.

This structure is mandatory.

**Rebound ≠ points.**

------------------------------------------------------------------------

# 11. Background Possessions

The game must breathe.

Not every possession is a Charlotte decision.

Use short authored background possessions:

### B1 --- Magic score

Magic move the ball and score.

### B2 --- Magic miss / Falcons rebound

No score change.

### B3 --- Falcons score

Falcons attack and score.

### B4 --- Falcons miss / Magic rebound

Magic retain.

### B5 --- Turnover

Possession changes.

### B6 --- Defensive stop

Defending team forces a miss or turnover.

Each background possession should normally consume approximately 8--25
seconds.

The score must be driven by these actual outcomes.

------------------------------------------------------------------------

# 12. Example Continuous Golden Route

This is the primary route used to prove the engine.

### 20:00

Magic win tip.

### 19:38

You see open space.

**You call for the ball.**

### 19:32

Pass arrives.

**You move towards the basket.**

### 19:27

Defender blocks your path.

You keep the ball and pass out.

### 19:12

Magic teammate shoots.

**Miss.**

### 19:04

Ball comes loose.

**You go after it.**

### 19:00

You win the rebound.

**Decision:**

-   put it back up;
-   pass;
-   move out.

If you put it back:

### 18:55

New shot.

**Made basket.**

**Magic 2--0.**

Only now does the scoreboard change.

### 18:40

Falcons possession.

They attack.

You defend.

### 18:23

You help force a difficult shot.

Falcons miss.

Magic rebound.

### 18:05

Magic move the ball.

You run into space.

A teammate uses the space and scores.

**Magic 4--0.**

You did not score, but your movement influenced the possession.

### 17:35

Falcons respond.

**Falcons score.**

**Magic 4--2.**

The game is now recognisably a game rather than a collection of
questions.

------------------------------------------------------------------------

# 13. Early Mistake Branch

At any appropriate early attacking opportunity, one branch must allow:

**You attempt something → turnover.**

The consequence must be real:

-   Falcons get the ball;
-   clock advances;
-   score may change;
-   you transition back to defence.

Then:

**Next defensive opportunity.**

You can make a defensive play.

This establishes:

**mistake → consequence → recovery → another opportunity**

The game never tells you that you made a "bad choice".

------------------------------------------------------------------------

# 14. Increasing Pressure

Pressure must come from game conditions.

### 20:00--15:00

Low pressure.

Focus on discovering that you can influence the game.

### 15:00--8:00

Moderate pressure.

Defenders notice your involvement.

Openings change.

You may have had success earlier and now receive more attention.

### 8:00--2:00

Higher pressure.

Introduce:

-   closer score;
-   greater fatigue;
-   less time;
-   more defensive pressure;
-   more meaningful consequences.

### 2:00--0:00

Genuine late-game pressure.

Use a countdown only when the basketball situation warrants it.

Never use a countdown simply to make a decision feel dramatic.

------------------------------------------------------------------------

# 15. Continuity Rules

If you call and receive the ball, the next scene/event must know:

-   you called;
-   you have the ball;
-   the defender is closing;
-   the possession is still alive.

If you miss a shot:

-   the ball must become live;
-   the score must remain unchanged;
-   the next event must resolve the rebound/possession.

If you win an offensive rebound:

-   the score must remain unchanged;
-   you must have the ball;
-   a new action/decision may follow.

If you turn the ball over:

-   Falcons must have the ball;
-   you must be transitioning to defence;
-   the next opportunity must reflect that.

No branch may teleport back to a generic "next scenario".

------------------------------------------------------------------------

# 16. State Model

Minimum game state:

``` text
GameState
  half
  clock
  magicScore
  falconsScore
  possessionTeam
  ballState
  ballLocation
  playerLocation
  defenderPressure
  gamePressure
  fatigue
  basketballVolume

  stats
    baskets
    rebounds
    defensiveStops
    goodPasses
    bravePlays
    askedForBall
    wentAfterBall
    looseBalls

  journey
    calledForBall
    movedIntoSpace
    attacked
    recoveredAfterMistake
    createdSpace
    defenderAttention
```

The renderer must display state.

The renderer must not invent state.

------------------------------------------------------------------------

# 17. Outcome Resolver Rules

Every action must resolve through a defined outcome.

### Basket

Only:

`madeShot → score += points`

### Miss

`miss → ballLive → rebound/possession resolution`

### Block

`block → ballLive → rebound/possession resolution`

### Foul

`foul → freeThrowSequence OR inbound`

### Turnover

`turnover → possessionTeam changes`

### Defensive stop

`stop → possessionTeam changes`

### Offensive rebound

`offensiveRebound → same team retains possession`

Never:

`rebound → score`

------------------------------------------------------------------------

# 18. The 10-Second Rule

There must not be more than approximately 10 seconds of game time
without meaningful movement, information, consequence or opportunity
relating to you.

This does **not** mean a decision every 10 seconds.

The rhythm is:

**GAME HAPPENS → YOU NOTICE → YOU CAN INFLUENCE → YOU CHOOSE →
CONSEQUENCE → GAME CONTINUES**

Presentation should use:

-   live action;
-   short event updates;
-   clear visual changes;
-   decision moments only where they matter.

------------------------------------------------------------------------

# 19. Character & Visual Continuity

The player is always **you**.

Player-facing copy must use second person.

The visual representation is the same player throughout.

Use the existing Charlotte artwork assets as the visual language.

Visual changes should communicate:

-   running;
-   calling;
-   attacking;
-   shooting;
-   rebounding;
-   defending;
-   recovering;
-   celebrating.

The visual layer must reflect the actual state.

It must not imply a basket before a basket has occurred.

------------------------------------------------------------------------

# 20. Required Test Routes

Before live deployment, the engine must successfully run:

### Route A --- Highly involved

You:

-   call;
-   receive;
-   attack;
-   rebound;
-   defend;
-   influence multiple possessions.

### Route B --- Cautious

You:

-   miss some opportunities;
-   touch the ball less;
-   still remain part of the game;
-   can later become involved.

### Route C --- Brave but unlucky

You:

-   call and don't receive;
-   attack and are blocked;
-   go for a rebound and lose it;
-   later get another opportunity.

### Route D --- Early mistake

You:

-   make a turnover;
-   Falcons gain possession;
-   Falcons may score;
-   you defend;
-   you get a recovery opportunity.

### Route E --- Low scoring / high involvement

You:

-   call;
-   create space;
-   pass;
-   rebound;
-   defend;
-   may score little or not at all.

### Route F --- Late close game

The engine must respond to actual:

-   score;
-   clock;
-   possession;
-   fatigue;
-   defensive pressure.

The final opportunity must change depending on the game state.

------------------------------------------------------------------------

# 21. Automated/Static Validation

Before publication, the implementation should be checked for:

### Player language

-   no player-facing "Charlotte";
-   no coaching language;
-   no "correct answer";
-   no prohibited jargon.

### Score

Find every score mutation.

Each must be reachable only through:

-   made basket;
-   made free throw.

### Possession

Every possession ending must specify:

-   outcome;
-   next possession team;
-   ball state.

### Shooting

Every shot choice must be gated behind a genuine shot opportunity.

The four locked choices must remain exact.

### Rebounding

No rebound handler may directly award points.

### Clock

Clock must only move forwards through game time:

`newClock < oldClock`

except for explicit halftime/end-of-game transitions.

### Branch integrity

Every choice must resolve to a valid next state.

### Interaction integrity

Every player-facing control is part of the implementation contract. A control is implemented only when an actual interaction with it has been verified end-to-end:

**Rendered control → event handler → decision validation → engine action → outcome → state update → next rendered state**

A control that renders but throws a validation error, produces a silent no-op, fails to invoke its handler, or fails to render the next valid state is an implementation failure even if the underlying engine/model passes.

Structural presence tests cannot substitute for interaction tests.

------------------------------------------------------------------------

# 22. Golden Game Acceptance Test

The Golden Game passes only if a tester can answer **YES** to all of
these:

1.  Does it feel like an actual basketball game?
2.  Is the score caused by what actually happened?
3.  Does the clock matter?
4.  Does possession matter?
5.  Do my decisions affect later play?
6.  Can I fail without the game telling me I was wrong?
7.  Can I recover from failure?
8.  Can my team score without me?
9.  Can I influence the game without scoring?
10. Does the game continue naturally after every decision?
11. Can I understand what is happening without basketball coaching
    jargon?
12. Does the visual state match the basketball state?
13. Is the player consistently addressed as "you"?
14. Does pressure emerge from the game rather than narration?
15. Does the experience make me want to try something in a real game?

If any answer is NO:

**NOT READY FOR LIVE BUILD.**

------------------------------------------------------------------------

# 23. Definition of Done

Game 1 is ready for live implementation only when:

**Golden Game authoring PASS**

-   

**State model PASS**

-   

**Possession continuity PASS**

-   

**Score integrity PASS**

-   

**Player-language PASS**

-   

**Six behavioural routes PASS**

-   

**Visual/state consistency PASS**

-   

**Interaction integrity PASS**

-   

**Real-game readability & basketball realism PASS**

-   

**Development Bible gates PASS**

=

**READY TO BUILD**

------------------------------------------------------------------------

# 24. Implementation Order

Build in this order:

### Phase 1 --- State engine

Create the game state and possession resolver.

### Phase 2 --- Background possessions

Prove that a game can move, score and change possession without
requiring a player decision.

### Phase 3 --- First Charlotte spotlight

Implement P2 → P3.

### Phase 4 --- Shot/rebound chain

Implement:

**shot → miss → live ball → rebound decision → new shot → actual
result**

### Phase 5 --- Defensive possessions

Add opponent attacks, defensive decisions and stops.

### Phase 6 --- Continuous Golden Game

Connect the authored possessions into one uninterrupted game.

### Phase 7 --- Visual layer

Map state to the existing artwork.

### Phase 8 --- Testing

Run all six required routes and the full deterministic/negative test suite.

### Phase 9 --- Interaction integrity

Execute every player-facing control in the implemented build. Prove that each control reaches the intended engine action and renders the next valid state.

### Phase 10 --- Real-game readability & basketball realism

Play the connected game as basketball. Apply the remove-the-buttons test and fix material realism defects at the authoring/engine layer.

### Phase 11 --- Carryo

Only after all gates pass, update the canonical live URL. Then perform exact published-build traversal before Show-Ready certification.

------------------------------------------------------------------------

------------------------------------------------------------------------

# 26. Game 1 Build & Certification Discipline

Game 1 is developed as a **vertical slice first, then scaled**. The objective
is to prove the possession engine and one continuous Golden Game before
expanding content or visual complexity.

## 26.1 Build gate sequence

Each phase must pass before the next phase becomes the primary focus:

**State model → possession resolver → background possessions → Charlotte
spotlight → shot/rebound chain → defensive possessions → continuous Golden
Game → visual mapping → behavioural-route testing → Carryo deployment**

If an earlier gate fails, do not compensate by adding story text, buttons or
visual polish. Return to the failing layer.

## 26.2 Acceptance test for every authored decision

Before an authored decision is considered implemented, record and verify:

- starting game state;
- the three plausible choices, or the locked four shooting choices;
- outcome possibilities for each choice;
- state changes;
- possession consequence;
- next state;
- affected stats/journey/pressure variables.

No one- or two-choice decision screen is permitted. A single-action screen is
permitted only when it is a transition rather than a decision.

## 26.3 State-invariant certification

The Game 1 engine must pass these checks before live deployment:

- every score mutation is caused by a made basket or free throw;
- every possession has an explicit outcome and next possession team;
- every choice resolves to a valid next state;
- clock never increases during ordinary play;
- movement cannot directly award a basket;
- a shot choice cannot directly determine a made basket without a shot outcome;
- a miss/block produces a live-ball consequence where appropriate;
- a rebound never directly awards points;
- free throws are represented as an actual sequence;
- visual state matches underlying basketball state.

## 26.4 Golden Game certification

The Golden Game is certified only when it behaves as one continuous basketball
game for approximately 8–10 minutes. It must contain enough ordinary game
activity that Charlotte's decisions sit inside a game rather than replacing
the game.

At minimum, certification must demonstrate:

- visible 20:00 tip-off;
- background possessions that can change score and possession without a
  Charlotte decision;
- multiple meaningful Charlotte decisions;
- at least one unsuccessful choice;
- natural recovery;
- an actual miss → live ball → rebound → new decision → shot → outcome chain;
- scoring by either team that is explainable from preceding play;
- changing pressure based on actual score/clock/game conditions;
- continuity of characters and consequences;
- no player-facing use of “Charlotte”.

## 26.5 Behavioural-route certification

Run the complete engine through all six required routes:

**A — Highly involved**
**B — Cautious**
**C — Brave but unlucky**
**D — Early mistake → recovery**
**E — Low scoring / high involvement**
**F — Late close game**

The purpose is not to force identical stories. It is to prove that the same
engine remains coherent under materially different player behaviour.

## 26.6 Regression rule

After every material engine change:

1. test the changed path;
2. test adjacent branches;
3. run the relevant state-invariant checks;
4. re-check the Golden Game where the change can affect it;
5. re-check player-facing language and choice counts.

A fix is not certified if it creates a new violation elsewhere.

## 26.7 Certification status

Each Game 1 component should be tracked as:

- **NOT READY** — cannot safely be relied upon;
- **BUILDING** — implemented but still under test;
- **CERTIFIED** — passed its acceptance and regression requirements.

The full game is **NOT READY** if any critical engine component or Golden Game
gate remains uncertified.

------------------------------------------------------------------------

# 27. Additional Development Controls

## 27.1 Decision and outcome contract

Every authored decision must specify, before implementation:

**Situation → Choice → Possible outcomes → State changes → Next state**

A choice is not complete merely because it has plausible wording. Its
possible outcomes and resulting state transitions must be defined and valid.

### 27.2 State invariants

At every playable state:

- exactly one team has possession when the ball is live;
- the clock is valid for the current half and only moves forward through game
  time;
- score increases only through recorded made baskets or free throws;
- every possession ending defines its outcome and next possession team;
- a shot cannot occur without a genuine shot opportunity;
- a rebound cannot award points;
- every authored choice resolves to a valid next state.

Any invariant failure is a **NOT READY** condition.

### 27.3 Story causality

Every material event in the Golden Game must be explainable from preceding
game state, live action, player choice or an explicitly authored background
possession. Score, possession, reactions and opportunities must not appear
merely because the next scene requires them.

### 27.4 Agency and replayability

At least some meaningful choices must materially alter later opportunities,
possession, score, pressure, reactions or other game state. Repeated play with
different choices must produce meaningful variation while remaining coherent.

The engine should be tested for **agency**: whether the player's decisions
actually influence the game rather than simply selecting different text on a
fixed path.

### 27.5 Emotional pacing

The Golden Game should deliberately vary intensity. Use game conditions to
create a rhythm of calm, opportunity, uncertainty, consequence, recovery and
increasing pressure leading to a genuine climax and release. Do not turn every
meaningful moment into a high-pressure countdown.

### 27.6 State-layer separation

Keep current Game State, temporary Player State and persistent Journey State
conceptually and technically separate. A game-specific condition must not
accidentally persist into later games.

### 27.7 Engine/content separation

Where practical, keep basketball rules and state resolution separate from
player-facing copy, reactions and artwork mapping. Presentation changes should
not require changes to basketball logic unless the underlying state itself is
changing.

### 27.8 Change isolation and defect classification

Prefer one material change at a time. Classify defects as product/design,
state/engine, narrative, UX, visual or technical, then fix the underlying
layer rather than patching symptoms elsewhere.

If the same defect class occurs twice, stop and review the architecture or
process before applying another local fix.

### 27.9 Game 1 certification status

Maintain explicit status for major components:

- **NOT READY** — incomplete or unsafe to rely upon.
- **BUILDING** — implemented but not fully certified.
- **CERTIFIED** — acceptance, invariant, behavioural-route, regression and
  user-experience tests passed.

The complete Golden Game cannot be certified while any critical engine
component remains uncertified.

## 28. Shot Decision and Outcome Contract

A shooting decision has two distinct stages and they must never be merged:

1. **Player decision:** choose the type of shot to attempt.
2. **Engine resolution:** determine the physical outcome of that shot.

The player must never choose make, miss or block. The engine determines the outcome using the configured outcome resolver.

The four locked player shooting choices remain:

1. Pump fake, then layup
2. Drive for the layup
3. Take the shot
4. Side step and take the shot

After one of these is selected, the engine resolves an outcome such as make, miss or block. The score changes only if the resolver produces a valid made basket or free throw.

The same contract applies to second-chance shots after an offensive rebound.

### 28.1 Negative acceptance tests

- No player-facing choice may be “the shot goes in”, “the shot misses” or “the shot is blocked”.
- No player action may directly mutate the score.
- A selected shot must not imply a guaranteed make.
- A miss or block must leave the score unchanged and create the appropriate live-ball consequence.
- A rebound must leave the score unchanged until a subsequent scoring event is resolved.

Any failure is a **NOT READY** condition.

### 28.2 Testability

Development/test mode must support deterministic shot outcomes so make, miss and block branches can each be exercised deliberately. Live play may randomise outcomes, but certification must not depend on chance.


## 27.1 Change Log

### v2.1 — 14 September 2026

Added Interaction Integrity as an explicit engine/implementation contract and certification phase. A rendered control is not implemented until its actual event path, validation, engine action, state transition and next rendered state have been exercised. Added explicit real-game realism sequencing before Carryo deployment.

# 27. Change Log

### v2.4 — 13 September 2026

Added explicit shot decision/outcome separation, negative acceptance tests and deterministic outcome testing.

### v2.3 — 13 September 2026

Formalised the Game 1 development and certification process following the
project retrospective. Added vertical-slice sequencing, per-decision
acceptance contracts, state-invariant certification, Golden Game
certification, six-route testing, regression rules and component status.


## Change Log

**v2.2 — 14 September 2026**
- Added hidden QA Harness / deterministic state-entry requirement for efficient targeted interaction testing.
- Required the harness to use the canonical engine path and remain separate from the normal player experience.

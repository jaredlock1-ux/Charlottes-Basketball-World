# Charlotte's Basketball World --- Development Bible

**Version:** 1.7\
**Status:** LOCKED DEVELOPMENT PROCESS\
**Created:** 13 September 2026\
**Parent:** Master Game Specification v1.0

------------------------------------------------------------------------

## 1. Purpose

This document governs **how Charlotte's Basketball World is built,
changed, tested and published**.

The Master Game Specification defines what the product must be. This
Development Bible defines the process used to implement it.

The objective is to prevent implementation drift, silent rule
violations, accidental architecture regressions and "fix one thing,
break another" cycles.

**The live app is an implementation, not a source of truth.**

------------------------------------------------------------------------

## 2. Source-of-Truth Hierarchy

When documents or implementation decisions conflict, use this order:

1.  **Master Game Specification** --- highest authority for locked
    product/design decisions.
2.  **Approved game-specific specification** --- e.g. Game 1 possession
    map.
3.  **Development Bible** --- mandatory engineering and delivery
    process.
4.  **Explicitly approved implementation decisions.**
5.  **Live Carryo implementation.**
6.  Temporary experiments/prototypes.

A lower-level artefact may not silently override a higher-level rule.

If a conflict is discovered, **STOP rather than improvise**.

------------------------------------------------------------------------

## 3. Locked-Rule Enforcement

Locked rules are not suggestions. Before a live edit, they must be
treated as acceptance criteria.

### Mandatory player experience rules

-   The player is addressed as **"you"**.
-   Do not refer to the player as "Charlotte" in player-facing game
    copy.
-   Charlotte is the player and should see a clean, full-view
    representation.
-   The experience is a game/story, not a quiz, lesson or coaching
    lecture.
-   Choices must be plausible basketball decisions.
-   Every authored decision moment must present exactly three choices, unless the decision is the locked four-option shooting decision. There must never be a one- or two-choice decision screen.
-   No choice is labelled as the correct/assertive answer.
-   Assertive choices can fail.
-   Mistakes lead to consequences and recovery, not punishment.
-   Emotion is created through game conditions rather than announced.
-   Score, clock, possession and pressure must have real consequences.
-   Teammate names are not shown to the player.
-   Do not use basketball jargon Charlotte would not naturally know.
-   The game must feel like one continuous game rather than disconnected
    scenarios.

### Mandatory basketball-state rules

-   The game starts at **20:00**, 0--0, with the opening possession
    established.
-   The game has two 20-minute halves.
-   Score changes only because of an actual basket or free throw.
-   Every possession has an explicit outcome and next possession team.
-   A decision does not automatically end a possession.
-   **Movement is not a shot.**
-   **A shot choice is not a shot outcome.**
-   A miss/block must lead to an appropriate live-ball/rebound
    consequence.
-   A rebound does not automatically equal points.
-   Free throws are a genuine mini-sequence.
-   The four locked shooting choices must remain exactly:
    1.  Pump fake, then layup
    2.  Drive for the layup
    3.  Take the shot
    4.  Side step and take the shot
-   Approximately 12--18 meaningful decisions occur across a complete
    game.
-   Basketball Volume starts around 5/10 and represents involvement, not
    simply scoring.

------------------------------------------------------------------------

## 4. Required Game Architecture

The implementation must follow:

**GameState → CurrentPossession → LiveEvent → Decision (if authored) →
Choice → OutcomeResolver → StateUpdate → NextPossession**

It must **not** use:

**Scene → Choice → Message → NextScene**

Story data should be separable from rendering.

A possession is the fundamental unit of game continuity.

A branch may contain several live actions and decisions before the
possession ends.

------------------------------------------------------------------------

## 5. State Integrity

Every state-changing event must be explicit.

At minimum, track:

-   clock
-   score
-   possession team
-   ball status/location
-   Charlotte/player location
-   defender pressure
-   pressure level
-   fatigue where relevant
-   relevant statistics
-   relevant journey flags

### Score integrity

A score change must have a traceable scoring event immediately preceding
it.

Invalid:

> Rebound → +2

Valid:

> Miss → offensive rebound → shooting decision → shot → made basket → +2

### Possession integrity

A possession may end only through an authored basketball outcome such
as:

-   basket
-   missed shot with defensive rebound
-   turnover
-   foul/free-throw sequence
-   defensive stop
-   other explicitly authored outcome

Every possession ending must identify who has the ball next.

------------------------------------------------------------------------

## 6. Player-Facing Language Gate

Before publication, inspect all player-facing copy.

### Required

Use:

-   "you"
-   "your teammate"
-   "your defender"
-   "the player beside you"
-   "a teammate"

### Prohibited unless explicitly approved

-   referring to the player as "Charlotte"
-   coaching labels such as "this is the assertive choice"
-   "you should..."
-   "the correct answer..."
-   terminology Charlotte would not naturally know, including:
    -   cut
    -   help-side
    -   closeout
    -   box out
    -   similar coaching jargon

### Emotional language

Do not narrate an assumed internal state as fact.

Prefer:

> "The score is tied. There are 20 seconds left."

over:

> "You feel nervous because the score is tied."

The player should supply the feeling.

------------------------------------------------------------------------

## 7. Change-Control Protocol

Before any **material** game change:

### Step 1 --- Identify the change

State exactly what is being changed and why.

### Step 2 --- Check against locked rules

Determine whether the change conflicts with any locked rule.

### Step 3 --- Stop on conflict

If there is a conflict:

**Do not implement it.**

Raise the conflict for Jared to decide.

### Step 4 --- Lock approved design changes

If Jared approves a material design change:

1.  update the relevant specification;
2.  increment its version;
3.  record the change in its Change Log;
4.  only then implement it.

### Step 5 --- Build

Implement the approved change.

### Step 6 --- Validate

Run the required development gates below.

### Step 7 --- Publish

Only after validation passes should the live Carryo site be updated.

------------------------------------------------------------------------

## 8. Mandatory Pre-Publish Gates

Every live edit must pass all gates.

### Gate A --- Source-of-truth check

-   Have the relevant specifications been consulted?
-   Is the change consistent with all locked rules?
-   Has any conflict been identified and resolved correctly?

### Gate B --- Architecture check

-   Is this implemented as game state and possession flow?
-   Does the branch continue naturally?
-   Has any scene-based reset architecture accidentally been introduced?

### Gate C --- State check

For every affected branch:

-   Is the clock plausible?
-   Is the score correct?
-   Is possession correct?
-   Is the ball state correct?
-   Is the next team explicit?
-   Are stats updated only when earned?
-   Can any score change happen without a scoring event?

### Gate D --- Decision/outcome separation

Verify that:

-   movement decisions do not automatically become shots;
-   shot decisions do not automatically become made baskets;
-   misses/blocks do not silently end possessions;
-   rebounds produce a genuine next state;
-   fouls produce the appropriate free-throw sequence.

### Gate E --- Language check

Search player-facing copy for:

-   "Charlotte"
-   banned jargon
-   coaching language
-   "correct"
-   "assertive answer"
-   unexplained emotional claims

Any violation blocks publication.

### Gate F --- Story continuity check

Ask:

> If I play this branch, am I still inside the same basketball game?

The answer must be yes until the possession genuinely ends.

### Gate G --- Regression check

Test at least the affected branch plus any adjacent branches that could
be affected.

For Game 1, the required behavioural paths are:

1.  highly involved
2.  cautious
3.  brave but unlucky
4.  early mistake → recovery
5.  late close game
6.  low-scoring but highly involved

### Gate H --- User-facing sanity check

Play the experience as Charlotte would.

Ask:

-   Does the game feel like an actual game?
-   Does the score make sense?
-   Does the clock make sense?
-   Do my choices visibly affect what happens?
-   Does failure lead somewhere?
-   Do I feel like I am playing rather than being taught?

If not, it is not done.

### Gate H1 --- Interaction integrity

A player-facing control is not considered implemented because it renders. Every interactive control must be executed end-to-end:

**Rendered control → tap/click → handler → validation → engine action → outcome/state transition → next rendered state**

For every authored decision, certification must verify actual interaction with every visible choice, including:

- start/continue controls;
- all three normal choices;
- all four locked shooting choices;
- all three rebound choices;
- all three defensive choices;
- all defensive-shot choices;
- free-throw controls;
- restart/transition controls;
- failure and recovery controls.

Each interaction must prove that:

- the control has an active handler;
- the handler accepts the control's decision type;
- the engine receives the intended action;
- no validation error or silent no-op occurs;
- the state changes as specified;
- the next player-facing state renders;
- the resulting state is traceable in replay.

**Rendered-but-untested controls are NOT IMPLEMENTED.**

A synthetic assertion that a button exists, has text, or has a handler does not satisfy this gate.

### Gate H2 --- Real-game readability and basketball realism

After interaction integrity passes, test the game as basketball rather than as software. Apply the hard question:

> **If the buttons were removed, would the surrounding sequence still read naturally as a real U10 basketball game?**

Check rhythm, causal rebounds, defensive reactions, background possessions, scoring rhythm, natural failures/recovery, earned pressure and changing player involvement.

------------------------------------------------------------------------

## 9. Definition of Done

A feature is **not done** merely because the button works or the page
renders.

A feature is done only when:

**Technical correctness + basketball correctness + Game Bible
compliance + narrative continuity + interaction integrity + real-game
realism + required tests = PASS**

Any failed component means **NOT DONE**.

------------------------------------------------------------------------

## 10. Regression Protection

A fix must not be considered complete if it introduces a new violation
elsewhere.

For every material change:

-   preserve the existing locked rules;
-   retest the path being changed;
-   retest adjacent branches;
-   re-check player-facing terminology;
-   re-check score/clock/possession state;
-   re-check the architecture.

If the implementation becomes more complex than the specification
requires, stop and simplify before continuing.

------------------------------------------------------------------------

## 11. Carryo Development Rules

### Canonical live URL

Use the existing canonical game URL:

**https://share.carryo.io/charlottes-basketball-world**

Do not create replacement test links merely to work around
implementation problems.

### Before editing

Always:

1.  read the current live Carryo version;
2.  identify the current version number;
3.  compare the intended change against the specifications;
4.  implement the change;
5.  validate;
6.  publish to the same canonical URL.

### After editing

Do not say "fixed" unless the edit succeeded.

Do not claim a test passed unless it was actually tested or validated by
an available technical check.

Do not conceal uncertainty.

------------------------------------------------------------------------

## 12. Debugging Rules

When something fails:

1.  reproduce/identify the failure;
2.  identify the underlying cause;
3.  fix the cause, not merely the visible symptom;
4.  check whether the fix creates a specification violation;
5.  run regression checks;
6.  only then publish.

Do not repeatedly patch symptoms in the live build without stepping back
to the underlying architecture.

If the same class of defect occurs twice, treat it as a
**process/architecture problem**, not merely another isolated bug.

------------------------------------------------------------------------

## 13. "STOP" Conditions

The assistant must stop implementation rather than improvise when:

-   a locked Game Bible rule conflicts with the proposed change;
-   a required design decision is still open;
-   the specification is ambiguous in a way that materially affects the
    experience;
-   score/state cannot be reconciled;
-   possession continuity cannot be guaranteed;
-   a required asset is unavailable;
-   a change would silently alter an agreed story decision;
-   the implementation cannot satisfy a locked rule without changing the
    design.

The correct response is to surface the issue and resolve it before
building.

------------------------------------------------------------------------

## 14. Pre-Publish Checklist

Before every live material edit:

**SOURCE** - \[ \] Master Game Specification checked - \[ \] Relevant
game specification checked - \[ \] No unresolved conflict

**ARCHITECTURE** - \[ \] Possession-based flow - \[ \] No scene-reset
regression - \[ \] Story/state separated from rendering

**STATE** - \[ \] Clock plausible - \[ \] Score traceable - \[ \]
Possession correct - \[ \] Next team explicit - \[ \] Stats earned
correctly

**PLAYER EXPERIENCE** - \[ \] Player-facing player reference is "you" -
\[ \] No prohibited jargon - \[ \] No coaching lesson - \[ \] Choices
plausible - \[ \] Failure/recovery works - \[ \] Emotion is created
rather than announced

**BASKETBALL** - \[ \] Movement ≠ shot - \[ \] Shot choice ≠ shot
outcome - \[ \] Miss/block → live-ball consequence - \[ \] Rebound ≠
automatic points - \[ \] Free throws are sequences - \[ \] Score changes
only after actual scoring

**TEST** - \[ \] Affected branch tested - \[ \] Adjacent branches
checked - \[ \] Required behavioural paths considered - \[ \] Game still
feels like a game

**DEPLOY** - \[ \] Same canonical Carryo URL - \[ \] Edit succeeded - \[
\] No false claim of completion

------------------------------------------------------------------------

------------------------------------------------------------------------

## 15. Development Operating Model

The project follows a **prove-before-scale** workflow. The purpose is to
reduce rework, prevent architectural drift and keep live play-testing focused
on meaningful experience problems rather than implementation accidents.

### 15.1 Standard development loop

Every material feature or mechanic follows this sequence:

**DEFINE → SPECIFY → ACCEPTANCE TEST → MODEL → IMPLEMENT → VALIDATE →
PLAY-TEST → REGRESSION → DEPLOY**

Specifically:

1. **Define** the intended player experience and basketball behaviour.
2. **Specify** the rule in the appropriate Bible/specification before building.
3. **Write acceptance tests** describing what must be true for the feature to pass.
4. **Model** the required state transitions before adding presentation.
5. **Implement** the smallest coherent version of the mechanic.
6. **Validate** state, branching, language and architectural invariants.
7. **Play-test** the experience as Charlotte would experience it.
8. **Regression-test** affected and adjacent branches.
9. **Deploy** to the canonical Carryo URL only after the relevant gates pass.

### 15.2 Engine before content expansion

Do not expand story volume, add games or polish visuals when the underlying
mechanic has not yet been proven.

The preferred order is:

**state model → possession engine → outcome resolution → one Golden Game →
branch testing → visual layer → scale**

Do not build what the engine has not yet proved it can model correctly.

### 15.3 Decision contracts

Every authored decision is a contract containing:

- the state when the decision appears;
- exactly three plausible choices, except the locked four-choice shooting decision;
- the possible outcome(s) of each choice;
- the state changes caused by each outcome;
- the next valid state/possession;
- any relevant stats, pressure, fatigue or journey flags.

A decision is not complete merely because its buttons work.

### 15.4 Decisions versus transitions

A genuine decision presents choices that can materially influence play. A
transition simply moves the game forward.

Transitions may use a single continue/watch action. Decision screens may not
have one or two choices. This distinction must be preserved so that the
three-choice rule does not create artificial or meaningless decisions.

### 15.5 State invariants

Before deployment, the implementation must preserve these invariants:

- score changes only through actual scoring events;
- clock only moves forward through game time;
- every possession has a valid outcome and next possession team;
- movement never silently becomes a shot;
- a shot choice never silently becomes a made basket;
- misses/blocks create an appropriate live-ball consequence;
- rebounds do not directly award points;
- every choice resolves to a valid state;
- player-facing copy addresses the player as “you”;
- visual state does not contradict basketball state.

### 15.6 Golden Game before scale

Game 1 must first prove one complete, continuous 8–10 minute Golden Game.
The Golden Game is the architecture certification point, not merely a sample
story route.

It must demonstrate ordinary game rhythm, player decisions, background
possession changes, scoring without Charlotte, mistakes, recovery, rebounds,
actual shot outcomes, changing score/clock and increasing pressure.

Only after the Golden Game passes should the architecture be expanded across
the broader game.

### 15.7 Required behavioural-route testing

A successful happy path is insufficient. Game 1 must be tested through:

1. highly involved;
2. cautious;
3. brave but unlucky;
4. early mistake → recovery;
5. low-scoring but highly involved;
6. late close-game pressure.

### 15.8 Change classification and control

Before changing a locked design rule, identify the conflict explicitly.
Discuss it with Jared, agree the change, update the relevant source-of-truth
document and increment its version before changing the live implementation.

Implementation improvements that do not alter locked product/design rules may
be made within the approved architecture, but must still pass the normal
validation and regression process.

### 15.9 Feature status

Every major development component should carry one of three statuses:

- **NOT READY** — design, architecture or acceptance criteria are incomplete.
- **BUILDING** — defined and implemented, but not all required tests have passed.
- **CERTIFIED** — acceptance, behavioural, regression and user-experience checks have passed.

A feature cannot be treated as complete because it renders or because a button
responds.

### 15.10 Carryo is deployment, not the design environment

Carryo is the canonical live delivery environment. It is not the place to
work around unresolved architecture.

If a live test exposes a structural problem, step back to the relevant
specification/engine, fix the underlying cause, validate it, then deploy the
coherent change. Do not accumulate symptom patches in the live build.

### 15.11 Defect escalation

When the same class of defect occurs twice, treat it as a process or
architecture failure and revisit the underlying model before applying another
local patch.

The priority order for fixing defects is:

**state/architecture → basketball correctness → narrative continuity →
player experience → visual polish**

### 15.12 Role clarity

Jared acts as **Product Owner / Creative Director**: he owns the intended
experience, creative direction and approval of material design changes.

The assistant acts as **Product/Game Design & Technical Lead**: responsible for maintaining product and game-design coherence, architecture governance, specifications, acceptance criteria, release consolidation, regression scope and the Work Handoff Gate. The assistant does not use Work as the product-discovery room and refuses to hand off unresolved or conflicting requirements.

**Work acts as Engineering Execution**: responsible for implementing the authoritative release package, running the required engineering/QA suite, fixing implementation defects within approved scope, producing evidence, and deploying only after the applicable gates pass. Work must return unresolved product/design conflicts rather than inventing new rules.

------------------------------------------------------------------------

## 15.13 Causality rule

Every meaningful game event must have a basketball and narrative cause. The
implementation must not use a new scene, score change, possession change or
character reaction merely because the next authored screen requires it.

Ask:

> Why did this happen?

The answer must be traceable to the preceding game state, live action, player
decision or a deliberately authored background possession.

The game may and should produce events that do not involve the player, because
the basketball game exists independently of the player.

### 15.14 Replayability and agency

Replayability is a core quality requirement, not an optional extra. Different
meaningful choices should be capable of producing materially different later
states, opportunities, reactions or consequences.

The engine must not give Charlotte multiple choices that are cosmetically
different but converge immediately to the same state unless that convergence
is intentionally authored and justified.

The development team should assess **player agency**: whether Charlotte's
choices genuinely influence what happens next, rather than merely providing
buttons for a predetermined story.

### 15.15 State separation

Keep three conceptual layers separate:

1. **Game State** — score, clock, possession, location, pressure, fatigue and
   other current-game conditions.
2. **Player State** — current involvement, Basketball Volume and other
   temporary player-level attributes.
3. **Journey State** — persistent history, achievements, memorable moments and
   approved cross-game consequences.

A temporary game condition must not silently become persistent journey state.
A journey-state change must be explicit and authored.

### 15.16 Emotional pacing

A complete game should have an intentional emotional rhythm rather than a
constant stream of decisions. The target pattern is:

**calm → opportunity → uncertainty → consequence → recovery → calm → larger
opportunity → pressure → climax → release**

This is a pacing guide, not a rigid script. Pressure should continue to emerge
from score, clock, defender pressure, uncertainty and fatigue rather than from
expository narration.

### 15.17 Content/engine separation

The game engine and authored content must remain separable wherever practical.

The engine owns state, rules, resolution and transitions. Authored content
owns player-facing wording, reactions, artwork mapping and story flavour.

Changing copy or artwork should not require rewriting basketball-state logic.
Changing engine rules should not require rewriting unrelated presentation.

### 15.18 Change isolation

Do not bundle unrelated material changes into one live deployment. A change
should have one clear purpose and a bounded test surface wherever practical.

Preferred sequence:

**change → validate → regression → certify → next change**

This makes failures attributable and reduces regression risk.

### 15.19 Defect taxonomy

Classify material defects before fixing them:

- **A — Product/design:** violates a locked product rule.
- **B — State/engine:** basketball state or transition is invalid.
- **C — Narrative:** event lacks believable causal continuity.
- **D — UX:** player cannot understand or meaningfully act on the state.
- **E — Visual:** artwork does not accurately represent the state.
- **F — Technical:** interaction or implementation fails independently of the
  game design.

Fix the defect at the layer where its cause lives.

### 15.20 No-polish-before-proof

Significant visual polish, animation, sound or decorative UI work must not
be used to mask an uncertified engine or Golden Game. Visual work can proceed
when it supports a proven vertical slice, but unresolved state, basketball,
narrative or agency defects take priority.

### 15.21 Development pipeline

Unless explicitly agreed otherwise, use this sequence:

**Product rule → Specification → Acceptance test → State model → Decision
contracts → Functional prototype → Golden Game → Branch/edge-case testing →
Player experience testing → Visual layer → Carryo deployment → Regression →
Certification**

Do not advance a component to the next gate while a critical earlier gate is
known to fail.

### 15.22 Change Log discipline

Every version increment must record:

- what changed;
- why it changed;
- whether the change is product/design, architecture, implementation or QA;
- which tests/gates are affected;
- whether the affected component remains NOT READY, is BUILDING or becomes
  CERTIFIED.


## 15.23 Change-risk levels

Every requested change must be classified before implementation:

- **Level 1 — Content:** wording, labels, descriptions and non-behavioural copy.
- **Level 2 — Presentation:** layout, artwork, animation and non-behavioural visual treatment.
- **Level 3 — Game logic:** choices, outcomes, score, clock, possession, stats, pressure, branching or player agency.
- **Level 4 — Architecture:** state model, possession engine, decision engine, persistence, game structure or shared infrastructure.

Levels 3 and 4 require the full development gate. Level 4 also requires an explicit architecture review before implementation. A lower-risk classification must not be used to bypass a higher-risk gate.

## 15.24 Immutable engine contracts

The following relationships are foundational and may not be silently changed:

**Player decision → Engine outcome → Game consequence**

The player controls the decision. The engine determines uncertain/random/physical outcomes. The resulting game state determines the consequence.

Examples:

- A shot choice selects the shot type; it does not select make/miss/block.
- A rebound creates a possession opportunity; it does not award points.
- Movement changes position/opportunity; it does not directly score.
- A score mutation must be caused by a valid made basket or free throw.

Any proposed change to these contracts is an architecture/design change and must be specified and tested before implementation.

## 15.25 Negative testing

Validation must test not only that intended behaviour works, but that prohibited behaviour cannot occur.

At minimum, Game 1 testing must prove:

- the player cannot choose a shot outcome;
- a rebound cannot directly add points;
- movement cannot directly add points;
- score cannot change without a scoring event;
- a possession cannot terminate without a defined next possession;
- a normal decision cannot render one or two choices;
- a shot cannot occur without a shot opportunity;
- a game-specific state cannot accidentally persist as permanent journey state.

A failed negative test is a certification failure.

## 15.26 Inspectable state and replay

The engine must maintain an inspectable representation of the current game state sufficient to explain any visible event. At minimum this includes clock, score, possession, current state, ball/shot state, selected player action where relevant, unresolved outcome where relevant, and applicable stats/journey flags.

For certification, the engine should be able to produce a chronological event/replay trace showing:

**game state → live event → decision → choice → outcome → state update → next possession**

This trace is the preferred diagnostic tool for score, possession, causality and continuity defects.

## 15.27 Deterministic test mode

Where outcomes are probabilistic or random, development testing must support deterministic outcome sequences. This allows every important branch to be deliberately exercised, including make, miss, block, turnover, rebound, stop and opponent scoring.

Live play may use randomised outcomes; certification may not depend on chance.

## 15.28 Defect-first response to player observations

When Jared identifies a gameplay problem, treat the observation as evidence of a possible underlying design, state or engine defect before treating it as a presentation problem.

The response sequence is:

**Observe → classify → trace causality → check specification → define acceptance test → fix the correct layer → regression-test**

Do not automatically patch the visible screen.

## 15.29 Mandatory pre-live change gate

Before any Level 3 or Level 4 change reaches Carryo, the assistant must explicitly verify:

- relevant Bible/spec checked;
- any new rule documented and versioned;
- acceptance tests defined;
- state transitions modelled;
- decision/outcome contract validated;
- score/clock/possession invariants validated;
- negative tests considered;
- affected branch tested;
- adjacent branches regression-tested;
- Golden Game impact assessed;
- player-facing language checked;
- certification status recorded.

If any required gate is incomplete, **do not edit Carryo**.

Carryo is the deployment environment, not the place where unresolved game logic is discovered or designed.

## 15.30 Certification audit

The assistant must not describe a feature or game as “done”, “passed”, “proven” or “certified” unless the corresponding evidence exists.

For Game 1, certification must be reported as a concise audit covering:

**Architecture → State invariants → Decision contract → Outcome resolution → Scoring causality → Possession continuity → Choice counts → Failure/recovery → Shot/rebound chain → Six behavioural routes → Player-facing language → User-facing experience → Live regression**

Each item is **PASS**, **FAIL** or **NOT TESTED**. Any critical FAIL or NOT TESTED item means the relevant component remains **NOT READY**.

## 15.31 Golden Route versus Golden Game

The Golden Game is the canonical continuous experience and game architecture. A Golden Route is one specific path through it.

The Golden Route must not become the hidden definition of correct play. Alternative behavioural routes must remain valid and coherent against the same engine.

## 15.32 No silent scope or architecture expansion

If implementation reveals that the requested change requires a new mechanic, new persistent state, materially different branching, or a change to an agreed story rule, stop and surface it. Do not silently expand scope or architecture to make the current implementation work.

The relevant specification must be updated and versioned before the expanded implementation proceeds.

## 16. Change Log

### v1.6 — 14 September 2026
Added a mandatory hidden QA Harness/Test Mode and testing-efficiency rule so targeted interaction branches can be entered directly and tested without replaying the game. The harness must use the same canonical engine/handlers and supplements, rather than replaces, natural play-testing and live certification.

### v1.5 — 14 September 2026

Added mandatory Interaction Integrity and Real-Game Readability gates after a live-build defect where shooting controls rendered correctly but failed at the click/handler/validation boundary. A rendered control is no longer evidence of implementation. Exact end-to-end interaction testing is now a hard certification requirement.

### v1.4 — 13 September 2026

Strengthened the development process following the shot-outcome implementation failure. Added change-risk levels, immutable engine contracts, negative testing, inspectable state/replay requirements, explicit pre-live gates, certification audit, and a rule that player observations of gameplay problems must be treated as potential system defects rather than automatically as UI fixes.

### v1.3 — 13 September 2026

Formalised the development operating model following the project retrospective.
Added a formal causality rule, replayability and player-agency requirements,
separation of game/player/journey state, emotional pacing guidance,
content/engine separation, change isolation, defect taxonomy, no-polish-before-proof,
a staged development pipeline and stronger change-log discipline.


## 15.32 ChatGPT → Work Development Gate

Charlotte’s Basketball World uses a two-layer development workflow. **ChatGPT/project chat is the product, game-design and release-preparation environment. Work is the engineering execution environment.**

### Product/design room — ChatGPT

Before implementation, ChatGPT must:

- collect and classify play-test findings, defects and proposed changes;
- distinguish product/design, basketball realism, state/engine, narrative, UX, visual and technical issues;
- resolve the intended behaviour with Jared before implementation where a material product decision is required;
- update the relevant authoritative specification and acceptance criteria before implementation;
- protect locked and certified behaviour from accidental change;
- identify dependencies, affected branches, regression surfaces and required QA states;
- consolidate related approved changes into a coherent, bounded release package rather than reflexively sending individual observations to Work.

ChatGPT is responsible for proactively deciding whether a finding should **WAIT / BATCH**, requires an **IMMEDIATE WORK HOTFIX**, or has contributed to a package that is **WORK HANDOFF READY**. Jared should not need to repeatedly ask whether it is time to use Work.

### Work Handoff Gate

A package may be declared **WORK HANDOFF READY** only when all applicable conditions are satisfied:

1. intended player experience and basketball behaviour are unambiguous;
2. all material design decisions required for the package are resolved;
3. authoritative specifications are current and internally consistent;
4. no unresolved conflict exists with a locked/certified rule;
5. implementation scope and affected systems are identified;
6. acceptance criteria and required negative tests exist;
7. regression surfaces and Golden Game implications are identified;
8. required deterministic QA-harness states are identified where applicable;
9. the package is coherent and sufficiently consolidated to justify an engineering cycle;
10. any known dependency or blocker that would cause Work to rediscover product intent has been resolved or explicitly documented.

When the gate passes, ChatGPT must explicitly state **WORK HANDOFF READY** and produce **one authoritative implementation package**. That package is the implementation contract for the Work run.

### Engineering/execution room — Work

Work receives the approved package and is responsible for:

- implementing it in the canonical codebase/approved implementation environment;
- preserving all locked rules and certified behaviour outside the approved change surface;
- running deterministic/state/acceptance/negative tests;
- running the Golden Game and required regression suite;
- exercising required player-facing controls and targeted QA-harness states;
- browser-testing the actual playable implementation;
- fixing implementation defects discovered during execution without independently redesigning approved product behaviour;
- stopping and returning a specification/design conflict to ChatGPT rather than improvising;
- deploying only after the applicable release gates pass;
- reporting implementation, test, regression and deployment evidence.

Work must not be used as the default product-discovery conversation or be repeatedly invoked for isolated observations that can be consolidated first.

### Post-release loop

After deployment, experiential testing returns to **Jared/Charlotte → ChatGPT**. New findings are classified and accumulated toward the next coherent release package. The standard operating loop is:

**DISCOVER → DECIDE → SPECIFY → CONSOLIDATE → WORK HANDOFF GATE → WORK IMPLEMENTS/TESTS → RELEASE GATE → JARED/CHARLOTTE PLAY → DISCOVER**

The purpose of this gate is not merely token efficiency. It reduces context loss, conflicting micro-edits, implementation drift and repeated regression cycles while ensuring expensive engineering execution is spent on approved, testable work that advances the North Star.

### Hotfix exception

An **IMMEDIATE WORK HOTFIX** may bypass normal batching only when a severe implementation defect blocks meaningful testing, corrupts state/data, makes the canonical build unusable, or creates a material certification failure whose intended fix is already unambiguous. The hotfix still requires a defined acceptance test and regression surface. Product/design uncertainty is never a hotfix justification.


## 15.33 Authoritative Work Release Package Template

Every **WORK HANDOFF READY** declaration must produce one self-contained release package using this minimum structure:

1. **Release identity and objective** — version/name and the player/product outcome this release is intended to achieve.
2. **Authoritative sources** — exact current specifications, bibles, maps, contracts and locked decisions governing the work.
3. **Approved change scope** — every behaviour, content, UX, visual, logic or architecture change Work is authorised to implement.
4. **Explicitly unchanged / protected behaviour** — certified and locked behaviour outside the change surface that must not regress.
5. **Implementation requirements** — state, engine, content, UI, interaction, persistence or deployment requirements necessary to implement the approved scope.
6. **Acceptance criteria** — observable PASS/FAIL requirements for every material change.
7. **Regression surface** — affected and adjacent branches, invariants, Golden Game/route requirements and negative tests.
8. **QA and browser-interaction requirements** — required QA Harness direct-entry states plus actual player-facing control traversal.
9. **Deployment requirements** — target environment/build, release blockers and conditions under which deployment is prohibited.
10. **Definition of done** — the exact evidence required before Work may report the package complete.

The package must be sufficiently self-contained that Work does not need to reconstruct product intent from a long conversational history. If a required decision is missing, the package is not WORK HANDOFF READY.

## 15.34 Work Evidence Return Contract

A Work run is not complete because it says the change was implemented. Work must return a standard evidence package containing:

- release/build identity;
- implementation summary and files/components materially changed;
- acceptance tests executed and PASS/FAIL results;
- deterministic/state/negative test results where applicable;
- Golden Game and regression results;
- QA Harness targeted-state coverage;
- actual browser/player-facing interaction results;
- known failures, warnings, unresolved issues or specification conflicts;
- deployment target/status and exact build tested;
- engineering certification status: **ENGINEERING CERTIFIED**, **NOT CERTIFIED**, or **BLOCKED**.

Claims such as “implemented”, “tested”, “looks right” or “QA passed” without the required evidence do not satisfy this contract. ChatGPT reviews the returned evidence against the release package before recommending experiential play-testing.

## 15.35 Engineering Certification vs North Star Certification

Engineering correctness and product success are separate gates.

**Engineering Certification** proves that the implementation behaves according to the approved specification and required tests. It is owned by the engineering/QA process and must be evidenced before the build is presented as technically ready.

**North Star Review** proves whether the experience is actually succeeding for Charlotte. It occurs after engineering certification through genuine player experience and is owned by Jared/Charlotte with ChatGPT facilitating diagnosis and consolidation. At minimum assess:

- Did Charlotte understand what was happening and why?
- Did her choices feel meaningful rather than cosmetic?
- Did the sequence feel like a believable real basketball game?
- Was she emotionally engaged by the game state rather than instructional narration?
- Did anything confuse, bore or frustrate her for the wrong reason?
- Did she want to continue playing / play another possession or game?

North Star findings are not sent individually to Work by default. They return to ChatGPT, are classified and resolved, and accumulate toward the next coherent release package. A technically certified build may still fail the North Star Review.

The complete release loop is therefore:

**DISCOVER → DECIDE → SPECIFY → CONSOLIDATE → WORK HANDOFF READY → WORK IMPLEMENTS/TESTS → ENGINEERING CERTIFIED → JARED/CHARLOTTE NORTH STAR REVIEW → NEXT BATCH**

## 15.36 Process Sufficiency Rule

The governance system is now considered sufficient for the current Game 1 development stage. Do not add new process documents, gates or governance rules merely for completeness. Add or change governance only when a material failure, recurring inefficiency, architecture change or new development stage demonstrates a real need. The default priority is now to build, test and improve the game within the established system.

### v1.7 Governance addendum — 14 September 2026

Formalised the Authoritative Work Release Package template, Work Evidence Return Contract, separation of Engineering Certification from Charlotte/North Star Review, updated role clarity for ChatGPT and Work, and added a Process Sufficiency Rule to prevent governance overhead from displacing game development.

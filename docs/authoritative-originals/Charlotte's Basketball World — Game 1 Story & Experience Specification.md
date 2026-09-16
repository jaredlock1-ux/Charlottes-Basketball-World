# Charlotte’s Basketball World — Game 1 Story & Experience Specification

**Version:** 1.2  
**Status:** WORKING GAME-SPECIFICATION  
**Parent:** Master Game Specification v1.0  
**Purpose:** Define what the player experiences in Game 1, separately from the engine that makes it work.

---

## 1. Experience Objective

Game 1 — **ASK FOR IT** is a continuous basketball story in which the player experiences what it is like to become more involved in a live game without being told that this is the lesson.

Central phrase:
> **Don’t wait for the game. Go find it.**

The player is always addressed as **“you.”** The experience must feel like playing a real game, not answering scenarios.

## 2. Experience Architecture

The experience is built around the engine sequence:

**Game State → Possession → Live Action → Decision (when authored) → Outcome → State Update → Next Possession**

Story content must never be authored as a disconnected:

**Scenario → Choice → Message → Next Scenario**

A possession may contain several live actions and decisions before it ends.

## 3. Continuous Game Requirements

Game 1 must:
- begin at tip-off at 20:00, 0–0;
- establish that a real game is underway before the first authored decision;
- contain ordinary possessions where nothing is asked of the player;
- allow the player’s team to score without the player scoring;
- allow the opponent to score;
- carry score, clock, possession, pressure and consequences forward;
- include mistakes and natural recovery;
- build toward a meaningful late-game moment;
- end as an earned basketball outcome rather than a lesson.

The Golden Game target is approximately 8–10 minutes of player-facing experience.

## 4. Player Decisions

Every authored decision presents exactly **three plausible choices**, except the locked four-option shooting decision.

Choices must:
- be credible basketball actions;
- not reveal a “correct” or “assertive” answer;
- allow brave choices to fail;
- create materially different possible outcomes;
- preserve the player’s agency.

The four shooting choices are locked:
1. Pump fake, then layup
2. Drive for the layup
3. Take the shot
4. Side step and take the shot

The player selects the **type of action**. The engine determines the uncertain physical outcome. The player never selects make/miss/block.

## 5. Emotional Experience

Emotion is created through conditions rather than explained to the player.

Use:
- score differential;
- time remaining;
- open/closed space;
- defender pressure;
- fatigue;
- uncertainty;
- previous success or failure;
- increasing game consequence.

Avoid statements that assert an internal state as fact. Occasional reflection questions have no right answer.

The intended loop is:

**FEEL → DECIDE → EXPERIENCE → RECOVER → DECIDE AGAIN**

## 6. Social Continuity

Teammates and opponents should notice and react to what the player does. Their reactions should create continuity across possessions.

Player-facing copy should use generic references such as:
- “a teammate”;
- “the player beside you”;
- “your defender”;
- “a teammate looks at you.”

Teammate names are internal authoring data, not player-facing labels.

## 7. Basketball Volume

Starting value: **5/10**.

Basketball Volume represents active involvement, not “good behaviour” or scoring.

It can rise through actions such as:
- asking for the ball;
- moving into useful space;
- going after a loose ball;
- active defending;
- recovering after a mistake;
- making a play;
- staying involved.

It should not become a hidden reward/punishment meter.

## 8. Visual Experience

Use the agreed full-view Charlotte treatment:
- orange/green Magic #16 uniform;
- brown ponytail;
- pink shoes;
- expressive face;
- warm illustrated basketball environment;
- clean full-body action artwork at key moments.

Current action artwork maps naturally to moments including calling for the ball, attacking the gap, running into space, rebounding, defending, recovering, late pressure and celebrating.

The visual state must never contradict the basketball state.

## 9. Required Story Rhythm

The game should repeatedly follow:

**GAME HAPPENS → YOU NOTICE SOMETHING → YOU CAN INFLUENCE IT → YOU CHOOSE/ACT → CONSEQUENCE → GAME CONTINUES**

The “10-second rule” is a pacing guide: roughly every 5–10 seconds the player should receive meaningful movement, information, opportunity or consequence involving the game. This does **not** mean a decision every 10 seconds.

Countdowns are reserved for genuinely high-pressure moments.

## 10. Recovery

A mistake must change the next moment without becoming punishment.

Examples:
- turnover → defensive recovery opportunity;
- missed shot → live-ball/rebound sequence;
- missed chance to get involved → next opportunity becomes more consequential;
- brave attempt that fails → another basketball play follows naturally.

## 11. Replayability and Persistence

Different choices must produce genuinely different future states and experiences.

Game-specific state must not accidentally become permanent journey state.

Relevant stats/history can persist into the wider journey where specified by the Master Game Specification.

## 12. Experience Acceptance Questions

A successful Game 1 should make the player able to say, in effect:
- “I was actually playing a game.”
- “What I chose changed what happened.”
- “Sometimes it worked and sometimes it didn’t.”
- “I could recover and keep playing.”
- “The score and time mattered.”
- “I wasn’t being told what I was supposed to learn.”

The ultimate test remains whether the experience makes the player want to try different decisions in a real game.

## 13. Scope Boundary

This document owns **player-facing story and experience**.

The Game 1 Engine & Possession Specification owns:
- state structure;
- possession resolution;
- outcome probabilities;
- state transitions;
- scoring causality;
- technical invariants.

The Acceptance & Certification Specification owns proof that both layers work together.

## 14. Interaction and Real-Game Validation

The player-facing experience must be validated at two separate levels.

### Interaction integrity

A choice is not implemented merely because it appears on screen. The actual player interaction must work:

**SEE → TAP/C​​LICK → GAME RESPONDS → CONSEQUENCE → NEXT MOMENT**

Every visible player-facing control must be exercised in the implemented build. A rejected click, silent no-op, wrong validator, dead control or missing next state is a player-experience defect and a release blocker.

### Real-game readability

After interaction integrity passes, evaluate the sequence as basketball:

> **If the buttons were removed, would the surrounding sequence still read naturally as a real U10 basketball game?**

The experience must contain natural game flow around decisions; choices must not become a substitute for the game itself.

## 15. Change Control

Any material change to this specification must follow the Development Bible:

**PROPOSE → DISCUSS → LOCK → UPDATE SPECIFICATION → ACCEPTANCE TEST → BUILD → VALIDATE → INTERACTION TEST → PLAY-TEST → REAL-GAME REALISM AUDIT → REGRESSION → DEPLOY → LIVE EXPERIENCE CERTIFICATION**

## 15. QA Harness Boundary

Testing efficiency is separate from player experience. The implemented game may include a hidden QA/Test Mode for authorised certification, allowing testers to enter defined game states directly rather than replaying the game solely to reach a branch.

The harness must not be visible or accessible in the normal player experience and must use the same player-facing controls and canonical engine path. It exists to accelerate interaction coverage, not to alter the story or create a second version of the game.

Natural play-testing remains mandatory for rhythm, continuity, emotional pacing and real-game readability.

### Change Log

**v1.3 — 14 September 2026**
- Added hidden QA/Test Mode boundary: direct state entry is permitted for certification efficiency, while natural play-testing remains mandatory for experience validation.

**v1.2 — 14 September 2026**
- Added mandatory interaction-integrity validation and exact published-build certification.
- Added explicit real-game readability sequencing before regression/deployment.

**v1.0 — 13 September 2026**
- Consolidated Game 1 story, social continuity, Basketball Volume, visual direction and experience tests into the dedicated Story & Experience specification.
- Separated player experience ownership from engine/state ownership.

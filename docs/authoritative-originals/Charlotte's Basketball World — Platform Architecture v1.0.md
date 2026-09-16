# Charlotte's Basketball World — Platform Architecture
**Version:** 1.0  
**Status:** LOCKED ARCHITECTURAL FOUNDATION  
**Date:** 14 September 2026

## 1. Purpose
Define the platform boundary that allows Game 1 to evolve into the broader Basketball World product without replacing the proven possession architecture.

## 2. Architectural principle
The product is a basketball world, not a collection of scenarios.

The runtime contract is:

**Player/Journey Context → Game Setup → GameState → Possession → LiveEvent → Decision (if authored) → Choice → OutcomeResolver → StateUpdate → NextPossession → Journey Update**

The game engine owns basketball truth. Authored content owns player-facing expression. Journey systems own persistent history.

## 3. Layers

### A. Player Profile
Persistent player identity and approved configuration.

Owns:
- player identifier
- display preferences
- approved age/level information
- journey reference
- enabled games/content

Does not own temporary game state.

### B. Journey
Persistent cross-game history.

Owns:
- completed games
- approved achievements/memorable moments
- aggregate progress
- explicitly authored persistent consequences

Does not silently absorb temporary game state.

### C. Game Configuration
Defines a particular game experience.

Owns:
- game identifier/version
- ruleset
- authored possession graph
- player-facing content references
- difficulty/age configuration where explicitly supported

### D. Game Engine
The authoritative runtime for basketball.

Owns:
- clock
- score
- possession
- ball state
- player position/state
- pressure
- fatigue
- outcomes
- transitions
- scoring causality
- event trace

### E. Content
Owns:
- live-event wording
- decision wording
- reaction wording
- artwork mapping
- authored possession definitions
- approved narrative continuity

Content cannot mutate basketball state directly.

### F. Learning
A future layer, not a hidden scoring system.

Owns:
- explicit learning objectives
- observable behaviours
- post-game reflection
- approved progress signals

It must never turn Basketball Volume into a disguised reward/punishment meter.

### G. Presentation
Renders the current state.

It may:
- display score/clock
- render artwork
- show live events
- render legal decisions
- render outcomes

It may not invent basketball events or mutate state independently.

## 4. Ownership rule
Every important variable has one authoritative owner.

| Variable | Owner |
|---|---|
| Score | Game Engine |
| Clock | Game Engine |
| Possession | Game Engine |
| Ball state | Game Engine |
| Shot outcome | Game Engine |
| Rebound outcome | Game Engine |
| Pressure | Game Engine |
| Fatigue | Game Engine |
| Basketball Volume | Player/Game state layer |
| Decision wording | Content |
| Artwork mapping | Content |
| Persistent journey history | Journey |
| UI rendering | Presentation |

## 5. Game 1 strategy
Game 1 remains the first vertical slice.

We do not rewrite it as a separate product. Instead:
1. preserve the existing possession/state architecture;
2. define interfaces around it;
3. progressively extract authored content from implementation code;
4. make Charlotte an instance of the Player model;
5. keep Carryo as deployment;
6. certify each extracted layer before moving upward.

## 6. What we are deliberately NOT building yet
- production backend
- authentication
- App Store infrastructure
- multiplayer
- cloud persistence
- complex AI simulation
- broad learning analytics
- multiple games at scale

These require proven product value and are not prerequisites for Game 1 certification.

## 7. Non-negotiable boundaries
- No scene-reset architecture.
- No player-selected physical outcomes.
- No score mutation outside scoring events.
- No rebound awarding points.
- No hidden journey mutation from temporary game state.
- No content change that requires rewriting engine rules.
- No engine change that requires rewriting unrelated content.
- Carryo is deployment, not unresolved development.

## 8. Change control
Architectural changes follow:

**PROPOSE → IMPACT CHECK → UPDATE SOURCE OF TRUTH → ACCEPTANCE TEST → IMPLEMENT → VALIDATE → REGRESSION → CERTIFY → DEPLOY**

If a lower layer fails, dependent layers are blocked.

## 9. Definition of architectural success
The architecture succeeds when Game 1 can be expanded with new possessions, games, players and learning experiences without changing the fundamental basketball engine.

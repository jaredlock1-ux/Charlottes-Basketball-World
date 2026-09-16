# Charlotte’s Basketball World — Master Game Specification

**STATUS: MASTER SOURCE OF TRUTH**  
**Version:** 1.0  
**Created:** 12 September 2026  
**Rule:** This document does not change automatically. A change is made only after we explicitly review, agree and lock it.

## 1. PRODUCT NORTH STAR

**Charlotte’s Basketball World** is an interactive basketball adventure for Charlotte.

The experience should help her *experience* assertive basketball decisions rather than being told she needs to be more assertive.

### Central phrase
> **Don’t wait for the game. Go find it.**

### Ultimate success test
Charlotte closes the app wanting to try different decisions in a real basketball game.

The app is not a quiz, lesson, coaching lecture or collection of disconnected scenarios. It is a game/story in which Charlotte experiences consequences.

## 2. CORE DESIGN PRINCIPLES — LOCKED

1. **True possession-to-possession story.** Each meaningful decision changes what happens next. Choices cannot simply lead to isolated messages before the story resets.
2. **Game state matters.** Score, clock, possession, momentum and pressure must have real consequences.
3. **Charlotte is the player.** Charlotte creates/plays her own player and should see a clean, full-view representation during the game.
4. **Plausible choices.** Choices should generally be believable basketball decisions. Avoid cartoonishly obvious “good” and “bad” options.
5. **Assertiveness is not guaranteed success.** Going for the ball, attacking space, calling for it or applying pressure can fail. The experience is about acting despite uncertainty, then recovering.
6. **Failure → recovery → next play.** Mistakes matter, but never become punishment.
7. **Emotional loop:** FEEL → DECIDE → EXPERIENCE → RECOVER → DECIDE AGAIN.
8. **Emotion is created, not announced.** Create feelings through score, time, uncertainty, defender pressure, fatigue and consequences rather than telling Charlotte what she feels. Occasional reflection such as “How did that moment feel?” has no right answer.
9. **Increasing pressure.** Layer game consequence, uncertainty, limited time, emotional carry-over and increasing stakes. Use countdowns selectively.
10. **People react.** Teammates and opponents notice and react to Charlotte’s decisions.
11. **Persistent journey.** The game remembers what Charlotte has done. Stats, achievements, prior decisions and moments should affect future scenarios where useful — not merely appear on a final stats screen.

## 3. BASKETBALL SYSTEM — LOCKED

### Game structure
- Two 20-minute halves.
- Tip-off begins at 20:00.
- Half-time is a real break in the story.
- Approximately 12–18 meaningful decision moments overall.
- Shooting scenarios occur in both halves.

### Locked shooting choices
1. Pump fake, then layup
2. Drive for the layup
3. Take the shot
4. Side step and take the shot

### Shooting outcomes
Possible outcomes:
- You score.
- You miss.
- The shot is blocked.
- Rebound opportunity.
- For appropriate layup choices: fouled — 2 shots.

Free throws should be a genuine mini-sequence.

### Stats
Track at minimum:
- Baskets
- Rebounds
- Defensive stops
- Brave plays
- Good passes
- Times asked for the ball
- Times went after the ball
- Loose balls
- Basketball Volume

### Basketball Volume
Starts around 5/10 and can rise toward 10/10. It represents how actively Charlotte is involved in the game, not simply how many points she scores.

## 4. PLAYER / VISUAL DESIGN — LOCKED

Established visual direction:
- Cartoon/illustrated young basketball player
- Brown ponytail
- Orange/green Magic uniform
- #16
- Pink shoes
- Expressive face
- Athletic, energetic presentation

**Visual rule:** Prefer a clean, full-view character in the gameplay frame. Do not display the full character sheet inside gameplay scenes.

Approved visual assets include the character sheet, clean full-view scene artwork, and individual calling-for-ball, attack-gap, rebound, defending, recovery, late-pressure and celebration artwork.

New artwork should match the established visual language.

## 5. STORY ARCHITECTURE — LOCKED

A complete game should feel like one continuous 8–10 minute interactive basketball story when played at normal pace.

It should include:
- Recurring teammates/opponents
- Believable flow of possessions
- Consequences carrying into subsequent possessions
- Real score/clock changes
- Emotional carry-over
- Recovery after mistakes
- Meaningful late-game climax
- Satisfying end state

Avoid: “scenario → answer → result → unrelated scenario.”

Instead: “This happened → therefore the next possession looks different → Charlotte decides again.”

## 6. FIVE-GAME JOURNEY — LOCKED

### Game 1 — ASK FOR IT
Finding Charlotte’s voice / asking for the ball.

### Game 2 — GO!
Attacking when there is an opening.

### Game 3 — GET IT!
Rebounds and loose balls; going after opportunities rather than watching them happen.

### Game 4 — DON’T DISAPPEAR
Staying involved when things are not going Charlotte’s way, including after misses, turnovers or periods without the ball.

### Game 5 — THE BIG MOMENT
Genuine late-game pressure, culminating in a combination of the earlier experiences without becoming a lecture or test.

## 7. WHAT THE GAME SHOULD NEVER DO — LOCKED

Do not:
- Tell Charlotte she has an “assertiveness problem.”
- Turn the experience into a coaching lesson.
- Make the correct answer obvious.
- Guarantee brave/assertive choices succeed.
- Treat mistakes as a failure of character.
- Reset the story after every decision.
- Ignore score/clock/game state.
- Make the games feel like identical reskins.
- Overuse countdown timers.
- Use generic text where a meaningful basketball consequence could happen.
- Show fragmented pieces of Charlotte when a clean full-view character is available.
- Change agreed story/design decisions silently while implementing.

## 8. TESTING STANDARD

Before considering a game complete, test:
- **Story:** continuous, branching, consequential, earned ending.
- **Basketball:** plausible score/clock, coherent possessions, sensible shooting/rebound/defensive outcomes.
- **Emotion:** pressure emerges naturally; recovery exists; brave decisions are exciting but not guaranteed.
- **Visuals:** Charlotte is clear and consistent; artwork supports action.
- **Persistence:** stats/journey history are retained and have a reason to matter later.

## 9. CHANGE CONTROL — LOCKED

### The Game Bible is authoritative.

Before any material game change:
1. Flag any conflict with a locked decision.
2. Discuss it with Jared.
3. Agree the change.
4. Update this document.
5. Increment the version.
6. Only then change the live game.

**No silent changes.**

Every approved change is recorded in the Change Log.

## 10. CHANGE LOG

### Version 1.0 — 12 September 2026
Initial master specification created from the agreed game/story direction.

Captured decisions:
- True possession-to-possession branching
- Score/time/game state matters
- Persistent Charlotte player/journey
- “Don’t wait for the game. Go find it.”
- Five-game journey
- Failure/recovery loop
- Emotion through conditions rather than narration
- 12–18 meaningful decisions per complete game
- Two 20-minute halves
- Four locked shooting options
- Persistent stats and Basketball Volume
- Full-view Charlotte visual treatment
- Continuous story rather than disconnected scenarios

## 11. OPEN DESIGN WORK

These are intentionally **not locked yet**:
- Exact branching structure for each game
- Recurring character names/personalities
- Detailed possession trees
- Exact scoring/probability logic
- Basketball Volume formula
- Achievement/Trophy Shelf design
- Player creation
- Exact persistence between games
- Final visual/UI polish
- Audio/sound design
- Exact game length and pacing after playtesting

## 12. WORKING PROCESS

**PROPOSE → DISCUSS → LOCK → UPDATE BIBLE → BUILD → TEST → REVISE**

The Bible is the source of truth; the live app is the implementation.

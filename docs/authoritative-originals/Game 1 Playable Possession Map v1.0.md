# Charlotte’s Basketball World — Game 1
## Playable Possession Map — ASK FOR IT

**Version:** 1.0  
**Status:** Detailed working implementation specification  
**Date:** 13 September 2026  
**Parent:** Master Game Specification v1.0

---

## Purpose

This is the playable version of Game 1. It converts the previous conceptual possession tree into a sequence that can actually be followed branch-by-branch before any code is written.

The game contains many ordinary/background possessions. Only selected possessions become **Charlotte spotlight moments**. This keeps the game feeling like a game rather than a chain of questions.

The intended experience remains:

**The game is happening → Charlotte notices → she can influence it → she acts → something changes → the game continues.**

No choice is guaranteed to succeed. No choice is labelled as the “assertive” answer.

---

# 1. ENGINE CONTRACT

Every possession resolves to exactly one of these outcomes:

1. Magic basket — +2 or +3
2. Falcons basket — +2 or +3
3. Magic retains possession after a made shot/free throw sequence
4. Falcons retains possession after a made shot/free throw sequence
5. Defensive stop → other team gets possession
6. Turnover → other team gets possession
7. Offensive rebound → same team retains possession
8. Defensive rebound → other team gets possession
9. Foul → free throws or inbound, depending on situation

Every resolved possession updates:

- clock
- score
- possession team
- ball location
- Charlotte's location
- defender pressure
- pressure
- fatigue
- relevant stats
- relevant journey flags

No possession can end without defining who has the ball next.

---

# 2. BACKGROUND POSSESSIONS

Background possessions exist to make the game breathe.

They are short and authored, not random noise.

A background possession can be:

### B1 — Magic score
Magic move the ball, create an opening and score.

### B2 — Magic miss / Falcons rebound
Magic shoot, miss and Falcons secure the rebound.

### B3 — Falcons score
Falcons attack and score.

### B4 — Falcons miss / Magic rebound
Falcons shoot, miss and Magic secure the rebound.

### B5 — Turnover
A pass is intercepted or the ball is lost.

### B6 — Defensive stop
The defending team forces a difficult shot or turnover.

Each background possession takes approximately 8–25 seconds.

The score remains close by design, but is driven by actual possessions.

---

# 3. FIRST HALF — DETAILED PLAYABLE FLOW

## POSSESSION 1 — TIP

**20:00 | 0–0 | Magic**

Magic win the tip.

Live:
- teammate gets ball
- Charlotte runs
- Falcons run back
- Charlotte sees a large open area

No decision.

**Clock:** 19:38  
**Next:** Magic possession 2.

---

## POSSESSION 2 — CHARLOTTE SPOTLIGHT #1

**19:38 | 0–0 | Magic**

Teammate has ball near the front of the attack.

Charlotte sees open space.

### Decision A
**Call for the ball**

### Decision B
**Keep moving into the open space**

### Decision C
**Stay where you are**

### A — Call

Charlotte calls.

Three authored outcomes:

**A1 — Pass arrives**
- Charlotte receives
- defender closes
- Magic possession continues
- → Possession 3A

**A2 — Teammate sees her but keeps the ball**
- defender follows Charlotte
- another teammate becomes open
- → Magic shot
- → Possession 3B

**A3 — Defender gets to the pass**
- turnover
- Falcons ball
- → Possession 4

### B — Move

Charlotte runs into space.

**B1 — She becomes open**
- teammate sees her
- pass arrives
- → Possession 3A

**B2 — Space closes**
- ball moves elsewhere
- → Possession 3B

### C — Stay

The opportunity disappears.

- teammate passes elsewhere
- → Possession 3B

**State update:**
A increments `askedForBall`; B increments `wentIntoSpace`; both can raise teammate trust/opponent attention subtly.

---

# 4. POSSESSION 3A — CHARLOTTE HAS BALL

**~19:15**

Charlotte catches.

Defender is approaching.

### Decision #2

**A — Move towards the basket**

**B — Pass to the open teammate**

**C — Keep the ball and look again**

### A — Move towards basket

Three outcomes:

**A1 — Gets past defender**
- Charlotte reaches scoring area
- → Possession 5, shot opportunity

**A2 — Defender blocks path**
- Charlotte stops and passes out
- Magic retains possession
- → Possession 5B

**A3 — Contact**
- foul
- two free throws
- → Possession 5FT

### B — Pass

**B1 — Clean pass**
- teammate receives
- → Possession 5B

**B2 — Defender intercepts**
- turnover
- → Possession 4

### C — Look again

Defender gets closer.

**C1 — Another teammate opens**
- Charlotte passes
- → Possession 5B

**C2 — Ball is trapped**
- forced pass / turnover
- → Possession 4

---

# 5. POSSESSION 3B — MAGIC CONTINUES WITHOUT CHARLOTTE

Teammate has ball.

Charlotte remains involved visually.

She sees:
- defender following her
- another teammate moving
- ball moving

No decision.

Possible:

**3B1 — Magic score**
→ +2 Magic

**3B2 — Magic miss**
→ rebound possession

**3B3 — Turnover**
→ Falcons possession

The next possession is always generated from the actual result.

---

# 6. POSSESSION 4 — FALCONS RESPONSE

**~18:40**

Falcons have ball.

Charlotte is defending.

The Falcons player Charlotte is guarding moves toward the basket.

### Decision #3

**A — Stay close to your player**

**B — Move towards the ball**

**C — Get ready to run if the ball changes direction**

### A
Possible defensive stop or Falcons score.

### B
Possible pressure/forced pass or Charlotte is late.

### C
Charlotte reacts quickly to the next movement.

All three lead to a real Falcons possession result.

If Falcons score:
**Magic 0 — Falcons 2**

If stop:
**Magic ball.**

---

# 7. POSSESSION 5 — FIRST NATURAL RESET

Magic bring ball forward.

No Charlotte decision immediately.

Live sequence:
- ball crosses half
- teammate moves
- Charlotte runs
- defender checks her
- another teammate opens

If Magic score → +2.

If miss → rebound.

If turnover → Falcons.

This is deliberately not a question.

---

# 8. POSSESSION 6 — SPOTLIGHT #2

**~16:45**

Charlotte notices another opening.

Defender is closer now.

### Decision #4

**A — Call for the ball**

**B — Run into the open space**

**C — Keep moving**

Possible consequences:

### A
Teammate passes / doesn't pass / defender denies.

### B
Charlotte creates a passing lane / space closes.

### C
Ball continues elsewhere.

If Charlotte receives → Possession 7.

Otherwise → Possession 8.

---

# 9. POSSESSION 7 — BALL IN HAND #2

Charlotte receives.

### Decision #5

**A — Move towards the basket**

**B — Pass to the open teammate**

**C — Keep the ball and look**

Possible:
- attack → shot
- pass → teammate shot
- defender forces turnover
- foul

Any shot uses the locked shooting choices.

---

# 10. POSSESSION 8 — FALCONS

Falcons attack.

If Charlotte has recently been active, defender pressure is slightly higher.

### Decision #6 if the moment naturally arises

**A — Stay with your player**

**B — Move towards the ball**

**C — Get ready for the next pass**

Possible:
- stop
- Falcons score
- turnover

---

# 11. POSSESSION 9 — FIRST GENUINE SHOOTING MOMENT

**~13:30**

Magic possession.

Charlotte receives in a genuine scoring position.

## Decision #7 — locked shooting choices

1. **Pump fake, then layup**
2. **Drive for the layup**
3. **Take the shot**
4. **Side step and take the shot**

Each has state-aware outcomes.

### Possible outcomes

**Score**
- +2
- Magic possession ends
- Falcons inbound

**Miss**
- rebound battle

**Block**
- loose ball

**Foul**
- two free throws

No choice is automatically rewarded.

---

# 12. POSSESSION 10 — REBOUND

If shot misses/blocks:

Ball bounces.

Charlotte sees it.

### Decision #8

**A — Go after the ball**

**B — Get back to defend**

**C — Stay ready for the next bounce**

If Charlotte wins:
- +1 rebound
- +1 loose ball
- Magic possession

If teammate wins:
- Magic possession

If Falcons win:
- Falcons possession

---

# 13. POSSESSION 11 — SECOND CHANCE

If Magic retain possession:

Charlotte may see a new opening.

### Decision #9

**A — Call for the ball**

**B — Move into open space**

**C — Stay ready**

Possible:
- Charlotte receives
- teammate scores
- turnover
- Magic miss

This is where a previous success can visibly matter:
if Charlotte has repeatedly made herself available, teammates may begin looking for her more naturally.

---

# 14. POSSESSION 12 — FALCONS COUNTER

Falcons receive after a Magic score/miss/turnover.

They attack quickly.

Charlotte has to recover.

### Decision #10

**A — Sprint back into the play**

**B — Stay with your player**

**C — Watch the ball**

Possible:
- defensive stop
- Falcons score
- turnover

If Charlotte previously made a mistake, this is a natural recovery opportunity.

---

# 15. POSSESSION 13 — MID-HALF FLOW

**~10:00**

Background possession.

The score is now determined by previous outcomes.

Target state:
**within 1–6 points.**

Magic may score, miss or turn over.

No forced decision.

This prevents every possession from feeling like a test.

---

# 16. POSSESSION 14 — CHARLOTTE CREATES SPACE

**~9:00**

Magic have the ball.

Charlotte sees a teammate looking toward her.

### Decision #11

**A — Call for the ball**

**B — Run into the open space**

**C — Keep moving**

Important possible branch:

Charlotte calls.

Defender follows.

Teammate does NOT pass.

Instead, the teammate drives through the space Charlotte created.

**Basket.**

Charlotte gets a good-pass/team-contribution style recognition, but not an explicit lesson.

This is one of the key experiences of Game 1:

**Charlotte can change the play without touching the ball.**

---

# 17. POSSESSION 15 — MISTAKE

**~7:30**

State determines whether Charlotte or a teammate makes the mistake.

Preferred Charlotte branch:

Charlotte receives a difficult pass.

She tries to control it.

Ball goes out.

**Turnover.**

No “wrong choice” message.

Immediately:

Falcons ball.

---

# 18. POSSESSION 16 — RECOVERY

Falcons attack.

Charlotte is slightly out of position.

### Decision #12

**A — Get back into the play**

**B — Find your player**

**C — Wait for the next chance**

A/B can produce a stop.

If Charlotte recovers successfully:
- `recoveredAfterMistake += 1`
- defensive stop may be recorded

This is not framed as redemption.

It's simply the next basketball play.

---

# 19. POSSESSION 17 — PRE-HALF PRESSURE

**~5:00**

Score is close.

Magic ball.

Charlotte has an opening.

### Decision #13

**A — Call for the ball**

**B — Run into open space**

**C — Stay ready**

Result:
- receive
- teammate gets shot
- turnover

---

# 20. POSSESSION 18 — SHOOTING SEQUENCE

If Charlotte receives in scoring range:

### Decision #14

1. Pump fake, then layup
2. Drive for the layup
3. Take the shot
4. Side step and take the shot

Resolve:
- score
- miss
- block
- foul

The result directly affects the closing minutes of the half.

---

# 21. POSSESSION 19 — FALCONS FINAL PUSH

**~2:30**

Falcons have ball.

Score remains close.

Charlotte defends.

If a meaningful decision naturally appears:

### Decision #15

**A — Stay close to your player**

**B — Move towards the ball**

**C — Get ready for the next pass**

Falcons score / miss / turnover.

---

# 22. POSSESSION 20 — FINAL FIRST-HALF ATTACK

**~1:00**

Magic ball.

Charlotte is part of the final attack.

### Decision #16 if needed

**A — Call for the ball**

**B — Run into open space**

**C — Let the teammate continue**

If Charlotte receives:
shooting choices.

If teammate receives:
teammate shot.

If turnover:
Falcons final attempt.

Clock reaches 0:00.

---

# 23. HALF-TIME

Show:

**Magic X — Falcons Y**

Then Charlotte's actual stats.

No lesson.

No analysis of her decisions.

Simple transition:

**SECOND HALF**

---

# 24. SECOND-HALF STRUCTURE

The second half does not restart the story.

It remembers:

- score
- Charlotte's stats
- whether she has been involved
- whether teammates have started looking for her
- whether defenders have noticed her
- mistakes
- successful recoveries
- Basketball Volume
- pressure/fatigue

---

# 25. POSSESSION 21 — SECOND-HALF OPENING

Live action.

No decision.

Charlotte immediately sees that the other team is playing slightly differently.

→ background possession.

---

# 26. POSSESSION 22 — GAME REMEMBERS

Magic ball.

### Decision #17

**A — Call for the ball**

**B — Run into open space**

**C — Keep moving**

The same choices can now have different consequences because the game state is different.

---

# 27. POSSESSION 23 — DEFENDER ADAPTS

If Charlotte has been highly involved:

Her defender is closer.

If she has been quieter:

More space may be available.

This is never announced.

Possible:
- Charlotte receives under pressure
- teammate receives because defender follows Charlotte
- turnover
- shot

---

# 28. POSSESSION 24 — SECOND-HALF SHOOT

**~16:00**

Charlotte gets a real scoring opportunity.

### Decision #18

1. Pump fake, then layup
2. Drive for the layup
3. Take the shot
4. Side step and take the shot

Outcome:
- score
- miss
- block
- foul
- rebound

---

# 29. POSSESSIONS 25–27 — GAME TIGHTENS

**~13:00–7:00**

These are primarily live/background possessions.

The score should naturally move into a close range.

Examples:

**Magic 15 — Falcons 16**

then

**Magic 17 — Falcons 18**

or

**Magic 19 — Falcons 18**

depending on earlier results.

Charlotte gets meaningful information every few seconds.

If fewer than 18 decisions have occurred, one additional Charlotte spotlight may appear.

Otherwise these possessions remain live action.

---

# 30. POSSESSION 28 — LATE-GAME OPPORTUNITY

**~5:00**

Score is within two possessions.

Charlotte is tired.

Defender is close.

A teammate has the ball.

If the game needs another meaningful decision:

**Decision #19 only if necessary**

A — Call for the ball  
B — Run into open space  
C — Keep moving

Otherwise, live action continues without a choice.

---

# 31. POSSESSION 29 — THE BIG ASK

**~3:00**

This is only shown if the story needs a final Charlotte decision.

The defender is close.

Charlotte has a genuine opportunity.

### Decision #20 only if needed

**A — Call for the ball even though the defender is close**

**B — Run into the open space**

**C — Stay ready**

Possible:
- receive
- create space for teammate
- defender intercepts
- teammate keeps ball

No guaranteed success.

---

# 32. FINAL TWO MINUTES — SCORE-DEPENDENT ENGINE

At 2:00 the engine stops following a fixed script.

It evaluates:

```text
score difference
possession
Charlotte involvement
fatigue
pressure
```

### Magic leading

Falcons attack.

Charlotte defends.

### Falcons leading

Magic attack.

Charlotte can become involved.

### Tied

Next meaningful basket changes the game.

The scoreboard, not narration, creates pressure.

---

# 33. FINAL POSSESSION

**~0:40–0:05**

The actual score determines what Magic need.

### If Magic need a basket

Charlotte can:
- call
- move into space
- receive
- pass
- shoot

If she receives a genuine scoring opportunity:

Use the four locked shooting choices.

### If Magic are protecting a lead

Charlotte's moment is defensive.

### If tied

Either team can win.

The final result is never:

**“Pick the brave answer and win.”**

---

# 34. FINAL WHISTLE

**0:00**

Show:

**FINAL SCORE**

Then:

- baskets
- rebounds
- defensive stops
- good passes
- brave plays
- asked for ball
- went after ball
- loose balls
- Basketball Volume

The game should feel like something Charlotte **played**, not something she was tested on.

---

# 35. LOGICAL PLAY-TEST RESULTS

## Path A — Charlotte highly involved

Expected:
- calls repeatedly
- moves into space
- receives several times
- makes at least one attacking decision
- may score
- opponent begins guarding her more closely
- teammates sometimes use the space she creates

**Pass:** her increased involvement changes the game state.

## Path B — Charlotte cautious

Expected:
- fewer touches
- teammates still score sometimes
- some opportunities disappear
- no punishment
- late-game opportunity still exists

**Pass:** game remains enjoyable and does not tell her she played incorrectly.

## Path C — Brave but unlucky

Expected:
- calls but doesn't receive
- attacks and is blocked
- goes for rebound and loses it
- later creates another opportunity

**Pass:** bravery does not equal guaranteed success.

## Path D — Early mistake

Expected:
- turnover
- Falcons possession
- Falcons may score
- next Charlotte defensive opportunity
- recovery can produce a stop

**Pass:** mistake has a real consequence but does not derail the story.

## Path E — Low scoring, high involvement

Expected:
- Charlotte calls
- creates space
- makes passes
- rebounds
- defends
- perhaps scores 0–2 baskets

**Pass:** Charlotte can have a meaningful game without needing points.

## Path F — Late close game

Expected:
- scoreboard is genuinely close
- time matters
- fatigue matters
- defender pressure rises
- final possessions depend on actual score

**Pass:** pressure comes from basketball, not narration.

---

# 36. FINAL IMPLEMENTATION GATE

Do not code until the engine can answer these questions for every authored branch:

1. What does Charlotte see?
2. What choices does she have?
3. What happens for each choice?
4. How much game time passes?
5. Does the score change?
6. Who has the ball next?
7. Where is Charlotte?
8. What does the defender do?
9. What state variable changes?
10. What is the next meaningful opportunity?

If any branch cannot answer all ten, that branch is not ready.

---

## Status

**This is now the detailed playable map, not the earlier conceptual tree.**

The next implementation step is to turn this map into **structured game data + a stateful possession engine**, while keeping the visual shell separate.

The existing Carryo website should remain untouched until that engine exists and passes these logical tests.

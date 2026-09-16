# Charlotte’s Basketball World — Game 1
## Complete Possession Tree — ASK FOR IT

**Version:** 1.0 | **Status:** Ready for implementation | **Date:** 13 September 2026

This document is the detailed story source of truth beneath the Master Game Specification v1.0. Game 1 is one continuous basketball game. The fundamental unit is a possession, not a scene.

## 1. Locked architecture

**Game action → Charlotte notices → she can influence it → choice → basketball consequence → next possession.**

30 authored possession slots span two 20-minute halves. A play-through targets 12–18 meaningful decisions; later decision points can be bypassed when earlier play already created enough meaningful moments.

Global state:
- clock, Magic score, Falcons score, possession team
- ball location, Charlotte location, defender pressure
- Basketball Volume, pressure, fatigue
- last action/result, teammate trust, opponent attention, recovery state
- baskets, rebounds, defensive stops, brave plays, good passes, asked for ball, went after ball, loose balls

Points only come from made baskets/free throws. Defensive stops never subtract points. Turnovers, rebounds, fouls and misses genuinely change possession.

## 2. Possession tree

### P01 — Tip off
**20:00, 0–0, Magic ball.**
Magic win tip. A teammate brings the ball forward; Charlotte runs into the court and sees teammates spreading out. No decision. Clock ~19:36 → P02.

### P02 — First opening
**~19:36, Magic ball.**
Charlotte sees open space.
**Decision 1:** A Call for the ball / B Keep moving into open space / C Stay where you are.
A: record askedForBall, raise teammate trust and opponent attention; teammate may pass, keep it, or have pass intercepted → P03A/P03B/P04.
B: record movement; may become open or lose space → P03A/P03B.
C: ball moves elsewhere → P03B.
No option is labelled correct.

### P03A — Charlotte receives
**~19:10.**
Defender approaches.
**Decision 2:** A Move towards the basket / B Pass to the open teammate / C Keep the ball and look again.
A → attack → P03C. B → successful pass or interception → P03D/P04. C → defender closes → P03D.
P03C can produce clean attack, blocked path, pass out or foul → P05/P06/P04.
P03D: teammate continues; Magic can score, miss/rebound or turn it over → P04A/P04B/P04.

### P04 — Falcons take over
**~18:20–17:30.**
Falcons attack.
**Decision 3:** A Stay close to your player / B Move towards the ball / C Get ready to run if the ball changes direction.
Any can produce a defensive stop or Falcons basket. If Falcons score → P05 with updated score. If they miss → P04B.

### P04B — Falcons miss
Charlotte sees the rebound bounce.
**Decision 4:** A Go after the ball / B Get back to defend / C Stay and see who gets it.
A can win or lose rebound; B/C affect who gets it.
Charlotte rebound: increment rebound/loose ball → P05R. Teammate rebound → P05. Falcons rebound → P05F.

### P05 — Magic attack
**~16:30.**
Magic advance. Charlotte is already part of the game. If she previously called, teammate is slightly more likely to look for her; if opponent attention is high, defender watches her more closely. No immediate decision → P06.

### P06 — Second ask
**~15:45.**
Defender is closer.
**Decision 5:** A Call for the ball anyway / B Run into another open space / C Stay ready.
A may receive, be denied, or have defender close. B may create or lose space. C may still be found or missed → P07 if Charlotte receives; otherwise P08.

### P07 — Second ball in hand
**~15:00.**
Defender closes.
**Decision 6:** A Move towards basket / B Pass to teammate / C Keep ball and look.
A can create layup, block, foul or pass out. B can create good pass, interception or teammate shot. C can create another opening, tighter defence or turnover → P09/P08.

### P08 — Falcons response
Falcons attack quickly.
**Decision 7 if needed:** A Stay with your player / B Sprint towards ball / C Get ready for next pass.
Possible defensive stop, turnover forced or Falcons basket → P09.

### P09 — First big shot
**~13:30.**
Charlotte has a genuine scoring opportunity.
**Decision 8 — locked shooting choices:**
A Pump fake, then layup
B Drive for the layup
C Take the shot
D Side step and take the shot
Outcome: score → Magic +2 → P10; miss/block → P10R; appropriate foul → P10FT.

### P10FT — Free throws
Two genuine free throws. Each can make or miss. Score updates after each. Final rebound determines P10R/P11.

### P10R — Rebound
Ball bounces away.
**Decision 9:** A Go after the ball / B Get back to defend / C Stay ready for the next bounce.
Charlotte, teammate or Falcons can win it → P11/P12.

### P11 — Second chance
Magic retain possession. A teammate has the ball.
**Decision 10:** A Call for it / B Move into open space / C Stay where you are.
If Charlotte receives → P11B. Otherwise teammate shot, turnover or continuation → P12.

### P11B — Second Charlotte attack
Charlotte receives; defender knows her.
**Decision 11 — locked shooting choices if a scoring opportunity exists:**
A Pump fake, then layup
B Drive for the layup
C Take the shot
D Side step and take the shot
Outcome: score/miss/block/foul/rebound → P12.

### P12 — Falcons run
**~11:30.**
Falcons attack after Magic event.
**Decision 12:** A Sprint back into the play / B Stay with your player / C Watch the ball.
A/B can contribute to stop; C can leave her late → Falcons basket or stop → P13.

### P13 — Game becomes close
**~9:30.**
Score is within roughly 1–5 points. Magic attack.
**Decision 13:** A Call for the ball / B Run into open space / C Keep moving.
Pass may come or not; teammate may shoot; turnover possible → P14.

### P14 — Missed moment
The previous choice determines the event: Charlotte may have been open but unseen, called without receiving, moved while ball went elsewhere, or received and made a mistake. No lesson text. Possession changes naturally → P15/P15R.

### P15 — Recovery
**~7:30.**
Charlotte is slightly out of position after the previous event.
**Decision 14:** A Get back into the play / B Find your player / C Wait for the next chance.
A/B can produce a defensive stop; C can still lead to later opportunity. If recovery follows a mistake, record it → P16.

### P16 — Pre-half pressure
**~5:30.**
Score close; game feels faster.
**Decision 15:** A Call for the ball / B Move into open space / C Stay ready.
If Charlotte receives → P17. Otherwise teammate possession continues → P17.

### P17 — First-half closing attack
**~2:30.**
Magic have a chance before half-time.
**Decision 16:** A Call for the ball / B Run into open space / C Let teammate continue.
Result directly determines final first-half sequence: Charlotte shot, teammate shot, turnover or Falcons final attack → P18.

### P18 — Half-time
**~0:45 to 0:00.**
Final first-half possession resolves: Magic score, Falcons score, miss or turnover. Clock reaches 0:00.
Show score and first-half stats. No coaching. Real half-time break.

## SECOND HALF

The score, stats, Basketball Volume, teammate trust, opponent attention and relevant emotional state carry over.

### P19 — Second-half opening
**20:00.**
Possession depends on first-half ending. Establish the new half with live action; no immediate decision → P20.

### P20 — The game remembers
**~19:30.**
Teammate behaviour subtly reflects first half. If Charlotte often called, she may be looked for; if she moved into space, opportunities can appear there; if she stayed quiet, she may need to create one.
**Decision 17:** A Call for the ball / B Run into open space / C Keep moving → P21.

### P21 — Defender adapts
Opponent has noticed Charlotte if she has been highly involved. Defender may be tighter. Charlotte can receive, create space for teammate, or see possession break down. If decision is needed, it must be natural. → P22.

### P22 — Second-half shot
**~16:00.**
Charlotte has a genuine scoring opportunity.
**Decision 18 — locked shooting choices:** A Pump fake, then layup / B Drive for layup / C Take shot / D Side step and take shot.
Outcome: score/miss/block/foul/rebound → P23.

### P23 — Falcons answer
Falcons respond to the actual previous possession. If Magic scored, they try to answer; if Charlotte missed/was blocked, transition may occur. Possible Falcons score, miss or defensive stop → P24.

### P24 — Mid-second-half pressure
**~12:00.**
Score within one or two possessions. Charlotte sees an opening.
If fewer than 18 meaningful decisions have occurred, optional **Decision 19:** A Call / B Move into open space / C Stay ready.
If already at 18, this is live action only. → P25.

### P25 — Mistake or breakthrough
**~9:00.**
State determines whether Charlotte, teammate or Falcons create the next major event. Charlotte can succeed, make a mistake, or become involved without touching the ball. A mistake changes the next possession and creates recovery; success causes opponent adaptation → P26.

### P26 — Late-game involvement
**~6:00.**
Charlotte is tired; defender pressure is higher.
If a decision is warranted and the game has not reached its target range:
A Call / B Run into open space / C Keep moving.
Otherwise live action. → P27.

### P27 — The big ask
**~4:00.**
Defender is close. Only trigger another explicit decision if needed to stay within the 12–18 target:
A Call for the ball even though defender is close / B Run into space / C Stay ready.
She may receive or not. The game does not guarantee a reward → P28.

### P28 — Final two-minute state
**~2:00.**
Branch on actual score:
- Magic lead: Falcons have the ball; Charlotte defends.
- Falcons lead: Magic attack.
- Tied: next basket matters.
No explanatory lecture; scoreboard creates urgency.
→ P29.

### P29 — Final possession
**~0:40–0:10.**
Branch on score and possession.
If Magic need a basket, Charlotte may receive, create space, call, pass or shoot. If she gets a scoring opportunity, use the four locked shooting choices. If Magic protect a lead, Charlotte's meaningful moment is defensive. If tied, either side can win.
→ P30.

### P30 — Final whistle
**0:00.**
Magic or Falcons win; outcome is earned by the actual game state.
Show final score and Charlotte's stats: baskets, rebounds, defensive stops, good passes, brave plays, times asked for ball, times went after ball, loose balls, Basketball Volume.
Closing tone: “You were in the game.” / “That game had everything.” / “Next time, you know where to look.”
Never “You learned to be assertive.”

## 3. Branching rules

- Calling and receiving creates a ball-in-hand branch.
- Calling without receiving is still a meaningful action and changes social/opponent state subtly.
- Staying quiet is never punished; the next opportunity simply differs.
- Attacking can succeed or fail.
- A mistake changes possession where appropriate and creates a recovery opportunity.
- Charlotte's involvement can help a teammate even when she never touches the ball.
- Teammates/opponents have internal identities for continuity, but Charlotte never sees teammate names.
- No basketball jargon such as cut, help-side, closeout or box out.

## 4. Pressure curve

20:00–15:00: low pressure.
15:00–8:00: moderate pressure and adaptation.
8:00–2:00: close score, fatigue, greater consequence.
2:00–0:00: genuine late-game pressure. Countdown only where the situation warrants it.

## 5. 10-Second Rule

Between decisions, show short meaningful live events: teammates moving the ball, Charlotte running, defender movement, shots, rebounds, opponent attacks, Charlotte recovering, teammates looking toward her, space opening/closing. Charlotte should never sit through a long static paragraph waiting for another unrelated question.

## 6. Implementation architecture

The code must execute:

**GameState → CurrentPossession → LiveEvent → Decision (if authored) → Choice → OutcomeResolver → StateUpdate → NextPossession**

It must NOT implement:

**Scene → Choice → Message → NextScene**

Story data must be separable from rendering.

## 7. Validation paths

Test at least:
1. highly involved Charlotte
2. cautious Charlotte
3. brave but unlucky Charlotte
4. early mistake then recovery
5. late close game
6. low-scoring but highly involved Charlotte

For every path: plausible score/clock; coherent possession; meaningful consequences; natural recovery; no unrelated scenario reset; pressure from game conditions; 12–18 meaningful decisions; continuous game feel.

## 8. Change log

**v1.0 — 13 September 2026:** Complete Game 1 possession tree created. This replaces the previous scene-based story architecture as the implementation specification. It is subordinate to the Master Game Specification and is the source of truth for Game 1.

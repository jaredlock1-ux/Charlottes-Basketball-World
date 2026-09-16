# Game 1 Implementation-Ready Visual and Transition Spec v1.0

**Date:** 16 September 2026  
**Status:** PRODUCT/DESIGN AUTHORITY APPROVED FOR SPECIFICATION; NOT IMPLEMENTED, TESTED OR CERTIFIED.  
**Authority:** Additive companion to `docs/approved-amendments/2026-09-16-game-1-visual-direction-and-coverage.md` and `docs/design/Game-1-Visual-Coverage-Matrix-v1.0.md`. Protected originals and certified mechanics remain unchanged.

## 1. Product intent

Game 1 should feel like Charlotte is playing inside her own basketball world: her competition, club, optional real teammates, recognisable opponents, realistic U10 court spacing, and meaningful decisions. Personalisation must never block Play.

## 2. Profile, competition and roster contract

### Competition
- `competition` is optional. Supported first configured competition: `EDJBA`.
- If competition is unset, Play remains available and the game uses safe fictional/default competition presentation.
- If `EDJBA` is selected, the profile may select a member club. Charlotte's configured club is `Hawthorn Magic`.
- Competition/club data is configuration, not hard-coded narrative copy. Store a version/date and source provenance so club lists/rules can be refreshed without rewriting engine logic.

### Charlotte's squad
- Squad capacity: Charlotte + up to 8 teammates = maximum 9.
- Teammate entry is optional and lightweight. First name is sufficient; jersey number is optional.
- Missing squad positions may be filled with fictional first names/numbers at runtime.
- Custom teammate data always wins over generated fill-ins. Generated players must never overwrite saved custom teammates.
- Exactly 5 Magic players are represented on court in normal live play. Charlotte is one of the five while she is the active player in Game 1; four teammates are selected from the squad.
- Remaining squad members are bench players. Background substitutions may rotate teammates but are not Charlotte decisions in Game 1.
- Narrative, court markers and roster UI must use the same active-five state. Never narrate a pass/rebound/score by a benched player.
- Artwork must not bake teammate names into pixels.

### Opposition
- With EDJBA selected, opponent team identity is selected from the current configured EDJBA member-club list, excluding Charlotte's own club.
- Use real club identity only. Opposition child names/numbers are fictional/generated unless separately and explicitly user-supplied; never imply invented children are actual registered players.
- Five opposition players are active at once; bench substitutions may occur in the background.
- Club identity, primary/alternate uniform colours and clash rules come from versioned configuration sourced from EDJBA. Do not redraw or claim official logos without an approved canonical asset/licence path.

### EDJBA club configuration snapshot — 16 Sep 2026
Balwyn Blazers; Banyule Hawks; Blackburn Vikings; Bulleen Boomers; Collingwood All Stars; Darebin Giants; Doncaster Panthers; Doreen Cougars; Eltham Wildcats; Fairfield Shooters; Greenhills Beavers; Hawthorn Magic; Ivanhoe Knights; Koonung Comets; Mill Park Titans; Mitcham Thunder; Park Orchards Steelers; Pascoe Vale Panthers; Warrandyte Redbacks; Whitehorse Mustangs; Yarra Eagles.

Note: EDJBA's current About page describes 20 member clubs while its current club/where-to-play pages expose 21 names including Yarra Eagles; implementation must treat the versioned EDJBA list as externally refreshable and must not silently infer membership counts from copy. Product behaviour requires a real configured EDJBA opponent, not a fixed count.

## 3. EDJBA U10 rules/court presentation contract

For `competition=EDJBA` and U10/U11 ruleset:
- ball size 5;
- free-throw line advanced 1.0 m;
- three-point shots count;
- inner three-point line is used;
- five seconds in the key;
- zone defence is not allowed;
- game presentation retains two 20-minute halves unless a separately approved Game 1 contract overrides timing.

Court geometry basis:
- full court 28.0 m x 15.0 m, measured inside boundary lines;
- centre at `(14.0, 7.5)` in metres;
- baskets are centred laterally and 1.575 m inside each endline under the FIBA/Basketball Victoria geometry basis;
- centre circle radius 1.80 m;
- outer/FIBA three-point radius 6.75 m may exist as venue marking but is not the EDJBA U10 scoring boundary;
- EDJBA U10 uses the inner line. Basketball Victoria documents a Victorian junior inner arc radius of 6.25 m. Render that inner line as the Game 1 U10 three-point scoring boundary;
- standard free-throw line geometry is rendered with the EDJBA U10 shooting position advanced 1.0 m toward the basket. Do not visually imply the standard line is the U10 release point.

Coordinate convention below: Magic attack left-to-right. `x=0` left endline, `x=28` right endline; `y=0` top sideline, `y=15` bottom sideline. Mirror x-coordinates for opposite attacking direction. These are presentation targets, not tracked engine facts. Each target may jitter within a constrained U10-believable radius, but never enough to change the basketball meaning or cross a line that changes shot value.

## 4. Positioning grammar — 23 templates

Roles: `C` Charlotte; `M1` Magic ball carrier/primary; `M2-M4` other Magic; `O1` primary on-ball defender/attacker; `O2-O5` opposition. Coordinates are metre targets `(x,y)` and may be mirrored.

1. `TIP_ALIGNMENT`: C(11.8,11.5), M1(13.2,7.5), M2(10.5,3.5), M3(8.5,7.5), M4(11.5,1.8); O1(14.8,7.5), O2(16.5,3.5), O3(19.5,7.5), O4(16.2,11.5), O5(15.8,13.2). Ball centre.
2. `TRANSITION_OFFENCE_WIDE_EARLY`: M1(9,7.5), C(10,2.0), M2(12,12.8), M3(15,5.0), M4(16,10.0); defenders staggered goal-side at x 13-20.
3. `TRANSITION_OFFENCE_FRONTCOURT_SPACING`: M1(18,7.5), C(20,3.2), M2(20,11.8), M3(23,5.2), M4(23,9.8); defenders between players and right basket.
4. `SIDELINE_WIDE_PROBLEM`: ball M1(17,8.0); C(18.5,0.8); nearest defender O2(20,2.4); remaining players preserve two passing lanes. C is visibly too close to boundary but still in bounds.
5. `OFFBALL_PASSING_LANE_PROBLEM`: M1(20,7.5); C(21,10.5) with O2(20.8,9.6) screening lane; M2(22,3.2), M3(24,6.0), M4(24,12.0).
6. `OFFBALL_OPEN_SPACE`: M1(20,8); C(21.5,4.2), clear line between M1/C; defenders remain goal-side but do not erase opening.
7. `BALLHAND_PRESSURE`: C ball(20,7.5); O1(21,7.5); M2(22,3.2), M3(23.5,11.8), M4(25,6.0), M1(18,12); defenders matched.
8. `DRIVE_ATTACK`: C ball(23,7.5); O1(23.8,8.1) trailing/hip; help O2(25,5.4); outlets at 21,3 and 21,12.
9. `HALFCOURT_SHOT_2`: C ball(23.5,7.5) or engine-authorised two-point origin; nearest defender contest distance; rebounders around lane.
10. `PERIMETER_SHOT_3`: shooter origin must be outside the 6.25 m inner arc with visible separation from line; never derive 3 value from approximate screen pixels.
11. `ONBALL_DEFENCE_DRIVE`: O1 ball(20,7.5); C(21,7.5) between O1 and right basket; other Magic matched/help-aware.
12. `SHOT_CONTEST_2`: O1 two-point origin(23,7); C(23.7,7.3); lane players establish rebound positions.
13. `SHOT_CONTEST_3`: O1 outside inner arc; C closes without being pre-positioned as successful blocker; all other players respect shot/rebound spacing.
14. `REBOUND_LIVE`: ball near rim/paint; C and 3-5 nearest players occupy distinct believable rebound lanes; no winner visually established.
15. `REBOUND_SECURED_MAGIC`: Magic winner owns ball in/near paint; C position depends on winner; teammates begin outlet lanes; opposition begins recovery.
16. `REBOUND_SECURED_FALCONS` (legacy identifier; semantically `REBOUND_SECURED_OPPOSITION`): opposition winner owns ball; Magic immediately turn to transition defence. Rename in implementation while maintaining compatibility alias where needed.
17. `TRANSITION_DEFENCE_RECOVERY`: opposition ball 10-16 m from its defensive end after turnover/rebound; C is initially behind or level with play according to event, Magic sprint goal-side.
18. `FREE_THROW_ALIGNMENT`: shooter at EDJBA advanced U10 line; lane players legally separated; remaining players outside required areas. First miss does not release players; final live miss does.
19. `INBOUND_ALIGNMENT`: ball out-of-bounds at engine-specified side/end; active players create plausible receiving/denial positions; do not fabricate exact inbound spot if engine lacks it.
20. `HALFTIME_FINAL_NEUTRAL`: no live ball ownership or tactical implication; active court can fade/neutralise while score remains authoritative.
21. `FAST_BREAK_CHARLOTTE_BALL`: C ball(10.5,6.5), dribbling into open court; M2(12,2.5), M3(13,12.5), M4(16,5), M1(15,10); opposition recovering at x 14-22 with at least one defender capable of affecting the decision.
22. `FAST_BREAK_TEAMMATE_BALL`: M1 ball(10.5,7.5); C(12.5,2.4) or mirrored wide lane; another teammate ahead/opposite lane; defenders recovering. Charlotte has a genuine off-ball transition choice.
23. `FAST_BREAK_FRONTCOURT_DECISION`: ball carrier reaches x≈18-21; defenders' numbers/angles determine whether attack, pass-ahead or control is plausible; sideline issue may be layered only when authored state explicitly selects it.

### Positioning constraints
- Minimum visual separation between unrelated player centres: target >=0.8 m except genuine contest/screen/rebound contact states.
- On defence, normal EDJBA U10 presentation is player-oriented/man-to-man: each defender has a plausible matchup and ball awareness. Do not form a static 2-3/3-2 zone shell.
- Pre-choice coordinates show the problem, not the answer. Post-choice coordinates may move Charlotte along the selected path.
- Court animation may interpolate; engine event ordering remains authoritative.

## 5. New authored situation contract — sideline/front-court space

**Situation ID:** `SIDELINE_SPACE_DECISION_V1`  
**Eligibility:** Magic transition offence; Charlotte off-ball; front-court entry; presentation state can truthfully place Charlotte near sideline; not immediately after another Charlotte decision; not during final-shot/foul/dead-ball state.

Player-facing setup: Charlotte is running very wide near the sideline as Magic enter the front court. A defender and teammate positions make the reduced passing/attacking angle visible.

**Choices:**
1. `Move into open space`
2. `Keep running down the sideline`
3. `Move towards the ball`

Resolution principles:
- Choice 1 moves Charlotte inward into a useful passing/attacking lane and increases availability, but does not guarantee a pass or score.
- Choice 2 can preserve width early but, in this front-court state, may carry Charlotte toward the corner/reduce angles. It is not automatically a turnover or punishment.
- Choice 3 may create a safer short option but can compress spacing/crowd the ball depending on teammate/defender state.
- Outcomes remain probabilistic/contextual. Never label a choice correct/incorrect in advance.

Integration: author as a new product/content situation; do not implement as a UI-only replacement for existing NORMAL choices. It requires deterministic fixtures and regression coverage.

## 6. First-class fast-break / transition attack contract

**Situation family:** `FAST_BREAK_V1`  
**Entry events:** Magic defensive rebound, Charlotte steal, teammate steal/turnover recovery, or other Magic possession gain where engine/presentation prerequisites establish open transition. Not every possession gain qualifies.

### A. Charlotte starts/controls break — `FAST_BREAK_BALLHAND_V1`
Prerequisites: Charlotte is legal ball owner; at least one defender is recovering rather than already set; at least one attack/pass/control option is plausible.

Choices:
1. `Push the ball up the court`
2. `Pass ahead to a teammate`
3. `Slow down and keep the ball`

Resolution:
- Push: Charlotte advances at speed; may create drive/layup, defender encounter, foul, pass window, turnover or settled offence depending on engine resolution.
- Pass ahead: transfer only if a valid teammate/route exists; may lead to teammate attack, return pass, settled offence or interception if engine resolves it. Do not guarantee assist/score.
- Slow: preserves possession and flows toward front-court offence; it is a legitimate control decision, not framed as cowardice/failure.

### B. Teammate controls break — `FAST_BREAK_OFFBALL_V1`
Prerequisites: active teammate is ball owner; Charlotte is off-ball; open transition exists.

Choices:
1. `Sprint ahead into open space`
2. `Run a wide lane`
3. `Move towards the ball`

Resolution:
- Sprint ahead can create a pass-ahead/layup opportunity but does not guarantee Charlotte receives it.
- Wide lane creates spacing and can stretch a defender; as the play reaches front court, a separately authored sideline-space decision may occur only if state warrants it.
- Move toward ball creates a support/outlet option but may reduce forward spacing.

### Fast-break eligibility rule
Presentation must not invent a break when the defence is set. A fast-break state requires a possession-change event plus an explicit presentation eligibility calculation based on event type, current phase and available transition template. Implementation must expose this as testable state (`fastBreakEligible`, `fastBreakRole`) rather than infer it only from prose.

## 7. Court/narrative transition mapping

- Defensive rebound by Charlotte -> `REBOUND_SECURED_MAGIC` -> if eligible `FAST_BREAK_CHARLOTTE_BALL`, else BALL_HAND/settled offence.
- Defensive rebound by teammate -> `REBOUND_SECURED_MAGIC` -> if eligible `FAST_BREAK_TEAMMATE_BALL`, else NORMAL/settled offence.
- Charlotte steal -> `FAST_BREAK_CHARLOTTE_BALL` when eligible; otherwise BALL_HAND.
- Teammate takeaway -> `FAST_BREAK_TEAMMATE_BALL` when eligible; otherwise NORMAL.
- Magic turnover -> `TRANSITION_DEFENCE_RECOVERY`.
- Opponent score -> inbound/transition; do not call this a Magic fast break unless subsequent authored state establishes it.
- Fast break crossing front court -> `FAST_BREAK_FRONTCOURT_DECISION`; may resolve to DRIVE, SHOOT, PASS, NORMAL or SIDELINE state according to chosen action and engine outcome.

## 8. Initial artwork production batch — maximum 13 new scenes

All new art must match repository-root `charlotte.png`, `contest.png`, `rebound.png`. Names are dynamic UI/narrative data, never painted text. Court diagrams remain a separate visual system.

1. `offball-space-decision` — Charlotte off-ball, ball-handler visible, defender obstructing/creating a readable passing-lane problem; no answer pre-shown.
2. `sideline-space-decision` — Charlotte near boundary entering front court, still in bounds, reduced angle visible; no arrow/coach cue revealing answer.
3. `ballhand-pressure-decision` — Charlotte dribbling/holding under believable U10 pressure with drive and pass possibilities visible.
4. `shooting-opportunity-decision` — genuine pre-shot opportunity; image must not reveal which of four shooting choices she will select or whether it scores.
5. `charlotte-attacks` — reusable post-choice drive/layup attack beat before final make/miss where truthful.
6. `charlotte-score` — resolved Charlotte score; only map where depicted shot type is compatible with recorded action.
7. `onball-defence-decision` — opponent dribbler approaches/attacks Charlotte; Charlotte has not yet performed the selected defence.
8. `shot-defence-decision` — opponent clearly in shooting action; produce composition/crop variants for 2 and declared 3 if one scene cannot truthfully communicate both origins.
9. `charlotte-steal` — resolved steal/possession win, immediately capable of bridging to transition.
10. `rebound-decision` — ball live after miss, no winner established.
11. `charlotte-rebound` — use existing `rebound.png`; this slot is coverage, not a new asset unless art review proves the existing asset unsuitable for a required variant.
12. `defensive-recovery-decision` — Charlotte and Magic recovering after possession loss, threat and basket direction legible.
13. `fast-break-transition-opportunity` — high-energy transition scene. Art direction should support either Charlotte pushing the ball or Charlotte sprinting off-ball via a truthful reusable composition/approved variant; if one image cannot do both without lying, split this slot into two variants without expanding unrelated art.

### Court-led, not initial bespoke art
Pass action; ordinary teammate/opponent makes; generic miss/block; routine possession change; ordinary transition; turnover bridge; free-throw make/miss; inbound; halftime; final. These use dynamic court + narrative initially. Playtest can promote any emotionally flat state into a later art batch.

Existing `contest.png` remains valid only for its matching contested opponent two-point make. Existing `rebound.png` remains the Charlotte-secured-rebound outcome. Existing `charlotte.png` remains supporting portrait.

## 9. Artwork acceptance briefs

Every decision illustration must pass: correct Charlotte identity/uniform; correct possession; correct basket orientation; ball visible where needed; relevant defender/teammate visible; no outcome spoiler; no embedded dynamic name; U10 body scale/spacing believable; action corresponds to event; mobile crop preserves basketball problem.

Every outcome illustration must additionally match: actor, team, shot value/type where depicted, make/miss/steal/rebound truth, chronology and next-possession implication. If the recorded event cannot be represented truthfully by an available image, use court+narrative fallback rather than wrong art.

## 10. Implementation data contract

Minimum presentation state additions:
- `profile.competitionId`
- `profile.clubId`
- `profile.teammates[]` `{id, firstName, jerseyNumber?, source:'custom'|'generated'}`
- `game.homeSquad[]`, `game.awaySquad[]`
- `game.homeActiveFive[]`, `game.awayActiveFive[]`
- `game.clubConfigVersion`
- `presentation.positionTemplateId`
- `presentation.positionsByPlayerId`
- `presentation.fastBreakEligible`
- `presentation.fastBreakRole` = `ballhandler | offball | null`
- `presentation.artSceneId`

Generated identities must be seedable for deterministic tests and stable for the duration of a game. Do not regenerate names between screens.

## 11. Required acceptance fixtures before release

At minimum prove deterministically:
1. Play works with zero profile personalisation.
2. EDJBA/Hawthorn profile loads a real configured EDJBA opponent, never Hawthorn vs Hawthorn.
3. 0, 1, 4 and 8 custom teammates correctly fill a max-nine Magic squad without overwriting custom names.
4. Exactly five players per team appear on live court; bench players do not appear in live narrative actions.
5. Substitution changes active-five consistently across roster, court and narrative.
6. U10 3 is recognised only from outside configured inner line; two/three art never mismatches engine shot value.
7. Advanced U10 free-throw position is rendered.
8. No-zone positioning fixtures do not form a static zone shell.
9. Sideline decision shows pre-choice problem and only moves Charlotte after selection.
10. Charlotte rebound -> eligible fast break -> all three ball-handler choices produce believable next states.
11. Teammate rebound -> eligible fast break -> all three off-ball choices produce believable next states.
12. Rebound/steal with set defence does NOT force a fast break.
13. Fast-break pass-ahead does not guarantee Charlotte score/assist.
14. Every art mapping is truthful to recorded event; unavailable mapping falls back safely.
15. Existing score, clock, possession, shooting, defence, steals, rebounds, FTs, halftime/final regression remains green.
16. Live mobile browser: every visible choice works; court/rosters remain readable; no horizontal clipping.
17. Jared/Charlotte playtest occurs only after automated + live-browser QA passes.

## 12. Work/Codex execution boundary

This specification authorises implementation design but does not itself authorise silent changes to protected/certified mechanics. Work must implement in bounded stages: (A) configuration/profile/roster; (B) court geometry and positioning presentation; (C) authored sideline + fast-break content/engine integration with tests; (D) approved artwork integration; (E) regression/live QA. Any discovered conflict with protected source stops only the affected implementation decision and returns it to Project Chat. Do not modify checksum-protected originals.

No new artwork is approved merely by being named here. Generate/review/approve assets before production mapping.
# Game 1 Visual Coverage Matrix v1.0

**Date:** 16 September 2026  
**Status:** SOURCE AUDIT COMPLETE; PRODUCT DIRECTION FOR EDJBA PROFILE, ROSTERS, COURT RULESET, FAST BREAK AND INITIAL ART BATCH APPROVED; NEW ART NOT YET PRODUCED; NOT IMPLEMENTED OR CERTIFIED.  
**Authority:** Supports `docs/approved-amendments/2026-09-16-game-1-visual-direction-and-coverage.md`. Does not alter certified mechanics or protected originals.

## Audit basis

Current executable/content audit sources remain `game-1/src/content.mjs`, `game-1/experience-v2/slice-game.mjs`, `game-1/experience-v2/director.mjs`, `game-1/experience-v2/court.mjs`, `game-1/experience-v2/ARTWORK.md`, and the three approved art assets. Current source exposes seven choice families: NORMAL, SHOTS, REBOUNDS, DEFENCE, DEF_SHOTS, RECOVERY and BALL_HAND. Experience-v2 adds presentation stages but does not add basketball authority. The current director maps narrative outcome art only for Charlotte winning a rebound and the legacy Casey/Falcons contested-two event. `charlotte.png` is a portrait/support asset.

The current court is presentation-derived: ten named tokens are positioned by hard-coded stage coordinates. Those coordinates are prototype evidence, not authoritative tracking and not yet compliant with the approved U10 positioning model. Legacy prototype teammate/opposition identities are superseded as permanent product direction by the optional personalised squad + EDJBA opponent model below, but source code is not changed by this document.

## Coverage matrix

| ID / source state | Player-visible basketball moment | Pre-choice court truth / U10 positioning requirement | Existing choices / resolution | Post-choice court transition | Illustration requirement | Existing art | Gap / status |
|---|---|---|---|---|---|---|---|
| TIP / P01 | Opening tip and first possession | Five-v-five opening alignment; Charlotte identifiable | Start/continue | Winning team spreads into transition | Court primary | None | Positioning implementation missing |
| NORMAL / P02,P06,P13,P16,P17,P20,P24,P26,P27 | Charlotte off-ball while Magic have possession | Ball carrier + believable spacing; visible passing-lane/space problem | Call / move into open space / keep moving | Charlotte moves only after choice; pass not guaranteed | `offball-space-decision` | None | Approved art; not produced |
| SIDELINE / approved-new | Charlotte too close to boundary as transition enters front court | Early width has become restrictive; teammates/defenders/ball make reduced angle legible | Exact authored choice copy still required | Selected movement; no guaranteed pass/score | `sideline-space-decision`; court handles movement outcome | None | New content + art + tests required |
| RECEIVE / branches | Charlotte receives pass | Passing lane completed; defender closing | Leads to BALL_HAND | Charlotte becomes carrier; teammates provide outlets | Court/copy can bridge | None | No bespoke first-batch art |
| BALL_HAND | Charlotte has ball under pressure | Defender between Charlotte/basket; credible pass and attack options | Move basket / pass / keep and look | Drive/pass/hold changes state | `ballhand-pressure-decision` | None | Approved art; not produced |
| DRIVE | Charlotte attacks after choice | Must follow selected action | Existing engine resolution | Charlotte/defender/ball move truthfully | `charlotte-attack` where truthful | None | Approved art; not produced |
| SHOOT / P09,P22,late | Charlotte has genuine scoring opportunity | Shot area/defender/rebounders believable | Existing four shot choices | Action before outcome | `shooting-opportunity-decision` | None | Approved art; not produced |
| SHOT_FLIGHT_MAGIC | Magic shot released | Origin/value known; rebounders react without spoiler | Engine resolves | Ball/rim outcome | Court animation primary | None | Court implementation gap |
| MADE_CHARLOTTE | Charlotte scores | Resolved event | Made | Score + opponent restart | `charlotte-score` matching action truth | None | Approved art; not produced |
| MADE_TEAMMATE | Teammate scores | Resolved event; scorer must be on court | Made | Score + opponent restart | Court/copy first | None | No bespoke first-batch art |
| MISS/BLOCK_MAGIC | Magic shot misses/blocked | Live ball; no premature possession | Miss/block -> rebound | Rebound state | Court/live-ball treatment | None | No bespoke first-batch art |
| FOUL_MAGIC | Magic shooter fouled | Whistle after genuine shot | Foul -> FTs | FT alignment | Court/copy | None | No bespoke first-batch art |
| DEFENCE / P04,P08,P12,P23,late | Opponent ball handler attacks Charlotte | Player-oriented/no-zone defensive context | Stay in front / cut off / protect basket | Charlotte moves after choice | `onball-defence-decision` | None | Approved art; not produced |
| STEAL | Charlotte wins ball | Vulnerable ball state exists | Steal | Immediate transition opportunity may emerge | `charlotte-steal` | None | Approved art; not produced |
| FAILED_PRESSURE | Opponent survives pressure | Ball handler retains angle/control | Continue | Charlotte recovers | Court/copy | None | No bespoke first-batch art |
| DEF_SHOT_INTENT | Opponent prepares 2 or declared 3 | Shot value spatially truthful; Charlotte can contest/rebound | Contest / block / prepare rebound | Action then engine outcome | `shot-defence-decision`, with truthful 2/3 composition/variant | None | Approved art; not produced |
| OPP_MADE_CONTEST_2 | Legacy matching contested two make | Resolved made two | Made | Magic transition | Existing outcome only where visually/event truthful | `contest.png` | Existing art; runtime casting compatibility must be handled |
| OPP_MADE_OTHER | Other opponent score | Resolved value/action | Made | Magic transition | Court/copy first | None | No bespoke first-batch art |
| OPP_MISS/BLOCK | Opponent miss/block | Live ball | -> rebound | Rebound state | Court primary | None | No bespoke first-batch art |
| REBOUND_DECISION | Live rebound with Charlotte spotlighted | Ball/rebound area visible; players in believable lanes | Go after / get back / stay ready | Charlotte moves then winner resolves | `rebound-decision` | None | Approved art; not produced |
| REBOUND_CHARLOTTE | Charlotte secures | Resolved winner | Rebound outcome | Charlotte owns; transition may emerge | Existing `rebound.png` | `rebound.png` | Verified existing coverage |
| REBOUND_TEAMMATE | Magic teammate secures | Winner must be active on court | Rebound outcome | Teammate owns; Charlotte transitions | Court/copy | None | Fast-break trigger may follow |
| REBOUND_OPP | Opponent secures | Winner active on court | Rebound outcome | Opponent possession; Magic recover | Court/copy | None | No bespoke first-batch art |
| FAST_BREAK_CHARLOTTE / approved-new | Charlotte gains ball in defensive end with real transition opportunity | Open court, recovering defenders, teammates in useful lanes | New authored transition choices required; e.g. push/pass ahead/control where context supports | Can chain to receive/ball-hand/shot/sideline/settled offence | `fast-break-transition-opportunity` where Charlotte carrier composition matches | None | **First-class new content + art + tests required** |
| FAST_BREAK_TEAMMATE / approved-new | Teammate gains ball; Charlotte can run in transition | Teammate carrier in backcourt; Charlotte has meaningful lane/space choice; defenders recovering | New authored off-ball transition choices required | Charlotte may become passing option/receiver or break settles | Same fast-break asset only if role truth matches; otherwise court-led | None | **First-class new content + tests required** |
| RECOVERY / P15 and chains | Charlotte behind play as opponent attacks | Charlotte visibly behind; threat/basket legible | Get back / find player / move toward ball | Recovery path after choice | `defensive-recovery-decision` | None | Approved art; not produced |
| TURNOVER_MAGIC | Magic loses possession | Resolved turnover | Turnover | Opponent transition | Court handles | None | No bespoke first-batch art |
| TURNOVER_OPP | Opponent loses possession | Resolved turnover | Turnover | Fast break may emerge if plausible | Court handles | None | Fast-break trigger candidate |
| FT_SETUP/FT1/FT2 | Shooting foul and free throws | EDJBA U10 line advanced 1m; legal lane setup | Existing FT flow | Make/miss/rebound as engine says | Court/copy first; bespoke art deferred | None | Gameplay remains required |
| TRANSITION_MAGIC | Magic gain possession | Useful lanes; early width; defender recovery | Mostly automatic currently | Front-court spacing or fast-break decision when eligible | Court primary | None | Positioning + trigger implementation required |
| TRANSITION_OPP | Opponent gains possession | Magic sprint back/match up/no zone | Mostly automatic | Defensive state | Court primary | None | Positioning required |
| BACKGROUND_2/3 | Non-spotlight attack | Ten-player believable story; 3 beyond correct arc | Automated | Shot/rebound/transition | Court primary | None | Positioning required |
| DEAD_BALL | Out of bounds / same possession | Inbound alignment | Continue | Restart | Court primary | None | Positioning required |
| HALFTIME / P18 | Half ends | Neutral/non-live state | Resume | Restart | Court/copy | None | No first-batch art |
| SECOND_HALF / P19 | Restart | Five-v-five alignment | Continue | Live play | Court primary | None | Positioning required |
| FINAL / P30 | Final whistle | Accurate final score; no fake possession | None | Post-game story | Trace-backed recap package | None | Separate recap dependency |

## Positioning grammar — implementation design required

Use reusable templates with mirrored attacking direction and event-specific adjustments. The approved grammar now includes:

1. `TIP_ALIGNMENT`
2. `TRANSITION_OFFENCE_WIDE_EARLY`
3. `FAST_BREAK_CHARLOTTE_CARRIER`
4. `FAST_BREAK_TEAMMATE_CARRIER`
5. `FAST_BREAK_DEFENDER_RECOVERY`
6. `TRANSITION_OFFENCE_FRONTCOURT_SPACING`
7. `SIDELINE_WIDE_PROBLEM`
8. `OFFBALL_PASSING_LANE_PROBLEM`
9. `OFFBALL_OPEN_SPACE`
10. `BALLHAND_PRESSURE`
11. `DRIVE_ATTACK`
12. `HALFCOURT_SHOT_2`
13. `PERIMETER_SHOT_3`
14. `ONBALL_DEFENCE_DRIVE`
15. `SHOT_CONTEST_2`
16. `SHOT_CONTEST_3`
17. `REBOUND_LIVE`
18. `REBOUND_SECURED_MAGIC`
19. `REBOUND_SECURED_OPPONENT`
20. `TRANSITION_DEFENCE_RECOVERY`
21. `FREE_THROW_ALIGNMENT_EDJBA_U10`
22. `INBOUND_ALIGNMENT`
23. `HALFTIME_FINAL_NEUTRAL`

Each template defines all ten on-court roles. Coordinates are presentation-authored; score, possession, shot value, ball state, shooter, rebound winner and chronology remain engine-derived. Pre-choice/post-choice coordinates are distinct. Fast-break templates must make early transition width believable while allowing the later sideline-spacing problem.

## Team/profile identity contract — approved

**Profile setup is optional and never blocks Play.**

- Competition: Charlotte may select EDJBA.
- Club: Charlotte may select Hawthorn Magic.
- Squad: Charlotte + up to 8 teammates (maximum 9 total).
- Teammates: optional first name; jersey number optional; editable later.
- Partial custom roster: entered teammates coexist with fictional generated fill-ins.
- On court: exactly 5 per side at a time; bench identities retained separately.
- Substitutions: background/narrative system, not a Charlotte decision in Game 1.
- Narrative integrity: an on-court action can name only a currently active player.
- Artwork: custom names/numbers are not baked into narrative art.
- Legacy prototype Magic names are not permanent canon.

For an EDJBA profile, opponent **club names** come from the current verified EDJBA member-club dataset, excluding Hawthorn when Charlotte is Hawthorn. Opponent **children are fictional**. Do not imply generated children are real registered players. The club dataset and uniform-colour metadata are versioned configuration, not hard-coded eternal facts. Legacy Falcons naming is not the product default.

## EDJBA U10 court/rules configuration — approved basis

Current EDJBA U10-U11 configuration to encode/version and verify at release:

- ball size 5
- foul/free-throw line advanced 1m
- three-point scores included
- inner three-point line
- five seconds in key
- zone defence not allowed
- underlying full court: 28m x 15m Basketball Victoria/FIBA geometry
- Victorian junior/inner arc implementation: use the applicable 6.25m geometry and verify against current competition/facility markings before release

Defensive presentation should therefore model age-appropriate player-oriented/man-to-man concepts, not a fixed zone.

## Initial artwork production set — approved

The initial narrative production package is **13 scene concepts maximum**, with existing art reused where truthful. The goal is meaningful decision/consequence coverage, not asset count.

1. `offball-space-decision`
2. `sideline-space-decision`
3. `ballhand-pressure-decision`
4. `shooting-opportunity-decision`
5. `charlotte-attack`
6. `charlotte-score`
7. `onball-defence-decision`
8. `shot-defence-decision` (truthful 2/3 composition or approved variant)
9. `charlotte-steal`
10. `rebound-decision`
11. `charlotte-rebound` — **existing `rebound.png` satisfies this where event truth matches; do not regenerate by default**
12. `defensive-recovery-decision`
13. `fast-break-transition-opportunity`

Existing `contest.png` remains a narrow truthful outcome asset; `charlotte.png` remains support. Dynamic court/copy initially carries ordinary pass action, generic turnover recovery, routine misses, teammate/opponent scores, halftime, inbound, generic possession changes and free-throw outcomes. Playtesting may justify later art additions.

The fast-break illustration must not try to cover incompatible roles. If Charlotte-as-ball-carrier and Charlotte-as-off-ball-runner cannot be truthfully represented by one composition, prioritise one narrative illustration and use the dynamic court for the other rather than creating misleading reuse.

## Remaining authoring/design work before Work implementation

The earlier four product blockers are resolved: roster model, opposition identity model, EDJBA U10 rules/court basis and initial artwork batch. Remaining work is **specification**, not unresolved product direction:

1. Author exact sideline decision copy/integration point.
2. Author exact fast-break carrier and off-ball choice copy, eligibility/trigger contract and branch integration points.
3. Convert the 23 positioning templates into coordinates/constraints and acceptance fixtures.
4. Define versioned EDJBA club/uniform configuration and fallback behavior when data changes or competition is not selected.
5. Produce scene briefs and obtain explicit approval of generated art before integration.
6. Resolve how legacy `contest.png` casting metadata is presented under dynamic opponent clubs without falsifying event truth.

The recovered-source caveats remain: standalone Build Control Register is missing; distinct Engine & Content Contracts content is unconfirmed. Neither is reconstructed here.

## Acceptance evidence required after implementation

For every implemented matrix row: deterministic fixture/trace reaches state; displayed score/clock/possession/player identities match trace; correct five active players per side; bench state consistent; pre-choice court does not spoil answer/outcome; post-choice movement follows selected action; fast-break eligibility arises only from plausible possession-change state; EDJBA U10 geometry/rules configuration verified; opponent club is valid for configured competition; generated opponent children are not represented as real people; expected illustration or truthful fallback appears; all controls work; mobile court/rosters remain legible; existing engine regression remains green. Record PASS/FAIL/NOT TESTED with evidence. No certification is claimed by this matrix.

# Game 1 Visual Coverage Matrix v1.0

**Date:** 16 September 2026  
**Status:** SOURCE AUDIT COMPLETE FOR CURRENT GAME-1 CONTENT + EXPERIENCE-V2 PRESENTATION; DESIGN GAPS IDENTIFIED; NEW ART NOT YET PRODUCED; NOT IMPLEMENTED OR CERTIFIED.  
**Authority:** Supports `docs/approved-amendments/2026-09-16-game-1-visual-direction-and-coverage.md`. Does not alter certified mechanics or protected originals.

## Audit basis

Current executable/content audit sources: `game-1/src/content.mjs`, `game-1/experience-v2/slice-game.mjs`, `game-1/experience-v2/director.mjs`, `game-1/experience-v2/court.mjs`, `game-1/experience-v2/ARTWORK.md`, and the three approved art assets. Current source exposes seven choice families: NORMAL, SHOTS, REBOUNDS, DEFENCE, DEF_SHOTS, RECOVERY and BALL_HAND. Experience-v2 adds presentation stages but does not add basketball authority. The current director maps narrative outcome art only for Charlotte winning a rebound and Casey making a contested two-pointer. `charlotte.png` is a portrait/support asset.

The current court is presentation-derived: ten named tokens are positioned by stage-specific hard-coded coordinates. These coordinates are useful prototype evidence but are not authoritative player tracking and do not yet satisfy the approved U10 positioning model. Current presentation names (other than Charlotte) and Falcons naming are provisional pending product-authority confirmation.

## Coverage matrix

| ID / source state | Player-visible basketball moment | Pre-choice court truth / U10 positioning requirement | Existing choices / resolution | Post-choice court transition | Illustration requirement | Existing art | Gap / status |
|---|---|---|---|---|---|---|---|
| TIP / P01 | Opening tip and Magic first possession | Five-v-five opening alignment; ball at centre; Charlotte identifiable within Magic | Start/continue; engine establishes possession | Winning team spreads into transition lanes | Opening/tip atmosphere optional; court is primary | None | Court template missing; art optional |
| NORMAL / P02,P06,P13,P16,P17,P20,P24,P26,P27 | Charlotte off-ball while Magic have possession | Ball carrier plus believable four-player spacing. Charlotte must have a visible spatial problem/opportunity: passing lane, defender relationship, teammate spacing | Call for ball / move into open space / keep moving and stay ready | Charlotte moves only after choice; teammates/defenders react plausibly; receiving is not guaranteed | **Decision scene: off-ball availability**. Outcome variants may reuse movement/receiving scenes where truthful | `charlotte.png` only as support | **High-priority missing decision art and positioning templates** |
| SIDELINE / approved-new | Charlotte running too close to boundary entering front court | Charlotte visibly wide near sideline as Magic transition crosses approximately half court; ball/team/defenders make reduced angle understandable | New authored choice set required; must be approved at content layer | Choice may move Charlotte inward to useful space, remain wide, or another approved action; no guaranteed pass/score | **Decision scene: trapped/wide sideline lane**; **outcome scene: creating useful space** can be reusable | None | **New content + art + tests required; not currently in executable** |
| RECEIVE / branch P03,P07,P14,P21 | Charlotte receives pass | Passing lane completed; defender closing; other players spaced rather than collapsed on ball | Leads to BALL_HAND | Charlotte becomes ball carrier; nearest defender closes; teammates create outlets | Receiving/catch outcome can bridge to ball-hand decision | None | Missing |
| BALL_HAND | Charlotte has ball under pressure | Charlotte holds/dribbles with defender between her and basket; at least one credible passing option and one attacking lane | Move toward basket / pass to open teammate / keep ball and look | Drive changes spacing; pass transfers ball; hold preserves pressure/creates next beat | **Decision scene: ball under pressure**; outcome variants for drive/pass/hold where useful | None | **High-priority missing** |
| DRIVE | Consequence of ball-hand choice | Must reflect selected action, not appear before choice | Engine may create shot, pass sequence or turnover | Charlotte/defender/ball move according to resolved action | Drive/pass/turnover consequence scenes; reuse only when event matches | None | Missing |
| SHOOT / P09,P22 plus branches/late | Charlotte has genuine two-point scoring position | Charlotte in plausible shooting area; defender relationship and teammates/rebounders believable | Pump fake then layup / drive for layup / take shot / side step and shoot | Selected shot movement precedes engine outcome; board must not reveal make/miss early | **Decision scene: scoring opportunity**; selected-action shot scenes may be reusable across outcomes until resolution | None | **High-priority missing** |
| SHOT_FLIGHT_MAGIC | Charlotte or Magic teammate releases 2/3 | Shooter/origin and declared shot value already known; rebounders begin plausible movement without showing outcome | Engine resolves made/miss/block/foul | Ball travels to rim; outcome then determines next state | Shot-flight scene optional if court animation is strong; never depict make before resolution | None | Court/animation gap |
| MADE_CHARLOTTE | Charlotte makes shot | Resolved event only | SHOT_OUTCOME made | Score changes; opposition prepares inbound/transition | **Outcome scene: Charlotte scores**; distinguish layup/jump-shot only if source event provides selected action | None | **High-priority missing** |
| MADE_TEAMMATE | Magic teammate scores | Resolved event only | SHOT_OUTCOME made | Score; Falcons inbound | Team-score celebration/transition scene optional; should reinforce team belonging | None | Missing/medium |
| MISS_MAGIC | Magic shot misses | Ball off rim; no possession yet; players in plausible rebound lanes | SHOT_OUTCOME miss → rebound | Ball becomes live; players converge according to rebound state | **Outcome/bridge: missed shot, live rebound** can be reusable | None | Missing |
| BLOCK_MAGIC | Magic shot blocked | Defender has legally affected shot; ball live | SHOT_OUTCOME blocked → rebound | Loose-ball/rebound positioning | Blocked-shot bridge art can be reusable | None | Missing |
| FOUL_MAGIC | Magic shooter fouled | Whistle after genuine shot; no fabricated basket | SHOT_OUTCOME foul → two FTs | Players reset to free-throw alignment | Shooting-foul outcome + FT setup | None | Missing |
| DEFENCE / P04,P08,P12,P23,P28/P29 when Falcons | Opponent ball handler attacks Charlotte | Ball handler advancing; Charlotte between player and basket or recovering; teammates/opponents occupy believable help/spacing positions | Stay in front / cut off path / protect basket | Charlotte moves according to chosen defensive action before resolution | **Decision scene: on-ball drive defence** | `charlotte.png` support only | **High-priority missing** |
| STEAL | Charlotte wins ball | Vulnerable dribble/ball exposed must exist before result | STEAL | Charlotte owns ball; Magic immediately transition; Falcons recover | **Outcome scene: Charlotte steal** | None | **High-priority missing** |
| FAILED_PRESSURE | Charlotte's defensive choice does not create steal | Ball handler survives pressure/gets angle | DEFENCE resolution continues | Charlotte recovers into shot defence | May reuse drive-defence scene or transition to shot-intent illustration | None | Missing/medium |
| DEF_SHOT_INTENT | Opponent clearly prepares 2 or declared 3 | Shooter position must match 2/3 intent; Charlotte has genuine contest/rebound decision; other players spaced | Hand up contest / jump block / prepare rebound | Charlotte performs selected action; ball outcome unresolved until engine resolution | **Decision scene: opponent shot defence**; 3pt framing must visibly differ where declared | None | **High-priority missing** |
| OPP_MADE_CONTEST_2 | Casey/opponent makes tough two after Charlotte hand-up contest | Resolved made two | SHOT_OUTCOME made | Score; Magic transition | Existing contested-make outcome | `contest.png` | **Verified mapped existing art** |
| OPP_MADE_OTHER | Opponent scores after another defensive choice or three | Resolved event must match shot value and defence | SHOT_OUTCOME made | Score; Magic transition | Separate truthful opponent-score outcome or court-led fallback; never use `contest.png` for 3 | None | Missing |
| OPP_MISS/BLOCK | Opponent shot misses/is blocked | Ball live, no possession | SHOT_OUTCOME → rebound | Players move to rebound state | Reusable missed-shot/live-ball bridge | None | Missing |
| REBOUND_DECISION | Any live missed/blocked final FT/field goal where Charlotte is spotlighted | Ball location and likely rebound area visible; Charlotte, nearest opponents and teammates plausibly placed | Go after ball / get back to defend / stay ready | Charlotte moves only after choice; engine resolves winner | **Decision scene: rebound up for grabs** | None | **High-priority missing** |
| REBOUND_CHARLOTTE | Charlotte secures rebound | Resolved winner Charlotte | REBOUND_OUTCOME winner=you | Charlotte owns ball; team fans into transition/offence | Existing strong rebound outcome | `rebound.png` | **Verified mapped existing art** |
| REBOUND_TEAMMATE | Magic teammate secures | Resolved teammate winner | REBOUND_OUTCOME | Teammate owns ball; Charlotte becomes outlet/transition participant | Team rebound outcome optional but valuable for belonging | None | Missing/medium |
| REBOUND_OPP | Opponent secures offensive/defensive rebound | Resolved opponent winner | REBOUND_OUTCOME | Falcons retain or take possession; Magic recover/match up | Opponent rebound outcome/second-chance scene | None | Missing |
| RECOVERY / P15 and turnover chains | Charlotte behind play as Falcons attack | Charlotte visibly behind; basket and opponent threat legible | Get back to defend / find your player / move toward ball | Selected recovery path changes Charlotte's position; may lead to steal or shot defence | **Decision scene: defensive recovery** | None | **High-priority missing** |
| TURNOVER_MAGIC | Magic/Charlotte loses possession or pass intercepted | Resolved turnover | TURNOVER | Falcons ball; Magic sprint back | Turnover/recovery bridge art can be reused | None | Missing |
| TURNOVER_FALCONS | Falcons lose possession (not Charlotte steal) | Resolved turnover | TURNOVER/STEAL other actor | Magic transition | Team takeaway/transition scene optional | None | Missing/medium |
| FT_SETUP | Shooting foul → free throws | Shooter at line; lane players in believable legal setup; score/clock stable | First/second FT control in current source | Ball flight after control | **Free-throw setup/attempt scene** | None | Missing |
| FT_MADE | First or second FT made | Resolved FT index/team/made | FREE_THROW_MADE | Score +1; second FT or possession transition | FT made outcome can be reusable if shooter/team matches | None | Missing |
| FT_MISS_FIRST | First FT misses | Resolved first miss; current sequence continues | FREE_THROW_MISSED index 1 | Reset for second FT, no live rebound | FT miss outcome can be brief/court-led | None | Missing |
| FT_MISS_FINAL_LIVE | Final FT misses and ball is live | Ball off rim; lane players release into rebound | FREE_THROW_MISSED final → rebound | Rebound state | Reuse live-rebound bridge if visually truthful | None | Missing |
| TRANSITION_MAGIC | Magic gain possession after rebound/steal/score conceded | Ball carrier and lanes advance; Charlotte occupies believable role | Mostly automatic presentation currently | Move from backcourt to front-court spacing | Court animation primary; optional team-transition art | None | **U10 positioning template required** |
| TRANSITION_FALCONS | Falcons gain possession | Magic sprint back/protect basket/find players | Mostly automatic | Establish defensive state | Court animation primary | None | **U10 positioning template required** |
| BACKGROUND_2/3 | Non-spotlight teammate/opponent attack | Ten-player positions should still tell believable game story; declared 3 must originate beyond arc | Automated engine events | Shot/rebound/transition | No bespoke illustration required if court and copy are truthful | None | Court positioning gap |
| DEAD_BALL | Ball knocked out, same team retains | Players reset for inbound | Inbound control | Same possession restarts | Court-led; no new art required initially | None | Positioning template missing |
| HALFTIME / P18 | First half ends | Players no longer shown as active live possession; score accurate | Resume second half | Reset to restart alignment | Halftime team scene desirable but not required for first visual package | None | Medium |
| SECOND_HALF / P19 | Restart | Five-v-five restart/inbound alignment | Continue | Transition into live play | Court primary | None | Positioning template missing |
| FINAL / P30 | Final whistle | Final score and end state; no fake possession | None | Post-game story | **Post-game illustration/highlight must be trace-backed**, per Every Game Tells Your Story | None | Separate post-game package dependency |

## U10 court-state template set required

The implementation should not author arbitrary coordinates independently for every text screen. Create a small reusable positioning grammar with mirrored attacking direction and event-specific adjustments:

1. `TIP_ALIGNMENT`
2. `TRANSITION_OFFENCE_WIDE_EARLY`
3. `TRANSITION_OFFENCE_FRONTCOURT_SPACING`
4. `SIDELINE_WIDE_PROBLEM`
5. `OFFBALL_PASSING_LANE_PROBLEM`
6. `OFFBALL_OPEN_SPACE`
7. `BALLHAND_PRESSURE`
8. `DRIVE_ATTACK`
9. `HALFCOURT_SHOT_2`
10. `PERIMETER_SHOT_3`
11. `ONBALL_DEFENCE_DRIVE`
12. `SHOT_CONTEST_2`
13. `SHOT_CONTEST_3`
14. `REBOUND_LIVE`
15. `REBOUND_SECURED_MAGIC`
16. `REBOUND_SECURED_FALCONS`
17. `TRANSITION_DEFENCE_RECOVERY`
18. `FREE_THROW_ALIGNMENT`
19. `INBOUND_ALIGNMENT`
20. `HALFTIME_FINAL_NEUTRAL`

Each template must define all ten player roles, not merely Charlotte and the ball carrier. Coordinates may be presentation-authored, but score, possession, shot value, ball state, shooter, rebound winner and event chronology remain engine-derived. Mirroring must preserve basketball meaning. Pre-choice and post-choice coordinates are distinct states.

## Artwork production set — proposed first batch

The audit supports a **compact reusable first batch**, rather than one image for every branch. Preserve the three originals. Proposed new illustrations, all in the exact locked style:

1. `offball-space-decision` — Charlotte off-ball with defender relationship and useful space visible.
2. `sideline-space-decision` — Charlotte too close to boundary entering front court.
3. `sideline-space-outcome` — Charlotte has moved into useful attacking space; no guaranteed ball/score.
4. `ballhand-pressure-decision` — Charlotte with ball, defender closing, drive/pass possibilities visible.
5. `drive-action` — Charlotte attacks a gap after choosing to drive.
6. `pass-action` — Charlotte makes a purposeful pass to a teammate.
7. `shooting-opportunity-decision` — Charlotte has a genuine two-point scoring chance before shot selection.
8. `charlotte-score` — Charlotte scores; must not imply a shot type inconsistent with recorded action. If one image cannot truthfully cover layup and jump shot, split during art review.
9. `onball-defence-decision` — opponent drives at Charlotte.
10. `shot-defence-decision-2` — opponent clearly going for two; Charlotte must choose contest/block/rebound preparation.
11. `shot-defence-decision-3` — opponent clearly outside arc and going for three.
12. `charlotte-steal` — Charlotte wins the ball and changes possession.
13. `rebound-decision` — ball live after miss, before winner known.
14. `defensive-recovery-decision` — Charlotte behind play choosing how to recover.
15. `turnover-recovery` — possession lost and transition defence begins.
16. `free-throw-attempt` — truthful FT setup/attempt; outcome not pre-shown.
17. `free-throw-made` — resolved make.
18. `free-throw-missed-live` — final miss becoming reboundable.

Existing `rebound.png` covers Charlotte's secured-rebound outcome. Existing `contest.png` covers only the matching contested opponent two-point make. Existing `charlotte.png` remains a supporting portrait.

Before generation, review whether items 5/6/8/15/17/18 are better represented by court animation plus fewer outcome illustrations. The product goal is meaningful visual consequence, not asset count. No new artwork has been generated or approved by this matrix.

## Team identity audit

Current prototype roster: Charlotte 10, Mia 5, Zoe 6, Avery 11, Harper 14; Casey 9, Taylor 4, Morgan 6, Riley 7, Jordan 12; teams Magic/Falcons. Treat all except Charlotte identity as **PROVISIONAL PRESENTATION CASTING** until Jared explicitly approves names/numbers/opposition naming. The roster UI should show both five-player groups and remain useful on mobile. Do not use provisional identities as prompts for a large art batch until approved.

## Implementation blockers / decisions before Work

1. **Roster canon:** approve or replace teammate/opposition names, numbers and opposition team name before artwork with named players is produced.
2. **Court ruleset:** verify the actual court geometry/markings standard to use for Charlotte's U10 context before claiming dimensional accuracy.
3. **Sideline situation authoring:** define its exact choice copy and integration point at product/content authority; it is not currently in executable content.
4. **Artwork batch approval:** approve the compact batch and determine which outcome beats can rely on dynamic court animation rather than bespoke art.
5. **Positioning grammar:** convert the 20 templates above into implementation coordinates/constraints and acceptance examples; this is presentation design, not a change to engine truth.

The recovered-source caveats remain: standalone Build Control Register is missing; distinct Engine & Content Contracts content is unconfirmed. Neither is reconstructed here.

## Acceptance evidence required after implementation

For each matrix row implemented: deterministic fixture or trace reaches state; screenshot/browser evidence shows correct pre-choice positioning; selecting each choice does not visually reveal outcome early; post-choice movement corresponds to selection; resolved illustration matches event; ball/possession/score/clock remain engine-consistent; all ten players remain coherent; both rosters agree with court identity; mobile remains readable; existing mechanics regression passes. New sideline content additionally requires authoring/engine/content acceptance and regression coverage. Gate P and Jared/Charlotte playtest remain required before certification.

# Approved amendment — Emotional Experience v1.1

**Approved by Jared:** 16 September 2026 in Charlotte's Basketball World project chat. **Status:** LOCKED PRODUCT-DESIGN AMENDMENT; NOT A GAME RELEASE OR CERTIFICATION. **Authority:** Master Game Specification v1.0, read together with this explicitly approved additive amendment. This is a versioned amendment record, not a rewrite of the checksum-protected original. Any conflict with previously locked mechanics or unresolved historical specifications requires separate explicit resolution; do not silently override.

## Master Game Specification — approved addition to §1, §2, §7 and §8

**Emotional North Star:** Create an engaging, authentic basketball experience that offers Charlotte opportunities to feel belonging, improvement, excitement, valued, safe to try, agency, pride and fun. These are eight product-design dimensions inspired by youth-sport FUN MAPS research, **not** eight validated FUN MAPS categories, universal child preferences, or statements about Charlotte's actual emotions. Charlotte's voluntary feedback guides what matters to her. Preserve the existing ultimate success test: wanting to try different decisions in real basketball. The existing FEEL → DECIDE → EXPERIENCE → RECOVER → DECIDE AGAIN loop and 'emotion is created, not announced' principle remain controlling.

**EM requirements (apply across a full game, not every possession):**

| ID | Requirement | Observable evidence |
| --- | --- | --- |
| EM-01 | Belonging: credible teammate interaction and participation. | Event-grounded calls, passes, reactions and team context; Charlotte's optional feedback. |
| EM-02 | Improvement: visible, genuine learning/progress. | Progress claims backed by recorded decisions/events, not invented stats. |
| EM-03 | Excitement: tension from basketball play. | Coherent game rhythm, real score/clock/stakes, no guaranteed drama. |
| EM-04 | Valued: recognise non-scoring contributions. | Recorded stops, rebounds, passes, movement or other legitimate contributions reflected accurately. |
| EM-05 | Safe to try: mistakes and losses are legitimate without shame. | Failure → recovery paths; no punitive streaks, humiliation or character judgments. |
| EM-06 | Agency: meaningful plausible choices affect subsequent states. | Branch and event traces, working live controls; never player-selected shot outcomes. |
| EM-07 | Pride: earned recognition. | Distinguish effort, decision quality and realised result; praise only when supported by context/events. |
| EM-08 | Fun: enjoyable coherent play, not reward manipulation. | Full-game observation and voluntary feedback, not inferred feelings or a fabricated fun score. |

**Six safeguards:** (1) Charlotte's own voice, without compulsory emotional surveys; (2) intrinsic basketball enjoyment over badges/streaks/retention pressure; (3) truthful separation of decision, effort and outcome; (4) fair challenge without covert outcome rigging or engine changes; (5) emotional safety is a release-blocking gate; (6) complete-game experience review, including losses, quiet games and non-scoring participation.

**Explicit prohibitions:** Never announce or infer what Charlotte feels; shame a player; label a child as defective; manufacture success or praise; reward only scoring; punish losing; use pressure to keep playing; secretly change certified probability, score, clock or possession behaviour; or turn the game into a coaching lecture. A good shot may miss and a poor decision may sometimes succeed. No automatic positive judgment for every assertive action.

## Development Bible — approved process addendum

Before implementation, identify which EM IDs a feature supports and the observable behaviours, evidence and risks. Preserve source hierarchy, locked mechanics, protected originals and documented conflicts. Consolidate related work into one scoped implementation package; no new Emotional Experience Bible or separate scoring engine. In design review, check basketball realism, functionality and emotional experience separately. Do not claim that automated tests can prove subjective feelings. Record the approved amendment in the change log and reference this file instead of duplicating its definitions.

## Game 1 Story & Experience Specification — approved content addendum

Write believable, event-grounded teammate and opponent reactions. Use second-person player language where required by existing acceptance rules. Show recoverable consequences for misses, turnovers and losses. Recognise real non-scoring contributions, avoid generic/unearned praise and distinguish decisions from outcomes. Outcome illustrations and court-board states must correspond to the actual engine event and position; do not invent scoring, possession or a teammate action for emotional effect. Do not assert Charlotte's emotional state.

## Artwork / UI documentation — approved visual addendum

Make player location, ball possession, teammates and opponents legible on the planned court board. Restore event-matched post-action illustrations, including misses, rebounds, defensive plays and recovery, with consistent established artwork. Never imply that an image is proof of an event not recorded by the engine. Existing approved artwork and asset-ingestion constraints remain unchanged until a separate implementation package is authorised.

## Game 1 Acceptance & Certification Specification — approved supplemental Gate P

Gate P is mandatory for a release that implements this amendment, **not retroactive recertification of the protected v33 baseline**. Record PASS / FAIL / NOT TESTED and evidence for each item. Any emotional-safety FAIL or critical NOT TESTED means NOT READY.

- [ ] EM-01 through EM-08 traced to relevant implemented behaviours or documented non-applicability at full-game level; no claim that all feelings were achieved.
- [ ] Narration, highlights, illustrations and stats agree with chronological event/state trace; no invented praise, scoring or progress.
- [ ] Decision quality, effort and realised outcome are not conflated; good-miss and poor-success paths reviewed.
- [ ] Non-scoring, cautious, brave-but-unlucky, early-mistake/recovery and losing routes reviewed without a hidden correct play style.
- [ ] No shaming, punitive streaks, retention pressure or compulsory emotional check-in; emotional safety PASS.
- [ ] Meaningful decisions and live buttons verified; engine outcomes remain engine-resolved.
- [ ] Full-game story, pacing, visual legibility, participation and ending reviewed in a player-mode live browser.
- [ ] Invite Charlotte to give optional, age-appropriate feedback on enjoyment, whether decisions mattered, desire to play again, and open-ended likes/frustrations. Record actual answers only if given. Her feedback informs iteration, not a numeric emotional score or certification of her internal state.
- [ ] Existing acceptance, regression, browser QA and release workflow completed; unresolved source conflicts affecting a change resolved before implementation.

**Gate P status for current game:** NOT TESTED / NOT APPLIED. No implementation or release certification is claimed by this documentation amendment.

## Change control and implementation boundary

Approval authorises this additive documentation amendment and future feature planning against it; it does not authorise an engine rewrite, modifications to protected originals or historical evidence, silent resolution of possession conflicts, or deployment. Keep all eleven authoritative originals and their checksum manifest byte-identical. The separate documentation PR should be reviewed and merged before treating this as part of `main`. Subsequent implementation follows ChatGPT Project Chat → Codex → live Carryo → automated QA → live browser QA → Jared/Charlotte playtest → certification, with existing local pre-deployment checks.

**Change log:** v1.1, 16 September 2026 — Approved additive emotional experience North Star, eight traceable requirements, six safeguards, bible-specific addenda and supplemental Gate P. v1.0 original text preserved unchanged.

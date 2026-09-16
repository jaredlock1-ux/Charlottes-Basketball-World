# Approved product principle — Every Game Tells Your Story

**Approved by Jared:** 16 September 2026 in Charlotte's Basketball World project chat. **Status:** APPROVED ADDITIVE PRODUCT-GOVERNANCE REQUIREMENT; NOT IMPLEMENTED OR CERTIFIED. **Authority:** Master Game Specification v1.0 together with approved Emotional Experience v1.1. This amendment adds to, and does not rewrite, checksum-protected authoritative originals. It does not change certified engine mechanics or resolve historical conflicts.

## Product principle

> Every completed game should give Charlotte an authentic, personalised account of how she contributed, what happened and one memorable moment worth revisiting.

**Working title:** Every Game Tells Your Story.

Every completed game deserves a meaningful ending, but not every game requires a heroic moment, victory, points scored or a positive judgment. A quiet game, missed shot, difficult decision or loss must remain truthful and worthwhile to review. Do not invent a highlight when the event record does not support one. If no standout event exists, use a modest, accurate account of the game's participation or turning points rather than fabricate a 'moment of the match'.

## Master Game Specification — approved additive principle

Treat the post-game story as part of the full-game experience and the Emotional North Star, particularly EM-02 (improvement), EM-04 (valued), EM-05 (safe to try), EM-06 (agency), EM-07 (earned pride) and EM-08 (fun). The story must reflect what happened rather than assert what Charlotte felt or tell her what she should feel. Preserve the existing real-basketball ultimate success test.

## Game 1 Story & Experience Specification — approved additive post-game contract

On a completed game, present the actual final score/result, a concise and varied account of Charlotte's recorded contributions (including legitimate defensive, passing, rebounding and movement actions where tracked), and one memorable recorded event when the evidence supports it. Ground descriptions and any illustration in the chronological event/state trace. Recognise effort, decision quality and realised outcome separately. A good opportunity may end in a miss; do not label a shot 'good' unless the available game context supports that evaluation. Use age-appropriate, natural player language without generic congratulation, invented praise, shaming or a coaching lecture. Remove developer-facing provenance disclaimers from the player UI. Allow a straightforward Play Again action without pressure, streaks or retention manipulation. Do not imply an illustration is an actual recorded event unless it is matched to that event.

## Development Bible — approved process addendum

Specify the post-game presentation contract and evidence fields before implementation. Generate scores, counts, achievements and event selection only from the engine's authoritative chronological trace or explicitly validated derived data; never from static sample copy. Define deterministic and testable handling for zero recorded contributions, no standout moment, loss, low scoring, high involvement, good-decision/missed-outcome and replay. If the engine does not record a claimed contribution or cannot establish decision quality, omit or neutrally describe it; do not silently change the engine to manufacture evidence. Trace this principle to relevant EM IDs, acceptance tests and a bounded implementation package. Review actual player-facing copy and visual mappings separately from engine correctness. No game code, deployment or historical evidence is authorised by this documentation amendment.

## Acceptance & Certification — supplemental checks within Emotional Experience Gate P

For a release implementing the post-game story, record PASS / FAIL / NOT TESTED and evidence for each of the following; critical failure or untested release-blocking behaviour means NOT READY:

- Final score, winner/draw where supported, stats and highlight counts match the chronological engine event/state trace, including free throws and possession outcomes.
- Every displayed contribution is genuinely recorded or transparently derived; no invented events, inflated numbers, unearned praise or unsupported 'good' decision labels.
- The selected memorable moment is a real, correctly sequenced event; where none qualifies, use an honest alternative rather than a fabricated highlight.
- Complete-game routes cover wins, losses, quiet/low-scoring games, high involvement without scoring, brave-but-unlucky decisions, mistakes and recovery, and games without a standout moment.
- Wording separates effort, decision quality and actual outcome, avoids shame or pressure, and does not claim Charlotte's internal feelings.
- Any outcome illustration corresponds to the selected recorded event and established artwork constraints; absent imagery must not fabricate the event.
- Play Again works in the exact published build, resets game-specific state appropriately and does not alter persistent journey data contrary to existing contracts.
- Full-game live-browser review and optional Charlotte feedback are completed under the existing workflow and Emotional Experience Gate P; no automated test purports to prove her feelings.

**Current implementation status:** NOT IMPLEMENTED / NOT TESTED. This approval is product governance only, not release certification.

## Change control

This is an additive approved amendment to existing governance, not a new bible. Preserve all original authoritative documents and their checksum manifest unchanged. Future implementation package should consolidate this post-game story with the proposed court board and event-matched post-action illustrations only after scope and acceptance criteria are confirmed. Follow ChatGPT Project Chat → Codex → live Carryo → automated QA → live browser QA → Jared/Charlotte playtest → certification, with existing pre-deployment checks. Unresolved historical conflicts that materially affect implementation require separate explicit product-authority resolution.

**Change log:** 16 September 2026 — Jared approved Every Game Tells Your Story; additive clauses mapped to Master, Story & Experience, Development Bible and Gate P. No implementation or certification claimed.

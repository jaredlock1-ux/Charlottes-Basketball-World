# Emotional experience integration — proposed product-authority amendment

Status: PROPOSED FOR REVIEW; not a replacement for or silent amendment to locked originals. Date: 16 September 2026. Scope: documentation and acceptance design only; no runtime, artwork, engine, probabilities, tests or deployment changes.

## Authority and fit

Master Game Specification v1.0 is the master authority. Its existing emotional loop (FEEL → DECIDE → EXPERIENCE → RECOVER → DECIDE AGAIN), principle that emotion is created rather than announced, failure/recovery, agency, realistic consequences and ultimate success test already establish much of this direction. This proposal elaborates those principles; it does not supersede them. Follow the hierarchy and change-control rules in `docs/AUTHORITY-AND-MIGRATION.md` and the master specification. Preserve all eleven checksum-verified authoritative originals verbatim until a separately reviewed, versioned amendment is explicitly locked; do not edit original files in place. Unresolved possession/halftime conflicts remain unresolved.

## Proposed North Star amendment

Charlotte's Basketball World should create an engaging, authentic basketball experience offering opportunities for Charlotte to experience belonging, improvement, excitement, feeling valued, safety to try, agency, pride and fun. These eight dimensions are a product-design synthesis informed by youth-sport FUN MAPS research, NOT the study's own eight validated categories, a diagnosis of Charlotte or a claim that all children share identical preferences. Charlotte's own voluntary feedback informs priorities. The game creates opportunities for feelings through authentic participation, meaningful decisions, believable consequences, social interactions and development; it must not dictate what she feels or manufacture success. Preserve the existing ultimate success test: Charlotte finishes wanting to try decisions in real basketball.

## Traceability and evidence

| ID | Opportunity | Design requirement | Verification |
| --- | --- | --- | --- |
| EM-01 | Belonging | Recurring teammates interact meaningfully and basketball-plausibly; no forced friendship narration. | Inspect event-linked interactions across a complete game; ask Charlotte about team involvement. |
| EM-02 | Improvement | Show only genuine, observable progress and contextual decision learning; no invented progression. | Compare event log with any progress summary; playtest whether improvement is understandable. |
| EM-03 | Excitement | Build tension from genuine basketball state, stakes and choices, not artificial guaranteed drama. | Full-game pacing and basketball-state review; ask what was exciting or dull. |
| EM-04 | Feeling valued | Recognise authentic defensive stops, rebounds, assists, movement and other contributions, not only points. | Event-to-feedback trace; check non-scoring play paths. |
| EM-05 | Safety to try | Allow legitimate misses, turnovers and losses; respond without shame, punitive streaks or character judgments. | Review failure/recovery paths and copy; emotional-safety failures block release. |
| EM-06 | Agency | Decisions produce meaningful, plausible consequences; no outcome selection disguised as a basketball choice. | Branch/state assertions and live-button checks. |
| EM-07 | Pride | Reflect effort, decision quality and outcomes separately; celebrate only events that happened. | Compare narration and highlights to state/event evidence. |
| EM-08 | Fun | Prioritise enjoyable gameplay, readable visuals and coherent pacing over extrinsic reward loops. | Full-game observation and optional player feedback; no automated claim to measure feelings. |

Not every possession must satisfy all eight dimensions. Review coverage across the complete experience, including losses and quiet/non-scoring games. Do not invent an emotional score or infer Charlotte's emotional state from clicks or performance.

## Six safeguards

1. Charlotte's voice: invite optional, age-appropriate feedback; do not presume what she feels or pressure her to answer.
2. Intrinsic play: do not use badges, points, praise or retention mechanics as substitutes for basketball enjoyment; no pressure to keep playing.
3. Truthful feedback: distinguish effort, decision quality and realised result. Good shots may miss; poor choices may occasionally succeed. Only claim decision quality when supported by the actual situation and basketball rules.
4. Fair challenge: progressively introduce situations without secretly rigging outcomes, changing certified probability/possession logic or guaranteeing wins.
5. Emotional safety: no humiliation, shame, manipulative streaks, or failure-of-character language. Safety violations are release blockers.
6. Whole-game quality: evaluate continuity, pacing, participation and ending across an entire game, not only isolated scenarios.

## Proposed placement in existing authority documents (only after review)

- **Master Game Specification**: versioned, explicitly approved North Star elaboration and change-log entry; preserve the original locked text and reconcile any tension before amendment.
- **Development Bible**: cross-reference the master principle and EM IDs; specify feature design, review and change impact, without duplicating canonical definitions.
- **Game 1 Story & Experience Specification**: event-grounded teammate responses, recovery, non-scoring contributions and character/illustration response requirements; no invented praise.
- **Game 1 Acceptance & Certification Specification**: add EM acceptance traceability, complete-game experiential review and explicit emotional-safety release gate. Automated tests validate observable behaviour, not subjective feelings.
- **Artwork and UI documentation**: link illustration and court-board states to real game events and accessibility/readability, preserving existing approved artwork and ingestion constraints.
- **Defect & Change Log / release evidence**: record approved amendments, observed playtest issues and evidence, without retroactively altering certified records.

No separate Emotional Experience Bible, independent scoring engine or new runtime mechanic is authorised by this document. Do not modify certified v33, v1/v2, protected tests, original artwork, checksum manifest or historical evidence in this documentation package.

## Acceptance and release workflow

1. Audit actual authority and conflicts; review this proposal with Jared and explicitly lock the approved amendment before modifying a locked master specification.
2. Map each implemented feature to relevant EM IDs and observable acceptance criteria; record exceptions and conflicts.
3. Run existing build, regression and evidence checks for any later implementation package, plus live-browser interaction QA and whole-game narrative/realism review.
4. Invite Charlotte to answer, optionally and not after every game: Did you enjoy it? Did your decisions matter? Would you play again? Ask open-endedly what she liked or would change. Treat answers as qualitative feedback, not a score or proof of all eight feelings.
5. Report factual evidence and unresolved issues separately from subjective observations. Do not certify emotional success without player evidence; do not make subjective enthusiasm a substitute for functional or basketball correctness.

## Current status

This is a reviewable integration proposal only. No original bible has been amended or version-bumped, no game code has changed, and no tests have been run for this documentation-only proposal. Any implementation involving unresolved historical authority conflicts must stop for explicit product-authority resolution.

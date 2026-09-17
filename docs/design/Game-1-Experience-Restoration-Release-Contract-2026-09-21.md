# Game 1 Experience Restoration — executable release contract

Status: APPROVED SCOPE / NOT IMPLEMENTED. Prepared 17 September 2026 for next Work execution. This is one bounded release handoff, not evidence of implementation, QA, deployment or Jared/Charlotte acceptance. GitHub remains canonical. Preserve certified engine, original files, and previously approved artwork; resolve dependent authoritative-document conflicts rather than guessing.

## Objective and frozen scope

Deliver the court-led player loop: court -> situation -> choice -> action illustration -> engine-confirmed result -> updated court. The game board is mandatory throughout relevant play; it must not disappear between deployments. Restore the opening tip-off at 20:00, with possession established by the authoritative engine before the first scenario. Integrate exactly two approved PNGs from the attached `game1-approved-artwork-integration-2026-09-17.zip`: Defensive Recovery `gen_id 58948b62-3299-4e5b-b071-6ef1859afed7` (Jared approved 17 September, supersedes `68bf4c4e-97a2-4895-96ef-8d0ae930beca`, post-choice recovery action only); Made Two-Point Jump Shot `gen_id 4ef22098-6f4d-42c8-a2d6-8e8a1f7ab309` (engine-confirmed made two by Charlotte only). Validate actual ZIP bytes, manifest and hashes, master-character and canonical ball comparisons, neutral branding and player count before upload. If a reference or approved binary is unavailable, mark BLOCKED and do not regenerate, substitute or falsely pass. Never overwrite protected `charlotte.png`, `contest.png`, `rebound.png`.

Out of scope: new illustrations, new basketball mechanics, changing score/possession/clock rules, court redesign, extra story branches, global asset rollout. Minimal development-only scenario fixture/launcher is allowed solely to prove these two image states and tip-off; it must not be exposed to players or alter production engine state.

## Observed defect / baseline

The previously shared `https://share.carryo.io/charlotte-step-2-2-possession-test` is an older possession-test URL, NOT a verified current canonical game link. User supplied `https://share.carryo.io/JSsAJ97BPwi5er5B`; screenshot 17 September shows court and five markers per team, Falcons possession at 19:36, Casey driving, no opening tip-off. Screenshot proves this observed screen only, not full deployment behaviour. Confirm current repo/commit and deployment provenance before modifying. Expected new-game entry: first half 20:00, visible tip-off, legitimate possession resolution, then coherent first decision, without hardcoding an outcome contrary to engine.

## Executable acceptance and release gates

G0 — Baseline: identify source commit, build artifact, actual deployment URL and initial-screen reproduction. Record baseline failure and protected-original hashes. If URL cannot be linked to source, stop promotion and investigate.

G1 — Artwork: extract exact two PNGs, compare checksums to manifest, inspect against approved images and Charlotte master/canonical ball, check no fixed names, numbers, team branding, text, score/clock or other mutable state; basketball ownership/hoop direction, age, anatomy, <=5 active/team. Record per-asset PASS/FAIL/NOT TESTED with visual evidence; obtain Jared reapproval for any derivative. Approval of composition is not QA PASS.

G2 — Integration: commit approved exact binaries with versioned paths and machine-readable mapping/hash manifest; no protected-file changes. Recovery appears only after recovery choice; made two only after engine-confirmed two-point make by Charlotte, never before shot choice, miss or other scorer. No false result, premature spoiler or contradictory court state.

G3 — Deterministic scenario tests: direct fixture for opening new game, recovery choice, made two, and negative cases (pre-choice recovery, missed two, made three, teammate/opponent scorer). Assert stage, asset ID, score, clock, possession, direction and active players. Existing regression and Golden Game must pass. Fixtures cannot bypass actual rendering checks.

G4 — Actual browser QA: interact with deployed build, not only unit tests. Verify first frame at 20:00 and tip-off, transitions, board persistent, two image loads (no blank/broken assets), buttons, mobile viewport, score/clock/possession, halftime/final whistle, no console/network asset failures where observable. Record screenshots/video and exact URL/commit. A build that passes code tests but fails live browser is NOT releasable.

G5 — Release record: single authoritative current-playable URL with commit, artifact hash/version, deploy timestamp, status and evidence links; mark test/superseded links clearly. Never call a guessed URL canonical. Freeze scope after implementation: new feedback goes to next release unless it blocks this release.

G6 — Human acceptance: Jared and Charlotte playtest the candidate. Ask: understood what happened? choices mattered? fun enough to continue? Observe confusion/hesitation. Record explicit Jared acceptance before marking RELEASE ACCEPTED. Technical pass alone is RELEASE CANDIDATE, not final acceptance.

## Golden Game reference and transition checks

Reference is a structural journey, NOT a fixed score: tip-off -> valid possession -> attack/defend choices -> engine consequence -> updated court -> rebounds/turnovers/free throws as reached -> halftime -> final whistle. At every transition verify court location, possession, direction, ball owner, clock, score, event/stage and image truth. A test cannot pass solely because the underlying function returns without error; it must verify what the player sees. Respect authoritative original and certified engine contracts; if tip-off rules conflict or are absent, surface a specific blocker instead of inventing new mechanics.

## Work execution and evidence return

Work receives this contract, actual attached ZIP, repo and authoritative docs. Implement only after baseline and reference checks. Return: source commit and changed files; before/after protected hashes; asset hashes and mappings; automated tests with counts; fixture results and screenshots; live browser steps/results; Carryo candidate URL with proven commit; unresolved blockers and explicit status for G0–G6. No deployment claim without deployment evidence; no acceptance claim before Jared confirms. If Work credits unavailable, this document remains a prepared handoff only.

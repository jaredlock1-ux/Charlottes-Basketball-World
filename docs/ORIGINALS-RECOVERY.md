# Recovered original-document inventory and conflict report

This recovery update supersedes the missing-original inventory in AUTHORITY-AND-MIGRATION.md and the previous preparation result. It does not change document precedence or reconcile any specification.

Package: Charlottes-Basketball-World-authoritative-originals.zip, supplied by Jared. Extracted unchanged under docs/authoritative-originals/. All 11 Markdown entries match the supplied SHA256SUMS.txt; checksum manifest retained unchanged. This proves extraction/package integrity, not independent provenance beyond the user-supplied original package.

## Recovered originals

- Master Game Specification.md — Master Game Specification v1.0.
- Charlotte's Basketball World — Development Bible.md — v1.7.
- Charlotte's Basketball World — Platform Architecture v1.0.md.
- Charlotte's Basketball World — Game 1 Golden Game & Possession Engine Specification v2.1.md.
- Charlotte's Basketball World — Game 1 Acceptance & Certification Specification.md — v1.0.
- Charlotte's Basketball World — Game 1 Story & Experience Specification.md — v1.2.
- Charlotte's Basketball World — Game 1 QA & Architecture Notes v1.0.md.
- Charlotte's Basketball World — Defect & Change Log.md — updated 14 September 2026.
- Charlotte's Basketball World — Game 1 Complete Possession Tree v1.0.md.
- Game 1 Playable Possession Map v1.0.md.
- Charlotte's Basketball World — Engine & Content Contracts v1.0.md — file recovered, but identical to QA & Architecture Notes, including its internal title. Distinct contracts content is NOT established. Both files preserved.

Standalone Build Control Register v1.2 remains MISSING. Nothing has been reconstructed. The game-specific specification category is now represented by the supplied Game 1 documents; this is not a claim that every historical specification/version has been recovered.

## Comparison classification

Exact matches: all eleven package files match their supplied SHA-256. The two QA/Contracts filenames have identical bytes and checksum 58591b25e8a2aaf18e5961b91afa89f7a331efd7af57c90589f807455929ac73. No original is byte-identical to the existing RULES, README, recovered-specs, DEFECTS or QA-REPORT files.

Harmless formatting differences: the recovered Complete Possession Tree fenced block equals the original after removing Markdown bold markers and normalising whitespace. It is not byte-exact; the original supersedes the need to rely on that extracted formatting, without deleting historical evidence.

Historical/version differences: the original Defect & Change Log records v25-era pending checks; the local QA report records later v33 verification. These are different dated evidence records, not grounds for rewriting either. Original document version labels (Development Bible 1.7, Story 1.2, Engine 2.1) are preserved; no inferred version upgrade is applied to local summaries. The approved later draw amendment remains recorded in RULES.md, not written back into original win-only wording.

Recovered/incomplete material: local RULES/README/QA-REPORT/DEFECTS are implementation summaries and records, not original specifications. recovered-specs.md combines a formatting-normalised tree and partial Playable Map. The latter ends mid-word ('Falc') at P19; the supplied map continues through the rest of the game. Do not use the partial excerpt as a full map.

## Unresolved historical/specification conflicts - preserved for migration

1. Slot meanings: Complete Possession Tree lines 144–155 designate P18 halftime/P19 second-half opening; Playable Map lines 642 and 663 designate P18 shooting/P19 Falcons final push, with halftime at line 716. Both are game-specific source texts. No precedence/version interpretation has been selected.
2. Possession after scoring: Playable Map lines 31–32 list retaining possession after a made shot/free-throw sequence, whereas lines 417–418 say Magic possession ends and Falcons inbound after a score. This is a contradiction within the supplied original, not merely a recovery error.
3. Scripted game conditions: Playable Map line 84 requires the score to remain close by design; the protected v33 records actual state-driven outcomes without a forced close-score correction. The already recorded conflict remains unresolved; migration does not implement balancing or scripted ownership.
4. Governance ordering remains a material tension: Platform Architecture line 158 ends CERTIFY → DEPLOY, whereas the local README workflow includes Live Carryo before automated/live QA and certification. Exact published-build testing is separately required by the recovered certification material. No candidate-versus-certified-release interpretation is invented here.

The Development Bible hierarchy at lines 26–43 agrees with the requested hierarchy; its lower-layer non-override rule is preserved. No governance edits were made. Comparison stops at these confirmed conflicts; this is not a claim of exhaustive clause-by-clause conformance or recertification against every newly available original.

## Verification and readiness

All 101 previously manifested files remain unchanged. 107/107 existing automated tests pass after incorporation. Original checksum evidence: evidence/releases/originals-checksums.json. Comparison evidence: originals-comparison.json. Original/recovered text, v33/v1/v2 code and tests, artwork and Carryo were not edited.


## Product-authority migration decision - 16 September 2026

Jared explicitly authorises migration with the documented conflicts preserved. They no longer impose a STOP condition on migration. Future implementation changes depending on an unresolved conflicting rule must STOP for product-authority resolution.

- Preserve both historical P18/P19 meanings and their conflict.
- Preserve the possession-after-scoring conflict.
- Certified v33 plus its passing acceptance/regression suite is the protected executable baseline. Do not introduce scripted score or possession manipulation to reconcile older specifications. v1 and v2 are protected too.
- The recovered Library Complete Possession Tree is the authoritative original file. The recovered complete Playable Possession Map is the authoritative original. The truncated local map excerpt is non-authoritative recovery material. This designation does not reconcile their conflicting passages.
- Distinct Engine & Content Contracts v1.0 content is UNCONFIRMED/MISSING: the supplied file is byte-identical to QA & Architecture Notes. Preserve both files unchanged.
- Standalone Build Control Register remains MISSING. Do not reconstruct it.
- Preserve all 11 Library documents and SHA256SUMS.txt byte-for-byte.

Operative later locked development workflow, reaffirmed by product authority:

ChatGPT Project Chat → Codex → Live Carryo → automated QA → live browser QA → Jared/Charlotte playtest → certification.

Local automated checks also run before deployment, as documented in the existing implementation README. Historical certification/deployment wording remains verbatim in the originals. This note records the later decision, superseding the migration STOP/readiness restriction above, without rewriting originals or inventing release categories.

Final local verification is recorded in evidence/releases/FINAL-MIGRATION-VERIFICATION.md. GitHub connectivity/publication remains the migration step: fetch existing main, review, commit, push and verify remotely. No commits or pushes have occurred.

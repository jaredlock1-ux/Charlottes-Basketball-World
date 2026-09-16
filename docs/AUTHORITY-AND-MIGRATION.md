# Authority and migration preparation

User authorisation: preserve existing conflicts without interpretation. Certified v33 implementation and its passing suite remain protected. No code, tests, artwork, or existing specification text was altered for migration.

Hierarchy: Master Game Specification → approved game-specific specification → Development Bible → approved implementation decisions → live Carryo → experiments. Existing repository summaries remain implementation-facing documentation; GitHub storage does not promote them above product authority.

## Unresolved conflicts (preserved)

- P18/P19: Complete Possession Tree says halftime/restart; recovered Playable Map says shooting/Falcons push.
- Possession after made shots/free throws: retention wording conflicts with opponent-inbound wording.
- Scripted close scores/owners versus the certified state-driven implementation.
- Existing notes also record an unverified Build Control Register certification/deployment tension.

See unchanged `game-1/RULES.md` for provenance and full qualifications. These are historical/specification conflicts, not permission to alter v33. Resolve separately through product authority when relevant. The approved draw amendment remains as documented.

## Missing original authoritative documents

Expected titles from the request and existing source inventory (some are aliases; exact original filenames/version cannot be established):
- Master Game Specification v1.0
- approved Game-specific Specification(s) (exact title/version unavailable)
- Development Bible / Development-Governance Bible
- Platform Architecture
- Golden Game & Possession Engine Specification / Game 1 Engine Specification
- Game 1 Acceptance & Certification Specification
- Game 1 Story & Experience Specification
- QA & Architecture Notes
- Defect & Change Log (broader authoritative log; local DEFECTS.md retained)
- Charlotte's Basketball World — Game 1 Complete Possession Tree v1.0.md (recovered textual copy exists; original file missing)
- Game 1 Playable Possession Map v1.0 (partial excerpts only)
- Build Control Register v1.2

Searched: current Codex Charlotte project workspace and its empty synced sources/; the second Charlotte project under OneDrive/Documents/ChatGPT/Charlottes Basketball World; available filenames under OneDrive/Documents/ChatGPT, Downloads, and Codex attachments. The Codex project-mirror directory contains only this project. Searches of larger locations used relevant document titles/filenames; unnamed attachments or inaccessible cloud-only documents may remain undiscovered. No claim is made that originals do not exist elsewhere. Existing RULES.md also records earlier conversation-source retrieval attempts. No recovered excerpts are designated canonical replacements.

## Provenance and exclusions

Source/tests/assets copied byte-for-byte from the current workspace. serve-experience.mjs copied from the prior Charlotte workspace because it was absent here. Hash manifest records staged source bytes; release validation records regenerated bundle comparisons.

Existing module paths and evidence locations are preserved to avoid import/build/verification changes. Existing documents are retained verbatim, including historical local paths and dates; these are provenance, not runtime dependencies. New README supersedes no specification.

Excluded: generated deployment HTML, generated slice-game.mjs, ZIPs, Sites checkout/.git/credentials/configuration, caches, dependencies, console dumps, superseded/invalid screenshots, and transient QA repetitions. The legacy v32 HTML is intentionally retained because build.mjs reads its stylesheet. Curated original browser logs are retained to reproduce existing evidence checks. Nothing was removed from the working project.

## GitHub handoff

Target: https://github.com/jaredlock1-ux/Charlottes-Basketball-World, main.
No Git repository was initialised in this package: inventing disconnected history would not preserve Jared's existing history. No commits created; nothing pushed. Git access currently fails via the execution environment's 127.0.0.1 proxy.

In a Git-enabled environment, clone existing main, compare the three existing root image hashes against local approved assets, and review any other remote files before overlaying this package. Preserve remote files/history; do not force-push. Suggested commits: (1) protected source/tests/tooling + selected evidence; (2) repository/authority/artwork documentation. Run the README commands, compare the hash manifest and generated bundles, scan the actual staged diff for secrets, then commit/push and verify remote main. Missing originals remain an explicitly incomplete documentation inventory.

## Original recovery update
The missing-original list above is historical. See [ORIGINALS-RECOVERY.md](ORIGINALS-RECOVERY.md) for the checksum-verified package inventory, confirmed conflicts and current missing items. No authority conflict has been resolved.

## Current product-authority migration decision - 16 September 2026

See ORIGINALS-RECOVERY.md for the operative decision. Preserve all documented conflicts: they do not block migration, but future implementation changes depending on them must stop for product-authority resolution. Protect certified state-driven v33 plus its passing suite, v1 and v2 unchanged.

The Library Complete Possession Tree and complete Playable Possession Map are authoritative originals; the truncated local map is non-authoritative recovery material. Distinct Engine & Content Contracts v1.0 is UNCONFIRMED/MISSING; standalone Build Control Register is MISSING. Neither is reconstructed. All 11 Library files retain their verified hashes.

Operative later locked workflow: ChatGPT Project Chat → Codex → Live Carryo → automated QA → live browser QA → Jared/Charlotte playtest → certification. Local checks also run before deployment as already documented. Historical certification/deployment wording is preserved verbatim in originals; this records the later explicit decision without rewriting them.

Missing records and unresolved conflicts are disclosed limitations, not publication blockers under this authorisation. Final verification: evidence/releases/FINAL-MIGRATION-VERIFICATION.md.

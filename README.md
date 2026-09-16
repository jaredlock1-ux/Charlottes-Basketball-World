# Charlotte's Basketball World

A basketball decision game for Charlotte. GitHub is the intended canonical durable source repository; Codex is the engineering environment; Carryo delivers the player experience. ChatGPT Project Chat remains the product/game-design authority. This local migration package has NOT been committed or pushed to GitHub.

## Structure and protected releases

Existing paths are deliberately preserved to avoid a refactor:
- `game-1/src/engine.mjs`, `game.mjs`, `content.mjs`, `contracts.mjs`, `ui.mjs`: certified Game 1 v33 / engine 1.4.0 baseline.
- `game-1/src/experience*`, `court.mjs`, `build-experience.mjs`: v1 proof, retained for regression.
- `game-1/experience-v2/`: current North Star v2, including director, court, UI, styles and approved assets.
- `game-1/tests/`: unchanged regression suite.
- `game-1/reference/carryo-v32.html`: required legacy stylesheet build input, not the current release.
- `game-1/reference/recovered-specs.md`: recovered historical text, NOT replacement authoritative specifications.
- `game-1/evidence/`, `game-1/experience-v2/evidence/`: retained reproducible browser evidence; paths preserved for existing verification tools.
- `docs/`: migration authority, missing-source inventory and artwork workflow.
- `evidence/releases/`: migration hashes and release records.
- `tools/`: migration validation.

## Run and verify

Node 24 is required; no third-party dependencies or install step.

From `game-1/`:

```sh
node build.mjs
node build-experience.mjs
node experience-v2/build.mjs
node --test --test-isolation=none tests/*.test.mjs
node verify-evidence.mjs
node experience-v2/verify-browser.mjs
```

Build v33 first: v1/v2 builders verify its certified hash. The generated v2 controller is produced by its builder (and test import). Build outputs are ignored, not authoritative source.

Preview commands: `node serve.mjs` (4173), `node serve-experience.mjs` (4174; same port as v2), or `node experience-v2/serve.mjs` (4174). Stop another server on the same port first. V2 deterministic routes: `?qa=1&scenario=primary` or `mixed`; add `&player=1` to hide developer controls.

## Authority and assets

See `docs/AUTHORITY-AND-MIGRATION.md` for missing originals and preserved conflicts. Certified v33 plus its passing tests is the protected executable baseline; this does not reconcile historical text. V2 is not yet North Star certified: Carryo image ingestion is unresolved.

The existing GitHub root `charlotte.png`, `rebound.png`, `contest.png` must remain untouched when merging this package. They are not duplicated at the prepared root because the remote bytes/history have not been fetched and verified. Existing local runtime asset copies remain unchanged under v2. See `docs/ARTWORK.md`.


Original-document recovery: see [docs/ORIGINALS-RECOVERY.md](docs/ORIGINALS-RECOVERY.md). Eleven original-package documents were checksum-verified; confirmed conflicts remain unresolved and the standalone Build Control Register is still missing.

## Final local status

READY FOR GITHUB PUBLICATION. See evidence/releases/FINAL-MIGRATION-VERIFICATION.md for checks and docs/ORIGINALS-RECOVERY.md for the current authority decision. GitHub connectivity/publication is the remaining migration step; nothing has been committed or pushed. Earlier stop/readiness notes are historical and superseded by this explicit decision.

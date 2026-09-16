# Artwork workflow

Approved artwork → canonical GitHub asset → Carryo imports production copy → game references stable Carryo asset path.

Canonical library: https://github.com/jaredlock1-ux/Charlottes-Basketball-World
Keep existing root charlotte.png, rebound.png and contest.png unchanged. Their raw main-branch URLs support the pending Carryo import. Current working copies reside at game-1/experience-v2/assets and are preserved byte-for-byte. Verify the remote files against these copies before claiming byte identity.

Carryo destinations: assets/charlotte.png, assets/rebound.png, assets/contest.png. Carryo should host production copies; no runtime GitHub dependency is introduced. The current import is unresolved and migration does not retry it.

Future approved assets should receive stable descriptive filenames/folders and reviewed Git commits. A future separately authorised reorganisation may introduce art/characters, art/outcomes, art/moments and art/ui after existing production URLs are safe. Do not move the three root assets during this migration.

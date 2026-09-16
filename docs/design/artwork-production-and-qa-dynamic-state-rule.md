# Permanent artwork production and QA rule — dynamic game state

**Approved by Jared:** 17 September 2026. **Status:** binding for all new and existing Game 1 narrative illustrations; additive governance only, not an asset edit or release certification.

## Rule: no baked-in dynamic game information

Narrative illustrations must not visibly contain a fixed game score, game clock, period/quarter/half indicator, shot clock, possession arrow, or other mutable game-state value. Do not draw readable scoreboards or clocks into backgrounds. Prefer framing them out or replacing them with non-informational gym architecture or banners. An unreadable generic fixture is acceptable only if it cannot be interpreted as game-state information.

The live game UI, populated from authoritative engine state, is the sole source of truth for score, clock, period and other mutable game information. Art must remain reusable across different valid states without contradicting that UI. Artwork may depict stable identities and truthful situation-specific basketball facts only when its approved event mapping supports them; dynamic opponent identity and roster names/numbers must not be falsely baked into reusable assets.

## Production gate

Every scene brief and image-generation/edit request must explicitly prohibit readable scoreboard, score, clock and period information. Inspect the complete image, including blurred background signs and scoreboard shapes, before requesting Jared's approval. A beautiful illustration with legible static dynamic data is a FAIL, not an approved production asset.

## Existing artwork audit and remediation

Audit all previously approved and candidate illustrations, including Bring It Up, Off-Ball Space, Ball Under Pressure and any storyboard derivatives, for baked-in game values. Mark each PASS, FAIL or NOT TESTED. An earlier aesthetic approval does not waive this new production rule. For a FAIL, make a minimal background-only edit to remove the mutable data; preserve basketball action, character identity, court geometry and composition. Recheck and seek Jared's approval of the corrected asset before integration. Do not silently replace protected original PNGs; where originals contain conflicts, document the restriction and create separately approved derivatives only with explicit authorisation.

## Release QA

Automated asset manifest/scene-brief checks plus human visual review must verify that every integrated narrative asset is free of readable baked-in dynamic state. Test representative distinct engine scores/times/periods against each asset's reuse mapping and confirm the game UI displays the authoritative values. Record evidence and block release on contradictions. No changes to certified engine mechanics are authorised by this rule.

# Recovered artwork QA and handoff — 17 September 2026

**Scope:** exactly two recovered, Jared-approved PNGs. This is an evidence supplement to `Game-1-Artwork-Approval-and-Integration-Register-v1.0.md`, not a declaration of full-library QA, GitHub binary storage or integration.

## Binary recovery evidence

The local recovery ZIP `game1-artwork-recovery-2026-09-17.zip` contains a README and exactly two PNGs. ZIP integrity check passed; both PNGs are 1374 × 1145 RGB. The ZIP is a conversation attachment, not a GitHub binary path. Exact hashes:

- `defensive-recovery-approved.png`: SHA-256 `e25745a6c649fee6ea517d3c42963d6624298536f359f6331e8149d6338278de`, generation `68bf4c4e-97a2-4895-96ef-8d0ae930beca`.
- `made-two-point-jump-shot-approved.png`: SHA-256 `0320a14f84ee8ca93bed7235d476e6d0508d8cc9ce1456527acf1f25b89e3ffb`, generation `4ef22098-6f4d-42c8-a2d6-8e8a1f7ab309`.

## Visual inspection — provisional, not release PASS

**Defensive recovery:** basketball basket is ahead of attacking direction; Charlotte (pink headband, white/purple) is visibly sprinting alongside black/red attacker. One foreground basketball appears red/navy/white and without readable logo; exact panel-match against canonical loose-ball reference NOT TESTED. No readable fixed score, names, team text or jersey numbers seen. Visible players: three white/purple, two black/red; background spectators are not on-court players. The opponent appears to control the ball while another white/purple defender is already set in front of them. **Event-stage BLOCKER:** this is a recovery action in progress, not a neutral pre-choice prompt; only map after a selected recovery action when engine trace supports these positions. Exact Charlotte master side-by-side NOT TESTED. Result: NOT RELEASE CLEARED.

**Made two-point jump shot:** ball visibly dropping through net; image therefore exclusively an engine-confirmed made two-point outcome, NEVER opportunity/attempt/miss. Ball red/navy/white with no readable branding; exact canonical panel-match NOT TESTED. No readable fixed scoreboard, names, team logos or jersey numbers seen. Visible players: three white/purple, three black/red (within five per side). Shot distance and arc must be matched to engine-confirmed two-point event; exact master identity and preservation side-by-side NOT TESTED. Result: NOT RELEASE CLEARED.

## Bounded next actions for Work / binary-capable workflow

1. Take exact ZIP bytes, verify both SHA-256 hashes, compare each image to the accessible approved Charlotte master and canonical loose-ball basketball reference. Do not fabricate references from generation IDs; request actual source binary if inaccessible.
2. Verify both images' complete artwork/geometry/identity compliance. Record PASS/FAIL/NOT TESTED for each gate with evidence. Do not rewrite approved imagery without Jared's separate approval.
3. If and only if QA passes, add versioned binary assets without touching protected `charlotte.png`, `contest.png`, `rebound.png`; add manifest containing hash, scene ID, engine event and stage. If QA fails, preserve approved original and prepare minimal derivative for Jared review; do not integrate.
4. Map made two only to confirmed two-point make; recovery only to truthful post-choice recovery action. Keep court/copy fallback for unsupported stages. Do not modify engine mechanics, content or other image families in this package.
5. Run deterministic event trace checks and live visual regression; record evidence before certification. Full-library recovery and other previously identified branding/ball defects remain separate open work.

**Status:** two recovered binaries verified locally; provisional visual review completed; character-reference comparison, exact ball-reference comparison, event trace mapping, binary GitHub upload and live QA OPEN.

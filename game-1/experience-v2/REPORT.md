# North Star v2 implementation and review report

The extended slice is implemented and works locally with all three illustrations. The separate Carryo HTML is published, but its artwork is not hosted yet. Online visual acceptance therefore fails. This is not experience certification.

## Files and purpose

| File | Purpose |
|---|---|
| `director.mjs` | Decision/action/outcome beats; queued real controls; automatic progression; deterministic scenarios. |
| `court.mjs` | Stable roster, semantic court coordinates, one ball, baskets and SVG court. |
| `ui.mjs` | Persistent DOM, real decision buttons, animation, outcome art and developer-only observations. |
| `style.css` | North Star blue game world, wood court, team colours, cards, dynamic emphasis and narrow layout. |
| `prepare-entry.mjs` / generated `slice-game.mjs` | Separate bounded entry into unchanged production handlers, including three-point QA. |
| `build.mjs` / `index.html` | Standalone presentation bundle using the certified engine. |
| `serve.mjs` | Local preview on port 4174. |
| `assets/charlotte.png`, `assets/rebound.png`, `assets/contest.png` | Decision portrait and two contrasting real consequence illustrations. |
| `../tests/experience-v2.test.mjs` | 23 added tests, including trace parity, sequencing, identity, geometry and free throws. |
| `verify-browser.mjs` / `evidence/` | Recorded real browser actions, screenshots, console output and deterministic replay verification. |
| `ARTWORK.md` | Exact final prompts, generation method and identity checks. |
| `DEFECTS.md` | Defects found during implementation and publishing. |
| `sites-preview/` | Registered complete static Sites preview, with the same HTML and artwork. Not deployed. |
| `north-star-v2-preview.zip` | Portable complete website: index.html and all artwork. |

The existing v1 presentation, build file, court renderer and v1/draw tests were copied unchanged from the other project checkout into this workspace so the existing regression suite could run here. No synced `sources/` file was edited.

## Protected basketball foundation

The engine, content and game-controller files matched the v1 checkout byte for byte before work began. The canonical Carryo page was read before and after implementation: it remains **v33 with identical HTML**. The v1 Carryo page remains **version 2 with identical HTML**.

Canonical bundle SHA-256:

`edaa7a7c093889713c7c38feca9b8f20e145c1acafaf3c0fda8365743ba9ff72`

V2 does not modify those files or deployments. It imports the existing engine. A generated, separate authoring-controller copy adds only a slice setup branch: start, advance 24 seconds through the existing bounded clock operation, record an opening interception, advance to Falcons possession, and retain P02 as the next Magic anchor. The slice starts at 19:36. This corrects v1's endpoint limitation without changing any production decision, probability, scoring or result handler. The three-point QA entry uses the same setup and existing defensive-shot handler.

A source contract removes that additive entry and verifies the remainder equals the original controller exactly. Original full-game and existing fixture controls also produce identical traces. Draws after two 20-minute halves remain unchanged.

## Five layers and North Star implementation

**Engine:** the production engine resolves basketball. Presentation makes no random draws, awards no points, chooses no rebounder and writes no possession state.

**Court:** ten numbered tokens, one pink Charlotte, purple Magic, red Falcons, a single basketball, court lines and both baskets. Casey approaches Charlotte, who is between her and the basket. A three-pointer begins outside the drawn arc. The loose ball has no player owner. Magic transition towards the opposite basket only after the engine awards possession.

**Words:** short event-specific sentences explain the current moment. Choices are short labels mapped one-to-one to existing production choices, without a preselected correct answer.

**Characters:** the focused portrait establishes Charlotte; the closeups show her actual rebound and Casey's actual made basket through a good contest. Jersey identities agree with court and copy.

**Movement:** stable SVG elements interpolate between positions, the ball transfers between carriers, and a separate unowned flight animation connects shooter and basket. Animation represents engine events; it does not simulate or decide them.

The first reference informs the persistent scoreboard/court, side rosters, strong blue/cyan framing, Charlotte panel and separate consequence area. The newer doctrine deliberately replaces its obsolete teams/quarters, prehighlighted choice, XP badge, simultaneous decision/outcome and Continue button. The second reference informs only the warm U10 action artwork. No interface text is baked into gameplay art.

## Director, pacing and language

Decision beats pause indefinitely for a real choice. A choice removes the buttons and queues the existing control. Action and flight are visible before resolution is shown. Ordinary automatic beats last about 1.2–2.6 seconds; illustrated consequences last 4.4 seconds. The next meaningful decision stops automatic progression again.

The court remains present. Decision mode emphasises short copy and choice cards; action mode reduces the story panel; an illustrated outcome replaces that panel and gives the closeup more room while retaining a smaller court.

| V1 wording / interaction | V2 |
|---|---|
| “They have the ball. Find your player.” | “Casey drives towards the basket.” / “You’re in her way.” |
| “You chose … Watch the ball towards the basket.” | “Casey shoots!” followed by visible flight. |
| “Find the rebound” button | Automatic miss beat, then “The rebound is up for grabs!” and a real rebound decision. |
| “See where we go” / “Follow the play” | Automatic consequence and visible transition. |
| Generic rebound result | “You grab it! Great rebound!” only when the engine selects Charlotte. |
| Good-choice praise regardless of scoring outcome | “Great defence — but Casey makes a tough shot!” for an actual raised-hand contest and made two-pointer. |

The primary route now continues through Charlotte calling for the ball, catching it, attacking her defender, choosing a shot and seeing the real result. It ends at a slice boundary, not a fabricated final whistle.

## Identities and artwork

Magic: Charlotte 10, Mia 5, Zoe 6, Avery 11, Harper 14. Falcons: Casey 9, Taylor 4, Morgan 6, Riley 7, Jordan 12. These are stable presentation identities for the engine's you/teammate/opponent categories; no individual statistics or new mechanics were invented.

The rebound illustration shows Charlotte owning one ball, with Casey 9 and Jordan 12 nearby. The court places those opponents near her. The contest illustration shows Casey 9's ball going through the hoop while Charlotte 10 contests legally. That close-range illustration is excluded for three-point baskets. The portrait does not imply a shot outcome or ball ownership. Prompts and project asset paths are in `ARTWORK.md`.

## Responsive behaviour

Large screens show side rosters and Charlotte beside the decision cards. Narrow screens collapse rosters and the portrait, preserve score → court → situation → choices, and stack large touch targets. Illustrated outcomes stack artwork above one short result message. The verified narrow viewport is 390×844; scrollbars sometimes reduce content width to 375px. No horizontal overflow was observed in accepted runs.

The first nominal mobile attempt remained desktop-width, and an early full-page screenshot distorted viewport rendering. Those captures are diagnostic only. Narrow acceptance uses the repeated `r2` viewport captures and actual recorded DOM dimensions.

## Deterministic QA

Use `?qa=1&scenario=NAME` for developer tools; add `&player=1` to keep the same deterministic route with all developer controls hidden. Ordinary URLs retain normal random inputs.

| Scenario | Coverage |
|---|---|
| `primary` | Defence → contest → miss → Charlotte rebound → transition → off-ball choice → handling → shooting → basket. |
| `mixed` | Raised-hand contest → Casey makes a difficult two → Magic attacking involvement and outcome. |
| `teammate` | Mia wins the rebound. |
| `retained` | Falcons offensive rebound and real second chance. |
| `steal` | Charlotte's defensive pressure produces a steal. |
| `foul` | Shooting foul, made free throw, missed last free throw and live rebound. |
| `three` | Casey shoots from beyond the actual three-point arc. |

All scenarios use production handlers. Scripted values are random inputs, not prewritten basketball outcomes.

## Automated and browser QA

**105/105 automated tests pass:** all 66 original tests, 16 v1/draw tests and 23 v2 tests. All 27 tactical combinations retain exact direct-production trace parity. Two hundred ordinary seeds with varied decisions finish and exercise made, missed, blocked and fouled shots. The tests cover no premature shot/rebound resolution, stale clicks, automatic stopping, stable identities, one ball, opposite attacking direction, three-point geometry, matching artwork and unchanged source.

Local browser primary and mixed routes pass at desktop and verified narrow dimensions, including loaded artwork. Primary uses Stay in front → Hand up — contest → Go for the ball → Call for the ball → Drive to the basket → Fake, then layup, ending Magic 2–0. Mixed uses the same path without the rebound decision and ends 2–2.

Alternate browser runs click all three defence, shot-defence, rebound, off-ball and handling choices, and all four shooting choices. These are physical browser control clicks, with DOM observations saved before and after. Exact route names, widths, clicked labels, results and replay checks are in `evidence/browser-verification.json` and the per-route JSONL files.

The deployed browser regression recorded 11 routes and 58 physical control clicks, covering all 19 distinct player choices. Settled local image checks confirm all three assets load; initial frame samples can precede image decoding and are retained separately in the evidence.

Published Carryo primary/mixed routes and clean random mode reach their expected slice endpoints without continuation controls. **The deployed visual regression fails because all hosted artwork is missing.** A completed control route is not counted as a successful experience acceptance test. Final hosted artwork and the two viewport regressions must pass before readiness.

## Deployment and remaining blocker

- Canonical v33, unchanged: https://share.carryo.io/charlotte-step-2-2-possession-test
- Separate Carryo v2 player URL, currently incomplete artwork: https://share.carryo.io/JSsAJ97BPwi5er5B
- Developer QA: https://share.carryo.io/JSsAJ97BPwi5er5B?qa=1&scenario=primary
- Clean deterministic primary: https://share.carryo.io/JSsAJ97BPwi5er5B?qa=1&scenario=primary&player=1
- Clean deterministic mixed: https://share.carryo.io/JSsAJ97BPwi5er5B?qa=1&scenario=mixed&player=1
- Complete local review: http://127.0.0.1:4174/?qa=1&scenario=primary&player=1

Carryo's connector rejects the host's local-image attachment mapping. Its signed-in browser library provides no image-upload control. Jared authorised publishing the complete preview with Sites and importing its public image URLs into Carryo. Sites registration succeeded, but source upload is blocked by the task's outbound network restrictions. No Sites version or deployment was claimed. The registered Site is retained in `sites-preview/.openai/hosting.json`; do not create a replacement.

To resume: use execution with outbound Git access, push the already committed Sites checkout to its registered repository using a fresh credential if necessary, package/save/deploy that exact source, import the three public image URLs into the existing Carryo v2 link, then repeat desktop/narrow primary and mixed visual regressions. The portable ZIP also contains the full working preview. No credential is stored in the project or ZIP.

## Acceptance and deferred work

The local implementation satisfies the Wide Camera, Words, Decision, Close-Up, Continuity, Attention and North Star checks by implementation review and browser inspection. U10 comprehension still requires Jared/Charlotte's review; it is not inferred as a user-study result.

Definition-of-Done items 1–19 are implemented and locally verified. Item 20 fails online because the artwork is unavailable. Item 21 has separate URLs but not a complete online player experience. Consequently the requested overall readiness gate is not met.

Deferred deliberately: full-game presentation rollout, more outcome illustrations, sound, advanced physics, progression/XP, unrelated screens and historical specification ambiguities. The only required unfinished work is hosting the assets and passing final deployed visual QA.

NOT READY FOR NORTH STAR EXPERIENCE REVIEW — hosted artwork is blocked by publishing/network access, so final deployed visual QA does not pass.


# Permanent artwork production and QA rule — reusable, personalised game artwork

**Approved by Jared:** 17 September 2026. **Status:** binding artwork production and QA policy; additive governance only. No existing artwork or certified engine mechanics changed by this document.

## Core rule

Create narrative illustrations as reusable, identity-neutral basketball scene assets. Never bake a particular child's name, club identity, opponent identity, dynamic story copy or game-state value into a reusable image. Render personalisation and event text from the live game UI using authoritative profile and engine state. Charlotte's game must remain fully personalised through that UI without requiring a separate illustration for each child.

## Prohibited embedded content in reusable art

- Child/player names, including Charlotte, in headings, captions, signage or other visible text.
- Fixed scene headings, prompts, dialogue or outcome narration. Art should be image-only; the UI supplies these dynamically and accessibly.
- Club names, club logos, recognisable club banners or slogans, including Hawthorn Magic branding; opposition branding, including Falcons; invented logos implying affiliation.
- Fixed score, clock, period, shot clock, possession arrow or other mutable game-state information. The existing dynamic-state rule remains binding: `docs/design/artwork-production-and-qa-dynamic-state-rule.md`.
- Fixed teammate/opponent names or jersey numbers that conflict with a personalised roster. Uniform text, logos and numbers must be neutral, configurable, or omitted unless an asset is explicitly scoped to a matching identity and validated against the current state.

Replace identifiable gym branding with neutral basketball-themed architecture, abstract banners or unbranded backgrounds. No readable pseudo-scoreboards. Never merely obscure branding with misleading or inconsistent substitute text.

## Personalisation architecture

- The image layer depicts only a truthful basketball situation/action/outcome, without baked-in headings or captions.
- The UI displays the child's profile name, chosen club, opponent, contextual heading, narration, score, clock and period as applicable. The engine remains authoritative for game-state and event outcomes.
- The court/roster UI may display verified club names, logos and colours where rights and configuration permit. Do not infer permission to use a logo from its public availability.
- Character appearance, skin tone, hair, body type, uniform colours and jersey number are a separate personalisation design and implementation workstream. A text-dynamic UI alone does not make a fixed Charlotte-looking character visually representative of every child. Until that system exists, avoid claiming full visual personalisation; use neutral character assets or explicitly scoped variants where appropriate.
- Reusable scene variants are allowed only when needed to preserve basketball/event truth or a genuinely supported identity configuration; avoid one image per player or club.

## Production gates

Before generating or editing any scene, the brief must specify: situation and pre-choice/action/outcome status; engine/event mapping; ball ownership; direction and spatial facts; neutral background; absence of names, club branding, jersey-specific identity where inconsistent, captions, scores and clocks; reuse limits. Produce clean image-only masters, with headings and story text rendered by the game UI rather than composited into exported PNGs.

Human QA inspects the full image including distant signage, uniforms, bench, court decals, scoreboard fixtures and footer. Any prohibited baked-in identity/text/dynamic state is FAIL even when basketball action and visual quality are excellent. Check that no pre-choice image spoils the selected action or outcome.

## Existing approved assets and remediation

Audit all approved new images and storyboard candidates for embedded headings/captions, Hawthorn Magic/Falcons banners and uniforms, fixed numbers, clocks and scoreboards. Record PASS/FAIL/NOT TESTED by asset. Prior composition approval does not waive this rule. Preserve approved action and composition while creating clean, identity-neutral, text-free production derivatives; obtain Jared's approval before integration. Do not overwrite checksum-protected original `charlotte.png`, `contest.png` or `rebound.png`, or silently change existing production URLs. Legacy originals may remain as references and be used only when their exact visual identity and event facts match the current context; otherwise use approved derivatives or a truthful fallback.

## Release QA

Test the same integrated scene with at least two different child names and two distinct club/opponent configurations, plus different valid scores/times, confirming that all personalised text and state come from UI and no illustration contradicts them. Verify scene/event mapping, accessibility of dynamic copy, responsive display and visual truth. Record evidence and block release on identity or game-state contradictions. This policy authorises no silent gameplay changes or retroactive certification.

---

# Artwork workflow and change control v1.0 — consolidated operational rules

**Approved by Jared:** 17 September 2026. This section is the canonical operational workflow for artwork discussion, generation, review and handoff. It complements the identity and dynamic-state requirements above, rather than duplicating them in additional governance documents. The existing `docs/design/Game-1-Visual-Coverage-Matrix-v1.0.md` remains the coverage record; it is not evidence that newly discussed art has been uploaded or integrated.

## 1. Intent and authorisation gate

A question, critique, request for an opinion, 'right?', 'anything else?', 'what next?' or design discussion is NOT permission to generate or edit an image. Respond in text only. Generate/edit only on explicit production instructions (e.g. 'generate', 'make the image', 'go' following an unambiguous, immediately agreed image-production task). 'Go' authorises only that last precisely identified task, never a different asset or broader batch. If target or intent is ambiguous, clarify in text. An image prompt pasted with an image and a clear request to create/edit counts as explicit authorisation; a prompt requested *for later use* does not.

## 2. Exact asset selection and inventory gate

Before production, identify the exact unique asset, game event, shot type (layup, two-point jump shot, three-point), stage (opportunity / attempt / confirmed made / missed / rebound), latest approved version and whether it already satisfies the request. Consult the artwork register and coverage matrix; do not substitute an adjacent scene, create a duplicate, or confuse an attempt with a confirmed result. Where no register entry or accessible source image exists, mark it unverified rather than inventing one. A requested edit to a specific image requires the actual usable image/reference, not an assumed filename or an opaque ID.

## 3. Scoped change and protection gate

Write a one-objective change brief: what changes, what is frozen, game-state mapping and acceptance criteria. Protect all user-approved elements unless the user explicitly reopens them or a demonstrated release-blocking contradiction requires a separately approved derivative. For an edit, use the actual approved image as the source where available; do not silently generate a different composition or replace a protected original. Assess change impacts on player count, positioning, mechanics, character continuity, roster/identity, score/clock, and story stage. Changes to certified engine/content require their own authorised implementation and regression process.

## 4. Production checkpoint (all must pass before invoking image generation)

- Explicit authorisation exists for image production **now**.
- Exact target asset and current version are identified and accessible; any ambiguity is resolved.
- Intended change is singular and specific; approved elements to preserve are stated.
- Basketball facts, scene stage and engine/event mapping are defined without spoilers.
- Personalisation and dynamic-state requirements above are included.

If any item is unresolved, discuss or clarify in text. Never call image generation as a substitute for answering a question.

## 5. Production and independent QA gates

Generate one correctly scoped asset at a time unless a batch was explicitly approved. Perform independent checks before recommending approval:

**Basketball truth:** correct court/basket geometry, approach, shooting hand/footwork when visible, player momentum, ball ownership/trajectory, plausible defence and rebound positioning; no more than five active players per side; extra players only if their location is plausible and does not falsely claim engine-derived positions. The overhead court view, not a cinematic illustration, is responsible for faithfully showing all ten active players. A pre-choice image cannot depict the selected answer; an attempt cannot reveal the result; a made-shot image requires an engine-confirmed make and the correct shot type and value.

**Artwork truth:** consistent approved character/style and protected composition; image-only neutral art; no baked-in child/team identity, incompatible jersey numbers, text, logos, score, clock or period. Inspect background signage, uniforms, floor and scoreboards, not just foreground. Mark PASS/FAIL/NOT TESTED and list defects candidly. Attractive art does not override basketball or identity defects. An explicit user acceptance of visible imperfections records a limited visual exception, not automatic release clearance for hard game-state contradictions.

If the same defect persists across two attempts, STOP repeating near-identical prompts. Change method (e.g. supply a verified court diagram, isolate the edit, use a spatial reference) and seek authorisation for the revised method if scope changes.

## 6. Approval and status integrity

Only Jared approves artwork. Assistant QA may recommend but must not label its own recommendation as Jared's approval. Maintain unique asset ID, exact version/source reference or repository path, event mapping, status, accepted exceptions and review evidence in the artwork register. Distinguish: proposed → generated/revision required → user-approved (possibly with accepted imperfections) → stored in GitHub → integrated → tested/certified. Rejected variants cannot be selected for release. Do not claim a chat-generated image is in GitHub, Carryo or the live game until verified. Protected originals remain unchanged unless separately authorised.

## 7. Integration, coverage and regression

Keep the coverage matrix mapped to actual event families and shot types; avoid duplicate art and mismatched stage mappings. Before integration, audit the chosen exact file and manifest. Test the correct art for made/missed two-point jump shots, layups and threes, including pre-result suspense; check live score, clock, possession, roster and club variants, responsiveness and text accessibility. Confirm background players do not contradict authoritative state. Integration and live QA are separate from aesthetic approval; no retroactive certification.

## 8. Failure feedback and document hygiene

Classify each failure as authorisation, asset selection, scope/change, generation, basketball QA, identity QA, integration or test escape. Fix the responsible checkpoint and demonstrate it works before adding more governance. Consolidate operational changes here; retain the existing dynamic-state rule and visual coverage matrix as separate domain authority/record rather than creating overlapping bibles. The workflow is: Discuss → Identify → Scope → Authorise → Produce → QA → Jared approves → Store/integrate → Test.

**Current scope note (17 September 2026):** Jared's latest request concerns adding believable supporting players to the approved **Made Two-Point Jump Shot** illustration only. Three-point and layup images are outside that edit's scope. This note records intent, not generation authorisation, an asset upload or completion.

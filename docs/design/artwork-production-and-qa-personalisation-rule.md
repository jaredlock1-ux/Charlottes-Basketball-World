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

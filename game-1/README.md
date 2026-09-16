# Charlotte’s Basketball World — Game 1

ChatGPT Project Chat is the product/game-design authority. Codex is the primary engineering implementation environment. Carryo is the deployed player experience. Maintain engine/content/UI here under the approved source of truth; build and verify the single HTML artifact and update the existing link with version-conflict protection.

Live: https://share.carryo.io/charlotte-step-2-2-possession-test

Recorded certified technical engine baseline: Carryo 33 / engine 1.4.0. See QA-REPORT.md. This README is implementation/repository documentation, subordinate to the broader approved specifications and bibles under the [authority hierarchy](RULES.md#product-authority-and-specification-change-control).

## Files

- `src/engine.mjs`: score, clock, possession and physical outcome resolvers.
- `src/content.mjs`: choices, narration and the authored 30-slot spine.
- `src/game.mjs`: live event/decision orchestration and deterministic fixtures.
- `src/ui.mjs`: rendering and actual button handlers.
- `src/contracts.mjs`: isolated public contract checks.
- `reference/`: original Carryo v32 and recovered specification text.
- `dist/game-1.html`: reproducible deployment bundle.
- `tests/`: engine and full-game tests.
- `evidence/`: final browser observations and verification records.

## Commands

Requires Node 24. No third-party dependencies.

```text
npm test
npm run build
node serve.mjs
npm run verify:evidence
```

The local preview listens on 127.0.0.1:4173. Add `?qa=1` to expose direct fixtures. Fixtures use the same engine and controls as production. The regular page hides the development tools.

The source directory mirrored from ChatGPT remains read-only and was not changed. RULES.md records the source hierarchy and Jared's explicit draw decision.

## Development process and document ownership

Process amendment agreed in ChatGPT Project Chat and recorded on 15 September 2026:

**ChatGPT Project Chat → Codex → Live Carryo → automated QA → live browser QA → Jared/Charlotte playtest → certification.**

Local automated checks also run before deployment. After deployment, confirm the actual published build and run the applicable automated/live contract checks before browser QA. A local pass alone does not prove Live Carryo is running the tested implementation. The reported Build Control Register certification/deployment tension is [unresolved](RULES.md#historical-source-conflicts-and-limits); this implementation-facing workflow does not silently settle that unavailable original's meaning.

Use the existing documents as follows:

| Repository document | Implementation-facing purpose |
|---|---|
| [RULES.md](RULES.md) | Summary of source requirements, approved decision records, authority hierarchy, architecture controls and unresolved source conflicts; not a replacement specification. |
| This README | Implementation-facing workflow controls summarising the agreed process: Experience Layer Gate, change-impact classification and Definition of Done; not the broader Development/Governance Bible. |
| [QA-REPORT.md](QA-REPORT.md) | Exact certified version, historical evidence, certification scope, requirement/test/live traceability and release/rollback records. |
| [DEFECTS.md](DEFECTS.md) | Defect diagnosis and closure history; future feedback must enter the process below. |
| [reference/recovered-specs.md](reference/recovered-specs.md) | Preserved historical quotations. RULES.md points to approved product amendments and flags unresolved conflicts without replacing or rewriting those sources. |

The synced project sources are unavailable in this mirror. These local documents do not replace missing project bibles or specifications and cannot overrule them. See RULES.md for the [source-access inventory](RULES.md#available-sources-and-unavailable-originals) and unresolved conflicts. Preserve recovered quotations as evidence. Product authority approves changes in the relevant specification/decision record; RULES.md records an implementation-facing reference or summary with provenance, not a new source of product authority. An unavailable original must be marked unavailable, not recreated. Do not create a separate Codex Bible or copy governance into competing authorities.

### Feedback to implementation package

Do not send individual feedback directly to implementation. First diagnose the observation, resolve intended behaviour with the product authority, update the relevant authoritative specification/requirement and acceptance criteria, and consolidate related changes into a coherent implementation package. Updating a repository summary alone does not amend the authoritative specification; if the original is unavailable, record the access gap and product-authority decision without fabricating or claiming an upstream edit. Only then implement in Codex.

Each package identifies its authoritative requirements, intended behaviour, scope, change-impact classes, acceptance criteria, required automated and browser checks, experience-validation needs, target version and rollback point. Link the decisions and evidence rather than duplicating their full text. If ambiguity affects basketball behaviour, scoring, possession, available decisions or intended player experience, stop the affected work and surface it to ChatGPT Project Chat/Jared for resolution; record the decision before implementation. Routine engineering details may be resolved autonomously.

### Experience Layer Gate

Before broad experience-layer implementation, define and resolve in the authoritative design record:

1. Intended experience: what Charlotte should notice, understand, decide and feel.
2. Relevant certified engine states and transitions the experience must represent.
3. The Game-State/Presentation Contract and presentation/court states, including ball ownership/location, Charlotte, other players, decisions, outcomes and transitions as relevant.
4. Observable acceptance criteria for state fidelity, comprehension, basketball realism, decision/outcome understanding and enjoyment.
5. A small end-to-end vertical slice, its required technical QA and Jared/Charlotte validation.

Sequence the design as **Experience Contract → Court-State Model → vertical slice**. Prove the slice before broad implementation. Apply progressive fidelity: prove comprehension with simple representations (for example circles, Charlotte highlighting, ball possession and player positions) before investing in visual polish, animation and richer characters. This amendment establishes the gate; it does not approve or define the next experience implementation.

### Change-impact classification

Classify each change before implementation; apply all relevant classes. Classify by behavioural effect, not just the file edited.

| Class | Scope | Required validation |
|---|---|---|
| Engine | Basketball outcomes, scoring, clock, possession, state transitions or available-decision logic, including such effects introduced through content/UI | Full certified regression: automated suite, applicable live contracts/fixtures, all six required route criteria, score/rebounds/possession/both halves/final-result verification and deployment identity. Deliberate specification changes require re-certification. |
| Content | Authored choices, story or character material | Requirement/acceptance checks and affected live routes; add Engine if logic or outcomes change. Apply the Experience Layer Gate and experience validation where relevant. |
| Presentation | Court, rendering, interaction or other representation of engine state | Contract/state-fidelity checks and live browser QA; add Engine for behavioural effects. Apply the Experience Layer Gate and experience validation where relevant. |
| Test | Automated tests, fixtures or evidence verification | Validate against authoritative requirements; demonstrate that assertions preserve required coverage and cannot silently redefine certified behaviour. Re-run affected checks and live proof where applicable. |
| Governance | Documentation and process | Review authority, links, consistency and amendment coverage. Documentation-only changes do not require deployment or imply fresh gameplay certification. Any proposed behavioural specification change still requires a separate implementation and re-certification package. |

### Definition of Done

For an implementation package, Done requires completed implementation, passing required tests, confirmed live deployment of the tested version, passing live browser QA, regression protection for certified behaviour, retained evidence and an identifiable rollback point. Where applicable, Jared/Charlotte experience validation must also pass. Record technical certification and player-experience certification separately using QA-REPORT.md as the repository evidence record, under the approved acceptance/certification specification.

Until every applicable gate passes, use **implemented, awaiting certification** and identify the outstanding gate. Charlotte playtesting follows functional QA and evaluates comprehension, basketball realism, decision/outcome understanding and enjoyment; it is not basic functional QA.

For this Governance-only amendment, Done means reviewed documentation and consistency checks. It does not entail a game build, deployment, code change or new certification.

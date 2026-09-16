# Game 1 implementation-facing rules summary and decision record

Scope: this repository document summarises the v33 implementation baseline and records references to approved product decisions. It is not the Master Game Specification, a Game-specific Specification or a Development/Governance Bible. Its local requirement identifiers and acceptance summaries do not redefine basketball specifications.

Source provenance: the repair used the original Complete Possession Tree v1.0 text and reported current three-choice behaviour/acceptance contracts recovered through Project Reflection Lessons at Jared's request. [reference/recovered-specs.md](reference/recovered-specs.md) preserves recovered text and citations, not a directly accessible original file or replacement Bible. See the authority hierarchy and source-access inventory below.

The original project `sources/` directory was empty. No synced files were changed.

- Two 20-minute halves, explicit tip at 20:00, real halftime, state carries over.
- 30 authored slots are story anchors and branches, not runtime possession numbers or a 30-screen sequence.
- The preserved v33 authored backbone uses P18 for halftime, P19 for restart and P30 for final whistle. This records certified implementation behaviour; conflicting historical slot numbering remains unresolved in the source text (see Historical source conflicts and limits).
- Runtime possession IDs increase only after a resolved possession. An offensive rebound retains the same ID.
- Background possessions take approximately 8–25 seconds and end with actual shots, turnovers, rebounds or the horn. No silent clock truncation.
- 12–18 meaningful decisions; optional anchors yield to the decision budget. Continuation and individual free-throw controls are not tactical decisions.
- Three normal choices; exactly four locked shooting choices. The newer three-choice contract supersedes the earlier five-move discussion, confirmed by source retrieval.
- The source P09/P22 shots are two-point opportunities. Three-point background attempts announce their location and value before the shot outcome. Appropriate shooting fouls give two individual free throws.
- The final missed free throw remains live for a rebound unless the period has expired.
- Outcomes are engine-resolved from seeded input and action/state probabilities. No action selects a rebound winner or guaranteed basket.
- Second-half restart follows the next possession implied by the first-half ending, matching P19. No hardcoded restart ID or score reset.
- Result follows actual scoring events. No forced Magic win.

## Design gap closed by Jared, 14 September 2026

The recovered sources did not provide a locked draw/overtime rule at 0:00. Jared's explicit product decision was **tie at final 0:00 after two halves → draw; no overtime**, reaffirmed in the final governance reconciliation request. This approved product amendment supersedes recovered historical P30 win-only wording. This paragraph records that decision and its existing v33 implementation; it does not originate a basketball rule or claim that an unavailable original specification has been edited.

## Implementation interpretations

Historical implementation record only: the following describes the certified v33 repair. It does not settle unresolved source-text conflicts or authorise future interpretations. Preserve v33 while product authority resolves those conflicts.

Anchor times are approximate. An anchor waits for the required team through resolved live possessions; it cannot teleport possession to match the script. Late-game slots follow actual score and owner. Optional decisions can be skipped to reserve shooting opportunities in both halves and final pressure.

Continuous background play is shown as short attempt/result pairs with an accessible recap. It is not a silent multi-minute jump. A final possession may expire without a released shot; an attempt released before the horn resolves before the period ends. Free throws awarded before the horn complete with the clock stopped.

## Product authority and specification change control

The intended document hierarchy, supplied by Jared in the final governance reconciliation request on 15 September 2026, is:

**Master Game Specification → approved Game-specific Specification(s) → Development/Governance Bible → approved implementation decisions → implementation/repository documentation → live Carryo → experiments.**

ChatGPT Project Chat is the product/game-design decision forum; approved decisions must be reflected through this document hierarchy. Codex is the primary engineering implementation environment and Carryo is the deployed player experience. None of those platform roles elevates this repository above the broader specifications or bibles.

README.md, RULES.md, QA-REPORT.md and DEFECTS.md are implementation-facing summaries, controls, decision references and evidence records at the implementation/repository documentation level. An approved implementation decision cannot silently override a higher specification. A deliberate product amendment, such as Jared's draw decision, must be identified as such; its approval is the source of authority, not the repository entry recording it.

The recovered Complete Possession Tree explicitly places itself beneath the Master Game Specification; that relationship is compatible with the intended hierarchy. No conflicting explicit hierarchy was directly found in the available source text. The unavailable original bibles cannot be checked. If an accessible authoritative document establishes a different explicit hierarchy, preserve it and report the conflict for product-authority resolution rather than overwriting it.

Preserve recovered source text as historical evidence. For an approved amendment, record its source decision/date, affected specification passage and revision if available, intended behaviour and acceptance criteria; then link the repository summary to tests and live proof in QA-REPORT.md. Do not invent an upstream requirement identifier or claim an unavailable original was updated. The local G1 identifiers below are traceability aliases, not new authoritative requirements.

Protect **Game 1 Carryo v33 / engine 1.4.0** as the certified engine baseline identified in QA-REPORT.md. Certified behaviour must not change unless the underlying specification is deliberately changed by the product authority and the resulting implementation is subsequently re-certified. A presentation preference, isolated feedback item, test edit or historical excerpt is not implicit permission to alter the baseline.

If an ambiguity could change basketball behaviour, scoring, possession, available decisions or intended player experience, stop the affected work and surface the ambiguity. Do not invent an interpretation or use implementation convenience to settle product intent. Have product authority resolve and record the authoritative requirement/acceptance criteria before packaging implementation; this repository retains the corresponding reference and explicitly records any unavailable upstream document. Follow the workflow and Experience Layer Gate in README.md.

## Engine and presentation architecture

Implementation-facing summary of the approved architecture amendment, subordinate to the hierarchy above; not a replacement Platform Architecture or Engine Specification.

**Basketball Rules → Certified Game Engine → Game-State/Presentation Contract → Court + Story + Characters → Player Experience.**

Basketball Rules define valid behaviour. The Certified Game Engine owns basketball state and resolves outcomes. The Game-State/Presentation Contract defines how engine states and transitions are exposed to the court, story and characters. Presentation represents engine state; it does not independently determine basketball outcomes, scoring, possession, rebound winners or final results. Presentation must communicate the available engine-authorised decisions and their actual outcomes faithfully.

The Experience Layer Gate in README.md requires intended experience, relevant certified states, presentation/court states, acceptance criteria and a small vertical slice before broad implementation. That future contract must be designed through product authority; this architecture does not invent its detailed states.

## Baseline requirement references

These local identifiers summarise requirements and approved decisions used by the certified v33 implementation; they are traceability aliases, not authoritative specification IDs. Read them with the source-access and conflict limitations below. QA-REPORT.md records their test/live evidence mapping and does not define the underlying basketball specification.

| Local reference | Implementation-facing acceptance summary |
|---|---|
| G1-SCORE | Scores derive from actual made baskets/free throws; both teams' totals persist and the final result matches them. |
| G1-REBOUND | Charlotte, teammates and opponents can win rebounds through engine resolution. Offensive rebounds retain the runtime possession ID; defensive rebounds transition coherently. |
| G1-POSSESSION | Runtime possession IDs are separate from authored slots and increase only after resolution; story and ball ownership remain consistent. |
| G1-HALVES | Two complete 20-minute halves, one real halftime with state retained, coherent restart and final whistle; no silent clock deletion. |
| G1-DRAW | Equal scores at final 0:00 after two halves finish as a draw; no overtime. Preserve the existing pre-horn shot/free-throw completion rules above. |
| G1-CHOICES | Three normal choices and four locked shooting choices; 12–18 meaningful decisions, shooting in both halves, and no guaranteed basket/rebound winner from an action. |
| G1-ROUTES | Cover all six specified behavioural routes/criteria, with coherent score, rebounds, possession, both halves and final results. |

## Historical source conflicts and limits

- **Unresolved — possession-slot numbering:** the recovered Complete Possession Tree uses P18 halftime/P19 restart; the recovered Playable Map calls P18 a shooting sequence/P19 a Falcons push. v33's existing mapping is preserved, but this does not resolve or rewrite either historical text. Product authority must reconcile the source numbering before any affected implementation change.
- **Resolved by explicit product amendment — final draw:** historical P30 names only Magic/Falcons wins. Jared's explicit tie at 0:00 → draw; no overtime decision supersedes that win-only wording, as recorded above.
- **Unresolved — possession retention:** the recovered engine-contract list includes retaining possession after made shots/free throws, while its detailed shot contract says a made basket ends possession and the opponent inbounds. Do not silently choose or rewrite a textual interpretation. Preserve certified v33 behaviour and surface the conflicting passages to product authority before any affected change.
- **Unresolved — scripted game conditions:** “score remains close by design” and scripted possession owners can conflict with the recorded v33 state-driven implementation. This reconciliation does not settle the intended meaning of those historical passages. Preserve v33 and ask product authority to resolve them before any affected change.
- **Unverified governance tension:** the accessible Project Reflection Lessons conversation reports that Build Control Register v1.2 says the live/canonical game is immutable until certification. The agreed workflow includes Live Carryo before automated/live QA and certification. The original register is unavailable, so whether this means a protected certified release versus a deployment candidate cannot be established here. Do not invent that distinction as an approved resolution or rewrite the reported rule; surface it before a future deployment package depends on it.
- The recovered Playable Map ends partway through its halftime passage and its original ChatGPT file citations do not expose accessible source files here. Recovered excerpts and conversation summaries do not establish access to the full original specifications.
- The existing Implementation interpretations section is a historical v33 record, not permission to resolve new ambiguities or a textual reconciliation of the sources.

## Available sources and unavailable originals

Access check: 15 September 2026. Searched the selected local project (no project documents), the linked ChatGPT project mirror including its empty synced sources/ directory, the recovered reference text, the Project Reflection Lessons source-retrieval conversation, and connected document sessions (none available). The conversation exposes source quotations/summaries and opaque content-reference indices, not downloadable originals through the available interface.

| Requested authoritative source or equivalent | Actually accessible | Original-file status |
|---|---|---|
| Master Game Specification | Its relationship to the Complete Possession Tree and limited quotations/references in recovered text and project chat | Full original unavailable |
| Development / Governance Bible | Project-chat references; README.md contains repository workflow controls only | Original unavailable |
| Platform Architecture | Repository summary of the approved architecture amendment; not the original architecture document | Original unavailable |
| Golden Game / Possession Engine Specification (including Game 1 Engine Specification / behaviour-engine contracts) | Partial engine/background contracts in the recovered Playable Map and limited chat quotations/summaries | Full originals unavailable |
| Game 1 Acceptance & Certification Specification | Limited chat quotations/references to locked choice counts and required routes; QA-REPORT.md is implementation evidence only | Full original unavailable |
| Game 1 Story & Experience Specification | Project-chat references; recovered possession-tree story text is a separate historical source | Original unavailable |
| QA / Architecture Notes | Local QA-REPORT.md and recovered architecture passages are available implementation/reference material | Broader original unavailable |
| Defect & Change Log | Local DEFECTS.md and historical QA findings in project chat are accessible; they do not replace a broader log | Broader original unavailable |
| Complete Possession Tree v1.0 | Complete recovered tree text reproduced in reference/recovered-specs.md, including its Master-specification precedence statement and change log | Original file unavailable; recovered textual copy accessible |
| Game 1 Playable Possession Map v1.0 | Partial recovered excerpts, ending mid-passage | Full original unavailable |
| Build Control Register v1.2 | Reported source summary in Project Reflection Lessons, including the certification/deployment tension above | Original unavailable |

Provenance for chat material: Project Reflection Lessons (conversation 6aa7b4ef-7804-83ec-86e5-178e0f65b9c4), source retrieval turn 84b3590e-ee73-4144-8fa6-099cdf2dec52 and source-only clarification turn 54e64c63-ab5e-487b-9a63-f4aee7e7a591. These are retrieval references, not substitutes for original documents.

No original authoritative bible/specification was directly available for in-place reconciliation. No original, recovered quotation or synced source was edited or recreated. Only the four existing repository documents were reconciled within these access limits.

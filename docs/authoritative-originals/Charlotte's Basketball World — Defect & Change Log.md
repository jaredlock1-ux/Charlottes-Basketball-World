# Charlotte’s Basketball World — Defect & Change Log

**Status:** LIVING PROJECT CONTROL RECORD
**Updated:** 14 September 2026  
**Purpose:** Record material defects, root causes, approved changes, validation evidence and regressions.

This is a project record, not a source-of-truth specification. Rules belong in the relevant specification; this log records what changed and why.

---

## Defect Classification

- **CONTENT:** wording/story/content error
- **PRESENTATION:** visual/layout/interaction issue without state impact
- **LOGIC:** incorrect state transition or outcome
- **ARCHITECTURE:** violation of an engine/design contract
- **PROCESS:** failure to follow the development method

If the same class of defect occurs twice, assess whether the underlying process or architecture must change.

## Required Record

| ID | Date | Type | Severity | Problem | Root cause | Specification/change | Acceptance test | Regression | Status |
|---|---|---|---|---|---|---|---|---|---|
| G1-001 | 13 Sep 2026 | ARCHITECTURE | Critical | Rebound path awarded/appeared to award points without a new shot | Score causality was not enforced structurally | Separate rebound from subsequent shot resolution | Score causality + rebound chain | Required | Closed in specification; implementation certification pending |
| G1-002 | 13 Sep 2026 | ARCHITECTURE | Critical | Player could select make/miss/block | Player decision and engine outcome were conflated | Player selects shot type; engine resolves outcome | Decision/outcome separation | Required | Closed in specification; implementation certification pending |
| G1-003 | 13 Sep 2026 | PROCESS | Critical | Live implementation was changed before relevant specification/acceptance gates were completed | Deployment occurred before proof | Mandatory pre-live gate added | Development process audit | Required | Closed |
| G1-004 | 14 Sep 2026 | LOGIC | Critical | Shooting controls rendered but tapping a shooting choice failed at the decision validator | UI click path routed shooting choices through normal three-choice validation | Explicit interaction-integrity contract and type-aware click-path test | Interaction Integrity: every shooting control must execute successfully | Required | Fixed in Carryo v25; live traversal pending |
| G1-005 | 14 Sep 2026 | PROCESS | Critical | Button defect was not caught before user live testing | Certification proved control presence/structure but did not execute every player-facing control in the implemented build | Added mandatory Interaction Integrity gate and exact published-build traversal as Show-Ready blocker | Interaction Integrity + Live Experience Certification | Required | Process updated; certification pending |

## Change Register

| ID | Date | Change | Authority | Version impact | Evidence | Status |
|---|---|---|---|---|---|---|
| CHG-001 | 13 Sep 2026 | Formal five-document project architecture established | Development Bible | Process baseline | Document set created | Active |
| CHG-002 | 13 Sep 2026 | Decision/outcome separation made an explicit immutable contract | Development Bible + Engine Spec | Engine version increment required | Acceptance tests | Active |
| CHG-003 | 13 Sep 2026 | Deterministic testing, negative testing and inspectable replay required | Development Bible | Process/engine requirement | Certification specification | Active |
| CHG-004 | 14 Sep 2026 | Interaction Integrity made a mandatory gate; rendered controls require actual end-to-end execution; exact published-build interaction is a Show-Ready blocker | Development Bible + Acceptance & Certification | Process/implementation version increment | Interaction tests + live traversal requirement | Active |
| CHG-005 | 14 Sep 2026 | Added hidden QA Harness/Test Mode for deterministic direct-entry interaction testing, reducing redundant manual replay while preserving natural play-testing and live certification | Development Bible + Acceptance & Certification + Story & Experience | Process/QA version increment | QA Harness direct-state traversal requirement | Active |
| CHG-006 | 14 Sep 2026 | Added formal ChatGPT → Work Development Gate: ChatGPT owns product/design resolution and release consolidation; Work owns batched engineering execution; ChatGPT proactively declares WAIT/BATCH, IMMEDIATE WORK HOTFIX or WORK HANDOFF READY | Development Bible v1.6 | Process/governance version increment | Handoff readiness checklist + single authoritative implementation package requirement | Active |
| CHG-007 | 14 Sep 2026 | Standardised every Work handoff as one Authoritative Release Package with fixed scope, protected behaviour, acceptance, regression, QA, deployment and definition-of-done fields | Development Bible v1.7 | Process/governance version increment | Release Package template | Active |
| CHG-008 | 14 Sep 2026 | Added mandatory Work Evidence Return Contract and explicit ENGINEERING CERTIFIED / NOT CERTIFIED / BLOCKED status | Development Bible v1.7 | Process/governance version increment | Standard engineering evidence package | Active |
| CHG-009 | 14 Sep 2026 | Separated Engineering Certification from Jared/Charlotte North Star Review; experiential findings return to ChatGPT for classification and batching | Development Bible v1.7 | Product-development governance | North Star Review questions + post-certification loop | Active |
| CHG-010 | 14 Sep 2026 | Updated role clarity: ChatGPT is Product/Game Design & Technical Lead; Work is Engineering Execution; added Process Sufficiency Rule to stop unnecessary governance expansion | Development Bible v1.7 | Governance/roles | Role contract + process sufficiency rule | Active |

## Rules

1. No silent material change.
2. New or changed rules must be versioned in the authoritative specification before implementation.
3. Every material defect gets a root-cause classification.
4. Every material fix gets an acceptance test.
5. Adjacent branches must be regression-tested.
6. Carryo deployment occurs only after the applicable gates pass.
7. The live app is never treated as the source of truth.
8. A visible control is not considered implemented until its actual interaction path has been executed and verified.
9. Exact published-build interaction testing is mandatory before Show-Ready certification.

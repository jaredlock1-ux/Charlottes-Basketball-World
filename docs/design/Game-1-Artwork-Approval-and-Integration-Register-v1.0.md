# Game 1 artwork approval and integration register v1.0

**17 September 2026. Status: partial provenance audit; no new illustration integration or certification.** This is the inventory/evidence companion to `Game-1-Visual-Coverage-Matrix-v1.0.md`, not a replacement for its game-state specification. All chat-generated image IDs below are references only; they are not GitHub paths or evidence that binary files are accessible to Work. Approval means Jared liked the image, not that it passed production QA.

## Verified repository inventory

The GitHub `game-1/experience-v2/assets/` directory was checked on 17 September and contains exactly three files: `charlotte.png` (blob `b0cc97d65e86223d9a045185fdac008afe7d3ef0`), `contest.png` (`3d355fc694fd2db8aca39d599e58c3a8a5f1e8a2`), `rebound.png` (`b63ea974dbfb4ac59373159753d903b97d4680e5`). These are protected legacy originals; do not overwrite. This directory check does not prove that no new images exist elsewhere in the repository; search the full tree and release manifest before making a repository-wide absence claim. None of the newly approved chat-generated images below has a verified repository path or integration mapping.

## Approved chat art — known exact reference where available

| Scene | Exact reference | Approval / stage | Production QA and integration status |
|---|---|---|---|
| Made two-point jump shot, supporting players | `gen_id: 4ef22098-6f4d-42c8-a2d6-8e8a1f7ab309` | Jared approved latest image; engine-confirmed made two only | Unbranded red/navy/white ball through net; inspect actual bytes/character against master, count players, ball panel layout, branding and scene preservation before PASS. GitHub binary NOT VERIFIED; integration NOT VERIFIED. Earlier variants `bb45f275-9678-439a-8472-64f7f7a0bc12` and source image are not the approved final. |
| Defensive recovery | `gen_id: 68bf4c4e-97a2-4895-96ef-8d0ae930beca` | Jared approved revised scene; basket ahead of play | Ball and identity/stage QA NOT TESTED independently; confirm whether mapped to pre-choice recovery or post-choice sprint, since Charlotte already runs. GitHub/integration NOT VERIFIED. Prior `7b419f09-b241-466a-8ffc-16464abcd5d1` rejected. |
| Loose-ball steal | `gen_id: 23e65758-f39f-4562-8d30-e8d82d7c18fa` | Jared approved; ball loose, NOT yet secured | Canonical unbranded red/navy/white ball visual reference. Do not map to confirmed possession-winning steal unless engine has separately confirmed recovery and image is truthful. GitHub/integration NOT VERIFIED. |
| On-ball defence | `gen_id: 25333523-23ab-4c4d-9a50-ee0ba2ebbd66` | Jared approved composition | Fixed team branding/numbers: production FAIL; neutral derivative and reapproval required. GitHub/integration NOT VERIFIED. |
| Shot contest | `gen_id: 8b297f60-c818-43cb-a137-29ac7df2f9aa` | Jared approved composition | Fixed branding/numbers/background text: production FAIL. Charlotte already jumps: post-choice action, NOT a pre-choice shot-defence prompt. Neutral derivative and reapproval required. GitHub/integration NOT VERIFIED. |
| Layup attempt | `gen_id: 05d1f419-9b9e-4802-a0b8-0cd27f2926a3` | Jared approved composition | Fixed scoreboard, team branding and numbers: production FAIL; neutral derivative and reapproval required. Attempt must not spoil make/miss. GitHub/integration NOT VERIFIED. |
| Made three-pointer | `gen_id: 688214b4-0909-4982-b279-01da212cd68c` | Jared approved | Verify player count, canonical ball, identity and confirmed 3-point event before release; GitHub/integration NOT VERIFIED. |
| Three-point attempt | `gen_id: 7710b899-7db3-44c5-9a40-9e2a52a67eef` | Earlier approved | Verify ball and no result spoiler; GitHub/integration NOT VERIFIED. |
| Earlier made jump shot | `gen_id: ed326bc7-d736-4975-95aa-7cc842786a62` | Earlier approved, superseded for made two by latest above | Preserve as historical reference, not default integration asset. |

Other previously approved scenes with no verified exact binary/path in this audit: sideline-space decision; fast-break/bring-it-up; off-ball space; ball under pressure; shooting opportunity; rebound decision; Charlotte attacks; made layup. Do not invent filenames, IDs or pass results. Locate actual images and reconcile approvals before upload/integration. `charlotte.png`, `contest.png`, `rebound.png` are existing repository assets, not evidence of these newer approvals.

## Release blockers and required actions

1. Recover/export the **exact** approved binaries and canonical loose-ball reference, preserving originals and recording hashes, dimensions, source IDs, rights and final filenames. The GitHub text-file connector cannot upload image binaries; use a verified binary-capable workflow/Work with actual image attachments. Do not synthesize images from opaque generation IDs.
2. Audit every exact image PASS/FAIL/NOT TESTED for canonical ball, Charlotte master, neutral uniforms, no numbers/logos/text/scoreboard, basketball truth, no more than five active per team, and pre-choice/action/confirmed-outcome stage. Existing orange-ball art needs separate minimally changed derivatives and Jared's approval; don't silently alter accepted originals.
3. Reconcile the coverage matrix's outdated 'new art not produced' status and each illustration event mapping only after file recovery and QA. Distinguish loose-ball poke-away from possession-secured steal; shot contest already in action from pre-choice opportunity; defensive recovery already sprinting; made two only after confirmed engine result.
4. Commit versioned images and a machine-readable manifest with event IDs, stage, exact file paths and hashes; protect the three legacy originals. Then implement mappings in a bounded Work package, preserve certified mechanics, test deterministic event traces, controls, score/clock/possession, player count, club variants, mobile layout and accessibility. Only claim integrated/certified after evidence.

**Current verdict:** product direction and many compositions approved; binary recovery, independent artwork QA, neutral derivatives, mapping, integration and live regression remain OPEN. Do not represent this register as a completed full-image audit.

# V2 5v5 presentation defect

The existing roster and opening rendered court already contained five Magic and five Falcons players. No duplicate or decorative players were added. Investigation verified a separate visibility defect in both routes: Charlotte and Casey's 44-unit discs were only 14.14 units apart during Charlotte's shot flight.

The only experience change repositions Casey 55 units towards the basket and 25 units laterally from Charlotte's release position. Both existing identities remain on court, with the original focus hierarchy and movement animation. All other court positions, gameplay, copy, artwork, layout and timing remain unchanged.

Two hard route invariants were added: exactly ten stable identities, five per team, Charlotte exactly once on Magic, one ball, in-bounds positions and non-overlapping player discs at every primary/mixed state. Both attacking directions, possession changes, transition and Charlotte's complete offensive sequence are required coverage.

Complete suite: 107/107 passed. Live local browser sampling: primary 108 frames; mixed 93 frames. Every sampled frame retained ten visible unique tokens, five per team, and one ball, including automatic movement. Evidence: 5v5-browser.json and 5v5-tests.txt.

Protected local files were hash-compared before/after. Remote canonical v33 and v1 version 2 were compared with the previously captured HTML: both byte-for-byte unchanged.

Artwork deployment remains independently blocked. This fix does not certify North Star readiness.

Published separately to existing v2 URL as revision 3. Read-back HTML matches the fixed bundle exactly. Live published primary (108 samples) and mixed (93 samples) routes passed the same ten-visible-players, five-per-team, unique-identity and one-ball checks through completion. Evidence: 5v5-live-browser.json.

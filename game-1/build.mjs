import fs from 'node:fs';
const ref=fs.readFileSync(new URL('./reference/carryo-v32.html',import.meta.url),'utf8');
const style=ref.match(/<style>([\s\S]*?)<\/style>/)[1];
let scripts=['engine','content','contracts','game','ui'].map(n=>fs.readFileSync(new URL('./src/'+n+'.mjs',import.meta.url),'utf8').replace(/^import .*?;\r?\n/gm,'').replace(/^export /gm,'')).join('\n');
const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Charlotte’s Basketball World — Game 1</title><style>${style}
.qaOnly{display:none}body.testing .qaOnly{display:block}.scene{white-space:pre-line}button:focus-visible{outline:3px solid #e77b36;outline-offset:2px}.history{font-size:13px;max-height:260px;overflow:auto}.history p{border-bottom:1px solid #ddd;padding-bottom:8px}.muted{font-size:12px}.qaGrid{display:grid;grid-template-columns:1fr 1fr;gap:4px}
</style></head><body>
<header class="hero"><b>GAME 1 · ASK FOR IT</b><h1>Charlotte’s Basketball World</h1><div>You’re in the game. Make your move when it matters and see what happens.</div></header>
<section class="card"><div class="score"><div><small>MAGIC — FALCONS</small><span id="m">0</span> — <span id="f">0</span></div><div><small id="h">1ST HALF</small><span id="c">20:00</span></div></div>
<div class="chips"><span class="chip">Ball: <b id="ball">dead</b></span><span class="chip">Pressure: <b id="p">low</b></span><span class="chip">Fatigue: <b id="fat">low</b></span><span class="chip">Possession: <b id="pid">—</b></span></div>
<div id="scene" class="scene" aria-live="polite"></div><div id="choices"></div></section>
<section class="card stats"><div class="stat"><small>Decisions</small><b id="d">0</b></div><div class="stat"><small>Shots</small><b id="s">0</b></div><div class="stat"><small>Your rebounds</small><b id="r">0</b></div><div class="stat"><small>Your points</small><b id="pts">0</b></div><div class="stat"><small>Your stops</small><b id="st">0</b></div><div class="stat"><small>Team turnovers, both sides</small><b id="to">0</b></div></section>
<details class="card"><summary>Game recap</summary><div id="history" class="history"></div></details>
<section class="card qaOnly"><b>Direct QA · Engine 1.4.0 · NOT CERTIFIED</b><p class="muted">Fixtures use the production controls and engine. Entering a fixture resets only this browser session.</p><div id="fixtures" class="qaGrid"></div><button id="contract" class="choice orange">RUN CONTRACT CHECKS</button><pre id="qa"></pre><details><summary>State and complete event trace</summary><pre id="state"></pre><pre id="trace" class="trace"></pre></details></section>
<script>${scripts.replace(/<\/script/gi,'<\\/script')}</script></body></html>`;
fs.mkdirSync(new URL('./dist/',import.meta.url),{recursive:true});fs.writeFileSync(new URL('./dist/game-1.html',import.meta.url),html);
console.log('Built '+Buffer.byteLength(html)+' bytes');

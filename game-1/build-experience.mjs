import fs from 'node:fs';
import crypto from 'node:crypto';
const read=path=>fs.readFileSync(new URL(path,import.meta.url),'utf8');
const modules=['engine','content','game','experience','court','experience-ui'];
// Scope each module; exports are assigned explicitly so independent modules
// cannot shadow the certified game's functions. No transform of game logic.
const imports={game:'const {createEngine,possessionId}=modules.engine;const {NORMAL,SHOTS,REBOUNDS,DEFENCE,DEF_SHOTS,RECOVERY,BALL_HAND,SPINE,fmt,shotText,reboundText,freeThrowText}=modules.content;',experience:'const {createGame}=modules.game;',court:'','experience-ui':'const {createSession,sessionOptions,SCENARIOS}=modules.experience;const {courtMarkup,escapeHtml}=modules.court;const {fmt}=modules.content;'};
const scripts=modules.map(name=>{const source=read('./src/'+name+'.mjs');const names=[...source.matchAll(/^export (?:const|function) (\w+)/gm)].map(x=>x[1]);return `modules[${JSON.stringify(name)}]=(()=>{${imports[name]||''}\n${source.replace(/^import .*?;\r?\n/gm,'').replace(/^export /gm,'')}\nreturn {${names.join(',')}};})();`;}).join('\n');
const baseline=read('./dist/game-1.html');
const baselineHash=crypto.createHash('sha256').update(baseline).digest('hex');
if(baselineHash!=='edaa7a7c093889713c7c38feca9b8f20e145c1acafaf3c0fda8365743ba9ff72')throw Error('Certified baseline bundle differs');
const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Charlotte — Game 1 Court Preview</title><style>${read('./src/experience.css')}</style></head><body><div id="experience-root"></div><script>if(new URLSearchParams(location.search).get('full')==='1'){document.open();document.write(${JSON.stringify(baseline).replace(/<\/script/gi,'<\\/script')});document.close();}else{const modules={};${scripts.replace(/<\/script/gi,'<\\/script')}}<\/script></body></html>`;
fs.writeFileSync(new URL('./dist/experience.html',import.meta.url),html);
console.log('Built experience 1.0.0: '+Buffer.byteLength(html)+' bytes; SHA256 '+crypto.createHash('sha256').update(html).digest('hex'));

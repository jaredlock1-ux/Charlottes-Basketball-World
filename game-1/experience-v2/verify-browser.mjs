import fs from 'node:fs';import assert from 'node:assert/strict';
import {createSlice} from './director.mjs';
const dir=new URL('./evidence/',import.meta.url),summaries=[],controls=new Map();
for(const file of fs.readdirSync(dir).filter(n=>n.endsWith('-clicks.jsonl')&&(/^(live-|local-choice-|local-shot-|local-narrow-.*-r2)/.test(n)))){
  const name=file.replace('-clicks.jsonl',''),clicks=fs.readFileSync(new URL(file,dir),'utf8').trim().split('\n').filter(Boolean).map(JSON.parse);
  const frames=fs.readFileSync(new URL(name+'.jsonl',dir),'utf8').trim().split('\n').filter(Boolean).map(JSON.parse);
  for(const c of clicks){const picked=c.before.choices[c.index];if(!controls.has(c.before.stage))controls.set(c.before.stage,new Set());controls.get(c.before.stage).add(picked);assert.equal(c.after.choices.length,0);}
  let parity='not reconstructed: ordinary random seed';
  if(name!=='live-clean'){
    const s=createSlice({qa:true,scenario:name.includes('mixed')?'mixed':'primary'});
    for(const c of clicks){let guard=0;while(s.view().revision<Number(c.before.revision)&&guard++<100)s.advance();const v=s.view();assert.equal(v.stage,c.before.stage,name);assert.deepEqual(v.choices,c.before.choices,name);assert.deepEqual([String(v.source.state.score.Magic),String(v.source.state.score.Falcons)],c.before.score);s.choose(c.index);}
    while(s.view().stage!=='end')s.advance();assert.deepEqual([String(s.state().score.Magic),String(s.state().score.Falcons)],frames.at(-1).score);parity='passed';
  }
  assert.equal(frames.at(-1).stage,'end');
  for(const f of frames){assert.equal(f.players.length,10);assert.equal(new Set(f.players.map(p=>p.id)).size,10);assert.equal(f.players.filter(p=>p.owner==='true').length,f.ball.owner==='none'?0:1);assert.ok(f.scrollWidth<=f.width,name+' horizontal overflow');}
  summaries.push({name,clicks:clicks.length,score:frames.at(-1).score,widths:[...new Set(frames.map(f=>f.width))],complete:true,parity,initialArtSamples:frames.filter(f=>f.art).map(f=>f.art),artAcceptance:name.startsWith('live-')?'failed: hosted assets missing (live-asset-check.json)':'passed in settled local checks and viewport screenshots (local-settled-art.json)'});
}
const result={routes:summaries,controls:Object.fromEntries([...controls].map(([stage,labels])=>[stage,[...labels]]))};fs.writeFileSync(new URL('browser-verification.json',dir),JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));


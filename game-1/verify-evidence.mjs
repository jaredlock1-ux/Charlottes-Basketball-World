import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {createGame} from './src/game.mjs';
import {fmt} from './src/content.mjs';
import {possessionId} from './src/engine.mjs';
const summary=[];
for(const [name,seed] of [['live-default',1],['live-cautious',2718],['live-unlucky',18],['live-recovery',6]]){
 const rows=fs.readFileSync(new URL('./evidence/'+name+'.jsonl',import.meta.url),'utf8').trim().split('\n').map(JSON.parse);
 const game=createGame({seed});
 for(const row of rows){
   const before=game.view();assert.equal(row.before.scene,before.text,name+' before');
   const index=before.choices.indexOf(row.choice);assert.ok(index>=0,name+' actual rendered choice');
   game.act(index);const after=game.view(),s=after.state;
   assert.equal(row.after.scene,after.text,name+' rendered outcome');
   assert.equal(+row.after.magic,s.score.Magic);assert.equal(+row.after.falcons,s.score.Falcons);
   assert.equal(row.after.clock,fmt(s.clock));assert.equal(row.after.pos,possessionId(s.pos));
   assert.deepEqual(row.after.choices,after.choices);
 }
 assert.ok(game.state().ended,name+' must finish');
 const t=game.trace(),s=game.state(),score={Magic:0,Falcons:0};
 for(const event of t)if(event.scoreChange)score[event.team]+=event.scoreChange;
 assert.deepEqual(score,s.score);
 for(const half of [1,2])assert.equal(t.filter(e=>e.type==='CLOCK_TICK'&&e.stateAfter.half===half).reduce((sum,e)=>sum+e.elapsed,0),1200);
 assert.equal(t.filter(e=>e.type==='HALFTIME').length,1);assert.equal(t.filter(e=>e.type==='FINAL_WHISTLE').length,1);
 const rebounds=t.filter(e=>e.type==='REBOUND_OUTCOME').reduce((a,e)=>(a[e.winner]=(a[e.winner]||0)+1,a),{});
 const late=t.find(e=>e.type==='AUTHORED_SLOT'&&e.slot==='P28')?.stateAfter.score;
 const record={name,seed,clicks:rows.length,score:s.score,decisions:s.decisions,shots:s.shots,points:s.points,rebounds,stops:s.stops,recovery:s.recoveredAfterMistake,askedForBall:s.askedForBall,lateScore:late,pass:true};
 summary.push(record);
 fs.writeFileSync(new URL('./evidence/'+name+'-engine-trace.json',import.meta.url),JSON.stringify(t));
}
const html=fs.readFileSync(new URL('./dist/game-1.html',import.meta.url));
const report={carryoVersion:33,sha256:crypto.createHash('sha256').update(html).digest('hex'),routes:summary};
fs.writeFileSync(new URL('./evidence/verification.json',import.meta.url),JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));

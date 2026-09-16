import test from 'node:test';
import assert from 'node:assert/strict';
import {createGame,FIXTURES} from '../src/game.mjs';
import {runContracts} from '../src/contracts.mjs';
import {SPINE,SHOTS} from '../src/content.mjs';

test('public contracts pass without mutating another game',()=>{const g=createGame();const v=g.view();for(const r of runContracts())assert.ok(r.pass,r.name);assert.deepEqual(g.view(),v);});
test('source spine has all 30 permanent slots, halftime P18, final P30',()=>{assert.equal(SPINE.length,30);assert.equal(SPINE[17].kind,'halftime');assert.equal(SPINE[29].kind,'final');});
test('each shot choice can score, miss, be blocked or draw a foul',()=>{
  for(let choice=0;choice<4;choice++){const outcomes=new Set();for(const roll of [.01,.38,.44,.48,.52,.57,.62,.99]){const g=createGame({fixture:'shots',rolls:[roll]});g.act(choice);outcomes.add(g.trace().find(e=>e.type==='SHOT_OUTCOME').physicalOutcome);}assert.deepEqual([...outcomes].sort(),['blocked','foul','made','miss']);}
});
test('free throw UI states resolve in order and keep the clock stopped',()=>{
  const g=createGame({fixture:'ft',rolls:FIXTURES.ft});assert.deepEqual(g.view().choices,['First free throw']);g.act(0);
  assert.match(g.view().text,/First free throw.*good/);assert.deepEqual(g.view().choices,['Second free throw']);const p=g.state().pos;g.act(0);
  assert.match(g.view().text,/Second free throw.*missed/);assert.equal(g.state().clock,1200);assert.equal(g.state().pos,p);assert.equal(g.state().phase,'rebound');
});
for(const [fixture,rolls] of Object.entries(FIXTURES))test('direct entry and every visible action: '+fixture,()=>{
  const sample=createGame({fixture,rolls});
  for(let i=0;i<sample.view().choices.length;i++){
    const g=createGame({fixture,rolls}),v=g.view();g.act(i);const after=g.view();
    assert.notEqual(after.revision,v.revision);assert.ok(after.text.length>0);
    assert.ok(after.choices.length>0||after.state.ended);
    assert.throws(()=>g.act(i,v.revision));
  }
});
function validate(g,before,after){
  assert.ok(after.state.pos>=before.state.pos,'possession cannot move back');
  assert.ok(after.state.score.Magic>=before.state.score.Magic);assert.ok(after.state.score.Falcons>=before.state.score.Falcons);
  if(before.state.half===after.state.half)assert.ok(after.state.clock<=before.state.clock,'clock increases');
  if(after.kind==='shooting')assert.deepEqual(after.choices,SHOTS);
  if(after.kind==='decision')assert.equal(after.choices.length,3);
  if(after.state.team==='Magic')assert.ok(!after.text.startsWith('The Falcons bring'),'offence story');
}
export function play(seed,policy){const g=createGame({seed});let steps=0,counts={};
  while(g.view().kind!=='final'&&steps++<1200){const v=g.view();counts[v.kind]=(counts[v.kind]||0)+1;
    const index=v.choices.length>1?policy(v,steps):0;g.act(index);validate(g,v,g.view());
  }
  assert.ok(g.state().ended,'must reach final whistle');
  const trace=g.trace();const sum={Magic:0,Falcons:0};
  for(const event of trace){if(event.scoreChange)sum[event.team]+=event.scoreChange;}
  assert.deepEqual(sum,g.state().score,'final score must equal scoring events');
  assert.equal(trace.filter(e=>e.type==='HALFTIME').length,1);assert.equal(trace.filter(e=>e.type==='FINAL_WHISTLE').length,1);
  for(const half of [1,2])assert.equal(trace.filter(e=>e.type==='CLOCK_TICK'&&e.stateAfter.half===half).reduce((s,e)=>s+e.elapsed,0),1200);
  assert.ok(trace.filter(e=>e.type==='CLOCK_TICK').every(e=>e.elapsed<=30));
  assert.ok(g.state().decisions>=12&&g.state().decisions<=18,`decision budget: ${g.state().decisions}`);
  return {steps,counts,state:g.state(),trace};
}
for(const [name,seed,policy] of [
  ['Highly involved',1,()=>0],['Cautious',2718,()=>2],
  ['Brave but unlucky',18,()=>0],['Early mistake and recovery',6,()=>0],
  ['Late close game',1,()=>0],['Low-scoring highly involved',18,()=>0]
])test(name,()=>{const r=play(seed,policy);
  if(name==='Highly involved')assert.ok(r.state.shots>=4&&r.state.points>=4);
  if(name==='Cautious')assert.equal(r.state.askedForBall,0);
  if(name==='Brave but unlucky')assert.ok(r.trace.filter(e=>e.type==='SHOT_OUTCOME'&&e.shooter==='you'&&['miss','blocked'].includes(e.physicalOutcome)).length>=3);
  if(name==='Early mistake and recovery'){assert.ok(r.trace.some(e=>e.type==='TURNOVER'&&e.team==='Magic'&&e.stateAfter.half===1&&e.stateAfter.clock>1100));assert.ok(r.state.recoveredAfterMistake>0);}
  if(name==='Late close game'){const s=r.trace.find(e=>e.type==='AUTHORED_SLOT'&&e.slot==='P28').stateAfter.score;assert.ok(Math.abs(s.Magic-s.Falcons)<=3);}
  if(name==='Low-scoring highly involved')assert.ok(r.state.points<=2&&r.state.shots>=4);
  console.log(JSON.stringify({route:name,steps:r.steps,score:r.state.score,decisions:r.state.decisions,points:r.state.points,rebounds:r.state.rebounds,stops:r.state.stops,turnovers:r.state.turnovers}));});

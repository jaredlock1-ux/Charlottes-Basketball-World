import test from 'node:test';
import assert from 'node:assert/strict';
import {createGame} from '../src/game.mjs';
test('TD-G1-DRAW-01: tied second-half 0:00 displays draw, ends play, no overtime',()=>{
  const g=createGame({seed:1});let steps=0;
  while(g.view().kind!=='final'&&steps++<1200)g.act(0);
  const x=g.state(),v=g.view(),trace=g.trace();
  assert.deepEqual(x.score,{Magic:49,Falcons:49});assert.equal(x.half,2);assert.equal(x.clock,0);
  assert.equal(x.phase,'final');assert.equal(x.ended,true);assert.equal(v.kind,'final');
  assert.match(v.text,/The game finishes tied\./);assert.doesNotMatch(v.text,/Magic win|Falcons win|overtime/i);assert.deepEqual(v.choices,[]);
  assert.equal(trace.filter(e=>e.type==='FINAL_WHISTLE').length,1);
  assert.ok(trace.every(e=>[1,2].includes(e.stateAfter.half)));
  for(const half of [1,2])assert.equal(trace.filter(e=>e.type==='CLOCK_TICK'&&e.stateAfter.half===half).reduce((sum,e)=>sum+e.elapsed,0),1200);
  assert.throws(()=>g.act(0));assert.deepEqual(g.state(),x);assert.deepEqual(g.view(),v);assert.deepEqual(g.trace(),trace);
});

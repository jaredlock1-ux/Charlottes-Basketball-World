import test from 'node:test';
import assert from 'node:assert/strict';
import {createEngine} from '../src/engine.mjs';

function attempt(team, roll, value = 2) {
  const e = createEngine(17, [roll]); e.start();
  if (team === 'Falcons') { e.turnover(); e.advance(); }
  e.prepareShot(value, team === 'Falcons' ? 'opponent' : 'you');
  return e;
}
test('opening tip explicitly awards Magic at 20:00, 0–0', () => {
  const e = createEngine(); e.start();
  assert.equal(e.state().clock,1200); assert.equal(e.state().pos,1);
  assert.equal(e.trace().at(-1).physicalOutcome,'Magic_win_tip');
  assert.deepEqual(e.state().score,{Magic:0,Falcons:0});
});
for (const team of ['Magic','Falcons']) for (const value of [2,3]) {
  test(`${team} made ${value} persists across possession transition`, () => {
    const e=attempt(team,0,value); e.resolveShot(); const p=e.state().pos;
    assert.equal(e.state().score[team],value); e.advance();
    assert.equal(e.state().score[team],value); assert.equal(e.state().pos,p+1);
    const t=e.trace(); assert.ok(t.findIndex(x=>x.type==='ATTEMPT_ESTABLISHED')<t.findIndex(x=>x.type==='MADE_BASKET'));
    assert.equal(t.find(x=>x.type==='MADE_BASKET').stateAfter.score[team],value);
  });
}
for (const team of ['Magic','Falcons']) for(const action of [0,1,2]) for(const roll of [.01,.3,.99]) {
  test(`rebound engine ownership ${team} action ${action} roll ${roll}`,()=>{
    const e=createEngine(1,[.99,roll]); e.start();
    if(team==='Falcons'){e.turnover();e.advance();}
    e.prepareShot(2,team==='Magic'?'you':'opponent'); e.resolveShot();
    const p=e.state().pos, s=e.state().score;
    const r=e.rebound(action);
    assert.deepEqual(e.state().score,s);
    assert.equal(e.state().pos,p);
    if(r.offensive){assert.equal(e.state().phase,'live');assert.equal(e.state().team,team);}
    else{e.advance();assert.equal(e.state().pos,p+1);assert.equal(e.state().team,r.team);}
    assert.equal(e.state().rebounds,r.winner==='you'?1:0);
  });
}
for(const first of [.01,.99])for(const last of [.01,.99])test(`free throws ${first}/${last} explicit, ordered, live final miss`,()=>{
  const e=createEngine(1,[.52,first,last]);e.start();e.prepareShot(2,'you');e.resolveShot();
  assert.equal(e.state().phase,'free_throw');
  const a=e.freeThrow(), b=e.freeThrow();
  assert.equal(a.index,1);assert.equal(b.index,2);
  assert.equal(e.state().score.Magic,Number(a.made)+Number(b.made));
  assert.equal(e.state().phase,b.made?'between':'rebound');
  assert.equal(e.state().clock,1200);
  assert.throws(()=>e.freeThrow());
});
test('steal records turnover before single possession change',()=>{
  const e=createEngine(1,[0]);e.start();e.turnover();e.advance();const p=e.state().pos;
  assert.equal(e.defend(1,true),true);assert.equal(e.state().teamTurnovers.Falcons,1);
  assert.equal(e.state().stops,1);e.advance();assert.equal(e.state().pos,p+1);assert.equal(e.state().team,'Magic');
});
test('failed pressure leaves opponent in live play',()=>{
  const e=createEngine(1,[.99]);e.start();e.turnover();e.advance();const p=e.state().pos;
  assert.equal(e.defend(1,true),false);assert.equal(e.state().pos,p);assert.equal(e.state().team,'Falcons');
});
test('dead ball and restart preserve ownership, id and clock',()=>{
  const e=createEngine();e.start();const before=e.state();e.deadBall();assert.throws(()=>e.tick(4,'play'));e.restart();
  assert.equal(e.state().pos,before.pos);assert.equal(e.state().clock,before.clock);
});
test('two complete halves and immutable final state',()=>{
  const e=createEngine();e.start();assert.throws(()=>e.tick(1200,'skip'));
  for(let i=0;i<40;i++)e.tick(30,'live_play');e.boundary();
  assert.equal(e.state().phase,'halftime');const p=e.state().pos;e.resume();
  assert.equal(e.state().clock,1200);assert.equal(e.state().pos,p+1);assert.equal(e.state().team,'Falcons');
  for(let i=0;i<40;i++)e.tick(30,'live_play');e.boundary();const before=e.state();
  for(const action of [()=>e.advance(),()=>e.resume(),()=>e.prepareShot(2),()=>e.turnover(),()=>e.tick(1,'play')])assert.throws(action);
  assert.deepEqual(e.state(),before);assert.equal(e.trace().filter(x=>x.type==='HALFTIME').length,1);
});
test('shot released before horn can score, rebound after horn cannot continue',()=>{
  const e=attempt('Magic',.99);for(let i=0;i<40;i++)e.tick(30,'live_play');e.resolveShot();e.boundary();
  assert.equal(e.state().phase,'halftime');assert.throws(()=>e.rebound(0));
});
test('snapshots and trace are read-only copies; seed is independent of logging',()=>{
  const e=createEngine(9),f=createEngine(9);e.start();f.start();e.annotate('TEST',{});
  assert.equal(e.random(),f.random());const s=e.state();s.score.Magic=999;assert.equal(e.state().score.Magic,0);
});

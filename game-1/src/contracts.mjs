import {createEngine} from './engine.mjs';
import {NORMAL, SHOTS, REBOUNDS, DEFENCE, DEF_SHOTS} from './content.mjs';
export function runContracts() {
  const results=[];
  function check(name,run){try{run();results.push({name,pass:true});}catch(e){results.push({name,pass:false,error:e.message});}}
  const ok=(v,msg)=>{if(!v)throw Error(msg||'contract failed');};
  check('Locked choices',()=>{
    ok([NORMAL,REBOUNDS,DEFENCE,DEF_SHOTS].every(c=>c.length===3));
    ok(JSON.stringify(SHOTS)===JSON.stringify(['Pump fake, then layup','Drive for the layup','Take the shot','Side step and take the shot']));
  });
  check('Explicit opening tip at 20:00 and 0–0',()=>{const e=createEngine();e.start();ok(e.state().clock===1200&&e.state().score.Magic===0&&e.trace().at(-1).physicalOutcome==='Magic_win_tip');});
  check('Opponent scoring persists after transition',()=>{const e=createEngine(1,[0]);e.start();e.turnover();e.advance();e.prepareShot(2,'opponent');e.resolveShot();e.advance();ok(e.state().score.Falcons===2);});
  for(const team of ['Magic','Falcons'])check(team+' offensive rebound retains ID',()=>{
    const e=createEngine(1,[.99,team==='Magic'?.01:.99]);e.start();if(team==='Falcons'){e.turnover();e.advance();}
    e.prepareShot(2,team==='Magic'?'you':'opponent');e.resolveShot();const p=e.state().pos;e.rebound(0);
    ok(e.state().pos===p&&e.state().team===team&&e.state().phase==='live');
  });
  check('Rebound action does not select winner',()=>{
    const winners=new Set();for(const r of [.01,.3,.99]){const e=createEngine(1,[.99,r]);e.start();e.prepareShot(2,'you');e.resolveShot();winners.add(e.rebound(0).winner);}ok(winners.size===3);
  });
  check('Free throws individually score; final miss stays live',()=>{
    const e=createEngine(1,[.52,.01,.99]);e.start();e.prepareShot(2,'you');e.resolveShot();const a=e.freeThrow(),b=e.freeThrow();ok(a.made&&!b.made&&e.state().score.Magic===1&&e.state().phase==='rebound');
  });
  check('Steal records opponent turnover',()=>{const e=createEngine(1,[0]);e.start();e.turnover();e.advance();e.defend(1,true);e.advance();ok(e.state().team==='Magic'&&e.state().teamTurnovers.Falcons===1);});
  check('Clock rejects giant jumps',()=>{const e=createEngine();e.start();let rejected=false;try{e.tick(1200,'skip');}catch{rejected=true;}ok(rejected);});
  check('Halftime and final only after full clock',()=>{
    const e=createEngine();e.start();for(let i=0;i<40;i++)e.tick(30,'contract_live_play');e.boundary();ok(e.state().phase==='halftime');e.resume();ok(e.state().team==='Falcons'&&e.state().clock===1200);for(let i=0;i<40;i++)e.tick(30,'contract_live_play');e.boundary();ok(e.state().ended);
  });
  check('No actions after final whistle',()=>{
    const e=createEngine();e.start();for(let h=0;h<2;h++){for(let i=0;i<40;i++)e.tick(30,'contract_live_play');e.boundary();if(h===0)e.resume();}let rejected=false;try{e.turnover();}catch{rejected=true;}ok(rejected);
  });
  return results;
}

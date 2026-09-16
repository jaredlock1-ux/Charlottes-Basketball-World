import {createGame} from './src/game.mjs';
const found={};let budgets=[];
for(let seed=1;seed<=500&&Object.keys(found).length<5;seed++){
 const g=createGame({seed});let n=0;while(!g.state().ended&&n++<1000){const v=g.view();g.act(v.choices.length>1?0:0);}
 const x=g.state(),t=g.trace(),shots=t.filter(e=>e.type==='SHOT_OUTCOME'&&e.shooter==='you');
 const early=t.some(e=>e.type==='TURNOVER'&&e.team==='Magic'&&e.stateAfter.half===1&&e.stateAfter.clock>1100);
 const late=t.find(e=>e.type==='AUTHORED_SLOT'&&e.slot==='P28')?.stateAfter;
 const candidate={seed,score:x.score,shots:x.shots,points:x.points,decisions:x.decisions,recovery:x.recoveredAfterMistake,stops:x.stops,late:late?.score};
 if(x.decisions<12||x.decisions>18)budgets.push(candidate);
 if(x.shots>=4&&x.points>=4&&!found.involved)found.involved=candidate;
 if(shots.filter(s=>['miss','blocked'].includes(s.physicalOutcome)).length>=3&&x.points<=2&&!found.unlucky)found.unlucky=candidate;
 if(early&&x.recoveredAfterMistake>0&&!found.recovery)found.recovery=candidate;
 if(late&&Math.abs(late.score.Magic-late.score.Falcons)<=3&&!found.close)found.close=candidate;
 if(x.points<=2&&x.shots>=4&&!found.low)found.low=candidate;
}
console.log(JSON.stringify({found,budgets},null,2));

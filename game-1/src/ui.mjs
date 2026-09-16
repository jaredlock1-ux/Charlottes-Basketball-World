import {createGame,FIXTURES} from './game.mjs';
import {runContracts} from './contracts.mjs';
import {fmt} from './content.mjs';
import {possessionId} from './engine.mjs';
const params=new URLSearchParams(location.search),testing=params.get('qa')==='1';
const labels={normal:'Normal 3-choice',ball_hand:'Ball in hand',shots:'All 4 shots',made:'Made shot',miss:'Missed shot',block:'Blocked shot',foul:'Shooting foul',offreb:'Offensive rebound',defreb:'Defensive rebound',opponent_rebound:'Opponent offensive rebound',teammate_rebound:'Teammate rebound',defence:'Defensive decision',steal:'Guaranteed steal',failed_steal:'Failed steal / recovery',defshot:'Defensive shot',defthree:'Opponent three-point attempt',ft:'Free throws',turnover:'Turnover / transition',recovery:'Failure / recovery',dead:'Dead-ball restart',half:'Halftime',late:'Late pressure',final:'Final possession'};
const q=id=>document.getElementById(id);let game=createGame(),history=[];
function render(){
  const v=game.view(),x=v.state;
  for(const [id,value] of Object.entries({m:x.score.Magic,f:x.score.Falcons,h:x.ended?'FINAL':x.phase==='halftime'?'HALFTIME':x.half===1?'1ST HALF':'2ND HALF',c:fmt(x.clock),ball:x.ended?'game over':x.phase==='halftime'?'halftime':x.phase==='free_throw'?x.team+' free throw':x.phase==='rebound'?'loose — rebound':x.phase==='dead_ball'?'dead — '+x.team+' inbound':x.phase==='between'?'dead — '+x.nextTeam+' next':x.team===null?'dead':x.team==='Magic'?'with your team':'with the Falcons',p:x.pressure,fat:x.fatigue,pid:x.pos?possessionId(x.pos):'—',d:x.decisions,s:x.shots,r:x.rebounds,pts:x.points,st:x.stops,to:x.turnovers}))q(id).textContent=value;
  q('scene').textContent=v.text;q('choices').replaceChildren();
  v.choices.forEach((text,index)=>{const b=document.createElement('button');b.className='choice';b.textContent=text;b.onclick=()=>{game.act(index,v.revision);render();};q('choices').appendChild(b);});
  history.push({time:fmt(x.clock),half:x.half,pos:x.pos,text:v.text});
  q('history').replaceChildren();history.slice(-150).reverse().forEach(h=>{const p=document.createElement('p');p.textContent='H'+h.half+' '+h.time+' · '+possessionId(h.pos)+' · '+h.text;q('history').appendChild(p);});
  if(testing){q('state').textContent=JSON.stringify(x,null,2);q('trace').textContent=JSON.stringify(game.trace());}
}
if(testing){
  document.body.classList.add('testing');
  Object.entries(FIXTURES).forEach(([fixture,rolls])=>{const b=document.createElement('button');b.className='choice';b.textContent=labels[fixture];b.onclick=()=>{game=createGame({fixture,rolls});history=[];render();};q('fixtures').appendChild(b);});
  const reset=document.createElement('button');reset.className='choice orange';reset.textContent='Reset full game';reset.onclick=()=>{game=createGame();history=[];render();};q('fixtures').appendChild(reset);
  for(const [label,seed] of [['Highly involved',1],['Cautious',2718],['Brave but unlucky',18],['Early mistake and recovery',6],['Late close game',1],['Low-scoring highly involved',18]]){const b=document.createElement('button');b.className='choice orange';b.textContent='Full route: '+label;b.onclick=()=>{game=createGame({seed});history=[];render();};q('fixtures').appendChild(b);}
}
q('contract').onclick=()=>{const r=runContracts();q('qa').textContent=r.filter(t=>t.pass).length+'/'+r.length+' PASS\n'+r.map(t=>(t.pass?'PASS':'FAIL')+' '+t.name+(t.error?' '+t.error:'')).join('\n');};
render();

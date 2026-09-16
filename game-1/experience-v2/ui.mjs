import {createSlice,optionsFrom,SCENARIOS} from './director.mjs';
import {courtModel,courtShell,ROSTER} from './court.mjs';
const options=optionsFrom(location.search),root=document.getElementById('world');
let session=createSlice(options),timer=null,lastBall=null,observations=[];
const $=id=>document.getElementById(id);
root.innerHTML=`<header class="masthead"><div class="brand"><span>CHARLOTTE’S</span><strong>BASKETBALL</strong><span>WORLD <b>●</b></span></div><p>REAL GAMES.<br>BIG CHOICES.<br><strong>YOUR STORY.</strong></p></header><main><section class="arena" aria-label="Game world"><div class="scoreboard"><div class="team magic"><span class="crest">✦</span><div>Magic<strong id="magic-score">0</strong></div></div><div class="time"><span id="half">1ST HALF</span><strong id="clock">20:00</strong></div><div class="team falcons"><div>Falcons<strong id="falcons-score">0</strong></div><span class="crest">➶</span></div></div><div class="court-row"><aside class="roster"><h2>YOUR TEAM</h2><h3>Magic</h3>${ROSTER.filter(p=>p.team==='Magic').map(p=>`<p class="${p.id==='C'?'you':''}"><b>${p.number}</b>${p.name}</p>`).join('')}</aside><div class="court-wrap"><div id="court">${courtShell()}</div><div class="court-caption"><span id="possession"></span><span id="direction"></span></div></div><aside class="roster opponents"><h2>OPPONENTS</h2><h3>Falcons</h3>${ROSTER.filter(p=>p.team==='Falcons').map(p=>`<p><b>${p.number}</b>${p.name}</p>`).join('')}</aside></div><div class="legend"><span><i class="pink">10</i> Charlotte · You</span><span><i class="purple"></i> Magic</span><span><i class="red"></i> Falcons</span></div></section><section class="moment" aria-label="Current play"><div class="character"><img src="assets/charlotte.png" alt="Charlotte, Magic number 10, ready to play"><span>CHARLOTTE <b>10</b></span></div><div class="moment-content"><div class="story" aria-live="polite" aria-atomic="true"><p class="eyebrow" id="cue"></p><h1 id="heading"></h1><p id="story"></p></div><div id="choices" class="choices"></div></div></section><section class="consequence" id="consequence" hidden><img id="outcome-art" alt=""><div><p class="eyebrow">IN THE MOMENT</p><h2 id="outcome-heading"></h2><p id="outcome-copy"></p></div></section><footer>Charlotte’s Basketball World <span>Game 1 · Experience preview</span></footer><section id="developer" hidden></section></main>`;
function drawCourt(c,v){
  const svg=$('court').firstElementChild;svg.dataset.possession=c.possession||'none';svg.dataset.direction=c.direction;
  $('court-title').textContent=c.possession?c.possession+' possession':c.ball.status==='in-flight'?'Shot in flight':'Loose ball';
  $('court-desc').textContent=`Ten players. Charlotte is Magic number 10. ${c.attacking} attack ${c.direction}. ${c.ball.owner?ROSTER.find(p=>p.id===c.ball.owner).name+' holds the ball.':'No player holds the ball.'}`;
  for(const p of c.players){const token=$('token-'+p.id);token.style.transform=`translate(${p.x}px,${p.y}px)`;token.dataset.ballOwner=p.ownsBall;token.classList.toggle('focus',p.id==='C'||p.id===c.ball.owner||p.id==='F1'&&c.attacking==='Falcons');}
  $('attack-arrow').setAttribute('transform',`translate(${c.direction==='left'?540:460} 510) rotate(${c.direction==='left'?180:0})`);
  const ball=$('ball');ball.dataset.owner=c.ball.owner||'none';ball.dataset.status=c.ball.status;ball.style.opacity=v.stage==='end'?'0':'1';
  ball.getAnimations().forEach(a=>a.cancel());
  if(c.ball.status==='in-flight'){
    const from=lastBall||c.origin;
    ball.animate([{transform:`translate(${from.x}px,${from.y}px) scale(1)`},{transform:`translate(${(from.x+c.basket)/2}px,${Math.min(from.y,280)-100}px) scale(1.35)`,offset:.5},{transform:`translate(${c.basket}px,280px) scale(1)`}],{duration:1300,easing:'ease-in-out',fill:'forwards'});
  }else ball.style.transform=`translate(${c.ball.x}px,${c.ball.y}px)`;
  lastBall={x:c.ball.x,y:c.ball.y};
  $('possession').textContent=c.ball.status==='in-flight'?'Ball in flight':c.ball.status==='loose'?'Loose ball':v.stage==='made'?c.possession+' inbound next':c.possession+' possession';
  $('direction').textContent=(c.direction==='left'?'← ':'')+c.attacking+' attacking'+(c.direction==='right'?' →':'');
}
function render(){
  clearTimeout(timer);const v=session.view(),x=v.source.state,c=courtModel(v,session.trace());
  root.dataset.stage=v.stage;root.dataset.revision=v.revision;root.dataset.emphasis=v.art?'outcome':v.decision?'decision':'action';
  $('magic-score').textContent=x.score.Magic;$('falcons-score').textContent=x.score.Falcons;$('clock').textContent=String(Math.floor(x.clock/60)).padStart(2,'0')+':'+String(x.clock%60).padStart(2,'0');$('half').textContent=x.half===1?'1ST HALF':'2ND HALF';
  drawCourt(c,v);$('heading').textContent=v.heading;$('story').textContent=v.text;$('cue').textContent=v.decision?'YOUR MOMENT':v.stage==='end'?'THE PLAY CONTINUES':'LIVE PLAY';
  $('choices').replaceChildren();v.choices.forEach((label,i)=>{const b=document.createElement('button');b.className='choice';b.textContent=label;b.dataset.choice=i;b.onclick=()=>{session.choose(i,v.revision);render();};$('choices').appendChild(b);});
  $('consequence').hidden=!v.art;
  if(v.art){$('outcome-art').src='assets/'+v.art+'.png';$('outcome-art').alt=v.art==='rebound'?'Charlotte, Magic number 10, secures the rebound in both hands beside Casey, Falcons number 9.':'Casey, Falcons number 9, scores through Charlotte’s raised-hand contest.';$('outcome-heading').textContent=v.heading;$('outcome-copy').textContent=v.text;}
  observations.push({view:v,court:c});
  if(options.qa&&!options.clean){$('qa-state').textContent=JSON.stringify({view:v,court:c,trace:session.trace(),observations},null,2);}
  if(v.delay!==null)timer=setTimeout(()=>{session.advance(v.revision);render();},v.delay);
}
if(options.qa&&!options.clean){$('developer').hidden=false;$('developer').innerHTML='<details><summary>Developer QA</summary><div id="scenarios"></div><details><summary>Observed frames and engine trace</summary><pre id="qa-state"></pre></details></details>';for(const [name,s]of Object.entries(SCENARIOS)){const b=document.createElement('button');b.textContent=s.label;b.onclick=()=>{clearTimeout(timer);session=createSlice({qa:true,scenario:name});observations=[];lastBall=null;render();};$('scenarios').appendChild(b);}}
render();

import {createSession,sessionOptions,SCENARIOS} from './experience.mjs';
import {courtMarkup,escapeHtml} from './court.mjs';
import {fmt} from './content.mjs';

const options=sessionOptions(location.search);
let experience=createSession(options), observations=[];
const root=document.getElementById('experience-root');
root.innerHTML=`<header class="masthead"><a href="?full=1" class="brand">CHARLOTTE’S BASKETBALL WORLD <span>GAME 1</span></a><span class="preview-label">Ready for player-experience testing · not experience certified</span></header>
<main><div class="intro"><div><p class="eyebrow">ONE PLAY. STAY IN THE GAME.</p><h1>From defence to attack.</h1></div><div class="legend"><span><i class="magic"></i> Your team · Magic</span><span><i class="falcons"></i> Falcons</span><span><i class="you">C</i> You’re Charlotte</span></div></div>
<section class="game-panel" aria-label="Basketball experience"><div class="scoreboard"><div class="team-name magic-name">MAGIC <strong id="magic-score">0</strong></div><div class="clock"><span id="half"></span><strong id="clock"></strong></div><div class="team-name falcons-name"><strong id="falcons-score">0</strong> FALCONS</div></div><div class="court-status"><span id="possession"></span><span id="direction"></span></div><div id="court"></div>
<div class="story" aria-live="polite" aria-atomic="true"><p class="eyebrow" id="beat"></p><h2 id="heading" tabindex="-1"></h2><p id="story-copy"></p></div><div id="experience-choices" class="choices"></div><p id="slice-end" class="slice-end" hidden>That’s the court slice. You can keep playing with the original game controls.</p></section>
<div class="below"><p>Simple circles. Real basketball decisions.<br><span>Every result comes from the existing Game 1 engine.</span></p><a href="?full=1">Play full Game 1 ↗</a></div><section id="qa-tools" hidden></section></main>`;
const q=id=>document.getElementById(id);
const stepNames={defence:'Find your player',acknowledge:'Your move',intent:'Shot intent',flight:'Ball in flight',miss:'Live ball',rebound:'Your decision',outcome:'Rebound result',transition:'Change of direction',offence:'Back on offence',outside:'Original Game 1 controls'};
function render(focus=false){
  const v=experience.view(),x=v.source.state,c=v.court;
  root.dataset.stage=v.stage;
  q('magic-score').textContent=x.score.Magic;q('falcons-score').textContent=x.score.Falcons;q('clock').textContent=fmt(x.clock);q('half').textContent=x.ended?'FINAL':x.half===1?'1ST HALF':'2ND HALF';
  q('possession').textContent=c?c.possessionLabel:x.ended?'Game over':x.phase==='between'?x.nextTeam+' have the ball next':x.phase==='rebound'?'Loose ball':x.team?x.team+' possession':'Ball dead';
  q('direction').textContent=c?(c.direction==='left'?'← ':'')+c.attackingTeam+' attacking'+(c.direction==='right'?' →':''):'';
  q('court').innerHTML=c?courtMarkup(c,v.stage):'<div class="outside-court">The court preview stops here.<br><small>Continue with the original Game 1 controls below.</small></div>';
  q('beat').textContent=stepNames[v.stage];q('heading').textContent=v.heading;q('story-copy').textContent=v.text;
  q('experience-choices').replaceChildren();
  v.choices.forEach((label,index)=>{const b=document.createElement('button');b.className='action';b.textContent=label;b.dataset.control=v.control;b.onclick=()=>{try{experience.act(index,v.revision);render(true);}catch(error){q('story-copy').textContent='This control could not complete. Reload the preview to try again.';console.error(error);}};q('experience-choices').appendChild(b);});
  q('slice-end').hidden=v.stage!=='offence';
  observations.push({stage:v.stage,source:v.source,court:c,choices:v.choices});
  if(options.qa&&!options.playerView){q('qa-state').textContent=JSON.stringify({stage:v.stage,state:x,court:c,trace:experience.trace()},null,2);q('qa-count').textContent=observations.length+' presentation observations';}
  if(focus)q('heading').focus({preventScroll:true});
}
if(options.qa&&!options.playerView){
  q('qa-tools').hidden=false;q('qa-tools').innerHTML='<details><summary>Developer QA · repeatable scenarios</summary><p>Scripted random inputs use the v33 production engine and real controls. Normal full-game play never receives these inputs.</p><div id="scenarios" class="choices"></div><p id="qa-count"></p><details><summary>Current state and engine trace</summary><pre id="qa-state"></pre></details></details>';
  for(const [id,scenario] of Object.entries(SCENARIOS)){const b=document.createElement('button');b.className='action secondary';b.textContent='Restart: '+scenario.label;b.onclick=()=>{experience=createSession({...options,scenario:id});observations=[];render(true);};q('scenarios').appendChild(b);}
}
render();

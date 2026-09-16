import {createEngine, possessionId} from './engine.mjs';
import {NORMAL, SHOTS, REBOUNDS, DEFENCE, DEF_SHOTS, RECOVERY, BALL_HAND, SPINE, fmt, shotText, reboundText, freeThrowText} from './content.mjs';

export function createGame({seed=1, rolls=[], fixture=null}={}) {
  const e=createEngine(seed,rolls); let screen, revision=0, actions=[], anchor=1, currentSlot='P01',
    spotlight=false, chainDecisions=0, vulnerable=false, recovered=false, sinceDecision=0;
  const state=()=>e.state();
  function show(text, buttons=[],kind='result', extra={}) {
    revision++; actions=buttons.map(b=>b[1]);
    screen={revision,text,kind,choices:buttons.map(b=>b[0]),state:state(),slot:currentSlot,...extra};
    return screen;
  }
  function result(text,next=route){return show(text,[['Continue',next]]);}
  function mark(id){currentSlot=id;e.annotate('AUTHORED_SLOT',{slot:id});}
  function decision(text,choices,handler,type='normal'){
    return show(text,choices.map((label,i)=>[label,()=>{
      e.decision(choices,label,type,currentSlot+'-'+possessionId(state().pos)+'-D'+(state().decisions+1));
      chainDecisions++;sinceDecision=0;return handler(i);
    }]),type==='shooting'?'shooting':'decision');
  }
  function tick(n,cause){e.tick(n,cause);sinceDecision+=n;}
  function terminal(prefix=''){
    const x=state();
    if(x.phase==='halftime'){
      mark('P18');return show(prefix+` Halftime. Magic ${x.score.Magic} — Falcons ${x.score.Falcons}. The first 20 minutes are complete.`,[['RESUME SECOND HALF',()=>{
        e.resume();mark('P19');anchor=19;
        return result(`Second half, 20:00. ${state().team} have the restart. ${state().team==='Magic'?'Your teammate receives the inbound pass. You run forward into space.':'The Falcons inbound. You find your player and get ready to defend.'}`);
      }]],'halftime');
    }
    if(x.ended){mark('P30');const m=x.score.Magic,f=x.score.Falcons;return show(prefix+` Final whistle. Magic ${m} — Falcons ${f}. ${m===f?'The game finishes tied.':m>f?'Magic win!':'Falcons win.'} You were in the game.`,[],'final');}
    return null;
  }
  function finishOutcome(text){
    if(state().clock===0&&state().phase!=='free_throw'){e.boundary();return terminal(text);}
    return result(text);
  }
  function shotResult(model){
    tick(2,'shot_in_flight');const r=e.resolveShot(model);const text=shotText(r);
    if(state().clock===0&&r.outcome!=='foul'){e.boundary();return terminal(text);}
    if(r.outcome==='foul'){mark('P10');return freeThrows(text);}
    if(r.outcome==='miss'||r.outcome==='blocked')return reboundScene(text);
    return finishOutcome(text+` ${state().nextTeam} will inbound.`);
  }
  function shooting(prefix='You receive in a genuine scoring position.'){
    spotlight=true;
    return decision(prefix+' You are inside the three-point line. Which shot will you try?',SHOTS,i=>{
      e.prepareShot(2,'you');
      const attention=state().attention*.008;
      return shotResult({make:[.46,.42,.36,.38][i]-attention,block:[.05,.09,.06,.04][i],foul:i<2?.16:.07});
    },'shooting');
  }
  function freeThrows(prefix=''){
    const f=state().freeThrows;
    return show(prefix,[[(f.next===1?'First':'Second')+' free throw',()=>{
      const r=e.freeThrow(); const text=freeThrowText(r);
      if(state().phase==='free_throw')return freeThrows(text);
      if(state().clock===0){e.boundary();return terminal(text);}
      if(state().phase==='rebound')return reboundScene(text+' The final miss is live.');
      return finishOutcome(text+` ${state().nextTeam} will inbound.`);
    }]],'free_throw');
  }
  function reboundScene(prefix){
    if(spotlight && state().decisions<18 && chainDecisions<4){
      return decision(prefix+' The rebound is within reach. What do you do?',REBOUNDS,i=>{
        tick(2,'rebound_contest');const r=e.rebound(i),text=reboundText(r);
        if(r.expired)return terminal(text);
        if(r.offensive&&r.winner==='you'&&state().decisions<18){mark('P11');return shooting(text+' You turn towards the basket.');}
        if(r.offensive&&r.team==='Falcons')return result(text+' You recover towards the basket.',()=>{
          if(state().decisions<18&&chainDecisions<4)return defensiveShot('The Falcons try again from close range.');
          return background();
        });
        return finishOutcome(text);
      });
    }
    tick(Math.min(2,state().clock),'rebound_contest');return finishOutcome(prefix+' '+reboundText(e.rebound(2)));
  }
  function normal(prefix='Your teammate has the ball. You see open space.'){
    return decision(prefix+' What do you do?',NORMAL,i=>{
      tick(5,'off_ball_movement');if(state().clock===0){e.boundary();return terminal('The horn sounds as the ball moves across court.');}
      const outcome=e.seekBall(i);
      if(outcome==='intercepted')return finishOutcome('The defender intercepts the pass meant for you. Falcons ball next. You turn to recover.');
      if(outcome==='received'&&state().decisions<17&&chainDecisions<2){mark(state().half===1?'P03':'P21');return ballHand();}
      return teammateShot(outcome==='received'?'You receive and move the pass on. A teammate has space.':i===1?'You run into space and draw the defender. Your teammate has a shot.':'The ball moves to a teammate, who finds room to shoot.');
    });
  }
  function ballHand(){
    return decision('You catch the pass. A defender moves towards you. What do you do?',BALL_HAND,i=>{
      tick(4,'ball_handling');if(state().clock===0){e.boundary();return terminal('The half ends before a shot can be released.');}
      const outcome=e.handleBall(i);
      if(outcome==='turnover')return finishOutcome('The defender gets to the ball. Falcons take over. You turn and run back.');
      if(outcome==='shot'&&state().decisions<18)return shooting('You get past the defender and reach shooting space.');
      return teammateShot('You pass out. Your teammate receives and prepares to shoot.');
    });
  }
  function teammateShot(prefix){
    e.prepareShot(2,'teammate');return result(prefix+' They are going for two.',()=>shotResult({make:.38,block:.06,foul:.06}));
  }
  function defence(prefix='The Falcons bring the ball towards you.',isVulnerable=false){
    vulnerable=isVulnerable;
    return decision(prefix+(vulnerable?' The dribbler pushes the ball too far ahead. You have a chance to pressure the ball.':' The ball handler drives towards the basket.'),DEFENCE,i=>{
      tick(4,'defensive_pressure');
      if(state().clock===0){e.boundary();return terminal('The horn sounds before the Falcons can shoot.');}
      if(e.defend(i,vulnerable))return finishOutcome('You get a hand to the ball and steal it! Falcons turnover. Magic ball next.');
      return defensiveShot(i===1?'The dribbler gets past your first step. You recover as they prepare to shoot.':'You stay in the play. The Falcons prepare to shoot.');
    });
  }
  function defensiveShot(prefix='The Falcons prepare to shoot.',value=2){
    e.prepareShot(value,'opponent');
    const text=prefix+(value===3?' They are beyond the arc, going for three.':' They are close to the basket, going for two.');
    if(state().decisions>=18||chainDecisions>=3)return result(text,()=>shotResult({make:.38,block:.06,foul:.06}));
    return decision(text,DEF_SHOTS,i=>shotResult({make:[.32,.36,.43][i],block:[.05,.17,.01][i],foul:[.06,.12,.02][i]}));
  }
  function recovery(){return decision('The Falcons have the ball and you are behind the play. How do you recover?',RECOVERY,i=>{
    tick(5,'defensive_recovery');if(state().clock===0){e.boundary();return terminal('The half ends as you recover.');}
    if(e.defend(i,true))return finishOutcome('You get back into position and take the loose ball. Falcons turnover. Magic have possession next.');
    return defensiveShot('You find your player. The Falcons move the ball and prepare to shoot.');
  });}
  function background(){
    spotlight=false;const x=state();
    if(x.phase==='between'){e.advance();if(state().phase==='halftime'||state().ended)return terminal();}
    if(state().phase==='rebound')return reboundScene('The ball is still live after the miss.');
    if(state().phase==='free_throw')return freeThrows();
    if(state().phase!=='live')throw Error('Unexpected background phase '+state().phase);
    const owner=state().team, pid=possessionId(state().pos), duration=8+Math.floor(e.random()*16);
    tick(duration,'background_ball_movement');
    if(state().clock===0){e.boundary();return terminal(`${owner} move the ball, but cannot release a shot before the horn.`);}
    const event=e.random();
    if(event<.20){e.turnover('pass_intercepted','teammate');return finishOutcome(`${owner} move the ball up court. A defender intercepts the next pass. ${state().nextTeam} have the ball next.`);}
    if(event>.97&&!recovered){recovered=true;e.deadBall();return show(`${owner} attack. A defender knocks the ball out. ${owner} keep the inbound.`,[['Inbound the ball',()=>{e.restart();return result(`${owner} complete the inbound. The same possession continues.`);}]],'dead_ball');}
    recovered=false;
    const value=event>.87?3:2;
    e.prepareShot(value,owner==='Magic'?'teammate':'opponent');
    const trailing=state().score[owner]<state().score[owner==='Magic'?'Falcons':'Magic'];
    return result(`${pid}: ${owner==='Magic'?'Your teammates move the ball. A teammate':'The Falcons work a pass into space. Their player'} ${value===3?'sets up beyond the arc for a three-point attempt.':'finds room near the basket for a two-point attempt.'}`,()=>shotResult({make:trailing?.44:.32,block:.05,foul:.035}));
  }
  function budgetFor(a){
    const d=state().decisions;
    if(a.kind==='shooting')return d<(a.half===1?10:15);
    if(a.kind==='late'||a.kind==='final_play')return d<18;
    if(a.id==='P04')return d<7;
    if(a.id==='P15')return d<10;
    if(a.id==='P20')return d<12;
    if(a.id==='P24'||a.id==='P26'||a.id==='P27')return d<12;
    return d<(a.half===1?5:12);
  }
  function route(){
    let x=state();
    if(x.phase==='between'){e.advance();x=state();}
    if(x.phase==='halftime'||x.ended)return terminal();
    if(x.phase==='rebound')return reboundScene('The missed shot is still live.');
    if(x.phase==='free_throw')return freeThrows();
    // Every retained possession is resolved before selecting a new authored anchor.
    if(x.phase!=='live')throw Error('Unexpected route '+x.phase);
    while(anchor<SPINE.length){
      const a=SPINE[anchor];
      if(a.kind==='branch'||a.half<x.half){anchor++;continue;}
      if(a.half>x.half||x.clock>a.clock)return background();
      if(['halftime','final'].includes(a.kind))return background();
      let wanted=a.team;
      if(a.kind==='late')wanted=x.score.Magic>x.score.Falcons?'Falcons':x.score.Magic<x.score.Falcons?'Magic':x.team;
      if(wanted&&x.team!==wanted)return background();
      anchor++;mark(a.id);spotlight=true;chainDecisions=0;
      if(a.kind==='background'||a.kind==='restart')return background();
      if(a.kind==='event'){e.annotate('STATE_MEMORY',{trust:x.trust,attention:x.attention});return background();}
      if(!budgetFor(a))return background();
      if(a.kind==='normal')return normal(x.half===2&&x.trust>1?'Your teammate looks towards you again. The defender is watching your movement.':undefined);
      if(a.kind==='shooting')return shooting();
      if(a.kind==='defence')return defence(undefined,a.id==='P04'||a.id==='P23');
      if(a.kind==='recovery')return recovery();
      if(a.kind==='late'||a.kind==='final_play')return x.team==='Magic'?shooting('The score is on the board. Your teammate finds you with room to shoot.'):defence('The Falcons have possession with the clock running down.',true);
    }
    return background();
  }
  function start(){e.start();mark('P01');return result('Your teammate wins the opening tip! Magic have the ball. You run forward while your teammates spread out.',()=>{
    tick(24,'opening_advance');spotlight=true;chainDecisions=0;mark('P02');anchor=2;return normal();
  });}
  function enter(mode){
    e.start();mark('QA-'+mode);spotlight=true;chainDecisions=0;anchor=2;
    if(['defence','steal','failed_steal','defshot','defthree','defreb','opponent_rebound','turnover','recovery'].includes(mode)){e.turnover();e.advance();}
    if(mode==='normal')return normal();
    if(mode==='ball_hand')return ballHand();
    if(['shots','miss','block','foul','made','late'].includes(mode)){
      if(mode==='late'){for(let i=0;i<37;i++)tick(30,'qa_setup');}
      return shooting();
    }
    if(['offreb','defreb','opponent_rebound','teammate_rebound'].includes(mode)){
      e.prepareShot(2,state().team==='Magic'?'you':'opponent');e.resolveShot();return reboundScene('The shot misses. The ball is live.');
    }
    if(mode==='ft'){e.prepareShot(2,'you');e.resolveShot();return freeThrows('You are fouled shooting. Two free throws.');}
    if(mode==='steal'||mode==='failed_steal'||mode==='defence')return defence(undefined,true);
    if(mode==='defshot'||mode==='defthree')return defensiveShot(undefined,mode==='defthree'?3:2);
    if(mode==='turnover'||mode==='recovery')return recovery();
    if(mode==='dead'){e.deadBall();return show('The ball is knocked out. Magic keep possession.',[['Inbound the ball',()=>{e.restart();return normal('Magic complete the inbound.');}]],'dead_ball');}
    if(mode==='half'||mode==='final'){
      for(let i=0;i<40;i++)tick(30,'qa_setup');e.boundary();
      if(mode==='half')return terminal();
      e.resume();for(let i=0;i<39;i++)tick(30,'qa_setup');anchor=28;return route();
    }
    throw Error('Unknown fixture '+mode);
  }
  if(fixture)enter(fixture);else show('The crowd is getting loud. The opening tip is about to happen.',[['START GAME 1',start]],'opening');
  return {view:()=>structuredClone(screen),state,trace:()=>e.trace(),
    act(index,expectedRevision=revision){if(expectedRevision!==revision||!Number.isInteger(index)||!actions[index])throw Error('Stale or invalid control');return actions[index]();}};
}

export const FIXTURES={normal:[.2],ball_hand:[.2],shots:[.1],made:[.1],miss:[.99],block:[.47],foul:[.55],
  offreb:[.99,.01],defreb:[.99,.01],opponent_rebound:[.99,.99],teammate_rebound:[.99,.3],
  defence:[.99],steal:[.01],failed_steal:[.99],defshot:[.99],defthree:[.01],ft:[.55,.01,.99],
  turnover:[.01],recovery:[.99],dead:[],half:[],late:[.01],final:[]};

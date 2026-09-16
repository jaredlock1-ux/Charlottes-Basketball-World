import {createGame} from './game.mjs';

// QA supplies inputs to the existing v33 fixture interface, never outcomes.
export const SCENARIOS = Object.freeze({
  'defence-miss-rebound': {label:'Defence → miss → Charlotte rebound', fixture:'defence', seed:1, rolls:[.99,.99,.01,.5,.5,.5]},
  'defence-team-rebound': {label:'Defence → miss → teammate rebound', fixture:'defence', seed:1, rolls:[.99,.99,.50,.5,.5,.5]}
});
export function sessionOptions(search) {
  const p=new URLSearchParams(search), qa=p.get('qa')==='1';
  const scenario=qa ? p.get('scenario') || 'defence-miss-rebound' : null;
  if(scenario && !SCENARIOS[scenario])throw Error('Unknown QA scenario');
  return {qa, scenario, playerView:qa && p.get('player')==='1', full:p.get('full')==='1'};
}
export function createSession(options={}, seed=Date.now()>>>0) {
  const config=options.qa ? SCENARIOS[options.scenario || 'defence-miss-rebound'] : {fixture:'defence',seed};
  if(!config)throw Error('Unknown QA scenario');
  return createExperience(createGame(config));
}

// A pacing adapter only. act() is the ONLY route into the untouched game.
// Display-only beats never tick clocks or add decisions/events. A selected shot
// defence action is committed AFTER flight is shown, so outcome data cannot leak.
export function createExperience(game) {
  let stage='defence', revision=0, selected='', queued=null;
  const lastEvent=type=>game.trace().findLast(e=>e.type===type);
  function view() {
    const source=game.view(), x=source.state;
    let choices=[], text=source.text, heading='', control='beat';
    if(stage==='defence'){heading='They have the ball. Find your player.';text='The Falcons bring the ball up. Your player is coming towards you.';choices=source.choices;control='game';}
    if(stage==='acknowledge'){heading='You stay in the play.';text='You chose: '+selected+'. '+source.text;choices=['Watch the play'];}
    if(stage==='intent'){heading="She’s going to shoot!";text=source.text;choices=source.choices;control='game';}
    if(stage==='flight'){heading='The shot is in the air.';text='You chose: '+selected+'. Watch the ball towards the basket.';choices=['Watch the shot'];}
    if(stage==='miss'){heading='MISSED!';text='The shot comes off the rim. The ball is still live.';choices=['Find the rebound'];}
    if(stage==='rebound'){heading='The rebound is up for grabs!';text='Find yourself, the loose ball and the players around you. What do you do?';choices=source.choices;control='game';}
    if(stage==='outcome'){heading=x.nextTeam==='Magic'?'Your team has the ball!':'The Falcons keep the ball.';text=source.text;choices=['See where we go'];}
    if(stage==='transition'){heading='Now we attack the other way!';text='Magic have possession next. Turn towards the opposite basket with your team.';choices=['Follow the play'];}
    if(stage==='offence'){heading='Your team attacks.';text=source.text;choices=source.choices;control='game';}
    if(stage==='outside'){heading='The game continues.';choices=source.choices;control='game';}
    return {revision,stage,heading,text,choices,control,selected,source,
      court:stage==='outside'?null:projectCourt(source,stage,lastEvent('REBOUND_OUTCOME'))};
  }
  return {view, state:()=>game.state(), trace:()=>game.trace(),
    act(index,expectedRevision=revision){
      const before=view();
      if(expectedRevision!==revision || !Number.isInteger(index) || !before.choices[index])throw Error('Stale or invalid presentation control');
      if(stage==='defence'){
        selected=before.choices[index]; game.act(index,before.source.revision);
        stage=game.state().phase==='attempt'?'acknowledge':'outside';
      }else if(stage==='acknowledge')stage='intent';
      else if(stage==='intent'){
        selected=before.choices[index];queued={index,revision:before.source.revision};stage='flight';
      }else if(stage==='flight'){
        game.act(queued.index,queued.revision);queued=null;
        stage=game.state().phase==='rebound' && lastEvent('SHOT_OUTCOME')?.physicalOutcome==='miss'?'miss':'outside';
      }else if(stage==='miss')stage='rebound';
      else if(stage==='rebound'){
        selected=before.choices[index];game.act(index,before.source.revision);
        stage=game.state().phase==='between' && game.state().nextTeam==='Magic'?'outcome':'outside';
      }else if(stage==='outcome')stage='transition';
      else if(stage==='transition'){
        game.act(0,before.source.revision);
        stage=game.state().team==='Magic' && ['live','attempt'].includes(game.state().phase)?'offence':'outside';
      }else{game.act(index,before.source.revision);stage='outside';}
      revision++;return view();
    }
  };
}

// Semantic coordinates: the engine specifies a team and actor CATEGORY, not ten
// player identities or physics. M1/F1 are stable unnamed visual representatives.
// A between-possession state uses nextTeam; a rebound has NO ball owner even
// though x.team still identifies the shooting possession. No engine writes.
export function projectCourt(source,stage,reboundEvent=null) {
  const x=source.state, changing=x.phase==='between';
  const loose=['flight','miss','rebound'].includes(stage);
  const possession=loose?null:changing?x.nextTeam:x.team;
  const offence=stage==='transition'||stage==='offence';
  let owner=loose?null:possession==='Falcons'?'F1':'M1';
  if(['outcome','transition'].includes(stage) && reboundEvent)owner=reboundEvent.winner==='you'?'C':reboundEvent.winner==='teammate'?'M1':'F1';
  if(stage==='offence' && x.attempt)owner=x.attempt.shooter==='you'?'C':x.attempt.shooter==='teammate'?'M1':'F1';
  const base={C:[69,49],M1:[85,25],M2:[87,73],M3:[55,25],M4:[48,77],F1:[61,48],F2:[75,19],F3:[76,81],F4:[44,22],F5:[37,76]};
  if(['acknowledge','intent','flight'].includes(stage)){
    base.F1=x.attempt?.value===3?[57,50]:[77,48];base.C=x.attempt?.value===3?[64,51]:[71,51];
  }
  if(['miss','rebound','outcome'].includes(stage))Object.assign(base,{C:[80,43],M1:[80,64],M2:[67,76],M3:[57,25],M4:[48,72],F1:[83,27],F2:[91,65],F3:[67,57],F4:[46,22],F5:[38,72]});
  if(offence)Object.assign(base,{C:[43,51],M1:[26,48],M2:[29,79],M3:[40,20],M4:[56,77],F1:[20,46],F2:[20,75],F3:[32,23],F4:[50,25],F5:[63,64]});
  const players=Object.entries(base).map(([id,[px,py]])=>({id,x:px,y:py,team:id[0]==='F'?'Falcons':'Magic',charlotte:id==='C',label:id==='C'?'Charlotte':id[0]==='F'?'Falcon':'Teammate',ownsBall:id===owner}));
  const carrier=players.find(p=>p.id===owner);
  const ball=loose?{owner:null,status:stage==='flight'?'in-flight':'loose',x:stage==='flight'?85:88,y:stage==='flight'?46:51}:{owner,status:changing?'secured':'held',x:carrier.x+3,y:carrier.y+2};
  return {players,ball,possession,shootingTeam:loose?x.team:null,score:{...x.score},clock:x.clock,half:x.half,
    direction:possession==='Magic'?'left':'right',attackingTeam:possession==='Magic'?'Magic':'Falcons',basketX:possession==='Magic'?6:94,
    shotValue:x.attempt?.value || null,assignment:'F1',enginePhase:x.phase,engineTeam:x.team,nextTeam:x.nextTeam,
    possessionLabel:loose?(stage==='flight'?'Ball in flight · no player has it':'Loose ball · up for grabs'):possession==='Magic'?'Magic have the ball':'Falcons have the ball'};
}

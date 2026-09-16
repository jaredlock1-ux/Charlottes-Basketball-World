import {createGame} from './slice-game.mjs';

export const SCENARIOS = Object.freeze({
  primary:{label:'Miss → Charlotte rebound → Magic attack',fixture:'v2_defence',seed:1,rolls:[.99,.99,.01,.2,.2,.1]},
  mixed:{label:'Good contest → Casey scores → Magic attack',fixture:'v2_defence',seed:1,rolls:[.99,.1,.2,.2,.1]},
  teammate:{label:'Miss → Mia rebound → Magic attack',fixture:'defence',seed:1,rolls:[.99,.99,.5,.2,.2,.1]},
  retained:{label:'Falcons rebound → second chance',fixture:'defence',seed:1,rolls:[.99,.99,.99,.1,.2,.2,.1]},
  steal:{label:'Charlotte steals → Magic attack',fixture:'defence',seed:1,rolls:[.01,.2,.2,.1]},
  foul:{label:'Contest → foul → free throws',fixture:'defence',seed:1,rolls:[.99,.4,.1,.99,.01,.2,.2,.1]},
  three:{label:'Casey outside the three-point arc',fixture:'v2_three',seed:1,rolls:[.1,.2,.2,.1]}
});
export function optionsFrom(search){const p=new URLSearchParams(search),qa=p.get('qa')==='1';return {qa,clean:!qa||p.get('player')==='1',scenario:qa?(p.get('scenario')||'primary'):null};}
export function createSlice(options={},seed=Date.now()>>>0){
  if(options.qa&&!SCENARIOS[options.scenario||'primary'])throw Error('Unknown scenario');
  const config=options.qa?{...SCENARIOS[options.scenario||'primary'],fixture:SCENARIOS[options.scenario||'primary'].fixture==='defence'?'v2_defence':SCENARIOS[options.scenario||'primary'].fixture}:{fixture:'v2_defence',seed};
  return createDirector(createGame(config));
}
const labels={
  'Stay in front of them':'Stay in front','Move quickly to cut off their path':'Cut off the drive','Protect the basket':'Protect the basket',
  'Put your hand up and make the shot difficult':'Hand up — contest','Jump to try to block the shot':'Jump for the block','Get ready for the rebound':'Prepare to rebound',
  'Go after the ball':'Go for the ball','Get back to defend':'Get back to defend','Stay ready for the next play':'Stay ready',
  'Move into the open space':'Find open space','Keep moving and stay ready':'Keep moving',
  'Move towards the basket':'Drive to the basket','Pass to the open teammate':'Pass to Mia','Keep the ball and look again':'Hold and look',
  'Pump fake, then layup':'Fake, then layup','Drive for the layup':'Drive for a layup','Side step and take the shot':'Step aside and shoot'
};
// All basketball writes pass through the existing game.act interface. The director
// owns only presentation time, a queued control, and the visible camera beat.
export function createDirector(game){
  let revision=0, stage=game.state().phase==='attempt'?'intent':'arrival', queued=null, magicStarted=false, shot=null, selected=null, lastEvents=[], contestChoice=null;
  const last=type=>game.trace().findLast(e=>e.type===type);
  const set=name=>{stage=name;revision++;};
  function commit(index){const n=game.trace().length;game.act(index,game.view().revision);lastEvents=game.trace().slice(n);}
  function classify(){
    const v=game.view(),x=v.state;
    if(x.ended||x.phase==='halftime'){set('end');return;}
    if(v.kind==='decision'||v.kind==='shooting'){
      if(x.team==='Magic')magicStarted=true;
      set(x.phase==='rebound'?'rebound':x.phase==='attempt'?'intent':v.kind==='shooting'?'shoot':x.team==='Falcons'?'defence':v.text.startsWith('You catch')?'ballhand':'offence');return;
    }
    if(x.phase==='between'){set('secured');return;}
    if(x.phase==='free_throw'){set('foul');return;}
    if(x.phase==='attempt'){shot={...x.attempt};set('teammate-set');return;}
    if(x.phase==='rebound'){set('rebound');return;}
    set('flow');
  }
  function afterCommit(){
    const outcome=lastEvents.find(e=>e.type==='SHOT_OUTCOME');
    const reb=lastEvents.find(e=>e.type==='REBOUND_OUTCOME');
    const ft=lastEvents.find(e=>['FREE_THROW_MADE','FREE_THROW_MISSED'].includes(e.type));
    if(outcome){shot={team:outcome.team,shooter:outcome.shooter,value:outcome.value};set(outcome.physicalOutcome==='made'?'made':outcome.physicalOutcome==='foul'?'foul':outcome.physicalOutcome==='blocked'?'blocked':'miss');return;}
    if(ft){set('ft-result');return;}
    if(reb){set('secured');return;}
    if(lastEvents.some(e=>e.type==='STEAL')){set('steal');return;}
    if(lastEvents.some(e=>e.type==='TURNOVER')){set('turnover');return;}
    classify();
  }
  function view(){
    const source=game.view(),x=source.state, decision=['defence','intent','rebound','offence','ballhand','shoot'].includes(stage);
    const reb=last('REBOUND_OUTCOME'), currentShot=shot||x.attempt;
    const shooter=currentShot?.team==='Magic'?(currentShot.shooter==='you'?'You':'Mia'):'Casey';
    const who=shooter==='You'?'You':shooter;
    const ft=lastEvents.find(e=>['FREE_THROW_MADE','FREE_THROW_MISSED'].includes(e.type));
    const text={arrival:['Here come the Falcons.','Find Casey. She has the ball.'],defence:['Casey drives towards the basket.','You’re in her way. What do you do?'],pressure:[selected===1?'Casey changes pace.':'You move with Casey.',''],intent:[x.attempt?.value===3?'Casey lines up a three.':'Casey’s going to shoot!','How will you defend the shot?'],flight:[who==='You'?'You shoot!':who+' shoots!',''],miss:[who==='You'?'Off the rim!':who+' misses!','The ball is still live.'],blocked:['The shot is blocked!','The ball is still live.'],rebound:['The rebound is up for grabs!','What do you do?'],contest:['You react to the loose ball.',''],secured:[reb?.winner==='you'?'You grab it! Great rebound!':reb?.winner==='teammate'?'Mia grabs the rebound!':'Casey gets the rebound!',''],steal:['You get a hand to it!','You steal the ball. Magic possession.'],turnover:['The pass is picked off.',''+x.nextTeam+' have the ball.'],transition:['Your team races the other way!',''],offence:['Mia brings the ball up.','Find your chance to help.'],offmove:['You move into the play.',''],ballhand:['You catch the pass!','A defender closes in.'],drive:['You take on the defender.',''],shoot:['You have room near the basket.','Which shot will you try?'],'teammate-set':['Mia has room to shoot.',''],made:[who==='You'?'SWISH! You got it!':who==='Casey'&&selected===0?'Great defence — but Casey makes a tough shot!':who+' scores!',''],foul:['A whistle! A shooting foul.','Two free throws.'],'ft-flight':[(x.team==='Magic'?'Magic':'Casey')+' at the line.',''],'ft-result':[ft?.type==='FREE_THROW_MADE'?'The free throw goes in!':'The free throw misses.',''],flow:['The ball moves on.',''],end:['That’s basketball. You’re in the game.','Defend. React. Attack. Every play has a next moment.']}[stage];
    if(stage==='transition'&&x.nextTeam==='Falcons')text.splice(0,2,'The Falcons bring it back.','Find Casey again.');
    if(stage==='offmove')text[0]=selected===0?'You call for the ball.':selected===1?'You sprint into space.':'You keep moving.';
    if(stage==='drive')text[0]=selected===1?'You look for Mia.':selected===2?'You hold the ball and look.':'You take on the defender.';
    if(stage==='steal'&&last('STEAL')?.player!=='you')text.splice(0,2,(last('STEAL')?.team==='Magic'?'Mia':'Casey')+' intercepts the pass!',last('STEAL')?.team+' possession.');
    if(stage==='teammate-set'&&x.team==='Falcons')text.splice(0,2,'Casey has room to shoot.','');
    if(stage==='made'&&who==='Casey')text[0]=contestChoice===0?'Great defence — but Casey makes a tough shot!':'Casey scores!';
    const art=stage==='secured'&&reb?.winner==='you'?'rebound':stage==='made'&&who==='Casey'&&contestChoice===0&&currentShot?.value===2?'contest':null;
    return {revision,stage,heading:text[0],text:text[1],choices:decision?source.choices.map(s=>labels[s]||s):[],decision,source,shot:currentShot,art,selected,magicStarted,
      delay:decision||stage==='end'?null:art?4400:['made','secured','ft-result','turnover','steal'].includes(stage)?2600:['flight','ft-flight'].includes(stage)?1400:stage==='transition'?2400:stage==='arrival'?1800:stage==='miss'?1500:1200};
  }
  return {view,state:()=>game.state(),trace:()=>game.trace(),
    choose(index,expected=revision){const v=view();if(expected!==revision||!v.decision||!Number.isInteger(index)||!v.choices[index])throw Error('Stale or invalid decision');queued=index;selected=index;
      if(stage==='intent'||stage==='shoot'){contestChoice=stage==='intent'?index:null;shot=game.state().attempt||{team:'Magic',shooter:'you',value:2};set('flight');}
      else set(stage==='rebound'?'contest':stage==='defence'?'pressure':stage==='ballhand'?'drive':'offmove');
      return view();
    },
    advance(expected=revision){if(expected!==revision||view().decision||stage==='end')throw Error('Not an automatic beat');
      if(stage==='arrival')set('defence');
      else if(queued!==null){const i=queued;queued=null;commit(i);afterCommit();}
      else if(stage==='teammate-set'){contestChoice=null;shot={...game.state().attempt};queued=0;set('flight');}
      else if(stage==='foul'){set('ft-flight');}
      else if(stage==='ft-flight'){commit(0);afterCommit();}
      else if(stage==='transition'){commit(0);afterCommit();}
      else if(['secured','made','steal','turnover','ft-result'].includes(stage)){
        const x=game.state();
        if(x.phase==='between')set(magicStarted?'end':'transition');
        else if(x.phase==='free_throw')set('ft-flight');
        else if(game.view().kind==='result'){commit(0);classify();}
        else classify();
      }else if(['miss','blocked'].includes(stage))classify();
      else {commit(0);classify();}
      return view();
    }
  };
}

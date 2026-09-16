export const ROSTER=Object.freeze([
  {id:'C',name:'Charlotte',number:10,team:'Magic'},
  {id:'M1',name:'Mia',number:5,team:'Magic'},
  {id:'M2',name:'Zoe',number:6,team:'Magic'},
  {id:'M3',name:'Avery',number:11,team:'Magic'},
  {id:'M4',name:'Harper',number:14,team:'Magic'},
  {id:'F1',name:'Casey',number:9,team:'Falcons'},
  {id:'F2',name:'Taylor',number:4,team:'Falcons'},
  {id:'F3',name:'Morgan',number:6,team:'Falcons'},
  {id:'F4',name:'Riley',number:7,team:'Falcons'},
  {id:'F5',name:'Jordan',number:12,team:'Falcons'}
]);
export function courtModel(v,trace){
  const x=v.source.state,s=v.stage, reb=trace.findLast(e=>e.type==='REBOUND_OUTCOME');
  const ft=trace.findLast(e=>['FREE_THROW_MADE','FREE_THROW_MISSED'].includes(e.type));
  const flight=['flight','ft-flight'].includes(s),loose=['miss','blocked','rebound','contest'].includes(s)||(s==='ft-result'&&x.phase==='rebound');
  const possession=flight||loose?null:x.phase==='between'?x.nextTeam:x.team;
  const attacking=flight||loose||['made','foul','ft-result'].includes(s)?v.shot?.team||x.team:possession||x.team;
  const magic=attacking==='Magic', basket=magic?60:940;
  const positions={C:[685,280],M1:[790,135],M2:[800,425],M3:[475,120],M4:[450,435],F1:[600,280],F2:[875,115],F3:[875,440],F4:[400,120],F5:[365,440]};
  const attackingStage=['transition','offence','offmove','ballhand','drive','shoot','teammate-set'].includes(s)||magic&&['flight','made','foul','ft-flight','ft-result','miss','rebound','contest','blocked'].includes(s);
  if(attackingStage){
    Object.assign(positions,{C:[300,285],M1:[375,170],M2:[320,430],M3:[540,120],M4:[595,430],F1:[220,275],F2:[245,135],F3:[235,415],F4:[445,135],F5:[505,405]});
    if(!magic)for(const p of Object.values(positions))p[0]=1000-p[0];
  }
  if(s==='arrival'){positions.F1=[500,280];positions.C=[620,280];}
  if(['pressure','intent','flight','foul','ft-flight','ft-result','made'].includes(s)&&!magic){positions.F1=v.shot?.value===3||x.attempt?.value===3?[650,280]:[810,280];positions.C=[positions.F1[0]+50,300];}
  if(['shoot','drive'].includes(s)){positions.C=[200,280];positions.F1=[145,290];}
  if(['ballhand','offmove'].includes(s))positions.C=[300,245];
  let shooter=v.shot?.shooter==='you'?'C':v.shot?.team==='Magic'?'M1':'F1';
  if(['teammate-set','flight'].includes(s)&&magic){
    positions[shooter]=v.shot?.value===3?[350,280]:[210,265];
    // Keep Casey on the basket side of Charlotte's release, visibly separate.
    if(shooter==='C')positions.F1=[positions.C[0]-55,positions.C[1]+25];
  }
  if(['miss','blocked','rebound','contest','secured'].includes(s)){
    const left=v.shot?.team==='Magic';
    Object.assign(positions,{C:[820,235],M1:[810,345],M2:[700,430],F1:[865,300],F2:[560,120],F3:[770,420],F5:[925,380]});
    if(left)for(const p of Object.values(positions))p[0]=1000-p[0];
  }
  let owner=possession==='Magic'?'M1':'F1';
  if(['ballhand','drive','shoot'].includes(s))owner='C';
  if(['intent','pressure'].includes(s))owner='F1';
  if(s==='teammate-set')owner=x.team==='Magic'?'M1':'F1';
  if(s==='secured')owner=reb?.winner==='you'?'C':reb?.winner==='teammate'?'M1':'F1';
  if(s==='steal')owner='C';
  if(['foul','ft-result'].includes(s))owner=shooter;
  if(['foul','ft-flight','ft-result'].includes(s))positions[shooter]=[v.shot?.team==='Magic'?205:795,280];
  if(flight||loose||s==='made'||s==='ft-result'||s==='end')owner=null;
  const players=ROSTER.map(p=>({...p,x:positions[p.id][0],y:positions[p.id][1],ownsBall:p.id===owner}));
  const carrier=players.find(p=>p.id===owner);
  const inNet=s==='made'||s==='ft-result'&&ft?.type==='FREE_THROW_MADE';
  const ball={owner,status:flight?'in-flight':loose?'loose':inNet?'through-net':owner?'held':'dead',x:carrier?carrier.x+25:basket,y:carrier?carrier.y+8:inNet?310:280};
  const origin=positions[shooter]||[810,280];
  return {players,ball,origin:{x:origin[0],y:origin[1]},possession,attacking,direction:magic?'left':'right',basket,score:x.score,clock:x.clock,half:x.half,shotValue:v.shot?.value||null};
}
export function courtShell(){return `<svg viewBox="0 0 1000 560" role="img" aria-labelledby="court-title court-desc"><title id="court-title">Basketball court</title><desc id="court-desc"></desc><defs><linearGradient id="wood-g" x2="0" y2="1"><stop stop-color="#ffd69a"/><stop offset=".5" stop-color="#edb974"/><stop offset="1" stop-color="#f6ca89"/></linearGradient><pattern id="planks" width="160" height="36" patternUnits="userSpaceOnUse"><path d="M0 0H160M80 0V36" stroke="#a87334" opacity=".16" fill="none"/></pattern><filter id="shadow"><feDropShadow dy="3" stdDeviation="3" flood-opacity=".3"/></filter></defs><rect x="8" y="8" width="984" height="544" rx="18" fill="url(#wood-g)"/><rect x="8" y="8" width="984" height="544" rx="18" fill="url(#planks)"/><g fill="none" stroke="#fff6de" stroke-width="3"><rect x="28" y="28" width="944" height="504"/><path d="M500 28V532"/><circle cx="500" cy="280" r="64"/><path d="M28 181H205V379H28M972 181H795V379H972"/><circle cx="205" cy="280" r="62"/><circle cx="795" cy="280" r="62"/><path d="M28 55H60A225 225 0 0 1 60 505H28M972 55H940A225 225 0 0 0 940 505H972"/></g><g fill="#066798" fill-opacity=".7"><path d="M28 183H145V377H28ZM972 183H855V377H972Z"/></g><g stroke="#fff" stroke-width="5" fill="none"><path d="M42 246V314M958 246V314"/></g><g stroke="#d45416" stroke-width="5" fill="none"><circle cx="60" cy="280" r="12"/><circle cx="940" cy="280" r="12"/></g><path id="attack-arrow" d="M0 0H64L49 -9M64 0L49 9" fill="none" stroke="#18394a" opacity=".5" stroke-width="3"/><g id="tokens">${ROSTER.map(p=>`<g id="token-${p.id}" data-player="${p.id}" data-team="${p.team}" class="token ${p.id==='C'?'charlotte':''}" style="--token:${p.id==='C'?'#d02b93':p.team==='Magic'?'#7448ad':'#b93443'}"><circle class="halo" r="29"/><circle class="disc" r="22"/><text class="number" y="7">${p.number}</text><text class="name" y="-37">${p.name}</text></g>`).join('')}</g><g id="ball" data-ball="one"><circle r="12" fill="#ff8b28" stroke="#713309" stroke-width="2"/><path d="M-11 0H11M0-11V11M-7-9Q3 0-7 9M7-9Q-3 0 7 9" fill="none" stroke="#713309" stroke-width="1.2"/></g></svg>`;}

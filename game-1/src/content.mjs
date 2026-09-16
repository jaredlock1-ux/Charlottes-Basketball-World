export const NORMAL = ['Call for the ball','Move into the open space','Keep moving and stay ready'];
export const SHOTS = ['Pump fake, then layup','Drive for the layup','Take the shot','Side step and take the shot'];
export const REBOUNDS = ['Go after the ball','Get back to defend','Stay ready for the next play'];
export const DEFENCE = ['Stay in front of them','Move quickly to cut off their path','Protect the basket'];
export const DEF_SHOTS = ['Put your hand up and make the shot difficult','Jump to try to block the shot','Get ready for the rebound'];
export const RECOVERY = ['Get back to defend','Find your player','Move towards the ball'];
export const BALL_HAND = ['Move towards the basket','Pass to the open teammate','Keep the ball and look again'];
// Authored slot identity is independent from runtime possession identity.
// Branch-only slots are emitted by the live chain; anchors wait for the correct owner.
export const SPINE = [
  ['P01',1,1200,'tip'],['P02',1,1176,'normal','Magic'],['P03',1,null,'branch'],
  ['P04',1,1080,'defence','Falcons'],['P05',1,990,'background','Magic'],
  ['P06',1,945,'normal','Magic'],['P07',1,null,'branch'],['P08',1,870,'defence','Falcons'],
  ['P09',1,810,'shooting','Magic'],['P10',1,null,'branch'],['P11',1,null,'branch'],
  ['P12',1,690,'defence','Falcons'],['P13',1,570,'normal','Magic'],['P14',1,null,'branch'],
  ['P15',1,450,'recovery','Falcons'],['P16',1,330,'normal','Magic'],['P17',1,150,'normal','Magic'],
  ['P18',1,0,'halftime'],['P19',2,1200,'restart'],['P20',2,1170,'normal','Magic'],
  ['P21',2,null,'branch'],['P22',2,960,'shooting','Magic'],['P23',2,900,'defence','Falcons'],
  ['P24',2,720,'normal','Magic'],['P25',2,540,'event'],['P26',2,360,'normal','Magic'],
  ['P27',2,240,'normal','Magic'],['P28',2,120,'late'],['P29',2,30,'final_play'],['P30',2,0,'final']
].map(([id,half,clock,kind,team])=>({id,half,clock,kind,team}));
export const fmt = clock => String(Math.floor(clock / 60)).padStart(2,'0') + ':' + String(clock % 60).padStart(2,'0');
export function shotText(result) {
  const who = result.shooter === 'you' ? 'Your' : result.team === 'Magic' ? 'Your teammate’s' : 'The Falcons’';
  const shot = result.value === 3 ? 'three-point shot' : 'shot';
  if (result.outcome === 'made') return `${who} ${shot} is good! ${result.value} points for ${result.team}.`;
  if (result.outcome === 'foul') return `${who} ${shot} draws a shooting foul. No basket. Two free throws for ${result.team}.`;
  return `${who} ${shot} ${result.outcome === 'blocked' ? 'is blocked' : 'misses'}. No points. The ball is live.`;
}
export function reboundText(r) {
  if(r.expired) return 'The horn sounds before anyone can collect the rebound.';
  const who = r.winner === 'you' ? 'You win the rebound.' : r.winner === 'teammate' ? 'Your teammate wins the rebound.' : 'The Falcons win the rebound.';
  return `${who} ${r.offensive ? r.team + ' keep the same possession for a second chance.' : r.team + ' have the ball next.'}`;
}
export function freeThrowText(f) {
  return `${f.index === 1 ? 'First' : 'Second'} free throw for ${f.team}: ${f.made ? 'good! One point.' : 'missed. No point.'}`;
}

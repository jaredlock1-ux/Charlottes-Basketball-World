export const VERSION = 'G1-engine-1.4.0';
export const other = team => team === 'Magic' ? 'Falcons' : 'Magic';
export const possessionId = n => 'G1-P' + String(n).padStart(2, '0');

// The engine owns score, clock, ball and possession. Presentation receives copies.
export function createEngine(seed = 314159, rolls = []) {
  let rng = seed >>> 0, scripted = [...rolls], events = [];
  let x = { version: VERSION, seed, half: 1, clock: 1200, score: {Magic: 0, Falcons: 0},
    team: null, pos: 0, phase: 'opening', ball: 'dead', nextTeam: null,
    decisions: 0, shots: 0, points: 0, rebounds: 0, stops: 0, turnovers: 0,
    teamRebounds: {Magic: 0, Falcons: 0}, teamTurnovers: {Magic: 0, Falcons: 0},
    pressure: 'low', fatigue: 'low', attempt: null, freeThrows: null, ended: false,
    restartTeam: 'Falcons', askedForBall: 0, wentIntoSpace: 0, goodPasses: 0, bravePlays: 0,
    looseBalls: 0, wentAfterBall: 0, trust: 0, attention: 0, recoveredAfterMistake: 0, mistake: false };
  const state = () => structuredClone(x);
  function emit(type, detail = {}) {
    events.push({id: 'E' + (events.length + 1), type, cause: detail.cause || type.toLowerCase(),
      playerAction: null, physicalOutcome: null, scoreChange: 0, possessionChange: null,
      ...detail, stateAfter: state()});
  }
  function requirePhase(...phases) {
    if (x.ended || !phases.includes(x.phase)) throw Error('Invalid action in ' + x.phase);
  }
  function random() {
    const before = rng;
    rng = (Math.imul(1664525, rng) + 1013904223) >>> 0;
    const value = scripted.length ? scripted.shift() : rng / 4294967296;
    if (!(value >= 0 && value < 1)) throw Error('Invalid random input');
    emit('RANDOM_DRAW', {seedBefore: before, value});
    return value;
  }
  function pressure() {
    x.pressure = x.clock <= 120 ? 'late' : x.clock <= 480 ? 'high' : x.clock <= 900 ? 'moderate' : 'low';
    const elapsed = (x.half - 1) * 1200 + 1200 - x.clock;
    x.fatigue = elapsed >= 1800 ? 'high' : elapsed >= 900 ? 'moderate' : 'low';
  }
  function tick(seconds, cause) {
    requirePhase('live', 'rebound', 'attempt');
    if (!Number.isInteger(seconds) || seconds < 0 || seconds > 30 || !cause) throw Error('Clock requires a bounded live event');
    const elapsed = Math.min(seconds, x.clock);
    x.clock -= elapsed; pressure();
    emit('CLOCK_TICK', {cause, elapsed});
  }
  function begin(team, cause) {
    if (!['Magic', 'Falcons'].includes(team) || x.ended || !['opening', 'between', 'halftime'].includes(x.phase)) throw Error('Invalid possession start');
    x.team = team; x.pos++; x.phase = 'live'; x.ball = 'live'; x.nextTeam = null;
    x.attempt = null;
    emit('POSSESSION_START', {cause, possessionChange: team, possessionId: possessionId(x.pos)});
  }
  function end(cause, nextTeam) {
    x.phase = 'between'; x.ball = 'dead'; x.nextTeam = nextTeam;
    emit('POSSESSION_END', {cause, nextTeam, possessionId: possessionId(x.pos)});
  }
  function boundary() {
    if (x.phase === 'halftime' || x.ended) return true;
    if (x.clock !== 0 || x.phase === 'free_throw') return false;
    if (x.phase !== 'between') end('period_expired', null);
    x.restartTeam = x.nextTeam || other(x.team || 'Magic');
    x.nextTeam = null; x.team = null;
    if (x.half === 1) { x.phase = 'halftime'; x.ball = 'dead'; emit('HALFTIME'); }
    else { x.phase = 'final'; x.ball = 'ended'; x.ended = true; emit('FINAL_WHISTLE', {finalScore: {...x.score}}); }
    return true;
  }
  function advance() {
    requirePhase('between');
    if (!boundary()) begin(x.nextTeam, 'resolved_possession');
  }
  function decision(choices, chosen, type, id) {
    requirePhase('live', 'rebound', 'attempt');
    if ((type === 'shooting' ? choices.length !== 4 : choices.length !== 3) || !choices.includes(chosen)) throw Error('Choice contract');
    x.decisions++;
    emit('DECISION', {playerAction: chosen, decisionType: type, decisionId: id,
      choiceId: id + '-C' + (choices.indexOf(chosen) + 1), choices: [...choices]});
  }
  function prepareShot(value, shooter = 'teammate') {
    requirePhase('live');
    if (![2, 3].includes(value) || !['you', 'teammate', 'opponent'].includes(shooter)) throw Error('Attempt contract');
    if ((shooter === 'opponent') !== (x.team === 'Falcons')) throw Error('Shooter ownership');
    x.attempt = {team: x.team, shooter, value}; x.phase = 'attempt';
    if (shooter === 'you') x.shots++;
    emit('ATTEMPT_ESTABLISHED', {team: x.team, shotValue: value, shooter,
      physicalOutcome: value === 3 ? 'three_point_attempt' : 'two_point_attempt'});
  }
  function score(team, value, type, detail) {
    x.score[team] += value;
    if (detail.shooter === 'you') x.points += value;
    emit(type, {...detail, team, scoreChange: value});
  }
  function resolveShot({make = .40, block = .08, foul = .12} = {}) {
    requirePhase('attempt');
    if ([make, block, foul].some(v => v < 0) || make + block + foul > 1) throw Error('Shot probabilities');
    const a = {...x.attempt}, r = random();
    const outcome = r < make ? 'made' : r < make + block ? 'blocked' : r < make + block + foul ? 'foul' : 'miss';
    emit('SHOT_OUTCOME', {...a, shotValue: a.value, physicalOutcome: outcome});
    if (outcome === 'made') {
      score(a.team, a.value, 'MADE_BASKET', {...a, physicalOutcome: 'made_basket'});
      end('made_basket', other(a.team));
    } else if (outcome === 'foul') {
      x.phase = 'free_throw'; x.ball = 'free_throw';
      x.freeThrows = {team: a.team, shooter: a.shooter, total: 2, next: 1};
      emit('SHOOTING_FOUL', {freeThrows: 2, team: a.team});
    } else {
      x.phase = 'rebound'; x.ball = 'live';
      emit(outcome === 'miss' ? 'SHOT_MISS' : 'SHOT_BLOCK', {team: a.team, physicalOutcome: outcome});
    }
    return {...a, outcome};
  }
  function rebound(actionIndex) {
    requirePhase('rebound');
    if (![0, 1, 2].includes(actionIndex)) throw Error('Rebound action');
    if (x.clock === 0) { boundary(); return {expired: true}; }
    const offense = x.team, r = random();
    // Positioning changes chances; no button selects the winner.
    const you = offense === 'Magic' ? [.22, .04, .08][actionIndex] : [.40, .18, .24][actionIndex];
    const teammate = offense === 'Magic' ? [.16, .20, .28][actionIndex] : [.35, .48, .46][actionIndex];
    const winner = r < you ? 'you' : r < you + teammate ? 'teammate' : 'opponent';
    const team = winner === 'opponent' ? 'Falcons' : 'Magic';
    if (actionIndex === 0) x.wentAfterBall++;
    if (winner === 'you') { x.rebounds++; x.looseBalls++; }
    x.teamRebounds[team]++;
    x.phase = 'live'; x.attempt = null;
    emit('REBOUND_OUTCOME', {winner, team, physicalOutcome: winner + '_rebound', offensive: team === offense});
    if (team === offense) emit('SECOND_CHANCE', {team, physicalOutcome: 'offense_retains_ball'});
    else end('defensive_rebound', team);
    return {winner, team, offensive: team === offense};
  }
  function freeThrow(makeChance = .65) {
    requirePhase('free_throw');
    const f = {...x.freeThrows}, made = random() < makeChance;
    if (made) score(f.team, 1, 'FREE_THROW_MADE', {...f, index: f.next, physicalOutcome: 'made_free_throw'});
    else emit('FREE_THROW_MISSED', {...f, index: f.next, physicalOutcome: 'missed_free_throw'});
    x.freeThrows.next++;
    if (f.next === f.total) {
      x.freeThrows = null;
      if (made) end('last_free_throw_made', other(f.team));
      else { x.phase = 'rebound'; x.ball = 'live'; emit('LIVE_BALL', {cause: 'last_free_throw_missed'}); }
    }
    return {made, index: f.next, total: f.total, team: f.team};
  }
  function turnover(cause = 'lost_ball', stealBy = null) {
    requirePhase('live');
    const team = x.team;
    x.teamTurnovers[team]++; x.turnovers++;
    emit('TURNOVER', {team, physicalOutcome: cause});
    if (team === 'Magic') x.mistake = true;
    if (stealBy) { if (stealBy === 'you') { x.stops++; if(x.mistake)x.recoveredAfterMistake++; x.mistake=false; } emit('STEAL', {team: other(team), player: stealBy, physicalOutcome: 'steal'}); }
    end(cause, other(team));
  }
  function defend(actionIndex, vulnerable = false) {
    requirePhase('live');
    if (x.team !== 'Falcons' || ![0, 1, 2].includes(actionIndex)) throw Error('Defence contract');
    const chance = vulnerable ? [.65, .80, .45][actionIndex] : [.08, .14, .04][actionIndex];
    const success = random() < chance;
    if (success) turnover('defensive_pressure', 'you');
    else emit('DEFENSIVE_RECOVERY', {physicalOutcome: actionIndex === 1 ? 'dribbler_gets_past' : 'opponent_retains_ball'});
    return success;
  }
  function deadBall(cause = 'out_of_bounds') {
    requirePhase('live'); x.phase = 'dead_ball'; x.ball = 'dead'; emit('DEAD_BALL', {cause});
  }
  function restart() {
    requirePhase('dead_ball'); x.phase = 'live'; x.ball = 'live'; emit('RESTART', {team: x.team});
  }
  function resume() {
    requirePhase('halftime'); x.half = 2; x.clock = 1200; pressure();
    begin(x.restartTeam, 'second_half_restart'); emit('SECOND_HALF_START');
  }
  function seekBall(index) {
    requirePhase('live'); if(x.team!=='Magic'||![0,1,2].includes(index))throw Error('Offence contract');
    if(index===0){x.askedForBall++;x.trust=Math.min(5,x.trust+1);x.attention=Math.min(5,x.attention+1);x.bravePlays++;}
    if(index===1){x.wentIntoSpace++;x.trust=Math.min(5,x.trust+.5);}
    const r=random(), receive=[.60+x.trust*.025,.50+x.trust*.025,.18][index];
    if(index===0&&r>.94){turnover('pass_intercepted');return 'intercepted';}
    const outcome=r<receive?'received':'teammate_continues';
    emit('PASS', {physicalOutcome:outcome, playerAction:index});return outcome;
  }
  function handleBall(index) {
    requirePhase('live');if(x.team!=='Magic'||![0,1,2].includes(index))throw Error('Ball handling contract');
    const r=random();
    if(r>(index===1?.90:index===2?.78:.92)){turnover('ball_intercepted');return 'turnover';}
    if(index===0&&r<.72){x.bravePlays++;emit('DRIVE',{physicalOutcome:'scoring_space'});return 'shot';}
    x.goodPasses++;emit('PASS',{physicalOutcome:'teammate_receives'});return 'pass';
  }
  return {state, trace: () => structuredClone(events), decision, tick, random, prepareShot,
    resolveShot, rebound, freeThrow, turnover, defend, deadBall, restart, advance, boundary, resume, seekBall, handleBall,
    start() { requirePhase('opening'); begin('Magic', 'opening_tip'); emit('TIP_OFF', {physicalOutcome: 'Magic_win_tip'}); },
    annotate(type, detail) { emit(type, detail); }};
}

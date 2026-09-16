export const escapeHtml=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function courtMarkup(model,stage) {
  const p=model.players, flight=model.ball.status==='in-flight';
  return `<svg class="court" viewBox="0 0 1000 560" role="img" aria-labelledby="court-title court-description" data-stage="${stage}" data-possession="${model.possession || 'none'}" data-direction="${model.direction}">
  <title id="court-title">${escapeHtml(model.possessionLabel)}</title>
  <desc id="court-description">Ten players. Charlotte is the highlighted Magic player. ${model.attackingTeam} attack ${model.direction}. ${model.ball.owner?`Ball carrier: ${model.ball.owner==='C'?'Charlotte':model.ball.owner[0]==='M'?'a teammate':'a Falcon'}.`:'No player holds the ball.'}</desc>
  <defs><pattern id="wood" width="100" height="40" patternUnits="userSpaceOnUse"><path d="M0 0H100M0 40H100M50 0V40" fill="none" stroke="#deb97e" stroke-width="1"/></pattern></defs>
  <rect x="10" y="10" width="980" height="540" rx="16" fill="#edcc97"/>
  <rect x="10" y="10" width="980" height="540" rx="16" fill="url(#wood)"/>
  <g fill="none" stroke="#fff9ea" stroke-width="3"><rect x="27" y="28" width="946" height="504"/><path d="M500 28V532"/><circle cx="500" cy="280" r="64"/>
  <path d="M27 183H206V377H27M973 183H794V377H973"/><circle cx="206" cy="280" r="62"/><circle cx="794" cy="280" r="62"/>
  <path data-arc="left" d="M27 55H60 A225 225 0 0 1 60 505H27"/><path data-arc="right" d="M973 55H940 A225 225 0 0 0 940 505H973"/></g>
  <g class="basket" stroke="#172e37" stroke-width="5" fill="none"><path d="M45 250V310M955 250V310"/><circle cx="60" cy="280" r="12"/><circle cx="940" cy="280" r="12"/></g>
  <g fill="#203c41" font-size="14" font-family="system-ui" font-weight="700"><text x="62" y="44">BASKET</text><text x="858" y="44">BASKET</text></g>
  ${stage==='intent'?`<path d="M${p.find(x=>x.id==='F1').x*10} ${p.find(x=>x.id==='F1').y*5.6} Q850 160 932 274" stroke="#7a3c16" stroke-width="4" stroke-dasharray="8 9" fill="none"/><circle cx="940" cy="280" r="28" fill="none" stroke="#ed6d2b" stroke-width="5"/>`:''}
  ${p.map(player=>`<g class="player ${player.charlotte?'charlotte':''}" data-player="${player.id}" data-team="${player.team}" data-ball-owner="${player.ownsBall}" transform="translate(${player.x*10} ${player.y*5.6})">
    ${player.charlotte?'<circle r="29" fill="none" stroke="#fff9da" stroke-width="6"/><circle r="33" fill="none" stroke="#164d4c" stroke-width="2"/>':''}
    <circle r="21" fill="${player.team==='Magic'?'#126665':'#824282'}" stroke="${player.team==='Magic'?'#063e40':'#532351'}" stroke-width="3"/>
    <text text-anchor="middle" y="6" fill="white" font-family="system-ui" font-size="17" font-weight="800">${player.charlotte?'C':player.team==='Magic'?'M':'F'}</text>
    ${player.charlotte?'<rect x="-48" y="36" width="96" height="25" rx="12" fill="#123d3b"/><text x="0" y="53" fill="white" text-anchor="middle" font-family="system-ui" font-size="15" font-weight="700">Charlotte</text>':''}
    ${player.id==='F1'&&!['transition','offence'].includes(stage)?'<rect x="-48" y="-58" width="96" height="23" rx="11" fill="#663264"/><text x="0" y="-42" fill="white" text-anchor="middle" font-family="system-ui" font-size="14" font-weight="700">Your player</text>':''}
  </g>`).join('')}
  <g class="basketball ${flight?'flying':''}" data-ball="one" data-owner="${model.ball.owner||'none'}" data-status="${model.ball.status}" transform="translate(${model.ball.x*10} ${model.ball.y*5.6})"><circle r="13" fill="#fd9038" stroke="#542e18" stroke-width="2"/><path d="M-12 0H12M0-12V12M-8-10Q5 0-8 10M8-10Q-5 0 8 10" fill="none" stroke="#713d18" stroke-width="1.3"/></g>
  </svg>`;
}

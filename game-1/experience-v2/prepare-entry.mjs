import fs from 'node:fs';
// Add one slice entry to a separate copy of the certified authoring controller.
// The engine and every production decision/result handler remain byte-identical.
// Like v1's `defence` fixture, setup uses actual engine operations. The anchor is
// P02, allowing the next Magic possession to reach the existing off-ball handler.
const source=fs.readFileSync(new URL('../src/game.mjs',import.meta.url),'utf8');
const needle="    if(mode==='normal')return normal();";
if(source.split(needle).length!==2)throw Error('Authoring entry boundary changed');
const entry=`    if(mode==='v2_defence'||mode==='v2_three'){
      tick(24,'slice_opening_advance');e.turnover('opening_pass_intercepted');e.advance();
      anchor=1;return mode==='v2_three'?defensiveShot(undefined,3):defence(undefined,true);
    }
`;
fs.writeFileSync(new URL('./slice-game.mjs',import.meta.url),source.replace(needle,entry+needle).replace("from './engine.mjs'","from '../src/engine.mjs'").replace("from './content.mjs'","from '../src/content.mjs'"));

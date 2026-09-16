import {fileURLToPath} from 'node:url';
process.chdir(fileURLToPath(new URL('../',import.meta.url)));
import fs from 'node:fs';import crypto from 'node:crypto';
const d='docs/authoritative-originals/';
const recovered=fs.readFileSync('game-1/reference/recovered-specs.md','utf8');
const tree=fs.readFileSync(d+"Charlotte's Basketball World — Game 1 Complete Possession Tree v1.0.md",'utf8');
const block=recovered.split('```text')[1]?.split('```')[0]?.trim();
const normalize=s=>s.replace(/\*\*/g,'').replace(/\r/g,'').replace(/\s+/g,' ').trim();
const originalFiles=fs.readdirSync(d).filter(n=>n.endsWith('.md'));
const locals=['game-1/RULES.md','game-1/README.md','game-1/reference/recovered-specs.md','game-1/DEFECTS.md','game-1/QA-REPORT.md'];
const result={treeRecoveredBlockExact:block===tree.trim(),treeFormattingNormalizedEqual:normalize(block||'')===normalize(tree),originalsMatchingExistingLocalFiles:originalFiles.flatMap(n=>locals.filter(p=>fs.readFileSync(d+n).equals(fs.readFileSync(p))).map(p=>({original:n,local:p}))),recoveredEnds:recovered.slice(-100)};
fs.writeFileSync('evidence/releases/originals-comparison.json',JSON.stringify(result,null,2));console.log(result);



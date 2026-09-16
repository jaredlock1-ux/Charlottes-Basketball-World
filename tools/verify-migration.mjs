import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url);
const manifest=JSON.parse(fs.readFileSync(new URL('evidence/releases/migration-source-hashes.json',root),'utf8').replace(/^\uFEFF/,''));
for(const {path,sha256} of manifest){const actual=crypto.createHash('sha256').update(fs.readFileSync(new URL(path,root))).digest('hex');assert.equal(actual,sha256.toLowerCase(),path);}
console.log(`${manifest.length} preserved files match migration manifest`);

import http from 'node:http';
import fs from 'node:fs';
http.createServer((req,res)=>{res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});res.end(fs.readFileSync(new URL('./dist/game-1.html',import.meta.url)));}).listen(4173,'127.0.0.1',()=>console.log('Local game available on port 4173'));

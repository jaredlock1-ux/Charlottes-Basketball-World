import http from 'node:http';
import fs from 'node:fs';
http.createServer((req,res)=>{res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});res.end(fs.readFileSync(new URL('./dist/experience.html',import.meta.url)));}).listen(4174,'127.0.0.1',()=>console.log('Court preview: http://127.0.0.1:4174/?qa=1&scenario=defence-miss-rebound'));

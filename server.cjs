const http = require('http');
const fs = require('fs');
const path = require('path');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.avif':'image/avif','.svg':'image/svg+xml','.woff2':'font/woff2','.mp4':'video/mp4'};
const port=Number(process.env.PORT)||4173;
http.createServer((req,res)=>{const clean=decodeURIComponent(req.url.split('?')[0]);const file=path.join(__dirname,clean==='/'?'index.html':clean);if(!file.startsWith(__dirname)){res.writeHead(403).end();return}fs.readFile(file,(error,data)=>{if(error){res.writeHead(404).end('Not found');return}res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(data)})}).listen(port,'127.0.0.1');

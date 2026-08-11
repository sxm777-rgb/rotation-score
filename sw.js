const CACHE="rotation-score-v9";
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./history.js","./timer.js","./balls.js"])))});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{
 if(e.request.mode==="navigate"){
  e.respondWith(fetch(e.request).then(r=>r.clone().text().then(t=>new Response(t.replace("</body>","<script src=\"./history.js\"></script><script src=\"./timer.js\"></script><script src=\"./balls.js\"></script></body>"),{status:r.status,statusText:r.statusText,headers:r.headers}))).catch(()=>caches.match("./index.html")));
 }else e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
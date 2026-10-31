/* بصمة التوجيه — عامل الخدمة: يحفظ واجهة التطبيق، والبيانات تأتي دائماً من الخادم */
const V = '5561550ad1c9', C = 'basma-' + V;
const SHELL = ['./', 'manifest.webmanifest', 'icons/i192.png', 'icons/i512.png', 'icons/m512.png', 'icons/i180.png'];
self.addEventListener('install', e => e.waitUntil(caches.open(C).then(c => c.addAll(SHELL.map(u => new Request(u, { cache: 'reload' }))))));
self.addEventListener('message', e => { if (e.data === 'skip') self.skipWaiting(); });
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.indexOf('basma-') === 0 && k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => { const r = e.request; if (r.method !== 'GET') return; const u = new URL(r.url); if (u.origin !== location.origin) return;
  if (r.mode === 'navigate') { e.respondWith(caches.open(C).then(c => c.match('./')).then(m => m || fetch(r))); return; }
  e.respondWith(caches.match(r, { ignoreSearch: true }).then(m => m || fetch(r))); });

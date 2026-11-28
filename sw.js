/* بصمة التوجيه — عامل الخدمة: يحفظ واجهة التطبيق، والبيانات تأتي دائماً من الخادم */
const V = '03c68f1425f8', C = 'basma-' + V;
const SHELL = ['./', 'manifest.webmanifest', 'manifest-s.webmanifest', 'manifest-t.webmanifest', 'manifest-m.webmanifest', 'icons/i192.png', 'icons/i512.png', 'icons/m512.png', 'icons/i180.png', 'icons/s192.png', 'icons/t192.png', 'icons/q192.png', 'icons/s180.png', 'icons/t180.png', 'icons/q180.png'];
self.addEventListener('install', e => e.waitUntil(caches.open(C).then(c => c.addAll(SHELL.map(u => new Request(u, { cache: 'reload' }))))));
self.addEventListener('message', e => { if (e.data === 'skip') self.skipWaiting(); });
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.indexOf('basma-') === 0 && k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => { const r = e.request; if (r.method !== 'GET') return; const u = new URL(r.url); if (u.origin !== location.origin) return;
  if (/\/arena\.html$/.test(u.pathname)) { e.respondWith(caches.open(C).then(c => fetch(r).then(x => { if (x.ok) c.put('arena.html', x.clone()); return x; }).catch(() => c.match('arena.html')))); return; }
  if (r.mode === 'navigate') { e.respondWith(caches.open(C).then(c => c.match('./')).then(m => m || fetch(r))); return; }
  e.respondWith(caches.match(r, { ignoreSearch: true }).then(m => m || fetch(r))); });
/* v71: إشعارات الجوال */
self.addEventListener('push', e => { let d = {}; try { d = e.data ? e.data.json() : {}; } catch (_) {}
  e.waitUntil(self.registration.showNotification(d.t || 'بصمة التوجيه', { body: d.b || '', icon: d.i || 'icons/i192.png', dir: 'rtl', lang: 'ar', tag: d.g || 'bw', renotify: true, data: { u: d.u || './' } })); });
self.addEventListener('notificationclick', e => { e.notification.close(); const u = new URL((e.notification.data || {}).u || './', self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(L => { for (const c of L) if (c.url === u && 'focus' in c) return c.focus(); return self.clients.openWindow(u); })); });

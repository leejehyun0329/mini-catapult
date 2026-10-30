// 처음 열 때 게임 파일을 모두 저장해두고, 이후엔 인터넷 없이도 저장본으로 실행
// (게임을 고쳐서 다시 올리면 VERSION이 바뀌어 새 파일로 교체됨)
const CACHE = 'mini-catapult-f92933c150';
const FILES = ["./", "icon-180.png", "icon-192.png", "icon-512.png", "index.html", "manifest.webmanifest", "vendor/Jua-Regular.ttf", "vendor/addons/controls/OrbitControls.js", "vendor/addons/lines/Line2.js", "vendor/addons/lines/LineGeometry.js", "vendor/addons/lines/LineMaterial.js", "vendor/addons/lines/LineSegments2.js", "vendor/addons/lines/LineSegmentsGeometry.js", "vendor/cannon-es.js", "vendor/three.module.js"];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request)));
});

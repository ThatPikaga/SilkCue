// SilkCue service worker — caches the app shell so it works offline and
// qualifies for a real "Install app" prompt on Android/desktop Chrome.
var CACHE = "silkcue-v1";
var ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", function (e) {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return Promise.all(
        ASSETS.map(function (url) {
          return c.add(url).catch(function () {}); // ignore any that 404
        })
      );
    })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(function (hit) {
      var network = fetch(e.request)
        .then(function (res) {
          try {
            var copy = res.clone();
            caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
          } catch (err) {}
          return res;
        })
        .catch(function () { return hit; });
      return hit || network;
    })
  );
});

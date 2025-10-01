const CACHE_NAME = "bankim-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./detalhamento-mes.html",
  "./style.css",
  "./script.js",
  "./dados.js",
  "./DataStorage.js",
  "./detalhamento.js",
  "https://cdn.jsdelivr.net/npm/chart.js",
  "https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

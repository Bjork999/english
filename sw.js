const CACHE_NAME = 'english-trainer-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './phrases.js',
  './speech.js',
  './azure-speech.js',
  './scoring.js',
  './config.js',
  './progress.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Network-first for Azure API calls
  if (event.request.url.includes('speech.microsoft.com')) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }
  // Cache-first for app assets
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});

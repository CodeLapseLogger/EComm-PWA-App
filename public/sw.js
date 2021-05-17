self.addEventListener('install', (event) => {
    console.log('[Service Worker Log] Installing service worker...');
});

self.addEventListener('activate', (event) => {
    console.log('[Service Worker Log] Service worker installed !');
    console.log('[Service Worker Log] Activating service worker...');
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
    console.log(`[Service Worker Log] Requested resource: ${event.request.url}`);
    event.respondWith(fetch(event.request));
});
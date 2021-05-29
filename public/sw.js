self.addEventListener('install', (event) => {

    event.waitUntil(
        caches.open('static-assets')
        .then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/offline/index.html',
                'https://fonts.googleapis.com/icon?family=Material+Icons',
                'https://code.getmdl.io/1.3.0/material.brown-orange.min.css',
                '/src/css/home.css',
                '/src/css/new_product.css',
                'https://code.getmdl.io/1.3.0/material.min.js',
                '/src/js/app.js',
                '/src/js/product_listing.js',
                '/src/js/new_product.js',
                '/src/images/online-store-large-1100x513.png',
                '/src/images/offline.jpg',
                '/src/images/empty-store.jpg'
            ])
        })
    );

    console.log('[Service Worker Log] Installing service worker...');
});

self.addEventListener('activate', (event) => {
    console.log('[Service Worker Log] Service worker installed !');
    console.log('[Service Worker Log] Activating service worker...');
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
    console.log(`[Service Worker Log] Requested resource: ${event.request.url}`);
    event.respondWith(
        caches.match(event.request)
        .then((response) => {
            if (response) {
                return response;
            } else {
                return fetch(event.request)
                    .catch((err) => {
                        return caches.match('/offline/index.html');
                    });
            }
        })
    );
});
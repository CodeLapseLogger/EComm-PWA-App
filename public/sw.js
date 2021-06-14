let CACHE_VERSION = {
    STATIC: '7',
    DYNAMIC: '4'
}

let CACHE_LIST = {
    STATIC_CACHE: `static-assets-${CACHE_VERSION.STATIC}`,
    DYNAMIC_CACHE: `dynamic-assets-${CACHE_VERSION.DYNAMIC}`
}

self.addEventListener('install', (event) => {

    event.waitUntil(
        caches.open(CACHE_LIST.STATIC_CACHE)
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
    self.clients.claim();
    event.waitUntil(
        caches.keys()
        .then((cacheNameList) => {
            return Promise.all(cacheNameList.map((cacheName) => {
                if (cacheName !== CACHE_LIST.STATIC_CACHE && cacheName !== CACHE_LIST.DYNAMIC_CACHE) {
                    console.log(`Deleting cache: ${cacheName}`);
                    return caches.delete(cacheName);
                }
            }));
        })
    );
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
                    .then((res) => {
                        caches.open(CACHE_LIST.DYNAMIC_CACHE)
                            .then((cache) => {
                                cache.put(event.request, res.clone());
                                return res;
                            })
                    })
                    .catch((err) => {
                        return caches.match('/offline/index.html');
                    });
            }
        })
    );
});
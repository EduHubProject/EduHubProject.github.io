const CACHE_NAME = `eduhub-cache-v${Date.now()}`; // Используем временную метку для версии кэша
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/logo192.webp',
  '/logo512.webp',
  '/assets/index.js',
  '/assets/index.css'
];

const DYNAMIC_CACHE_NAME = 'eduhub-dynamic-v1';
const MAX_CACHE_AGE = 24 * 60 * 60 * 1000; // 24 часа

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => {
      return self.skipWaiting(); // Принудительно активируем новый Service Worker
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
            return caches.delete(cacheName); // Удаляем старые кэши
          }
        })
      );
    })
  );
  self.clients.claim(); // Убедитесь, что клиент использует новый Service Worker
});

self.addEventListener('fetch', (event) => {
  // Игнорируем некоторые типы запросов
  if (
    event.request.url.includes('chrome-extension') || 
    event.request.url.includes('extension') ||
    event.request.method !== 'GET'
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Возвращаем кэш, если есть
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then((fetchResponse) => {
        // Кэшируем успешные ответы
        if (
          fetchResponse.ok && 
          (fetchResponse.type === 'basic' || fetchResponse.type === 'cors')
        ) {
          const responseToCache = fetchResponse.clone();
          
          caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        
        return fetchResponse;
      });
    }).catch(() => {
      // Fallback для оффлайн
      return new Response('Offline', { 
        status: 200, 
        headers: { 'Content-Type': 'text/plain' } 
      });
    })
  );
});

// Push-уведомления
self.addEventListener('push', (event) => {
  const title = 'EduHub Notification';
  const options = {
    body: event.data ? event.data.text() : 'New notification',
    icon: '/logo192.webp',
    badge: '/logo192.webp'
  };
  
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Очистка старого кэша
function clearOldCache() {
  caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
    cache.keys().then((keys) => {
      keys.forEach((request) => {
        cache.match(request).then((response) => {
          if (response) {
            const headers = response.headers;
            const cachedTime = parseInt(headers.get('x-cached-time') || '0');
            
            if (Date.now() - cachedTime > MAX_CACHE_AGE) {
              cache.delete(request);
            }
          }
        });
      });
    });
  });
}

// Периодическая очистка кэша
setInterval(clearOldCache, MAX_CACHE_AGE);
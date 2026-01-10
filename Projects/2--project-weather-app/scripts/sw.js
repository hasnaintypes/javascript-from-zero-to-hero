// Minimal service worker for Weather App (development)

self.addEventListener('install', (event) => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

// Simple network-first fetch handler with cache fallback
const CACHE_NAME = 'weather-app-cache-v1'

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Optionally cache GET responses
        if (event.request.method === 'GET' && response && response.status === 200) {
          const cloned = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cloned))
        }
        return response
      })
      .catch(() => caches.match(event.request))
  )
})

// Minimal Service Worker for the Todo App

self.addEventListener('install', (event) => {
  // Activate immediately
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  // Take control of uncontrolled clients
  event.waitUntil(self.clients.claim())
})

// Optional: simple fetch handler that falls back to network by default
self.addEventListener('fetch', (event) => {
  // For now, do a network-first fetch and let failures fall through
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  )
})

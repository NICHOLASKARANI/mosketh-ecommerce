const CACHE_NAME = 'mosketh-v1'
const API_CACHE_NAME = 'mosketh-api-v1'

// Assets to cache
const urlsToCache = [
  '/',
  '/products',
  '/offline.html',
  '/images/logo.png',
  '/images/logo-white.png',
  '/images/placeholder.jpg',
  '/images/og-image.jpg',
  '/icon-192.png',
  '/icon-512.png',
  '/manifest.json'
]

// Install service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache')
        return cache.addAll(urlsToCache)
      })
  )
})

// Fetch from cache first, then network
self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)

  // API requests - network first, then cache
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const responseClone = response.clone()
          caches.open(API_CACHE_NAME).then(cache => {
            cache.put(request, responseClone)
          })
          return response
        })
        .catch(() => {
          return caches.match(request)
        })
    )
    return
  }

  // Static assets - cache first, then network
  event.respondWith(
    caches.match(request)
      .then(response => {
        if (response) {
          return response
        }
        return fetch(request).then(
          response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response
            }
            const responseToCache = response.clone()
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, responseToCache)
            })
            return response
          }
        )
      }).catch(() => {
        if (request.mode === 'navigate') {
          return caches.match('/offline.html')
        }
      })
  )
})

// Clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME, API_CACHE_NAME]
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// Background sync for offline orders
self.addEventListener('sync', event => {
  if (event.tag === 'sync-orders') {
    event.waitUntil(syncOrders())
  }
})

async function syncOrders() {
  try {
    const db = await openDB()
    const offlineOrders = await db.getAll('offlineOrders')
    
    for (const order of offlineOrders) {
      try {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(order)
        })
        
        if (response.ok) {
          await db.delete('offlineOrders', order.id)
        }
      } catch (error) {
        console.error('Failed to sync order:', error)
      }
    }
  } catch (error) {
    console.error('Sync failed:', error)
  }
}
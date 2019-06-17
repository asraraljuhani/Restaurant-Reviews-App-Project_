self.addEventListener('install', function(event) {
  // Perform install steps
});

var FilesToCache = [
  '/',
  './index.html',
  './restaurant.html',
  './css/styles.css',
  './js/dbhelper.js',
  './js/main.js',
  './js/restaurant_info.js',
  './data/restaurants.json',
  './img/*'
];
//install the Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('restaurant-cache')
    .then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(FilesToCache);
    })
  );
});

//
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      //Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
    .catch(err => console.log(err, event.request))
  );
});

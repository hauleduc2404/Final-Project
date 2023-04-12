workbox.core.setCacheNameDetails({prefix: "vue-pwa-injected-v3"});

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Establish a cache name
const cacheName = 'MyFancyCacheName_v1';

self.addEventListener('install', (event) => {
    console.log("Installing ....................");
    event.waitUntil(caches.open(cacheName));
});
self.addEventListener('activate', () => {
    console.log("activating ....................");
});


self.addEventListener('fetch', (event) => {
    console.log('cache fetching: ', event.request.url)
    console.log('mode: ', event.request.method)
    // Check if this is a navigation request
    if (event.request.mode === 'cors' && event.request.method == 'GET') {
        // Open the cache
        event.respondWith(caches.open(cacheName).then((cache) => {
            // Go to the network first
            return fetch(event.request.url).then((fetchedResponse) => {
                cache.put(event.request, fetchedResponse.clone());

                return fetchedResponse;
            }).catch(() => {
                // If the network is unavailable, get
                return cache.match(event.request.url);
            });
        }));
    } else {
        return;
    }
});
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// urlB64ToUint8Array is a magic function that will encode the base64 public key
// to Array buffer which is needed by the subscription option
const urlB64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
    const rawData = atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}

const saveSubscription = async subscription => {
    //const SERVER_URL = window.BASE_API + '/save-subscription'
    console.log(subscription)
    // const response = await fetch(SERVER_URL, {
    //     method: 'post',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(subscription),
    // })
    //return response.json()
}

self.addEventListener('activate', async () => {
    // This will be called only once when the service worker is activated.
    try {
        const applicationServerKey = urlB64ToUint8Array(
            'BJ5IxJBWdeqFDJTvrZ4wNRu7UY2XigDXjgiUBYEYVXDudxhEs0ReOJRBcBHsPYgZ5dyV8VjyqzbQKS8V7bUAglk'
        )
        const options = { applicationServerKey, userVisibleOnly: true }
        const subscription = await self.registration.pushManager.subscribe(options)
        const response = await saveSubscription(subscription)
        console.log(response)
    } catch (err) {
        console.log('Error', err)
    }
})

self.addEventListener("push", function(event) {
    if (event.data) {
        console.log("Push event!! ", event.data.text());
        showLocalNotification("You have a new notification", event.data.text(),  self.registration);
    } else {
        console.log("Push event but no data");
    }
});
const showLocalNotification = (title, body, swRegistration) => {
    const options = {
        body
        // here you can add more properties like icon, image, vibrate, etc.
    };
    swRegistration.showNotification(title, options);
};

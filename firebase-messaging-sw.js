importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyB-3VMi7aw7D8ISJW9CWS3EQX0OUgPJWDA',
  authDomain: 'glintloyalty.firebaseapp.com',
  databaseURL: 'https://glintloyalty-default-rtdb.firebaseio.com',
  projectId: 'glintloyalty',
  storageBucket: 'glintloyalty.firebasestorage.app',
  messagingSenderId: '991009286629',
  appId: '1:991009286629:web:efdddabea00cbecfb0a70c'
});

const messaging = firebase.messaging();

// استقبل الإشعارات في الخلفية (الشاشة مقفلة أو التطبيق مخفي)
messaging.onBackgroundMessage(payload => {
  const title = payload.notification?.title || 'GLINT 💧';
  const body  = payload.notification?.body  || '';

  self.registration.showNotification(title, {
    body,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [300, 100, 300, 100, 300, 100, 500],
    requireInteraction: true,   // يبقى الإشعار حتى يضغط عليه
    tag: 'glint-pickup',        // يستبدل الإشعار القديم بدل التراكم
    actions: [
      { action: 'open', title: '✅ فتح التطبيق' }
    ],
    data: payload.data || {}
  });
});

// عند الضغط على الإشعار — افتح التطبيق
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      // إذا التطبيق مفتوح — ركّز عليه
      for(const client of clientList){
        if(client.url.includes(self.location.origin) && 'focus' in client){
          return client.focus();
        }
      }
      // إذا مو مفتوح — افتحه
      if(clients.openWindow) return clients.openWindow('/');
    })
  );
});

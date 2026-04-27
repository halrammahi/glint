importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey:'AIzaSyB-3VMi7aw7D8ISJW9CWS3EQX0OUgPJWDA',
  authDomain:'glintloyalty.firebaseapp.com',
  databaseURL:'https://glintloyalty-default-rtdb.firebaseio.com',
  projectId:'glintloyalty',
  storageBucket:'glintloyalty.firebasestorage.app',
  messagingSenderId:'991009286629',
  appId:'1:991009286629:web:efdddabea00cbecfb0a70c'
});

const messaging = firebase.messaging();

// استقبل الإشعارات في الخلفية
messaging.onBackgroundMessage(payload => {
  const title = payload.notification?.title || 'GLINT 🚗';
  const body  = payload.notification?.body  || '';

  // أظهر الإشعار بأعلى أولوية
  self.registration.showNotification(title, {
    body,
    icon: '/glint/icon-192.png',
    badge: '/glint/icon-192.png',
    vibrate: [500,200,500,200,500,200,800],
    requireInteraction: true,
    tag: 'glint-pickup',
    renotify: true,
    silent: false,
    actions: [
      { action: 'accept', title: '✅ قبول' },
      { action: 'view',   title: '👁 عرض' }
    ],
    data: payload.data || {}
  });
});

// عند الضغط على الإشعار أو زر القبول
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = 'https://halrammahi.github.io/glint/';
  e.waitUntil(
    clients.matchAll({type:'window', includeUncontrolled:true}).then(list => {
      for(const c of list){
        if(c.url.includes('halrammahi.github.io') && 'focus' in c){
          c.focus();
          return;
        }
      }
      if(clients.openWindow) return clients.openWindow(url);
    })
  );
});

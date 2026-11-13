self.addEventListener('push', event => {
  let data = {};

  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    data = {
      body: event.data ? event.data.text() : ''
    };
  }

  const title = data.title || '🍇 문희사항';

  const options = {
    body: data.body || '새로운 요청이 도착했어요!',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    data: {
      url: data.url || './'
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.notification.data.url || './')
  );
});

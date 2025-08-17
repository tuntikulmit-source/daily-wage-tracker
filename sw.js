// sw.js - Service Worker v2

const CACHE_NAME = 'daily-wage-app-cache-v2';
// แคชเฉพาะไฟล์ที่จำเป็นสำหรับโครงสร้างหลักของแอป (App Shell)
const urlsToCache = [
  '/',
  'index.html' // ชื่อไฟล์หลักของคุณ
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  // กลยุทธ์: Network falling back to cache
  // พยายามดึงข้อมูลจาก network ก่อนเสมอ ถ้าไม่สำเร็จ (ออฟไลน์) ค่อยไปดึงจาก cache
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // ลบ cache เวอร์ชันเก่าที่ไม่ต้องการแล้ว
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
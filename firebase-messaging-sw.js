// Import and configure the Firebase SDK
// This is the "antenna" that listens for messages in the background.

importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker with your project's configuration
const firebaseConfig = {
    apiKey: "AIzaSyAoMrrWGRmd9PuyYtGkK7ZQUDZWdgaoYaE",
    authDomain: "daily-wage-tracking.firebaseapp.com",
    projectId: "daily-wage-tracking",
    storageBucket: "daily-wage-tracking.appspot.com",
    messagingSenderId: "147445421202",
    appId: "1:147445421202:web:b9b078e749d8fc09b0424b",
    measurementId: "G-QERWN01SXH"
};

firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload,
  );
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png', // You can change this to your app's icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
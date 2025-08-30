// Import and configure the Firebase SDK
// This is the "antenna" that listens for messages in the background.

// Scripts for Firebase products are imported on demand
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAoMrrWGRmd9PuyYtGkK7ZQUDZWdgaoYaE",
    authDomain: "daily-wage-tracking.firebaseapp.com",
    projectId: "daily-wage-tracking",
    storageBucket: "daily-wage-tracking.appspot.com",
    messagingSenderId: "147445421202",
    appId: "1:147445421202:web:b9b078e749d8fc09b0424b",
    measurementId: "G-QERWN01SXH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload,
  );
  
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'https://placehold.co/192x192/1e88e5/ffffff?text=🔔', // You can change this to your app's icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
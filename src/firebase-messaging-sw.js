// src/firebase-messaging-sw.js

importScripts(
  'https://www.gstatic.com/firebasejs/9.8.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.8.0/firebase-messaging-compat.js',
);

// Initialize the Firebase app in the service worker
firebase.initializeApp({
  apiKey: "AIzaSyCsV0pI2wUnA_V41xE7DK84cVTAsdxuwWM",
  authDomain: "aptiv-86f0e.firebaseapp.com",
  projectId: "aptiv-86f0e",
  storageBucket: "aptiv-86f0e.appspot.com",
  messagingSenderId: "401736240998",
  appId: "1:401736240998:web:1583e5391793ac962e02a7"
});

// Retrieve an instance of Firebase Messaging to handle background messages
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  // Customize the notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'  // Change the icon path as needed
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

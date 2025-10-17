// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

// Your web app's Firebase configuration
// IMPORTANT: REPLACE WITH YOUR CONFIG FROM THE FIREBASE CONSOLE
const firebaseConfig = {
  apiKey: "AIzaSyCpJ8zeZrRaKiMC1wEgq14LQygnQIIxpLI",
  authDomain: "poc-web-push-noti-dev.firebaseapp.com",
  projectId: "poc-web-push-noti-dev",
  storageBucket: "poc-web-push-noti-dev.firebasestorage.app",
  messagingSenderId: "321858586201",
  appId: "1:321858586201:web:a47c70f6fed449d7b6d348",
  measurementId: "G-BY8DE5EKHN"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo192.png' // The default React logo in the public folder
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

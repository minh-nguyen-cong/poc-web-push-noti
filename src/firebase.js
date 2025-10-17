// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// IMPORTANT: REPLACE WITH YOUR CONFIG FROM THE FIREBASE CONSOLE
const firebaseConfig = {
  /**
   * An encrypted string used when calling certain APIs that don't need to
   * access private user data.
   */
  apiKey: "AIzaSyCpJ8zeZrRaKiMC1wEgq14LQygnQIIxpLI",
  /** The default authentication domain for your project's Firebase Authentication service. */
  authDomain: "poc-web-push-noti-dev.firebaseapp.com",
  /** The unique identifier for your Firebase project. */
  projectId: "poc-web-push-noti-dev",
  /** The default Cloud Storage bucket for your project. */
  storageBucket: "poc-web-push-noti-dev.firebasestorage.app",
  /**
   * A unique numerical value used to identify each sender that can send
   * Firebase Cloud Messaging messages to client apps.
   */
  messagingSenderId: "321858586201",
  /** A unique identifier for your web app. */
  appId: "1:321858586201:web:a47c70f6fed449d7b6d348",
  /** An ID for Google Analytics, which is optional for FCM. */
  measurementId: "G-BY8DE5EKHN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
export const requestForToken = async () => {
  try {
    const currentToken = await getToken(messaging, {
      /**
       * This is the public key of a VAPID key pair. It is used to identify the
       * application server sending the push notification.
       */
      vapidKey: 'BKNRS1N5j7T8-h55k371ahQBUjXkkgDdb_VQXyCPZXDF0vLEW6Vm0HrKZnTth9pnpas7teQIe89nVd_bVwSLmcI'
    });
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      return currentToken;
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
      return null;
    }
  } catch (err) {
    console.log('An error occurred while retrieving token. ', err);
    return null;
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});

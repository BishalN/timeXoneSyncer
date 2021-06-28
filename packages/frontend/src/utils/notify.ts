import { webPushPublicVapidKey } from "./cred";
import firebase from "firebase";
import { isServer } from "./isServer";
const firebaseConfig = {
  apiKey: "AIzaSyBDL5CvT8-bypaPxw6PTqJiRgYygLcVrNU",
  authDomain: "timexonesyncer.firebaseapp.com",
  projectId: "timexonesyncer",
  storageBucket: "timexonesyncer.appspot.com",
  messagingSenderId: "461590419338",
  appId: "1:461590419338:web:191d1022dfcc94d4871a73",
  measurementId: "G-VEWCK7C1FF",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
if (!isServer) {
  const messaging = firebase.messaging();
  messaging
    .getToken({ vapidKey: webPushPublicVapidKey })
    .then((currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // ...
        console.log(currentToken);
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
        // ...
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // ...
    });

  messaging.onMessage((payload) => {
    alert(payload);
    console.log(payload);
  });

  // messaging.onBackgroundMessage

  // this is the public folder
  // messaging.onBackgroundMessage((payload) => {
  //   console.log(
  //     "[firebase-messaging-sw.js] Received background message ",
  //     payload
  //   );
  //   // Customize notification here
  //   const notificationTitle = "Background Message Title";
  //   const notificationOptions = {
  //     body: "Background Message body.",
  //     icon: "/firebase-logo.png",
  //   };

  //   (self as any).registration.showNotification(
  //     notificationTitle,
  //     notificationOptions
  //   );
  // });
}

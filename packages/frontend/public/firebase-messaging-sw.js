importScripts("https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js");

//Checking if the service worker is supported by browser
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err);
    });
}

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBDL5CvT8-bypaPxw6PTqJiRgYygLcVrNU",
    authDomain: "timexonesyncer.firebaseapp.com",
    projectId: "timexonesyncer",
    storageBucket: "timexonesyncer.appspot.com",
    messagingSenderId: "461590419338",
    appId: "1:461590419338:web:191d1022dfcc94d4871a73",
    measurementId: "G-VEWCK7C1FF",
  });
} else {
  firebase.app();
}

const messaging = firebase.messaging();
messaging.usePublicVapidKey(
  "BGgChayfeXMNcuAFUlsz0A63fVLcKTzr2kXZI92WVmPWOb1cLQjmwtlgWTxxqJuL"
);

// messaging
//   .getToken({ vapidKey: webPushPublicVapidKey })
//   .then((currentToken) => {
//     if (currentToken) {
//       // Send the token to your server and update the UI if necessary
//       // ...
//       console.log(currentToken);
//     } else {
//       // Show permission request UI
//       console.log(
//         "No registration token available. Request permission to generate one."
//       );
//       // ...
//     }
//   })
//   .catch((err) => {
//     console.log("An error occurred while retrieving token. ", err);
//     // ...
//   });

//Listens for message when app is in foreground(active)
messaging.onMessage((payload) => {
  alert(payload);
  console.log(payload);
});

//Listens for message when app is in background
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "./favicon.ico",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

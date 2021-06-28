importScripts("https://www.gstatic.com/firebasejs/3.5.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/3.5.0/firebase-messaging.js");

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

firebase.initializeApp({ messagingSenderId: "461590419338" });

const initMessaging = firebase.messaging();

// if (!isServer) {
//   if ("serviceWorker" in navigator) {
//     navigator.serviceWorker
//       .register("../firebase-messaging-sw.js")
//       .then(function (registration) {
//         console.log("Registration successful, scope is:", registration.scope);
//       })
//       .catch(function (err) {
//         console.log("Service worker registration failed, error:", err);
//       });
//   }

//   const firebaseConfig = {
//     apiKey: "AIzaSyBDL5CvT8-bypaPxw6PTqJiRgYygLcVrNU",
//     authDomain: "timexonesyncer.firebaseapp.com",
//     projectId: "timexonesyncer",
//     storageBucket: "timexonesyncer.appspot.com",
//     messagingSenderId: "461590419338",
//     appId: "1:461590419338:web:191d1022dfcc94d4871a73",
//     measurementId: "G-VEWCK7C1FF",
//   };

//   if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
//   } else {
//     firebase.app(); // if already initialized, use that one
//   }

//   const messaging = firebase.messaging();
//   messaging
//     .getToken({ vapidKey: webPushPublicVapidKey })
//     .then((currentToken) => {
//       if (currentToken) {
//         // Send the token to your server and update the UI if necessary
//         // ...
//         console.log(currentToken);
//       } else {
//         // Show permission request UI
//         console.log(
//           "No registration token available. Request permission to generate one."
//         );
//         // ...
//       }
//     })
//     .catch((err) => {
//       console.log("An error occurred while retrieving token. ", err);
//       // ...
//     });

//   messaging.onMessage((payload) => {
//     alert(payload);
//     console.log(payload);
//   });

//   messaging.onBackgroundMessage((payload) => {
//     console.log(
//       "[firebase-messaging-sw.js] Received background message ",
//       payload
//     );
//     // Customize notification here
//     const notificationTitle = "Background Message Title";
//     const notificationOptions = {
//       body: "Background Message body.",
//       icon: "/firebase-logo.png",
//     };

//     self.registration.showNotification(notificationTitle, notificationOptions);
//   });
// }

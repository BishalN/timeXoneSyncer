import React, { useEffect } from "react";
import { webPushPublicVapidKey } from "../utils/cred";
import firebase from "../utils/initFirebase";

const play = () => {
  useEffect(() => {
    const getToken = async () => {
      const messaging = firebase.messaging();
      console.log(messaging.getToken({ vapidKey: webPushPublicVapidKey }));
    };
    getToken();
  }, []);
  return <h1>hello</h1>;
};

export default play;

import admin from "firebase-admin";
const serviceAccountPath = "./service.json";

export const initializeFirebase = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
  });
};

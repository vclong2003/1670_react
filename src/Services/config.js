// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCejHPMbbOBGtA1ZcQM6Q1aEX0-2CJUppg",
  authDomain: "project-5086393183231642537.firebaseapp.com",
  projectId: "project-5086393183231642537",
  storageBucket: "project-5086393183231642537.appspot.com",
  messagingSenderId: "145398438177",
  appId: "1:145398438177:web:9fbbcc9f9e421a044a8660",
  measurementId: "G-TPXJPXWKGS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const storage = getStorage(app);

export const api_endpoint = "https://localhost:7014/api";

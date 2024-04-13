// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9dgXMr-5stM1oHwSg5hs3a1AP_FlOnkQ",
  authDomain: "edge-ai-33acf.firebaseapp.com",
  databaseURL: "https://edge-ai-33acf-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "edge-ai-33acf",
  storageBucket: "edge-ai-33acf.appspot.com",
  messagingSenderId: "396243547573",
  appId: "1:396243547573:web:b2e1fae0914485358795fc",
  measurementId: "G-F297V3100W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database } 
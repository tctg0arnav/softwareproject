// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlc7_MsE4GmUB2w29yU3TOZOEf3wkTUmQ",
  authDomain: "cpexpert-f2bd0.firebaseapp.com",
  projectId: "cpexpert-f2bd0",
  storageBucket: "cpexpert-f2bd0.appspot.com",
  messagingSenderId: "743838698662",
  appId: "1:743838698662:web:0b3d942354be08e5503867",
  measurementId: "G-BSKXM8JYVB",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default firebase;

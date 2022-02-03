// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1EShXgVwiTUWJN2lSs2H9NGAtClfZYqE",
  authDomain: "sparta-react-word.firebaseapp.com",
  projectId: "sparta-react-word",
  storageBucket: "sparta-react-word.appspot.com",
  messagingSenderId: "478655139721",
  appId: "1:478655139721:web:3c138c5cba117af9229b58",
  measurementId: "G-PLBY965PX4"
};

initializeApp(firebaseConfig);
// Initialize Firebase
//const app = initializeApp(firebaseConfig);

export const db = getFirestore();

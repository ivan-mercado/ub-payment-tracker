import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDGFgUpkbbec1U4MC4c3uIivDh1o7gz-DU",
  authDomain: "ub-payment-tracker.firebaseapp.com",
  projectId: "ub-payment-tracker",
  storageBucket: "ub-payment-tracker.appspot.com",
  messagingSenderId: "799181644163",
  appId: "1:799181644163:web:af1713b729753fae6756b6",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// firebaseconfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTxBdn6VpS_oAkStvuPO1qv89GhTxJ0KI",
  authDomain: "byte-read-book.firebaseapp.com",
  projectId: "byte-read-book",
  storageBucket: "byte-read-book.appspot.com",
  messagingSenderId: "953965978526",
  appId: "1:953965978526:web:40ac36c88ae1362b57ac8f",
  measurementId: "G-5DYVY8ZVCH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };

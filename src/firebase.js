// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // <-- NEW: Import getFirestore
// import { getAI, GoogleAIBackend } from "firebase/ai"; // <-- Keep or remove if not used for Gemini AI directly

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID // Optional
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Firebase Firestore and get a reference to the service <-- NEW: Firestore
const db = getFirestore(app);

// Initialize Firebase AI Logic (keep if you still use it for other Firebase AI services, otherwise you can remove this block)
// const ai = getAI(app, {
//   backend: new GoogleAIBackend()
// });

// Export both auth and db (and ai if you keep it)
export { auth, db }; // <-- UPDATED: Export db
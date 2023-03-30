// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";

//firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDkaU4DBxLKBgguLn0XF8G4kgP0YnuBy-I",
  authDomain: "ecommerce-21426-42695.firebaseapp.com",
  projectId: "ecommerce-21426",
  storageBucket: "ecommerce-21426.appspot.com",
  messagingSenderId: "769839043306",
  appId: "1:769839043306:web:ee856972c44743f29a7d93",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//export variables for usage
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

export default app;

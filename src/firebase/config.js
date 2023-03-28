// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";

//firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBBn_HXwUcMnVc8ljTLSNPOIJTDPkguphE",
  authDomain: "ecommerce-react-42ee1.firebaseapp.com",
  projectId: "ecommerce-react-42ee1",
  storageBucket: "ecommerce-react-42ee1.appspot.com",
  messagingSenderId: "991904800582",
  appId: "1:991904800582:web:28d0a4373468f744cb4f47",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//export variables for usage
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

export default app;

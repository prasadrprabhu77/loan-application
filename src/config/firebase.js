
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyDL9LTKTbQJ4Fg6AXdZ360FufrVRTtffwI",
  authDomain: "loanapplication-1860a.firebaseapp.com",
  projectId: "loanapplication-1860a",
  storageBucket: "loanapplication-1860a.firebasestorage.app",
  messagingSenderId: "413441138661",
  appId: "1:413441138661:web:bfb23967e24a724c12190c",
  measurementId: "G-NY7DRD98YR"
};

 
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
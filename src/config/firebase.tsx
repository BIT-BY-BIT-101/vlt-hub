// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAl25id6hLy2wkGkG-BNp4GjqsD142FNY8",
  authDomain: "vlt-hub-bb9ef.firebaseapp.com",
  projectId: "vlt-hub-bb9ef",
  storageBucket: "vlt-hub-bb9ef.appspot.com",
  messagingSenderId: "323948262844",
  appId: "1:323948262844:web:c07e8038da8e86adeca7b9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);

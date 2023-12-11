// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAl25id6hLy2wkGkG-BNp4GjqsD142FNY8",
//   authDomain: "vlt-hub-bb9ef.firebaseapp.com",
//   projectId: "vlt-hub-bb9ef",
//   storageBucket: "vlt-hub-bb9ef.appspot.com",
//   messagingSenderId: "323948262844",
//   appId: "1:323948262844:web:c07e8038da8e86adeca7b9",
// };
const firebaseConfig = {
  apiKey: "AIzaSyBMzYGKogH5WXEeXB8_XSkvvwk6kjDzVzQ",
  authDomain: "vlt-hub-2a24f.firebaseapp.com",
  projectId: "vlt-hub-2a24f",
  storageBucket: "vlt-hub-2a24f.appspot.com",
  messagingSenderId: "1047094733035",
  appId: "1:1047094733035:web:ad54e04800d43f3bf176ae",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  connectAuthEmulator,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  connectFirestoreEmulator,
} from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// connectAuthEmulator(auth, "http://127.0.0.1:9099");
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
// connectFirestoreEmulator(db, "127.0.0.1", 9098);
export const storage = getStorage(app);
// if (location.hostname === "localhost") {
//   // Point to the Storage emulator running on localhost.
//   connectStorageEmulator(storage, "127.0.0.1", 9096);
// }

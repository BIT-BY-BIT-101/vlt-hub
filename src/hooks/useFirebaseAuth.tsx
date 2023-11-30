import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc, collection, getDoc } from "firebase/firestore";

export type User = {
  uid: string;
  email: string;
};

type AuthHook = {
  user: User | null;
  loading: boolean;
  error: any; // Update this type based on your error handling
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const useFirebaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    //   const unsubscribe = auth.onAuthStateChanged((user) => {
    //     setUser(user ? { uid: user.uid, email: user.email || "" } : null);
    //     setLoading(false);
    //   });

    //   return () => unsubscribe();

    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const userDoc = await doc(db, "profiles", authUser.uid);
        const userData = await getDoc(userDoc);
        const userObj: User = {
          uid: authUser.uid,
          email: authUser.email || "",
        };
        setUser(userObj);
      } else {
        setUser(null);
      }
    });
  }, []);

  const signUp = async (
    email: string,
    password: string,
    fname: string,
    lname: string,
    birthdate: string,
    role: string
  ): Promise<void> => {
    try {
      // Your custom logic to set roles in the user profile, this can be done using Firebase Auth custom claims or additional user data in Firestore
      // For simplicity, this example sets a basic role property in the user object
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "profiles", email), {
        email,
        fname,
        lname,
        birthdate,
        role,
      });
      const newUser: User = { uid: userCredential.user.uid, email };
      setUser(newUser);
    } catch (err) {
      setError(err);
    }
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err);
    }
  };

  const signOut = async (): Promise<void> => {
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;
      try {
        auth.signOut();
        console.log(currentUser, " Has beem Logged Out Successfully");
        setUser(null);
      } catch (err) {
        setError(err);
        console.log("Error Occured");
      }
    });
  };

  return { user, loading, error, signUp, signIn, signOut };
};

export default useFirebaseAuth;

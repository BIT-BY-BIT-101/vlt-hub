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
  userData: any;
  loading: boolean;
  error: any; // Update this type based on your error handling
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const useFirebaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const userDoc = doc(db, "profiles", authUser?.email!);
        const userDocSnap = await getDoc(userDoc);
        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data());
          console.log("User Data: ", userData);
        }

        const userObj: User = {
          uid: authUser.uid,
          email: authUser.email || "",
        };
        setUser(userObj);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // return unsubscribe();
  }, []);

  const signUp = async (
    email: string,
    password: string,
    fname: string,
    lname: string,
    birthdate: string,
    role: string,
    bldg_no: string,
    street: string,
    city: string,
    postalcode: string
  ): Promise<void> => {
    // try {
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
    // } catch (err) {
    //   setError(err);
    // }
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    // try {
    await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("session", email);
    // } catch (err) {
    //   setError(err);
    // }
  };

  const signOut = async (): Promise<void> => {
    // onAuthStateChanged(auth, (currentUser) => {
    //   if (!currentUser) return;
    // try {
    auth.signOut();
    // console.log(currentUser, " Has beem Logged Out Successfully");
    setUser(null);
    setLoading(false);
    // } catch (err) {
    //   setError(err);
    //   console.log("Error Occured");
    // }
    // });
  };

  return { user, loading, error, userData, signUp, signIn, signOut };
};

export default useFirebaseAuth;

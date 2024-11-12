import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  setDoc,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { set } from "react-hook-form";

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
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const signUp = async (
    email: string,
    password: string,
    fname: string,
    lname: string,
    birthdate: string,
    role: string
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userId = auth.currentUser?.uid!;
      const userRef = doc(db, "profiles", userId);
      await setDoc(userRef, {
        email,
        fname,
        lname,
        birthdate,
        role,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      const newUser: User = { uid: userCredential.user.uid, email };
      setUser(newUser);
      return { token: userCredential.user.getIdToken() };
    } catch (err) {
      console.log(err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    // try {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      // localStorage.removeItem("session");
      auth.signOut();
      // console.log(currentUser, " Has beem Logged Out Successfully");
      setIsAuth(false);
      setUser(null);
      setUserData(null);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, userData, signUp, signIn, signOut, isAuth };
};

export default useFirebaseAuth;

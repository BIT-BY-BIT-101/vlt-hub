import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  setDoc,
  doc,
  collection,
  getDoc,
  onSnapshot,
} from "firebase/firestore";

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

  useEffect(() => {
    // const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
    //   if (authUser) {
    //     const userObj: User = {
    //       uid: authUser?.uid!,
    //       email: authUser?.email || "",
    //     };
    //     setUser(userObj);
    //     setIsAuth(true);
    //     console.log("User Data: ", userObj);
    //     setLoading(false);
    //   }
    // });
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const userDoc = doc(db, "profiles", authUser?.uid!);
        const userDocSnap = await getDoc(userDoc);
        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data());
        }

        const userObj: User = {
          uid: authUser.uid,
          email: authUser.email || "",
        };
        setUser(userObj);
        setIsAuth(true);
        setLoading(false);
      } else {
        setUser(null);
        setIsAuth(false);
      }
      setLoading(false);
    });
    console.log("User", user);

    return () => unsubscribe;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "profiles", user.uid!);

        const unsubscribe = onSnapshot(docRef, (doc) => {
          try {
            if (doc.exists()) {
              const userData = { id: doc.id, ...doc.data() };
              setUserData(userData);
              console.log(userData);
            } else {
              console.log("No such document!");
            }
          } catch (error) {
            setError(error);
          }
        });

        return () => unsubscribe();
      }
    };

    fetchData();
  }, []);

  const signUp = async (
    email: string,
    password: string,
    fname: string,
    lname: string,
    birthdate: string,
    role: string
  ): Promise<void> => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const userId = auth.currentUser?.uid!;
    await setDoc(doc(db, "profiles", userId), {
      email,
      fname,
      lname,
      birthdate,
      role,
    });
    const newUser: User = { uid: userCredential.user.uid, email };
    setUser(newUser);
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    // try {
    await signInWithEmailAndPassword(auth, email, password);

    // .then(() => {
    //   setLoading(false);
    // })
    // .catch((err) => {
    //   setError(err);
    // });
    // } catch (err) {
    //   console.log(err);
    //   setError(err);
    // }
  };

  const signOut = async (): Promise<void> => {
    // localStorage.removeItem("session");
    auth.signOut();
    // console.log(currentUser, " Has beem Logged Out Successfully");
    setIsAuth(false);
    setUser(null);
    setUserData(null);
    setLoading(false);
  };

  return { user, loading, error, userData, signUp, signIn, signOut, isAuth };
};

export default useFirebaseAuth;

import React, { createContext, useEffect, useState, ReactNode } from "react";
import { auth, db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export type User = {
  uid: string;
  email: string;
  data: any;
};

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
});

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = doc(db, "profiles", user?.uid);
        const userDocSnap = await getDoc(userDoc);
        if (userDocSnap.exists()) {
          // setUserData(userDocSnap.data());
          const userObj: User = {
            uid: user?.uid!,
            email: user?.email!,
            data: userDocSnap?.data(),
          };
          setCurrentUser(userObj);
          setLoading(false);
          console.log(userObj);
        }
      }
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

import { createContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import useFirebaseAuth from "../hooks/useFirebaseAuth";

// interface User {
//   id: string;
//   roles: string[];
// }

// interface AuthContextType {
//   user: User | null;
// }

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // const [userData, setUserData] = useState<User | null>(null);
  const { user } = useFirebaseAuth();

  // useEffect(() => {
  //   const unsub = db.doc(`/profiles/${email}`).onSnapshot((doc) => {
  //     if (doc.exists) {
  //       setUserData(doc.data() as User);
  //     }
  //   });
  //   return unsub;
  // }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import useFirebaseAuth, { User } from "../hooks/useFirebaseAuth";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: any;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    role: "host" | "venue" | "participant"
  ) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const auth = useFirebaseAuth();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(auth.user);
  }, [auth.user]);

  return (
    <AuthContext.Provider value={{ ...auth, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

import React, { useEffect, useState } from "react";
import { auth } from "./firebaseconfig";
import firebase from "firebase/auth";

interface AuthUser {
  user: firebase.User | null;
}

export const AuthContext = React.createContext<AuthUser>({ user: null });

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  const googleProvider = new GoogleAuthProvider();

  const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loginWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

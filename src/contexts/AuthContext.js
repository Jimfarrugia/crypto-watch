import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  signOut,
} from "firebase/auth";

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  const googleProvider = new GoogleAuthProvider();

  const twitterProvider = new TwitterAuthProvider();

  const facebookProvider = new FacebookAuthProvider();

  const loginWithGoogle = async () => {
    const { user } = await signInWithPopup(auth, googleProvider);
    user &&
      setDoc(
        doc(db, "users", user.uid),
        {
          user: user.uid,
          email: user.email,
        },
        { merge: true }
      );
  };

  const loginWithTwitter = () => signInWithPopup(auth, twitterProvider);

  const loginWithFacebook = () => signInWithPopup(auth, facebookProvider);

  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  const resetPassword = email => sendPasswordResetEmail(auth, email);

  const updateUserEmail = email => updateEmail(currentUser, email);

  const updateUserPassword = password => updatePassword(currentUser, password);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    loginWithGoogle,
    loginWithTwitter,
    loginWithFacebook,
    resetPassword,
    updateUserEmail,
    updateUserPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

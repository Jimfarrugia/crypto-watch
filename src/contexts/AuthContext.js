import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
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

  const loginWithGoogle = async () => {
    const { user } = await signInWithPopup(auth, googleProvider);
    user &&
      setDoc(
        doc(db, "users", user.uid),
        {
          user: user.uid,
          email: user.email,
          authProvider: "google",
        },
        { merge: true }
      );
  };

  const loginWithTwitter = async () => {
    const { user } = await signInWithPopup(auth, twitterProvider);
    const payload = { user: user.uid, authProvider: "twitter" };
    user.email
      ? (payload["email"] = user.email)
      : (payload["displayName"] = user.displayName);
    user && setDoc(doc(db, "users", user.uid), payload, { merge: true });
  };

  const signup = async (email, password) => {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    user &&
      setDoc(doc(db, "users", user.uid), {
        user: user.uid,
        email: user.email,
      });
  };

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
    resetPassword,
    updateUserEmail,
    updateUserPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

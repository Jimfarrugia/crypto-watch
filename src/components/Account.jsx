import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { setDoc, doc, onSnapshot } from "@firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { currencies, selectStyles } from "../constants";
import RefreshButton from "./RefreshButton";

const Account = () => {
  const { currentUser, logout, updateUserPassword, updateUserEmail } =
    useAuth();
  const emailRef = useRef();
  const emailConfirmationRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const history = useHistory();
  const [vsCurrency, setVsCurrency] = useState(currencies[0].value);
  const [vsCurrencyError, setVsCurrencyError] = useState("");
  const [vsCurrencyMessage, setVsCurrencyMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isEmailPasswordUser =
    currentUser && currentUser.providerData[0].providerId === "password";

  const handleSignOut = async () => {
    try {
      await logout();
      history.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  const handleChangeUserVsCurrency = async () => {
    setVsCurrencyError("");
    setIsLoading(true);
    try {
      const id = currentUser.uid;
      const payload = {
        user: currentUser.uid,
        vsCurrency: vsCurrency,
      };
      const docRef = doc(db, "users", id);
      await setDoc(docRef, payload, { merge: true });
    } catch (e) {
      setVsCurrencyError(
        <p>
          There was an error while communicating with the database. Please{" "}
          <RefreshButton /> the page and try again.
        </p>
      );
      console.error(e);
    }
    setVsCurrencyMessage("Success. Your preferred currency was changed.");
    setIsLoading(false);
  };

  const handleChangePassword = async e => {
    e.preventDefault();
    setPasswordError("");
    setPasswordMessage("");
    setIsLoading(true);
    const password = passwordRef.current.value;
    const passwordConfirmation = passwordConfirmationRef.current.value;
    if (password !== passwordConfirmation) {
      setPasswordError("Passwords do not match.");
      return setIsLoading(false);
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return setIsLoading(false);
    }
    try {
      await updateUserPassword(password);
    } catch (e) {
      console.error(e);
      if (e.code === "auth/requires-recent-login") {
        setPasswordError(
          "It's been too long since you signed in.  Please sign in again first."
        );
      } else {
        setPasswordError("Change password failed.  Please try again.");
      }
      return setIsLoading(false);
    }
    passwordRef.current.value = "";
    passwordConfirmationRef.current.value = "";
    setPasswordMessage("Success. Your password has been changed.");
    setIsLoading(false);
  };

  const handleChangeEmail = async e => {
    e.preventDefault();
    setEmailError("");
    setEmailMessage("");
    setIsLoading(true);
    const email = emailRef.current.value;
    const emailConfirmation = emailConfirmationRef.current.value;
    if (email !== emailConfirmation) {
      setEmailError("Email addresses do not match.");
      return setIsLoading(false);
    }
    try {
      await updateUserEmail(email);
    } catch (e) {
      console.error(e);
      if (e.code === "auth/requires-recent-login") {
        setEmailError(
          "It's been too long since you signed in.  Please sign in again first."
        );
      } else {
        setEmailError("Change email failed.  Please try again.");
      }
      return setIsLoading(false);
    }
    emailRef.current.value = "";
    emailConfirmationRef.current.value = "";
    setEmailMessage("Success. Your email address has been changed.");
    setIsLoading(false);
  };

  useEffect(() => {
    let alertTimeout = setTimeout(() => {
      setEmailError("");
      setEmailMessage("");
      setPasswordError("");
      setPasswordMessage("");
      setVsCurrencyError("");
      setVsCurrencyMessage("");
    }, 5000);
    return () => {
      clearTimeout(alertTimeout);
    };
  }, [
    emailMessage,
    emailError,
    passwordMessage,
    passwordError,
    vsCurrencyMessage,
    vsCurrencyError,
  ]);

  useEffect(() => {
    if (currentUser) {
      const docRef = doc(db, "users", currentUser.uid);
      const unsubscribe = onSnapshot(docRef, doc => {
        const data = doc.data();
        if (data && data.vsCurrency) setVsCurrency(data.vsCurrency);
      });
      return unsubscribe;
    }
  }, [currentUser]);

  return (
    <div className="account">
      <h2>My Account</h2>
      <p>
        <button
          type="button"
          title="Sign Out"
          disabled={isLoading}
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </p>
      <h3>Preferred Currency</h3>
      <div className="preferred-currency">
        {vsCurrencyError && (
          <div className="alert-error">{vsCurrencyError}</div>
        )}
        {vsCurrencyMessage && (
          <div className="alert-success">{vsCurrencyMessage}</div>
        )}
        <Select
          isSearchable={false}
          options={currencies}
          styles={selectStyles}
          placeholder={vsCurrency.toUpperCase()}
          onChange={({ value }) => setVsCurrency(value)}
        />
        <p>
          <button
            type="button"
            title="Save Preferred Currency"
            disabled={isLoading}
            onClick={handleChangeUserVsCurrency}
          >
            Save
          </button>
        </p>
      </div>
      {isEmailPasswordUser && (
        <>
          <h3>Change Password</h3>
          {passwordError && <div className="alert-error">{passwordError}</div>}
          {passwordMessage && (
            <div className="alert-success">{passwordMessage}</div>
          )}
          <form onSubmit={handleChangePassword}>
            <p>
              <label htmlFor="new-password">New Password</label>
              <br />
              <input
                id="new-password"
                type="password"
                ref={passwordRef}
                required
              />
            </p>
            <p>
              <label htmlFor="confirm-password">Confirm Password</label>
              <br />
              <input
                id="confirm-password"
                type="password"
                ref={passwordConfirmationRef}
                required
              />
            </p>
            <p>
              <button
                type="submit"
                title="Submit Change Password"
                disabled={isLoading}
              >
                Submit
              </button>
            </p>
          </form>
          <h3>Change Email</h3>
          {emailError && <div className="alert-error">{emailError}</div>}
          {emailMessage && <div className="alert-success">{emailMessage}</div>}
          <form onSubmit={handleChangeEmail}>
            <p>
              <label htmlFor="new-email">New Email</label>
              <br />
              <input id="new-email" type="email" ref={emailRef} required />
            </p>
            <p>
              <label htmlFor="confirm-email">Confirm Email</label>
              <br />
              <input
                id="confirm-email"
                type="email"
                ref={emailConfirmationRef}
                required
              />
            </p>
            <p>
              <button
                type="submit"
                title="Submit Change Email"
                disabled={isLoading}
              >
                Submit
              </button>
            </p>
          </form>
        </>
      )}
    </div>
  );
};

export default Account;

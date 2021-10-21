import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { setDoc, doc, onSnapshot } from "@firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { currencies, timeframes } from "../constants";
import Select from "./Select";
import DiscreetButton from "./DiscreetButton";
import Alert from "./Alert";
import ButtonOutlined from "./ButtonOutlined";
import { AccountStyled } from "./styled/Account.styled";

const Account = () => {
  const { currentUser, logout, updateUserPassword, updateUserEmail } =
    useAuth();
  const emailRef = useRef();
  const emailConfirmationRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const history = useHistory();
  const [vsCurrency, setVsCurrency] = useState(currencies[0].value);
  const [timeframe, setTimeframe] = useState(timeframes[2]);
  const [vsCurrencyError, setVsCurrencyError] = useState("");
  const [vsCurrencyMessage, setVsCurrencyMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [timeframeMessage, setTimeframeMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [timeframeError, setTimeframeError] = useState("");
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
    setVsCurrencyMessage("");
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
          <DiscreetButton
            text="refresh"
            onClick={() => window.location.reload()}
          />{" "}
          the page and try again.
        </p>
      );
      console.error(e);
    }
    setVsCurrencyMessage("Success. Your preferred currency was changed.");
    setIsLoading(false);
  };

  const handleChangeUserTimeframe = async () => {
    setTimeframeError("");
    setTimeframeMessage("");
    setIsLoading(true);
    try {
      const id = currentUser.uid;
      const payload = {
        user: currentUser.uid,
        timeframe: timeframe,
      };
      const docRef = doc(db, "users", id);
      await setDoc(docRef, payload, { merge: true });
    } catch (e) {
      setTimeframeError(
        <p>
          There was an error while communicating with the database. Please{" "}
          <DiscreetButton
            text="refresh"
            onClick={() => window.location.reload()}
          />{" "}
          the page and try again.
        </p>
      );
      console.error(e);
    }
    setTimeframeMessage("Success. Your preferred timeframe was changed.");
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
      setTimeframeError("");
      setTimeframeMessage("");
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
    timeframeMessage,
    timeframeError,
    vsCurrencyMessage,
    vsCurrencyError,
  ]);

  useEffect(() => {
    if (currentUser) {
      const docRef = doc(db, "users", currentUser.uid);
      const unsubscribe = onSnapshot(docRef, doc => {
        const data = doc.data();
        if (data && data.vsCurrency) setVsCurrency(data.vsCurrency);
        if (data && data.timeframe) setTimeframe(data.timeframe);
      });
      return unsubscribe;
    }
  }, [currentUser]);

  return (
    <AccountStyled>
      <h2>My Account</h2>
      <p>
        <ButtonOutlined
          fullWidth
          color="error"
          type="button"
          title="Sign Out"
          disabled={isLoading}
          onClick={handleSignOut}
        >
          Sign Out
        </ButtonOutlined>
      </p>
      <h3>Preferred Currency</h3>
      {vsCurrencyError && (
        <Alert status="error" text={vsCurrencyError} spacing={1} />
      )}
      {vsCurrencyMessage && (
        <Alert status="success" text={vsCurrencyMessage} spacing={1} />
      )}
      <Select
        isSearchable={false}
        options={currencies}
        placeholder={vsCurrency.toUpperCase()}
        onChange={({ value }) => setVsCurrency(value)}
      />
      <p>
        <ButtonOutlined
          fullWidth
          type="button"
          title="Save Preferred Currency"
          disabled={isLoading}
          onClick={handleChangeUserVsCurrency}
        >
          Save
        </ButtonOutlined>
      </p>
      <h3>Preferred Timeframe</h3>
      {timeframeError && (
        <Alert status="error" text={timeframeError} spacing={1} />
      )}
      {timeframeMessage && (
        <Alert status="success" text={timeframeMessage} spacing={1} />
      )}
      <Select
        isSearchable={false}
        options={timeframes}
        placeholder={timeframe.label}
        onChange={selected => setTimeframe(selected)}
      />
      <p>
        <ButtonOutlined
          fullWidth
          type="button"
          title="Save Preferred Timeframe"
          disabled={isLoading}
          onClick={handleChangeUserTimeframe}
        >
          Save
        </ButtonOutlined>
      </p>
      {isEmailPasswordUser && (
        <>
          <h3>Change Password</h3>
          {passwordError && <Alert status="error" text={passwordError} />}
          {passwordMessage && <Alert status="success" text={passwordMessage} />}
          <form onSubmit={handleChangePassword}>
            <p>
              <label htmlFor="new-password">New Password</label>
              <input
                id="new-password"
                type="password"
                ref={passwordRef}
                placeholder="New Password"
                required
              />
            </p>
            <p>
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                id="confirm-password"
                type="password"
                ref={passwordConfirmationRef}
                placeholder="Confirm New Password"
                required
              />
            </p>
            <p>
              <ButtonOutlined
                fullWidth
                type="submit"
                title="Submit Change Password"
                disabled={isLoading}
              >
                Submit
              </ButtonOutlined>
            </p>
          </form>
          <h3>Change Email</h3>
          {emailError && <Alert status="error" text={emailError} />}
          {emailMessage && <Alert status="success" text={emailMessage} />}
          <form onSubmit={handleChangeEmail}>
            <p>
              <label htmlFor="new-email">New Email</label>
              <input
                id="new-email"
                type="email"
                ref={emailRef}
                placeholder="New Email"
                required
              />
            </p>
            <p>
              <label htmlFor="confirm-email">Confirm Email</label>
              <input
                id="confirm-email"
                type="email"
                ref={emailConfirmationRef}
                placeholder="Confirm New Email"
                required
              />
            </p>
            <p>
              <ButtonOutlined
                fullWidth
                type="submit"
                title="Submit Change Email"
                disabled={isLoading}
              >
                Submit
              </ButtonOutlined>
            </p>
          </form>
        </>
      )}
    </AccountStyled>
  );
};

export default Account;

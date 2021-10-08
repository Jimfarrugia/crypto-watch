import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { useAuth } from "../contexts/AuthContext";
import { currencies, color } from "../constants";

const Account = () => {
  const { currentUser, logout, updateUserPassword, updateUserEmail } =
    useAuth();
  const emailRef = useRef();
  const emailConfirmationRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const history = useHistory();
  const [vsCurrency, setVsCurrency] = useState(currencies[0].value);
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isEmailPasswordUser =
    currentUser && currentUser.providerData[0].providerId === "password";

  const { black, white, purple, purpleBright } = color;

  const selectStyles = {
    control: (styles, { isFocused }) => ({
      ...styles,
      fontSize: "0.9rem",
      background: "none",
      boxShadow: isFocused ? `0 0 0.25em ${purpleBright}` : "none",
      borderColor: isFocused ? purpleBright : purple,
      "&:hover": {
        borderColor: purpleBright,
        cursor: "pointer",
      },
    }),
    option: (styles, { isFocused }) => ({
      ...styles,
      fontSize: "0.9rem",
      backgroundColor: isFocused ? purpleBright : black,
      color: white,
      borderBottom: `1px solid ${purple}`,
      "&:hover": {
        backgroundColor: purpleBright,
        color: white,
        cursor: "pointer",
      },
      "&:last-child": {
        borderBottom: "none",
      },
    }),
    menu: styles => ({
      ...styles,
      margin: 0,
      backgroundColor: black,
      border: `1px solid ${purple}`,
      borderTop: "none",
    }),
    input: styles => ({ ...styles, color: purpleBright }),
    placeholder: styles => ({ ...styles, color: purple }),
    singleValue: styles => ({ ...styles, color: purple }),
    dropdownIndicator: styles => ({ ...styles, color: purple }),
    indicatorSeparator: styles => ({ ...styles, backgroundColor: purple }),
  };

  const handleSignOut = async () => {
    try {
      await logout();
      history.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  const handleChangeUserVsCurrency = async () => {
    console.log(vsCurrency);
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
      <div>
        <Select
          isSearchable={false}
          options={currencies}
          styles={selectStyles}
          placeholder={vsCurrency.toUpperCase()}
          onChange={({ value }) => setVsCurrency(value)}
        />
        <button
          type="button"
          title="Save"
          disabled={isLoading}
          onClick={handleChangeUserVsCurrency}
        >
          Save
        </button>
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
              <button type="submit" disabled={isLoading}>
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
              <button type="submit" disabled={isLoading}>
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

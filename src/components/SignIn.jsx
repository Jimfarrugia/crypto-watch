import { useRef, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faTwitter, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useAuth } from "../contexts/AuthContext";
import { capitalizeFirstLetter } from "../helpers";
import { SignInStyled } from "./styled/SignIn.styled";
import Alert from "./Alert";
import ButtonOutlined from "./ButtonOutlined";
import { SignInWithProviderButtonStyled } from "./styled/SignInWithProviderButton.styled";

const SignIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { currentUser, login, loginWithGoogle, loginWithTwitter } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const handleSubmit = async event => {
    event.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (error) {
      error.code === "auth/wrong-password"
        ? setError("Password is incorrect.")
        : error.code === "auth/user-not-found"
        ? setError("Could not find a user with that email address.")
        : error.code === "auth/too-many-requests"
        ? setError(
            "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."
          )
        : setError("Sign in failed. Please try again.");
      console.error(error);
    }
    setIsLoading(false);
  };

  const handleLoginWithProvider = async provider => {
    setError("");
    setIsLoading(true);
    try {
      const method =
        provider === "google"
          ? await loginWithGoogle()
          : provider === "twitter"
          ? await loginWithTwitter()
          : null;
      if (method === null)
        throw new Error("Could not determine which provider was requested.");
      history.push("/");
    } catch (error) {
      error.code === "auth/account-exists-with-different-credential"
        ? setError(
            "Your account was created using a different provider. You must use the same provider each time you sign in."
          )
        : setError("Sign in failed. Please try again.");
      console.error(error);
    }
    setIsLoading(false);
  };

  const SignInWithProviderButton = ({ provider }) => (
    <SignInWithProviderButtonStyled
      fullWidth
      type="button"
      disabled={isLoading}
      onClick={() => handleLoginWithProvider(provider)}
    >
      <FontAwesomeIcon
        icon={
          provider === "twitter"
            ? faTwitter
            : provider === "google"
            ? faGoogle
            : null
        }
      />
      Sign in with {capitalizeFirstLetter(provider)}
    </SignInWithProviderButtonStyled>
  );

  useEffect(() => {
    let alertTimeout = setTimeout(() => setError(""), 5000);
    return () => clearTimeout(alertTimeout);
  }, [error]);

  useEffect(() => {
    if (currentUser) history.push("/account");
  }, [currentUser, history]);

  return (
    <SignInStyled>
      <h2>Sign In</h2>
      {error && <Alert status="error" text={error} />}
      {(isOpen && (
        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              placeholder="Email"
              required
            />
          </p>
          <p>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              placeholder="Password"
              required
            />
          </p>
          <p>
            <ButtonOutlined fullWidth type="submit" disabled={isLoading}>
              Sign In
            </ButtonOutlined>
          </p>
          <p>
            <Link to="/reset-password">Forgot Password</Link>
          </p>
          <p>
            Need an account? <Link to="/sign-up">Sign Up</Link>
          </p>
        </form>
      )) || (
        <p>
          <SignInWithProviderButtonStyled
            fullWidth
            type="button"
            disabled={isLoading}
            onClick={() => setIsOpen(true)}
          >
            <FontAwesomeIcon icon={faEnvelope} />
            Sign in with Email
          </SignInWithProviderButtonStyled>
        </p>
      )}
      <p>
        <SignInWithProviderButton provider="google" />
      </p>
      <p>
        <SignInWithProviderButton provider="twitter" />
      </p>
    </SignInStyled>
  );
};

export default SignIn;

import { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const SignIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, loginWithGoogle, loginWithTwitter, loginWithFacebook } =
    useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (e) {
      e.code === "auth/wrong-password"
        ? setError("Password is incorrect.")
        : e.code === "auth/user-not-found"
        ? setError("Could not find a user with that email address.")
        : setError("Sign in failed. Please try again.");
      console.error(e);
    }
    setIsLoading(false);
  };

  const handleLoginWithProvider = async provider => {
    setError("");
    setIsLoading("");
    try {
      const method =
        provider === "google"
          ? await loginWithGoogle()
          : provider === "facebook"
          ? await loginWithFacebook()
          : provider === "twitter"
          ? await loginWithTwitter()
          : null;
      if (method === null)
        throw new Error("Could not determine which provider was requested.");
      history.push("/");
    } catch (e) {
      e.code === "auth/account-exists-with-different-credential"
        ? setError(
            "Your account was created using a different provider. You must use the same provider each time you sign in."
          )
        : setError("Sign in failed. Please try again.");
      console.error(e);
    }
    setIsLoading(false);
  };

  return (
    <>
      <h2>Sign In</h2>
      {error && <div className="alert-error">{error}</div>}
      {(isOpen && (
        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor="email">Email</label>
            <br />
            <input type="email" id="email" ref={emailRef} required />
          </p>
          <p>
            <label htmlFor="password">Password</label>
            <br />
            <input type="password" id="password" ref={passwordRef} required />
          </p>
          <p>
            <button type="submit" disabled={isLoading}>
              Sign In
            </button>
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
          <button
            type="button"
            disabled={isLoading}
            onClick={() => setIsOpen(true)}
          >
            Sign In with Email
          </button>
        </p>
      )}
      <p>
        <button
          type="button"
          disabled={isLoading}
          onClick={() => handleLoginWithProvider("google")}
        >
          Sign In with Google
        </button>
      </p>
      <p>
        <button
          type="button"
          disabled={isLoading}
          onClick={() => handleLoginWithProvider("twitter")}
        >
          Sign In with Twitter
        </button>
      </p>
      <p>
        <button
          type="button"
          disabled={isLoading}
          onClick={() => handleLoginWithProvider("facebook")}
        >
          Sign In with Facebook
        </button>
      </p>
    </>
  );
};

export default SignIn;

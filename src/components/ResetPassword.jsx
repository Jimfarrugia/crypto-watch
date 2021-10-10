import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ForgotPassword = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);
    try {
      await resetPassword(emailRef.current.value);
      setMessage("Success. Check your email inbox for further instructions.");
    } catch (e) {
      e.code === "auth/user-not-found"
        ? setError("Could not find a user with that email address.")
        : setError("Failed to reset password.");
      console.error(e);
    }
    setIsLoading(false);
  };

  return (
    <div className="reset-password">
      <h2>Reset Password</h2>
      {error && <div className="alert-error">{error}</div>}
      {message && <div className="alert-success">{message}</div>}
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="email" className="hidden">
            Email
          </label>
          <input
            id="email"
            type="email"
            ref={emailRef}
            placeholder="Email"
            required
          />
        </p>
        <p>
          <button
            type="submit"
            disabled={isLoading}
            className="outlined-button"
          >
            Reset Password
          </button>
        </p>
      </form>
      <p>
        <Link to="/sign-in">Cancel</Link>
      </p>
      <p>
        Need an account? <Link to="/sign-up">Sign Up</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;

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
    } catch {
      setError("Failed to reset password.");
    }
    setIsLoading(false);
  };

  return (
    <>
      <h2>Reset Password</h2>
      {error && <div className="alert-error">{error}</div>}
      {message && <div className="alert-success">{message}</div>}
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="email">Email</label>
        </p>
        <p>
          <input id="email" type="email" ref={emailRef} required />
        </p>
        <p>
          <button type="submit" disabled={isLoading}>
            Reset Password
          </button>
        </p>
      </form>
      <p>
        <Link to="/sign-in">Login</Link>
      </p>
      <p>
        Need an account? <Link to="/sign-up">Sign Up</Link>
      </p>
    </>
  );
};

export default ForgotPassword;

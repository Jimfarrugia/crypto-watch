import { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("Passwords do not match.");
    }
    setLoading(true);
    try {
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (e) {
      setError("Failed to create an account.");
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <>
      <h2>Sign Up</h2>
      {error && <div className="alert-error">{error}</div>}
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
          <label htmlFor="confirm-password">Confirm Password</label>
          <br />
          <input
            type="password"
            id="confirm-password"
            ref={passwordConfirmationRef}
            required
          />
        </p>
        <p>
          <button type="submit" disabled={loading}>
            Sign Up
          </button>
        </p>
      </form>
      <p>
        Already have an account? <Link to="/sign-in">Log In</Link>
      </p>
    </>
  );
};

export default SignUp;

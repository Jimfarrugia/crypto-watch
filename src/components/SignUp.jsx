import { useRef, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import Alert from "./Alert";
import { SignUpStyled } from "./styled/SignUp.styled";
import ButtonOutlined from "./ButtonOutlined";

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
      // create user account
      const { user } = await signup(
        emailRef.current.value,
        passwordRef.current.value
      );
      // create user db document
      if (user) {
        setDoc(doc(db, "users", user.uid), {
          user: user.uid,
          email: user.email,
        });
      }
      history.push("/");
    } catch (e) {
      e.code === "auth/invalid-email"
        ? setError("The email address you provided is invalid.")
        : e.code === "auth/weak-password"
        ? setError("Password must be at least 6 characters.")
        : e.code === "auth/email-already-in-use"
        ? setError("An account with that email address already exists.")
        : setError("Failed to create an account.");
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    let alertTimeout = setTimeout(() => setError(""), 5000);
    return () => clearTimeout(alertTimeout);
  }, [error]);

  return (
    <SignUpStyled>
      <h2>Sign Up</h2>
      {error && <Alert status="error" text={error} />}
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
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            ref={passwordConfirmationRef}
            placeholder="Confirm Password"
            required
          />
        </p>
        <p>
          <ButtonOutlined fullWidth type="submit" disabled={loading}>
            Sign Up
          </ButtonOutlined>
        </p>
      </form>
      <p>
        Already have an account? <Link to="/sign-in">Sign In</Link>
      </p>
    </SignUpStyled>
  );
};

export default SignUp;

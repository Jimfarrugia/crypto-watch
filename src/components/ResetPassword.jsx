import { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Alert from "./Alert";
import ButtonOutlined from "./ButtonOutlined";
import { ResetPasswordStyled } from "./styled/ResetPassword.styled";

const ResetPassword = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

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
    <ResetPasswordStyled>
      <h2>Reset Password</h2>
      {error && <Alert status="error" text={error} />}
      {message && <Alert status="success" text={message} />}
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            ref={emailRef}
            placeholder="Email"
            required
          />
        </p>
        <p>
          <ButtonOutlined fullWidth type="submit" disabled={isLoading}>
            Reset Password
          </ButtonOutlined>
        </p>
        <p>
          <ButtonOutlined
            fullWidth
            color="red"
            type="button"
            disabled={isLoading}
            onClick={() => history.push("/sign-in")}
          >
            Cancel
          </ButtonOutlined>
        </p>
      </form>
      <p>
        Need an account? <Link to="/sign-up">Sign Up</Link>
      </p>
    </ResetPasswordStyled>
  );
};

export default ResetPassword;

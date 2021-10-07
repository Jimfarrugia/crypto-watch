import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { currentUser } = useAuth();
  const history = useHistory();

  return (
    <div className="page-header-wrapper">
      <header className="page-header">
        <h1 data-testid="page-heading">
          <Link to="/" className="discreet-link">
            Crypto Watch
          </Link>
        </h1>
        <button
          type="button"
          title={currentUser ? "My Account" : "Sign In"}
          className={currentUser ? "account-button" : "signin-button"}
          onClick={e => {
            currentUser ? history.push("/account") : history.push("/sign-in");
            e.currentTarget.blur();
          }}
        >
          <FontAwesomeIcon icon={currentUser ? faUser : faSignInAlt} />
        </button>
      </header>
    </div>
  );
};

export default Header;

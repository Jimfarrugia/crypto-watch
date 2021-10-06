import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

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
          title={currentUser ? "Logout" : "Sign In"}
          className={currentUser ? "logout-button" : "signin-button"}
          onClick={e => {
            currentUser ? handleLogout() : history.push("/sign-in");
            e.currentTarget.blur();
          }}
        >
          <FontAwesomeIcon icon={currentUser ? faSignOutAlt : faSignInAlt} />
        </button>
      </header>
    </div>
  );
};

export default Header;

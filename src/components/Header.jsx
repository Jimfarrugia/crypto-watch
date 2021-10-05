import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { loginWithGoogle, currentUser, logout } = useAuth();

  const handleSignIn = async () => {
    try {
      await loginWithGoogle();
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="page-header-wrapper">
      <header className="page-header">
        <h1 data-testid="page-heading">Crypto Watch</h1>
        <button
          type="button"
          title={currentUser ? "Logout" : "Sign In"}
          className={currentUser ? "logout-button" : "signin-button"}
          onClick={currentUser ? handleLogout : handleSignIn}
        >
          <FontAwesomeIcon icon={currentUser ? faSignOutAlt : faUser} />
        </button>
      </header>
    </div>
  );
};

export default Header;

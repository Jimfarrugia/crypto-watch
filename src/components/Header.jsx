import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { loginWithGoogle, currentUser } = useAuth();

  const handleSignIn = async () => {
    try {
      await loginWithGoogle();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="page-header-wrapper">
      <header className="page-header">
        <h1 data-testid="page-heading">Crypto Watch</h1>
        {!currentUser && (
          <button
            type="button"
            title="Sign In"
            className="signin-button"
            onClick={handleSignIn}
          >
            <FontAwesomeIcon icon={faUser} />
          </button>
        )}
      </header>
    </div>
  );
};

export default Header;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { currentUser } = useAuth();
  const history = useHistory();
  const isEmailPasswordUser =
    currentUser && currentUser.providerData[0].providerId === "password";

  return (
    <div className="page-header-wrapper">
      <header className="page-header">
        <h1 data-testid="page-heading">
          <Link to="/" className="discreet-link">
            <img
              className="imageRotateHorizontal"
              src="/logo192.png"
              alt="Coin Watch logo"
              height="22"
              width="22"
              loading="lazy"
            />
            Crypto Watch
          </Link>
        </h1>
        {(!currentUser || (currentUser && isEmailPasswordUser)) && (
          <button
            type="button"
            title={currentUser ? "My Account" : "Sign In"}
            className={currentUser ? "account-button" : "sign-in-header-button"}
            onClick={e => {
              currentUser ? history.push("/account") : history.push("/sign-in");
              e.currentTarget.blur();
            }}
          >
            <FontAwesomeIcon icon={currentUser ? faUser : faSignInAlt} />
          </button>
        )}
        {currentUser && !isEmailPasswordUser && (
          <button
            type="button"
            title="My Account"
            className="account-img-button"
            onClick={e => {
              history.push("/account");
              e.currentTarget.blur();
            }}
          >
            <img
              src={currentUser.photoURL}
              alt={`${currentUser.displayName} profile pic`}
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </button>
        )}
      </header>
    </div>
  );
};

export default Header;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <div className="page-header-wrapper">
      <header className="page-header">
        <h1 data-testid="page-heading">Crypto Watch</h1>
        <button type="button" title="Sign In" className="signin-button">
          <FontAwesomeIcon icon={faUser} />
        </button>
      </header>
    </div>
  );
};

export default Header;

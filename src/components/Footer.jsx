import { useAuth } from "../contexts/AuthContext";

const Footer = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <footer className="page-footer">
      {currentUser && (
        <p>
          You are logged in as <strong>{currentUser.displayName}</strong>.
          &nbsp;
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </p>
      )}
      <ul>
        <li>
          <a
            href="https://github.com/Jimfarrugia/cryptocurrency-tracker"
            target="blank"
            title="Source Code"
          >
            Source Code
          </a>{" "}
          on Github
        </li>
        <li>
          Authored by{" "}
          <a
            href="https://www.jimfarrugia.com.au"
            target="blank"
            title="Jim Farrugia"
          >
            Jim Farrugia
          </a>
        </li>
        <li>
          Data provided by{" "}
          <a
            href="https://www.coingecko.com/en/api/documentation"
            target="blank"
            title="CoinGecko API"
          >
            CoinGecko API
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;

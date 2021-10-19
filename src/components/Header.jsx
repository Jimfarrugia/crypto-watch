import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  HeaderWrapper,
  HeaderStyled,
  AuthButton,
  AuthImageButton,
} from "./styled/Header.styled";

const Header = () => {
  const { currentUser } = useAuth();
  const history = useHistory();
  const isEmailPasswordUser =
    currentUser && currentUser.providerData[0].providerId === "password";

  return (
    <HeaderWrapper>
      <HeaderStyled>
        <h1 data-testid="page-heading">
          <Link to="/">
            <img
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
          <AuthButton
            type="button"
            title={currentUser ? "My Account" : "Sign In"}
            onClick={e => {
              currentUser ? history.push("/account") : history.push("/sign-in");
              e.currentTarget.blur();
            }}
          >
            <FontAwesomeIcon icon={currentUser ? faUser : faSignInAlt} />
          </AuthButton>
        )}
        {currentUser && !isEmailPasswordUser && (
          <AuthImageButton
            type="button"
            title="My Account"
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
          </AuthImageButton>
        )}
      </HeaderStyled>
    </HeaderWrapper>
  );
};

export default Header;

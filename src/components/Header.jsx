import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignInAlt, faBell } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  HeaderWrapper,
  HeaderStyled,
  UserNav,
  UserNavButton,
  UserNavImageButton,
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
        <UserNav>
          {currentUser && (
            <UserNavButton
              type="button"
              title="Notifications"
              onClick={e => {
                history.push("/notifications");
                e.currentTarget.blur();
              }}
            >
              <FontAwesomeIcon icon={faBell} />
            </UserNavButton>
          )}
          {(!currentUser || (currentUser && isEmailPasswordUser)) && (
            <UserNavButton
              type="button"
              title={currentUser ? "My Account" : "Sign In"}
              onClick={e => {
                currentUser
                  ? history.push("/account")
                  : history.push("/sign-in");
                e.currentTarget.blur();
              }}
            >
              <FontAwesomeIcon icon={currentUser ? faUser : faSignInAlt} />
            </UserNavButton>
          )}
          {currentUser && !isEmailPasswordUser && (
            <UserNavImageButton
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
            </UserNavImageButton>
          )}
        </UserNav>
      </HeaderStyled>
    </HeaderWrapper>
  );
};

export default Header;

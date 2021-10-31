import { useState, useEffect } from "react";
import { default as axios } from "axios";
import { doc, onSnapshot } from "@firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignInAlt, faBell } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
import { db } from "../firebase";
import { API_BASE_URL } from "../constants";
import { useAuth } from "../contexts/AuthContext";
import {
  HeaderWrapper,
  HeaderStyled,
  UserNav,
  UserNavButton,
  UserNavImageButton,
} from "./styled/Header.styled";

const Header = () => {
  const [notifications, setNotifications] = useState([]);
  const [activeNotifications, setActiveNotifications] = useState([]);
  const [notificationIds, setNotificationIds] = useState("");
  const [coinsData, setCoinsData] = useState([]);
  const [vsCurrency, setVsCurrency] = useState("");
  const { currentUser } = useAuth();
  const history = useHistory();
  const isEmailPasswordUser =
    currentUser && currentUser.providerData[0].providerId === "password";

  const fetchCoinsDataByIds = ids => {
    axios
      .get(`${API_BASE_URL}/coins/markets`, {
        params: {
          vs_currency: vsCurrency,
          ids,
        },
      })
      .then(response => {
        setCoinsData(response.data);
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    if (currentUser) {
      const docRef = doc(db, "users", currentUser.uid);
      const unsubscribe = onSnapshot(docRef, doc => {
        const data = doc.data();
        if (data && data.vsCurrency) setVsCurrency(data.vsCurrency);
        if (data && data.notifications) setNotifications(data.notifications);
      });
      return unsubscribe;
    }
  }, [currentUser]);

  useEffect(() => {
    setNotificationIds("");
    notifications.forEach(notification => {
      setNotificationIds(prev => `${prev}${prev && ","}${notification.id}`);
    });
  }, [notifications]);

  useEffect(() => {
    if (vsCurrency && notificationIds) fetchCoinsDataByIds(notificationIds);
  }, [notificationIds, vsCurrency]); // eslint-disable-line

  useEffect(() => {
    setActiveNotifications(
      notifications.filter(notification => {
        const { id, type, threshold } = notification;
        const coinData = coinsData.find(coin => coin.id === id);
        return type === "above"
          ? coinData.current_price >= threshold
          : type === "below"
          ? coinData.current_price <= threshold
          : false;
      })
    );
  }, [coinsData]); // eslint-disable-line

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
              {activeNotifications && activeNotifications.length > 0 && (
                <small className="counter">{activeNotifications.length}</small>
              )}
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

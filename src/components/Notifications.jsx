import { useState, useEffect, useCallback } from "react";
import { default as axios } from "axios";
import { setDoc, doc, onSnapshot } from "@firebase/firestore";
import { NotificationsStyled } from "./styled/Notifications.styled";
import { API_BASE_URL, defaultVsCurrency } from "../constants";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { currencySymbol, formatPriceNumber } from "../helpers";
import NotificationsList from "./NotificationsList";
import NotificationForm from "./NotificationForm";
import Alert from "./Alert";

const Notifications = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [notificationIds, setNotificationIds] = useState([]);
  const [activeNotifications, setActiveNotifications] = useState([]);
  const [coinsData, setCoinsData] = useState(undefined);
  const [vsCurrency, setVsCurrency] = useState(undefined);
  const { currentUser } = useAuth();

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

  const changeUserVsCurrencyToDefault = useCallback(async () => {
    try {
      const id = currentUser.uid;
      const payload = {
        user: currentUser.uid,
        vsCurrency: defaultVsCurrency.value,
      };
      const docRef = doc(db, "users", id);
      await setDoc(docRef, payload, { merge: true });
      setVsCurrency(defaultVsCurrency.value);
      setMessage(
        `Your preferred currency has been set to the default (${defaultVsCurrency.label}).  You can change it any time in your account settings.`
      );
    } catch (e) {
      console.error(e);
      setError(
        "We were unable to set a default currency to use for notifications.  Please choose your preferred currency in account settings in order to use notifications."
      );
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      const docRef = doc(db, "users", currentUser.uid);
      const unsubscribe = onSnapshot(docRef, doc => {
        const data = doc.data();
        if (data && data.vsCurrency) setVsCurrency(data.vsCurrency);
        if (data && !data.vsCurrency) changeUserVsCurrencyToDefault();
        if (data && data.notifications) setNotifications(data.notifications);
      });
      return unsubscribe;
    }
  }, [currentUser, changeUserVsCurrencyToDefault]);

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

  useEffect(() => {
    let alertTimeout = setTimeout(() => {
      setError("");
      setMessage("");
    }, 10000);
    return () => clearTimeout(alertTimeout);
  }, [error, message]);

  return (
    <NotificationsStyled>
      <h2>Notifications</h2>
      {error && <Alert status="error" text={error} spacing={2} />}
      {message && <Alert status="success" text={message} spacing={2} />}
      {activeNotifications && activeNotifications.length > 0 && (
        <ul className="activeNotifications">
          {activeNotifications.map(notification => {
            const { id, name, threshold, type } = notification;
            return (
              <li key={`${id}-active`}>
                <strong>{name}</strong> is {type} {currencySymbol(vsCurrency)}
                {formatPriceNumber(threshold)}!
              </li>
            );
          })}
        </ul>
      )}
      <h3>Add a notification:</h3>
      <NotificationForm
        vsCurrency={vsCurrency}
        setError={setError}
        setMessage={setMessage}
      />
      {notifications && (
        <NotificationsList
          notifications={notifications}
          vsCurrency={vsCurrency}
        />
      )}
    </NotificationsStyled>
  );
};

export default Notifications;

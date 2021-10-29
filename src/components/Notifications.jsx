import { useState, useEffect, useRef } from "react";
import { default as axios } from "axios";
import { doc, onSnapshot, setDoc, arrayUnion } from "@firebase/firestore";
import Select from "./Select";
import SearchBar from "./SearchBar";
import ButtonOutlined from "./ButtonOutlined";
import { NotificationsStyled } from "./styled/Notifications.styled";
import { API_BASE_URL } from "../constants";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { currencySymbol, formatPriceNumber } from "../helpers";
import NotificationsList from "./NotificationsList";
import Alert from "./Alert";

// TODO - Should try to move fetch methods to (new) utils file.

const Notifications = () => {
  const [type, setType] = useState(undefined);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [threshold, setThreshold] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationIds, setNotificationIds] = useState([]);
  const [activeNotifications, setActiveNotifications] = useState([]);
  const [coinData, setCoinData] = useState(undefined);
  const [coinsData, setCoinsData] = useState(undefined);
  const [vsCurrency, setVsCurrency] = useState(undefined);
  const { currentUser } = useAuth();
  const thresholdRef = useRef();

  const fetchCoinDataById = id => {
    setError(undefined);
    axios
      .get(`${API_BASE_URL}/coins/markets`, {
        params: {
          vs_currency: vsCurrency,
          ids: id,
        },
      })
      .then(response => {
        if (!response || !response.data || response.data.length < 1)
          throw new Error(`Unable to find data for "${id}"...`);
        setCoinData(response.data[0]);
      })
      .catch(error => {
        setError(error.message);
        console.error(error);
      });
  };

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

  const handleSearchSubmit = id => fetchCoinDataById(id);

  const handleNewNotification = async e => {
    e.preventDefault();
    if (!threshold || typeof +threshold !== "number" || +threshold < 0)
      return setError("Price is invalid");
    if (!type || (type !== "above" && type !== "below"))
      return setError("The type is not set.");
    setIsLoading(true);
    try {
      const { name, id, image } = coinData;
      const notification = { name, id, image, type, threshold: +threshold };
      const payload = {
        user: currentUser.uid,
        notifications: arrayUnion(notification),
      };
      if (!vsCurrency) payload["vsCurrency"] = "usd";
      const docRef = doc(db, "users", currentUser.uid);
      await setDoc(docRef, payload, { merge: true });
      setCoinData(undefined);
      setType(undefined);
      setThreshold(0);
      setMessage(`Notification for ${name} was added.`);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError(error.message);
      setIsLoading(false);
    }
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

  useEffect(() => {
    let alertTimeout = setTimeout(() => {
      setError("");
      setMessage("");
    }, 5000);
    return () => clearTimeout(alertTimeout);
  }, [error, message]);

  return (
    <NotificationsStyled>
      <h2>Notifications</h2>
      {/* // TODO - Use loader */}
      {error && <Alert status="error" text={error} spacing={2} />}
      {message && <Alert status="success" text={message} spacing={2} />}
      {
        activeNotifications && activeNotifications.length > 0 && (
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
        )
        /*) || (
        <>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
            itaque ipsam in ratione, nihil repellat.
          </p>
          <p>
            Ipsa amet consectetur corporis laboriosam, ab optio voluptas neque?
            Quasi eveniet assumenda et harum excepturi.
          </p>
        </>
      )*/
      }
      <h3>Add a notification:</h3>
      <SearchBar handleSearchSubmit={handleSearchSubmit} />
      {coinData && (
        <section>
          <img
            src={coinData.image}
            alt=""
            height="64"
            width="64"
            loading="lazy"
          />
          <form onSubmit={handleNewNotification}>
            <h3>{coinData.name}</h3>
            <div>
              <Select
                isSearchable={false}
                options={[
                  { label: "Above", value: "above" },
                  { label: "Below", value: "below" },
                ]}
                placeholder="Type"
                onChange={option => setType(option.value)}
              />
              {/* // TODO - Add hidden label */}
              <div className="threshold">
                <div
                  className="prefix"
                  onClick={() => thresholdRef.current.focus()}
                >
                  {vsCurrency ? vsCurrency.toUpperCase() : "USD"}
                  <span>{vsCurrency ? currencySymbol(vsCurrency) : "$"}</span>
                </div>
                <input
                  type="number"
                  onChange={e => setThreshold(e.target.value)}
                  value={threshold || ""}
                  placeholder="Price"
                  ref={thresholdRef}
                />
              </div>
            </div>
            <div>
              <ButtonOutlined
                fullWidth
                color="error"
                type="button"
                title="Cancel"
                disabled={isLoading}
                onClick={() => {
                  setThreshold(undefined);
                  setCoinData(undefined);
                }}
              >
                Cancel
              </ButtonOutlined>
              <ButtonOutlined
                fullWidth
                type="submit"
                title="Save Notification"
                disabled={isLoading}
              >
                Save
              </ButtonOutlined>
            </div>
          </form>
        </section>
      )}
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

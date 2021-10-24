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
import { currencySymbol } from "../helpers";

// TODO - Should try to move fetch methods to (new) utils file.

const Notifications = () => {
  const [type, setType] = useState(undefined);
  const [error, setError] = useState(undefined);
  // const [message, setMessage] = useState(undefined);
  const [threshold, setThreshold] = useState(0);
  // const [isLoading, setIsLoading] = useState(false);
  const [coinData, setCoinData] = useState(undefined);
  const [vsCurrency, setVsCurrency] = useState(undefined);
  const { currentUser } = useAuth();
  const thresholdRef = useRef();

  const fetchCoinDataById = id => {
    setError(undefined);
    // setIsLoading(true);
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
        // setIsLoading(false);
      })
      .catch(error => {
        // setIsLoading(false);
        setError(error.message);
        console.error(error);
      });
  };

  const handleSearchSubmit = id => fetchCoinDataById(id);

  const handleNewNotification = async e => {
    e.preventDefault();
    // TODO - validate threshold (must be number >= 0)
    // TODO - validate type (must be "above" or "below")
    // TODO - Add error/success messages
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
      setThreshold(0);
      setType(undefined);
      setCoinData(undefined);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      const docRef = doc(db, "users", currentUser.uid);
      const unsubscribe = onSnapshot(docRef, doc => {
        const data = doc.data();
        if (data && data.vsCurrency) setVsCurrency(data.vsCurrency);
        // TODO - Get notifications
      });
      return unsubscribe;
    }
  }, [currentUser]);

  return (
    <NotificationsStyled>
      <h2>Notifications</h2>
      {/* // TODO - Use loader */}
      {error && (
        <p>
          <strong>{error}</strong>
          {/* // TODO - replace with Alert component */}
        </p>
      )}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
        itaque ipsam in ratione, nihil repellat.
      </p>
      <p>
        Ipsa amet consectetur corporis laboriosam, ab optio voluptas neque?
        Quasi eveniet assumenda et harum excepturi.
      </p>
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
            <h4>{coinData.name}</h4>
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
                // disabled={isLoading}
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
                // disabled={isLoading}
              >
                Save
              </ButtonOutlined>
            </div>
          </form>
        </section>
      )}
    </NotificationsStyled>
  );
};

export default Notifications;

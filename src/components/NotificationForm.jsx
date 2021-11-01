import { useState, useRef, useEffect } from "react";
import { doc, setDoc, arrayUnion } from "@firebase/firestore";
import { default as axios } from "axios";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import SearchBar from "./SearchBar";
import Select from "./Select";
import ButtonOutlined from "./ButtonOutlined";
import { NotificationFormStyled } from "./styled/NotificationForm.styled";
import { API_BASE_URL } from "../constants";
import { currencySymbol, saveImageToLocalStorage } from "../helpers";

const NotificationForm = ({ vsCurrency, setError, setMessage }) => {
  const [coinData, setCoinData] = useState(undefined);
  const [type, setType] = useState(undefined);
  const [threshold, setThreshold] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const thresholdRef = useRef();
  const { currentUser } = useAuth();

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
    if (coinData && !localStorage.getItem(coinData.id)) {
      saveImageToLocalStorage(coinData.id, coinData.image);
    }
  }, [coinData]);

  return (
    <NotificationFormStyled>
      <SearchBar handleSearchSubmit={handleSearchSubmit} />
      {coinData && (
        <section>
          <img
            src={localStorage.getItem(coinData.id) || coinData.image}
            alt={`${coinData.name} logo`}
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
              <div className="threshold">
                <label htmlFor="threshold">
                  {vsCurrency.toUpperCase()} Amount
                </label>
                <div
                  className="prefix"
                  onClick={() => thresholdRef.current.focus()}
                >
                  {vsCurrency ? vsCurrency.toUpperCase() : "USD"}
                  <span>{vsCurrency ? currencySymbol(vsCurrency) : "$"}</span>
                </div>
                <input
                  id="threshold"
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
    </NotificationFormStyled>
  );
};

export default NotificationForm;

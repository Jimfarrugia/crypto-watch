import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { default as axios } from "axios";
import { Line } from "react-chartjs-2";
import {
  setDoc,
  doc,
  arrayRemove,
  arrayUnion,
  onSnapshot,
} from "@firebase/firestore";
import { db } from "./firebase";
import { useTheme } from "styled-components";
import { useAuth } from "./contexts/AuthContext";
import CoinNav from "./components/CoinNav";
import SearchBar from "./components/SearchBar";
import Details from "./components/Details";
import Settings from "./components/Settings";
import DiscreetButton from "./components/DiscreetButton";
import Loader from "./components/Loader";
import {
  currencies,
  timeframes,
  coinNavLength,
  API_BASE_URL,
} from "./constants";

function App() {
  const [vsCurrency, setVsCurrency] = useState(currencies[0].value);
  const [timeframe, setTimeframe] = useState(timeframes[2]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [coinData, setCoinData] = useState(undefined);
  const [coinNavData, setCoinNavData] = useState([]);
  const [chartData, setChartData] = useState(undefined);
  const [favorites, setFavorites] = useState([]);
  const { currentUser } = useAuth();
  const { history } = useHistory();
  const theme = useTheme();

  axios.defaults.baseURL = API_BASE_URL;

  const fetchCoinDataById = id => {
    setError(undefined);
    setIsLoading(true);
    axios
      .get(`/coins/markets`, {
        params: {
          vs_currency: vsCurrency,
          ids: id,
        },
      })
      .then(response => {
        if (!response || !response.data || response.data.length < 1)
          throw new Error(`Unable to find data for "${id}"...`);
        setCoinData(response.data[0]);
        fetchCoinPriceHistory(id);
      })
      .catch(error => {
        setIsLoading(false);
        setChartData(undefined);
        setError(<p>{error.message}</p>);
        console.error(error);
      });
  };

  const fetchCoinPriceHistory = id => {
    const params = { vs_currency: vsCurrency, days: timeframe.value };
    if (params.days < 91) {
      params["interval"] = "daily";
    }
    axios
      .get(`/coins/${id}/market_chart`, {
        params,
      })
      .then(response => {
        setIsLoading(false);
        if (!response || !response.data || response.data.prices.length < 1)
          throw new Error(`Unable to fetch price history for "${id}"...`);
        const {
          data: { prices },
        } = response;
        setChartData({
          labels: prices.map((price, index) => {
            let date = new Date();
            date.setDate(date.getDate() - (prices.length - index - 1));
            const intlDate = new Intl.DateTimeFormat("en-UK").format(date);
            return intlDate;
          }),
          datasets: [
            {
              label: `Price in ${vsCurrency.toUpperCase()}`,
              data: prices.map(price => price[1]),
              borderColor: theme.color.secondary.light,
              backgroundColor: theme.color.secondary.dark,
              fill: true,
            },
          ],
        });
      })
      .catch(error => {
        setIsLoading(false);
        setChartData(undefined);
        setError(<p>{error.message}</p>);
        console.error(error);
      });
  };

  useEffect(() => {
    const fetchCoinNavData = n => {
      axios
        .get(`/coins/markets`, {
          params: {
            vs_currency: "usd",
            per_page: n,
          },
        })
        .then(response => {
          // any favorites in the result should be given the 'isFavorite' property
          const favoritesInResult =
            favorites && favorites.length < 1
              ? []
              : response.data
                  .filter(item =>
                    favorites.find(favorite => favorite.id === item.id)
                  )
                  .map(item => ({ isFavorite: true, ...item }));
          // reorder the array to put any favorites at the start
          setCoinNavData([
            ...favoritesInResult,
            ...response.data.filter(
              item => !favorites.find(favorite => favorite.id === item.id)
            ),
          ]);
        })
        .catch(error => console.error(error));
    };
    return favorites && favorites.length >= coinNavLength
      ? setCoinNavData(favorites)
      : fetchCoinNavData(coinNavLength);
  }, [favorites]);

  useEffect(() => {
    if (coinData && coinData.id) fetchCoinDataById(coinData.id);
  }, [vsCurrency]); // eslint-disable-line

  useEffect(() => {
    if (coinData && coinData.id) fetchCoinPriceHistory(coinData.id);
  }, [timeframe]); // eslint-disable-line

  useEffect(() => {
    if (currentUser) {
      const docRef = doc(db, "users", currentUser.uid);
      const unsubscribe = onSnapshot(docRef, doc => {
        const data = doc.data();
        if (data && data.favorites) setFavorites(data.favorites);
        if (data && data.vsCurrency) setVsCurrency(data.vsCurrency);
        if (data && data.timeframe) setTimeframe(data.timeframe);
      });
      return unsubscribe;
    }
  }, [currentUser]);

  const handleSearchSubmit = id => {
    fetchCoinDataById(id);
  };

  const handleChangeTimeframe = selectedOption => {
    setIsLoading(true);
    setTimeframe(selectedOption);
  };

  const handleChangeVsCurrency = ({ value }) => {
    setIsLoading(true);
    setVsCurrency(value);
  };

  const handleNewFavorite = async data => {
    if (!currentUser) return history.push("/sign-in");
    try {
      const id = currentUser.uid;
      const payload = {
        user: currentUser.uid,
        favorites: arrayUnion(data),
      };
      const docRef = doc(db, "users", id);
      await setDoc(docRef, payload, { merge: true });
    } catch (error) {
      setError(
        <p>
          There was an error while communicating with the database. Please{" "}
          <DiscreetButton
            text="refresh"
            onClick={() => window.location.reload()}
          />{" "}
          the page and try again.
        </p>
      );
      console.error(error);
    }
  };

  const handleRemoveFavorite = async data => {
    if (!currentUser) return history.push("/sign-in");
    try {
      const id = currentUser.uid;
      const payload = { favorites: arrayRemove(data) };
      const docRef = doc(db, "users", id);
      await setDoc(docRef, payload, { merge: true });
    } catch (error) {
      setError(
        <p>
          There was an error while communicating with the database. Please{" "}
          <DiscreetButton
            text="refresh"
            onClick={() => window.location.reload()}
          />{" "}
          the page and try again.
        </p>
      );
      console.error(error);
    }
  };

  return (
    <>
      {(coinNavData && (
        <>
          <CoinNav
            coinNavLength={coinNavLength}
            favorites={favorites}
            coinNavData={coinNavData}
            fetchCoinDataById={fetchCoinDataById}
          />
          <SearchBar handleSearchSubmit={handleSearchSubmit} />
        </>
      )) ||
        (isLoading && <Loader />)}
      {(isLoading && <Loader />) || (error && <div>{error}</div>) || (
        <>
          <Details
            coinData={coinData}
            chartData={chartData}
            vsCurrency={vsCurrency}
            error={error}
            favorites={favorites}
            handleNewFavorite={handleNewFavorite}
            handleRemoveFavorite={handleRemoveFavorite}
          />
          {chartData && (
            <>
              <Settings
                vsCurrency={vsCurrency}
                timeframe={timeframe}
                handleChangeVsCurrency={handleChangeVsCurrency}
                handleChangeTimeframe={handleChangeTimeframe}
              />
              <Line data={chartData} />
            </>
          )}
        </>
      )}
    </>
  );
}

export default App;

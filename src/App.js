import React, { useState, useEffect } from "react";
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
import { useAuth } from "./contexts/AuthContext";
import CoinNav from "./components/CoinNav";
import SearchBar from "./components/SearchBar";
import Details from "./components/Details";
import Settings from "./components/Settings";
import {
  currencies,
  timeframes,
  coinNavLength,
  color,
  API_BASE_URL,
} from "./constants";

const { blue, blueBright } = color;

const RefreshButton = () => (
  <button className="button-link" onClick={() => window.location.reload()}>
    refresh
  </button>
);

function App() {
  const [vsCurrency, setVsCurrency] = useState(currencies[0].value);
  const [priceHistoryDays, setPriceHistoryDays] = useState(timeframes[2]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState(undefined);
  const [coinData, setCoinData] = useState(undefined);
  const [coinList, setCoinList] = useState(undefined);
  const [coinNavData, setCoinNavData] = useState([]);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [chartData, setChartData] = useState(undefined);
  const [favorites, setFavorites] = useState([]);
  const { currentUser } = useAuth();

  axios.defaults.baseURL = API_BASE_URL;

  const fetchCoinList = () => {
    axios
      .get(`/coins/list`)
      .then(response => setCoinList(response.data))
      .catch(error => {
        setError(
          <>
            <p>Unable to connect to the data server right now.</p>
            <p>
              Please <RefreshButton /> the page.
            </p>
            <p>
              Please note that the data server can handle up to ~50 requests per
              minute so you may need to wait up to one minute.
            </p>
          </>
        );
        console.error(error);
        setIsLoading(false);
      });
  };

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
    const params = { vs_currency: vsCurrency, days: priceHistoryDays.value };
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
              borderColor: blueBright,
              backgroundColor: blue,
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

  useEffect(() => fetchCoinList(), []);

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
  }, [priceHistoryDays]); // eslint-disable-line

  useEffect(() => {
    if (currentUser) {
      const docRef = doc(db, "favorites", currentUser.uid);
      onSnapshot(
        docRef,
        doc =>
          setFavorites(
            doc.data() &&
              doc.data().favorites &&
              doc.data().favorites.map(item => ({ isFavorite: true, ...item }))
          ) || []
      );
    }
  }, [currentUser]);

  const handleSearchInputChange = input => {
    if (input.match(/[^A-Za-z0-9.!-]/, "g")) {
      // disallow most symbols
      return searchTerm;
    }
    setSearchTerm(input);
    if (input.length < 1) {
      return setSearchSuggestions([]);
    }
    const matches = coinList.filter(coin => {
      let regex = new RegExp(`${input}`, "gi");
      return coin.name.match(regex); // || coin.symbol.match(regex); //? symbol search isn't working
    });
    setSearchSuggestions(
      matches.map(coin => ({
        label: coin.name,
        value: coin.id,
      }))
    );
  };

  const handleSearchChange = option => {
    setSearchSuggestions([]);
    fetchCoinDataById(option.value);
  };

  const handleChangePriceHistoryDays = selectedOption => {
    setIsLoading(true);
    setPriceHistoryDays(selectedOption);
  };

  const handleChangeVsCurrency = ({ value }) => {
    setIsLoading(true);
    setVsCurrency(value);
  };

  const handleNewFavorite = async data => {
    if (!currentUser) return window.alert("Error:  You are not signed in.");
    try {
      const id = currentUser.uid;
      const payload = {
        user: currentUser.uid,
        favorites: arrayUnion(data),
      };
      const docRef = doc(db, "favorites", id);
      await setDoc(docRef, payload, { merge: true });
    } catch (error) {
      setError(
        <p>
          There was an error while communicating with the database. Please{" "}
          <RefreshButton /> the page and try again.
        </p>
      );
      console.error(error);
    }
  };

  const handleRemoveFavorite = async data => {
    if (!currentUser) return window.alert("Error:  You are not signed in.");
    try {
      const id = currentUser.uid;
      const payload = { favorites: arrayRemove(data) };
      const docRef = doc(db, "favorites", id);
      await setDoc(docRef, payload, { merge: true });
    } catch (error) {
      setError(
        <p>
          There was an error while communicating with the database. Please{" "}
          <RefreshButton /> the page and try again.
        </p>
      );
      console.error(error);
    }
  };

  return (
    <div className="App">
      {(coinNavData && coinList && (
        <>
          <CoinNav
            coinNavLength={coinNavLength}
            favorites={favorites}
            coinNavData={coinNavData}
            fetchCoinDataById={fetchCoinDataById}
          />
          <SearchBar
            searchTerm={searchTerm}
            searchSuggestions={searchSuggestions}
            handleSearchChange={handleSearchChange}
            handleSearchInputChange={handleSearchInputChange}
          />
        </>
      )) ||
        (isLoading && <div className="loader"></div>)}
      {(isLoading && <div className="loader"></div>) ||
        (error && <div>{error}</div>) || (
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
                  priceHistoryDays={priceHistoryDays}
                  handleChangeVsCurrency={handleChangeVsCurrency}
                  handleChangePriceHistoryDays={handleChangePriceHistoryDays}
                />
                <Line data={chartData} />
              </>
            )}
          </>
        )}
    </div>
  );
}

export default App;

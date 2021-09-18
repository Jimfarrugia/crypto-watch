import React, { useState, useEffect } from "react";
import { default as axios } from "axios";
import { Line } from "react-chartjs-2";

import Header from "./components/Header";
import Footer from "./components/Footer";
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

function App() {
  const [vsCurrency, setVsCurrency] = useState(currencies[0].value);
  const [priceHistoryDays, setPriceHistoryDays] = useState(timeframes[2]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState(undefined);
  const [coinData, setCoinData] = useState(undefined);
  const [coinList, setCoinList] = useState(undefined);
  const [coinNavData, setCoinNavData] = useState(undefined);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [chartData, setChartData] = useState(undefined);

  axios.defaults.baseURL = API_BASE_URL;

  const fetchCoinList = () => {
    axios
      .get(`/coins/list`)
      .then((response) => setCoinList(response.data))
      .catch((error) => console.log(error));
  };

  const fetchCoinDataById = (id) => {
    setError(undefined);
    setIsLoading(true);
    axios
      .get(`/coins/markets`, {
        params: {
          vs_currency: vsCurrency,
          ids: id,
        },
      })
      .then((response) => {
        if (!response || !response.data || response.data.length < 1)
          throw new Error(
            `Unable to find data for "${id}"...
            Check the spelling or try a different search term.`
          );
        setCoinData(response.data[0]);
        fetchCoinPriceHistory(id);
      })
      .catch((error) => {
        setIsLoading(false);
        setChartData(undefined);
        setError(error.message);
        console.log(error);
      });
  };

  const fetchCoinPriceHistory = (id) => {
    const params = { vs_currency: vsCurrency, days: priceHistoryDays.value };
    if (params.days < 91) {
      params["interval"] = "daily";
    }
    axios
      .get(`/coins/${id}/market_chart`, {
        params,
      })
      .then((response) => {
        setIsLoading(false);
        if (!response || !response.data || response.data.prices.length < 1)
          throw new Error(
            `Error while fetching price history for "${id}"...
            Check the spelling or try a different search term.`
          );
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
              data: prices.map((price) => price[1]),
              borderColor: blueBright,
              backgroundColor: blue,
              fill: true,
            },
          ],
        });
      })
      .catch((error) => {
        setIsLoading(false);
        setChartData(undefined);
        setError(error.message);
        console.log(error);
      });
  };

  useEffect(() => {
    const fetchCoinNavData = (n) => {
      axios
        .get(`/coins/markets`, {
          params: {
            vs_currency: "usd",
            per_page: n,
          },
        })
        .then((response) => setCoinNavData(response.data))
        .catch((error) => console.log(error));
    };

    fetchCoinNavData(coinNavLength);
    fetchCoinList();
  }, []);

  useEffect(() => {
    if (coinData && coinData.id) fetchCoinDataById(coinData.id);
  }, [vsCurrency]);

  useEffect(() => {
    if (coinData && coinData.id) fetchCoinPriceHistory(coinData.id);
  }, [priceHistoryDays]);

  const handleSearchInputChange = (input) => {
    if (input.match(/[^A-Za-z0-9.!-]/, "g")) {
      // disallow most symbols
      return searchTerm;
    }
    setSearchTerm(input);
    if (input.length < 1) {
      return setSearchSuggestions([]);
    }
    const matches = coinList.filter((coin) => {
      let regex = new RegExp(`${input}`, "gi");
      return coin.name.match(regex); // || coin.symbol.match(regex); //? symbol search isn't working
    });
    setSearchSuggestions(
      matches.map((coin) => ({
        label: coin.name,
        value: coin.id,
      }))
    );
  };

  const handleSearchChange = (option) => {
    setSearchSuggestions([]);
    fetchCoinDataById(option.value);
  };

  const handleChangePriceHistoryDays = (selectedOption) => {
    setIsLoading(true);
    setPriceHistoryDays(selectedOption);
  };

  const handleChangeVsCurrency = ({ value }) => {
    setIsLoading(true);
    setVsCurrency(value);
  };

  return (
    <div className="App">
      <Header />
      <div className="page-wrapper">
        {(coinNavData && coinList && (
          <>
            <CoinNav
              fetchCoinDataById={fetchCoinDataById}
              coinNavData={coinNavData}
            />
            <SearchBar
              searchTerm={searchTerm}
              searchSuggestions={searchSuggestions}
              handleSearchInputChange={handleSearchInputChange}
              handleSearchChange={handleSearchChange}
            />
          </>
        )) || <div className="loader"></div>}
        {(isLoading && <div className="loader"></div>) || (
          <>
            <Details
              coinData={coinData}
              chartData={chartData}
              vsCurrency={vsCurrency}
              error={error}
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
        <Footer />
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { default as axios } from "axios";
import { Line } from "react-chartjs-2";

import Header from "./components/Header";
import Footer from "./components/Footer";
import CoinNav from "./components/CoinNav";
import SearchBar from "./components/SearchBar";
import Details from "./components/Details";
import Settings from "./components/Settings";

function App() {
  const coinNavLength = 10;
  const [vsCurrency, setVsCurrency] = useState("usd");
  const [priceHistoryDays, setPriceHistoryDays] = useState({
    label: "1 Month",
    value: 30,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [coinData, setCoinData] = useState(undefined);
  const [coinList, setCoinList] = useState(undefined);
  const [coinNavData, setCoinNavData] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState(undefined);
  const [chartData, setChartData] = useState(undefined);

  const fetchCoinList = () => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/list")
      .then((response) => setCoinList(response.data.map((coin) => coin.name))) // TODO - add error check
      .catch((error) => console.log(error));
  };

  const fetchCoinDataById = (id) => {
    setError(undefined);
    setIsLoading(true);
    axios
      .get(`https://api.coingecko.com/api/v3/coins/markets`, {
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
        setSearchTerm(response.data[0].name);
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

  const fetchCoinDataByName = (name) => {
    const id = name.trim().replace(/\s+/g, "-").toLowerCase();
    fetchCoinDataById(id);
  };

  const fetchCoinPriceHistory = (id) => {
    const params = { vs_currency: vsCurrency, days: priceHistoryDays.value };
    if (params.days < 91) {
      params["interval"] = "daily";
    }
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
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
              borderColor: "#4717f6",
              backgroundColor: "#062f4f",
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
        .get("https://api.coingecko.com/api/v3/coins/markets", {
          params: {
            vs_currency: "usd",
            per_page: n,
          },
        })
        .then((response) => setCoinNavData(response.data)) // TODO - add error check
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

  const handleSearchTermChange = (e) => {
    const text = e.target.value.replace("\\", "");
    setSearchTerm(text);
    let matches = [];
    if (text.length > 0) {
      matches = coinList.filter((coinName) => {
        let regex = new RegExp(`${text}`, "gi");
        return coinName.match(regex);
      });
    }
    setSearchSuggestions(matches);
  };

  const handleSuggestionSelect = (suggestion) => {
    setSearchTerm(suggestion);
    setSearchSuggestions([]);
    setError(undefined);
    fetchCoinDataByName(suggestion);
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setError(undefined);
    setSearchSuggestions([]);
    if (searchTerm.trim().length > 0) {
      fetchCoinDataByName(searchTerm);
    }
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
              handleSearchTermChange={handleSearchTermChange}
              handleSearchSubmit={handleSearchSubmit}
              searchSuggestions={searchSuggestions}
              setSearchSuggestions={setSearchSuggestions}
              handleSuggestionSelect={handleSuggestionSelect}
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

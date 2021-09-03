import React, { useState, useEffect } from "react";
import { default as axios } from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CoinNav from "./components/CoinNav";
import SearchBar from "./components/SearchBar";
import PriceChart from "./components/PriceChart";

function App() {
  const coinNavLength = 10;
  const [error, setError] = useState(undefined);
  const [coinData, setCoinData] = useState(undefined);
  const [coinNavData, setCoinNavData] = useState([]);
  const [coinList, setCoinList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  const fetchCoinNavData = (n) => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          per_page: n,
        },
      })
      .then((response) => setCoinNavData(response.data))
      .catch((error) => console.log(error));
  };

  const fetchCoinList = () => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/list", {})
      .then((response) => setCoinList(response.data.map((coin) => coin.name)))
      .catch((error) => console.log(error));
  };

  const fetchCoinDataById = (id) => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/markets`, {
        params: {
          vs_currency: "usd",
          ids: id,
        },
      })
      .then((response) => {
        if (response.data.length < 1)
          throw new Error(
            `Unable to find data for "${id}"...
            Check the spelling or try a different search term.`
          );
        setSearchTerm(response.data[0].name);
        setCoinData(response.data[0]);
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  };

  const fetchCoinDataByName = (name) => {
    const id = name.trim().replace(/\s+/g, "-").toLowerCase();
    fetchCoinDataById(id);
  };

  useEffect(() => {
    fetchCoinNavData(coinNavLength);
    fetchCoinList();
  }, []);

  const handleSearchTermChange = (e) => {
    const text = e.target.value;
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
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (searchTerm.trim().length > 0) {
      fetchCoinDataByName(searchTerm);
    }
  };

  return (
    <div className="App">
      <div className="page-wrapper">
        <Header />
        <CoinNav
          fetchCoinDataById={fetchCoinDataById}
          coinNavData={coinNavData}
        />
        <SearchBar
          handleSearchSubmit={handleSearchSubmit}
          searchTerm={searchTerm}
          handleSearchTermChange={handleSearchTermChange}
          setSearchSuggestions={setSearchSuggestions}
          searchSuggestions={searchSuggestions}
          handleSuggestionSelect={handleSuggestionSelect}
        />
        <PriceChart coinData={coinData} error={error} />
        <Footer />
      </div>
    </div>
  );
}

export default App;

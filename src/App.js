import React, { useState, useEffect } from "react";
import { default as axios } from "axios";

// We must use the coin's ID in the query params to fetch coin data.
// Coin's id is just it's name in lowercase with dashes replacing spaces.
// Make sure to remove any leading or trailing whitespace.

function App() {
  const coinNavLength = 10;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.split(" ").join("").length > 0) {
      console.log("form submitted", searchTerm);
    }
  };

  return (
    <div className="App">
      <div className="page-wrapper">
        <header className="page-header">
          <h1>Cryptocurrency Tracker</h1>
        </header>
        <nav className="coin-nav">
          <ul>
            {coinNavData.map((coin) => (
              <li key={coin.symbol}>
                <a href="#" title={coin.id}>
                  <img
                    src={coin.image}
                    alt={`${coin.id} icon`}
                    height="32"
                    width="32"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="search-section">
          <form
            onSubmit={handleSubmit}
            className="search-form"
            autoComplete="off"
          >
            <div className="search-field-wrapper">
              <input
                type="text"
                className="search-field"
                value={searchTerm}
                onChange={handleSearchTermChange}
                placeholder="Search..."
                onBlur={() => setTimeout(() => setSearchSuggestions([]), 100)}
              />
              <input type="submit" className="search-button" value="Search" />
            </div>
          </form>
          <div className="search-suggestions-wrapper">
            {/* If there are more than 10 suggestions 
              then only show those which begin with the search term */}
            {(searchSuggestions.length > 10 &&
              searchSuggestions.map((suggestion, i) => {
                let regex = new RegExp(`^${searchTerm}`, "i");
                return suggestion.match(regex) ? (
                  <div
                    key={i}
                    className="search-suggestion"
                    onClick={() => handleSuggestionSelect(suggestion)}
                  >
                    {suggestion}
                  </div>
                ) : (
                  <></>
                );
              })) ||
              (searchSuggestions.length > 0 &&
                searchSuggestions.map((suggestion, i) => (
                  <div
                    key={i}
                    className="search-suggestion"
                    onClick={() => handleSuggestionSelect(suggestion)}
                  >
                    {suggestion}
                  </div>
                )))}
          </div>
        </div>
        {/* Price chart goes here */}
        <footer className="page-footer">footer section</footer>
      </div>
    </div>
  );
}

export default App;

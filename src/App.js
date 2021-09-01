import React, { useState, useEffect } from 'react';
import { default as axios } from 'axios';

// TODO - fetchCoinList - get a list of coin names and symbols ("GET -> /coins/list")
// TODO - store list of coin names and symbols in state (coinList)

// We must use the coin's ID in the query params to fetch coin data
// Coin's id is just it's name in lowercase with dashes replacing spaces.

function App() {
  const [coinNavData, setCoinNavData] = useState([]);
  const [coinList, setCoinList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("mysearchterm");

  
  const fetchCoinNavData = n => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        per_page: n
      }
    })
    .then(response => setCoinNavData(response.data))
    .catch(error => console.log(error))
  }
    
  const fetchCoinList = () => {
    axios
      .get('https://api.coingecko.com/api/v3/coins/list', {})
      .then(response => setCoinList(response.data.map(coin => coin.name)))
      .catch(error => console.log(error))
  }
      
  useEffect(() => {
    fetchCoinNavData(10);
    fetchCoinList()
  }, []);

  const handleSearchTermChange = e => {
    setSearchTerm(e.target.value);
    // TODO - update autocomplete suggestions here
  }

  return (
    <div className="App">
      <header className="page-header">
        <h1>Cryptocurrency Tracker</h1>
      </header>
      <nav className="coin-nav">
        <ul>
        {
          coinNavData.map(coin => {
            return (
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
            )
          })
        }
        </ul>
      </nav>
      {/* Search bar */}
      <p className="search-field">
        <input type="text" value={searchTerm} onChange={handleSearchTermChange} />
        <button>Search</button>
        {/* 
        // TODO - onClick -> get price chart or display "could not find"
        */}
      </p>
      {/* Price chart */}
      <footer className="page-footer">
        {coinList.map(coinName => <span>{coinName}</span>)}
      </footer>
    </div>
  );
}

export default App;

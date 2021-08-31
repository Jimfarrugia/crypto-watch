import React, { useState, useEffect } from 'react';
import { default as axios } from 'axios';

function App() {
  const [coinNavData, setCoinNavData] = useState([]);

  const fetchCoinNavData = n => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        per_page: n
      }
    })
    .then(response => setCoinNavData(response.data))
    .catch(error => console.log(error)
  )}

  useEffect(() => {
    fetchCoinNavData(10);
  }, []);

  return (
    <div className="App">
      <header className="page-header">
        <h1>Cryptocurrency Tracker</h1>
      </header>
      <nav className="coin-nav">
        {
          coinNavData.map(coin => {
            return <li key={coin.symbol}><a href="#" title={coin.id}>{coin.id}</a></li>
          })
        }
      </nav>
      {/* Search bar */}
      {/* Price chart */}
      <footer className="page-footer">
        footer section
      </footer>
    </div>
  );
}

export default App;

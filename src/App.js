import { default as axios } from 'axios';

const data = axios.get('https://api.coingecko.com/api/v3/coins/markets', {
    params: {
      vs_currency: 'usd',
      per_page: 10
    }
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  })

function App() {
  return (
    <div className="App">
      <header className="page-header">
        <h1>Cryptocurrency Tracker</h1>
      </header>
      <nav className="coin-nav">
        {/* 
            - List the 10 most popular coins as links.
            - Style the list.
        */}
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

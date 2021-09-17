const CoinNav = ({ fetchCoinDataById, coinNavData }) => {
  return (
    <nav className="coin-nav">
      <ul>
        {coinNavData &&
          coinNavData.map((coin) => (
            <li key={coin.symbol}>
              <button
                title={coin.name}
                onClick={() => fetchCoinDataById(coin.id)}
              >
                <img
                  src={coin.image}
                  alt={`${coin.name} icon`}
                  height="32"
                  width="32"
                />
                <br />
                <span>{coin.symbol}</span>
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default CoinNav;

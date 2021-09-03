const CoinNav = ({ fetchCoinDataById, coinNavData }) => {
  return (
    <nav className="coin-nav">
      <ul>
        {coinNavData &&
          coinNavData.map((coin) => (
            <li key={coin.symbol}>
              <button onClick={() => fetchCoinDataById(coin.id)}>
                <img
                  src={coin.image}
                  alt={`${coin.id} icon`}
                  height="32"
                  width="32"
                />
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default CoinNav;
